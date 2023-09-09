
var order = {
	retmsg : true
}

/*-----------------------------
- 카트수량업데이트

order.QtyUpdate = function (cart_seq, qty){
	Csrf.Set(_CSRF_NAME_); //토큰 초기화
	var msg = "";
	$.ajax({
		type : "POST",
		url : "../cart/cart_proc_ajax?ajax_mode=UPD_QTY",
		dataType : 'json',
		async : false,
		data :
		{
			"cart_seq" : cart_seq, "qty" : qty, "product_cd" : $("#product_cd"+cart_seq).val(), "opt_cd" : $("#opt_cd"+cart_seq).val()
		},
		success	: function (res) {
			if( $.trim(res.status) == "ok"){
                order.Calc(cart_seq, qty);
				order.TotalReSet(); //주문페이지 수량변경시 쿠폰사용리셋하기
				return;
            }else if( $.trim(res.status) == "err2"){
	        	if(res.data.length > 0){
	            	for(var i=0; i<res.data.length; i++){
	            		if(msg){
	            			msg += ", \n" + res.data[i].product_nm + " " + res.data[i].opt_nm2
	            		}else{
	            			msg = res.data[i].product_nm + " " + res.data[i].opt_nm2
	            		}
	            	}
	            	msg += "의 재고가 부족 합니다.";
	            	alert(msg);
	            	location.reload();
	        	}
            }else{
				alert(res.msg);
				location.reload();
            }
		},
		error: function (res) {
			alert(res.responseText);
		}
	});
}
-----------------------------*/

/*-----------------------------
// - 상품별 금액 계산

order.Calc = function (n, qty) {
	var price = $("#price" + n).val().onlyNum();

	$("#sum_product_price" + n).val(Functions.NumberFormat(price * qty));
	order.CalcInfo();
}
-----------------------------*/


/*-----------------------------
- 총금액계산
-----------------------------*/
order.CalcInfo = function () {


	var tot_price         	= 0;	// 총결제금액
	var buy_coupon_price    = 0;	// 쿠폰사용가능 금액
	var buy_reserve_price	= 0;	// 적립금사용가능 금액


	var const_trans_price = $("#const_trans_price").val().onlyNum();		//배송비 설정금액
	var const_trans_limit = $("#const_trans_limit").val();		//배송비 제한금액

	var add_trans_yn      = $("#add_trans_yn").val();  					//도서산간지역 유무
	var add_trans_price   = $("#add_trans_price").val().onlyNum();		//도서산간지역 배송비

	var coupon_gb         = $("#coupon_gb").val();						//사용된 쿠폰구분값
	var coupon_sale       = $("#coupon_sale").val().onlyNum();			//쿠폰 할인금액
	var use_reserve	  	  = $("#use_reserve").val().onlyNum();
	var use_deposit	  	  = $("#use_deposit").val().onlyNum();

	var delivery_gb   = "";
	var deliverypay   = 0;
	var tot_reserve   = 0;



	$(":hidden[id='cNo']").each(function(){
		var n = $(this).val();

		if($("#coupon_yn" + n).val() == "Y" ){
		    buy_coupon_price += $("#sum_product_price" + n).val().onlyNum(); //총결제금액
		}

		if($("#reserve_yn" + n).val() == "Y" ){
		    buy_reserve_price += $("#sum_product_price" + n).val().onlyNum(); //총결제금액
		}

		tot_price += $("#sum_product_price" + n).val().onlyNum(); //총결제금액
		tot_reserve += $("#reserve_price" + n).val();	//적립금 합계
	});

	//쿠폰 사용가능금액
	$("#buy_coupon_price").val(buy_coupon_price);

	//적립금 사용가능금액
	$("#buy_reserve_price").val(buy_reserve_price);


	//상품원가합계액
	$("#order_origin_price").val(tot_price);
	$("#order_price_span").html(Functions.NumberFormat(tot_price));

	//최종 할인합계액
	tot_use_discount = coupon_sale + use_reserve + use_deposit;

	//최종 할인적용가
	tot_price = tot_price - coupon_sale;




	if (coupon_gb == "2") {
		deliverypay = 0; //무료배송쿠폰 및 무료배송상품 있을경우 배송비는 0원
	}else{

		deliverypay = const_trans_price;


		if( add_trans_yn == "Y" ){
	    	if( tot_price >= const_trans_limit ){
	        	deliverypay = add_trans_price;

	        }else{
	        	deliverypay = deliverypay + add_trans_price;

	        }



	    }else{
			if( tot_price >= const_trans_limit){
				deliverypay = 0;
			}
		}
	}

	//배송비 및 적립금 예치금 적용
	tot_price = tot_price - use_reserve - use_deposit + deliverypay;

	//배송비 세팅
	$("#trans_price_span").html( Functions.NumberFormat(deliverypay));
	$("#trans_price").val(deliverypay);

	//할인합계액
	$("#discount_span").html("-"+ Functions.NumberFormat(tot_use_discount));

    // 총결제금액
    $("#order_price").val(tot_price);
	$("#finish_price_span").html(Functions.NumberFormat(tot_price));

	//총적립금
	$("#finish_reserve_span").html(Functions.NumberFormat(tot_reserve));
}



