$(function() {
    $(".warning").hide();

    $(window).resize(function(){
        if ($(window).width() < 960) {
                $(".warning").show();
        }
        else{
            $(".warning").hide();
        }
    });
    
});
