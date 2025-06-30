//------------Start the first carusel------------------

const track = document.querySelector('.carousel-track');
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
});

document.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1; 
    track.scrollLeft = scrollLeft - walk;
});

//------------Start the second carusel------------------

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".custom-carousel-track");
    const items = document.querySelectorAll(".custom-carousel-item");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");
    const counter = document.querySelector(".carousel-counter");
    const carouselContainer = document.querySelector(".custom-carousel");

    let index = 0;
    const totalItems = items.length;
    const itemWidth = items[0].offsetWidth + 20;
    let maxIndex = Math.max(0, Math.ceil((totalItems * itemWidth - carouselContainer.offsetWidth) / itemWidth));

    function updateCarousel() {
        let translateX = index * itemWidth;
        const maxTranslateX = totalItems * itemWidth - carouselContainer.offsetWidth;
        if (translateX > maxTranslateX) {
            translateX = maxTranslateX; 
        }
        track.style.transform = `translateX(-${translateX}px)`;
        counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(totalItems).padStart(2, '0')}`;
    }

    nextButton.addEventListener("click", () => {
        if (index < maxIndex) {
            index++;
        }
        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        if (index > 0) {
            index--;
        }
        updateCarousel();
    });

    
    window.addEventListener("resize", () => {
        const newContainerWidth = carouselContainer.offsetWidth;
        maxIndex = Math.max(0, Math.ceil((totalItems * itemWidth - newContainerWidth) / itemWidth));
        if (index > maxIndex) {
            index = maxIndex;
        }
        updateCarousel();
    });

    updateCarousel();
});

//-------------Language Switcher-----------

document.addEventListener('DOMContentLoaded', function() {
  const languageButton = document.getElementById('languageButton');
  const languageDropdown = document.getElementById('languageDropdown');
  const currentLanguageSpan = document.getElementById('currentLanguage');

  
  function toggleDropdown() {
    languageDropdown.classList.toggle('show');
    languageButton.classList.toggle('active');
  }

  
  languageButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
    toggleDropdown();
  });

  
  languageDropdown.querySelectorAll('a').forEach(item => {
    item.addEventListener('click', function(event) {
      event.preventDefault();
      const selectedLanguage = this.dataset.lang;
      currentLanguageSpan.textContent = selectedLanguage; 
      toggleDropdown(); 
    });
  });

  
  document.addEventListener('click', function(event) {
    if (!languageButton.contains(event.target) && !languageDropdown.contains(event.target)) {
      if (languageDropdown.classList.contains('show')) {
        toggleDropdown();
      }
    }
  });
});


//-------------Modal Windows--------------------

function positionModal(modal) {
  const parent = modal.parentElement;
  const rect = parent.getBoundingClientRect();
  modal.style.top = `${rect.bottom + window.scrollY - 130}px`;
  modal.style.left = `${rect.left + window.scrollX}px`;
}


function openModal(modalId) {
  closeAllModals();
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById('modalOverlay');
  modal.classList.remove('show');
  modal.style.display = 'block';
  overlay.style.display = 'block';
  positionModal(modal);
  void modal.offsetWidth;
  modal.classList.add('show');
  overlay.classList.add('show');
}


function closeModal(id) {
  const modal = document.getElementById(id);
  const overlay = document.getElementById('modalOverlay');
  if (!modal || !overlay) return;
  modal.classList.remove('show');
  overlay.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
  }, 900);
}


function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none');
    document.getElementById('modalOverlay').style.display = 'none';
}
function closeOpenModal() {
  const openModal = document.querySelector('.modal.show');
  if (openModal) {
    closeModal(openModal.id);
  }
}

