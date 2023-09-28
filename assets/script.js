/* Wraps all code that interacts with the DOM in a call to jQuery to ensure that
the code isn't run until the browser has finished rendering all
the elements in the html. */

$(document).ready(function () {

  // Function to display the current date in the header of the page

  function currentDay(){
    var timeNow = dayjs().format('DD MMMM, YYYY')
    $('#currentDay').text(timeNow)
  }
  currentDay();

    
 // Function to load data from local storage

 var hourlyBoxes = $('div[id^="hour"]');

 function localStorageLoad() {
    hourlyBoxes.each(function() {
     var divHourID = $(this).attr('id');
     var eventName = localStorage.getItem(divHourID);
    
    $(this).find('textarea').val(eventName);
    });
}


 // Function to save input to hourly slots on the click of save button

 var saveBtn = $('.saveBtn');

 function localStorageSave () {
    saveBtn.click(function() {
      var divHourID = $(this).closest('div').attr('id');
      var textArea = $(this).siblings('textarea');
      var eventName = textArea.val().trim();
      localStorage.setItem(divHourID, eventName);
      
      if (eventName !== '') {
        alert('"' + eventName + '"' + ' has been successfully saved to your schedule!');
      } else {
        alert('This event has been cleared from your schedule.')
      }
    });
  }


  // Function to colour hourly slots depending on current time

  var today = dayjs();

  function timeBoxColor() {
    hourlyBoxes.each(function() {
      var hourClass = $(this).attr('id').slice(-2);
      var hourNow = today.format('HH');

       if (hourClass < hourNow) {
        $(this).addClass('past');
     } else if (hourClass === hourNow) {
        $(this).addClass('present');
     } else {
        $(this).addClass('future');
     }
   });
   }

 
 localStorageLoad();
 localStorageSave();
 timeBoxColor();

});