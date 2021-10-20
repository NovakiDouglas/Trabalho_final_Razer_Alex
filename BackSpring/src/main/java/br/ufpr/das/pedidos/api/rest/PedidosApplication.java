package br.ufpr.das.pedidos.api.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class PedidosApplication {

	public static void main(String[] args) {
		SpringApplication.run(PedidosApplication.class, args);
	}



	@Bean
	public WebMvcConfigurer corsConfigurer(){
		return  new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:333/","http://localhost:333","http://localhost:4200/","http://localhost:54060", "http://localhost:8080", "http://localhost:4200/");
			}
		};
	}

}
