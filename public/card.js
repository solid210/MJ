function Card(option) {
	this.x = option.x;
	this.y = option.y;
	this.width = 60;
	this.height = 80;
	this.name = option.name;
	this.card_id = option.card_id;
	this.card_view = new createjs.Container();
	this.card_view.x = option.x;
	this.card_view.y = option.y;
	this.bg=new createjs.Shape();
	this.txt=option.txt;
	var str=" "+option.txt;
	this.text=new createjs.Text(str,"14px Microsoft Yahei", "#ff7000");
	//text 换行需要在文本中加入空格
	this.text.lineWidth = this.width;
	this.text.y=10;
	this.text.visible=false;
	this.card_view.addChild(this.bg);
	this.card_view.addChild(this.text);
	this.side=option.side;
	this.draw();
	this.bindEvent();
}
//用于获取card信息初始化
Card.prototype.getInfo=function(){
	var obj={
		x:this.x,
		y:this.y,
		txt:this.txt,
		card_id:this.card_id,
		name:this.name,
		side:this.side,
	}
	return obj;
}
Card.prototype.bindEvent = function() {
	var self = this;
	this.card_view.addEventListener('click',function(event){
		socket.emit('throw',{card_name:self.txt});
		Global.table.getCardFromPlayer(self);
	});
	this.card_view.addEventListener('rollover', function(event) {
		if(self.side==1){
			createjs.Tween.get(self.card_view).to({
				y: self.y-10},100
			);
		}
		
	});
	this.card_view.addEventListener('rollout',function(event){
		if(self.side==1){
			createjs.Tween.get(self.card_view).to({
			y: self.y},100);
		}
	});
}
Card.prototype.draw = function() {
	this.bg.graphics.clear();
	if (this.side == 1) { //正面
		this.bg.graphics.beginStroke("#000").drawRect(0, 0, this.width, this.height);
		this.bg.graphics.beginFill("#fff").drawRect(1, 1, this.width - 1, this.height - 1);
		this.text.visible=true;
	} else if (this.side == 2) { //反面
		this.bg.graphics.beginStroke('#000').drawRect(0, 0, this.width, this.height);
		this.bg.graphics.beginFill("#f00").drawRect(1, 1, this.width - 1, this.height - 1);
		this.text.visible=false;
	}

}