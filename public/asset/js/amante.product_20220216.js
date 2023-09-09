
var product = {
	retmsg : true
}


/*-----------------------------
- 상품 수량 plus, minus
-----------------------------*/
product.countUpd = function (gubun, opt_cd) {
    if(document.CartForm.option_yn.value == 'Y'){
        opt_cd = document.CountForm.option_cd.value;
        gubun = document.CountForm.gubun.value;
    }

	if(document.CartForm.option_yn.value == "Y" && opt_cd != "") {
        var cnt       = parseInt($("#count_"+opt_cd).text());
        var opt_price = parseInt($("#opt_sale_price_"+opt_cd).val());

        if(gubun == 'minus') {
            if(cnt < 2){
                alert("최소 구매수량은 1개 입니다.");
                return false;
            } else {
                cnt = cnt-1;

                $("#count_"+opt_cd).text(cnt);

                $("input[name='opt_qty[]']").each(function(idx) { //폼값에 넣기
                    if(opt_cd == $(this).attr("data-opt")){
                        $(this).val(cnt);
                    }
                });
            }
        } else if(gubun == 'plus'){
            cnt = cnt+1;

            $("#count_"+opt_cd).text(cnt);

            $("input[name='opt_qty[]']").each(function(idx) {  //폼값에 넣기
                if(opt_cd == $(this).attr("data-opt")){
                    $(this).val(cnt);
                }
            });
        }

        $("#opt_price_txt_"+opt_cd).text(Functions.NumberFormat(cnt*opt_price)+"원");
    } else if (document.CartForm.option_yn.value == "N") {
        var cnt = parseInt($("#product_count").text());

        if(gubun == 'minus'){
            if(cnt < 2){
                alert("최소 구매수량은 1개 입니다.");
                return false;
            } else {
                cnt = cnt-1;

                $("#product_count").text(cnt);

                $("input[name='qty']").val(cnt);
            }
        } else if(gubun == 'plus'){
            cnt = cnt+1;

            $("#product_count").text(cnt);

            $("input[name='qty']").val(cnt);
        }
    }

    product.Calc();
}

/*-----------------------------
- 총금액계산
-----------------------------*/
product.Calc = function () {
	var cnt         = 0;
    var sale_price  = 0;
    var total_price = 0;

    //옵션이 있을 경우 계산
    if(document.CartForm.option_yn.value == "Y"){
        $("#select_option > li").each(function(idx) {
            cnt = parseInt($(this).children('.amount').children('.count').text());
            sale_price = parseInt($(this).children('input').val());

            total_price += cnt * sale_price;
        });

    //옵션이 없을 경우 계산
    } else {
        cnt = parseInt($("#product_count").text());
        sale_price = parseInt($("#product_sale_price").val());

        total_price = cnt * sale_price;
    }

    $(".total_price").text(Functions.NumberFormat(total_price)+"원");
    $("#total_usd").text("(USD "+(total_price*$("#exchangeUSD").val()).toFixed(2)+")");

}


/*-----------------------------
 - 장바구니 담기 (json)
 -----------------------------*/
product.cartProduct = function(products) {
	Csrf.Set(_CSRF_NAME_); //토큰 초기화
	$.ajax({
		type: "POST",
		url : "/shop/cart/insert_cart_ajax",
		dataType : 'json',
		data: {'products' : products, 'iscurr' : 'F'},
		success : function (res) {
			if( $.trim(res.status) == "ok" || $.trim(res.status) == "non_ok"){
			$('.header_cart_cnt').text(res.data['cart_cnt']);
				if(res.national_msg != "" && res.national_msg != null){
					alert(res.national_msg);
				}

				// if(confirm("장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?")){
				// 	location.href = "/shop/cart/cart_lists";
				// }
				commonUI.layer.open('.cart_layer', { bg : true, alert : true });
					
			}else{
				alert(res.msg);
				return;
			}
			return;
		},
		error: function (res) {
			alert(res.responseText);
		}
	});
}

/*-----------------------------
 - 장바구니 옵션 변경 (json)
 -----------------------------*/
product.cartOptionProduct = function(products) {
	Csrf.Set(_CSRF_NAME_); //토큰 초기화
	$.ajax({
		type: "POST",
		url : "/shop/cart/insert_cart_ajax",
		dataType : 'json',
		data: {'products' : products, 'iscurr' : 'F'},
		success : function (res) {
			if( $.trim(res.status) == "ok"){
			$('.header_cart_cnt').text(res.data['cart_cnt']);
				if(res.national_msg != "" && res.national_msg != null){
					alert(res.national_msg);
				}
				location.reload();
			}else{
				alert(res.msg);
				return;
			}
			return;
		},
		error: function (res) {
			alert(res.responseText);
		}
	});
}


