angular.module('app.controllers', [])



.controller('loginCtrl', function($scope,$http,$state,$stateParams,$cordovaSpinnerDialog,$ionicPopup,$cordovaNetwork,$cordovaSQLite,$ionicPlatform,$cordovaKeyboard,$cordovaFile) {
            
            var selectSiteQuery = "SELECT * FROM tasks_details";
            var GetTurbaiData = "";
            var doneDBTransation = "";
            $scope.$on('$ionicView.enter', function(){
                       $scope.loadFeeds();
                       });
            
            $scope.loadFeeds = function(){
            debugger;
            var checkStatus = window.localStorage.getItem('UserName');
            debugger;
            if(checkStatus != null)
            {
            
            
            $scope.SSOId = window.localStorage.getItem("UserName");
            document.getElementById("login-psw").value = "";
            $scope.checkStatus=false;
            
            }else{
            
                    debugger;
                    document.getElementById("login-name").value = "";
                    document.getElementById("login-psw").value = "";
                    $scope.checkStatus=false;
            }
            
            
            
            }
         
            
            $scope.checkboxstatus = function(){
                $scope.statusofcheckbox=!$scope.statusofcheckbox;
            }
            
            $scope.statusofcheckbox=false;
            
            $scope.LoginCheck = function(SUserName,SPassword){
            debugger
            var SUserName  = document.getElementById("login-name").value;
            var SPassword  = document.getElementById("login-psw").value;
            
            
            var isOnline = $cordovaNetwork.isOnline();
            
            var isOffline = $cordovaNetwork.isOffline();
            //debugger;
            if(isOnline == true){
            //debugger;
            if(SUserName == undefined || SUserName==""){
            
            
            // alert("Please Enter User Name");
            var alertPopup = $ionicPopup.alert({
                                               title: 'dPOD',
                                               template: 'Please Enter User SSO'
                                               });
            
            alertPopup.then(function(res) {
                            //console.log('Thank you for not eating my delicious ice cream cone');
                            });
            
            
            }
            else if (SPassword == undefined || SPassword==""){
            //debugger;
            var alertPopup = $ionicPopup.alert({
                                               title: 'dPOD',
                                               template: 'Please Enter Your Password'
                                               });
            
            alertPopup.then(function(res) {
                            //console.log('Thank you for not eating my delicious ice cream cone');
                            });
            
            //  alert("Please Enter Your Password");
            
            }
            else{
            $cordovaSpinnerDialog.show("","Login...", true);
            
            
             /*  $http.post('https://fssfed.stage.ge.com/fss/as/token.oauth2?grant_type=password&username=501272213&password=Smart@2005year&client_id=GECorp_wind_bladeinspection_Client&client_secret=pza4LjkeQORZAy1r5bTCJ2iBmq7zNBtOx97t8bJuGJOw3qi09W6sGE0y0dA8vsmX&scope=GECorp_wind_bladeinspection_API').
            
            */
            
             $http.post('https://fssfed.stage.ge.com/fss/as/token.oauth2?grant_type=password&username='+SUserName+'&password='+SPassword+'&client_id=GECorp_wind_bladeinspection_Client&client_secret=pza4LjkeQORZAy1r5bTCJ2iBmq7zNBtOx97t8bJuGJOw3qi09W6sGE0y0dA8vsmX&scope=GECorp_wind_bladeinspection_API').
             success(function (response) {
                    debugger
                    console.log(response);
                    if(!response.access_token){
                    $cordovaSpinnerDialog.hide();
                    
                    //debugger;
                    //                    var alertPopup = $ionicPopup.alert({
                    //                                                       title: 'dPOD',
                    //                                                       template: 'Authentication Failed'
                    //                                                       });
                    //
                    //                    alertPopup.then(function(res) {
                    //                                    //console.log('Thank you for not eating my delicious ice cream cone');
                    //                                    });
                    //
                    
                     debugger;
                    if($scope.statusofcheckbox==true){
                    window.localStorage.removeItem('UserName');
                    window.localStorage.setItem('UserName', SUserName);
                    }else{
                    window.localStorage.removeItem('UserName');
                    }
                    
                    SaveData();
                    }
                    else{
                    $cordovaSpinnerDialog.hide();
                   
                    
                    
                    
                    
                    if($scope.statusofcheckbox==true){
                    window.localStorage.removeItem('UserName');
                    window.localStorage.setItem('UserName', SUserName);
                     debugger;
                    }else{
                     debugger;
                    window.localStorage.removeItem('UserName');
                    }
                    
                    SaveData();
                    
                    }
                    }).error(function (xhr, ajaxOptions, thrownError) {
                             $cordovaSpinnerDialog.hide();
                             
                             if($scope.statusofcheckbox==true){
                             window.localStorage.removeItem('UserName');
                             window.localStorage.setItem('UserName', SUserName);
                             debugger;
                             }else{
                             debugger;
                             window.localStorage.removeItem('UserName');
                             }
                             
                             
                             
                             
                             
//                                                          var alertPopup = $ionicPopup.alert({
//                                                                                             title: 'dPOD',
//                                                                                            template: 'Authentication Failed'
//                                                                                             });
                            SaveData();
//                                                          alertPopup.then(function(res) {
//                                                                        
//                                                                          document.getElementById("login-psw").value = "";
//                                       console.log('Thank you for not eating my delicious ice cream cone');
//                                                                          });
                             
                             
                             });
            
            
            }}else{
            
            var alertPopup = $ionicPopup.alert({
                                               title: 'dPOD',
                                               template: 'Network Error!'
                                               });
            
            alertPopup.then(function(res) {
                            //console.log('Thank you for not eating my delicious ice cream cone');
                            });
            
            //  alert("");
            
            
            
            }}
            function SaveData(){
            debugger
            
            //$ionicPlatform.ready(function() {
            $cordovaSQLite.execute(db, selectSiteQuery).then(function(data) {
                                                             debugger;
                                                             if(data.rows.length == 0){
                                                             debugger;
                                                             inserTask_detail();
                                                             
                                                             }else{
                                                             updateTask_detail();
                                                             }
                                                             }, function (err) {
                                                             console.error('Error is'+JSON.stringify(err));
                                                             });
            
            
            //});
            
            
            
            }
            function CheckFirstTimeInsertornot(tx){
            
            }
            function errorCB(err) {
            }
            function successDB(){
            
            }
            function getLengthforUpdate(tx,results){
            var ResonLength = results.rows.length;
            }
            
            function inserTask_detail(){
            
            
//            $cordovaFile.createDir(cordova.file.dataDirectory, "images", false)
//            .then(function (success) {
//                  console.log("success");
//                  }, function (error) {
//                  console.log("error");
//                  });
            
            
            
            
            
            debugger;
            $http.get('js/taskinfo.json').success(function(data){
                                                  GetTurbaiData = data;
                                                  
                                                  console.log('JSON Data is '+ GetTurbaiData);
                                                  debugger;
                                               //   InsertTaskDetails();
                                                  
                                                  $scope.insertSitesToDatabase();
                                                  
                                                  //debugger;
                                                  //                                                  db = window.openDatabase("GedopdAppDb", "3.0", "gedopdAppDb", 5000000);
                                                  //                                                  db.transaction(TaskTableInsert, errorCB,insertSuss);
                                                  
                                                  }).error(function (xhr, ajaxOptions, thrownError) {
                                                           $cordovaSpinnerDialog.hide();
                                                           //alert("Authentication Failed");
                                                           //debugger;
                                                           console.log("Error");
                                                           console.log('Sttaus '+xhr.status);
                                                           console.log('Error '+thrownError);
                                                           });
            
            
            
            }
            
            $scope.insertSitesToDatabase = function(){
            
            debugger;
            console.log('Getting len'+GetTurbaiData);
            debugger;
             var InsertItems=0;
            debugger;
            for(var i=0; i<GetTurbaiData.crew_13.turbines.length; i++){
            debugger;
            var query = 'INSERT INTO turbines_details (turbineStatus,turbineOrder,turbineNumber,turbineId,plannedTime,markedAsRemoved) VALUES (?,?,?,?,?,?)';
            
            var inputParameter = [GetTurbaiData.crew_13.turbines[i].turbineStatus,GetTurbaiData.crew_13.turbines[i].turbineOrder,GetTurbaiData.crew_13.turbines[i].turbineNumber,GetTurbaiData.crew_13.turbines[i].turbineId,GetTurbaiData.crew_13.turbines[i].plannedTime,GetTurbaiData.crew_13.turbines[i].markedAsRemoved];
            
            InsertItems = InsertItems +1;
            $cordovaSQLite.execute(db, query, inputParameter)
            .then(function(result) {
                  debugger;
                  console.log("Get Sucess "+result);
                  insertSuss();
                  // $scope.InsertTaskDetails();
                  }, function(error) {
                     debugger;
                  console.log("Error on saving: " + error.message);
                  });
            
                      for(var j=0; j<GetTurbaiData.crew_13.turbines[i].tasks.length; j++){
            debugger;
            var query2 = 'INSERT INTO tasks_details (turbineid,taskId,taskHistId,taskType,taskDescription,priority,markedAsRemoved,markedAsDone,alreadyDone,faultId,resolutionNotes,userSSO,taskName,taskCreatedDateTime,estimatedTime,syncStatus,taskStatus,taskDueDateTime,techniciansNeeded,taskRecurrence,taskGroup,taskExternalNotes,taskInternalNotes,tower,section,SiteNotes,FleetNotes,timer,turbineStatus) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            console.log('loop Value is OutSide '+i);
            var inputParameter2 = [GetTurbaiData.crew_13.turbines[i].tasks[j].turbineId,GetTurbaiData.crew_13.turbines[i].tasks[j].taskId,GetTurbaiData.crew_13.turbines[i].tasks[j].taskHistId,GetTurbaiData.crew_13.turbines[i].tasks[j].taskType,GetTurbaiData.crew_13.turbines[i].tasks[j].taskDescription,GetTurbaiData.crew_13.turbines[i].tasks[j].priority,GetTurbaiData.crew_13.turbines[i].tasks[j].markedAsRemoved,GetTurbaiData.crew_13.turbines[i].tasks[j].markedAsDone,GetTurbaiData.crew_13.turbines[i].tasks[j].alreadyDone,GetTurbaiData.crew_13.turbines[i].tasks[j].faultId,GetTurbaiData.crew_13.turbines[i].tasks[j].resolutionNotes,GetTurbaiData.crew_13.turbines[i].tasks[j].userSSO,GetTurbaiData.crew_13.turbines[i].tasks[j].taskName,GetTurbaiData.crew_13.turbines[i].tasks[j].taskCreatedDateTime,GetTurbaiData.crew_13.turbines[i].tasks[j].estimatedTime,GetTurbaiData.crew_13.turbines[i].tasks[j].syncStatus,GetTurbaiData.crew_13.turbines[i].tasks[j].taskStatus,GetTurbaiData.crew_13.turbines[i].tasks[j].taskDueDateTime,GetTurbaiData.crew_13.turbines[i].tasks[j].techniciansNeeded,GetTurbaiData.crew_13.turbines[i].tasks[j].taskRecurrence,GetTurbaiData.crew_13.turbines[i].tasks[j].taskGroup,GetTurbaiData.crew_13.turbines[i].tasks[j].taskExternalNotes,GetTurbaiData.crew_13.turbines[i].tasks[j].taskInternalNotes,GetTurbaiData.crew_13.turbines[i].tasks[j].tower,GetTurbaiData.crew_13.turbines[i].tasks[j].section,GetTurbaiData.crew_13.turbines[i].tasks[j].SiteNotes,GetTurbaiData.crew_13.turbines[i].tasks[j].FleetNotes,GetTurbaiData.crew_13.turbines[i].tasks[j].timer,GetTurbaiData.crew_13.turbines[i].tasks[j].turbineStatus];
            debugger;
            
            $cordovaSQLite.execute(db, query2, inputParameter2)
            .then(function(result) {
                  debugger;
                  //alert('loop Value is '+i);
                  //insertSuss();
                  debugger;
                  }, function(error) {
                  debugger;
                  console.log("Error on saving: " + error.message);
                  });
            
                      }
            
            }
            debugger;
            }
//            function InsertTaskDetails(){
            $scope.InsertTaskDetails = function(){
            debugger;
           
            for(var i=0; i<GetTurbaiData.crew_13.turbines[0].tasks.length; i++){
            debugger;
            
           
            console.log('loop Value is OutSide '+i);
            debugger;
            }
            debugger;
            
            }
            
            
            
            
            
            
            
            function updateTask_detail(){
            
            
//            $cordovaFile.moveFile(cordova.file.tempDirectory , "cdv_photo_013.jpg",  cordova.file.dataDirectory)
//            .then(function (success) {
//                  console.log("success1");
//                  }, function (error) {
//                  console.log("error");
//                  });
            
            
            
            
            
            //no need
            $state.go('menu.startOfTheDay', {reload: true});
            }
            function insertSuss(){
            //alert("InsertFine");
            $state.go('menu.startOfTheDay', {reload: true});
            }
            
            $scope.disableReturnButton = function($event){
            
            if($event.which == 13){
            debugger;
           // $cordovaKeyboard.hideAccessoryBar(false);
             
            $cordovaKeyboard.close();
            }
            
            }
            
            })

