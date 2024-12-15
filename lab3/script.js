let img = new Image();
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let imageData;

// Загружаем изображение
document.getElementById('upload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

// Построение гистограммы
function buildHistogram() {
  const data = imageData.data;
  let histogram = Array(256).fill(0);

  for (let i = 0; i < data.length; i += 4) {
    let brightness = Math.floor(0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
    histogram[brightness]++;
  }

  // Для отображения гистограммы можно использовать отдельный canvas или chart
  console.log(histogram);
}

// Эквализация гистограммы
function equalizeHistogram() {
  const data = imageData.data;
  let histogram = Array(256).fill(0);
  
  for (let i = 0; i < data.length; i += 4) {
    let brightness = Math.floor(0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
    histogram[brightness]++;
  }

  // Кумулятивная гистограмма
  let cumulativeHistogram = Array(256).fill(0);
  cumulativeHistogram[0] = histogram[0];
  for (let i = 1; i < 256; i++) {
    cumulativeHistogram[i] = cumulativeHistogram[i - 1] + histogram[i];
  }

  // Нормализация
  let minCumulative = cumulativeHistogram[0];
  let maxCumulative = cumulativeHistogram[255];

  // Применение эквализации
  for (let i = 0; i < data.length; i += 4) {
    let brightness = Math.floor(0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
    let equalizedBrightness = Math.floor(((cumulativeHistogram[brightness] - minCumulative) / (maxCumulative - minCumulative)) * 255);
    data[i] = data[i + 1] = data[i + 2] = equalizedBrightness; // применяем к RGB
  }

  ctx.putImageData(imageData, 0, 0);
}

// Линейное контрастирование
function adjustContrast() {
  const data = imageData.data;
  const min = Math.min(...data.filter((_, i) => i % 4 === 0));
  const max = Math.max(...data.filter((_, i) => i % 4 === 0));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = ((data[i] - min) / (max - min)) * 255;
    data[i + 1] = ((data[i + 1] - min) / (max - min)) * 255;
    data[i + 2] = ((data[i + 2] - min) / (max - min)) * 255;
  }

  ctx.putImageData(imageData, 0, 0);
}

// Фильтрация для повышения резкости (основной фильтр)
function sharpenImage() {
  const sharpenKernel = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]
  ];

  const data = imageData.data;
  let newImageData = ctx.createImageData(canvas.width, canvas.height);
  let newData = newImageData.data;

  for (let y = 1; y < canvas.height - 1; y++) {
    for (let x = 1; x < canvas.width - 1; x++) {
      let red = 0, green = 0, blue = 0;

      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          let pixel = getPixel(x + kx, y + ky);
          red += pixel.r * sharpenKernel[ky + 1][kx + 1];
          green += pixel.g * sharpenKernel[ky + 1][kx + 1];
          blue += pixel.b * sharpenKernel[ky + 1][kx + 1];
        }
      }

      // Обновление пикселей
      setPixel(x, y, Math.min(Math.max(red, 0), 255), Math.min(Math.max(green, 0), 255), Math.min(Math.max(blue, 0), 255));
    }
  }

  ctx.putImageData(newImageData, 0, 0);

  // Получение пикселя
  function getPixel(x, y) {
    let index = (y * canvas.width + x) * 4;
    return {
      r: data[index],
      g: data[index + 1],
      b: data[index + 2]
    };
  }

  // Установка нового пикселя
  function setPixel(x, y, r, g, b) {
    let index = (y * canvas.width + x) * 4;
    newData[index] = r;
    newData[index + 1] = g;
    newData[index + 2] = b;
    newData[index + 3] = 255;
  }
}
