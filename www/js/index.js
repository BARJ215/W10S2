var titleText;
var notiText;
var toastTime = 2000;
var notification_count=0;
var delay;

$(document).on('pageinit', function() {

	$('#messageButton').on('click', function() {
		createMessage();
	});
	
	$('#dialogButton').on('click', function() {
		createDialog();
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
        	

function createDialog() {

	//phonegap supports native dialog boxes.
	//here's a simple example
      
	navigator.notification.confirm(
    	'Are you hungry?',  // message
        dialogDismissed,         // callback
        'An example dialog!',            // title
        ['Yes', 'No']                  // buttons
    );

}
        	
        	
        	
function dialogDismissed(buttonIndex) {
	
	if(buttonIndex==1){
        new Toast({content: "GO EAT SOME FOOD", duration: 3000});
        new createNotification("Hey You!","GET BACK TO WORK",30000);
    }
   	else if(buttonIndex==2){
        new Toast({content: 'GOOD', duration: 3000});
        
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

