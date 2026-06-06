/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Spot = {
    /**
     * UUID парковочного места
     */
    id?: string;
    assignment_type?: Spot.assignment_type;
    status?: Spot.status;
};
export namespace Spot {
    export enum assignment_type {
        PUBLIC = 'public',
        PRIVATE = 'private',
        UNASSIGNED = 'unassigned',
    }
    export enum status {
        FREE = 'free',
        OCCUPIED = 'occupied',
    }
}

