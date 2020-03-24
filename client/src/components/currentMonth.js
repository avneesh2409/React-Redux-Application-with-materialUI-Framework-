import React from 'react'
import {useSelector} from 'react-redux'
export default function CurrentMonth() {
const class1 = useSelector(state=>state.userActionReducer)
    return (
        <div style={class1}>
            <h1>we are in Current Month Page</h1>
        </div>
    )
}
