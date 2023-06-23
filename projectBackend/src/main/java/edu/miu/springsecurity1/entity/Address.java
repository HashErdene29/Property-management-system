package edu.miu.springsecurity1.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String state;
    private String city;
    private String street;
    private int zipcode;

//    @OneToOne
//    private Property property;
}