/*-----------------------------
- 주문서계산기 셋팅
-----------------------------*/
// order.initOrder = function (){


// 	//최종금액 셋팅
// 	order.CalcInfo();


// 	if( sesId=="" ){
// 		$("#coupon_div").hide();
// 		$("#deposit_div").hide();
// 		$("#reserve_div").hide();

// 	}else{
// 		order.reserveReset();
// 		order.changeReAddr();
// 	}




// 	//적립금 처리
// 	$("#use_reserve").blur(function (){

// 		var order_origin_price = $("#order_origin_price").val().onlyNum();		// 순수상품금액
// 		var coupon_sale = $("#coupon_sale").val().onlyNum(); 					// 쿠폰 할인액
// 		var use_deposit = $("#use_deposit").val().onlyNum(); 					// 예치금 할인액
// 		var buy_reserve_price = $("#buy_reserve_price").val().onlyNum();		// 마일리지에 적용가능한 상품금액총액
// 		var this_val = $(this).val().onlyNum(); 								// 입력된 현재금액
// 		var max_use_reserve = buy_reserve_price - coupon_sale - use_deposit;
// 		if( $(this).val() == "" ){
// 			order.ReserveReSet();
// 			order.CalcInfo();	//최종금액 셋팅
// 			return;
// 		}

// 		if(!buy_reserve_price){
// 			alert('적립금을 사용할수 없는 상품입니다');
// 			order.ReserveReSet();
// 			order.CalcInfo();	//최종금액 셋팅
// 			return;
// 		}

// 		if(this_val > $("#mb_reserve").val()){
// 			alert("보유하고 계신 적립금은 " + Functions.NumberFormat($("#mb_reserve").val()) + " 원 입니다.");
// 			order.ReserveReSet();
// 			order.CalcInfo();	//최종금액 셋팅
// 			return;
// 		}

// 		if(this_val > max_use_reserve){
// 			alert("최대 사용가능한 적립금은 " + Functions.NumberFormat(max_use_reserve) + " 원 입니다.");
// 			order.ReserveReSet();
// 			order.CalcInfo();	//최종금액 셋팅
// 			return;
// 		}

// 		// 1단위절삭
// 		if(parseFloat(this_val) % 10 > 0){
// 			this_val = parseFloat(this_val) - (parseFloat(this_val) % 10);
// 		}

// 		//순수한 적립금 사용가능액
// 		var tot_sale_price = this_val + coupon_sale + use_deposit ;

// 		//주문금액 체크
// 		if(buy_reserve_price < tot_sale_price){
// 			alert("총 구매금액 보다 큰 금액이 입력되었습니다.");
// 			order.ReserveReSet();
// 			order.CalcInfo();	//최종금액 셋팅
// 			return;
// 		}

// 		//적립금 둘째자리만 표기
// 		$(this).val(Functions.NumberFormat(this_val));

// 		order.CalcInfo();	//최종금액 셋팅

// 	});

// 	//예치금 처리
// 	$("#use_deposit").blur(function (){

