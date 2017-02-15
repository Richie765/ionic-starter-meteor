import { NgModule, ErrorHandler, IterableDiffers } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { DefaultIterableDifferFactory, MongoCursorDifferFactory } from 'angular2-meteor'; // Meteor Backend

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TasksPage } from '../pages/tasks/tasks';
import { TabsPage } from '../pages/tabs/tabs';


// Meteor Backend

export function iteratorFactory() {
  return new IterableDiffers([
    new DefaultIterableDifferFactory(),
    new MongoCursorDifferFactory()
  ]);
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TasksPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TasksPage,
    TabsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: IterableDiffers, useFactory: iteratorFactory }, // Meteor Backend
  ]
})
export class AppModule {}
