import React,{useContext } from 'react'
import { Input, Menu, Segment ,Dropdown,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Sidebar,
    
} from 'semantic-ui-react';

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
// import ProfileList from '../screens/profile/ProfileList';
import AdvisorList from '../screens/advisor/AdvisorList';
import AdvisorListAll from '../screens/advisor/AdvisorListAll';
// import ProfileDetails from '../screens/profile/ProfileDetails';
import AdvisorDetails from '../screens/advisor/AdvisorDetails';
// import {ProfileContext, getProfile } from '../screens/profile/profile';
import { AdvisorContext, getAdvisor,getAdvisorAll,getDDlevel } from '../screens/advisor/advisor';
import {getCompany } from '../screens/company/company';
import {getRoles } from '../components/function';
import {AuthContext} from '../screens/auth/auth';


//list all advisor(admin view)
const AdvisorNavigator = () => {
    const { profile } = React.useContext(AuthContext);
    const [usr, setusr] = React.useState(null);
    const [cmpny, setcmpny] = React.useState(null);
    const [roles, serRoles] = React.useState(null);
    const [level, setLevel] = React.useState(null);
    const [advisorall, setadvisorall] = React.useState(null);
    const [clientadvisor, setclientadvisor] = React.useState(null);
    let { path, url } = useRouteMatch();

    
  React.useEffect(() => {

    const bootstrapAsync = async () => {

      getAdvisor().then(x => {
        setusr(x);
      })

      getAdvisorAll().then(x => {
        setadvisorall(x);
      })
    };

    getCompany().then(x => {
      const ddl =  x.map((x,i) =>
      ({
        key: x.cmpnyPK,
        text: x.cmpnyName,
        value: x.cmpnyPK,
      }))
      setcmpny(ddl);
    });
    
    getRoles().then(x => {
      const ddl =  x.map((x,i) =>
      ({
        key: x.rolePK,
        text: x.rolename,
        value: x.rolePK,
      }))
      serRoles(ddl);
    });

    getDDlevel().then(x => {
      const ddl =  x.map((x,i) =>
      ({
        key: x.id,
        text: x.level_name,
        value: x.id,
      }))
      setLevel(ddl);
    });

    bootstrapAsync();

  }, []);

  const advisorContext = React.useMemo(
    () => ({usr,cmpny,roles,advisorall,level}),
    [usr,cmpny,roles,advisorall,level]
);
  return (
        <AdvisorContext.Provider value={advisorContext}>
            <Switch>
              <Route exact path={path}>
                  <AdvisorList/>
              </Route>
              <Route path={`${path}/details/:index`}>
                  <AdvisorDetails />
              </Route>
          </Switch>
        </AdvisorContext.Provider>
  )
}

export default AdvisorNavigator