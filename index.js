// File: index.html 
// GUI Assignment: Create a multiplication table using the given input from user.
// Ishan Patel, Umass Lowell Computer Science,
// ishankumar_patel@student.uml.edu
// Copyright (c) 2021 by Ishan. All rights reserved. May be freely copied or excerpted for educational 
// purposes with credit to Ishan. 
// Updated on Nov 20, 2021 at 1:00pm

// Create the table and set the table to the HTML element using id
function drawTable() {
    // Get reference to the table from HTML 
    var tableDiv = document.getElementById('table-div');
    var multTable = document.getElementById('table-elm');
    multTable.innerHTML = "";

    //Create the first row that will be static when scrolling. 
    // This is not the acutal calculations. Just the range of number the user enters.
    var firstTr = multTable.insertRow();
    for(var i = minColVal; i <= maxColVal; i++) {
        // Top left block is empty
        if(i == minColVal) {
            var th = document.createElement('th');
            th.innerHTML = ' ';
            firstTr.appendChild(th);
        }
        var th = document.createElement('th');
        th.innerHTML = i;
        firstTr.appendChild(th);
    }
    // Do the calculaiton for each box, create cell, and append each to the table
    for(var i = minRowVal; i <= maxRowVal; i++) {
        var tr = multTable.insertRow();
        for(var j = minColVal; j <= maxColVal; j++) {
            if(j == minColVal) {
                // Crate the first cell of each row. This is the first column that will be static when scrolling.
                // This is not the acutal calculations. Just the range of number the user enters.
                var th = document.createElement('th');
                th.innerHTML = i;
                tr.appendChild(th);
            }
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(i * j));  
        }
    }
}

