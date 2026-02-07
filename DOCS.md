# MìMart - Dự Án Website Bán Mì Fullstack

Website bán mì trực tuyến hiện đại với các tính năng AI, sử dụng công nghệ React (Next.js) và Node.js.

## 🚀 Tính Năng Nổi Bật

1.  **AI Chatbot Tư Vấn (Gemini)**
    *   Sử dụng Gemini 2.0 Flash để đóng vai chuyên gia tư vấn mì.
    *   Gợi ý sản phẩm dựa trên khẩu vị (cay, chua, ngọt).
    *   Hoạt động 24/7.

2.  **Fridge Scanner (AI Vision)**
    *   Chụp ảnh tủ lạnh/nguyên liệu.
    *   AI nhận diện nguyên liệu và gợi ý món mì phù hợp kèm công thức.

3.  **E-commerce Hoàn Chỉnh**
    *   Giỏ hàng (Cart) lưu trữ LocalStorage.
    *   Tìm kiếm & Lọc sản phẩm theo danh mục, giá.
    *   Giao diện responsive mobile/desktop.
    *   Dark Mode.

4.  **UI/UX Hiện Đại**
    *   Glassmorphism design.
    *   Smooth animations với Framer Motion.
    *   Tối ưu SEO với Next.js App Router.

---

## 🛠 Cài Đặt & Chạy Dự Án

### 1. Yêu Cầu
*   Node.js 18+
*   NPM

### 2. Cài Đặt Dependencies

```bash
cd app
npm install
```

### 3. Cấu Hình Environment
File `.env.local` đã được tạo sẵn với **Google Gemini API Key**.

```env
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyBy8PEjQTIAxHVemYGvEw5qYjDIlHoO3-A
```

*Lưu ý: API Key này được lấy từ danh sách key "Chis". Bạn có thể thay đổi trong file `apikey.md` nếu cần.*

### 4. Chạy Development Server

```bash
npm run dev
```

Truy cập: `http://localhost:3000`

---

## 📂 Cấu Trúc Thư Mục

```
src/
├── app/                  # App Router
│   ├── api/              # Backend API Routes (Chat, Vision)
│   ├── products/         # Product Listing & Detail
│   ├── recipes/          # Recipes Page
│   ├── contact/          # Contact Page
│   └── page.tsx          # Home Page
├── components/
│   ├── ai/               # AI Components (ChatBot, FridgeScanner)
│   ├── features/         # Logic Components (Cart, ProductCard)
│   ├── layout/           # Shared Layout (Header, Footer)
│   └── ui/               # Base UI
├── lib/
│   ├── gemini.ts         # Gemini API Integration
│   ├── store.ts          # State Management (Zustand)
│   └── data.ts           # Mock Data (Products, Recipes)
```

## 📝 Commit & Code Quality
*   Clean code principles applied.
*   TypeScript strict mode enabled.
*   TailwindCSS for rapid styling.
