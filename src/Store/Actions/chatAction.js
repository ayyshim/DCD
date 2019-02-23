import { CLICKED_GD, MESSAGE_SENT } from "../../Constants/actions";

export const ClickdGD = (key) => (dispatch) => {
    dispatch({
        type: CLICKED_GD,
        payload: key
    })
}

export const Chat = (details) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()
    console.log(details)
    firestore.collection("messages").add({
        message: details.message,
        s_id: details.s_id,
        g_id: details.g_id,
        createdAt: Date()
    }).then(()=>{
        dispatch({
            type: MESSAGE_SENT
        })
    })
}