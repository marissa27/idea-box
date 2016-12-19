$(document).ready(function(){
    for(var i =0; i < localStorage.length; i++){
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
  $(".stored").prepend(`<article id="${createIdea.id}"><h5 contenteditable>${createIdea.title}</h5><img class="icon" src="images/delete.svg"
     <p contenteditable>${createIdea.body}</p>
     <img class="icon" src="images/upvote.svg"><img class="icon" src="images/downvote.svg"><p>Quality:</p><p class="quality"></p></article>`)
     };

// Sets idea in motion from user input and btn click
$( ".save-btn" ).click(function() {
  var title = $( ".title" ).val();
  var body = $( ".body" ).val();
  var idea = new CreateIdea(title, body);
  ideaContent(idea);
  localStorage.setItem(idea.id, JSON.stringify(idea));
});
