package edu.miu.springsecurity1.controller;

import edu.miu.springsecurity1.entity.Saved;
import edu.miu.springsecurity1.entity.dto.SavedDto;
import edu.miu.springsecurity1.service.SavedService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/saved")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SavedController {
    private final SavedService savedService;

    public SavedController(SavedService savedService) {
        this.savedService = savedService;
    }
    @PostMapping
    public void save(@RequestBody SavedDto s) {
        savedService.save(s);
    }

    @GetMapping
    public List<SavedDto> getAll() {
        return savedService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SavedDto> getById(@PathVariable int id) {
        var saved = savedService.getById(id);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        savedService.delete(id);
    }

    @GetMapping("/getby/{customerId}/{propertyId}")
    public ResponseEntity<SavedDto> getbyCustomerandProperty(@PathVariable("customerId") int customerId, @PathVariable("propertyId") int propertyId) {
        var saved = savedService.getByCustomerAndProperty(customerId, propertyId);
        return ResponseEntity.ok(saved);
    }
}
