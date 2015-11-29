var Event = {
    /**
     * Creates a new event.
     *
     * @param  {String} eventName
     * @param  {Mixed}  eventDetails
     * @return {CustomEvent}
     */
    create: function(eventName, eventDetails) {
        return new CustomEvent(eventName, {detail: eventDetails});
    },

    /**
     * Add event listener to element.
     *
     * @param  {DOM Object} el
     * @param  {String}     eventName
     * @param  {Closure}    handler
     * @return {void}
     */
    subscribe: function(el, eventName, handler) {
        el.addEventListener(eventName, handler);
    },

    /**
     * Remove event listener from element.
     *
     * @param  {DOM Object} el
     * @param  {String}     eventName
     * @param  {Closure}    handler
     * @return {void}
     */
    unsubscribe: function(el, eventName, handler) {
        el.removeEventListener(eventName, handler);
    },

    /**
     * Start an event from the element.
     *
     * @param  {DOM Object} el
     * @param  {[type]}     eventName
     * @param  {Object}     eventDetails
     * @return {void}
     */
    run: function(el, eventName, eventDetails) {
        // Create the custom events.
        var e = this.create(eventName, eventDetails);

        el.dispatchEvent(e);
    }
};
