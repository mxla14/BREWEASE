// This file defines the database schema for reference
// You would implement these tables in your Supabase dashboard

/*
Table: products
- id: uuid (primary key)
- created_at: timestamp with time zone
- name: text
- description: text
- price: integer (in cents)
- image: text (URL)
- category: text
- details: text
- rating: numeric
- available: boolean

Table: orders
- id: uuid (primary key)
- created_at: timestamp with time zone
- user_id: uuid (foreign key to auth.users)
- status: text (pending, processing, completed, cancelled)
- total: integer (in cents)

Table: order_items
- id: uuid (primary key)
- created_at: timestamp with time zone
- order_id: uuid (foreign key to orders)
- product_id: uuid (foreign key to products)
- quantity: integer
- size: text
- notes: text
- price: integer (in cents)

Table: user_preferences
- id: uuid (primary key)
- created_at: timestamp with time zone
- user_id: uuid (foreign key to auth.users)
- preferences: jsonb (stores coffee preferences for BeanBot)
*/
