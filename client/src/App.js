import "./App.css";
import AssignRoles from "./AssignRoles";
import Home from "./Home";
import AddProduct from "./AddProduct";
import Supply from "./Supply";
import Track from "./Track";
import Homesec from "./Homesec";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Homesec" exact component={Homesec} />
          <Route path="/roles" component={AssignRoles} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/supply" component={Supply} />
          <Route path="/track" component={Track} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
