package edu.miu.springsecurity1.repository;

import edu.miu.springsecurity1.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Integer> {
}
