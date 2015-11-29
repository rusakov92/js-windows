var app = app || {};

(function(global, doc, app) {
    /**
     * Create global object from View object.
     *
     * @type {View Object}
     */
    global.WindowView = Object.create(View);

    /**
     * Internal methods that we will use.
     *
     * @type {Array}
     */
    global.WindowView.internelMethods = [
        'destroy',
        'minimize',
        'maximize',
        'highlight',
        'unhighlight'
    ];

    /**
     * Selectors for this object.
     *
     * @type {Object}
     */
    global.WindowView.selectors = {
        closeIcon:'.icon-delete-circle',
        minimizeIcon: '.icon-dash',
        maximizeIcon: '.icon-popup'
    };

    /**
     * The events for this object.
     *
     * @type {Object}
     */
    global.WindowView.events = {
        on: function () {
            Event.subscribe(this.closeIcon, 'click', this.destroy);
            Event.subscribe(this.minimizeIcon, 'click', this.minimize);
            Event.subscribe(this.maximizeIcon, 'click', this.maximize);
            app.events.listen('app:footericon:unhighlighted:' + this.id, this.unhighlight);
            app.events.listen('app:footericon:highlighted:' + this.id, this.highlight);
        },
        off: function () {
            Event.unsubscribe(this.closeIcon, 'click', this.destroy);
            Event.unsubscribe(this.minimizeIcon, 'click', this.minimize);
            Event.unsubscribe(this.maximizeIcon, 'click', this.maximize);
            app.events.remove('app:footericon:unhighlighted:' + this.id, this.unhighlight);
            app.events.remove('app:footericon:highlighted:' + this.id, this.highlight);
        }
    };

    /**
     * Initiate a new window.
     *
     * @param  {Object} options
     * @return {void}
     */
    global.WindowView.init = function(options) {
        this.template = options.template || app.templates.Window;
        this.id = options.id;
        // minimized or maximized
        this.type = options.type || 'normalized';

        this.bindInternalMethods();

        this.render();

        app.events.notify('app:window:created', {id: this.id});
    };

    /**
     * Add all internal methods for every new window.
     *
     * @return {void}
     */
    global.WindowView.bindInternalMethods = function() {
        var view = this;

        this.internelMethods.forEach(function(methodName) {
            view[methodName] = view[methodName].bind(view);
        });
    };

    /**
     * Render the window.
     *
     * @return {void}
     */
    global.WindowView.render = function() {
        this.wrapper = doc.createElement('section');
        this.wrapper.className = 'window';
        this.wrapper.innerHTML = this.template;

        app.ContentView.el.appendChild(this.wrapper);

        this.closeIcon = this.wrapper.querySelector(this.selectors.closeIcon);
        this.minimizeIcon = this.wrapper.querySelector(this.selectors.minimizeIcon);
        this.maximizeIcon = this.wrapper.querySelector(this.selectors.maximizeIcon);

        this.wrapper.classList.add('windowhighlight');

        this.events.on.call(this);
    };

    /**
     * Highlight window.
     *
     * @return {void}
     */
    global.WindowView.highlight = function() {
        this.resetView();
        this.popup();
        this.wrapper.classList.add('windowhighlight');
    };

    /**
     * Reset windows.
     *
     * @return {[type]} [description]
     */
    global.WindowView.resetView = function() {
        var view = this;

        this.wrapper.classList.forEach(function(className) {
            if (className !== 'window') {
                view.wrapper.classList.remove(className);
            }
        });
    };

    /**
     * Popup window.
     *
     * @return {void}
     */
    global.WindowView.popup = function() {
        this.resetView();
        this.wrapper.classList.add('fadeInUp', 'animated');
    };

    /**
     * Unhighlight window.
     *
     * @return {[type]} [description]
     */
    global.WindowView.unhighlight = function() {
        this.minimize();
    };

    /**
     * Minimize window.
     *
     * @return {void}
     */
    global.WindowView.minimize = function(){
        this.resetView();
        this.wrapper.classList.add('fadeOutDown', 'animated');
        app.events.notify('app:window:minimized', {id: this.id});
    };

    /**
     * Change window type.
     *
     * @return {void}
     */
    global.WindowView.maximize = function(){
        if(this.type === 'maximized'){
            this.wrapper.removeAttribute('style');
            this.type = 'normalized';
            app.events.notify('app:window:normalized');
        } else {
            this.wrapper.style.width = '98%';
            this.wrapper.style.height = (global.innerHeight - 70) + 'px';
            this.type = 'maximized';
            app.events.notify('app:window:maximized');
        }
    };

    /**
     * Destroy window.
     *
     * @return {void}
     */
    global.WindowView.destroy = function () {
        this.events.off.call(this);
        this.wrapper.parentNode.removeChild(this.wrapper);

        app.events.notify('app:window:destroy', {id: this.id});
    };
})(window, document, app);

