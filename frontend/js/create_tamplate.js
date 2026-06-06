// Получаем ссылку на DOM-элемент canvas
const canvasElement = document.getElementById('canvas_template');
const canvas = new fabric.Canvas('canvas_template');

// 🔥 Функция обновления размеров канваса с учётом шапки
function resizeCanvas() {
    // Получаем высоту шапки
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    // Устанавливаем размеры канваса (1200x675 как ты задал)
    canvas.setWidth(1200);
    canvas.setHeight(675);
    
    // Центрируем канвас на странице с учётом шапки
    canvasElement.style.display = 'block';
    canvasElement.style.margin = `${headerHeight + 20}px auto 20px auto`;
    
    canvas.renderAll();
}

// Ждём загрузки страницы перед настройкой размеров
window.addEventListener('load', () => {
    resizeCanvas();
});

window.addEventListener('resize', () => resizeCanvas());

// ========== 1. ДОБАВЛЯЕМ ПАНЕЛЬ ИНСТРУМЕНТОВ ==========
const toolPanel = document.createElement('div');
toolPanel.style.position = 'fixed';
toolPanel.style.top = '80px';  // Отступ от шапки
toolPanel.style.right = '20px';
toolPanel.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
toolPanel.style.padding = '15px';
toolPanel.style.border = '1px solid #ccc';
toolPanel.style.borderRadius = '8px';
toolPanel.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
toolPanel.style.zIndex = '1000';
toolPanel.style.minWidth = '220px';
toolPanel.style.backdropFilter = 'blur(5px)';

// Заголовок панели
const title = document.createElement('h4');
title.textContent = '🎨 Редактор';
title.style.margin = '0 0 10px 0';
title.style.fontSize = '16px';
toolPanel.appendChild(title);

// ========== 2. ЗАГРУЗКА ИЗОБРАЖЕНИЙ ==========
const imageSection = document.createElement('div');
imageSection.style.marginBottom = '15px';

const imageLabel = document.createElement('label');
imageLabel.textContent = '📷 Загрузить изображение';
imageLabel.style.display = 'block';
imageLabel.style.marginBottom = '5px';
imageLabel.style.fontWeight = 'bold';
imageLabel.style.fontSize = '13px';
imageSection.appendChild(imageLabel);

const imageInput = document.createElement('input');
imageInput.type = 'file';
imageInput.accept = 'image/*';
imageInput.style.marginBottom = '10px';
imageInput.style.width = '100%';
imageSection.appendChild(imageInput);

// Кнопка для добавления изображения по URL
const urlLabel = document.createElement('label');
urlLabel.textContent = 'или URL картинки:';
urlLabel.style.display = 'block';
urlLabel.style.marginTop = '10px';
urlLabel.style.marginBottom = '5px';
urlLabel.style.fontSize = '12px';
imageSection.appendChild(urlLabel);

const urlInput = document.createElement('input');
urlInput.type = 'text';
urlInput.placeholder = 'https://example.com/image.jpg';
urlInput.style.width = '100%';
urlInput.style.marginBottom = '5px';
urlInput.style.padding = '5px';
urlInput.style.boxSizing = 'border-box';
imageSection.appendChild(urlInput);

const addUrlBtn = document.createElement('button');
addUrlBtn.textContent = 'Добавить по URL';
addUrlBtn.style.width = '100%';
addUrlBtn.style.padding = '5px';
addUrlBtn.style.marginBottom = '5px';
addUrlBtn.style.cursor = 'pointer';
addUrlBtn.style.backgroundColor = '#2196F3';
addUrlBtn.style.color = 'white';
addUrlBtn.style.border = 'none';
addUrlBtn.style.borderRadius = '4px';
imageSection.appendChild(addUrlBtn);

toolPanel.appendChild(imageSection);

// Обработчик загрузки файла
imageInput.addEventListener('change', (e) => {
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
        });
    };
    reader.readAsDataURL(file);
    imageInput.value = '';
});

// Обработчик добавления по URL
addUrlBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (!url) {
        alert('Введите URL изображения');
        return;
    }
    
    fabric.Image.fromURL(url, (img) => {
        if (!img) {
            alert('Не удалось загрузить изображение. Проверьте URL и CORS');
            return;
        }
        
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
        urlInput.value = '';
    }, { crossOrigin: 'anonymous' });
});

