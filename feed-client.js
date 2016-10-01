$(function() {
  $('.stupid-carousel').slick({
    slidesToShow: 1,
    speed: 500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    pauseOnHover: false,
    slidesToScroll: 1,
    dots: false,
    arrows: false
  })

  manageFeedPages();
  
});

function manageFeedPages() {
  $(".feed-main").delegate('.next-feed-link', 'click', function (ev) {
    var $elem = $(ev.currentTarget).parents('.active-feed-section');
    var $next = $elem.next();
    
    if ($elem.hasClass('video-feed')) {
      $('.video-embed').remove();
    }
    if ($elem.hasClass('visualization')) {
      $('.feed-logo').remove();
    }
    
    $elem.removeClass('active-feed-section');
    $next.addClass('active-feed-section');
    
    if ($elem.hasClass('video-feed')) {
      setTimeout(function tickleIt() {
        // $(".stupid-carousel").slick("slickPause");
        $(".stupid-carousel").slick("slickGoTo", 1, true);
        $(".stupid-carousel").slick("slickGoTo", 0, true);
        // $(".stupid-carousel").slick("slickPlay");  
      }, 10);
    }
  });
}