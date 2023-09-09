/* *********** */
/* Last Updata : 2021.01.26.
/* *********** */

/*
 * global variable : commonUI
 */

var commonUI = commonUI || {};

(function(_c){    
    
    /**
     * Mobile Resize
     * @namespace isMobile
     * @example
     * commonUI.isMobile;
     */
     
    _c.isMobile = (function(){
        var isMobile = false;
        var screenSize = parseInt($(this).width());
        if( 768 > screenSize){
            isMobile = true;
        }

        $(window).bind('resize', function(){
            var reSize = parseInt($(this).width());
            if( 768 > reSize && commonUI.isMobile == false){
                commonUI.isMobile = true;
               // console.log("mb");
            }else if(768 <= reSize && commonUI.isMobile == true){
                commonUI.isMobile = false;
              //  console.log("pc");
            }
        });

        return isMobile;
    })();

    /**
     * layer Event
     * @namespace layer
     * @example
     * commonUI.layer.open(target, { option name : option value }) = layer open;
     * commonUI.layer.close() = layer close;
     */
     _c.layer = (function(){
        var open,
            close,
            _openEvent,
            _speed = 700,
            _$target = '.layer_box';

        var defaultOption = {
            ajaxUrl : undefined,
            layerType : 'bottom',
            ajaxCall : false,
            alert : false,
            right : false,
            bg : false,
            nofullsize : false,
            prevTarget : undefined,
            active : false
        }

        // var option = Object.assign({}, defaultOption);
        var option = {};
        for (var att in defaultOption) { 
            option[att] = defaultOption[att]; 
        }

        open = function(target, newOption){
            if(option.prevTarget != undefined){
                close( function(){
                    if(target !== undefined){
                        _$target = $(target);
                    }
                    _openEvent(target, newOption);
                });
            }else{
                _openEvent(target, newOption);
            }
        }

        _openEvent = function(target, newOption){
            
            for (var att in newOption) { 
                option[att] = newOption[att]; 
            }

            if( option.ajaxUrl != undefined ){
                $.ajax({
                    url: option.ajaxUrl,
                    async: false,
                    data    : '',
                    success : function(result) {
                        $('body').append(result);
                        console.log(option);
                    }
                });

                option.ajaxCall = true;
            }
            
            if(target !== undefined){
                _$target = $(target);
            }

            if(option.bg){
                _$target.addClass('bg_layer');
            }

            if(option.nofullsize){
                _$target.addClass('no_full_layer');
            }

            if(option.alert){
                _$target.addClass('alert');
                _$target.fadeIn();
                option.alert = true;
            }else{
                if(option.right){
                    _$target.show();
                    _$target.addClass('right');
                    _$target.find('.layer_outer').animate({
                        'right' : '0'
                    }, _speed);
                    option.right = true;
                }else{
                    _$target.show();
                    console.log(_$target);
                    _$target.find('.layer_outer').animate({
                        'bottom' : '0'
                    }, _speed);
                }
            }

            option.prevTarget = _$target;
            option.active = true;
        }
    
        close = function(callbackFn){
            
            if(option.active){
                if( option.prevTarget == undefined ){
                    option.prevTarget = _$target;
                }

                if( option.alert ){
                    option.prevTarget.fadeOut();
                    option.alert = false;
                    
                    _$target.removeClass('alert');

                    for (var att in defaultOption) { 
                        option[att] = defaultOption[att]; 
                    }

                    option.active = false;

                    if( callbackFn !== undefined ){
                        callbackFn();
                    }
                }else if(option.right){
                    option.prevTarget.find('.layer_outer').animate({
                        'right' : '-100%'
                    }, _speed, function(){
                        option.prevTarget.hide();
                        option.prevTarget = undefined;
                        option.right = false;
                        _$target.removeClass('right');

                        for (var att in defaultOption) { 
                            option[att] = defaultOption[att]; 
                        }

                        option.active = false;

                        if( callbackFn !== undefined ){
                            callbackFn();
                        }
                    });
                }else{

                    if( option.ajaxCall ){
                        option.prevTarget.find('.layer_outer').fadeOut(function(){

                            option.prevTarget.remove();
                            option.ajaxCall = false;
                            option.prevTarget = undefined;
                            
                            for (var att in defaultOption) { 
                                option[att] = defaultOption[att]; 
                            }

                            option.active = false;
                            _$target = '.layer_box';

                            if( callbackFn !== undefined ){
                                callbackFn();
                            }
                        });
                        
                    }else{
                        option.prevTarget.find('.layer_outer').animate({
                            'bottom' : '-100%'
                        }, _speed, function(){
                            option.prevTarget.hide();
                            option.prevTarget = undefined;
                                            
                            if(option.bg){
                                _$target.removeClass('bg_layer');
                            }

                            if(option.nofullsize){
                                _$target.removeClass('no_full_layer');
                            }
                            
                            for (var att in defaultOption) { 
                                option[att] = defaultOption[att]; 
                            }

                            option.active = false;
                            _$target = '.layer_box';

                            if( callbackFn !== undefined ){
                                callbackFn();
                            }
                        });
                    }
                }
            }else{
                if( callbackFn !== undefined ){
                    callbackFn();
                }
            }
        }

        $(document).keydown(function(event){
            if(event.keyCode == '27'){
                close();
            }
        });

        return {
            open : open,
            close : close
        }
    })();

    /**
     * js_top Event
     * @namespace scrollTop
     * @example
     * default auto Apply Class Name = scrollTop
     * new  commonUI.scrollTop(target) = Scroll Top Event Apply;
     */
    _c.scrollTop = (function(){
        var _bindEvent, moveEvent;

        _bindEvent = function(){
            $('.js_top_btn').on('click', function(){
                moveEvent();
            });
        }

        moveEvent = function(){
            $('html,body').animate({ scrollTop : '0px'}, 500);
        }

        $(document).ready(function(){
            _bindEvent();
        });

        return moveEvent;
    })();
    
    /**
     * Gnb Menu Event
     * @namespace gnbMenu
     * @example
     * commonUI.gnbMenu.event_bind() = GNB Menu event Binding;
     * commonUI.gnbMenu.open() = GNB Menu open;
     * commonUI.gnbMenu.close() = GNB Menu close;
     */
     
     _c.gnbMenu = (function(){
        var event_bind, open, _over, cart, cart_close, close, _speed = 500, _speed2 = 2000;;

        event_bind = function(){

            $('#header .gnb_open').on('click', function(){
                    open();
            });

            if($(window).width() > 768){
                //console.log("pc");
                $('#header .gnb_open').on('mouseover', function(){
                    _over();
                });
            }
            
            $('#contents').on('mouseover', function(){
                close();
            });
            
            $('#header .gnb_close').on('click', function(){
                close();
            })

            $('#header .gnb_box .depth1 button.depth1_tit').on('click', function(){
                $(this).toggleClass('on');
            })
        }

        open = function(){
            var $gnbBox = $('#header .gnb_box');

            $gnbBox.css('display', 'block');
            if(_c.isMobile){
                $gnbBox.animate({ 'left' : '0'}, _speed);
                // $("body").animate({ 'left' : '-100%'}, _speed);
            }
        }

        _over = function(){
            var $gnbBox = $('#header .gnb_box');

            $('#header .search_box').hide();
            commonUI.search.close();
            commonUI.layer.close();
            $gnbBox.css('display', 'block');
        }

        cart = function(){
            Csrf.Set(_CSRF_NAME_); //토큰 초기화
            $.ajax({
                type: 'POST',
                url: "/order/cart/cart_list_ajax",
                success : function(result) {
                    // console.log(result);
                    $('#header_cart_div').html(result);
                    commonUI.layer.open({ target : '.cart_layer', bg : true })
                }
            });


        }

        close = function(){
            var $gnbBox = $('#header .gnb_box');

            if(_c.isMobile){
                $gnbBox.animate({ 'left' : '100%'}, _speed, function(){
                    $gnbBox.css('display', 'none');
                });
                // $("body").animate({ 'left' : '0'}, _speed);
            }else{
                $gnbBox.css('display', 'none');
            }
        }

        return {
            event_bind : event_bind,
            open : open,
            cart : cart,
            cart_close : cart_close,
            close : close
        }
     })();

    /**
     * Tab Module
     * @namespace tabModule
     * @example
     * default auto Apply Class Name = js_tab
     * new commonUI.tabModule(target) = New Toggle Event Apply;
     */
    _c.tabModule = (function(){
        
        var tab = function(target){
            this.$tabWrap = $(target);
            this.$tabBtn = this.$tabWrap.find(">.js_tabBtn li button");
            this.$tabCon = this.$tabWrap.find(">.js_tabCon");
            this.eventBinding();
        };

        tab.prototype = {
            eventBinding : function(){
                var self = this;
                this.$tabBtn.on("click", function(){
                    self.activeEvent(this);
                });
            },
            activeEvent : function(tg){
                var $tg = $(tg).parent(),
                    tgIdx = $tg.index();
                this.$tabBtn.parent().removeClass("on");
                this.$tabCon.removeClass("on");
                $tg.addClass("on");
                this.$tabCon.eq(tgIdx).addClass("on");
            }
        }

        return tab;
    })();

    /**
     * Accordion Toggle Module
     * @namespace acdModule
     * @example
     * default auto Apply Class Name = js_acd_toggle
     * new commonUI.acdModule(target) = New Toggle Event Apply;
     */
    _c.acdModule = (function(){
        var acd = function(target){
            
            this.$acdWrap = $(target);
            this.$acdLi = this.$acdWrap.find(">li");
            this.$acdBtn = this.$acdWrap.find(">li>.btn_acd");
            this.$acdCon = this.$acdWrap.find(">li>.con_acd");
            this.eventBinding();

            if(this.$acdLi.hasClass("active") === true){
                $(".active").addClass("on").find(".con_acd").slideDown();
            }
        };

        acd.prototype = {
            eventBinding : function(){
                var self = this;
             
                this.$acdBtn.on("click", function(){
                    
                    self.activeEvent(this);
                });
            },
            activeEvent : function(tg){
                var $tg = $(tg).parent(),
                     $tgCon = $(tg).next();
                $tg.toggleClass("on");
                $tgCon.slideToggle();
            }
        }

        return acd;
    })();

    /**
     * toggleSelect Event
     * @namespace toggleSelect
     * @example
     * default auto Apply Class Name = js_toggle
     * new commonUI.toggleSelect(target) = New Toggle Event Apply;
     */
     _c.toggleSelect = (function(){

        var apply = function(target){

            this.$t = $(target);
            this.$b = $(".js_title_btn", this.$t);
            this.$i = $('input', this.$t);
            this.$u = $('ul', this.$t);
            this.$c = $(".js_change_btn", this.$t);
            this.$bg = $(".bg", this.$t);
            this.eventBinding();
        };
    
        apply.prototype = {
            eventBinding : function(){
                var self = this;
                
                this.$b.on('click', function(){ self._titClickEvent() });
                this.$c.on('click', function(){ self._changeClickEvent(this) });
                this.$bg.on('click', function(){ self.$b.removeClass('on'); });
                
                this.$c.each(function(idx){
                    if($(this).find('span').html() == self.$b.find('span').html()){
                        $(this).parent().addClass('check');
                    }
                })
            },
            _titClickEvent : function(){
                this.$b.toggleClass('on');
            },
            _changeClickEvent : function(target){
                this.$b.removeClass('on');
                this.$i.attr('value', $(target).find('span').html());
                this.$b.find('span').html($(target).find('span').html());
                this.$b.addClass("active");
                this.$u.find('li').removeClass('check');
                $(target).parent().addClass('check');
            }
        }
    
        return apply;
     })();
     
    /**
     * js_textarea Event
     * @namespace js_textarea
     * @example
     * default auto Apply Class Name = js_textarea
     * new  commonUI.js_textarea(target) = New Textarea Event Apply;
     */
     
    _c.js_textarea = (function(){

        var apply = function(target){

            this.$t = $(target);
            this.$b = $("textarea", this.$t);
            this.$c = $("p span", this.$t);
            this.eventBinding();
        };
    
        apply.prototype = {
            eventBinding : function(){
                var self = this;
                this.$b.keyup(function (e){
                    var content = $(this).val();
                    self.$c.html(content.length);
                
                    if (content.length > 150){
                        alert("최대 150자까지 입력 가능합니다.");
                        $(this).val(content.substring(0, 150));
                        self.$c.html("150");
                    }
                });
            }
        }
    
        return apply;
     })();

    /**
     * js_input_error_message Event
     * @namespace js_input_error_message
     * @example
     * default auto Apply Class Name = js_input_error_message
     * new  commonUI.js_input_error_message(target) = New Input Error Message Event Apply;
     */
    _c.js_input_error_message = (function(){

        var apply = function(target){

            this.$t = $(target);
            this.$i = this.$t.prev();
            this.eventBinding();
        };
    
        apply.prototype = {
            eventBinding : function(){
                var self = this;

                this.$t.on('click', function(){
                    self.$t.removeClass('on');
                    self.$i.focus();
                })
            }
        }
    
        return apply;
     })();
     
    /**
     * Site language Change Event
     * @namespace language_change
     * @example
     * default auto Apply Class Name = js_language
     */
    _c.language_change = function(){
        $(".js_language").on('change', function(){
            var txt = this.value;
            // console.log(txt);

            var locationUrl = '/language_switcher/switch_lang/' + txt;
            location.href = locationUrl;
        });

	    $(".js_delivery").on('change', function(){
		    var txt = this.value;
		    // console.log(txt);

		    var locationUrl = '/delivery_switcher/switch_dlvy/' + txt;
		    location.href = locationUrl;
	    });
    };
     
    /**
     * Header Search Box Event
     * @namespace search_box
     * @example
     * default auto Apply Class Name = search_box
     */
    _c.search_box = function(){
	    $("html").click(function(e){
            if(!$(e.target).hasClass("srch_close_event")){
                $('.search_lists_wrap').hide();
            }else{
                $('.search_lists_wrap').show();
            }
        });
    };

    /**
     * lnb Tab Menu
     * @namespace js_lnbTab
     * @example
     * default auto Apply Class Name = js_lnb_tab
     * new commonUI.lnbModule(target) = New Toggle Event Apply;
     */
     
    _c.js_lnbTab = (function(){
        var lnbTab = function(target){
            this.$lnbWrap = $(target);
            this.$lnbCon = this.$lnbWrap.find(">.page_tit>.tg_menu");
            this.$lnbPcBtn = this.$lnbWrap.find(">.page_tit>ul li");
            this.$lnbMbBtn = this.$lnbWrap.find(">.page_tit>h2 button");
            this.eventBinding();
        };

        lnbTab.prototype = {
            eventBinding : function(){
                var self = this;
                this.$lnbMbBtn.on("click", function(){
                    self.$lnbCon.stop().slideToggle();
                });
            }
        }

        return lnbTab;
    })();
    
    /**
     * default Event Binding
     * @namespace defaultEventBinding
     * @example
     * commonUI.defaultEventBinding();
     */
    _c.defaultEventBinding = function(){
        
        /* Tab Default Apply */
        $('.js_tab').each(function () {
            new commonUI.tabModule(this);
        });
        /* Acd Default Apply */
        
        $('.js_acd_toggle').each(function () {
            new commonUI.acdModule(this);
        });
        /* Toggle Default Apply */
        $('.js_toggle').each(function () {
            new commonUI.toggleSelect(this);
        });
        /* Textarea count Default Apply */
        $('.js_textarea').each(function () {
            new commonUI.js_textarea(this);
        });
        /* lnb Tab Default Apply */
        $('.js_lnb_tab').each(function () {
            new commonUI.js_lnbTab(this);
        });
        /* Input Error Message count Default Apply */
        $('.js_input_error_message').each(function () {
            new commonUI.js_input_error_message(this);
        });

        commonUI.gnbMenu.event_bind();
        commonUI.language_change();
        commonUI.search_box();
    }

    $(window).scroll(function(){
        var $header = $("header"),
            scrlTop = $(window).scrollTop(),
            hdHeight = $header.outerHeight();
    
        if(scrlTop >= hdHeight){
            $header.addClass("fixed");
        }
        else{
            $header.removeClass("fixed");
        }
    });
})(commonUI);

$(document).ready(function(){
    commonUI.defaultEventBinding();

    //date picker
    // $(".datepicker input").datepicker({
    //     dateFormat: "yy-mm-dd"
    // });

    $('.mb_back_btn').on('click', function(){
        window.history.back();
    })
});

$(window).bind('resize', function(){
	if(commonUI.isMobile){

	}else{
        if($(".js_list_img").length){
            $(".js_list_img.slick-initialized").slick('unslick');
        }
	}
});
