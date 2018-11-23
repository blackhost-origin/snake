"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    return new AuthRemoter(app);
}
exports.default = default_1;
class AuthRemoter {
    constructor(app) {
        this.app = app;
    }
    /**
     * 远程rpc方法
     * @param username
     * @param password
     */
    async auth(username, password) {
        return true;
    }
    async rpcTest(username, password) {
        return true;
    }
}
exports.AuthRemoter = AuthRemoter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aFJlbW90ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9hcHAvc2VydmVycy9jb25uZWN0b3IvcmVtb3RlL2F1dGhSZW1vdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsbUJBQXlCLEdBQWdCO0lBQ3JDLE9BQU8sSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUZELDRCQUVDO0FBYUQ7SUFDSSxZQUFvQixHQUFnQjtRQUFoQixRQUFHLEdBQUgsR0FBRyxDQUFhO0lBRXBDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFnQixFQUFFLFFBQWdCO1FBQ2hELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7UUFDbkQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBakJELGtDQWlCQyJ9