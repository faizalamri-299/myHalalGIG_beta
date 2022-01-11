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
import HASFileList from '../screens/HASFile/HASFileList';
import { HASFileContext, getHASFile } from '../screens/HASFile/HASFile';


const HASNavigator = () => {
  
    const [HASFile, setHASFile] = React.useState(null);
    let { path, url } = useRouteMatch();

    
    React.useEffect(() => {

      const bootstrapAsync = async () => {
        getHASFile().then(x => {
          setHASFile(x);
        })
      };
  
      bootstrapAsync();
  
    }, []);

  const hASFileContext = React.useMemo(
    () =>HASFile,
    [HASFile]
);
  return (
    <HASFileContext.Provider value={hASFileContext}>
        <Switch>
            <Route exact path={path}>
                <HASFileList />
            </Route>
        </Switch>
    </HASFileContext.Provider>
  )
}

export default HASNavigator