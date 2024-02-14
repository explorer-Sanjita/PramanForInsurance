import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {getAllClaimsByInsuranceId} from "../../action/insuranceAction";
import {GET_ALL_CLAIMS_RESET} from "../../constants/insuranceConstants";
import {clearErrors} from "../../action/userAction";

const NewPolicyRequest = () =>{
    const {user,isAuthenticated} = useSelector((state)=>state.user)
    const {claims,success,error,loading} = useSelector((state)=>state.insuranceClaims)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if(!isAuthenticated){
            toast.error('Login First')
            navigate('/login')
        }
    }, []);

    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch(clearErrors());
        }else if(success){
            console.log(claims)
            dispatch({type : GET_ALL_CLAIMS_RESET})

        }
    }, [claims,success,error,loading,dispatch]);
    useEffect(() => {
        if(user){
            dispatch(getAllClaimsByInsuranceId(user.token))
        }
    }, []);

    const renderedPolicies = claims?claims.map((data,index)=>{
        if(data.status !=='accepted' && data.status !=='rejected'){
            return (
                <tr>
                    <td className="p-4 border-b border-blue-gray-50">
                        {data.clientId}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        {data.policy.policyType}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <button
                            onClick={()=>{
                                navigate('/requestPolicyDocument',{state : data})
                            }}
                            className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                            Request Policy
                        </button>
                    </td>
                </tr>
            )
        }

    }) : null;
    return (
        <div className={'text-white w-2/3 mx-auto'}>
            <table className="w-full text-left table-auto min-w-max">
                <thead>
                <tr>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Client Id
                        </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Request Type
                        </p>
                    </th>
                    <th className=" p-4  border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Policy
                        </p>
                    </th>

                </tr>
                </thead>
                <tbody>
                {renderedPolicies ? renderedPolicies :
                    <tr>No Data Found</tr>}
                </tbody>
            </table>
        </div>
    )
}
export default NewPolicyRequest