import {
    CLEAR_ERRORS,
    GET_ALL_POLICY_FAIL,
    GET_ALL_POLICY_REQUEST, GET_ALL_POLICY_RESET,
    GET_ALL_POLICY_SUCCESS, UPDATE_POLICY_FAIL,
    UPDATE_POLICY_REQUEST, UPDATE_POLICY_RESET,
    UPDATE_POLICY_SUCCESS
} from "../constants/brokerConstants";
import {
    GET_ALL_CLAIMS_FAIL,
    GET_ALL_CLAIMS_REQUEST,
    GET_ALL_CLAIMS_RESET,
    GET_ALL_CLAIMS_SUCCESS
} from "../constants/insuranceConstants";

export const insuranceReducer = (state = { claims: [] }, { type, payload }) => {
    switch (type) {
        case GET_ALL_CLAIMS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_CLAIMS_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                claims: payload.claims,
            };
        case GET_ALL_CLAIMS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case GET_ALL_CLAIMS_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}
