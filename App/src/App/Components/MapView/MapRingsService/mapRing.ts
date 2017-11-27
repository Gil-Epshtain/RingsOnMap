/* Created by Gil Epshtain on 24/11/017 */

"use strict";

const fileName: string = "MapRing";
console.log(`Running ${fileName}...`);

export class MapRing
{
    private _isActive: boolean;
    private _lat: number;
    private _lng: number;
    private _radius: number;
    private _color: string;

    constructor(
        lat: number,
        lng: number,
        radius: number, 
        color: string,
        isActive: boolean)
    {
        this._isActive = isActive;
        this._lat = lat;
        this._lng = lng;
        this._radius = radius;
        this._color = color;
    }

    public get lat(): number
    {
        return this._lat;
    }
    public set lat(value: number)
    {
        this._lat = value;
    }

    public get lng(): number
    {
        return this._lng;
    }
    public set lng(value: number)
    {
        this._lng = value;
    }

    public get radius(): number
    {
        return this._radius;
    }
    public set radius(value: number)
    {
        this._radius = value;
    }

    public get color(): string
    {
        return this._color;
    }
    public set color(value: string)
    {
        this._color = value;
    }

    public get isActive(): boolean
    {
        return this._isActive;
    }
    public set isActive(value: boolean)
    {
        this._isActive = value;
    }
}