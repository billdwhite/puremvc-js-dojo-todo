define(
    [
        "dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/dom",
        "dojo/on",
        "todomvcdojo/AppConstants",
        "todomvcdojo/view/event/AppEvents"
    ],
    function(declare, lang, dom, on, AppConstants, AppEvents) {
        var TodoForm = declare("todomvc.view.component.TodoForm", null, {

            todo: null,
            stats: null,
            filter: null,
            todoApp: null,
            main: null,
            toggleAllCheckbox: null,
            newTodoField: null,
            todoList: null,
            footer: null,
            todoCount: null, // data
            clearButton: null,
            filters: null,
            filterAll: null,
            filterActive: null,
            filterCompleted: null,  // Fixed DOM elements managed by this view component

            constructor: function() {
                console.log("todomvc.view.component.TodoForm()");

                // data
                this.todos  = [];
                this.stats  = {};
                this.filter = '';

                // Fixed DOM elements managed by this view component
                this.todoApp            = dom.byId('todoapp');//document.querySelector('#todoapp');
                this.main               = dom.byId('main');
                this.toggleAllCheckbox  = dom.byId('toggle-all');
                this.newTodoField       = dom.byId('new-todo');
                this.todoList           = dom.byId('todo-list');
                this.footer             = dom.byId('footer');
                this.todoCount          = dom.byId('todo-count');
                this.clearButton        = dom.byId('clear-completed');
                this.filters            = dom.byId('filters');
                this.filterAll          = dom.byId('filterAll');
                this.filterActive       = dom.byId('filterActive');
                this.filterCompleted    = dom.byId('filterCompleted');

                // Event listeners for fixed UI elements
                on(this.newTodoField, 'keypress', lang.hitch(this, function(event) {
                    if ((event.keyCode === TodoForm.ENTER_KEY) && this.newTodoField.value) {
                        this.dispatchAddTodo();
                    }
                }));

                on(this.clearButton, 'click', lang.hitch(this, function() {
                    console.log("click");
                    this.dispatchClearCompleted();
                }));

                on(this.toggleAllCheckbox, 'change', lang.hitch(this, function(event) {
                    console.log("change");
                    this.dispatchToggleCompleteAll(event.target.checked);
                }));
            },


            addEventListener: function (type, listener, useCapture){
                AppEvents.addEventListener(this.todoApp, type, listener, useCapture);
            },


            createEvent: function(eventName) {
               return AppEvents.createEvent(eventName);
            },


            dispatchEvent: function(event) {
               AppEvents.dispatchEvent(this.todoApp, event);
            },


            dispatchToggleComplete: function(event) {
               var todo, toggleItemCompleteEvent;
               todo = this.getTodoById(event.target.getAttribute('data-todo-id'));
               todo.id = event.target.getAttribute('data-todo-id');
               todo.completed = event.target.checked;
               toggleItemCompleteEvent = this.createEvent(AppEvents.TOGGLE_COMPLETE);
               toggleItemCompleteEvent.todo = todo;
               this.dispatchEvent(toggleItemCompleteEvent);
            },


            dispatchToggleCompleteAll: function(checked) {
                var toggleCompleteAllEvent = this.createEvent(AppEvents.TOGGLE_COMPLETE_ALL);
                toggleCompleteAllEvent.doToggleComplete = checked;
                this.dispatchEvent(toggleCompleteAllEvent);
            },


            dispatchClearCompleted: function() {
                var clearCompleteEvent = this.createEvent(AppEvents.CLEAR_COMPLETED);
                this.dispatchEvent(clearCompleteEvent);
            },


            dispatchDelete: function(id) {
                var deleteItemEvent = this.createEvent(AppEvents.DELETE_ITEM);
                deleteItemEvent.todoId = id;
                this.dispatchEvent(deleteItemEvent);
            },


            dispatchAddTodo: function() {
                var addItemEvent, todo = {};
                todo.completed = false;
                todo.title = this.newTodoField.value.trim();
                if (todo.title !== '') {
                    addItemEvent = this.createEvent(AppEvents.ADD_ITEM);
                    addItemEvent.todo = todo;
                    this.dispatchEvent(addItemEvent);
                }
            },


            dispatchUpdateTodo: function(event) {
                var eventType, updateItemEvent, todo = {};
                todo.id = event.target.id.slice(6);
                todo.title = event.target.value.trim();
                todo.completed = event.target.completed;
                eventType = (todo.title === "") ? AppEvents.DELETE_ITEM : AppEvents.UPDATE_ITEM;
                updateItemEvent = this.createEvent(eventType);
                updateItemEvent.todo = todo;
                updateItemEvent.todoId = todo.id;
                this.dispatchEvent(updateItemEvent);
            },


            setFilteredTodoList: function(data) {
                var todo, checkbox, label, deleteLink, divDisplay, inputEditTodo, li, i, todoId, div;

                // Update instance data
                this.todos  = data.todos;
                this.stats  = data.stats;
                this.filter = data.filter;

                // Hide main section if no todos
                this.main.style.display = this.stats.totalTodo ? 'block' : 'none';

                // Create Todo list
                this.todoList.innerHTML = '';
                this.newTodoField.value = '';
                for (i=0; i < this.todos.length; i++) {

                    todo = this.todos[i];

                    // Create checkbox
                    checkbox = document.createElement('input');
                    checkbox.className = 'toggle';
                    checkbox.setAttribute('data-todo-id', todo.id);
                    checkbox.type = 'checkbox';
                    checkbox.component = this;
                    AppEvents.addEventListener(checkbox, 'change', function(event) {
                        this.component.dispatchToggleComplete(event);
                    });

                    // Create div text
                    label = document.createElement('label');
                    label.setAttribute('data-todo-id', todo.id);
                    label.appendChild(document.createTextNode(todo.title));

                    // Create delete button
                    deleteLink = document.createElement('button');
                    deleteLink.className = 'destroy';
                    deleteLink.setAttribute('data-todo-id', todo.id);
                    deleteLink.component = this;
                    AppEvents.addEventListener(deleteLink, 'click', function(event) {
                        this.component.dispatchDelete(event.target.getAttribute('data-todo-id'));
                    });

                    // Create divDisplay
                    divDisplay = document.createElement('div');
                    divDisplay.className = 'view';
                    divDisplay.setAttribute('data-todo-id', todo.id);
                    divDisplay.appendChild(checkbox);
                    divDisplay.appendChild(label);
                    divDisplay.appendChild(deleteLink);
                    AppEvents.addEventListener(divDisplay, 'dblclick', function() {
                        todoId = this.getAttribute('data-todo-id');
                        div = document.getElementById('li_' + todoId);
                        inputEditTodo = document.getElementById('input_' + todoId);
                        div.className = 'editing';
                        inputEditTodo.focus();
                    });

                    // Create todo input
                    inputEditTodo = document.createElement('input');
                    inputEditTodo.id = 'input_' + todo.id;
                    inputEditTodo.className = 'edit';
                    inputEditTodo.value = todo.title;
                    inputEditTodo.completed = todo.completed;
                    inputEditTodo.component = this;

                    AppEvents.addEventListener(inputEditTodo, 'keypress', function(event) {
                        if (event.keyCode === this.component.ENTER_KEY) {
                            this.component.dispatchUpdateTodo(event);
                        }
                    });

                    AppEvents.addEventListener(inputEditTodo, 'blur', function(event) {
                        this.component.dispatchUpdateTodo(event);
                    });

                    // Create Todo ListItem and add to list
                    li = document.createElement('li');
                    li.id = 'li_' + todo.id;
                    li.appendChild(divDisplay);
                    li.appendChild(inputEditTodo);
                    if (todo.completed) {
                        li.className += 'complete';
                        checkbox.checked = true;
                    }
                    this.todoList.appendChild(li);
                }

                // Update UI
                this.footer.style.display = this.stats.totalTodo ? 'block' : 'none';
                this.updateToggleAllCheckbox();
                this.updateClearButton();
                this.updateTodoCount();
                this.updateFilter();

            },

            getTodoById: function(id) {
                var i;
                var returnValue = null;
                for (i = 0; i < this.todos.length; i++) {
                    if (this.todos[ i ].id === id) {
                        returnValue = this.todos[i];
                        break;
                    }
                }
                return returnValue;
            },


            updateFilter: function() {
                this.filterAll.className        = (this.filter === AppConstants.FILTER_ALL) ? 'selected' : '';
                this.filterActive.className     = (this.filter === AppConstants.FILTER_ACTIVE) ? 'selected' : '';
                this.filterCompleted.className  = (this.filter === AppConstants.FILTER_COMPLETED) ? 'selected' : '';
            },


            updateToggleAllCheckbox: function() {
               var i, checked = (this.todos.length > 0);
               for (i = 0; i < this.todos.length; i++) {
                    if (this.todos[ i ].completed === false) {
                        checked = false;
                        break;
                    }
               }
               this.toggleAllCheckbox.checked = checked;
            },


            updateClearButton: function() {
                this.clearButton.style.display = (this.stats.todoCompleted === 0) ? 'none' : 'block';
                this.clearButton.innerHTML = 'Clear completed (' + this.stats.todoCompleted + ')';
            },


            updateTodoCount: function() {
                var number = document.createElement('strong'),
                    text   = ' ' + (this.stats.todoLeft === 1 ? 'item' : 'items') + ' left';
                number.innerHTML = this.stats.todoLeft;
                this.todoCount.innerHTML = null;
                this.todoCount.appendChild(number);
                this.todoCount.appendChild(document.createTextNode(text));
            }
        });

        TodoForm.ENTER_KEY = 13;
        TodoForm.NAME = "TodoForm";

        return TodoForm;
    }
);