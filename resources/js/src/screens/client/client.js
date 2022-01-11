import React from 'react';
import axios from 'axios';
import {sessionRedirect} from '../../components/function';
import swal from 'sweetalert';

export const ClientContext = React.createContext();


export const getData = () => {
    return new Promise( (resolve, reject)=> {
      axios.get('/getclientdata').then(({ data }) => resolve(data))
      .catch( (error)=> {
        sessionRedirect(error)
        reject(error);
      });
    });
  }

export const saveChecklist = (data) => {

  return new Promise( (resolve, reject)=> {
    axios.post('/postclientcklist',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const getCompany = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getcompany').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const updateCompany = (data) => {
  return new Promise((resolve, reject)=> {
    axios.post('/updcompany',data).then(( data ) => {
      swal("Berjaya!", "Maklumat syarikat telah berjaya dikemaskini", "success").then((result) => {
        console.log(result);
        if(result) {
          location.reload(); //if click button ok, apa dia buat
        } else {
          location.reload();
        }
      }); //contoh untuk display error and success message
        ({ data }) => resolve(data);
    })
    .catch((error)=> {
      console.log("ajax error");
      swal("Error", "Something goes wrong!", "error");
    });
  });
}

// export const updateCompany = (data) => {
//   return new Promise((resolve, reject)=> {
//     axios.post('/updcompany',data).then(({ data }) => resolve(data))
//     .catch( (error)=> {
//       sessionRedirect(error);
//       reject(error);
//     });
//   });
// }

export const postPremise = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postpremise',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
export const postIHC = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postihc',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
export const postTraining = (data,progress) => {
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/posttraining',data,config).then(({ data }) => resolve(data))
    .catch( (error)=> {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      reject(error.response.data);
    });
  });
}
// export const postTraining = (data) => {
//   return new Promise( (resolve, reject)=> {
//     axios.post('/posttraining',data).then(({ data }) => resolve(data))
//     .catch( (error)=> {
//       sessionRedirect(error);
//       reject(error);
//     });
//   });
// }

export const postFile = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/file-upload',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const getAdvisorClient = () => { //get all list of advisor available
  return new Promise( (resolve, reject)=> {
    axios.get('/getadvisorclient').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getAdSelected = () => { //get the selected advisor
  return new Promise( (resolve, reject)=> {
    axios.get('/getadselected').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getCArecord = () => { //get all the record of advisor and client
  return new Promise( (resolve, reject)=> {
    axios.get('/getcarecord').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}


export const postAdvisorDetails= (data) => { //post advisor application from client
  return new Promise((resolve, reject)=> {
    axios.post('/postadvisordetails',data).then((data) => {
      swal("Berjaya!", "Permohonan Advisor Anda Telah Berjaya!", "success").then((result) => {
        console.log(result);
        if(result) {
          location.reload(); //if click button ok, apa dia buat
        } else {
          location.reload();
        }
      }); //contoh untuk display error and success message
        ({ data }) => resolve(data);
    })
    .catch((error)=> {
      console.log("ajax error");
        swal("Error", "Something goes wrong!", "error");
    });
  });
}

export const postRating= (data) => { //post client rate advisor
  return new Promise((resolve, reject)=> {
    axios.post('/postrating',data).then((data) => {
      swal("Terima Kasih!", "Maklumbalas anda telah disimpan!", "success").then((result) => {
        console.log(result);
        if(result) {
          location.reload(); //if click button ok, apa dia buat
        } else {
          location.reload();
        }
      }); //contoh untuk display error and success message
        ({ data }) => resolve(data);
    })
    .catch((error)=> {
      console.log("ajax error");
        swal("Error", "Something goes wrong!", "error");
    });
  });
}



export const deleteApplication=x=>{ //delete application if failed
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteApplication',{ pk: x }).then((data) => {
      swal("Berjaya!", "Permohonan Advisor Anda Telah Berjaya Dibatalkan!", "success").then((result) => {
        console.log(result);
        if(result) {
          location.reload(); //if click button ok, apa dia buat
        } else {
          location.reload();
        }
      }); //contoh untuk display error and success message
        ({ data }) => resolve(data);
    })
    .catch((error)=> {
      console.log("ajax error");
        swal("Error", "Something goes wrong!", "error");
    });
  });
}

