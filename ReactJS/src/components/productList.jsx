import { useState, useEffect, useCallback } from "react";
import {
    Row,
    Col,
    Card,
    Button,
    Badge,
    Rate,
    Input,
    Select,
    Pagination,
    Spin,
    Empty,
    Space,
    Tag,
} from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "../util/axios.customize";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [filters, setFilters] = useState({
        search: "",
        sort: "newest",
        page: 1,
        limit: 12,
    });

    const fetchProducts = useCallback(
        async (query = {}) => {
            setLoading(true);
            try {
                const params = { ...filters, ...query };
                const response = await axios.get("/v1/api/products", {
                    params,
                });
                setProducts(response.products || []);
                setPagination(response.pagination || {});
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setLoading(false);
        },
        [filters],
    );

    useEffect(() => {
        (async () => {
            try {
                await fetchProducts();
            } catch (err) {
                console.error(err);
            }
        })();
    }, [fetchProducts]);

    const handleSearch = (value) => {
        setFilters({ ...filters, search: value, page: 1 });
        fetchProducts({ search: value, page: 1 });
    };

    const handleSort = (value) => {
        setFilters({ ...filters, sort: value, page: 1 });
        fetchProducts({ sort: value, page: 1 });
    };

    const handlePageChange = (page) => {
        setFilters({ ...filters, page });
        fetchProducts({ page });
    };

    const renderProductCard = (product) => (
        <Card
            key={product._id}
            hoverable
            cover={
                <div
                    style={{
                        height: "200px",
                        overflow: "hidden",
                        backgroundColor: "#f0f0f0",
                    }}
                >
                    <img
                        alt={product.name}
                        src={
                            product.image ||
                            "https://via.placeholder.com/300x200?text=Product"
                        }
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>
            }
            className="product-card"
        >
            <Badge
                count={`-${product.discount || 0}%`}
                style={{
                    backgroundColor: product.tags?.includes("promotion")
                        ? "#ff4d4f"
                        : "#1890ff",
                }}
            />
            <h3
                style={{ fontSize: "14px", fontWeight: 600, minHeight: "40px" }}
            >
                {product.name}
            </h3>

            {/* Tags */}
            <div style={{ marginBottom: "8px" }}>
                {product.tags?.map((tag) => (
                    <Tag
                        key={tag}
                        color={
                            tag === "best-seller"
                                ? "red"
                                : tag === "new"
                                  ? "green"
                                  : "blue"
                        }
                        style={{ fontSize: "11px" }}
                    >
                        {tag === "best-seller"
                            ? "Bán chạy"
                            : tag === "new"
                              ? "Mới"
                              : "Khuyến mãi"}
                    </Tag>
                ))}
            </div>

            {/* Rating */}
            <div style={{ marginBottom: "8px" }}>
                <Rate
                    disabled
                    defaultValue={product.rating || 5}
                    style={{ fontSize: "12px" }}
                />
                <span style={{ fontSize: "12px", marginLeft: "4px" }}>
                    ({product.reviews || 0})
                </span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: "8px" }}>
                <span
                    style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#ff4d4f",
                    }}
                >
                    ${product.price?.toFixed(2)}
                </span>
                {product.originalPrice && (
                    <span
                        style={{
                            fontSize: "12px",
                            textDecoration: "line-through",
                            marginLeft: "8px",
                            color: "#999",
                        }}
                    >
                        ${product.originalPrice.toFixed(2)}
                    </span>
                )}
            </div>

            {/* Stock */}
            <div style={{ marginBottom: "12px" }}>
                <span
                    style={{
                        fontSize: "12px",
                        color: product.stock > 0 ? "#52c41a" : "#ff4d4f",
                    }}
                >
                    {product.stock > 0 ? `Còn ${product.stock}` : "Hết hàng"}
                </span>
            </div>

            {/* Buttons */}
            <Space style={{ width: "100%" }}>
                <Link to={`/product/${product._id}`} style={{ flex: 1 }}>
                    <Button type="primary" block>
                        Xem chi tiết
                    </Button>
                </Link>
                <Button
                    icon={<ShoppingCartOutlined />}
                    disabled={product.stock <= 0}
                />
            </Space>
        </Card>
    );

    return (
        <div style={{ padding: "20px" }}>
            {/* Header */}
            <div
                style={{
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    flexWrap: "wrap",
                }}
            >
                <h2>Danh sách sản phẩm</h2>

                {/* Search */}
                <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    prefix={<SearchOutlined />}
                    style={{ maxWidth: "300px" }}
                    allowClear
                    onChange={(e) => handleSearch(e.target.value)}
                />

                {/* Sort */}
                <Select
                    defaultValue="newest"
                    onChange={handleSort}
                    style={{ minWidth: "150px" }}
                    options={[
                        { label: "Mới nhất", value: "newest" },
                        { label: "Bán chạy", value: "best-seller" },
                        { label: "Giá thấp đến cao", value: "price-asc" },
                        { label: "Giá cao đến thấp", value: "price-desc" },
                    ]}
                />
            </div>

            {/* Products Grid */}
            {loading ? (
                <div style={{ textAlign: "center", padding: "50px" }}>
                    <Spin />
                </div>
            ) : products.length === 0 ? (
                <Empty description="Không tìm thấy sản phẩm" />
            ) : (
                <>
                    <Row gutter={[16, 16]}>
                        {products.map((product) => (
                            <Col
                                key={product._id}
                                xs={24}
                                sm={12}
                                md={8}
                                lg={6}
                            >
                                {renderProductCard(product)}
                            </Col>
                        ))}
                    </Row>

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <div
                            style={{
                                marginTop: "20px",
                                textAlign: "center",
                            }}
                        >
                            <Pagination
                                current={pagination.page}
                                total={pagination.total}
                                pageSize={pagination.limit}
                                onChange={handlePageChange}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductList;
