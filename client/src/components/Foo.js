import React from 'react'
import { useSelector } from 'react-redux'
export default function Foo(props) {
    const class1 = useSelector(state=>state.userActionReducer)
    // const state = useSelector(state => state)
    // console.log(state)
    return (
        <div style={class1}>
            <h1>we are in Foo.js  page</h1>
        </div>
    )
}
