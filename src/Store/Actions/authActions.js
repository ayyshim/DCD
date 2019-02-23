import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOADING } from "../../Constants/actions";

export const LoginWithGithub = () => (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch(isLoading())
    const firebase = getFirebase()
    const firestore = getFirestore()
    const provider = new firebase.auth.GithubAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const {isNewUser, username, profile} = result.additionalUserInfo
            if(isNewUser) {
                firestore.collection("users").doc(result.user.uid).set({
                    name: profile.name ? profile.name : username,
                    username: username,
                    member_since: new Date()                
                }).then(() => dispatch({
                    type: LOGIN_SUCCESS,
                    payload: result
                }))
            } else {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: result
                })
            }
        })
}

const isLoading = () => {
    return {
        type: LOADING
    }
}

export const Logout = () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()

    firebase.auth().signOut()
        .then(() => dispatch({
            type: LOGOUT_SUCCESS
        }))

}