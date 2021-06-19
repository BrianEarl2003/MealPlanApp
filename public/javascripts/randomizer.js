$.fn.shufflelistitems = function() {
    $.each(this.get(), function(index, el) {
        var $el = $(el);
        var $find = $el.children();
 
        $find.sort(function() {
            return 0.5 - Math.random();
        });
 
        $el.empty();
        $find.appendTo($el);
    });
};
 
$('.shuffleBtn').click(function() {
    $(".shuffle-list-items").shufflelistitems();
});