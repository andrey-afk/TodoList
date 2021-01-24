import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {toPublicName} from '@angular/compiler/src/i18n/serializers/xmb';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import {TodoService} from '../../services/todo/todo.service';
import {Todo} from '../../models/todo';
import * as moment from 'moment';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public todos: Todo[];
  public todayDateTime: any;
  public oneDay: any;
  public twoDay: any;
  public threeDay: any;
  public fourDay: any;
  public fiveDay: any;
  public sixDay: any;
  constructor(
    private todoService: TodoService
  ) {}
  ngOnInit(): any {
    this.getAll();
    // for (let i = 0; i < 6; ++i) {
    //   this.onDateTime = [moment().add(i, 'days').lang('ru').format('MMMM Do YYYY')];
    //   console.log(this.onDateTime);
    // }
    this.todayDateTime = [moment().lang('ru').format('MMMM Do')];
    this.oneDay = [moment().add(1, 'days').locale('ru').format('MMMM Do')];
    this.twoDay = [moment().add(2, 'days').locale('ru').format('MMMM Do')];
    this.threeDay = [moment().add(3, 'days').locale('ru').format('MMMM Do')];
    this.fourDay = [moment().add(4, 'days').locale('ru').format('MMMM Do')];
    this.fiveDay = [moment().add(5, 'days').locale('ru').format('MMMM Do')];
    this.sixDay = [moment().add(6, 'days').locale('ru').format('MMMM Do')];
  }
  onDelete(obj: { id: string }): void {
    if (confirm('Are u sure?')) {
      this.todoService.delete(obj.id).subscribe( result => {
        console.log(result);
        this.getAll();
      });
    }
  }
  // cardComplete(): void {
  //
  // }
  // cardActive(): void  {
  // }
  onComplete(obj: { id: string, isCompleted: boolean}): void {
    this.todoService.complete({id: obj.id, isCompleted: obj.isCompleted}).subscribe();
  }
  getAll(): void{
    this.todoService.getAll().subscribe(result => {
      this.todos = result;
    });
  }
}
