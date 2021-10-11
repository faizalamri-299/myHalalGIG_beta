import React,{useContext } from 'react'
import { Input, Menu, Segment ,Dropdown,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Sidebar,
    
} from 'semantic-ui-react';

import {AuthContext} from '../screens/auth/auth';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
import CompanyAdvisorList from '../screens/companyAdvisor/CompanyAdvisorList';
import CompanyAdvisorDetails from '../screens/companyAdvisor/CompanyAdvisorDetails';
import {CompanyAdvisorContext, getCompanyAdvisor,getCompanyAdvisorRM,getCompanyAdvisorRequest} from '../screens/companyAdvisor/companyAdvisor';
import CompanyAdvisorRequest from '../screens/companyAdvisor/CompanyAdvisorRequest';



const CompanyAdvisorNavigator = () => {
  
    const [companyadvisor, setcmpny] = React.useState(null);
    const [companyrm, setcompanyrm] = React.useState(null);
    const [clientrequested, setcclientrequested] = React.useState(null);
    let { path, url } = useRouteMatch();

    
  React.useEffect(() => {

    const bootstrapAsync = async () => {
      getCompanyAdvisor().then(x => {
        setcmpny(x);
      })
  
    };
    bootstrapAsync();

  }, []);

  const companyAdvisorContext = React.useMemo(
    () => companyadvisor,
    [companyadvisor]
);


  return (
        <CompanyAdvisorContext.Provider value={companyAdvisorContext}>
            <Switch>
              <Route exact path={path}>
                  <CompanyAdvisorList />
              </Route>
              <Route path={`${path}/details/:index`}>
                  <CompanyAdvisorDetails />
              </Route>
          </Switch>
        </CompanyAdvisorContext.Provider>
  )
}

export default CompanyAdvisorNavigator