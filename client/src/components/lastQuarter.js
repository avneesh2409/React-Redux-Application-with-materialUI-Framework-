import React from 'react'
import {useSelector} from 'react-redux'
export default function LastQuarter() {
    const class1 = useSelector(state=>state.userActionReducer)
    return (
        <div style={class1}>
            <h1>We are in Last Quarter</h1>
        </div>
    )
}
