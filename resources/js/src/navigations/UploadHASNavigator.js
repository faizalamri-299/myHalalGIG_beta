import React from 'react'

import {Switch,Route,Link,useRouteMatch} from "react-router-dom";
import UploadHASList from '../screens/uploadHAS/UploadHASList';

import {UploadHASContext,getHASRawMat,getHASSOPRawMat,getHASTraceability,getHASSOPTraceability,getHASSOPProductRecall,getHASChecklist,getHASLabAnalysis,getHASSertu,getHASSOPSertu,getHASHalalpolicy,getHASOrgchart,getHASTor,getHASEmpletter,getHASAudit,getHASHalalrisk,getHASTraining,getHASSOP,getHASProductHalalCert,getHASOthers} from '../screens/uploadHAS/UploadHAS';


const UploadHASNavigator = () => {
  
    const [HASRawMat, setHASRawMat] = React.useState(null);
    const [HASSOPRawMat, setHASSOPRawMat] = React.useState(null);
    const [HASTraceability, setHASTraceability] = React.useState(null);
    const [HASSOPTraceability, setHASSOPTraceability] = React.useState(null);
    const [HASSOPProductRecall, setHASSOPProductRecall] = React.useState(null);
    const [HASChecklist, setHASChecklist] = React.useState(null);
    const [HASLabAnalysis, setHASLabAnalysis] = React.useState(null);
    const [HASSertu, setHASSertu] = React.useState(null);
    const [HASSOPSertu, setHASSOPSertu] = React.useState(null);
    const [HAShalalpolicy, setHAShalalpolicy] = React.useState(null);
    const [HASorgchart, setHASorgchart] = React.useState(null);
    const [HAStor, setHAStor] = React.useState(null);
    const [HASempletter, setHASempletter] = React.useState(null);
    const [HASaudit, setHASaudit] = React.useState(null);
    const [HAShalalrisk, setHAShalalrisk] = React.useState(null);
    const [HAStraining, setHAStraining] = React.useState(null);
    const [HASSOP, setHASSOP] = React.useState(null);
    const [HASProductHalalCert, setHASProductHalalCert] = React.useState(null);
    const [HASOthers, setHASOthers] = React.useState(null);


    
    let { path, url } = useRouteMatch();

    
    React.useEffect(() => {

      const bootstrapAsync = async () => {
        getHASRawMat().then(x => {
          setHASRawMat(x);
        })
        getHASSOPRawMat().then(x => {
          setHASSOPRawMat(x);
        })
        getHASTraceability().then(x => {
          setHASTraceability(x);
        })
        getHASSOPTraceability().then(x => {
          setHASSOPTraceability(x);
        })
        getHASSOPProductRecall().then(x => {
          setHASSOPProductRecall(x);
        })
        getHASChecklist().then(x => {
          setHASChecklist(x);
        })
        getHASLabAnalysis().then(x => {
          setHASLabAnalysis(x);
        })
        getHASSertu().then(x => {
          setHASSertu(x);
        })
        getHASSOPSertu().then(x => {
          setHASSOPSertu(x);
        })
        getHASHalalpolicy().then(x => {
          setHAShalalpolicy(x);
        })
        getHASOrgchart().then(x => {
          setHASorgchart(x);
        })
        getHASTor().then(x => {
          setHAStor(x);
        })
        getHASEmpletter().then(x => {
          setHASempletter(x);
        })
        getHASAudit().then(x => {
          setHASaudit(x);
        })
        getHASHalalrisk().then(x => {
          setHAShalalrisk(x);
        })
        getHASTraining().then(x => {
          setHAStraining(x);
        })
        getHASSOP().then(x => {
          setHASSOP(x);
        })
        getHASProductHalalCert().then(x => {
          setHASProductHalalCert(x);
        })
        getHASOthers().then(x => {
          setHASOthers(x);
        })
      };
      bootstrapAsync();
  
    }, []);

  const halalfileContext = React.useMemo(
    () =>({HASRawMat, HASSOPRawMat,HASTraceability,HASSOPTraceability,HASSOPProductRecall,HASChecklist,HASLabAnalysis,HASSertu, HASSOPSertu,HAShalalpolicy,HASorgchart,HAStor,HASempletter,HASaudit,HAShalalrisk,HAStraining,HASSOP,HASProductHalalCert,HASOthers}),
    [HASRawMat, HASSOPRawMat,HASTraceability,HASSOPTraceability,HASSOPProductRecall,HASChecklist,HASLabAnalysis,HASSertu, HASSOPSertu,HAShalalpolicy,HASorgchart,HAStor,HASempletter,HASaudit,HAShalalrisk,HAStraining,HASSOP,HASProductHalalCert,HASOthers]
);
  return (
    <UploadHASContext.Provider value={halalfileContext}>
        <Switch>
            <Route exact path={path}>
                <UploadHASList />
            </Route>
        </Switch>
    </UploadHASContext.Provider>
  )
}

export default UploadHASNavigator