import { GROUP_CREATED, GROUP_CREATE_ERROR, DELETE_GROUP } from "../../Constants/actions";

export const CreateGroup = (group) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    firestore.collection("groups").add(group).then((resp) => {
        
        firestore.collection("members").add({
            s_id: group.createdBy,
            name: group.adminName,
            g_id: resp.id,
            joinedAt: Date()
        }).then(()=> dispatch({
            type: GROUP_CREATED
        }))
    }).catch(err => dispatch({
        type: GROUP_CREATE_ERROR,
        payload: err
    }))
}

export const DeleteGroup = (groupId) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()

    firestore.collection("groups").doc(groupId).delete()
        .then(()=> dispatch({
            type: DELETE_GROUP
        }))
}
