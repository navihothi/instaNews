$(document).ready(function(){

    //$('#articles').hide();
    $("#valuelist").change(function(){

         // removes articles when selecting another selection
         $('.articles').empty();

         //  show loader
        $('.loader-gif').show();

        //  once a section is selected
        $('.nyt_logo').css({'height': '4em', 'padding-top': '1em', 'padding-left': '1em'});
        $('.header_container').css('height', '200px');
        

        let selectedvalue = $("#valuelist option:selected").val();
        selectedvalue += ".json";
    
        let url = "https://api.nytimes.com/svc/topstories/v2/";
        url += selectedvalue;
        url += '?' + $.param({
            'api-key': "a8e74e0dd3b44d0595da9c06fedc4a13"
        });

    $.ajax({
            url: url,
            method: 'GET',
        }).done(function(result) {
            var array = result.results;
            console.log(array);
            
            $.each(array.slice(0,12), function(item, value) {
                if (value.multimedia.length != 0) {
                    const abstract = value.abstract;
                    const url = value.url;
                    const multimedia = value.multimedia[3].url;
                        //console.log(abstract);
                        //console.log(url);
                        //console.log(multimedia); // find a way to stop my each at 12 valid articles
                    $('.articles').append('<div class = "article_grid_item"> <a href ="' + url + '"> <img src = "' + multimedia + '"/><p class="article_text">' + abstract + '</p></a></div>');


                }
            });

        }).fail(function(err) {
            console.log(err);

        }).always(function() {
           $('.loader-gif').hide();

        });
       

    $("#URL").append('<a href=" ' + url + ' ">click me</a>')

});

});
