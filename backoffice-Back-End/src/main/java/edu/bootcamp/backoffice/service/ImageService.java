package edu.bootcamp.backoffice.service;

import edu.bootcamp.backoffice.model.image.ImageData;
import edu.bootcamp.backoffice.repository.ImageRepository;
import edu.bootcamp.backoffice.utils.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public String uploadImage(Integer userId, MultipartFile file) throws IOException {

        ImageData imageData = imageRepository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtil.compressImage(file.getBytes()))
                .userId(userId).build());
        if(imageData!=null){
            return ("Image uploaded successfully: " +
                    file.getOriginalFilename());
        }
        return null;
    }

    public String updateImage(Integer userId, MultipartFile file) throws IOException {
        ImageData image = imageRepository.findByUserId(userId);

        image.setName(file.getOriginalFilename());
        image.setType(file.getContentType());
        image.setImageData(ImageUtil.compressImage(file.getBytes()));

        imageRepository.save(image);

        if(image!=null){
            return ("Image updated successfully: " +
                    file.getOriginalFilename());
        }
        return null;
    }

    public ImageData getInfoByImageByName(String name) {
        Optional<ImageData> dbImage = imageRepository.findByName(name);

        return ImageData.builder()
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .imageData(ImageUtil.decompressImage(dbImage.get().getImageData()))
                .userId(dbImage.get().getUserId()).build();

    }

    public byte[] getImage(Integer userId) {
        ImageData dbImage = imageRepository.findByUserId(userId);
        if(dbImage == null){
            return null;
        }
        byte[] image = ImageUtil.decompressImage(dbImage.getImageData());
        return image;
    }

}
