import React from 'react';
import axios from 'axios';
import {sessionRedirect} from '../../components/function';

export const UploadHalalContext = React.createContext();

 //-----------------------------------------------------SIJIL PENDAFTARAN--------------------------------------------------------------//
export const getHALALSijilPendaftaran = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALSijilPendaftaran').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALSijilPendaftaran = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALSijilPendaftaran',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALSijilPendaftaran=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALSijilPendaftaran', data,config)
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

 export const deleteHALALSijilPendaftaran = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALSijilPendaftaran',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------SIJIL PENDAFTARAN--------------------------------------------------------------//

//-----------------------------------------------------HALALSusunAtur--------------------------------------------------------------//
export const getHALALSusunAtur = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALSusunAtur').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALSusunAtur = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALSusunAtur',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALSusunAtur=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALSusunAtur', data,config)
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

 export const deleteHALALSusunAtur = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALSusunAtur',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALSusunAtur--------------------------------------------------------------//

//-----------------------------------------------------LESEN PERNIAGAAN--------------------------------------------------------------//
export const getHALALLesenPerniagaan = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALLesenPerniagaan').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALLesenPerniagaan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALLesenPerniagaan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALLesenPerniagaan=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALLesenPerniagaan', data,config)
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

 export const deleteHALALLesenPerniagaan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALLesenPerniagaan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------LESEN PERNIAGAAN--------------------------------------------------------------//

//-----------------------------------------------------SURAT LANTIKAN--------------------------------------------------------------//
export const getHALALSuratLantikan = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALSuratLantikan').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALSuratLantikan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALSuratLantikan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALSuratLantikan=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALSuratLantikan', data,config)
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

 export const deleteHALALSuratLantikan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALSuratLantikan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------SURAT LANTIKAN--------------------------------------------------------------//

//-----------------------------------------------------PETA LOKASI--------------------------------------------------------------//
export const getHALALPetaLokasi = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALPetaLokasi').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALPetaLokasi = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALPetaLokasi',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALPetaLokasi=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALPetaLokasi', data,config)
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

 export const deleteHALALPetaLokasi = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALPetaLokasi',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------PETA LOKASI--------------------------------------------------------------//

//-----------------------------------------------------PENYATA KEWANGAN--------------------------------------------------------------//
export const getHALALPenyataKewangan = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALPenyataKewangan').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALPenyataKewangan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALPenyataKewangan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALPenyataKewangan=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALPenyataKewangan', data,config)
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

 export const deleteHALALPenyataKewangan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALPenyataKewangan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------PENYATA KEWANGAN--------------------------------------------------------------//

//-----------------------------------------------------SIJIL HALAL--------------------------------------------------------------//
export const getHALALSijilHalal = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALSijilHalal').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALSijilHalal = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALSijilHalal',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALSijilHalal=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALSijilHalal', data,config)
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

 export const deleteHALALSijilHalal = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALSijilHalal',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------SIJIL HALAL--------------------------------------------------------------//

//-----------------------------------------------------CARTA ALIR--------------------------------------------------------------//
export const getHALALCartaAlir = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALCartaAlir').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALCartaAlir = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALCartaAlir',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALCartaAlir=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALCartaAlir', data,config)
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

 export const deleteHALALCartaAlir = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALCartaAlir',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------CARTA ALIR--------------------------------------------------------------//

//-----------------------------------------------------PEMBUNGKUSAN--------------------------------------------------------------//
export const getHALALPembungkusan = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALPembungkusan').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALPembungkusan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALPembungkusan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALPembungkusan=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALPembungkusan', data,config)
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

 export const deleteHALALPembungkusan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALPembungkusan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------PEMBUNGKUSAN--------------------------------------------------------------//

//-----------------------------------------------------PERMOHONAN LENGKAP--------------------------------------------------------------//
export const getHALALPermohonanLengkap = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALPermohonanLengkap').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALPermohonanLengkap = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALPermohonanLengkap',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALPermohonanLengkap=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALPermohonanLengkap', data,config)
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

 export const deleteHALALPermohonanLengkap = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALPermohonanLengkap',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------PERMOHONAN LENGKAP--------------------------------------------------------------//

//-----------------------------------------------------JAMINAN HALAL--------------------------------------------------------------//
export const getHALALJaminanHalal = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALJaminanHalal').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALJaminanHalal = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALJaminanHalal',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALJaminanHalal=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALJaminanHalal', data,config)
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

 export const deleteHALALJaminanHalal = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALJaminanHalal',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------JAMINAN HALAL--------------------------------------------------------------//

//-----------------------------------------------------PEST CONTROL--------------------------------------------------------------//
export const getHALALPestControl = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALPestControl').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALPestControl = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALPestControl',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALPestControl=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALPestControl', data,config)
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

 export const deleteHALALPestControl = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALPestControl',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------PEST CONTROL--------------------------------------------------------------//

