$(document).ready(function(e) {
    
    const animateTail = (e, interacting) => {
        const mouseX = e.clientX - (cursor.width() / 2),
              mouseY = e.clientY - (cursor.height() / 2);
    
        // cursor[0] => DOM element of $('#tail').
        // equivalent to document.getElementById('tail')
        cursor[0].animate({
            transform: `translate(${mouseX}px, ${mouseY}px) scale(${interacting ? 5 : 1})`
        }, {duration: 800, fill: 'forwards'});
    }
    
    const getClassName = (type) => {
        switch (type) {
            case 'youtube': return 'fa-brands fa-youtube';
            case 'cat': return 'fa-solid fa-cat';
            case 'dog': return 'fa-solid fa-dog';
            case 'github': return 'fa-brands fa-github';
            case 'twitter': return 'fa-brands fa-x-twitter'
            default: return 'fa-solid fa-arrow-up-right-from-square';
        }
    }

    const clamp = (val, min, max) => { return Math.min(Math.max(val, min), max) };

    const cursor = $('#tail');

    $(this).on('mousemove', (e) => {

        // cursor
        const element = e.target.closest('.interactable'),
              interacting = element !== null,
              $element = $(element);

        const icon = $('#tail-icon')

        animateTail(e, interacting);
        
        cursor.attr('data-type', interacting ? $element.attr('data-type') : '');

        if (interacting) {
            icon.attr('class', getClassName($element.attr('data-type')));
        }

        // images
        $('.image').each((i, image) => {
            const percentage = (e.clientX / window.innerWidth) * 100;   
            image.animate({
                objectPosition: `${percentage}% center`
            }, { duration: 800, fill: 'forwards'});
        });
    });
});