import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <style>
        {`
         
         /* ... (existing styles) */

    /* Style for navbar links */
    .navbar-nav a {
      color: white;
      transition: color 0.3s ease; /* Add a smooth transition effect */
    }

    /* Custom text color */
    .custom-text-color {
      color: white;
    }
    .custom-bold {
      font-weight: bold;
    }

    .custom-btn {
      background-color: #000;
      color: white;
      border-color: white;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .custom-btn:hover {
      color: #000; 
      background-color: white;
    }

    .navbar-nav a:hover {
      color: #FFA500; 
    }
          .main-div {
            display: flex;
            flex-direction: row;
            height: 100vh;
          }

          .col1 {
            width: 50%;
            background-image: url('./bgimage.jpg');
            background-size: cover;
            background-repeat: no-repeat;
          }

          .col2-jumbotron {
            background-color: #FFA500;
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            text-align: center;
          }
          .blockchain-gif {
            margin-bottom: 10px; /* Adjusted margin to move below the title */
            max-height: 160px;
          }
        `}
      </style>

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
            <li className="nav-item active">
              <Link className="nav-link" to="/roles">
                Register <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/addproduct">
                Order Products <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/supply">
                Control Supply Chain <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/track">
                Track Products <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-div">
        {/* First column: Image */}
        <div className="col1"></div>

        {/* Second column: Get Started content */}
        <div className="col2-jumbotron">
          <h1 className="display-4 custom-bold">WELCOME!!</h1>
          <p className="lead">
            Our supply chain system manages how things get from where they're
            made to where they're needed, making it smooth and efficient.
          </p>
          <p className="custom-text-color custom-bold">
            Unlocking efficiency, enhancing connectivity: Revolutionize your
            supply chain effortlessly.
          </p>
          <img
            src="./blockchain.gif" // Update the path to your GIF
            alt="Animated GIF"
            className="blockchain-gif"
          />
          <p className="lead">
            <Link
              className="btn custom-btn:hover btn-lg custom-btn"
              to="/Homesec"
              role="button"
            >
              Get Started
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Home;
