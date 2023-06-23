package edu.miu.springsecurity1.repository;

import edu.miu.springsecurity1.entity.Offer;
import edu.miu.springsecurity1.entity.Saved;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedRepo extends JpaRepository<Saved, Integer> {
    List<Saved> findAll();

    Saved findById(int id);

    void deleteById(int id);

    Optional<Saved> findByCustomer_IdAndAndProperty_Id(int customerId, int propertyId);

    List<Saved> findByProperty_Id(int property_id);
}
