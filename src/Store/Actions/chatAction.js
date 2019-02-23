import { CLICKED_GD, MESSAGE_SENT, ADD_USER, ADD_USER_ERROR } from "../../Constants/actions";

export const ClickdGD = (key) => (dispatch) => {
    dispatch({
        type: CLICKED_GD,
        payload: key
    })
}

export const Chat = (details) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    firestore.collection("messages").add({
        message: details.message,
        s_id: details.s_id,
        g_id: details.g_id,
        s_dn: details.s_dn,
        createdAt: Date()
    }).then(()=>{
        dispatch({
            type: MESSAGE_SENT
        })
    })
}

export const AddUserToChat = (username, g_id, s_id) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()

    firestore.collection("members").add({
        g_id: g_id,
        name: username,
        s_id: s_id,
        joinedAt: Date()
    }).then(() => dispatch({
        type: ADD_USER
    })).catch((error)=>{
        dispatch({
            type: ADD_USER_ERROR,
            payload: error
        })
    })

}