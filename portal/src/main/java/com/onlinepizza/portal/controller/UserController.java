package com.onlinepizza.portal.controller;

import com.onlinepizza.portal.Model.User;
import com.onlinepizza.portal.exception.Helper;
import com.onlinepizza.portal.exception.ResourceNotFoundException;
import com.onlinepizza.portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    /**
     * Get all users list.
     *
     * @return the list
     */
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    /**
     * Gets users by id.
     *
     * @param userId the user id
     * @return the users by id
     * @throws ResourceNotFoundException the resource not found exception
     */
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUsersById(@PathVariable(value = "id") Long userId)
            throws ResourceNotFoundException {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + userId));
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/users/validate")
    public  boolean validateUser(@Valid @RequestBody User user)
    {
        boolean bResult = false;
        /*if(user.getUserId().equalsIgnoreCase("java") == true) {
            if (user.getUserPassword().equalsIgnoreCase("password") == true)
                bResult = true;
        } */
        try {
            for (User myUser: userRepository.findAll()) {
                 if(myUser.getUserId().equalsIgnoreCase(user.getUserId().trim())){
                     if(myUser.getUserPassword().equals(user.getUserPassword())){
                         bResult = true;
                         break;
                     }
                 }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  bResult;
    }
    /**
     * Create user user.
     *
     * @param user the user
     * @return the user
     */
    @PostMapping("/users/save")
    public User createUser(@Valid @RequestBody User user) {
       // user.setId(Helper.generateId(user.getUserId()));
        return userRepository.save(user);
    }
    /**
     * Update user response entity.
     *
     * @param userId the user id
     * @param userDetails the user details
     * @return the response entity
     * @throws ResourceNotFoundException the resource not found exception
     */
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable(value = "id") Long userId, @Valid @RequestBody User userDetails)
            throws ResourceNotFoundException {
        userId = Helper.generateId(userDetails.getUserId());
        Long finalUserId = userId;
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + finalUserId));
        user.setEmail(userDetails.getEmail());
        user.setLastName(userDetails.getLastName());
        user.setFirstName(userDetails.getFirstName());
        user.setUpdatedAt(new Date());
        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }
    /**
     * Delete user map.
     *
     * @param userId the user id
     * @return the map
     * @throws Exception the exception
     */
    @DeleteMapping("/user/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") String userId) throws Exception {
        Long myId = Helper.generateId(userId);
        User user =
                userRepository
                        .findById(myId)
                        .orElseThrow(() -> new ResourceNotFoundException("User not found on :: " + userId));
        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}
