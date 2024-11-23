import React, { useEffect, useState } from 'react';
import useEcomStore from '@/store/ecom-store'; 
import moment from 'moment';

const OrderSuccess = () => {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const orders = useEcomStore((state) => state.order); 
  const fetchOrders = useEcomStore((state) => state.fetchOrders); 
  const token = useEcomStore((state) => state.token) || localStorage.getItem('authToken'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error('No valid token found. Please log in again.');
        }
        await fetchOrders(token); 
        setLoading(false); 
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized: Please log in again.');
        } else {
          setError(err.message); 
        }
        setLoading(false); 
      }
    };

    fetchData(); 
  }, [fetchOrders, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Order History</h1>
      {orders && orders.length > 0 ? (
        orders.map((order,index) => (
          <div key={index} className="mb-6 bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Order #{order.id}</h2>
            <p className="text-sm text-gray-600">
              <strong>Date:</strong> {moment(order?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Status:</strong> {order?.status}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Amount:</strong> ฿{order?.amount}
            </p>

            <div className="mt-4">
              <h3 className="text-md font-semibold text-gray-700">Items:</h3>
              <ul>
                {order.products.map((item) => (
                  <li key={item.id} className="text-sm text-gray-600">
                    {item.product.title} - {item.count} x ฿{item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderSuccess;
