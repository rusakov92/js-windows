var app = app || {};

(function (app) {
    app.templates.Window = ' \
<header class="header"> \
    <div class="window-actions"> \
        <span class="action icon-dash"></span> \
        <span class="action icon-popup"></span> \
        <span class="action icon-delete-circle"></span> \
    </div> \
    <h2>Title</h2> \
</header> \
<div class="pure-g"> \
    <aside class="pure-u-1 pure-u-md-1-5 sidebar"> \
       Additional actions \
    </aside> \
    <main class="pure-u-1 pure-u-md-4-5 content"> \
        Main content \
    </main> \
</div> \
<footer class="footer"> \
    <strong> Status bar :) </strong> \
</footer>';
})(app);
