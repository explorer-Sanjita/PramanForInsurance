import { useDispatch, useSelector } from "react-redux";
import { getAllInsuranceFirm } from "../../action/brokerAction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../action/userAction";
import {getAccessControl, getAllDocument} from "../../contracts/interactWithContract";
import { Link } from "react-router-dom";
import {setAccessControl} from "../../contracts/OwnerTransaction";

const HistoryClaims = () =>{
    const dispatch = useDispatch()
    const insuranceFirm = useSelector((state) => state.allInsuranceFirm);
    const {user} = useSelector((state) => state.user);
    const [isRefresh,setIsRefresh] = useState(false)
    const [selectedInsuranceAddress,setSelectedInsuranceAddress] = useState(null);
    const [renderedTableData,setRenderedTableData] = useState(null)
    useEffect(()=>{
        dispatch(getAllInsuranceFirm())
    },[])
    
    useEffect(() => {
        if (insuranceFirm.error) {
            toast.error(insuranceFirm.error);
            dispatch(clearErrors);
        }else if(insuranceFirm.success){
            // console.log(insuranceFirm.insuranceFirms)
        }
    }, [insuranceFirm.loading,insuranceFirm.success,insuranceFirm.error,dispatch]);

    useEffect(() => {
        console.log(renderedTableData)
    }, [renderedTableData]);

    const onHandleSetAccessControl = async (data) => {
        const result = await setAccessControl(data.InsuranceFirm, data.clientAddress,Number(data.indexNumber), true)
        data.isAccess = result
    }
        const getAllInsuranceFirmDocument =  async (address) =>{
        const {result} = await getAllDocument(address,user.metamask);

        const withForLoop = async ()=>{
            const rendered = []
            for (const data of result) {
                const result = await getAccessControl(data.InsuranceFirm,Number(data.indexNumber),data.clientAddress)
                console.log(result)
                data.isAccess = result.result
                const renderedTable = <tr>
                    <td className="p-4 border-b border-blue-gray-50 text-clip ">
                        {Number(data.indexNumber)}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-clip ">
                        {data.InsuranceFirm}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 ">
                        {data.clientAddress}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 ">
                        <Link
                            to={`https://${'coral-impressed-shark-116.mypinata.cloud'}/ipfs/${data.documentHash}/?pinataGatewayToken=${'TnzUyeuXgYCIdCyEAry2iyKL1ShQhJqzKPLhOgqcS_KyGc3YKZPdZ9dczQxgHGeF'}`}>
                            View Document
                        </Link>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        {Date(data.timestamp)}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 ">
                        {(!data.isAccess)?<button className={'border'} onClick={() => {
                            onHandleSetAccessControl(data)
                        }}>
                            Set Access Control
                        </button>: 'Already Access Granted'}
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 ">
                        <button className={'border p-4'} onClick={() => {
                        }}>
                            Log
                        </button>
                    </td>
                </tr>
                rendered.push(renderedTable)
            }
            setRenderedTableData(rendered)
        }
        withForLoop()

        // const renderedResult = result.map(async data=>{
        //     // console.log(result)
        //     return (
        // <tr>
        //     <td className="p-4 border-b border-blue-gray-50 text-clip ">
        //         {Number(data.indexNumber)}
        //     </td>
        //     <td className="p-4 border-b border-blue-gray-50 text-clip ">
        //         {data.InsuranceFirm}
        //     </td>
        //     <td className="p-4 border-b border-blue-gray-50 ">
        //         {data.clientAddress}
        //     </td>
        //     <td className="p-4 border-b border-blue-gray-50 ">
        //         <Link
        //             to={`https://${'coral-impressed-shark-116.mypinata.cloud'}/ipfs/${data.documentHash}/?pinataGatewayToken=${'TnzUyeuXgYCIdCyEAry2iyKL1ShQhJqzKPLhOgqcS_KyGc3YKZPdZ9dczQxgHGeF'}`}>
        //             View Document
        //         </Link>
        //     </td>
        //     <td className="p-4 border-b border-blue-gray-50">
        //         {Date(data.timestamp)}
        //     </td>
        //     <td className="p-4 border-b border-blue-gray-50 ">
        //         <button onClick={() => {
        //         }}>
        //             Set Access Control
        //         </button>
        //     </td>
        //     <td className="p-4 border-b border-blue-gray-50 ">
        //                 <button onClick={() => {
        //                 }}>
        //                     Log
        //                 </button>
        //             </td>
        //         </tr>
        //     )
        // });
        // setRenderedTableData(renderedResult)
    }

    useEffect(() => {
        if (selectedInsuranceAddress) {
            console.log('Hello')
            const updatedTableData = async () =>{
                await getAllInsuranceFirmDocument(selectedInsuranceAddress)
            }   
            updatedTableData()
        }
    },[selectedInsuranceAddress])

    return(
    <div className={'text-white mx-auto'}>
        <div className="flex flex-row text-white">
            {(insuranceFirm?.insuranceFirms)?
            insuranceFirm.insuranceFirms.map((data,index)=>{
                return (
                    <div className="p-2 h-24 border flex flex-col rounded-md text-center justify-center" onClick={()=>{
                        setSelectedInsuranceAddress(data.metamask)
            }}>
                <label>{data.name}</label>
            </div>
                )
            })
            :''}
            
        </div>
            <table className="w-full text-left table-auto ">
                <thead>
                <tr>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal text-clip leading-none text-blue-gray-900 opacity-70">
                            Index No
                        </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 ">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Insurance Firm
                        </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Client Address
                        </p>
                    </th>
                    <th className=" p-4  border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Document Hash
                        </p>
                    </th>
                    <th className=" p-4  border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Timestamp
                        </p>
                    </th>
                    <th className=" p-4  border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Access Control
                        </p>
                    </th>
                    <th className=" p-4  border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Traceability
                        </p>
                    </th>
                </tr>
                </thead>
                <tbody>
                {(renderedTableData ?
                        renderedTableData
                        : <tr>No Data Found</tr>

                )}
                </tbody>
            </table>
    </div>
    )
}
export default HistoryClaims