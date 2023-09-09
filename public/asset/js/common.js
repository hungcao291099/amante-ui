/*
*  공통 함수
*/
Common = {
		//post 통신
    POST : function(url, data){
        var prom = $.Deferred();
        $.post(url, data).done(function( result ){
            prom.resolve( result );
        }).fail(function(){
            prom.reject.apply(null, arguments);
        });

        return prom;
    },

	//get 통신
    GET : function(url, data){
        var prom = $.Deferred();
        $.get(url, data).done(function( result ){
            prom.resolve( result );
        }).fail(function(){
            prom.reject.apply(null, arguments);
        });

        return prom;
    },

	//팝업생성
	openWindowPop : function(theURL,winName,features){
        window.open(theURL,winName,features);
    }
}

/*
*  휴대폰 목록
*/
Phone = {
    Load : function(json, target, mode){
        var target = $("#"+target),
            html = '<option value="">선택</option>\n',
            checked = '';

		var parsedJson = jQuery.parseJSON(JSON.stringify(json));
		var phone_arr = parsedJson.Contact.phone;

        for(var i=0; i<phone_arr.length; i++){
            if(target.attr("value")){
                checked = (target.attr("value").indexOf(phone_arr[i].number) > -1) ? "selected" : "";
            }
            if(phone_arr[i].mode == mode || mode == 3){
                html +=  '<option value="'+phone_arr[i].number+'" '+checked+'>'+phone_arr[i].number+'</option>\n';
            }
        }
        target.html(html);
    }
}

/*
*  이메일 목록
*/
Email = {
    Load : function(json, target){
        var target = $("#"+target),
            html = '<option >직접입력</option>\n',
            checked = '';

		var parsedJson = jQuery.parseJSON(JSON.stringify(json));
		var email_arr = parsedJson.Contact.email;

        for(var i=0; i<email_arr.length; i++){
            if(target.attr("value")){
                checked = (target.attr("value").indexOf(email_arr[i].value) > -1) ? "selected" : "";
            }
            html += '<option value="'+email_arr[i].value+'" '+checked+'>'+email_arr[i].value+'</option>\n';
        }
        target.html(html);
    },
    Bind : function(target, set){
        var trigger = $("#"+target),
            set = $("#"+set);

        trigger.bind({
            change : function(){
                if($(this).val()){
                    set.val($(this).val());
                } else {
                    set.val($(this).val()).focus();
                }
            }
        });
    }
}

/*
*  공통기능
*/
Functions = {
    Load : function(){
        Functions.AllCheck();
        Functions.UrlBack();
        Functions.ClosePop();
    },
    //페이지네 체크박스 전체클릭
    AllCheck : function(){
        $("#AllCheck").click(function(){
            if($(this).is(":checked")){
                $("input:checkbox").prop("checked", true);
            } else {
                $("input:checkbox").prop("checked", false);
            }
        });
    },
    //페이지네 특정 체크박스 전체클릭
    AllCheckTarget : function(targets){
        if($("#AllCheckTarget").is(":checked")){
            $(":checkbox[name='"+targets+"']").prop("checked", true);
        } else {
            $(":checkbox[name='"+targets+"']").prop("checked", false);
        }
    },
    //전체클릭 버튼일 경우
    AllCheckBtn : function(targets){
    	var check_val = "";
		if( $("#all_check_gb").val() == "N" ){
			check_val = true;
			$("#all_check_gb").val("Y");
		}else{
			check_val = false;
			$("#all_check_gb").val("N");
		}

		$(":checkbox[name='"+targets+"']").each(function(){
			$(this).prop("checked", check_val );
		});
    },
    //이전페이지
    UrlBack : function(){
        $("#backBtn").click(function(){
            history.back();
        });
    },
    //팝업닫기
    ClosePop : function(){
        $("#closeBtn").click(function(){
            window.close();
        });
    },
    //휴대폰목록 조회
    LoadPhone : function(target, mode){
        Common.GET("/asset/json/contact.json", {dataType: 'json'}).done(function(json){
            Phone.Load(json, target, mode);
        }).fail(function(){
            alert(arguments[1]);
        });
    },
    //이메일목록 조회
    LoadEmail : function(target, set){
        Common.GET("/asset/json/contact.json", {dataType: 'json'}).done(function(json){
            Email.Load(json, target);
            Email.Bind(target, set);
        }).fail(function(){
            alert(arguments[1]);
        });
    },
    //천단위콤마
    NumberFormat : function(str){
        str = str + "";

        if(str == "" || /[^0-9,]/.test(str)) return str;
        str = str.replace(/,/g, "");

        for(var i=0; i<parseInt(str.length/3, 10); i++){
            str = str.replace(/([0-9])([0-9]{3})(,|$)/, "$1,$2$3");
        }

        return str;
    }
}

