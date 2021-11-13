        
        
        var fields=[];        //array to store searching data, whole file

        //ajax to call json file

        $.ajax({
            url: "words-small.json", //other file is too large to be loaded, use small file
            method: "get",
            success: function(data){
        //      //console.log(words);
        //      console.log(words.length);

        //     let newData = words.slice();
        //    // console.log(newData);
        //     console.log(typeof(newData));
        //     // Converting a string to JSON
        //     let jsonData = JSON.stringify(newData);
        //     console.log(jsonData);

            //  for (i = 0; i < words.length; i++) {
            //    // newData.push(words);
            //     //newData=words;
            //     console.log(words);
            //  }

            console.log(data);
            const newData = JSON.stringify(data);
           
            //console.log(newData);
            fields=newData.split('","');

            //improving data format
            //jugar, improve later
            fields[0]=fields[0].slice(2, 3);
            fields[851]=fields[851].slice(0, fields[851].length-1);

            console.log(fields[851]); 
            console.log(fields.length);
            // var strArray = newData.replace(/"/g, '').replace(/ /g, '').split(',');

        }
    });


        $(document).ready(function(){
            
            $("#wordSearch").keyup(function(){
            const inputVal = $("#wordSearch").val();
            let results = [];
            if (inputVal.length > 0) {
                results = search(inputVal);
            }
            console.log(results);
            console.log(results.length);  //key up k sath no of records matching
            showSuggestions(results, inputVal);
        });

        function search(str) {
            let results = [];
            const val = str.toLowerCase();

            for (i = 0; i < fields.length; i++) {
                if (fields[i].toLowerCase().indexOf(val) > -1) {
                    results.push(fields[i]);
                }
            }

	        return results;
        //     var pattern = new RegExp(str, "i");
		// return $.grep(newData, function(w) {
		// 	return pattern.test(w);
		// });
        // }
        }

       

        function showSuggestions(results, inputVal) {
        
            console.log("here");
            if(results.length==0){
                document.getElementById('recordNumber').innerHTML =results.length+" words matching the search query";
            }
            else{
                document.getElementById('recordNumber').innerHTML ="Total Words found: "+ results.length;
            }
            //Total Words found:
           // openDropdown("#suggestMe");
            $("#suggestMe").children().remove();

            //chnaging size attribute
            var o_select = document.getElementById("suggestMe");
            o_select.size = results.length;

            //$("suggestMe").attr('size', results.length);

            if (results.length > 0) {
                for (i = 0; i < results.length; i++) {
                    let item = results[i];
                    $('#suggestMe').append($('<option>',
                    {
                        value: item,
                        text : item
                    }));
                }

               // $(".suggestions").addClass('has-suggestions');

            } else {
                var o_select = document.getElementById("suggestMe"); //set size=1 when no result is there
                o_select.size = 1;
                results = [];
                $("#suggestMe").innerHTML = '';
            }

            
            var txt=$("#suggestMe").val();    //set selected option value as input value
                console.log(txt);
                document.getElementById('wordSearch').innerHTML=txt;
        }

        });

        /*
        not working code

        $("select").children().click(function(){
            var selectedCountry = $("select").children().val();
            alert("You have selected the country - " + selectedCountry);
         });

        $( "#clear" ).click(function() {
            alert( "Handler for .click() called." );
        });

        */


        $("#clear").click(function(){          //clear the input field
        //    $("#wordSearch").text()=" "; 
           document.getElementById('wordSearch').innerHTML=" ";   
        });

        

        // $('select option').click(function(){
        //     document.getElementById('wordSearch').innerHTML=('#suggestMe option:selected').text();
        // });

        // $(document).ready(function(){
        //     var o_select = document.getElementById("suggestMe");
        //     $("#suggestMe").css('height','2');
        // });
       