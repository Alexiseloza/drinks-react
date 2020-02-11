import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
     // state drinks
 const [recetas, guardarRecetas] = useState([]);
     // state search
 const [ busqueda, buscarRecetas] = useState({
     nombre:'',
     categoria: ''
 });  
   // state consult
   const [ consultar , guardarConsultar] = useState(false);  
          // useEffect function
  const { nombre, categoria } = busqueda;

     useEffect(() => {
          if(consultar){
               const obtenerRecetas = async() => {
               const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
               
               const resultado = await axios.get(url);
               guardarRecetas(resultado.data.drinks)
               // console.log(resultado.data.drinks);
               }

               obtenerRecetas();

          }
          
     },[busqueda]);

     return (  
          <RecetasContext.Provider
          value={{
               buscarRecetas,
               guardarConsultar,
               recetas
          }}
          >
               {props.children}
          </RecetasContext.Provider>
     );
}
 
export default RecetasProvider;
