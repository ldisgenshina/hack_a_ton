/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConnectionInfo } from './ConnectionInfo';
import type { ParkingComplex } from './ParkingComplex';
export type ParkingResponse = {
    command?: string;
    message?: string;
    error?: number;
    data?: {
        items?: Array<ParkingComplex>;
    };
    connection?: ConnectionInfo;
};

