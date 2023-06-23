package edu.miu.springsecurity1.service.impl;

import edu.miu.springsecurity1.entity.Message;
import edu.miu.springsecurity1.entity.Offer;
import edu.miu.springsecurity1.entity.OfferHistory;
import edu.miu.springsecurity1.entity.Saved;
import edu.miu.springsecurity1.entity.dto.OfferDto;
import edu.miu.springsecurity1.entity.dto.SavedDto;
import edu.miu.springsecurity1.repository.MessageRepo;
import edu.miu.springsecurity1.repository.OfferRepo;
import edu.miu.springsecurity1.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {
    private final OfferRepo offerRepo;
    @Autowired
    ModelMapper modelMapper;
    @Override
    public void save(OfferDto p) {
        offerRepo.save( modelMapper.map(p, Offer.class));
    }

    @Override
    public void delete(int id) {
        offerRepo.deleteById(id);
    }

    @Override
    public OfferDto getById(int id) {
        return modelMapper.map(offerRepo.findById(id), OfferDto.class);
    }
    public List<OfferDto> getAll() {
        var offers = offerRepo.findAll();
        return
                offers
                        .stream()
                        .map( p -> modelMapper.map(p,OfferDto.class))
                        .collect(Collectors.toList());
    }

    public void completeOffer(int id){
        offerRepo.updateStatusByID(id);
    }

    public void updateOffertoCont(int id){
        offerRepo.updateStatusToContingent(id);
    }

    public void cancelOfferByOwner(int id){
        offerRepo.cancelContingent(id);
    }

    public void rejectOfferByOwner(int id){
        offerRepo.cancelOffer(id);
    }

    @Override
    public OfferDto getByCustomerIdandPropertyId(int customerId, int propertyId) {
        Optional<Offer> optionalOffer = offerRepo.findByCustomer_IdAndAndProperty_Id(customerId, propertyId);
        Offer offer = optionalOffer.orElse(null);

        if(offer == null){
            return null;
        }
        return modelMapper.map(offer, OfferDto.class);
//        return modelMapper.map(offerRepo.findByCustomer_IdAndAndProperty_Id(customerId, propertyId), OfferDto.class);
    }

    @Override
    public List<OfferDto> getCustomerHistoryOffers(int customerId) {
        List<Offer> optionalOffers = offerRepo.findCustomersHistory(customerId).orElse(Collections.emptyList());

        if(optionalOffers.isEmpty()){
            return null;
        }
        return
                optionalOffers
                        .stream()
                        .map( p -> modelMapper.map(p,OfferDto.class))
                        .collect(Collectors.toList());
//        return modelMapper.map(offerRepo.findByCustomer_IdAndAndProperty_Id(customerId, propertyId), OfferDto.class);
    }

    public List<OfferDto> getOffersByCustomerId(int customerId) {
        var offers = offerRepo.findByCustomer_Id(customerId);
        return
                offers
                        .stream()
                        .map( p -> modelMapper.map(p,OfferDto.class))
                        .collect(Collectors.toList());
    }

    public List<OfferDto> getOffersByPropertyId(int propertyId) {
        var offers = offerRepo.findByProperty_Id(propertyId);
        return
                offers
                        .stream()
                        .map( p -> modelMapper.map(p,OfferDto.class))
                        .collect(Collectors.toList());
    }

    public List<OfferDto> getOffersByOwnerId(int ownerId) {
        var offers = offerRepo.findByOwnerId(ownerId);
        return
                offers
                        .stream()
                        .map( p -> modelMapper.map(p,OfferDto.class))
                        .collect(Collectors.toList());
    }
}
