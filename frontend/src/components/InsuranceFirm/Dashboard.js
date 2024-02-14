import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {toast} from "react-toastify";
import NewPolicyRequest from "./NewPolicyRequest";

const Dashboard = () =>{

    const {user,isAuthenticated,success,error,loading} = useSelector((state)=>state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isAuthenticated){
            toast.error('Login First')
            navigate('/login')
        }
    }, [isAuthenticated,user,success,error,loading]);

    return(
        <div className={''}>
            <NewPolicyRequest/>
        </div>
    )
}
export default Dashboard