.controller('startOfTheDayCtrl',function($scope,$http,$state,$stateParams,$location, $timeout,BlankFactory,BlankService,$cordovaFile,$cordovaSQLite) {
            var GetTurbai= "";var taskdetailtablelegthafterinsert= ""; $scope.GetTurbaiDatas = []; $scope.UnSysData = [];
            var startCount=0;
            var completedCount =0;
        //    $scope.isGroupShown=false;
            var notStartCount=0;
            var GetTurbainInfo="";
            function errorCB(err) {
            console.log("Error processing SQL: "+err.code);
            console.log("Error processing  message SQL: "+err.message);
            }
            
            $scope.$on('$ionicView.enter', function(){
                      
                        var GetbackTurbainID = window.localStorage.getItem('TurbainIDNumber');
                       console.log("***********######$$$$$$"+GetbackTurbainID);
                       
                       
                       if($scope.forIndication==false)
                       $scope.forIndication=true;
                       else
                       $scope.forIndication=false;
                       
                       
                       console.log('Indication'+$scope.forIndication);
                       
                       
                       
                       
                       debugger;
                       
                       window.localStorage.removeItem("TurbainIDNumber");
                       window.localStorage.setItem('TurbainIDNumber', GetbackTurbainID);
                       
                       var getNameofTaskQuery = "select * from tasks_details where turbineId='"+GetbackTurbainID+"'";
                       //console.log("select * from tasks_details where turbineId='"+group+"'");
                       
                       $cordovaSQLite.execute(db, getNameofTaskQuery).then(function(data) {
                                                                           
                                                                           $scope.TaskNames = [];
                                                                           for (var i=0; i< data.rows.length; i++) {
                                                                           debugger;
                                                                           
                                                                           
                                                                           if(data.rows.item(i).taskType=="ETC")
                                                                           data.rows.item(i).taskType="Icon_ETC.png";
                                                                           if(data.rows.item(i).taskType=="Maintenance")
                                                                           data.rows.item(i).taskType="Icon_Maintenance.png";
                                                                           if(data.rows.item(i).taskType=="MCE")
                                                                           data.rows.item(i).taskType="Icon_MCE.png";
                                                                           if(data.rows.item(i).taskType=="Other")
                                                                           data.rows.item(i).taskType="Icon_Other.png";
                                                                           if(data.rows.item(i).taskType=="Punchlist")
                                                                           data.rows.item(i).taskType="Icon_Punchlist.png";
                                                                           if(data.rows.item(i).taskType=="TIL")
                                                                           data.rows.item(i).taskType="Icon_TIL.png";
                                                                           $scope.TaskNames.push({
                                                                                                 task_name: data.rows.item(i).taskName,
                                                                                                 taskType:data.rows.item(i).taskType,
                                                                                                 task_id:data.rows.item(i).taskId,
                                                                                                 task_status: data.rows.item(i).updateStatus
                                                                                                 })
                                                                           debugger;
                                                                           }
                                                                           debugger;
                                                                           // console.log('SyS Data'+JSON.stringify($scope.TaskNames));
                                                                           debugger;
                                                                           if ($scope.isGroupShown(group)) {
                                                                           debugger;
                                                                           $scope.shownGroup = null;
                                                                           } else {
                                                                           debugger;
                                                                           $scope.shownGroup = group;
                                                                           }
                                                                           debugger;
                                                                           }, function (err) {
                                                                           console.error('Error is'+JSON.stringify(err));
                                                                           });
                       

                       
                       
                       
                       
                       
                       $scope.loadFeeds();
                       });
            
            $scope.loadFeeds = function(){
            debugger;
            
            
            var selectSiteQuery = "SELECT * FROM turbines_details";
            debugger;
            $cordovaSQLite.execute(db, selectSiteQuery).then(function(data) {
                                                             debugger;
                                                             GetTurbainInfo=data;
                                                             $scope.GetTurbaiDatas = [];
                                                            for (var i=0; i< data.rows.length; i++) {
                                                             debugger;
                                                              //console.log('Get Data is '+JSON.stringify(data.rows.item(i).taskType));
                                                              debugger;
//
                                                             $scope.GetTurbaiDatas.push({
                                                                          
                                                                        task_turbine_id: data.rows.item(i).turbineId,
                                                                        task_est_duration_hrs: data.rows.item(i).plannedTime,
                                                                        task_turbine_status: data.rows.item(i).turbineStatus
//
//
                                                                                        });
                                                             $scope.getTaskinfoDataforTaskpage();
                                                             
                                                             }
                                                             debugger;
                                                             }, function (err) {
                                                             console.error('Error is'+JSON.stringify(err));
                                                             });
            
            
            
            
            
            }
            
            
            
            
            
            
            $scope.getTaskinfoDataforTaskpage = function(){
           
                     var selectSiteQuery = "SELECT * FROM tasks_details";
                     debugger;
                     $cordovaSQLite.execute(db, selectSiteQuery).then(function(data) {
                                                                      debugger;
                                                                      taskdetailtablelegthafterinsert = data.rows.length;
                                                                      debugger;
                                                                      completedCount = 0;notStartCount=0;startCount=0;
                                                                      BlankService.emptyList();
                                                                      for (var i=0; i< data.rows.length; i++) {
                                                                      debugger;
                                                                      
                                                                          BlankService.addList(data.rows.item(i).taskId);
                                                                      
                                                                              if(data.rows.item(i).taskStatus=="completed")
                                                                              completedCount = completedCount+1;
                                                                              else if(data.rows.item(i).taskStatus=="NotStart")
                                                                              notStartCount = notStartCount+1;
                                                                              else if(data.rows.item(i).taskStatus=="Start")
                                                                              startCount = startCount+1;
                                                                      }
                                                                      debugger;
                                                                      $scope.getRecordsuccessDB();
                                                                      }, function (err) {
                                                                      console.error('Error is'+JSON.stringify(err));
                                                                      });
                     //BlankService.addList(GetTurbai.turbineNumber);
            
            //console.log("$scope.GetTurbaiDatas"+ JSON.stringify($scope.GetTurbaiDatas));
            }
            $scope.getRecordsuccessDB = function(){
            $timeout(function(){
                     //debugger;
                     for(i=0;i<taskdetailtablelegthafterinsert;i++){
                     
                     }
                     debugger;
                   
                     var     CC = completedCount/taskdetailtablelegthafterinsert*100;
                     
                     CC = CC.toFixed(0);
                     
                       debugger;
                     
                     var     ST = startCount/taskdetailtablelegthafterinsert*100;
                     ST = ST.toFixed(0);
                       debugger;
                     
                     var     NS = notStartCount/taskdetailtablelegthafterinsert*100;
                     NS = NS.toFixed(0);
                     
                       debugger;
                     
                     
                     $scope.vm = this;
                     $scope.vm.options = {
                     chart: {
                     type: 'pieChart',
                     height: 250,
                     x: function(d){return d.key;},
                     y: function(d){return d.y;},
                     color: function(d){return d.color;},
                     showLabels: false,
                     legendPosition: "right",
                     duration: 500, labelThreshold: 0.01,
                     labelSunbeamLayout: true,
                     title: "",
                     donut: true,
                     tooltips: true,
                     legend: { margin: { top: 10,
                     right: 0,
                     bottom: 5,
                     left: 15
                     } } } };
                     $scope.vm.data =
                     [ {
                      key: CC+"%" + " Completed",
                      y: CC, color : "#8AC63C" },
                      { key: ST+"%"+" Progress",
                      y: ST, color : "#F89400" },
                      { key: NS+"%"+" Not Completed",
                      y: NS, color : "#B6B9B1" } ]; }
                     ,500);
            }
         
            
            $scope.forIndication =false;
            
            $scope.isGroupShown = function(group) {
           // console.log('Get Groups is '+group);
            return $scope.shownGroup === group;
            };
            $scope.DetailsPage = function(group){
            
            
            if($scope.forIndication==false)
            $scope.forIndication=true;
            else
            $scope.forIndication=false;
            
            
            console.log('Indication'+$scope.forIndication);
            
            
            
            
            debugger;
            
            window.localStorage.removeItem("TurbainIDNumber");
            window.localStorage.setItem('TurbainIDNumber', group);
            
            var getNameofTaskQuery = "select * from tasks_details where turbineId='"+group+"'";
            //console.log("select * from tasks_details where turbineId='"+group+"'");
            
            $cordovaSQLite.execute(db, getNameofTaskQuery).then(function(data) {
                                                                
                                                                $scope.TaskNames = [];
                                                                for (var i=0; i< data.rows.length; i++) {
                                                                debugger;
                                                                
                                                                
                                                                if(data.rows.item(i).taskType=="ETC")
                                                                data.rows.item(i).taskType="Icon_ETC.png";
                                                               if(data.rows.item(i).taskType=="Maintenance")
                                                                data.rows.item(i).taskType="Icon_Maintenance.png";
                                                               if(data.rows.item(i).taskType=="MCE")
                                                                data.rows.item(i).taskType="Icon_MCE.png";
                                                                if(data.rows.item(i).taskType=="Other")
                                                                data.rows.item(i).taskType="Icon_Other.png";
                                                                if(data.rows.item(i).taskType=="Punchlist")
                                                                data.rows.item(i).taskType="Icon_Punchlist.png";
                                                                if(data.rows.item(i).taskType=="TIL")
                                                                data.rows.item(i).taskType="Icon_TIL.png";
                                                                $scope.TaskNames.push({
                                                                                      task_name: data.rows.item(i).taskName,
                                                                                      taskType:data.rows.item(i).taskType,
                                                                                      task_id:data.rows.item(i).taskId,
                                                                                      task_status: data.rows.item(i).updateStatus
                                                                                      })
                                                                debugger;
                                                                }
                                                                debugger;
                                                               // console.log('SyS Data'+JSON.stringify($scope.TaskNames));
                                                                debugger;
                                                                if ($scope.isGroupShown(group)) {
                                                                debugger;
                                                                $scope.shownGroup = null;
                                                                } else {
                                                                debugger;
                                                                $scope.shownGroup = group;
                                                                }
                                                                debugger;
                                                                }, function (err) {
                                                                console.error('Error is'+JSON.stringify(err));
                                                                });
            
            
            
            console.log('GetVar'+ getid);
            
            
            
            
            
            debugger;
           
            
            
            
//
//            
     
            
            
            
            
            }
            $scope.onHold = function (){
            alert("hey there");
            }
            
            $scope.doRefresh = function(){
               var RefreshQuery = "SELECT * FROM tasks_details";
        
            
            debugger;
            
            $cordovaSQLite.execute(db, RefreshQuery).then(function(data) {
                                                          
                                                          $scope.UnSysData = [];
                                                          for (var i=0; i< data.rows.length; i++) {
                                                          debugger;
                                                        //  console.log('SystData '+JSON.stringify(data.rows.item(i).syncStatus));
                                                          if(data.rows.item(i).syncStatus=="no"){
                                                          $scope.UnSysData.push({
                                                                                task_turbine_id: data.rows.item(i).turbineid,
                                                                                task_id:data.rows.item(i).taskId,
                                                                                taskHis_id:data.rows.item(i).taskHistId
                                                                                })
                                                          
                                                          }
                                                          //console.log('SyS Data'+JSON.stringify($scope.UnSysData));
                                                          
                                                        
                                                          
                                                          }
                                                          debugger;
                                                          console.log('SyS Data'+JSON.stringify($scope.UnSysData));
                                                          $timeout(function(){
                                                                   $scope.$broadcast('scroll.refreshComplete');
                                                                   
                                                                   },1000);

                                                                      debugger;
                                                                      }, function (err) {
                                                                      console.error('Error is'+JSON.stringify(err));
                                                          });
            
            
            
            
         
            }
            
            
            $scope.ItemDetailspage = function(Taskid){
        
            console.log('TaskId is '+Taskid);
            
             BlankFactory.setValue(Taskid);
            
                   $state.go('RequestForTaskInfo', {reload: true});
            }
            $scope.edit = function() {
           // alert('Edit Item:');
            };
            $scope.share = function(item) {
            alert('Share Item: ' + item.id);
            };
            $scope.data = {
            showDelete: false
            };
            
            })
