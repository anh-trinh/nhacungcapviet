/**
 * Created by Administrator on 2/17/2017.
 */
jQuery(document).ready(function($){




    $('[data-toggle="tooltip"]').tooltip();
    var $form_modal = $('.cd-user-modal'),
        $form_login = $form_modal.find('#cd-login'),
        $form_signup = $form_modal.find('#cd-signup'),
        $form_signup_2 = $form_modal.find('#cd-signup-2'),
        $form_forgot_password = $form_modal.find('#cd-reset-password'),
        $form_modal_tab = $('.cd-switcher'),
        $tab_login = $form_modal_tab.children('li').eq(0).children('a'),
        $tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
        $tab_signup_2 = $form_modal_tab.children('li').eq(2).children('a'),
        $forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
        $back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
        $main_nav = $('.main-nav');

    //open modal
    $main_nav.on('click', function(event){

        if( $(event.target).is($main_nav) ) {
            // on mobile open the submenu
            $(this).children('ul').toggleClass('is-visible');
        } else {
            // on mobile close submenu
            $main_nav.children('ul').removeClass('is-visible');
            //show modal layer
            $form_modal.addClass('is-visible');
            //show the selected form
            if($(event.target).is('.cd-signup')){
                signup_selected();
            }
            else if($(event.target).is('.cd-signup-2')){
                signup_2_selected();
            }
            else if($(event.target).is('.cd-signin')){
                login_selected();
            }
            // ( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
        }

    });

    //close modal
    $('.cd-user-modal').on('click', function(event){
        if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
            $form_modal.removeClass('is-visible');
        }
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            $form_modal.removeClass('is-visible');
        }
    });

    //switch from a tab to another
    $form_modal_tab.on('click', function(event) {
        event.preventDefault();
        ( $(event.target).is( $tab_login ) ) ? login_selected() : (( $(event.target).is( $tab_signup ) ) ? signup_selected() : signup_2_selected() );
    });

    //hide or show password
    $('.hide-password').on('click', function(){
        var $this= $(this),
            $password_field = $this.prev('input');

        ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
        ( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
        //focus and move cursor to the end of input field
        $password_field.putCursorAtEnd();
    });
    var pure_contact_field = $('.phone-instance:first-child').clone();
    //add contact
    var max_contact = 0;
    $(document).on('click','.add-contact', function(){
        if(max_contact <=3){
            pure_contact_field.clone().appendTo(".phone-number-fieldset");
            $('#max_contact_number').val(parseInt($('#max_contact_number').val())+1);
            max_contact++;
            if(max_contact ===3){
                $('.add-contact').remove();
            }
        }
    });
    var max_contact_2 = 0;
    var pure_contact_field_2 = $('.phone-instance-2:first-child').clone();
    $(document).on('click','.add-contact-2', function(){
        if(max_contact_2 <=3){
            pure_contact_field_2.clone().appendTo(".phone-number-fieldset-2");
            $('#max_contact_number_2').val(parseInt($('#max_contact_number_2').val())+1);
            max_contact_2++;
            if(max_contact_2 ===3){
                $('.add-contact-2').remove();
            }
        }
    });

    //show forgot-password form
    $forgot_password_link.on('click', function(event){
        event.preventDefault();
        forgot_password_selected();
    });

    //back to login from the forgot-password form
    $back_to_login_link.on('click', function(event){
        event.preventDefault();
        login_selected();
    });

    function login_selected(){
        $form_login.addClass('is-selected');
        $form_signup.removeClass('is-selected');
        $form_signup_2.removeClass('is-selected');
        $form_forgot_password.removeClass('is-selected');
        $tab_login.addClass('selected');
        $tab_signup.removeClass('selected');
        $tab_signup_2.removeClass('selected');
    }

    function signup_selected(){
        $form_login.removeClass('is-selected');
        $form_signup.addClass('is-selected');
        $form_signup_2.removeClass('is-selected');
        $form_forgot_password.removeClass('is-selected');
        $tab_login.removeClass('selected');
        $tab_signup.addClass('selected');
        $tab_signup_2.removeClass('selected');
    }

    function signup_2_selected(){
        $form_login.removeClass('is-selected');
        $form_signup_2.addClass('is-selected');
        $form_signup.removeClass('is-selected');
        $form_forgot_password.removeClass('is-selected');
        $tab_login.removeClass('selected');
        $tab_signup.removeClass('selected');
        $tab_signup_2.addClass('selected');
    }

    function forgot_password_selected(){
        $form_login.removeClass('is-selected');
        $form_signup.removeClass('is-selected');
        $form_signup_2.removeClass('is-selected');
        $form_forgot_password.addClass('is-selected');
    }

    //REMOVE THIS - it's just to show error messages
    $form_login.find('input[type="submit"]').on('click', function(event){
        event.preventDefault();
        $form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });
    $form_signup.find('input[type="submit"]').on('click', function(event){
        event.preventDefault();
        $form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });
    $form_signup_2.find('input[type="submit"]').on('click', function(event){
        event.preventDefault();
        $form_signup_2.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });


    //IE9 placeholder fallback
    //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
    // if(!Modernizr.input.placeholder){
    //     $('[placeholder]').focus(function() {
    //         var input = $(this);
    //         if (input.val() == input.attr('placeholder')) {
    //             input.val('');
    //         }
    //     }).blur(function() {
    //         var input = $(this);
    //         if (input.val() == '' || input.val() == input.attr('placeholder')) {
    //             input.val(input.attr('placeholder'));
    //         }
    //     }).blur();
    //     $('[placeholder]').parents('form').submit(function() {
    //         $(this).find('[placeholder]').each(function() {
    //             var input = $(this);
    //             if (input.val() == input.attr('placeholder')) {
    //                 input.val('');
    //             }
    //         })
    //     });
    // }

});


