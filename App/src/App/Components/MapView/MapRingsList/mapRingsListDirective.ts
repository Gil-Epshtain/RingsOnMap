/* Created by Gil Epshtain on 24/11/017 */

"use strict";

const fileName: string = "MapRingsListDirective";
console.log(`Running ${fileName}...`);

import './mapRingsListStyle.less';

import { MapRing } from '../MapRingsService/mapRing';

export default function(ngModule: angular.IModule)
{   
    class MapRingsListClass
    {
        public restrict: string;
        public template: any;
        public scope: any;

        constructor()
        {
            this.restrict = 'E';
            this.template = require("./mapRingsListView.html");
            this.scope = 
            {
                mapRingsList: '=list',
                onDeleteRing: '&',
                onAddRing: '&'
            };
        }

        public link(scope, element, attrs) 
        {
            console.log(`Executing ${fileName}...`);

            scope.onDelete = function(ringIndex: number)
            {
                console.log(`${fileName} - OnDelete [${ringIndex}]`);

                scope.onDeleteRing({ mapRingIndex: ringIndex });
            };

            scope.addRing = function()
            {
                console.log(`${fileName} - AddRing`);
                
                scope.onAddRing();
            };
        }
    }

    ngModule
        .directive('mapRingsList', () => new MapRingsListClass);
}