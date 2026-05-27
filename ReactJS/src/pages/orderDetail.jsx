import { useEffect, useState } from "react";
import axios from "../util/axios.customize";
import { useParams } from "react-router-dom";
import "../styles/orderDetail.css";

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const res = await axios.get(`/v1/api/orders/${id}`);
                if (mounted) setOrder(res?.data ?? res);
            } catch (err) {
                console.error(err);
            }
        };
        load();
        return () => { mounted = false; };
    }, [id]);

    const handleCancel = async () => {
        try {
            const res = await axios.post(`/v1/api/orders/${id}/cancel`);
            setOrder(res?.data ?? res);
        } catch (error) {
            alert(error?.message || "Lỗi");
        }
    };

    if (!order) return <div>Đang tải...</div>;

    return (
        <div className="order-detail">
            <div className="order-header">
                <h2 className="order-title">Chi tiết đơn</h2>
                <div className="order-info">
                    <div>Trạng thái: <strong>{order.status}</strong></div>
                    <div className="order-total">Tổng: {order.total}</div>
                </div>
            </div>

            <div className="order-items">
                <h4>Items</h4>
                <ul>
                    {order.items.map((it) => (
                        <li className="order-item" key={it._id || it.product}>
                            <span>{it.name} ({it.qty})</span>
                            <span>{it.price}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="order-actions">
                <button className="btn-cancel" onClick={handleCancel}>Yêu cầu hủy / Hủy</button>
            </div>
        </div>
    );
};

export default OrderDetail;
