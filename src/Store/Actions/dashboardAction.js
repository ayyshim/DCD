import { GROUP_CREATED, GROUP_CREATE_ERROR } from "../../Constants/actions";

export const CreateGroup = (group) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    console.log(group)
    firestore.collection("groups").add(group).then(() => dispatch({
        type: GROUP_CREATED
    })).catch(err => dispatch({
        type: GROUP_CREATE_ERROR,
        payload: err
    }))
}
