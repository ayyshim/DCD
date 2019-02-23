import { CLICKED_PROBLEM } from "../../Constants/actions";

const initState = {
    problem: {

    }
}

const ProblemReducer = (state = initState, action) => {
    switch (action.type) {
        case CLICKED_PROBLEM:
            return {
                ...state,
                problem: action.payload
            }
        default:
            return initState
    }
}

export default ProblemReducer