/* Created by Gil Epshtain on 24/11/017 */

"use strict";

const fileName: string = "AppController";
console.log(`Running ${fileName}...`);

export default function(ngModule: angular.IModule)
{
    ngModule
        .controller('AppController',
        [            
            appCtrlFunc
        ]);

    function appCtrlFunc()
    {
        const appCtrl = this;

        appCtrl.mapPageUrl = "App/Components/MapView/mapPageView.html";
    }
}