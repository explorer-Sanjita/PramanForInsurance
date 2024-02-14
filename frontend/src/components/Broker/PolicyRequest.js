import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {clearErrors, getAllPolicyRequest} from "../../action/brokerAction";
import {GET_ALL_POLICY_RESET} from "../../constants/brokerConstants";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

const PolicyRequest = () =>{

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, success, error,policies } = useSelector((state) => state.policies);
    useEffect(() => {
        dispatch(getAllPolicyRequest())
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }else if(success){
            console.log(policies)
            toast.success('Successfully Loaded');
            dispatch({type  : GET_ALL_POLICY_RESET})
        }
    }, [dispatch,loading,success,error]);

    const renderedPolicies = policies?policies.map((data,index)=>{
        return (
            <tr>
                <td className="p-4 border-b border-blue-gray-50">
                    {data.clientId}
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    {data.policy.policyType}
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    {data.status} {(data.insuranceFirmId?', Insurance Id:'+data.insuranceFirmId:null)}
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    <button
                        onClick={()=>{
                            navigate('/viewPolicyDocument',{state : data})
                        }}
                       className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        View Document
                    </button>
                </td>
            </tr>
        )
    }) : null;

    console.log(renderedPolicies)
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
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Status
                        </p>
                    </th>
                    <th className=" p-4  border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Document
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
    );
}
export default PolicyRequest