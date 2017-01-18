import React from 'react'

class AddTodo extends React.Component {
    render() {
        let { addTodo } = this.props;
        let input;
        return (
            <div>
                <input type="text" placeholder="Enter Todo" ref={i => input = i}/>
                <input type="button" value="Add Todo" onClick={() => {
                    addTodo(input.value)
                    input.value = ''
                }}/>
            </div>
        )
    }
}

export default AddTodo