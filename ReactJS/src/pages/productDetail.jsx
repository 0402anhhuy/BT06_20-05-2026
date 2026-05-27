import { useState, useEffect } from "react";
import {
    Row,
    Col,
    Card,
    Button,
    InputNumber,
    Image,
    Space,
    Spin,
    Empty,
    Rate,
    Tag,
    Divider,
    message,
} from "antd";
import { ShoppingCartOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../util/axios.customize";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/v1/api/products/${id}`);
                setProduct(response);

                // Fetch related products
                if (response.category) {
                    const relatedRes = await axios.get(
                        `/v1/api/products/category/${response.category}`
                    );
                    setRelatedProducts(relatedRes || []);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
            setLoading(false);
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "50px" }}>
                <Spin />
            </div>
        );
    }

    if (!product) {
        return <Empty description="Sản phẩm không tồn tại" />;
    }

    const discount = product.discount || 0;
    const finalPrice = product.price;
    const originalPrice = product.originalPrice || product.price;

    const addToCart = async () => {
        try {
            await axios.post("/v1/api/cart", { productId: id, qty: quantity });
            message.success("Đã thêm vào giỏ hàng");
        } catch (error) {
            console.error("Error adding to cart:", error);
            message.error(error?.message || "Lỗi khi thêm vào giỏ hàng");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* Back Button */}
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate(-1)}
                style={{ marginBottom: "20px" }}
            >
                Quay lại
            </Button>

            {/* Product Detail */}
            <Card>
                <Row gutter={[32, 32]}>
                    {/* Images */}
                    <Col xs={24} md={10}>
                        <div
                            style={{
                                backgroundColor: "#f0f0f0",
                                borderRadius: "8px",
                                padding: "16px",
                            }}
                        >
                            <Image
                                src={
                                    product.image ||
                                    "https://via.placeholder.com/400x400?text=Product"
                                }
                                alt={product.name}
                                style={{
                                    width: "100%",
                                    borderRadius: "4px",
                                }}
                            />
                        </div>

                        {/* Gallery */}
                        {product.images && product.images.length > 0 && (
                            <Row gutter={[8, 8]} style={{ marginTop: "12px" }}>
                                {product.images.slice(0, 4).map((img, idx) => (
                                    <Col key={idx} xs={6}>
                                        <div
                                            style={{
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "4px",
                                                overflow: "hidden",
                                                cursor: "pointer",
                                                aspectRatio: "1",
                                            }}
                                        >
                                            <Image
                                                src={img}
                                                alt={`Gallery ${idx}`}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                                preview={false}
                                            />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Col>

                    {/* Info */}
                    <Col xs={24} md={14}>
                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div style={{ marginBottom: "12px" }}>
                                {product.tags.map((tag) => (
                                    <Tag
                                        key={tag}
                                        color={
                                            tag === "best-seller"
                                                ? "red"
                                                : tag === "new"
                                                ? "green"
                                                : "blue"
                                        }
                                    >
                                        {tag === "best-seller"
                                            ? "Bán chạy"
                                            : tag === "new"
                                            ? "Mới"
                                            : "Khuyến mãi"}
                                    </Tag>
                                ))}
                            </div>
                        )}

                        <h1>{product.name}</h1>

                        {/* Rating */}
                        <div style={{ marginBottom: "16px" }}>
                            <Rate
                                disabled
                                defaultValue={product.rating || 5}
                            />
                            <span style={{ marginLeft: "8px" }}>
                                ({product.reviews || 0} đánh giá)
                            </span>
                        </div>

                        <Divider />

                        {/* Price */}
                        <div style={{ marginBottom: "16px" }}>
                            <span style={{ fontSize: "24px", fontWeight: 700 }}>
                                ${finalPrice?.toFixed(2)}
                            </span>
                            {originalPrice && (
                                <span
                                    style={{
                                        fontSize: "16px",
                                        textDecoration: "line-through",
                                        marginLeft: "12px",
                                        color: "#999",
                                    }}
                                >
                                    ${originalPrice.toFixed(2)}
                                </span>
                            )}
                            {discount > 0 && (
                                <span
                                    style={{
                                        marginLeft: "12px",
                                        color: "#ff4d4f",
                                        fontWeight: 600,
                                    }}
                                >
                                    -{discount}%
                                </span>
                            )}
                        </div>

                        {/* Stock */}
                        <div style={{ marginBottom: "16px" }}>
                            <strong>Kho hàng:</strong>{" "}
                            <span
                                style={{
                                    color:
                                        product.stock > 0
                                            ? "#52c41a"
                                            : "#ff4d4f",
                                }}
                            >
                                {product.stock > 0
                                    ? `${product.stock} sản phẩm`
                                    : "Hết hàng"}
                            </span>
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                            <strong>Đã bán:</strong> {product.sold || 0}
                        </div>

                        <Divider />

                        {/* Quantity & Add to Cart */}
                        <div style={{ marginBottom: "16px" }}>
                            <span style={{ marginRight: "16px" }}>
                                <strong>Số lượng:</strong>
                            </span>
                            <InputNumber
                                min={1}
                                max={product.stock}
                                value={quantity}
                                onChange={setQuantity}
                                style={{ width: "80px" }}
                            />
                        </div>

                        <Space style={{ width: "100%" }}>
                            <Button
                                type="primary"
                                size="large"
                                icon={<ShoppingCartOutlined />}
                                disabled={product.stock <= 0}
                                block
                                onClick={addToCart}
                            >
                                Thêm vào giỏ ({quantity})
                            </Button>
                        </Space>

                        <Divider />

                        {/* Description */}
                        <div>
                            <strong>Mô tả:</strong>
                            <p>{product.description}</p>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <>
                    <h3 style={{ marginTop: "40px", marginBottom: "16px" }}>
                        Sản phẩm tương tự
                    </h3>
                    <Row gutter={[16, 16]}>
                        {relatedProducts.slice(0, 4).map((item) => (
                            <Col key={item._id} xs={24} sm={12} md={6}>
                                <Card
                                    hoverable
                                    style={{ height: "100%" }}
                                    cover={
                                        <div
                                            style={{
                                                height: "150px",
                                                backgroundColor: "#f0f0f0",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <img
                                                alt={item.name}
                                                src={
                                                    item.image ||
                                                    "https://via.placeholder.com/200x150?text=Product"
                                                }
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                    }
                                    onClick={() =>
                                        navigate(`/product/${item._id}`)
                                    }
                                >
                                    <p style={{ fontSize: "12px" }}>
                                        {item.name}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            color: "#ff4d4f",
                                        }}
                                    >
                                        ${item.price?.toFixed(2)}
                                    </p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </div>
    );
};

export default ProductDetail;
