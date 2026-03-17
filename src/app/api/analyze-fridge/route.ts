import { NextRequest, NextResponse } from "next/server";
import { runGeminiWithRetry } from "@/lib/gemini";

// Use gemini-2.5-flash-lite for vision tasks
const VISION_MODEL_NAME = "gemini-2.5-flash-lite";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { imageBase64, mimeType } = body;

        if (!imageBase64 || !mimeType) {
            return NextResponse.json(
                { error: "Missing imageBase64 or mimeType in request body" },
                { status: 400 }
            );
        }

        // Prompt optimized for Fridge Scanning with Noodliverse context
const prompt = `Bạn là một đầu bếp AI thông minh (Vision Chef) của Noodliverse. Hãy nhìn vào bức ảnh này (chụp tủ lạnh hoặc nguyên liệu trên bàn).
1. Liệt kê các nguyên liệu chính bạn nhìn thấy.
2. Gợi ý 1 loại mì cụ thể của Noodliverse phù hợp nhất để nấu với các nguyên liệu này. Chỉ chọn một trong 3 loại: 
   - "Mì Gà Thanh" (Hương vị Bắc, thanh nhẹ)
   - "Mì Bò Cay" (Hương vị Trung, đậm đà, cay)
   - "Mì Kem Sữa Dừa" (Hương vị Nam, béo ngậy, ngọt dịu)
3. Gợi ý 3 món ăn sáng tạo sử dụng loại mì đã chọn và các nguyên liệu có sẵn.
4. Trả về kết quả CHỈ dưới dạng JSON hợp lệ theo cấu trúc sau:
{
  "ingredients": ["nguyên liệu 1", "nguyên liệu 2", ...],
  "recommendedProduct": "Tên loại mì đã chọn",
  "suggestions": [
    { "name": "Tên món ăn sáng tạo", "description": "Mô tả ngắn gọn cách làm, nhấn mạnh sự kết hợp với loại mì đã chọn." },
    { "name": "Món 2", "description": "..." },
    { "name": "Món 3", "description": "..." }
  ]
}`;

        const imagePart = {
            inlineData: {
                data: imageBase64,
                mimeType: mimeType,
            },
        };

        const result = await runGeminiWithRetry(async (model) => {
            return await model.generateContent([prompt, imagePart]);
        }, VISION_MODEL_NAME);

        const response = result.response;
        const rawText = response.text().trim();

        // Attempt to parse JSON
        interface Suggestion {
            name: string;
            description: string;
        }
        let ingredients: string[] = [];
        let suggestions: Suggestion[] = [];

        try {
            const jsonString = rawText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
            const parsed = JSON.parse(jsonString) as { ingredients?: string[]; suggestions?: Suggestion[] };
            ingredients = parsed.ingredients || [];
            suggestions = parsed.suggestions || [];
        } catch (parseError) {
            console.error("Failed to parse Fridge JSON:", parseError);
            return NextResponse.json({
                ingredients: [],
                suggestions: [],
                rawText: rawText
            });
        }

        return NextResponse.json({ ingredients, suggestions });

    } catch (error: unknown) {
        console.error("Error analyzing fridge:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: `Internal Server Error: ${errorMessage}` }, { status: 500 });
    }
}
