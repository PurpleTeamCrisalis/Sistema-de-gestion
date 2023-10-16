package edu.bootcamp.backoffice.model;

import edu.bootcamp.backoffice.model.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "userCrisalis")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

// Deje este atributo ya armado para cuando ya esten las orders armada
//    @OneToMany(mappedBy = "user",fetch = FetchType.EAGER)
//    private List<Order> orders = new ArrayList<>();

    public User (String username, String password){
        this.username = username;
        this. password = password;
    }
    public User (UserDTO userDTO){
        this.username = userDTO.getUsername();
        this.password = userDTO.getPassword();
    }

    public UserDTO toDTO(){
        return
                UserDTO
                        .builder()
                        .username(this.username)
                        .password(this.password)
                        .build();
    }
}
