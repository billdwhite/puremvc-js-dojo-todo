define(
    [
        "dojo/_base/declare",
        "todomvcdojo/controller/command/PrepControllerCommand",
        "todomvcdojo/controller/command/PrepModelCommand",
        "todomvcdojo/controller/command/PrepViewCommand"
    ],
    function(declare, PrepControllerCommand, PrepModelCommand, PrepViewCommand) {

        var StartupCommand = declare("todomvc.controller.command.StartupCommand", puremvc.MacroCommand, {
            /**
             * Add the sub-commands for this MacroCommand
             * @override
             */
            initializeMacroCommand: function() {
                this.addSubCommand(PrepControllerCommand);
                this.addSubCommand(PrepModelCommand);
                this.addSubCommand(PrepViewCommand);
            }
        });

        return StartupCommand;
    }
);
