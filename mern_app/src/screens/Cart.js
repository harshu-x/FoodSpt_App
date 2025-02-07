import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h3 className="text-muted">Your Cart is Empty!</h3>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    let response = await fetch("https://foodspt-app.onrender.com/api/auth/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container mt-5">
      <div className="table-responsive">
        <table className="table table-hover text-center">
          <thead className="bg-success text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Option</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>₹{food.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Total Price & Checkout Button */}
      <div className="d-flex flex-column align-items-center mt-4">
        <h2 className="fs-3">Total Price: ₹{totalPrice}</h2>
        <button className="btn btn-lg bg-success text-white mt-3 px-4" onClick={handleCheckOut}>
          Check Out
        </button>
      </div>
    </div>
  );
}
