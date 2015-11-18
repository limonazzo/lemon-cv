Session.set("idiome", "en");

getUserLanguage = function () {
    var idioma = Session.get("idiome");
    if (idioma === "es") {
        Session.set("idiome", "en");
    } else {
        Session.set("idiome", "es");
    }
    return Session.get("idiome");
};

$.fn.isOnScreen = function () {

    var win = $(window);

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

Meteor.startup(function () {
    var s = "color: blue; font-size: 100px" ;
    TAPi18n.setLanguage(getUserLanguage());
    $('[data-toggle="tooltip"]').tooltip('hide');

    var barras = true;
    var graficas = true;
    $(document).on('scroll', function () {
        if ($('#professional-skills').isOnScreen() == true && barras == true) {
            $('.progress .progress-bar').progressbar();
            barras = false;
        }
        if ($('#personal-skills').isOnScreen() == true && graficas == true) {
            $('.chart').easyPieChart({
                easing: 'easeOutBounce',
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
            var chart = window.chart = $('.chart').data('easyPieChart');
            graficas = false;
        }
    });
    $("#portfolio-pic").fancybox({
        autoSize: true,
        openEffect: 'fade',
        openSpeed: 'slow',
        helpers: {
            title: {
                type: 'inside'
            }
        }
    });
    console.log("%c↓ ↓ ↓", s);
    console.log("https://www.youtube.com/watch?v=dRl8EIhrQjQ");
    console.log("%c↑ ↑ ↑", s);
});



Template.body.events({
    'click .up': function (event) {
        $('html, body').animate({scrollTop: 0}, 1000);
    },
    'click .top-contact': function (event) {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top
        }, 1000);
    },
    'click .top-menu': function (event) {
        $('nav').fadeToggle(300);
    },
    'click .top-toggle-day-night': function (event) {
        if ($('#dark').length) {
            $('#dark').remove();
        } else {
            $('head').append("<link id='dark' href='css/dark.css' type='text/css' rel='stylesheet' />");
        }
    },
    'click .top-lang': function (event) {
        TAPi18n.setLanguage(getUserLanguage());
    }
});


Template.form.events({
    'click #sendc': function (event) {
        console.log("SEND MAIL");
        var cname = $("#namec").val();
        var cemail = $("#emailc").val();
        var csubject = $("#csubject").val();
        var csub = $("#messagec").val();

        var errcount = 0;
        if (cname.length < 1)
        {
            $("#namec").addClass("error");
            errcount = 1;
        } else {
            $("#namec").removeClass("error");
        }

        //email validation
        var emailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/i);
        var valid = emailRegex.test(cemail);
        if (!valid) {
            $("#emailc").addClass("error");
            errcount = 1;
        } else {
            $("#emailc").removeClass("error");
        }
        if (errcount === 0) {

            var content = cname + "\n" + cemail + "\n\n" + csubject + "\n\n" + csub;

            Meteor.call('sendEmail',
                    'i@limonazzo.com',
                    'Limonazzo Contacto',
                    content);
                    
            $('#contact-form').fadeTo(1600,0,function(){
              $('#contact-form').css({visibility: 'hidden'});
              $('.sent').css({visibility: 'visible'}).hide().fadeIn(1600, function(){
              });
            });

        }

        return false;
    }
});