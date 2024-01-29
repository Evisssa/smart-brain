
import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRcognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg';
import 'tachyons'; 

import { entries } from 'lodash';


const initialState ={
  inputImageForm : "",
            imageUrl:"",
            box :{},
            route: "signin",
            isSignedIn : false, 
            user : {    
                  id : '',  
                  name : '',
                  email : '',
                  password: '',
                  entries : 0,
                  joined :''
                  }

}

class App extends Component {

      constructor(){
          super();
          this.state = initialState;
      
      }


      loadUser=(data)=>{
        this.setState({user :{
                  id : data.id,  
                  name : data.name,
                  email : data.email,
                  password: data.password,
                  entries : data.entries,
                  joined : data.joined
            
         }}),

         () => {
          // Now you can safely access this.state.user.name
          console.log('User name:', this.state.user.name);
        }
      }
      

  onInputChange =(event) => {
    console.log("-------",event.target.value);
      
   this.setState({inputImageForm: event.target.value});
  }

   calculateFaceLocation=(data)=>{

    let boundingBox= data.outputs[0].data.regions[0].region_info.bounding_box;
       console.log(data.outputs[0].data.regions[0].region_info.bounding_box)
    const image = document.getElementById('inputImage');
    const height = Number(image.height);
    const width = Number(image.width);
    console.log(height,width); 
    

    return{
      leftCol:boundingBox.left_col*width,
      topRow:boundingBox.top_row*height,
      rightCol:width-boundingBox.right_col*width,
      bottomRow:height-boundingBox.bottom_row*height

    }

  }

  displayFaceBox=(box)=>{
    console.log("box:::::",box);
    this.setState({box:box})
  }
  
 

  onButtonSubmit=()=>{
      this.setState({imageUrl:this.state.inputImageForm})
      console.log("button clicked");
      console.log('URL:::::', this.state);
      const PAT = 'c259332a7e5840d69cc75852681017a2';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = 'clarifai';       
      const APP_ID = 'main';
      // Change these to whatever model and image URL you want to use
      const MODEL_ID = 'face-detection';
      const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
      const IMAGE_URL = this.state.inputImageForm;
     
      const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });

      const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };
      console.log('this.state.user.id:::::',this.state.user.id);


     
     

     // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      


     fetch(`http://localhost:3000/imageurl`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.inputImageForm// your id value here 
       
      })
 
    })
     .then((response) => (response.json()))
      .then(result => { 
        
        console.log( 'result :::',result)
        console.log('result',"----------///-------",result.outputs[0].data.regions[0].region_info.bounding_box)
        this.displayFaceBox(this.calculateFaceLocation(result));

        if (result){

          fetch(`http://localhost:3000/image`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id:this.state.user.id // your id value here
            })
       
          }) .then((response) => (response.json()))
          .then(res => {

            console.log('res',res);
            this.setState(prevState => ({
              user: {
                ...prevState.user,
                entries: res,
              }
            })
            /*, () => {
              // This callback function will be called after the state has been updated
             // console.log('entries', this.state.user.entries);
            }
            */
            )
            
           // this.setState(Object.assign(this.state.user, { entries: count}))

       ///     console.log("entries",entries)


          }).catch(console.log)

        }
        
      })
      .catch(error => console.log('error', error));


      
  
/*
      fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response =>{ // response.json();  console.log(response);
        console.log('userID',this.state.user.id)
       /* fetch('http://localhost:3000/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
            })

        }).then(response=>response.json())
        .then(count=>{  
          Object.assign(this.state.user, { entries: count });

        })

        console.log('response',"----------///-------",result.outputs[0].data.regions[0].region_info.bounding_box)
       /// this.displayFaceBox(this.calculateFaceLocation(response));
      }).then(result => console.log(result))
      .catch(error => console.log('error', error));
      
      */
  }

/*
  onImageSubmit=()=>{

    fetch('http://localhost:3000/register/image/',{
      method:'put',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
         id:this.state.user.id
      })
     }).then(response=>response.json())
     .then(count=>{
      this.setState({user : {entries : count}} )
     })
  }
*/
  onRouteChange =(route)=>{

     
     
    if(route==="home")
    { 
      this.setState({isSignedIn:true})
     }
     else{ //if (route==="signout") {
      this.setState({isSignedIn:false, imageUrl:""})
    }
    
     this.setState({route:route})
     // this.setState({route:"signin"})
    
  }


  
  render(){
    //array destructuring is needed to be inside render
    const {isSignedIn,imageUrl,box,route} = this.state;
    //const { onInputChange}= this.state;
   // const {route, onRouteChange}=this.state;
    return (
    <div className="App">
      <ParticlesBg  color="#000000" num={250} type="cobweb"  bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      { route ==="home"
    
        ? <div>
        <Logo/>
        <Rank
        name = {this.state.user.name}
        entries={this.state.user.entries}/>
        <ImageLinkForm 
         onInputChange={this.onInputChange}
         onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={box} imgUrl={imageUrl}/>
        </div>   
      :(route==='signin'
      ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
      :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>) 
   
      }
      
      
    </div>

  )
  
  ;}
}

 // this.state.route === 'signin'
       // ? <Signin onRouteChange={this.onRouteChange}/>
       // : <Register  onRouteChange={this.onRouteChange}/>
      // )
      

export default App;