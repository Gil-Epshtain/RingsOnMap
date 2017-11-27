/* Created by Gil Epshtain on 24/11/017 */

"use strict";

const fileName: string = "MapRingsListItemDirective";
console.log(`Running ${fileName}...`);

import './mapRingsListItemStyle.less';

export default function(ngModule: angular.IModule)
{
    class MapRingsListItemClass
    {
        public restrict: string;
        public template: any;
        public scope: any;

        constructor()
        {
            this.restrict = 'E';
            this.template = require("./mapRingsListItemView.html");
            this.scope = 
            {
                isActive: '=',
                lat: '=',
                long: '=',
                radius: '=',
                color: '=',
                onDelete: '&'
            };
        }

        public link(scope, element, attrs) 
        {
            console.log(`Executing ${fileName}...`);
        
            scope.deleteRing = function()
            {
                console.log(`${fileName} - DeleteRing`);

                scope.onDelete();
            }
        }
    }

    ngModule
        .directive('mapRingsListItem', () => new MapRingsListItemClass);
}