import React, {useContext, useState} from 'react';
import {ModalContext} from '../context/ModalContext'

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
function getModalStyle() {
     const top = 50;
     const left = 50;

     return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
     };
}

const useStyles = makeStyles(theme => ({
      
     paper: {
          position: 'absolute',
          width: 600,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
          textAlign:"center",
     },
}));

const Receta = ({receta}) => {

     // style modal
   const [modalStyle] = useState(getModalStyle);  
   const [open, setOpen] = useState(false);

   const classes = useStyles();

   const handleOpen = () => {
        setOpen(true);
   }
   const handleClose = () => {
        setOpen(false);
   }

     // extract   receta context
   const {infoReceta, guardarIdReceta } = useContext(ModalContext); 
          console.log(infoReceta);

     // function to extract ingredient data
    const mostrarIngredientes = infoReceta => {
        let ingredientes = [];
        for(let i = 1; i < 16; i ++) {
             if (infoReceta[`strIngredient${i} `]) {
                  ingredientes.push(
                  <li>{infoReceta[`strIngredient${i}`]} {infoReceta[`strMeasure${i}`]} </li>
                  )
             }
        }
        return ingredientes;
    }      
     return ( 
          <div className="col-md-4 mb-3 mt-5">
               <div className="card">
                     <h2 className=" card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`} />
                <div className="card-body">
                     <button 
                     onClick={() =>{
                          guardarIdReceta(receta.idDrink);
                          handleOpen();
                     }}
                      type="button"
                     className="btn btn-block btn-outline-danger"> Show More</button>
                     <Modal
                         open={open}
                         onClose={()=> {
                              guardarIdReceta(null);
                              handleClose();
                         }}
                     >
                          <div style={modalStyle} className= {classes.paper}>
                               <h2>{infoReceta.strDrink}</h2>
                               <h3 className="mt-4 text-center">Details </h3>
                                    <p>{infoReceta.strInstructions}</p>
                         <img className="img-fluid" src={infoReceta.strDrinkThumb} alt="IMG" />

                         <h3>Ingredients and quantities</h3>
                              <ul>
                                   {mostrarIngredientes(infoReceta)}
                              </ul>

                          </div>
                     </Modal>
                </div>
               </div>
              
              
          </div>
      );
}
 
export default Receta;