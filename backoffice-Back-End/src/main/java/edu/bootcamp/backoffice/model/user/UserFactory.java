package edu.bootcamp.backoffice.model.user;

import edu.bootcamp.backoffice.model.user.dto.UpdateUserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserRequest;
import edu.bootcamp.backoffice.model.user.dto.UserResponse;
import edu.bootcamp.backoffice.utils.ImageUtil;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class UserFactory
{
    private static final String DEFAULT_IMAGE_PATH = "D:\\Documentos\\Bootcamp_Crisalis\\Workspace.springboot\\Sistema-de-gestion\\backoffice-Back-End\\src\\main\\java\\edu\\bootcamp\\backoffice\\model\\user\\user-no-image.png";
    public User CreateUserEntity(
            String username,
            String email,
            String password
        ) throws IOException {
        byte[] defaultImageBytes = loadDefaultImage();

        return User
                .builder()
                .username(username)
                .email(email)
                .password(password)
                .enabled(true)
                .imageData(ImageUtil.compressImage(defaultImageBytes))
                .build();
    }

    public User CreateEntityForInsertNewRecord(UserRequest userDTO) throws IOException {
        byte[] defaultImageBytes = loadDefaultImage();

        return User
                .builder()
                .username(userDTO.getUsername())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .enabled(true)
                .imageData(ImageUtil.compressImage(defaultImageBytes))
                .build();
    }

    public UserResponse createResponse(User user){
        return UserResponse
            .builder()
            .username(user.getUsername())
            .email(user.getEmail())
            .enabled(user.isEnabled())
            .id(user.getId())
            .build();
    }

    private byte[] loadDefaultImage() throws IOException {
        Path path = Paths.get(DEFAULT_IMAGE_PATH);
        return Files.readAllBytes(path);
    }
}