// 内容管理对象

var H5=function(){
     this.id=('h5_'+Math.random()).replace(".","_");
     this.el=$('<div class="h5" id="'+this.id+'">').hide();
     this.page=[];
     $("body").append(this.el);
     //addpage新增页
     /*
     name{String}   组件的名称  
     text{String}   页面或组件的默认文本  
     return 该对象可以重复使用对象的方法
     */
     this.addPage=function(name,text){
      var page=$('<div class="h5_page section">');
      if (name!=undefined){
          page.addClass("h5_page_"+name);
     }
     if(text!=undefined){
          page.text(text);
     }
     this.el.append(page);
     this.page.push(page);
     if(typeof this.whenAddPage==="function"){
        this.whenAddPage();
     }
     return  this;
}
     //addcomponent
     this.addComponent=function(name,cfg){
      var cfg=cfg||{};
      cfg=$.extend({
          type:"base"
     },cfg)
      var component; //存储组件元素
      var page=this.page.slice(-1)[0];
      switch(cfg.type){
          case 'base':
               component=new H5ComponentBase(name,cfg);
          break;
          //继续添加
          case 'polyline':
               component=new H5ComponentPolyline(name,cfg);
          break;
           case 'bar':
               component=new H5ComponentBar(name,cfg);
          break;
           case 'bar_v':
               component=new H5ComponentBar_v(name,cfg);
          break;
           case 'pie':
               component=new H5ComponentPie(name,cfg);
          break;
           case 'point':
               component=new H5ComponentPoint(name,cfg);
          break;
           case 'radar':
               component=new H5ComponentRadar(name,cfg);
          break;
           case 'ring':
               component=new H5ComponentRing(name,cfg);
          break;
          default:
     }
     page.append(component);
     return this;
}
     //h5对象初始化   参数为
     this.loader=function(firstPage){
          this.el.fullpage({
               afterLoad:function(anchorLink,index){
                  $('.h5_page').eq(index-1).find('.h5_component').trigger("onLoad");
               },
               onLeave:function(index,nextIndex,direction){
                $('.h5_page').eq(index-1).find('.h5_component').trigger("onLeave");
             }
        });
          this.page[0].find('.h5_component').trigger("onLoad");
          this.el.show();
          if(firstPage){
            $.fn.fullpage.moveTo(firstPage)
          }
     }
     //重写loader函数
     this.loader=typeof H5_loading=='function'?H5_loading:this.loader;
     return this;
}