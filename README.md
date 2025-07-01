<-- prettier-ignore-start -->

1. Цели
   1.1 Создать поиск изображений по ключевому слову вводимому в <input>
   1.2 <HTML>
    <form class="form">
        <label>
            <input type="text" name="search-text" placeholder="Search images..." required>
        </label>
        <button type="submit">Search</button>
    </form>
   1.3 Добавить минимальную проверку вводимого значения, чтобы не было пустой строки
   1.4 Сделать сначала на <fetch> потом создать другой файл на написать на <axios>
2. Логика работы
   2.1 Создать <class PixabayApi> для работы с HTTP запросами
   2.2 Создать <class RenderFactory> для отрисовки полученных элементов на странице
   2.3 Все типы хранить отдельно в папке <types> и под соответсвенным названием файла

<-- prettier-ignore-end -->
