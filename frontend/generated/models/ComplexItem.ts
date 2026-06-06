/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Жилой комплекс
 */
export type ComplexItem = {
    /**
     * ID ЖК
     */
    id?: number;
    /**
     * Название ЖК
     */
    title?: string;
    /**
     * Регион
     */
    region?: {
        id?: number;
        title?: string;
    };
    paid_tickets_enabled?: boolean;
};

