import ApiService from './ApiService'
import AuthenticationService from './AuthenticationService';

class TodoService {
    updateTodo(todo, user) {
        let todoUser = (user) ? user : null
        if(!todoUser) {
            todoUser = AuthenticationService.getLoggedInUser()
        }
        let url = `/users/${todoUser}/todos/${todo.id}`
        return ApiService.put(url, todo)
    }
}

export default new TodoService()