import React from 'react'
import { Input, Menu, Segment ,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Sidebar,
    
} from 'semantic-ui-react';
// import the progress bar
import StepProgressBar from 'react-step-progress';
// import the stylesheet
import 'react-step-progress/dist/index.css';



 
// setup step validators, will be called before proceeding to the next step
function step2Validator() {
  // return a boolean
}
 
function step3Validator() {
  // return a boolean
}
 
function onFormSubmit() {
  // handle the submit logic here
  // This function will be executed at the last step
  // when the submit button (next button in the previous steps) is pressed
}

const HomeScreen = () => {

  return (
    <div style={{width:'150vh'}}>
      Home Page
  </div>
  )
}

export default HomeScreen