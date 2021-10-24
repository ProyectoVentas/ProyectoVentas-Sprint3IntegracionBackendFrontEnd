import { useState, useEffect } from "react";
import axios from "axios";
import '../css/main.css'
import '../css/Productos.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'
import '../css/crearProducto.css'
import Header from '../Header/Header'
import Footer from "../Footer/Footer";


const User = ({history}) => {
  const [error, setError] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bDate, setBDate] = useState("");
  const [roles, setRoles] = useState("");
const[actID,setActID]=useState("");
const[actUserName,setActUserName]=useState("");
const [actEmail, setActEmail] = useState("");
const [actPhone, setActPhone] = useState("");
const [actBDate, setActBDate] = useState("");
const [actRoles, setActRoles] = useState("");

  const [userData, setUserData] = useState([
    
  ]);
 
//funciones globales
//headerde conexion
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
//actualizar pagina
  const updatePage = async ()=>{
      try{
    const { data } = await axios.get("/api/auth", config);
    setUserData(data);
      }
      catch{
console.log(error);
      }
    };

  
   



//cargar tabla
  useEffect(() => {
    const fetchUserDate = async () => {
     
      try {
       
        updatePage()
      } catch  {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchUserDate();
  }, [history]);
///Borrar usuario
  const deleteUser = async (userId) => {
      try{
    const response = window.confirm('are you sure you want to delete this user?');
    if (response) {    

         axios.delete('/api/auth/' + userId,config);
        
        
    }
    updatePage();
}

    catch {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }

    
}
//editar usuario
const actualizarUser = async (userId) => {

    try{
  const response = window.confirm('are you sure you want to update this user?');
  if (response) {
   var userNameAct=document.getElementById("userName2").value
   var emailAct=document.getElementById("email2").value
   var phoneAct=document.getElementById("phone2").value
   var bDateAct=document.getElementById("bDate2").value
   var rolesAct=document.getElementById("roles2").value
        const data= await axios.put('/api/auth/' + userId,
              { username:userNameAct,
                email:emailAct,
                phone:phoneAct,
                bDate:bDateAct,
                roles:rolesAct }
      ,      
      config);
      console.log(data)
      cerrarModalEditar();
    updatePage();
  }
}
catch {
    localStorage.removeItem("authToken");
    setError("You are not authorized please login");
}
};






var modal2 = document.getElementById("editar");


const mostrarModalEditar = () => {
  modal2.style.display = "block";
};

const cerrarModalEditar = () => {
  modal2.style.display = "none";
};



const tomarDato= async(idPro,proUserName,proEmail,proPhone,probDate,proRoles)=>{
    try{
          setActID(idPro);
  setActUserName(proUserName);
setActEmail(proEmail)
 setActPhone(proPhone);
setActBDate(probDate);
  setActRoles(proRoles);

console.log(idPro)
console.log(proUserName+proEmail+proPhone+probDate+proRoles)

document.getElementById("userName2").value=proUserName;
document.getElementById("email2").value=proEmail;
document.getElementById("phone2").value=proPhone;
document.getElementById("bDate2").value=probDate;
document.getElementById("roles2").value=proRoles;
mostrarModalEditar();
    }
    catch{
        console.log(error);
              }

};
  
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
       <div>
           <Header/>
           <div id="titlepro">
           <h1>Lista Usuarios</h1>
           </div>
              <div className="productos">
             <table  >
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Rol</th>
                <th></th>
                <th></th>
                       </tr>
                      <tbody>
              {userData.map((pro ) => (
                <tr  value={pro._id} key={pro._id}>
                  <td>{pro.username}</td>
                  <td>{pro.email}</td>
                  <td>{pro.phone}</td>
                  <td>{pro.bDate}</td>
                  <td>{pro.roles}</td>
                <td><button  className="btn btn-success" onClick={()=>tomarDato(pro._id,pro.username,pro.email,pro.phone,pro.bDate,pro.roles)} >Actualizar</button>  </td>
                <td><button  className="btn btn-danger" onClick={() => deleteUser(pro._id)} >Delete</button>  </td>

               </tr>
              ))}
            </tbody>
          </table>

          


<div id="editar" class="modal" >
 <div class="modal-content">
  <div className="form-group">
  <div><h1>Actualizar User</h1></div>
  <form>    
          <label htmlFor="username">Username:</label>
          <br/>
          <div>
          <input
            type="text"
              id="userName2"
                 onBlur={(e) => setUserName(e.target.value)}
                />
          </div>
          <label htmlFor="email">correo:</label>
          <br/>
          <div>
          <input
            type="email"
               id="email2"
                   onBlur={(e) => setEmail(e.target.value)}
             />
          </div>
          <label htmlFor="phone">Celular:</label>
          <br/>
          <div>
          <input
            type="number"
               id="phone2"
                  onBlur={(e) => setPhone(e.target.value)}
          />
          </div>
          <label htmlFor="bDate">Birthday:</label>
          <br/>
          <div>
          <input
           type="date"  

           min="1900-01-01" max="2050-12-31"
               id="bDate2"
                  onBlur={(e) => setBDate(e.target.value)}
           />
          </div>
          <label htmlFor="roles">Rol:</label>
          <br/>
          <div>
          <input
            type="text"
               id="roles2"
                   onBlur={(e) => setRoles(e.target.value)}
               />
          </div>
          </form>
          <br/>
        </div>
        <div>
        <button  className="btn btn-success" onClick={() => actualizarUser(actID)}  > Actualizar</button>
        </div>
       
        <br></br>
        <div>
  <button className="btn btn-danger"  onClick={cerrarModalEditar}>cancelar</button>
  </div>
       
  </div>
</div>

          </div>
          <Footer></Footer>  
  </div>
  );

  
};











export default User;