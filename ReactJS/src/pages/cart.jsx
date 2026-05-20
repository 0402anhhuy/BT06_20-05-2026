import React, { useEffect, useState } from "react";
import axios from "../util/axios.customize";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
    const [cart, setCart] = useState({ items: [] });
    const navigate = useNavigate();

    const fetchCart = async () => {
        const res = await axios.get("/v1/api/cart");
        setCart(res || { items: [] });
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQty = async (productId, qty) => {
        await axios.put("/v1/api/cart", { productId, qty });
        fetchCart();
    };

    const removeItem = async (productId) => {
        await axios.delete(`/v1/api/cart/${productId}`);
        fetchCart();
    };

    const goCheckout = () => navigate("/checkout");

    const total = cart.items.reduce((s, i) => s + i.price * i.qty, 0);

    return (
        <div style={{ padding: 20 }}>
            <h2>Giỏ hàng</h2>
            {cart.items.length === 0 ? (
                <div>Giỏ hàng trống. <Link to="/">Mua ngay</Link></div>
            ) : (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.items.map((it) => (
                                <tr key={it._id || it.product._id}>
                                    <td>{it.name}</td>
                                    <td>{it.price}</td>
                                    <td>
                                        <input type="number" value={it.qty} onChange={(e) => updateQty(it.product || it.product?._id, Number(e.target.value))} />
                                    </td>
                                    <td>
                                        <button onClick={() => removeItem(it.product || it.product?._id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ marginTop: 12 }}>
                        <b>Tổng:</b> {total}
                    </div>
                    <div style={{ marginTop: 12 }}>
                        <button onClick={goCheckout}>Thanh toán</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
