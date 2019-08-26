import ApiService from './ApiService'
import AuthenticationService from './AuthenticationService';

class TodoService {
    addUpdateTodo(todo, user) {
        let todoUser = (user) ? user : null
        if(!todoUser) {
            todoUser = AuthenticationService.getLoggedInUserId()
        }

        let url = `/users/${todoUser}/todos`
        if(todo.id) {
            url += '/'+todo.id
            return ApiService.put(url, todo)
        } else {
            return ApiService.post(url, todo)
        }
    }
}

export default new TodoService()