/*
*  정규식 체크
*/
Validation = {
    Load : function(){
        Validation.Numeric();
        Validation.Numeric_Dash();
        Validation.Alpha();
        Validation.Alpha_Numeric();
        Validation.Alpha_Comma();
        Validation.Alpha_Numeric_Special();
        Validation.Alpha_Numeric_Korean();
    },
    Numeric : function(){
        $(".numeric").on("keyup", function(){
            $(this).val($(this).val().replace(/[^0-9]/gi, ""));
        });
    },
    Numeric_Dash : function(){
        $(".numeric_dash").on("keyup", function(){
            $(this).val($(this).val().replace(/[^0-9:\-]/gi, ""));
        });
    },
    Alpha : function(){
        $(".alpha").on("keyup", function(){
            $(this).val($(this).val().replace(/[^A-Za-z]/gi, ""));
        });
    },
    Alpha_Numeric : function(){
        $(".alpha_numeric").on("keyup", function(){
            $(this).val($(this).val().replace(/[^A-Za-z0-9]/gi, ""));
        });
    },
    Alpha_Comma : function(){
        $(".alpha_comma").on("keyup", function(){
            $(this).val($(this).val().replace(/[^A-Za-z0-9\.]/gi, ""));
        });
    },
    Alpha_Numeric_Special : function(){
        $(".alpha_numeric_special").on("keyup", function(){
            $(this).val($(this).val().replace(/[^A-Za-z0-9\@\.\_\-]/gi, ""));
        });
    },
    Alpha_Numeric_Korean : function(){
        $(".alpha_numeric_korean").on("keyup", function(){
            $(this).val($(this).val().replace(/[^A-Za-z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi, ""));
        });
    }
}

/*
*  네이버 스마트에디터
*/
var oEditors = [];
Editor = {
    Load : function(target){
		var sLang = "ko_KR";	// 언어 (ko_KR/ en_US/ ja_JP/ zh_CN/ zh_TW), default = ko_KR
		// 추가 글꼴 목록
		//var aAdditionalFontSet = [["MS UI Gothic", "MS UI Gothic"], ["Comic Sans MS", "Comic Sans MS"],["TEST","TEST"]];

		nhn.husky.EZCreator.createInIFrame({
			oAppRef: oEditors,
			elPlaceHolder: target,
			sSkinURI: "/asset/se2/SmartEditor2Skin.html",
			htParams : {
				bUseToolbar : true,				// 툴바 사용 여부 (true:사용/ false:사용하지 않음)
				bUseVerticalResizer : true,		// 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
				bUseModeChanger : true,			// 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
				bSkipXssFilter : true,		// client-side xss filter 무시 여부 (true:사용하지 않음 / 그외:사용)
				//aAdditionalFontList : aAdditionalFontSet,		// 추가 글꼴 목록
				fOnBeforeUnload : function(){
					//alert("완료!");
				},
				I18N_LOCALE : sLang
			}, //boolean
			fOnAppLoad : function(){
				//$("#pop_content2").append('<input type="hidden" name="witplus_csrf" value="'+$.cookie('witplus_csrf_cookie')+'" />');
				//예제 코드
				//oEditors.getById[target].exec("PASTE_HTML", [""]);
			},
			fCreator: "createSEditor2"
		});

    }
}

/*
*  기간별 달력 셋팅
*/
DatePeriod = {
    GetDate : function(p, s_date, e_date){
    	var mDay = 0;
		if(p == -1){ // 원경일 임시수정 기간별 달력 Radio Button 중 기간 을클릭시 날짜초기화??   arguments[p] = 0 일경우 해당 아이디의 날짜 초기화.
			$("#"+s_date).val('');
			$("#"+e_date).val('');
			return false;
		}
		/**
         * p
         * 0 : today
         * 10 : 1 month
         * 11 : 2 month
         * 12 : 3 month
         * 13 : 6 month
         * 14 : 1 year
         */
		switch (p) {
		case 1 :
			mDay = 1;
			break;
		case 2 :
			mDay = 7;
			break;
		case 3 :
			mDay = 15;
			break;
		case 4 :
			mDay = 21;
			break;
        case 10 :
            mDay = 31;
            break;
        case 11 :
            mDay = 62;
            break;
        case 12 :
            mDay = 93;
            break;
        case 13 :
            mDay = 186;
            break;
        case 14 :
            mDay = 365;
            break;
		}

		var datToday = new Date();
		if(p < 5 || p > 9){
			$("#"+e_date).val(this.FormatDate(datToday));
			datToday.setDate(datToday.getDate() - mDay);
			$("#"+s_date).val(this.FormatDate(datToday));
		}else if(p == 5){
			var firstDate = new Date(datToday.getFullYear(), datToday.getMonth(), 1);
			var lastDate = new Date(datToday.getFullYear(), datToday.getMonth()+1, 0);
			$("#"+s_date).val(this.FormatDate(firstDate));
			$("#"+e_date).val(this.FormatDate(lastDate));
		}else if(p == 6){
			var firstDate = new Date(datToday.getFullYear(), datToday.getMonth()-1, 1);
			var lastDate = new Date(datToday.getFullYear(), (datToday.getMonth()-1)+1, 0);
			$("#"+s_date).val(this.FormatDate(firstDate));
			$("#"+e_date).val(this.FormatDate(lastDate));
		}else if(p == 7){
            var firstDate = new Date(datToday.getFullYear(), datToday.getMonth(), 1);
            var lastDate = new Date(datToday.getFullYear(), datToday.getMonth()+3, 0);
            $("#"+s_date).val(this.FormatDate(firstDate));
            $("#"+e_date).val(this.FormatDate(lastDate));
        }
    },
    FormatDate : function(date){
        var mymonth = date.getMonth() + 1;
	    var myweekday = date.getDate();
	    return (date.getFullYear() + "-" + ((mymonth < 10) ? "0" : "") + mymonth + "-" + ((myweekday < 10) ? "0" : "") + myweekday);
    }
}

/*
*  다음주소
*/
Address = {
	Load: function(targets){

		// 우편번호 찾기 찾기 화면을 넣을 element
	    var element_layer = document.getElementById('daum_layer');

        new daum.Postcode({
            oncomplete: function(data) {
            	// 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                }

				if(addr !== ''){
	                addr += ' '+extraAddr;
	            }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                $("#"+targets+"_zip").val(data.zonecode);
                $("#"+targets+"_addr1").val( addr );
                $("#"+targets+"_addr2").val("");
				$("#"+targets+"_addr2").focus();

				try {
					 order.addTransCheck();
				} catch (e) {
					console.log("일반 페이지");
				}

                // iframe을 넣은 element를 안보이게 한다.
                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                element_layer.style.display = 'none';
            },
            width : '100%',
            height : '100%',
            maxSuggestItems : 5
        }).embed(element_layer);

        // iframe을 넣은 element를 보이게 한다.
        element_layer.style.display = 'block';

        // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
        this.Position();
	},
	Position: function(){
		var element_layer = document.getElementById('daum_layer');
		var width = 300; //우편번호서비스가 들어갈 element의 width
        var height = 400; //우편번호서비스가 들어갈 element의 height
        var borderWidth = 5; //샘플에서 사용하는 border의 두께

        // 위에서 선언한 값들을 실제 element에 넣는다.
        element_layer.style.width = width + 'px';
        element_layer.style.height = height + 'px';
        element_layer.style.border = borderWidth + 'px solid';
        // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
        element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
        element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';

	},
	Close: function(){
        // iframe을 넣은 element를 안보이게 한다.
        var element_layer = document.getElementById('daum_layer');
        element_layer.style.display = 'none';

    }
}

/*
*  달력함수
*/
Calendar = {
    Load: function(){

        $("#sh_s_date").datetimepicker({
            lang : 'kr',
            format : 'Y-m-d',
            onShow : function(ct){
                this.setOptions({
                    maxDate : $("#edate").val() ? $("#edate").val() : false
                });
            },
            timepicker : false,
            closeOnDateSelect : true
        });

        $("#sh_e_date").datetimepicker({
            lang:'kr',
            format:'Y-m-d',
            onShow:function(ct){
                this.setOptions({
                    minDate:$("#sdate").val() ? $("#sdate").val() : false
                });
            },
            timepicker:false,
            closeOnDateSelect: true
        });


        $("#sdate").datetimepicker({
            lang : 'kr',
            format : 'Y-m-d',
            onShow : function(ct){
                this.setOptions({
                    maxDate : $("#edate").val() ? $("#edate").val() : false
                });
            },
            timepicker : false,
            closeOnDateSelect : true
        });
        $("#edate").datetimepicker({
            lang:'kr',
            format:'Y-m-d',
            onShow:function(ct){
                this.setOptions({
                    minDate:$("#sdate").val() ? $("#sdate").val() : false
                });
            },
            timepicker:false,
            closeOnDateSelect: true
        });

        $(".mdate").datetimepicker({
            lang:'kr',
            format:'Y-m-d',
            timepicker:false,
            closeOnDateSelect: true
        });
    }
}

/*
* 아이디 및 비밀번호 체크
*/
Enable = {
    Id : function(target, tb_gb){
        $("#"+target).bind({
            keyup: function(){
        		var post_data = {
		        	'id' : $(this).val(),
		        	'type': 'id',
		        	'tb_gb': tb_gb
		    	};
                Common.POST("/manager/member/auth/enable", post_data ).done(function(result){
                    var arr = result.split('/');
                    $("#mid_msg").text(arr[1]);
                    $("#m_hid").val(arr[0]);
                }).fail(function(){
                    alert(arguments[1]);
                });
            }
        });
    },
    Pw : function(target1, target2){

        $("#"+target1+", #"+target2+"").bind({
            keyup: function(){
				var post_data = {
		        	'pw' : $("#"+target1).val(),
		        	'pwck' : $("#"+target2).val(),
		        	'type': 'pw'
		    	};
                Common.POST("/manager/member/auth/enable", post_data ).done(function(result){
                	console.log(result);
                    var arr = result.split('/'),
                        m_hpw = $("#m_hpw"),
                        m_hpwck = $("#m_hpwck"),
                        fc_pw = $('.fc_pw'),
                        fc_pwck = $('.fc_pwck');
                    $("#mpw_msg").text(arr[1]); 	 // 메시지
                    m_hpw.val(arr[0]);		 	  	 // 상태
                    $("#mpwck_msg").text(arr[3]); 	 // 메시지
                    m_hpwck.val(arr[2]);    	 	 // 상태

                    //상태별 폰트 컬러 변경
                    if (m_hpw.val() == 'Y'){
                        fc_pw.removeClass('impossible').addClass('possible');
                    }else{
                        fc_pw.removeClass('possible').addClass('impossible');
                    }
                    if (m_hpwck.val() == 'Y'){
                        fc_pwck.removeClass('impossible').addClass('possible');
                    }else{
                        fc_pwck.removeClass('possible').addClass('impossible');
                    }
                }).fail(function(){
                    alert(arguments[1]);
                });
            }
        });
    }
}

/*
* 쿠키관련 set, get
*/

Cookie = {
	Get : function(cname){ //쿠키명
		var name = cname + '='
        var decodedCookie = decodeURIComponent(document.cookie)
        var ca = decodedCookie.split(';')
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) == ' ') {
                c = c.substring(1)
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length)
            }
        }
        return ''
	},
	Set : function(cname, cvalue, exdays){ //쿠키명,쿠키값, 만료기간
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
}


