define(
    [
        "dojo/_base/declare"
    ],
    function(declare) {

        var AppEvents = declare("todomvc.view.event.AppEvents", null, {

            constructor: function() {
                console.log("todomvc.view.event.AppEvents()");
            }
        });


        // Create event (cross-browser)
        AppEvents.createEvent = function(eventName) {
            var event;
            if (document.createEvent) {
                event = document.createEvent('Events');
                event.initEvent(eventName, false, false);
            }
            else if (document.createEventObject) {
                event = document.createEventObject();
            }
            return event;
        };


        // Add event listener (cross-browser)
        AppEvents.addEventListener = function(object, type, listener, useCapture) {
            if (object.addEventListener) {
                object.addEventListener(type, listener, useCapture);
            }
            else if (object.attachEvent) {
                object.attachEvent(type, listener);
            }
        };


        // Dispatch event (cross-browser)
        AppEvents.dispatchEvent = function(object, event) {
            if (object.dispatchEvent) {
                object.dispatchEvent(event);
            }
            else if (object.fireEvent) {
                object.fireEvent(event.type, event);
            }
        };


        AppEvents.TOGGLE_COMPLETE_ALL = 'toggle_complete_all';
        AppEvents.TOGGLE_COMPLETE =     'toggle_complete';
        AppEvents.CLEAR_COMPLETED =     'clear_completed';
        AppEvents.DELETE_ITEM =         'delete_item';
        AppEvents.UPDATE_ITEM =         'update_item';
        AppEvents.ADD_ITEM =            'add_item';

        return AppEvents;
    }
);