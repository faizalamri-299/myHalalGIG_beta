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