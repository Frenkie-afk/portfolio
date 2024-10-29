jQuery(function ($) {
    const main = {
        init: function () {
           this.contactsHandler();
        },
        contactsHandler: function () {
            // console.log(  $('.contacts-list').outerHeight() );
            $('.sidebar').css('--contacts-outer-height', $('.contacts-list').outerHeight() + 'px' );

            $('#contacts-toggle').on('click', function () {
                $('.sidebar').toggleClass('active');
            })
        }
    }

    main.init();
})
