window.addEventListener("online", function(){
  window.applicationCache.update();
});
window.applicationCache.addEventListener('updateready', function() {
  if (confirm('An update is available. Save & Reload now?')) {
    saveCharacterList();
    window.applicationCache.swapCache();
    window.location.reload();
  }
});
if(window.navigator.onLine) {
  window.applicationCache.update();
}
