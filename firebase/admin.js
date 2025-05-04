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
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  console.log("🔍 Raw JSON loaded from env:", raw ? "✅ Yes" : "❌ No");

  const serviceAccount = JSON.parse(raw);
  console.log("🔑 Parsed client email:", serviceAccount.client_email);
  console.log("🔑 Private key starts with:", serviceAccount.private_key?.substring(0, 30));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sd2025law.firebaseio.com",
  });
  console.log("✅ Firebase Admin initialized successfully");
} catch (error) {
  console.error("❌ Firebase Admin init FAILED:", error);
}


