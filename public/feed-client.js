$(function() {
  $('.stupid-carousel').slick({
    slidesToShow: 1,
    // hack do not change lolol.
    speed: 1000,
    // fade: true,
    autoplay: true,
    // hack do not change lolol.
    autoplaySpeed: 5000,
    cssEase: 'linear',
    variableWidth: true,
    slidesToScroll: 1,
    dots: true,
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
  });
}