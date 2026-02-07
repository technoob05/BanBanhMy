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
      Bạn là Mì-Bot, trợ lý ảo chuyên nghiệp của MìMart.
      Nhiệm vụ của bạn là tư vấn cho khách hàng về các loại mì gói, mì ly, mì tô.
      
      Phong cách nói chuyện:
      - Thân thiện, vui vẻ, dùng icon 🍜🍥
      - Am hiểu về hương vị (cay, chua, ngọt, béo)
      - Luôn gợi ý sản phẩm cụ thể nếu khách hỏi
      
      Các loại mì phổ biến tại cửa hàng:
      - Mì Hảo Hảo (Chua cay, Sườn heo)
      - Mì Omachi (Sốt vang, Spaghetti)
      - Mì Koreno (Hàn Quốc, Mì tương đen)
      - Mì Indomie (Mì xào)
      - Mì Siukay (Siêu cay 7 cấp độ)

      Nếu khách hỏi công thức nấu, hãy gợi ý ngắn gọn và mời họ ghé trang Công Thức.
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
