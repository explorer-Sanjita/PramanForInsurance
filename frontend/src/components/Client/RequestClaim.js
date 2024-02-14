import classNames from "classnames";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {clearErrors} from "../../action/userAction";
import {addNewPolicy} from "../../action/clientAction";
import {useNavigate} from "react-router";
import { NEW_POLICY_RESET } from "../../constants/clientConstants";
const RequestClaim = () =>{

    const {user,isAuthenticated} = useSelector((state)=>state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isAuthenticated){
            toast.error('Login First')
            navigate('/login')
        }
    }, []);

    /* Styling */
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
            'items-start bg-transparent '
        ),
        subHeadStyle : classNames(
            'font-semibold tracking-tight text-lg sm:text-xl'
        )
    }

    /*States and Hooks*/

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.policy);

    const [policyInfo,setPolicyInfo] = useState({
        name : "",
        mobile : "",
        dateOfBirth : "",
        policyNumber : "",
        registrationNumber : "",
        locationAccident : "",
        causeOfAccident : "",
        dateOfAccident : "",
        policyType : 'car'  
    })

    const {
        name,
        mobile,
        dateOfBirth,
        policyNumber,
        registrationNumber,
        locationAccident,
        causeOfAccident,
        dateOfAccident,
    } = policyInfo

    /*Handlers*/
    const onHandleDataChange = (e) =>{
        setPolicyInfo({ ...policyInfo, [e.target.name]: e.target.value });
    }
    const onFormSubmit = (e) =>{
        e.preventDefault()
        console.log(policyInfo)
        dispatch(addNewPolicy(policyInfo,user.token))
    }

    useEffect(() => {

    }, []);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("Policy Request");
            dispatch({ type: NEW_POLICY_RESET });
            setPolicyInfo({
                name : "",
                mobile : "",
                dateOfBirth : "",
                policyNumber : "",
                registrationNumber : "",
                locationAccident : "",
                causeOfAccident : "",
                dateOfAccident : "",
                policyType : 'car'
            })
        }
    }, [dispatch, error, success]);


    return(
        <form className={'flex flex-row w-full mx-auto'} onSubmit={onFormSubmit}>
            <div className={'flex flex-col p-4 gap-10 w-full lg:w-3/4 text-white mx-auto'}>
                <h1 style={styles.headingBodyStyle} className={'font-bold tracking-tight text-xl sm:text-2xl'} >Claim vehicle policy</h1>
                <div className={'flex flex-col md:lg:flex-row gap-10'}>
                    <div className={'flex flex-col gap-6 w-full  md:lgw-3/4'}>
                        <h3 style={styles.headingBodyStyle} className={StyleClass.subHeadStyle} >Your details</h3>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter your Full Name</label>
                            <input type={'text'} name={'name'} onChange={onHandleDataChange} style={styles.inputBodyStyle} className={StyleClass.inputStyleClass} value={name} />
                        </div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter your mobile number</label>
                            <input type={'text'} name={'mobile'} onChange={onHandleDataChange} style={styles.inputBodyStyle} className={StyleClass.inputStyleClass} value={mobile} />
                        </div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter your date of birth (dd - mm - yy)</label>
                            <input type={'text'} name={'dateOfBirth'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass} value={dateOfBirth}/>
                        </div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter your policy number</label>
                            <input type={'text'} name={'policyNumber'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass} value={policyNumber}/>
                        </div>  
                    </div>
                    <div className={'flex flex-col gap-6 w-full md:lgw-3/4'}>
                        <h3 style={styles.headingBodyStyle} className={StyleClass.subHeadStyle}>Accident details</h3>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter your Vehicle registration number</label>
                            <input type={'text'} name={'registrationNumber'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass}
                                   value={registrationNumber}/>
                        </div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter location of accident</label>
                            <input type={'text'} name={'locationAccident'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass}
                                   value={locationAccident}/></div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter cause of accident</label>
                            <input type={'text'} name={'causeOfAccident'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass}
                                   value={causeOfAccident}/>
                        </div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter date of accident (dd - mm - yy)</label>
                            <input type={'text'} name={'dateOfAccident'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass}
                                   value={dateOfAccident}/>
                        </div>
                    </div>
                </div>
                <input type={'submit'} style={styles.inputBodyStyle} value={'NEXT'}
                        className={StyleClass.inputStyleClass + ' w-1/5 cursor-pointer mx-auto mb-4'}/>
            </div>
        </form>
    )
}
export default RequestClaim