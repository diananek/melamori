import {useEffect} from "react";

export default function DynamicAdapt() {
    useEffect(() => {
        const type = "min";
        // массив объектов
        let objects = [];
        const daClassname = '_dynamic_adapt_';
        // массив DOM-элементов
        let nodes = [...document.querySelectorAll('[data-da]')];
        const init = () => {
            // наполнение оbjects объктами
            nodes.forEach((node) => {
                const data = node.dataset.da.trim();

                const dataArray = data.split(',');

                const object = {};
                object.element = node;
                object.parent = node.parentNode;
                const selector = dataArray[0].trim();
                object.destination = document.querySelector(selector);
                object.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
                object.place = dataArray[2] ? dataArray[2].trim() : 'last';
                object.index = indexInParent(object.parent, object.element);
                objects.push(object);
            });

            arraySort(objects);

            // массив уникальных медиа-запросов
            let mediaQueries = objects
                .map(({
                          breakpoint
                      }) => `(${type}-width: ${breakpoint}px),${breakpoint}`)
                .filter((item, index, self) => self.indexOf(item) === index);

            // навешивание слушателя на медиа-запрос
            // и вызов обработчика при первом запуске
            mediaQueries.forEach((media) => {
                const mediaSplit = media.split(',');
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];

                // массив объектов с подходящим брейкпоинтом
                const objectsFilter = objects.filter(
                    ({
                         breakpoint
                     }) => breakpoint === mediaBreakpoint
                );
                matchMedia.addEventListener('change', () => {
                    mediaHandler(matchMedia, objectsFilter);
                });
                mediaHandler(matchMedia, objectsFilter);
            });
        }
        // Основная функция
        const mediaHandler = (matchMedia, objects) => {
            if (matchMedia.matches) {
                objects.forEach((object) => {
                    object.index = indexInParent(object.parent, object.element);
                    moveTo(object.place, object.element, object.destination);
                });
            } else {
                objects.forEach(
                    ({ parent, element, index }) => {
                        if (element.classList.contains(daClassname)) {
                            moveBack(parent, element, index);
                        }
                    }
                );
            }
        }

        // Функция перемещения
        const moveTo = (place, element, destination) => {
            element.classList.add(daClassname);
            if (place === 'last' || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === 'first') {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }

        // Функция возврата
        const moveBack = (parent, element, index) => {
            element.classList.remove(daClassname);
            if (parent.children[index] !== undefined) {
                parent.children[index].before(element);
            } else {
                parent.append(element);
            }
        }

        // Функция получения индекса внутри родителя
        const indexInParent = (parent, element) => {
            return [...parent.children].indexOf(element);
        }

        // Функция сортировки массива по breakpoint и place
        // по возрастанию для this.type = min
        // по убыванию для this.type = max
        const arraySort = (arr) => {
            if (type === 'min') {
                arr.sort((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
                        if (a.place === 'first' || b.place === 'last') {
                            return -1;
                        }
                        if (a.place === 'last' || b.place === 'first') {
                            return 1;
                        }
                        return a.place - b.place;
                    }
                    return a.breakpoint - b.breakpoint;
                });
            } else {
                arr.sort((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) {
                            return 0;
                        }
                        if (a.place === 'first' || b.place === 'last') {
                            return 1;
                        }
                        if (a.place === 'last' || b.place === 'first') {
                            return -1;
                        }
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                });
            }
        }
            init()

        }, []
    )

    return(
        <> </>
    )
}