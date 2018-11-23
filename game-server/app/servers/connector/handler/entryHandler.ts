import {Application} from 'pinus';
import {FrontendSession} from 'pinus';

export default function (app: Application) {
    return new EntryHandler(app);
}

export class EntryHandler {
    constructor(private app: Application) {
    }

    /**
     * 随机一个颜色字符串，作为玩家贪吃蛇的色值
     */
    async getRandomColor(){
        return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
    }

    /**
     * New client entry.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    async enter(msg: { rid: string, username: string }, session: FrontendSession) {
        let self = this;
        let rid = msg.rid;
        let uid = msg.username + '*' + rid;
        let sessionService = self.app.get('sessionService');

        // duplicate log in
        if (!!sessionService.getByUid(uid)) {
            return {
                code: 500,
                error: true
            };
        }

        await session.abind(uid);
        session.set('rid', rid);
        session.push('rid', function (err) {
            if (err) {
                console.error('set rid for session service failed! error is : %j', err.stack);
            }
        });
        session.on('closed', this.onUserLeave.bind(this));

        // put user into channel
        let users = await self.app.rpc.channel.channelRemote.add.route(session)(uid, self.app.get('serverId'), rid, true);
        let result = {
            code: 200,
            users: users,
            sid:session.id,
            color:await this.getRandomColor()
        };
        return result;
    }


    /**
     * User log out handler
     *
     * @param {Object} app current application
     * @param {Object} session current session object
     *
     */
    onUserLeave(session: FrontendSession) {
        if (!session || !session.uid) {
            return;
        }
        this.app.rpc.channel.channelRemote.kick.route(session, true)(session.uid, this.app.get('serverId'), session.get('rid'));
    }

}