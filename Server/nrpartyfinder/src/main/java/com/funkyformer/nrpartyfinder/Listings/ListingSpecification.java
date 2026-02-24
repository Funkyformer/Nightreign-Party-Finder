package com.funkyformer.nrpartyfinder.Listings;

import java.util.ArrayList;

import org.springframework.data.jpa.domain.Specification;

public class ListingSpecification {
    
    public static Specification<Listing> isPlat(Integer platform) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("platform"), platform);
    }

    public static Specification<Listing> reqDLC(Boolean requiredlc) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("requiredlc"), requiredlc);
    }

    public static Specification<Listing> reqSlots(Boolean duoQueue) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isNull(root.get("char02"));
    }

    public static Specification<Listing> isDepth(String depth) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("targets"), depth);
    }

    public static Specification<Listing> includes(String targets) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isTrue(
            criteriaBuilder.function(
                "custom_regex", Boolean.class, root.get("targets"), criteriaBuilder.literal(targets)));
    }

    public static Specification<Listing> excludes(String targets) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isTrue(
            criteriaBuilder.function(
                "custom_regex", Boolean.class, root.get("targets"), criteriaBuilder.literal(targets))).not();
    }
}
