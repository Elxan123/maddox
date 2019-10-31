$(document).ready(function()
{

 // if(navigator.userAgent.match(/iPad/i) != null){
  //  $('#body').css('background-color', 'red');
 // }

/* inpage navigation - 'i.e. about us subpages 'topics' */
  //init
  $('#backtotop').hide();
  var inpageNavTopOffset = $('.highlight').height()+ 104 + $('.map-wrapper').height()+ $('.content h1').height() - 32;

 /*
   console.log('vyska subtitle '+ $('.highlight').height());
   console.log('vyska obrazku '+ $('.map-wrapper').height());
   console.log('vyska nadpisu '+ $('.content h1').height());
   console.log('vsetko spocitana spolu '+ ($('.highlight').height()+ 104 + $('.map-wrapper').height()+ $('.content h1').height()));
   console.log('vyska realna '+ $('.content .column.fr.float .topics').offset().top);
   */

 /*  TYTO DVA RADKY VADILY VSEM IE
   console.log('vsetko spocitana spolu '+ ($('.highlight').height()+ 104 + $('.map-wrapper').height()+ $('.content h1').height()));
   console.log('vyska realna '+ $('.topics').offset().top);
   */

  $(window).scroll(function(){
		fixInpageNav();
	});

  if($('.content .column.fr.float .topics').length){
   // console.log("highlight: "+$('.column.fl').offset().top);
    var topicOffetTop = $('.content .column.fr.float .topics').offset().top - 124;
  }
  
  function fixInpageNav(){
    
    if(!topicOffetTop) return;

   // console.log("box: "+rightBoxOfset.top);
   //	console.log("scrollTop: "+topicOffetTop);
   //	console.log("inpageNavTopOffset: "+inpageNavTopOffset);
   	
   if (navigator.userAgent.match(/iPhone/i) != null  || navigator.userAgent.match(/iPad/i) != null) {

   } else {
      if($(this).scrollTop() > topicOffetTop){
        $('.content .column.fr.float .topics').addClass('fixed');
       // $('.content .column.fr.float .topics').css('top', $('.highlight').height()+28);
      	$('#backtotop').show();
      }else{
        $('.content .column.fr.float .topics').removeClass('fixed');
    	  $('#backtotop').hide();
    	}
    }
  }

  /*
  If the window size is too small, set sidebar position to relative
  */
  function unFixingSidebar() {

    var headerHeight = $('.header').outerHeight(false);
    var sidebarHeight = $('.sidebar').outerHeight(false);

    if ($(window).height() < headerHeight + sidebarHeight) {
      $('.sidebar').css('position', 'relative');
      $('.sidebar').css('margin', '104px 0 0 0');
    } else {
      $('.sidebar').css('position', 'fixed');
      $('.sidebar').css('margin', '104px 0 0 744px');
      $('.ie7 .sidebar, .ie6 .sidebar').css('margin', '104px 0 0 0');
    }

  }
  /*
  Crop the homepage background image according to the height of the window
  */
  function cropBgHomeImage() {
    /*
     if($('body').hasClass('home')) {

      var IMAGE_HEIGHT = 752;
      var FOOTER_DISTANCE = 30;

      var headerHeight = $('.home .header').outerHeight(false);
      var contentHeight = $('.home #content').height();
      var sidebarHeight = $('.home .sidebar').outerHeight(false);
      contentHeight =  (sidebarHeight > contentHeight) ? sidebarHeight : contentHeight;
      var maxHeight = IMAGE_HEIGHT + headerHeight;
      var newHeight = $(window).height() - $('.home .footer').outerHeight(false);

      if(newHeight >= maxHeight) {
        newHeight = maxHeight;
      } else if(newHeight - FOOTER_DISTANCE < contentHeight + headerHeight){
            newHeight = contentHeight + headerHeight + FOOTER_DISTANCE;
      }

      $('.home .wrapAll').css('height', newHeight);
      $('.home .footer').css('top', newHeight);
     }
     */
  }

   // $('.footer').css('top','650');

  function setHomeSlider(){

   if($('body').hasClass('home')){



    /* jim */
    
    var isCurrentlyShowingImageTweenFader = $('.home .bgImageTweenfader').css('opacity')>0;
    var currentCssBgImage = isCurrentlyShowingImageTweenFader ? $('.home .bgImageTweenfader').css('background-image') : $('.home .homebg').css('background-image');
    //console.log('isCurrentlyShowingImageTweenFader: '+isCurrentlyShowingImageTweenFader);
    
    /* end jim */
    
    
    
    
   $('.home .homebg').empty();

   var defaultSize = "S";
    $('.footer').css('top','770px');
   
   var imagesPath = "http://www.mercuria.com/sites/all/themes/mercuria/assets/img/homepage-backgrounds-new/";
   //if($('.home').width() > 1538) {
   if($(window).height() > 703) {
    defaultSize = "M";
    $('.footer').css('top','820px');
   }
   //if($('.home').width() > 1646) {
   if($(window).height() > 752) {
    defaultSize = "";
    $('.footer').css('top','869px');
   }
   var homeImages = [0,1,2,3];
    homeImages[0] = [imagesPath+'homepage-background_2'+defaultSize+'.jpg', imagesPath+'homepage-background_1'+defaultSize+'.jpg', imagesPath+'homepage-background_4'+defaultSize+'.jpg', imagesPath+'homepage-background_5'+defaultSize+'.jpg', imagesPath+'homepage-background_3'+defaultSize+'.jpg'];
    homeImages[1] = [imagesPath+'homepage-background_1'+defaultSize+'.jpg', imagesPath+'homepage-background_4'+defaultSize+'.jpg', imagesPath+'homepage-background_5'+defaultSize+'.jpg', imagesPath+'homepage-background_3'+defaultSize+'.jpg',  imagesPath+'homepage-background_2'+defaultSize+'.jpg'];
    homeImages[2] = [imagesPath+'homepage-background_4'+defaultSize+'.jpg', imagesPath+'homepage-background_5'+defaultSize+'.jpg',imagesPath+'homepage-background_3'+defaultSize+'.jpg',  imagesPath+'homepage-background_2'+defaultSize+'.jpg', imagesPath+'homepage-background_1'+defaultSize+'.jpg'];
    homeImages[3] = [imagesPath+'homepage-background_5'+defaultSize+'.jpg',imagesPath+'homepage-background_3'+defaultSize+'.jpg',  imagesPath+'homepage-background_2'+defaultSize+'.jpg', imagesPath+'homepage-background_1'+defaultSize+'.jpg', imagesPath+'homepage-background_4'+defaultSize+'.jpg'];


    homeImages.sort(function() { return 0.5 - Math.random() });
    
    /* jim */
    
    var enableCleverResizing = false;
    
    if(enableCleverResizing) {
	    var currentBgImageUrl = currentCssBgImage.substring(4, currentCssBgImage.lastIndexOf('_')+2);
	    //console.log('old url: '+currentBgImageUrl);
	    
	    try {
			var indexSearch = homeImages[0].indexOf(currentBgImageUrl+defaultSize+'.jpg');
		} catch(err) {
			var indexSearch = 0;
		}
		
	    if(indexSearch>-1) {
	    	homeImages[0].splice(indexSearch,1);
	    	homeImages[0].unshift(currentBgImageUrl+defaultSize+'.jpg');
	    	$('.home .homebg').css('background', 'url('+currentBgImageUrl+defaultSize+'.jpg) no-repeat 50%');
	    	//console.log('set homebg to: '+homeImages[0][0]);
	    	
	    } else {
		    $('.home .homebg').css('background', 'url('+imagesPath+'homepage-background_2'+defaultSize+'.jpg) no-repeat 50%');
		}
	} else {
	    $('.home .homebg').css('background', 'url('+imagesPath+'homepage-background_2'+defaultSize+'.jpg) no-repeat 50%');
	}
  	//console.log(imagesPath+'home-background_1'+defaultSize+'.jpg');
	
    /* end jim */

	
    var showtime = 3000;
    var transitiontime = 2000;
    $('.home .homebg').bgImageTween(homeImages[0], showtime, transitiontime );
   }

  }
	
	function setupScreen(){
	    cropBgHomeImage();
	    unFixingSidebar();
	    setHomeSlider();
	}
    
	setupScreen()

	function throttle(method, scope) {
	    clearTimeout(method._tId);
	    method._tId= setTimeout(function(){
	        method.call(scope);
	    }, 500);
	}
	
	window.onresize = function(){
	    throttle(setupScreen, window);
	};
	
	


  // SCROLLBAR    - global assets finder!!
	var pane = $('.scroll-pane');
  pane.jScrollPane({showArrows: true});
  var api = pane.data('jsp');
  /*pane.swipe({
      triggerOnTouchEnd : true,
      click:function(event, target){
        $(target).trigger('click');
      },
      swipeStatus : function(event, phase, direction, distance)
      {
        if (phase == "move") {
          if (direction == "up")
          {
            api.scrollBy(0, -distance);
          }
          else if (direction == "down")
          {
            api.scrollBy(0, distance);
          }
          console.log(distance);
        }
      },
      allowPageScroll:"vertical",
      threshold:75
    })*/

  /************************* old stuff **************************/


 //

  $('#backtotop').click(function(){
   // $('#dd_assets ul').animate({height: 0}, 'fast');
	//$('#dd_assets .active').removeClass('active');
	//$(this).parent().find('.active').removeClass('active');

  })


  /*
	if(window.location.hash){
		var id = window.location.hash;

		if($(id + '_item').html() != null){

			$.scrollTo(id + '_item',1000, {offset:-255});
		console.log("hovno");


			$(id + '_link').closest('ul').prev().click();
		}

	}
  */

  //navigation
	$("ul.nav>li")
		.bind('mouseenter', function(e)
		{
			//console.log(e.relatedTarget);
	        if(e.relatedTarget && $(e.relatedTarget).closest('.nav').length)
	        {
				$(this).addClass("hover");
				$('>.subnav',this).css('visibility', 'visible');
	        }
	    })

	    .bind('mouseleave', function(e)
	    {
			$(this).removeClass("hover");
			$('>.subnav',this).css('visibility', 'hidden');
      	});









	var timeoutedscroll;
	var rightBoxOfset = $('.column.fr.float').offset();



});


