import React, { useEffect, useState } from "react";
import axios from "../util/axios.customize";
import { Link } from "react-router-dom";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    const fetch = async () => {
        const res = await axios.get("/v1/api/orders");
        setOrders(res || []);
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Lịch sử đơn hàng</h2>
            {orders.length === 0 ? (
                <div>Chưa có đơn hàng</div>
            ) : (
                <ul>
                    {orders.map((o) => (
                        <li key={o._id}>
                            <Link to={`/orders/${o._id}`}>Đơn {o._id}</Link> - {o.status} - {o.total}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrdersPage;
