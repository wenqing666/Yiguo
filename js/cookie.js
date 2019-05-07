//设置
function setCookie(key,val,expires){
	var d = new Date();
	d.setDate(d.getDate()+expires);

	document.cookie = key+"="+val+";path=/;expires="+d;
}

//删除
function removeCookie(key,val){
	setCookie(key,val,-1)
}


//获取
function getCookie(key){
	var cookie = document.cookie;
	var arr = cookie.split("; ");
	for(var i=0;i<arr.length;i++){
		var newArr = arr[i].split("=");
		if(key == newArr[0]){
			return newArr[1];
		}
	}
}

/*
	正则表达式获取cookie

 */
function getCookieTo2(key){
	var str = document.cookie;
	//var str = 'username=pine; phone=18270837879; address=henan';
	var reg = new RegExp("("+key+")=[^;]+");
	var arr = str.match(reg);
	if(arr){
		return arr[0].split("=")[1]
	}
}