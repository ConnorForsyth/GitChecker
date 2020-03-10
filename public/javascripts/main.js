/**
 * @Author: John Isaacs <john>
 * @Date:   07-Feb-192019
 * @Filename: main.js
 * @Last modified by:   john
 * @Last modified time: 08-Feb-192019
 */
var table = $('#maintable tbody');
var url = "https://api.github.com/orgs/test-driven-teaching-connor-forsyth/repos";

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
  $('#retrievedRecords tr').remove();
   
  var count =0;
 
    
  result.forEach(function(element) {

    count++;
    colourclass = '';
	//console.log(element)
    if(element.age >= 5){colourclass = 'yellow'};
    if(element.age >= 10){colourclass = 'orange'};
    if(element.age >= 15){colourclass = 'red'};
	
	//Check the open issues section	
	openClass = '';
	if(element.open_issues_count === 0){openClass='green'};
	if((element.open_issues_count > 0) && (element.open_issues_count <=2)){openClass = 'yellow'};
	if(element.open_issues_count === 3){openClass='orange'};
    if(element.open_issues_count >4){openClass = 'red'};
	
    
	updatedClass = '';
	function dateFromISO8601(isostr) {
		var parts = isostr.match(/\d+/g);
		return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
	}
	
	var lastUpdated = dateFromISO8601(element.updated_at);	
	var currentTime = new Date();	
	var difference_in_time = currentTime.getTime() - lastUpdated.getTime();	
	var difference_in_days = difference_in_time/ (1000*3600*24);	
	difference_in_days = Math.round(difference_in_days);	
	console.log(difference_in_days);
	if(difference_in_days >= 7){updatedClass = 'yellow'};
    if(difference_in_days >= 14){updatedClass = 'orange'};
    if(difference_in_days >= 21){updatedClass = 'red'};
	
	table.append(
	
      '<tr role="row" class="'+colourclass+'">' +
      '<td class="name ">' + element.name + '</td>' +
      '<td class="Last Updated ' + updatedClass + '">' + lastUpdated + '</td>' +
      '<td class="age">' + element.age + '</td>' +
      '<td class="file">' + element.file + '</td>' +
	  '<td class="issues ' + openClass + '">' + element.open_issues_count + '</td>' +
      '<td class="link"><a href="' + element.html_url + '">Repo Link</a></td>' +
      '</td>')
      if(count == result.length){
        var options = {
          valueNames: ['name', 'age', 'lastact','file', 'link']
        };

       var hackerList = new List('tablediv', options);
       //console.log("here");
      }
	  if($('#maintable').hasClass('hidden')){
		$('#maintable').removeClass('hidden');
	  }
  })
  $('#maintable').DataTable();
}
