# Paddle Sandbox Setup Guide

This guide will walk you through setting up the Paddle Sandbox environment for testing your payment integration.

## 🚀 Quick Start

### 1. Create Paddle Sandbox Account

1. **Go to Paddle Sandbox**: https://sandbox-vendors.paddle.com
2. **Sign Up/Log In**: 
   - Create a new account (separate from production)
   - Or log in if you already have a sandbox account
   - **Important**: Sandbox and Production accounts are completely separate

### 2. Access Developer Tools

1. Once logged in, navigate to **Developer Tools** in the left sidebar
2. Click on **Authentication** to access your API credentials

### 3. Get Your API Credentials

You'll need two types of credentials:

#### A. API Key (Server-Side)
- Go to: **Developer Tools → Authentication → API Keys**
- Click **"Create API Key"** or use an existing one
- **Copy** the API key (starts with `apikey_`)
- This is used for server-side API calls

#### B. Client-Side Token (Browser)
- Go to: **Developer Tools → Authentication → Client-Side Tokens**
- Click **"Create Client-Side Token"** or use an existing one
- **Copy** the token (starts with `test_`)
- This is used for client-side checkout integration

### 4. Set Up Environment Variables

Update your `.env` file with the Paddle Sandbox credentials:

```bash
# Paddle Configuration
NEXT_PUBLIC_PADDLE_ENV=sandbox
PADDLE_API_KEY=your_sandbox_api_key_here        # From Step 3A
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your_sandbox_client_token_here  # From Step 3B
```

**Example:**
```bash
NEXT_PUBLIC_PADDLE_ENV=sandbox
PADDLE_API_KEY=apikey_01k9kc4wen8y4t4r39wztnfaa0
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_3da4fab7f1ca48b9d4184d960e6
```

### 5. Create Test Products and Prices

1. **Navigate to Catalog** in the Paddle Dashboard
2. **Create a Product**:
   - Click **"Add Product"**
   - Enter product name (e.g., "Pro Plan")
   - Add description
   - Set tax category
   - Save

3. **Add Prices to Product**:
   - Open your product
   - Click **"Add Price"**
   - Choose billing type:
     - **One-time**: Single payment
     - **Recurring**: Subscription (monthly/yearly)
   - Set amount (e.g., $9.99)
   - Choose currency
   - Save
   - **Copy the Price ID** (starts with `pri_`)

4. **Repeat** for different pricing tiers (Basic, Pro, Enterprise, etc.)

### 6. Configure Webhook (Optional but Recommended)

Webhooks allow you to receive real-time notifications about payment events.

