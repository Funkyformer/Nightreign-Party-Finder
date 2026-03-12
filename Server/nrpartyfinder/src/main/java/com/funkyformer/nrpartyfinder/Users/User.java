package com.funkyformer.nrpartyfinder.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name="USERS")
@Data
public class User {
    @Id
    @NotNull
    @Column(length=30, unique=true)
    private String username;
    
    @NotNull
    @Column
    private String password;
    
    @Column(length=60)
    private String email;
}
