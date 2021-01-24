import {Component, Injectable, OnInit, ViewEncapsulation} from '@angular/core';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TodoService} from '../../services/todo/todo.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {Todo} from '../../models/todo';

@Component({
  selector: 'app-add-new-list',
  templateUrl: './add-new-list.component.html',
  styleUrls: ['./add-new-list.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class AddNewListComponent implements OnInit {
  public form: FormGroup;
  public isAddPage = true;
  public id: string;
  public todo: Todo;
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
    }
    return '';
  }
  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      notes: ['', Validators.required],
      dateTime: ['', Validators.required],
    });
    this.id = this.activatedRoute.snapshot.params.id;
    if (this.id) {
      this.isAddPage = false;
      this.todoService.getById(this.id).subscribe( result => {
        this.todo = result.todo;
        this.form.patchValue({
          title: this.todo.title,
          notes: this.todo.notes,
          dateTime: new Date(this.todo.dateTime)
        });
      });
    }
  }
  onSubmit(): void {
    if (this.form.invalid) {
      alert('zapolnite form');
      return;
    }
    if (this.id) {
      this.todoService.update(
        {...this.form.value, isCompleted: this.todo.isCompleted, _id: this.todo._id, dateTime: moment(this.form.value.dateTime).format()})
        .subscribe( result => {
          this.router.navigate(['/']);
        });
    }
    else {
      this.todoService.create({...this.form.value, isCompleted: false, dateTime: moment(this.form.value.dateTime).format()})
        .subscribe((result) => {
        this.form.reset();
        this.router.navigate(['/']);
      });
    }
  }
}
