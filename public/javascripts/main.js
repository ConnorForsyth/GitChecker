//Get table element
var table = $('#maintable tbody');
//URL to access the organisation data
var url = "https://api.github.com/orgs/test-driven-teaching-connor-forsyth/repos";

//When the user clicks on the button Get Repositories this will run
$("#getrepos").click(function() {
  //Call ajax request to retrieve the organisation information from Github
  //If successful, call the ajaxSuccess function else display message to user
  $.ajax({
    url: url,
	dataType: "json",
    success: ajaxSuccess,
	error: function(XMLHttpRequest, textStatus, errorThrown) {
     alert("Sorry we could not retrieve your organisations information at this moment in time. Please try again.", errorThrown);
	}
  });
})


function ajaxSuccess(result) {
  //Delete all rows stored in the tables tbody in the event that the getRepos button event is fired again	
  $('#retrievedRecords tr').remove();
    
  //Iterate through the returned json data and attempt to parse into the #maintable table 
  result.forEach(function(element) {	
	
	//Check the open issues section	and assign a colour scheme based on the conditions
	openClass = '';
	if(element.open_issues_count === 0){openClass='green'};
	if((element.open_issues_count > 0) && (element.open_issues_count <=2)){openClass = 'yellow'};
	if(element.open_issues_count === 3){openClass='orange'};
    if(element.open_issues_count >4){openClass = 'red'};
	
    
	//Github stores time data as ISO 8601 format, this function will convert it to a more suitable format
	//For reference ISO 8601 format looks like: 2019-06-04T14:28:02Z
	function dateFromISO8601(isostr) {
		var parts = isostr.match(/\d+/g);
		return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
	}
	
	//Determine how long it has been since the user last made a commit to the repository
	var lastUpdated = dateFromISO8601(element.updated_at);	
	var currentTime = new Date();	
	var difference_in_time = currentTime.getTime() - lastUpdated.getTime();	
	var difference_in_days = difference_in_time/ (1000*3600*24);	
	difference_in_days = Math.round(difference_in_days);	
	
	//Colour code the cell based on the amount of days since the user last committed changes
	updatedClass = '';
	if(difference_in_days <= 7){updatedClass = 'green'};
	if((difference_in_days > 7) && (difference_in_days <=10)){updatedClass = 'yellow'};
    if((difference_in_days > 10 ) && (difference_in_days <=14)){updatedClass = 'orange'};
    if(difference_in_days > 14){updatedClass = 'red'};
	
	
	//Format the last updated date to a more suitable format
	//If more formatting was required moment.js library would have been used
	lastUpdated = new Date(element.updated_at).toGMTString();
	
	
	//Add new row to table using the data retrieved by the ajax request
	table.append(	
      '<tr role="row">' +
      '<td class="name ">' + element.name + '</td>' +
      '<td class="Last Updated ' + updatedClass + '">' + lastUpdated + '</td>' +
	  '<td class="issues ' + openClass + '">' + element.open_issues_count + '</td>' +
      '<td class="link"><a href="' + element.html_url + '">Repo Link</a></td>' +
      '</td>')
	  
	  if($('#maintable').hasClass('hidden')){
		$('#maintable').removeClass('hidden');
	  }
  })
  $('#maintable').DataTable();
}
