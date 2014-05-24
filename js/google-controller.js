function openCharacterFile(callback){
  chrome.fileSystem.chooseEntry({type: 'openWritableFile', accepts: accepts}, function(fileEntity){
    if (!fileEntity){
      console.log("No File Selected");
      return
    }
    
    fileEntity.file(function(file){
      var reader = new FileReader();

      reader.onloadend = function(e){
        console.log("Character Loaded!");
        var characterSheet = JSON.parse(e.target.result);
        for(note in characterSheet.notes){
          characterSheet.notes[note].date = new Date(characterSheet.notes[note].date);
        }
        rifts.characterList.push(characterSheet);
        rifts.index = rifts.characterList.length - 1;
        chrome.storage.local.set({"openedFile": chrome.fileSystem.retainEntry(fileEntity)}, function(){
          window.openedFile = true;
          callback();
        });
      };
      reader.readAsText(file);
    });
  });
}

function syncCharacterSheet(callback){

}

function saveCharacterFile(callback){
  if (!openedFile){
    saveCharacterList();
    callback();
  } else {
    chrome.storage.local.get("openedFile", function(c){
      chrome.fileSystem.restoreEntry(c.openedFile, function(fileEntity){
        fileEntity.createWriter(function(writer){
          writer.onwriteend = function(e){
            console.log("Character Saved!");
            saveCharacterList();
            callback();
          };
          writer.write(new Blob([angular.toJson(characterSheet, true)], { type: 'application/json'}));
        });
      });
    });
  }
}

function saveCharacterFileAs(callback){
  chrome.fileSystem.chooseEntry({type: 'saveFile', accepts: accepts}, function(fileEntity){
    fileEntity.createWriter(function(writer){
      writer.onwriteend = function(e){
        console.log("Character Saved!");
        chrome.storage.local.set({"openedFile": chrome.fileSystem.retainEntry(fileEntity)}, function(){
          window.openedFile = true;
          callback();
        });
      };
      writer.onerror = function(e){
        console.log("Error" + e.toString());
      }
      window.writer = writer;
      console.log(writer);
      writer.write(new Blob([angular.toJson(characterSheet, true)], { type: 'application/json' }));
    });
  });
}

function closeWindow(){
  chrome.app.window.current().close();
}

function saveCharacterList(){
  chrome.storage.local.set({"characters": angular.toJson(rifts.characterList) });
}

function initControllerComponents(){
  document.querySelector("#quit").addEventListener('click', closeWindow);
  rifts.characterList = getCharacterList();
  ng_redirect("/");
}

function getCharacterList(){
  chrome.storage.local.get("characters", function(items){
    var data = [new Character()];
    if (items.characters !== undefined && items.characters !== null){
      var data = JSON.parse(items.characters);
    }
    return data;
  });
}
