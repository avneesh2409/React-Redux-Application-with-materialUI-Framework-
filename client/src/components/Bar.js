import React from 'react'
import {useSelector} from 'react-redux'
export default function Bar(props) {
    const class1 = useSelector(state=>state.userActionReducer)
    return (
        <div style={class1}>
            <h1>we are in Bar.js page</h1>
        </div>
    )
}
