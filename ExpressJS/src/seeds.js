require("dotenv").config();
const connection = require("./config/database");
const Product = require("./models/product");

const sampleProducts = [
    {
        name: "MacBook Pro 14 inch",
        description: "Laptop cao cấp với chip M3 Pro, RAM 16GB, SSD 512GB",
        price: 1999,
        originalPrice: 2499,
        category: "Laptop",
        image: "https://images.unsplash.com/photo-1517336714460-4c9889a79956?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop"],
        stock: 15, sold: 42, rating: 5, reviews: 28, tags: ["best-seller"], discount: 20
    },
    {
        name: "iPhone 15 Pro",
        description: "Smartphone mới nhất với camera 48MP, chip A17 Pro",
        price: 1099,
        originalPrice: 1099,
        category: "Điện thoại",
        image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop"],
        stock: 30, sold: 156, rating: 5, reviews: 84, tags: ["new"], discount: 0
    },
    {
        name: "Sony WH-1000XM5",
        description: "Tai nghe chống ồn chủ động hàng đầu thế giới",
        price: 399,
        originalPrice: 499,
        category: "Tai nghe",
        image: "https://images.unsplash.com/photo-1670057037190-25590c6810f2?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1618366712277-721206c8201b?q=80&w=1000&auto=format&fit=crop"],
        stock: 45, sold: 78, rating: 4.5, reviews: 42, tags: ["promotion"], discount: 20
    },
    {
        name: "iPad Air 11 inch",
        description: "Máy tính bảng với M2 chip, màn hình Liquid Retina",
        price: 799,
        originalPrice: 899,
        category: "Tablet",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=1000&auto=format&fit=crop"],
        stock: 20, sold: 35, rating: 4.8, reviews: 19, tags: ["new"], discount: 11
    },
    {
        name: "Dell XPS 13",
        description: "Ultrabook siêu mỏng nhẹ, màn hình OLED 3K",
        price: 1299,
        originalPrice: 1599,
        category: "Laptop",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop"],
        stock: 12, sold: 28, rating: 4.7, reviews: 15, tags: ["best-seller"], discount: 19
    },
    {
        name: "Apple Watch Series 9",
        description: "Theo dõi sức khỏe và luyện tập chuyên nghiệp",
        price: 399,
        originalPrice: 399,
        category: "Đồng hồ",
        image: "https://images.unsplash.com/photo-1546868871-70ca18c41701?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1434493907317-a46b5bc78344?q=80&w=1000&auto=format&fit=crop"],
        stock: 25, sold: 61, rating: 4.9, reviews: 32, tags: ["best-seller"], discount: 0
    },
    {
        name: "Logitech MX Master 3S",
        description: "Chuột không dây công thái học cho lập trình viên",
        price: 99,
        originalPrice: 129,
        category: "Phụ kiện",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1000&auto=format&fit=crop"],
        stock: 100, sold: 450, rating: 5, reviews: 120, tags: ["best-seller"], discount: 23
    },
    {
        name: "Keychron K2 Mechanical Keyboard",
        description: "Bàn phím cơ không dây, Switch Gateron Brown",
        price: 89,
        originalPrice: 99,
        category: "Phụ kiện",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop"],
        stock: 50, sold: 210, rating: 4.7, reviews: 85, tags: ["new"], discount: 10
    },
    {
        name: "Samsung Galaxy Z Fold5",
        description: "Điện thoại gập đỉnh cao công nghệ",
        price: 1799,
        originalPrice: 1999,
        category: "Điện thoại",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=1000&auto=format&fit=crop"],
        stock: 8, sold: 12, rating: 4.6, reviews: 8, tags: ["promotion"], discount: 10
    },
    {
        name: "AirPods Pro Gen 2",
        description: "Âm thanh không gian, chống ồn gấp đôi",
        price: 249,
        originalPrice: 299,
        category: "Tai nghe",
        image: "https://images.unsplash.com/photo-1588423770574-91993ca0a8b8?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=1000&auto=format&fit=crop"],
        stock: 50, sold: 123, rating: 5, reviews: 67, tags: ["best-seller"], discount: 17
    },
    {
        name: "Monitor LG UltraFine 4K",
        description: "Màn hình đồ họa chuyên nghiệp, 27 inch",
        price: 699,
        originalPrice: 799,
        category: "Màn hình",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1551645120-d70bfe84c826?q=80&w=1000&auto=format&fit=crop"],
        stock: 15, sold: 45, rating: 4.8, reviews: 30, tags: ["promotion"], discount: 12
    },
    {
        name: "PlayStation 5",
        description: "Máy chơi game thế hệ mới từ Sony",
        price: 499,
        originalPrice: 549,
        category: "Gaming",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1000&auto=format&fit=crop"],
        stock: 5, sold: 300, rating: 5, reviews: 250, tags: ["best-seller"], discount: 9
    },
    {
        name: "Nintendo Switch OLED",
        description: "Máy chơi game cầm tay màn hình rực rỡ",
        price: 349,
        originalPrice: 349,
        category: "Gaming",
        image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1000&auto=format&fit=crop"],
        stock: 20, sold: 150, rating: 4.9, reviews: 90, tags: ["new"], discount: 0
    },
    {
        name: "Canon EOS R5",
        description: "Máy ảnh Mirrorless full-frame chuyên nghiệp",
        price: 3899,
        originalPrice: 3899,
        category: "Camera",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1000&auto=format&fit=crop"],
        stock: 3, sold: 15, rating: 5, reviews: 12, tags: ["new"], discount: 0
    },
    {
        name: "DJI Mini 3 Pro",
        description: "Drone nhỏ gọn, quay video 4K siêu nét",
        price: 759,
        originalPrice: 900,
        category: "Camera",
        image: "https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1000&auto=format&fit=crop"],
        stock: 10, sold: 55, rating: 4.7, reviews: 40, tags: ["promotion"], discount: 15
    },
    {
        name: "Kindle Paperwhite",
        description: "Máy đọc sách chống nước, đèn nền ấm",
        price: 139,
        originalPrice: 159,
        category: "Tablet",
        image: "https://images.unsplash.com/photo-1592434134753-a70baf7979d7?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop"],
        stock: 40, sold: 200, rating: 4.9, reviews: 110, tags: ["best-seller"], discount: 12
    },
    {
        name: "ASUS ROG Swift 360Hz",
        description: "Màn hình gaming nhanh nhất thế giới",
        price: 499,
        originalPrice: 599,
        category: "Màn hình",
        image: "https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"],
        stock: 10, sold: 25, rating: 4.6, reviews: 18, tags: ["promotion"], discount: 16
    },
    {
        name: "Razer BlackShark V2",
        description: "Tai nghe gaming âm thanh vòm THX",
        price: 99,
        originalPrice: 120,
        category: "Tai nghe",
        image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1599669435064-d6d52210332f?q=80&w=1000&auto=format&fit=crop"],
        stock: 30, sold: 140, rating: 4.5, reviews: 55, tags: ["best-seller"], discount: 17
    },
    {
        name: "Google Pixel 8 Pro",
        description: "Điện thoại Android với AI thông minh nhất",
        price: 999,
        originalPrice: 999,
        category: "Điện thoại",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop"],
        stock: 15, sold: 60, rating: 4.7, reviews: 35, tags: ["new"], discount: 0
    },
    {
        name: "JBL Flip 6",
        description: "Loa Bluetooth di động, chống nước IP67",
        price: 119,
        originalPrice: 130,
        category: "Loa",
        image: "https://images.unsplash.com/photo-1612441304231-a9d3e3395b04?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1615948812087-67a32816f136?q=80&w=1000&auto=format&fit=crop"],
        stock: 60, sold: 210, rating: 4.8, reviews: 95, tags: ["promotion"], discount: 8
    }
];

async function seedDatabase() {
    try {
        await connection();

        // Xóa sản phẩm cũ (optional)
        await Product.deleteMany({});

        // Insert sản phẩm mới
        const result = await Product.insertMany(sampleProducts);
        console.log(`Đã thêm ${result.length} sản phẩm vào database`);

        process.exit(0);
    } catch (error) {
        console.error("Lỗi khi seed database:", error);
        process.exit(1);
    }
}

seedDatabase();
