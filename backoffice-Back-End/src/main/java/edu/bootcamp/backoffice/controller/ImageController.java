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

    @PostMapping("/{userUsername}")
    public ResponseEntity<?> uploadImage(
            @PathVariable("userUsername") String userUsername,
            @RequestParam("image") MultipartFile file) throws IOException {
        String response = imageService.uploadImage(userUsername, file);

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("/info/{name}")
    public ResponseEntity<?>  getImageInfoByName(@PathVariable("name") String name){
        ImageData image = imageService.getInfoByImageByName(name);

        return ResponseEntity.status(HttpStatus.OK)
                .body(image);
    }

    @GetMapping("/{userUsername}")
    public ResponseEntity<?>  getImageByUserUsername(@PathVariable("userUsername") String userUsername){
        byte[] image = imageService.getImage(userUsername);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }

    @PatchMapping(
            path = "/{userUsername}"
    )
    public ResponseEntity<?> updateImage(
            @PathVariable("userUsername") String userUsername,
            @RequestParam("image") MultipartFile file) throws IOException{
        String response = imageService.updateImage(userUsername, file);

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @PatchMapping(
            path = "/update/{userUsername}"
    )
    public ResponseEntity<?> updateImageUsername(
            @PathVariable("userUsername") String userUsername,
            @RequestParam("newUserUsername") String newUserUsername) throws IOException{
        String response = imageService.updateImageUsername(userUsername, newUserUsername);

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

}
