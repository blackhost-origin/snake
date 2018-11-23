"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    return new EntryHandler(app);
}
exports.default = default_1;
class EntryHandler {
    constructor(app) {
        this.app = app;
    }
    /**
     * 随机一个颜色字符串，作为玩家贪吃蛇的色值
     */
    async getRandomColor() {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    }
    /**
     * New client entry.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     * @param  {Function} next    next step callback
     * @return {Void}
     */
    async enter(msg, session) {
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
            sid: session.id,
            color: await this.getRandomColor()
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
    onUserLeave(session) {
        if (!session || !session.uid) {
            return;
        }
        this.app.rpc.channel.channelRemote.kick.route(session, true)(session.uid, this.app.get('serverId'), session.get('rid'));
    }
}
exports.EntryHandler = EntryHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vYXBwL3NlcnZlcnMvY29ubmVjdG9yL2hhbmRsZXIvZW50cnlIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUZELDRCQUVDO0FBRUQ7SUFDSSxZQUFvQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO0lBQ3BDLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxjQUFjO1FBQ2hCLE9BQU8sR0FBRyxHQUFDLENBQUMsT0FBTyxHQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLFNBQVMsSUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBc0MsRUFBRSxPQUF3QjtRQUN4RSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNsQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbkMsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVwRCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQyxPQUFPO2dCQUNILElBQUksRUFBRSxHQUFHO2dCQUNULEtBQUssRUFBRSxJQUFJO2FBQ2QsQ0FBQztTQUNMO1FBRUQsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsR0FBRztZQUM3QixJQUFJLEdBQUcsRUFBRTtnQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqRjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUVsRCx3QkFBd0I7UUFDeEIsSUFBSSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsSCxJQUFJLE1BQU0sR0FBRztZQUNULElBQUksRUFBRSxHQUFHO1lBQ1QsS0FBSyxFQUFFLEtBQUs7WUFDWixHQUFHLEVBQUMsT0FBTyxDQUFDLEVBQUU7WUFDZCxLQUFLLEVBQUMsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFO1NBQ3BDLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBR0Q7Ozs7OztPQU1HO0lBQ0gsV0FBVyxDQUFDLE9BQXdCO1FBQ2hDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQzFCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUgsQ0FBQztDQUVKO0FBcEVELG9DQW9FQyJ9