import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function AddMed() {
  const history = useHistory();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [MED, setMED] = useState();
  const [MedName, setMedName] = useState();
  const [MedDes, setMedDes] = useState();
  const [MedStage, setMedStage] = useState();

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
      window.alert("The smart contract is not deployed to current network");
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
  const handlerChangeNameMED = (event) => {
    setMedName(event.target.value);
  };
  const handlerChangeDesMED = (event) => {
    setMedDes(event.target.value);
  };

  const handlerSubmitMED = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addMedicine(MedName, MedDes)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  return (
    <div>
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
              <Link className="nav-link" to="/addmed">
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
      <center>
        <h1>
          <font color="black">Order the Products here</font>
        </h1>
      </center>
      <span>
        <b>
          <font color="black">Current Account Address&nbsp;:</font>
        </b>
        &nbsp;<font color="red">{currentaccount}</font>
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span
        onClick={redirect_to_home}
        className="btn custom-btn:hover btn-lg custom-btn"
      >
        <font>HOME</font>
      </span>
      <br />
      <br />
      <center>
        <font color="black">
          <h5>Add products</h5>
        </font>
      </center>
      <center>
        <form onSubmit={handlerSubmitMED}>
          <div className="form-group">
            <label htmlFor="productName">
              <font color="black">Product Name &nbsp;: &nbsp;</font>
            </label>
            <input
              className="form-control-sm"
              type="text"
              id="productName"
              onChange={handlerChangeNameMED}
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productDescription">
              <font color="black">Product Description &nbsp;: &nbsp;</font>
            </label>
            <input
              className="form-control-sm"
              type="text"
              id="productDescription"
              onChange={handlerChangeDesMED}
              placeholder="Product Description"
              required
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <button
              className="btn custom-btn:hover btn-lg custom-btn"
              onSubmit={handlerSubmitMED}
            >
              Order
            </button>
          </div>
        </form>
      </center>
      <br />
      <center>
        <font color="black">
          <h5>Ordered Products</h5>
        </font>
      </center>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Stage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(MED).map(function (key) {
            return (
              <tr key={key}>
                <td>{MED[key].id}</td>
                <td>{MED[key].name}</td>
                <td>{MED[key].description}</td>
                <td>{MedStage[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AddMed;
