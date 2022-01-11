import React from 'react';
import axios from 'axios';
import {sessionRedirect} from '../../components/function';

export const HASFileContext = React.createContext();

//entahlah saya rasa macam tak gune pun ni. sebab hmmm takde crud data just download je. betul kan ? entahlah nurul. ye betul tapi Hasfilecontext tu masih gune. 
export const getHASFile = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/gethasfile').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });

}
export const deleteHASFile=x=>{
  return new Promise( (resolve, reject)=> {
    axios.post('/deletehasfile',{ pk: x }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error)
    });
  });
}


export const postHASFile = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/posthasfile',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });

}

export const createHASFile = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/createhasfile',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });

}