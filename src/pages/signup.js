import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import api from "../components/api"; 
import formValidation from "../components/formValidation";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); 

  
  const signUpMutation = useMutation(
    (newUser) => api.post("/users", newUser),
    {
      onSuccess: (data) => {
        console.log("API Response:", data);
        alert("Registration successful! Redirecting to Sign In page.");
        navigate("/signin"); 
      },
      onError: (error) => {
        console.error("API Error:", error);
        alert("Failed to sign up. Please try again.");
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    
    const isValid = formValidation();
    if (!isValid) {
      console.log("Validation failed.");
      return;
    }

    console.log("Triggering mutation with data:", formData);
    signUpMutation.mutate(formData);
  };

  return (
    <section className="sign box">
      <div className="signContainer">
        <form onSubmit={handleSubmit}>
          <div className="top box">
            <div>
              <h4>Sign Up</h4>
            </div>
            <div>
              <Link to="/signin">Sign In</Link>
            </div>
          </div>
          <div className="input">
            <p>Name</p>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                
              />
            </div>
          </div>
          <div className="input">
            <p>Email ID</p>
            <div>
              <input
                type="email"
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
          <div className="sign_botton box">
            <button type="submit" disabled={signUpMutation.isLoading}>
              {signUpMutation.isLoading ? "Registering..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
