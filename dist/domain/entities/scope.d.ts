export interface IGeoJsonPoint {
    type: 'Point';
    coordinates: [number, number];
}
export interface ILatLng {
    lat: number;
    lng: number;
}
export declare class LatLng implements ILatLng {
    readonly lat: number;
    readonly lng: number;
    constructor(lat: number, lng: number);
    static isValid(lat: number, lng: number): boolean;
    static fromGeoJson(geoJson: IGeoJsonPoint): LatLng;
    toArray(): [number, number];
    toGeoJson(): IGeoJsonPoint;
    toString(): string;
}
export interface IScopeCollectionJSON {
    is_scope: boolean;
    address: string;
    location: IGeoJsonPoint;
}
export declare class ScopeCollection {
    readonly is_scope: boolean;
    readonly address: string;
    readonly location: IGeoJsonPoint;
    constructor({ is_scope, address, location }: {
        is_scope: boolean;
        address: string;
        location: IGeoJsonPoint;
    });
    static fromJson(json: IScopeCollectionJSON): ScopeCollection;
}
export interface IScopeJSON {
    scopes: IScopeCollectionJSON[];
    is_success: boolean;
    is_verify_scope: boolean;
}
export default class Scope {
    readonly scopes: ScopeCollection[];
    readonly is_success: boolean;
    readonly is_verify_scope: boolean;
    constructor({ scopes, is_success, is_verify_scope }: {
        scopes: ScopeCollection[];
        is_success: boolean;
        is_verify_scope: boolean;
    });
    static fromJson(json: IScopeJSON): Scope;
}
//# sourceMappingURL=scope.d.ts.map