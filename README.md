# 🚀 Paddle Payment Template

A production-ready Next.js template for integrating Paddle Billing (v2) with Supabase authentication.

## ✨ Features

- ✅ **Paddle Billing Integration** - Complete checkout and subscription management
- ✅ **Supabase Authentication** - Secure user authentication and database
- ✅ **Sandbox & Production Ready** - Easy environment switching
- ✅ **Webhook Handling** - Automated payment event processing
- ✅ **TypeScript** - Full type safety
- ✅ **Modern UI** - Built with Tailwind CSS and shadcn/ui

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd paddle_template
npm install
# or
pnpm install
```

### 2. Configure Environment

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

### 3. Set Up Paddle Sandbox

Follow our detailed setup guides:

- 📖 **[Complete Setup Guide](./PADDLE_SANDBOX_SETUP.md)** - Detailed instructions
- ✅ **[Quick Checklist](./PADDLE_SETUP_CHECKLIST.md)** - Step-by-step checklist
- 🎯 **[Visual Guide](./PADDLE_VISUAL_GUIDE.md)** - Navigation paths and screenshots

**Quick Overview:**

1. Create account at [sandbox-vendors.paddle.com](https://sandbox-vendors.paddle.com)
2. Get API credentials from **Developer Tools → Authentication**
3. Create test products and prices
4. Update your `.env` file with the credentials

### 4. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test Checkout

Navigate to:
```
http://localhost:3000/checkout/pri_YOUR_PRICE_ID
```

Use Paddle test card: `4242 4242 4242 4242`

## 📋 Environment Variables

### Required Variables

```bash
# Paddle Configuration
NEXT_PUBLIC_PADDLE_ENV=sandbox                          # "sandbox" or "production"
PADDLE_API_KEY=apikey_xxxxxxxxxxxxxxxxxxxxx            # Server-side API key
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_xxxxxxxxxxxxx     # Client-side token

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

### Optional Variables

```bash
# Webhook signature verification
PADDLE_NOTIFICATION_WEBHOOK_SECRET=pdl_ntfset_xxx
```

See [`.env.example`](./.env.example) for complete reference.

## 📚 Documentation

- **[Paddle Sandbox Setup](./PADDLE_SANDBOX_SETUP.md)** - Complete setup guide
- **[Quick Checklist](./PADDLE_SETUP_CHECKLIST.md)** - Setup checklist
- **[Visual Guide](./PADDLE_VISUAL_GUIDE.md)** - Step-by-step navigation

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Database**: [Supabase](https://supabase.com/)
- **Payments**: [Paddle Billing](https://www.paddle.com/billing)

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🧪 Testing

### Test Cards

| Purpose | Card Number | Result |
|---------|-------------|--------|
| Success | `4242 4242 4242 4242` | ✅ Approved |
| Decline | `4000 0000 0000 0002` | ❌ Declined |
| 3D Secure | `4000 0025 0000 3155` | 🔐 Requires auth |

**For all cards:**
- Expiry: Any future date
- CVV: Any 3 digits
- ZIP: Any 5 digits

## 🚀 Deployment

### Environment Setup

1. **Production Paddle Account**:
   - Create account at [vendors.paddle.com](https://vendors.paddle.com)
   - Get production API credentials
   - Update environment to `production`

2. **Deploy**:
   - Deploy to [Vercel](https://vercel.com), [Netlify](https://netlify.com), or your platform
   - Add environment variables
   - Configure webhook URL

### Security Checklist

- [ ] Use production Paddle credentials
- [ ] Set `NEXT_PUBLIC_PADDLE_ENV=production`
- [ ] Configure webhook with HTTPS endpoint
- [ ] Enable webhook signature verification
- [ ] Rotate API keys regularly
- [ ] Never commit `.env` file

## 📖 Learn More

- **Paddle Documentation**: [developer.paddle.com](https://developer.paddle.com/)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](../../issues)
- **Paddle Support**: [paddle.com/support](https://www.paddle.com/support)
- **Documentation**: See guides in this repository

---

**Made with ❤️ using Paddle + Next.js + Supabase**
