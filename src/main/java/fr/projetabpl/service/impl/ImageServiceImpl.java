package fr.projetabpl.service.impl;

import fr.projetabpl.service.ImageService;
import fr.projetabpl.domain.Image;
import org.hibernate.cfg.NotYetImplementedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Image.
 */
@Service
@Transactional
public class ImageServiceImpl implements ImageService {

    private final Logger log = LoggerFactory.getLogger(ImageServiceImpl.class);

//    private final ImageRepository imageRepository;

//    public ImageServiceImpl(ImageRepository imageRepository) {
//        this.imageRepository = imageRepository;
//    }

    /**
     * Save a image.
     *
     * @param image the entity to save
     * @return the persisted entity
     */
    @Override
    public Image save(Image image) {
        log.debug("Request to save Image : {}", image);
        throw new NotYetImplementedException();
//        return imageRepository.save(image);
    }

    /**
     * Get all the images.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Image> findAll() {
        log.debug("Request to get all Images");
      throw new NotYetImplementedException();
//        return imageRepository.findAll();
    }


    /**
     * Get one image by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Image> findOne(Long id) {
        log.debug("Request to get Image : {}", id);
      throw new NotYetImplementedException();
//        return imageRepository.findById(id);
    }

    /**
     * Delete the image by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Image : {}", id);
      throw new NotYetImplementedException();
//        imageRepository.deleteById(id);
    }
}
