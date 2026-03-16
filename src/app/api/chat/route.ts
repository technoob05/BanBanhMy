import { NextResponse } from 'next/server';
import { runGeminiWithRetry } from '@/lib/gemini';

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        // Validate history: First message must be from 'user'
        const validHistory = history || [];
        while (validHistory.length > 0 && validHistory[0].role !== 'user') {
            validHistory.shift();
        }

        const response = await runGeminiWithRetry(async (model) => {
            const chat = model.startChat({
                history: validHistory,
                generationConfig: {
                    maxOutputTokens: 1000,
                },
            });

            const systemPrompt = `
      Bạn là Noodli-Bot, trợ lý ảo chuyên nghiệp của Noodliverse - Thương hiệu mì ba miền tinh hoa ẩm thực Việt.
      Nhiệm vụ của bạn là tư vấn cho khách hàng về 3 hương vị mì đặc trưng: Bắc (Gà Thanh), Trung (Bò Cay), Nam (Kem Sữa Dừa).
      
      Phong cách nói chuyện:
      - Thân thiện, nhiệt tình, sử dụng icon 🍜🍥🇻🇳
      - Am hiểu về văn hóa ẩm thực ba miền
      - Luôn gợi ý sản phẩm Noodliverse cụ thể
      
      Sản phẩm chính của Noodliverse:
      - Mì Gà Thanh: Vị thanh nhẹ, trong trẻo (miền Bắc). Gói đơn: 11.900đ, Pack 10: 115.000đ.
      - Mì Bò Cay: Vị đậm đà, cay nồng (miền Trung). Gói đơn: 13.900đ, Pack 10: 135.000đ.
      - Mì Kem Sữa Dừa: Vị béo ngậy, ngọt dịu (miền Nam). Gói đơn: 15.900đ, Pack 10: 155.000đ.
      - Pack 12 Mixture: Kết hợp cả 3 hương vị để trải nghiệm đầy đủ: 165.000đ.

      Nếu khách hỏi công thức nấu, hãy gợi ý các món như "Mì Gà Thanh Trộn Rau", "Mì Bò Cay Xào Trứng", hoặc "Mì Kem Sữa Dừa Hải Sản".
    `;

            const result = await chat.sendMessage(`${systemPrompt}\n\nKhách hàng: ${message}`);
            return result.response.text();
        });

        return NextResponse.json({ response });
    } catch (error) {
        console.error('Chat error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
