import React from 'react'
import {useSelector} from 'react-redux'
const Report = () =>{
    const class1 = useSelector(state=>state.userActionReducer)
    return (
        <div style={class1}>
            <h1>We are in Report page</h1>
        </div>
    )
}
export default Report
