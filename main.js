$(document).ready(function(){
    for(var i = 0; i < localStorage.length; i++){
      var object = JSON.parse(localStorage.getItem(localStorage.key(i)));
      ideaContent(object);
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
  $(".stored").prepend(`<article class="card" id="${createIdea.id}"><h5 contenteditable>${createIdea.title}</h5><button class="delete-btn">D</button>
     <p contenteditable>${createIdea.body}</p>
     <button class="up">UP</button>
     <button class="down">Down</button>
     <p class="quality">Quality:</p>
     <p class="quality-type">${createIdea.quality}</p>
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

$('.stored').on('click', '.delete-btn', function(){
  $(this).closest('.article').remove();
  var idKey = $(this).closest('.article').attr('id');
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
