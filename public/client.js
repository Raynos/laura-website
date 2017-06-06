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
  space: true,
  alice: true
}

var pageWidth = $(window).width();
var MODE = 'desktop';

if (pageWidth >= 320 && pageWidth < 768) {
  MODE = 'phone';
} else if (pageWidth >= 768 && pageWidth < 1000) {
  MODE = 'tablet';
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
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
    console.log('segmentType', segmentType);
    
    hideArrows();
    
    var $carousel = $("." + segmentType + "-carousel");
    
    $carousel.slick("slickGoTo", 0, true);
    $carousel.slick("slickPause");
    
    var $pageElem = $("." + segmentType + "-project");
    console.log('showing project', $pageElem);
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
    // console.log('parent', $elem);
    
    var $carousel = $elem.find(".project-carousel");
    $carousel.slick("slickPause");
    
    showArrows();

    $elem.removeClass("active-project");
    $elem.addClass("idle-project");
  });
}

var slidesToShow =
  MODE === 'desktop' ? 3 :
  MODE === 'phone' ? 1 :
  1;
  
var imageOffset =
  MODE === 'desktop' ? 1 :
  MODE === 'phone' ? 0 :
  0

var initialImage =
  MODE === 'desktop' ? 1 :
  MODE === 'phone' ? 0 :
  0

$(function() {
  var projectName = getParameterByName('project') || 'bionews';
  
  var imgSlideElem = $('.img-slide.' + projectName);
  var imgAnchor = imgSlideElem.parent();
  
  var siblings = imgAnchor.parent().children();
  var index = siblings.index(imgAnchor);
  if (index === -1) {
    index = initialImage;
  }
  
  // home pagina carousel met alles
  $(".carousel").slick({
    slidesToShow: slidesToShow,
    initialSlide: index - imageOffset,
    speed: 750,
    cssEase: 'ease-in-out',
    slidesToScroll: 1,
    dots: true,
    arrows: true
  });
  
  // per project carousel.
  $(".project-carousel").slick({
    slidesToShow: 1,
    // hack do not change lolol.
    speed: 500,
    fade: true,
    autoplay: true,
    // hack do not change lolol.
    autoplaySpeed: 100,
    cssEase: 'linear',
    pauseOnHover: false,
    slidesToScroll: 1,
    dots: true,
    arrows: false
  })
  
  setupActiveImageClass();
  // manageActivePage();
  // setupModal();
});

function setupModal() {
  var modalVisible = false;
  
  console.log('add click boi');
  $(".project-image").on("click", function () {
    modalVisible = true;
    $(".project-modal").show();
  })
}

function setupActiveImageClass() {
  $(".carousel").on("beforeChange", function (ev, slick, currentIndex, nextIndex) {
    var $current = getElemByIndex(currentIndex);
    var $next = getElemByIndex(nextIndex);
    
    if (slidesToShow === 3) {
      nextElem($current).removeClass("active-img");
      nextElem($next).addClass("active-img");  
    } else {
      $current.removeClass("active-img");
      $next.addClass("active-img");
    }
  });


  if (slidesToShow === 3) {
    nextElem(getCurrentElem()).addClass("active-img");
  } else {
    getCurrentElem().addClass("active-img");
  }
  
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

function preLoadImages () {
  var imageUrls = [
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FWayfare2.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FWayfare0.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FStamps2.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FStamps0.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FChromiumtech2.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FChromiumtech0.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FOman2.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FOman0.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FNSJ2.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FNSJ0.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FMetroNova2.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FMetroNova0.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FFeed%20GHHS.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FFeed%20FCHS.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FMET-Logo%20GHHS.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FMET-Logo%20FCHS.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FAlice-in-Wonderland%20GHHS.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FAlice-10%20FCHS.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FSpace-odyssey%20GHHS.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FSpace-odyssey%20FCHS.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FfeedG50S.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FfeedSS.png",
    
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FAlice_M_100.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FAlice_M_50.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FAlice_M_0.png",
    
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FChromium_M_100.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FChromium_M_50.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FChromium_M_0.png",
    
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FNSJ_M_100.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FNSJ_M_50.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FNSJ_M_0.png",
    
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FWayfare_M_100.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FWayfare_M_50.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FWayfare_M_0.png",
    
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FSpace_M_100.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FSpace_M_50.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FSpace_M_0.png",
    
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FOman_M_100.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FOman_M_50.png",
    "https://cdn.hyperdev.com/us-east-1%3A7885faca-916f-4f32-bc68-fcbbc8befcc1%2FOman_M_0.png"
   
  ];
  
  imageUrls.forEach(function (imageUrl) {
    var imageElem = document.createElement('img');
    imageElem.src = imageUrl;
  })
}

preLoadImages();
