
/*
 *===初始化游戏窗体===
 * 变量:ulCon存储窗体内容,刷新窗体时直接填充
*/
//声明全局变量，初始化数据后在本次页面其他部分禁止赋值
maxUl=23,//游戏窗体宽
maxLi=35,//游戏窗体高
$gameWindow=$("#game_window"),//窗体DOM
ulCon="";
tj_count = 0;
tj_len = 2;
tj_score = 0;
$tj_count = $("#counts");
$tj_len = $("#body_len");
$tj_score = $("#score");
isgo = true;
__speed = 300;
for(var i=0; i<maxUl;i++){
    ulCon+='<ul id="ul'+i+'">';
    for(var ii=0;ii<maxLi;ii++){
        ulCon+='<li></li>';
    }
    ulCon+='</ul>';
}
$gameWindow.html(ulCon);//完成游戏窗体渲染
//刷新窗体
function gameFresh(){
    $gameWindow.html(ulCon);
};
function rgb2hex(rgb) {
    var rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    };
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
};
/*
 * ==蛇类==
 */
//构造函数
var Snake = function(opt){
    this.defaults={
        len:'2',
        maxLen:'10'
    };
    this.options=$.extend({},this.defaults,opt);
    this.nodes=Array();
    this.head=Array(5,5,'right');
    this.foot=Array(4,5);
    /*this.head=Array(3,5,"right");
    this.foot=Array(0,5);
    this.nodes=Array();*/
    this.oldHead=Array(this.head[0],this.head[1]);
    this.lastDir=this.head[2];
    this.color="#aaaaaa";
};
//方法
Snake.prototype={
    //设置身体颜色
    setColor:function(c){
        this.color=c;
    },
    setDirection:function(d){
        this.head[2]=d;
    },
    /*ramStartPos:function(maxX,maxY){
        var x=Math.floor(Math.random() * ( maxX + 1));
        var y=Math.floor(Math.random() * ( maxY + 1));
        alert(x);
    },*/
    //获取身体总长度
    getLen:function(){
        return this.options.len;
    },
    getHeadPos:function(){
        return this.head;
    },
    //获取拐点的个数
    getNodeNum:function(){
        return this.nodes.length;
    },
    //身体长度增加
    addLen:function(){
        this.headRun(this.head[2]);
        this.options.len++;
        //alert(this.options.len);
        //废弃，应放到控制器里面 if(this.options.maxLen==this.options.len)alert("过关啦");
    },
    //身体按当前方向自增
    headRun:function(dir){
        switch(dir){
            case "up":this.head[1]--;break;
            case "down":this.head[1]++;break;
            case "left":this.head[0]--;break;
            case "right":this.head[0]++;break;
        };
    },
    footRun:function(dir){
        switch(dir){
            case "up":this.foot[1]--;break;
            case "down":this.foot[1]++;break;
            case "left":this.foot[0]--;break;
            case "right":this.foot[0]++;break;
        };
        var l=this.getNodeNum();
        if(l>0){//如果存在拐点，判断是否到达最后拐点处
            l--;
            //到达拐点，移除最后的拐点记录
            if(this.foot[0]==this.nodes[l][0]&&this.foot[1]==this.nodes[l][1]){
                this.rmNode();
            };
        };
    },
    //增加新的身体拐点
    addNode:function(){
        this.nodes.unshift(Array(this.head[0],this.head[1]));
    },
    //移除废弃的身体拐点
    rmNode:function(){
        this.nodes.pop();
    },
    //把两个点转换成一个定位数组,返回lineRun所需的参数
    point2arr:function(x1,y1,x2,y2){
        var direction,len,_len;
        if(x1==x2){
            len=y1-y2;
            _len=Math.abs(len)+1;
            if(len<0){
                direction="up";
            }else{
                direction="down";
            };
        }else{
            len=x1-x2;
            _len=Math.abs(len)+1;
            if(len<0){
                direction="left";
            }else{
                direction="right";
            }
        };
        return new Array(direction,x1,y1,_len);
    },
    //显示蛇的形状
    drawSnake:function(){

    },
    //画直线
    lineRun:function(direction,x,y,len){
        var $c;
        switch(direction){
            case 'up'://参数y自减
                for(var i=0;i<len;i++){
                    var t_y=y+i;
                    $("#ul"+t_y+" li").eq(x).css("background-color",this.color);
                };
                break;
            case 'down'://参数y自增
                for(var i=0;i<len;i++){
                    var t_y=y-i;
                    $("#ul"+t_y+" li").eq(x).css("background-color",this.color);
                };
                break;
            case 'left'://参数x自增
                $c=$("#ul"+y+" li");
                for(var i=0;i<len;i++){
                    $c.eq(x+i).css("background-color",this.color);
                };
                break;
            case 'right'://参数x自减
                $c=$("#ul"+y+" li");
                for(var i=0;i<len;i++){
                    $c.eq(x-i).css("background-color",this.color);
                };
                break;
        };
        /*var colos = $("#ul"+y+" li").eq(x).css("background-color");
        if(rgb2hex(colos)==this.color){
            alert('碰到自己啦');
        };*/
    },
    //根据两点坐标画出直线
    drawLine:function(x1,y1,x2,y2){
        var arr=this.point2arr(x1,y1,x2,y2);
        this.lineRun(arr[0],arr[1],arr[2],arr[3]);
    },
    run:function(){
        //处理方向,判断方向是否有变化
        switch(this.lastDir){
            case "up":
            case "down":
                if(this.head[2]=="left"||this.head[2]=="right"){
                    this.addNode();
                    this.lastDir=this.head[2];
                }else if(this.lastDir!=this.head[2]){
                    this.head[2]=this.lastDir;
                }else{
                    //不做任何处理
                };break;
            case "left":
            case "right":
                if(this.head[2]=="up"||this.head[2]=="down"){
                    this.addNode();
                    this.lastDir=this.head[2];
                }else if(this.lastDir!=this.head[2]){
                    this.head[2]=this.lastDir;
                }else{
                    //不做任何处理
                };break;
        };
        //开始计算蛇的形状，并绘制出来
        var nodeNum=this.getNodeNum();

        if(nodeNum==0){//没有节点的情况
            this.drawLine(this.head[0],this.head[1],this.foot[0],this.foot[1]);
            this.headRun(this.head[2]);
            this.footRun(this.head[2]);
        }else{//存在节点，循环绘制
            var count=nodeNum-1;
            this.drawLine(this.head[0],this.head[1],this.nodes[0][0],this.nodes[0][1]);
            for(var i=0;i<count;i++){
                this.drawLine(this.nodes[i][0],this.nodes[i][1],this.nodes[i+1][0],this.nodes[i+1][1]);
            }
            this.drawLine(this.nodes[count][0],this.nodes[count][1],this.foot[0],this.foot[1]);
            this.oldHead[0]=this.head[0];
            this.oldHead[1]=this.head[1];
            this.headRun(this.head[2]);
            var footDir=this.point2arr(this.nodes[count][0],this.nodes[count][1],this.foot[0],this.foot[1]);
            this.footRun(footDir[0]);
        };
        //alert(this.head+" , "+this.foot+" ,节点:"+this.getNodeNum());
    },
    //判断是否为自身所在的坐标点，暂未实现
    isSelf:function(){

    },


};//蛇类结束

