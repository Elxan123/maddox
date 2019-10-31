(function(mercuria, $)
{
	mercuria.events.Move = function(options){
		this.options = $.extend({
			selector: '.move',
			not: ''	
		}, options);	
		
		return this;
	};
	
	// prototype
	var _fn = mercuria.events.Move.prototype;
	
	// prototype methods
	_fn.init = function()
	{
		this.downEvent = {};	
		this.moveEvent = {};
		this.upEvent = {};
		
		$(document).bind('touchstart.skEventMove mousedown.skEventMove', $.proxy(this.mouseDown, this));
	};
	_fn.destroy = function()
	{
		$(document)
			.unbind('touchstart.skEventMove mousedown.skEventMove', $.proxy(this.mouseDown, this))
			.unbind('touchmove.skEventMove mousemove.skEventMove', $.proxy(this.mouseMove, this))
			.unbind('touchend.skEventMove mouseup.skEventMove', $.proxy(this.mouseUp, this))
			.unbind('tap.skEventMove click.skEventMove', $.proxy(this.click, this));
	};
	_fn.getTouches = function(e)
	{
		var originalEvent = e.originalEvent;
		
		if (originalEvent) {
			if (originalEvent.touches && originalEvent.touches.length) {
				return originalEvent.touches;
			} else if (originalEvent.changedTouches && originalEvent.changedTouches.length) {
				return originalEvent.changedTouches;
			}
		}
		return false;	
	};
	_fn.mouseDown = function(e)
	{
		this.$element = $(e.target).closest(this.options.selector);
		this.$not = $(e.target).closest(this.options.not);
		if(this.$element.length == 0 || this.$not.length ) return true;
		this.$target = $(e.target);
		
		this.$element.css({ 'user-select': 'none', '-moz-user-select': 'none', '-webkit-user-select': 'none' }); 
		if($.browser.msie)
		{	
			// zakázat označování textu
			this.$element.get(0).onselectstart = function(){ return false; };
			 // zakázat přetahování obrázku	
			this.$element.get(0).ondragstart = function() { return false; };
		}
		var touches = this.getTouches(e);
		
		// reset 
		this.downEvent = {};	
		this.moveEvent = {};
		this.upEvent = {};

		this.downEvent.pageX = touches ? touches[0].pageX : e.pageX;
		this.downEvent.pageY = touches ? touches[0].pageY : e.pageY;
		this.downEvent.timeStamp = e.timeStamp;
		
		$(document)
			.bind('touchmove.skEventMove mousemove.skEventMove', $.proxy(this.mouseMove, this))
			.bind('touchend.skEventMove mouseup.skEventMove', $.proxy(this.mouseUp, this))
			.bind('tap.skEventMove click.skEventMove', $.proxy(this.click, this));
		
		var tagName = e.target.tagName.toLowerCase();
		if(e.type !== 'touchstart' && tagName !== 'input' && tagName !== 'select' && tagName !== 'textarea'){
			e.preventDefault();
		}
	};
	_fn.mouseMove = function(e)
	{
		var originalEvent = e.originalEvent;
		
		this.moveEvent.pageX = originalEvent.touches ? originalEvent.touches[0].pageX : e.pageX;
		this.moveEvent.pageY = originalEvent.touches ? originalEvent.touches[0].pageY : e.pageY;
		this.moveEvent.deltaX = this.moveEvent.pageX - this.downEvent.pageX;
		this.moveEvent.deltaY = this.moveEvent.pageY - this.downEvent.pageY;
	};
	_fn.mouseUp = function(e)
	{
		var originalEvent = e.originalEvent;
		
		this.upEvent.deltaX = this.moveEvent.pageX - this.downEvent.pageX;
		this.upEvent.deltaY = this.moveEvent.pageY - this.downEvent.pageY;
		// TODO
		//this.upEvent.pageX = originalEvent.touches ? originalEvent.touches[0].pageX : e.pageX;
		//this.upEvent.pageY = originalEvent.touches ? originalEvent.touches[0].pageY : e.pageY;
		
		this.upEvent.delay = e.timeStamp - this.downEvent.timeStamp;
		
		$(document)
			.unbind('touchmove.skEventMove mousemove.skEventMove')
			.unbind('touchend.skEventMove mouseup.skEventMove');
			
	};
	_fn.click = function(e)
	{
		$(document)
			.unbind('tap.skEventMove click.skEventMove');
		
		// prevent click on anchor	
		if( e.target.tagName === 'A' && ( Math.abs(this.upEvent.deltaX) > 2 || Math.abs(this.upEvent.deltaY) > 2 ) )
		{
			e.stopPropagation();
			e.preventDefault();
		}
	};
})(mercuria, jQuery);