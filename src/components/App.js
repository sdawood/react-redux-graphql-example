import React from 'react'

import '../styles/styles.css'

import AddTodo from './AddTodo'
import TodoList from './TodoList'

class App extends React.Component {
    state = {
        todos: []
    }
    todoID = () => {
        return Date.now().toString()
    }
    receiveTodos = () => {
        return this.state.todos
    }
    addTodo = (text) => {
        if(text.trim().length <= 0) {
            return;
        }
        let id = this.todoID()
        let todos = [
            ...this.state.todos, {
                id: id,
                text: text,
                completed: false
            }
        ]
        this.setState({
            todos: todos
        })
    }
    toggleTodo = (id) => {
        let todos = this.state.todos.map(todo => {
            if (todo.id !== id) {
                return todo
            }
            return {
                ...todo, completed: !todo.completed
            }
        })
        this.setState({
            todos: todos
        })
    }

    render() {
        return (
          <div>
              <AddTodo
                  addTodo={this.addTodo}
              />
              <TodoList
                  todos={this.state.todos}
                  onTodoClick={this.toggleTodo}
                  receiveTodos={this.receiveTodos}
              />
          </div>
        );
    }
}

export default App;