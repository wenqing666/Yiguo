//获取非行间样式
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr]
	}
}

//运动框架
function move(obj,json,fn){
	//防止多次点击   关闭掉上一个定时器
	clearInterval(obj.timer);
	//开启定时器  obj.timer:防止多个对象抢定时器
	obj.timer = setInterval(function(){
		var bStop = true;
		for(var attr in json){
			var iCur = 0;
			if(attr == "opacity"){
				iCur = parseInt(getStyle(obj,attr)*100);
			}else{
				iCur = parseInt(getStyle(obj,attr));
			}
			//算速度
			var speed = (json[attr] - iCur)/8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);

			/*判断是否都已经到达终点 只要有一个没有到达终点就将bStop为false  循环完毕以后判断bstop来决定关闭定时器*/
			if(json[attr] !=iCur){
				bStop = false;
			}
			if(attr == "opacity"){
				//透明度的兼容性
				obj.style.opacity = (iCur+speed)/100;
				obj.style.filter = "alpha(opacity:"+(iCur+speed)+")";
			}else{
				obj.style[attr] = (iCur+speed)+"px";
			}
		}
		//当循环完毕以后 判断bStop的状态来决定是否关闭定时器
		if(bStop){
			clearInterval(obj.timer);
			//链式操作
			fn&&fn();
		}

	},30)
}