document.addEventListener('deviceready', function () {
    console.log(cordova.plugins.notification.local.launchDetails);
}, false);

var toastTime = 2000;
var notification_count=0;

$(document).on('pageinit', function() {

	$('#messageButton').on('click', function() {
		createMessage();
	});
	
	$('#dialogButton').on('click', function() {
		new createDialog("Example","Are you hungry?","Yes","No",dialogDismissed);
	});


	$('#notificationButton').on('click', function() {
		new createNotification("Example Notification","Hello",1000);
	});


});



function createMessage(){		
	//phoneGap and jQueryMobile do not support toast messages directly
    //so we can add this using toast.js
    new Toast({content: 'An example message.', duration: toastTime}); 	
}
        	

function createDialog(titleD,messageD,b1,b2,action) {

	//phonegap supports native dialog boxes.
	//here's a simple example
      
	navigator.notification.confirm(
    	messageD,  // message
        action,         // callback
        titleD,            // title
        [b1,b2]                  // buttons
    );

}
        	
function dialogDismissed(buttonIndex) {
	
	if(buttonIndex==1){
        new Toast({content: "GO EAT SOME FOOD", duration: 3000});
        new createNotification("Hey You!","GET BACK TO WORK",30000);
    }
   	else if(buttonIndex==2){
        new Toast({content: 'GOOD', duration: 3000});
        new createNotification("Click Me","Click me please.",60000);
        
    }

}

   
   
function createNotification(titleText,notificationText,delay) {
        		
	//
    //generate a time to post notification
    //
    var currentTime = new Date().getTime(); //current time
    var notificationTime = new Date(currentTime + delay); //delayed time  - add 1 second
    			
    //
    //setup notification
    //
    
    cordova.plugins.notification.local.schedule({ 
    	id: 		1,
        title: 		titleText,
        message: 	notificationText,
        date: 		notificationTime, 
        badge: 		notification_count++
   	});
    
}

