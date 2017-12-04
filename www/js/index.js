var notification_count=0;



$(document).on('pageinit', function() {
    
    
	$('#messageButton').on('click', function() {
		new createMessage("An example message",1000);

	});
	
	$('#dialogButton').on('click', function() {
		new createDialog("Example","Are you hungry?","Yes","No",dialogDismissed);
	});


	$('#notificationButton').on('click', function() {
		new createNotification("Example Notification","Hello",1000,3);
	});


});

//cordova.plugins.notification.local.on('click',new Toast({content: 'GOOD', duration: 3000}));

function createMessage(text,time){		
	//phoneGap and jQueryMobile do not support toast messages directly
    //so we can add this using toast.js
    new Toast({content: text, duration: time}); 	
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
        new createNotification("Hey You!","GET BACK TO WORK",30000,1);
    }
   	else if(buttonIndex==2){
        new createNotification("Click Me","Click me please.",60000,2);

        
    }

}
 
function createNotification(titleText,notificationText,delay,idd) {
        		
	//
    //generate a time to post notification
    //
    var currentTime = new Date().getTime(); //current time
    var notificationTime = new Date(currentTime + delay); //delayed time  - add 1 second
    			
    //
    //setup notification
    //
    
    cordova.plugins.notification.local.schedule({ 
    	id: 		idd,
        title: 		titleText,
        message: 	notificationText,
        date: 		notificationTime, 
        badge: 		notification_count++
   	});
    
    cordova.plugins.notification.local.on('click', clickedNotif(notification.id));

    
}

clickedNotif(id){
    switch(id){
        case 2:
            new Toast({content: 'GOOD', duration: 3000});
            break;
        default:
           
   }
}
    
    


