/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Информация о сервисе
     * @returns string Название сервиса
     * @throws ApiError
     */
    public static whoami(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/whoami',
        });
    }
    /**
     * Проверка доступности
     * @returns string pong
     * @throws ApiError
     */
    public static ping(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ping',
        });
    }
}
