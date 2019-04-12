window.onload = function () {

    let slides = document.querySelectorAll('.slide-single');
    const next = document.querySelector('#next-slide');
    const previous = document.querySelector('#prev-slide');
    const sliderBlock = document.querySelector('.slider');
    const links = [];
    let imgIndex = 0;
    let offset = 0;

    showImage();

    next.onclick = showNextImage;
    previous.onclick = showPrevImage;

    function findLinksImg() {
        for (let i = 0; i < slides.length; i++) {
            links[i] = slides[i].src;
            slides[i].remove();
        }
    }

    function showImage() {
        findLinksImg();
        imgIndex = 1;
        let offset1 = 1;
        let img = document.createElement('img');
        let img1 = document.createElement('img');
        let img2 = document.createElement('img');

        img.src = links[imgIndex - 1];
        img.classList.add('slide-single');
        img.style.left = offset1 - 807 + 'px';
        sliderBlock.appendChild(img);

        img1.src = links[imgIndex];
        img1.classList.add('slide-single');
        img1.style.left = offset * 806 + 'px';
        sliderBlock.appendChild(img1);

        img2.src = links[imgIndex + 1];
        img2.classList.add('slide-single');
        img2.style.left = offset1 * 806 + 'px';
        sliderBlock.appendChild(img2);
    }

    function findIndexLastImg(arg) {
        for (; imgIndex < links.length; imgIndex++) {
            if (links[imgIndex] === arg.src) {
                return imgIndex;
            }
        }
    }

    function addNextImage() {
        let rightImg = document.createElement('img');
        if (imgIndex >= links.length - 1) {
            imgIndex = 0;
        } else {
            imgIndex = imgIndex + 1;
        }
        console.log(imgIndex);
        rightImg.src = links[imgIndex]; // присвоение пути каждой новой картинке
        rightImg.classList.add('slide-single'); // добавляем картинке класс
        rightImg.style.left = 806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
        sliderBlock.appendChild(rightImg);// добавляем картинку в наш блок
    }

    function addPrevImage() {
        let leftImg = document.createElement('img');
        if (imgIndex === -1) {
            imgIndex = links.length - 1;
        } else {
            imgIndex = imgIndex - 1;
        }

        leftImg.src = links[imgIndex];
        leftImg.classList.add('slide-single'); // добавляем картинке класс
        leftImg.style.left = -806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
        sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);// добавляем картинку в наш блок
    }

    function showNextImage() {
        slides = document.querySelectorAll('.slide-single');
        offset = 0;
        let step2 = 0;
        findIndexLastImg(slides[2]);
        slides[0].remove();

        for (let i = 0; i < slides.length; i++) {
            if (step2 + 1 === slides.length) {
                offset = 1;
            } else {
                offset = 0;
                step2++;
            }
            slides[i].style.left = offset * 806 - 806 + 'px';
        }
        setTimeout(function () {
            addNextImage();
        }, 3000);
    }

    function showPrevImage() {
        slides = document.querySelectorAll('.slide-single');
        offset = 0;
        let step3 = slides.length;
        findIndexLastImg(slides[0]);
        slides[2].remove();

        for (let i = slides.length - 1; i >= 0; i--) {
            if (step3 - 1 > 0) {
                offset = 1;
                step3--;
            } else {
                offset = 0;
            }
            slides[i].style.left = offset * 806 + 'px';
        }
        setTimeout(function () {
            addPrevImage();
        }, 3000);
    }
};
