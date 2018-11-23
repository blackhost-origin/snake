var pomelo = window.pomelo;
var host = "127.0.0.1";
var port = "3014";
var username;
var users;
var rid;
var base = 1000;
var increase = 25;
var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
var LOGIN_ERROR = "There is no server to log in, please wait.";
var DUPLICATE_ERROR = "Please change your name to login.";
//定义贪吃蛇对象相关
var snake = new Snake({});
var food = new Food();
game = new Game(snake, food);

util = {
	urlRE: /https?:\/\/([-\w\.]+)+(:\d+)?(\/([^\s]*(\?\S+)?)?)?/g,
	//  html sanitizer
	toStaticHTML: function(inputHtml) {
		inputHtml = inputHtml.toString();
		return inputHtml.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	},
	//pads n with zeros on the left,
	//digits is minimum length of output
	//zeroPad(3, 5); returns "005"
	//zeroPad(2, 500); returns "500"
	zeroPad: function(digits, n) {
		n = n.toString();
		while(n.length < digits)
		n = '0' + n;
		return n;
	},
	//it is almost 8 o'clock PM here
	//timeString(new Date); returns "19:49"
	timeString: function(date) {
		var minutes = date.getMinutes().toString();
		var hours = date.getHours().toString();
		return this.zeroPad(2, hours) + ":" + this.zeroPad(2, minutes);
	},

	//does the argument only contain whitespace?
	isBlank: function(text) {
		var blank = /^\s*$/;
		return(text.match(blank) !== null);
	}
};

//绘制其它玩家的贪吃蛇
function addMessage(color,direction,x,y,len) {
	//TODO
};

// show tip
function tip(type, name) {
	var tip,title;
	switch(type){
		case 'online':
			tip = name + ' 加入了游戏.';
			title = '游戏通知';
			break;
		case 'offline':
			tip = name + ' 离开了游戏.';
			title = '连线通知';
			break;
		case 'message':
			tip = name + ' 正在操作.'
			title = '操作通知';
			break;
	}
	var pop=new Pop(title, tip);
};

// 初始化游戏玩家
function initUserList(data) {
	users = data.users;
	for(var i = 0; i < users.length; i++) {
		var slElement = $(document.createElement("li"));
		slElement.attr("value", users[i]);
		slElement.text(users[i]+data.sid);
        slElement.css("background-color",data.color);
		$("#user").append(slElement);
	}
};

//添加游戏玩家到列表
function addUser(user) {
	var slElement = $(document.createElement("li"));
	slElement.attr("value", user);
	slElement.text(user);
	$("#user").append(slElement);
};

//从列表删除游戏玩家
function removeUser(user) {
	$("#user li").each(
		function() {
			if($(this).val() === user) $(this).remove();
	});
};

// show error
function showError(content) {
	$("#loginError").text(content);
	$("#loginError").show();
};



//检索连接
function queryEntry(uid, callback) {
	var route = 'gate.gateHandler.queryEntry';
	pomelo.init({
        host: host,
        port: port,
		log: true
	}, function() {
		pomelo.request(route, {
			uid: uid
		}, function(data) {
			pomelo.disconnect();
			if(data.code === 500) {
				showError(LOGIN_ERROR);
				return;
			}
			callback(data.host, data.port);
		});
	});
};

//操作行为发往服务器
function sendData(direction,x,y,len) {
    var route = "channel.channelHandler.send";
    var msg = {
        direction:direction,
    	x:x,
		y:y,
		len:len
	};
    if(!util.isBlank(msg)) {
        pomelo.request(route, {
            rid: rid,
            content: msg,
            from: username,
            target: target
        }, function(data) {
            //todo
        });
    }
};

$(document).ready(function() {
	//wait message from the server.
	pomelo.on('onChat', function(data) {
		addMessage(data.users,data.sid,data.color,data.direction,data.x,data.y,data.len);
	});

	//update user list
	pomelo.on('onAdd', function(data) {
		var user = data.user;
		tip('online', user);
		addUser(user);
	});

	//update user list
	pomelo.on('onLeave', function(data) {
		var user = data.user;
		tip('offline', user);
		removeUser(user);
	});


	//handle disconect message, occours when the client is disconnect with servers
	pomelo.on('disconnect', function(reason) {

	});



});