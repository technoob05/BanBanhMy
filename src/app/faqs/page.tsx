// Imports removed

export default function FAQsPage() {
    return (
        <div className="container py-28 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8 text-center">Câu Hỏi Thường Gặp</h1>
            <p className="text-center text-gray-500 mb-12">Giải đáp thắc mắc của bạn về MìMart</p>

            <div className="space-y-4">
                <details className="group bg-white p-6 rounded-2xl border border-gray-100 open:shadow-md transition-all">
                    <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-lg">
                        MìMart có giao hàng toàn quốc không?
                        <span className="transition group-open:rotate-180">⌄</span>
                    </summary>
                    <p className="text-gray-600 mt-4 leading-relaxed">
                        Có! Chúng tôi giao hàng đến 63 tỉnh thành. Thời gian giao hàng từ 1-3 ngày tùy khu vực.
                    </p>
                </details>

                <details className="group bg-white p-6 rounded-2xl border border-gray-100 open:shadow-md transition-all">
                    <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-lg">
                        Phí vận chuyển là bao nhiêu?
                        <span className="transition group-open:rotate-180">⌄</span>
                    </summary>
                    <p className="text-gray-600 mt-4 leading-relaxed">
                        Đồng giá 30.000đ cho đơn dưới 200.000đ. Miễn phí vận chuyển cho đơn từ 200.000đ trở lên.
                    </p>
                </details>

                <details className="group bg-white p-6 rounded-2xl border border-gray-100 open:shadow-md transition-all">
                    <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-lg">
                        Tôi có thể thanh toán khi nhận hàng không?
                        <span className="transition group-open:rotate-180">⌄</span>
                    </summary>
                    <p className="text-gray-600 mt-4 leading-relaxed">
                        Có, chúng tôi hỗ trợ thanh toán COD (Tiền mặt khi nhận hàng) cho mọi đơn hàng.
                    </p>
                </details>

                <details className="group bg-white p-6 rounded-2xl border border-gray-100 open:shadow-md transition-all">
                    <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-lg">
                        Sản phẩm có chính hãng không?
                        <span className="transition group-open:rotate-180">⌄</span>
                    </summary>
                    <p className="text-gray-600 mt-4 leading-relaxed">
                        Cam kết 100% chính hãng. Nếu phát hiện hàng giả, chúng tôi đền bù 10 lần giá trị đơn hàng.
                    </p>
                </details>
            </div>
        </div>
    );
}
