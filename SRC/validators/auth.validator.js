import { z } from 'zod';

export const signUpValidator = z.object({
    firstName: z.string(), 
    lastName: z.string(),  
    userName: z.string(),  
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" }) 
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) 
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) 
        .regex(/\d/, { message: "Password must contain at least one number" }) 
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" }), 
    email: z.string().email(), 
    phoneNumber: z.string(), 
    nationality: z.string(), 
    gender: z.string() 
}).required({ message: 'All fields are required!!!' }); 


export const signInValidator = z.object({
    loginID: z.string(), 
    password: z.string() 
}).required({ message: 'All fields are required!!!' }); 


//Product Validator

export const productValidator = z.object({
  name: z.string().min(1, { message: "Product name is required" }), 
  description: z.string().optional(), 
  price: z.number()
    .positive({ message: "Price must be a positive number" }), 
  category: z.string().min(1, { message: "Category is required" }),
  brand: z.string().optional(), 
  images: z.array(z.string().url()).optional(), 
  stock: z.number()
    .int({ message: "Stock must be an integer" })
    .min(0, { message: "Stock cannot be negative" }), 
  seller: z.string().min(1, { message: "Seller ID is required" }), 
  rating: z.number()
    .min(0, { message: "Rating cannot be less than 0" })
    .max(5, { message: "Rating cannot be more than 5" })
    .optional(), 
  reviews: z.array(z.object({
    userId: z.string().min(1, { message: "User ID is required" }),
    rating: z.number()
      .min(1, { message: "Review rating must be at least 1" })
      .max(5, { message: "Review rating cannot exceed 5" }),
    comment: z.string().optional(),
    createdAt: z.date().optional(),
  })).optional(),
}).required({ message: "All required product fields must be provided" });

//Order Validator

export const orderValidator = z.object({
    userId: z.string().min(1, { message: "User ID is required" }), 
    items: z.array(z.object({
      productId: z.string().min(1, { message: "Product ID is required" }), 
      quantity: z.number()
        .int({ message: "Quantity must be an integer" })
        .min(1, { message: "Quantity must be at least 1" }), 
      price: z.number()
        .positive({ message: "Price must be a positive number" }), 
    })).min(1, { message: "Order must contain at least one item" }), 
    totalAmount: z.number()
      .positive({ message: "Total amount must be a positive number" }), 
    shippingAddress: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
      country: z.string().optional(),
    }).optional(), // Shipping address fields are optional
    status: z.enum(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"])
      .default("Pending"), // Status must be one of the allowed values
    paymentStatus: z.enum(["Pending", "Completed", "Failed"])
      .default("Pending"), // Payment status must be one of the allowed values
    paymentMethod: z.enum(["Credit Card", "PayPal", "Bank Transfer", "Cash on Delivery"])
      .default("Credit Card"), // Payment method must be one of the allowed values
  }).required({ message: "All required order fields must be provided" });  
