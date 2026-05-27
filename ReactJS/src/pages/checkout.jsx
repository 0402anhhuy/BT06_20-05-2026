import React, { useState } from "react";
import axios from "../util/axios.customize";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const CheckoutPage = () => {
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!address || address.trim().length === 0) {
            message.error("Vui lòng nhập địa chỉ giao hàng");
            return;
        }
        try {
            const res = await axios.post("/v1/api/orders/checkout", { paymentMethod: "COD", address });
            if (res && res._id) {
                message.success("Đặt hàng thành công");
                navigate(`/orders/${res._id}`);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            message.error(error?.message || "Lỗi khi đặt hàng");
        }
    };

    return (
        <div className="checkout-container">
            <h2>Thanh toán</h2>
            <div className="checkout-form">
                <div className="checkout-row">
                    <label>Địa chỉ:</label>
                    <input className="checkout-input" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="checkout-actions">
                    <button className="btn btn-primary" disabled={!address || address.trim().length === 0} onClick={handleCheckout}>Xác nhận đặt hàng (COD)</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
