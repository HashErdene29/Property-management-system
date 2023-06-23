package edu.miu.springsecurity1.repository;

import edu.miu.springsecurity1.entity.Message;
import edu.miu.springsecurity1.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message, Integer> {
    List<Message> findAll();

    Message findById(int id);

    void deleteById(int id);

    List<Message> findMessageByOwnerId(int ownerId);
}
