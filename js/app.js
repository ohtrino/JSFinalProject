/*
  Please add all Javascript code to this file.
*/
$source = $('#source');
$searchbar = $('#searchbar');
var $sourceselect  = $('.sourceselect a');
var $featuredImage = $('.featuredImage img');
var page = 0 ;
var $popDescription = $('#popDescription');
var $articlesGoHere = $("#main");
var desciptionArray=[];
var source = $("#articlehandlebars").html();
var template = Handlebars.compile(source);
var readingRate = 100;
var timer;
var myDataRef = new Firebase('https://blistering-heat-3858.firebaseio.com/');
var emailExists = false;
var $readRate = $("#readRate");

          
         


$sourceselect.on('click', switchSource);


function switchSource() {
	
	$source.text($(this).text());
	getStories(urls[$(this).text()]);
	


}

function hidePopUp() {
	clearInterval(timer);
	descriptionArray=[];
	 $('#popUp').addClass("hidden");
	 $("#popTitle").text('');
	 $("#popDescription").text('');
	 $("#LINK").attr('href','#');
}





var urls = {
	Retail : "https://www.reddit.com/r/talesfromretail.json"  ,
	TechSupport :  "https://www.reddit.com/r/talesfromtechsupport.json" ,
	YourServer : "https://www.reddit.com/r/talesfromyourserver.json" ,
	TheCustomer :  "https://www.reddit.com/r/talesfromyourserver.json" ,
	ThePizzaGuy :  "https://www.reddit.com/r/talesfromthepizzaguy.json" ,
	Everyone: 'https://www.reddit.com/user/kirbwick/m/tales.json'
}

function getStories(url) {
	$.ajax({
		url:url,
		success: function(response){
			$articlesGoHere.empty();

			console.log(response);
			
				var articles = response.data.children
				articles.forEach(function(article){
				
				
				 
				 if (article.data.preview){
				 
				 var imageURL = article.data.preview.images[0].source.url;
				 var type = article.data.subreddit;
				} else {
					var imageURL = 'images/article_placeholder_2.jpg'
				}
				var html = template({title:article.data.title, image:imageURL, type: type, shares:article.data.score, url:article
					.data.url, description:article.data.selftext})
				
          		$articlesGoHere.append(html)
          		
			})

		}

	})

}



$(document).on("click", ".article",function() {

        $('#popTitle').text($(this).find(".title").text());
        
        var description = $(this).find("#description").text();
        $readRate.text(readingRate+' WPM');
        
        $("#LINK").attr("href", $(this).find("#url").text());
        $('#popUp.loader .container').show();
        $('#popUp').removeClass("hidden");
        description=description.replace(/(\r\n|\n|\r)/gm," ");
        descriptionArray=description.split(" ");
  		descriptionArray.unshift(" ");
  		wpmtoms=(1/(readingRate/60000))
  		newHeader();
  		timer = setInterval(newHeader, wpmtoms);
  		console.log(timer);
        


});

var wpmtoms=(1/(readingRate/60000));
var lastheader = 0;

function newHeader() {
   if (++lastheader >= descriptionArray.length){
     lastheader=0;
   }
   if (readingRate<151){
   		responsiveVoice.speak(descriptionArray[lastheader],'US English Female',{rate:1.9});
	}
   $popDescription.text(descriptionArray[lastheader]);
   

}






// $searchbar.on('input', function(){
// 	//save to database

// })
var $emailprompt=$('#emailprompt');

$('#form').on('submit',function(event){
	event.preventDefault();
	myDataRef.once("value", function(snapshot) {
		var email = $('#savedReadingSpeed').val();
		console.log(email);
		
		if(snapshot.exists()){
			var data=snapshot.val();
			//console.log(data.myObj);
			var myObj=data.myObj;
			if (data.myObj[email]){
				readingRate=data.myObj[email];
				$('#form').hide()
				$searchbar.text(email);
			} else {
				$searchbar.text('not recognized');
			}

		}
	})
})


$emailprompt.on('submit', function(event){
		event.preventDefault();
		var email = $('#EMAIL').val();
		console.log(email);



		// console.log(email);
		myDataRef.once("value", function(snapshot) {
		
		if(snapshot.exists()){
			var data=snapshot.val();
			//console.log(data.myObj);
			var myObj=data.myObj;
			if (data.myObj[email]){
				readingRate=data.myObj[email];
			} else {
				myObj[email]=readingRate;
				myDataRef.update({myObj});
			}

			

		} else {
			var myObj={};
			myObj[email]=readingRate;
			myDataRef.set({myObj});

		}

		});

		$searchbar.text(email);

		$('#Authenticate').addClass("hidden");

})



function authenticate(){
	console.log('pressed');
	$('#Authenticate').removeClass("hidden");


}

function faster(){
	clearInterval(timer);
	readingRate+=5;
	  $readRate.text(readingRate+' WPM');
	wpmtoms=(1/(readingRate/60000))
  	newHeader();
  	timer = setInterval(newHeader, wpmtoms);
}

function slower(){
	clearInterval(timer);
	readingRate-=5;
	  $readRate.text(readingRate+' WPM');
	wpmtoms=(1/(readingRate/60000))
  	newHeader();
  	timer = setInterval(newHeader, wpmtoms);
}


// function nextPage(){
// 	console.log('clicked');
// }
