package edu.miu.springsecurity1.controller;

import edu.miu.springsecurity1.entity.Offer;
import edu.miu.springsecurity1.entity.dto.OfferDto;
import edu.miu.springsecurity1.service.OfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/offer")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OfferController {
    private final OfferService offerService;

    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }
    @PostMapping
    public void save(@RequestBody OfferDto o) {
        offerService.save(o);
    }

    @GetMapping
    public List<OfferDto> getAll() {
        return offerService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OfferDto> getById(@PathVariable int id) {
        var offer = offerService.getById(id);
        return ResponseEntity.ok(offer);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        offerService.delete(id);
    }

    @GetMapping("/complete/{id}")
    public void completeOffer(@PathVariable int id){
        offerService.completeOffer(id);
    }

    @GetMapping("/updatecont/{id}")
    public void updateOfferCont(@PathVariable int id){
        offerService.updateOffertoCont(id);
    }

    @GetMapping("/cancel/{id}")
    public void cancelOffer(@PathVariable int id){
        offerService.cancelOfferByOwner(id);
    }

    @GetMapping("/reject/{id}")
    public void rejectOffer(@PathVariable int id){
        offerService.rejectOfferByOwner(id);
    }

    @GetMapping("/findby/{customerId}/{propertyId}")
    public ResponseEntity<OfferDto> getById(@PathVariable("customerId") int customerId, @PathVariable("propertyId") int propertyId) {
        var offer = offerService.getByCustomerIdandPropertyId(customerId, propertyId);
        return ResponseEntity.ok(offer);
    }

    @GetMapping("/findbycustomer/{customerId}")
    public List<OfferDto> getOffersbyCustomer(@PathVariable("customerId") int customerId) {
        return offerService.getOffersByCustomerId(customerId);
    }

    @GetMapping("/findbyproperty/{propertyId}")
    public List<OfferDto> getOffersByProperty(@PathVariable("propertyId") int propertyId) {
        return offerService.getOffersByPropertyId(propertyId);
    }

    @GetMapping("/findbyowner/{ownerId}")
    public List<OfferDto> getOffersByOwner(@PathVariable("ownerId") int ownerId) {
        return offerService.getOffersByOwnerId(ownerId);
    }

    @GetMapping("/history/{customerId}")
    public List<OfferDto> getHistoryOffers(@PathVariable("customerId") int customerId) {
        return offerService.getCustomerHistoryOffers(customerId);
    }



}
