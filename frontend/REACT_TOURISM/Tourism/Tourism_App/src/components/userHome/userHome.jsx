import React, { useState, useEffect } from 'react';
import './userHome.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserHome() {
  const userId = localStorage.getItem('userId');
  const [packages, setPackages] = useState([]);
  const [feedback, setFeedBack] = useState({});
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm('Are you sure want to logout?')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  useEffect(() => {
    const getAddedItems = async () => {
      try {
        const response = await axios.get(`https://localhost:7216/api/User/packages`);
        setPackages(response.data);
        console.log(`Response------>${packages}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getAddedItems();
  }, []);

  const handleFeedbackChange = (recId, value) => {
    setFeedBack({ ...feedback, [recId]: value });
  };

  const handleFeedbackSubmit = async (event, recId) => {
    event.preventDefault();
    try {
      if (feedback[recId] === '') {
        alert('Please enter a feedback before submit..!!');
      } else {
        await axios.post(`https://localhost:7216/api/User/addReview`, {
          userId: userId,
          packageid: recId,
          comment: feedback[recId]
        });
        alert('Feedback submitted successfully!');
        setFeedBack({ ...feedback, [recId]: '' }); // Clear feedback for the specific package
      }
    } catch (err) {
      console.log(`Error while submitting feedback..${err}`);
      alert('Failed to submit Feedback..!!');
    }
  };

  const handleBookNow = async (recId) => {
    try {
      const response = await axios.post(`https://localhost:7216/api/User/bookPackage`, {
        clientid: userId,
        packageid: recId
      });
      if (response.status === 200) {
        alert('Package booked successfully!');
      } else {
        alert('Failed to book package..!!');
      }
    } catch (err) {
      console.log(`Error while booking package..${err}`);
      alert('Failed to book package..!!');
    }
  };

  return (
    <>
      <header className='bg'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-4'>
              <h2 className='heading'>User Dashboard</h2>
            </div>
            <div className='col-8 btn-align'>
              <button className='btns' onClick={logOut}>LOGOUT</button>
            </div>
          </div>
        </div>
      </header>
      <h2 className='packages-heading'>Here are the packages..!!</h2>
      <div className="container">
        <div className="row">
          {packages.map((pack) => (
            <div key={pack.packageid} className="col-md-4 mb-4">
              <div className="card card1">
                <img src={`data:image/jpeg;base64,${pack.imagebase64}`} className="card-img-top" alt={pack.name} />
                <div className="card-body">
                  <h3 className="card-title rec_Name main_ttl">{pack.name}</h3>
                  <p className="card-text expl main_ttl">Price: {pack.price}</p>
                  <p className="card-text expl main_ttl">Details: {pack.details}</p>
                </div>
                <div className='card-body'>
                  <form onSubmit={(e) => handleFeedbackSubmit(e, pack.packageid)}>
                    <label className='card-text expl mb-2 main_ttl'>Feedback</label>
                    <input
                      type="text"
                      className="form-control"
                      value={feedback[pack.packageid] || ''}
                      placeholder="Enter a feedback"
                      aria-label="Feedback"
                      aria-describedby="basic-addon1"
                      onChange={(e) => handleFeedbackChange(pack.packageid, e.target.value)}
                    />
                    <button type="submit" className="btn submit-btn mt-2">Submit Feedback</button>
                  </form>
                  <button
                    className="btn book-now-btn mt-2"
                    onClick={() => handleBookNow(pack.packageid)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserHome;
