Act as a **Senior Solution Architect** with 15+ years of experience designing large-scale, globally distributed payment platforms similar to **Notion**, **Vercel**, and **Shopify**. You are an expert in:
- **Edge Computing Architecture** (Cloudflare Workers, Durable Objects, KV)
- **Payment System Integration** (Paddle, PayPal, Stripe)
- **PCI-DSS Compliance** and security best practices
- **Event-Driven Architecture** with idempotency guarantees
- **Multi-region, low-latency systems** with 99.99% uptime
- **Observability & Monitoring** (structured logging, metrics, tracing)
---
## 🎯 Mission
Generate a **complete, production-ready JavaScript repository** for a **Global Payment Orchestration System** running entirely on **Cloudflare Workers (Edge Runtime)**.
This system must handle:
- **Multi-provider payment processing** (Paddle, PayPal, with extensibility for Stripe, Lemon Squeezy, etc.)
- **Webhook event processing** with signature verification and idempotency
- **Session management** using KV and Durable Objects
- **Global edge routing** with sub-100ms response times
- **Comprehensive error handling** with retry logic and circuit breakers
- **Security-first approach** with rate limiting, CORS, and secret management
- **Full observability** with structured logging and metrics
---
## 📦 Complete Repository Structure
```
payment-system/
├── README.md                          # Comprehensive setup guide
├── LICENSE                            # MIT License
├── .gitignore
├── package.json                       # Dependencies & scripts
├── wrangler.toml                      # Cloudflare Worker configuration
├── .env.example                       # Environment variables template
├── tsconfig.json                      # TypeScript config (optional)
│
├── src/
│   ├── index.js                       # Main Worker entrypoint
│   ├── router.js                      # Request routing logic
│   │
│   ├── handlers/                      # Route handlers
│   │   ├── checkout.js                # POST /api/checkout
│   │   ├── webhook.js                 # POST /api/webhook/{provider}
│   │   ├── receipt.js                 # GET /api/receipt/:id
│   │   ├── subscription.js            # GET/POST /api/subscription
│   │   ├── refund.js                  # POST /api/refund
│   │   └── health.js                  # GET /health
│   │
│   ├── adapters/                      # Payment Provider Adapters
│   │   ├── base.js                    # Abstract base adapter interface
│   │   ├── paddle/
│   │   │   ├── paddle.js              # Paddle implementation
│   │   │   ├── webhook.js             # Paddle webhook verification
│   │   │   ├── types.js               # Paddle-specific types
│   │   │   └── README.md              # Paddle integration guide
│   │   ├── paypal/
│   │   │   ├── paypal.js              # PayPal implementation
│   │   │   ├── webhook.js             # PayPal webhook verification
│   │   │   ├── types.js               # PayPal-specific types
│   │   │   └── README.md              # PayPal integration guide
│   │   ├── stripe/
│   │   │   ├── stripe.js              # Stripe placeholder
│   │   │   └── README.md              # Integration template
│   │   └── factory.js                 # Provider factory pattern
│   │
│   ├── storage/                       # Data persistence layer
│   │   ├── kv.js                      # KV operations wrapper
│   │   ├── durableObjects.js          # Durable Objects for sessions
│   │   ├── session.js                 # Session management
│   │   ├── idempotency.js             # Idempotency key handling
│   │   └── cache.js                   # Edge caching strategies
│   │
│   ├── middleware/                    # Middleware stack
│   │   ├── auth.js                    # API key / JWT validation
│   │   ├── cors.js                    # CORS headers
│   │   ├── rateLimit.js               # Rate limiting (KV-based)
│   │   ├── logger.js                  # Request/response logging
│   │   ├── errorHandler.js            # Global error handling
│   │   ├── metrics.js                 # Performance metrics
│   │   └── validator.js               # Request validation
│   │
│   ├── utils/                         # Utility functions
│   │   ├── crypto.js                  # Signature verification utilities
│   │   ├── retry.js                   # Exponential backoff retry logic
│   │   ├── response.js                # Unified response helpers
│   │   ├── validation.js              # Input validation schemas
│   │   ├── currency.js                # Currency conversion helpers
│   │   ├── errors.js                  # Custom error classes
│   │   └── constants.js               # System constants
│   │
│   ├── services/                      # Business logic layer
│   │   ├── checkout.js                # Checkout orchestration
│   │   ├── webhook.js                 # Webhook processing logic
│   │   ├── notification.js            # Internal notification forwarding
│   │   ├── receipt.js                 # Receipt generation
│   │   ├── subscription.js            # Subscription management
│   │   └── analytics.js               # Analytics event tracking
│   │
│   ├── config/                        # Configuration management
│   │   ├── env.js                     # Environment variable loader
│   │   ├── providers.js               # Provider configuration
│   │   ├── routes.js                  # Route definitions
│   │   └── security.js                # Security policies
│   │
│   └── types/                         # Type definitions (JSDoc or TS)
│       ├── payment.js                 # Payment-related types
│       ├── webhook.js                 # Webhook event types
│       └── api.js                     # API request/response types
│
├── tests/                             # Test suite
│   ├── setup.js                       # Test environment setup
│   ├── mocks/                         # Mock data & providers
│   │   ├── paddle.js
│   │   ├── paypal.js
│   │   └── webhooks.js
│   ├── unit/                          # Unit tests
│   │   ├── adapters/
│   │   │   ├── paddle.test.js
│   │   │   └── paypal.test.js
│   │   ├── middleware/
│   │   │   ├── rateLimit.test.js
│   │   │   └── validator.test.js
│   │   └── utils/
│   │       ├── crypto.test.js
│   │       └── retry.test.js
│   ├── integration/                   # Integration tests
│   │   ├── checkout.test.js
│   │   ├── webhook.test.js
│   │   ├── subscription.test.js
│   │   └── refund.test.js
│   ├── e2e/                           # End-to-end tests
│   │   ├── fullCheckoutFlow.test.js
│   │   └── webhookDelivery.test.js
│   └── load/                          # Load testing scripts
│       └── checkout.artillery.yml
│
├── frontend/                          # Frontend integration examples
│   ├── svelte/                        # Svelte 5 implementation
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── svelte.config.js
│   │   ├── src/
│   │   │   ├── App.svelte             # Main app
│   │   │   ├── lib/
│   │   │   │   ├── api.js             # API client
│   │   │   │   ├── stores.js          # Svelte stores
│   │   │   │   └── utils.js
│   │   │   ├── components/
│   │   │   │   ├── CheckoutButton.svelte
│   │   │   │   ├── PaymentProviderSelector.svelte
│   │   │   │   ├── SubscriptionCard.svelte
│   │   │   │   ├── Receipt.svelte
│   │   │   │   └── LoadingSpinner.svelte
│   │   │   └── routes/
│   │   │       ├── checkout/+page.svelte
│   │   │       ├── success/+page.svelte
│   │   │       └── cancel/+page.svelte
│   │   └── README.md
│   ├── react/                         # React example (bonus)
│   │   └── README.md
│   └── vanilla/                       # Plain JavaScript example
│       ├── index.html
│       └── checkout.js
│
├── scripts/                           # Automation scripts
│   ├── deploy.sh                      # Deployment script
│   ├── setup-secrets.sh               # Wrangler secrets setup
│   ├── migrate-kv.js                  # KV data migration
│   ├── test-webhook.js                # Webhook testing utility
│   └── generate-docs.js               # Auto-generate API docs
│
├── docs/                              # Documentation
│   ├── ARCHITECTURE.md                # System architecture deep-dive
│   ├── API_REFERENCE.md               # Complete API specification
│   ├── PROVIDERS.md                   # Provider integration guides
│   ├── DEPLOYMENT.md                  # Deployment & CI/CD guide
│   ├── SECURITY.md                    # Security best practices
│   ├── TESTING.md                     # Testing strategy
│   ├── TROUBLESHOOTING.md             # Common issues & solutions
│   ├── MONITORING.md                  # Observability setup
│   ├── CONTRIBUTING.md                # Contribution guidelines
│   └── diagrams/                      # Architecture diagrams
│       ├── flow-checkout.mmd          # Mermaid checkout flow
│       ├── flow-webhook.mmd           # Webhook processing flow
│       └── architecture.png           # System overview
│
├── .github/                           # GitHub configuration
│   ├── workflows/
│   │   ├── ci.yml                     # CI pipeline
│   │   ├── deploy.yml                 # Deployment workflow
│   │   └── security.yml               # Security scanning
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
│
└── monitoring/                        # Monitoring & alerting
    ├── grafana/
    │   └── dashboard.json             # Grafana dashboard
    ├── prometheus/
    │   └── alerts.yml                 # Alert rules
    └── cloudflare/
        └── logpush.json               # Logpush configuration
```
---
## 🔧 Functional Requirements
### 1. **Checkout Flow** `POST /api/checkout`)
**Requirements:**
- Accept payment provider selection `paddle`, `paypal`, `stripe`)
- Create checkout session with selected provider
- Store session metadata in KV: `session:<uuid>` → `{ userId, provider, amount, currency, items, metadata, createdAt }`
- Return checkout URL or session token for client-side redirect
- Support both one-time payments and subscription creation
- Handle multiple currencies (USD, EUR, GBP, JPY, etc.)
- Apply tax calculation based on customer location
- Support coupon/discount codes
**Request Schema:**
```json
{
  "provider": "paddle",
  "customerId": "user_123",
  "items": [
    {
      "priceId": "pri_xxx",
      "quantity": 1
    }
  ],
  "currency": "USD",
  "successUrl": "https://example.com/success ",
  "cancelUrl": "https://example.com/cancel ",
  "metadata": {
    "orderId": "ord_123",
    "source": "web"
  }
}
```
**Response Schema:**
```json
{
  "sessionId": "sess_abc123",
  "checkoutUrl": "https://checkout.paddle.com/ ...",
  "provider": "paddle",
  "expiresAt": "2025-11-08T12:00:00Z"
}
```
---
### 2. **Webhook Handling** `POST /api/webhook/{provider}`)
**Requirements:**
- Validate webhook signatures (provider-specific)
- Implement idempotency using KV: `webhook:<provider>:<eventId>` (24hr TTL)
- Parse and normalize webhook payloads to internal format
- Update payment/subscription status in KV
- Forward normalized events to origin backend `POST /internal/payment/notify`)
- Retry failed forwards with exponential backoff (3 retries: 1s, 2s, 4s)
- Log all webhook events with structured metadata
- Handle out-of-order webhook delivery
- Support webhook replay for debugging
**Supported Events:**
- `payment.succeeded`
- `payment.failed`
- `subscription.created`
- `subscription.updated`
- `subscription.cancelled`
- `refund.completed`
**Internal Notification Format:**
```json
{
  "event": "payment.succeeded",
  "provider": "paddle",
  "customerId": "user_123",
  "transactionId": "txn_abc",
  "amount": 9900,
  "currency": "USD",
  "metadata": {},
  "timestamp": "2025-11-08T10:30:00Z"
}
```
---
### 3. **Provider Adapters (Unified Interface)**
**Base Adapter Interface:**
```javascript
/**
 * @interface ProviderAdapter
 */
export class BaseProviderAdapter {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.environment = config.environment; // 'sandbox' | 'production'
  }
  /**
   * Create checkout session
   * @param {CheckoutPayload} payload
   * @returns {Promise<CheckoutSession>}
   */
  async createCheckoutSession(payload) {
    throw new Error('Not implemented');
  }
  /**
   * Verify webhook signature
   * @param {Request} request
   * @returns {Promise<boolean>}
   */
  async verifyWebhook(request) {
    throw new Error('Not implemented');
  }
  /**
   * Get session details
   * @param {string} sessionId
   * @returns {Promise<SessionDetails>}
   */
  async getSession(sessionId) {
    throw new Error('Not implemented');
  }
  /**
   * Process refund
   * @param {string} transactionId
   * @param {number} amount
   * @returns {Promise<RefundResult>}
   */
  async processRefund(transactionId, amount) {
    throw new Error('Not implemented');
  }
  /**
   * Cancel subscription
   * @param {string} subscriptionId
   * @returns {Promise<CancellationResult>}
   */
  async cancelSubscription(subscriptionId) {
    throw new Error('Not implemented');
  }
}
```
**Provider Implementations:**
1. **PaddleAdapter**
   - Use Paddle Billing API
   - Verify webhook signatures using RSA public key
   - Handle subscription lifecycle events
   - Support Paddle Retain (churn reduction)
