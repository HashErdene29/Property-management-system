package edu.miu.springsecurity1.repository;

import edu.miu.springsecurity1.entity.Message;
import edu.miu.springsecurity1.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OfferRepo extends JpaRepository<Offer, Integer> {
    List<Offer> findAll();

    Offer findById(int id);

    void deleteById(int id);

    Optional<Offer> findByCustomer_IdAndAndProperty_Id(int customerId, int propertyId);

    List<Offer> findByCustomer_Id(int customerId);

    List<Offer> findByProperty_Id(int propertyId);
    @Query("select o from Offer o where o.property.owner.id = :ownerId and (o.status = edu.miu.springsecurity1.entity.OfferStatus.PENDING OR o.status = edu.miu.springsecurity1.entity.OfferStatus.CONTINGENT)")
    List<Offer> findByOwnerId(int ownerId);

    @Modifying
    @Query("UPDATE Offer o SET o.status = edu.miu.springsecurity1.entity.OfferStatus.SOLD WHERE o.id = :id and o.status = edu.miu.springsecurity1.entity.OfferStatus.CONTINGENT")
    void updateStatusByID(int id);

    @Modifying
    @Query("UPDATE Offer o SET o.status = edu.miu.springsecurity1.entity.OfferStatus.CONTINGENT WHERE o.id = :id and o.status = edu.miu.springsecurity1.entity.OfferStatus.PENDING")
    void updateStatusToContingent(int id);

    @Modifying
    @Query("UPDATE Offer o SET o.status = edu.miu.springsecurity1.entity.OfferStatus.AVAILABLE WHERE o.id = :id and o.status = edu.miu.springsecurity1.entity.OfferStatus.CONTINGENT")
    void cancelContingent(int id);

    @Modifying
    @Query("UPDATE Offer o SET o.status = edu.miu.springsecurity1.entity.OfferStatus.REJECTED WHERE o.id = :id and o.status = edu.miu.springsecurity1.entity.OfferStatus.PENDING")
    void cancelOffer(int id);

    @Query("select o from Offer o where o.customer.id = :customerId and o.status = edu.miu.springsecurity1.entity.OfferStatus.SOLD")
    Optional<List<Offer>> findCustomersHistory(int customerId);
}
