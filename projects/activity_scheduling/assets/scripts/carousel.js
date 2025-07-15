( () => {
	//------------First carousel (drag-scroll)------------------
	document.querySelectorAll('.carousel').forEach(carousel => {
		let isDown = false;
		let startX;
		let scrollLeft;

		carousel.addEventListener('mousedown', (e) => {
			isDown = true;
			carousel.classList.add('dragging');
			startX = e.pageX - carousel.offsetLeft;
			scrollLeft = carousel.scrollLeft;
		});
		carousel.addEventListener('mouseleave', () => {
			isDown = false;
			carousel.classList.remove('dragging');
		});
		carousel.addEventListener('mouseup', () => {
			isDown = false;
			carousel.classList.remove('dragging');
		});
		carousel.addEventListener('mousemove', (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - carousel.offsetLeft;
			const walk = (x - startX) * 1.5; // коефіцієнт швидкості
			carousel.scrollLeft = scrollLeft - walk;
		});
		// Touch events
		carousel.addEventListener('touchstart', (e) => {
			isDown = true;
			startX = e.touches[0].pageX - carousel.offsetLeft;
			scrollLeft = carousel.scrollLeft;
		});
		carousel.addEventListener('touchend', () => {
			isDown = false;
		});
		carousel.addEventListener('touchmove', (e) => {
			if (!isDown) return;
			const x = e.touches[0].pageX - carousel.offsetLeft;
			const walk = (x - startX) * 1.5;
			carousel.scrollLeft = scrollLeft - walk;
		});
	});

	//------------Second carousel (buttons/resize)------------------
	document.addEventListener( 'DOMContentLoaded', () => {
		// Second carousel
		const track2 = document.querySelector( '.custom-carousel-track' );
		const items = document.querySelectorAll( '.custom-carousel-item' );
		const prevButton = document.querySelector( '.carousel-prev' );
		const nextButton = document.querySelector( '.carousel-next' );
		const counter = document.querySelector( '.carousel-counter' );
		const carouselContainer = document.querySelector( '.custom-carousel' );

		if ( track2 && items.length && prevButton && nextButton && counter && carouselContainer ) {
			let index = 0;
			const totalItems = items.length;
			const itemWidth = items[ 0 ].offsetWidth + 20;
			let maxIndex = Math.max( 0, Math.ceil( ( totalItems * itemWidth - carouselContainer.offsetWidth ) / itemWidth ) );

			function updateCarousel() {
				let translateX = index * itemWidth;
				const maxTranslateX = totalItems * itemWidth - carouselContainer.offsetWidth;
				if ( translateX > maxTranslateX ) {
					translateX = maxTranslateX;
				}
				track2.style.transform = `translateX(-${translateX}px)`;
				counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(totalItems).padStart(2, '0')}`;
			}

			nextButton.addEventListener( 'click', () => {
				if ( index < maxIndex ) index++;
				updateCarousel();
			} );
			prevButton.addEventListener( 'click', () => {
				if ( index > 0 ) index--;
				updateCarousel();
			} );
			window.addEventListener( 'resize', () => {
				const newContainerWidth = carouselContainer.offsetWidth;
				maxIndex = Math.max( 0, Math.ceil( ( totalItems * itemWidth - newContainerWidth ) / itemWidth ) );
				if ( index > maxIndex ) index = maxIndex;
				updateCarousel();
			} );
			updateCarousel();
		}

		//-------------Language Switcher-----------
		const languageButton = document.getElementById( 'languageButton' );
		const languageDropdown = document.getElementById( 'languageDropdown' );
		const currentLanguageSpan = document.getElementById( 'currentLanguage' );
		if ( languageButton && languageDropdown && currentLanguageSpan ) {
			function toggleDropdown() {
				languageDropdown.classList.toggle( 'show' );
				languageButton.classList.toggle( 'active' );
			}
			languageButton.addEventListener( 'click', function( event ) {
				event.stopPropagation();
				toggleDropdown();
			} );
			languageDropdown.querySelectorAll( 'a' )
				.forEach( item => {
					item.addEventListener( 'click', function( event ) {
						event.preventDefault();
						const selectedLanguage = this.dataset.lang;
						currentLanguageSpan.textContent = selectedLanguage;
						toggleDropdown();
					} );
				} );
			document.addEventListener( 'click', function( event ) {
				if ( !languageButton.contains( event.target ) && !languageDropdown.contains( event.target ) ) {
					if ( languageDropdown.classList.contains( 'show' ) ) {
						toggleDropdown();
					}
				}
			} );
		}

		//-------------Modal Windows--------------------
		window.openModal = function( modalId ) {
			window.closeAllModals();
			const modal = document.getElementById( modalId );
			const overlay = document.getElementById( 'modalOverlay' );
			if ( !modal || !overlay ) return;
			modal.classList.add( 'show' );
			overlay.classList.add( 'show' );
			if ( modal.parentElement ) {
				modal.parentElement.classList.add( 'modal-open' );
			}
		}

		window.closeModal = function( id ) {
			const modal = document.getElementById( id );
			const overlay = document.getElementById( 'modalOverlay' );
			if ( !modal || !overlay ) return;
			modal.classList.remove( 'show' );
			overlay.classList.remove( 'show' );
			if ( modal.parentElement ) {
				modal.parentElement.classList.remove( 'modal-open' );
			}
		}

		window.closeAllModals = function() {
			document.querySelectorAll( '.modal' )
				.forEach( modal => {
					modal.classList.remove( 'show' );
				} );
			const overlay = document.getElementById( 'modalOverlay' );
			if ( overlay ) {
				overlay.classList.remove( 'show' );
			}
		}

		window.closeOpenModal = function() {
			const openModal = document.querySelector( '.modal.show' );
			if ( openModal ) {
				window.closeModal( openModal.id );
			}
		}

		
		document.addEventListener('click', function(event) {
			if (event.target.matches('.modal .close')) {
				event.stopPropagation();
				const modal = event.target.closest('.modal');
				if (modal) {
					window.closeModal(modal.id);
				}
			}
		});
	} );
} )();