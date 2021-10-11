import React from 'react';
import axios from 'axios';
import {sessionRedirect} from '../../components/function';

export const UploadHASContext = React.createContext();

/////////////////////////////////////file 1 (halalpolicy)////////////////////////
export const getHASHalalpolicy = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASHalalpolicy').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASHalalpolicy=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASHalalpolicy', data,config)
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

 export const deleteHASHalalpolicy = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASHalalpolicy',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
 ///////////////////////////////////////////file 2.1 (orgchart)/////////////////////////////////
 export const getHASOrgchart = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASOrgchart').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASOrgchart=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASOrgchart', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload();
              } else {
                location.reload();
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

 export const deleteHASOrgchart = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASOrgchart',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
////////////////////////////////////File 2.2 (TOR)/////////////////////////////////////////
export const getHASTor = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASTor').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASTor=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASTor', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload();
              } else {
                location.reload();
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

 export const deleteHASTor = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASTor',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
/////////////////////////////////file 2.3 (employment letter)////////////////////
export const getHASEmpletter = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASEmpletter').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASEmpletter=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASEmpletter', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload();
              } else {
                location.reload();
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

 export const deleteHASEmpletter = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASEmpletter',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
/////////////////////////////file 3 (audit checklist)///////////////////////
export const getHASAudit = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASAudit').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASAudit=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASAudit', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload();
              } else {
                location.reload();
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

 export const deleteHASAudit = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASAudit',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//////////////////////////////////file 5 (halal risk)///////////////////////////
export const getHASHalalrisk = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASHalalrisk').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASHalalrisk=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASHalalrisk', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload();
              } else {
                location.reload();
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

 export const deleteHASHalalrisk = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASHalalrisk',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//////////////////////////////file 6 (halal training)///////////////////////////
export const getHASTraining = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASTraining').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASTraining=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASTraining', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload();
              } else {
                location.reload();
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

 export const deleteHASTraining = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASTraining',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//////////////////////////////////////////////////////////////////////////////////////////

// export const postLabAnalysis = (data) => {
//   return new Promise( (resolve, reject)=> {
//     axios.post('/postlabanalysis',data).then(({ data }) => resolve(data))
//     .catch( (error)=> {
//       sessionRedirect(error);
//       reject(error);
//     });
//   });
// }
// export const getLabAnalysis = () => {
//   return new Promise( (resolve, reject)=> {
//     axios.get('/getlabanalysis').then(({ data }) => resolve(data))
//     .catch( (error)=> {
//       sessionRedirect(error);
//       reject(error);
//     });
//   });
// }
//////////////////////////////////////////////////////////////////FILE NO 5 (RAW MATERIAL LIST)////////////////////////////////////////////////////////////////////////////////////
export const getHASRawMat = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASRawMat').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASRawMat=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASRawMat', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat Bahan Mentah telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload(); //if click button ok, apa dia buat
              } else {
                location.reload();
              }
            }); //contoh untuk display error and success message
              ({ data }) => resolve(data);
          })
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

 export const deleteHASRawMat = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASRawMat',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
 //////////////////////////////////////////////////////////////////FILE NO 5 (RAW MATERIAL LIST)////////////////////////////////////////////////////////////////////////////////////

 //////////////////////////////////////////////////////////////////FILE NO 5.1 (RAW MATERIAL SOP)////////////////////////////////////////////////////////////////////////////////////
export const getHASSOPRawMat = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASSOPRawMat').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASSOPRawMat=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASSOPRawMat', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat Bahan Mentah telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload(); //if click button ok, apa dia buat
              } else {
                location.reload();
              }
            }); //contoh untuk display error and success message
              ({ data }) => resolve(data);
          })
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

 export const deleteHASSOPRawMat = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASSOPRawMat',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
 //////////////////////////////////////////////////////////////////FILE NO 5.1 (RAW MATERIAL SOP)////////////////////////////////////////////////////////////////////////////////////

 //////////////////////////////////////////////////////////////////FILE NO 7.1 (TRACEABILITY)////////////////////////////////////////////////////////////////////////////////////
export const getHASTraceability = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASTraceability').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASTraceability=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASTraceability', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat Bahan Mentah telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload(); //if click button ok, apa dia buat
              } else {
                location.reload();
              }
            }); //contoh untuk display error and success message
              ({ data }) => resolve(data);
          })
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

 export const deleteHASTraceability = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASTraceability',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
 //////////////////////////////////////////////////////////////////FILE NO 7.1 (TRACEABILITY)////////////////////////////////////////////////////////////////////////////////////

 //////////////////////////////////////////////////////////////////FILE NO 7.2 (TRACEABILITY SOP)////////////////////////////////////////////////////////////////////////////////////
export const getHASSOPTraceability = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASSOPTraceability').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASSOPTraceability=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASSOPTraceability', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat Bahan Mentah telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload(); //if click button ok, apa dia buat
              } else {
                location.reload();
              }
            }); //contoh untuk display error and success message
              ({ data }) => resolve(data);
          })
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

 export const deleteHASSOPTraceability = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASSOPTraceability',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
 //////////////////////////////////////////////////////////////////FILE NO 7.2 (TRACEABILITY SOP)////////////////////////////////////////////////////////////////////////////////////

 //////////////////////////////////////////////////////////////////FILE NO 7.3 (PRODUCT RECALL SOP)////////////////////////////////////////////////////////////////////////////////////
export const getHASSOPProductRecall = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASSOPProductRecall').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASSOPProductRecall=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASSOPProductRecall', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat Bahan Mentah telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload(); //if click button ok, apa dia buat
              } else {
                location.reload();
              }
            }); //contoh untuk display error and success message
              ({ data }) => resolve(data);
          })
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

 export const deleteHASSOPProductRecall = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASSOPProductRecall',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
 //////////////////////////////////////////////////////////////////FILE NO 7.3 (PRODUCT RECALL SOP)////////////////////////////////////////////////////////////////////////////////////

 //////////////////////////////////////////////////////////////////FILE NO 8 (HAS CHECKLIST)////////////////////////////////////////////////////////////////////////////////////
export const getHASChecklist = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASChecklist').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASChecklist=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASChecklist', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat Bahan Mentah telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload(); //if click button ok, apa dia buat
              } else {
                location.reload();
              }
            }); //contoh untuk display error and success message
              ({ data }) => resolve(data);
          })
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

 export const deleteHASChecklist = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASChecklist',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
 //////////////////////////////////////////////////////////////////FILE NO 8 (HAS CHECKLIST)////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////FILE NO 9 (LAB ANALYSIS)////////////////////////////////////////////////////////////////////////////////////
export const getHASLabAnalysis = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASLabAnalysis').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASLabAnalysis=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASLabAnalysis', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat Bahan Mentah telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload(); //if click button ok, apa dia buat
              } else {
                location.reload();
              }
            }); //contoh untuk display error and success message
              ({ data }) => resolve(data);
          })
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

 export const deleteHASLabAnalysis = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASLabAnalysis',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
 //////////////////////////////////////////////////////////////////FILE NO 9 (LAB ANALYSIS)////////////////////////////////////////////////////////////////////////////////////

 //////////////////////////////////////////////////////////////////FILE NO 10.1 (RAW MATERIAL LIST)////////////////////////////////////////////////////////////////////////////////////
export const getHASSertu = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASSertu').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASSertu=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASSertu', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat Bahan Mentah telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload(); //if click button ok, apa dia buat
              } else {
                location.reload();
              }
            }); //contoh untuk display error and success message
              ({ data }) => resolve(data);
          })
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

 export const deleteHASSertu = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASSertu',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
 //////////////////////////////////////////////////////////////////FILE NO 10.1 (RAW MATERIAL LIST)////////////////////////////////////////////////////////////////////////////////////

 //////////////////////////////////////////////////////////////////FILE NO 10.2 (RAW MATERIAL SOP)////////////////////////////////////////////////////////////////////////////////////
export const getHASSOPSertu = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHASSOPSertu').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postHASSOPSertu=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHASSOPSertu', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat Bahan Mentah telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                location.reload(); //if click button ok, apa dia buat
              } else {
                location.reload();
              }
            }); //contoh untuk display error and success message
              ({ data }) => resolve(data);
          })
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

 export const deleteHASSOPSertu = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHASSOPSertu',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
 //////////////////////////////////////////////////////////////////FILE NO 10.2 (RAW MATERIAL SOP)////////////////////////////////////////////////////////////////////////////////////