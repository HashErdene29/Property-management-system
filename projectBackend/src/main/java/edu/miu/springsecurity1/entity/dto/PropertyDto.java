package edu.miu.springsecurity1.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDto {
    private int id;
    private String name;
    private String description;
    private int bedNo;
    private int bathNo;
    private float sqft;
    private int garageNo;
    private int price;
    private AddressDto address;
    private UserDto owner;
}
