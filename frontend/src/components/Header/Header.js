


import '../css/main.css'
import '../css/formatoHome.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'

import {Link} from 'react-router-dom'

const Header = () => {

  const logoutHandler=()=>{
    localStorage.removeItem("authToken");

};
    return(


      

       
        <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark gradient">
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">

            <li className="nav-item">
                <Link to="/home">    <a id="axis"className="nav-link" >AXIS <span className="sr-only">(current)</span></a></Link>
                </li>
                <li className="nav-item">
                <Link to="/home">    <a className="nav-link" >Home <span className="sr-only">(current)</span></a></Link>
                </li>
              

                <li className="nav-item">
                   <Link to="/ventas"> <a className="nav-link" > Gestion Ventas</a></Link>
                </li>
                <li className="nav-item">
                <Link to="/user"><a className="nav-link" >Gestion Roles</a></Link>
               <ul className='dropdown'>
              
               </ul>
                </li>
                <li className="nav-item">
                <Link to="/products"><a className="nav-link" >Gestion de productos</a></Link>
               
                </li>
                <li className="nav-item">
                <Link to ="/comprar"><a className="nav-link" >Comprar</a></Link>
                </li>
                </ul>
                <ul class="navbar-nav navbar-right ">

                <li className="nav">
                <Link to="/login"><a id="logout" className="nav-link" onClick={logoutHandler}>Logout</a></Link>
                </li>
               
            

            </ul>
            </div>
    </nav>
    </header>


      )

};

export default Header;