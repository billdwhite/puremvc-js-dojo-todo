define(
    [
        "dojo/_base/declare",
        "todomvcdojo/AppConstants",
        "todomvcdojo/view/event/AppEvents",
        "todomvcdojo/view/component/TodoForm"
    ],
    function(declare, AppConstants, AppEvents, TodoForm) {

        var TodoFormMediator = declare("todomvc.view.mediator.TodoFormMediator", puremvc.Mediator, {
            
            // Notifications this mediator is interested in 
            listNotificationInterests: function() {
                return [
                    AppConstants.TODOS_FILTERED
                ];
            },


            // Code to be executed when the Mediator instance is registered with the View
            onRegister: function() {
                this.setViewComponent(new TodoForm);
                this.viewComponent.addEventListener(AppEvents.TOGGLE_COMPLETE, this);
                this.viewComponent.addEventListener(AppEvents.TOGGLE_COMPLETE_ALL, this);
                this.viewComponent.addEventListener(AppEvents.UPDATE_ITEM, this);
                this.viewComponent.addEventListener(AppEvents.DELETE_ITEM, this);
                this.viewComponent.addEventListener(AppEvents.ADD_ITEM, this);
                this.viewComponent.addEventListener(AppEvents.CLEAR_COMPLETED, this);
            },


            // Handle events from the view component
            handleEvent: function(event) {
                switch (event.type) {
                    case AppEvents.TOGGLE_COMPLETE_ALL:
                        this.sendNotification(AppConstants.TOGGLE_TODO_STATUS, event.doToggleComplete);
                        break;

                    case AppEvents.DELETE_ITEM:
                        this.sendNotification(AppConstants.DELETE_TODO, event.todoId);
                        break;

                    case AppEvents.ADD_ITEM:
                        this.sendNotification(AppConstants.ADD_TODO, event.todo);
                        break;

                    case AppEvents.CLEAR_COMPLETED:
                        this.sendNotification(AppConstants.REMOVE_TODOS_COMPLETED);
                        break;

                    case AppEvents.TOGGLE_COMPLETE:
                    case AppEvents.UPDATE_ITEM:
                        this.sendNotification(AppConstants.UPDATE_TODO, event.todo);
                        break;

                    default:
                        break;
                }
            },


            // Handle notifications from other PureMVC actors
            handleNotification: function(notification) {
                switch (notification.getName()) {
                    case AppConstants.TODOS_FILTERED:
                        this.viewComponent.setFilteredTodoList(notification.getBody());
                        break;

                    default:
                        break;
                }
            }
        });

        TodoFormMediator.NAME = 'TodoFormMediator';
        
        return TodoFormMediator;
    }
);