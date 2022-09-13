//package com.app.controller;
//
//import java.security.Principal;
//
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/products")
//public class ProductController {
//	// any one should be able view the products
//	@GetMapping("/view")
//	public String viewProducts() {
//		return "You are able to view the products , w/o authentication ....";
//	}
//
//	// customer should be able to purchase products
//	@GetMapping("/purchase")
//	public String purchaseProducts(Authentication auth) {
//		System.out.println(auth);
//		StringBuilder sb = new StringBuilder("Hello , ");
//		sb.append(auth.getName()).append("  you are logged in under ").append(auth.getAuthorities())
//				.append(" Proceed to purchasing of products ...");
//		return sb.toString();
//	}
//
//	// admin should be able to add the products
//	@GetMapping("/add")
//	public String addProducts() {
//		return "As admin , you will be able to add the products";
//	}
//
//	// only authenticated user (any role !) can browse the categories
//	@GetMapping("/categories")
//	public String browseCategories() {
//		return "Any Authenticated user(any role)  can browse through the categories";
//
//	}
//
//	@PreAuthorize("hasRole('ROLE_ADMIN')")
//	@GetMapping("/delete")
//	public String deleteProduct() {
//		return "As admin , you will be able to delete the products";
//
//	}
//
//}