// 		var order_origin_price = $("#order_origin_price").val().onlyNum();		// 순수상품금액
// 		var coupon_sale = $("#coupon_sale").val().onlyNum(); 					// 쿠폰 할인액
// 		var use_reserve = $("#use_reserve").val().onlyNum(); 					// 쿠폰 할인액
// 		var this_val = $(this).val().onlyNum(); 								// 입력된 현재금액
// 		var max_use_deposit = order_origin_price - coupon_sale - use_reserve;
// 		if( $(this).val() == "" ){
// 			order.depositReSet();
// 			order.CalcInfo();	//최종금액 셋팅
// 			return;
// 		}

// 		if(this_val > $("#mb_deposit").val()){
// 			alert("보유하고 계신 적립금은 " + Functions.NumberFormat($("#mb_deposit").val()) + " 원 입니다.");
// 			order.depositReSet();
// 			order.CalcInfo();	//최종금액 셋팅
// 			return;
// 		}

// 		if(this_val > max_use_deposit){
// 			alert("최대 사용가능한 적립금은 " + Functions.NumberFormat(max_use_deposit) + " 원 입니다.");
// 			order.depositReSet();
// 			order.CalcInfo();	//최종금액 셋팅
// 			return;
// 		}
// 		/**
// 		if(parseFloat(this_val) % 10 > 0){
// 			this_val = parseFloat(this_val) - (parseFloat(this_val) % 10);
// 		}
// 		**/

// 		//순수한 적립금 사용가능액
// 		var tot_sale_price = this_val + coupon_sale + use_reserve;

// 		//주문금액 체크
// 		if(order_origin_price < tot_sale_price){
// 			alert("총 구매금액 보다 큰 금액이 입력되었습니다.");
// 			order.depositReSet();
// 			order.CalcInfo();	//최종금액 셋팅
// 			return;
// 		}


// 		//적립금 둘째자리만 표기
// 		$(this).val(Functions.NumberFormat(this_val));

// 		order.CalcInfo();	//최종금액 셋팅

// 	});

// 	//적립금 클릭시 전체 삭제
// 	$("#use_deposit").click(function(){
// 		$(this).select();
// 	});

// 	//적립금 클릭시 전체 삭제
// 	$("#use_reserve").click(function(){
// 		var mb_reserve = $("#mb_reserve").val().onlyNum();
// 		if(mb_reserve >= 1000){
// 			$(this).select();
// 		}else{
// 			alert('적립금은 1000원 이상시 사용할수 있습니다.');
// 			$(this).blur();
// 			return;
// 		}
// 	});


// 	//적립금 전체 적용
// 	$("#all_use_reserve").on("change",function(e){

// 		var order_origin_price = $("#order_origin_price").val().onlyNum();
// 		var coupon_sale = $("#coupon_sale").val().onlyNum();
// 		var use_deposit = $("#use_deposit").val().onlyNum();
// 		var mb_reserve = $("#mb_reserve").val().onlyNum();
// 		var buy_reserve_price = $("#buy_reserve_price").val().onlyNum();		// 마일리지에 적용가능한 상품금액총액

// 		if(!buy_reserve_price){
// 			alert('적립금을 사용할수 없는 상품입니다');
// 			order.ReserveReSet();
// 			order.CalcInfo();	//최종금액 셋팅
// 			return;
// 		}

// 		//1단위 절삭
// 		if(parseFloat(mb_reserve) % 10 > 0){
// 			mb_reserve = parseFloat(mb_reserve) - (parseFloat(mb_reserve) % 10);
// 		}

// 		if(mb_reserve >= 1000){
// 			$(this).val("");
// 		}else{
// 			alert('적립금은 1000원 이상시 사용할수 있습니다.');
// 			$(this).prop("checked", false);
// 			return;
// 		}

// 		if($(this).is(":checked")){

// 			if(mb_reserve >= buy_reserve_price){
// 				$("#use_reserve").val(Functions.NumberFormat(buy_reserve_price - coupon_sale - use_deposit));
// 			}else{
// 				if(coupon_sale+mb_reserve+use_deposit < buy_reserve_price ){
// 					$("#use_reserve").val(Functions.NumberFormat(mb_reserve));
// 				}else{
// 					$("#use_reserve").val(Functions.NumberFormat(buy_reserve_price-coupon_sale-use_deposit));
// 				}
// 			}
// 		}else{
// 			$("#use_reserve").val(0);
// 		}

