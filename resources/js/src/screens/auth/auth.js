import React from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

export const onAuth = (data) => {
  return new Promise( (resolve, reject)=> {
   
    axios.get('/sanctum/csrf-cookie').then(response => {
      // Login...
      axios.post('/login', data)
        //  .then(res => res.json())
        .then(({ data }) =>{
          console.log(data);
          resolve(data)
        }).then()
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
  });
}

export const signUp = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/signup',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      reject(error.response.data);
    });
  });
}

export const advisorsignUp = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/advisorsignup',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      reject(error.response.data);
    });
  });
}

export const regCmpny=(data)=>{ 
  return new Promise( (resolve, reject)=> {
    axios.post('/registercompany',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      reject(error.response.data);
    });
  });
  
}

export const regCmpnySU=(data)=>{ 
  return new Promise( (resolve, reject)=> {
    axios.post('/registercompanysu',data).then((data) => {
      swal("Berjaya!", "Maklumat telah berjaya dikemaskini!", "success").then((result) => {
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

export const checkSession = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/user').then(({ data }) => resolve(data))
    .catch( (error)=> {
      reject(error);
    });
  });

}
export const getCustomLogin = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/customlogin').then(({ data }) => resolve(data))
    .catch( (error)=> {
      reject(error);
    });
  });

}
export const logout = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/logout').then(({ data }) => resolve(data))
    .catch( (error)=> {
      reject(error);
    });
  });

}