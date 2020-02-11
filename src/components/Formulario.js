import React, { useContext , useState} from 'react';
import {CategoriasContext} from '../context/CategoriasContext';
import {RecetasContext} from '../context/RecetasContext'

const Formulario = () => {
     // state local
     const [busqueda, guardarBusqueda] = useState({
          nombre: '',
          categoria: ''
     });
     // state context
     const { categorias} = useContext(CategoriasContext);
     const { buscarRecetas, guardarConsultar} = useContext(RecetasContext);
        
     // function read contain
     const obtenerDatosreceta = e => {
          guardarBusqueda({
               ...busqueda,
               [e.target.name] : e.target.value
          })
     }


     
     return ( 
          <form className="col-md-12"
          onSubmit={e => {
               e.preventDefault();
               buscarRecetas(busqueda)
               guardarConsultar(true);
          }}
          >
               <fieldset className="text-center">
                    <legend>Search Drinks by Category</legend>
               </fieldset>
               <div className="row mt-5">
                    <div className="col-md-4">
                         <input 
                         onChange={obtenerDatosreceta}
                         name="nombre"
                         className="form-control"
                         type="text"
                         placeholder="I'm Looking ......"
                         />
                    </div>
                    <div className="col-md-4 ">
                         <select
                         onChange={obtenerDatosreceta}
                         className="form-control "
                         name="categoria"
                         >
                            <option>--Select-- </option>
                            {categorias.map(categoria => (
                                 <option key={categoria.strCategory}
                                         value={categoria.strCategory} >
                                    {categoria.strCategory}</option>
                            ))}  
                         </select>
                    </div>
                    <div className="col-md-4">
                         <input 
                         type="submit"
                         className=" btn btn-block btn-info"
                         value="Search Now"
                         />
                    </div>
               </div>
               
          </form>
         
      );
}
 
export default Formulario;