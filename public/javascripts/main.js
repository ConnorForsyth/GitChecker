/**
 * @Author: John Isaacs <john>
 * @Date:   07-Feb-192019
 * @Filename: main.js
 * @Last modified by:   john
 * @Last modified time: 08-Feb-192019
 */

 if(!$('#maintable').hasClass('dataTable')){
	 $('#maintable').addClass('dataTable');
 }
 

var table = $('#maintable tbody');
var url = "https://api.github.com/orgs/test-driven-teaching-connor-forsyth/repos"

$("#getrepos").click(function() {
  $.ajax({
    url: url,
	dataType: "json",
    success: ajaxSuccess,
	error: function(XMLHttpRequest, textStatus, errorThrown) {
     alert(textStatus, errorThrown);
	}
  });
})


function ajaxSuccess(result) {	
  $('#maintable tbody tr').remove(); 
  var count =0;
  console.log(result);  
    
  result.forEach(function(element) {

    count++;
    colourclass = 'green';
	console.log(element)
    if(element.age >= 5){colourclass = 'yellow'};
    if(element.age >= 10){colourclass = 'orange'};
    if(element.age >= 15){colourclass = 'red'};
	
	
	//Check the open issues section	
    
	table.append(
	
      '<tr role="row" class="'+colourclass+'">' +
      '<td class="name ">' + element.name + '</td>' +
      '<td class="lastact">' + element.lastactivity + '</td>' +
      '<td class="age">' + element.age + '</td>' +
      '<td class="file">' + element.file + '</td>' +
	  '<td class="issues">' + element.open_issues_count + '</td>' +
      '<td class="link"><a href="' + element.html_url + '">Repo Link</a></td>' +
      '</tr>')
      if(count == result.length){
        var options = {
          valueNames: ['name', 'age', 'lastact','file', 'link']
        };

       var hackerList = new List('tablediv', options);
       console.log("here");
      }
	  if($('#maintable').hasClass('hidden')){
		$('#maintable').removeClass('hidden');
	  }
  })
}
