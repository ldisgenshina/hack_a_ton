// create_tamplate.js

// Получаем ссылку на DOM-элемент canvas
const canvasElement = document.getElementById('canvas_template');
const canvas = new fabric.Canvas('canvas_template');

// Функция обновления размеров канваса
function resizeCanvas() {
    // Получаем высоту шапки
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    // Устанавливаем размеры канваса
    canvas.setWidth(1200);
    canvas.setHeight(675);
    
    // Центрируем канвас
    canvasElement.style.display = 'block';
    canvasElement.style.margin = '0 auto';
    
    // КРИТИЧЕСКИ ВАЖНО: Обновляем offset после изменения размеров
    setTimeout(() => {
        canvas.calcOffset();
        canvas.renderAll();
    }, 50);
}

// Ждём загрузки страницы
window.addEventListener('load', () => {
    resizeCanvas();
});

window.addEventListener('resize', () => {
    resizeCanvas();
});

// ========== ПРИВЯЗКА К ВАШИМ HTML-КНОПКАМ ==========

// 1. Добавление изображения
document.getElementById('add_img').addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            fabric.Image.fromURL(event.target.result, (img) => {
                const maxWidth = 400;
                const maxHeight = 400;
                let scale = 1;
                
                if (img.width > maxWidth) scale = maxWidth / img.width;
                if (img.height * scale > maxHeight) scale = maxHeight / img.height;
                
                img.scale(scale);
                img.set({
                    left: canvas.width / 2 - (img.width * scale) / 2,
                    top: canvas.height / 2 - (img.height * scale) / 2
                });
                
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.renderAll();
                canvas.calcOffset();
            });
        };
        reader.readAsDataURL(file);
    };
    
    fileInput.click();
});

// 2. Добавление текста
document.getElementById('add_text').addEventListener('click', () => {
    const textContent = prompt('Введите текст:', 'Новый текст');
    if (!textContent) return;
    
    const newText = new fabric.IText(textContent, {
        left: canvas.width / 2 - 100,
        top: canvas.height / 2 - 20,
        fontSize: 30,
        fill: '#000000',
        fontFamily: 'Arial',
        editable: true
    });
    
    canvas.add(newText);
    canvas.setActiveObject(newText);
    canvas.renderAll();
    canvas.calcOffset();
});

// 3. Управление слоями - ВЫШЕ
document.getElementById('up_layer').addEventListener('click', () => {
    const activeObject = canvas.getActiveObject();
    const objects = canvas.getObjects();
    
    if (activeObject) {
        if (objects.indexOf(activeObject) < objects.length - 1) {
            canvas.bringForward(activeObject);
        }
        canvas.renderAll();
        console.log('Слой изменен, текущая позиция:', objects.indexOf(activeObject));
    } else {
        alert('Сначала выделите объект (кликните на текст или картинку)');
    }
});

// 4. Управление слоями - НИЖЕ
document.getElementById('down_layer').addEventListener('click', () => {
    const activeObject = canvas.getActiveObject();
    const objects = canvas.getObjects();
    
    if (activeObject) {
        if (objects.indexOf(activeObject) > 0) {
            canvas.sendBackwards(activeObject);
        }
        canvas.renderAll();
        console.log('Слой изменен, текущая позиция:', objects.indexOf(activeObject));
    } else {
        alert('Сначала выделите объект (кликните на текст или картинку)');
    }
});

// 5. Удаление элемента
document.getElementById('delete_element').addEventListener('click', () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.remove(activeObject);
        canvas.renderAll();
        canvas.calcOffset();
    } else {
        alert('Сначала выделите объект для удаления');
    }
});

// ========== 6. СОХРАНЕНИЕ МАКЕТА (ОТПРАВКА НА СЕРВЕР) ==========

