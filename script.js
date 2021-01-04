$(document).ready(function(){
    $("#searchButton").click(function(){
        var userinput=$("#userinput").val();
        // console.log(userinput);
    });
});

let fullURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' //+city
let appid = '&appid=36369af9d5acd7def902ad1bc5f5c968';
let userInput;

function setup() {
    userInput = select('#userinput');  
    searchbutton = select ('#searchButton');
    searchbutton.mousePressed(searchbycity);

    function searchbycity() {
        let term = userInput.value ();
        var url = fullURL;
        var id = appid;

        // Load JSON data
        var url = fullURL + term + id;
        loadJSON(url, gotData, 'json');
        // console.log(url);
        
    }

    function gotData (data) {
        console.log(data);
        // Process Data Here


        }

        
        
    }
