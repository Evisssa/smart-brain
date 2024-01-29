import React from "react";
import './FaceRecognition.css';

const FaceRecognition=({box,imgUrl})=>{
 return(
    <div className="center">
        <div className="absolute mt2">
        <img id="inputImage" alt="face1" src={imgUrl} width='auto' height='300px'/>
        <div className="bounding_box" style={{top:box.topRow, right :box.rightCol, bottom: box.bottomRow, left:box.leftCol}}></div>
        </div>
        
    </div>

 );


} /*<img alt="face" src="https://samples.clarifai.com/face-det.jpg"/>*/

export default FaceRecognition;