$(function(){
	$('#map').each(function()
	{
		var $holder = $(this);
		var $map = $holder.find('#map-viewport');
		var $canvas = $holder.find('#map-canvas');

		var X = 0;
		var Y = 0;
		var minY = 0;
		var maxY = 0;
		var hidden = $holder.parent().hasClass('maphide');
		var zoomed = false;
		var width = $map.width();

		var popupOpen = false;
		var iPadPhone = false;

		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
			iPadPhone = true;
		}

		// CROSSHAIR
		var crosshair = new mercuria.widgets.Crosshair($map, {
			className: 'map-crosshair',
			offsetParent: $('.wrapAll')
		}).init();

		// MAP DRAG
		var dragEvent = new mercuria.events.Drag({
			selector: '#map-canvas',
			not: '.point'
		}).init();
		$map
			// Open popup method
			.delegate('.point', 'popupOpen', function()
			{
				var $point = $(this);
				var $bubble = $point.addClass('popup-open').find('.bubble');
				var height = $bubble.outerHeight() + 12;

				var space = crosshair.getPosition();

				space.right < 312 && $point.addClass('popup-left');
				space.bottom < height && $point.addClass('popup-top');

				$bubble.fadeTo(500, 1);

				var	id = this.id;

				$('[data-point-id="'+id+'"]').addClass('active');



			})
			// Close popup method
			.delegate('.point', 'popupClose', function()
			{
				$(this)
					.removeClass('popup-open popup-left popup-top')
					.find('.bubble')
						.stop(true, true)
						.css('opacity', 0);

				var	id = this.id;
				$('[data-point-id="'+id+'"]').removeClass('active');

        
				if(iPadPhone){
					crosshair.hide();
				}


			})


		if(!iPadPhone){
			$map
				// Dot over - crosshair aim and lock
				.delegate('.control', 'mouseenter', function()
				{
					if(!popupOpen)
					{
						var off	= $(this).offset();
						crosshair.moveTo(off.left+10, off.top+10);
						crosshair.pause(true);
					}

				})
				// Dot out - crosshair unlock
				.delegate('.control', 'mouseleave', function()
				{
					if(!popupOpen)
					{
						crosshair.pause(false);
					}

				})
		}

		// Open popup and close others
		$map
			.delegate('.control', 'click touchstart', function(e)
			{
				e.preventDefault();
         
				if(!$(this).parent().hasClass('popup-open'))
				{
					var anim = !!$map.find('.popup-open').trigger('popupClose').length;

          if(iPadPhone){
  					crosshair.show();
	   			}


					var off	= $(this).offset();
					crosshair.moveTo(off.left+10, off.top+10, anim);

					$(this).trigger('popupOpen');

					crosshair.pause(true);

					popupOpen = true;

				}

			})
			// Close poupu with X
			.delegate('.close', 'click touchstart', function(e)
			{
				e.preventDefault();

				if(popupOpen)
				{
					$(this).trigger('popupClose');

					popupOpen = false;
          
					crosshair.moveTo(e.pageX, e.pageY);
					crosshair.pause(false);
					
					if(iPadPhone){
  					crosshair.hide();
	   			} 
				}

			})
			// WordPress EDIT
			.delegate('.editlink', 'click', function(e)
			{
				var nid = $(this).att('nid');
				window.location = "./node/"+nid+"/edit";
				e.stopPropagation();

			})
			// WordPress DELETE
			.delegate('.deletelink', 'click', function(e)
			{
				var nid = $(this).attr('nid');
				window.location = "./node/"+nid+"/delete";
				e.stopPropagation();

			})
			// Control is hash on the same url
			.delegate('.clickable', 'click', function(e)
			{
				var hash = $(this).prop('hash').slice(1);

				if(hash && $('#' + hash + '_item').length)
				{
					// reset
					crosshair.hide();
					$(this).trigger('popupClose');

					// scroll
					$.scrollTo('#' + hash + '_item')

					// active side fixed menu
					var h2 = $('#' + hash + '_link').closest('ul').prev();
					!h2.is('.active') && h2.click();

					e.preventDefault();
				}

				e.stopPropagation();

			})

		$holder
			.bind('hide', function(e)
			{
				// reset
				$('.popup-open').trigger('popupClose');
				crosshair.pause(false);
				crosshair.hide();
				$canvas.css({'top':'', 'left':''});

				$holder.slideUp();

				hidden = true;

			})
			.bind('show', function(e)
			{
				$holder.slideDown().triggerHandler('crosshairAreaUpdate');

				hidden = false;

			})
			.bind('setAsset', function(e)
			{
				$holder.addClass('highlight-asset');
				$('.assetsOnlySwitch').addClass('active');


			})
			.bind('setOffice', function(e)
			{
				$holder.addClass('highlight-office');
				$('.officesOnlySwitch').addClass('active');

			})
			.bind('toggleZoom', function(){

				// reset
				$('.popup-open').trigger('popupClose');
				crosshair.pause(false);
				crosshair.hide();
				$canvas.css({'top':'', 'left':''});

				$holder.toggleClass('zoom');
				$('.zoomButton').toggleClass('active');
				zoomed = !zoomed;

				if(zoomed)
				{
					$('.zoomButton').text('Zoom out');
					$('.point').each(function(index) {
							var l = parseFloat($(this).data('left'));
							$(this).css('left', l/3 + '%');
					});
				}
				else
				{
					$('.zoomButton').text('Zoom in');
					$('.point').each(function(index) {
							var l = parseFloat($(this).data('left'));
							$(this).css('left', l + '%');
					});
				}

				maxY = $map.height() - $canvas.height();


			})
			.bind('crosshairAreaUpdate', function(e)
			{
				crosshair.getArea();

			});


		// drag
		$canvas
			.bind('dragstart', function(e)
			{
				if(zoomed)
				{
					$('.popup-open').trigger('popupClose');
					crosshair.pause(false);

					X = parseInt($(this).css('left'),10) || 0;
					Y = parseInt($(this).css('top'),10) || 0;
				}

			})
			.bind('dragmove', function(e)
			{
				if(zoomed)
				{
					var y = (Y + e.deltaY);
						y = (y > minY) ? minY : (y < maxY) ? maxY : y;
					var x = X + e.deltaX;

					var maxDelta = 4320 + x;
					var minDelta = 2160 - width + x;

					if(maxDelta < 0)
					{
						$(this).css('left', -2160 + maxDelta);
						return;
					}

					if(minDelta > 0)
					{
						$(this).css('left', -4320 + width + minDelta);
						return;
					}

					$(this).css({'top': y, 'left': x})
				}

			});



		var $mapHighlightElement = null;
		$(document)
			// highlightting
			.delegate('.assetsOnlySwitch', 'click', function(e)
			{
				$holder.toggleClass('highlight-asset');
				$('.assetsOnlySwitch').toggleClass('active');

				e.preventDefault();

			})
			.delegate('.officesOnlySwitch', 'click', function(e)
			{
				$holder.toggleClass('highlight-office');
				$('.officesOnlySwitch').toggleClass('active');

				e.preventDefault();

			})
			.delegate('.dayNightSwitch', 'click', function(e)
			{
				$holder.toggleClass('night');
				$('.dayNightSwitch').toggleClass('active');

				e.preventDefault();

			})
			// show / hide
			.delegate('.hidebutton', 'click', function(e)
			{
				$holder.triggerHandler('hide');

				e.preventDefault();

			})
			.delegate('.showbutton', 'click', function(e)
			{
				$holder.triggerHandler('show');

				e.preventDefault();

			})
			// zoom
			.delegate('.zoomButton', 'click', function(e)
			{
				$holder.triggerHandler('toggleZoom');

				e.preventDefault();

			})
			.delegate('#europe-map', 'click', function(e)
			{
				!zoomed && $holder.triggerHandler('toggleZoom');

				e.preventDefault();

			})


			// triggering
			.delegate('.trigger-point', 'click', function(e)
			{
				hidden && $holder.triggerHandler('show');
				zoomed && $holder.triggerHandler('toggleZoom');

				$mapHighlightElement.first().find('.control').trigger('click');
				e.preventDefault();

			})
			.delegate('.trigger-point', 'mouseenter', function(e)
			{
				var id = $(this).data('point-id');
				$mapHighlightElement = $('#'+id).addClass('highlight');

			})
			.delegate('.trigger-point', 'mouseleave', function(e)
			{
				$mapHighlightElement.removeClass('highlight');
				$mapHighlightElement = null;

			});


		// right select asset
		$("#rightColumnProductSelect").change(function()
		{
			$holder.triggerHandler('setAsset')
			$holder.triggerHandler('show');
			$('.popup-open').trigger('popupClose');
			crosshair.pause(false);
			crosshair.hide();

	        var val = $(this).val();
	        var continentItems = 0;
	        var currentContinent = false;
	        var arr = [];

	        $('.mapNodesRightColumn').each(function(){

	          	if($(this).is('.title'))
	          	{
	          		if(currentContinent)
	          		{
		          		if(continentItems == 0)
							currentContinent.hide();
						else
				    	    currentContinent.show();
				    }

				    continentItems = 0;
				    currentContinent = $(this);
	          	}
	          	else
	          	{
		            if($(this).attr("type").indexOf(val) >= 0 || val == "all")
		            {
						$(this).css('display','block');
						arr.push($(this).data('point-id'));
						continentItems++;
		            }
		            else
		            {
		              $(this).css('display','none');
		            }
	            }


	          });

	        if(continentItems == 0)
			    currentContinent.hide();
		   	else
			  	currentContinent.show();

			if(val === 'all')
			{
				$('.type-asset')
					.addClass('typed');
			}
			else if(arr.length)
			{
				$('.type-asset')
					.removeClass('typed')
					.filter('#'+arr.join(', #'))
					.addClass('typed');
			}
			else
			{
				$('.type-asset').removeClass('typed');
			}

	        var jsp = $('#mapSidebar .scroll-pane').data('jsp');
	        jsp && jsp.reinitialise();


		})
		//.triggerHandler('change');


	});
});