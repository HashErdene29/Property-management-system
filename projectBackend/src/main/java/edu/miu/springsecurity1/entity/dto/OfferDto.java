package edu.miu.springsecurity1.entity.dto;

import edu.miu.springsecurity1.entity.OfferStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OfferDto {
    private int id;
    private OfferStatus status;
    private UserDto customer;
    private PropertyDto property;
}
