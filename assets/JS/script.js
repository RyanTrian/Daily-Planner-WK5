
// When the DOM is fully loaded, run this function
$(function() {
    $('#currentDay').text(moment().format("dddd, MMMM Do"));
    for (let i = 9; i < 18; i++) {
        let row = $(`<section class='row' id='row${i}' data-time=${i}></section>`);

        let timeblock = $('<div class="col-sm-2" id="time-block"><p class="hour">' +renderTimeBlock(i) + '</p>');

        let isTask = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add your event here..."></textarea>`);

        let saveBtn = $(`<div class="col-sm-2" id="save-div"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`);
        
        row.append(timeblock);
        row.append(isTask);
        row.append(saveBtn);

        $('.container').append(row);
    }
    // render the time + am or pm on the left side to indicate time block
    function renderTimeBlock(hour) {
        let time = hour < 12 ? hour + 'am' :
                 hour === 12 ? hour + 'pm' :
                 hour - 12 + 'pm'
        return time;
    }
    // Check for past present and future timeblock then give them the corresponded class
    function whatColor() {
        let currentHour = moment().hours();
        for (let i = 9; i < 18; i++) {
            if ($(`#row${i}`).data('time') == currentHour) {
                $(`#text${i}`).addClass("present");
            } else if (currentHour < $(`#row${i}`).data('time')) {
                $(`#text${i}`).addClass("future");
            }
        }
    }
    
    setInterval(function () {
      whatColor();
    }, 1000);
    
});