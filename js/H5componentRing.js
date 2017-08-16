//环图对象
var H5ComponentRing = function(name, cfg) {
    if(cfg.data.length>1){
        cfg.data=[cfg.data[0]];
    }
    var compoment=H5ComponentPie(name,cfg);
    var w=cfg.width;
    var h=cfg.height;
    //新建一层白色的遮罩
    var cns = document.createElement('canvas');
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index', 4);
    compoment.append(cns);

    var r = w / 2;
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.arc(r, r, r*0.8, 0, 2 * Math.PI)
    ctx.fill();
    ctx.stroke();
    //文字
    var text=compoment.find('.text');
    text.attr('style'," ");
    text.css("transition",'all 1s')
    if(cfg.data[0][2]){
        text.css('color',cfg.data[0][2]);
    }
    return compoment;
}