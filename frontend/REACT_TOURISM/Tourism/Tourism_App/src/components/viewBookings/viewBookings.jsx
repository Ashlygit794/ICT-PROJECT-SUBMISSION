import axios from 'axios';
import { useState, useEffect } from 'react';
import './viewBookings.css';

function ViewBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`https://localhost:7216/api/User/packageDetailsByUser/${userId}`);
        setBookings(response.data);
        console.log('Response------>', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h2 style={{color:'red', fontWeight: 'bold'}} className="text-center mb-4">Your Bookings</h2>
      <div className="row">
        {bookings.map((booking, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Package: {booking.p}</h5>
                <p className="card-text">Email: {booking.clientEmail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewBookings;
