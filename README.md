# Holy Shrine Incenses — Next.js Starter (Next + Tailwind + TS + MongoDB + Razorpay)

This starter is built to match the existing HolyShrineIncense store structure while keeping content/data flexible so you only need **minimal scraping** (or simple CSV/JSON import) to go live.

## Tech
- Next.js (App Router) + TypeScript
- Tailwind CSS
- MongoDB (Mongoose)
- Razorpay (orders + signature verification)
- Zustand cart (persisted in localStorage)
- Zod validation (API payload safety)

## Quick start

### 1) Install deps
```bash
pnpm i
# or: npm i / yarn
```

### 2) Environment variables
Create `.env.local` from `.env.example` and fill values.

### 3) Seed sample data (optional but recommended)
```bash
pnpm seed:products
```

### 4) Run
```bash
pnpm dev
```

## Minimal scraping / importing
You can import products by editing:
- `src/data/products.seed.json`

Then run:
```bash
pnpm seed:products
```

## Razorpay flow (what's implemented)
1. Client calls `POST /api/razorpay/create-order` with cart items (productId + qty).
2. Server fetches prices from MongoDB, computes total, creates Razorpay order.
3. Client opens Razorpay Checkout using returned order + `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
4. On payment success, client calls `POST /api/razorpay/verify` with payment_id, order_id, signature.
5. Server verifies signature using secret, marks Order as PAID.

> You can later add Razorpay webhooks for extra safety (stub included).

---

If you want, I can also add an Admin panel route group (`/(admin)`) with basic product/order CRUD.
