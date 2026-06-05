import React from 'react';
import type { OrderHistoryItem } from '../../types/customer';
import './OrderHistory.css';

interface OrderHistoryProps {
  orders: OrderHistoryItem[];
}

const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    processing: '#bca171',
    shipped: '#7c99c9',
    delivered: '#306151',
    returned: '#af6262',
    cancelled: '#6b7280'
  };
  return statusColors[status] || '#6b7280';
};

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    returned: 'Returned',
    cancelled: 'Cancelled'
  };
  return labels[status] || status;
};

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="order-history-container">
        <p className="no-orders-message">No orders found</p>
      </div>
    );
  }

  return (
    <div className="order-history-container glass animate-slide-up">
      <h2 className="order-history-title">Your Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-meta">
                <h3 className="order-id">Order {order.id}</h3>
                <span className="order-date">
                  {new Date(order.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div>
                <h3 className="order-id">Status: </h3>
                <div
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusLabel(order.status)}
                </div>
              </div>
            </div>

            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item">
                    <div className='item-image'><img src={item.image} alt={item.productName} /></div>
                  <div className="item-details">
                    
                    <p className="item-name">{item.productName}</p>
                    <p className="item-meta">
                      {item.brand} • {item.color} • Size: {item.size}
                    </p>
                  </div>
                  <div className="item-quantity">x{item.quantity}</div>
                  <div className="item-price">
                    {order.currency}{item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                <span className="total-label">Total:</span>
                <span className="total-amount">
                  {order.currency}{order.total.toFixed(2)}
                </span>
              </div>
              {order.trackingNumber && (
                <div className="tracking-info">
                  <span className="tracking-label">Tracking: {order.trackingNumber}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
