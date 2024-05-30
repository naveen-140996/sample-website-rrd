// script.js
document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const slider = document.querySelector('.slider');
    const totalCards = slider.children.length;
    let cardsVisible = getCardsVisible();
    let currentIndex = 0;

    const pagination = document.querySelector('.pagination');
    let totalPages = Math.ceil(totalCards / cardsVisible);

    function getCardsVisible() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1200) {
            return 3;
        } else if (screenWidth >= 768) {
            return 2;
        } else {
            return 1;
        }
    }

    const createPagination = () => {
        pagination.innerHTML = ''; 
        for (let i = 0; i < totalPages; i++) {
            const bullet = document.createElement('div');
            bullet.classList.add('bullet');
            if (i === 0) bullet.classList.add('active');
            bullet.dataset.index = i;
            pagination.appendChild(bullet);
        }
    };

    const updatePagination = () => {
        document.querySelectorAll('.pagination .bullet').forEach(bullet => {
            bullet.classList.remove('active');
        });
        document.querySelector(`.pagination .bullet[data-index="${Math.floor(currentIndex / cardsVisible)}"]`).classList.add('active');
    };

    const updateButtons = () => {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= totalCards - cardsVisible;
    };

    const moveSlider = () => {
        const cardWidth = slider.children[0].clientWidth + 20; // 20px margin
        slider.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    };

    const updateSlider = () => {
        cardsVisible = getCardsVisible();
        totalPages = Math.ceil(totalCards / cardsVisible);
        updatePagination();
        updateButtons();
        moveSlider();
    };

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex = Math.max(currentIndex - cardsVisible, 0);
            moveSlider();
            updateButtons();
            updatePagination();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < totalCards - cardsVisible) {
            currentIndex = Math.min(currentIndex + cardsVisible, totalCards - cardsVisible);
            moveSlider();
            updateButtons();
            updatePagination();
        }
    });

    pagination.addEventListener('click', (event) => {
        if (event.target.classList.contains('bullet')) {
            currentIndex = event.target.dataset.index * cardsVisible;
            moveSlider();
            updateButtons();
            updatePagination();
        }
    });

    window.addEventListener('resize', updateSlider);

    createPagination();
    updateButtons();
    moveSlider(); 
});



let slideIndex = 1;
showSlides(slideIndex);

const plusSlides = n => showSlides(slideIndex += n);

const currentSlide = n => showSlides(slideIndex = n);

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  for (i = 0; i < slides.length; i++) slides[i].style.display = "none";
  for (i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}
document.getElementById('openPopup').addEventListener('click', function() {
    document.getElementById('popupContainer').style.display = 'block';
  });
  
  document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('popupContainer').style.display = 'none';
  });
  
