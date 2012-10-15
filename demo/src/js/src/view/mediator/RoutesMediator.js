define(
    [
        "dojo/_base/declare",
        "todomvcdojo/AppConstants",
        "todomvcdojo/model/proxy/TodoProxy"
    ],
    function(declare, AppConstants, TodoProxy) {

        var RoutesMediator = declare("todomvc.view.mediator.RoutesMediator", puremvc.Mediator, {

            // the router (Flatirion Director)
            router: null,


            // setup the routes when mediator is registered
            onRegister: function() {
                var todoProxy = this.facade.retrieveProxy(TodoProxy.NAME);
                var defaultRoute = this.getRouteForFilter(todoProxy.filter);
                var options = {
                    resource:this,
                    notfound:this.handleFilterAll
                };
                var routes = {
                   '/':          this.handleFilterAll,
                   '/active':    this.handleFilterActive,
                   '/completed': this.handleFilterCompleted
                };

                this.router = new Router(routes).configure(options);
                this.router.init(defaultRoute);
            },


            getRouteForFilter: function(filter) {
                var route;
                switch (filter) {
                    case AppConstants.FILTER_ALL:
                        route = '/';
                        break;

                    case AppConstants.FILTER_ACTIVE:
                        route = '/active';
                        break;

                    case AppConstants.FILTER_COMPLETED:
                        route = '/completed';
                        break;

                    default:
                        break;
                }
                return route;
            },


            // route handlers
            handleFilterAll: function () {
                this.resource.facade.sendNotification(AppConstants.FILTER_TODOS, AppConstants.FILTER_ALL);
            },


            handleFilterActive: function () {
                this.resource.facade.sendNotification(AppConstants.FILTER_TODOS, AppConstants.FILTER_ACTIVE);
            },


            handleFilterCompleted: function () {
                this.resource.facade.sendNotification(AppConstants.FILTER_TODOS, AppConstants.FILTER_COMPLETED);
            }
        });


        RoutesMediator.NAME = 'RoutesMediator';

        return RoutesMediator;
    }
 );