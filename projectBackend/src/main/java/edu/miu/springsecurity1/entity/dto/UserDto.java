package edu.miu.springsecurity1.entity.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDto {
     int id;

     String email;
     String firstname;
     String lastname;
     int status;
     boolean isSend;
     RoleDto role;
}
