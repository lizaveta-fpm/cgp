// Получаем элемент канваса и его контекст
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Исходные данные (координаты отрезков и отсечающего окна)
let segments = [
    {x1: 50, y1: 50, x2: 200, y2: 200},  // Отрезок 1
    {x1: 100, y1: 100, x2: 300, y2: 100}, // Отрезок 2
    {x1: 50, y1: 150, x2: 300, y2: 150}  // Отрезок 3
];

let windowBounds = {xmin: 100, ymin: 100, xmax: 250, ymax: 200}; // Отсекающее окно

// Функция для рисования отрезков
function drawSegments() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка канваса
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    // Рисуем отрезки
    segments.forEach(segment => {
        ctx.beginPath();
        ctx.moveTo(segment.x1, segment.y1);
        ctx.lineTo(segment.x2, segment.y2);
        ctx.stroke();
    });
}

// Функция для рисования отсечающего окна
function drawWindow() {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.rect(windowBounds.xmin, windowBounds.ymin, windowBounds.xmax - windowBounds.xmin, windowBounds.ymax - windowBounds.ymin);
    ctx.stroke();
}

// Алгоритм отсечения отрезков по алгоритму средней точки
function midpointClip(segment, bounds) {
    let x1 = segment.x1, y1 = segment.y1, x2 = segment.x2, y2 = segment.y2;
    let xmin = bounds.xmin, ymin = bounds.ymin, xmax = bounds.xmax, ymax = bounds.ymax;

    // Функция для проверки, внутри ли точка
    function inside(x, y) {
        return (x >= xmin && x <= xmax && y >= ymin && y <= ymax);
    }

    // Проверяем оба конца отрезка, если оба внутри — отрезок виден целиком
    if (inside(x1, y1) && inside(x2, y2)) {
        return [segment]; // Отрезок внутри окна, возвращаем его как есть
    }

    let visibleSegments = [];

    // Алгоритм отсечения отрезков по границам окна
    function clipEdge(x1, y1, x2, y2) {
        if (x1 < xmin) { // Обрезаем по левой границе
            let t = (xmin - x1) / (x2 - x1);
            y1 += t * (y2 - y1);
            x1 = xmin;
        }
        if (x1 > xmax) { // Обрезаем по правой границе
            let t = (xmax - x1) / (x2 - x1);
            y1 += t * (y2 - y1);
            x1 = xmax;
        }
        if (y1 < ymin) { // Обрезаем по нижней границе
            let t = (ymin - y1) / (y2 - y1);
            x1 += t * (x2 - x1);
            y1 = ymin;
        }
        if (y1 > ymax) { // Обрезаем по верхней границе
            let t = (ymax - y1) / (y2 - y1);
            x1 += t * (x2 - x1);
            y1 = ymax;
        }
        return {x1, y1}; // Возвращаем новые координаты
    }

    // Обрезаем оба конца отрезка, если необходимо
    if (!inside(x1, y1)) {
        let result = clipEdge(x1, y1, x2, y2);
        x1 = result.x1;
        y1 = result.y1;
    }

    if (!inside(x2, y2)) {
        let result = clipEdge(x2, y2, x1, y1);
        x2 = result.x1;
        y2 = result.y1;
    }

    // Возвращаем новый видимый отрезок, если он был отсечен
    visibleSegments.push({x1, y1, x2, y2});
    return visibleSegments;
}

// Функция для применения алгоритма отсечения ко всем отрезкам
function clipAllSegments() {
    let clippedSegments = [];
    segments.forEach(segment => {
        let result = midpointClip(segment, windowBounds);
        clippedSegments = clippedSegments.concat(result);
    });
    segments = clippedSegments;
    drawScene(); // Обновляем визуализацию
}

// Функция для рисования всей сцены
function drawScene() {
    drawSegments();  // Рисуем отрезки
    drawWindow();    // Рисуем отсечающее окно
}

// Инициализация и рисование начальной сцены
drawScene();

// Кнопка для выполнения отсечения
const button = document.createElement('button');
button.textContent = 'Отсечь отрезки';
button.onclick = clipAllSegments;
document.body.appendChild(button);
