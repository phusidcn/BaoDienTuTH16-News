$(function() {
    $('mainTable').contextMenu({
        target: '#contextMenu',
        scope: 'tbody > tr',
        onItem: function(row, e) {
            var name = $(row.children('*')[1]).text();
            var action = $(e.target).text();
            alert('You right clicked on ' + name + '\'s row and selected menu item "' + action  + '".');
        }
    });
});