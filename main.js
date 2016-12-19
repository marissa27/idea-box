$(document).ready(function(){
    for(var i = 0; i < localStorage.length; i++){
      var object = JSON.parse(localStorage.getItem(localStorage.key(i)));
      ideaContent(object);
    }
})

// Creates idea properties
function CreateIdea (title, body) {
  this.title = title;
  this.body = body;
  this.id = Date.now();
  this.quality = 'swill';
}

function ideaContent(createIdea) {
  $(".stored").prepend(`<article class="article" id="${createIdea.id}"><h5 contenteditable>${createIdea.title}</h5><button class="delete-btn">D</button>
     <p contenteditable>${createIdea.body}</p>
     <button class="up">UP</button>
     <button class="down"></button>
     <p class="quality">Quality:</p>
     <p class="type">${createIdea.quality}</p>
     </article>`)
    };

// Sets idea in motion from user input and btn click
$( ".save-btn" ).click(function() {
  var title = $( ".title" ).val();
  var body = $( ".body" ).val();
  var idea = new CreateIdea(title, body);
  ideaContent(idea);
  localStorage.setItem(idea.id, JSON.stringify(idea));
});

$('.stored').on('click', '.delete-btn', function(){
  $(this).closest('.article').remove();
})

$( '.stored' ).on('click', '.up', function() {
  var qualityType = $(this).siblings('.type');
  if(qualityType.text() === 'swill'){
    qualityType.text('plausible');
  } else if(qualityType.text() === 'plausible') {
      qualityType.text('genius');
    }
})

$( '.stored' ).on('click', '.down', function() {
  var qualityType = $(this).siblings('.type');
  if(qualityType.text() === 'genius'){
    qualityType.text('plausible');
  } else if(qualityType.text() === 'plausible') {
      qualityType.text('swill');
    }
})
