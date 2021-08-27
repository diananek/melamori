(function() {
    "use strict";

    const menuIcon = document.querySelector('.menu__icon');

    if (menuIcon) {
        const menuBody = document.querySelector('.menu__list');
        menuIcon.addEventListener('click', function(e) {
            document.body.classList.toggle('_lock');
            menuIcon.classList.toggle('_active');
            menuBody.classList.toggle('_active');
        });
    }

    function handler(event, option) {
        let target = event.target.closest('.features__option');

        if (!target) return;

        let block = option;
        block.querySelector('._selected').classList.remove('_selected');
        event.preventDefault();
        target.classList.add('_selected');

    }

    function selectOption() {

        let options = document.body.querySelectorAll('.features__options');
        for (let option of options) {
            option.addEventListener('click', () => handler(event, option));
        }
    }
    selectOption();
    window.start();
})()