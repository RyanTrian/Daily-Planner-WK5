
// When the DOM is fully loaded, run this function
$(function() {
    $('#currentDay').text(moment().format("dddd, MMMM Do"));
    for (let i = 9; i < 18; i++) {
        let row = $(`<section class='row' id='row${i}'></section>`);

        let timeblock = $('<div class="col-sm-2"><p class="hour">' + '</p>');

        let isTask = $(`<div class="col-sm-8 past"><textarea id='text${i}' class="description" placeholder="Add your event here..."></textarea>`);

        let saveBtn = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`);


        row.append(timeblock);
        row.append(isTask);
        row.append(saveBtn);
        $('.container').append(row);
    }
})