const PROMPT_TEMPLATE = `Bạn là một đầu bếp AI thông minh (Vision Chef) của Noodliverse. Hãy nhìn vào bức ảnh này (chụp tủ lạnh hoặc nguyên liệu trên bàn).
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

describe("Vision Chef Prompt Validation", () => {
    test("Prompt should include the three specific Noodliverse products", () => {
        expect(PROMPT_TEMPLATE).toContain("Mì Gà Thanh");
        expect(PROMPT_TEMPLATE).toContain("Mì Bò Cay");
        expect(PROMPT_TEMPLATE).toContain("Mì Kem Sữa Dừa");
    });

    test("Prompt should request JSON response with specific keys", () => {
        expect(PROMPT_TEMPLATE).toContain('"ingredients"');
        expect(PROMPT_TEMPLATE).toContain('"recommendedProduct"');
        expect(PROMPT_TEMPLATE).toContain('"suggestions"');
    });

    test("Prompt should instruct to only choose one of the three types", () => {
        expect(PROMPT_TEMPLATE).toContain("Chỉ chọn một trong 3 loại");
    });
});
