/* Created by Gil Epshtain on 25/11/017 */

"use strict";

/* 
This Api Key is the private property of Gil Epshtain, issued be Google
Any use of this key is forbidden without the permission of Gil Epshtain (contact at gil_epshtain@yahoo.com)
If you have cloned this project from GIT (or got a copy of it in any other way), 
and have made any changes in it, you will have to generate a new API Key 
*/
const GOOGLE_API_KEY: string = "AIzaSyAncoAhzZy5bVzybuH5pdRupxgW-l4WgoQ";

const MAP_CENTER = { lat: 32.074299, lng: 34.791984 }; // Tel Aviv
const CIRCLE_POINTS = 32;

const fileName: string = "MapDirective";

import './mapStyle.less';

import * as _ from 'lodash';

import { MapRing } from '../MapRingsService/mapRing';

export default function(ngModule: angular.IModule)
{
    class MapClass
    {
        public restrict: string;
        public template: any;
        public scope: any;

        private _mapElement: HTMLElement;
        private _mapHandle: google.maps.Map;
        private _mapRingsList: google.maps.Polygon[];

        constructor()
        {
            this.restrict = 'E';
            this.template = require("./mapView.html");
            this.scope = 
            {
                ringsList: '=',
                ringsWidth: '='
            };

            this._mapRingsList = [];
        }

        public link(scope, element, attrs) 
        {
            console.log(`Executing ${fileName}...`); 
            
            this._initMap().then(() =>
            {
                console.log("Google Map was successfully loaded");
            });

            scope.$watch('ringsList', (newVal: MapRing[], oldVal: MapRing[]) =>
            {
                if (newVal.length < oldVal.length)
                {
                    // delete ring
                    this._deleteRingFromMap(scope, newVal, oldVal);
                }
                else if (oldVal.length < newVal.length)
                {
                    // add ring
                    this._addRingToMap(scope);
                }
                else // same length
                {
                    // edit rings
                    this._editRingOnMap(scope, newVal, oldVal);                    
                }
            }, true);

            scope.$watch('ringsWidth', (newVal: number, oldVal: number) =>
            {
                if (newVal != oldVal)
                {
                    this._updateRingsWidth(scope);
                }
            });
        }

        private _initMap(): Promise<{}>
        {
            console.log(`${fileName} - InitMap`);

            let promise = new Promise((resolve, reject) => 
            {
                this._mapElement = document.getElementById('map');
                
                let mapsApi = require('google-maps-api')(GOOGLE_API_KEY, ['geometry']);
                mapsApi().then(
                    (maps) =>
                    {
                        console.log(`${fileName} - Google Maps Api successfully loaded`);
                    
                        this._mapHandle = new google.maps.Map(this._mapElement, 
                        {
                            mapTypeId: google.maps.MapTypeId.TERRAIN,
                            zoom: 10,
                            center: new google.maps.LatLng(MAP_CENTER.lat, MAP_CENTER.lng)
                        });

                        resolve();
                    },
                    (error) =>
                    {
                        console.error(`${fileName} - Google Maps Api failed to load [${error}]`);
                        
                        this._mapElement.innerText = "Failed to load Google Maps";

                        reject(error);
                    });
            });

            return promise;
        }

        private _addRingToMap(scope): void
        {
            console.log(`${fileName} - AddRingToMap`);

            let newRingData: MapRing = scope.ringsList[scope.ringsList.length - 1];
            
            // Google Maps API don't have a method for drawing Ring shapes, 
            // therefore we need to draw a Ring as a Polygon made out of 2 Circles (inner/outer)
            let newRingCenter = new google.maps.LatLng(newRingData.lat, newRingData.lng);
            let newMapRing = new google.maps.Polygon(
            {
                map: this._mapHandle,
                paths: 
                [
                    this._drawCircleShape(newRingCenter, newRingData.radius, true), // outer circle
                    this._drawCircleShape(newRingCenter, newRingData.radius - scope.ringsWidth, false) // inner circle
                ],
                strokeColor: newRingData.color,
                strokeWeight: 2,
                strokeOpacity: 0.8,         
                fillColor: newRingData.color, // The color of the inner area
                fillOpacity: 0.2 // The opacity of the inner area
             });

            this._mapRingsList.push(newMapRing);
        }

        private _drawCircleShape(center: google.maps.LatLng, radius: number, isClockwise: boolean)
        {
            let retCirclePolygon: google.maps.LatLng[] = [];

            for (let i = 0; i < CIRCLE_POINTS; i++) 
            {
                let angle = i * 360 / CIRCLE_POINTS;                
                angle = isClockwise ? angle : 360 - angle;                
        
                let point = google.maps.geometry.spherical.computeOffset(center, radius, angle);
                retCirclePolygon.push(point);
            }
        
            retCirclePolygon.push(retCirclePolygon[0]); // close the polygon
            
            return retCirclePolygon;
        }

        private _deleteRingFromMap(scope, newRingsList: MapRing[], oldRingsList: MapRing[]): void
        {
            console.log(`${fileName} - DeleteRingFromMap`);

            let ringToDeleteIndex = this._findDeletedRingIndex(newRingsList, oldRingsList)
            let mapRingToDelete = (this._mapRingsList.splice(ringToDeleteIndex, 1))[0];

            mapRingToDelete.setMap(null); // Delete
        }

        private _findDeletedRingIndex(newRingsList: MapRing[], oldRingsList: MapRing[]): number
        {
            let deletedRingIndex: number = -1;

            let i
            for(i = 0; i < newRingsList.length; i++)
            {
                if (newRingsList[i].isActive    != oldRingsList[i].isActive ||
                    newRingsList[i].lat         != oldRingsList[i].lat ||
                    newRingsList[i].lng         != oldRingsList[i].lng || 
                    newRingsList[i].radius      != oldRingsList[i].radius ||
                    newRingsList[i].color       != oldRingsList[i].color)
                {
                    deletedRingIndex = i;
                    break;
                }
            }

            if (deletedRingIndex === -1)
            {
                // the deleted item is the last item in the list (the for loop don't iterate on the last item)
                deletedRingIndex = i;
            }

            return deletedRingIndex;
        }

        private _editRingOnMap(scope, newRingsList: MapRing[], oldRingsList: MapRing[]): void
        {
            console.log(`${fileName} - EditRingOnMap`);

            let ringToEditIndex = this._findEditedRingIndex(newRingsList, oldRingsList)
            if (ringToEditIndex != -1)
            {
                let mapRingToEdit: google.maps.Polygon = this._mapRingsList[ringToEditIndex];
                let mapRingData: MapRing = scope.ringsList[ringToEditIndex];
                
                let newRingCenter = new google.maps.LatLng(mapRingData.lat, mapRingData.lng);
                mapRingToEdit.setOptions({
                    paths: 
                    [
                        this._drawCircleShape(newRingCenter, mapRingData.radius, true), // outer circle
                        this._drawCircleShape(newRingCenter, mapRingData.radius - scope.ringsWidth, false) // inner circle
                    ],
                    strokeColor: mapRingData.color,
                    strokeOpacity: mapRingData.isActive ? 0.8 : 0, // show/hide ring
                    fillColor: mapRingData.color, 
                    fillOpacity: mapRingData.isActive ? 0.2 : 0 // show/hide ring
                });
            }
        }

        private _findEditedRingIndex(newRingsList: MapRing[], oldRingsList: MapRing[]): number
        {
            let editedRingIndex: number = -1;
            
            for(let i = 0; i < newRingsList.length; i++)
            {
                if (newRingsList[i].isActive    != oldRingsList[i].isActive ||
                    newRingsList[i].lat         != oldRingsList[i].lat ||
                    newRingsList[i].lng         != oldRingsList[i].lng || 
                    newRingsList[i].radius      != oldRingsList[i].radius ||
                    newRingsList[i].color       != oldRingsList[i].color)
                {
                    editedRingIndex = i;
                    break;
                }
            }

            return editedRingIndex;
        }

        private _updateRingsWidth(scope): void
        {
            console.log(`${fileName} - UpdateRingsWidth`);

            for (let i = 0; i < this._mapRingsList.length; i++)
            {
                let mapRing = this._mapRingsList[i];
                let ringData = scope.ringsList[i];

                let newRingCenter = new google.maps.LatLng(ringData.lat, ringData.lng);
                mapRing.setOptions({
                    paths: 
                    [
                        this._drawCircleShape(newRingCenter, ringData.radius, true), // outer circle
                        this._drawCircleShape(newRingCenter, ringData.radius - scope.ringsWidth, false) // inner circle
                    ]
                });
            }
        }
    }

    ngModule
        .directive('map', () => new MapClass);
}