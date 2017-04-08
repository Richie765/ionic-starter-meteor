import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MeteorObservable, MongoObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs';

import { NavController } from 'ionic-angular';

export const Tasks = new MongoObservable.Collection('tasks');

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html'
})
export class TasksPage implements OnInit, OnDestroy {
  private meteorSubscription: Subscription;
  tasks: Observable<any>;

  constructor(public navCtrl: NavController) {
  }

  ngOnInit() {
    this.meteorSubscription = MeteorObservable.subscribe('tasks').subscribe(() => {
      // Subscription is ready!
      this.tasks = Tasks.find({}, { sort: { createdAt: -1 } });
    });
  }

  ngOnDestroy() {
    this.meteorSubscription.unsubscribe();
  }

  toggleChecked(evt, task) {
    // Need a workaround here
    // https://github.com/driftyco/ionic/issues/10309

    if(evt.checked !== task.checked) {
      // Don't toggle just yet, let it happen reactively
      evt.checked = task.checked;

      MeteorObservable.call('tasks.setChecked', task._id, !task.checked).subscribe(response => {
        // Handle success and response from server!
      }, (err) => {
        // Handle error
      });
    }
  }
}
