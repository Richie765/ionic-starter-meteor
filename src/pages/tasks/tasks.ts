import { Component } from '@angular/core';
import { MeteorReactive } from 'angular2-meteor';

import { NavController } from 'ionic-angular';

export const Tasks = new Mongo.Collection('tasks');

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html'
})
export class TasksPage extends MeteorReactive {
  tasks: any;

  constructor(public navCtrl: NavController) {
    super();

    this.subscribe("tasks");

    this.tasks = Tasks.find({}, { sort: { createdAt: -1 } });
  }

  toggleChecked(evt, task) {
    // Need a workaround here
    // https://github.com/driftyco/ionic/issues/10309

    if(evt.checked !== task.checked) {
      // Don't toggle just yet, let it happen reactively
      evt.checked = task.checked;
      this.call('tasks.setChecked', task._id, !task.checked);
    }
  }
}