2. **PayPalAdapter**
   - Use PayPal REST API v2
   - Verify webhook signatures via `/v1/notifications/verify-webhook-signature`
   - Handle order capture flow
   - Support PayPal subscriptions
3. **StripeAdapter** (extensibility placeholder)
   - Use Stripe API v2024-10-28
   - Verify webhook signatures using Stripe signature header
   - Support Payment Intents and Setup Intents
---
### 4. **Security Implementation**
**Requirements:**
- **Signature Verification**: Strict validation for all webhook payloads
- **Secret Management**: All credentials in Wrangler secrets (never in code)
- **Rate Limiting**: 
  - 100 requests/minute per IP for public endpoints
  - 1000 requests/minute for authenticated endpoints
  - Sliding window algorithm using KV
- **CORS**: Configurable allowed origins
- **API Key Authentication**: For internal endpoints
- **Request Validation**: Schema validation for all inputs
- **XSS/Injection Protection**: Sanitize all user inputs
- **HTTPS Only**: Reject non-HTTPS requests in production
**Wrangler Secrets:**
```bash
PADDLE_API_KEY
PADDLE_WEBHOOK_SECRET
PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET
PAYPAL_WEBHOOK_ID
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
INTERNAL_API_KEY
INTERNAL_BACKEND_URL
JWT_SECRET
ENCRYPTION_KEY
```
---
### 5. **Testing Strategy**
**Requirements:**
- **Unit Tests** (80%+ coverage):
  - All adapter methods
  - Webhook verification logic
  - Retry mechanisms
  - Validation schemas
  