// 		order.CalcInfo();	//최종금액 셋팅
// 	});

// 	//예치금 전체 적용
// 	$("#all_use_deposit").on("change",function(e){

// 		if($(this).is(":checked")){
// 			var order_origin_price = $("#order_origin_price").val().onlyNum();
// 			var coupon_sale = $("#coupon_sale").val().onlyNum();
// 			var mb_deposit = $("#mb_deposit").val().onlyNum();
// 			var use_reserve = $("#use_reserve").val().onlyNum();

// 			if(mb_deposit >= order_origin_price){
// 				$("#use_deposit").val(Functions.NumberFormat(order_origin_price - coupon_sale - use_reserve));
// 			}else{
// 				if(coupon_sale+mb_deposit+use_reserve < order_origin_price ){
// 					$("#use_deposit").val(Functions.NumberFormat(mb_deposit));
// 				}else{
// 					$("#use_deposit").val(Functions.NumberFormat(order_origin_price-coupon_sale-use_reserve));
// 				}
// 			}
// 		}else{
// 			$("#use_deposit").val(0);
// 		}

// 		order.CalcInfo();	//최종금액 셋팅
// 	});
// }

/*-----------------------------
- 적립금 사용유무
-----------------------------*/
// order.reserveReset = function(){
// 	var mb_reserve = $("#mb_reserve").val().onlyNum();
// 	var order_origin_price =  $("#order_origin_price").val().onlyNum();
// 	if( order_origin_price >= 1000  ){
// 		//$("#use_reserve").attr("readonly", false );
// 	}else{
// 		//$("#use_reserve").attr("readonly", true );
// 		$("#all_use_reserve").prop("checked",false).attr("readonly", true ).attr("disabled", true );
// 	}
// }


/*-----------------------------
- 적용된 적립금만  리셋
-----------------------------*/
// order.ReserveReSet = function(){
// 	$("#use_reserve").val(0);
// 	$("#all_use_reserve").prop("checked",false);
// }

/*-----------------------------
- 적용된 예치금만  리셋
-----------------------------*/
// order.depositReSet = function(){
// 	$("#use_deposit").val(0);
// 	$("#all_use_deposit").prop("checked",false);
// }


/*-----------------------------
- 쿠폰 팝업 오픈
-----------------------------*/
// order.openCoupon = function(){
// 	order.CalcInfo();	//기본금액 셋팅
// 	coupon_init();
// }

/*-----------------------------
- 쿠폰 금액계산
-----------------------------*/
// order.CouponApply = function(c_mem_seq,c_gb){

//     var buy_coupon_price = $("#buy_coupon_price").val().onlyNum(); 	//최소 제한금액 기준
// 	var trans_price = $("#trans_price").val();// 배송비

// 	if (trans_price == "0" && c_gb == "2"){
// 		alert("현재 배송비가 없습니다.");
// 		return;
// 	}

// 	Csrf.Set(_CSRF_NAME_); //토큰 초기화
// 	$.ajax({
// 		type: "POST",
// 		url : "order_coupon_apply_ajax?ajax_mode=COUPON_APPLY",
// 		dataType : 'json',
// 		async : false,
// 		data: { "coupon_member_seq": c_mem_seq, "buy_coupon_price":buy_coupon_price},
// 		success	: function (res) {
// 			if( res.status == "ok"){
//                 //$("#coupon_span").html(Functions.NumberFormat(res.discount_price)+"원");	//쿠폰할인금액 세팅
//                 $("#coupon_sale").val(Functions.NumberFormat(res.discount_price));				//쿠폰할인금액 세팅
// 				$("#coupon_member_seq").val(c_mem_seq);						//쿠폰사용자번호
// 				$("#coupon_gb").val(c_gb);
// 				$("#use_coupon_nm").val(res.coupon_nm+" (-"+Functions.NumberFormat(res.discount_price)+"원)");
// 				order.SumCouponSet();
// 			}else{
// 				alert(res.msg);
// 				return;
// 			}
// 			return;
// 		},
// 		error: function (res) {
// 			alert(res.responseText);
// 		}
// 	});
// }


