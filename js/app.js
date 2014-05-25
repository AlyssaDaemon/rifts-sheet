var Riftsapp = angular.module('riftsScreen', ['ngRoute']);

Riftsapp.config(['$routeProvider',
  function($routeProvider){
    $routeProvider.
      when('/', {
        templateUrl: 'templates/characterSelect.html',
        controller: 'characterSelectScreen'
      }).
      when('/save', {
        templateUrl: 'templates/refresh.html',
        controller: 'saveController'
      }).
      when('/saveAs', {
        templateUrl: 'templates/refresh.html',
        controller: 'saveAsControler'
      }).
      when('/open', {
        templateUrl: 'templates/refresh.html',
        controller: 'openController'
      }).
      when('/character', {
        templateUrl: 'templates/character.html',
        controller: 'characterScreen'
      }).
      when('/combat', {
        templateUrl: 'templates/combat.html',
        controller: 'combatScreen'
      }).
      when('/vehicle', {
        templateUrl: 'templates/vehicle.html',
        controller: 'vehicleScreen'
      }).
      when('/bio',{
        templateUrl: 'templates/backstory.html',
        controller: 'bioScreen'
      }).
      when('/magic', {
        templateUrl: 'templates/spells.html',
        controller: 'spellScreen'
      }).
      when('/notes', {
        templateUrl: 'templates/notes.html',
        controller: 'noteScreen'
      }).
      otherwise({
        redirectTo: "/"
      })
}]);

Riftsapp.controller('saveAsController', function($scope){
  saveCharacterFileAs(function(){
    ng_redirect("/");
  });
});

Riftsapp.controller('saveController', function($scope){
  saveCharacterFile(function(){
    ng_redirect("/");
  });
});

Riftsapp.controller('openController', function($scope){
  openCharacterFile(function(){
    ng_redirect("character");
  });
});

Riftsapp.controller('bioScreen', function($scope){
  $scope.c = rifts.characterList[rifts.index];
  $scope.addHistory = function() {
    $scope.c.history.push(new History());
  }

  $scope.delHistory = function(index) {
    $scope.c.history.splice(index, 1);
  }
  $scope.addSibling = function() {
    $scope.c.family.siblings.push(new Sibling());
  }

  $scope.delSibling = function(index) {
    $scope.c.family.siblings.splice(index, 1);
  }
});

Riftsapp.controller('vehicleScreen', function($scope){
  $scope.c = rifts.characterList[rifts.index];
  $scope.newVehicle = function() {
    $scope.c.vehicles.push(new Vehicle());
  }
  $scope.delVehicle = function(index) {
    $scope.c.vehicles.splice(index, 1);
  }
  $scope.addVMDC = function(index){
    $scope.c.vehicles[index].mdc.push(new MDCByLocation());
  }
  $scope.delVMDC = function(vindex, index){
    $scope.c.vehicles[index].mdc.splice(index, 1);
  }
  $scope.addVH2H = function(index) {
    $scope.c.vehicles[index].atks.push(new VehicleH2H());
  }
  $scope.delVH2H = function(vindex, index) {
    $scope.c.vehicles[vindex].atks.splice(index, 1);
  }
  $scope.addWepSys = function(index) {
    $scope.c.vehicles[index].atks.push(new WeaponSystem());
  }
  $scope.delWepSys = function(vindex, index) {
    $scope.c.vehicles[vindex].weapons.splice(index, 1);
  }
  $scope.delAmmo = function(index) {
    $scope.c.inventory.ammo.splice(index, 1);
  }
  $scope.addAmmo = function() {
    $scope.c.inventory.ammo.push(new InventoryItem());
  }
  $scope.delBackPack = function(index) {
    $scope.c.inventory.backpack.splice(index, 1);
  }
  $scope.addBackPack = function() {
    $scope.c.inventory.backpack.push(new InventoryItem());
  }
  $scope.delPersonal = function(index){
    $scope.c.inventory.personal.splice(index, 1);
  }
  $scope.addPersonal = function(){
    $scope.c.inventory.personal.push(new InventoryItem());
  }
  $scope.delCargo = function(index){
    $scope.c.inventory.cargo.splice(index, 1);
  }
  $scope.addCargo = function(){
    $scope.c.inventory.cargo.push(new InventoryItem());
  }
});