.controller('executionCtrl', function($scope) {
            
            
            
            })

.controller('revisionCtrl', function($scope,$state,$cordovaCamera,$cordovaCapture,$stateParams,$window,$http,BlankService,$ionicActionSheet,$cordovaFile) {
            $scope.OpenCamara = function(){
            //            alert("Camera");
            
            var options = {
            quality: 75,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
            };
            
            $cordovaCamera.getPicture(options).then(function (imageData) {
                                                    var smallImage = document.getElementById('smallImage');
                                                    
                                                    
                                                    smallImage.style.display = 'block';
                                                    
                                                    
                                                    smallImage.src = imageData;
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    }, function (err) {
                                                    //console.log('Error is' + err);
                                                    });
           
            
            
            
            }
            $scope.OpenVideo = function(){
            
            
            
            $scope.captureVideo = function() {
            var options = { limit: 1, duration: 15 };
            
            $cordovaCapture.captureVideo(options).then(function(videoData) {
                                                       
                                                       console.dir(videoData[0]);
                                                       var v = "<video controls='controls'>";
                                                       v += "<source src='" + videoData[0].fullPath + "' type='video/mp4'>";
                                                       v += "</video>";
                                                       document.querySelector("#videoArea").innerHTML = v;
                                                       
                                                       
                                                       
                                                       
                                                       
                                                       
                                                       
                                                       
                                                       // Success! Video data is here
                                                       }, function(err) {
                                                       //console.log('Error is' + err);
                                                       // An error occurred. Show a message to the user
                                                       });
            }
            
            
            
            
            }
            })

