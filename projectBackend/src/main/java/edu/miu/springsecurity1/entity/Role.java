package edu.miu.springsecurity1.entity;

import lombok.Data;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Data
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String role;

    @OneToMany(mappedBy = "role")
    private List<User> users;
}
