angular.module('nomLater.events', [])

.controller('EventsController', function ($scope, $rootScope, $window, $location, Events, CalendarFactory) {
  $rootScope.signedIn = true;
  $rootScope.user = {}
  $scope.event = {}
  $scope.eventsList = {}
  $scope.pageNumber = 0
  $scope.invalid = false
  $scope.shown = false
  $scope.user = {};

  $scope.showForm = function() {
    $scope.shown = !$scope.shown;
  }

  $scope.joinEvent = function(evt) {
    //dont add the user to the event if they are alreay apart of it. 
    $scope.event = evt; 
    if(!containsUser($scope.userInfo.name, evt)){
      Events.joinEvent(evt);
      CalendarFactory.startCalendar($scope.event, $scope.user);
    } else {
      alert("You are already going to this event.")
    }
  }

  $scope.addEvent = function() {
    console.log("AddEvent called")
    if ($scope.newEvent.description !== "" &&
        $scope.newEvent.location !== "" &&
        $scope.newEvent.datetime !== "" ) {

          $scope.invalid = false

          Events.addEvent($scope.newEvent)
          .then(function(newEvent) {
            alert('Your event has been created: ', newEvent.description);
            CalendarFactory.startCalendar($scope.newEvent);
            $scope.viewAllEvents();
            $scope.initNewEventForm()
          });
    } else {
      $scope.invalid = true
    }     
  }

  $scope.initNewEventForm = function() {
    $scope.newEvent = {}
    $scope.newEvent.description
    $scope.newEvent.location
    $scope.newEvent.time = (new Date()).toTimeString().substr(0,5)
    $scope.newEvent.date = new Date(new Date() + new Date().getTimezoneOffset()*60000).toISOString().substr(0,10)    
  }

  $scope.viewAllEvents = function() {

    Events.getEvents($scope.pageNumber)
    .then(function(data) {
      $scope.eventsList = data;
    });

  };

  $scope.nextPage = function() {
    // need some way to limit how many pages people can go forward; it seems to get messed up if people 
    // navigate past where there are no more results to show.
    $scope.pageNumber++
    $scope.viewAllEvents()
  };
  
  $scope.prevPage = function() {
    if ($scope.pageNumber > 0) {
      $scope.pageNumber--
      $scope.viewAllEvents()
    }
  };

  $scope.initUser = function(){
    if($rootScope.userInfo === undefined){
      $rootScope.userInfo = {};
      //Yeah... i know it doesnt make sense that it
      // is in events
      Events.getUserInfo();
    }
  }

  $scope.calendar = function(){
  }

  $scope.viewAllEvents()
  $scope.initNewEventForm()
  $scope.initUser()


   //~~~~~ HELPERS ~~~~~~

   var containsUser = function(name, evnt){
      for(var i = 0; i < evnt.attendees.length; i++){
        if(evnt.attendees[i].name === name){
          return true;
        }
      }
      return false;
   };


})
