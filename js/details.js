//导航
var oCata = document.getElementById("catalogs")
var oNav = document.getElementById("nav");
var aLi1 = oNav.querySelectorAll("#nav>li");
oCata.onmouseover = function(){
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
oCata.onmouseout = function(){
	if(oNav){
		oNav.style.display="none";
	}
}

var oHome = document.getElementById("homenav");
var aLi2 = oHome.querySelectorAll("#homenav>li")
for(var i=0;i<aLi2.length;i++){
	aLi2[i].onmouseover = function() {
		 var a = this.children[0];
	 	 a.className ="active";
	 }
	aLi2[i].onmouseout = function() {
		 var a = this.children[0];
	 	 a.className ="";
	}
}

new Promise(function(resolve,reject){
	ajax({
	type:"get",
	url:"../json/details.json",
	data:{},
	success:function(data){
		var data = JSON.parse(data);
			resolve(data);
		}
	})
}).then(function(data){
	var urlId = location.href.split("?")[1].split("=")[1];
	var oWrap = document.getElementById("wrap");
	var str ="";
    for(var i=0;i<data.length;i++){
    	if(data[i].id == urlId){
    		str+=`<div class="crumbs">
			<a href="../index.html">首页</a>><a href="##">广东桂味荔枝2.5kg</a>
		</div>
		<div class="content clearfix">
			//图
			<div class="pic-preview">
				<div class="pic-big">
					<div id="filter"></div>
					<img src="../${data[i].img}" class="middle" width="500" height="500">
				</div>
				<div class="minImg">
					<img src="../${data[i].minimg1}" class="small">
					<img src="../${data[i].minimg2}" class="small">
					<img src="../${data[i].minimg3}" class="small">
				</div>
				<div class="max">
					<img src="../images/x1.jpg" class="bigImg" width="1000"	height="1000" style="display: none;">
				</div>
			</div>
			<div class="product-info">
				<h1>Zespri佳沛新西兰绿奇异果6个115-135g/个</h1>
				<p>酸酸甜甜 爽口柔滑</p>
				<div class="summary-price clearfix">
					<div class="pro-price">
						<p>价格:<span>￥35.80</span></p>
						<div class="pro-content">更多商品优惠，尽在易果生鲜APP</div>
					</div>
				</div>
			</div>
			<div class="summary-other clearfix">
				<div class="left">
					<div class="pro-amount clearfix">
						<div class="dt">数量:</div>
							<div class="dd">
								<div class="spinner">
									<button class="sub">-</button>
									<input type="text" class="spinnervalue" id="num" value="1">
									<button class="add">+</button>
								</div>
								<div class="addcart" id="addcart"><a href="##">加入购物车</a></div>
							</div>
						</div>
					</div>
				<div class="right"></div>	
			</div>
		</div>`
		break;
    	}
    }
    oWrap.innerHTML = str;
    //加入购物车
	var oCat = document.getElementById("addcart");
	oCat.onclick = function(e){
		e=e||event;
		var goodsId = urlId;
		console.log(goodsId)
	      //定义一个空的对象[{id:01,num:1},{id:02,num:2}]
	      var goods = {}

	      if(getCookie("info")){
	          arr = JSON.parse(getCookie("info"));

	      }else{
	          var arr = [];
	      }

	      if(arr.length>0){
				for(var i=0;i<arr.length;i++){
		            var bStop = false;

		            if(arr[i].id == goodsId){
		                arr[i].num++;
		                bStop = true;
		                break;
		            }
	            }
	          if(!bStop){
	              goods.id = goodsId;
	              goods.num = 1;
	              arr.push(goods);
	          }
	      }else{
	          goods.id = goodsId;
	          goods.num = 1;
	          arr.push(goods);
	      }
	      //将数组转换为字符串存入cookie
	      setCookie("info",JSON.stringify(arr),7);
	}
})




















// 详情页
// var minImg = document.getElementById("minImg");
// var middle = document.querySelector(".middle");

// var str = "";
// for(var i=0;i<5;i++){
//     str+="<img src=imgs/"+(i+1)+"-small.jpg class='small'  data-url=imgs/"+(i+1)+"-large.jpg>";
// }

// minImg.innerHTML = str;


// var aImg = minImg.querySelectorAll("img");
// var bigImg = document.querySelector(".bigImg");
// var oBox = document.getElementById("box");
// var max = document.getElementById("max");
// var oFilter = document.getElementById("filter");

// for(var i=0;i<aImg.length;i++){
//     aImg[i].onmouseover = function(){
//         var src = this.getAttribute("data-url");
//         middle.src = src;
//         bigImg.src = src;
//     }
// }


// oBox.onmouseover = function(){
// 	oFilter.style.display = "block";
// 	max.style.display = "block";
// 	this.onmousemove = function(e){

// 		var e = e||event;
// 		var l = e.clientX - 30 -  oFilter.offsetWidth/2;
// 		var t = e.clientY - 30 -  oFilter.offsetHeight/2;

// 		l = l>oBox.offsetWidth - oFilter.offsetWidth?oBox.offsetWidth - oFilter.offsetWidth:(l<0?0:l);


// 		t = t >oBox.offsetHeight - oFilter.offsetHeight?oBox.offsetHeight - oFilter.offsetHeight:(t<0?0:t);



// 		oFilter.style.left = l + "px";
// 		oFilter.style.top = t +"px";

// 		bigImg.style.left = -2*l +"px";
// 		bigImg.style.top = -2*t +"px";
// 	}
// }