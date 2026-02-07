export default function PrivacyPage() {
    return (
        <div className="container py-28 max-w-4xl cursor-text select-text">
            <h1 className="text-4xl font-bold mb-8">Chính Sách Bảo Mật</h1>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                <p>Cập nhật lần cuối: 01/01/2024</p>
                <p>MìMart cam kết bảo mật thông tin của khách hàng. Chúng tôi chỉ sử dụng thông tin của bạn để xử lý đơn hàng và cải thiện trải nghiệm mua sắm.</p>

                <h3 className="text-xl font-bold text-gray-900 mt-6">1. Thu thập thông tin</h3>
                <p>Chúng tôi thu thập tên, số điện thoại, địa chỉ và email khi bạn đặt hàng.</p>

                <h3 className="text-xl font-bold text-gray-900 mt-6">2. Sử dụng thông tin</h3>
                <p>Thông tin được dùng để giao hàng, liên hệ xác nhận đơn, và gửi khuyến mãi (nếu bạn đồng ý).</p>

                <h3 className="text-xl font-bold text-gray-900 mt-6">3. Chia sẻ thông tin</h3>
                <p>Chúng tôi CAM KẾT KHÔNG chia sẻ thông tin của bạn cho bên thứ ba, ngoại trừ đơn vị vận chuyển để giao hàng.</p>
            </div>
        </div>
    );
}
