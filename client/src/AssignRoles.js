import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AssignRoles() {
  const history = useHistory();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);
  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [RMSname, setRMSname] = useState();
  const [MANname, setMANname] = useState();
  const [DISname, setDISname] = useState();
  const [RETname, setRETname] = useState();
  const [RMSplace, setRMSplace] = useState();
  const [MANplace, setMANplace] = useState();
  const [DISplace, setDISplace] = useState();
  const [RETplace, setRETplace] = useState();
  const [RMSaddress, setRMSaddress] = useState();
  const [MANaddress, setMANaddress] = useState();
  const [DISaddress, setDISaddress] = useState();
  const [RETaddress, setRETaddress] = useState();
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();

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
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      const retCtr = await supplychain.methods.retCtr().call();
      const ret = {};
      for (i = 0; retCtr < retCtr; i++) {
        ret[i] = await supplychain.methods.RET(i + 1).call();
      }
      setRET(ret);
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

  const handlerChangeAddressRMS = (event) => {
    setRMSaddress(event.target.value);
  };

  const handlerChangePlaceRMS = (event) => {
    setRMSplace(event.target.value);
  };

  const handlerChangeNameRMS = (event) => {
    setRMSname(event.target.value);
  };

  const handlerChangeAddressMAN = (event) => {
    setMANaddress(event.target.value);
  };

  const handlerChangePlaceMAN = (event) => {
    setMANplace(event.target.value);
  };

  const handlerChangeNameMAN = (event) => {
    setMANname(event.target.value);
  };

  const handlerChangeAddressDIS = (event) => {
    setDISaddress(event.target.value);
  };

  const handlerChangePlaceDIS = (event) => {
    setDISplace(event.target.value);
  };

  const handlerChangeNameDIS = (event) => {
    setDISname(event.target.value);
  };

  const handlerChangeAddressRET = (event) => {
    setRETaddress(event.target.value);
  };

  const handlerChangePlaceRET = (event) => {
    setRETplace(event.target.value);
  };

  const handlerChangeNameRET = (event) => {
    setRETname(event.target.value);
  };

  const handlerSubmitRMS = async (event) => {
    event.preventDefault();
    try {
      var receipt = await SupplyChain.methods
        .addRMS(RMSaddress, RMSname, RMSplace)
        .send({ from: currentaccount });
      if (receipt) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occurred!!!");
    }
  };

  const handlerSubmitMAN = async (event) => {
    event.preventDefault();
    try {
      var receipt = await SupplyChain.methods
        .addManufacturer(MANaddress, MANname, MANplace)
        .send({ from: currentaccount });
      if (receipt) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occurred!!!");
    }
  };

  const handlerSubmitDIS = async (event) => {
    event.preventDefault();
    try {
      var receipt = await SupplyChain.methods
        .addDistributor(DISaddress, DISname, DISplace)
        .send({ from: currentaccount });
      if (receipt) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occurred!!!");
    }
  };

  const handlerSubmitRET = async (event) => {
    event.preventDefault();
    try {
      var receipt = await SupplyChain.methods
        .addRetailer(RETaddress, RETname, RETplace)
        .send({ from: currentaccount });
      if (receipt) {
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
              background-color: #FFA500;
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

      <br></br>

      <span>
        <b>Current Account Address&nbsp;:</b> {currentaccount}
      </span>
      <br></br>
      <br></br>
      <center>
        <div
          className="container"
          style={{
            display: "inline",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "1150px", // Set the maximum width
            margin: "auto", // Set margin to auto for centering
          }}
        >
          <Slider {...settings} style={{ margin: "auto", maxWidth: "1150px" }}>
            {/* Raw Material Suppliers Card */}
            <div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h4 className="card-title text-center">
                      Raw Material Suppliers
                    </h4>
                    <form
                      onSubmit={handlerSubmitRMS}
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
                        <h5 style={{ margin: "0 10px 0 0" }}>
                          Name of the Supplier :
                        </h5>
                        <input
                          className="form-control-sm custom-input"
                          type="text"
                          onChange={handlerChangeNameRMS}
                          placeholder="Raw Material Supplier Name"
                          required
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div
                        className="custom-input-container"
                        style={{ marginBottom: "10px", width: "100%" }}
                      >
                        <h5 style={{ margin: "0 10px 0 0" }}>
                          Enter the Location :
                        </h5>
                        <input
                          className="form-control-sm custom-input"
                          type="text"
                          onChange={handlerChangePlaceRMS}
                          placeholder="Place"
                          required
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div
                        className="custom-input-container"
                        style={{ marginBottom: "10px", width: "100%" }}
                      >
                        <h5 style={{ margin: "0 10px 0 0" }}>
                          Ethereum Address :
                        </h5>
                        <input
                          className="form-control-sm custom-input"
                          type="text"
                          onChange={handlerChangeAddressRMS}
                          placeholder="Ethereum Address"
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
                          onSubmit={handlerSubmitMAN}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    <br></br>
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Place</th>
                          <th scope="col">Ethereum Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(RMS).map(function (key) {
                          return (
                            <tr key={key}>
                              <td>{RMS[key].id}</td>
                              <td>{RMS[key].name}</td>
                              <td>{RMS[key].place}</td>
                              <td>{RMS[key].addr}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Manufacturers Card */}
            <div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h4 className="card-title text-center">Manufacturers</h4>
                    <form
                      onSubmit={handlerSubmitMAN}
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
                        <h5 style={{ margin: "0 10px 0 0" }}>
                          Name of the Manufacturer :
                        </h5>
                        <input
                          className="form-control-sm custom-input"
                          type="text"
                          onChange={handlerChangeNameMAN}
                          placeholder="Raw Material Supplier Name"
                          required
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div
                        className="custom-input-container"
                        style={{ marginBottom: "10px", width: "100%" }}
                      >
                        <h5 style={{ margin: "0 10px 0 0" }}>
                          Enter the Location :
                        </h5>
                        <input
                          className="form-control-sm custom-input"
                          type="text"
                          onChange={handlerChangePlaceMAN}
                          placeholder="Place"
                          required
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div
                        className="custom-input-container"
                        style={{ marginBottom: "10px", width: "100%" }}
                      >
                        <h5 style={{ margin: "0 10px 0 0" }}>
                          Ethereum Address :
                        </h5>
                        <input
                          className="form-control-sm custom-input"
                          type="text"
                          onChange={handlerChangeAddressMAN}
                          placeholder="Ethereum Address"
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
                          onSubmit={handlerSubmitMAN}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    <br></br>
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Place</th>
                          <th scope="col">Ethereum Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(MAN).map(function (key) {
                          return (
                            <tr key={key}>
                              <td>{MAN[key].id}</td>
                              <td>{MAN[key].name}</td>
                              <td>{MAN[key].place}</td>
                              <td>{MAN[key].addr}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Distributors Card */}
            <div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h4 className="card-title text-center">Distributors</h4>
                    <form
                      onSubmit={handlerSubmitDIS}
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
                        <h5 style={{ margin: "0 10px 0 0" }}>
                          Name of the Distributor :
                        </h5>
                        <input
                          className="form-control-sm custom-input"
                          type="text"
                          onChange={handlerChangeNameDIS}
                          placeholder="Distributor Name"
                          required
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div
                        className="custom-input-container"
                        style={{ marginBottom: "10px", width: "100%" }}
                      >
                        <h5 style={{ margin: "0 10px 0 0" }}>
                          Enter the Location :
                        </h5>
                        <input
                          className="form-control-sm custom-input"
                          type="text"
                          onChange={handlerChangePlaceDIS}
                          placeholder="Place"
                          required
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div
                        className="custom-input-container"
                        style={{ marginBottom: "10px", width: "100%" }}
                      >
                        <h5 style={{ margin: "0 10px 0 0" }}>
                          Ethereum Address :
                        </h5>
                        <input
                          className="form-control-sm custom-input"
                          type="text"
                          onChange={handlerChangeAddressDIS}
                          placeholder="Ethereum Address"
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
                          onSubmit={handlerSubmitDIS}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    <br></br>
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Place</th>
                          <th scope="col">Ethereum Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(DIS).map(function (key) {
                          return (
                            <tr key={key}>
                              <td>{DIS[key].id}</td>
                              <td>{DIS[key].name}</td>
                              <td>{DIS[key].place}</td>
                              <td>{DIS[key].addr}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Retailers Card */}
            <div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h4 className="card-title text-center">Retailer</h4>
                    <form
                      onSubmit={handlerSubmitRET}
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
                        <h5 style={{ margin: "0 10px 0 0" }}>
                          Name of the Retailer :
                        </h5>
                        <input
                          className="form-control-sm custom-input"
                          type="text"
                          onChange={handlerChangeNameRET}
                          placeholder="Distributor Name"
                          required
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div
                        className="custom-input-container"
                        style={{ marginBottom: "10px", width: "100%" }}
                      >
                        <h5 style={{ margin: "0 10px 0 0" }}>
                          Enter the Location :
                        </h5>
                        <input
                          className="form-control-sm custom-input"
                          type="text"
                          onChange={handlerChangePlaceRET}
                          placeholder="Place"
                          required
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div
                        className="custom-input-container"
                        style={{ marginBottom: "10px", width: "100%" }}
                      >
                        <h5 style={{ margin: "0 10px 0 0" }}>
                          Ethereum Address :
                        </h5>
                        <input
                          className="form-control-sm custom-input"
                          type="text"
                          onChange={handlerChangeAddressRET}
                          placeholder="Ethereum Address"
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
                          onClick={handlerSubmitRET} // Assuming onClick is the intended event, not onSubmit
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    <br></br>
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Place</th>
                          <th scope="col">Ethereum Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(RET).map(function (key) {
                          return (
                            <tr key={key}>
                              <td>{RET[key].id}</td>
                              <td>{RET[key].name}</td>
                              <td>{RET[key].place}</td>
                              <td>{RET[key].addr}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </center>
    </div>
  );
}

export default AssignRoles;