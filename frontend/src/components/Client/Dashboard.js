import NewPolicyForm from "./NewPolicyForm";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {toast} from "react-toastify";
import ClientDashboardImage from "../../assets/images/ClientDashboard.png"
import ClientDashboardPolicy from "../../assets/images/ClientDashboardPolicy.png"
import ClientDashboardPolicy2 from "../../assets/images/ClientDashboardPolicy2.png"
import ClientDashboardPolicy3 from "../../assets/images/ClientDashboardPolicy3.png"
import ClientDashboardPolicy4 from "../../assets/images/ClientDashboardPolicy4.png"
import ClientDashboardPolicy5 from "../../assets/images/ClientDashboardPolicy5.png"
import ClientDashboardPolicy6 from "../../assets/images/ClientDashboardPolicy6.png"

import {Link} from "react-router-dom";
import {Header} from "../Layout/Header";
const Dashboard = () =>{

    const {user,isAuthenticated} = useSelector((state)=>state.user)
    const navigate = useNavigate()

    const photos = [
        ClientDashboardPolicy,
        ClientDashboardPolicy2,
        ClientDashboardPolicy3,
        ClientDashboardPolicy4,
        ClientDashboardPolicy5,
        ClientDashboardPolicy6
    ]
    useEffect(() => {
        if(!isAuthenticated){
            toast.error('Login First')
            navigate('/login')
        }
    }, []);

    const renderedPhotos = photos.map((data,index)=>{
        const baseUrl ='../../assets/images/'
        return (
            <Link to={'/newPolicyForm'}>
                <img className={'w-64 h-60 cursor-pointer'} src={data} alt={'Logo'}/>
            </Link>
        )
    })
    return (
        <div className={'p-2 md:lg:p-20 flex flex-col  text-white mt-10 gap-14'}>
            <div className={'flex flex-row items-center justify-between '}>
                <div className={'flex flex-col w-1/2 gap-10 '}>
                    <h1 className={'text-3xl font-bold  sm:text-4xl'}>
                        All your insurance needs at your fingertips
                    </h1>
                    <p className={'text-xl'}>
                        "Streamlined access to all your policies, claims, and coverage details in one user-friendly
                        platform. Simplify, manage, and protect."
                    </p>
                </div>
                <div className={'w-1/3'}>
                    <img className={'w-full'} src={ClientDashboardImage} alt={'Logo'}/>
                </div>
            </div>
            <div className={'flex flex-col items-start gap-14'}>
            <h1 className={'text-3xl font-bold  sm:text-4xl'}>
                    Create new policy
                </h1>
                <div className={'grid grid-cols-3 w-full gap-y-16 pl-10 justify-evenly'}>
                    {renderedPhotos}
                </div>
            </div>
        </div>
    )
}
export default Dashboard