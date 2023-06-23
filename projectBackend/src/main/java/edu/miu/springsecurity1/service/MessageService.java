package edu.miu.springsecurity1.service;

import edu.miu.springsecurity1.entity.Message;
import edu.miu.springsecurity1.entity.dto.MessageDto;

import java.util.List;

public interface MessageService {
    void save(MessageDto p);

    void delete(int id);

    MessageDto getById(int id);

    List<MessageDto> getAll();
    List<MessageDto> getMessagesByOwner(int ownerId);
}
