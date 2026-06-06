/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Room = {
    id?: string;
    assignment_type?: Room.assignment_type;
    status?: Room.status;
};
export namespace Room {
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

