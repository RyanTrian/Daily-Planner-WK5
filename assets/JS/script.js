// Check if there any value store in storage for each time block
// If true, render it inside the corresponding textarea
function getLocalStorage(key) {
  let value = localStorage.getItem(key);
  if (value) {
      $(`#text${key}`).text(value);
  }
}

// When the DOM is fully loaded, run this function
$(function() {
    $('#currentDay').text(moment().format("dddd, MMMM Do"));
    
    for (let i = 9; i < 18; i++) {
        let row = $(`<section class='row' id='row${i}' data-time=${i}></section>`);

        let timeblock = $('<div class="col-sm-2" id="timeBlock"><p class="hour time-block">' +renderTimeBlock(i) + '</p>');

        let isTask = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add your event here..."></textarea>`);

        let saveBtn = $(`<div class="col-sm-2" id="Btn-div"><button class="Btn save" id=${i}><i class="fas fa-save"></i><button class="Btn delete" id=${i}><i class="fas fa-eraser"></i></button>`);
        
        row.append(timeblock);
        row.append(isTask);
        row.append(saveBtn);

        $('.container').append(row);

        getLocalStorage(i);
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
    
    // Checking the hour every second, if the hour change, update the colors
    setInterval(function () {
      whatColor();
    }, 1000);
    // Save Button
    let saveBtn = $(".save");
    saveBtn.on("click", function () {
    let eventId = $(this).attr("id");
    let eventText = $(this).parent().siblings().children(".description").val();
    localStorage.setItem(eventId, eventText);
    // save to local message
    $('.container').prepend('<p class="message">Events have been save to local ✔</p>')
    setTimeout(function() {
        $('.message').remove();
    }, 3000);
    });
    // Erase Button
    let deleteBtn = $(".delete");
    deleteBtn.on("click", function() {
        let eventId = $(this).attr("id");
        localStorage.removeItem(eventId);
        $(this).parent().siblings().children(".description").val('');
    })
    
});