import { useState, useEffect } from "react";
import axios from "axios";

import '../css/main.css'
import '../css/comprar.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'
import Header from '../Header/Header'
import Footer from "../Footer/Footer";

const Comprar = ({history}) => {
  const [error, setError] = useState("");
  const [comprarData, setComprarData] = useState("");
  const [cliente, setCliente] = useState("");
  const [medioPago, setMedioPago] = useState("");
  const [carrito, setCarrito] = useState("");

const[actID,setActID]=useState("");


const[productData,setProductData]=useState([]);

const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };


  useEffect(() => {
    const fetchComprarData = async () => {
      
      try {
        const { data } = await axios.get("/api/products", config);
        setComprarData(data.data);
        console.log(comprarData);
        listaProductos();
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchComprarData();
  }, [history]);

//traer tabla productos
const listaProductos= async ()=>{
    try{
        const { data } = await axios.get("/api/products", config);
        setProductData(data);
       
        }
        catch{
    console.log(error)
        }
        };

         //insertar venta
         const insertarVenta = async ()=>{
            try{
            await axios.post(
              "/api/ventas",
              { 
                  medioPago,
                  
                  cliente,
                  carrito },
              config
            );
         
        
          
            }
            catch{
              console.log(error)
            }
            }
      
    

   
const agregarCarrito= async(idPro,proName,proPrice,proCategory,proImgURL)=>{
    
  
    var transitionalz=[];
    
    transitionalz.push(proName,proPrice);
    carritoDB=carritoDB.concat(transitionalz);

console.log(carritoDB)
setCarrito(carritoDB)

  document.getElementById("lista").value=carritoDB;

}
 


  
        return error ? (
            <span className="error-message">{error}</span>
          ) : (
               <div>
                   <Header/>
                   
        
        
                  
        <div id="crear" className="usuarioCompra" >
        
          <form>
          <div >
          <div id="comprarUsuario" >
          <div><h1>Comprar</h1></div>
          
          <label htmlFor="cliente">Cliente:</label>
        <br/>
        <div>
        <input
        className="inputCompra"
          type="text"
        
          id="cliente"
         
           onChange={(e) => setCliente(e.target.value)}
          
        />
                  </div>       
        
        
        
        
                  <label htmlFor="medioPago">Medio Pago:</label>
        <br/>
        <div>
        <input
          className="inputCompra"
          type="text"
        
          id="medioPago"
         
           onChange={(e) => setMedioPago(e.target.value)}
          
        />
                  </div>
        
        
        
        
        
        
                  <label htmlFor="carrito">Carrito:</label>
        <br/>
        <div>
        <input
          className="inputCompra"
          type="text"
        
          id="lista"
         
          
          
        />
        
                  </div>
                  <br></br>
                  <div>
                <button id="btnComprar"  type="submit" className="btn btn-success" onClick={insertarVenta} >Comprar</button>
        
            
          </div>
                     
        
                  <hr id="separador"></hr>
                  
        <div>
                  <table id="productos" >
                      <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                        <th>Imagen</th>
                      
                        <th></th>
                        </tr>
                        <tbody>
                      {productData.map((car ) => (
                        <tr  value={car._id} key={car._id}>
                          <td>{car.name}</td>
                          <td>{car.price}</td>
                          <td>{car.category}</td>
                          <td><img src={car.imgURL}></img></td>
                          <td><button type="button" id="crearProBtn" onClick={()=>agregarCarrito(car._id,car.name,car.price,car.category,car.imgURL)}>Agregar + </button></td>
                      
                        {/* <td><button  className="btn btn-success"  >Agregarv al carrito</button>  </td> */}
        
                        
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                
                  <br/>
                </div>
                
        
    
          </div>
          </form>
        
        
        
        
        
        
        </div>
        
                  
                  <Footer></Footer>  
          </div>
          );
        
          
        };
        var carritoDB=[]
        
        
        
        
        

export default Comprar;