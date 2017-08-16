//折线图对象
var H5ComponentPolyline=function(name,cfg){
	var compoment=H5ComponentBase(name,cfg);
    //绘制网格线
    //取配置中的宽高  在css中限制
    var w=cfg.width;
    var h=cfg.height;
    //创建canvas
    //网格背景
    var cns=document.createElement('canvas');
    var ctx=cns.getContext("2d");
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    compoment.append(cns)
    //水平网格
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle="red";
    var step=10;
    window.ctx=ctx;
    for(var i=0;i<step+1;i++){
    	var y=(h/step)*i;
    	//起点
    	ctx.moveTo(0,y);
    	ctx.lineTo(w,y);
    }
    //垂直网格线
    //中间线条数==项数   +边线两条
    step=cfg.data.length+1;
    var text_w=w/step;
    for(var i=0;i<step+1;i++){
    	var x=(w/step)*i;
    	ctx.moveTo(x,0);
    	ctx.lineTo(x,h);
    	//对应的项目名
    	var text=$('<div class="text">');
    	if(cfg.data[i]!==undefined){
    		text.text(cfg.data[i][0]);
    		text.css({
    			"width":text_w/2,
    			"left":x/2+text_w/4
    		});
    		compoment.append(text);
    	}
    }
    ctx.stroke();
    //绘制折线数据   新一层canvas
    var cns=document.createElement('canvas');
    var ctx=cns.getContext("2d");
    cns.width=ctx.width=w;
    cns.height=ctx.height=h;
    compoment.append(cns);
    /* 绘制折线数据函数
      @param    per  0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
      控制y轴图像绘制的位置    设置生长动画
    */
    var draw=function(per){
    //绘制前清空画布
    ctx.clearRect(0,0,w,h);
    //
    ctx.beginPath();
    ctx.lineWidth=3;
    ctx.strokeStyle="#ff8878";
    //画点
    var x=0;
    var y=0;
    var row_w=w/(cfg.data.length+1);
    $.each(cfg.data,function(idx,item){
    	x=row_w*(idx+1);
    	y=(1-item[1]*per)*h;
    	ctx.moveTo(x,y);
    	ctx.arc(x,y,5,0,2*Math.PI);
    })
    // 连线  
    //移动到第一个点位置
    ctx.moveTo(row_w,h*(1-cfg.data[0][1]*per));
    $.each(cfg.data,function(idx,item){
    	x=row_w*(idx+1);
    	y=(1-item[1]*per)*h;
    	ctx.lineTo(x,y);
    })
    ctx.stroke();
    //闭合路线,填充阴影
    ctx.lineWidth=1;
    ctx.lineTo(x,h);
    ctx.lineTo(row_w,h);
    ctx.lineTo(row_w,h*(1-cfg.data[0][1]*per));
    ctx.fillStyle='rgba(255,188,160,0.2)';
    ctx.fill();
    //写数据
    $.each(cfg.data,function(idx,item){
    	x=row_w*(idx+1);
    	y=(1-item[1]*per)*h;
    	ctx.fillStyle=item[2]?item[2]:"#595959";
    	ctx.font="20px Arial";
    	ctx.fillText((item[1]*100)+"%",x-10,y-10);
    });
     ctx.stroke();
     }
    //折线动画
    compoment.on("onLoad",function(){
        //生长
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