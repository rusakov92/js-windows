var app = app || {};

(function(global, doc, app) {
    /**
     * Create ContentView from View object
     *
     * @type {View Object}
     */
    app.ContentView = Object.create(global.View);

    /**
     * Add events for this view.
     *
     * @type {Object}
     */
    app.ContentView.events = {
        on: function () {
            app.events.listen('app:window:create', this.createNewWindow);
            app.events.listen('app:window:destroy', this.destroyWindow);
        },

        off: function () {}
    };

    /**
     * Make new window.
     *
     * @return {void}
     */
    app.ContentView.createNewWindow = function() {
        var windowView = Object.create(global.WindowView);

        windowView.init({id: 'id-' + Math.random().toString(36).substr(2, 16)});
        app.windowInstances.push(windowView);
    };

    /**
     * Destroy the selected window.
     *
     * @param  {Event Object} e
     * @return {void}
     */
    app.ContentView.destroyWindow = function (e) {
        for (var i = app.windowInstances.length - 1; i >= 0; i--) {
            if(app.windowInstances[i].id === e.detail.id){
                app.windowInstances.splice(i, 1);
            }
        }
    };
})(window, document, app);
