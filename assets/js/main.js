(function (window, document, $) {
	'use strict';

	// Variables
	var _window = $(window),
		_document = $(document),
		_body = $('body');

	// SMOOTHSCROLL
	var smoothScroll = function (e) {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			var $f = target.offset().top,
				$g = $f - 40,
				$y;
			if (target.length) {
				$('#section-featured_work').is(target) ? $y = $g : $y = $f;
				$('html, body').animate({
					scrollTop: $y
				}, 1000, 'easeInOutExpo');
				return !1;
			}
		}
	};
	_document.on('click', '.page-scroll', smoothScroll);

	// ScrollSpy
	var _scrollSpy = function () {
		var hash = function (h) {
			if (history.pushState) {
				history.pushState(null, null, h);
			} else {
				location.hash = h;
			}
		};
		_document.on('click', 'a', function (event) {
			var _refVal = $(this).attr("href");
			if ($(this).attr('href') !== "#" && $(this).attr('href').indexOf("#") > -1 && $(_refVal).length) {
				event.preventDefault();
				$("html, body").animate({
					scrollTop: $(_refVal).offset().top - 30
				}, {
					duration: 700,
					easing: "easeInOutExpo",
					complete: hash(_refVal)
				});
				$("section").removeClass('active');
				$(_refVal).addClass('active');
			}
		});
	}

	// Stick to Top
	var stickToTop = function () {
		var _sideNav = $('.sidebar-navigation'),
			_backToTop = $('.back-to-top');
		_window.on('scroll', function () {
			if (_window.scrollTop() > 200) {
				_sideNav.addClass('stick-to-top');
				_backToTop.addClass('show');
			} else {
				_sideNav.removeClass('stick-to-top');
				_backToTop.removeClass('show');
			}
		});
	}

	// Search Filter
	_document.on("keyup", ".search-input", function () {
		var value = $(this).val().toLowerCase();
		$(".sidebar-navigation ol *").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		});
	});

	// Toggle Navbar
	_document.on('click', '.toggle-navbar', function (e) {
		$('.sidebar-navigation').toggleClass('show');
	});

	// Hide Navbar on Click Outside
	_document.on('click', function (e) {
		if (!$('.sidebar-navigation *').is(e.target) && !$('.toggle-navbar *').is(e.target)) {
			$('.sidebar-navigation').removeClass('show');
		}
	});

	// Back To Top
	function backToTop() {
		var o = $("body").width();
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$(".back-to-top").fadeIn();
			} else {
				$(".back-to-top").fadeOut();
			}
		});
		$(".back-to-top").on('click', function () {
			$("html, body").animate({ scrollTop: 0 }, 700);
			return !1;
		});
		if (o > 450) {
			$(".back-to-top").addClass('animation-shadow-pulse');
		}
	}

	// Perfect Scrollbar
	if ($('.perfect-scrollbar').length) {
		var containers = document.querySelectorAll('.perfect-scrollbar');
		new PerfectScrollbar(containers[0]);
		new PerfectScrollbar(containers[1]);
	}

	// 🖼️ LightGallery Integration
	document.addEventListener("DOMContentLoaded", function () {
		if (document.getElementById('gallery')) {
			lightGallery(document.getElementById('gallery'), {
				plugins: [lgThumbnail, lgZoom, lgFullscreen, lgRotate, lgAutoplay],
				mode: 'lg-fade',
				thumbnail: true,
				zoom: true,
				fullScreen: true,
				rotate: true,
				autoplay: true,
				autoplayControls: true,
				download: true
			});
		}
	});


	// Initialize Functions
	_scrollSpy();
	stickToTop();
	backToTop();
	// initLightGallery();

})(window, document, jQuery);
