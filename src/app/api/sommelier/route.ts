/* eslint-disable */
import { NextResponse } from 'next/server';
import { runGeminiWithRetry } from '@/lib/gemini';
import { searchDuckDuckGo } from '@/lib/duckduckgo';
import { performRAG } from '@/lib/rag';
import { products } from '@/lib/data';
import { HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { query } = body;

        if (!query) {
            return NextResponse.json({ error: 'Missing query' }, { status: 400 });
        }

        console.log(`[Sommelier API] Processing query: "${query}"`);

        // 1. Search Web
        const searchResults = await searchDuckDuckGo(query, 5);

        // 2. Perform RAG (Fetch & Extract)
        const ragResult = await performRAG(query, searchResults, 3);

        // 3. Generate Answer with Gemini
        const productListContext = products.map(p =>
            `- ${p.name} (${p.category}): ${p.price}đ - ${p.description} (Độ cay: ${p.spicyLevel || 'Không'})`
        ).join('\n');

        const systemPrompt = `Bạn là "Noodle Sommelier" (Chuyên gia Mỳ) - một trợ lý AI am hiểu sâu sắc về các loại mỳ, phở, bún, mì gói, và văn hóa ẩm thực liên quan.
Sử dụng thông tin ngữ cảnh được cung cấp dưới đây để trả lời câu hỏi của người dùng.
Nếu thông tin ngữ cảnh không đủ, hãy sử dụng kiến thức của bạn nhưng ưu tiên thông tin từ ngữ cảnh.
ĐẶC BIỆT: Bạn có quyền truy cập vào danh sách sản phẩm ĐANG CÓ SẴN tại cửa hàng (bên dưới). Hãy ưu tiên gợi ý các sản phẩm này nếu phù hợp với nhu cầu.
Luôn trích dẫn nguồn nếu có thông tin từ ngữ cảnh RAG (ví dụ: [1], [WHO]).
Trả lời thân thiện, chuyên nghiệp, "sành ăn" và chốt đơn khéo léo.

DANH SÁCH SẢN PHẨM CÓ TẠI CỬA HÀNG:
${productListContext}

Ngữ cảnh RAG (Context):
${ragResult.context}

Câu hỏi của người dùng: ${query}`;

        const answer = await runGeminiWithRetry(async (model) => {
            const result = await model.generateContent({
                contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
                generationConfig: {
                    temperature: 0.7,
                },
            });
            return result.response.text();
        }); // Uses default model

        return NextResponse.json({
            answer,
            citations: ragResult.citations,
        });

    } catch (error: unknown) {
        console.error('[Sommelier API] Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
