import { UPLOAD_COMPLETE } from "../../Constants/actions";

const initState = {}

const ProjectReducer = (state= initState, action) => {
    switch (action.type) {
        case UPLOAD_COMPLETE:
            console.log(action.payload)
            return state
    
        default:
            return state;
    }
}

export default ProjectReducer