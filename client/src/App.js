import "antd/dist/antd.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import ProtectRouter from "./components/routing/ProtectRouter";
import OrderSuccess from "./pages/OrderSuccess";
import InfoUser from "./pages/InfoUser";
import DetailUser from "./components/layouts/InfoUser/DetailUser";
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
          <ProtectRouter exact path="/order-success" component={OrderSuccess} />
          <ProtectRouter exact path="/user/info" component={InfoUser} userRouter="infoRouter" />
          <ProtectRouter exact path="/user/bill" component={InfoUser} userRouter="billRouter" />
          <ProtectRouter exact path="/user/change-password" component={InfoUser} userRouter="changePasswordRouter" />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
