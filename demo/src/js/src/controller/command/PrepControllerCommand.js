define(
    [
        "dojo/_base/declare",
        "todomvcdojo/AppConstants",
        "todomvcdojo/controller/command/TodoCommand"
    ],
    function(declare, AppConstants, TodoCommand) {

        var PrepControllerCommand = declare("todomvc.controller.command.PrepControllerCommand", puremvc.SimpleCommand, {
            /**
             * Register Commands with the Controller
             * @override
             */
            execute: function(notification) {
                // This registers multiple notes to a single command which performs different logic based on the note name.
                // In a more complex app, we'd usually be registering a different command to each notification name.
                this.facade.registerCommand(AppConstants.ADD_TODO, TodoCommand);
                this.facade.registerCommand(AppConstants.REMOVE_TODOS_COMPLETED, TodoCommand);
                this.facade.registerCommand(AppConstants.DELETE_TODO, TodoCommand);
                this.facade.registerCommand(AppConstants.UPDATE_TODO, TodoCommand);
                this.facade.registerCommand(AppConstants.TOGGLE_TODO_STATUS, TodoCommand);
                this.facade.registerCommand(AppConstants.FILTER_TODOS, TodoCommand);
            }
        });

        return PrepControllerCommand;
    }
);

