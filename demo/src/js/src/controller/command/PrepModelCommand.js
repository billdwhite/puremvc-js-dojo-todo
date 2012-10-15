define(
    [
        "dojo/_base/declare",
        "todomvcdojo/model/proxy/TodoProxy"
    ],
    function(declare, TodoProxy) {

        var PrepModelCommand = declare("todomvc.controller.command.PrepModelCommand", puremvc.SimpleCommand, {
            /**
             * Register Proxies with the Model
             * @override
             */
            execute: function(notification) {
                this.facade.registerProxy(new TodoProxy());
            }
        });

        return PrepModelCommand;
    }
);
