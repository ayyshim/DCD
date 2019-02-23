import { UPLOAD_COMPLETE } from "../../Constants/actions";

export const MakeEntry = (forFirestore) => (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore()

    firestore.collection("problems").add(forFirestore).then(() => dispatch({
            type: UPLOAD_COMPLETE
        }))

    
}