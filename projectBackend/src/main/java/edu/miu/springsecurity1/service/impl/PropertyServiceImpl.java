package edu.miu.springsecurity1.service.impl;

import edu.miu.springsecurity1.entity.Offer;
import edu.miu.springsecurity1.entity.OfferStatus;
import edu.miu.springsecurity1.entity.Property;
import edu.miu.springsecurity1.entity.Saved;
import edu.miu.springsecurity1.entity.dto.PropertyDto;
import edu.miu.springsecurity1.repository.OfferRepo;
import edu.miu.springsecurity1.repository.PropertyRepo;
import edu.miu.springsecurity1.repository.SavedRepo;
import edu.miu.springsecurity1.service.PropertyService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {
    private final PropertyRepo propertyRepo;
    private final SavedRepo savedRepo;
    private final OfferRepo offerRepo;
    @Autowired
    ModelMapper modelMapper;
    @Override
    public void save(PropertyDto p) {
        propertyRepo.save( modelMapper.map(p,Property.class));
    }

    @Override
    public void updatePropertyById(int id, String name, int price, String description){
        propertyRepo.updatePropertyById(id, name, price, description);
    }

    @Override
    public String delete(int id) {
        Property p = propertyRepo.findById(id);
        List<Offer> offers = p.getOffers();
        for (Offer offer : offers) {
            if (offer.getStatus() == OfferStatus.PENDING) {
//                throw new IllegalStateException("Cannot delete property with pending offers");
                return "Cannot delete property with pending offers";
            }
        }
        List<Saved> savedlist = savedRepo.findByProperty_Id(id);
        savedRepo.deleteAll(savedlist);
        propertyRepo.deleteById(id);

        return "Successfully completed";
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

    @Override
    public List<PropertyDto> getAllExceptSold() {
        var ps =  propertyRepo.findAllByOffers_StatusNot(OfferStatus.SOLD);
        return
                ps
                        .stream()
                        .map( p -> modelMapper.map(p,PropertyDto.class))
                        .collect(Collectors.toList());
    }

    public List<PropertyDto> getAllByOwnerId(int ownerId) {
        var properties = propertyRepo.findPropertiesByOwnerId(ownerId);
        return
                properties
                        .stream()
                        .map( p -> modelMapper.map(p,PropertyDto.class))
                        .collect(Collectors.toList());
    }

}
