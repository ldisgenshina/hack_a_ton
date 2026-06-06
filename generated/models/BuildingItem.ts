/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Здание
 */
export type BuildingItem = {
    /**
     * ID здания
     */
    id?: number;
    /**
     * ЖК
     */
    complex?: {
        id?: number;
        title?: string;
        timezone?: string;
    };
    building?: {
        id?: number;
        title?: string;
        alias?: string;
        floor?: number;
        apartmentCount?: number;
        entranceCount?: number;
        address?: {
            city?: string;
            street?: string;
            house?: string;
            fullAddress?: string;
        };
        sell_enabled?: boolean;
        sell_emails?: Array<string>;
        security_number?: string;
        guest_scud_pass_limit?: number;
        buildings_properties_rent_available?: boolean;
        resident_request_variant?: string;
        paid_tickets_allowed?: string;
        meters?: {
            mode?: string;
            'manual-update'?: {
                from_day_of_month?: number;
                until_day_of_month?: number;
                push_day_of_month?: number;
                notification_message?: string;
            };
        };
    };
    entrances2?: Array<{
        number?: number;
        first_apartment?: number;
        last_apartment?: number;
    }>;
    statistics?: Array<{
        type?: string;
        title?: string;
        count?: number;
    }>;
};

