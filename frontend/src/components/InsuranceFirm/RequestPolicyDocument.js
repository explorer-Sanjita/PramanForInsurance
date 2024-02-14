import classNames from "classnames";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, getAllInsuranceFirm, updatePolicy} from "../../action/brokerAction";
import {GET_ALL_POLICY_RESET, UPDATE_POLICY_RESET} from "../../constants/brokerConstants";
import axios from "axios";
import {accessDocument, submitDocument} from "../../contracts/interactWithContract";
import {setAccessControl} from "../../contracts/OwnerTransaction";

const RequestPolicyDocument = () =>{
    const {state} = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isAccept,setAccept] = useState(false)
    const { user } = useSelector((state) => state.user);
    const { loading, success, error } = useSelector((state) => state.policies);
    const [clientMetaMask,setClientMetaMask] = useState('');
    const baseUrl = 'http://localhost:4000'
    const [accessLog,setAccessLog] = useState(null);
    useEffect(() => {
        if(!state){
            toast.error('Invalid Request')
            navigate('/insurance-dashboard')
        }
    }, []);


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }else if(success){
            dispatch({type  : UPDATE_POLICY_RESET})
        }
    }, [dispatch,loading,success,error]);

    useEffect(() => {
        getUserDetails()
        getAccessLogById()
    }, []);
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

    const getUserDetails = async () =>{
        const config = { headers: { "Content-Type": "application/json" ,"authorization" : `Bearer ${user.token}`} }
        const { data } = await axios.get(
            baseUrl+`/api/users/getUserDetailsById?userId=${state.clientId}`,
            config
        );
        if(data.metamask){
            setClientMetaMask(data.metamask)
        }
    }

    const getAccessLogById = async () =>{
        const config = { headers: { "Content-Type": "application/json" ,"authorization" : `Bearer ${user.token}`} }
        const { data } = await axios.get(
            baseUrl+`/api/access/getSubmittedDocument/${state._id}`,
            config
        );
        if(data.success){
            setAccessLog(data.accessLogs)
        }
    }
    const onHandleUploadIPFS = async () =>{
        try{
            const config = { headers: { "Content-Type": "application/json" ,"authorization" : `Bearer ${user.token}`} }
            const { data } = await axios.post(
                baseUrl+'/api/insurance/uploadToIPFS',
                {},
                config
            );
            if(data?.IpfsHash){
                const ipfsHash = data.IpfsHash
                state.ipfsHash = ipfsHash
                dispatch(updatePolicy(state))
                toast.success('Uploaded to IPFS')
                try{
                    if(user.metamask && clientMetaMask && ipfsHash){
                        console.log('Entered')
                        const result  = await submitDocument(user.metamask,clientMetaMask,ipfsHash)
                        console.log(result)
                        if(!result.success){
                            toast.error('Error Caught')
                        } else if(result.success){
                            try{
                                const config = { headers: { "Content-Type": "application/json" ,"authorization" : `Bearer ${user.token}`} }
                                const { data } = await axios.post(
                                    baseUrl+`/api/access/submitDocument`,
                                    {
                                        clientAddress: result.data.clientAddress ,
                                        insuranceAddress:result.data.InsuranceFirm ,
                                        index: Number(result.data.Index),
                                        claimId : state._id
                                    },
                                    config
                                );
                                if(data.success){
                                    toast.success('Successfully Uploaded')
                                    console.log(data)
                                }else{
                                    toast.error('Error Uploading')
                                }
                            }catch(e){
                                toast.error(e.message)
                            }
                        }
                    }
                }catch (e){
                    toast.error('Error Getting User Details')
                }
            }
        }catch (e){
         toast.error('Error Uploading')
        }
    }

    const onHandleAccept = () =>{
        setAccept(true)
    }

    const onHandleSelectFirm = (id) =>{
        state.insuranceFirmId = id
        state.status = "accepted"
        dispatch(updatePolicy(state))
    }

    // const onHandleSignAndGrant = async () =>{
    //     if(!state.ipfsHash ){
    //         toast.warn('Please Upload Document to IPFS')
    //         return;
    //     }else if(!clientMetaMask){
    //         toast.warn('Client Meta Mask Address Required')
    //         return;
    //     }
    //     const result = await setAccessControl(user.metamask,clientMetaMask,accessLog.index,true)
    //     toast.success('Provided Access Successfully')
    // }
    return(
        <div className={'flex flex-col w-full lg:w-3/4 mx-auto mt-10'}>
            <div className={'flex flex-col  p-4 gap-10 w-full lg:w-3/4 text-white mx-auto'}>
                <h1 style={styles.headingBodyStyle} className={'font-bold tracking-tight text-xl sm:text-2xl'}>View
                    Policy</h1>
                <h3 style={styles.headingBodyStyle} className={StyleClass.subHeadStyle}>Client : {state.clientId}</h3>
                <h3 style={styles.headingBodyStyle} className={StyleClass.subHeadStyle}>Policy Details</h3>
                <div className={'flex flex-row  md:lg:flex-row gap-10'}>
                    <div className={'grid grid-cols-2 flex-wrap gap-6 w-full  md:lg:w-3/4'}>
                        {Object.entries(state.policy).map(([key, value]) => (
                            <div key={key} className={StyleClass.inputBodyStyle + ' capitalize'}>
                                <label>{key} : {value}</label>
                            </div>
                        ))}
                    </div>
                    <div className={'flex flex-col w-1/2 gap-10 my-auto'}>
                        {!state.ipfsHash?
                            <>
                                <input type={'button'} style={styles.inputBodyStyle} value={'Create Policy'}
                                       className={StyleClass.inputStyleClass + ' w-1/2 cursor-pointer mx-auto mb-4'}/>
                                <input type={'button'} style={styles.inputBodyStyle} value={'Upload to IPFS'}
                                       className={StyleClass.inputStyleClass + ' w-1/2 cursor-pointer mx-auto mb-4'}
                                       onClick={() => {
                                           onHandleUploadIPFS()
                                       }}
                                />
                            </>
                            : <>
                                <input type={'button'} style={styles.inputBodyStyle} value={'Already Created Policy'}
                                       className={StyleClass.inputStyleClass + ' w-1/2 cursor-pointer mx-auto mb-4'}/>
                                <input type={'button'} style={styles.inputBodyStyle} value={'Already Uploaded '}
                                       className={StyleClass.inputStyleClass + ' w-1/2 cursor-pointer mx-auto mb-4'}
                                />
                            </>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RequestPolicyDocument