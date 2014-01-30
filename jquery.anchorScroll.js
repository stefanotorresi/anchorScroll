(function($){

    $.fn.anchorScroll = function(options) {

        var defaults = {
            speed: 700,
            fx: "swing",
            offset: 0,
            updateHref: true,
            callback: function(target){}
        };

        this.options = $.extend(defaults, options);
        var anchorScroll = this;

        this.scrollToTarget = function(target) {

            if (!$(target).length) {
                return true;
            }
            var destination = $(target).offset().top;

            if (anchorScroll.options.offset) {
                destination += parseInt(anchorScroll.options.offset);
            }

            if (navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i)) {
                $("body").append('<div id="ios5fix" style="height: 200px"></div>');
            }

            $(window).data('anchorscrolling', true);

            $("body,html").stop(true).animate({scrollTop: destination}, anchorScroll.options.speed, anchorScroll.options.fx, function(){
                $(window).data('anchorscrolling', false);
                $("#ios5fix").remove();
                if (anchorScroll.options.updateHref) {
                    anchorScroll.updateLocationHref();
                }
                $.proxy(anchorScroll.options.callback, anchorScroll, target).call();
            });

            return false;
        }

        this.updateLocationHref = function() {
            if (anchorScroll.href) {
                location.href = anchorScroll.href;
            }
        }

        return this.each(function(){
            $(this).click(function() {
                var href = $(this).attr("href");
                anchorScroll.href = href;

                if (href.indexOf("#") == -1) {
                    return true;
                }

                var target = href.substring(href.indexOf("#"));

                return anchorScroll.scrollToTarget(target);
            });
        });

    };

})(jQuery);
