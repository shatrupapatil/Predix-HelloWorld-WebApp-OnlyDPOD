angular.module('app.services', [])

.factory('BlankFactory', [function(){
                          var value = 0;
                          
                          // public
                          return {
                          
                          getValue: function() {
                          return value;
                          },
                          
                          setValue: function(val) {
                          value = val;
                          }
                          }

}])

.service('BlankService', [function(){
                          
                          var myList = [];
                          
                          var addList = function(newObj) {
                          myList.push(newObj);
                          }
                          
                          var getList = function(){
                          return myList;
                          }
                          
                          var emptyList= function() {
                          if(myList!=null){
                          myList.length=0;
                          }
                          }

                          
                          
                          return {
                          addList: addList,
                          getList: getList,
                          emptyList:emptyList
                          };
                          
                          }]);
