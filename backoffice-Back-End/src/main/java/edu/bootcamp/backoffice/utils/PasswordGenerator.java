package edu.bootcamp.backoffice.utils;


import java.security.SecureRandom;

public class PasswordGenerator {
    private static final String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String CHAR_UPPER = CHAR_LOWER.toUpperCase();
    private static final String NUMBER = "0123456789";
    private static final String SPECIAL_CHAR = "@#$%&_-";

    private static final String DATA_FOR_RANDOM_STRING = CHAR_LOWER + CHAR_UPPER + NUMBER + SPECIAL_CHAR;
    private static final SecureRandom random = new SecureRandom();

    public static String generateRandomPassword(int length) {
        if (length < 1) {
            throw new IllegalArgumentException("La longitud de la contraseña debe ser al menos 1 carácter.");
        }

        StringBuilder password = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomCharIndex = random.nextInt(DATA_FOR_RANDOM_STRING.length());
            password.append(DATA_FOR_RANDOM_STRING.charAt(randomCharIndex));
        }
        return password.toString();
    }
}
