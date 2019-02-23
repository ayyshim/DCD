import { GROUP_CREATED, GROUP_CREATE_ERROR } from "../../Constants/actions";

export const CreateGroup = (group) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()

    firestore.collection("groups").add({
        name: group.name,
        descpt: group.descpt,
        createdBy: group.admin,
        createdAt: new Date()
    }).then(resp => dispatch({
        type: GROUP_CREATED,
        payload: resp
    })).catch(err => dispatch({
        type: GROUP_CREATE_ERROR,
        payload: err
    }))
}
