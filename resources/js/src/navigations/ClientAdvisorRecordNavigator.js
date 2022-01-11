import React,{useContext } from 'react'
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
import ClientAdvisorRecord from '../screens/client/ClientAdvisorRecord';
import {getData,ClientContext,getCArecord} from '../screens/client/client';



const ClientSelectedNavigator = () => {
    const [carecord, setcarecord] = React.useState([]);
    let { path, url } = useRouteMatch();

    
  React.useEffect(() => {

    const bootstrapAsync = async () => {

    getCArecord().then(x => {
        setcarecord(x);
        });
    };


    bootstrapAsync();

  }, []);

  const clientadvisorrecordNavigator = React.useMemo(
    () => ({carecord}),
    [carecord]
);
  return (
        <ClientContext.Provider value={clientadvisorrecordNavigator}>
            <Switch>
              <Route exact path={path}>
                  <ClientAdvisorRecord/>
              </Route>
          </Switch>
        </ClientContext.Provider>
  )
}

export default ClientSelectedNavigator