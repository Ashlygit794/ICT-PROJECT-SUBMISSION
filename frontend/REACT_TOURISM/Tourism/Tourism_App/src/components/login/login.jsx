import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:7216/api/User/login', {
        usertype: userType,
        email: email,
        password: password
      });
      console.log('Response:', response.data.userId);
      if (response.data.userId != null) {

        if (userType === 'GUIDE') {
          navigate('/home')
          localStorage.setItem('userId', response.data.userId)
          window.confirm('Login Successfully..!!')
          setEmail('');
          setPassword('');
          setUserType('Select User Type');
        }
        else {
          navigate('/userHome')
          localStorage.setItem('userId', response.data.userId)
          window.confirm('Login Successfully..!!')
          setEmail('');
          setPassword('');
          setUserType('Select User Type');
        }
      }
      else {
        window.confirm('Login Denied..!!')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      window.confirm('Login Denied..!!')
    }
  };

  const changeUser = (event) => {
    setUserType(event.target.value);
  };

  return (
    <>

      <div className="page-wrapper bg-red p-t-180 p-b-100 font-robo">
        <div className="wrapper wrapper--w960">
          <div className="card card-2">
            <div className="card-heading"></div>
            <div className="card-body">
              <h2 className="title">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="row row-space">
                  <div className="col-2">
                  </div>
                </div>
                <div className="input-group">
                  <div className="rs-select2 js-select-simple select--no-search">
                    <select className="slctClss" name="userType" id="userType" value={userType} onChange={changeUser} required>
                      <option className="slctClss" value="">Select User Type</option>
                      <option className="slctClss" value="GUIDE">Guide</option>
                      <option className="slctClss" value="USER">User</option>
                    </select>
                    <div className="select-dropdown"></div>
                  </div>
                </div>

                <div className="input-group">
                  <input className="input--style-2" type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="row row-space">
                  <div className="col-2">
                    <div className="input-group">
                      <input style={{border: 'none'}} className="input--style-2 form-control" type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                  </div>
                </div>
                <div className="p-t-30">
                  <button className="btn btn--radius btn--green" type="submit">SUBMIT</button>
                </div>
                <div className='mt-2'>
                  <p><a style={{color: 'red', fontWeight: 500}} href='/'>Not a user ? Click here to signup</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </>

  );
}

export default Login;
