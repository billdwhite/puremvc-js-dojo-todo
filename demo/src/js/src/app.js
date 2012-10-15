define(
    [
        "dojo/_base/declare",
        "todomvcdojo/AppConstants",
        "todomvcdojo/controller/command/StartupCommand"
    ],
    function(declare, AppConstants, StartupCommand) {

        var Application = declare("todomvc.Application", null, {

            facade: null,

            constructor: function() {
                console.log("todomvc.Application()");
                this.facade = puremvc.Facade.getInstance(AppConstants.CORE_NAME);
                this.facade.registerCommand(AppConstants.STARTUP, StartupCommand);
                this.facade.sendNotification(AppConstants.STARTUP);
            }

        });

        Application.STARTUP = "startup";

        return Application;
    }
);
