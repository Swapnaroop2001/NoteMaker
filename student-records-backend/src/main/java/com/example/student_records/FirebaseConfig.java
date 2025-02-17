package com.example.student_records;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.FileInputStream;
import java.io.IOException;

public class FirebaseConfig {
    public static void initializeFirebase() throws IOException {
        // Load Firebase service account key
        FileInputStream serviceAccount = new FileInputStream("src/main/resources/shopswift-ff803-firebase-adminsdk-fbsvc-ac10f035c3.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        // Initialize Firebase only once
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
            System.out.println("Firebase Initialized Successfully");
        }
    }
}