//-----------------------------------------------------MAKLUMAT PEKERJA--------------------------------------------------------------//
export const getHALALMaklumatPekerja = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALMaklumatPekerja').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALMaklumatPekerja = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALMaklumatPekerja',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALMaklumatPekerja=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALMaklumatPekerja', data,config)
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

 export const deleteHALALMaklumatPekerja = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALMaklumatPekerja',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------MAKLUMAT PEKERJA--------------------------------------------------------------//

//-----------------------------------------------------PENGELUARAN PRODUK--------------------------------------------------------------//
export const getHALALPengeluaranProduk = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALPengeluaranProduk').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALPengeluaranProduk = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALPengeluaranProduk',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALPengeluaranProduk=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALPengeluaranProduk', data,config)
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

 export const deleteHALALPengeluaranProduk = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALPengeluaranProduk',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------PENGELUARAN PRODUK--------------------------------------------------------------//

//-----------------------------------------------------INVOIS--------------------------------------------------------------//
export const getHALALInvois = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALInvois').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALInvois = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALInvois',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALInvois=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALInvois', data,config)
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

 export const deleteHALALInvois = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALInvois',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------INVOIS--------------------------------------------------------------//

//-----------------------------------------------------SURAT KKM--------------------------------------------------------------//
export const getHALALSuratKKM = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALSuratKKM').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALSuratKKM = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALSuratKKM',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALSuratKKM=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALSuratKKM', data,config)
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

 export const deleteHALALSuratKKM = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALSuratKKM',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------SURAT KKM--------------------------------------------------------------//

//-----------------------------------------------------PERMIT IMPORT--------------------------------------------------------------//
export const getHALALPermitImport = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALPermitImport').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALPermitImport = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALPermitImport',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALPermitImport=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALPermitImport', data,config)
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

 export const deleteHALALPermitImport = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALPermitImport',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------PERMIT IMPORT--------------------------------------------------------------//

//-----------------------------------------------------SUNTIKAN THYPOID--------------------------------------------------------------//
export const getHALALSuntikanThypoid = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALSuntikanThypoid').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALSuntikanThypoid = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALSuntikanThypoid',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALSuntikanThypoid=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALSuntikanThypoid', data,config)
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

 export const deleteHALALSuntikanThypoid = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALSuntikanThypoid',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------SUNTIKAN THYPOID--------------------------------------------------------------//

//-----------------------------------------------------HALALAliranPergerakan--------------------------------------------------------------//
export const getHALALAliranPergerakan = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALAliranPergerakan').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALAliranPergerakan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALAliranPergerakan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALAliranPergerakan=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALAliranPergerakan', data,config)
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

 export const deleteHALALAliranPergerakan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALAliranPergerakan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALAliranPergerakan--------------------------------------------------------------//

//-----------------------------------------------------HALALDokumenMS--------------------------------------------------------------//
export const getHALALDokumenMS = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALDokumenMS').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALDokumenMS = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALDokumenMS',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALDokumenMS=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALDokumenMS', data,config)
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

 export const deleteHALALDokumenMS = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALDokumenMS',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALDokumenMS--------------------------------------------------------------//

//-----------------------------------------------------HALALKumpulanPembuatan--------------------------------------------------------------//
export const getHALALKumpulanPembuatan = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALKumpulanPembuatan').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALKumpulanPembuatan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALKumpulanPembuatan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALKumpulanPembuatan=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALKumpulanPembuatan', data,config)
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

 export const deleteHALALKumpulanPembuatan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALKumpulanPembuatan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALKumpulanPembuatan--------------------------------------------------------------//

//-----------------------------------------------------HALALLesenPengilang--------------------------------------------------------------//
export const getHALALLesenPengilang = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALLesenPengilang').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALLesenPengilang = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALLesenPengilang',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALLesenPengilang=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALLesenPengilang', data,config)
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

 export const deleteHALALLesenPengilang = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALLesenPengilang',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALLesenPengilang--------------------------------------------------------------//

//-----------------------------------------------------HALALLesenPergudangan--------------------------------------------------------------//
export const getHALALLesenPergudangan = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALLesenPergudangan').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALLesenPergudangan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALLesenPergudangan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALLesenPergudangan=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALLesenPergudangan', data,config)
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

 export const deleteHALALLesenPergudangan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALLesenPergudangan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALLesenPergudangan--------------------------------------------------------------//

//-----------------------------------------------------HALALMaklumatKesihatan--------------------------------------------------------------//
export const getHALALMaklumatKesihatan = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALMaklumatKesihatan').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALMaklumatKesihatan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALMaklumatKesihatan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALMaklumatKesihatan=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALMaklumatKesihatan', data,config)
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

 export const deleteHALALMaklumatKesihatan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALMaklumatKesihatan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALMaklumatKesihatan--------------------------------------------------------------//

