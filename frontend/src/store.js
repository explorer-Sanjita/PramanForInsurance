import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducer';
import {newPolicyReducer} from "./reducers/policyReducer";
import {allInsuranceFirmReducer, brokerReducer} from "./reducers/brokerReducer";
import {insuranceReducer} from "./reducers/insuranceReducer";

const reducer = combineReducers({
    user: userReducer,
    policy : newPolicyReducer,
    policies : brokerReducer,
    allInsuranceFirm : allInsuranceFirmReducer,
    insuranceClaims : insuranceReducer
});

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;