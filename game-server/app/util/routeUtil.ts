
import { dispatch} from './dispatcher';
import { Session, Application } from 'pinus';

export function chat(session: Session, msg: any, app: Application, cb: (err: Error , serverId ?: string) => void) {
    let channelServers = app.getServersByType('channel');

    if(!channelServers || channelServers.length === 0) {
        cb(new Error('can not find chat servers.'));
        return;
    }

    let res = dispatch(session.get('rid'), channelServers);

    cb(null, res.id);
}