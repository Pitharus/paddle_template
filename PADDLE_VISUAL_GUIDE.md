# 🎯 Paddle Sandbox - Visual Step-by-Step Guide

This guide provides exact navigation paths for setting up Paddle Sandbox.

## 📍 Step 1: Access Paddle Sandbox

```
🌐 Open browser → https://sandbox-vendors.paddle.com
```

**First time?**
- Click **"Sign Up"**
- Enter email & password
- Verify email
- Complete onboarding

**Returning user?**
- Click **"Log In"**
- Enter credentials

---

## 📍 Step 2: Get Server-Side API Key

### Navigation Path:
```
Dashboard → Left Sidebar → Developer Tools → Authentication → API Keys tab
```

### Steps:
1. Click **"Generate New API Key"** (or use existing)
2. (Optional) Give it a name: "Development Key"
3. (Optional) Select permissions (default: all)
4. Click **"Create"** or **"Generate"**
5. **COPY THE KEY** (starts with `apikey_`)
   - ⚠️ You can only see it once!
   - Store it safely

### Add to .env:
```bash
PADDLE_API_KEY=apikey_01k9kc4wen8y4t4r39wztnfaa0
```

---

## 📍 Step 3: Get Client-Side Token

### Navigation Path:
```
Dashboard → Left Sidebar → Developer Tools → Authentication → Client-side tokens tab
```

### Steps:
1. You should see a default token already created
2. If not, click **"Generate New Token"**
3. **COPY THE TOKEN** (starts with `test_`)

### Add to .env:
```bash
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_3da4fab7f1ca48b9d4184d960e6
```

---

## 📍 Step 4: Create a Product

### Navigation Path:
```
Dashboard → Left Sidebar → Catalog → Products → "+ Add Product" button
```

### Steps:
1. Click **"+ Add Product"** (top right)
2. Fill in the form:
   ```
   Product name:        Pro Plan
   Description:         Full access to all features
   Image:              (optional) Upload product image
   Tax category:        Standard
   Custom data:         (optional) Add metadata
   ```
3. Click **"Save Product"**
4. You'll see your new product in the list

---

## 📍 Step 5: Add Price to Product

### Navigation Path:
```
Dashboard → Catalog → Products → [Your Product] → "+ Add Price" button
```

### Steps:
1. Click on your product from the list
2. Scroll to **"Prices"** section
3. Click **"+ Add Price"**
4. Configure the price:

   **For One-Time Payment:**
   ```
   Billing type:        One-time
   Amount:              9.99
   Currency:            USD
   Trial period:        None
   ```

   **For Subscription:**
   ```
   Billing type:        Recurring
   Billing period:      Monthly (or Yearly)
   Amount:              9.99
   Currency:            USD
   Trial period:        7 days (optional)
   ```

5. Click **"Save Price"**
6. **COPY THE PRICE ID** from the list (starts with `pri_`)
   ```
   Example: pri_01k9kc4wen8y4t4r39wztnfaa0
   ```

---

## 📍 Step 6: Configure Webhooks (Optional)

### Navigation Path:
```
Dashboard → Left Sidebar → Developer Tools → Notifications → "+ Add endpoint" button
```

### Steps:
1. Click **"+ Add endpoint"**
2. Enter webhook URL:
   
   **For Production:**
   ```
   https://yourdomain.com/api/webhook
   ```
   
   **For Local Development (use ngrok):**
   ```bash
   # Terminal 1: Start your app
   npm run dev
   
   # Terminal 2: Start ngrok
   ngrok http 3000
   
   # Copy the ngrok URL, e.g.:
   # https://abc123.ngrok.io
   ```
   Then enter:
   ```
   https://abc123.ngrok.io/api/webhook
   ```

3. Select events to subscribe to:
   - ✅ `transaction.completed`
   - ✅ `transaction.updated`
   - ✅ `subscription.created`
   - ✅ `subscription.updated`
   - ✅ `subscription.canceled`
   - ✅ `subscription.past_due`

4. Click **"Save Endpoint"**
5. Click on your endpoint to view details
6. **COPY THE WEBHOOK SECRET** (starts with `pdl_ntfset_`)

### Add to .env:
```bash
PADDLE_NOTIFICATION_WEBHOOK_SECRET=pdl_ntfset_xxxxxxxxxxxxxxxxxxxxx
```

---

## 📍 Step 7: Test the Integration

### 1. Update Your .env File

Make sure you have all required values:

