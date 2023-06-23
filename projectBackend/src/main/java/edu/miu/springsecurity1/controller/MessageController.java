package edu.miu.springsecurity1.controller;

import edu.miu.springsecurity1.entity.Message;
import edu.miu.springsecurity1.entity.dto.MessageDto;
import edu.miu.springsecurity1.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/message")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public void save(@RequestBody MessageDto m) {
        messageService.save(m);
    }

    @GetMapping
    public List<MessageDto> getAll() {
        return messageService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MessageDto> getById(@PathVariable int id) {
        var message = messageService.getById(id);
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        messageService.delete(id);
    }

    @GetMapping("/findby/{ownerId}")
    public List<MessageDto> getMessagesByOwnerId(@PathVariable int ownerId) {
        return messageService.getMessagesByOwner(ownerId);
    }

}
