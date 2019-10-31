(function(mercuria, $){

	/*
		Creator:
		27.03.2012 | Michal Matuška

	*/


	mercuria.widgets.Crosshair = function(element, options)
	{
		this.options = $.extend({
			className: '',
			offsetParent: $('body'),
			delay: 0
		}, options)

		this.$area = element.jquery ? element : $(element);

		this.moveTimer = null;
		this.showed = false;
		this.paused = false;
		this.moved = false;
		this.X = 0;
		this.Y = 0;
	};


	// PROTOTYPE
	var _fn = mercuria.widgets.Crosshair.prototype;

	_fn.init = function()
	{
		if( !this.$area || !this.$area.length)
		{
			return this;
		}

		var o = this.options;

		//console.log(o)

		this.$cross = $('<div class="crosshair"><div class="l"></div><div class="r"></div><div class="t"></div><div class="b"></div></div>').addClass(o.className).prependTo('#map-viewport');

		this.getArea();

    var iPadPhone = false;
    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
			iPadPhone = true;
		}

    if(!iPadPhone){
  		$(document)
  			.bind('mousemove', $.proxy(this.handleMove, this));
  
  		this.$area
  			.bind('mouseenter', $.proxy(this.handleEnter, this));
  
  		this.move();
    }
		return this;
	};

	_fn.destroy = function()
	{
		var o = this.options;

		$(document)
			.unbind('mousemove', this.handleMove);

		this.$area
			.unbind('mouseenter', this.handleMove);

		return this;
	};

	_fn.move = function(anim)
	{
		if(!anim)
		{
			this.$cross.css({'top': this.Y, 'left': this.X});
		}
		else
		{
			this.$cross.animate({'top': this.Y, 'left': this.X}, 200);
		}
	};

	_fn.moveTo = function(x, y, anim)
	{
		if( this.test(x, y) )
		{
			this.moveTimer = clearTimeout(this.moveTimer);

			this.X = x - $('#map-viewport').offset().left;
			this.Y = y - $('#map-viewport').offset().top;

			this.show();
			this.move(anim);
		}


	};

	_fn.show = function(e)
	{
		if(!this.showed)
		{
			this.$cross.show();
			this.showed = true;

			this.options.offsetParent.addClass('crosshair-show');
		}
	};

	_fn.hide = function(e)
	{
		if(this.showed)
		{
			this.$cross.hide();
			this.showed = false;

			this.options.offsetParent.addClass('crosshair-hide');
		}
	};

	_fn.pause = function(pause)
	{
		this.paused = pause === undefined ? !this.paused : pause;
	};

	_fn.test = function(x, y)
	{
		return ( x >= this.left && x <= this.right && y >= this.top && y <= this.bottom );
	};

	_fn.handleEnter = function(e)
	{
		e.preventDefault();

		if(!this.paused)
		{
			this.X = e.pageX-$('#map-viewport').offset().left;
			this.Y = e.pageY-$('#map-viewport').offset().top;

			this.show();
			this.move();
		}

		this.moved = true;
	};

	_fn.handleMove = function(e)
	{
		e.preventDefault();

		if(!this.paused && this.moved)
		{
			if( this.test(e.pageX, e.pageY) )
			{
				this.X = e.pageX-$('#map-viewport').offset().left;
				this.Y = e.pageY-$('#map-viewport').offset().top;

				if(!this.options.delay)
				{
					this.show();
					this.move();
				}
				else if(!this.moveTimer)
				{
					this.moveTimer = setTimeout($.proxy(function(){
						this.show();
						this.move();
						this.moveTimer = clearTimeout(this.moveTimer);
					}, this), this.options.delay)
				}
			}
			else
			{
				this.moveTimer = clearTimeout(this.moveTimer);
				this.hide();
				this.moved = false;
			}
		}
	};

	_fn.getArea = function()
	{
		var off = this.$area.offset();
		this.top = this.Y = off.top;
		this.left = this.X = off.left;
		this.bottom = this.top + this.$area.outerHeight();
		this.right = this.left + this.$area.outerWidth();
	};

	_fn.getPosition = function()
	{

		var left = this.X;
		var right = $('#map-viewport').width() - this.X;
		var top = this.Y;
		var bottom = $('#map-viewport').height() - this.Y;

		return {
			'left': left < 0 ? 0 : left,
			'right': right < 0 ? 0 : right,
			'top': top < 0 ? 0 : top,
			'bottom': bottom < 0 ? 0 : bottom
		}
	};

})(mercuria, jQuery);
