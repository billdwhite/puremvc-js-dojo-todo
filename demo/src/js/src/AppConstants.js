define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {
        var AppConstants = declare("todomvc.AppConstants", null, {
            constructor: function() {
                console.log("todomvc.AppConstants()");
            }
        });

        AppConstants.CORE_NAME = "TodoMVC";

        // Notifications 
        AppConstants.STARTUP = 'startup';
        AppConstants.ADD_TODO = 'add_todo';
        AppConstants.DELETE_TODO = 'delete_todo';
        AppConstants.UPDATE_TODO = 'update_todo';
        AppConstants.TOGGLE_TODO_STATUS = 'toggle_todo_status';
        AppConstants.REMOVE_TODOS_COMPLETED = 'remove_todos_completed';
        AppConstants.FILTER_TODOS = 'filter_todos';
        AppConstants.TODOS_FILTERED = 'todos_filtered';

        // Filter routes
        AppConstants.FILTER_ALL = 'all';
        AppConstants.FILTER_ACTIVE = 'active';
        AppConstants.FILTER_COMPLETED = 'completed';

        return AppConstants;
    }
);