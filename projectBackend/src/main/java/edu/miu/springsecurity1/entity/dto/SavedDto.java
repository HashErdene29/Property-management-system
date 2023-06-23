package edu.miu.springsecurity1.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavedDto {
    private int id;
    private UserDto customer;
    private PropertyDto property;
}
