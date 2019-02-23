import { CLICKED_GD } from "../../Constants/actions";

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
        default:
            return {
                ...state
            }
    }
}

export default ChatReducer