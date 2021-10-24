import { useState, useEffect } from "react";
import axios from "axios";
import '../css/main.css'
import '../css/Productos.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'
import '../css/crearProducto.css'
import Header from '../Header/Header'
import Footer from "../Footer/Footer";

// fechaCreacion:Date,
//     embalaje:String,
//     despachoRuta: String,
//     ubicacion: String,
//     estado: String,
//     ruta: String,
//     medioPago:String,
//     vendedor:String,
//     cliente:String,
//     carrito:Object

const Ventas = ({history}) => {

    //llamar dato
  const [error, setError] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");
  const [embalaje, setEmbalaje] = useState("");
  const [despachoRuta, setDespachoRuta] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [estado, setEstado] = useState("");
  const [ruta, setRuta] = useState("");
  const [medioPago, setMedioPago] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [cliente, setCliente] = useState("");
  const [carrito, setCarrito] = useState("");

const[actID,setActID]=useState("");
const [actFechaCreacion, setActFechaCreacion] = useState("");
const [actEmbalaje, setActEmbalaje] = useState("");
const [actDespachoRuta, setActDespachoRuta] = useState("");
const [actUbicacion, setActUbicacion] = useState("");
const [actEstado, setActEstado] = useState("");
const [actRuta, setActRuta] = useState("");
const [actMedioPago, setActMedioPago] = useState("");
const [actVendedor, setActVendedor] = useState("");
const [actCliente, setActCliente] = useState("");
const [actCarrito, setActCarrito] = useState("");

const[productData,setProductData]=useState([]);


  const [ventasData, setVentasData] = useState([
    
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
    const { data } = await axios.get("/api/ventas", config);
    setVentasData(data);
   
    }
    catch{
console.log(error)
    }
    };
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
        { fechaCreacion,
            embalaje,
            despachoRuta,
            ubicacion,
            estado,
            ruta,
            medioPago,
            vendedor,
            cliente,
            carrito, },
        config
      );
   
    updatePage();
    cerrarModalInsertar();
    
      }
      catch{
        console.log(error)
      }
      }



