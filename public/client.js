// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

var PAGES = {
  wayfare: true,
  stamps: true,
  chromium: true,
  oman: true,
  nsj: true,
  metro: true,
  feed: true,
  logos: true,
  alice: true
}


function findSegment($elem) {
  var className = $elem.attr("class");
  var parts = className.split(' ');
  var segmentType = '';
  
  for (var i = 0; i < parts.length; i++) {
    if (PAGES[parts[i]]) {
      segmentType = parts[i];
      break;
    }
  }
  
  return segmentType;
}

function hideArrows() {
  var $carousel = $(".carousel");
  
  $carousel.find(".slick-next").hide();
  $carousel.find(".slick-prev").hide();
  $carousel.find(".slick-dots").hide();
}
function showArrows() {
  var $carousel = $(".carousel");
  
  $carousel.find(".slick-next").show();
  $carousel.find(".slick-prev").show();
  $carousel.find(".slick-dots").show();
}

function manageActivePage() {
  $(".carousel").delegate(".img-slide", "click", function onClick(ev) {
    var $elem = $(ev.target);
    var segmentType = findSegment($elem);
    
    hideArrows();
    
    var $carousel = $("." + segmentType + "-carousel");
    
    $carousel.slick("slickGoTo", 0, true);
    // $carousel.slick("slickPause");
    
    var $pageElem = $("." + segmentType + "-project");
    $pageElem.addClass("active-project");
    $pageElem.removeClass("idle-project");

    // image auto play speed, x seconds per image
    $carousel.slick("slickSetOption", "autoplaySpeed", 3000);
    // image fade animation time
    // $carousel.slick("slickSetOption", "speed", 1000);
    
    $carousel.slick("slickPlay");
    
  });
  
  $(".project").delegate(".close-project", "click", function onClick2(ev) {
    var $elem = $(ev.currentTarget).parent();
    console.log('parent', $elem);
    
    var $carousel = $elem.find(".project-carousel");
    $carousel.slick("slickPause");
    
    showArrows();

    $elem.removeClass("active-project");
    $elem.addClass("idle-project");
  });
}


$(function() {

  // home pagina carousel met alles
  $(".carousel").slick({
    slidesToShow: 3,
    speed: 1000,
    cssEase: 'ease-in-out',
    slidesToScroll: 1,
    dots: true,
    arrows: true
  });
  
  // per project carousel.
  $(".project-carousel").slick({
    slidesToShow: 1,
    // hack do not change lolol.
    speed: 100,
    fade: true,
    autoplay: true,
    // hack do not change lolol.
    autoplaySpeed: 100,
    cssEase: 'linear',
    slidesToScroll: 1,
    dots: true,
    arrows: false
  })
  
  setupActiveImageClass();
  manageActivePage();
  
});


function setupActiveImageClass() {
  $(".carousel").on("beforeChange", function (ev, slick, currentIndex, nextIndex) {
    var $current = getElemByIndex(currentIndex);
    var $next = getElemByIndex(nextIndex);
    
    nextElem($current).removeClass("active-img");
    nextElem($next).addClass("active-img");
  });

  nextElem(getCurrentElem()).addClass("active-img");
  
  function nextElem($elem) {
    var parent = $elem.parent();
    
    if (parent.children().last().is($elem)) {
      return parent.children().first();
    }
    
    return $elem.next();
  }
  function prevElem($elem) {
    var parent = $elem.parent();
    
    if (parent.children().first().is($elem)) {
      return parent.children().last();
    }
    
    return $elem.prev();
  }
  
  function getElemByIndex(index) {
    var slick = $(".carousel").slick("getSlick");
    
    return $(slick.$slides[index]);
  }
  
  function getCurrentElem() {
    var slick = $(".carousel").slick("getSlick");
    
    return $(slick.$slides[slick.currentSlide]);
  }
  
}
