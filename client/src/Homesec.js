import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Homesec() {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);

  const redirect_to_roles = () => {
    history.push("/roles");
  };

  const redirect_to_addproduct = () => {
    history.push("/addproduct");
  };

  const redirect_to_supply = () => {
    history.push("/supply");
  };

  const redirect_to_track = () => {
    history.push("/track");
  };

  const backgroundImagePath = "url(./image1.jpeg)"; // Replace 'your_image_path.jpg' with the actual path to your image
  const handleStepClick = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  const steps = [
    {
      title: "Step 1",
      description:
        "Owner Should Register Raw material suppliers, Manufacturers, Distributors and Retailers",
      buttonText: "Register",
      onClick: redirect_to_roles,
    },
    {
      title: "Step 2",
      description: "Owner should order products",
      buttonText: "Order Products",
      onClick: redirect_to_addproduct,
    },
    {
      title: "Step 3",
      description: "Control Supply Chain",
      buttonText: "Control Supply Chain",
      onClick: redirect_to_supply,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (index) => setActiveStep(index),
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Supply chain
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/roles">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addproduct">
                Order Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/supply">
                Control Supply Chain
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/track">
                Track Products
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div
        style={{
          backgroundColor: "#FFA500",
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <style>
          {`
            /* Your existing styles remain unchanged */
            .slick-prev,
            .slick-next {
              color: #007bff;
            }
            .custom-btn {
              background-color: #000;
              color: white;
              border-color: white;
              transition: background-color 0.3s ease, color 0.3s ease;
            }
        
            .custom-btn:hover {
              color: #000; 
              background-color: #FFA500;
            }
          `}
        </style>

        <span style={{ color: "black" }}>
          <h3>
            <center>Supply Chain Flow</center>
          </h3>
          <br />

          <div className="container">
            <Slider
              {...settings}
              style={{
                width: "70%",
                margin: "auto",
                minHeight: "300px",
                backgroundColor: "white",
              }}
            >
              {steps.map((step, index) => (
                <div
                  className={`step ${index === activeStep ? "active" : ""}`}
                  key={index}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="step-content">
                    <h5>
                      <center>{step.title}</center>
                      <center>{step.description}</center>
                    </h5>
                  </div>
                  <center>
                    <button
                      onClick={step.onClick}
                      className="btn custom-btn:hover custom-btn btn-sm btn-step"
                    >
                      <center>{step.buttonText}</center>
                    </button>
                  </center>
                </div>
              ))}
            </Slider>

            <div className="row track-container">
              <div className="col-md-12">
                <h5 style={{ marginBottom: "20px", marginTop: "20px" }}>
                  <center>Track the products</center>
                </h5>
                <center>
                  <button
                    onClick={redirect_to_track}
                    className="btn custom-btn:hover custom-btn btn-sm btn-track"
                  >
                    <center>Track Products</center>
                  </button>
                </center>
              </div>
            </div>
          </div>
        </span>
      </div>
    </>
  );
}

export default Homesec;
