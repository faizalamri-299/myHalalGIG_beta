import React from 'react'

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
import HalalFileList from '../screens/HalalFile/HalalFileList';

import {HalalFileContext, getProduct, getLabAnalysis} from '../screens/HalalFile/HalalFile';


const HalalNavigator = () => {
  
    const [product, setProduct] = React.useState(null);
    const [labAnalysis, setLabAnalysis] = React.useState(null);
    let { path, url } = useRouteMatch();

    
    React.useEffect(() => {

      const bootstrapAsync = async () => {
        getProduct().then(x => {
          setProduct(x);
        })

        getLabAnalysis().then(x => {
          setLabAnalysis(x);
        })
      };

      bootstrapAsync();
  
    }, []);

  const halalfileContext = React.useMemo(
    () =>({product, labAnalysis}),
    [product, labAnalysis]
);
  return (
    <HalalFileContext.Provider value={halalfileContext}>
        <Switch>
            <Route exact path={path}>
                <HalalFileList />
            </Route>
        </Switch>
    </HalalFileContext.Provider>
  )
}

export default HalalNavigator