// 散点图对象
var H5ComponentPoint=function(name,cfg){
	var compoment=H5ComponentBase(name,cfg);
	//以第一个数据大小为基础
	var base=cfg.data[0][1];
	$.each(cfg.data,function(idx,item){
		var point=$('<div class="point point_'+idx+'">');
		var name=$('<div class="name">'+item[0]+'</div>');
		var rate=$('<div class="per">'+(item[1]*100)+'%</div>')
		point.append(name)
		name.append(rate);
		var per=(item[1]/base*100)+"%";
		point.width(per).height(per);
		if(item[2]){
			point.css("backgroundColor",item[2])
		}
		if(item[3]!==undefined&&item[4]!==undefined){
			point.css({
				"left":item[3],
				"top":item[4]
			})
			point.data('left',item[3]).data('top',item[4]);
		};
		point.css({
			"zIndex":100-idx,
			"left":0,
			"top":0
		});
		compoment.append(point)
	});
	compoment.on("onLoad",function(){
		compoment.find(".point").each(function(idx,item){
			$(item).animate({
				"left":$(item).data("left"),
				"top":$(item).data("top")
			})
		})
	});
	compoment.on("onLeave",function(){
		compoment.find(".point").each(function(idx,item){
			$(item).animate({
				"left":0,
				"top":0
			})
		})
	});
	return compoment;
}