define(
    [
        "dojo/_base/declare",
        "todomvcdojo/view/mediator/TodoFormMediator",
        "todomvcdojo/view/mediator/RoutesMediator"
    ],
    function(declare, TodoFormMediator, RoutesMediator) {

        var PrepViewCommand = declare("todomvc.controller.command.PrepViewCommand", puremvc.SimpleCommand, {
            /**
             * Register Mediators with the View
             * @override
             */
            execute: function(notification) {
                this.facade.registerMediator(new TodoFormMediator());
                this.facade.registerMediator(new RoutesMediator());
            }
        });

        return PrepViewCommand;
    }
);
