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

const step1Content = <h1><br></br>Fail 1</h1>;
const step2Content = <h1><br></br>Fail 2</h1>;
const step3Content = <h1><br></br>Fail 3</h1>;
const step4Content = <h1><br></br>Fail 4</h1>;
const step5Content = <h1><br></br>Fail 5</h1>;
const step6Content = <h1><br></br>Fail 6</h1>;
const step7Content = <h1><br></br>Fail 7</h1>;
const step8Content = <h1><br></br>Fail 8</h1>;
const step9Content = <h1><br></br>Fail 9</h1>;

 
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

const HASFileList = () => {

  return (
    <div style={{width:'150vh'}}>
        <StepProgressBar
            startingStep={0}
            onSubmit={onFormSubmit}
            steps={[
                {
                label: 'Fail 1',
                subtitle: '20%',
                name: 'Fail 1',
                content: step1Content
                },
                {
                label: 'Fail 2',
                subtitle: '30%',
                name: 'Fail 2',
                content: step2Content,
                },
                {
                label: 'Fail 3',
                subtitle: '40%',
                name: 'Fail 3',
                content: step3Content,
                },
                {
                label: 'Fail 4',
                subtitle: '50%',
                name: 'Fail 4',
                content: step4Content,
                },
                {
                label: 'Fail 5',
                subtitle: '60%',
                name: 'Fail 5',
                content: step5Content,
                },
                {
                label: 'Fail 6',
                subtitle: '70%',
                name: 'Fail 6',
                content: step6Content,
                },
                {
                label: 'Fail 7',
                subtitle: '80%',
                name: 'Fail 7',
                content: step7Content,
                },
                {
                label: 'Fail 8',
                subtitle: '90%',
                name: 'Fail 8',
                content: step8Content,
                },
                {
                label: 'Fail 9',
                subtitle: '100%',
                name: 'Fail 9',
                content: step9Content,
                },
            ]}
        />
  </div>
  )
}

export default HASFileList