import { CLICKED_GD, ADD_USER, ADD_USER_ERROR } from "../../Constants/actions";

const initState = {
    runningDiscussion: ""
}

const ChatReducer = (state = initState, action) => {
    switch (action.type) {
        case CLICKED_GD:
            return {
                ...state,
                runningDiscussion: action.payload
            }
        case ADD_USER:
            return state
        case ADD_USER_ERROR:
            console.log(action.payload)
            return state
        default:
            return {
                ...state
            }
    }
}

export default ChatReducer