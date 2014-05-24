chrome.app.runtime.onLaunched.addListener(function(){
    chrome.app.window.create('background.html',{
        'bounds': {
            'width': screen.availWidth,
            'height': screen.availHeight
        }
      });
});
