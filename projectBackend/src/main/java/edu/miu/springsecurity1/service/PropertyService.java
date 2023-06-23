package edu.miu.springsecurity1.service;

import edu.miu.springsecurity1.entity.Property;
import edu.miu.springsecurity1.entity.dto.PropertyDto;

import java.util.List;

public interface PropertyService {
    void save(PropertyDto p);

    void delete(int id);

    PropertyDto getById(int id);

    List<PropertyDto> getAll();
}
