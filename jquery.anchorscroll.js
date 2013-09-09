(function($){

    $.fn.anchorscroll = function(options) {

        var defaults = {
            speed: 700,
            fx: "swing",
            offset: 0
        };

        var options = $.extend(defaults, options);

        return this.each(function(){
            $(this).click(function(e) {
                var href = $(this).attr("href");

                if (href.indexOf("#") == -1) {
                    return true;
                }

                var target = href.substring(href.indexOf("#"));

                if (!$(target).length) {
                    return true;
                }

                var destination = $(target).offset().top;
                
                if (options.offset) {
                    destination += parseInt(options.offset);
                }

                if (navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i)) {
                    $("body").append('<div id="ios5fix" style="height: 200px"></div>');
                }

                $(window).data('anchorscrolling', true);

                $("html, body").stop(true).animate({scrollTop: destination}, options.speed, options.fx, function(){
                    $(window).data('anchorscrolling', false);
                    $("#ios5fix").remove();
                    return true;
                });

                return false;
            });
        });

    };

})(jQuery);
