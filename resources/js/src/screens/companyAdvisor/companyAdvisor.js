import React from 'react';
import axios from 'axios';
import {sessionRedirect} from '../../components/function';

export const CompanyAdvisorContext = React.createContext();

export const getCompanyAdvisor = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getcompanyadvisor').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const getCompanyAdvisorRequest = () => { //get requested from client
  return new Promise( (resolve, reject)=> {
    axios.get('/getcompanyadvisorrequest').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const getCompanyAdvisorRM = () => { //get raw mat company
  return new Promise( (resolve, reject)=> {
    axios.get('/getcompanyadvisorrm').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const updateCompanyAdvisor = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/updcompany',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const getStaff = (cmpnyID) => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getstaffcmpny/'+cmpnyID).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateCompanyAdvisorStatus = (data) => { // update status requested 
  return new Promise( (resolve, reject)=> {
    axios.post('/updatecompnayadvisorstatus',data).then((data) => {
      swal("Berjaya!", "Maklumat Permohonan telah berjaya dikemaskini!", "success").then((result) => {
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