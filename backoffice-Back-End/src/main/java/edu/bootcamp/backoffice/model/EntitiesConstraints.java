package edu.bootcamp.backoffice.model;

public class EntitiesConstraints {
    public static final int USERNAME_MAX_LENGTH = 50;
    public static final int USERNAME_MIN_LENGTH = 5;
    public static final int PASSWORD_MAX_LENGTH = 72;
    public static final int PASSWORD_MIN_LENGTH = 5;

    public static final int CLIENTNAME_MAX_LENGTH = 50;

    public static final int CLIENTNAME_MIN_LENGTH = 1;

    public static final int CLIENTLASTNAME_MAX_LENGTH = 50;

    public static final int CLIENTLASTNAME_MIN_LENGTH = 1;

    public static final int CLIENTDNI_MIN = 1000000;

    public static final int CLIENTDNI_MAX = 999999999;

    public static final int CLIENTBUSSINESSNAME_MAX_LENGTH = 100;

    public static final long CLIENTCUIT_MIN = 1000000000L;

    public static final long CLIENTCUIT_MAX = 99999999999L;

    public static final long CLIENTPHONE_MIN = 1000000000L;

    public static final long CLIENTPHONE_MAX = 9999999999L;
    public static final int CLIENTADRESS_MAX_LENGTH = 100;
}
