import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    arenaType: "",
    geolocation: "",
    price: "",
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createArena", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        arenaType: credentials.arenaType,
        location: credentials.geolocation,
        price: credentials.price,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const position = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        console.log(position)
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        
      } catch (error) {
        console.log(error);
      }
    };
    position();
    
  }, []); 

  useEffect(() => {
    fetch_address();
  }, [latitude, longitude]);

  const fetch_address=()=>{
    if (latitude !== null && longitude !== null) {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const address = data.display_name;
          console.log("Address from home:", address);
          setCredentials({ ...credentials, geolocation: address });
        })
        .catch(error => {
          console.error("Error getting address:", error);
        });
      }
      else{
        console.error("Latitude or longitude is null");
      }
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <form
          className="w-50 m-auto mt-5 border border-info rounded"
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Arena Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
          <label htmlFor="arenaType" className="form-label">
              Arena Type
            </label>
            <select className="form-select" aria-label="Default select example"
            name="arenaType"
            onChange={onChange}
            value={credentials.arenaType}
            >
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="m-3">
            <label for="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          
          <div className="m-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>

            <input
              type="text"
              className="form-control"
              name="geolocation"
              placeholder='"Click on Allow for fetching address"'
              value={credentials.geolocation}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={credentials.price}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          {console.log(credentials)};
         
          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
