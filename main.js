$(document).ready(function(){
    for(var i = 0; i < localStorage.length; i++){
      var object = JSON.parse(localStorage.getItem(localStorage.key(i)));
      ideaContent(object);
    }
})

$('.search-input').on('keyup', function(){
 var searchTerm = $(this).val().toLowerCase();
 $('h5').each(function (index, element) {
   var text = $(element).text().toLowerCase();
   var match = !!text.match(searchTerm);
   $(this).parent().toggle(match);
 })
});

// Creates idea properties
function CreateIdea (title, body, id) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'swill';
}

function ideaContent(createIdea) {
  $(".stored").prepend(
    `<article class="card" id="${createIdea.id}">
      <h5 class ="title search-bar" contenteditable>${createIdea.title}</h5>
      <button class="delete-btn">D</button>
      <h5 class="body search-bar" contenteditable>${createIdea.body}</h5>
      <button class="up">UP</button>
      <button class="down">Down</button>
      <p class="quality">Quality:</p>
      <p class="quality-type search-bar">${createIdea.quality}</p>
    </article>`)
   };

// Sets idea in motion from user input and btn click
$( ".save-btn" ).click(function() {
  var title = $( ".title" ).val();
  var body = $( ".body" ).val();
  var idea = new CreateIdea(title, body);
  ideaContent(idea);
  resetInputFields();
  localStorage.setItem(idea.id, JSON.stringify(idea));
});

$('.stored').on('blur', '.title', function(){
  var getNewTitle = $(this).closest('.card').find('.title');
  var getNewTitleText = getNewTitle.text();
  var idKey = $(this).closest('.card').attr('id');
  var storeTitle = JSON.parse(localStorage.getItem(idKey));
  storeTitle.title = getNewTitleText;
  localStorage.setItem(idKey, JSON.stringify(storeTitle));
})

$('.stored').on('blur', '.body', function(){
  var getNewBody = $(this).closest('.card').find('.body');
  var getNewBodyText = getNewBody.text();
  var idKey = $(this).closest('.card').attr('id');
  var storeBody = JSON.parse(localStorage.getItem(idKey));
  storeBody.body = getNewBodyText;
  localStorage.setItem(idKey, JSON.stringify(storeBody));
})

$('.stored').on('click', '.delete-btn', function(){
  $(this).closest('.card').remove();
  var idKey = $(this).closest('.card').attr('id');
  localStorage.removeItem(idKey);
})

$( '.stored' ).on('click', '.up', function() {
  var qualityType = $(this).siblings('.quality-type');
  upVote(qualityType);
  storeQuality(this, qualityType);
});

$( '.stored' ).on('click', '.down', function() {
  var currentQuality = $(this).siblings('.quality-type');
  downVote(currentQuality);
  storeQuality(this, currentQuality);
});

function storeQuality(card, newQuality) {
    var id = $(card).parent().attr('id');
    var editStorage = JSON.parse(localStorage.getItem(id));
    editStorage.quality = newQuality.text();
    localStorage.setItem(id, JSON.stringify(editStorage));
}

function upVote(qualityType) {
  if(qualityType.text() === 'swill'){
    qualityType.text('plausible');
  } else if(qualityType.text() === 'plausible') {
      qualityType.text('genius');
    }
}

function downVote(qualityType) {
  if(qualityType.text() === 'genius'){
    qualityType.text('plausible');
  } else if(qualityType.text() === 'plausible') {
      qualityType.text('swill');
    }
}

//resets input fields to placeholder values
function resetInputFields() {
  $( ".title" ).val('');
  $( ".body" ).val('');
}
