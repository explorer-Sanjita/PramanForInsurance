import {
    CLEAR_ERRORS,
    NEW_POLICY_FAIL,
    NEW_POLICY_REQUEST,
    NEW_POLICY_RESET,
    NEW_POLICY_SUCCESS
} from "../constants/clientConstants";

export const newPolicyReducer = (state = { policy: {} }, { type, payload }) => {
    switch (type) {
        case NEW_POLICY_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_POLICY_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                policy: payload.policy,
            };
        case NEW_POLICY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case NEW_POLICY_RESET:
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