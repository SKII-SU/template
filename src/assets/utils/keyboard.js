function keyboard() {
    var win_h = $(window).height();
    if ($(window).height() < win_h) {
        $('.share-btn-box').hide();
    } else {
        $('.share-btn-box').show();
    }
}
keyboard()
window.onresize = function () {
    keyboard();
};