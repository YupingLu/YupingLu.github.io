$(document).ready(function() {
    loadLatestTweet(18, "YupingLu");
});
 
//Twitter Parsers
String.prototype.parseURL = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
        return url.link(url);
    });
};
String.prototype.parseUsername = function() {
    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
        var username = u.replace("@","")
        return u.link("http://twitter.com/"+username);
    });
};
String.prototype.parseHashtag = function() {
    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
        var tag = t.replace("#","%23")
        return t.link("http://search.twitter.com/search?q="+tag);
    });
};
function parseDate(str) {
    var v=str.split(' ');
    return new Date(Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC"));
}
 
function loadLatestTweet(numTweets, un){
	$.ajax({
    url: 'https://api.twitter.com/1/statuses/user_timeline/' + un + '.json?callback=?&count='+numTweets+'&include_rts=1',
    dataType: 'json',
    success: function( data ) {
      for(var i = 0; i< data.length; i++){
		    var tweet = data[i].text;
		    var created = parseDate(data[i].created_at);
		    
		    var postdate = created.getFullYear()+'-'+(created.getMonth()+1)+'-'+created.getDate()
		    +' at '+created.getHours()+':'+created.getMinutes();
		    
		    //Uncomment below line to see the user Image
				//tweet = "<img src='"+data[i].user.profile_image_url+"' />";
				tweet = tweet.parseURL().parseUsername().parseHashtag();
		    //Uncomment below line to displ tweet date.
	
		    $("#twitter-feed").append(
		    	'<li class=\"listing-item\">'+
				    '<time datetime=\"postdate\">'+ postdate +'</time>'+
				    tweet + 
				  '</li>'
		    );
		  }
    },
    error: function( data ) {
      $("#twitter-feed").append('<p>Sorry, you are blocked!~</p>');
    }
  });	
}