import React from 'react'
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
import HomePage from '../screens/client/Home';
import SupplierDetails from '../screens/supplier/SupplierDetails';
import {SupplierContext, getExp, getCertBodiesDD,getHalalCertDD} from '../screens/supplier/Supplier';


const HomePageNavigator = () => {
    const [rawMat, setRawMat] = React.useState(null);
    const [expired_date, setExpired] = React.useState(null);


    let { path, url } = useRouteMatch(); 
    React.useEffect(() => {
      const bootstrapAsync = async () => {
        getExp().then(x => {
          setExpired(x);
        })
      };
  
      bootstrapAsync();
  
    }, []);

  const homepageContext = React.useMemo(
    () =>({expired_date}),
    [expired_date]
);

  /////////////////////////////////////////////////////////raw mat//////////////////////////////////////////////////////////////////////////
    
  return (
    <SupplierContext.Provider value={homepageContext}>
        <Switch>
            <Route exact path={path}>
                <HomePage />
            </Route>
            <Route path={`${path}/detail/:index`}>
                <SupplierDetails />
            </Route>
        </Switch>
    </SupplierContext.Provider>
  )
}

export default HomePageNavigator