/*-----------------------------
- 쿠폰 적용하기
-----------------------------*/
// order.SumCouponSet = function(){
// 	order.ReserveReSet(); //적용된적립금 초기화
// 	order.CalcInfo();	//기본금액 셋팅
// 	commonUI.layer.close();
// }


/*-----------------------------
- 적용된 쿠폰만  리셋
-----------------------------*/
order.CouponReSet = function(){

	// $("#coupon_span").html("0원");
	$("#coupon_sale").val(0);
	$("#coupon_member_seq").val("");
	$("#coupon_gb").val("");
	$("#use_coupon_nm").val("");



	order.CalcInfo();
}

/*-----------------------------
- 할인전체 리셋
-----------------------------*/
// order.TotalReSet = function(){

// 	$("#coupon_span").html("0원");
// 	$("#coupon_sale").val(0);
// 	$("#coupon_member_seq").val("");
// 	$("#coupon_gb").val("");

// 	order.CalcInfo();
// }

/*-----------------------------
- 배송지구분에 따른 변경
-----------------------------*/
// order.changeReAddr = function (){

// 	var addr_gb = $(":radio[name='addr_gb']:checked").val();
// 	this.resetReAddr();

// }

/*-----------------------------
- 배송지관리 통한 배송지선택
-----------------------------*/
// order.changeDelivery = function (no){
// 	this.resetReAddr();

// 	re_name  = $("#addr_nm_"+no).val();
// 	re_zip   = $("#addr_zip_"+no).val();
// 	re_addr1 = $("#addr1_"+no).val();
// 	re_addr2 = $("#addr2_"+no).val();
// 	if($("#addr_hp_"+no).val()){
// 		re_hp1    = $("#addr_hp_"+no).val().split("-")[0];
// 		re_hp2    = $("#addr_hp_"+no).val().split("-")[1];
// 		re_hp3    = $("#addr_hp_"+no).val().split("-")[2];
// 	}

// 	delivery_msg = $("#delivery_msg_"+no).val();



// 	$("#re_name").val(re_name);
// 	$("#re_zip").val(re_zip);
// 	$("#re_addr1").val(re_addr1);
// 	$("#re_addr2").val(re_addr2);
// 	$("#re_hp1").val(re_hp1);
// 	$("#re_hp2").val(re_hp2);
// 	$("#re_hp3").val(re_hp3);
// 	$("#trans_memo").val(delivery_msg);

// 	commonUI.layer.close();
// 	order.addTransCheck();
// }

/*-----------------------------
- 주문자 정보와동일 이벤트
-----------------------------*/
// order.setReAddr = function (){

// 	if($("#copy_mem_info").is(":checked")){
// 		$("#re_name").val($("#or_name").val());
// 		$("#re_zip").val($("#home_zip").val());
// 		$("#re_addr1").val($("#home_addr1").val());
// 		$("#re_addr2").val($("#home_addr2").val());
// 		$("#re_hp1").val($("#or_hp1").val());
// 		$("#re_hp2").val($("#or_hp2").val());
// 		$("#re_hp3").val($("#or_hp3").val());

// 		$("#addr_default").prop("checked", true);

// 		order.addTransCheck()
// 	}else{
// 		order.resetReAddr();
// 	}
// }


/*-----------------------------
- 배송지정보 리셋
-----------------------------*/
// order.resetReAddr = function (){

// 	$("#add_trans_yn").val("N");
// 	$("#add_trans_price").val("0");

// 	$("#re_name").val("");
// 	$("#re_zip").val("");
// 	$("#re_addr1").val("");
// 	$("#re_addr2").val("");
// 	$("#re_hp1").val("");
// 	$("#re_hp2").val("");
// 	$("#re_hp3").val("");

// 	order.addTransCheck()
// }


