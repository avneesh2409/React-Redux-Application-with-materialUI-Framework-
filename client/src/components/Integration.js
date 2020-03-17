import React from 'react'
import {useSelector} from 'react-redux'
const Integration = () =>{
    const class1 = useSelector(state=>state.userActionReducer)
    return (
        <div style={class1}>
            <h1>we are in Integration page</h1>
        </div>
    )
}
export default Integration