$(document).ready(function () {
	loading();
	validationForm();
	mainVisuaImage();
	mainVisuaText();
	coverImg();
	stickyHeader();
	hamburgerMenu();
	anchorLink();
	showFooterGoIt();
});

function loading() {
	var path = document.location.origin;
	$('body').prepend('<div id="loading"><div><img src="' + path + '/images/logo-light.svg" alt="KAMORA Ltd.,"><div id="progress"></div></div></div>');

	$(window).load(function () {
		setTimeout(function () {
			$('body').addClass('loaded');
			$('#loading').on('transitionend', function () {
				$(this).remove();
				inviewElements();
			});
		}, 1000);
	});
}

function inviewElements() {
	const BUFF_PER = 0.9;
	const ACTIVE_CLASS = 'done';

	var $win = $(window);
	var $doc = $(document);
	var $elements = $('.js-fadeIn');
	var scroll;
	var win_height;
	var height;
	var fadePos = [];

	init();

	function init() {
		$win.on('load scroll resize', onScroll);
		onScroll();
	}

	function onScroll(e) {
		scroll = $win.scrollTop();
		win_height = $win.innerHeight();
		$elements.each(check);
	}

	function check(i, dom) {
		if (!$(this).hasClass(ACTIVE_CLASS)) {
			var $this = $(this);
			fadePos[i] = $this.offset().top;
			height = $this.innerHeight();
			if (scroll > fadePos[i] - win_height * BUFF_PER && scroll < fadePos[i] + height) {
				$this.addClass(ACTIVE_CLASS);
				switch (fadePos[i]) {
					case fadePos[i - 3]:
						var interval = 7;
						break;
					case fadePos[i - 2]:
						var interval = 5;
						break;
					case fadePos[i - 1]:
						var interval = 3;
						break;
					default:
						var interval = 1;
						break;
				}
				$this.css({
					opacity: 1,
					transform: "translate3d(0, 0, 0)",
					mozTransition: "opacity .5s linear ." + interval + "s, -moz-transform .5s ease-out ." + interval + "s",
					webkitTransition: "opacity .5s linear ." + interval + "s, -webkit-transform .5s ease-out ." + interval + "s",
					transition: "opacity .5s linear ." + interval + "s, transform .5s ease-out ." + interval + "s",
				});
			}
		}
	}
}

function mainVisuaImage() {
	$('.p-mv__slider--img').slick({
		dots: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		fade: true,
		cssEase: 'linear'
	});
}

function mainVisuaText() {
	$('.p-mv__slider--txt').slick({
		dots: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		cssEase: 'linear'
	});
	$('.slick-dots').click(function () {
		$('.p-mv__slider--img').slick('slickNext');
	})
}

function coverImg() {
	$('.p-mv__img').each(function () {
		var $sliderItem = $(this), imgUrl = $sliderItem.find('img').prop('src');
		if (imgUrl) {
			$sliderItem.css('backgroundImage', 'url(' + imgUrl + ')').addClass('compat-object-fit');
		}
	});
}

function stickyHeader() {
	$(window).on('scroll', function () {
		if ($(this).scrollTop() >= 2) {
			$('#js-headerFix').addClass('has-bg')
		} else {
			$('#js-headerFix').removeClass('has-bg')
		}
	});
}

function hamburgerMenu() {
	$('#js-menu').click(function () {
		var scrollTop = $(window).scrollTop();
		if ($(this).hasClass('open')) {
			resetHamburgerMenu();
		} else {
			$('#js-showMobile').slideDown().addClass('is-active');
			$(this).addClass('open');
			$('body').addClass('u-hide-scroll');
		}
	});
}

function resetHamburgerMenu() {
	var scrollTop = $(window).scrollTop();
	$('#js-showMobile').slideUp().addClass('is-active');
	$('body').removeClass('u-hide-scroll');
	$('body').css({'position': 'static', 'top': '0'}).scrollTop(scrollTop);
	$('#js-menu').removeClass('open')
}

function validationForm() {
	var jForm = $('#js-intouch');
	var jControls = jForm.find('input,textarea');

	jForm.submit(function () {
		jControls.removeClass('error');

		var jName = $('#jsFormName');
		if (!/[^\s]{2,}/.test(jName.val())) {
			jName.addClass('error');
		}

		var jEmail = $('#jsFormEmail');
		if (!/^[A-Za-z0-9_.-]{2,}@[A-Za-z0-9_-]{2,}\.[A-Za-z0-9]{2,}$/.test(jEmail.val())) {
			jEmail.addClass('error');
		}

		var jMessage = $('#jsFormMessage');
		if (!/[^\s]{5,}/.test(jMessage.val())) {
			jMessage.addClass('error');
		}

		return jControls.filter('.error').length < 1;
	});

	jControls.focus(function () {
		$(this).removeClass('error');
	});
}

function anchorLink() {
	$('.js-anchor').on('click', function (e) {
		e.preventDefault();
		var href = $(this).attr('href');
		if ($(window).innerWidth() <= 768) {
			resetHamburgerMenu();
		}
		$('html, body').animate({
			scrollTop: ($(href).offset().top - $('#js-headerFix').innerHeight())
		}, 500);
	});
}

function showFooterGoIt() {
	var LastScroll = 0;
	$(window).on('scroll', function () {
		var newScrollTop = $(window).scrollTop();
		if (newScrollTop < LastScroll) {
			$('#js-footerGoIt').addClass('is-show')

		} else {
			$('#js-footerGoIt').removeClass('is-show')
		}
		LastScroll = newScrollTop;
	});
	$('#js-GotIt').click(function () {
		$('#js-footerGoIt').remove();
	})
}


