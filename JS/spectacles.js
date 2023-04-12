let images = [
    { img: '../../SRL/photos/escurial1.jpg' },
    { img: '../../SRL/photos/escurial2.jpg' },
    { img: '../../SRL/photos/escurial3.jpg' },
    { img: '../../SRL/photos/escurial4.jpg' },
    { img: '../../SRL/photos/escurial5.jpg' },
    { img: '../../SRL/photos/escurial6.jpg' },
    { img: '../../SRL/photos/escurial7.jpg' },
    { img: '../../SRL/photos/escurial8.jpg' },
    { img: '../../SRL/photos/escurial9.jpg' },
    { img: '../../SRL/photos/escurial10.jpg' },
    { img: '../../SRL/photos/escurial11.jpg' },
    { img: '../../SRL/photos/escurial12.jpg' },
    { img: '../../SRL/photos/escurial13.jpg' }
];

let imagesAdder = (tab) => {
    const container_images = document.getElementById("container_images");
    tab.forEach((item, i) => {
        const image_box = container_images.appendChild(document.createElement("div"));
        image_box.setAttribute("class", "img_spectacle");
        image_box.setAttribute("id", `img_spectacle_${i}`); //tal vez no sea necesario el ID.
        let new_image = image_box.appendChild(document.createElement("img"));
        new_image.src = item.img;
        new_image.setAttribute("alt", `image${i}`);
    });
};

imagesAdder(images);


//sliders spectacles

const slider_container = document.getElementById("slider_container");
const btn_description_spectacle = document.getElementById("btn_description_spectacle");
const btn_photos_spectacle = document.getElementById("btn_photos_spectacle");
const btn_videos_specetacle = document.getElementById("btn_videos_specetacle");

const spectacle_description = document.getElementById("spectacle_description");
const spectacle_video = document.getElementById("spectacle_video");
const spectacle_images = document.getElementById("spectacle_images");

const btns_slide_spectacles = document.querySelectorAll(".btns_slide_spectacles a");

btns_slide_spectacles.forEach((item, i) => {
    item.addEventListener("click", () => {
        btns_slide_spectacles.forEach(item => item.classList.remove("element_active"));
        btns_slide_spectacles[i].classList.add("element_active");
        document.querySelector('.footer_spectacles').classList.toggle('hidden_element');
    });
});

btn_photos_spectacle.addEventListener("click", () => {
    let resize = () => { slider_container.scrollLeft = slider_container.offsetWidth };
    resize();
    spectacle_images.classList.remove("slide_hidden");
    spectacle_description.classList.add("slide_hidden");
    spectacle_video.classList.add("slide_hidden");
    window.onresize = resize;
});
btn_description_spectacle.addEventListener("click", () => {
    let resize = () => { slider_container.scrollLeft = -2 * slider_container.offsetWidth };
    resize();
    spectacle_description.classList.remove("slide_hidden");
    spectacle_images.classList.add("slide_hidden");
    spectacle_video.classList.add("slide_hidden");
    window.onresize = resize;
})
btn_videos_specetacle.addEventListener("click", () => {
    let resize = () => { slider_container.scrollLeft = 2 * slider_container.offsetWidth };
    resize();
    spectacle_video.classList.remove("slide_hidden");
    spectacle_description.classList.add("slide_hidden");
    spectacle_images.classList.add("slide_hidden");
    window.onresize = resize;
})

const btn_spectacle = document.querySelectorAll(".new_spectacle")

btn_spectacle.forEach((card, i) => {
    card.addEventListener("click", () => {
        let container_spectacle_cards = document.getElementById("container_spectacle_cards");
        let new_spectacle = document.getElementById(`new_spectacle_${i}`);
        btn_description_spectacle.classList.toggle("element_active");
        new_spectacle.classList.toggle("hidden_element"); // corregir, porque solo oculta la card clikeada. debe ocultar todo el contenedor de cards.
        container_spectacle_cards.classList.toggle("slide_hidden");
    });
});

/* <<< slide modal >>> */

let count = 0;
const container_slide_modal = document.querySelector('.container_modal');
const slide_modal = document.querySelector('.slide_modal');
const images_spectacle = document.querySelectorAll('.container_images_spectacle .img_spectacle img');
const img_slide_show = document.querySelector('.slide_modal img');

slide_modal.addEventListener('click', (e) => {
    let btn_prev = document.getElementById('btn_prev'),
        btn_next = document.getElementById('btn_next'),
        img = slide_modal.querySelector('img')

    if (e.target == btn_prev) {
        if (count > 0) {
            img.src = images[count - 1].img;
            count--;
        } else {
            img.src = images[images.length - 1].img;
            count = images.length - 1;
        };
    } else if (e.target == btn_next) {
        if (count < images.length - 1) {
            img.src = images[count + 1].img;
            count++
        } else {
            img.src = images[0].img;
            count = 0;
        };
    };
});

Array.from(images_spectacle).forEach((img, i) => {
    img.addEventListener('click', () => {
        if (slider_container.offsetWidth > 576) {
            const image_selected = i;
            img_slide_show.src = images[image_selected].img;
            count = image_selected;
            container_slide_modal.style.opacity = 1;
            container_slide_modal.style.visibility = 'visible';
        } else if (slider_container.offsetWidth <= 576) {
            const image_selected = i;
            img_slide_show.src = images[image_selected].img;
            count = image_selected;
            container_slide_modal.style.opacity = 1;
            container_slide_modal.style.visibility = 'visible';
            // detect touch events
            let touchstartX = 0,
                touchendX = 0;

            slide_modal.addEventListener('touchstart', (e) => {
                touchstartX = e.changedTouches[0].screenX;
            });

            slide_modal.addEventListener('touchend', (e) => {
                touchendX = e.changedTouches[0].screenX;
                handleGesture();
            });

            function handleGesture() {
                if (touchendX < touchstartX) {
                    // slide left, move to next image
                    if (count < images.length - 1) {
                        img_slide_show.src = images[count + 1].img;
                        count++;
                    } else {
                        img_slide_show.src = images[0].img;
                        count = 0;
                    }
                }

                if (touchendX > touchstartX) {
                    // slide right, move to previous image
                    if (count > 0) {
                        img_slide_show.src = images[count - 1].img;
                        count--;
                    } else {
                        img_slide_show.src = images[images.length - 1].img;
                        count = images.length - 1;
                    };
                };
            };
        };
    });
});
document.querySelector('.btn_close').addEventListener('click', () => {
    container_slide_modal.style.opacity = 0;
    container_slide_modal.style.visibility = 'hidden'
});