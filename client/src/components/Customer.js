import React from 'react'
import {useSelector} from 'react-redux'
const Customer = () =>{
    const class1 = useSelector(state=>state.userActionReducer)
    return (
        <div style={class1}>
            <h1>We are in Customer Page</h1>
        </div>
    )
}
export default Customer
