// 基本图文组件对象

var H5ComponentBase=function(name,cfg){
	var cfg=cfg||{};
	var id=("h5_c_"+Math.random()).replace(".","_");
	var cls="h5_c_"+cfg.type;
     //看看id传入的方法
     var component=$('<div class="h5_component '+cls+' h5_c_name_'+name+'" id="'+id+'">');
     cfg.text && component.text(cfg.text);
     cfg.width && component.width(cfg.width/2);
     cfg.height && component.height(cfg.height/2);
     cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');
     if(cfg.center){
     	component.css({
     		marginLeft:(cfg.width/4 *-1)+"px",
     		left:"50%",
     	})
     }
     cfg.css && component.css(cfg.css)
     if(typeof cfg.onclick=="function"){
          component.on('click',cfg.onclick)
     }
     //
     component.on('onLoad',function(){
          if(cfg.relativeTo){
               var parent=component.parent().find('.h5_c_name_'+cfg.relativeTo);
               console.log(parent.size())
               //$(selector).size()  返回选择器匹配元素的数量
               if(parent.size()){
                    component.appendTo(parent)
               }
               cfg.relativeTo=false;
          }
          //如果有delay参数
          setTimeout(function(){
              component.removeClass(cls+'_leave').addClass(cls+'_load');
              cfg.animateIn && component.animate(cfg.animateIn);
         },cfg.delay||0)
          return false;
     })
     component.on('onLeave',function(){
          setTimeout(function(){
               component.removeClass(cls+'_load').addClass(cls+'_leave');
               cfg.animateOut && component.animate(cfg.animateOut);
          },cfg.delay||0)
          return false;
     })
     return component;
}