/* Created by Gil Epshtain on 24/11/017 */

"use strict";

const fileName: string = "MapPageController";
console.log(`Running ${fileName}...`);

import './mapPageStyle.less';

import { MapRing } from "./MapRingsService/mapRing";
import { IMapRingsService } from "./MapRingsService/mapRingsService";

export default function(ngModule: angular.IModule)
{
    class mapPageCtrlClass
    {
        private _pageTitle: string;
        private _ringsWidth: number;
        private _isShowOnlyIntersection: boolean;

        constructor(private MapRingsService: IMapRingsService)
        {
            this._pageTitle = "Map";
            this._ringsWidth = 1000;
            this._isShowOnlyIntersection = false;
        }

        public get pageTitle()
        {
            return this._pageTitle;
        }
     
        public get ringsWidth()
        {
            return this._ringsWidth;
        }
        public set ringsWidth(value: number)
        {
            if (0 < value && value <= 10000)
            {
                this._ringsWidth = value;
            }
            else
            {
                alert("Ring width range 1 - 10000 meters only");
            }
        }

        public get isShowOnlyIntersection()
        {
            return this._isShowOnlyIntersection;
        }
        public set isShowOnlyIntersection(value: boolean)
        {
            if (value == false)
            {
                this._isShowOnlyIntersection = value;
            }
            else
            {
                alert("Only Intersection not implemented yet :-(");
            }
        }

        public get ringsList(): MapRing[]
        {
            return this.MapRingsService.ringsList;
        }

        public onDeleteMapRing(ringIndex: number): void
        {
            console.log(`${fileName} - OnDeleteMapRing [${ringIndex}]`);

            this.MapRingsService.removeRing(ringIndex);
        }

        public onAddMapRing(): void
        {
            console.log(`${fileName} - OnAddMapRing`);

            if (this.MapRingsService.ringsList.length <= 20)
            {
                this.MapRingsService.addRing();
            }
            else
            {
                console.warn(`${fileName} - OnAddMapRing - Reach rings limit (20)`);
                alert("Reach maximin rings count (20 rings)")
            }
        }
    }

    ngModule
        .controller('MapPageController',
        [
            'MapRingsService',            
            mapPageCtrlClass
        ]);
}