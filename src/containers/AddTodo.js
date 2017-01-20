import React from 'react'
import { connect } from 'react-redux'

import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
    let input;
    return (
        <div>
            <input type="text" placeholder="Enter Todo" ref={i => input = i}/>
            <input type="button" value="Add Todo" onClick={() => {
                dispatch(addTodo(input.value))
                input.value = ''
            }}/>
        </div>
    )
}

export default connect()(AddTodo)