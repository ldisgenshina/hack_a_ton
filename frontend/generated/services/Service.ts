/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuildingItem } from '../models/BuildingItem';
import type { ComplexItem } from '../models/ComplexItem';
import type { ConnectionInfo } from '../models/ConnectionInfo';
import type { NewsItem } from '../models/NewsItem';
import type { PaginationLinks } from '../models/PaginationLinks';
import type { PaginationMeta } from '../models/PaginationMeta';
import type { ParkingResponse } from '../models/ParkingResponse';
import type { StorageResponse } from '../models/StorageResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class Service {
    /**
     * Список комплексов
     * Возвращает список доступных ЖК
     * @param token Токен авторизации
     * @returns any Успешный ответ
     * @throws ApiError
     */
    public static getComplexList(
        token: string,
    ): CancelablePromise<{
        command?: string;
        message?: string;
        error?: number;
        data?: {
            items?: Array<ComplexItem>;
            links?: PaginationLinks;
            meta?: PaginationMeta;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/complex/list/',
            query: {
                'token': token,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
            },
        });
    }
    /**
     * Список зданий
     * Возвращает список зданий с детальной информацией
     * @param token Токен авторизации
     * @param perPage Количество на страницу
     * @param page Номер страницы
     * @param complexId Фильтр по ID ЖК
     * @param search Поиск по адресу
     * @returns any Успешный ответ
     * @throws ApiError
     */
    public static getBuildingsList(
        token: string,
        perPage?: number,
        page?: number,
        complexId?: number,
        search?: string,
    ): CancelablePromise<{
        command?: string;
        message?: string;
        error?: number;
        data?: {
            buildings?: Array<BuildingItem>;
            meta?: PaginationMeta;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildings/get-list-crm/',
            query: {
                'token': token,
                'per_page': perPage,
                'page': page,
                'complex_id': complexId,
                'search': search,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
            },
        });
    }
    /**
     * Все парковочные места
     * @param token Токен авторизации
     * @param complexesArray Фильтр по ID ЖК
     * @param buildingsArray Фильтр по ID зданий
     * @returns ParkingResponse Успешный ответ
     * @throws ApiError
     */
    public static getParkingList(
        token: string,
        complexesArray?: Array<number>,
        buildingsArray?: Array<number>,
    ): CancelablePromise<ParkingResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/parking/list',
            query: {
                'token': token,
                'complexes[]': complexesArray,
                'buildings[]': buildingsArray,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
                404: `Здание не принадлежит указанному ЖК`,
            },
        });
    }
    /**
     * Свободные парковочные места (status=free)
     * @param token
     * @param complexesArray
     * @param buildingsArray
     * @returns ParkingResponse Успешный ответ
     * @throws ApiError
     */
    public static getParkingFree(
        token: string,
        complexesArray?: Array<number>,
        buildingsArray?: Array<number>,
    ): CancelablePromise<ParkingResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/parking/free',
            query: {
                'token': token,
                'complexes[]': complexesArray,
                'buildings[]': buildingsArray,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
                404: `Здание не принадлежит указанному ЖК`,
            },
        });
    }
    /**
     * Занятые парковочные места (status=occupied)
     * @param token
     * @param complexesArray
     * @param buildingsArray
     * @returns ParkingResponse Успешный ответ
     * @throws ApiError
     */
    public static getParkingOccupied(
        token: string,
        complexesArray?: Array<number>,
        buildingsArray?: Array<number>,
    ): CancelablePromise<ParkingResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/parking/occupied',
            query: {
                'token': token,
                'complexes[]': complexesArray,
                'buildings[]': buildingsArray,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
                404: `Здание не принадлежит указанному ЖК`,
            },
        });
    }
    /**
     * Общедоступные места (assignment_type=public)
     * @param token
     * @param complexesArray
     * @param buildingsArray
     * @returns ParkingResponse Успешный ответ
     * @throws ApiError
     */
    public static getParkingPublic(
        token: string,
        complexesArray?: Array<number>,
        buildingsArray?: Array<number>,
    ): CancelablePromise<ParkingResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/parking/public',
            query: {
                'token': token,
                'complexes[]': complexesArray,
                'buildings[]': buildingsArray,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
                404: `Здание не принадлежит указанному ЖК`,
            },
        });
    }
    /**
     * Приватные места (assignment_type=private)
     * @param token
     * @param complexesArray
     * @param buildingsArray
     * @returns ParkingResponse Успешный ответ
     * @throws ApiError
     */
    public static getParkingPrivate(
        token: string,
        complexesArray?: Array<number>,
        buildingsArray?: Array<number>,
    ): CancelablePromise<ParkingResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/parking/private',
            query: {
                'token': token,
                'complexes[]': complexesArray,
                'buildings[]': buildingsArray,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
                404: `Здание не принадлежит указанному ЖК`,
            },
        });
    }
    /**
     * Неназначенные места (assignment_type=unassigned)
     * @param token
     * @param complexesArray
     * @param buildingsArray
     * @returns ParkingResponse Успешный ответ
     * @throws ApiError
     */
    public static getParkingUnassigned(
        token: string,
        complexesArray?: Array<number>,
        buildingsArray?: Array<number>,
    ): CancelablePromise<ParkingResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/parking/unassigned',
            query: {
                'token': token,
                'complexes[]': complexesArray,
                'buildings[]': buildingsArray,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
                404: `Здание не принадлежит указанному ЖК`,
            },
        });
    }
    /**
     * Все кладовые помещения
     * @param token
     * @param complexesArray
     * @param buildingsArray
     * @returns StorageResponse Успешный ответ
     * @throws ApiError
     */
    public static getStorageList(
        token: string,
        complexesArray?: Array<number>,
        buildingsArray?: Array<number>,
    ): CancelablePromise<StorageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/storage/list',
            query: {
                'token': token,
                'complexes[]': complexesArray,
                'buildings[]': buildingsArray,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
                404: `Здание не принадлежит указанному ЖК`,
            },
        });
    }
    /**
     * Свободные кладовые (status=free)
     * @param token
     * @param complexesArray
     * @param buildingsArray
     * @returns StorageResponse Успешный ответ
     * @throws ApiError
     */
    public static getStorageFree(
        token: string,
        complexesArray?: Array<number>,
        buildingsArray?: Array<number>,
    ): CancelablePromise<StorageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/storage/free',
            query: {
                'token': token,
                'complexes[]': complexesArray,
                'buildings[]': buildingsArray,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
                404: `Здание не принадлежит указанному ЖК`,
            },
        });
    }
    /**
     * Занятые кладовые (status=occupied)
     * @param token
     * @param complexesArray
     * @param buildingsArray
     * @returns StorageResponse Успешный ответ
     * @throws ApiError
     */
    public static getStorageOccupied(
        token: string,
        complexesArray?: Array<number>,
        buildingsArray?: Array<number>,
    ): CancelablePromise<StorageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/storage/occupied',
            query: {
                'token': token,
                'complexes[]': complexesArray,
                'buildings[]': buildingsArray,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
                404: `Здание не принадлежит указанному ЖК`,
            },
        });
    }
    /**
     * Общедоступные кладовые (assignment_type=public)
     * @param token
     * @param complexesArray
     * @param buildingsArray
     * @returns StorageResponse Успешный ответ
     * @throws ApiError
     */
    public static getStoragePublic(
        token: string,
        complexesArray?: Array<number>,
        buildingsArray?: Array<number>,
    ): CancelablePromise<StorageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/storage/public',
            query: {
                'token': token,
                'complexes[]': complexesArray,
                'buildings[]': buildingsArray,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
                404: `Здание не принадлежит указанному ЖК`,
            },
        });
    }
    /**
     * Приватные кладовые (assignment_type=private)
     * @param token
     * @param complexesArray
     * @param buildingsArray
     * @returns StorageResponse Успешный ответ
     * @throws ApiError
     */
    public static getStoragePrivate(
        token: string,
        complexesArray?: Array<number>,
        buildingsArray?: Array<number>,
    ): CancelablePromise<StorageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/storage/private',
            query: {
                'token': token,
                'complexes[]': complexesArray,
                'buildings[]': buildingsArray,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
                404: `Здание не принадлежит указанному ЖК`,
            },
        });
    }
    /**
     * Неназначенные кладовые (assignment_type=unassigned)
     * @param token
     * @param complexesArray
     * @param buildingsArray
     * @returns StorageResponse Успешный ответ
     * @throws ApiError
     */
    public static getStorageUnassigned(
        token: string,
        complexesArray?: Array<number>,
        buildingsArray?: Array<number>,
    ): CancelablePromise<StorageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/storage/unassigned',
            query: {
                'token': token,
                'complexes[]': complexesArray,
                'buildings[]': buildingsArray,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
                404: `Здание не принадлежит указанному ЖК`,
            },
        });
    }
    /**
     * Список новостей
     * Метод получает список новостей
     * @param token Токен авторизации
     * @param complexes Фильтр по ID ЖК
     * @param buildings Фильтр по ID зданий
     * @param type Тип новостей
     * @returns any Успешный ответ
     * @throws ApiError
     */
    public static getNewsList(
        token: string,
        complexes?: Array<number>,
        buildings?: Array<number>,
        type?: string,
    ): CancelablePromise<{
        command?: string;
        message?: string;
        error?: number;
        data?: {
            items?: Array<NewsItem>;
            links?: PaginationLinks;
            meta?: PaginationMeta;
        };
        connection?: ConnectionInfo;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/news/list',
            query: {
                'token': token,
                'complexes': complexes,
                'buildings': buildings,
                'type': type,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
            },
        });
    }
    /**
     * Просмотр новости
     * Метод получает содержание новости
     * @param token Токен авторизации
     * @param id ID новости
     * @returns any Успешный ответ
     * @throws ApiError
     */
    public static getNewsView(
        token: string,
        id: number,
    ): CancelablePromise<{
        command?: string;
        message?: string;
        error?: number;
        data?: {
            item?: {
                id?: number;
                title?: string;
                text?: string;
                date?: string;
                images?: Array<string>;
            };
        };
        connection?: ConnectionInfo;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/news/view',
            query: {
                'token': token,
                'id': id,
            },
            errors: {
                401: `Неверный или отсутствующий токен`,
            },
        });
    }
}
