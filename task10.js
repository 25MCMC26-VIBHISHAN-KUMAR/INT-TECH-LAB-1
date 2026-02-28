(function ($) {
    $.fn.simpleTabs = function (options) {
        var settings = $.extend({
            activeClass: "active",
            speed: 200,
            defaultTab: null
        }, options);

        return this.each(function () {
            var container = $(this);
            var tabs = container.find(".tabs li");
            var panels = container.find(".tab-panel");

            function showTab(tabId) {
                if ($(tabId).length === 0) return;

                tabs.removeClass(settings.activeClass);
                tabs.filter('[data-tab="' + tabId + '"]').addClass(settings.activeClass);

                panels.hide();
                $(tabId).fadeIn(settings.speed);

                if (window.location.hash !== tabId) {
                    history.pushState(null, null, tabId);
                }
            }

            tabs.on("click", function () {
                var tabId = $(this).data("tab");
                showTab(tabId);
            });

            tabs.on("keydown", function (e) {
                var index = tabs.index(this);

                if (e.key === "ArrowRight") {
                    var next = (index + 1) % tabs.length;
                    tabs.eq(next).focus().click();
                } else if (e.key === "ArrowLeft") {
                    var prev = (index - 1 + tabs.length) % tabs.length;
                    tabs.eq(prev).focus().click();
                }
            });

            $(window).on("hashchange", function () {
                var hash = window.location.hash;
                if (hash) {
                    showTab(hash);
                }
            });

            var startTab = settings.defaultTab;

            if (window.location.hash) {
                startTab = window.location.hash;
            }

            if (!startTab) {
                startTab = tabs.first().data("tab");
            }

            showTab(startTab);
        });
    };
})(jQuery);