/*
* 주문하기 로그인 체크후 레이어 오픈
*/

Login = {
	Check : function(layer_name, call_gb){
		if(!sesId){
			commonUI.loginLayer.open(layer_name, call_gb);
		}else{
			if(call_gb == "cart"){
				jsOrderSubmit();
			}else if(call_gb == "product"){
				product.buyProduct();
			}
		}
	}
}


/*
* csrf보안 토큰 초기화
*/
Csrf = {
	Set : function(csrtNm) {
		var CsrfSecret = {};
        var CsrfMetaObj = $('meta[name="' + _CSRF_NAME_ + '"]');
        if (typeof csrtNm == 'undefined') {
            CsrfSecret[_CSRF_NAME_] = CsrfMetaObj.attr('content');
        } else {
            CsrfSecret[_CSRF_NAME_] = Cookie.Get('witplus_csrf_cookie');
            $('input[name="' + _CSRF_NAME_ + '"]').val(Cookie.Get('witplus_csrf_cookie'));
        }
        $.ajaxSetup({
            data: CsrfSecret,
            async : false
        });
	}
}

/**
 * 디바이스 체크..
 */
chkDevice = {
    Android: function () {
             return navigator.userAgent.match(/Android/i) == null ? false : true;
    },
    BlackBerry: function () {
             return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;
    },
    IOS: function () {
             return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;
    },
    Opera: function () {
             return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;
    },
    Windows: function () {
             return navigator.userAgent.match(/IEMobile/i) == null ? false : true;
    },
    isPC: function () {
             return !(chkDevice.Android() || chkDevice.BlackBerry() || chkDevice.IOS() || chkDevice.Opera() || chkDevice.Windows());
    }
};

