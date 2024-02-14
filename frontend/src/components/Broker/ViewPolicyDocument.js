import classNames from "classnames";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, getAllInsuranceFirm, updatePolicy} from "../../action/brokerAction";
import {GET_ALL_POLICY_RESET, UPDATE_POLICY_RESET} from "../../constants/brokerConstants";

const ViewPolicyDocument = () =>{
    const {state} = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isAccept,setAccept] = useState(false)
    const { loading, success, error } = useSelector((state) => state.policies);
    const insuranceFirm = useSelector((state) => state.allInsuranceFirm);
    useEffect(() => {
        if(!state){
            toast.error('Invalid Request')
            navigate('/broker-dashboard')
        }
    }, []);

    useEffect(()=>{
        dispatch(getAllInsuranceFirm())
    },[])
    useEffect(() => {
        if (insuranceFirm.error) {
            toast.error(error);
            dispatch(clearErrors);
        }else if(insuranceFirm.success){
            console.log(insuranceFirm.insuranceFirms)
        }
    }, [insuranceFirm.loading,insuranceFirm.success,insuranceFirm.error,dispatch]);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }else if(success){
            navigate('/broker-dashboard')
            dispatch({type  : UPDATE_POLICY_RESET})
        }
    }, [dispatch,loading,success,error]);
    const styles = {
        headingBodyStyle : {
            fontFamily: 'Poppins'
        },
        inputBodyStyle : {
            padding: '10px 0px 10px 10px',
            gap: '10px',
            borderRadius: '10px',
            border: '1px solid #D9D9D9'
        },
    }

    const StyleClass = {
        inputBodyStyle : classNames(
            'flex flex-col gap-1'
        ),
        inputStyleClass  : classNames (
            'items-start '
        ),
        subHeadStyle : classNames(
            'font-semibold tracking-tight text-lg sm:text-xl'
        )
    }

    const onHandleReject = () =>{
        state.status = 'rejected'
        dispatch(updatePolicy(state))
    }

    const onHandleAccept = () =>{
        setAccept(true)
    }

    const onHandleSelectFirm = (id) =>{
        state.insuranceFirmId = id
        dispatch(updatePolicy(state))
    }

    return(
        <div className={'flex flex-col w-full lg:w-3/4 mx-auto mt-10'}>
            <div className={'flex flex-col  p-4 gap-10 w-full lg:w-3/4 text-white mx-auto'}>
                <h1 style={styles.headingBodyStyle} className={'font-bold tracking-tight text-xl sm:text-2xl'}>View
                    Policy</h1>
                <h3 style={styles.headingBodyStyle} className={StyleClass.subHeadStyle}>Client : {state.clientId}</h3>
                <h3 style={styles.headingBodyStyle} className={StyleClass.subHeadStyle}>Policy Details</h3>
                <div className={'flex flex-row  md:lg:flex-row gap-10'}>
                    <div className={'grid grid-cols-2 flex-wrap gap-6 w-full  md:lgw-3/4'}>
                        {Object.entries(state.policy).map(([key, value]) => (
                            <div key={key} className={StyleClass.inputBodyStyle + ' capitalize'}>
                                <label>{key} : {value}</label>
                            </div>
                        ))}
                    </div>
                </div>
                {
                    !state.insuranceFirmId ?
                        <div className={'flex flex-row gap-3 items-center'}>

                            <input type={'button'} style={styles.inputBodyStyle} value={'Accept'}
                                   className={StyleClass.inputStyleClass + ' w-1/5 cursor-pointer mb-4 bg-green-500'}
                                   onClick={() => {
                                       onHandleAccept()
                                   }}
                            />
                            <input type={'button'} style={styles.inputBodyStyle} value={'Reject'} onClick={() => {
                                onHandleReject()
                            }}
                                   className={StyleClass.inputStyleClass + ' w-1/5 cursor-pointer mb-4 bg-red-500'}/>
                        </div>
                        : null
                }

            </div>
            {
                ((isAccept || state.insuranceFirmId) && insuranceFirm.insuranceFirms) ?
                    <table className="text-left table-auto min-w-max w-full lg:w-3/4 mx-auto mt-10 text-white">
                        <thead>
                        <tr>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Insurance Name
                                </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    IDV
                                </p>
                            </th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                    Premium
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
                        {
                            !state.insuranceFirmId?
                            insuranceFirm.insuranceFirms.map((data,index)=>{
                            return (
                                <tr>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        {data.name}
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        {'Rs: ' + data.insuranceCompany.idv}
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        {'Rs: ' + data.insuranceCompany.premium}
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50 text-green-500">
                                        <button onClick={() => {
                                            onHandleSelectFirm(data._id)
                                        }}>
                                            Select
                                        </button>
                                    </td>

                                </tr>
                            );
                            }): insuranceFirm.insuranceFirms.map((data,index)=>{
                                if(data._id === state.insuranceFirmId){
                                    return (
                                        <tr>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                {data.name}
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                {'Rs: ' + data.insuranceCompany.idv}
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50">
                                                {'Rs: ' + data.insuranceCompany.premium}
                                            </td>
                                            <td className="p-4 border-b border-blue-gray-50 text-green-500">
                                                    Selected
                                            </td>

                                        </tr>
                                    );
                                }

                        })
                        }
                        </tbody>
                    </table> : ''
            }
        </div>
    )
}
export default ViewPolicyDocument