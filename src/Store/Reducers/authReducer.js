import { LOGIN_SUCCESS, LOADING } from "../../Constants/actions";

const initState = {
    loading: false
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                loading: false
            };
        case LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default AuthReducer