```bash
# Paddle Configuration
NEXT_PUBLIC_PADDLE_ENV=sandbox
PADDLE_API_KEY=apikey_01k9kc4wen8y4t4r39wztnfaa0
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_3da4fab7f1ca48b9d4184d960e6
PADDLE_NOTIFICATION_WEBHOOK_SECRET=pdl_ntfset_xxxxxxxxxxxxxxxxxxxxx
```

### 2. Start Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

### 3. Open Checkout Page

Navigate to:
```
http://localhost:3000/checkout/pri_YOUR_PRICE_ID
```

Replace `pri_YOUR_PRICE_ID` with the actual price ID you copied in Step 5.

Example:
```
http://localhost:3000/checkout/pri_01k9kc4wen8y4t4r39wztnfaa0
```

### 4. Complete Test Purchase

**Use Paddle Test Card:**
```
Card Number:     4242 4242 4242 4242
Expiry Date:     12/25 (any future date)
CVV:             123 (any 3 digits)
Cardholder:      Test User
ZIP/Postal:      12345 (any 5 digits)
```

Click **"Pay"** or **"Subscribe"**

### 5. Verify Success

1. You should be redirected to success page
2. Check Paddle Dashboard:
   ```
   Dashboard → Transactions
   ```
   Your test transaction should appear here

3. If webhooks configured, check your terminal for webhook events

---

## 📍 Step 8: View Your Data

### View Transactions:
```
Dashboard → Left Sidebar → Transactions
```

### View Subscriptions:
```
Dashboard → Left Sidebar → Customers → Subscriptions
```

### View Customers:
```
Dashboard → Left Sidebar → Customers → All customers
```

### View Events Log:
```
Dashboard → Left Sidebar → Developer Tools → Events & logs
```
This shows all API calls and webhook events in real-time.

---

## 🔍 Troubleshooting Navigation

### "I can't find Developer Tools"
- Make sure you're logged into **sandbox-vendors.paddle.com** (not production)
- Look at the left sidebar
- Developer Tools should be near the bottom

### "I don't see API Keys tab"
- Click on **Developer Tools** first
- Then click **Authentication**
- You should see two tabs: **API Keys** and **Client-side tokens**

### "Where are my Price IDs?"
```
Dashboard → Catalog → Products → [Click on product] → Scroll to "Prices" section
```
Price IDs are shown in the list next to each price.

### "Webhook endpoint not receiving events"
1. Check URL is publicly accessible (use ngrok for local)
2. Verify endpoint is **Active** in Notifications page
3. Check Events & logs for delivery attempts
4. Test with Paddle's webhook testing tool

---

## 📊 Dashboard Overview

```
Paddle Sandbox Dashboard
├── 📊 Dashboard (Home)
│   └── Overview & metrics
│
├── 💰 Transactions
│   ├── All transactions
│   ├── Checkouts
│   └── Invoices
│
├── 👥 Customers
│   ├── All customers
│   ├── Subscriptions
│   └── Reports
│
├── 📦 Catalog
│   ├── Products (← Create products here)
│   ├── Prices (← Prices listed under products)
│   ├── Discounts
│   └── Import
│
├── 🔧 Developer Tools
│   ├── Authentication (← Get API keys here)
│   │   ├── API Keys
│   │   └── Client-side tokens
│   ├── Notifications (← Configure webhooks here)
│   ├── Events & logs (← View all events here)
│   ├── Paddle Retain
│   └── API reference
│
└── ⚙️ Settings
    ├── Account details
    ├── Business information
    └── Notification settings
```

---

## ✅ Final Checklist

Before you start coding:

- [ ] ✅ Paddle Sandbox account created
- [ ] ✅ API Key copied and added to `.env`
- [ ] ✅ Client-Side Token copied and added to `.env`
- [ ] ✅ `NEXT_PUBLIC_PADDLE_ENV=sandbox` set in `.env`
- [ ] ✅ At least one product created
- [ ] ✅ At least one price added to product
- [ ] ✅ Price ID copied
- [ ] ✅ (Optional) Webhook configured
- [ ] ✅ Development server running
- [ ] ✅ Test checkout page loads
- [ ] ✅ Test purchase completed successfully

---

## 🎉 Success!

You're now ready to build with Paddle! 

**Next Steps:**
- Customize your checkout page
- Handle webhook events
- Implement subscription management
- Add customer portal

**Need Help?**
- 📖 [Full Setup Guide](./PADDLE_SANDBOX_SETUP.md)
- ✅ [Quick Checklist](./PADDLE_SETUP_CHECKLIST.md)
- 🌐 [Paddle Documentation](https://developer.paddle.com/)
- 💬 [Paddle Community](https://www.paddle.com/community)
