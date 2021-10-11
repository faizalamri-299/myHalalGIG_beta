import React from 'react';
import axios from 'axios';
import {sessionRedirect} from '../../components/function';

export const SubscriptionContext = React.createContext();

export const getSubscription = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getsubscription').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getTraining = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/gettraining').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getAllTraining = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getalltraining').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getSubcrData = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getsubcrdata/'+id).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}



export const deleteSubscription=x=>{
  return new Promise( (resolve, reject)=> {
    axios.post('/deletesubscription',{ pk: x }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    
    });
  });
}

export const createSubscription = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/createsubscription',data).then(({ data }) => resolve(data))
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

export const deleteUser = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteuser',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

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

export const postTraining = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/posttraining',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postSubcr= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postsubcr',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postCopyCklist=(data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/addsubcrcklist',data).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
