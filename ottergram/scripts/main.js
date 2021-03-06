var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

var slider_img = document.querySelector('.detail-image')
var images = getThumbnailsArray(); // array of images
var titles = ["Stayin' Alive","How Deep Is Your Love","You Should Be Dancing","Night Fever","To Love Somebody"]
var i = 0;

var b = document.getElementById("button-prev")
b.addEventListener('click', function () {  
    console.log('previous') 
    i = getCurrImg()-1;
    previous(); 
})

var a = document.getElementById("button-next")
a.addEventListener('click', function () { 
    console.log('next') 
    i = getCurrImg()-1;
    next(); 
})

function getCurrImg(){
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    const imgsrc = detailImage.getAttribute('src'); // imgsrc has link of otter
    return parseInt(imgsrc[imgsrc.length - 5]); // returns a number for the current otter image
}

function previous(){
    console.log('previous func')
    console.log(i)
    if(i <= 0){
        i = images.length-1;
    }
    else{
        i--;
    }
    return setImage();   
}

function next(){
    console.log('next func')
    console.log(i)
    if(i >= images.length - 1){
        i=0;
    }
    else{
        i++;
    }
    return setImage();     
}

function setImage(){
    slider_img.setAttribute('src', images[i]);
    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titles[i];
}

function setDetails(imageUrl, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);
    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-url');
}

function titleFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumb) {
    setDetails(imageFromThumb(thumb), titleFromThumb(thumb));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() { 
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() { 
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() { 
    'use strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) { hideDetails(); }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}


initializeEvents();

