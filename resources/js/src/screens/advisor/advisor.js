import React from 'react';
import axios from 'axios';
import {sessionRedirect} from '../../components/function';

export const AdvisorContext = React.createContext();

export const getProfile = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getprofile').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getData = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getclientdata').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getAdvisor = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getadvisor').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getDDlevel = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getddlevel').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getAdvisorAll = () => { //get all advisor with the company
  return new Promise( (resolve, reject)=> {
    axios.get('/getadvisorall').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postAdvisorProfile = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postadvisorprofile',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const deleteProfile=x=>{
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteprofile',{ pk: x }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error)
    });
  });
}

export const deleteAdvisor=x=>{
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteadvisor',{ pk: x }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error)
    });
  });
}

export const postAdvisorLevel = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postadvisorlevel',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}


export const postUser = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postuser',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postAdvisor = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postadvisor',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const deleteUser = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteuser',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
     
    });
  });

}

export const createProfile = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/createprofile',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });

}

export const updateADLevel= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/updateadvisorlevel',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getAdvisorDetails = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getadvisordetails/'+id).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getProfileAD = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getprofilead').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

//advisorexperience
export const getAdvsrExp = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getadvsrexp').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}
export const postAdvsrExp= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postadvsrexp',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

//advisoracademic
export const getAdvsrAca = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getadvsraca').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}
export const postAdvsrAca= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postadvsraca',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

//advisorachievement
export const getAdvsrAch = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getadvsrach').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}
export const postAdvsrAch= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postadvsrach',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

//advisoractivities
export const getAdvsrAct = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getadvsract').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}
export const postAdvsrAct= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postadvsract',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

//get semua advisor data
export const getAdvsrData = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getadvsrdata').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postAdvisorDetails= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postadvisordetails',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const updateAdvisorDetails= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/updateadvisordetails',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const deleteAdvisorDetails = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteadvisordetails/'+id).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
     
    });
  });
}

//update profil advisor
export const updateAdvisorProfile = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/updadvisorprofile',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}