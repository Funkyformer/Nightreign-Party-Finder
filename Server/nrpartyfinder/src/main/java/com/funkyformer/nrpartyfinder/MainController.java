package com.funkyformer.nrpartyfinder;

import com.funkyformer.nrpartyfinder.Listings.*;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;


import java.util.List;


@RestController
@CrossOrigin(origins = {"${settings.cors_origin}","${settings.cors_origin_2}"})
@RequestMapping("/nrpartyfinder")
public class MainController {
    private final ListingRepository repository;

    public MainController(ListingRepository repository) {
        this.repository = repository;
    }
    
    @PostMapping("/add")
    public Listing createListing(@Valid @RequestBody Listing listing) {
        // System.out.println(listing.toString());
        Listing ret = repository.save(listing);
        System.out.print(ret.toString());
        return ret;
    }
    
    @GetMapping("/listings")
    public List<Listing> getAllEmployees(
        @RequestParam(required=false) Integer plat,
        @RequestParam(required=false) Boolean dlc,
        @RequestParam(required=false) Boolean duo,
        @RequestParam(required=false) String wl,
        @RequestParam(required=false) String bl,
        @RequestParam(required=false) String depth) {

        Specification<Listing> spec = Specification.unrestricted();

        if (plat != null) {
            spec = spec.and(ListingSpecification.isPlat(plat));
        }

        if (dlc != null && dlc) {
            spec = spec.and(ListingSpecification.reqDLC(dlc));
        }

        if (duo != null && duo) {
            spec = spec.and(ListingSpecification.reqSlots(duo));
        }

        if (bl != null) {
            spec = spec.and(ListingSpecification.excludes(bl));
        }

        if (wl != null || depth != null) {
            Specification<Listing> sub1 = Specification.unrestricted();
            Specification<Listing> sub2 = Specification.unrestricted();
            if (wl != null) {
                sub1 = sub1.and(ListingSpecification.includes(wl));
            }
            if (depth != null) {
                sub2 = sub2.and(ListingSpecification.isDepth(depth));
            }
            if (wl != null && depth != null) {
                spec = spec.and(sub1.or(sub2));
            } else {
                spec = spec.and(sub1).and(sub2);
            }
        }

        return repository.findAll(spec);
    }  
}
