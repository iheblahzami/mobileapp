require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.saveBooking = functions.https.onRequest(async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Save to Firestore (Make.com will watch this collection)
    const docRef = await admin.firestore().collection("bookings").add({
      name: bookingData.name,
      need: bookingData.need,
      address: bookingData.address,
      date: bookingData.date,
      profession: bookingData.profession,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Booking saved with ID: ${docRef.id}`);
    res.status(200).send({ success: true, id: docRef.id });

  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});
