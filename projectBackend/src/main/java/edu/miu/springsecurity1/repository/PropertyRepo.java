package edu.miu.springsecurity1.repository;

import edu.miu.springsecurity1.entity.OfferStatus;
import edu.miu.springsecurity1.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepo extends JpaRepository<Property, Integer> {
    List<Property> findAll();

    Property findById(int id);

    List<Property> findAllByOffers_StatusNot(OfferStatus status);

    void deleteById(int id);

    @Modifying
    @Query("update Property p set p.name = :name, p.price = :price, p.description = :description where p.id = :id" )
    void updatePropertyById(int id, String name, int price, String description);

    List<Property> findPropertiesByOwnerId(int ownerId);
}
