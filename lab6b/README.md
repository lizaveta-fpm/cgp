Лабораторная работа 6b по трехмерным преобразованиям. Егоровой Елизаветы 10 гр.

Для выполнения задачи использовалась библиотека Three.js, которая предназначена для создания и рендеринга 3D-объектов в браузере. 

1. Инициализация сцены и объекта:
Для начала была создана сцена с использованием `THREE.Scene()`. Камера с параметрами перспективы была установлена с помощью `THREE.PerspectiveCamera()`, а для рендеринга сцены использовался WebGL рендерер `THREE.WebGLRenderer()`. Камера была расположена на позиции `camera.position.set(0, 0, 5)`, что позволяло наблюдать за объектом в центре сцены.

2. Создание модели буквы "E":
Буква "E" была реализована с помощью каркасной модели. Это значит, что буква была построена из линий, соединяющих несколько точек в 3D-пространстве:
- Для представления линии использовался `THREE.LineBasicMaterial()`, который рисует линии, не зависящие от источников света.
- Геометрия буквы была создана с использованием `THREE.BufferGeometry()`, и в нее были добавлены вершины для линий буквы.

3. Добавление освещения:
Для корректного отображения объектов в сцене был добавлен мягкий источник освещения с использованием `THREE.AmbientLight(0x404040)`, который освещает все объекты в сцене равномерно.

4. Реализация трехмерных преобразований:
- Масштабирование: Использована функция `scaleObject()`, которая изменяет размер объекта, умножая его на заданный коэффициент.
- Перемещение: Для перемещения объекта использована функция `moveObject()`, которая изменяет позицию объекта по осям X, Y и Z.
- Вращение: Вращение объекта реализовано с помощью функции `rotateObject()`, которая позволяет вращать объект вокруг произвольной оси в 3D-пространстве. Для этого использовалась функция `rotateOnAxis()`.

Управление и взаимодействие с объектом:
Для управления объектом с клавиатуры были добавлены следующие события:
- Стрелки вверх и вниз — перемещают объект по оси Y.
- Стрелки влево и вправо — изменяют размер объекта (масштабирование).
- Клавиши `r`, `t`, `y` — позволяют вращать объект вокруг осей X, Y и Z соответственно.