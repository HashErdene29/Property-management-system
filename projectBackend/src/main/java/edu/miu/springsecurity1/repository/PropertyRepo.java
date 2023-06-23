package edu.miu.springsecurity1.repository;

import edu.miu.springsecurity1.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepo extends JpaRepository<Property, Integer> {
    List<Property> findAll();

    Property findById(int id);

    void deleteById(int id);
}
