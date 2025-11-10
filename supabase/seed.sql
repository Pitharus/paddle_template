-- Insert sample customers
insert into public.customers (customer_id, email)
values
  ('cus_001', 'alice@example.com'),
  ('cus_002', 'bob@example.com'),
  ('cus_003', 'charlie@example.com'),
  ('cus_004', 'diana@example.com'),
  ('cus_005', 'eve@example.com');

-- Insert sample subscriptions
insert into public.subscriptions (
  subscription_id,
  subscription_status,
  price_id,
  product_id,
  scheduled_change,
  customer_id
)
values
  ('sub_001', 'active', 'price_basic', 'prod_001', null, 'cus_001'),
  ('sub_002', 'active', 'price_pro', 'prod_002', null, 'cus_002'),
  ('sub_003', 'trialing', 'price_trial', 'prod_001', 'scheduled_cancel', 'cus_003'),
  ('sub_004', 'paused', 'price_basic', 'prod_003', null, 'cus_004'),
  ('sub_005', 'canceled', 'price_enterprise', 'prod_004', null, 'cus_005');
