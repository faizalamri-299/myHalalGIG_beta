import React from 'react';
import axios from 'axios';
import {sessionRedirect} from '../../components/function';

export const CertBodiesContext = React.createContext();

export const getCertBodies = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getcertbodies').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postCB = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postcb',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const updateCB= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/updatecb',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const deleteCB=x=>{
  return new Promise( (resolve, reject)=> {
    axios.post('/deletecb',{ pk: x }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}