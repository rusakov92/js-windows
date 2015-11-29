var app = app || {};

(function(global, doc, app) {
    /**
     * Master configuration for the application.
     *
     * @type {Object}
     */
    var config = {
        el: '.windows'
    };

    /**
     * Caching application elements.
     *
     * @type {Object}
     */
    var elements = {};

    /**
     * @type {Array}
     */
    var instanceStorage = [];

    /**
     * Initiate the application.
     *
     * @return {void}
     */
    app.init = function() {
        cacheElements();
        this.bindEvents();

        // Cache the views.
        this.events.notify('app:layout:cached');

        // Call the event to set up the configuration.
        this.events.notify('app:ready');
    };

    /**
     * Cache main configuration and settings.
     *
     * @return {void}
     */
    function cacheElements () {
        elements.el = doc.querySelector(config.el);
    }

    /**
     *
     * @return {void}
     */
    app.bindEvents = function() {
        this.events.listen('app:ready', setConfig.bind(this));
        this.events.listen('app:layout:cached', createView.bind(this));
    };

    /**
     * The application events handler.
     *
     * @type {Object}
     */
    app.events = {
        listen: function(eventName, handler) {
            Event.subscribe(elements.el, eventName, handler);
        },

        remove: function(eventName, handler) {
            Event.unsubscribe(elements.el, eventName, handler);
        },

        notify: function(eventName, eventDetails) {
            Event.run(elements.el, eventName, eventDetails);
        }
    };

    /**
     * @return {void}
     */
    function setConfig () {
        config.appWidth = global.innerWidth;
        config.appHeight = global.innerHeight;
    }

    /**
     * @return {Object}
     */
    app.getConfig = function() {
        return config;
    };

    /**
     * Create the view that we want to render.
     *
     * @return {void}
     */
    function createView () {
        for (var templateName in this.templates.layout) {
            this[templateName + 'View'].init({
                template: this.templates.layout[templateName],
                name: templateName
            });
        }
    }

    /**
     * @type {Object}
     */
    app.layout = {};

    /**
     * @type {Array}
     */
    app.windowInstances = [];

    /**
     * Exit application.
     *
     * @return {void}
     */
    app.exit = function () {
        for (var i = instanceStorage.length - 1; i >= 0; i--) {
            instanceStorage[i].destroy();
        }
    };
})(window, document, app);

app.init();
