import classNames from "classnames";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {clearErrors} from "../../action/userAction";
import {addNewPolicy} from "../../action/clientAction";
import {useNavigate} from "react-router";
import { NEW_POLICY_RESET } from "../../constants/clientConstants";
const NewPolicyForm = () =>{

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
        gender : "",
        address : "",
        pincode : "",
        registrationNumber : "",
        carBrand : "",
        model : "",
        subModel : "",
        registrationDate : "",
        registrationArea : "",
        chassisNumber : "",
        loan : "",
        policyType : 'car'
    })

    const {
        name,
        mobile,
        dateOfBirth,
        gender,
        address,
        pincode,
        registrationNumber,
        carBrand,
        model ,
        subModel ,
        registrationDate,
        registrationArea,
        chassisNumber,
        loan
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
                gender : "",
                address : "",
                pincode : "",
                registrationNumber : "",
                carBrand : "",
                model : "",
                subModel : "",
                registrationDate : "",
                registrationArea : "",
                chassisNumber : "",
                loan : "",
                policyType : 'car'
            })
        }
    }, [dispatch, error, success]);


    return(
        <form className={'flex flex-row w-full mx-auto'} onSubmit={onFormSubmit}>
            <div className={'flex flex-col p-4 gap-10 w-full lg:w-3/4 text-white mx-auto'}>
                <h1 style={styles.headingBodyStyle} className={'font-bold tracking-tight text-xl sm:text-2xl'} >Create new vehicle policy</h1>
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
                            <label>Enter your gender (M / F / Other)</label>
                            <input type={'text'} name={'gender'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass} value={gender}/>
                        </div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter your address</label>
                            <input type={'text'} name={'address'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass} value={address}/>
                        </div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter your pincode</label>
                            <input type={'text'} name={'pincode'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass} value={pincode}/>                        </div>
                    </div>
                    <div className={'flex flex-col gap-6 w-full md:lgw-3/4'}>
                        <h3 style={styles.headingBodyStyle} className={StyleClass.subHeadStyle}>Vehicle details</h3>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter your Vehicle registration number</label>
                            <input type={'text'} name={'registrationNumber'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass}
                                   value={registrationNumber}/></div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter car brand (Hyundai / Tata ...)</label>
                            <input type={'text'} name={'carBrand'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass}
                                   value={carBrand}/>
                        </div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter model (Alcazar / Vista / i20... )</label>
                            <input type={'text'} name={'model'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass}
                                   value={model}/>
                        </div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter your sub model (1.5 Platinum Turbo/...)</label>
                            <input type={'text'} name={'subModel'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass}
                                   value={subModel}/>
                        </div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter registration date (dd - mm - yy)</label>
                            <input type={'text'} name={'registrationDate'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass}
                                   value={registrationDate}/>
                        </div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter registration area (MH - 15 NASHIK)</label>
                            <input type={'text'} name={'registrationArea'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass}
                                   value={registrationArea}/>
                        </div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Enter chassis number</label>
                            <input type={'text'} name={'chassisNumber'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass}
                                   value={chassisNumber}/></div>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>Is your vehicle currently under loan? (Yes / No)</label>
                            <input type={'text'} name={'loan'} onChange={onHandleDataChange}
                                   style={styles.inputBodyStyle} className={StyleClass.inputStyleClass}
                                   value={loan}/>
                        </div>
                    </div>
                </div>
                <input type={'submit'} style={styles.inputBodyStyle} value={'NEXT'}
                        className={StyleClass.inputStyleClass + ' w-1/5 cursor-pointer mx-auto mb-4'}/>
            </div>
        </form>
    )
}
export default NewPolicyForm