package edu.miu.springsecurity1.service;

import edu.miu.springsecurity1.entity.User;
import edu.miu.springsecurity1.entity.dto.SavedDto;
import edu.miu.springsecurity1.entity.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAll();

//    User addUser(String email, String password, String firstname, String lastname, Integer role_id);
    void save(UserDto p);

    void delete(int id);

    UserDto getById(int id);

    String changeStatus(int id, boolean status);
    String sendReqApproval(int id);

    List<UserDto> getApprovalUsersList(int id);

}
