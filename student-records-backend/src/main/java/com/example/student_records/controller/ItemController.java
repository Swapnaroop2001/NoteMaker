package com.example.student_records.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.student_records.model.Item;
import com.example.student_records.repository.ItemRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemRepository repository;

    // Create a new item
    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        Item savedItem = repository.save(item);
        return ResponseEntity.ok(savedItem);
    }

    // Update item by id
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable String id, @RequestBody Item item) {
        return repository.findById(id)
                .map(existingItem -> {
                    existingItem.setName(item.getName());
                    existingItem.setDescription(item.getDescription());
                    existingItem.setUserId(item.getUserId());
                    Item updatedItem = repository.save(existingItem);
                    return ResponseEntity.ok(updatedItem);
                }).orElse(ResponseEntity.notFound().build());
    }

    // Get all items or items by userId
    @GetMapping("/")
    public ResponseEntity<?> getItems(@RequestParam(required = false) String userId) {
        if (userId != null) {
            List<Item> items = repository.findByUserId(userId);
            return ResponseEntity.ok(items);
        } else {
            return ResponseEntity.ok(repository.findAll());
        }
    }

    // Get items by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Item>> getItemsByUserId(@PathVariable String userId) {
        List<Item> items = repository.findByUserId(userId);
        return ResponseEntity.ok(items);
    }

    // Delete item by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable String id) {
        return repository.findById(id)
                .map(item -> {
                    repository.delete(item);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }

}