package edu.bootcamp.backoffice.controller;

import edu.bootcamp.backoffice.model.client.dto.ClientResponse;
import edu.bootcamp.backoffice.model.client.dto.UpdateClientRequest;
import edu.bootcamp.backoffice.model.image.ImageData;
import edu.bootcamp.backoffice.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/{userId}")
    public ResponseEntity<?> uploadImage(
            @PathVariable("userId") Integer userId,
            @RequestParam("image") MultipartFile file) throws IOException {
        String response = imageService.uploadImage(userId, file);

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("/info/{name}")
    public ResponseEntity<?>  getImageInfoByName(@PathVariable("name") String name){
        ImageData image = imageService.getInfoByImageByName(name);

        return ResponseEntity.status(HttpStatus.OK)
                .body(image);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?>  getImageByUserId(@PathVariable("userId") Integer userId){
        byte[] image = imageService.getImage(userId);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }

    @PatchMapping(
            path = "/{userId}"
    )
    public ResponseEntity<?> updateClient(
            @PathVariable int userId,
            @RequestParam("image") MultipartFile file) throws IOException{
        String response = imageService.updateImage(userId, file);

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

}
