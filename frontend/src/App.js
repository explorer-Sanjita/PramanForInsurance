import {SignUp} from "./components/User/SignUp";
import {toast} from "react-toastify";
import {Login} from "./components/User/Login";
import NewPolicyForm from "./components/Client/NewPolicyForm";
import PolicyRequest from "./components/Broker/PolicyRequest";
import {Suspense, useEffect} from "react";
import SpinLoader from "./components/Layout/SpinLoader";
import BrokerDashboard from "./components/Broker/Dashboard";
import ClientDashboard from "./components/Client/Dashboard";
import InsuranceDashboard from "./components/InsuranceFirm/Dashboard";
import ClientHistoryClaims from "./components/Client/HistoryClaim";
import BrokerHistoryClaims from "./components/Broker/HistoryClaims"
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import ViewPolicyDocument from "./components/Broker/ViewPolicyDocument";
import ViewClientPolicyDocument from "./components/Client/ViewPolicyDocument";
import RequestClientPolicyDocument from "./components/Client/RequestPolicyDocument";

import RequestPolicyDocument from "./components/InsuranceFirm/RequestPolicyDocument";
import Layout from "./components/Layout/Layout";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import RequestClaim from "./components/Client/RequestClaim";



const App = () =>{

    const {pathname} = useLocation()
    const navigate = useNavigate()
    const { loading, isAuthenticated, error,user } = useSelector((state) => state.user);

    useEffect(() => {
            if(!isAuthenticated){
                navigate('/login')
            }
    }, [isAuthenticated,loading,user]);
    const routePath = [
        {
            path : '/client-dashboard',
            text : 'Dashboard'
        },
        {
           path : '/newPolicyForm',
            text : 'Create New Policy'
        },{
            path : '/requestClaim',
            text : 'Request Claims'
        },{
            path : '/client/HistoryClaims',
            text : 'History of Claims'
        }
    ]

    const routerBrokerPath = [
        {
            path : '/broker-dashboard',
            text : 'Dashboard'
        },
        ,{
            path : '/HistoryClaims',
            text : 'History of Claims'
        }
    ]
    const routerInsurancePath = [
        {
            path : '/insurance-dashboard',
            text : 'Dashboard'
        },
        ,{
            path : '/HistoryInsuranceClaims',
            text : 'History Claims'
        }
    ]


    return (
        <>
        <Layout routePath={(['/broker-dashboard','/viewPolicyDocument','/HistoryClaims'].includes(pathname)?routerBrokerPath:['/insurance-dashboard','/requestPolicyDocument','/HistoryClaims'].includes(pathname)?routerInsurancePath:routePath)}>
        <Routes>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/signup'} element={<SignUp/>}/>
        <Route path ="/broker-dashboard" element={<BrokerDashboard/>}/>
        <Route path={'/newPolicyForm'} element={<NewPolicyForm/>} />
        <Route path='/insurance-dashboard' element={<InsuranceDashboard/>}/>
        <Route path = '/requestPolicyDocument' element={<RequestPolicyDocument/>}/>
        <Route path = '/HistoryClaims' element={<BrokerHistoryClaims/>}/>
            <Route path = '/HistoryInsuranceClaims' element={<BrokerHistoryClaims/>}/>

            <Route path={'/viewPolicyDocument'} element={<ViewPolicyDocument/>} />
        <Route path={'/client/requestPolicyDocument'} element={<RequestClientPolicyDocument/>} />
            <Route path ="/client-dashboard" element={<ClientDashboard/>}/>
        <Route path={'/requestClaim'} element={<RequestClaim/>} />
        <Route path={'/client/HistoryClaims'} element={<ClientHistoryClaims/>} />
        </Routes>
        </Layout>
        </>
      
    );
}
export default App
