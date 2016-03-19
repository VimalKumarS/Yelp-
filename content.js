/**
 * Created by vimalkumar on 3/6/2016.
 */



var overlay_html = '<div id="overlay" class="overlay">' +
    '<div id="my_awesome_iframe_container">' +
    '<iframe id="1click_iframe" width=100% height=100% frameborder=0></iframe>' +
    '</div>' +
    '</div>';

//need to get the name of the extension
var download_links = $(".ybtn-group")

if(download_links.length){

    var imgURL = chrome.extension.getURL("uber.png");
    var anchorHtml='<a id="yelp-Uber-request" ' +
                    'class="ybtn ybtn-small add-photo-button"><span style="padding-left:2px" class="i-wrap ig-wrap-biz_details i-add-photo-biz_details-wrap">' +
                    '<img style="padding-right:5px" src="'+imgURL+'"></img>Uber Fare</span></a> <span class="popover">uber text </span>' ;

    download_links.append(anchorHtml);//'<img id="theImg" src="'+imgURL+'" />')
}


var uberServerToken= "9sgR3XYj8AVFuMUz-46rQArrlfIc-1Ci20CA_vpI";

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
       // x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
var Latitude;
var Longitude;
function showPosition(position) {
    Latitude= position.coords.latitude
        Longitude= position.coords.longitude;
}
getLocation();
$("#yelp-Uber-request").click(function(e){

      var destination=  $(".lightbox-map").attr("data-map-state");
     destination= JSON.parse(destination);

     var xhr = new XMLHttpRequest();
     xhr.open('GET', 'https://api.uber.com/v1/estimates/price?start_latitude='+Latitude+'&start_longitude='+Longitude+'&end_latitude='+destination.center.latitude+'&end_longitude='+destination.center.longitude,true);
     xhr.setRequestHeader("Authorization", "Token "+uberServerToken);
     xhr.onreadystatechange = function(){
         if(xhr.readyState==4){
             if(xhr.status==200){
                 var result = xhr.responseText;
                 result= JSON.parse(result);
                // alert(txt);
                //console.log(result);

                 var offset = $(this).offset();
                 var left = e.pageX;
                 var top = e.pageY;
                 $('.popover').text("Min fare: "+ result.prices[0].estimate);
                 var theHeight = $('.popover').height();
                 $('.popover').show(0).delay(5000).hide(0);
                 // $('.popover').css('left', (left+10) + 'px');
                 // $('.popover').css('top', (top-(theHeight/2)-10) + 'px');


                // $('#yuRecord').popover({animation:true, content:elem, html:true});

             }
         }

     }

     xhr.send();

})




function getEstimatesForUserLocation(latitude,longitude,partyLatitude,partyLongitude) {
    $.ajax({
        url: "https://api.uber.com/v1/estimates/price",
        method:'GET',
        headers: {
            Authorization: "Token " + uberServerToken

        },
        dataType: 'jsonp',
        contentType: "application/json",
        data: {
            start_latitude: latitude,
            start_longitude: longitude,
            end_latitude: partyLatitude,
            end_longitude: partyLongitude
        },
        success: function(result) {
            return result;
        },
        error:function( jqXHR ,  textStatus,  errorThrown ){
            console.log(textStatus)
        }
    });
}

