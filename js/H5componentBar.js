// 柱图对象
var H5ComponentBar=function(name,cfg){
    var compoment=H5ComponentBase(name,cfg);
    $.each(cfg.data,function(idx,item){
        var line=$("<div class='line'>");
        var name=$("<div class='name'>");
        var rate=$("<div class='rate'>");
        var peer=$("<div class='peer'>");
        var width=(item[1]*100)+"%";
        name.text(item[0]);
        peer.text(item[1]);
        rate.width(width);
        var bgStyle=""
        if(item[2]!==undefined){
            bgStyle='style="background-color:'+item[2]+';"'
            peer.css('color',item[2])
        }
        rate.html('<div class="bg"'+bgStyle+'></div>');
        line
        .append(name)
        .append(rate)
        .append(peer);
        compoment.append(line);
    })
    compoment.on("onLoad",function(){
        
    })
    compoment.on("onLeave",function(){
        
    })
    return compoment;
}