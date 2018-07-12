package io.github.crawlerbot.config;

import io.github.simlife.config.SimlifeProperties;

import io.github.crawlerbot.gateway.ratelimiting.RateLimitingFilter;
import io.github.crawlerbot.gateway.accesscontrol.AccessControlFilter;
import io.github.crawlerbot.gateway.responserewriting.SwaggerBasePathRewritingFilter;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cloud.netflix.zuul.filters.RouteLocator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfiguration {

    @Configuration
    public static class SwaggerBasePathRewritingConfiguration {

        @Bean
        public SwaggerBasePathRewritingFilter swaggerBasePathRewritingFilter(){
            return new SwaggerBasePathRewritingFilter();
        }
    }

    @Configuration
    public static class AccessControlFilterConfiguration {

        @Bean
        public AccessControlFilter accessControlFilter(RouteLocator routeLocator, SimlifeProperties simLifeProperties){
            return new AccessControlFilter(routeLocator, simLifeProperties);
        }
    }

    /**
     * Configures the Zuul filter that limits the number of API calls per user.
     * <p>
     * This uses Bucket4J to limit the API calls, see {@link io.github.crawlerbot.gateway.ratelimiting.RateLimitingFilter}.
     */
    @Configuration
    @ConditionalOnProperty("simlife.gateway.rate-limiting.enabled")
    public static class RateLimitingConfiguration {

        private final SimlifeProperties simLifeProperties;

        public RateLimitingConfiguration(SimlifeProperties simLifeProperties) {
            this.simLifeProperties = simLifeProperties;
        }

        @Bean
        public RateLimitingFilter rateLimitingFilter() {
            return new RateLimitingFilter(simLifeProperties);
        }
    }
}