order.setOrderType = function(gb){

	$(".payment li").find(".sel_txt").remove();
	$("#order_gb").val(gb);
	$("#otype_cd_10, #otype_cd_60").parent().parent().show();

	//선물하기는 무통장,가상계좌 제외
	if(gb == "G"){
		$("#otype_cd_10, #otype_cd_60").parent().parent().hide();
		$('[name="otype_cd"]:radio').prop("checked", false);
	}

	order.CouponReSet();

}

/*-----------------------------
- 최근배송지
-----------------------------*/
order.recentReAddr = function (){
	this.resetReAddr();

	re_name  = $("#prev_name").val();
	re_zip   = $("#prev_zip").val();
	re_addr1 = $("#prev_addr1").val();
	re_addr2 = $("#prev_addr2").val();
	if($("#prev_hp").val()){
		re_hp1   = $("#prev_hp").val().split("-")[0];
		re_hp2   = $("#prev_hp").val().split("-")[1];
		re_hp3   = $("#prev_hp").val().split("-")[2];
	}

	$("#re_name").val(re_name);
	$("#re_zip").val(re_zip);
	$("#re_addr1").val(re_addr1);
	$("#re_addr2").val(re_addr2);
	$("#re_hp1").val(re_hp1);
	$("#re_hp2").val(re_hp2);
	$("#re_hp3").val(re_hp3);

	order.addTransCheck()

}

/*-----------------------------
- 추가배송비 조회
-----------------------------*/

order.addTransCheck = function(){
	Csrf.Set(_CSRF_NAME_); //토큰 초기화
	$.ajax({
		type: "POST",
		url : "order_proc_ajax?ajax_mode=ADD_TRNAS",
		dataType : 'json',
		async: false,
		data:
		{
			"zipcode":$("#re_zip").val()
		},
		success	: function (res) {
			if( $.trim(res.status) == "ok"){
				$("#add_trans_yn").val("Y");
				$("#add_trans_price").val(res.add_price);
	        }else{
	        	$("#add_trans_yn").val("N");
	        	$("#add_trans_price").val(0);
	        }
			order.CalcInfo();	//최종금액 셋팅
		},
		error: function (res) {
			alert(res.responseText);
		}
	});

}

/*-----------------------------
- 주문하기
-----------------------------*/

var form_check = {
	or_name: function (input) {
		if ($(input).val() == '') {
			input_error(input, '이름을 입력해주세요.');
			return false;
		//} else if ($(input).val().length < 2 || $(input).val().length > 12) {
		//	input_error(input, '이름은 2자 이상 12자 이내 사용가능합니다.');
		//	return false;
		}

		// input_success(input);
		return true;
	},
	or_email1: function (input) {
		if ($(input).val() == '') {
			input_error(input, '이메일을 입력해주세요.');
			return false;
		}
		// else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($(input).val())) {
		// 	input_error(input, '이메일을 입력해주세요.');
		// 	return false;
		// }

		// input_success(input);
		return true;
	},
	or_hp: function (input) {
		if ($(input).val() == '') {
			input_error(input, '연락처를 입력해주세요.');
			return false;
		}
		// else if (!/^[0-9]{6,}$/.test($(input).val())) {
		// 	input_error(input, '휴대폰번호 양식이 정확하지 않습니다.');
		// 	return false;
		// }

		// input_success(input);
		return true;
	},
	re_name: function (input) {
		// if($("#li_re_name").css("display") != "none"){
			if ($(input).val() == '') {
				input_error(input, '이름을 입력해주세요.');
				return false;
			}
			// else if ($(input).val().length < 2 || $(input).val().length > 12) {
			// 	input_error(input, '이름은 2자 이상 12자 이내 사용가능합니다.');
			// 	return false;
			// }
			// input_success(input);
		// }

		return true;
	},
	re_hp: function (input) {
		// if($("#li_re_hp").css("display") != "none"){
			if ($(input).val() == '') {
				input_error(input, '연락처를 입력해주세요.');
				return false;
			}
			// else if (!/^[0-9]{6,}$/.test($(input).val())) {
			// 	input_error(input, '휴대폰번호 양식이 정확하지 않습니다.');
			// 	return false;
			// }

			// input_success(input);
		// }
		return true;
	},
	re_addr1: function (input) {
		// if($("#li_re_addr").css("display") != "none"){
			if ($(input).val() == '') {
				input_error(input, '배송지를 입력해주세요.');
				return false;
			}

			// input_success(input);
		// }
		return true;
	},
	re_addr2: function (input) {
		// if($("#li_re_addr").css("display") != "none"){
			if ($(input).val() == '') {
				input_error(input, '배송지를 입력해주세요.');
				return false;
			}

			// input_success(input);
		// }
		return true;
	}

};


