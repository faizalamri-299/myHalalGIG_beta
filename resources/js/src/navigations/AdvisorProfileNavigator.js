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
import AdvisorProfile from '../screens/advisor/AdvisorProfile';
import { AdvisorContext,getProfileAD, getAdvsrExp, getAdvsrAca,getAdvsrAch,getAdvsrAct,getAdvsrData} from '../screens/advisor/advisor';
import {getCompany } from '../screens/company/company';
import {getRoles } from '../components/function';
import {AuthContext} from '../screens/auth/auth';


const AdvisorProfileNavigator = () => {
    const [advisorExp, setadvisorExp] = React.useState([]);
    const [advisorAca, setadvisorAca] = React.useState([]);
    const [advisorAch, setadvisorAch] = React.useState([]);
    const [advisorAct, setadvisorAct] = React.useState([]);


    // const [advisorData, setadvisorData] = React.useState([]);

    let { path, url } = useRouteMatch();

    
  React.useEffect(() => {

    const bootstrapAsync = async () => {

      // getAdvsrExp().then(x => {
      //   setadvisorExp(x);
      // });

      getAdvsrExp().then(x => {
        const ddl =  x.map((x,i) =>
        ({
          key: x.advisorExpPK,
          advExperience: x.advExperience,
          advExpDesc: x.advExpDesc,
          advExpSdate: x.advExpSdate,
          advExpEdate: x.advExpEdate,
          value: x.advisorExpPK,
        }))
        setadvisorExp(ddl);      
      });

      getAdvsrAca().then(x => {
        const ddl2 =  x.map((x,i) =>
        ({
          key: x.advisorAcaPK,
          acaLevel: x.acaLevel,
          acaPlace: x.acaPlace,
          acaSdate: x.acaSdate,
          acaEdate: x.acaEdate,
          value: x.advisorAcaPK,
        }))
        setadvisorAca(ddl2);      
      });

      getAdvsrAch().then(x => {
        const ddl3 =  x.map((x,i) =>
        ({
          key: x.advisorAchPK,
          achTitle: x.achTitle,
          achDesc: x.achDesc,
          achYear: x.achYear,
          value: x.advisorAchPK,
        }))
        setadvisorAch(ddl3);      
      });

      getAdvsrAct().then(x => {
        const ddl4 =  x.map((x,i) =>
        ({
          key: x.advisorActPK,
          actTitle: x.actTitle,
          actDesc: x.actDesc,
          actYear: x.actYear,
          value: x.advisorActPK,
        }))
        setadvisorAct(ddl4);      
      });

      // getAdvsrData().then(x => {
      //   setadvisorData(x);
      // });
    };

    bootstrapAsync();

  }, []);

  const advisorContext = React.useMemo(
    () => ({advisorExp,advisorAca,advisorAch,advisorAct}),
    [advisorExp,advisorAca,advisorAch,advisorAct]
);
  return (
        <AdvisorContext.Provider value={advisorContext}>
            <Switch>
              <Route exact path={path}>
                  <AdvisorProfile/>
              </Route>
          </Switch>
        </AdvisorContext.Provider>
  )
}

export default AdvisorProfileNavigator