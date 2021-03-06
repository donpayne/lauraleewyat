$("#calendar").fullCalendar({
  // To make your own Google API key, follow the directions here:
  // http://fullcalendar.io/docs/google_calendar/
  googleCalendarApiKey: "",

  // US Holidays
  events: "usa__en@holiday.calendar.google.com",

  eventClick: function (event) {
    // opens events in a popup window
    window.open(event.url, "gcalevent", "width=700, height=600");
    return false;
  },

  loading: function (bool) {
    $("#loading").toggle(bool);
  },
});
