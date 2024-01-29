import React from "react";

const Navigation=({onRouteChange,isSignedIn})=>{

    if(isSignedIn){
        return (
            <nav style={{display : 'flex',justifyContent : 'end' }}>
            <p onClick={()=>onRouteChange("signout")} className="grow f3 link pa3 input-reset dark-gray bg-transparent white dim"> Sign out </p>
        </nav>
        );
    }
   else{
        return(


            
            <nav style={{display : 'flex',justifyContent : 'end' }}>
             <p onClick={()=>onRouteChange("signin")} className="grow f3 link pa3 input-reset bg-transparent white dim" > Sign in </p>
             <p onClick={()=>onRouteChange('register')}  className="grow f3 link pa3 input-reset bg-transparent white dim"> Register </p>
            </nav>

        )

   }
 
    ;


}

export default Navigation;