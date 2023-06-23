package edu.miu.springsecurity1.service;

import edu.miu.springsecurity1.entity.Saved;
import edu.miu.springsecurity1.entity.dto.SavedDto;

import java.util.List;

public interface SavedService {
    void save(SavedDto p);

    void delete(int id);

    SavedDto getById(int id);

    List<SavedDto> getAll();

    SavedDto getByCustomerAndProperty(int customerId, int propertyId);
}
