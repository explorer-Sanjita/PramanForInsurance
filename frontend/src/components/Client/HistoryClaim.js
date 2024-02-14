import axios from "axios";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

const HistoryClaims = () =>{
    const { user } = useSelector((state)=>state.user)
    const baseUrl  = 'http://localhost:4000'
    const [claims,setClaims] = useState([])

    const navigate = useNavigate()
    const getAllClaimsByID = async () =>{
        const config = { headers: { "Content-Type": "application/json" ,"authorization" : `Bearer ${user.token}`} }
        try{
            const { data } = await axios.get(
                baseUrl+`/api/claims/getAllClaimsByClientId`,
                config
            );
            setClaims(data)
        }
        catch (e){
            toast.error(e)
        }

    }
    useEffect(() => {
        getAllClaimsByID()
    }, []);

    useEffect(()=>{
        if(claims){
            console.log(claims)
        }
    })

    const renderedClaims = claims.map((data,index)=>{
        return (
            <tr>
                <td className="p-4 border-b border-blue-gray-50">
                    {data?.insuranceFirmId?data.insuranceFirmId:'Not Generated'}
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    {data.policy.policyType}
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    {data.status}
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                    <button
                        onClick={() => {
                            navigate('/client/requestPolicyDocument', {state: data})
                        }}
                        className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        Request Policy
                    </button>
                </td>
                <td className="p-4 border-b border-blue-gray-50 ">
                    {data?.ipfsHash? <Link
                        to={`https://${'coral-impressed-shark-116.mypinata.cloud'}/ipfs/${data.ipfsHash}/?pinataGatewayToken=${'TnzUyeuXgYCIdCyEAry2iyKL1ShQhJqzKPLhOgqcS_KyGc3YKZPdZ9dczQxgHGeF'}`}>
                        View Document
                    </Link>:'Hash Not Generated'}

                </td>
            </tr>
        )
    })
    return (
        <div className={'text-white w-2/3 mx-auto'}>
            <table className="w-full text-left table-auto min-w-max">
                <thead>
                <tr>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Insurance Firm
                        </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Type
                        </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Status
                        </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Policy
                        </p>
                    </th>
                    <th className=" p-4  border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Insurance Document
                        </p>
                    </th>

                </tr>
                </thead>
                <tbody>
                {renderedClaims ? renderedClaims : <tr>No Data Found</tr>
                }
                </tbody>
            </table>
        </div>
    )
}
export default HistoryClaims