import React, { useEffect, useState } from "react";
import axios from "../util/axios.customize";
import { Link } from "react-router-dom";
import "../styles/orders.css";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const res = await axios.get("/v1/api/orders");
                if (!mounted) return;
                setOrders(res?.data ?? res ?? []);
            } catch (err) {
                console.error(err);
                if (mounted) setOrders([]);
            }
        };
        load();
        return () => { mounted = false; };
    }, []);

    return (
        <div className="orders-page">
            <h2 className="orders-title">Lịch sử đơn hàng</h2>
            {orders.length === 0 ? (
                <div className="orders-empty">Chưa có đơn hàng</div>
            ) : (
                <ul className="order-list">
                    {orders.map((o) => (
                        <li className="order-item" key={o._id}>
                            <div>
                                <Link className="order-link" to={`/orders/${o._id}`}>Đơn {o._id}</Link>
                            </div>
                            <div className="order-meta">
                                <span className={`order-badge ${
                                    o.status === 'completed' ? 'status-completed' :
                                    o.status === 'cancelled' ? 'status-cancelled' : 'status-pending'
                                }`}>{o.status}</span>
                                &nbsp; - &nbsp; {o.total}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrdersPage;