- **Integration Tests**:
  - Full checkout flow (mock provider APIs)
  - Webhook processing pipeline
  - Idempotency guarantees
  - Error scenarios
- **E2E Tests**:
  - Real provider sandbox integration
  - Complete payment lifecycle
  - Multi-provider switching
- **Load Tests**:
  - 1000 req/s sustained load
  - Concurrent webhook processing
  - KV performance under load
**Test Framework**: Vitest with Miniflare for Worker simulation
**Mock Strategy**:
- Mock all external API calls
- Use fixture data for webhook payloads
- Simulate network failures and timeouts
---
### 6. **Monitoring & Observability**
**Requirements:**
**Structured Logging:**
```javascript
{
  timestamp: "2025-11-08T10:30:00Z",
  level: "info",
  service: "payment-worker",
  traceId: "abc123",
  spanId: "def456",
  event: "checkout.created",
  provider: "paddle",
  customerId: "user_123",
  amount: 9900,
  currency: "USD",
  duration: 234, // ms
  region: "SFO",
  status: "success"
}
```
**Metrics Collection:**
- Request count by endpoint
- Response time percentiles (p50, p95, p99)
- Error rate by provider
- Webhook success/failure rate
- Cache hit rate
- KV operation latency
**Alerting Rules:**
- Error rate > 5% for 5 minutes
- Webhook failure > 10% for 3 minutes
- Response time p95 > 500ms
- Provider API errors
**Integration Options:**
- Cloudflare Analytics (built-in)
- Logpush to S3/GCS/Datadog
- Custom webhook to observability platform
- Grafana/Prometheus dashboards
---
### 7. **Frontend Integration (Svelte 5)**
**Requirements:**
- Reactive checkout button component
- Provider selection UI
- Loading states and error handling
- Success/cancel redirects
- Receipt display
- Subscription management interface
**Key Features:**
- TypeScript support
- SSR compatibility (SvelteKit)
- Mobile-responsive design
- Accessibility (ARIA labels)
- i18n support (multi-language)
**Example: CheckoutButton.svelte**
```svelte
<script>
  import { createEventDispatcher } from 'svelte';
  
  export let provider = 'paddle';
  export let items = [];
  export let customerId;
  
  let loading = $state(false);
  let error = $state(null);
  
  const dispatch = createEventDispatcher();
  
  async function handleCheckout() {
    loading = true;
    error = null;
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, items, customerId })
      });
      
      if (!response.ok) throw new Error('Checkout failed');
      
      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (err) {
      error = err.message;
      dispatch('error', { error: err });
    } finally {
      loading = false;
    }
  }
</script>
<button onclick={handleCheckout} disabled={loading}>
  {loading ? 'Processing...' : 'Checkout'}
</button>
{#if error}
  <p class="error">{error}</p>
{/if}
```
---
### 8. **Performance Requirements**
- **Response Time**: < 100ms for p95 globally
- **Throughput**: Handle 10,000 requests/second
- **Availability**: 99.99% uptime SLA
- **Cold Start**: < 20ms (Cloudflare Workers advantage)
- **KV Latency**: < 10ms for read operations
- **Cache Hit Rate**: > 80% for session lookups
---
### 9. **Data Persistence Strategy**
**KV Usage:**
- Session storage: `session:<uuid>` (1hr TTL)
- Idempotency keys: `idempotency:<provider>:<id>` (24hr TTL)
- Rate limit counters: `ratelimit:<ip>:<window>` (1min TTL)
- Cache: `cache:<key>` (configurable TTL)
**Durable Objects Usage:**
- Real-time session state for active checkouts
- Subscription state management
- Webhook event ordering and deduplication
**Origin Backend Forwarding:**
- All completed transactions
- Subscription lifecycle events
- Refund notifications
- Analytics events
---
### 10. **CI/CD Pipeline**
**GitHub Actions Workflow:**
1. **Linting**: ESLint + Prettier
2. **Type Checking**: JSDoc or TypeScript
3. **Unit Tests**: Vitest with coverage report
4. **Integration Tests**: Against mock providers
5. **Security Scanning**: Snyk + npm audit
6. **Build**: Bundle with esbuild
7. **Deploy to Staging**: Automatic on PR
8. **E2E Tests**: Against staging environment
9. **Deploy to Production**: Manual approval
10. **Smoke Tests**: Post-deployment validation
---
## 🎨 Code Quality Standards
- **ESLint**: Airbnb style guide
- **Prettier**: Consistent formatting
- **JSDoc Comments**: All public functions
- **Error Handling**: Never expose internal errors to clients
- **Logging**: Structured JSON logs only
- **Variable Naming**: 
  - Constants: `UPPER_SNAKE_CASE`
  - Functions: `camelCase`
  - Classes: `PascalCase`
