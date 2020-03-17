import React from 'react'
import {useSelector} from 'react-redux'
export default function PageNotfound() {
    const class1 = useSelector(state=>state.userActionReducer)
    return (
        <div style={class1}>
            <h1>404 page not found error</h1>
        </div>
    )
}
