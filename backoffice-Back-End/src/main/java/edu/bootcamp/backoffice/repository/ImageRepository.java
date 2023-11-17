package edu.bootcamp.backoffice.repository;

import edu.bootcamp.backoffice.model.image.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<ImageData, Long> {

    Optional<ImageData> findByName(String fileName);

    ImageData findByUserUsername(String username);

}
