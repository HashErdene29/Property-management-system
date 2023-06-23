package edu.miu.springsecurity1.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="seq")
    @SequenceGenerator(name = "seq", initialValue = 4)
    private int id;

    private String name;
    private String description;
    private int bedNo;
    private int bathNo;
    private float sqft;
    private int garageNo;
    private int price;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "property_id")
    private List<PropertyImg> property_images;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "property")
    private List<Offer> offers;

    @OneToMany(mappedBy = "property")
    private List<Message> messages;
}