// ========== 3. ДОБАВЛЕНИЕ ТЕКСТА ==========
const textSection = document.createElement('div');
textSection.style.marginBottom = '15px';
textSection.style.borderTop = '1px solid #eee';
textSection.style.paddingTop = '10px';

const textLabel = document.createElement('label');
textLabel.textContent = '✏️ Добавить текст';
textLabel.style.display = 'block';
textLabel.style.marginBottom = '10px';
textLabel.style.fontWeight = 'bold';
textLabel.style.fontSize = '13px';
textSection.appendChild(textLabel);

const textInput = document.createElement('input');
textInput.type = 'text';
textInput.placeholder = 'Введите текст...';
textInput.style.width = '100%';
textInput.style.marginBottom = '10px';
textInput.style.padding = '5px';
textInput.style.boxSizing = 'border-box';
textSection.appendChild(textInput);

// Настройки текста
const textColorInput = document.createElement('input');
textColorInput.type = 'color';
textColorInput.value = '#ff0000';
textColorInput.style.width = '40px';
textColorInput.style.height = '30px';
textColorInput.style.marginRight = '10px';
textColorInput.style.verticalAlign = 'middle';
textColorInput.style.cursor = 'pointer';

const fontSizeInput = document.createElement('input');
fontSizeInput.type = 'number';
fontSizeInput.value = '30';
fontSizeInput.min = '10';
fontSizeInput.max = '200';
fontSizeInput.style.width = '60px';
fontSizeInput.style.padding = '5px';
fontSizeInput.style.marginRight = '10px';

const textSettingsDiv = document.createElement('div');
textSettingsDiv.style.marginBottom = '10px';
textSettingsDiv.style.display = 'flex';
textSettingsDiv.style.alignItems = 'center';
textSettingsDiv.style.gap = '5px';
textSettingsDiv.innerHTML = '<span style="font-size:12px">Цвет:</span>';
textSettingsDiv.appendChild(textColorInput);
textSettingsDiv.innerHTML += '<span style="font-size:12px">Размер:</span>';
textSettingsDiv.appendChild(fontSizeInput);
textSection.appendChild(textSettingsDiv);

const addTextBtn = document.createElement('button');
addTextBtn.textContent = '➕ Добавить текст';
addTextBtn.style.width = '100%';
addTextBtn.style.padding = '8px';
addTextBtn.style.cursor = 'pointer';
addTextBtn.style.backgroundColor = '#4CAF50';
addTextBtn.style.color = 'white';
addTextBtn.style.border = 'none';
addTextBtn.style.borderRadius = '4px';
addTextBtn.style.fontSize = '14px';
textSection.appendChild(addTextBtn);

toolPanel.appendChild(textSection);

// Обработчик добавления текста
addTextBtn.addEventListener('click', () => {
    let textContent = textInput.value.trim();
    if (!textContent) {
        textContent = 'Новый текст';
    }
    
    const newText = new fabric.IText(textContent, {
        left: canvas.width / 2 - 100,
        top: canvas.height / 2 - 20,
        fontSize: parseInt(fontSizeInput.value),
        fill: textColorInput.value,
        fontFamily: 'Arial',
        editable: true
    });
    
    canvas.add(newText);
    canvas.setActiveObject(newText);
    canvas.renderAll();
    textInput.value = '';
    
    console.log('Текст добавлен, цвет:', textColorInput.value);
});

// ========== 4. УПРАВЛЕНИЕ СЛОЯМИ ==========
const layerSection = document.createElement('div');
layerSection.style.borderTop = '1px solid #eee';
layerSection.style.paddingTop = '10px';
layerSection.style.marginTop = '5px';

const layerLabel = document.createElement('label');
layerLabel.textContent = '📚 Управление слоями';
layerLabel.style.display = 'block';
layerLabel.style.marginBottom = '10px';
layerLabel.style.fontWeight = 'bold';
layerLabel.style.fontSize = '13px';
layerSection.appendChild(layerLabel);