function input_reset(input, appendTo) {
	var appendTo = typeof appendTo == 'undefined' ? '.form_box' : appendTo;

	$(input).closest('.form_box').removeClass('error success');
	$(input).closest(appendTo).find('p').remove();
}

function input_success(input, msg, appendTo) {
	var msg = typeof msg == 'undefined' ? '' : msg;
	var msg = msg ? msg : 'Good!';
	var appendTo = typeof appendTo == 'undefined' ? '.form_box' : appendTo;

	input_reset(input);

	$(input).closest('.form_box').addClass('success');
	$(input).closest(appendTo).append('<p>' + msg + '</p>');
}

function input_error(input, msg, appendTo) {
	var appendTo = typeof appendTo == 'undefined' ? '.form_box' : appendTo;

	input_reset(input);

	$(input).closest('.form_box').addClass('error');
	$(input).closest(appendTo).append('<p>' + msg + '</p>');
}

order.orderSubmit = function(koApiURL,token){

	var orderForm = document.orderForm;

	var check = true;

	if (!form_check.or_name(orderForm.or_name)) {
		// check = false;
		alert("주문하신 분의 이름을 입력해주세요.");
		orderForm.or_name.focus();
		return;
	}
	if (!form_check.or_email1(orderForm.or_email1)) {
		// check = false;
		alert("이메일을 입력해주세요.");
		orderForm.or_email1.focus();
		return;
	}
	if (!form_check.or_hp(orderForm.or_hp1) || !form_check.or_hp(orderForm.or_hp2) || !form_check.or_hp(orderForm.or_hp3)) {
		// check = false;
		alert("연락처를 입력해주세요.");
		orderForm.or_hp2.focus();
		return;
	}

	if($("#order_gb").val() == 'N'){
		if (!form_check.re_name(orderForm.re_name)) {
			// check = false;
			alert("받는 사람을 입력해주세요.");
			orderForm.re_name.focus();
			return;
		}

		if (!form_check.re_hp(orderForm.re_hp1) || !form_check.re_hp(orderForm.re_hp2) || !form_check.re_hp(orderForm.re_hp3)) {
			// check = false;
			alert("연락처를 입력해주세요.");
			orderForm.re_hp2.focus();
			return;
		}
		if (!form_check.re_addr1(orderForm.re_addr1)) {
			// check = false;
			alert("주소를 입력해주세요.");
			orderForm.re_addr1.focus();
			return;
		}
		if (!form_check.re_addr2(orderForm.re_addr2)) {
			// check = false;
			alert("나머지 주소를 입력해주세요.");
			orderForm.re_addr2.focus();
			return;
		}
	} else if($("#order_gb").val() == 'G'){
		if ($("#gift_order_gb").val() == ''){
			alert("선물 방식이 선택되지 않았습니다.");
			return;
		} else {

			if( $("#gift_order_gb").val() == 'K'){

				if ($("#kakao_re_name").val() == ''){
					alert("선물 받는 사람을 입력해주세요.");
					$("#kakao_re_name").focus();
					return;
				}

				if ($("#kakao_msg_card").val() == ''){
					alert("메세지 카드를 입력해주세요.");
					$("#kakao_msg_card").focus();
					return;
				}

			} else if( $("#gift_order_gb").val() == 'S'){

				if ($("#sms_re_name").val() == ''){
					alert("선물 받는 사람을 입력해주세요.");
					$("#sms_re_name").focus();
					return;
				}

				if ($("#sms_re_hp1").val() == ''){
					alert("선물 받는 사람 연락처를 입력해주세요.");
					$("#sms_re_hp1").focus();
					return;
				}

				if ($("#sms_re_hp2").val() == ''){
					alert("선물 받는 사람 연락처를 입력해주세요.");
					$("#sms_re_hp2").focus();
					return;
				}

				if ($("#sms_re_hp3").val() == ''){
					alert("선물 받는 사람 연락처를 입력해주세요.");
					$("#sms_re_hp3").focus();
					return;
				}

				if ($("#sms_msg_card").val() == ''){
					alert("메세지 카드를 입력해주세요.");
					$("#sms_msg_card").focus();
					return;
				}

			}

		}
	}

	if (!$("#buy_use").is(":checked")){
		alert("구매진행에 동의를 해주세요.");
		return;
	}

    var order_price = $("#order_price").val();
	var otype_cd = $(':radio[name="otype_cd"]:checked').val();

    if ((otype_cd == "" || typeof otype_cd=='undefined') && order_price > 0  ){
        alert("결제 수단을 선택해 주세요.");
        return;
    }


	var cart_seqs = "";
	var order_gb = $("#order_gb").val();
	// var old_receive_hp = "";
	var next_state = false;
	$(":hidden[id='cNo']").each(function(){
		if (cart_seqs == ""){
			cart_seqs = $(this).val();
		}else{
			cart_seqs = cart_seqs +","+ $(this).val();
		}
	});

	if(next_state){
		alert("선물하기는 동일한 수신번호로만 가능합니다.");
		return;
	}

	$("#cart_seqs").val(cart_seqs);
	var param = $("#orderForm").serialize()+ "&mode=ORDER_WRITE"; // convert form to array
	


	// /v1.0/member/mypage/order/order_proc_ajax
	if( confirm("작성하신 정보로 주문하시겠습니까?") ){
		Csrf.Set(_CSRF_NAME_); //토큰 초기화
		$.ajax({
			type: "POST",
			// url : "order_proc_ajax?ajax_mode=ORDER_WRITE",
			url: `${koApiURL}/order/proc`,
			dataType : 'json',
			async: false,
			data 	: param,
			headers: { Authorization: `Bearer ${token}` },
			success	: function (res) {
				debugger

				if( $.trim(res.data.status) == "ok"){

					if(order_price == 0 || otype_cd == "60"){
						location.href='order_ok?ocode='+res.ocode;
					}else{
						order.pg_open(res.data.ocode, otype_cd);
					}

		        }else{
		        	alert(res.data.msg);
		        }
			},
			error: function (res) {
				alert(res.responseText);
			}
		});
	}
}