.controller('debriefingCtrl', function($scope,$http,$state,$stateParams,$ionicPopup) {
            
            
            
            })
.controller('menuOnly', function($scope,$http,$state,$stateParams,$ionicPopup) {
            
            $scope.Logout= function(){
       
            var confirmPopup = $ionicPopup.confirm({
                                                   
                                                                                                      title: 'dPOD',
                                                    template: 'Are you sure want to logout ?'
                                                   
                                                                                                      });
              confirmPopup.then(function(res) {
                                if(res)
                                $state.go('RequestDogDetails', {reload: true});
                                else
                                console.log('You are not sure');
                                });
            }
                                
                    

            
                                })
.controller('taskInfoCtrl', function($scope,$http,$state,$stateParams,$cordovaCamera,$timeout,$interval,BlankFactory,$cordovaSpinnerDialog,$ionicModal,$ionicPopup,BlankService,$cordovaInAppBrowser,$cordovaAppAvailability,$cordovaSQLite,$ionicActionSheet,$cordovaFile) {
            
            
            
            $scope.reload = function(getid){
            if(getid!=undefined){
            BlankFactory.setValue(getid);
           
            
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            
            $timeout.cancel(myTimeout);
            $scope.cancel = function(){
            
            }
            
            
            debugger;
            $scope.SwipeButton=true;
            $cordovaSpinnerDialog.show("","", true);
            
            $scope.UpdateImage();
            
            
            
            
            
            
            }
            }
            
            
            $scope.images = [];
            
            var list=[];
            list=BlankService.getList();
            
            
            var imageCount=0;
            $scope.detailStatus = "More Details";
            $scope.completedStatus = "Complete";
            var TaskDetailsInfo = "";$scope.TaskDetailsInfomation = [];$scope.MoreDetails = [];
           // $scope.unquid = "";
            
            
            $scope.$on('$ionicView.enter', function(){
                       $scope.loadFeeds();
                       });
            
            
            $scope.loadFeeds = function(){
           
            $scope.unquid = BlankFactory.getValue();
            
            
            
            $scope.turbIndex=list.indexOf($scope.unquid);
            console.log("turbID"+$scope.turbIndex);
            $scope.length=(list.length)-1;
            $scope.prevTurbNum=list[$scope.turbIndex-1];
            $scope.nextTurbNum=list[$scope.turbIndex+1];
            
            console.log("prev turbine no."+$scope.prevTurbNum);
            console.log("next turbine no."+$scope.nextTurbNum);
            
            
            
            var getNameofTaskQuery = "select * from tasks_details where taskId='"+$scope.unquid+"'";
            console.log("select * from tasks_details where turbineId='"+$scope.unquid+"'");
            
            $cordovaSQLite.execute(db, getNameofTaskQuery).then(function(data) {
                                                                
                                                               
                                                                
                                                                
                                                                $scope.turbineStatus = data.rows.item(0).turbineStatus;
                                                                console.log('turbainStatusis**'+  $scope.turbineStatus);
                                                                var DBTimeout = data.rows.item(0).timer;
                                                                $scope.turbain_ID = data.rows.item(0).turbineid;
                                                                $scope.taskName = data.rows.item(0).taskName;
                                                                console.log(' $scope.turbain_ID'+ $scope.turbain_ID);
                                                                console.log(' $$scope.taskName'+ $scope.taskName);
                                                                
                                                                var res= [];
                                                                res = DBTimeout.split(":");
                                                                
                                                              $scope.hours = res[0];
                                                                
                                                              $scope.MintestValue = res[1];
                                                                debugger;
                                                              $scope.timerWithTimeout=res[2];
                                                                
                                                              
                                                                
                                                                
                                                                if($scope.timerWithTimeout==0 ){
                                                                
                                                               $scope.buttonText="Start";
                                                                }else{
                                                                $scope.buttonText="Resume";
                                                                }
                                                                
                                                                $scope.UpdateorNot = data.rows.item(0).updateStatus;
                                                                if($scope.UpdateorNot=="updated"){
                                                                $scope.disableTimer=true;
                                                                $scope.disableClick=true;
                                                                $scope.completedStatus = "Completed";
                                                                document.getElementById("completedornot").style.backgroundColor = "#66ff66";
                                                                }
                                                                else{
                                                                $scope.disableTimer=false;
                                                                $scope.disableClick=false;
                                                                $scope.completedStatus = "Complete";
                                                                document.getElementById("completedornot").style.backgroundColor = "#FFFFFF";
                                                                
                                                                }
                                                                
                                                                alert
                                                                var s = document.getElementById("Site-textarea");
                                                                s.value = data.rows.item(0).SiteNotes;
                                                                console.log('s****'+s);
                                                                var F =  document.getElementById("Fleet-textarea");
                                                                F.value = data.rows.item(0).FleetNotes;
                                                                console.log('F****'+F);
                                                   
                                                               
                                                                console.log('SyS Data'+JSON.stringify($scope.TaskNames));
                                                              
                 
                                                                }, function (err) {
                                                                console.error('Error is'+JSON.stringify(err));
                                                                });
            
          
            
            
            
            
            var imageGetting = "select * from images_details where taskId='"+$scope.unquid+"'";
            
           
            $cordovaSQLite.execute(db, imageGetting).then(function(data) {
                                                          
                                                          debugger;
                                                          var GetAllImages = data.rows.length;
                                                          
                                                          
                                               

                                                          
                                                          
                                                          
                                                          
                                                          
                                                          
                                                          
                                                          
                                                          for(i=0;i<GetAllImages;i++){
//                                                          
//          $cordovaFile.copyFile(cordova.file.tempDirectory , ""+data.rows.item(i).imageUrl+"",cordova.file.dataDirectory, ""+data.rows.item(i).imageUrl+"")
//          .then(function (success) {
//                alert("success");
//                }, function (error) {
//                alert("error");
//                });
              
                                              
                                                          
                                                          
                                                          
                                                          debugger;
                                                          $scope.images.push(cordova.file.tempDirectory + data.rows.item(i).imageUrl);
                                                          debugger;
                                                          }
                                                          debugger;
                                                          
                                                          
                                                          
                                                          
                                                          }, function (err) {
                                                          console.error('Error is'+JSON.stringify(err));
                                                          });
            
            
            
            }
            function checkidStatus(){
            
            
            
            $timeout(function(){
                     $cordovaSpinnerDialog.hide();
                     },500);
            
            
            
            
            }
            function errorCB(err) {
            console.log("Error processing SQL: "+err.code);
            console.log("Error processing  message SQL: "+err.message);
            }
            function GetSelectIdData(tx){
            
            $cordovaSpinnerDialog.show("","Loading data...", true);
            tx.executeSql('SELECT * FROM task_detail WHERE turbineNumber= ?',[$scope.unquid],querySuccess,errorCB);
            
            }
            
            function querySuccess (tx,results){
            var getTaskDetailsLength = results.rows.length;
            $timeout(function(){
                     //debugger;
//                     $scope.timerWithTimeout = results.rows.item(0).timer;
                     var DBTimeout = results.rows.item(0).timer;
                     
                     var res= [];
                     res = DBTimeout.split(":");
                     
                     $scope.MintestValue = res[0];
                     
                     $scope.timerWithTimeout=res[1];
                     
                     
                     
                     
                     if($scope.timerWithTimeout==0 )
                     $scope.buttonText="Start";
                     else
                     $scope.buttonText="Resume";

                     
                     
                     
                     
                     $scope.TaskDetailsInfomation.push({
                                                       taskName:results.rows.item(0).taskName,
                                                       turbineStatus:results.rows.item(0).turbineStatus,
                                                       turbineNumber:results.rows.item(0).turbineNumber,
                                                       estimatedTime:results.rows.item(0).estimatedTime,
                                                       taskDueDateTime:results.rows.item(0).taskDueDateTime,
                                                       priority:results.rows.item(0).priority,
                                                       techniciansNeeded:results.rows.item(0).techniciansNeeded,
                                                       task_added_on_date:results.rows.item(0).taskCreatedDateTime
                                                       
                                                       });
                     
                     
                     $scope.UpdateorNot = results.rows.item(0).updateStatus;
                     if($scope.UpdateorNot=="Complete"){
                     $scope.disableTimer=true;
                      $scope.completedStatus = "Completed";
                     }
                     else{
                     $scope.disableTimer=false;
                     $scope.completedStatus = "Mark as complete";
                     }
                     
                     var s = document.getElementById("Site-textarea");
                     s.value = results.rows.item(0).SiteNotes;
                     console.log('s****'+s);
                     var F =  document.getElementById("Fleet-textarea");
                     F.value = results.rows.item(0).FleetNotes;
                     console.log('F****'+F);
                     
                     
                   
                     
                     
                     
                     
                     $scope.$apply(function () {
                                   //debugger;
                                   var CheckData = results.rows.item(0).taskImageUrl;
                                   var GetAllImages = JSON.parse(CheckData);
                                   
                                   for(i=0;i<GetAllImages.length;i++){
                                   

                                   //debugger;
                                   ////console.log()
                                    $scope.images.push(cordova.file.tempDirectory + GetAllImages[i]);
                                   //debugger;
                                   }
                                   debugger;
                                  
                                   
                                   });
                     
                     
//                     
//                     var smallImage = document.getElementById('smallImage');
//                     smallImage.src = results.rows.item(0).taskImageUrl;
//                     
                     //$scope.AddNoteDescrioption = results.rows.item(0).notes;
                     
                     for (var i=0; i< getTaskDetailsLength; i++) {
                     
                     $scope.taskName = results.rows.item(i).taskName,
                     $scope.turbineStatus = results.rows.item(i).turbineStatus,
                     $scope.turbineNumber = results.rows.item(i).turbineNumber,
                     $scope.estimatedTime = results.rows.item(i).estimatedTime,
                     $scope.taskDueDateTime = results.rows.item(i).taskDueDateTime,
                     $scope.priority = results.rows.item(i).priority,
                     $scope.techniciansNeeded = results.rows.item(i).techniciansNeeded,
                     $scope.task_added_on_date = results.rows.item(i).taskCreatedDateTime
                     
                     
                     
                     $scope.MoreDetailsis  =
                     [ { taskName: 'Description', image:'img/TaskInfo/icon_description_3X.png',taskDes:results.rows.item(i).taskDescription },
                      { taskName: 'Task Parts', image:'img/TaskInfo/parts_3X.png',taskDes:results.rows.item(i).taskparts },
                      { taskName: 'Tower', image:'img/TaskInfo/tower_3X.png',taskDes:results.rows.item(i).tower },
                      { taskName: 'Reccurance', image:'img/TaskInfo/recurrance_3x.png',taskDes:results.rows.item(i).reccurance },
                      { taskName: 'Groups', image:'img/TaskInfo/group_3x.png',taskDes:results.rows.item(i).Groups },
                      { taskName: 'Section', image:'img/TaskInfo/section_3x.png',taskDes:results.rows.item(i).section },
                      { taskName: 'Internal Notes', image:'img/TaskInfo/notes_3x.png',taskDes:results.rows.item(i).taskInternalNotes },
                      { taskName: 'External Notes', image:'img/TaskInfo/notes_3x.png',taskDes:results.rows.item(i).taskExternalNotes }
                      ];
                     
                     
                     
                     
                     
                     
                     }
                     for (var i=0; i< getTaskDetailsLength; i++) {
                     
                     
                     
                     
                     }
                     
                     //
                     
                     },4);
            
            }
            
            
            
            var myTimeout="";
            
            
//            if($scope.timerWithTimeout==0)
               $scope.buttonText="Start";
//              else
//               $scope.buttonText="Resume";
         
            
            
            
             $scope.stopped=true;
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            
            
            
            
            $scope.stop = function (){
            
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            $timeout.cancel(myTimeout);
            
            $scope.cancel = function(){
            
            }
            
//                   $timeout.cancel(myTimeout);
//                   $scope.cancel = function(){
//                    }
            
            
            if($scope.timerWithTimeout!=0 && $scope.disableClick !=true){
            var confirmPopup = $ionicPopup.confirm({
                                                   
                                                                                                      title: 'dPOD',
                                                                                                      template: 'Are you sure to mark this task as completed ?'
                                                   
                                                                                                      });
              confirmPopup.then(function(res) {
                                
                                                              if(res) {
                                
                                $scope.makeCompleted = true;
                                $cordovaSpinnerDialog.show("","Syncing...", true);
//                                db = window.openDatabase("GedopdAppDb", "3.0", "gedopdAppDb", 5000000);
//                                db.transaction(UpdateImage, errorCB ,UpdateStatus);
                                $scope.UpdateImage();
                                
                                                              } else {
                                $scope.stopped =true;
                                
                                                              ////console.log('You are not sure');
                                
                                                              }
                                
                                                              });
            
            }else{
            
            if($scope.disableClick ==true){
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            }else{
            $scope.buttonText="Start";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            }
           
            }
            
            }
            
            
            $scope.showDetails=false;
            $scope.MoreandLess = function(){
            
            ////console.log($scope.showDetails);
            if($scope.showDetails==false)
            $scope.detailStatus = "Less Details";
            else
            $scope.detailStatus = "More Details";
            
            $scope.showDetails = !$scope.showDetails;
            
            }
            
            
            
            
            
           
            //$scope.stopped = false;
            
//            $scope.timerWithTimeout = 0;
            $scope.MintestValue = 0;
            $scope.forMintes = 0;
            $scope.hours = 0;
            $scope.startTimerWithTimeout = function() {
            
            $scope.onTimeout = function(){
       
            $scope.timerWithTimeout++;
            myTimeout = $timeout($scope.onTimeout,1000);
            ////console.log($scope.timerWithTimeout);
            //alert(scope.timerWithTimeout==60)
            if($scope.timerWithTimeout==60)
            
            {
               $scope.timerWithTimeout = 0;
           
            if($scope.MintestValue <=9){
             debugger
                 $scope.MintestValue =  0+parseInt($scope.MintestValue)+1;
            $scope.MintestValue = '0'+$scope.MintestValue;
            }else{
             debugger
             $scope.MintestValue =  parseInt($scope.MintestValue)+1;
            }
            
            
            
                 if($scope.MintestValue==60)
                {
                  $scope.MintestValue = 0;
                  $scope.hours = parseInt($scope.hours)+1;
                }
            }
            
            
            }
            $scope.cancel = function(){
            
            }
            
            //debugger;
            // alert($scope.stopped);
            if($scope.stopped ==true){
            $scope.StartImage = 'img/Playgreen_3x.png';
            $scope.buttonText="Pause";
            myTimeout = $timeout($scope.onTimeout,1000);
            }else{
            //            myTimeout = $timeout($scope.cancel);
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            $timeout.cancel(myTimeout);
            }
            
            $scope.stopped=!$scope.stopped;
            
            
            
            
            ////console.log('second '+myTimeout);
            
            
            };
            
            $scope.deletedImage = function(ss){
            
            
            
            var confirmPopup = $ionicPopup.confirm({
                                                   
                                            title: 'dPOD',
                                                   
                                            template: 'Are you sure you want to Delete image ?'
                                                   
                                                                                                      });
              confirmPopup.then(function(res) {
                                
                                                              if(res) {
                                var index = $scope.images.indexOf(ss);
                                $scope.images.splice(index, 1);
                                ////console.log('index valuje is '+index);
                                
                                                              } else {
                                
                                  }
                                
                                                              
                                });
            
            
            
               //alert("src file"+ss);
          
            
            
            }
            
            $scope.HomePageMove = function(){
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            
            $timeout.cancel(myTimeout);
            $scope.cancel = function(){
            
            }
            
            
            debugger;
            $scope.BackButton=true;
             $cordovaSpinnerDialog.show("","", true);
            
            $scope.UpdateImage();
//            db = window.openDatabase("GedopdAppDb", "3.0", "gedopdAppDb", 5000000);
//            db.transaction(UpdateImage, errorCB ,UpdateStatuss);
//            

            

            }
            function UpdateStatuss(){
            //debugger;
            $timeout(function(){
                                                          //debugger;
                                                          $cordovaSpinnerDialog.hide();
                                                          //$state.go('menu.startOfTheDay', {reload: true});
                     
                                                          },10);
            }
            
            $scope.GetImage = function(){
            
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            $timeout.cancel(myTimeout);
            $scope.stopped =true;
            $scope.cancel = function(){
            
            }
            
           
            var hideSheet = $ionicActionSheet.show({
                                                   buttons: [
                                                             { text: '<i class="ion-camera"></i> <b>Camera</b>' },
                                                             { text: '<i class="ion-images"></i> <b>Gallery</b>' },
                                                             ],
                                                   
                                                   titleText: 'dPOD',
                                                   cancelText: 'Cancel',
                                                   cancel: function() {
                                                   // add cancel code..
                                                   },
                                                   buttonClicked: function(index) {
                                                   console.log('select index is' + index);
                                                     if(index == 0){
                                                   debugger;
                                                           var options = {
                                                           quality: 75,
                                                            destinationType : Camera.DestinationType.FILE_URI,
                                                           sourceType: Camera.PictureSourceType.CAMERA,
                                                           allowEdit: true,
                                                           encodingType: Camera.EncodingType.JPEG,
                                                           targetWidth: 300,
                                                           targetHeight: 300,
                                                           popoverOptions: CameraPopoverOptions,
                                                           saveToPhotoAlbum: true
                                                         };
                                                   $cordovaCamera.getPicture(options).then(function (imageData) {
                                                                                           
                                                                                           
                                                                                           
                                                                                           
                                                                                           $scope.ChooseImage = imageData;
                                                                                           //debugger;
                                                                                           
                                                                                           if($scope.images.length <=4){
                                                                                           $scope.images.push(imageData);
                                                                                           }else{
                                                                                           
                                                                                           
                                                                                           var alertPopup = $ionicPopup.alert({
                                                                                                                              title: 'dPOD',
                                                                                                                              template: 'You would be able to capture only 5 images'
                                                                                                                              });
                                                                                           
                                                                                           alertPopup.then(function(res) {
                                                                                                           ////console.log('Thank you for not eating my delicious ice cream cone');
                                                                                                           });
                                                                                           
                                                                                           }
                                                                                            hideSheet();
                                                                                           }, function (err) {
                                                                                           ////console.log('Error is' + err);
                                                                                           });
                                                   
                                                   
                                                   }else{
                                                   var options = {
                                                   quality: 75,
                                                   destinationType : Camera.DestinationType.FILE_URI,
                                                   sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                                   allowEdit: true,
                                                   encodingType: Camera.EncodingType.JPEG,
                                                   targetWidth: 300,
                                                   targetHeight: 300,
                                                   popoverOptions: CameraPopoverOptions,
                                                   saveToPhotoAlbum: true
                                                   };
                                                   
                                                   
                                                   $cordovaCamera.getPicture(options).then(function (imageData) {
                                                                                           
                                                                                           
                                                                                           
                                                                                           
                                                                                           $scope.ChooseImage = imageData;
                                                                                           //debugger;
                                                                                           
                                                                                           if($scope.images.length <=4){
                                                                                           $scope.images.push(imageData);
                                                                                           }else{
                                                                                           
                                                                                           
                                                                                           var alertPopup = $ionicPopup.alert({
                                                                                                                              title: 'dPOD',
                                                                                                                              template: 'You would be able to capture only 5 images'
                                                                                                                              });
                                                                                           
                                                                                           alertPopup.then(function(res) {
                                                                                                           ////console.log('Thank you for not eating my delicious ice cream cone');
                                                                                                           });
                                                                                           
                                                                                           }
                                                                                            hideSheet();
                                                                                           }, function (err) {
                                                                                           ////console.log('Error is' + err);
                                                                                           });
                                                   }
                                                   }
                                                   });
            
            
            
            
            }
            
            $scope.chooseimage = function(_src){
            
            //debugger;
            var name = _src;
            
            // alert('image path ****'+name);
            window.localStorage.removeItem("TurbainID");
            window.localStorage.setItem("TurbainID", $scope.unquid);
            
            
            
            BlankFactory.setValue(name);
            
            
            $state.go('imagepopover', {reload: true});
            
            
            
            
            }
            $scope.showModal = function(templateUrl) {
            $ionicModal.fromTemplateUrl(templateUrl, {
                                        scope: $scope,
                                        animation: 'slide-in-up'
                                        }).then(function(modal) {
                                                $scope.modal = modal;
                                                $scope.modal.show();
                                                });
            }
            $scope.closeModal = function() {
            $scope.modal.hide();
            $scope.modal.remove()
            };
            
        
            $scope.OpenDigiform = function(){
            
                        var confirmPopup = $ionicPopup.confirm({
                                                               
                                                          title: 'dPOD',
                                                          template: 'Are you sure you want to start Digiform App?'
                                                               
                                                                                                                  });
            
                        
            
                        confirmPopup.then(function(res) {
                                          
                                                                        if(res) {
                                          var scheme;
                                          
                                          // Don't forget to add the org.apache.cordova.device plugin!
                                          if(device.platform === 'iOS') {
                                          scheme = 'digiforms://';
                                          }
                                          
                                          appAvailability.check(
                                                                scheme, // URI Scheme
                                                                function() {  // Success callback
                                                               //debugger;
                                                                
                                                                window.open('digiforms://', '_system', 'location=yes');
                                                                
                                                                //console.log('DigiForms is available');
                                                                },
                                                                function() {  // Error callback
                                                                //window.open('Digiforms://', '_system', 'location=yes');
                                                                ////console.log('Twitter is not available');
                                                                
                                                                $ionicPopup.alert({
                                                                                  title: 'dPOD',
                                                                                  template: 'Digiforms application not available'
                                                                                  });
                                                                }
                                                                );
                                          
                                          
                                          } else {
                                          
                                                                        //console.log('You are not sure');
                                          
                                                                        }
                                          
                                                                        });
            }
            
            $scope.PostDatatoServer = function (){
            
            
            
            
            
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            $timeout.cancel(myTimeout);
            
            $scope.cancel = function(){
            
            }
           
            if($scope.timerWithTimeout!=0){

            
            var confirmPopup = $ionicPopup.confirm({
                                                   
                                         title: 'dPOD',
                                         template: 'Task update will be sync to the cloud.'
                                                   });
                   confirmPopup.then(function(res) {
                                     
                                     
                                     $scope.buttonText="Start";
                                     $scope.StartImage = 'img/TaskInfo/Play_3x.png';
                                     $timeout.cancel(myTimeout);
                                     
                                     $scope.cancel = function(){
                                     
                                     }
                                                                        if(res) {
                                         $cordovaSpinnerDialog.show("","Syncing...", true);
                                         $scope.UpdateImage();
                                          
                                                                   }else {
                                     $scope.stopped =true;
                                             }
                                     
                                                                   });
            }else{
            
            if($scope.disableClick ==true){
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            }else{
            $scope.buttonText="Start";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            }
            
            }
            }
            
            
            
            
            
            function UpdateStatus(){
            
            
           
            
            
            
            // alert('Updated Task');
            
//            //debugger;
//            if($scope.BackButton=true){
//                            $timeout(function(){
//                                     //debugger;
//                                     $cordovaSpinnerDialog.hide();
//
//                                     },10);
//            
//            }else{
            $timeout(function(){
                     //debugger;
                     $cordovaSpinnerDialog.hide();
                     $state.go('menu.startOfTheDay', {reload: true});
                     
                     },5000);
            
            }
            
             var AllImagesUpdate = [];
           
            
            $scope.UpdateImage = function(){
          
                    var Sitetextarea = document.getElementById("Site-textarea").value;
                    var Fleettextarea = document.getElementById("Fleet-textarea").value;
         
             console.log('makeCompleted   '+$scope.makeCompleted);
            console.log('BackButton   '+$scope.BackButton);
                    var UpdateCond = $scope.unquid;
                    
                    var Timeris = $scope.hours + ':' +$scope.MintestValue +':'+$scope.timerWithTimeout;
                    
                    var Status="yes";
                    var taskStatus="completed";
                    var UpdateCompleted="updated";
          
            if($scope.makeCompleted==true){
              var UpdateMarkAsCompleted = "UPDATE  tasks_details set  timer='"+Timeris+"',updateStatus='"+UpdateCompleted+"',taskStatus='"+taskStatus+"',SiteNotes='"+Sitetextarea+"',FleetNotes='"+Fleettextarea+"' WHERE taskId='"+UpdateCond+"'";
            }else if($scope.BackButton==true){
             var UpdateMarkAsCompleted = "UPDATE  tasks_details set  timer='"+Timeris+"',SiteNotes='"+Sitetextarea+"',FleetNotes='"+Fleettextarea+"' WHERE taskId='"+UpdateCond+"'";
            }else if($scope.SwipeButton==true) {
             var UpdateMarkAsCompleted = "UPDATE  tasks_details set  timer='"+Timeris+"',SiteNotes='"+Sitetextarea+"',FleetNotes='"+Fleettextarea+"' WHERE taskId='"+UpdateCond+"'";
            
            }else{
            var UpdateMarkAsCompleted = "UPDATE  tasks_details set  timer='"+Timeris+"',syncStatus='"+Status+"',updateStatus='"+UpdateCompleted+"',taskStatus='"+taskStatus+"',SiteNotes='"+Sitetextarea+"',FleetNotes='"+Fleettextarea+"' WHERE taskId='"+UpdateCond+"'";
            }
             $cordovaSQLite.execute(db, UpdateMarkAsCompleted).then(function(data) {
                                                                }, function (err) {
                                                                console.error('Error is'+JSON.stringify(err));
                                                                            });
            
            
            
            
            
            
        var DeleteImages =  "DELETE FROM images_details WHERE taskId='"+$scope.unquid+"'"
            
            $cordovaSQLite.execute(db, DeleteImages).then(function(data) {
                                                          console.log("Delete Fine");
                                                                   }, function (err) {
                                                                   console.error('Error is'+JSON.stringify(err));
                                                                   })
            
            
            
            
            
            
            
           
            var GetImages = $scope.images;
            console.log('Get Elements'+JSON.stringify(GetImages));
            debugger;
            
            
            
            
            
            if(GetImages != ""){
            for(i=0;i<GetImages.length;i++){
            
            debugger;
           var query3 = 'INSERT INTO images_details (taskId,imageUrl) VALUES (?,?)';
            var inputParameter3 = [$scope.unquid,GetImages[i].substr(GetImages[i].lastIndexOf('/') + 1)];
            
            
            
//            $cordovaFile.moveFile(  cordova.file.tempDirectory , "cdv_photo_011.jpg", cordova.file.dataDirectory)
//            .then(function (success) {
//                  console.log("***********success***********");
//                  }, function (error) {
//                  console.log("***********error***********");
//                  });
            
            
            
            
            
            
            
            
            $cordovaSQLite.execute(db, query3, inputParameter3)
            .then(function(result) {
                
                 // alert("Insert Start");
                  StatusWillChange();
//                  debugger;
//                  if($scope.SwipeButton==true){
//                   $timeout(function(){
//                           $cordovaSpinnerDialog.hide();
//                           $state.reload();
//                           },50);
//                  }else if($scope.makeCompleted==true){
//                  $timeout(function(){
//                           $cordovaSpinnerDialog.hide();
//                           $state.reload();
//                           },300);
//                  }else{
//                 $timeout(function(){
//                           $cordovaSpinnerDialog.hide();

//                           },500);
//                  }
                  
                  }, function(error) {
                  debugger;
                  console.log("Error on saving: " + error.message);
                  });
            }
            }else{
            // alert("Insert Start SwipeButtonStatus");
            SwipeButtonStatus();
//            if($scope.SwipeButton==true){
//         
//            
//            $timeout(function(){
//                     $cordovaSpinnerDialog.hide();
//                     $state.reload();
//                     },50);
//            
//            
//            }else if($scope.makeCompleted==true){
//                    $timeout(function(){
//                             $cordovaSpinnerDialog.hide();
//                             $state.reload();
//                             },300);
//            }else{
//            $timeout(function(){
//                     $cordovaSpinnerDialog.hide();

//                     },500);
//            }
            }
            
            
            
            
            
            
            
            
            
            
            }
                                  
            
                                                                    
            $scope.imageUpdateUrl = function(){
           
            
            
            
            
            
            
            }
            function StatusWillChange(){
            
            
             //alert("Insert Starting"+$scope.SwipeButton);
            //alert("StatusWillChange");
//             $timeout(function(){
//            $cordovaFile.moveFile(cordova.file.tempDirectory , "cdv_photo_011.jpg",  cordova.file.dataDirectory)
//            .then(function (success) {
//                  console.log("success1");
//                  }, function (error) {
//                  console.log("error");
//                  });
//           // alert("StatusWillChange");
//              },30);
            
          
            
                              debugger;
                              if($scope.SwipeButton==true){
          
            
                               $timeout(function(){
                                       $cordovaSpinnerDialog.hide();
                                       $state.reload();
                                       },50);
                              }else if($scope.makeCompleted==true){
                              $timeout(function(){
                                       $cordovaSpinnerDialog.hide();
                                       $state.reload();
                                       },300);
                              }else{
                             $timeout(function(){
                                       $cordovaSpinnerDialog.hide();
                                      
                                      window.localStorage.removeItem("TurbainIDis");
                                      window.localStorage.setItem("TurbainIDis", $scope.unquid);
                                      
                                      
                                       $state.go('menu.startOfTheDay', {reload: true});
                                       },500);
                              }
            
            }
            function SwipeButtonStatus(){
            
           
            
            
            if($scope.SwipeButton==true){
            
            $timeout(function(){
                     $cordovaSpinnerDialog.hide();
                     $state.reload();
                     },50);
            
            
            }else if($scope.makeCompleted==true){
            $timeout(function(){
                     $cordovaSpinnerDialog.hide();
                     $state.reload();
                     },300);
            }else{
            $timeout(function(){
                     $cordovaSpinnerDialog.hide();
                     window.localStorage.removeItem("TurbainIDis");
                     window.localStorage.setItem("TurbainIDis", $scope.unquid);

                     $state.go('menu.startOfTheDay', {reload: true});
                     },500);
            }

            }
            
            })

.controller('imagepopoverCtrl', function($scope,$state,$stateParams,BlankFactory) {
            $scope.ShowImagebackMove = function(){
            
            $state.go('RequestForTaskInfo', {reload: true});
            
            }
            $scope.$on('$ionicView.enter', function(){
                       $scope.loadFeeds();
                       });
            
            $scope.loadFeeds = function(){
            
            
            //debugger;
            $scope.value = BlankFactory.getValue();
             //debugger;
            var TuidName = window.localStorage.getItem("TurbainID");
            BlankFactory.setValue(TuidName);
            // alert('value is '+$scope.value );
            //SelectImage
            var elem = document.createElement("img");
            elem.setAttribute("height", "100%");
            elem.setAttribute("width", "100%");
            elem.setAttribute("alt", "Flower");
            elem.setAttribute("cover","-webkit-background-size");
            elem.setAttribute("cover","-moz-background-size");
            elem.setAttribute("cover","background-size");
            document.getElementById("SelectImage").appendChild(elem);
            elem.src = $scope.value;
            
            }
            
            })