//-----------------------------------------------------HALALNotaNotifikasiProduk--------------------------------------------------------------//
export const getHALALNotaNotifikasiProduk = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALNotaNotifikasiProduk').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALNotaNotifikasiProduk = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALNotaNotifikasiProduk',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALNotaNotifikasiProduk=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALNotaNotifikasiProduk', data,config)
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

 export const deleteHALALNotaNotifikasiProduk = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALNotaNotifikasiProduk',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALNotaNotifikasiProduk--------------------------------------------------------------//

//-----------------------------------------------------HALALPengendaliMakanan--------------------------------------------------------------//
export const getHALALPengendaliMakanan = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALPengendaliMakanan').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALPengendaliMakanan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALPengendaliMakanan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALPengendaliMakanan=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALPengendaliMakanan', data,config)
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

 export const deleteHALALPengendaliMakanan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALPengendaliMakanan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALPengendaliMakanan--------------------------------------------------------------//

//-----------------------------------------------------HALALPengesananHalal--------------------------------------------------------------//
export const getHALALPengesananHalal = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALPengesananHalal').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALPengesananHalal = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALPengesananHalal',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALPengesananHalal=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALPengesananHalal', data,config)
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

 export const deleteHALALPengesananHalal = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALPengesananHalal',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALPengesananHalal--------------------------------------------------------------//

//-----------------------------------------------------HALALPengilanganProduk--------------------------------------------------------------//
export const getHALALPengilanganProduk = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALPengilanganProduk').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALPengilanganProduk = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALPengilanganProduk',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALPengilanganProduk=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALPengilanganProduk', data,config)
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

 export const deleteHALALPengilanganProduk = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALPengilanganProduk',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALPengilanganProduk--------------------------------------------------------------//

//-----------------------------------------------------HALALPerakuanProduk--------------------------------------------------------------//
export const getHALALPerakuanProduk = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALPerakuanProduk').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALPerakuanProduk = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALPerakuanProduk',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALPerakuanProduk=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALPerakuanProduk', data,config)
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

 export const deleteHALALPerakuanProduk = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALPerakuanProduk',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALPerakuanProduk--------------------------------------------------------------//

//-----------------------------------------------------HALALRekodSembelihan--------------------------------------------------------------//
export const getHALALRekodSembelihan = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALRekodSembelihan').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALRekodSembelihan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALRekodSembelihan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALRekodSembelihan=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALRekodSembelihan', data,config)
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

 export const deleteHALALRekodSembelihan = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALRekodSembelihan',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALRekodSembelihan--------------------------------------------------------------//

//-----------------------------------------------------HALALRekodSertu--------------------------------------------------------------//
export const getHALALRekodSertu = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALRekodSertu').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALRekodSertu = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALRekodSertu',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALRekodSertu=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALRekodSertu', data,config)
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

 export const deleteHALALRekodSertu = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALRekodSertu',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALRekodSertu--------------------------------------------------------------//

//-----------------------------------------------------HALALSuratPerakuanJPV--------------------------------------------------------------//
export const getHALALSuratPerakuanJPV = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALSuratPerakuanJPV').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALSuratPerakuanJPV = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALSuratPerakuanJPV',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALSuratPerakuanJPV=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALSuratPerakuanJPV', data,config)
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

 export const deleteHALALSuratPerakuanJPV = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALSuratPerakuanJPV',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALSuratPerakuanJPV--------------------------------------------------------------//

//-----------------------------------------------------HALALSuratTauliahPenyembelih--------------------------------------------------------------//
export const getHALALSuratTauliahPenyembelih = () => {
  return new Promise( (resolve, reject)=> {
    axios.get('/getHALALSuratTauliahPenyembelih').then(({ data }) => resolve(data))
    .catch( (error)=> {
      sessionRedirect(error)
      reject(error);
    });
  });
}

export const downloadHALALSuratTauliahPenyembelih = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/downloadHALALSuratTauliahPenyembelih',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}

export const postHALALSuratTauliahPenyembelih=(data,progress)=>{
  return new Promise( (resolve, reject)=> {
    const config = {
      onUploadProgress: progress
  }
    axios.post('/postHALALSuratTauliahPenyembelih', data,config)
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

 export const deleteHALALSuratTauliahPenyembelih = (id) => {
  return new Promise( (resolve, reject)=> {
    axios.post('/deleteHALALSuratTauliahPenyembelih',{ id }).then((d) => resolve(d))
    .catch( (error)=> {
      sessionRedirect(error);
      reject(error);
    });
  });
}
//-----------------------------------------------------HALALSuratTauliahPenyembelih--------------------------------------------------------------//