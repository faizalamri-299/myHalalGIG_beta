import React from 'react';
import axios from 'axios';
import {sessionRedirect} from '../../components/function';

export const HalalFileContext = React.createContext();


export const getProduct = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getproductdetailsHFP').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postLabAnalysis = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postlabanalysis',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const getLabAnalysis = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getlabanalysis').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postRawMat=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postRawMat', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                //location.reload();
              } else {
                //location.reload();
              }
            });
              ({ data }) => resolve(data);
          })
          .catch( (error)=> {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
            console.log(error.config);
            reject(error.response.data);
          });
    });
 }