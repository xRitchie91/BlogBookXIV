var inactivityTime = function () {
    var time;
    window.onload = resetTime;
    // DOM Events
    document.onmousemove = resetTime;
    document.onkeypress = resetTime;
  
    function logoutMeOut() {
      logout();
    }
  
    function resetTime() {
      clearTimeout(time);
      time = setTimeout(logoutMeOut, 600000);
      // 1000 milliseconds = 1 second
    }
  };
  
  window.onload = function () {
    inactivityTime();
  };