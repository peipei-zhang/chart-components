//雷达图对象
var H5ComponentRadar=function(name,cfg){
	var compoment=H5ComponentBase(name,cfg);
    var w=cfg.width;
    var h=cfg.height;
    //创建canvas
    //背景层canvas
    var cns=document.createElement('canvas');
    var ctx=cns.getContext("2d");
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    compoment.append(cns)

    var r=w/2;
    var step=cfg.data.length;
    ctx.beginPath();
    ctx.arc(r,r,5,0,2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.stroke();
    //绘制网格背景   10份
    var isBlue=false;
    for(var s=10;s>0;s--){
     //顶点
     ctx.beginPath();
     for(i=0;i<step;i++){
        var rad=(2*Math.PI/360)*(360/step)*i;
        var x=r+Math.sin(rad)*r*(s/10);
        var y=r+Math.cos(rad)*r*(s/10);
        ctx.lineTo(x,y)
    }  
    ctx.closePath();
    ctx.fillStyle=(isBlue=!isBlue)?'#99c0ff':"#ffffff";
    ctx.fill();
}
    //绘制伞骨
    for(i=0;i<step;i++){
        var rad=(2*Math.PI/360)*(360/step)*i;
        var x=r+Math.sin(rad)*r;
        var y=r+Math.cos(rad)*r;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);
        ctx.strokeStyle="#e0e0e0"
        ctx.stroke();
        //项目  文字方向
        var text=$('<div class="text"/>');
        text.text(cfg.data[i][0]);
        text.css("transition","all 0.7s "+i*.1+"s");
        if(x>w/2){
            text.css("left",x/2+5);
        }else{
            text.css("right",(w-x)/2+5);
        }
        if(y>h/2){
            text.css("top",y/2+5);
        }else{
            text.css("bottom",(h-y)/2+5);
        }
        if(cfg.data[i][2]){
            text.css("color",cfg.data[i][2]);
        }
        compoment.append(text);
    }  
    //数据层canvas
    var cns=document.createElement('canvas');
    var ctx=cns.getContext("2d");
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    compoment.append(cns);
    //数据绘制函数
    var draw=function(per){
        if(per>=1){
         compoment.find('.text').css("opacity",1)
     }
     if(per<=1){
         compoment.find('.text').css("opacity",0)
     }
     ctx.clearRect(0,0,w,h);
     ctx.strokeStyle='#f00';
        //数据连线
        for(i=0;i<step;i++){
            var rad=(2*Math.PI/360)*(360/step)*i;
            var rate=cfg.data[i][1]*per;
            var x=r+Math.sin(rad)*r*rate;
            var y=r+Math.cos(rad)*r*rate;
            ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.stroke();
        //数据点
        ctx.fillStyle="#ff7676";
        for(i=0;i<step;i++){
            var rad=(2*Math.PI/360)*(360/step)*i;
            var rate=cfg.data[i][1]*per;
            var x=r+Math.sin(rad)*r*rate;
            var y=r+Math.cos(rad)*r*rate;
            ctx.beginPath()
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.closePath();
            ctx.fill();
        }
    }
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