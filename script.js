document.addEventListener('DOMContentLoaded', () => {
    const rInput = document.getElementById('r');
    const gInput = document.getElementById('g');
    const bInput = document.getElementById('b');

    const rSlider = document.getElementById('rSlider');
    const gSlider = document.getElementById('gSlider');
    const bSlider = document.getElementById('bSlider');

    const cOutput = document.getElementById('c');
    const mOutput = document.getElementById('m');
    const yOutput = document.getElementById('y');
    const kOutput = document.getElementById('k');

    const hOutput = document.getElementById('h');
    const lOutput = document.getElementById('l');
    const sOutput = document.getElementById('s');

    const colorDisplay = document.getElementById('colorDisplay');
    const rgbValue = document.getElementById('rgbValue');
    const cmykValue = document.getElementById('cmykValue');
    const hlsValue = document.getElementById('hlsValue');

    const hexInput = document.getElementById('hex');
    const colorPicker = document.getElementById('colorPicker');

    function updateColor() {    //обновление цвета
        const r = parseInt(rInput.value);
        const g = parseInt(gInput.value);
        const b = parseInt(bInput.value);

        // Обновление отображаемого цвета
        colorDisplay.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        rgbValue.textContent = `(${r}, ${g}, ${b})`;

        // Конвертация RGB в CMYK
        const cmyk = rgbToCmyk(r, g, b);
        cOutput.value = cmyk.c;
        mOutput.value = cmyk.m;
        yOutput.value = cmyk.y;
        kOutput.value = cmyk.k;
        cmykValue.textContent = `(${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k})`;

        // Конвертация RGB в HLS
        const hls = rgbToHls(r, g, b);
        hOutput.value = hls.h;
        lOutput.value = hls.l;
        sOutput.value = hls.s;
        hlsValue.textContent = `(${hls.h}, ${hls.l}, ${hls.s})`;
    }

    function rgbToCmyk(r, g, b) {
        let c = 1 - (r / 255);
        let m = 1 - (g / 255);
        let y = 1 - (b / 255);
        let k = Math.min(c, m, y);

        if (k === 1) {
            return { c: 0, m: 0, y: 0, k: 100 };
        }

        return {
            c: Math.round((c - k) / (1 - k) * 100),
            m: Math.round((m - k) / (1 - k) * 100),
            y: Math.round((y - k) / (1 - k) * 100),
            k: Math.round(k * 100)
        };
    }

    function rgbToHls(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, l = (max + min) / 2, s;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: Math.round(h * 360), l: Math.round(l * 100), s: Math.round(s * 100) };
    }

    function hexToRgb(hex) {
                let r = parseInt(hex.slice(1, 3), 16);
                let g = parseInt(hex.slice(3, 5), 16);
                let b = parseInt(hex.slice(5, 7), 16);
                return { r, g, b };
            }
			
            // Обработчики событий для RGB
            [rInput, gInput, bInput].forEach(input => {
                input.addEventListener('input', () => {
                    rSlider.value = rInput.value;
                    gSlider.value = gInput.value;
                    bSlider.value = bInput.value;
                    updateColor();
                });
            });

            [rSlider, gSlider, bSlider].forEach(slider => {
                slider.addEventListener('input', () => {
                    rInput.value = rSlider.value;
                    gInput.value = gSlider.value;
                    bInput.value = bSlider.value;
                    updateColor();
                });
            });

            colorPicker.addEventListener('input', function() {
                const color = this.value;
                const rgb = hexToRgb(color);
                rInput.value = rgb.r;
                gInput.value = rgb.g;
                bInput.value = rgb.b;
                rSlider.value = rgb.r;
                gSlider.value = rgb.g;
                bSlider.value = rgb.b;
                updateColor();
            });

            hexInput.addEventListener('input', function() {
                const color = this.value;
                if (/^#[0-9A-F]{6}$/i.test(color)) {
                    const rgb = hexToRgb(color);
                    rInput.value = rgb.r;
                    gInput.value = rgb.g;
                    bInput.value = rgb.b;
                    rSlider.value = rgb.r;
                    gSlider.value = rgb.g;
                    bSlider.value = rgb.b;
                    updateColor();
                }
            });
            // Инициализация цвета
            updateColor();
        });