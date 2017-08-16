//饼图对象
var H5ComponentPie = function(name, cfg) {
    var compoment = H5ComponentBase(name, cfg);
    var w = cfg.width;
    var h = cfg.height;
    //创建canvas
    //背景层canvas
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index', 1);
    compoment.append(cns);
    //底图层
    var r = w / 2;
    ctx.beginPath();
    ctx.fillStyle = "#eee";
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    ctx.arc(r, r, r, 0, 2 * Math.PI)
    ctx.fill();
    ctx.stroke();

    //数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index', 2)
    compoment.append(cns);

    var colors = ['red', 'blue', 'green', 'orange', 'grey']; //设置一些默认背景色
    var sAngel = 1.5 * Math.PI //开始角度
    var eAngel = 0; //结束角度  
    var aAngel = Math.PI * 2 //100%结束的角度     
    var step = cfg.data.length;

    for (var i = 0; i < step; i++) {
        var item = cfg.data[i]
        var color = item[2] || (item[2] = colors.pop())
        eAngel = sAngel + aAngel * item[1];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.1;
        ctx.moveTo(r, r);
        ctx.arc(r, r, r, sAngel, eAngel);
        ctx.fill();
        ctx.stroke();
        sAngel = eAngel;

        //项目文本以及%
        var text=$('<div class="text">');
        text.text(cfg.data[i][0]);
        var per=$('<div class="per">');
        per.text(cfg.data[i][1]*100+"%");
        text.append(per);
        text.css("transition",'all 1s '+i*0.1+'s')
        var x=r+Math.sin(0.5*Math.PI-sAngel)*r;
        var y=r+Math.cos(0.5*Math.PI-sAngel)*r;
        if(x>w/2){
            text.css('left',x/2+5)
        }else{
            text.css('right',(w-x)/2+5)
        }
        if(y>h/2){
            text.css('top',y/2+5)
        }else{
            text.css('bottom',(h-y)/2+5)
        }
        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2]);
        }
        text.css('opacity','0');
        compoment.append(text);
    }
    //蒙版层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index', 3);
    compoment.append(cns);
    //动画
    ctx.fillStyle = "#eee";
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    /*
    *@per=0  蒙版层全覆盖      per=1   起始点一样   没有
    */
    var draw = function(per) {
     ctx.clearRect(0,0,w,h)
     ctx.beginPath();
     ctx.moveTo(r,r);
     if(per<=0){
         ctx.arc(r,r,r,0,Math.PI*2);
         compoment.find(".text").css('opacity',0);
     }else{
       ctx.arc(r, r, r, sAngel,sAngel+2*Math.PI*per,true)
   }
   ctx.fill();
   ctx.stroke();
   if(per>=1){
        //文本重排
        //规避递归时动画卡死的问题
        compoment.find(".text").css("transition","all 0s")
        H5ComponentPie.reSort(compoment.find(".text"));
        //重排后再定义动画时间
        compoment.find('.text').css('transition',"all 1s")
        ctx.clearRect(0,0,w,h);
        compoment.find(".text").css('opacity',1);
    }
}
draw(0)
    //动画
    compoment.on("onLoad",function(){
        //入場动画
        var s=0; 
        for(i=0;i<100;i++){
            setTimeout(function(){
              s+=0.01;
              draw(s);
          },i*10+700)
        }
    })

    compoment.on("onLeave",function(){
        //退场动画
        var s=1; 
        for(i=0;i<100;i++){
            setTimeout(function(){
              s-=0.01;
              draw(s);
          },i*10+700)
        }
    })
    return compoment;
}

// 项目文本重排函数
H5ComponentPie.reSort=function(list){
  //检测相交
  var compare=function(domA,domB){
  //dom位置
  var offsetA=$(domA).offset();
  var offsetB=$(domB).offset();
  //domA
  var shadowA_x=[offsetA.left,$(domA).width()+offsetA.left];
  var shadowA_y=[offsetA.top,$(domA).height()+offsetA.top];
  //domB
  var shadowB_x=[offsetB.left,$(domB).width()+offsetB.left];
  var shadowB_y=[offsetB.top,$(domB).height()+offsetB.top];
  //x是否相交
  var intersect_x=(shadowA_x[0]>shadowB_x[0]&&shadowA_x[0]<shadowB_x[1])||
  (shadowA_x[1]>shadowB_x[0]&&shadowA_x[1]<shadowB_x[1])
  //y是否相交
  var intersect_y=(shadowA_y[0]>shadowB_y[0]&&shadowA_y[0]<shadowB_y[1])||
  (shadowA_y[1]>shadowB_y[0]&&shadowA_y[1]<shadowB_y[1])
  intersect=intersect_x&&intersect_y;
  return intersect;
}
  //重排
  var reset=function(domA,domB){
    if($(domA).css('top')!='auto'){
     $(domA).css("top",parseInt($(domA).css("top"))+$(domB).height());
    }
    if($(domA).css('left')!='auto'){
     $(domA).css("left",parseInt($(domA).css("left"))+$(domB).width());
    }
  }
  //遍历筛选
  var willReset=[list[0]];
  $.each(list,function(i,target){
    if(compare(willReset[willReset.length-1],target)){
      willReset.push(target)
    }
  })
  //
  if(willReset.length>1){
    	$.each(willReset,function(idx,domA){
    		   if(willReset[idx+1]){
              reset(domA,willReset[idx+1])
    		   }
    		   //递归
    		   H5ComponentPie.reSort(list)
    	})
    }
}