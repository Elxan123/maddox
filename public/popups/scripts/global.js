$(document).ready(function(){

	if ($(".easy-form").length) {
		$(".easy-form").fancybox({
			minWidth	: 422,
			maxWidth	: 422,
			padding 	: 15,
			scrolling 	: 'no',
			fitToView	: false,
			autoSize	: $('body').hasClass('iphone') ? true : false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}

  	if ($(".easy-form-big-departments").length) {
		$(".easy-form-big-departments").fancybox({
			minWidth	: 900,
			maxWidth	: 900,
			maxHeight	: 580,
			padding 	: 15,
			scrolling 	: 'auto',
			fitToView	: false,
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}

	if ($(".easy-form-big").length) {
		$(".easy-form-big").fancybox({
			minWidth	: 822,
			maxWidth	: 822,
			maxHeight	: 580,
			padding 	: 15,
			scrolling 	: 'no',
			fitToView	: false,
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}

	if ($(".easy-document").length) {
		$(".easy-document").fancybox({
			minWidth	: 822,
			maxWidth	: 822,
			minHeight	: 620,
			maxHeight	: 620,
			padding 	: 15,
			wrapCSS    	: 'fancybox-video',
			scrolling 	: 'no',
			fitToView	: false,
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}

	if ($(".easy-video").length) {
		$(".easy-video").fancybox({
			minWidth	: 822,
			maxWidth	: 822,
			maxHeight	: 560,
			padding 	: 15,
			wrapCSS    	: 'fancybox-video',
			scrolling 	: 'no',
			fitToView	: false,
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}

	if ($(".content-popup").length) {
		$(".content-popup").fancybox({
			padding 	: 0,
			scrolling 	: 'no',
			autoDimensions : true,
			fitToView	: false,
			autoSize	: true,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}



	if ($(".selectbox").length) {


  		var clicks = 1;

	  	$('.selectbox').selectbox({debug: false}).change(function(){

		});
	}






});
