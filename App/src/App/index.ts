/* Created by Gil Epshtain on 24/11/017 */

"use strict";

const fileName: string = "Index";
console.log(`Running ${fileName}...`);

// Load Libraries
import { module } from 'angular';

// Load Application Modules
import mapRingsService from './Components/MapView/MapRingsService/mapRingsService';
import appController from './appController';
import mapPageController from './Components/MapView/mapPageController';
import mapDirective from './Components/MapView/Map/mapDirective';
import mapRingsListDirective from './Components/MapView/MapRingsList/mapRingsListDirective';
import mapRingsListItemDirective from './Components/MapView/MapRingsList/MapRingsListItem/mapRingsListItemDirective';

const app = module("App", []);

mapRingsService(app);
appController(app);
mapPageController(app);
mapDirective(app);
mapRingsListDirective(app);
mapRingsListItemDirective(app);