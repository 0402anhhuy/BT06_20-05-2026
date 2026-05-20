import { Carousel } from "antd";
import ProductList from "../components/productList";

const HomePage = () => {
    return (
        <div>
            {/* Banner Carousel */}
            <div style={{ marginBottom: "40px" }}>
                <Carousel autoplay>
                    <div>
                        <div
                            style={{
                                height: "300px",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: "36px",
                                fontWeight: "bold",
                            }}
                        >
                            Chào mừng đến cửa hàng
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                height: "300px",
                                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: "36px",
                                fontWeight: "bold",
                            }}
                        >
                            Giảm giá lên đến 50%
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                height: "300px",
                                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: "36px",
                                fontWeight: "bold",
                            }}
                        >
                            Sản phẩm mới mỗi tuần
                        </div>
                    </div>
                </Carousel>
            </div>

            {/* Product List */}
            <ProductList />
        </div>
    );
};

export default HomePage;
