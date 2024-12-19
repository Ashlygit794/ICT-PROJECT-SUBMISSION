import React, { useState } from "react";
import './addPackage.css';
import axios from 'axios';
import { use } from "react";

function AddPackage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [pacImg, setPacImg] = useState('');
  const [imgFile, setImgFile] = useState('');
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImgFile(file);
    const reader = new FileReader();
    
    reader.onloadend = () => {
        const base64 = reader.result.split(',')[1];
      console.log(`Baseeee---->${reader.result}`);
      setPacImg(base64);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addAnItem = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post('https://localhost:7216/api/User/addPackage', {
        userid: userId,
        name: name,
        price: price,
        details: details,
        imagebase64: pacImg
      });
      console.log('Response:', response.data.userId);
      if (response.data.packageId != null) {
        window.confirm('Package Added Successfully..!!');
        setName('');
        setPrice('');
        setDetails('');
        setImgFile('');
      } else {
        window.confirm('Failed to add package..!!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      window.confirm('Failed to add package..!!');
    }
  };

  return (
    <>
      <div className='row formAlign'>
        <div className='addForm'>
          <form onSubmit={addAnItem}>
            <legend style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Add Your Package</legend>
            <div className="mb-3">
              <label style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }} htmlFor="recipeName" className="form-label">Package Name</label>
              <input type="text" value={name} className="form-control" id="recipeName" onChange={(e) => setName(e.target.value)} required aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }} htmlFor="ingrediants" className="form-label">Price</label>
              <input type="text" value={price} className="form-control" onChange={(e) => setPrice(e.target.value)} required id="ingrediants" />
            </div>
            <div className="mb-3">
              <label style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }} htmlFor="explanation" className="form-label">Details</label>
              <input type="text" value={details} className="form-control" onChange={(e) => setDetails(e.target.value)} required id="explanation" />
            </div>
            <div className="mb-3">
              <label style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }} htmlFor="formFile" className="form-label">Recipe Image</label>
              <input className="form-control" type="file" id="formFile" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPackage;
