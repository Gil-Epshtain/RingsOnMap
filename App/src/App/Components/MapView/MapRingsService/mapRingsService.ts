/* Created by Gil Epshtain on 24/11/017 */

"use strict";

const NEW_RING_DATA =  // Tel Aviv
{ 
    lat: 32.074299, 
    lng: 34.791984,
    radius: 5000
};

const fileName: string = "MapRingsService";
console.log(`Running ${fileName}...`);

import { MapRing } from "./mapRing";

export interface IMapRingsService
{
    ringsList: MapRing[];
    addRing(lat?: number, lng?: number, radius?: number, color?: string): void;
    removeRing(ringIndex: number);
}

export default function(ngModule: angular.IModule)
{
    class MapRingsServiceClass implements IMapRingsService
    {
        private _ringsList: MapRing[];

        constructor()
        {
            this._ringsList = [];
        }

        public get ringsList(): MapRing[]
        {
            return this._ringsList;
        }

        public addRing(
            lat: number = NEW_RING_DATA.lat, 
            lng: number = NEW_RING_DATA.lng, 
            radius: number = NEW_RING_DATA.radius, 
            color: string = '#FF0000',
            isActive: boolean = true): void
        {
            this._ringsList.push(new MapRing(lat, lng, radius, color, isActive));
        }

        public removeRing(ringIndex: number)
        {
            if (ringIndex < this._ringsList.length)
            {
                this._ringsList.splice(ringIndex, 1);
            }
        }
    }

    ngModule
        .service('MapRingsService',
        [            
            MapRingsServiceClass
        ]);
}