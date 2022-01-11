import React,{useContext } from 'react'
import CertBodiesList from '../screens/certbodies/CertBodiesList';
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
import {CertBodiesContext, getCertBodies } from '../screens/certbodies/CertBodies';


const CertBodiesNavigator = () => {
  
    const [certbodies, setcerbodies] = React.useState(null);
    let { path, url } = useRouteMatch();

    
  React.useEffect(() => {

    const bootstrapAsync = async () => {
      getCertBodies().then(x => {
        setcerbodies(x);
      })
    };

    bootstrapAsync();

  }, []);

  const certbodiesContext = React.useMemo(
      () => certbodies,
      [certbodies]
    );
  
  return (
    <CertBodiesContext.Provider value={certbodiesContext}>
        <Switch>
            <Route exact path={path}>
                <CertBodiesList />
            </Route>

        </Switch>
    </CertBodiesContext.Provider>
  )
}

export default CertBodiesNavigator