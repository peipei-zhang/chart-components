// 柱图对象
var H5ComponentBar_v=function(name,cfg){
	var compoment=H5ComponentBar(name,cfg);
	var width=(100/cfg.data.length)+"%";
	compoment.find(".line").css("width",width);
    $.each(compoment.find(".rate"),function(){
    	var w=$(this).css("width");
    	$(this).height(w).width("");
    });
    $.each(compoment.find(".peer"),function(){
        $(this).appendTo($(this).prev());
    });
	return compoment;
}
