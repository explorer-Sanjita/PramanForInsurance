import {NEW_POLICY_FAIL, NEW_POLICY_REQUEST, NEW_POLICY_SUCCESS} from "../constants/clientConstants";
import axios from "axios";
const baseUrl = 'http://localhost:4000'
export const addNewPolicy = (policy,token) => async (dispatch) => {
    try {
        dispatch({ type: NEW_POLICY_REQUEST });
        const config = { headers: { "Content-Type": "application/json" ,"authorization" : `Bearer ${token}`} }
        const { data } = await axios.post(
            baseUrl+'/api/claims/submit',
            {policy : policy},
            config
        );
        console.log(data)

        dispatch({
            type: NEW_POLICY_SUCCESS,
            payload: {
                success: true,
                policy: data,
            }
        });

    } catch (error) {
        dispatch({
            type: NEW_POLICY_FAIL,
            payload: error.response.data.message,
        });
    }
}