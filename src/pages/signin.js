import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import formValidation from "../components/formValidation";
import api from "../components/api"; 
import useStore from "../components/store"; 
function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const setUser = useStore((state) => state.setUser); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const isValid = formValidation();
    if (!isValid) {
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }

    try {
      
      const response = await api.get("/users");
      const users = response.data;

     
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        setUser(user); 
        alert("Sign-in successful!");
        navigate("/"); 
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="sign box">
      <div className="signContainer">
        <div className="top box">
          <div>
            <h4>Sign in using</h4>
          </div>
          <div>
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
        <form onSubmit={handleSubmit} id="form">
          <div className="input">
            <p>Email ID</p>
            <div>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="input">
            <p>Password</p>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="sign_botton box">
            <button type="submit">SIGN IN</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Signin;
