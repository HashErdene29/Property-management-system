package edu.miu.springsecurity1.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {
    private int id;
    private String state;
    private String city;
    private String street;
    private int zipcode;
}
