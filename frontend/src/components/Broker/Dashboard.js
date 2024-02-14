import PolicyRequest from "./PolicyRequest";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {toast} from "react-toastify";

const Dashboard = () =>{
    const {user,isAuthenticated} = useSelector((state)=>state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isAuthenticated){
            toast.error('Login First')
            navigate('/login')
        }
    }, []);


    return (
        <>
            <PolicyRequest/>
        </>
    );
}
export default Dashboard;