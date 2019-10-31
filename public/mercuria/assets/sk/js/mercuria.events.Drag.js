(function(mercuria, $)
{
	mercuria.events.Drag = function(options){
		mercuria.events.Move.call(this, options);
		this.options = $.extend({ 
			selector: '.drag', 
			not: ''
		}, options);	
		
		return this;
	};
	
	mercuria.extend(mercuria.events.Drag, mercuria.events.Move);
	
	// prototype
	var _fn = mercuria.events.Drag.prototype;
	var _sp = mercuria.events.Drag._super;
	
	// prototype methods
	_fn.mouseDown = function(e)
	{
		_sp.mouseDown.call(this, e);
		if(this.$element.length == 0  || this.$not.length)  return true;
		
		this.draging = -1;
		
		var dragstart = jQuery.Event("dragstart", {
			pageX: this.downEvent.pageX, 
			pageY: this.downEvent.pageY
		});
		this.$target.trigger(dragstart);
	};
	_fn.mouseMove = function(e)
	{
		_sp.mouseMove.call(this, e);

		e.preventDefault();
	   
		var dragmove = jQuery.Event("dragmove", {
			pageX: this.moveEvent.pageX, 
			pageY: this.moveEvent.pageY,
			deltaX: this.moveEvent.deltaX,
			deltaY: this.moveEvent.deltaY
		});
		this.$target.trigger(dragmove); 
		
		this.draging = 1;
		
	};
	_fn.mouseUp = function(e)
	{
		_sp.mouseUp.call(this, e);	
		
		this.upEvent.distance = Math.abs(this.upEvent.deltaX);
		
		if(this.draging === 1)
		{
			var dragend = jQuery.Event("dragend", {
				pageX: this.upEvent.pageX, 
				pageY: this.upEvent.pageY,
				deltaX: this.upEvent.deltaX,
				deltaY: this.upEvent.deltaY,
				delay: this.upEvent.delay, 
				distance: this.upEvent.distance 
			});
			this.$target.trigger(dragend);
		}
		else
		{
			this.$target.trigger('dragcancel');	
		}
		
	};
})(mercuria, jQuery);