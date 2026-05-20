import React, { useEffect, useState } from "react";
import axios from "../util/axios.customize";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    const fetch = async () => {
        const res = await axios.get(`/v1/api/orders/${id}`);
        setOrder(res);
    };

    useEffect(() => {
        fetch();
    }, [id]);

    const handleCancel = async () => {
        try {
            const res = await axios.post(`/v1/api/orders/${id}/cancel`);
            setOrder(res);
        } catch (error) {
            alert(error?.message || "Lỗi");
        }
    };

    if (!order) return <div>Đang tải...</div>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Chi tiết đơn</h2>
            <div>Trạng thái: {order.status}</div>
            <div>Tổng: {order.total}</div>
            <div>
                <h4>Items</h4>
                <ul>
                    {order.items.map((it) => (
                        <li key={it._id || it.product}>{it.name} - {it.qty} x {it.price}</li>
                    ))}
                </ul>
            </div>
            <div style={{ marginTop: 12 }}>
                <button onClick={handleCancel}>Yêu cầu hủy / Hủy</button>
            </div>
        </div>
    );
};

export default OrderDetail;
