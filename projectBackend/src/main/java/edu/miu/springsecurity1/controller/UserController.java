package edu.miu.springsecurity1.controller;

import edu.miu.springsecurity1.entity.User;
import edu.miu.springsecurity1.entity.dto.UserDto;
import edu.miu.springsecurity1.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDto> getAll() {
        return userService.getAll();
    }


    @PostMapping
    public void save(@RequestBody UserDto u) {
        userService.save(u);
//        return userService.addUser(userDto.getEmail(), userDto.getPassword(), userDto.getFirstname(), userDto.getLastname(), userDto.getRole_id());
    }

    @GetMapping("/change/{id}/{status}")
    public ResponseEntity<String> changeStatus(@PathVariable int id, @PathVariable boolean status){
        String m = userService.changeStatus(id, status);
        return new ResponseEntity<>(m, HttpStatus.OK);
    }

    @GetMapping("/{id}/req-approval")
    public String sendReqApproval(@PathVariable int id){
        return userService.sendReqApproval(id);
    }

    @GetMapping("/{id}/approval-list")
    public List<UserDto> getUsersApprovalList(@PathVariable int id){
        return userService.getApprovalUsersList(id);
    }
}
