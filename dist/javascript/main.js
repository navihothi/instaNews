$(document).ready(function(){$("#valuelist").change(function(){$(".articles").empty(),$(".loader-gif").show(),$(".nyt_logo").css({height:"4em","padding-top":"1em","padding-left":"1em"}),$(".header_container").css("height","200px");let a=$("#valuelist option:selected").val();a+=".json";let b="https://api.nytimes.com/svc/topstories/v2/";b+=a,b+="?"+$.param({"api-key":"a8e74e0dd3b44d0595da9c06fedc4a13"}),$.ajax({url:b,method:"GET"}).done(function(a){var b=a.results;console.log(b),$.each(b.slice(0,12),function(a,b){if(0!=b.multimedia.length){const a=b.abstract,c=b.url,d=b.multimedia[3].url;$(".articles").append("<div class = \"article_grid_item\"> <a href =\""+c+"\"> <img src = \""+d+"\"/><p class=\"article_text\">"+a+"</p></a></div>")}})}).fail(function(a){console.log(a)}).always(function(){$(".loader-gif").hide()}),$("#URL").append("<a href=\" "+b+" \">click me</a>")})});