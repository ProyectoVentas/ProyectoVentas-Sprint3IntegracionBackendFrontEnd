import { useState, useEffect } from "react";
import axios from "axios";
import '../css/main.css'
import '../css/Productos.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'
import '../css/crearProducto.css'
import Header from '../Header/Header'
import Footer from "../Footer/Footer";


const Products = ({history}) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imgURL, setImgURL] = useState("");
const[actID,setActID]=useState("");
const[actName,setActName]=useState("");
const [actCategory, setActCategory] = useState("");
const [actPrice, setActPrice] = useState("");
const [actImgURL, setActImgURL] = useState("");

  const [productData, setProductData] = useState([
    
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
    const { data } = await axios.get("/api/products", config);
    setProductData(data);
   
    }
    catch{
console.log(error)
    }
    };

  
    //insertar usuario
    const insertarProducto = async ()=>{
      try{
      await axios.post(
        "/api/products",
        { name,price,category,imgURL },
        config
      );
    cerrarModalInsertar();
    updatePage();
    
      }
      catch{
        console.log(error)
      }
      }



//cargar tabla
  useEffect(() => {
    const fetchProductDate = async () => {
     
      try {
       
        updatePage()
      } catch  {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchProductDate();
  }, [history]);
///Borrar producto
  const deleteProduct = async (productId) => {

    try{
    const response = window.confirm('are you sure you want to delete it?');
    if (response) {
     
     

        await axios.delete('/api/products/' + productId,config);
       
     
    }
    updatePage();
  }
  catch{
    console.log(error)
  }
}

const actualizarProduct = async (productId) => {
  try{
  const response = window.confirm('are you sure you want to update it?');
  if (response) {
   var nameAct=document.getElementById("name2").value
   var priceAct=document.getElementById("price2").value
   var categoryAct=document.getElementById("category2").value
   var imgURLAct=document.getElementById("imgURL2").value
   

     const data= await axios.put('/api/products/' + productId,

              { name:nameAct,
                price:priceAct,
                category:categoryAct,
                imgURL:imgURLAct }
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





var modal = document.getElementById("crear");


const mostrarModalInsertar = () => {
  modal.style.display = "block";
};

const cerrarModalInsertar = () => {
  modal.style.display = "none";
};

var modal2 = document.getElementById("editar");


const mostrarModalEditar = () => {
  modal2.style.display = "block";
};

const cerrarModalEditar = () => {
  modal2.style.display = "none";
};



const tomarDato= async(idPro,proName,proPrice,proCategory,proImgURL)=>{
  setActID(idPro);
  setActName(proName);

 setActPrice(proPrice);
setActCategory(proCategory);
  setActImgURL(proImgURL);

console.log(idPro)
console.log(proName+proPrice+proCategory+proImgURL)

document.getElementById("name2").value=proName;
document.getElementById("price2").value=proPrice;
document.getElementById("category2").value=proCategory;
document.getElementById("imgURL2").value=proImgURL;
mostrarModalEditar();

}






  
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
       <div>
           <Header/>
           <div id="titlepro">
           <h1>Lista Productos</h1>
           <div className="crearProd"><button id="crearProBtn" onClick={mostrarModalInsertar}>Crear Producto</button></div>
           </div>
        
    <div className="productos">
             <table id="productos" >
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoria</th>
                <th></th>
                <th></th>
            
                </tr>
                <tbody>
              {productData.map((pro ) => (
                <tr  value={pro._id} key={pro._id}>
                  <td>{pro.name}</td>
                  <td>{pro.price}</td>
                  <td>{pro.category}</td>
                 
                  <td><button  className="btn btn-success" onClick={()=>tomarDato(pro._id,pro.name,pro.price,pro.category,pro.imgURL)} >Actualizar</button>  </td>

                <td><button  className="btn btn-danger" onClick={() => deleteProduct(pro._id)} >Delete</button>  </td>

                
                </tr>
              ))}
            </tbody>
          </table>

          
<div id="crear" class="modal" >
<form>
  
  <div class="modal-content">
  <div className="form-group">
  <div><h1>Crear Producto</h1></div>
  
          <label htmlFor="name">Nombre:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="name"
           
            onChange={(e) => setName(e.target.value)}
           
          />
          
          </div>

<label htmlFor="category">Categoria:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="category"
           
            onChange={(e) => setCategory(e.target.value)}
            
          
          />




          </div>
          <label htmlFor="precio">Precio:</label>
          <br/>
          <div>
          <input
            type="number"
          
            id="price"
           
             onChange={(e) => setPrice(e.target.value)}
            
          
          />




          </div>

          <label htmlFor="imgURL">imgURL:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="imgURL"
           
            onChange={(e) => setImgURL(e.target.value)}
       
          
          />




          </div>
          <br/>
        </div>
        

<div>
        <button type="submit" className="btn btn-success" onClick={insertarProducto} >crear</button>

         <button type="reset" className="btn btn-danger"  onClick={cerrarModalInsertar}>cancelar</button>
  </div>
  </div>
  </form>
</div>

<div id="editar" class="modal" >

  
  <div class="modal-content">
  <div className="form-group">
  <div><h1>Actualizar Producto</h1></div>
  <form>
    
          <label htmlFor="name">Nombre:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="name2"
           
            onBlur={(e) => setName(e.target.value)}
      
         
          />
          
          </div>


          <label htmlFor="precio">Precio:</label>
          <br/>
          <div>
          <input
            type="number"
          
            id="price2"
           
             onBlur={(e) => setPrice(e.target.value)}
           
          
          />




          </div>
          <label htmlFor="category">Categoria:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="category2"
           
            onBlur={(e) => setCategory(e.target.value)}
         
          
          />




          </div>
          <label htmlFor="imgURL">imgURL:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="imgURL2"
           
            onBlur={(e) => setImgURL(e.target.value)}
      
          
          />




          </div>
          </form>
          <br/>
        </div>
        

<div>
        <button  className="btn btn-success" onClick={() => actualizarProduct(actID)}  >Actualizar</button>

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











export default Products;