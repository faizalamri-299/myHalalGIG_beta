import React from 'react';
import axios from 'axios';
import {sessionRedirect} from '../../components/function';


export const AuditorContext = React.createContext();


export const getData = () => {
    return new Promise( (resolve, reject)=> {
      axios.get('/getindsubscr').then(({ data }) => resolve(data))
      .catch( (error)=> {
        sessionRedirect(error)
        reject(error);
      });
    });
  }

export const saveChecklist = (data) => {
  return new Promise((resolve, reject)=> {
    axios.post('/postclientcklist',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const getsubuserdata = () => {
    return new Promise( (resolve, reject)=> {
      axios.get('/getsubuserdata').then(({ data }) => resolve(data))
      .catch( (error)=> {
        sessionRedirect(error)
        reject(error);
      });
    });
}

export const getalluser = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getalluser').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
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