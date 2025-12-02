# 🧵 NovaWear – Modern Clothing Brand Web Application
*A full-stack e-commerce demo built with React + Vite, ASP.NET Core, TailwindCSS, and Botpress AI Assistance.*

---

## 🚀 Overview

NovaWear is a modern clothing brand web application designed to demonstrate an intuitive and visually appealing online shopping experience. It is built using:

- **React (Vite)** for a fast, responsive frontend  
- **ASP.NET Core Web API** for backend product data and future extensions  
- **TailwindCSS** for styling  
- **React Router** for navigation  
- **CartContext** for global cart state + `localStorage` persistence  
- **Botpress AI Chat Bubble** integrated directly into the site  
- **Modular component structure** for scalability  

The app showcases a complete browsing flow including a hero section, seasonal catalog, filters, a shopping cart, product detail pages, and AI assistance.

---

## ✨ Features

### 🛍️ Product Catalog
- Dynamic product listings fetched from the ASP.NET backend  
- Seasonal filters (Summer, Spring, Fall, Winter)  
- Price range filters (Under $50, $50–$100, $100–$200, $200+)  
- Product images and descriptions  
- “View All” and “Shop Now” navigation  

### 🎯 Product Detail Page
- View a single product by ID (`/product/{id}`)  
- Full description, image, tags  
- Add to cart directly from detail page  

### 🛒 Shopping Cart
- Global cart powered by **CartContext**  
- Add/remove items  
- Quantity handling and subtotal  
- Cart icon with total item count  
- Persistent storage using `localStorage`  
- Clean dropdown UI  

### 🧠 Botpress AI Assistant
- Automatically injected chat bubble  
- Helps users with clothing recommendations and support  
- Fully customizable through the Botpress dashboard  

### 📱 Responsive UI
- Built with TailwindCSS  
- Mobile-friendly layout for catalog, filters, and product pages  

---

## 🏗️ Tech Stack

### **Frontend**
- React (Vite)
- React Router
- TailwindCSS
- React Icons
- CartContext (custom state management)

### **Backend**
- ASP.NET Core Web API  
- CORS enabled for frontend communication  
- **products.json** file used as data store  
- ProductRepository abstraction for future database upgrade  

### **AI Assistant**
- Botpress Webchat v3  
- Deployed into site via script injection