- **File Organization**: One class/module per file
- **Max Function Length**: 50 lines
- **Cyclomatic Complexity**: < 10
---
## 📚 Documentation Requirements
Each file must include:
- File-level JSDoc with purpose
- Function-level JSDoc with params and returns
- Inline comments for complex logic
- Usage examples for public APIs
Documentation must cover:
- Setup instructions (5-minute quickstart)
- Environment configuration
- Provider setup guides
- API endpoint specifications (OpenAPI)
- Webhook payload examples
- Troubleshooting common issues
- Performance tuning tips
- Security best practices
---
## 🚀 Deployment Checklist
- [ ] All secrets configured in Wrangler
- [ ] KV namespaces created
- [ ] Durable Objects deployed
- [ ] Custom domain configured
- [ ] SSL/TLS certificates valid
- [ ] Rate limiting enabled
- [ ] Logging pipeline active
- [ ] Monitoring dashboards deployed
- [ ] Alert rules configured
- [ ] Backup/recovery plan documented
- [ ] Load testing passed
- [ ] Security audit completed
---
## 🌍 Global Distribution Strategy
- **Edge Locations**: Deploy to all Cloudflare regions (300+)
- **Smart Routing**: Route to nearest provider API endpoint
- **Failover**: Automatic provider failover on errors
- **Geographic Compliance**: GDPR, PCI-DSS, SOC 2
- **Currency Detection**: Auto-detect based on IP geolocation
- **Localization**: Support 20+ languages
---
## 💡 Extensibility Goals
The system must support adding:
- New payment providers in < 2 hours
- New webhook events without code changes
- Custom middleware without modifying core
- Additional currencies and payment methods
- Third-party analytics integrations
- Custom business logic via plugins
---
## 🎯 Success Criteria
The generated repository must:
1. ✅ Pass all tests with > 80% coverage
2. ✅ Deploy successfully to Cloudflare Workers
3. ✅ Process test transactions via Paddle & PayPal sandboxes
4. ✅ Handle 1000 concurrent webhook deliveries
5. ✅ Respond in < 100ms globally (p95)
6. ✅ Include complete documentation
7. ✅ Follow all security best practices
8. ✅ Be maintainable by a solo founder
9. ✅ Scale to millions of transactions/month
10. ✅ Provide clear observability into all operations
---
## 📋 Additional Notes
- **Code Style**: Modern ES6+, no legacy patterns
- **Dependencies**: Minimize external deps (bundle size < 1MB)
- **Comments**: Explain "why", not "what"
- **Error Messages**: User-friendly, actionable
- **Naming**: Clear, self-documenting code
- **DRY Principle**: No code duplication
- **SOLID Principles**: Especially Interface Segregation
- **12-Factor App**: Environment-based configuration
---
Generate the complete repository following this specification. Every file should be production-ready with proper error handling, logging, and documentation. Focus on code quality, security, and maintainability over premature optimization.