// Validate the data entered by the user in the fields
$(document).ready(function() {
    var tableInputs = [];

    $("#form-input").validate({
        // Rules for each field. Data is required, data must be within range of -50 and 50, and max must be greater than min
        //    min must be less than max
        rules: {
            minColVal: {
                required: true,
                isValidInput: true,
                isLessThanMaxCol: true,
                isGreaterThanMinCol: false
            },
            maxColVal: {
                required: true,
                isValidInput: true,
                isGreaterThanMinCol: true,
                isLessThanMaxCol: true
            },
            minRowVal: {
                required: true,
                isValidInput: true,
                isLessThanMaxRow: true
            },
            maxRowVal: {
                required: true,
                isValidInput: true,
                isGreaterThanMinRow: true
            }
        },
        // Custom message for each type of error so use can correct it
        messages: {
            minColVal: {
                required: "Input field cannot be empty!",
                isValidInput: "Enter a valid number between -50 and 50.",
                isLessThanMaxCol: "Min column value must be less than max column value."
            },
            maxColVal: {
                required: "Input field cannot be empty!",
                isValidInput: "Enter a valid number between -50 and 50.",
                isGreaterThanMinCol: "Max column value must be greater than min column value."
            },
            minRowVal: {
                required: "Input field cannot be empty!",
                isValidInput: "Enter a valid number between -50 and 50.",
                isLessThanMaxRow: "Min row value must be less than max row value."
            },
            maxRowVal: {
               required: "Input field cannot be empty!",
               isValidInput: "Enter a valid number between -50 and 50.",
               isGreaterThanMinRow: "Max row value must be greater than min row value."
            }
        },

        errorLabelContainer: ".errMessage"
    });
    
    // After user enter a value check if data is valid. If it is then enable "Submit" button
    //     If it is not then disable it
    $('input').on('input', function() {
        validateForm();
    
        if(this.id == "minColVal") {
            $("#minColSlider").slider("value", parseInt($(this).val()));
        } else if(this.id == "maxColVal") {
            $("#maxColSlider").slider("value", parseInt($(this).val()));
        } else if(this.id == "minRowVal") {
            $("#minRowSlider").slider("value", parseInt($(this).val()));
        } else if(this.id == "maxRowVal") {
            $("#maxRowSlider").slider("value", parseInt($(this).val()));
        }
    });

    // Check if min column value is less than max column value
    jQuery.validator.addMethod("isLessThanMaxCol", function(value, element) {
        var isValid = true;
        maxColVal = parseInt(document.getElementById('maxColVal').value);
        minColVal = parseInt(document.getElementById('minColVal').value);

        if(minColVal >= maxColVal) { isValid = false; }

        return this.optional(element) || isValid;
    });

    // Check if max column value is greater than min column value
    jQuery.validator.addMethod("isGreaterThanMinCol", function(value, element) {
        var isValid = true;
        maxColVal = parseInt(document.getElementById('maxColVal').value);
        minColVal = parseInt(document.getElementById('minColVal').value);
        
        if(maxColVal <= minColVal) { isValid = false; }

        return this.optional(element) || isValid;
    });

    // Check if min row value is less than max row value
    jQuery.validator.addMethod("isLessThanMaxRow", function(value, element) {
        var isValid = true;
        maxRowVal = parseInt(document.getElementById('maxRowVal').value);
        minRowVal = parseInt(document.getElementById('minRowVal').value);
        
        if(minRowVal >= maxRowVal) { isValid = false; }

        return this.optional(element) || isValid;
    });

    // Check if max row value is greater than min row value
    jQuery.validator.addMethod("isGreaterThanMinRow", function(value, element) {
        var isValid = true;
        maxRowVal = parseInt(document.getElementById('maxRowVal').value);
        minRowVal = parseInt(document.getElementById('minRowVal').value);

        if(maxRowVal <= minRowVal) { isValid = false; }

        return this.optional(element) || isValid;
    });

    // Check if data entered is withing -50 and 50 range
    jQuery.validator.addMethod("isValidInput", function(value, element) {
        var isValid = true;
        minColVal = parseInt(document.getElementById('minColVal').value);
        maxColVal = parseInt(document.getElementById('maxColVal').value);
        minRowVal = parseInt(document.getElementById('minRowVal').value);
        maxRowVal = parseInt(document.getElementById('maxRowVal').value);
        
        if(element.id == 'maxColVal') {
            if(value > 50 || value < -50) {
                isValid = false;
            }
        }
        if(element.id == 'minColVal') {
            if(value > 50 || value < -50) {
                console.log("invalid value");
                isValid = false;
            }
        }
        if(element.id == 'maxRowVal') {
            if(value > 50 || value < -50) {
                isValid = false;
            }
        }
        if(element.id == 'minRowVal') {
            if(value > 50 || value < -50) {
                isValid = false;
            }
        }

        return this.optional(element) || isValid;
    });

     // Helper functions
     // Check if user has given valid input data. If true then enable save button 
     //    otherwise disable it
     function validateForm() {
        var validForm = $('#form-input').validate();
        var isFormValid = validForm.checkForm();
        if(isFormValid) { 
            $('#submitButton').prop('disabled', false);
            drawTable();
        } else {
            $('#submitButton').prop('disabled', true);  
        }
    }

    // Add sliders for each input field. Set min to -50 and max to 50.
    //    Bind the slider to input field using slide function
    $("#minColSlider").slider({
        min: -50,
        max: 50,
        stop: function(event, ui) {            
            document.getElementById('minColVal').blur();
        },
        slide: function(event, ui) {
            var input = document.getElementById('minColVal');
            $("#minColVal").val(ui.value);
            input.focus();
            input.select();
            validateForm();
        }
    });
    $("#maxColSlider").slider({
        min: -50,
        max: 50,
        stop: function(event, ui) {            
            document.getElementById('maxColVal').blur();
        },
        slide: function(event, ui) {
            var input = document.getElementById('maxColVal');
            $("#maxColVal").val(ui.value);
            input.focus();
            input.select();
            validateForm();
        }
    });
    $("#minRowSlider").slider({
        min: -50,
        max: 50,
        stop: function(event, ui) {            
            document.getElementById('minRowVal').blur();
        },
        slide: function(event, ui) {
            $("#minRowVal").val(ui.value);
            var input = document.getElementById('minRowVal');
            input.focus();
            input.select();
            validateForm();
        }
    });
    $("#maxRowSlider").slider({
        min: -50,
        max: 50,
        stop: function(event, ui) {            
            document.getElementById('maxRowVal').blur();
        },
        slide: function(event, ui) {
            var input = document.getElementById('maxRowVal');
            $("#maxRowVal").val(ui.value);
            input.focus();
            input.select();
            validateForm();
        }
    });

    // Check for tab click and open the selected tab and draw the table for tab
    $("#tabs").tabs({
        activate: function( event, ui ) {
            let tabNum = $("#tabs").tabs('option', 'active');
            let startIndex = tabNum * 4;

            minColVal = tableInputs[startIndex];
            maxColVal = tableInputs[startIndex + 1];
            minRowVal = tableInputs[startIndex + 2];
            maxRowVal = tableInputs[startIndex + 3];
           
            $("#tab"+(tabNum + 1)).hide();
            drawTable();
        }
    });

    // When use has given valid input, create a new tab with title as the input data.
    //   Add the tab to the list of tabs and enable removeAll and removeCurrent buttons.
    //   Also set the new tab as the selected tab.
    $("#submitButton").click(function() {
        maxColVal = parseInt(document.getElementById('maxColVal').value);
        minColVal = parseInt(document.getElementById('minColVal').value);
        maxRowVal = parseInt(document.getElementById('maxRowVal').value);
        minRowVal = parseInt(document.getElementById('minRowVal').value);
        var tabNum = $("div#tabs ul li").length + 1;
        let tabName = "(" + minColVal + ", " + maxColVal + ", " + minRowVal + ", " + maxRowVal + ")";

        // Create new tab with id #tab + (tabNum + 1)
        $("div#tabs ul").append (
            "<li><a href='#tab" + tabNum + "'>" + tabName + "</a></li>"
        );
        $("#tabs").append(
            "<div id='tab" + tabNum + "'>" + "</div>"
        );
        $("div#tabs").tabs("refresh");

        // Save the inputs for this tab so we can access it when user switches around tabs
        tableInputs.push(minColVal);
        tableInputs.push(maxColVal);
        tableInputs.push(minRowVal);
        tableInputs.push(maxRowVal);

        // Set the newly added tab as active tab and draw it
        tabNum -= 1;
        $("#tabs").tabs('option', 'active', tabNum);
        let startIndex = tabNum * 4;
       
        minColVal = tableInputs[startIndex];
        maxColVal = tableInputs[startIndex + 1];
        minRowVal = tableInputs[startIndex + 2];
        maxRowVal = tableInputs[startIndex + 3];

        $("#tab"+(tabNum + 1)).hide();
        drawTable();

        // Since we added new tab, it means we have atleast 1 tab. Enable remove current and remove all buttons
        $('#removeAll').prop('disabled', false);  
        $('#removeButton').prop('disabled', false);  
    });

    // Remove drawn table
    function eraseTable() {
        document.getElementById('table-elm').innerHTML = "";
        tabNum = $("#tabs").tabs('option', 'active');
        $("#tab"+(tabNum + 1)).hide();
    }
    
    // Delete the tab at given index
    function deleteTab(index) {
        $("#tabs").find(".ui-tabs-nav li:eq(" + index + ")").remove();
        $("#tabs").tabs("refresh");

        // Remove the input values for the tab from array
        var indexToRemove = index * 4;
        tableInputs.splice(indexToRemove, 4);
        if(tableInputs.length <= 0) {
            resetInputs();
        }
    }

    // Disable all buttons and reset input fields and sliders to 0 when there are 0 tabs after deletion.
    function resetInputs() {
        $('#minColVal').val('');
        $('#maxColVal').val('');
        $('#minRowVal').val('');
        $('#maxRowVal').val('');
        $('#minColSlider').slider('value', 0);
        $('#maxColSlider').slider('value', 0);
        $('#minRowSlider').slider('value', 0);
        $('#maxRowSlider').slider('value', 0);
        $('#submitButton').prop('disabled', true); 
        $('#removeAll').prop('disabled', true);  
        $('#removeButton').prop('disabled', true);  
    }

    // Remove currently selected tab
    $("#removeButton").click(function() {
        tabNum = $("#tabs").tabs('option', 'active');
        deleteTab(tabNum);
       
        // Load tab 0 as defualt
        $("#tabs").tabs('option', 'active', 0);
        minColVal = tableInputs[0];
        maxColVal = tableInputs[1];
        minRowVal = tableInputs[2];
        maxRowVal = tableInputs[3];

        drawTable();

        // If no tabs are present then disable removeAll and removeCurrent
        if($("div#tabs ul li").length <= 0) {
            $('#removeAll').prop('disabled', true);  
            $('#removeButton').prop('disabled', true);
        }
    });

    // Go through each tab and remove it from the list of tabs. Also erase the table
    $("#removeAll").click(function() {
        let numTabs = (tableInputs.length / 4);
        for(var i = 0; i < numTabs; i++) {
            deleteTab(0);
        }
        eraseTable();
        $('#removeAll').prop('disabled', true);  
        $('#removeButton').prop('disabled', true);  
    });
});