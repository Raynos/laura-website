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

$(function() {
  var showDots =
    MODE === 'desktop' ? true :
    MODE === 'phone' ? false :
    false;
  
  // per project carousel.
  $(".project-carousel").slick({
    slidesToShow: 1,
    // hack do not change lolol.
    speed: 500,
    fade: true,
    autoplay: true,
    // hack do not change lolol.
    autoplaySpeed: 3000,
    cssEase: 'linear',
    pauseOnHover: false,
    slidesToScroll: 1,
    dots: showDots,
    arrows: false
  })
  
  // manageActivePage();
  // setupModal();
  
});

var POSSIBLE_IMAGES = [
  'zero-image',
  'first-image',
  'second-image',
  'third-image',
  'fourth-image',
  'fifth-image',
  'sixth-image',
  'seventh-image',
  'eight-image',
  'ninth-image',
  'tenth-image',
  'eleventh-image'
];

function setupModal() {
  var modalVisible = false;
  var currentClass = '';
  
  $(".project-image").on("click", function () {
    modalVisible = true;
    
    var classes = $(this).attr('class').split(/\s+/);
    for (var i = 0; i < POSSIBLE_IMAGES.length; i++) {
      var hasClass = classes.indexOf(POSSIBLE_IMAGES[i]);
      if (hasClass >= 0) {
        currentClass = POSSIBLE_IMAGES[i];
        $(".project-modal-image").addClass(currentClass);
        break;
      }
    }
    
    var height = $(window).height();
    $(".project-modal-image").height(height - 190 - 50);
    
    $(".project-modal").show();
  })
  $(".project-modal").on("click", function () {
    modalVisible = false;
    $(".project-modal").hide();
    $(".project-modal-image").removeClass(currentClass);
    currentClass = '';
  })
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
