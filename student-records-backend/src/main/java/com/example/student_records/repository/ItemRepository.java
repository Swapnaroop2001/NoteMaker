package com.example.student_records.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.student_records.model.Item;
import java.util.List;

public interface ItemRepository extends MongoRepository<Item, String> {
    // Custom query method to find items by userId
    List<Item> findByUserId(String userId); // Example method
}
