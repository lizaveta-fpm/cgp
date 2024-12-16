// Получаем элементы управления
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Начальные координаты для рисования
const startX = 50;
const startY = 50;
const endX = 550;
const endY = 550;

function draw() {
    const algorithm = document.getElementById("algorithm").value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(); // Рисуем сетку и оси

    if (algorithm === "basic") {
        basicAlgorithm(startX, startY, endX, endY);
    } else if (algorithm === "dda") {
        ddaAlgorithm(startX, startY, endX, endY);
    } else if (algorithm === "bresenham") {
        bresenhamLine(startX, startY, endX, endY);
    } else if (algorithm === "circle") {
        bresenhamCircle(300, 300, 100);
    }
}

// Функция рисования координатной сетки
function drawGrid() {
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(600, 300); // Ось X
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 600); // Ось Y
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Рисуем сетку
    for (let i = 0; i < 600; i += 20) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.moveTo(0, i);
        ctx.lineTo(600, i);
    }
    ctx.strokeStyle = "#e0e0e0";
    ctx.stroke();
}

// 1. Пошаговый алгоритм
function basicAlgorithm(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = Math.max(Math.abs(dx), Math.abs(dy));
    let xIncrement = dx / steps;
    let yIncrement = dy / steps;

    let x = x1;
    let y = y1;

    for (let i = 0; i <= steps; i++) {
        plotPixel(Math.round(x), Math.round(y));
        x += xIncrement;
        y += yIncrement;
    }
}

// 2. Алгоритм ЦДА
function ddaAlgorithm(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    let steps = Math.max(Math.abs(dx), Math.abs(dy));
    let xIncrement = dx / steps;
    let yIncrement = dy / steps;

    let x = x1;
    let y = y1;

    for (let i = 0; i <= steps; i++) {
        plotPixel(Math.round(x), Math.round(y));
        x += xIncrement;
        y += yIncrement;
    }
}

// 3. Алгоритм Брезенхема для отрезков
function bresenhamLine(x1, y1, x2, y2) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = (x1 < x2) ? 1 : -1;
    let sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        plotPixel(x1, y1);
        if (x1 === x2 && y1 === y2) break;
        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }
}

// 4. Алгоритм Брезенхема для окружностей
function bresenhamCircle(xc, yc, r) {
    let x = 0;
    let y = r;
    let p = 3 - 2 * r;
    plotCirclePoints(xc, yc, x, y);

    while (x <= y) {
        x++;
        if (p < 0) {
            p = p + 4 * x + 6;
        } else {
            y--;
            p = p + 4 * (x - y) + 10;
        }
        plotCirclePoints(xc, yc, x, y);
    }
}

function plotPixel(x, y) {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, 1, 1);
}

function plotCirclePoints(xc, yc, x, y) {
    plotPixel(xc + x, yc + y);
    plotPixel(xc - x, yc + y);
    plotPixel(xc + x, yc - y);
    plotPixel(xc - x, yc - y);
    plotPixel(xc + y, yc + x);
    plotPixel(xc - y, yc + x);
    plotPixel(xc + y, yc - x);
    plotPixel(xc - y, yc - x);
}
