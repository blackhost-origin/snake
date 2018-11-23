"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pinus_robot_plugin_1 = require("pinus-robot-plugin");
class Robot {
    constructor(actor) {
        this.actor = actor;
        this.openid = String(Math.round(Math.random() * 1000));
        this.pinusClient = new pinus_robot_plugin_1.PinusWSClient();
    }
    connectGate() {
        let host = '127.0.0.1';
        let port = '3014';
        this.pinusClient.on(pinus_robot_plugin_1.PinusWSClientEvent.EVENT_IO_ERROR, (event) => {
            // 错误处理
            console.error('error', event);
        });
        this.pinusClient.on(pinus_robot_plugin_1.PinusWSClientEvent.EVENT_CLOSE, function (event) {
            // 关闭处理
            console.error('close', event);
        });
        this.pinusClient.on(pinus_robot_plugin_1.PinusWSClientEvent.EVENT_HEART_BEAT_TIMEOUT, function (event) {
            // 心跳timeout
            console.error('heart beat timeout', event);
        });
        this.pinusClient.on(pinus_robot_plugin_1.PinusWSClientEvent.EVENT_KICK, function (event) {
            // 踢出
            console.error('kick', event);
        });
        // this.actor.emit("incr" , "gateConnReq");
        this.actor.emit('start', 'gateConn', this.actor.id);
        this.pinusClient.init({
            host: host,
            port: port
        }, () => {
            this.actor.emit('end', 'gateConn', this.actor.id);
            // 连接成功执行函数
            console.log('gate连接成功');
            this.gateQuery();
        });
    }
    gateQuery() {
        // this.actor.emit("incr" , "gateQueryReq");
        this.actor.emit('start', 'gateQuery', this.actor.id);
        this.pinusClient.request('gate.gateHandler.queryEntry', { uid: this.openid }, (result) => {
            // 消息回调
            // console.log("gate返回",JSON.stringify(result));
            this.actor.emit('end', 'gateQuery', this.actor.id);
            this.pinusClient.disconnect();
            this.connectToConnector(result);
        });
    }
    connectToConnector(result) {
        // this.actor.emit("incr" , "loginConnReq");
        this.actor.emit('start', 'loginConn', this.actor.id);
        this.pinusClient.init({
            host: result.host,
            port: result.port
        }, () => {
            this.actor.emit('end', 'loginConn', this.actor.id);
            // 连接成功执行函数
            console.log('connector连接成功');
            this.loginQuery({ rid: this.actor.id.toString(), username: this.actor.id.toString() });
        });
    }
    loginQuery(result) {
        // this.actor.emit("incr" , "loginQueryReq");
        this.actor.emit('start', 'loginQuery', this.actor.id);
        this.pinusClient.request('connector.entryHandler.enter', result, (ret) => {
            // 消息回调
            this.actor.emit('end', 'loginQuery', this.actor.id);
            console.log('connector返回', JSON.stringify(result));
            setTimeout(() => this.loginQuery(result), Math.random() * 5000 + 1000);
        });
    }
}
exports.Robot = Robot;
function default_1(actor) {
    let client = new Robot(actor);
    client.connectGate();
    return client;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9ib3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9yb2JvdC9yb2JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDJEQUFzRTtBQUd0RTtJQUNJLFlBQW9CLEtBQVk7UUFBWixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBSWhDLFdBQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVsRCxnQkFBVyxHQUFHLElBQUksa0NBQWEsRUFBRSxDQUFDO0lBSmxDLENBQUM7SUFNTSxXQUFXO1FBRWQsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDO1FBQ3ZCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyx1Q0FBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM3RCxPQUFPO1lBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsVUFBUyxLQUFLO1lBQzlELE9BQU87WUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLHVDQUFrQixDQUFDLHdCQUF3QixFQUFFLFVBQVMsS0FBSztZQUMzRSxZQUFZO1lBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLHVDQUFrQixDQUFDLFVBQVUsRUFBRSxVQUFT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