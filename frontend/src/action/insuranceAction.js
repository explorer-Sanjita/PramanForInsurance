import {GET_ALL_POLICY_FAIL, GET_ALL_POLICY_REQUEST, GET_ALL_POLICY_SUCCESS} from "../constants/brokerConstants";
import axios from "axios";
import {GET_ALL_CLAIMS_FAIL, GET_ALL_CLAIMS_REQUEST, GET_ALL_CLAIMS_SUCCESS} from "../constants/insuranceConstants";
const baseUrl = 'http://localhost:4000'
export const getAllClaimsByInsuranceId = (token) => async (dispatch) => {
    try {
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NThjYTExNzM5ZGFlM2JkOWU3ODBjNTciLCJpYXQiOjE3MDM3NDkwMjcsImV4cCI6MTcwMzc1MjYyN30.zM4TXt7aTyXkFzw4shuWnNB8Vo2caufmcwlVuk3cxjE'
        dispatch({ type: GET_ALL_CLAIMS_REQUEST });
        const config = { headers: { "Content-Type": "application/json" ,"authorization" : `Bearer ${token}`} }
        const { data } = await axios.get(
            baseUrl+'/api/claims/getAllClaimsByInsuranceId',
            config
        );
        console.log(data)
        dispatch({
            type: GET_ALL_CLAIMS_SUCCESS,
            payload: {
                success: true,
                claims: data,
            }
        });

    } catch (error) {
        dispatch({
            type: GET_ALL_CLAIMS_FAIL,
            payload: error.response.data.message,
        });
    }
}