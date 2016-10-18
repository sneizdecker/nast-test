$(document).ready(function() {
	$('#slider').slick({
		slide: '.slider__item',
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '13%',
		arrows: true,
		appendArrows: '.slider',
		prevArrow: '<button type="button" class="slider-prev"></button>',
		nextArrow: '<button type="button" class="slider-next"></button>'
	});
});
