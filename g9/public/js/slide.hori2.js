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
			if(!this.options.dirBtn) ||
			this.options.dirBtn.length<2){
				this.options.dirBtnUse = false;
			}
		}
	}
});