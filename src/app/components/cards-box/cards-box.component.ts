import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TodoService} from '../../services/todo/todo.service';
import {Todo} from '../../models/todo';
import * as moment from 'moment';
import {AddNewListComponent} from '../add-new-list/add-new-list.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-cards-box',
  templateUrl: './cards-box.component.html',
  styleUrls: ['./cards-box.component.scss']
})
export class CardsBoxComponent implements OnInit, OnChanges {
  @Input() public data: Todo;
  @Output() public deleteTrigger: EventEmitter<{id: string}> = new EventEmitter<{id: string}>();
  @Output() public completeTrigger: EventEmitter<{id: string, isCompleted: boolean}>
    = new EventEmitter<{id: string, isCompleted: boolean}>();
  isCompleted = new FormControl(false);
  public color: any;
  public change: boolean;
  constructor(
  ) {}
  ngOnInit(): void {
    this.isCompleted.patchValue(this.data.isCompleted);
  }
  onComplete(id): void {
    this.completeTrigger.emit({
      id,
      isCompleted: this.isCompleted.value
    });
  }
  onDelete(id): void {
    this.deleteTrigger.emit({id});
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.data.dateTime = moment(this.data.dateTime).lang('ru').format('MMMM Do YYYY');
  }

  onChangeColor(): void {
    const ra = document.getElementById('cards');
    this.change = !this.change;
    // ra.style.backgroundColor = '#c6f7f7';
  }
}