// Создаём экземпляр экспортера
const exporter = new CanvasExporter(canvas, {
    // Замени URL на адрес твоего сервера
    apiEndpoint: 'http://localhost:3000/api/save-template',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Обработчик кнопки "Сохранить макет"
document.getElementById('save_layout').addEventListener('click', async () => {
    // Проверяем, есть ли что сохранять
    const objects = canvas.getObjects();
    
    // Фильтруем тестовые объекты (если нужно)
    const userObjects = objects.filter(obj => {
        // Исключаем фоновый прямоугольник (если он есть)
        if (obj.fill === '#D6D6D6' && obj.width === canvas.width && obj.height === canvas.height) {
            return false;
        }
        return true;
    });
    
    if (userObjects.length === 0) {
        alert('На канвасе нет объектов для сохранения. Добавьте изображение или текст.');
        return;
    }
    
    // Запрашиваем название шаблона
    const templateName = prompt('Введите название макета:', `template_${Date.now()}`);
    if (!templateName) {
        return; // Пользователь отменил
    }
    
    // Блокируем кнопку на время отправки
    const saveBtn = document.getElementById('save_layout');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = '⏳ Сохранение...';
    saveBtn.disabled = true;
    
    try {
        // Отправляем на сервер
        const result = await exporter.sendToServer({
            template_name: templateName,
            author: 'User',
            created_at: new Date().toISOString(),
            canvas_width: canvas.width,
            canvas_height: canvas.height
        });
        
        alert(`✅ Макет "${templateName}" успешно сохранён!`);
        console.log('Ответ сервера:', result);
        
    } catch (error) {
        console.error('Ошибка при сохранении:', error);
        
        // Детальная диагностика ошибки
        let errorMessage = 'Ошибка при сохранении макета: ';
        
        if (error.message.includes('Failed to fetch')) {
            errorMessage += 'Сервер недоступен. Проверьте адрес сервера и CORS.';
        } else if (error.message.includes('HTTP error')) {
            errorMessage += `Сервер вернул ошибку: ${error.message}`;
        } else {
            errorMessage += error.message;
        }
        
        alert(errorMessage);
        
        // Показываем в консоли данные для отладки
        console.log('Данные для отладки:');
        try {
            const payload = await exporter.prepareJSONPayload();
            console.log('Размер JSON:', JSON.stringify(payload.json_data).length, 'байт');
            console.log('Размер PNG:', payload.png_size, 'байт');
        } catch (debugError) {
            console.error('Ошибка при подготовке данных:', debugError);
        }
        
    } finally {
        // Разблокируем кнопку
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
    }
});

// ========== ИСПРАВЛЕНИЕ ПРОБЛЕМЫ СО СМЕЩЕНИЕМ ==========

// Принудительно обновляем offset после каждого действия с мышью
canvas.on('mouse:down', (e) => {
    canvas.calcOffset();
});

canvas.on('mouse:move', (e) => {
    if (canvas._activeObject) {
        canvas.calcOffset();
    }
});

canvas.on('object:moving', () => {
    canvas.calcOffset();
});

canvas.on('object:scaling', () => {
    canvas.calcOffset();
});

canvas.on('object:rotating', () => {
    canvas.calcOffset();
});

canvas.on('selection:created', () => {
    canvas.calcOffset();
});

canvas.on('selection:updated', () => {
    canvas.calcOffset();
});

// ResizeObserver для отслеживания изменения размера контейнера
let resizeObserver = null;
if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
        canvas.calcOffset();
    });
    resizeObserver.observe(canvasElement);
}

// ========== ДОБАВЛЯЕМ КРИТИЧЕСКИ ВАЖНЫЕ СТИЛИ ==========
const fixStyle = document.createElement('style');
fixStyle.textContent = `
    .canvas-container {
        margin: 0 auto !important;
        left: auto !important;
        right: auto !important;
        transform: none !important;
        position: relative !important;
    }
    
    .upper-canvas {
        cursor: crosshair !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
    }
    
    #canvas_template {
        transform: none !important;
        position: relative !important;
    }
`;
document.head.appendChild(fixStyle);

// ========== ДОБАВЛЯЕМ ТЕСТОВЫЕ ОБЪЕКТЫ ==========
setTimeout(() => {
    const background = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.width,
        height: canvas.height,
        fill: '#D6D6D6',
        selectable: false,
        evented: false
    });
    
    const testText1 = new fabric.IText('📦 Объект 1 (нажми на меня)', {
        left: 100,
        top: 100,
        fontSize: 24,
        fill: '#333',
        fontFamily: 'Arial',
        backgroundColor: 'rgba(255,255,0,0.3)',
        padding: 10
    });
    
    const testText2 = new fabric.IText('🎨 Объект 2 (нажми на меня)', {
        left: 100,
        top: 200,
        fontSize: 24,
        fill: '#333',
        fontFamily: 'Arial',
        backgroundColor: 'rgba(0,255,0,0.3)',
        padding: 10
    });
    
    canvas.add(background);
    canvas.add(testText1);
    canvas.add(testText2);
    canvas.renderAll();
    canvas.calcOffset();
    
    console.log('✅ Канвас готов!');
    console.log('💡 Нажмите "Сохранить макет" для отправки на сервер');
}, 500);