import { Todo } from "../classes";
import { todoList } from '../index';

// Html referemces 
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnDeleted    = document.querySelector('.clear-completed');
const ulFilters     = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');

export const createTaskHtml = (task) => {

    const htmlTodo = `
    <li class="${ (task.completed) ? 'completed' : '' }" data-id="${ task.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (task.completed) ? 'checked' : '' }>
            <label>${ task.name }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div;
}

// Events(
txtInput.addEventListener('keyup', ( event ) => {
    
    if ( event.keyCode === 13 && txtInput.value.length > 0) {

        const newTask = new Todo( txtInput.value );
        todoList.newTodo( newTask );
        
        createTaskHtml( newTask );

        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', ( event ) => {
    
    const element     = event.target.localName; //input, label, button
    const taskElement = event.target.parentElement.parentElement;
    const taskId      = taskElement.getAttribute('data-id');

    if ( element.includes('input') ) {
        todoList.checkCompleted( taskId );
        taskElement.classList.toggle('completed');
    }

    if ( element.includes('button') ) {
        todoList.deleteTodo( taskId );
        divTodoList.removeChild( taskElement );
    }
});

btnDeleted.addEventListener('click', () => {

    todoList.deleteTodoCompleted();

    for (let i = divTodoList.children.length - 1; i >= 0; i-- ) {
        const element = divTodoList.children[i];

        if (element.classList.contains('completed')) {

            divTodoList.removeChild( element );

        }
    }
});

ulFilters.addEventListener('click', (event) => {
    
    const filter = event.target.text;
    if (!filter) { return };

    anchorFilters.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for (const element of divTodoList.children) {
        
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');
        
        switch(filter) {
            case 'Pendientes':
                if (completed) {
                    element.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completed) {
                    element.classList.add('hidden');
                }
                break;
        }
    }
});