import React, { createContext, useEffect, useState} from 'react';
import axios from 'axios'

// create context
export const ModalContext = createContext();

const ModalProvider = (props) => {

          // Provider State
     const [idReceta, guardarIdReceta] = useState(null);
     const [infoReceta, guardarReceta] = useState({});
     // new call API id drink Modal
     useEffect( () => {
          const obtenerReceta = async () =>{
               if(!idReceta) return;

               const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

               const resultado = await axios.get(url);
               guardarReceta(resultado.data.drinks[0]);
          }
          obtenerReceta(infoReceta);
     }, [idReceta])
     
     
     return (  
          <ModalContext.Provider
               value={{
                    infoReceta,
                    guardarIdReceta
               }}
          >
               {props.children}
          </ModalContext.Provider>
     );
}
 
export default ModalProvider;