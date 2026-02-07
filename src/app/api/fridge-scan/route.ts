import { NextResponse } from 'next/server';
import { runGeminiWithRetry } from '@/lib/gemini';

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        // Remove base64 header if present
        const base64Data = image.split(',')[1] || image;

        const prompt = `
      Hãy nhìn vào bức ảnh các nguyên liệu này trong tủ lạnh.
      1. Liệt kê các nguyên liệu bạn thấy.
      2. Gợi ý 1 món mì ngon có thể nấu từ các nguyên liệu này. (Ưu tiên dùng Mì Hảo Hảo, Omachi hoặc Koreno).
      3. Hướng dẫn sơ chế và nấu nhanh gọn.
      4. Giọng điệu hào hứng, giống đầu bếp chuyên nghiệp.
      
      Trả về định dạng ngắn gọn, dễ đọc.
    `;

        const suggestion = await runGeminiWithRetry(async (model) => {
            const result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: "image/jpeg",
                    },
                },
            ]);
            return result.response.text();
        });

        return NextResponse.json({ suggestion });
    } catch (error) {
        console.error('Vision API error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};