Riftsapp.controller('characterSelectScreen', function($scope){
  $scope.list = rifts.characterList;
  $scope.index = rifts.index;
  $scope.newChar = function(){
    $scope.list.push(new Character());
  }
  $scope.delChar = function(index){
    $scope.list.splice(index, 1);
  }
  $scope.loadChar = function(newIndex){
    rifts.index = newIndex;
    ng_redirect("character");
  }
});

Riftsapp.controller('characterScreen', function($scope){
  $scope.c = rifts.characterList[rifts.index];

  $scope.addOCCSkill = function(){
    $scope.c.occ.push(new Skill());
  }
  $scope.delOCCSkill = function(index){
    $scope.c.occ.splice(index, 1);
  }
  $scope.addRelatedSkill = function(){
    $scope.c.related.push(new Skill());
  }
  $scope.delRelatedSkill = function(index){
    $scope.c.related.splice(index, 1);
  }
  $scope.addSecondarySkill = function(){
    $scope.c.secondary.push(new Skill());
  }
  $scope.delSecondarySkill = function(index){
    $scope.c.secondary.splice(index, 1);
  }
});

Riftsapp.controller('combatScreen', function($scope){
  $scope.c = rifts.characterList[rifts.index];

  $scope.delAncientWep = function(index) {
    $scope.c.weapons.ancient.splice(index, 1);
  }

  $scope.addAncientWep = function() {
    $scope.c.weapons.ancient.push(new AncientWeapon());
  }

  $scope.delModernWep = function(index) {
    $scope.c.weapons.modern.splice(index, 1);
  }

  $scope.addModernWep = function() {
    $scope.c.weapons.modern.push(new ModernWeapon());
  }

  $scope.delExplosive = function(index) {
    $scope.c.weapons.ordinance.splice(index, 1);
  }

  $scope.addExplosive = function () {
    $scope.c.weapons.ordinance.push(new ExplosiveWeapon());
  }

  $scope.addAncientProf = function() {
    $scope.c.weapons.prof.ancient.push(new AncientProf());
  }

  $scope.delAncientProf = function(index) {
    $scope.c.weapons.prof.ancient.splice(index, 1);
  }

  $scope.addModernProf = function() {
    $scope.c.weapons.prof.modern.push(new ModernProf());
  }

  $scope.delModernProf = function(index) {
    $scope.c.weapons.prof.modern.splice(index, 1);
  }

  $scope.newMDCByLocation = function() {
    $scope.c.bodyArmor.mdc.push(new MDCByLocation());
  }

  $scope.delMDCByLocation = function(index){
    $scope.c.bodyArmor.mdc.splice(index, 1);
  }
  $scope.addSibling = function() {
    $scope.c.family.siblings.push(new Sibling());
  }

  $scope.delSibling = function(index) {
    $scope.c.family.siblings.splice(index, 1);
  }
});

Riftsapp.controller('spellScreen', function($scope){
  $scope.c = rifts.characterList[rifts.index].spells;
  $scope.addSpell = function(){
    $scope.c.push(new Spell());
  }
  $scope.delSpell = function(index) {
    $scope.c.splice(index, 1);
  }
});

Riftsapp.controller('noteScreen', function($scope){
  $scope.c = rifts.characterList[rifts.index].notes;
  $scope.noteSelect = function(index){
    $scope.selected_note = $scope.c[index];
  }
  if ($scope.c.length > 0){
    $scope.selected_note = $scope.c[0];
  } else {
    $scope.selected_note = false;
  }
  $scope.delNote = function(index){
    $scope.c.splice(index, 1);
  }
  $scope.addNote = function() {
    var note = new Note();
    note.date = new Date();
    $scope.c.push(note);
    $scope.selected_note = $scope.c[$scope.c.length - 1];
  }
});

initControllerComponents();

window.onload = function() {
  initControllerComponents();
  rifts.index = 0;
  if (window.navigator.onLine){
    window.applicationCache.update();
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY){
      window.applicationCache.swapCache();
    }
  }
}
