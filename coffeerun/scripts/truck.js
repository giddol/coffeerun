(function (window) {
    'use strict';
    var App = window.App || {};
    
    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }

    Truck.prototype.createOrder = function(order) {
        console.log('Adding order for ' + order.emailAddress);
        return this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
        console.log('Delivering order for ' + customerId);
        return this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function(printFn) {
        return this.db.getAll()
            .then(function (orders) {
                var customerIdArray = Object.keys(orders);
                console.log('Truck #' + this.truckId + ' has pending orders:');
                customerIdArray.forEach(function(id) {
                    console.log(orders[id]);
                    if (printFn) {
                        printFn(orders[id]);
                    }
                }.bind(this)); //bind메소드는 객체 인자를 전달받고 새로운 버전의 함수를 반환한다. 새 버전의 함수를 호출하면 이는 bind로 전달된 객체 인자를 함수 내에서 this의 값으로 사용할 것이다.
            }.bind(this));
    };

    App.Truck = Truck;
    window.App = App;
})(window);