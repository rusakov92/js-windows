var View = {
    /**
     * Initiate the object.
     *
     * @param  {Object} options
     * @return {void}
     */
    init: function(options) {
        this.template = options.template;
        this.name = options.name;
        this.content = document.getElementById('view-' + this.name);

        this.render();
    },

    /**
     * Render the view.
     *
     * @return {void}
     */
    render: function() {
        this.content.innerHTML = this.template;
        this.el = document.getElementById('template-' + this.name);

        if (this.selectors) {
            for (var selector in this.selectors) {
                this.elements[selector] = document.querySelector(this.selectors[selector]);
            }
        }

        this.events.on.call(this);
    },

    /**
     * Generic events.
     *
     * @type {Object}
     */
    events: {
        on: function() {},
        off: function() {}
    },

    /**
     * Destroy the view.
     *
     * @return {void}
     */
    destroy: function() {
        this.events.off();
    }
};