order.pg_open = function(ocode, otype_cd){
debugger
	Csrf.Set(_CSRF_NAME_); //토큰 초기화
    var path_gb = $("#path_gb").val();

    if (otype_cd == "70"){
		var request = $.ajax({
            url: "kakaopay_account_ajax",
            data: {"ocode" : ocode},
            method: 'post',
            async: false,
            dataType: 'json'
        });
        request.done(function( data ) {
        	if(data){
	            if(path_gb == "WEB"){
	                location.href = data.next_redirect_pc_url;
	            } else {
	            	location.href = data.next_redirect_mobile_url;
	            }
	        }
        });
        request.fail(function( rslt, textStatus ) {
            alert("PG 연동에 실패했습니다.");
        });
    }else{
		$.ajax ({
			type		: "post",
			url			: "pg_account_ajax",
			data		: {"ocode" : ocode},
			dataType	: "text",
			async		: false,
			success		: function (res) {
				$("#pgReturn").html("").html(res);
				if(otype_cd != "80"){
					tossPayments.requestPayment(method, paymentData);
				}

			},
			error	: function (rslt) {
				alert("에러가 발생하였습니다.\n\n지속적인 에러 발생시 고객센터로 문의하여 주세요\n\n" + rslt.responseText);
				return false;
			}
		});
    }
}




//-----------------------------------------------------------------------------
// 숫자 이외에는 다 뺀다.
//
// @return : 숫자
//-----------------------------------------------------------------------------
String.prototype.onlyNum = function() {
	var num = this.trim();
	return parseInt(this.trim().replace(/[^0-9]/g,""));
}