/*
 *==食物类==
 */
var Food = function(){
    this.x=10;
    this.y=4;
    this.color="#00ff00";
};
//食物方法
Food.prototype={
    drawFood:function(){
        $("#ul"+this.y+" li").eq(this.x).css("background-color",this.color);
    },
    setX:function(x){
        this.x=x;
    },
    setY:function(y){
        this.y=y;
    },
    setXY:function(x,y){
        this.setX(x);
        this.setY(y);
    },
    getX:function(){
        return this.x;
    },
    getY:function(){
        return this.y;
    },
    getXY:function(){
        return Array(this.x,this.y);
    },
    ramPos:function(maxX,maxY){
        this.x=Math.floor(Math.random() * ( maxX + 1))-5;
        this.y=Math.floor(Math.random() * ( maxY + 1))-5;
        if(this.x<0)this.x=2;
        if(this.y<0)this.y=2;
    },
    setColor:function(c){
        this.color=c;
    },
};
/*
 * 游戏控制类
 */
var Game=function(s,f){
    this.snake=s;
    this.food=f;
    this.speed="300";
    this.gameTimer="";
    this.snakePos=Array();
    this.foodPos=Array();
};
//方法
Game.prototype={
    /*setMaxX:function(x){
        this.maxX=x;
    },
    setMaxY:function(y){
        this.maxY=y;
    },
    setMaxXY:function(x,y){
        this.maxX=x;
        this.maxY=y;
    },*/setSpeed: function(s) {
        this.speed = s;
    },
    go: function() {
        this.gameTimer = setInterval(this.mainExe, __speed);
    },
    mainExe: function() {
        if (isgo) {
            gameFresh();
            $tj_count.text(++tj_count);
            this.food.drawFood();
            this.foodPos = this.food.getXY();
            this.snakePos = this.snake.getHeadPos();
            if (this.snakePos[0] == this.foodPos[0] && this.snakePos[1] == this.foodPos[1]) {
                this.snake.addLen();
                this.food.ramPos(maxLi, maxUl);
                $tj_len.text(++tj_len);
                $tj_score.text(tj_score += 5);
            };
            if (this.snakePos[0] >= maxLi || this.snakePos[1] >= maxUl || this.snakePos[0] < 0 || this.snakePos[1] < 0) {
                $("#game_head").animate({
                    paddingTop: "230px",
                    paddingBottom: "300px"
                }, 400);
                $(".title").animate({
                    height: "100px",
                    fontSize: "60px"
                }, 400);
                $("#note").html("--碰到墙壁啦!").show(400);
                $("#source").css("z-index", "2").animate({
                    top: "350px",
                    marginLeft: "-50px"
                }, 400);
                isgo = false;
            } else {
                this.snake.run();
            };
        };
    },
    stop: function() {
        clearInterval(this.gameTimer);
    },
};