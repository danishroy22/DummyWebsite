document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scroll({
            top: targetElement.offsetTop - document.querySelector('nav').offsetHeight,
            behavior: 'smooth'
        });
    });
});

(function () {
    "use strict";

    var carousel = document.querySelector('.carousel'),
        slider = carousel.querySelector('.carousel__slider'),
        items = carousel.querySelectorAll('.carousel__slider__item'),
        prevBtn = carousel.querySelector('.carousel__prev'),
        nextBtn = carousel.querySelector('.carousel__next');

    var width, height, totalWidth, margin = 20,
        currIndex = 0,
        interval, intervalTime = 2000;

    function init() {
        resize();
        move(Math.floor(items.length / 2));
        bindEvents();
        timer();
    }

    function resize() {
        width = Math.max(window.innerWidth * .25, 275);
        height = window.innerHeight * .5;
        totalWidth = width * items.length;

        slider.style.width = totalWidth + "px";

        items.forEach(function (item) {
            item.style.width = (width - (margin * 2)) + "px";
            item.style.height = height + "px";
        });
    }

    function move(index) {
        if (index < 1) index = items.length;
        if (index > items.length) index = 1;
        currIndex = index;

        items.forEach(function (item, i) {
            var box = item.querySelector('.item__3d-frame');
            if (i === (index - 1)) {
                item.classList.add('carousel__slider__item--active');
                box.style.transform = "perspective(1200px)";
            } else {
                item.classList.remove('carousel__slider__item--active');
                box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
            }
        });

        slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
    }

    function timer() {
        clearInterval(interval);
        interval = setInterval(function () {
            move(++currIndex);
        }, intervalTime);
    }

    function prev() {
        move(--currIndex);
        timer();
    }

    function next() {
        move(++currIndex);
        timer();
    }

    function bindEvents() {
        window.onresize = resize;
        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);

        // Keyboard events for left and right arrow keys
        document.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                prev();
            } else if (event.key === 'ArrowRight') {
                next();
            }
        });
    }

    init();
})();

document.addEventListener('DOMContentLoaded', (event) => {
    const videoPlayer = document.getElementById('videoPlayer');

    videoPlayer.addEventListener('ended', () => {
        alert('Video has ended!');
    });

});
