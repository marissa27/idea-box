// Creates idea properties
function CreateIdea (title, body) {
  this.title = title;
  this.body = body;
  console.log('hi')
  }

// Creates idea content and html
function ideaContent(createIdea) {
  $( ".stored" ).prepend(
    `<article class="ideas">
      <h5 contenteditable>${createIdea.title}</h5>
      <p contenteditable>${createIdea.body}</p>
      <button><</button><p></p><button>></button>`
  );
}

// Sets idea in motion from user input and btn click
$( ".save-btn" ).click(function() {
  var title = $( ".title" ).val();
  var body = $( ".body" ).val();
  var createIdea = new CreateIdea(title, body);
  ideaContent(createIdea);
  console.log('hello')
});
