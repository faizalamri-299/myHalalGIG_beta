import React from 'react';

import {
    Switch,
    Route,
} from "react-router-dom";


import { AuthContext,logout,checkSession,getCustomLogin } from './screens/auth/auth';
import FlashScreen from './screens/FlashScreen';
import SignInScreen from './screens/auth/SignInScreen';
import LandingPage from './screens/landingpage/home';
import CustomSignInScreen from './screens/auth/CustomSignInScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import RegisterScreenAdvisor from './screens/auth/RegisterScreenAdvisor';
import CompanyRegisterScreen from './screens/auth/CompanyRegisterScreen';
import AdvisorRegisterScreen from './screens/auth/AdvisorRegisterScreen';
import HomeNavigator from './navigations/HomeNavigator';
import ClientNavigator from './navigations/ClientNavigator';
import AdvisorHomeNavigator from './navigations/AdvisorHomeNavigator';
import AuditorNavigator from './navigations/AuditorNavigator.js';
import ClientSubscription from './screens/client/ClientSubcription';

export default function App(props) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        accessType: action.access,
                        user:action.user,
                        cmpny:action.cmpny,
                        advsr:action.advsr
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        accessType: action.access,
                        user:action.user,
                        cmpny:action.cmpny,
                        advsr:action.advsr
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        accessType: false,
                        isLoading:false
                    };
                case 'LOADED':
                    return {
                        ...prevState,
                        isLoading:false
                    };
                case 'LOADING':
                    return {
                        ...prevState,
                        isLoading:true
                    };
                case 'changeAccess':
                    return {
                        ...prevState,
                        accessType: action.access,
                    };
                case 'customLogScreen':
                    return {
                        ...prevState,
                        customLogList: action.screenlist,
                        domain: action.domain,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            accessType: false,
            user: null,
            cmpny:null,
            advsr:null,
            customLogList:null,
            domain:window.location.hostname,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        console.log(window.location.hostname);
        let progressbar
        const getCustomScreen=async()=>{
            
            getCustomLogin().then(x=>{
                dispatch({ type: 'customLogScreen', screenlist:x,domain:window.location.hostname});
                progressbar = setTimeout(()=>dispatch({ type: 'LOADED'}), 500);
            })
        }
        const bootstrapAsync = async () => {
            checkSession().then(x=>{
                if(x.accesslevel === false ){
                    getCustomScreen();
                }
                else{
                    
                    progressbar = setTimeout(()=>dispatch({ type: 'LOADED'}), 500);
                }
                dispatch({ type: 'RESTORE_TOKEN', access: x.accesslevel,user:x.user,cmpny:x.cmpny,advsr:x.advsr});
                
            })
            .catch(e=>{
                
                getCustomScreen();
                dispatch({ type: 'RESTORE_TOKEN', access:false,user:null });
                
            })
            

        };

        bootstrapAsync();

        return function cleanup() {
          clearTimeout(progressbar)
        };

    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async x => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token
               
                dispatch({ type: 'SIGN_IN', access:x.accesslevel,user:x.user ,cmpny:x.cmpny,advsr:x.advsr });
            },
            signOut: () =>{ 
                dispatch({ type: 'LOADING' })
                logout();
                getCustomLogin().then(x=>{
                    dispatch({ type: 'customLogScreen', screenlist:x,domain:window.location.hostname});
                    
                dispatch({ type: 'SIGN_OUT' });
                }).catch(e=>dispatch({ type: 'SIGN_OUT' }));
                let  src = localStorage.getItem("mytime");
                if (src) {
                    window.history.replaceState('login', 'login', src);
                  }},
            signUp: async data => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            changeAccess:(lvl)=>{
                dispatch({ type: 'changeAccess', access: lvl});
            },
            profile:state.user,
            cmpny:state.cmpny,
            advsr:state.advsr
        }),
        [state.user,state.cmpny,state.advsr]
    );
    if(state.isLoading) return <FlashScreen/>
    return (
        <AuthContext.Provider value={authContext}>
            {state.accessType === false ? (
                <Switch>
                    <Route path="/register">
                        <RegisterScreen />
                    </Route>
                    <Route path="/registeradvisor">
                        <RegisterScreenAdvisor />
                    </Route>
                    <Route path="/login">
                        <SignInScreen />
                    </Route>
                    <Route path="/">
                        <LandingPage />
                    </Route>
                </Switch>
            ) :
            // state.advsr===null ?
            // <AdvisorRegisterScreen/>:
            state.cmpny===null?
            <CompanyRegisterScreen/>:
            state.accessType < 2 ? 
            <HomeNavigator /> :
            state.accessType > 1 && state.accessType < 4 ? 
            <AdvisorHomeNavigator/> : 
            state.accessType > 3 && state.accessType < 6 ?
            <ClientNavigator/> :
            <AuditorNavigator/>
            }

        </AuthContext.Provider>
    );
}