const toBottomBtn = document.createElement('button');
toBottomBtn.textContent = '⬇️ На задний план';
toBottomBtn.style.width = '100%';
toBottomBtn.style.padding = '8px';
toBottomBtn.style.marginBottom = '5px';
toBottomBtn.style.cursor = 'pointer';
toBottomBtn.style.backgroundColor = '#ff9800';
toBottomBtn.style.color = 'white';
toBottomBtn.style.border = 'none';
toBottomBtn.style.borderRadius = '4px';
toBottomBtn.onclick = (e) => {
    e.stopPropagation();
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.sendToBack(activeObject);
        canvas.renderAll();
        console.log('Объект отправлен на задний план');
    } else {
        alert('Сначала выдели объект (кликни на картинку или текст)');
    }
};

const toTopBtn = document.createElement('button');
toTopBtn.textContent = '⬆️ На передний план';
toTopBtn.style.width = '100%';
toTopBtn.style.padding = '8px';
toTopBtn.style.marginBottom = '5px';
toTopBtn.style.cursor = 'pointer';
toTopBtn.style.backgroundColor = '#ff9800';
toTopBtn.style.color = 'white';
toTopBtn.style.border = 'none';
toTopBtn.style.borderRadius = '4px';
toTopBtn.onclick = (e) => {
    e.stopPropagation();
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.bringToFront(activeObject);
        canvas.renderAll();
        console.log('Объект выведен на передний план');
    } else {
        alert('Сначала выдели объект (кликни на картинку или текст)');
    }
};

const deleteBtn = document.createElement('button');
deleteBtn.textContent = '🗑️ Удалить объект';
deleteBtn.style.width = '100%';
deleteBtn.style.padding = '8px';
deleteBtn.style.cursor = 'pointer';
deleteBtn.style.backgroundColor = '#f44336';
deleteBtn.style.color = 'white';
deleteBtn.style.border = 'none';
deleteBtn.style.borderRadius = '4px';
deleteBtn.onclick = (e) => {
    e.stopPropagation();
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.remove(activeObject);
        canvas.renderAll();
        console.log('Объект удалён');
    } else {
        alert('Сначала выдели объект для удаления');
    }
};

layerSection.appendChild(toBottomBtn);
layerSection.appendChild(toTopBtn);
layerSection.appendChild(deleteBtn);
toolPanel.appendChild(layerSection);

// ========== 5. ЭКСПОРТ ==========
const exportSection = document.createElement('div');
exportSection.style.borderTop = '1px solid #eee';
exportSection.style.paddingTop = '10px';
exportSection.style.marginTop = '5px';

const exportBtn = document.createElement('button');
exportBtn.textContent = '💾 Скачать как PNG';
exportBtn.style.width = '100%';
exportBtn.style.padding = '8px';
exportBtn.style.cursor = 'pointer';
exportBtn.style.backgroundColor = '#9C27B0';
exportBtn.style.color = 'white';
exportBtn.style.border = 'none';
exportBtn.style.borderRadius = '4px';
exportBtn.style.fontSize = '14px';
exportBtn.onclick = () => {
    const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1
    });
    const link = document.createElement('a');
    link.download = `template-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
};
exportSection.appendChild(exportBtn);
toolPanel.appendChild(exportSection);

// Добавляем панель на страницу
document.body.appendChild(toolPanel);

// Добавляем стили для canvas и кнопок
const style = document.createElement('style');
style.textContent = `
    #canvas_template {
        border: 2px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        background: white;
        cursor: crosshair;
    }
    
    button {
        transition: all 0.2s ease;
        font-family: inherit;
    }
    
    button:hover {
        opacity: 0.85;
        transform: translateY(-1px);
    }
    
    button:active {
        transform: translateY(0);
    }
    
    .menu button {
        background-color: #4CAF50;
        color: white;
        padding: 8px 16px;
        margin: 0 5px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .menu button:hover {
        background-color: #45a049;
    }
`;
document.head.appendChild(style);

// Добавляем тестовый объект для проверки
setTimeout(() => {
    const testText = new fabric.IText('✨ Кликни на меня и нажми кнопки слоёв ✨', {
        left: 50,
        top: 50,
        fontSize: 18,
        fill: '#333',
        fontFamily: 'Arial',
        backgroundColor: '#f0f0f0',
        padding: 5
    });
    canvas.add(testText);
    canvas.renderAll();
    console.log('Канвас готов! Все функции должны работать.');
    console.log('Fabric.js версия:', fabric.version);
}, 1000);