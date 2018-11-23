这是pinus的简单示例工程，包含：
 1、game-server，游戏服务器
 2、web-server，网页客户端的服务

启动方法：
1、执行npm-install.bat或npm-install.sh
2、编译游戏后端服务器
cd game-server
npm run build
2、启动游戏后端服务器
cd dist
node app
显示“all servers startup in xxx ms”即表示启动成功

3、启动网页服务器
cd web-server
node app
显示“Please log on http://127.0.0.1:3001/index.html”即表示启动成功

4、进入客户端网页
浏览器输入
http://127.0.0.1:3001/index.html
点击“开始游戏”，若服务器返回贪吃蛇当前用户ID和名称则表示成功

