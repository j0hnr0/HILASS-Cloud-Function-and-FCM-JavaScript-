const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendNotification = functions.region('asia-southeast1').firestore
  .document('persons/{userId}')
  .onUpdate((change, context) => {
    // Get the current value of the three variables
    const newValue = change.after.data();
    const oldValue = change.before.data();
    const sendNotificationBedroom = newValue.sendNotificationBedroom;
    const sendNotificationLivingRoom = newValue.sendNotificationLivingRoom;
    const sendNotificationKitchen = newValue.sendNotificationKitchen;

    // Determine which variables have changed to true
    const changedVariables = [];
    let location = '';
    if (sendNotificationBedroom && !oldValue.sendNotificationBedroom) {
      changedVariables.push('sendNotificationBedroom');
      location = 'Bedroom';
    }
    if (sendNotificationLivingRoom && !oldValue.sendNotificationLivingRoom) {
      changedVariables.push('sendNotificationLivingRoom');
      location = 'Living Room';
    }
    if (sendNotificationKitchen && !oldValue.sendNotificationKitchen) {
      changedVariables.push('sendNotificationKitchen');
      location = 'Kitchen';
    }

    // If at least one variable has changed to true, trigger the notification
    if (changedVariables.length > 0) {
      // Get the user's FCM token
      const fcmToken = newValue.fcmToken;

      // Set up the notification
      const payload = {
        notification: {
          title: 'HILASS',
          body: `Lights unattended detected in ${location}!`,
          clickAction: 'com.example.hilass.MenuActivity',
        },
      };

      // Send the notification
      return admin.messaging().sendToDevice(fcmToken, payload)
        .then((response) => {
          console.log('Successfully sent notification:', response);
          return response;
        })
        .catch((error) => {
          console.error('Error sending notification:', error);
          throw new Error(error);
        });
    }
  });
