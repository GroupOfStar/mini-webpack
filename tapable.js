import { SyncHook, AsyncParallelHook } from 'tapable';

class List {
    getRoutes() { }
}

class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(["arg1", "arg2"]),
            brake: new SyncHook(),
            calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
        };
    }

    setSpeed(newSpeed, arg2) {
        console.log("setSpeed");
        // following call returns undefined even when you returned values
        this.hooks.accelerate.call(newSpeed, arg2);
    }

    useNavigationSystemPromise(source, target) {
        const routesList = new List();
        return this.hooks.calculateRoutes.promise(source, target, routesList).then((res) => {
            console.log('useNavigationSystemPromise');
            // res is undefined for AsyncParallelHook
            return routesList.getRoutes();
        });
    }

    useNavigationSystemAsync(source, target, callback) {
        const routesList = new List();
        this.hooks.calculateRoutes.callAsync(source, target, routesList, err => {
            if (err) return callback(err);
            callback(null, routesList.getRoutes());
        });
    }
}

// 1. 注册
const car = new Car()
car.hooks.accelerate.tap("test 1", (...args) => {
    console.log('accelerate 1 :', args);
})
car.hooks.accelerate.tap("test 2", (...args) => {
    console.log('accelerate 2 :', args.join(','));
})

// 2. 触发
car.setSpeed('cs01', "args2", "args3")

// 1. 注册
car.hooks.calculateRoutes.tapPromise("calculateRoutes 1", (source, target) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('----source, target :>> ', source, target);
            resolve()
        }, 1000)
    })
})
// 2. 触发
car.useNavigationSystemPromise([1, 2, 3], '3')