/*-----------------------------
 - 바로구매 하기 (json)
 -----------------------------*/
product.buyProduct = function(products) {
	Csrf.Set(_CSRF_NAME_); //토큰 초기화
	$.ajax({
       type: "POST",
       url : "/shop/cart/insert_cart_ajax",
       dataType : 'json',
       data: {'products' : products, 'iscurr' : 'T'},
       success : function (res) {
	       if(res.national_msg != "" && res.national_msg != null){
		       alert(res.national_msg);
	       }
	       if( $.trim(res.status) == "ok"){
		       location.href = "/shop/order/order_write";
	       }else if( $.trim(res.status) == "non_ok" ){
			   location.href = "/shop/login/login";
		   }else{
		       alert(res.msg);
		       return;
	       }
	       return;
       },
       error: function (res) {
	       alert(res.responseText);
       }
   });
}


/*-----------------------------
 - 선물 하기 (json)
 -----------------------------*/
product.buyProductGift = function(products) {
    Csrf.Set(_CSRF_NAME_); //토큰 초기화
    $.ajax({
       type: "POST",
       url : "/shop/cart/insert_cart_ajax",
       dataType : 'json',
       data: {'products' : products, 'iscurr' : 'T'},
       success : function (res) {
           if(res.national_msg != "" && res.national_msg != null){
               alert(res.national_msg);
           }
           if( $.trim(res.status) == "ok"){
               location.href = "/shop/order/order_write?direct_order=gift_direct";
           }else{
               alert(res.msg);
               return;
           }
           return;
       },
       error: function (res) {
           alert(res.responseText);
       }
   });
}


/*-----------------------------
 - 네이버페이 바로구매 (json)
 -----------------------------*/
product.buyProductNpay = function(products) {
	Csrf.Set(_CSRF_NAME_); //토큰 초기화
	$.ajax({
        type: "POST",
        url : "/shop/cart/insert_cart_ajax",
        dataType : 'json',
        data: {'products' : products, 'iscurr' : 'T'},
        success : function (res) {
	        if(res.national_msg != "" && res.national_msg != null){
		        alert(res.national_msg);
	        }
	        if( $.trim(res.status) == "ok"){
		        location.href = "/shop/npay/move_npay";
	        }else{
		        alert(res.msg);
		        return;
	        }
	        return;
        },
        error: function (res) {
	        alert(res.responseText);
    	}
	});
}

/*-----------------------------
 - 카카오페이 바로구매 (json)
 -----------------------------*/
product.buyProductkpay = function(products) {
	Csrf.Set(_CSRF_NAME_); //토큰 초기화
	$.ajax({
        type: "POST",
        url : "/shop/cart/insert_cart_ajax",
        dataType : 'json',
        data: {'products' : products, 'iscurr' : 'T'},
        success : function (res) {
	        if(res.national_msg != "" && res.national_msg != null){
		        alert(res.national_msg);
	        }
	        if( $.trim(res.status) == "ok"){
		        location.href = "/shop/order/order_write?direct_order=kakaopay_direct";
	        }else{
		        alert(res.msg);
		        return;
	        }
	        return;
        },
        error: function (res) {
	        alert(res.responseText);
    	}
	});
}

/*-----------------------------
- 상품 찜하기
-----------------------------*/
product.likeProduct = function(product_cd) {
    var now_url = location.href;

	if($('.wish_'+product_cd).hasClass('on')){
		$(".wish_"+product_cd).removeClass("on");
        var ajax_mode = "DEL";
	}else{
		$(".wish_"+product_cd).addClass("on");
        var ajax_mode = "ADD";
	}

    if( now_url.indexOf("/main") > -1){
        if( now_url.indexOf("/main/main") > -1){
            var url = "../mypage/wish/wish_proc_ajax?ajax_mode="+ajax_mode;
        } else {
            var url = "./mypage/wish/wish_proc_ajax?ajax_mode="+ajax_mode;
        }
    } else if( now_url.indexOf("/mypage") > -1){
        var url = "../wish/wish_proc_ajax?ajax_mode="+ajax_mode;
    } else {
        var url = "../mypage/wish/wish_proc_ajax?ajax_mode="+ajax_mode;
    }

	console.log(url);
    Csrf.Set(_CSRF_NAME_); //토큰 초기화
    $.ajax({
        type: "POST",
        url : url,
        dataType : 'json',
        data: { product_cd : product_cd },
        success : function (res) {
            if( $.trim(res.status) == "ok"){
                alert(res.msg);
                return;
            }else{
                alert(res.msg);
                return;
            }
            return;
        },
        error: function (res) {
            alert(res.responseText);
        }
    });
}
