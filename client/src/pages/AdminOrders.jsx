import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from your API endpoint
    // Replace 'your_api_endpoint' with your actual API endpoint to fetch orders
    fetch("/api/getorders")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div key={order._id} className="p-4 border rounded shadow mb-4">
            <h2 className="text-lg font-bold mb-2">Order ID: {order._id}</h2>
            <div className="mb-2">
              <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
            </div>
            <div className="mb-2">
              <strong>User ID:</strong> {order.userID}
            </div>
            {/* <div className="mb-4">
              <strong>Address:</strong> {JSON.stringify(order.customerAddress)}
            </div> */}
            <h3 className="text-lg font-bold mb-2">Address Details:</h3>
            <ul>
              {/* {order.customerAddress.map((address, index) => ( */}
              <li>
                <div>
                  <strong>Shipping Address:</strong>{" "}
                  {order.customerAddress.bilingAddress}
                </div>
                <div>
                  <strong>State:</strong> {order.customerAddress.state}
                </div>
                <div>
                  <strong>ZIP:</strong> {order.customerAddress.zip}
                </div>
                <hr />
              </li>
              {/* ))} */}
            </ul>
            <h3 className="text-lg font-bold mb-2">Order Details:</h3>
            <ul>
              {/* {order.products} */}
              {order.products.map((product, index) => (
                <li key={index}>
                  <div>
                    <strong>Product Name:</strong> {product.productName}
                  </div>
                  <div>
                    <strong>Price:</strong> ${product.price.toFixed(2)}
                  </div>
                  <div>
                    <strong>Product ID:</strong> {product.productID}
                  </div>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
