(function() {
    "use strict";

    function menuBurger() {
        const menuIcon = document.querySelector('.menu__icon');

        if (menuIcon) {
            const menuBody = document.querySelector('.menu__list');
            menuIcon.addEventListener('click', function(e) {
                document.body.classList.toggle('menu__list_lock');
                menuIcon.classList.toggle('menu__icon_active');
                menuBody.classList.toggle('menu__list_active');
            });
        }
    }

    function selectOptionHandler(event, option) {
        let target = event.target.closest('.features__option');

        if (!target) return;

        let block = option;
        block.querySelector('.features__option_selected').classList.remove('features__option_selected');
        event.preventDefault();
        target.classList.add('features__option_selected');

    }

    function selectOption() {

        let options = document.body.querySelectorAll('.features__options');
        if (options) {
            for (let option of options) {
                option.addEventListener('click', () => selectOptionHandler(event, option));
            }
        }
    }

    function selectMenuItem() {
        let menu = document.body.querySelector('.menu');
        if (menu) {
            function menuHandler(e) {
                if (e.target.classList.contains('menu__link')) {
                    document.querySelector('.menu__link_selected').classList.remove('menu__link_selected');
                    e.target.classList.add('menu__link_selected');
                }
            }
            menu.addEventListener('click', menuHandler);
        }
    }

    function offersScroll() {
        const ele = document.querySelector('.page__offers');

        if (ele) {
            let pos = { top: 0, left: 0, x: 0, y: 0 };


            const mouseDownHandler = function(e) {
                // Change the cursor and prevent user from selecting the text
                ele.style.cursor = 'grabbing';
                ele.style.userSelect = 'none';
                pos = {
                    // The current scroll
                    left: ele.scrollLeft,
                    top: ele.scrollTop,
                    // Get the current mouse position
                    x: e.clientX,
                    y: e.clientY,
                };

                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            };

            const mouseMoveHandler = function(e) {
                // How far the mouse has been moved
                const dx = e.clientX - pos.x;
                const dy = e.clientY - pos.y;

                // Scroll the element
                ele.scrollTop = pos.top - dy;
                ele.scrollLeft = pos.left - dx;
            };

            const mouseUpHandler = function() {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);

                ele.style.cursor = 'grab';
                ele.style.removeProperty('user-select');
            };
            ele.addEventListener('mousedown', mouseDownHandler);
        }
    }
    window.main = function() {
        selectMenuItem();
        menuBurger();
        selectOption();
        offersScroll();
    }
})()