

# Backend for Order Tracking — Mithila Bazaar

## Overview

Add a Lovable Cloud backend so every order is saved to a database, you receive an email notification per order, and you have an admin dashboard to view all orders.

## What You'll Get

- **Orders saved to database** — every checkout stores customer details, items, payment method, and totals
- **Email notification** — you receive an email each time someone places an order (with order details, customer name, address, and items)
- **Admin dashboard** (`/admin/orders`) — a password-protected page listing all orders with status, customer info, and order details

## Technical Plan

### 1. Enable Lovable Cloud
Set up Cloud backend (database, auth, edge functions).

### 2. Create Database Tables

**`orders` table:**
- id, customer_name, phone, address, pincode, city, state, payment_method, subtotal, shipping, discount, total, status (pending/confirmed/shipped/delivered), created_at

**`order_items` table:**
- id, order_id (FK → orders), product_name, product_image, weight, quantity, unit_price, total_price

RLS policies: insert for anonymous/authenticated, select only for admin role.

### 3. Update Checkout Page
On form submit, insert the order + items into Supabase, then invoke `send-transactional-email` to notify you (the store owner) with order details.

### 4. Set Up Email Notification
- Configure email domain
- Create a transactional email template ("new-order-notification") that includes order ID, customer name, phone, address, items list, and total
- Send to your configured store email on every order

### 5. Build Admin Orders Dashboard (`/admin/orders`)
- Simple login gate (admin email/password via Supabase Auth)
- Table view of all orders: date, order ID, customer, phone, total, status
- Click to expand and see order items
- Status dropdown to update order status (pending → confirmed → shipped → delivered)
- Basic filters: by status, date range

### 6. Add Route & Navigation
- Add `/admin/orders` route (no header/footer, standalone layout)
- Admin login page at `/admin`

## Pages Modified/Created

| File | Action |
|------|--------|
| `src/pages/Checkout.tsx` | Modified — save order to DB + trigger email |
| `src/pages/admin/Login.tsx` | New — admin login |
| `src/pages/admin/Orders.tsx` | New — orders dashboard |
| `src/App.tsx` | Modified — add admin routes |
| Supabase migration | New — orders + order_items tables |
| Edge function template | New — order notification email |

