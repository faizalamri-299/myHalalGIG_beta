import React,{useContext } from 'react'
import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
import ClientAdvisorList from '../screens/client/ClientAdvisorList';
import ClientAdvisorListDetails from '../screens/client/ClientAdvisorListDetails';
import {getData,ClientContext,getAdSelected} from '../screens/client/client';



const ClientSelectedNavigator = () => {
    const [adselected, setadselected] = React.useState([]);
    let { path, url } = useRouteMatch();

    
  React.useEffect(() => {

    const bootstrapAsync = async () => {

    getAdSelected().then(x => {
        setadselected(x);
        });
    };


    bootstrapAsync();

  }, []);

  const clientSelectedNavigator = React.useMemo(
    () => ({adselected}),
    [adselected]
);
  return (
        <ClientContext.Provider value={clientSelectedNavigator}>
            <Switch>
              <Route exact path={path}>
                  <ClientAdvisorList/>
              </Route>
              <Route path={`${path}/detail/:index`}>
                <ClientAdvisorListDetails />
            </Route>
          </Switch>
        </ClientContext.Provider>
  )
}

export default ClientSelectedNavigator