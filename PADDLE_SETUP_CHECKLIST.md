# 🚀 Paddle Sandbox Setup - Quick Checklist

Use this checklist to quickly set up your Paddle Sandbox environment.

## ✅ Setup Checklist

### 1️⃣ Create Paddle Sandbox Account
- [ ] Visit: https://sandbox-vendors.paddle.com
- [ ] Sign up or log in to sandbox account
- [ ] Verify email address

### 2️⃣ Get API Credentials
- [ ] Navigate to **Developer Tools → Authentication**
- [ ] Create/copy **API Key** (server-side)
  - Starts with: `apikey_`
- [ ] Create/copy **Client-Side Token** (browser)
  - Starts with: `test_` (for sandbox)

### 3️⃣ Update Environment Variables
- [ ] Open `.env` file
- [ ] Set `NEXT_PUBLIC_PADDLE_ENV=sandbox`
- [ ] Add your `PADDLE_API_KEY`
- [ ] Add your `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`

```bash
NEXT_PUBLIC_PADDLE_ENV=sandbox
PADDLE_API_KEY=apikey_01k9kc4wen8y4t4r39wztnfaa0
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_3da4fab7f1ca48b9d4184d960e6
```

### 4️⃣ Create Test Products
- [ ] Go to **Catalog → Products**
- [ ] Click **"Add Product"**
- [ ] Fill in product details:
  - [ ] Product name
  - [ ] Description
  - [ ] Tax category
- [ ] Save product

### 5️⃣ Add Prices to Products
- [ ] Open your product
- [ ] Click **"Add Price"**
- [ ] Configure price:
  - [ ] Choose billing type (one-time or recurring)
  - [ ] Set amount
  - [ ] Select currency
- [ ] Save and **copy Price ID** (starts with `pri_`)

### 6️⃣ Configure Webhooks (Optional)
- [ ] Go to **Developer Tools → Notifications**
- [ ] Add webhook endpoint URL
- [ ] Select events to receive:
  - [ ] `transaction.completed`
  - [ ] `transaction.updated`
  - [ ] `subscription.created`
  - [ ] `subscription.updated`
  - [ ] `subscription.canceled`
- [ ] Copy webhook secret
- [ ] Add to `.env`: `PADDLE_NOTIFICATION_WEBHOOK_SECRET=...`

### 7️⃣ Test Your Integration
- [ ] Start dev server: `npm run dev`
- [ ] Navigate to: `http://localhost:3000/checkout/pri_YOUR_PRICE_ID`
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Complete test purchase
- [ ] Verify transaction in Paddle dashboard

### 8️⃣ Verify Setup
- [ ] Checkout page loads without errors
- [ ] Paddle checkout form appears
- [ ] Test payment completes successfully
- [ ] Transaction visible in Paddle dashboard
- [ ] Webhook received (if configured)

---

## 🧪 Test Card Numbers

| Purpose | Card Number | Result |
|---------|-------------|--------|
| **Success** | `4242 4242 4242 4242` | ✅ Approved |
| **Decline** | `4000 0000 0000 0002` | ❌ Declined |
| **3D Secure** | `4000 0025 0000 3155` | 🔐 Requires authentication |

**For all test cards:**
- Expiry: Any future date
- CVV: Any 3 digits
- ZIP: Any 5 digits

---

## 📋 Required Environment Variables

```bash
# Required for Paddle integration
NEXT_PUBLIC_PADDLE_ENV=sandbox
PADDLE_API_KEY=apikey_...
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_...

# Optional but recommended
PADDLE_NOTIFICATION_WEBHOOK_SECRET=pdl_ntfset_...
```

---

## 🔗 Quick Links

- **Sandbox Dashboard**: https://sandbox-vendors.paddle.com
- **API Keys**: https://sandbox-vendors.paddle.com/authentication
- **Products**: https://sandbox-vendors.paddle.com/products
- **Webhooks**: https://sandbox-vendors.paddle.com/notifications
- **Events Log**: https://sandbox-vendors.paddle.com/events-and-logs
- **Documentation**: https://developer.paddle.com/

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Checkout not loading | ✅ Check `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` is set |
| API errors | ✅ Verify `PADDLE_API_KEY` is correct |
| Wrong environment | ✅ Ensure `NEXT_PUBLIC_PADDLE_ENV=sandbox` |
| Invalid price ID | ✅ Copy price ID from Paddle dashboard (starts with `pri_`) |
| Webhook not received | ✅ Use ngrok for local testing |

---

## 📖 Detailed Setup Guide

For more detailed instructions, see: [PADDLE_SANDBOX_SETUP.md](./PADDLE_SANDBOX_SETUP.md)

---

**✨ You're all set!** Start building with Paddle Sandbox.
