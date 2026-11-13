import { Schema } from 'mongoose';
export interface IGeoJsonPoint {
    type: "Point";
    coordinates: [number, number];
}
export interface IScopeItem {
    is_scope: boolean;
    address: string;
    location: IGeoJsonPoint;
}
export interface IScopeCollection {
    scopes: IScopeItem[];
    is_success: boolean;
    is_verify_scope: boolean;
}
export declare const ScopeItemSchema: Schema<IScopeItem, import("mongoose").Model<IScopeItem, any, any, any, any, any, IScopeItem>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IScopeItem, import("mongoose").Document<unknown, {}, IScopeItem, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<IScopeItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    is_scope?: import("mongoose").SchemaDefinitionProperty<boolean, IScopeItem, import("mongoose").Document<unknown, {}, IScopeItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IScopeItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    address?: import("mongoose").SchemaDefinitionProperty<string, IScopeItem, import("mongoose").Document<unknown, {}, IScopeItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IScopeItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    location?: import("mongoose").SchemaDefinitionProperty<IGeoJsonPoint, IScopeItem, import("mongoose").Document<unknown, {}, IScopeItem, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IScopeItem & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
}, IScopeItem>;
export declare const ScopeSchema: Schema<IScopeCollection, import("mongoose").Model<IScopeCollection, any, any, any, any, any, IScopeCollection>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IScopeCollection, import("mongoose").Document<unknown, {}, IScopeCollection, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<IScopeCollection & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    scopes?: import("mongoose").SchemaDefinitionProperty<IScopeItem[], IScopeCollection, import("mongoose").Document<unknown, {}, IScopeCollection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IScopeCollection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    is_success?: import("mongoose").SchemaDefinitionProperty<boolean, IScopeCollection, import("mongoose").Document<unknown, {}, IScopeCollection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IScopeCollection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    is_verify_scope?: import("mongoose").SchemaDefinitionProperty<boolean, IScopeCollection, import("mongoose").Document<unknown, {}, IScopeCollection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IScopeCollection & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
}, IScopeCollection>;
//# sourceMappingURL=scope_model.d.ts.map