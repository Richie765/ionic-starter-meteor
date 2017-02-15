import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Imports for Meteor Backend

// import 'meteor-client-side'
import 'meteor-client-side/dist/meteor-client-side.bundle'
import './extends';
import './setup';
import './reactive-var';

import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
