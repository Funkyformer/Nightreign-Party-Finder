package com.funkyformer.nrpartyfinder.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.funkyformer.nrpartyfinder.Entities.Listing;
import com.funkyformer.nrpartyfinder.Repositories.ListingRepository;

import jakarta.validation.Valid;


import java.util.List;


@RestController
@RequestMapping("/nrpartyfinder")
public class MainController {
    private final ListingRepository repository;

    public MainController(ListingRepository repository) {
        this.repository = repository;
    }
    
    @CrossOrigin(origins = {"${settings.cors_origin}"})
    @PostMapping("/add")
    public Listing createListing(@Valid @RequestBody Listing listing) {
        // System.out.println(listing.toString());
        Listing ret = repository.save(listing);
        System.out.print(ret.toString());
        return ret;
    }
    
    @CrossOrigin(origins = {"${settings.cors_origin}"})
    @GetMapping("/all")
    public List<Listing> getAllEmployees() {
        return repository.findAll();
    }  
}
