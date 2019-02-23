import {combineReducers} from 'redux'
import AuthReducer from './authReducer';
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
import DashboardReducer from './dashboardReducer';
import ChatReducer from './chatReducer';
import ProblemReducer from './problemReducer';
import ProjectReducer from './projectReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    test: DashboardReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    chatRed: ChatReducer,
    problem: ProblemReducer,
    project: ProjectReducer
})

export default rootReducer