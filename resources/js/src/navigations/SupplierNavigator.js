import React from 'react'
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
import SupplierList from '../screens/supplier/SupplierList';
import SupplierDetails from '../screens/supplier/SupplierDetails';
import {SupplierContext, getSupplier, getCertBodiesDD,getHalalCertDD,getSupportDoc} from '../screens/supplier/Supplier';


const SupplierNavigator = () => {
    const [rawMat, setRawMat] = React.useState(null);
    const [supplier, setSupplier] = React.useState(null);
    const [certbodies, setCertBodies] = React.useState(null);
    const [halalcert, setHalalCert] = React.useState(null);
    const [supportdoc, setSupportDoc] = React.useState(null);

    let { path, url } = useRouteMatch(); 
    React.useEffect(() => {
      const bootstrapAsync = async () => {
        getSupplier().then(x => {
          setSupplier(x);
        })

        getSupportDoc().then(x => {
          setSupportDoc(x);
        })
      };

      getCertBodiesDD().then(x => {
        const ddl =  x.map((x,i) =>
        ({
          key: x.id,
          text: x.cb_name,
          value: x.cb_name,
        }))
        setCertBodies(ddl);
      });


      getHalalCertDD().then(x => {
        const ddl =  x.map((x,i) =>
        ({
          key: x.id,
          text: x.spcb_cert_bodies,
          value: x.spcb_cert_bodies,
        }))
        setHalalCert(ddl);
      });
  
      bootstrapAsync();
  
    }, []);

  const supplierContext = React.useMemo(
    () =>({supplier,supportdoc,certbodies,halalcert}),
    [supplier,supportdoc,certbodies,halalcert]
);

  /////////////////////////////////////////////////////////raw mat//////////////////////////////////////////////////////////////////////////
    
  return (
    <SupplierContext.Provider value={supplierContext}>
        <Switch>
            <Route exact path={path}>
                <SupplierList />
            </Route>
            <Route path={`${path}/detail/:index`}>
                <SupplierDetails />
            </Route>

        </Switch>
    </SupplierContext.Provider>
  )
}

export default SupplierNavigator