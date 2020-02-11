import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
// create context
export const CategoriasContext = createContext();


// create Provider
const CategoriasProvider = (props) => {
     // state context
     const [categorias, guardarCategorias] = useState([]);

     // calling API
     useEffect(()=> {
          const obtenerCategorias = async () => {
               const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

               const categorias = await axios.get(url);
              guardarCategorias(categorias.data.drinks)
               }
          obtenerCategorias();
     }, []);


     return(
          <CategoriasContext.Provider
          value={{
             categorias  
          }}
          >
             {props.children}  
          </CategoriasContext.Provider>
     )
}

export default CategoriasProvider;
