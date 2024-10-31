jQuery(function ($) {
    const main = {
        init: function () {
           this.contactsHandler();
        },
        contactsHandler: function () {
            // set height dynamically for the contacts list wrapper
            $(window).on('resize', function () {
                if (innerWidth < 992) {
                    $('.sidebar').css('--contacts-outer-height', $('.contacts-list').outerHeight() + 'px' );
                } else {
                    $('.sidebar').removeAttr('style');
                }
            }).resize();

            // toggle contacts list
            $('#contacts-toggle').on('click', function () {
                $('.sidebar').toggleClass('active');
            })
        },
    }

    main.init();
})