1. **Go to**: **Developer Tools → Notifications**
2. **Add Endpoint**:
   ```
   https://yourdomain.com/api/webhook
   ```
   For local development, use a tool like [ngrok](https://ngrok.com/):
   ```bash
   ngrok http 3000
   # Use the ngrok URL: https://abc123.ngrok.io/api/webhook
   ```

3. **Select Events** to receive:
   - `transaction.completed`
   - `transaction.updated`
   - `subscription.created`
   - `subscription.updated`
   - `subscription.canceled`
   - `subscription.past_due`

4. **Get Webhook Secret**:
   - Copy the **webhook secret key**
   - Add to `.env`:
     ```bash
     PADDLE_NOTIFICATION_WEBHOOK_SECRET=your_webhook_secret_here
     ```

### 7. Update Your Code

Your code is already configured! The project uses the environment variables:

- **Client-side** (`checkout-contents.tsx`):
  ```typescript
  initializePaddle({
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
  })
  ```

- **Server-side** (`get-paddle-instance.ts`):
  ```typescript
  new Paddle(process.env.PADDLE_API_KEY!, {
    environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environment,
  })
  ```

### 8. Test Your Integration

1. **Start your development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. **Navigate to a checkout page**:
   ```
   http://localhost:3000/checkout/pri_YOUR_PRICE_ID
   ```

3. **Use Paddle Test Cards**:
   
   **Successful Payment:**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVV: Any 3 digits
   - ZIP: Any 5 digits

   **Declined Payment:**
   - Card: `4000 0000 0000 0002`
   
   **3D Secure:**
   - Card: `4000 0025 0000 3155`

4. **Monitor Events**:
   - Check your webhook endpoint
   - View events in **Developer Tools → Events & Logs**

## 🔍 Sandbox vs Production

| Feature | Sandbox | Production |
|---------|---------|------------|
| **URL** | sandbox-vendors.paddle.com | vendors.paddle.com |
| **API Keys** | Separate sandbox keys | Separate production keys |
| **Payments** | Test cards only | Real payments |
| **Data** | Isolated test data | Real customer data |
| **Purpose** | Testing & development | Live transactions |

## 📝 Environment Variables Reference

Here's what each variable does:

```bash
# Paddle Environment (sandbox or production)
NEXT_PUBLIC_PADDLE_ENV=sandbox

# Server-side API key for Paddle API calls
# Get from: Developer Tools → Authentication → API Keys
PADDLE_API_KEY=apikey_xxxxxxxxxxxxxxxxxxxxx

# Client-side token for browser checkout
# Get from: Developer Tools → Authentication → Client-Side Tokens
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_xxxxxxxxxxxxxxxxxxxxx

# Webhook signature verification secret
# Get from: Developer Tools → Notifications → Your Endpoint
PADDLE_NOTIFICATION_WEBHOOK_SECRET=pdl_ntfset_xxxxxxxxxxxxxxxxxxxxx
```

## 🧪 Testing Scenarios

### Test One-Time Payment
1. Create a product with a one-time price
2. Navigate to checkout with that price ID
3. Complete payment with test card
4. Verify transaction in Paddle Dashboard

### Test Subscription
1. Create a product with recurring price
2. Navigate to checkout
3. Complete payment
4. Check **Customers → Subscriptions** in dashboard
5. Test subscription updates/cancellations

### Test Webhooks
1. Configure webhook endpoint (use ngrok for local)
2. Make a test purchase
3. Verify webhook received
4. Check event data format
5. Test idempotency (replay same event)

## 🔐 Security Best Practices

1. **Never commit** `.env` file to git
2. **Use different keys** for sandbox and production
3. **Verify webhook signatures** before processing
4. **Use HTTPS** for webhook endpoints
5. **Rotate API keys** periodically
6. **Limit API key permissions** to necessary scopes

## 🐛 Troubleshooting

### Checkout Not Loading
- ✅ Verify `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` is set
- ✅ Check `NEXT_PUBLIC_PADDLE_ENV` is "sandbox"
- ✅ Ensure price ID is valid (starts with `pri_`)
- ✅ Check browser console for errors

### API Errors
- ✅ Verify `PADDLE_API_KEY` is correct
- ✅ Check API key has necessary permissions
- ✅ Ensure using sandbox keys with sandbox environment

### Webhooks Not Received
- ✅ Verify webhook URL is publicly accessible
- ✅ Check webhook is configured in Paddle dashboard
- ✅ Test with Paddle's webhook testing tool
- ✅ Check server logs for errors

## 📚 Additional Resources

- **Paddle Documentation**: https://developer.paddle.com/
- **API Reference**: https://developer.paddle.com/api-reference/overview
- **Webhook Events**: https://developer.paddle.com/webhooks/overview
- **Test Cards**: https://developer.paddle.com/concepts/payment-methods/credit-debit-card
- **Paddle SDK**: https://github.com/PaddleHQ/paddle-node-sdk

## 🎯 Next Steps

Once sandbox testing is complete:

1. **Create Production Account**: https://vendors.paddle.com
2. **Get Production Keys**: From production dashboard
3. **Update Environment**: Change `NEXT_PUBLIC_PADDLE_ENV=production`
4. **Replace Keys**: Use production API keys
5. **Configure Production Webhooks**: With production URL
6. **Test Thoroughly**: Before going live
7. **Monitor**: Set up logging and alerting

---

**Need Help?** 
- Paddle Support: https://www.paddle.com/support
- Paddle Community: https://www.paddle.com/community
