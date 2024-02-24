import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import Slider from "react-slick";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Supply() {
  const history = useHistory();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedStage, setMedStage] = useState();
  const [ID, setID] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      var i;
      const medCtr = await supplychain.methods.medicineCtr().call();
      const med = {};
      const medStage = [];
      for (i = 0; i < medCtr; i++) {
        med[i] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to the current network");
    }
  };

  if (loader) {
    return (
      <div>
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }

  const redirect_to_home = () => {
    history.push("/");
  };

  const handlerChangeID = (event) => {
    setID(event.target.value);
  };

  const handlerSubmitRMSsupply = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .RMSsupply(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occurred!!!");
    }
  };

  const handlerSubmitManufacturing = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Manufacturing(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occurred!!!");
    }
  };

  const handlerSubmitDistribute = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Distribute(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occurred!!!");
    }
  };

  const handlerSubmitRetail = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .Retail(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occurred!!!");
    }
  };

  const handlerSubmitSold = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .sold(ID)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occurred!!!");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  return (
    <div>
      <style>
        {"body { background-color: #FFA500;"}
        {`
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
      <br />
      <span>
        <b>Current Account Address:</b> {currentaccount}
      </span>
      <br />
      <br />
      <h6>
        <b>Supply Chain Flow:</b>
      </h6>
      <p>
        Product Order -&gt; Raw Material Supplier -&gt; Manufacturer -&gt;
        Distributor -&gt; Retailer -&gt; Consumer
      </p>

      <div className="container">
        <Slider {...settings} style={{ margin: "auto", maxWidth: "800px" }}>
          {/* Slide 1 */}
          <div>
            <h3>Step 1: Supply Raw Materials</h3>
            <p>
              Only a registered Raw Material Supplier can perform this step.
            </p>
            <form
              onSubmit={handlerSubmitRMSsupply}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <div
                className="custom-input-container"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                <input
                  className="form-control-sm custom-input"
                  type="text"
                  onChange={handlerChangeID}
                  placeholder="Enter Product ID"
                  required
                  style={{ width: "100%" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  width: "100%",
                }}
              >
                <button
                  className="btn custom-btn:hover btn-lg custom-btn"
                  onSubmit={handlerSubmitRMSsupply}
                >
                  Supply
                </button>
              </div>
            </form>
            <br />
            <br />
          </div>

          {/* Slide 2 */}
          <div>
            <h3>Step 2: Manufacture</h3>
            <p>Only a registered Manufacturer can perform this step.</p>
            <form
              onSubmit={handlerSubmitManufacturing}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <div
                className="custom-input-container"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                <input
                  className="form-control-sm custom-input"
                  type="text"
                  onChange={handlerChangeID}
                  placeholder="Enter Product ID"
                  required
                  style={{ width: "100%" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  width: "100%",
                }}
              >
                <button
                  className="btn custom-btn:hover btn-lg custom-btn"
                  onSubmit={handlerSubmitManufacturing}
                >
                  Manufacture
                </button>
              </div>
            </form>
            <br />
            <br />
          </div>

          {/* Slide 3 */}
          <div>
            <h3>Step 3: Distribute</h3>
            <p>Only a registered Distributor can perform this step.</p>
            <form
              onSubmit={handlerSubmitDistribute}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <div
                className="custom-input-container"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                <input
                  className="form-control-sm custom-input"
                  type="text"
                  onChange={handlerChangeID}
                  placeholder="Enter Product ID"
                  required
                  style={{ width: "100%" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  width: "100%",
                }}
              >
                <button
                  className="btn custom-btn:hover btn-lg custom-btn"
                  onSubmit={handlerSubmitDistribute}
                >
                  Distribute
                </button>
              </div>
            </form>
            <br />
            <br />
          </div>

          {/* Slide 4 */}
          <div>
            <h3>Step 4: Retail</h3>
            <p>Only a registered Retailer can perform this step.</p>
            <form
              onSubmit={handlerSubmitRetail}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <div
                className="custom-input-container"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                <input
                  className="form-control-sm custom-input"
                  type="text"
                  onChange={handlerChangeID}
                  placeholder="Enter Product ID"
                  required
                  style={{ width: "100%" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  width: "100%",
                }}
              >
                <button
                  className="btn custom-btn:hover btn-lg custom-btn"
                  onSubmit={handlerSubmitRetail}
                >
                  Retail
                </button>
              </div>
            </form>
            <br />
            <br />
          </div>

          {/* Slide 5 */}
          <div>
            <h3>Step 5: Mark as sold</h3>
            <p>Only a registered Retailer can perform this step.</p>
            <form
              onSubmit={handlerSubmitSold}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <div
                className="custom-input-container"
                style={{ marginBottom: "10px", width: "100%" }}
              >
                <input
                  className="form-control-sm custom-input"
                  type="text"
                  onChange={handlerChangeID}
                  placeholder="Enter Product ID"
                  required
                  style={{ width: "100%" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  width: "100%",
                }}
              >
                <button
                  className="btn custom-btn:hover btn-lg custom-btn"
                  type="submit"
                >
                  Sold
                </button>
              </div>
            </form>
            <br />
            <br />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Supply;
