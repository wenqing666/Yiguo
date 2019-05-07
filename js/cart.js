window.onload=function(){
	var str="";
	var oNone = document.getElementById("cart-none");
	var oFull = document.getElementById("cart-full");
	var oList = document.getElementById("cart-list");
	var oAccount = document.getElementById("account");
	var oAll = document.getElementById("all")
	var money = 0;
	if(getCookie("info")){
		new Promise(function(resolve,reject){
			ajax({
			type:"get",
			url:"../json/cart.json",
			data:{},
			success:function(data){
				var data = JSON.parse(data);
					resolve(data);
				}
			})
		}).then(function(data){
			oFull.style.display = "block";
			oNone.style.display = "none";
	        var arr = JSON.parse(getCookie("info"));
	        for(var i=0;i<arr.length;i++){
	            for(var j=0;j<data.length;j++){
	                if(arr[i].id == data[j].id){
	                    str+=`<table class="cart-table">
				                <tbody>
				                    <tr>
				                        <td class="cart-t-check"><input type="checkbox" checked="checked" id="check"></td>
				                        <td class="cart-t-img"><a href="##"><img src="../${data[i].img}" width="82" height="82"></a></td>
				                        <td class="cart-t-info">${data[i].info}</a></td>
				                        <td class="cart-t-ub" style="width:75px;"></td>
				                        <td class="cart-t-price">￥${data[i].price}</td>
			                            <td class="cart-t-num">
			                                <div class="quantity-form">
			                                    <button class="reduce">-</button>
			                                    <input id="itxt" type="text" class="itxt" value="${arr[i].num}">
			                                    <button class="add">+</button>
			                                </div>
			                            </td>
				                        <td class="cart-t-total">￥<span>${(data[i].price*100)*arr[i].num/100}</span></td>
				                        <td class="cart-t-spec">${data[i].spec}</td>
				                        <td class="del">删除</td>
				                    </tr>
				                </tbody>
				            </table>`;
	               	}
	           	}
	        }
	        oList.innerHTML+=str;

	        //总价
	        for(var i=0;i<arr.length;i++){
		        money+=Number(oList.children[i].children[0].children[0].children[6].children[0].innerText)*100;
		     
		    }
		    oAccount.children[1].children[0].children[0].children[0].innerText =money/100;


 			oList.onclick = function(e){
	        	var e = e||event;
	        	var target = e.target ||e.srcElement;
	        	if(target.tagName == "BUTTON"){
		            //是button下 减少按钮 数量减1
		            if(target.className == "reduce"){
		                if(target.parentNode.children[1].value>1){
		                    target.parentNode.children[1].value = parseInt(target.parentNode.children[1].value) - 1;
		                }
		            }
		            //是button按钮下增加按钮 数量加1
		            if(target.className == "add"){
		                target.parentNode.children[1].value = parseInt(target.parentNode.children[1].value) + 1;
		            }
		            //判断改变后商品单个总价
		            var priceVal = target.parentNode.parentNode.parentNode.children[4].innerText.slice(1);
		            target.parentNode.parentNode.parentNode.children[6].children[0].innerText = (priceVal*10*target.parentNode.children[1].value)/10;
		        }

		        //是删除按钮 减少个数
		        if(target.className == "del"){
		            target.parentNode.parentNode.parentNode.remove();
		            arr.length--;
		        }

		        if(target.tagName == "INPUT"&&target.id == "check"){
		            var bStop = true;

		            for(var i=0;i<arr.length;i++){
		            	console.log(oList.children[i].children[0].children[0].children[0].children[0])
		                if(!oList.children[i].children[0].children[0].children[0].children[0].checked){
		                    bStop = false;
		                    break;
		                }
		            }

		            //判断全选状态
		            console.log(oAll)
		            if(bStop){
		                oAll.checked = "checked";
		            }else{
		                oAll.checked = "";

		            }

		        }
		        money = 0;
		        for(var i=0;i<arr.length;i++){
		            //只计算子选项是选中状态的价格
		            if(oList.children[i].children[0].children[0].children[0].children[0].checked){
		                money+=Number(oList.children[i].children[0].children[0].children[6].children[0].innerText)*100;
		            }
		            
		        }

		        //输出 事件触发后的价格
		         oAccount.children[1].children[0].children[0].children[0].innerText =money/100;


	     	   }
		    
	       

	        //是全选按钮 全选或清空 子选项
		      oAll.onclick = function(){
		            if(!this.checked){
		                for(var i=0;i<arr.length;i++){
		                    oList.children[i].children[0].children[0].children[0].children[0].checked = "";
		                }
		            }else{
		                for(var i=0;i<arr.length;i++){
		                    oList.children[i].children[0].children[0].children[0].children[0].checked = "checked";
		                }
		            }
		      }
	    })
	}else{
		oFull.style.display = "none";
	}
}