(function( $ ){
  $.fn.bgImageTween = function(images, staytime, fadetime) {
    $(this).wrapInner('<div class="bgImageTweenfaderContent"></div>');
    var content = $('.bgImageTweenfaderContent', this);
    $(this).prepend('<div class="bgImageTweenfader"></div>');
    var fader = $('.bgImageTweenfader', this);

    content.css('position', 'absolute');
    fader.css('position', 'absolute');
    fader.css('width', $(this).width() );
    fader.css('height', $(this).height() );
    fader.css('opacity', 0);
    
    content.css('top', '0');
    fader.css('top', '0');
    
    
    //fader.css('border', '3px solid red');
    //$(this).css('border', '3px solid green');

  

    n = images.shift(); images.push(n);
    $(this).css('backgroundImage', 'url('+n+')');
    $(this).css('backgroundPosition', 'center top');
    n= images.shift(); images.push(n);
    fader.css('backgroundImage', 'url('+n+')');
    fader.css('backgroundPosition', 'center top');

    function switcher() {
      fader.delay(staytime);
      fader.animate({opacity: 1},fadetime);
      fader.queue(function(){
        n = images.shift(); images.push(n);
        fader.parent().css('backgroundImage', 'url('+n+")");
        $(this).dequeue();
      });
      fader.delay(staytime);
      fader.animate({opacity: 0},fadetime);
      fader.queue(function(){
        n = images.shift(); images.push(n);
        fader.css('backgroundImage', 'url('+n+")", switcher() );
        $(this).dequeue();
      });
    };
    switcher();
  };

//widow words

$('.homepage-highlight').widont();
$('.item').widont();
$('.highlight').widont();
                   
})( jQuery );
