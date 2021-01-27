(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();

            var data = $(this).serializeArray();

            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data)
                .then(function(){
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addSliderHandler = function(fn) {
        this.$rangeElement = $('#strengthLevel');
        console.log('Setting slider handler');
        this.$rangeElement.on('input', function () {
            this.$caffeineRating = $('.caffeine-rating');
            this.$caffeineRating.html(this.value);
            this.$caffeineRating.css('color', 'green');
            if(this.value >= 33) {
                this.$caffeineRating.css('color', 'orange');
                
            }
            if(this.value > 66) {
                this.$caffeineRating.css('color', 'red');
            }
        });
    }

    App.FormHandler = FormHandler;
    window.App = App;
})(window);