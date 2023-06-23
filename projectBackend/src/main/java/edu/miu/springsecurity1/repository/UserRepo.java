package edu.miu.springsecurity1.repository;

import edu.miu.springsecurity1.entity.Saved;
import edu.miu.springsecurity1.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    List<User> findAll();

    User findById(int id);

    void deleteById(int id);
    User findByEmail(String email);

    @Transactional
    @Modifying
    @Query("update User u set u.status = :status, u.isSend = false where u.id = :id and u.isSend = true")
    int updateStatusById(int id, int status);

    @Transactional
    @Modifying
    @Query("update User u set u.isSend = true where u.id = :id and u.status = 0")
    int updateReqStatus(int id);

    @Modifying
    @Query("select u from User u where u.id != :id and u.isSend = true and u.status = 0")
    List<User> findAllUsersSentApproval(int id);


}