//cargar tabla
  useEffect(() => {
    const fetchVentasDate = async () => {
     
      try {
       
        updatePage()
        listaProductos()
      } catch  {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchVentasDate();
  }, [history]);
///Borrar Venta
  const deleteVenta = async (ventasId) => {

    try{
    const response = window.confirm('are you sure you want to delete it?');
    if (response) {
     
     

        await axios.delete('/api/ventas/' + ventasId,config);
       
     
    }
    updatePage();
  }
  catch{
    console.log(error)
  }
}

const actualizarVenta = async (ventasId) => {
  try{
  const response = window.confirm('are you sure you want to update it?');
  if (response) {
   var fechaCreacionAct=document.getElementById("fechaCreacion2").value
   
   var embalajeAct=document.getElementById("embalaje2").value
   var despachoRutaAct=document.getElementById("despachoRuta2").value
   var ubicacionAct=document.getElementById("ubicacion2").value
   var estadoAct=document.getElementById("estado2").value
   var rutaAct=document.getElementById("ruta2").value
   var medioPagoAct=document.getElementById("medioPago2").value
   var vendedorAct=document.getElementById("vendedor2").value
   var clienteAct=document.getElementById("cliente2").value
   var carritoAct=document.getElementById("carrito2").value

   

     const data= await axios.put('/api/ventas/' + ventasId,

              { fechaCreacion:fechaCreacionAct,
                embalaje:embalajeAct,
                despachoRuta:despachoRutaAct,
                ubicacion:ubicacionAct,
                estado:estadoAct,
                ruta:rutaAct,
                medioPago:medioPagoAct,
                vendedor:vendedorAct,
                cliente:clienteAct,
                carrito:carritoAct,
            
            
            
            
            }
      ,
      
      
      config);

      console.log(data)
      cerrarModalEditar();
    updatePage();
  }
}
catch{
  console.log(error)
}
  
}





const tomarDato= async(idVen,proFechaCreacion,proEmbalaje,proDespachoRuta,proUbicacion,proEstado,proRuta,proMedioPago,proVendedor,proCliente,proCarrito)=>{
  setActID(idVen);
  setActFechaCreacion(proFechaCreacion);
  console.log(proFechaCreacion)
  setActEmbalaje(proEmbalaje);
  setActDespachoRuta(proDespachoRuta);
  setActUbicacion(proUbicacion);
  setActEstado(proEstado);
  setActRuta(proRuta);
  setActMedioPago(proMedioPago);
  setActVendedor(proVendedor);
  setActCliente(proCliente)
  setActCarrito(proCarrito)



console.log(idVen)


document.getElementById("fechaCreacion2").value=proFechaCreacion
document.getElementById("embalaje2").value=proEmbalaje
document.getElementById("despachoRuta2").value=proDespachoRuta
document.getElementById("ubicacion2").value=proUbicacion
document.getElementById("estado2").value=proEstado
document.getElementById("ruta2").value=proRuta
document.getElementById("medioPago2").value=proMedioPago
document.getElementById("vendedor2").value=proVendedor
document.getElementById("cliente2").value=proCliente
document.getElementById("carrito2").value=proCarrito






mostrarModalEditar();

}


const agregarCarrito= async(idPro,proName,proPrice,proCategory,proImgURL)=>{
    
  
    var transitionalz=[];
    
    transitionalz.push(proName,proPrice);
    carritoDB=carritoDB.concat(transitionalz);

console.log(carritoDB)
setCarrito(carritoDB)

  document.getElementById("list").value=carritoDB;

 
  }

  const agregarCarrito2= async(idPro,proName,proPrice,proCategory,proImgURL)=>{
    var prevVal=[];
 prevVal=document.getElementById("carrito2").value
    var transitionalz=[];
    transitionalz.push(prevVal)
    transitionalz.push(proName,proPrice);
    
    carritoDB=carritoDB.concat(transitionalz);

console.log(carritoDB);
setActCarrito(carritoDB);

  document.getElementById("carrito2").value=carritoDB;

 
  }

  
  var modal = document.getElementById("crear");


  const mostrarModalInsertar = () => {
      modal.style.display = "block";
    };
    
    const cerrarModalInsertar = () => {
        modal.style.display = "none";
        carritoDB=[]
     
         
    };
  
  
  
  
  
  var modal2 = document.getElementById("editar");
  
  
  const mostrarModalEditar = () => {
    modal2.style.display = "block";
  };
  
  const cerrarModalEditar = () => {
    modal2.style.display = "none";
    carritoDB=[]
  };
  





  
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
       <div>
           <Header/>
           <div id="titlepro">
           <h1>Lista Ventas</h1>
           <div className="crearProd"><button id="crearProBtn" onClick={mostrarModalInsertar}>Crear Ventas</button></div>
           </div>
        
    <div className="productos">
             <table  >
              <tr>
                <th>Fecha Creacion</th>
                <th>Embalaje</th>
                <th>Despacho Ruta</th>
                <th>Ubicacion</th>
                <th>Estado</th>
                <th>Ruta</th>
                <th>Medio Pago</th>
                <th>Vendedor</th>
                <th>Cliente</th>
                <th>Carrito</th>
                <th></th>
                <th></th>
                </tr>
                <tbody>
              {ventasData.map((pro ) => (
                <tr  value={pro._id} key={pro._id}>
                  <td>{pro.fechaCreacion}</td>
                  <td>{pro.embalaje}</td>
                  <td>{pro.despachoRuta}</td>
                  <td>{pro.ubicacion}</td>
                  <td>{pro.estado}</td>
                  <td>{pro.ruta}</td>
                  <td>{pro.medioPago}</td>
                  <td>{pro.vendedor}</td>
                  <td>{pro.cliente}</td>
                  <td>{pro.carrito}</td>
                  <td><button  className="btn btn-success" onClick={()=>tomarDato(pro._id,pro.fechaCreacion,pro.embalaje,pro.despachoRuta,pro.ubicacion,pro.estado,pro.ruta,pro.medioPago,pro.vendedor,pro.cliente,pro.carrito)} >Actualizar</button>  </td>
                <td><button  className="btn btn-danger" onClick={() => deleteVenta(pro._id)} >Delete</button>  </td>

                
                </tr>
              ))}
            </tbody>
          </table>

</div>



          
<div id="crear" class="modal" >

  <form>
  <div class="modal-content">
  <div className="form-group">
  <div><h1>Crear Venta</h1></div>
  
          <label htmlFor="fechaCreacion">Fecha Creacion:</label>
          <br/>
          <div>
          <input
          type="date"  

          min="2018-01-01" max="2050-12-31"
                      id="fechaCreacion"
                       onChange={(e) => setFechaCreacion(e.target.value)}
                      
                       
                     />
                  </div>

          <label htmlFor="embalaje">Embalaje:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="embalaje"
           
            onChange={(e) => setEmbalaje(e.target.value)}
           
          />
          </div>

<label htmlFor="despachoRuta">Despacho Ruta:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="despachoRuta"
           
            onChange={(e) => setDespachoRuta(e.target.value)}
            
          
          />

          </div>
          <label htmlFor="ubicacion">Ubicacion:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="ubicacion"
           
            onChange={(e) => setUbicacion(e.target.value)}
            
          />

</div>

<label htmlFor="estado">Estado:</label>
<br/>
<div>
<input
  type="text"

  id="estado"
 
   onChange={(e) => setEstado(e.target.value)}
  />
            </div>

          <label htmlFor="ruta">Ruta:</label>
<br/>
<div>
<input
  type="text"

  id="ruta"
 
   onChange={(e) => setRuta(e.target.value)}
  
/>
          </div>

          <label htmlFor="medioPago">Medio Pago:</label>
<br/>
<div>
<input
  type="text"

  id="medioPago"
 
   onChange={(e) => setMedioPago(e.target.value)}
  
/>
          </div>

          <label htmlFor="vendedor">Vendedor:</label>
<br/>
<div>
<input
  type="text"

  id="vendedor"
 
   onChange={(e) => setVendedor(e.target.value)}
  
/>
          </div>

          <label htmlFor="cliente">Cliente:</label>
<br/>
<div>
<input
  type="text"

  id="cliente"
 
   onChange={(e) => setCliente(e.target.value)}
  
/>
          </div>


          <label htmlFor="carrito">Carrito:</label>
<br/>
<div>
<input
  type="text"

  id="list"
 
  
  
/>

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
                  <td>{car.imgURL}</td>
                  <td><button type="button" id="crearProBtn" onClick={()=>agregarCarrito(car._id,car.name,car.price,car.category,car.imgURL)}>Agregar + </button></td>
              
                {/* <td><button  className="btn btn-success"  >Agregarv al carrito</button>  </td> */}

                
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <br/>
        </div>
        

<div>
        <button type="submit" className="btn btn-success" onClick={insertarVenta} >crear</button>

         <button type="reset" className="btn btn-danger"  onClick={cerrarModalInsertar}>cancelar</button>
  </div>
  </div>
  </form>
</div>



<div id="editar" class="modal" >

  
  <div class="modal-content">
  <div className="form-group">
  <div><h1>Actualizar Ventas</h1></div>
  <form>
    
  <label htmlFor="fechaCreacion">Fecha Creacion:</label>
          <br/>
          <div>
          <input

 type="date"  

min="2018-01-01" max="2050-12-31"
         
                      id="fechaCreacion2"
                       onChange={(e) => setFechaCreacion(e.target.value)}
                     />
                  </div>

          <label htmlFor="embalaje">Embalaje:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="embalaje2"
           
            onChange={(e) => setEmbalaje(e.target.value)}
                      
          />
          </div>

<label htmlFor="despachoRuta">Despacho Ruta:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="despachoRuta2"
           
            onChange={(e) => setDespachoRuta(e.target.value)}
            
          
          />

          </div>
          <label htmlFor="ubicacion">Ubicacion:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="ubicacion2"
           
            onChange={(e) => setUbicacion(e.target.value)}
            
          />

</div>

<label htmlFor="estado">Estado:</label>
<br/>
<div>
<input
  type="text"

  id="estado2"
 
   onChange={(e) => setEstado(e.target.value)}
  />
            </div>

          <label htmlFor="ruta">Ruta:</label>
<br/>
<div>
<input
  type="text"

  id="ruta2"
 
   onChange={(e) => setRuta(e.target.value)}
  
/>
          </div>

          <label htmlFor="medioPago">Medio Pago:</label>
<br/>
<div>
<input
  type="text"

  id="medioPago2"
 
   onChange={(e) => setMedioPago(e.target.value)}
  
/>
          </div>

          <label htmlFor="vendedor">Vendedor:</label>
<br/>
<div>
<input
  type="text"

  id="vendedor2"
 
   onChange={(e) => setVendedor(e.target.value)}
  
/>
          </div>

          <label htmlFor="cliente">Cliente:</label>
<br/>
<div>
<input
  type="text"

  id="cliente2"
 
   onChange={(e) => setCliente(e.target.value)}
  
/>
          </div>


          <label htmlFor="carrito">Carrito:</label>
<br/>
<div>
<input
  type="text"

  id="carrito2"
 
   onChange={(e) => setCarrito(e.target.value)}
  
/>
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
                            <td>{car.imgURL}</td>
                            <td><button type="button" id="crearProBtn" onClick={()=>agregarCarrito2(car._id,car.name,car.price,car.category,car.imgURL)}>Agregar + </button></td>
                        
                          {/* <td><button  className="btn btn-success"  >Agregarv al carrito</button>  </td> */}
          
                          
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>


          </form>
          <br/>
        </div>
        

<div>
        <button  className="btn btn-success" onClick={() => actualizarVenta(actID)}  >Actualizar</button>

        </div>
        <br></br>
        <div>
  <button className="btn btn-danger"  onClick={cerrarModalEditar}>cancelar</button>
  </div>
  </div>

</div>

          
          <Footer></Footer>  
  </div>
  );

  
};
var carritoDB=[]










export default Ventas;