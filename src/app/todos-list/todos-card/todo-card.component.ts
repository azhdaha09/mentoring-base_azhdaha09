import { Component, EventEmitter, Input, Output} from "@angular/core";
import { Todo } from "../todos-list.component";
import { ShortField } from "../../pipes/short-field.pipe";

@Component({
    selector: 'app-todo-card',
    templateUrl: './todo-card.component.html',
    styleUrl: './todo-card.component.scss',
    standalone: true,
    imports: [ShortField]
})

export class TodoCardComponent {
    
    @Input()
    todo!: Todo;

    @Output()
    deleteTodo = new EventEmitter()

    onDeleteTodo(todoId: number) {
        this.deleteTodo.emit(todoId)
    }
}