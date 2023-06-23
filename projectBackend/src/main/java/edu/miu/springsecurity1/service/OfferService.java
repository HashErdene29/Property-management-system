package edu.miu.springsecurity1.service;

import edu.miu.springsecurity1.entity.Offer;
import edu.miu.springsecurity1.entity.dto.OfferDto;

import java.util.List;

public interface OfferService {
    void save(OfferDto p);

    void delete(int id);

    OfferDto getById(int id);

    List<OfferDto> getAll();

    void completeOffer(int id);

    OfferDto getByCustomerIdandPropertyId(int customerid, int propertyId);

    List<OfferDto> getOffersByCustomerId(int customerId);
    List<OfferDto> getOffersByPropertyId(int propertyId);

    List<OfferDto> getOffersByOwnerId(int ownerId);

    void updateOffertoCont(int id);

    void cancelOfferByOwner(int id);

    void rejectOfferByOwner(int id);

    List<OfferDto> getCustomerHistoryOffers(int customerId);


}
