export default function ReturnPolicyPage() {
    return (
        <div className="container py-28 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Chính Sách Đổi Trả</h1>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                <p>MìMart hỗ trợ đổi trả trong vòng 7 ngày nếu:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Sản phẩm bị lỗi sản xuất (bao bì rách, hở).</li>
                    <li>Giao sai sản phẩm so với đơn đặt hàng.</li>
                    <li>Sản phẩm hết hạn sử dụng.</li>
                </ul>
                <p>Vui lòng quay video khi mở hàng để được hỗ trợ nhanh nhất.</p>
            </div>
        </div>
    );
}
