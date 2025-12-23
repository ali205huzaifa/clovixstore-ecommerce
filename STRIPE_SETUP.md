# Stripe Payment Integration Setup Guide

## Overview

This project now includes complete Stripe payment integration for the checkout process. The implementation follows Stripe's Payment Intent API for secure card payments.

## Files Created/Modified

### New Files

1. **`app/lib/stripe.ts`** - Stripe initialization utility
2. **`app/components/checkout/CheckoutForm.tsx`** - Main checkout form with Stripe payment integration
3. **`app/components/checkout/SuccessModal.tsx`** - Success confirmation modal
4. **`app/components/checkout/ErrorModal.tsx`** - Error handling modal
5. **`app/order-confirmation/[id]/page.tsx`** - Order confirmation page
6. **`.env.example`** - Environment variables template

### Modified Files

1. **`app/checkout/page.tsx`** - Updated to use new CheckoutForm component
2. **`package.json`** - Added Stripe dependencies

## Environment Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Sh6uuSozgMWVOap6prV8bmvi1kPMZWlnkG1NpDuPNH1iwxJJPkab2xxHoSNqW01O4gFM1nJJEpppto2u8U5PJDp00nubT4tkz
NEXT_PUBLIC_BACKEND_URL=https://api.clovixstore.com
```

**Important:** The `NEXT_PUBLIC_` prefix makes these variables available in the browser. Only expose your **Publishable Key** (not your Secret Key).

## Checkout Flow

### Step 1: Customer Information & Cart Review

- User enters shipping address details (Name, Email, Phone, Address, City, State, ZIP, Country)
- User can add optional order notes
- Order summary displays on the right side with:
  - Product list with quantities
  - Subtotal
  - Tax calculation (8%)
  - Shipping cost ($5.00)
  - Total price

### Step 2: Payment Method

- Stripe CardElement renders for card details entry
- User enters: Card number, Expiry, CVC, ZIP code

### Step 3: Payment Processing

1. **Create Payment Intent** - Frontend requests backend to create a Stripe PaymentIntent

   - Endpoint: `POST /order/payment-intent`
   - Sends order details and customer information
   - Backend returns: `orderId` and `clientSecret`

2. **Confirm Card Payment** - Frontend uses Stripe.js to confirm payment

   - Uses the `clientSecret` from step 1
   - Handles 3D Secure authentication if required
   - Returns payment status

3. **Handle Payment Result** - Based on payment status:
   - **`succeeded`** → Order created, redirect to confirmation page
   - **`requires_action`** → 3D Secure needed, poll order status
   - **`processing`** → Payment pending, poll order status
   - **Failed** → Show error message

### Step 4: Order Confirmation

- Display order confirmation with:
  - Order ID
  - Payment status
  - Order status
  - Stripe Payment Intent ID
  - Next steps guidance

## API Endpoints Used

### Create Payment Intent

```
POST /order/payment-intent
Body: {
  items: Array<{productId, quantity, price, productTitle}>,
  subtotal: number,
  tax: number,
  shippingCost: number,
  total: number,
  shippingAddress: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
  email: string,
  phone: string,
  orderNotes: string (optional)
}

Response: {
  success: boolean,
  order: {
    _id: string,
    status: string,
    paymentStatus: string,
    stripePaymentIntentId: string
  },
  payment: {
    clientSecret: string
  }
}
```

### Confirm Payment / Create Order

```
POST /order
Body: {
  items: Array<{productId, quantity, price, productTitle}>,
  subtotal: number,
  tax: number,
  shippingCost: number,
  total: number,
  shippingAddress: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
  email: string,
  phone: string,
  orderNotes: string,
  paymentMethodId: string (Stripe payment method ID)
}

Response: {
  success: boolean,
  message: string,
  order: {
    _id: string,
    status: string,
    paymentStatus: string,
    failureCode: string | null,
    failureMessage: string | null,
    stripePaymentIntentId: string
  },
  payment: {
    id: string,
    status: string
  }
}
```

### Check Order Status

```
GET /order/:id

Response: {
  success: boolean,
  data: {
    _id: string,
    status: string,
    paymentStatus: string,
    stripePaymentIntentId: string,
    failureCode: string | null,
    failureMessage: string | null,
    createdAt: ISO8601,
    updatedAt: ISO8601
  }
}
```

## Component Structure

### CheckoutForm.tsx

Main checkout component that:

- Collects customer information
- Initializes Stripe
- Displays cart summary
- Renders Stripe CardElement
- Handles payment submission

### PaymentForm (within CheckoutForm.tsx)

Handles:

- Card element rendering
- Payment processing
- Error/success handling
- Order status polling

### SuccessModal.tsx

Displays:

- Success confirmation
- Order ID
- Next steps for customer

### ErrorModal.tsx

Displays:

- Error message
- Retry button

## Payment Status Polling

The system automatically polls the order status when:

- Payment requires authentication (3D Secure)
- Payment is processing

Polling parameters:

- **Max attempts:** 30
- **Interval:** 2 seconds
- **Timeout:** ~60 seconds total

## Error Handling

### Frontend Error Handling

- Form validation (required fields)
- Stripe.js errors (card validation, network errors)
- Payment confirmation errors
- Fetch errors with user-friendly messages

### Backend Error Handling

Expected from backend:

- `failureCode` - Stripe failure code (e.g., "card_declined")
- `failureMessage` - User-friendly error message
- `paymentStatus` - Current payment status

## Testing

### Test Cards (Stripe Sandbox)

```
Success: 4242 4242 4242 4242
Declined: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3010
```

Expiry: Any future date (MM/YY)
CVC: Any 3 digits

### Test Flow

1. Navigate to `/checkout`
2. Fill in customer information
3. Use test card number above
4. Submit payment
5. Verify order confirmation page

## Security Considerations

1. **Never expose Secret Key** - Only `NEXT_PUBLIC_` variables are sent to frontend
2. **Use Payment Intent API** - More secure than direct token submission
3. **Handle errors gracefully** - Don't expose sensitive error details
4. **Validate on backend** - Always validate order data server-side
5. **HTTPS only** - Payment forms must use HTTPS in production

## Troubleshooting

### "Stripe is not defined"

- Ensure `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set in `.env.local`
- Run `npm install` to install `@stripe/react-stripe-js` and `@stripe/stripe-js`

### Payment fails with "undefined is not a function"

- Check that Stripe is loaded before rendering CardElement
- Verify Elements provider wraps the PaymentForm

### "Invalid API Key" error

- Verify the publishable key is correct and starts with `pk_test_` (test) or `pk_live_` (production)
- Check environment variable is set

### Payment succeeds but no order confirmation

- Check backend is receiving payment intent correctly
- Verify `order._id` is returned in payment intent response
- Check browser console for fetch errors

## Next Steps

1. **Test with your backend** - Ensure endpoints match implementation
2. **Add email notifications** - Send order confirmation emails
3. **Implement webhooks** - Handle Stripe events (payment.success, payment.failure)
4. **Add order tracking** - Build order history page
5. **Implement refunds** - Add refund functionality in admin panel
6. **Add more payment methods** - Support Apple Pay, Google Pay, etc.

## Support

For Stripe documentation, visit: https://stripe.com/docs
For Next.js documentation, visit: https://nextjs.org/docs
