package com.example.lostfound.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.Ordered;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * Render commonly provides {@code DATABASE_URL} in the form:
 * {@code postgresql://user:pass@host:port/db?sslmode=require}
 *
 * Spring JDBC expects a {@code jdbc:postgresql://...} URL, so we convert it early
 * and also populate username/password when not explicitly set.
 */
public class DatabaseUrlEnvironmentPostProcessor implements EnvironmentPostProcessor, Ordered {

    private static final Logger log = LoggerFactory.getLogger(DatabaseUrlEnvironmentPostProcessor.class);

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        // If the user explicitly provides Spring's canonical vars, don't override.
        if (hasText(environment.getProperty("SPRING_DATASOURCE_URL"))) {
            return;
        }

        String databaseUrl = environment.getProperty("DATABASE_URL");
        if (!hasText(databaseUrl)) {
            return;
        }

        if (databaseUrl.startsWith("jdbc:")) {
            Map<String, Object> props = new HashMap<>();
            props.put("spring.datasource.url", databaseUrl);
            environment.getPropertySources().addFirst(new MapPropertySource("databaseUrl", props));
            log.info("Using DATABASE_URL as JDBC URL.");
            return;
        }

        URI uri;
        try {
            uri = URI.create(databaseUrl);
        } catch (Exception ignored) {
            return;
        }

        String scheme = uri.getScheme();
        if (!"postgres".equalsIgnoreCase(scheme) && !"postgresql".equalsIgnoreCase(scheme)) {
            return;
        }

        String host = uri.getHost();
        if (!hasText(host)) {
            return;
        }

        int port = uri.getPort() == -1 ? 5432 : uri.getPort();
        String dbName = uri.getPath() == null ? "" : uri.getPath().replaceFirst("^/", "");
        if (!hasText(dbName)) {
            return;
        }

        String username = null;
        String password = null;
        String userInfo = uri.getUserInfo();
        if (hasText(userInfo)) {
            String[] parts = userInfo.split(":", 2);
            username = urlDecode(parts[0]);
            if (parts.length > 1) {
                password = urlDecode(parts[1]);
            }
        }

        String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + "/" + dbName;
        if (hasText(uri.getQuery())) {
            jdbcUrl = jdbcUrl + "?" + uri.getQuery();
        }

        Map<String, Object> props = new HashMap<>();
        props.put("spring.datasource.url", jdbcUrl);

        if (!hasText(environment.getProperty("SPRING_DATASOURCE_USERNAME"))
                && !hasText(environment.getProperty("spring.datasource.username"))
                && hasText(username)) {
            props.put("spring.datasource.username", username);
        }
        if (!hasText(environment.getProperty("SPRING_DATASOURCE_PASSWORD"))
                && !hasText(environment.getProperty("spring.datasource.password"))
                && hasText(password)) {
            props.put("spring.datasource.password", password);
        }

        environment.getPropertySources().addFirst(new MapPropertySource("databaseUrl", props));
        log.info("Converted DATABASE_URL to JDBC URL for Spring datasource.");
    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }

    private static boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }

    private static String urlDecode(String value) {
        return URLDecoder.decode(value, StandardCharsets.UTF_8);
    }
}
