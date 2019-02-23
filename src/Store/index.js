import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './Reducers';
import thunk from 'redux-thunk';
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase'
import {getFirestore, reduxFirestore} from 'redux-firestore'
import fbConfig from '../Configs/firebaseConfig'

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reactReduxFirebase(fbConfig, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}),
    reduxFirestore(fbConfig)
))

export default store