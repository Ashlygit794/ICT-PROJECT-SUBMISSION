import React, { useState } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import AddPackage from '../addPackage/addPackage';
import ViewPackage from '../viewPackage/viewPackage';
import ViewBookings from '../viewBookings/viewBookings';

function Home() {
  const [addFormShow, setAddFormShow] = useState(false);
  const [viewAddedItem, setViewAddedItem] = useState(false);
  const [viewPackBookings, setViewPackBookings] = useState(false);
  const navigate = useNavigate();

  const viewAddedItems = () => {
    console.log('View working..!!');
    setAddFormShow(false);
    setViewAddedItem(true);
    setViewPackBookings(false);
  };

  const addItems = () => {
    console.log('Add working..!!');
    setAddFormShow(true); 
    setViewAddedItem(false);
    setViewPackBookings(false);
  };

  const logOut= () =>
  {
    if(window.confirm('Are you sure want to logout?'))
    {
      localStorage.clear();
      navigate('/login');
    }
  }


  const viewBookings =() =>
  {
    setViewPackBookings(true);
    setViewAddedItem(false);
    setAddFormShow(false);
  }

  return (
    <>
      <header className='bg1'>
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <h2 style={{color: 'white'}} className='heading'>Guide Dashboard</h2>
            </div>
            <div className='col-8 btn-align'>
              <button className='btns' onClick={addItems}>ADD PACKAGE</button>
              <button style={{ marginLeft: 30 }} className='btns' onClick={viewAddedItems}>VIEW ADDED PACKAGES</button>
              <button style={{ marginLeft: 30 }} className='btns' onClick={viewBookings}>BOOKINGS</button>
              <button style={{ marginLeft: 30 }} className='btns' onClick={logOut}>LOGOUT</button>
            </div>
          </div>
        </div>
      </header>

      {addFormShow && <AddPackage/>}
      {viewAddedItem && <ViewPackage />}
      {viewPackBookings && <ViewBookings />}

    </>
  );
}

export default Home;
