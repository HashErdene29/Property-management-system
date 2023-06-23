package edu.miu.springsecurity1.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "offer_history")
@Data
public class OfferHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "offer_id")
    private Offer offer;
}
