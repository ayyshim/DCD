import React from 'react';
import { GROUP_CREATED, GROUP_CREATE_ERROR, DELETE_GROUP } from "../../Constants/actions";
import {Redirect} from 'react-router-dom'
const initState = {}

const DashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case GROUP_CREATED:
            console.log("HHH")
            return state
        case GROUP_CREATE_ERROR:
            return state
        case DELETE_GROUP:
            return <Redirect to="/"/>
        default:
            return state
    }
}

export default DashboardReducer