import React, { useState } from "react";
import axios from "../util/axios.customize";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleCheckout = async () => {
        const res = await axios.post("/v1/api/orders/checkout", { paymentMethod: "COD", address });
        if (res && res._id) {
            navigate(`/orders/${res._id}`);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Thanh toán</h2>
            <div>
                <label>Địa chỉ: </label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div style={{ marginTop: 12 }}>
                <button onClick={handleCheckout}>Xác nhận đặt hàng (COD)</button>
            </div>
        </div>
    );
};

export default CheckoutPage;