/**
 * url에서 parameter 추출
 */
getParameter = function (param) {
    var returnValue;
    var url = location.href;
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
    for (var i = 0; i < parameters.length; i++) {
        var varName = parameters[i].split('=')[0];
         if (varName.toUpperCase() == param.toUpperCase()) {
          returnValue = parameters[i].split('=')[1];
           return decodeURIComponent(returnValue);
       }
   }
};

/**
 * SNS 공유하기
 */
shareSNS = {
    Twitter : function (msg, url) {
        window.open('http://twitter.com/intent/tweet?text=' + encodeURIComponent(msg) + '&url=' + url, 'sharer', "toolbar=yes,directories=yes,status=yes,menubar=yes,resizable=yes,scrollbars=yes");
    },
    Facebook : function (msg, url) {
        window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url) + "&t=" + encodeURIComponent(msg), "facebook", "titlebar=1, resizable=1, scrollbars=yes, width=600, height=550");
    },
    Kakao : function (msg, url, img) {
        Kakao.init('bd8ad8ef11fef6f4f9c313764390fb31');
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
                title: msg,
                description: '',
                imageUrl: img,
                link: {
                    mobileWebUrl: url,
                    webUrl: url
                }
            }
        });
    },
    Kakaostory : function (msg, url) {
        Kakao.init('bd8ad8ef11fef6f4f9c313764390fb31');
        Kakao.Story.share({
            url: url,
            text: msg
        });
    },
    Clipboard : function (elm) {
        // for Internet Explorer
        if(document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(elm);
            range.select();
            document.execCommand("Copy");
            alert("복사되었습니다.");
        }
        else if(window.getSelection) {
        // other browsers
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(elm);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("Copy");
            alert("복사되었습니다.");
        }
    }
};

$(document).ready(function(){
    Functions.Load();
    Functions.LoadPhone('phone1', '1');
    Functions.LoadEmail('email3', 'email2');
    Validation.Load();
    Csrf.Set();
});