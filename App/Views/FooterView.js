var app = app || {};

(function(global, doc, app) {
    /**
     * Create object from View object.
     *
     * @type {View Object}
     */
    app.FooterView = Object.create(global.View);

    /**
     * The selector we will use.
     *
     * @type {Object}
     */
    app.FooterView.selectors = {
        createNewWindow: '.icon-smile',
        windowIcon: '.window-tab'
    };

    /**
     * Store all instances of the footer view.
     *
     * @type {Array}
     */
    app.FooterView.footerInstances = [];

    /**
     * @type {Object}
     */
    app.FooterView.elements = {};

    /**
     * Render the footer template.
     *
     * @return {void}
     */
    app.FooterView.render = function() {
        this.content.innerHTML = this.template;
        this.el = doc.getElementById('template-' + this.name);

        if (this.selectors) {
            for (var selector in this.selectors) {
                this.elements[selector] = doc.querySelector(this.selectors[selector]);
            }
        }

        this.iconList = this.el.children[0];

        this.events.on.call(this);
    };

    /**
     * Add events for this view.
     *
     * @type {Object}
     */
    app.FooterView.events = {
        on: function() {
            Event.subscribe(this.elements.createNewWindow, 'click', this.createNewWindow.bind(this));
            app.events.listen('app:window:destroy', this.destroyWindow.bind(this));
            app.events.listen('app:window:created', this.createNewIcon.bind(this));
            app.events.listen('app:window:minimized', this.windowMinimized);
        },

        off: function() {}
    };

    /**
     * Create new icon.
     *
     * @return {void}
     */
    app.FooterView.createNewWindow = function() {
        app.events.notify('app:window:create');
    };

    /**
     * Create new icon.
     *
     * @param  {Event Object} e
     * @return {void}
     */
    app.FooterView.createNewIcon = function(e) {
        var wrapper = makeNewIconElement(e);

        this.iconList.appendChild(wrapper);

        this.footerInstances.push({id: wrapper.id});

        this.resetFooter();

        wrapper.classList.add('iconhighlight');
        Event.subscribe(wrapper, 'click', this.iconHighlight);
    };

    /**
     * Generates a random RGB color.
     *
     * @return {string}
     */
    function makeRandomeColor () {
        return 'rgb(' +
               (Math.floor(Math.random() * 256)) +
               ',' +
               (Math.floor(Math.random() * 256)) +
               ',' +
               (Math.floor(Math.random() * 256)) +
               ')';
    }

    /**
     * Creates a new icon HTML element.
     *
     * @param  {Event Object} e
     * @param  {string} element
     * @return {HTML Element}
     */
    function makeNewIconElement (e, element) {
        element = element || 'li';

        var wrapper = doc.createElement(element);
        wrapper.className = 'window-tab';
        wrapper.id = e.detail.id;
        wrapper.innerHTML = app.templates.footerTemplate;
        wrapper.firstChild.style.color = makeRandomeColor();

        return wrapper;
    }

    /**
     * Creates a new icon in footer.
     *
     * @return {void}
     */
    app.FooterView.resetFooter = function() {
        for (var i = this.footerInstances.length - 1; i >= 0; i--) {
            var currentElement = doc.getElementById(this.footerInstances[i].id);

            currentElement.classList.forEach(function(className) {
                if (className !== 'window-tab') {
                    app.events.notify('app:footericon:unhighlighted:' + app.FooterView.footerInstances[i].id);
                    currentElement.classList.remove(className);
                }
            });
        }
    };

    /**
     * Highlights the current icon in footer or removes the highlight CSS class.
     *
     * @param  {Event Object} e
     * @return {void}
     */
    app.FooterView.iconHighlight = function(e) {
        var elm = e.target.parentNode;

        if (elm.classList.contains('iconhighlight')) {
            elm.classList.remove('iconhighlight');
            app.events.notify('app:footericon:unhighlighted:' + elm.id);
        } else {
            app.FooterView.resetFooter();
            elm.classList.add('iconhighlight');
            app.events.notify('app:footericon:highlighted:' + elm.id);
        }
    };

    /**
     * When we minimize a window we remove the highlight style.
     *
     * @param  {Event Object} e
     * @return {void}
     */
    app.FooterView.windowMinimized = function(e) {
        if (e.detail.id) {
            doc.getElementById(e.detail.id).classList.remove('iconhighlight');
        }
    };

    /**
     * Remove the icon when we close a window.
     *
     * @param  {Event Object} e
     * @return {void}
     */
    app.FooterView.destroyWindow = function(e) {
        for (var i = this.footerInstances.length - 1; i >= 0; i--) {
            if(this.footerInstances[i].id === e.detail.id){
                this.footerInstances.splice(i, 1);
            }
        }

        var iconToRemove = this.iconList.querySelector('#' + e.detail.id);
        Event.unsubscribe(iconToRemove, 'click', this.iconHighlight);
        iconToRemove.parentNode.removeChild(iconToRemove);
    };
})(window, document, app);
