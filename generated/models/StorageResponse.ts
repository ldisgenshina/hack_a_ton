/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConnectionInfo } from './ConnectionInfo';
import type { StorageComplex } from './StorageComplex';
export type StorageResponse = {
    command?: string;
    message?: string;
    error?: number;
    data?: {
        items?: Array<StorageComplex>;
    };
    connection?: ConnectionInfo;
};

