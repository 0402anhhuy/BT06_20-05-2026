import { useEffect, useState } from "react";
import axios from "../util/axios.customize";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/v1/api/cart");
            setCart(res || { items: [] });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQty = async (productId, qty) => {
        try {
            setLoading(true);
            await axios.put("/v1/api/cart", { productId, qty });
            await fetchCart();
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (productId) => {
        try {
            setLoading(true);
            await axios.delete(`/v1/api/cart/${productId}`);
            await fetchCart();
        } finally {
            setLoading(false);
        }
    };

    const goCheckout = () => navigate("/checkout");

    const total = cart.items.reduce((s, i) => s + i.price * i.qty, 0);

    return (
        <div className="cart-container">
            <h2>Giỏ hàng</h2>
            {cart.items.length === 0 ? (
                <div className="cart-empty">Giỏ hàng trống. <Link to="/">Mua ngay</Link></div>
            ) : (
                <div>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items.map((it) => {
                                const productId = it.product && (it.product._id || it.product);
                                const key = `${productId || "p"}-${it._id || "s"}`;
                                return (
                                    <tr key={key}>
                                        <td>{it.name}</td>
                                        <td>{it.price}</td>
                                        <td>
                                            <input
                                                className="qty-input"
                                                type="number"
                                                min={1}
                                                value={it.qty}
                                                disabled={loading}
                                                onChange={(e) => updateQty(productId, Number(e.target.value))}
                                            />
                                        </td>
                                        <td>
                                            <div className="cart-actions">
                                                <button className="btn btn-danger" disabled={loading} onClick={() => removeItem(productId)}>Xóa</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="cart-total">
                        <b>Tổng:</b> {total}
                    </div>
                    <div style={{ marginTop: 12 }}>
                        <button className="btn btn-primary" onClick={goCheckout}>Thanh toán</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
