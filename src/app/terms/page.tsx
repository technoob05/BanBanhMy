export default function TermsPage() {
    return (
        <div className="container py-28 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Điều Khoản Sử Dụng</h1>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                <p>Chào mừng bạn đến với MìMart. Khi truy cập website, bạn đồng ý với các điều khoản sau:</p>

                <h3 className="text-xl font-bold text-gray-900 mt-6">1. Đặt hàng</h3>
                <p>Bạn phải đủ 18 tuổi hoặc có sự giám sát của phụ huynh khi đặt hàng.</p>

                <h3 className="text-xl font-bold text-gray-900 mt-6">2. Giá cả</h3>
                <p>Mọi giá bán đều đã bao gồm VAT. Phí vận chuyển được tính riêng tại bước thanh toán.</p>

                <h3 className="text-xl font-bold text-gray-900 mt-6">3. Hủy đơn hàng</h3>
                <p>Bạn có thể hủy đơn hàng trước khi đơn hàng được chuyển cho đơn vị vận chuyển.</p>
            </div>
        </div>
    );
}
