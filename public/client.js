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

function manageActivePage() {
  $(".carousel").delegate(".active-img", "click", function onClick(ev) {
    $(".carousel").hide();
    
    var $elem = $(ev.target);
    
    var className = $elem.attr("class");
    var parts = className.split(' ');
    var segmentType = '';
    
    for (var i = 0; i < parts.length; i++) {
      if (PAGES[parts[i]]) {
        segmentType = parts[i];
        break;
      }
    }
    
    var $pageElem = $("." + segmentType + "-project");
    console.log('pageElem', $pageElem);
    
    $("." + segmentType + "-project").removeClass("idle-project");
    // $(".")
  });
}


$(function() {

  $(".carousel").slick({
    slidesToShow: 3,
    speed: 1000,
    cssEase: 'ease-in-out',
    slidesToScroll: 1,
    dots: true,
    arrows: true
  });
  
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
