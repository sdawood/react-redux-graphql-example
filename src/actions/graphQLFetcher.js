import fetch from 'isomorphic-fetch'

const graphqlServer = window.location.origin + '/graphql'

const todoID = () => {
    return Date.now().toString()
}

const graphQlFetcher = (graphQLParams) => {
    return new Promise((resolve, reject) => {
        fetch(graphqlServer, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/graphql'
            },
            body: graphQLParams
        }).then(response => resolve(response.json()))
    })
}

export const asyncGetTodos = () => {
    return new Promise((resolve, reject) => {
        graphQlFetcher(`
            query {
                todos {
                    id,
                    text,
                    completed
                }
            }
        `).then(json => resolve(json.data))
    })
}

export const asyncAddTodo = (text) => {
    let id = todoID()
    return new Promise((resolve, reject) => {
        graphQlFetcher(`
            mutation {
                addTodo(text: "${text}", id: "${id}")
            }
        `).then(json => {
            console.log(json)
            resolve(json.data.addTodo)
        })
    })
}

export const asyncToggleTodo = (id) => {
    return new Promise((resolve, reject) => {
        graphQlFetcher(`
            mutation {
                toggleTodo(id: "${id}")
            }
        `).then(json => resolve(json.data.toggleTodo))
    })
}