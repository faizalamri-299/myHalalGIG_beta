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
import CompanyAdvisorRequest from '../screens/companyAdvisor/CompanyAdvisorRequest';
import CompanyAdvisorDetails from '../screens/companyAdvisor/CompanyAdvisorDetails';
import {CompanyAdvisorContext, getCompanyAdvisor,getCompanyAdvisorRM,getCompanyAdvisorRequest} from '../screens/companyAdvisor/companyAdvisor';



const CompanyAdvisorNavigator = () => {
  
    const [companyadvisor, setcmpny] = React.useState(null);
    const [companyrm, setcompanyrm] = React.useState(null);
    const [clientrequested, setcclientrequested] = React.useState(null);
    let { path, url } = useRouteMatch();

    
  React.useEffect(() => {

    const bootstrapAsync = async () => {

      getCompanyAdvisorRequest().then(x => {
        setcclientrequested(x);
      })
      
    };
    bootstrapAsync();

  }, []);

  const companyAdvisorContext = React.useMemo(
    () => clientrequested,
    [clientrequested]
);


  return (
        <CompanyAdvisorContext.Provider value={companyAdvisorContext}>
            <Switch>
              <Route exact path={path}>
                  <CompanyAdvisorRequest />
              </Route>
          </Switch>
        </CompanyAdvisorContext.Provider>
  )
}

export default CompanyAdvisorNavigator