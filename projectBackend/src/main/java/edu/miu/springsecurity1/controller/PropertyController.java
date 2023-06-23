package edu.miu.springsecurity1.controller;

import edu.miu.springsecurity1.entity.Property;
import edu.miu.springsecurity1.entity.dto.PropertyDto;
import edu.miu.springsecurity1.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/property")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PropertyController {
    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @PostMapping
    public void save(@RequestBody PropertyDto p) {
        propertyService.save(p);
    }

    @GetMapping
    public List<PropertyDto> getAll() {
        return propertyService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDto> getById(@PathVariable int id) {
        var property = propertyService.getById(id);
        return ResponseEntity.ok(property);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        propertyService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable("id") int propertyId) {
        //call service
    }
}
