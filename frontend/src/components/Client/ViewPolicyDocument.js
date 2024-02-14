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
            </div>
        </div>
    )
}
export default ViewPolicyDocument