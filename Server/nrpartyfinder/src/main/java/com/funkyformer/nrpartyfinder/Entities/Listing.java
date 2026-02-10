package com.funkyformer.nrpartyfinder.Entities;

import java.time.ZonedDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="LISTINGS")
public class Listing {
    @Id
    @GeneratedValue
    private UUID listingID;

    @Column(length=20)
    @NotNull
    private String targets;
    
    @Column
    @NotNull
    private Boolean requireDLC;

    @Column
    @NotNull
    private String platform;

    @Column
    @NotNull
    private String username;

    @Column(length = 1024)
    private String description;

    @Column(length = 1024)
    private String instructions;

    @Column
    @NotNull
    private String char01;
    
    @Column
    private String char02;

    @Column
    private String char03;

    @Column
    @CreationTimestamp
    private ZonedDateTime creationTime;


    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append(listingID);
        builder.append(System.lineSeparator());
        builder.append(targets);
        builder.append(System.lineSeparator());
        builder.append(requireDLC);
        builder.append(System.lineSeparator());
        builder.append(username);
        builder.append(System.lineSeparator());
        builder.append(description);
        builder.append(System.lineSeparator());
        builder.append(instructions);
        builder.append(System.lineSeparator());
        builder.append(char01);
        builder.append(System.lineSeparator());
        builder.append(char02);
        builder.append(System.lineSeparator());
        builder.append(char03);
        builder.append(System.lineSeparator());
        builder.append(creationTime);
        builder.append(System.lineSeparator());
        return builder.toString();
    }
    

    public UUID getListingID() {
        return listingID;
    }

    public void setListingID(UUID listingID) {
        this.listingID = listingID;
    }

    public String getTargets() {
        return targets;
    }

    public void setTargets(String targets) {
        this.targets = targets;
    }

    public Boolean getRequireDLC() {
        return requireDLC;
    }

    public void setRequireDLC(Boolean requireDLC) {
        this.requireDLC = requireDLC;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getChar01() {
        return char01;
    }

    public void setChar01(String char01) {
        this.char01 = char01;
    }

    public String getChar02() {
        return char02;
    }

    public void setChar02(String char02) {
        this.char02 = char02;
    }

    public String getChar03() {
        return char03;
    }

    public void setChar03(String char03) {
        this.char03 = char03;
    }

    public String getPlatform() {
        return platform;
    }


    public void setPlatform(String platform) {
        this.platform = platform;
    }

}
