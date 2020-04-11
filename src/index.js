import './styles.css';
import { Todo, TodoList } from './classes';
import { createTaskHtml } from './js/components';

export const todoList = new TodoList();

const { todos } = todoList;
todos.forEach( createTaskHtml );
//Funciona sólo con un argumento

console.log( todos );