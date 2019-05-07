//导航
var oCat = document.getElementById("catalogs")
var oNav = document.getElementById("nav");
var aLi1 = oNav.querySelectorAll("#nav>li");
oCat.onmouseover = function(){
	oNav.style.display="block";
	for(var i=0;i<aLi1.length;i++){
		aLi1[i].onmouseover = function() {
			 var a = this.children[1];
		 	 a.className ="active";
			 var ul = this.children[2];
			 ul.style.display = "block";

			 var aA = ul.children[1].children;
			 for(var k = 0;k<aA.length;k++){
		 	aA[k].onmouseover = function(){
		 		this.className = "active";
		 	}
		 }
		}
		aLi1[i].onmouseout = function() {
			 var a = this.children[1];
		 	 a.className ="";
			 var ul = this.children[2];
			 if(ul){
			 	ul.style.display = "none";
			 	var aA = ul.children[1].children;
			 	for(var k = 0;k<aA.length;k++){
			 	aA[k].className = "";
				}
			}
		}
	}
}
oCat.onmouseout = function(){
	if(oNav){
		oNav.style.display="none";
	}
}



//轮播图
var oBanner = document.getElementById("banner-slider");
var oUl = document.getElementById("b-slider");
var aLi = oUl.getElementsByTagName("li");
var aDir = document.querySelectorAll("#dir>a");
var aBtn = document.querySelectorAll("#btn>a");
var iNow = 0;
var iWidth = aLi[0].offsetWidth;
//复制一个li为第一个li
var li = aLi[0].cloneNode(true);
//插入尾部
oUl.appendChild(li);
//设置ul的宽度
oUl.style.width = iWidth * aLi.length+"px";
var timer = null;

//鼠标移入  切换图片
for(var i=0;i<aBtn.length;i++){
	aBtn[i].index = i;
	aBtn[i].onmouseover = function(){
		for(var j=0;j<aBtn.length;j++){
			aBtn[j].className = ""
		}
		this.className = "active";
		iNow = this.index;
		toImg();
	}
}

//点击左边按钮切换到倒数第二张图
aDir[0].onclick = function(){
	if(iNow == 0){
		iNow = aLi.length-2;
		oUl.style.left = -(aLi.length-1)*aLi[0].offsetWidth+"px";

	}else{
		iNow--;
	}

	toImg();

}

aDir[1].onclick = function(){
	if(iNow == aLi.length-1){
		iNow = 1;
		oUl.style.left = 0;
	}else{
		iNow++;
	}

	toImg();
}
//鼠标移入停止轮播 移出继续轮播
oBanner.onmouseover = function(){
	clearInterval(timer)
}

oBanner.onmouseout = function(){
	autoPlay()
}
//自动轮播
autoPlay()
function autoPlay(){
	timer = setInterval(function(){
		if(iNow == aLi.length-1){
			iNow = 1;
			oUl.style.left = 0;
		}else{
			iNow++;
		}
		toImg();
	},3000)
}
//轮播的原理
function toImg(){
	//引入运动框架
	move(oUl,{left:-iNow*iWidth})
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].className = "";
	}
	aBtn[iNow==aLi.length-1?0:iNow].className = "active";
}


// // 列表
//  var str = "";
// for(var i=0;i<obj.length;i++){
// 	str+=`<li>
//            <div class="box" data-id=${obj[i].id}>
//                <img src="${obj[i].src}">
//                <p class="pirce">${obj[i].pirce}</p>
//                <p class="mainTitle">${obj[i].title}</p>
//                <p>${obj[i].store}</p>
//            </div>
//        </li>`
// }

// var oList = document.getElementById("list");
// oList.innerHTML = str;

// oList.onclick = function(e){
// 	var e = e||event;
// 	var target = e.target || e.srcElement;
// 	if(target.tagName =="IMG"){
// 		var id = target.parentNode.getAttribute("data-id");



// 		//url？后面的东西是不会被解析的
// 		location.href="details.html?id="+id;
// 	}
// }
new Promise(function(resolve,reject){
	ajax({
	type:"get",
	url:"json/index.json",
	data:{},
	success:function(data){
		var data = JSON.parse(data);
			resolve(data);
		}
	})
}).then(function(data){
		var oFloor = document.getElementById("floor");
		var str = "";
		for(var i=0;i<data.length/7;i++){
			str+=`<div class="floor-con floor-layout1">
	        <div class="floor-side" data-id=${data[i*7+0].id}>
	        		<img src="${data[i*7+0].img}" width="275" height="463">
	        	</a>
	        </div>
	        <div class="floor-main">
	            <ul>           
	                <li data-id=${data[i*7+1].id}>
	                	<img src="${data[i*7+1].img}" width="230" height="230">
	                </li>
	                <li data-id=${data[i*7+2].id}>
	                	<img src="${data[i*7+2].img}" width="230" height="230">
	                </li>
	                <li class="wide" data-id=${data[i*7+3].id}>
	               		<img src="${data[i*7+3].img}" width="461" height="230">
	                </li>
	                <li class="wide" data-id=${data[i*7+4].id}>
						<img src="${data[i*7+4].img}" width="461" height="230">
	                </li>
	                <li data-id=${data[i*7+5].id}>
	               		<img src="${data[i*7+5].img}" width="230" height="230">
	                </li>
	                <li data-id=${data[i*7+6].id}>
	          		<img src="${data[i*7+6].img}" width="230" height="230">
	                </li>
				</ul>
	        </div>
		</div>`
		}
		oFloor.innerHTML = str;
		oFloor.onclick = function(e) {
		   var e = e||event;
		   var target = e.target||e.srcElement;
		    if(target.tagName=="IMG"){
		        var id = target.parentNode.getAttribute("data-id");
		        location.href="html/details.html?id="+id;
		    }
		}
})
 