package edu.miu.springsecurity1.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private int id;
    private String message;
    private UserDto customer;
    private UserDto owner;
    private PropertyDto property;
}
