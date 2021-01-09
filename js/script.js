
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 600;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}



document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// руализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	//проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
});
function map(n) {
	google.maps.Map.prototype.setCenterWithoffset = function (latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView();
		ov.onAdd = function () {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x + offsetX;
			aPoint.y = aPoint.y + offsetY;
			map.panTo(proj.fromLatLngToContainerPixelToLatLng(aPoint));
			// map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function () { };
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		// pixeloffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(53.819055, 27.8813694)]
	]
	var options = {
		zoom: 10,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url: 'img/icons/map.svg',
		scaledSize: new google.maps.Size(18, 20),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			// icon:icon,
			position: locations[i][0],
			map: map,
		});
		markers.push(marker);
	}
}
if ($("#map").length > 0) {
	map();
}

// ==========================================
// <ВЫДЕЛЕНИЕ АКТИВНОГО МЕНЮ>
// ==========================================
$('a').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
});
// ==========================================
// </ВЫДЕЛЕНИЕ АКТИВНОГО МЕНЮ>
// ==========================================

// ==========================================
// <WEBP IMAGE>
// ==========================================
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});
// ==========================================
// </WEBP IMAGE>
// ==========================================

// ==========================================
// <2 СКРИПТА НА ИЗОБРАЖЕНИЯ, ЕСЛИ НЕ ОТОБРАЖАЕТСЯ, АКТИВНЫЙ СКРИПТ ЗАКОМЕНТИРОВАТЬ, А ЗАКОМЕНТИРОВАННЫЙ РАССКОМЕНТИРОВАТЬ>
// ==========================================
function ibg() {
    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}
ibg();

// function ibg() {
//     $.each($('.ibg'), function (index, val) {
//         if ($(this).find('img').length > 0) {
//             $(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
//         }
//     });
// }
// ibg();
// ==========================================
// <2 СКРИПТА НА ИЗОБРАЖЕНИЯ>
// ==========================================

// ==========================================
// <SWIPER SLIDER INIT>
// ==========================================
new Swiper('.client__slider-container', {
    // Свои классы
    containerModifierClass: "client__slider-container",
    wrapperClass: "client__slider-wrapper",
    // slidePrevClass: "",
    // slideNextClass: "",
    // slideActiveClass: "",
    slideClass: "client__slider-slide",
    // Стрелки навигации
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // Точки пагинации
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
    },
    // Количество слайдов для показа
    slidesPerView: 1,
    //  Обновить свайпер
    observeParents: true,
    observer: true,
    observeSlideChildren: true,

    // Отступ между слайдами
    spaceBetween: 100,
    // Автопрокрутка слайдов
    autoplay: {
        delay: 2000,
    },
});

// ==========================================

new Swiper('.about__slider-container', {
    // Стрелки навигации
    navigation: {
        nextEl: '.about__button-next',
        prevEl: '.about__button-prev',
    },

    // Точки пагинации
    pagination: {
        el: '.about__slider-pagination',
        clickable: true,
    },

    // Количество слайдов для показа
    slidesPerView: 4,

    // Отступы между слайдами
    spaceBetween: 30,

    // Скрол бар
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },

    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 320px
        320: {
            direction: 'vertical',
            loop: false,
            centeredSlides: false,
            slidesPerView: 4,
            autoHeight: false,
            mousewheel: true,
            spaceBetween: 0,
        },
        // when window width is >= 540px
        540: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        // when window width is >= 640px
        768: {
            slidesPerView: 4,
            spaceBetween: 40
        }
    }
});

// ==========================================
// </SWIPER SLIDER INIT>
// ==========================================