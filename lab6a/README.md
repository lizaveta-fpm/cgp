Лабораторная работа 6а. Егоровой Елизаветы.
Построение и визуализация трехмерных объектов.

Задачи

1. Реализовать трехмерную каркасную модель буквы "E".
2. Создать веб-приложение для отображения и визуализации трехмерного объекта.
3. Настроить возможность вращения объекта в 3D-пространстве.
4. Обеспечить масштабируемость приложения при изменении размеров окна браузера.

Для выполнения поставленных задач были использованы следующие шаги:

1. Подключение библиотеки Three.js:
   - Для работы с 3D-графикой в веб-приложении была выбрана библиотека Three.js, которая предоставляет удобные инструменты для рендеринга и манипуляции с трехмерными объектами. Библиотека была подключена через CDN.

2. Инициализация сцены:
   - Было создано базовое пространство для рендеринга, состоящее из сцены, камеры и рендерера.
   - Сцена (`scene`) служит контейнером для всех объектов, включая нашу трехмерную модель.
   - Камера (`camera`) настроена на перспективу, чтобы обеспечить удобный обзор объекта в 3D-пространстве. Камера расположена на определенном расстоянии от объекта для его корректного отображения.
   - Рендерер (`renderer`) отвечает за отображение сцены в окне браузера.

3. Построение каркасной модели буквы "E":
   - Каркас буквы "E" был построен с использованием линии (`THREE.Line`), состоящей из множества точек, определяющих положение каждой линии.
   - Для буквы "E" были созданы несколько линий:
     - Горизонтальные линии в верхней, средней и нижней частях.
     - Вертикальная линия с левой стороны и одна вертикальная линия, соединяющая середину с нижней частью.
   - Все линии были собраны в объекты и добавлены в сцену.

4. Анимация объекта:
   - Для создания эффекта вращения объекта была реализована функция анимации, которая на каждом кадре изменяет углы поворота сцены вокруг осей X и Y. Это позволило пользователю наблюдать трехмерную модель со всех сторон.

5. Масштабируемость окна:
   - Добавлен обработчик событий для изменения размеров окна браузера. Это обеспечило правильное масштабирование сцены и рендерера при изменении размеров окна, сохраняя пропорции и корректность отображения объекта.

В результате проделанной работы был реализован каркас буквы "E", который вращается в 3D-пространстве. Веб-приложение корректно отображает объект и позволяет пользователю наблюдать его со всех сторон. Также обеспечено масштабирование окна, что позволяет адаптировать приложение под различные разрешения экрана.
