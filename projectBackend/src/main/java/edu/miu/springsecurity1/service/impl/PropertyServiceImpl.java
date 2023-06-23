package edu.miu.springsecurity1.service.impl;

import edu.miu.springsecurity1.entity.Property;
import edu.miu.springsecurity1.entity.dto.PropertyDto;
import edu.miu.springsecurity1.repository.PropertyRepo;
import edu.miu.springsecurity1.service.PropertyService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {
    private final PropertyRepo propertyRepo;
    @Autowired
    ModelMapper modelMapper;
    @Override
    public void save(PropertyDto p) {
        propertyRepo.save( modelMapper.map(p,Property.class));
    }

    @Override
    public void delete(int id) {
        propertyRepo.deleteById(id);
    }

    @Override
    public PropertyDto getById(int id) {
        return modelMapper.map(propertyRepo.findById(id),PropertyDto.class);
    }
    public List<PropertyDto> getAll() {
        var properties = propertyRepo.findAll();
        return
                properties
                        .stream()
                        .map( p -> modelMapper.map(p,PropertyDto.class))
                        .collect(Collectors.toList());
    }
}
