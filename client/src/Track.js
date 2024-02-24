import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Track() {
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
  const [RMS, setRMS] = useState();
  const [MAN, setMAN] = useState();
  const [DIS, setDIS] = useState();
  const [RET, setRET] = useState();
  const [TrackTillSold, showTrackTillSold] = useState(false);
  const [TrackTillRetail, showTrackTillRetail] = useState(false);
  const [TrackTillDistribution, showTrackTillDistribution] = useState(false);
  const [TrackTillManufacture, showTrackTillManufacture] = useState(false);
  const [TrackTillRMS, showTrackTillRMS] = useState(false);
  const [TrackTillOrdered, showTrackTillOrdered] = useState(false);

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
        med[i + 1] = await supplychain.methods.MedicineStock(i + 1).call();
        medStage[i + 1] = await supplychain.methods.showStage(i + 1).call();
      }
      setMED(med);
      setMedStage(medStage);
      const rmsCtr = await supplychain.methods.rmsCtr().call();
      const rms = {};
      for (i = 0; i < rmsCtr; i++) {
        rms[i + 1] = await supplychain.methods.RMS(i + 1).call();
      }
      setRMS(rms);
      const manCtr = await supplychain.methods.manCtr().call();
      const man = {};
      for (i = 0; i < manCtr; i++) {
        man[i + 1] = await supplychain.methods.MAN(i + 1).call();
      }
      setMAN(man);
      const disCtr = await supplychain.methods.disCtr().call();
      const dis = {};
      for (i = 0; i < disCtr; i++) {
        dis[i + 1] = await supplychain.methods.DIS(i + 1).call();
      }
      setDIS(dis);
      const retCtr = await supplychain.methods.retCtr().call();
      const ret = {};
      for (i = 0; i < retCtr; i++) {
        ret[i + 1] = await supplychain.methods.RET(i + 1).call();
      }
      setRET(ret);
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
  if (TrackTillSold) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Product:</u>
            </b>
          </h3>
          <span>
            <b>Product ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <div className="container-xl">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Ethereum Address:</b> {RMS[MED[ID].RMSid].addr}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
      
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Ethereum Address:</b> {MAN[MED[ID].MANid].addr}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Distributed by:</u>
            </h4>
            <p>
              <b>Distributor ID: </b>
              {DIS[MED[ID].DISid].id}
            </p>
            <p>
              <b>Ethereum Address:</b> {DIS[MED[ID].DISid].addr}
            </p>
            <p>
              <b>Name:</b> {DIS[MED[ID].DISid].name}
            </p>
            <p>
              <b>Place: </b>
              {DIS[MED[ID].DISid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Retailed by:</u>
            </h4>
            <p>
              <b>Retailer ID: </b>
              {RET[MED[ID].RETid].id}
            </p>
            <p>
              <b>Ethereum Address:</b> {RET[MED[ID].RETid].addr}
            </p>
            <p>
              <b>Name:</b> {RET[MED[ID].RETid].name}
            </p>
            <p>
              <b>Place: </b>
              {RET[MED[ID].RETid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Sold</u>
            </h4>
          </article>
        </div>
        <button
          onClick={() => {
            showTrackTillSold(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Track Another Item
        </button>
        <span
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillRetail) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Product:</u>
            </b>
          </h3>
          <span>
            <b>Product ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Distributed by:</u>
            </h4>
            <p>
              <b>Distributor ID: </b>
              {DIS[MED[ID].DISid].id}
            </p>
            <p>
              <b>Name:</b> {DIS[MED[ID].DISid].name}
            </p>
            <p>
              <b>Place: </b>
              {DIS[MED[ID].DISid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Retailed by:</u>
            </h4>
            <p>
              <b>Retailer ID: </b>
              {RET[MED[ID].RETid].id}
            </p>
            <p>
              <b>Name:</b> {RET[MED[ID].RETid].name}
            </p>
            <p>
              <b>Place: </b>
              {RET[MED[ID].RETid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillRetail(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Track Another Item
        </button>
        <span
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillDistribution) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Product:</u>
            </b>
          </h3>
          <span>
            <b>Product ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Ethereum Address:</b> {RMS[MED[ID].RMSid].address}
            </p>
            <p>
            
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Distributed by:</u>
            </h4>
            <p>
              <b>Distributor ID: </b>
              {DIS[MED[ID].DISid].id}
            </p>
            <p>
              <b>Name:</b> {DIS[MED[ID].DISid].name}
            </p>
            <p>
              <b>Place: </b>
              {DIS[MED[ID].DISid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillDistribution(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Track Another Item
        </button>
        <span
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillManufacture) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Product:</u>
            </b>
          </h3>
          <span>
            <b>Product ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
          <span>&#10132;</span>
          <article className="col-3">
            <h4>
              <u>Manufactured by:</u>
            </h4>
            <p>
              <b>Manufacturer ID: </b>
              {MAN[MED[ID].MANid].id}
            </p>
            <p>
              <b>Name:</b> {MAN[MED[ID].MANid].name}
            </p>
            <p>
              <b>Place: </b>
              {MAN[MED[ID].MANid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillManufacture(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Track Another Item
        </button>
        <span
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillRMS) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Product:</u>
            </b>
          </h3>
          <span>
            <b>Product ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
        </article>
        <hr />
        <br />
        <section className="row">
          <article className="col-3">
            <h4>
              <u>Raw Materials Supplied by:</u>
            </h4>
            <p>
              <b>Supplier ID: </b>
              {RMS[MED[ID].RMSid].id}
            </p>
            <p>
              <b>Name:</b> {RMS[MED[ID].RMSid].name}
            </p>
            <p>
              <b>Place: </b>
              {RMS[MED[ID].RMSid].place}
            </p>
          </article>
        </section>
        <button
          onClick={() => {
            showTrackTillRMS(false);
          }}
          className="btn btn-outline-success btn-sm"
        >
          Track Another Item
        </button>
        <span
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-danger btn-sm"
        >
          {" "}
          HOME
        </span>
      </div>
    );
  }
  if (TrackTillOrdered) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Product:</u>
            </b>
          </h3>
          <span>
            <b>Product ID: </b>
            {MED[ID].id}
          </span>
          <br />
          <span>
            <b>Name:</b> {MED[ID].name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {MED[ID].description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {MedStage[ID]}
          </span>
          <hr />
          <br />
          <h5>Product Not Yet Processed...</h5>
          <button
            onClick={() => {
              showTrackTillOrdered(false);
            }}
            className="btn btn-outline-success btn-sm"
          >
            Track Another Item
          </button>
          <span
            onClick={() => {
              history.push("/");
            }}
            className="btn btn-outline-danger btn-sm"
          >
            {" "}
            HOME
          </span>
        </article>
        {/* <section className="row">
                    
                    <article className="col-3">
                        <h4><u>Raw Materials Supplied by:</u></h4>
                        <p><b>Supplier ID: </b>{RMS[MED[ID].RMSid].id}</p>
                        <p><b>Name:</b> {RMS[MED[ID].RMSid].name}</p>
                        <p><b>Place: </b>{RMS[MED[ID].RMSid].place}</p>
                    </article>
                </section> */}
      </div>
    );
  }
  const handlerChangeID = (event) => {
    setID(event.target.value);
  };
  const redirect_to_home = () => {
    history.push("/");
  };
  const handlerSubmit = async (event) => {
    event.preventDefault();
    var ctr = await SupplyChain.methods.medicineCtr().call();
    if (!(ID > 0 && ID <= ctr)) alert("Invalid Product ID!!!");
    else {
      // eslint-disable-next-line
      if (MED[ID].stage == 5) showTrackTillSold(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 4) showTrackTillRetail(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 3) showTrackTillDistribution(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 2) showTrackTillManufacture(true);
      // eslint-disable-next-line
      else if (MED[ID].stage == 1) showTrackTillRMS(true);
      else showTrackTillOrdered(true);
    }
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
        <b>Current Account Address &nbsp;:</b> {currentaccount}
      </span>
      {/* <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm"> HOME</span> */}
      <table className="table table-sm table-bordered mt-5">
        {" "}
        {/* Added 'mt-3' for top margin */}
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Processing Stage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(MED).map(function (key) {
            return (
              <tr key={key}>
                <td style={{ fontSize: "16px" }}>{MED[key].id}</td>
                <td style={{ fontSize: "16px" }}>{MED[key].name}</td>
                <td style={{ fontSize: "16px" }}>{MED[key].description}</td>
                <td style={{ fontSize: "16px" }}>{MedStage[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
        <div
          className="card w-50 h-40 mb-3 d-flex align-items-center justify-content-center"
          style={{ paddingTop: "20px" }}
        >
          <div className="card-body text-center">
            <h5 className="card-title mb-4">Enter Product ID to Track It</h5>
            <form onSubmit={handlerSubmit}>
              <div className="mb-4">
                <center>
                  <input
                    className="form-control-sm"
                    type="text"
                    onChange={handlerChangeID}
                    placeholder="Enter Product ID"
                    required
                  />
                </center>
              </div>
              <div>
                <button
                  className="btn custom-btn:hover btn-lg custom-btn"
                  onSubmit={handlerSubmit}
                >
                  Track
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="table-container mt-3 w-70">
          {" "}
          {/* Adjust 'w-75' for width */}
          <table className="table table-sm table-bordered">
            {/* ... Table content ... */}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Track;
