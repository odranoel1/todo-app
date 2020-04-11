export class Todo {

    static fromJson({ id, name, completed, created }) {

        const temporalTodo = new Todo( name );
        temporalTodo.id = id;
        temporalTodo.completed = completed;
        temporalTodo.created = created;

        return temporalTodo;
    }

    constructor( task ) {
        this.name       = task;
        this.id         = new Date().getTime();
        this.completed  = false;
        this.created    = new Date();
    }

    printClass() {
        console.log(`${ this.name } - ${ this.id } `);
    }

}