//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
    return this.each(function() {
        // If this function exists...
        if (this.setSelectionRange) {
            // ... then use it (Doesn't work in IE)
            // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
            var len = $(this).val().length * 2;
            this.setSelectionRange(len, len);
        } else {
            // ... otherwise replace the contents with itself
            // (Doesn't work in Google Chrome)
            $(this).val($(this).val());
        }
    });
};

$(function() {

    $('#mhcc').magicSuggest({
        data: [
            {"commodityID":"1","commodityGroup":"May mặt","commodityName":"Giày dép"},
            {"commodityID":"7","commodityGroup":"May mặt","commodityName":"Quần áo"},
            {"commodityID":"8","commodityGroup":"May mặt","commodityName":"Phụ kiện khác"},
            {"commodityID":"2","commodityGroup":"Nhóm 2","commodityName":"Thực phẩm"},
            {"commodityID":"3","commodityGroup":"Nhóm 2","commodityName":"Vi tính - Điện tử"},
            {"commodityID":"4","commodityGroup":"Nhóm 2","commodityName":"Điện lạnh"},
            {"commodityID":"5","commodityGroup":"Nhóm 2","commodityName":"Văn phòng phẩm - Quà tặng"},
            {"commodityID":"6","commodityGroup":"Nhóm 2","commodityName":"Mỹ phẩm - Sức khỏe"},
        ],
        valueField: 'commodityID',
        displayField: 'commodityName',
        expandOnFocus: true,
        groupBy:'commodityGroup'
    });
    $('#mhpp').magicSuggest({
        data: [
            {"commodityID":"1","commodityGroup":"May mặt","commodityName":"Giày dép"},
            {"commodityID":"7","commodityGroup":"May mặt","commodityName":"Quần áo"},
            {"commodityID":"8","commodityGroup":"May mặt","commodityName":"Phụ kiện khác"},
            {"commodityID":"2","commodityGroup":"Nhóm 2","commodityName":"Thực phẩm"},
            {"commodityID":"3","commodityGroup":"Nhóm 2","commodityName":"Vi tính - Điện tử"},
            {"commodityID":"4","commodityGroup":"Nhóm 2","commodityName":"Điện lạnh"},
            {"commodityID":"5","commodityGroup":"Nhóm 2","commodityName":"Văn phòng phẩm - Quà tặng"},
            {"commodityID":"6","commodityGroup":"Nhóm 2","commodityName":"Mỹ phẩm - Sức khỏe"},
        ],
        valueField: 'commodityID',
        displayField: 'commodityName',
        expandOnFocus: true,
        groupBy:'commodityGroup'
    });

    // Instantiate the Bootstrap carousel
    $('.multi-item-carousel').carousel({
        interval: false
    });

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
    $('.multi-item-carousel .item').each(function(){
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i=0;i<2;i++) {
            next=next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
    });


});

/**
 * Created by Kupletsky Sergey on 17.10.14.
 *
 * Material Sidebar (Profile menu)
 * Tested on Win8.1 with browsers: Chrome 37, Firefox 32, Opera 25, IE 11, Safari 5.1.7
 * You can use this sidebar in Bootstrap (v3) projects. HTML-markup like Navbar bootstrap component will make your work easier.
 * Dropdown menu and sidebar toggle button works with JQuery and Bootstrap.min.js
 */

// Sidebar toggle
//
// -------------------
$(document).ready(function() {
    var overlay = $('.sidebar-overlay');
    var sidebar_menu = $('.sidebar-nav>li');

    $('.sidebar-toggle').on('click', function() {
        var sidebar = $('#sidebar');
        sidebar.toggleClass('open');
        if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')) {
            overlay.addClass('active');
        } else {
            overlay.removeClass('active');
        }
    });

    overlay.on('click', function() {
        $(this).removeClass('active');
        $('#sidebar').removeClass('open');
    });
    sidebar_menu.on('click', function() {
        overlay.removeClass('active');
        $('#sidebar').removeClass('open');
    });

});

