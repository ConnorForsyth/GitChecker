/**
 * @Author: John Isaacs <john>
 * @Date:   07-Feb-192019
 * @Filename: main.js
 * @Last modified by:   john
 * @Last modified time: 08-Feb-192019
 */



var table = $('#maintable');
var url = "http://localhost:3000/functions/repolist?org=test-driven-teaching-connor-forsyth"

$("#getrepos").click(function() {
  $.ajax({
    url: url,
    success: ajaxSuccess
  });
})


function ajaxSuccess(result) {
  table.empty();
  var count =0;
  console.log(result.data);


  result.data.forEach(function(element) {

    count++;
    colourclass = 'green';
    if(element.age >= 5){colourclass = 'yellow'};
    if(element.age >= 10){colourclass = 'orange'};
    if(element.age >= 15){colourclass = 'red'};

    table.append(
      '<tr class="'+colourclass+'">' +
      '<td class="name ">' + element.name + '</td>' +
      '<td class="lastact">' + element.lastactivity + '</td>' +
      '<td class="age">' + element.age + '</td>' +
      '<td class="file">' + element.file + '</td>' +
      '<td class="link"><a href="' + element.link + '">Repo Link</a></td>' +
      '<td>')
      if(count == result.data.length){
        var options = {
          valueNames: ['name', 'age', 'lastact','file', 'link']
        };

       var hackerList = new List('tablediv', options);
       console.log("here");
      }
  })
}
