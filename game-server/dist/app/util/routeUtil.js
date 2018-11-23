"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatcher_1 = require("./dispatcher");
function chat(session, msg, app, cb) {
    let channelServers = app.getServersByType('channel');
    if (!channelServers || channelServers.length === 0) {
        cb(new Error('can not find chat servers.'));
        return;
    }
    let res = dispatcher_1.dispatch(session.get('rid'), channelServers);
    cb(null, res.id);
}
exports.chat = chat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVVdGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXBwL3V0aWwvcm91dGVVdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkNBQXVDO0FBR3ZDLGNBQXFCLE9BQWdCLEVBQUUsR0FBUSxFQUFFLEdBQWdCLEVBQUUsRUFBNkM7SUFDNUcsSUFBSSxjQUFjLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXJELElBQUcsQ0FBQyxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDL0MsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztRQUM1QyxPQUFPO0tBQ1Y7SUFFRCxJQUFJLEdBQUcsR0FBRyxxQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFFdkQsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckIsQ0FBQztBQVhELG9CQVdDIn0=