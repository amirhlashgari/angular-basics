import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  enteredTitle = '';
  enteredSummary = signal('');
  enteredDate = '';

  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<NewTaskData>();

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.add.emit({ title: this.enteredTitle, summary: this.enteredSummary(), dueDate: this.enteredDate });
  }
}