// Sidebar constructor
//
// -------------------
$(document).ready(function() {

    var sidebar = $('#sidebar');
    var sidebarHeader = $('#sidebar .sidebar-header');
    var sidebarImg = sidebarHeader.css('background-image');
    var toggleButtons = $('.sidebar-toggle');

    // Hide toggle buttons on default position
    $('body').css('display', 'table');


    // Sidebar position
    $('#sidebar-position').change(function() {
        var value = $( this ).val();
        sidebar.removeClass('sidebar-fixed-left sidebar-fixed-right sidebar-stacked').addClass(value).addClass('open');
        if (value == 'sidebar-fixed-left' || value == 'sidebar-fixed-right') {
            $('.sidebar-overlay').addClass('active');
        }
        // Show toggle buttons
        if (value != '') {
            toggleButtons.css('display', 'initial');
            $('body').css('display', 'initial');
        } else {
            // Hide toggle buttons
            toggleButtons.css('display', 'none');
            $('body').css('display', 'table');
        }
    });

    // Sidebar theme
    $('#sidebar-theme').change(function() {
        var value = $( this ).val();
        sidebar.removeClass('sidebar-default sidebar-inverse sidebar-colored sidebar-colored-inverse').addClass(value)
    });

    // Header cover
    $('#sidebar-header').change(function() {
        var value = $(this).val();

        $('.sidebar-header').removeClass('header-cover').addClass(value);

        if (value == 'header-cover') {
            sidebarHeader.css('background-image', sidebarImg)
        } else {
            sidebarHeader.css('background-image', '')
        }
    });


    var dropdown = $('.dropdown');

    // Add slidedown animation to dropdown
    dropdown.on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(100);//
    });

    // Add slideup animation to dropdown
    dropdown.on('hide.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(100);//
    });


    //Scroll
    var lastFixPos = 0;
    var threshold = 200;

    $(window).on('scroll', function(){
        var diff_2 = $(window).scrollTop() - lastFixPos;
        if (diff_2 > 0 && (Math.abs(diff_2) > 10)){
            //Scroll down
            $('.second-nav').slideUp('slow');//.css("margin-top",0)
            $('.navbar-default').addClass('header-shadow');
            if($( window ).width() <=768){
                $('.navbar-search-form').slideUp(200);
            }

            // if(parseInt($('.second-nav').css("margin-top")) >0){
            //     $('.second-nav').css("margin-top",parseInt($('.second-nav').css("margin-top"))-1);
            // }
        }
        if (diff_2 < 0 && (Math.abs(diff_2) > 10)){
            //Scroll up
            $('.second-nav').slideDown('slow');//.css("margin-top",63)
            if($( window ).width() >768){
                $('.navbar-default').removeClass('header-shadow');
            }
            else{
                $('.navbar-search-form').slideDown(200);
            }

        }
        lastFixPos = $(window).scrollTop();
        // var diff = Math.abs($(window).scrollTop() - lastFixPos);
        // if(diff > threshold){
        //     alert('Do something');
        //     lastFixPos = $(window).scrollTop();
        // }
    });
    $( window ).resize(function() {
        if($( window ).width() >768){
            $('.navbar-search-form').slideDown(200);
        }
    });
    $('#toggle-search-form').click(function(){
        $(".sidebar-overlay").trigger("click");
        $('.navbar-search-form').slideDown(200);
        $('.navbar-search-form-input').focus();
    })
});

/**
 * Created by Kupletsky Sergey on 08.09.14.
 *
 * Add JQuery animation to bootstrap dropdown elements.
 */
//
// (function($) {
//     var dropdown = $('.dropdown');
//
//     // Add slidedown animation to dropdown
//     dropdown.on('show.bs.dropdown', function(e){
//         alert("dropdown");
//         $(this).find('.dropdown-menu').first().stop(true, true);//.slideDown()
//     });
//
//     // Add slideup animation to dropdown
//     dropdown.on('hide.bs.dropdown', function(e){
//         $(this).find('.dropdown-menu').first().stop(true, true);//.slideUp()
//     });
// })(jQuery);



(function(removeClass) {

    jQuery.fn.removeClass = function( value ) {
        if ( value && typeof value.test === "function" ) {
            for ( var i = 0, l = this.length; i < l; i++ ) {
                var elem = this[i];
                if ( elem.nodeType === 1 && elem.className ) {
                    var classNames = elem.className.split( /\s+/ );

                    for ( var n = classNames.length; n--; ) {
                        if ( value.test(classNames[n]) ) {
                            classNames.splice(n, 1);
                        }
                    }
                    elem.className = jQuery.trim( classNames.join(" ") );
                }
            }
        } else {
            removeClass.call(this, value);
        }
        return this;
    }

})(jQuery.fn.removeClass);