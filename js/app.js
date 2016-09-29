var db = "";
angular.module('app', ['ionic', 'ngCordova','app.controllers', 'app.routes', 'app.services', 'app.directives', 'googlechart', 'nvd3'])

.run(function($ionicPlatform,$cordovaSQLite) {
     $ionicPlatform.ready(function() {
                          debugger;
                          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                          // for form inputs)
                          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                          cordova.plugins.Keyboard.disableScroll(true);
                          }
                          if (window.StatusBar) {
                          // org.apache.cordova.statusbar required
                          StatusBar.styleDefault();
                          }
                          });
     $ionicPlatform.ready(function() {
                          
                          db = $cordovaSQLite.openDB({name: 'dpodDBGE.db', location: 'default'});
                          
                          
                          $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS "userRolePermission" ("ssoid" INTEGER, "lastName" VARCHAR, "isdPodAppUser" VARCHAR, "roleName" VARCHAR, "firstName" VARCHAR)');
                          
                          $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS "crew_details" ("crewname" VARCHAR, "turbineName" VARCHAR)');
                          
                          $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS "turbines_details" ("turbineStatus" VARCHAR, "turbineOrder" INTEGER, "turbineNumber" VARCHAR,"turbineId" INTEGER,"plannedTime" INTEGER,"markedAsRemoved" BOOL)');
                          
                          $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS "tasks_details" ("turbineid" INTEGER,"taskId" INTEGER,"taskHistId" INTEGER,"taskType" VARCHAR,"taskDescription" VARCHAR,"priority" VARCHAR,"markedAsRemoved" BOOL,"markedAsDone" BOOL,"alreadyDone" BOOL,faultId VARCHAR,resolutionNotes VARCHAR,"userSSO" INTEGER,"taskName" VARCHAR,"taskCreatedDateTime" DATETIME,"estimatedTime" INTEGER,"syncStatus" VARCHAR,"taskStatus" VARCHAR,"taskDueDateTime" DATETIME,"techniciansNeeded" VARCHAR,"taskRecurrence" VARCHAR,"taskGroup" VARCHAR,"taskExternalNotes" VARCHAR,"taskInternalNotes" VARCHAR,"tower" VARCHAR,"section" VARCHAR,"SiteNotes" VARCHAR,"FleetNotes" VARCHAR,"timer" DATETIME,"updateStatus" VARCHAR,"turbineStatus" VARCHAR)');
                      
                          $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS "images_details" ("taskId" INTEGER,"imageUrl" VARCHAR,"imageDescription" VARCHAR,"imageId" VARCHAR,"thumbnailData" VARCHAR)');
                          
                          });

     
     
     });
