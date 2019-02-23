import { CLICKED_PROBLEM } from "../../Constants/actions";

export const ClickedProblem = (problem) => (dispatch) => {
    dispatch({
        type: CLICKED_PROBLEM,
        payload: problem
    })
}