var mercuria = window.mercuria = {
	base: {},
	utils: {},
	widgets: {},
	events: {}
};

mercuria.extend = function(child, parent) {
	var F = function(){};
	F.prototype = parent.prototype;
	child.prototype = new F();
	child._super =  parent.prototype;
	child.prototype.constructor = child;
};
