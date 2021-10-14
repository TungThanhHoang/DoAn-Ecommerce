import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Landing from "./pages/Landing";
import ProtectRouter from "./components/routing/ProtectRouter";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/product" component={Products} />
          <Route
            exact
            path="/login"
            render={(props) => <Auth {...props} authRouter="loginRouter" />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Auth {...props} authRouter="registerRouter" />}
          />
          <ProtectRouter exact path="/" component={Home} />
          <ProtectRouter exact path="/cart" component={Cart} />
          <ProtectRouter exact path="/checkout" component={Checkout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
