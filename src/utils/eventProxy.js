/****************************************************************************
 * @copyright   LIU Zhao
 * @authors     LIU Zhao (liuzhaomax@163.com)
 * @date        2021/8/19 15:49
 * @version     v1.0
 * @filename    eventProxy.js
 * @description
 ***************************************************************************/

const eventProxy = {
    onObj: {},
    oneObj: {},
    on: function (key, fn) {
        if (this.onObj[key] === undefined) {
            this.onObj[key] = [];
        }
        const args = [].concat(Array.prototype.slice.call(arguments, 1));
        for (let i = 0; i < args.length; i++) {
            this.onObj[key].push(args[i]);
        }
    },
    one: function (key, fn) {
        if (this.oneObj[key] === undefined) {
            this.oneObj[key] = [];
        }
        this.oneObj[key].push(fn);
    },
    off: function (key) {
        this.onObj[key] = [];
        this.oneObj[key] = [];
    },
    trigger: function () {
        let key, args;
        if (arguments.length === 0) {
            return false;
        }
        key = arguments[0];
        args = [].concat(Array.prototype.slice.call(arguments, 1));
        if (this.onObj[key] !== undefined
            && this.onObj[key].length > 0) {
            for (let i in this.onObj[key]) {
                this.onObj[key][i].call(null, args[i]);
            }
        }
        if (this.oneObj[key] !== undefined
            && this.oneObj[key].length > 0) {
            for (let i in this.oneObj[key]) {
                this.oneObj[key][i].apply(null, args);
                this.oneObj[key][i] = undefined;
            }
            this.oneObj[key] = [];
        }
    }
}

export default eventProxy