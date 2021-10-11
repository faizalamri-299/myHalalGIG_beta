import React from 'react';
import axios from 'axios';
import {sessionRedirect} from '../../components/function';

export const SupplierContext = React.createContext();

/////////////////////////////////////////////////////////////////////GET FOR INDEX//////////////////////////////////////////////////////////////////////////////////////////
export const getSupplier = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getsupplier').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}


export const getCertBodies = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getcertbodies').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getExp = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getexp').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getSupportDoc = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getsupportdoc').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}
/////////////////////////////////////////////////////////////////////GET FOR INDEX//////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////GET FOR DROPDOWN//////////////////////////////////////////////////////////////////////////////////////////
export const getCertBodiesDD = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getcertbodiesdd').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getHalalCertDD = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.get('/gethalalcertdd/'+id).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}
/////////////////////////////////////////////////////////////////////GET FOR DROPDOWN//////////////////////////////////////////////////////////////////////////////////////////

export const getSupplierData = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getsupplierdata/'+id).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

/////////////////////////////////////////////////////////////////////////////////supplier part/////////////////////////////////////////////////////////////////////////////////
export const postSupplier = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postsupplier',data).then(({ data }) => resolve(data), 
    swal("Berjaya!", "Maklumat Pembekal telah berjaya disimpan!", "success").then((result) => {
      console.log(result);
      if(result) {
       // location.reload(); //if click button ok, apa dia buat
      } else {
        //location.reload();
      }
    }) //contoh untuk display error and success message
  )
  .catch((error)=> {
    console.log("ajax error");
      swal("Error", "Something goes wrong!", "error");
  });
});
}

export const updateSupplier= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/updatesupplier',data).then((data) => {
      swal("Berjaya!", "Maklumat Pembekal telah berjaya dikemaskini!", "success").then((result) => {
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

export const deleteSupplier=x=>{
  return new Promise( (resolve, reject)=> {
    axios.post('/deletesupplier',{ pk: x }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error)
    });
  });
}


/////////////////////////////////////////////////////////////////////////////////supplier part/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////support doc part/////////////////////////////////////////////////////////////////////////////////
export const postSupportDoc = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postsupportdoc',data).then(({ data }) => resolve(data), 
    swal("Berjaya!", "Dokumen Sokongan telah berjaya disimpan!", "success").then((result) => {
      console.log(result);
      if(result) {
        //location.reload(); //if click button ok, apa dia buat
      } else {
        //location.reload();
      }
    }) //contoh untuk display error and success message
  )
  .catch((error)=> {
    console.log("ajax error");
      swal("Error", "Something goes wrong!", "error");
  });
});
}

export const updateSupportDoc= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/updatesupportdoc',data).then((data) => {
      swal("Berjaya!", "Maklumat Pembekal telah berjaya dikemaskini!", "success").then((result) => {
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

export const deleteSupportDoc=x=>{
  return new Promise( (resolve, reject)=> {
    axios.post('/deletesupportdoc',{ pk: x }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error)
    });
  });
}


/////////////////////////////////////////////////////////////////////////////////support doc part/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////cert bodies part/////////////////////////////////////////////////////////////////////////////////

export const postSupplierCert= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postsuppliercert',data).then((data) => {
      swal("Berjaya!", "Maklumat Sijil Halal telah berjaya disimpan!", "success").then((result) => {
        console.log(result);
        if(result) {
         // location.reload(); //if click button ok, apa dia buat
        } else {
          //location.reload();
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

export const updateSupplierCert= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/updatesuppliercert',data).then((data) => {
      swal("Berjaya!", "Maklumat Sijil Halal telah berjaya dikemaskini!", "success").then((result) => {
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

export const deleteSupplierCert = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deletesuppliercert',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
     
    });
  });

}
/////////////////////////////////////////////////////////////////////////////////raw material part/////////////////////////////////////////////////////////////////////////////////
export const postMaterial= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postmaterial',data).then((data) => {
      swal("Berjaya!", "Maklumat Bahan Mentah telah berjaya disimpan!", "success").then((result) => {
        console.log(result);
        if(result) {
          //location.reload(); //if click button ok, apa dia buat
        } else {
          //location.reload();
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

export const postMaterialSuppDoc=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postmaterialsuppdoc', data,config)
          .then((data) => {
            swal("Berjaya!", "Maklumat Bahan Mentah telah berjaya disimpan!", "success").then((result) => {
              console.log(result);
              if(result) {
                
              } else {
                
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


export const updateRawMaterial= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/updaterawmaterial',data).then((data) => {
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
    .catch((error)=> {
      console.log("ajax error");
        swal("Error", "Something goes wrong!", "error");
    });
  });
}

export const deleteRawMaterial = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleterawmaterial',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
/////////////////////////////////////////////////////////////////////////////////raw material part/////////////////////////////////////////////////////////////////////////////////


