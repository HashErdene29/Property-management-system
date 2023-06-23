package edu.miu.springsecurity1.service.impl;

import edu.miu.springsecurity1.entity.Message;
import edu.miu.springsecurity1.entity.Offer;
import edu.miu.springsecurity1.entity.Saved;
import edu.miu.springsecurity1.entity.dto.MessageDto;
import edu.miu.springsecurity1.entity.dto.OfferDto;
import edu.miu.springsecurity1.entity.dto.SavedDto;
import edu.miu.springsecurity1.repository.OfferRepo;
import edu.miu.springsecurity1.repository.SavedRepo;
import edu.miu.springsecurity1.service.SavedService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SavedServiceImpl implements SavedService {
    private final SavedRepo savedRepo;
    @Autowired
    ModelMapper modelMapper;
    @Override
    public void save(SavedDto p) {
        savedRepo.save( modelMapper.map(p, Saved.class));
    }

    @Override
    public void delete(int id) {
        savedRepo.deleteById(id);
    }

    @Override
    public SavedDto getById(int id) {
        return modelMapper.map(savedRepo.findById(id), SavedDto.class);
    }
    public List<SavedDto> getAll() {
        var savedList = savedRepo.findAll();
        return
                savedList
                        .stream()
                        .map( p -> modelMapper.map(p,SavedDto.class))
                        .collect(Collectors.toList());
    }

    @Override
    public SavedDto getByCustomerAndProperty(int customerId, int propertyId){
        Optional<Saved> optionalSaved = savedRepo.findByCustomer_IdAndAndProperty_Id(customerId, propertyId);
        Saved saved = optionalSaved.orElse(null);

        if(saved == null){
            return null;
        }
        return modelMapper.map(saved, SavedDto.class);
//        return savedRepo.findByCustomer_IdAndAndProperty_Id(customerId, propertyId);
    }
}
