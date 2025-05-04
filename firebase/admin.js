//    try{const admin = require("firebase-admin");
//     // const serviceAccount = require("./serviceAccountKey.json");
//     const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

//     admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://sd2025law.firebaseio.com"
//     });} 
// catch (error) {
//     console.error("Firebase init error:", error);
//   }
// const db = admin.firestore();
// const auth = admin.auth();

// module.exports = { admin, db, auth };
const admin = require("firebase-admin");

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sd2025law.firebaseio.com",
  });
  console.log("✅ Firebase Admin setup completed");
} catch (error) {
  console.error("❌ Firebase Admin setup failed", error);
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };


