var SlideHori = (function(){
	function SlideHori(container, slides, options) {
		var obj = this;
		this.container = container;
		this.slides =slides;
		if(options){
			this.options = options;
			if(!this.options.delay)
			this.options.delay = 2000;
			if(!this.options.speed)
			this.options.speed = 500;
			if(!this.options.dir) this.options.dir = -1;
			if(!this.options.dirBtn) || this.options.dirBtn.length<2){
				this.options.dirBtnUse = false;
			}
		}
		else{
			this.options = {
				delay: 2000,
				speed: 500,
				dir: -1,
				dirBtnUse: false
			}
		}
		this.now = 0;
		this.end = this.slides.length - 1;
		this.init(obj);
		this.interval = setInterval(this.ani, this.options.delay, obj);
		if(this.options.dirBtnUse === true){
			this.options.dirBtn[0].click(function(){
				obj.options.dir = 1;
				obj.ani(obj);
				obj.interval = setInterval(obj.ani, obj.options.delay, obj);
			});
		}
		this.container.mouseenter(function(){
			clearInterval(obj.interval);
		});
		this.container.mouseleave(function(){
			clearInterval(obj.interval);
			obj.interval = setInterval(obj.ani, obj.options.delay, obj);
		});
	}
	SlideHori.prototype.init = function(obj){
		obj.container.css({"left":0});
		obj.slides.hide(0);
		obj.slides.eq(obj.now).css({"left":0}).show(0);
		if(obj.now == 0){
			obj.slides.eq(obj.end)({"left":"-100%"}).show(0);
			obj.slides.eq(obj.now+1).css({"left":"100%"}).show(0);
		}
		else if(obj.now == obj.end){
			obj.slides.eq
		}
	}

});