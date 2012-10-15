define(
    [
        "dojo/_base/declare",
        "todomvcdojo/AppConstants",
        "todomvcdojo/model/proxy/TodoProxy"
    ],
    function(declare, AppConstants, TodoProxy) {
        
        var TodoCommand = declare("todomvc.controller.command.TodoCommand", puremvc.SimpleCommand, {
            /**
             * Perform business logic (in this case, based on Notification name)
             * @override
             */
            execute: function(notification) {
                var proxy = this.facade.retrieveProxy(TodoProxy.NAME);

                switch (notification.getName()) {
                    case AppConstants.ADD_TODO:
                        proxy.addTodo(notification.getBody());
                        break;

                    case AppConstants.DELETE_TODO:
                        proxy.deleteTodo(notification.getBody());
                        break;

                    case AppConstants.UPDATE_TODO:
                        proxy.updateTodo(notification.getBody());
                        break;

                    case AppConstants.TOGGLE_TODO_STATUS:
                        proxy.toggleCompleteStatus(notification.getBody());
                        break;

                    case AppConstants.REMOVE_TODOS_COMPLETED:
                        proxy.removeTodosCompleted();
                        break;

                    case AppConstants.FILTER_TODOS:
                        proxy.filterTodos(notification.getBody());
                        break;

                    default:
                        console.log('TodoCommand received an unsupported Notification');
                        break;
                }
            }
        });
        
        return TodoCommand;
    }
);