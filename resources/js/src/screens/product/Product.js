import React from 'react';
import axios from 'axios';
import {sessionRedirect} from '../../components/function';

export const ProductContext = React.createContext();


export const getProduct = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getproduct').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}


export const postProduct = (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postproduct',data).then(({ data }) => resolve(data), 
    swal("Berjaya!", "Maklumat Pembekal telah berjaya disimpan!", "success").then((result) => {
      console.log(result);
      if(result) {
        location.reload(); //if click button ok, apa dia buat
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

export const updateProduct= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/updateproduct',data).then((data) => {
      swal("Berjaya!", "Maklumat Produk telah berjaya dikemaskini!", "success").then((result) => {
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

export const deleteProduct=x=>{
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteproduct',{ pk: x }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error)
    });
  });
}


///////////////////////////////////////////////////////////////////////////////product details///////////////////////////////////////////////////////////////////////////////////
export const getProductDetails = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getproductdetails/'+id).then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const postProductDetails= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/postproductdetails',data).then((data) => {
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

export const updateProductDetails= (data) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/updateproductdetails',data).then((data) => {
      swal("Berjaya!", "Maklumat Bahan Mentah telah berjaya dikemaskini!", "success").then((result) => {
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
export const deleteProductDetails = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteproductdetails/'+id).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
     
    });
  });
}
///////////////////////////////////////////////////////////////////////////////product details///////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////FUNCTION USED IN PRODUCTNAVIGATION////////////////////////////////////////////////////////////////////////////
export const getSupplier = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getsupplier').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const getRawMaterial = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getrawmaterial').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}
///////////////////////////////////////////////////////////////FUNCTION USED IN PRODUCTNAVIGATION////////////////////////////////////////////////////////////////////////////