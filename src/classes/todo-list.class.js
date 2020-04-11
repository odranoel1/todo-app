import { Todo } from ".";

export class TodoList {

    constructor() {
        this.loadLocalStorage();
    }

    newTodo( todo ) {
        this.todos.push( todo );
        this.saveLocalStorage();
    }

    deleteTodo( id ) {
        this.todos = this.todos.filter( todo => todo.id != id );
        this.saveLocalStorage();
    }

    checkCompleted( id ) {

        const newId = id * 1;
        for ( const todo of this.todos ) {

            if (todo.id === newId) {

                todo.completed = !todo.completed;
                this.saveLocalStorage();
                break;
            }
        }
    }

    deleteTodoCompleted() {

        this.todos = this.todos.filter( todo => !todo.completed );
        this.saveLocalStorage();
    }

    saveLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    loadLocalStorage() {
        this.todos = (localStorage.getItem('todo'))
                    ? JSON.parse(localStorage.getItem('todo'))
                    : [] ;
        
        // this.todos = this.todos.map( obj => Todo.fromJson( obj ) );
        this.todos = this.todos.map( Todo.fromJson );
    }
}