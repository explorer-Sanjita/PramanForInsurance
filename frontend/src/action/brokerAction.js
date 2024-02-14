import axios from "axios";
import {
    CLEAR_ERRORS, GET_ALL_INSURANCE_FIRM_FAIL, GET_ALL_INSURANCE_FIRM_REQUEST, GET_ALL_INSURANCE_FIRM_SUCCESS,
    GET_ALL_POLICY_FAIL,
    GET_ALL_POLICY_REQUEST,
    GET_ALL_POLICY_SUCCESS, UPDATE_POLICY_FAIL, UPDATE_POLICY_REQUEST, UPDATE_POLICY_SUCCESS
} from "../constants/brokerConstants";

const baseUrl = 'http://localhost:4000'
export const getAllPolicyRequest = () => async (dispatch) => {
    try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NThjYTExNzM5ZGFlM2JkOWU3ODBjNTciLCJpYXQiOjE3MDM3NDkwMjcsImV4cCI6MTcwMzc1MjYyN30.zM4TXt7aTyXkFzw4shuWnNB8Vo2caufmcwlVuk3cxjE'
        dispatch({ type: GET_ALL_POLICY_REQUEST });
        const config = { headers: { "Content-Type": "application/json" ,"authorization" : `Bearer ${token}`} }
        const { data } = await axios.get(
            baseUrl+'/api/claims/getAllClaims',
            config
        );
        dispatch({
            type: GET_ALL_POLICY_SUCCESS,
            payload: {
                success: true,
                policies: data,
            }
        });

    } catch (error) {
        dispatch({
            type: GET_ALL_POLICY_FAIL,
            payload: error.response.data.message,
        });
    }
}
export const getAllInsuranceFirm = () => async (dispatch) => {
    try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NThjYTExNzM5ZGFlM2JkOWU3ODBjNTciLCJpYXQiOjE3MDM3NDkwMjcsImV4cCI6MTcwMzc1MjYyN30.zM4TXt7aTyXkFzw4shuWnNB8Vo2caufmcwlVuk3cxjE'
        dispatch({ type: GET_ALL_INSURANCE_FIRM_REQUEST });
        const config = { headers: { "Content-Type": "application/json" ,"authorization" : `Bearer ${token}`} }
        const { data } = await axios.get(
            baseUrl+'/api/users/getAllInsuranceUser',
            config
        );
        console.log(data)
        dispatch({
            type: GET_ALL_INSURANCE_FIRM_SUCCESS,
            payload: {
                success: data.success,
                users: data.users,
            }
        });

    } catch (error) {
        dispatch({
            type: GET_ALL_INSURANCE_FIRM_FAIL,
            payload: error.response.data.message,
        });
    }
}
export const updatePolicy = (policy) => async (dispatch) => {
    try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NThjYTExNzM5ZGFlM2JkOWU3ODBjNTciLCJpYXQiOjE3MDM3NDkwMjcsImV4cCI6MTcwMzc1MjYyN30.zM4TXt7aTyXkFzw4shuWnNB8Vo2caufmcwlVuk3cxjE'
        dispatch({ type: UPDATE_POLICY_REQUEST });
        const config = { headers: { "Content-Type": "application/json" ,"authorization" : `Bearer ${token}`} }
        const { data } = await axios.put(
            baseUrl+'/api/claims/updatePolicy',
            policy,
            config
        );
        console.log(data)
        dispatch({
            type: UPDATE_POLICY_SUCCESS,
            payload: {
                success: true,
                policy: data,
            }
        });

    } catch (error) {
        dispatch({
            type: UPDATE_POLICY_FAIL,
            payload: error.response.data.message,
        });
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};