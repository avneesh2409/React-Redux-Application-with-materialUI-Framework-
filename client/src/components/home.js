import React from 'react'
import {useSelector} from 'react-redux'
export default function Home() {
    const class1 = useSelector(state=>state.userActionReducer)
    return (
        <div style={class1}>
            <h1>We are in Home Page</h1>
        </div>
    )
}
