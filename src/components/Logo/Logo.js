import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';
const Logo =() =>{
    return(
        <div className="ma4 mt0">
       
         <div className="dim pa3 dot center">
         <img  alt = "brainLogo"src={brain}/>
         </div>
         
        </div>
       
    );
}
export default Logo;

 /* <--Tilt  className="grow br2 shadow-2 dot">
 <--/Tilt>*/
