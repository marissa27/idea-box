// Creates idea properties
function CreateIdea (title, body) {
  this.title = title;
  this.body = body;
  }

var i = 1;
function ideaContent(createIdea) {
  $("<article />", { "class":"ideas", id:"idea"+i })
     .prepend(`<h5 contenteditable>${createIdea.title}</h5>
     <p contenteditable>${createIdea.body}</p>
     <button><</button><button>></button><p>Quality:</p><p class="quality"></p>`)
     .prependTo($(".stored"));
  i++;
};

// Sets idea in motion from user input and btn click
$( ".save-btn" ).click(function() {
  var title = $( ".title" ).val();
  var body = $( ".body" ).val();
  var createIdea = new CreateIdea(title, body);
  ideaContent(createIdea);
});
