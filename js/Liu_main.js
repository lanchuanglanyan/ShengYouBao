$(document).ready(function () {
    var $body=$('body');
    var $url='http://www.youguangchina.cn/';
    var userid=localStorage.getItem('userId');
    console.log('userid',userid);

    //后退
    $body.on('click','#back',function () {
        history.back();
    });

    //点击跳转导航
    $body.on('click','#personal-footer .menu-btn',function () {
        var page=$(this).attr('data-page');
        if(page!==''&&page!==undefined&&page!==null){
            window.location.href=page;
        }
    });



    /***************欢迎页面模块***************/
    //var startX1,startX2,startY1,startY2;
    // $body.on('touchstart','#welCome>.tabs',function (e) {
    //     console.log(e);
    //     startX1 = e.originalEvent.changedTouches[0].pageX;
    //     startY1 = e.originalEvent.changedTouches[0].pageY;
    //
    // });
    // $body.on('touchend','#welCome>.tabs',function (e) {
    //     // console.log(e);
    //     startX2 = e.originalEvent.changedTouches[0].pageX;
    //     startY2 = e.originalEvent.changedTouches[0].pageY;
    //
    //     var sx=startX2-startX1;
    //     var sy=startY2-startY1;
    //     console.log(sx,sy);
    //     if(sx>50&&(sy<200&&sy>-200)){
    //         console.log('右滑');
    //         $(this).siblings().removeClass('shanxian').find('.dgo').hide().siblings().show();
    //         $(this).addClass('right').removeClass('left');
    //
    //     }else if(sx<-50&&(sy<200&&sy>-200)){
    //         console.log('左滑');
    //         $(this).addClass('left').removeClass('right');
    //         $(this).siblings().find('.dt').hide().siblings().show();
    //         $(this).siblings().addClass('shanxian');
    //
    //     }
    // });



    //点击进入首页
    $body.on('click','#welCome .dgo',function () {
        $('#welCome').hide();
        localStorage.setItem('first',true);
    });
    //判断是否是第一次进入
    var first=localStorage.getItem('first');
    console.log('是否第一次',first);
    if(first===''||first===undefined||first===null){
        var $welCome=$('#welCome');
        $welCome.show().find('.tabs').delay(3000).animate({"left":"-100%"},1000,function () {
            $welCome.find('.dan').addClass('shanxian').find('.dt').hide().siblings().show();
        });

    }



    /***************首页模块***************/
    //横向滚动banner，不可切换
    if($body.parent().attr('data-page')==='index'){
        // console.log(userid);
        //判断是否登录
        if(userid!==''&&userid!==undefined&&userid!==null){
            $('#nav').find('.per').parent().hide().siblings('a').show();
        }else {
            $('#nav').find('.per').parent().show().siblings('a').hide();
        }

        var $banner=$('#banner');
        var bannerLength=0;
        //获取banner
        $.ajax({
            url:$url+'OilSaving/system/rotatepics',
            method:'GET',
            success:function (data) {
                bannerLength=data.pics.length;
                $banner.children().css('width',(bannerLength+1)*100+'vw');
                for(var i=0;i<=bannerLength;i++){
                    var html;
                    if(i===bannerLength){
                        html='<a href="activity.html"><div data-id="'+data.pics[0].id+'"></div></a>';
                        $banner.children().append(html);
                        $('div[data-id="'+data.pics[0].id+'"]').css('background-image','url('+data.pics[0].url+')');
                    }else {
                        html='<a href="activity.html"><div data-id="'+data.pics[i].id+'"></div></a>';
                        $banner.children().append(html);
                        $('div[data-id="'+data.pics[i].id+'"]').css('background-image','url('+data.pics[i].url+')');
                        // console.log(data.pics[i]);

                    }
                }
            }
        });

        var bannerLen=0;
        function bannerTime() {
            bannerLen++;
            // console.log(bannerLen,bannerLength);
            var animateLength = bannerLen*(-100)+"vw";
            $("#banner").children().animate({"left":animateLength},1000,function(){
                if(bannerLen===bannerLength){
                    bannerLen=0;
                    $("#banner").children().css({"left":0});
                }
            });
        }
        setInterval(bannerTime,2500);



        function number() {
        $.ajax({
            url:$url+'OilSaving/data/getVirtualPeople',
            method:'GET',
            contentType:'application/json',
            success:function (data) {
                $('#useInfo').find('.car').find('.txt').text(data);
            },
            error:function () {

            }
        });
        $.ajax({
            url:$url+'OilSaving/data/getVirtualMoney',
            method:'GET',
            contentType:'application/json',
            success:function (data) {
                $('#useInfo').find('.money').find('.txt').text(data);
            },
            error:function () {

            }
        });
    }
        number();
        //虚拟参数
        var xunicanshu=setInterval(function () {
            number();
        },180000);

        //点击进入套餐选择
        $body.on('click','#SY_mukuai1 .SiXiao a',function () {
            var discount=$(this).find('[data-discount]').attr('data-discount');
            var prepaid=$(this).find('[data-prepaid]').attr('data-prepaid');
            console.log('首页选择套餐时获取金额、折扣',discount,prepaid);
            localStorage.setItem('discount',discount);
            localStorage.setItem('prepaid',prepaid);
            window.location.href='AccountRecharge1.html';
        });
    }

    /***************登录/注册模块***************/
    if($body.parent().attr('data-page')==='login'){
        //点击切换tabs
        $body.on('click','#logoBanner .tabs>div',function () {
                $(this).addClass('act').siblings().removeClass('act');
                var $class=$(this).attr('class').split(' ')[0];
                // console.log($class);
                $('#Tab').find('.'+$class+'').show().siblings().hide();
            });
        //登录>选择短信验证
        $body.on('click','#Tab>.login>.yanzheng a',function () {
                $(this).parent().parent().parent().find('.txt.pass').removeClass('act');
                $(this).parent().parent().parent().find('.txt.message').removeClass('act');
                $(this).parent().parent().parent().find('.txt.'+$(this).removeClass('act').attr('class')+'').addClass('act');
                $(this).removeClass('act').siblings().addClass('act')
            });
        //忘记密码
        $body.on('click','#Tab>.login>.forget a',function () {
                $(this).parent().parent().parent().find('.txt.pass').removeClass('act');
                $(this).parent().parent().parent().find('.txt.message').removeClass('act');
                $(this).parent().parent().parent().find('.txt.message').addClass('act');
            });
        //点击发送验证码
        var mes=false;
        $body.on('click','.button>a',function () {
                var $this=$('.button>a');
                var phone=$(this).parents('.txt').parent().find('input.userphone').val();
                var data={tel:phone};
                if(phone===''||phone===null||phone===undefined){
                    alert('请填写手机号')
                }else if(mes===false){
                    mes=true;
                    var count=60;
                    $this.text(count+'秒后重试');
                    var time=setInterval(function () {
                        count--;
                        $this.text(count+'秒后重试');
                        if(count===0){
                            mes=false;
                            clearInterval(time);
                            $this.text('发送验证码');
                        }
                    },1000);
                    // console.log(JSON.stringify(data));
                    $.ajax({
                        url:$url+'OilSaving/message/sendMessage',
                        method:'POST',
                        contentType:'application/json',
                        data:JSON.stringify(data),
                        success:function (data) {
                            console.log('短信发送是否成功',data);
                        },
                        error:function () {

                        }
                    });

                }
            });
        //点击登录
        $body.on('click','#loginGo',function () {
                var username=$(this).parent().find('input.userphone').val();
                var pass=$(this).parent().find('.mode.act').find('input').val();
                var mode=$(this).parent().find('.mode.act').attr('class').split(' ')[1];
                if(username===''||pass===''||username===null||pass===null||username===undefined||pass===undefined){
                    alert('用户名和密码/验证码不可为空');
                }else {
                    var data;
                    console.log('判断用户、密码、验证形式',username,pass,mode);
                    if(mode==='pass'){
                        data={tel:username,password:pass};
                        $.ajax({
                            url:$url+'OilSaving/user/loginByPassword',
                            method:'POST',
                            contentType:'application/json',
                            data:JSON.stringify(data),
                            success:function (data) {
                                if(data.result!==undefined&&data.result!==null){
                                    alert('账户或密码不正确，请重新输入')
                                }else {
                                    localStorage.setItem('userId',data.userId);
                                    history.back();
                                }
                                // console.log('反馈',data);
                            },
                            error:function () {

                            }
                        });
                    }else {
                        data={tel:username,verificationCode:pass};
                        $.ajax({
                            url:$url+'OilSaving/user/loginByCode',
                            method:'POST',
                            contentType:'application/json',
                            data:JSON.stringify(data),
                            success:function (data) {
                                if(data.result!==undefined&&data.result!==null){
                                    alert('账户或密码不正确，请重新输入')
                                }else {
                                    localStorage.setItem('userId',data.userId);
                                    history.back();
                                }
                                // console.log(data);
                            },
                            error:function () {

                            }
                        });
                    }
                }
            });
        //点击注册
        $body.on('click','#registerGo',function () {
                var user=$(this).parent().find('input.userphone').val();
                var pass=$(this).parent().find('input.pass').val();
                var message=$(this).parent().find('input.message').val();
                var recommenderTel=$(this).parent().find('input.user').val();
                var type=parseInt($(this).parent().find('input[type=radio]:checked').attr('data-type'));
                var data={tel:user,password:pass,verificationCode:message,recommenderTel:recommenderTel,type:type};
                console.log('发送参数',data);
                if(user===''||pass===''||message===''||user===undefined||pass===undefined||message===undefined||user===null||pass===null||message===null){
                    alert('请完善信息');
                }else {
                    $.ajax({
                        url:$url+'OilSaving/user/register',
                        method:'POST',
                        contentType:'application/json',
                        data:JSON.stringify(data),
                        success:function (data) {
                            // console.log(data);
                            if(data.result==='success'){
                                alert('注册成功');
                                $('#logoBanner').find('.login').trigger('click');
                            }else if(data.message==='已注册'){
                                alert('该账号已注册');
                                $('#logoBanner').find('.login').trigger('click');
                            }
                        },
                        error:function () {

                        }
                    });
                }
            });

        }

    /***************账户充值模块***************/
    var $nextGo=$('#nextGo');
    var $package=$('#package');

    if($body.parent().attr('data-page')==='accountRecharge1'||$body.parent().attr('data-page')==='accountRecharge2'){
        var discount=localStorage.getItem('discount');
        var prepaid=localStorage.getItem('prepaid');
        console.log('获得首页套餐折扣、金额',discount,prepaid);
        $('#prepaid').find('input.prepaid').val(prepaid);
        $package.find('[data-discount="'+discount+'"]').parent().addClass('active').siblings().removeClass('active');

        var $bill=$('#bill');
        var $coupon=$('#coupon');
        var money=localStorage.getItem('money');


        //充值小数点后两位
        $body.on('input','input.prepaid',function () {
            var c=$(this);
            var temp;
            if(/[^0-9.]/g.test(c.val())){
                temp=c.val().replace(/[^0-9.]/g,'');
                $(this).val(temp);
            }else{
                temp=c.val().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
                $(this).val(temp);
            }
            accounting();
        });
        //选择套餐
        $body.on('click','#package>div',function () {
            $(this).addClass('active').siblings().removeClass('active');
            accounting();
        });
        //计算价格方法
        function accounting() {
            var money=parseFloat($('#prepaid').find('input.prepaid').val());
            if(!isNaN(money)){
                var discount=parseFloat($package.find('.active').find('.discount').attr('data-discount'));
                var interval=parseFloat($package.find('.active').find('.interval').attr('data-interval'));
                var $accounting=$('#accounting');
                $accounting.find('.yuanjia').text(parseInt(money*interval*100)/100);
                $accounting.find('.xianjia').text(parseInt(money*interval*discount*100)/100);
                $accounting.find('.sheng').text(parseInt((money*interval-money*interval*discount)*100)/100);
                $nextGo.find('.yuanjia').text(parseInt(money*interval*100)/100);
                $nextGo.find('.xianjia').text(parseInt(money*interval*discount*100)/100);
                $nextGo.find('.sheng').text(parseInt((money*interval-money*interval*discount)*100)/100);
            }else {
                $('#accounting').find('span').text(0);
                $nextGo.find('span').text(0);
            }
        }
        accounting();


        //查看账单
        $body.on('click','#bill .bill',function () {
            $bill.find('.bills').addClass('act');
            $bill.find('.billsK').animate({bottom:'0'},200);
            $bill.find('.back').animate({bottom:'0'},200);

            capitalAccount();
        });
        $body.on('click','#bill .back',function () {
            $bill.find('.bills').removeClass('act');
            $bill.find('.billsK').animate({bottom:'-60%'},100);
            $bill.find('.back').animate({bottom:'-51%'},100);
        });
        //查看优惠券
        $body.on('click','#coupon .bill',function () {
            $coupon.find('.bills').addClass('act');
            $coupon.find('.billsK').animate({bottom:'0'},200);
            $coupon.find('.back').animate({bottom:'0'},200);
        });
        $body.on('click','#coupon .back',function () {
            $coupon.find('.bills').removeClass('act');
            $coupon.find('.billsK').animate({bottom:'-60%'},100);
            $coupon.find('.back').animate({bottom:'-51%'},100);
        });
        //加入列表-优惠券
        $.ajax({
            url:$url+'OilSaving/user/coupons',
            method:'POST',
            contentType:'application/json',
            data:JSON.stringify({userId:userid}),
            success:function (data) {
                var arr=[];
                $.each(data.coupons,function (ind,val) {
                    var html;
                    if(money>=val.conditionAmount){
                        html='<div style="font-weight: bold;font-size: 0.4rem" data-couponId="'+val.couponId+'" data-on="1">\n' +
                            '<div>'+val.conditionAmount+'元</div>\n' +
                            '<div>'+val.discountAmount+'元</div>\n' +
                            '</div>\n';
                        arr.push(val);//获取满足充值条件的优惠券
                        $coupon.find('.biLLs').prepend(html);

                    }else {
                        html='<div style="color: silver" data-couponId="'+val.couponId+'" data-on="0">\n' +
                            '<div>'+val.conditionAmount+'元</div>\n' +
                            '<div>'+val.discountAmount+'元</div>\n' +
                            '</div>\n';
                        $coupon.find('.biLLs').append(html);
                    }
                });

                if(arr.length===0){
                    $coupon.find('.bill').html('暂无优惠券可用<span>></span>').attr('data-couponId','').attr('data-money','0')
                }else {
                    var time=parseInt(arr[0].endDate.replace('-','').replace('-',''));
                    var couponId=arr[0].couponId;
                    var discountAmount=arr[0].discountAmount;
                    var conditionAmount=arr[0].conditionAmount;
                    $.each(arr,function (ind,val) {
                        if(conditionAmount<val.conditionAmount){//1级判断优惠券面值
                            conditionAmount=val.conditionAmount;
                            couponId=val.couponId;
                            discountAmount=val.discountAmount;
                            time=parseInt(val.endDate.replace('-','').replace('-',''));
                        }else if(conditionAmount===val.conditionAmount){
                            if(discountAmount<val.discountAmount){//2级判断优惠券金额
                                conditionAmount=val.conditionAmount;
                                couponId=val.couponId;
                                discountAmount=val.discountAmount;
                                time=parseInt(val.endDate.replace('-','').replace('-',''));
                            }else if(discountAmount===val.discountAmount){
                                if(time<parseInt(val.endDate.replace('-','').replace('-',''))){//3级判断优惠券有效期
                                    conditionAmount=val.conditionAmount;
                                    couponId=val.couponId;
                                    discountAmount=val.discountAmount;
                                    time=parseInt(val.endDate.replace('-','').replace('-',''));
                                }else {}
                            }
                        }else {}
                    });
                    $coupon.find('.bill').html(discountAmount+'元<span>></span>').attr('data-couponId',couponId).attr('data-money',discountAmount);
                }

                var money2=parseFloat($coupon.find('.bill').attr('data-money'));
                $('#money').children(':last-child').text('￥'+(money-money2));


            },
            error:function () {

            }
        });
        //加入列表-资金到账
        function capitalAccount() {
            var $bill=$('#bill');
            $bill.find('.biLLs').html('');
            var myDate=new Date();
            var year=myDate.getFullYear();//当年
            var month=myDate.getMonth()+1;//当月
            var date=myDate.getDate();//当日
            var money;
            var interval;
            var Month=month;
            var Year=year;
            var html;
            if($body.parent().attr('data-page')==='accountRecharge1'){
                money=parseFloat($('#prepaid').find('.prepaid').val());
                interval=parseInt($('#package').find('.active').find('.interval').attr('data-interval'));
            }else {
                money=parseFloat(localStorage.getItem('money2'));
                interval=parseInt(localStorage.getItem('totalMonths'));
            }
            for(var i=1;i<interval+1;i++){
                var lastdate=new Date(year,month+i,0).getDate();//当月最后日
                Month++;
                if(Month>12){
                    Month-=12;
                    Year+=1;
                }
                if(date>lastdate){
                    html='<div>\n' +
                        '<div>'+Year+'年'+Month+'月'+lastdate+'日'+'</div>\n' +
                        '<div>'+money+'元</div>\n' +
                        '</div>\n';
                }else {
                    html='<div>\n' +
                        '<div>'+Year+'年'+Month+'月'+date+'日'+'</div>\n' +
                        '<div>'+money+'元</div>\n' +
                        '</div>\n';
                }
                $bill.find('.biLLs').append(html);
                $bill.scrollTop(0);
            }
        }


        //选择优惠券
        $body.on('click','#coupon .biLLs>div',function () {
            if($(this).attr('data-on')==='1'){
                var couponId=$(this).attr('data-couponId');
                var money=$($(this).children()[1]).text();
                var $coupon=$('#coupon');
                $coupon.find('.bill').html(money+'<span>></span>').attr('data-couponId',couponId).attr('data-money',money);
                $coupon.find('.bills').find('.back').trigger('click');
                var money1=parseFloat(localStorage.getItem('money'));
                var money2=parseFloat($coupon.find('.bill').attr('data-money'));
                $('#money').children(':last-child').text('￥'+(money1-money2));

            }else {}
        });
        //去充值
        $body.on('click','#nextGo .nextGo',function () {
            var $prepaid=$('#prepaid');

            window.location.href='AccountRecharge2.html';
            localStorage.setItem('money',parseFloat($nextGo.find('.xianjia').text()));
            localStorage.setItem('money2',$prepaid.find('.prepaid').val());
            localStorage.setItem('discount',$package.find('.active').find('[data-discount]').attr('data-discount'));
            localStorage.setItem('totalMonths',$package.find('.active').find('[data-interval]').attr('data-interval'));
            localStorage.setItem('prepaid',$prepaid.find('input.prepaid').val());
            localStorage.setItem('duePayment',parseFloat($nextGo.find('.yuanjia').text()));
        });

        //充值
        $body.on('click','#rechargeGo',function () {
            var duePayment=parseFloat(localStorage.getItem('duePayment'));
            var actualPayment=localStorage.getItem('money')-parseInt($coupon.find('.bill').attr('data-money'));
            var couponId=$coupon.find('.bill').attr('data-couponId');
            var rechargeType=$('#paymentMethod').find('input[type=radio]:checked').attr('data-type');
            var totalMonths=localStorage.getItem('totalMonths');

            console.log('每月到账金额，实付金额，优惠券id，支付方式，套餐月份',duePayment,actualPayment,couponId,rechargeType,totalMonths);

            if(userid===''||userid===null||userid===undefined){
                alert('您还未登录，请先登录');
                window.location.href='Login.html';
            }else {

                $.ajax({
                    url:$url+'OilSaving/identity/searchVerify',
                    method:'POST',
                    contentType:'application/json',
                    data:JSON.stringify({userId:userid}),
                    success:function (dat) {
                        // console.log(dat.status);
                        if(parseInt(dat.status)===0){
                            alert('您尚未实名认证，无法充值');
                            window.location.href=''//跳转实名认证
                        }else {
                            //充值操作
                            var data={userId:userid,rechargeType:rechargeType,duePayment:duePayment,actualPayment:actualPayment,couponId:couponId,rechargeContent:2,totalMonths:totalMonths};
                            // console.log(data);
                            $.ajax({
                                url:$url+'OilSaving/pay',
                                method:'POST',
                                contentType:'application/json',
                                data:JSON.stringify(data),
                                success:function (data) {
                                    // console.log(data);
                                    $('body').append(data);
                                },
                                error:function () {

                                }
                            });
                        }

                    }
                });


            }


        });



    }else {
        localStorage.setItem('discount',0.9);
        localStorage.setItem('prepaid','');

    }

    /***************客服模块***************/
    if($body.parent().attr('data-page')==='customerservice'){
            var websocket=false;
            var ws;
            var serverId;
            var $chatBox=$('#chatBox');
            //获取用户头像
            var headImg;
            $.ajax({
                url:$url+'OilSaving/user/getSimpleMessage/'+userid,
                method:'GET',
                success:function (data) {
                    // console.log(data);
                    headImg=data.headingurl;
                },
                error:function () {

                }
            });
            //机器人
            $.ajax({
                url:$url+'OilSaving/questions',
                method:'GET',
                success:function (data) {
                    // console.log(data);
                    var html='    <div class="customer auto">\n' +
                        '        <div></div>\n' +
                        '        <p>欢迎，我是人工助手，请问有什么可以帮您<br><br class="txt">\n' +
                        '            <br>\n' +
                        '            点击问题回复对应数字查看答案\n' +
                        '        </p>\n' +
                        '    </div>\n';
                    $chatBox.append(html);
                    $.each(data.questions,function (ind,val) {
                        var html='<span id="'+val.questionId+'">'+val.questionId+'.'+val.question+'</span><br><br>\n';
                        $chatBox.find('.customer.auto').find('.txt').after(html);
                    });
                },
                error:function () {

                }
            });
            //转人工
            $body.on('click','#nav .artificial',function () {
                $('#nav').find('.title').text('人工客服');
                //判断WebSocket在此浏览器是否可用
                if(window.WebSocket){
                    //创建WebSocket链接
                    ws=new WebSocket('ws://47.96.106.203:80/OilSaving/websocket/1/'+userid);
                    //关闭WebSocket的回调函数
                    ws.onclose = function(e){
                        console.log("服务器关闭 ",e);
                    };
                    //WebSocket异常的回调函数
                    ws.onerror = function(){
                        console.log("连接出错");
                    };
                    //链接WebSocket成功的回调函数
                    ws.onopen = function(){
                        console.log("连接服务器成功");
                        websocket=true;
                    };
                    //WebSocket接受消息的回调函数
                    ws.onmessage = function(e) {
                        var data=JSON.parse(e.data);
                        console.log('接收成功:',data);
                        serverId=data.serverId;
                        message('customer',data.message);
                    };

                }else {
                    alert('当前状态不支持客户服务');
                }

            });
            //点击发送信息
            $body.on('click','#send',function () {
                //判断WebSocket在此浏览器是否可用
                var messageT=$.trim($(this).parent().siblings().find('input').val());
                var html;
                if(messageT!==''&&messageT!==null&&messageT!==undefined){
                    if(websocket){
                        ws.send(JSON.stringify({role:"1",userId:userid,serverId:serverId,message:messageT}));
                        message('user',messageT);
                        $chatBox.find('.user').find('div').css('background-image','url('+headImg+')');
                    }else {
                        message('user',messageT);
                        $chatBox.find('.user').find('div').css('background-image','url('+headImg+')');

                        var mess=autoReply();
                        setTimeout(function () {
                            message('customer',mess)
                        },300)
                    }
                }
                $(this).parent().siblings().find('input').val('');

            });
            //点击机器人回复
            $body.on('click','.customer.auto span',function () {
                var questionId=$(this).attr('id');
                message('user',$(this).text());
                $chatBox.find('.user').find('div').css('background-image','url('+headImg+')');

                $.ajax({
                    url:$url+'OilSaving/answer/'+questionId,
                    method:'GET',
                    success:function (data) {
                        setTimeout(function () {
                            message('customer',data);
                        },300)
                    }
                });

            });
            //获取历史聊天
            $.ajax({
                url:$url+'OilSaving/server/read_data',
                method:'POST',
                contentType:'application/json',
                data:JSON.stringify({userId:userid}),
                success:function (dat) {
                    // console.log(JSON.parse(dat));
                    var data;
                    if(dat!==''&&dat!==undefined&&dat!==null){
                        var html='<div class="historical">查看历史消息记录</div>';
                        $('#chatBox').prepend(html);

                        $body.on('click','#chatBox .historical',function () {
                            $(this).remove();

                            $.each(JSON.parse(dat).reverse(),function (ind,val) {
                                data=val;
                                var use;
                                switch (data.role){
                                    case '1':use='user';break;
                                    case '0':use='customer';break;
                                }
                                historyMessage(use,data.message);
                                $chatBox.find('.user').find('div').css('background-image','url('+headImg+')');
                                // console.log(use,data.message);
                            });

                        });
                    }
                },
                error:function () {

                }

            });




            //消息添加
            function message(x,data) {
                var $chatBox=$('#chatBox');
                var html='    <div class="'+x+'">\n' +
                    '        <div></div>\n' +
                    '        <p><span>'+data+'</span></p>\n' +
                    '    </div>\n';
                $chatBox.append(html);
                //聊天框移动到底部
                $chatBox.scrollTop($chatBox[0].scrollHeight);
            }
            //历史消息添加
            function historyMessage(x,data) {
                var $chatBox=$('#chatBox');
                var html='    <div class="'+x+'">\n' +
                    '        <div></div>\n' +
                    '        <p><span>'+data+'</span></p>\n' +
                    '    </div>\n';
                $chatBox.prepend(html);
                //聊天框移动到底部
                $chatBox.scrollTop($chatBox[0].scrollHeight);
            }
            //自动回复
            function autoReply() {
                var number=Math.round(Math.random()*2);
                var txt;
                switch (number){
                    case 0:txt='这个问题难到我了，您可以点击右上角转人工客服为您解答';break;
                    case 1:txt='您说的我有些听不懂，您可以点击右上角转人工客服为您解答';break;
                    case 2:txt='这个问题有些高深呢，您可以点击右上角转人工客服为您解答';break;
                }
                return txt;
            }
        }


    /***************邀请有礼模块***************/
    if($body.parent().attr('data-page')==='invitecourtesy'){
            //数据获取
            $.ajax({
                url:$url+'OilSaving/invitation/rankLists/1/50',
                method:'GET',
                success:function (data) {
                    $.each(data.rankLists,function (ind,val) {
                        var i=ind+1;
                        // console.log(ind,val);
                        var html;
                        if(i<4){
                            html='<div class="row">\n' +
                                '<div class="Invite'+i+'"></div>\n' +
                                '<div>'+val.tel+'</div>\n' +
                                '<div>'+val.invitedCount+'人</div>\n' +
                                '<div>¥'+val.invitedIncome+'</div>\n' +
                                '</div>\n';
                        }else {
                            html='<div class="row">\n' +
                                '<div>'+i+'</div>\n' +
                                '<div>'+val.tel+'</div>\n' +
                                '<div>'+val.invitedCount+'人</div>\n' +
                                '<div>¥'+val.invitedIncome+'</div>\n' +
                                '</div>\n';
                        }
                        $('#rankingList').append(html);
                    })
                },
                error:function () {

                }
            });
        }


    /***************注册领券模块***************/
    if($body.parent().attr('data-page')==='rookie'){
            //优惠券数据获取
            $.ajax({
                url:$url+'OilSaving/coupons',
                method:'GET',
                success:function (data) {
                    $.each(data.coupons.reverse(),function (ind,val) {
                        // console.log(val);
                        var html='<div data-couponId="'+val.couponId+'">\n' +
                            '<div>￥'+val.discountAmount+'</div>\n' +
                            '<div>\n' +
                            '<div>体验礼包</div>\n' +
                            '<div>满'+val.conditionAmount+'元使用</div>\n' +
                            '</div>\n' +
                            '</div>\n';
                        $('#coupon').find('.title').after(html);
                    });
                },
                error:function () {

                }
            });
            //点击领取优惠券
            $body.on('click','#button',function () {
                var list=[];
                $('#coupon').find('[data-couponId]').each(function (ind,val) {
                    list.push($(val).attr('data-couponId'))
                });
                if(userid===''||userid===null||userid===undefined){//判断是否登录
                    window.location.href='Login.html';
                }else {
                    $.ajax({//判断是否是新用户
                        url:$url+'OilSaving/user/registerstatus',
                        method:'POST',
                        contentType:'application/json',
                        data:JSON.stringify({userId:userid}),
                        success:function (data) {
                            if(data.status===0){
                                $.ajax({//判断是否领取过优惠券
                                    url:$url+'OilSaving/user/if_contain_coupons',
                                    method:'POST',
                                    contentType:'application/json',
                                    data:JSON.stringify({userId:userid,list:list}),
                                    success:function (data) {
                                        if(data.result.length===0){
                                            $.ajax({
                                                url:$url+'OilSaving/user/attachCoupon',
                                                method:'POST',
                                                contentType:'application/json',
                                                data:JSON.stringify({userId:userid,coupons:list}),
                                                success:function (data) {
                                                    // console.log(data,JSON.stringify({userId:userid,coupons:list}));
                                                    if(data.result==='success'){
                                                        alert('领取成功');
                                                        window.location.href=''//跳转优惠券链接
                                                    }else {
                                                        alert('您已领取过该优惠券了');
                                                        window.location.href=''//跳转优惠券链接
                                                    }
                                                },
                                                error:function () {

                                                }
                                            });
                                        }else {
                                            alert('您已领取过该优惠券了');
                                            window.location.href=''//跳转优惠券链接
                                        }
                                    },
                                    error:function () {

                                    }
                                });
                            }else {
                                alert('只有新用户才能享受该活动');
                            }
                        },
                        error:function () {

                        }
                    });
                }
            });
        }




});
