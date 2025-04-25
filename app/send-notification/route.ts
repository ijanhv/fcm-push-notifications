import admin from "firebase-admin";
import { Message } from "firebase-admin/messaging";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT!);

  // const serviceAccount = require("@/service-account.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: NextRequest) {
  const { token, title, message, link } = await request.json();
  console.log("Received data:", { token, title, message, link });
  const payload: Message = {
    token,
    notification: {
      title: title,
      body: message,
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    await admin.messaging().send(payload);

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}


// cuVNmnkKA9K-PYbBSE1ORD:APA91bFdjwEbLUVv49igfp6n2ol6m4z7aLzMUJWPilcpGZXVBTctU99J5IEdar8WRJmd2EyMFJXWNmyIqaut_8qn3O_uc4OvjXPHvbapeRTnchQdOG8kKSk