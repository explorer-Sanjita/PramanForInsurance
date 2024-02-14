import {
    CLEAR_ERRORS,
    GET_ALL_INSURANCE_FIRM_FAIL,
    GET_ALL_INSURANCE_FIRM_REQUEST,
    GET_ALL_INSURANCE_FIRM_RESET,
    GET_ALL_INSURANCE_FIRM_SUCCESS,
    GET_ALL_POLICY_FAIL,
    GET_ALL_POLICY_REQUEST,
    GET_ALL_POLICY_RESET,
    GET_ALL_POLICY_SUCCESS,
    UPDATE_POLICY_FAIL,
    UPDATE_POLICY_REQUEST,
    UPDATE_POLICY_RESET,
    UPDATE_POLICY_SUCCESS
} from "../constants/brokerConstants";

export const brokerReducer = (state = { policies: [] }, { type, payload }) => {
    switch (type) {
        case GET_ALL_POLICY_REQUEST:
        case UPDATE_POLICY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_POLICY_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                policies: payload.policies,
            };
        case UPDATE_POLICY_SUCCESS :
            return{
                loading: false,
                success: payload.success
            }
        case GET_ALL_POLICY_FAIL:
        case UPDATE_POLICY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case GET_ALL_POLICY_RESET:
        case UPDATE_POLICY_RESET:
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
export const allInsuranceFirmReducer = (state = { insuranceFirms: [] }, { type, payload }) => {
    switch (type) {
        case GET_ALL_INSURANCE_FIRM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_INSURANCE_FIRM_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                insuranceFirms: payload.users,
            };
        case GET_ALL_INSURANCE_FIRM_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case GET_ALL_INSURANCE_FIRM_RESET:
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