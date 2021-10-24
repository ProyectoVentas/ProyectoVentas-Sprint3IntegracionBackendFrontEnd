import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//private
import PrivateRoute from "./components/routing/PrivateRoute";
import HomeRoute from "./components/routing/HomeRoute";
import ProductsRoute from "./components/routing/ProductsRoute";
import UserRoute from "./components/routing/UserRoute";
import VentasRoute from "./components/routing/VentasRoute";

//pages
import Comprar from "./components/pages/Comprar";
import Ventas from "./components/pages/Ventas";
import User from "./components/pages/User";
import Products from "./components/pages/Products";
import Home from "./components/pages/Home";
import Private from "./components/pages/Private";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
const App=()=> {
  return (
    <Router>

        <div>
<Switch>

  <VentasRoute exact path="/comprar" component={Comprar}/>
  <VentasRoute exact path="/ventas" component={Ventas}/>
  <UserRoute exact path="/user" component={User}/>
<PrivateRoute exact path="/private" component={Private} />
<HomeRoute path="/home" component={Home} />
<ProductsRoute path="/products" component={Products}/>
<Route exact path="/login" component={Login}></Route>
<Route exact path="/register" component={Register}/>
<Route exact path="/forgotpassword" component={ForgotPassword}/>
<Route exact path="/passwordreset/:resetToken" component={ResetPassword}/>
</Switch>
</div>

      
    </Router>
 
  );
}

export default App;
