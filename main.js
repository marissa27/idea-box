$(document).ready(function(){
    for(var i = 0; i < localStorage.length; i++){
      var object = JSON.parse(localStorage.getItem(localStorage.key(i)));
      ideaContent(object);
    }
})

// Save Disabled or Enabled
$('.title, .body').on('keyup', function(){
  var title = $('.title');
  var body = $('.body');
  var saveBtn = $('.save-btn');
  if(!title.val() || !body.val()) {
    saveBtn.prop('disabled', true);
  } else {
    saveBtn.prop('disabled', false);
  }
})

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
      <div class="searchField">
      <h5 class ="title search-bar" contenteditable>${createIdea.title}</h5>
      <button class="delete-btn card-btn icon"></button>
      <p class="body search-bar" contenteditable>${createIdea.body}</p>
      <button class="up card-btn icon"></button>
      <button class="down card-btn icon"></button>
      <p class="quality">Quality:</p>
      <p class="quality-type search-bar">${createIdea.quality}</p>
      </div>
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

// Stores if User Edits Cards
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

// Delete Button
$('.stored').on('click', '.delete-btn', function(){
  $(this).closest('.card').remove();
  var idKey = $(this).closest('.card').attr('id');
  localStorage.removeItem(idKey);
})

// Qualities
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
    var id = $(card).closest('.card').attr('id');
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

$('.search-input').on('keyup', function(){
 var searchTerm = $(this).val().toLowerCase();
 $('.searchField').each(function (index, element) {
   var text = $(element).text().toLowerCase();
   var match = !!text.match(searchTerm);
   $(this).parent().toggle(match);
 })
});
