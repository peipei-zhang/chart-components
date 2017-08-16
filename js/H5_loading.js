var H5_loading=function(images,firstPage){
	//获取整个H5对象的id
	var id=this.id;
	if(this._images===undefined){
          //第一次进入
          this._images=(images||[]).length;
          this._loaded=0;
          //把当前对象存储为全局对象window中，用来进行某个图片加载后的回调 id
          window[id]=this;
          $.each(images,function(idx,item){
          	var img=new Image;
          	img.onload=function(){
          		console.log("loaded")
          		//每创建完成一个图片对象，再次执行loader函数
          		window[id].loader()
          	}
          	//用于缓存记录图片加载
          	img.src=item;
          })
          $("#rate").text("0%");
          return this;
      }else{
      	this._loaded ++;
      	$("#rate").text(((this._loaded/this._images*100)>>0)+"%")
      	if(this._loaded<this._images){
           	//如果还有图片未加载完，继续执行
           	return this;
           }
       }
       //
       window[id]=null;
       //
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