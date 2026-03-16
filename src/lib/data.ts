export const products = [
    // --- Mì Gói (Pack Noodles) ---
    {
        id: "p1",
        name: "Mì Gà Thanh",
        description: "Mì Gà Thanh mang hương vị nhẹ nhàng và dễ ăn, lấy cảm hứng từ phong cách ẩm thực miền Bắc. Nước súp trong, thanh vị gà tự nhiên kết hợp cùng sợi mì mềm giúp tạo nên một bữa ăn nhanh nhưng vẫn đầy đủ hương vị.",
        price: 11900,
        image: "/images/noodliverse/mi-ga-thanh-le.png",
        category: "mi-goi",
        rating: 4.8,
        reviews: 1200,
        spicyLevel: 0,
        highlights: [
            "Hương vị gà thanh nhẹ, không ngấy",
            "Sợi mì mảnh, dễ ăn",
            "Phù hợp cho mọi thời điểm trong ngày",
            "Lựa chọn lý tưởng cho người thích vị nhẹ"
        ]
    },
    {
        id: "p2",
        name: "Mì Bò Cay",
        description: "Mì Bò Cay mang hương vị đậm đà đặc trưng của miền Trung, với nước súp bò cay nồng kích thích vị giác. Sự kết hợp giữa vị bò thơm và độ cay vừa phải tạo nên trải nghiệm mì đầy năng lượng.",
        price: 13900,
        image: "/images/noodliverse/mi-bo-cay-le.png",
        category: "mi-goi",
        rating: 4.9,
        reviews: 2500,
        spicyLevel: 2,
        highlights: [
            "Hương vị bò đậm đà",
            "Cay nhẹ kích thích vị giác",
            "Phù hợp với người thích ăn cay",
            "Trải nghiệm mì mạnh mẽ và hấp dẫn"
        ]
    },
    {
        id: "p3",
        name: "Mì Kem Sữa Dừa",
        description: "Mì Kem Sữa Dừa mang phong cách ẩm thực miền Nam với vị béo nhẹ từ sữa dừa. Hương vị ngọt dịu và thơm béo tạo nên trải nghiệm mì mới lạ và độc đáo.",
        price: 15900,
        image: "/images/noodliverse/mi-kem-sua-dua-le.png",
        category: "mi-goi",
        rating: 4.7,
        reviews: 1800,
        spicyLevel: 0,
        highlights: [
            "Hương vị sữa dừa thơm béo",
            "Vị ngọt nhẹ dễ ăn",
            "Phong cách mì sáng tạo và khác biệt",
            "Phù hợp cho người thích vị béo nhẹ"
        ]
    },
    // --- Com Bo ---
    {
        id: "p4",
        name: "Pack of 10 Mì Gà Thanh",
        description: "Combo 10 gói Mì Gà Thanh giúp bạn luôn sẵn sàng cho những bữa ăn nhanh và tiện lợi. Phù hợp cho gia đình hoặc sinh viên dự trữ trong nhà.",
        price: 115000,
        image: "/images/noodliverse/mi-ga-thanh-combo.png",
        category: "combo",
        rating: 4.9,
        reviews: 500,
        spicyLevel: 0,
        highlights: [
            "Tiết kiệm hơn so với mua lẻ",
            "Phù hợp cho gia đình hoặc dự trữ",
            "Dễ dàng sử dụng bất cứ lúc nào"
        ]
    },
    {
        id: "p5",
        name: "Pack of 10 Mì Bò Cay",
        description: "Combo 10 gói Mì Bò Cay dành cho những ai yêu thích vị cay đậm đà. Lựa chọn hoàn hảo để thưởng thức mì cay bất cứ lúc nào.",
        price: 135000,
        image: "/images/noodliverse/mi-bo-cay-combo.png",
        category: "combo",
        rating: 4.9,
        reviews: 650,
        spicyLevel: 2,
        highlights: [
            "Hương vị cay đậm đặc trưng",
            "Tiết kiệm khi mua combo",
            "Phù hợp cho những người yêu thích vị cay"
        ]
    },
    {
        id: "p6",
        name: "Pack of 10 Mì Kem Sữa Dừa",
        description: "Combo 10 gói Mì Kem Sữa Dừa giúp bạn tận hưởng hương vị béo nhẹ độc đáo mỗi ngày. Một lựa chọn mới lạ cho những ai muốn trải nghiệm mì theo phong cách khác biệt.",
        price: 155000,
        image: "/images/noodliverse/mi-kem-sua-dua-combo.png",
        category: "combo",
        rating: 4.8,
        reviews: 420,
        spicyLevel: 0,
        highlights: [
            "Hương vị sáng tạo và độc đáo",
            "Tiết kiệm hơn so với mua lẻ",
            "Phù hợp để chia sẻ với gia đình và bạn bè"
        ]
    },
    {
        id: "p7",
        name: "Pack of 12 Mixture",
        description: "Pack of 12 Mixture là combo đặc biệt kết hợp cả 3 hương vị mì Bắc – Trung – Nam của Noodliverse. Đây là lựa chọn hoàn hảo cho những ai muốn trải nghiệm đầy đủ các hương vị của thương hiệu.",
        price: 165000,
        image: "/images/noodliverse/mix-3-loai.png",
        category: "combo",
        rating: 5.0,
        reviews: 900,
        spicyLevel: 1,
        highlights: [
            "Trải nghiệm đầy đủ 3 hương vị",
            "Phù hợp cho người mới thử sản phẩm",
            "Lý tưởng để chia sẻ cùng bạn bè và gia đình"
        ]
    },
];

export const categories = [
    { id: "all", name: "Tất Cả" },
    { id: "mi-goi", name: "Mì Gói" },
    { id: "combo", name: "Combo Tiết Kiệm" },
];

