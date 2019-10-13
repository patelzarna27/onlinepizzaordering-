package com.onlinepizza.portal.exception;

public class Helper {

    public static long generateId(String strId)
    {
        StringBuilder sb = new StringBuilder();
        char[] letters = strId.toCharArray();
        for (char ch : letters) {
            sb.append((byte) ch);
        }
        return Long.parseLong(sb.toString());
    }
}
