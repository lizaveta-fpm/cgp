Лабораторная работа 2. Егоровой Елизаветы 10 гр.

Веб-приложение, которое позволяет пользователю загружать изображения и просматривать их метаданные, такие как:
- Имя файла
- Размеры изображения (ширина x высота в пикселях)
- Разрешение (в dpi)
- Глубина цвета
- Метод сжатия

Проект использует HTML, CSS и JavaScript для создания функционала и интерфейса.

Технологии и инструменты

- HTML — основная разметка страницы, используемая для создания структуры веб-страницы.
- CSS — стилизация для создания современного и отзывчивого интерфейса.
- JavaScript — логика обработки изображений, извлечение метаданных, отображение результатов.
- FileReader API — позволяет работать с локальными файлами, загруженными пользователем.
- URL.createObjectURL — используется для временного создания URL-адреса для загруженных изображений.

Загрузка изображений
- Пользователь может выбрать несколько изображений с помощью элемента `<input type="file">`.
- После выбора изображений вызывается событие, которое запускает функцию для обработки файлов.