import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm =({onInputChange,onButtonSubmit}) =>{
    return( 
        <div>
            <p>.....</p>
            <div className='center'>
                <div className ='center ba dark-gray  form pa4 br3 shadow-5' style={{ backgroundColor: 'rgba(226, 226, 226, 0.3)' }}>
                <input className ='w-100' type="text" placeholder="Enter" onChange={onInputChange} />
                <button className="w-30 grow f4 link ph3 pv2 dib button"   onClick={onButtonSubmit}  > 
                Detect</button>
            </div>
           
        
        </div>   
         

        </div>


    );
}

/*onChange={handleDetect}*onClick={handleClick}onInput={handleInput}*/

export default ImageLinkForm;