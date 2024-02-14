import PramanLogo from "../../assets/logos/pramanLogo.svg"
import GetStartedImage from "../../assets/images/getStartedImage.jpeg"
import MetaMaskLogo from "../../assets/logos/metamaskLogo.svg"
import classNames from 'classnames';
import {useEffect, useState} from "react";
import {connectWallet} from "../../utils/MetaMask";
import {toast} from "react-toastify";
import colors from "tailwindcss/colors";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {clearErrors, loginUser, registerUser} from "../../action/userAction";
import {Link} from "react-router-dom";

export const Login = () => {
    /* Style */
    const styles = {
        loginBodyStyle : {
            backgroundColor : '#262626',
        },
        headingBodyStyle : {
            fontFamily: 'Poppins'
        },
        inputBodyStyle : {
            padding: '10px 0px 10px 10px',
            gap: '10px',
            borderRadius: '10px',
            border: '1px solid #D9D9D9'
        },
        getStartedImageStyle : {
            borderRadius: '45px 0px 0px 45px'
        }
    }
    const StyleClass = {
        inputBodyStyle : classNames(
            'flex flex-col gap-1'
        ),
        inputStyleClass  : classNames (
            'items-start bg-transparent '
        ),
    }

    /* States and Hooks */
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();


    const [isAgree,setIsAgree] = useState(false)

    const { email, password } = userData;

    const dispatch = useDispatch();

    const { loading, isAuthenticated, error,user } = useSelector((state) => state.user);

    /* Handle Function */
    const onHandleDataChange = (e) =>{
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    // const registerUser =  async (user) =>{
    //     const config = {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     }
    //
    //     const { data } = await axios.post(
    //         'http://localhost:4000/api/users/register',
    //         user,
    //         config
    //     );
    //
    //     return data
    // }
    const onHandleSubmit = (e) =>{
        e.preventDefault();

        if(!email) {
            toast.error('Please Provide Email',{
                theme : 'colored'
            })
            return
        }
        if(!password) {
            toast.error('Please Provide Password',{
                theme : 'colored'
            })
            return
        }
        if(!isAgree) {
            toast.error('Please Agree the Term',{
                theme : 'colored'
            })
            return
        }

        dispatch(loginUser(userData))
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            console.log(user)
            if(user.role === 'user')
            {
                navigate(`/client-dashboard`)
            }else if(user.role === 'insuranceFirm'){
                navigate(`/insurance-dashboard`)
            }else if(user.role === 'broker'){
                navigate('/broker-dashboard')
            }
        }
    }, [dispatch, error, isAuthenticated, navigate]);

    return (
        <div className={'sm:md:w-full  flex flex-row h-[100vh] mx-auto text-white gap-2 lg:gap-8 items-center justify-center'} style={styles.loginBodyStyle}>
            <div className={'w-full flex flex-col p-4  sm:md:lg:max-w-3xl '} style={{paddingTop : '0px',paddingBottom : '0px'}} >
                <img className={'w-48 h-48 mx-auto'} src={PramanLogo} alt={'Praman Logo'}/>
                <form className={'flex flex-col gap-10'} onSubmit={onHandleSubmit}>
                    <h1 className={'font-bold tracking-tight text-3xl sm:text-4xl'} style={styles.headingBodyStyle}>Welcome back!</h1>
                    <div className={'space-y-8'}>
                        <div className={StyleClass.inputBodyStyle}>
                            <label>
                                Email
                            </label>
                            <input style={styles.inputBodyStyle}
                                   className={StyleClass.inputStyleClass}
                                   type={'email'}
                                   name={'email'}
                                   value={email}
                                   onChange={onHandleDataChange}
                                   placeholder={'Enter your Email'}
                                   required
                            />
                        </div>
                        <div className={StyleClass.inputBodyStyle+' relative'}>
                            <label>
                                Password
                            </label>
                            <input style={styles.inputBodyStyle}
                                   className={StyleClass.inputStyleClass}
                                   type={'password'}
                                   name={'password'}
                                   value={password}
                                   onChange={onHandleDataChange}
                                   placeholder={'Enter your password'}
                                   required
                            />
                        </div>
                        <div className={'flex flex-row gap-3'}>
                            <input type={"checkbox"} id={'agreeCheck'} name={'agreeCheck'} value={isAgree} required onChange={()=>{
                                setIsAgree(!isAgree)
                            }}/>
                            <label htmlFor={'agreeCheck'} >I agree to the <span className={'underline'}>terms & policy</span> </label>
                        </div>
                        <div className={'flex justify-center'}>
                            <input type={'submit'} className={StyleClass.inputStyleClass + ' w-1/5 cursor-pointer '} style={styles.inputBodyStyle} value={'Log In'}/>
                        </div>
                    </div>
                    <label>Don’t have an account? <Link to={'/signup'} className={'text-[#94ABFF]'}> Signup </Link>  </label>
                </form>
            </div>
            <div className={'hidden lg:flex' }>
                <img className={'lg:max-w-2xl object-center h-[90vh]'} alt={'Get-Started Image'} src={GetStartedImage} style={styles.getStartedImageStyle} />
            </div>
        </div>
    )
}
