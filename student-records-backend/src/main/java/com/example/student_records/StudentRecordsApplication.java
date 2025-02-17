package com.example.student_records;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class StudentRecordsApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentRecordsApplication.class, args);
		try {
			FirebaseConfig.initializeFirebase();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}

}
 