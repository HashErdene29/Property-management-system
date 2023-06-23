package edu.miu.springsecurity1.service.impl;

import edu.miu.springsecurity1.entity.Message;
import edu.miu.springsecurity1.entity.Property;
import edu.miu.springsecurity1.entity.dto.MessageDto;
import edu.miu.springsecurity1.entity.dto.PropertyDto;
import edu.miu.springsecurity1.repository.MessageRepo;
import edu.miu.springsecurity1.service.MessageService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    private final MessageRepo messageRepo;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public void save(MessageDto p) {
        messageRepo.save( modelMapper.map(p, Message.class));
    }

    @Override
    public void delete(int id) {
        messageRepo.deleteById(id);
    }

    @Override
    public MessageDto getById(int id) {
        return modelMapper.map(messageRepo.findById(id), MessageDto.class);
    }
    public List<MessageDto> getAll() {
        var messages = messageRepo.findAll();
        return
                messages
                        .stream()
                        .map( p -> modelMapper.map(p,MessageDto.class))
                        .collect(Collectors.toList());
    }

    public List<MessageDto> getMessagesByOwner(int ownerId) {
        var messages = messageRepo.findMessageByOwnerId(ownerId);
        return
                messages
                        .stream()
                        .map( p -> modelMapper.map(p,MessageDto.class))
                        .collect(Collectors.toList());
    }
}
