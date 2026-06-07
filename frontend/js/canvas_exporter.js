/**
 * Класс для экспорта canvas в JSON и PNG с отправкой на сервер
 * Картинка отправляется как массив байтов (Uint8Array)
 */
class CanvasExporter {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.apiEndpoint = options.apiEndpoint || '/api/save-template';
        this.headers = options.headers || {
            'Content-Type': 'application/json'
        };
    }

    /**
     * Получить JSON разметку canvas (все объекты, слои, позиции)
     * @returns {Object} JSON объект с разметкой
     */
    getCanvasJSON() {
        if (!this.canvas) {
            throw new Error('Canvas не инициализирован');
        }
        
        const canvasJSON = this.canvas.toJSON();
        
        return {
            version: fabric.version,
            timestamp: Date.now(),
            width: this.canvas.width,
            height: this.canvas.height,
            objects: canvasJSON.objects,
            background: canvasJSON.background
        };
    }

    /**
     * Получить JSON строку разметки
     * @returns {string} JSON строка
     */
    // getCanvasJSONString() {
    //     const jsonData = this.getCanvasJSON();
    //     return JSON.stringify(jsonData, null, 2);
    // }

    // /**
    //  * Получить PNG как DataURL (Base64)
    //  * @returns {string} Base64 строка
    //  */
    // getCanvasPNGBase64() {
    //     if (!this.canvas) {
    //         throw new Error('Canvas не инициализирован');
    //     }
    //     return this.canvas.toDataURL({
    //         format: 'png',
    //         quality: 1
    //     });
    // }

    /**
     * Получить PNG как Blob
     * @returns {Promise<Blob>}
     */
    async getCanvasPNGBlob() {
        return new Promise((resolve, reject) => {
            if (!this.canvas) {
                reject(new Error('Canvas не инициализирован'));
                return;
            }

            this.canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Не удалось создать Blob'));
                }
            }, 'image/png', 1);
        });
    }

    /**
     * 🆕 Получить PNG как массив байтов (Uint8Array)
     * @returns {Promise<Uint8Array>}
     */
    async getCanvasPNGBytes() {
        const blob = await this.getCanvasPNGBlob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const arrayBuffer = reader.result;
                const bytes = new Uint8Array(arrayBuffer);
                resolve(bytes);
            };
            reader.onerror = () => reject(new Error('Ошибка чтения Blob'));
            reader.readAsArrayBuffer(blob);
        });
    }

    /**
     * 🆕 Получить PNG как обычный массив чисел (для отправки на сервер)
     * @returns {Promise<Array<number>>}
     */
    async getCanvasPNGNumberArray() {
        const bytes = await this.getCanvasPNGBytes();
        return Array.from(bytes);
    }

    /**
     * Подготовить JSON для отправки (JSON + PNG как массив байтов)
     * @returns {Promise<Object>} Объект с JSON и PNG байтами
     */
    async prepareJSONPayload() {
        const jsonData = this.getCanvasJSON();
        const pngBytes = await this.getCanvasPNGNumberArray();
        
        return {
            json_data: jsonData,           // JSON разметка
            png_bytes: pngBytes,           // PNG как массив чисел (байтов)
            png_size: pngBytes.length,     // Размер в байтах
            metadata: {
                exported_at: new Date().toISOString(),
                canvas_width: this.canvas.width,
                canvas_height: this.canvas.height,
                fabric_version: fabric.version,
                content_type: 'image/png',
                encoding: 'application/octet-stream'
            }
        };
    }

    /**
     * Отправить на сервер (PNG как массив байтов + JSON)
     * @param {Object} additionalData - Дополнительные данные (название шаблона и т.д.)
     * @returns {Promise<Object>} Ответ сервера
     */
    async sendToServer(additionalData = {}) {
        try {
            const payload = await this.prepareJSONPayload();
            
            // Объединяем с дополнительными данными
            const dataToSend = {
                ...payload,
                ...additionalData
            };
            
            console.log(`Отправка на сервер: ${this.apiEndpoint}`);
            console.log(`Размер PNG: ${dataToSend.png_size} байт`);
            
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(dataToSend)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('✅ Успешно отправлено на сервер:', result);
            return result;
            
        } catch (error) {
            console.error('❌ Ошибка при отправке:', error);
            throw error;
        }
    }

    /**
     * Отправить как FormData (альтернативный способ)
     * @param {Object} additionalData 
     * @returns {Promise<Object>}
     */
    async sendAsFormData(additionalData = {}) {
        try {
            const formData = new FormData();
            
            // Добавляем JSON
            const jsonString = this.getCanvasJSONString();
            formData.append('json_data', jsonString);
            
            // Добавляем PNG как файл
            const pngBlob = await this.getCanvasPNGBlob();
            formData.append('png_file', pngBlob, `template_${Date.now()}.png`);
            
            // Добавляем PNG как массив байтов (если нужно)
            const pngBytes = await this.getCanvasPNGBytes();
            const bytesBlob = new Blob([pngBytes], { type: 'application/octet-stream' });
            formData.append('png_bytes', bytesBlob, 'image.bytes');
            
            // Добавляем дополнительные данные
            Object.keys(additionalData).forEach(key => {
                if (typeof additionalData[key] === 'object') {
                    formData.append(key, JSON.stringify(additionalData[key]));
                } else {
                    formData.append(key, additionalData[key]);
                }
            });
            
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                body: formData
            });
            
            return await response.json();
            
        } catch (error) {
            console.error('Ошибка при отправке FormData:', error);
            throw error;
        }
    }
}

// Экспортируем для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CanvasExporter;
}