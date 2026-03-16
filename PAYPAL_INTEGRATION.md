# PayPal Integration Setup Guide

## Overview

PayPal integration is now **fully implemented** and ready to use! Users can now:
- Click "Pay via PayPal" on service detail pages
- Get redirected to PayPal sandbox for secure payment
- Return to the app and automatically create orders
- Track their orders in My Profile

## What's Implemented

### ✅ Backend (Django)

**New Files:**
- `backend/.env` - PayPal credentials (sandbox mode)
- `orders/paypal_service.py` - PayPal API service class
- Updated `orders/views.py` - Payment endpoints
- Updated `orders/urls.py` - Payment routes

**New API Endpoints:**
- `POST /api/v1/orders/payment/create/` - Create PayPal payment
- `POST /api/v1/orders/payment/execute/` - Execute payment after approval

**Environment Variables:**
```ini
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=sb-wirk049218571@business.example.com
PAYPAL_CLIENT_SECRET=>cdzX6O<
PAYPAL_BUSINESS_ACCOUNT=sb-wirk049218571@business.example.com
PAYPAL_CURRENCY=PHP
PAYPAL_RETURN_URL=http://localhost:3000/order-success
PAYPAL_CANCEL_URL=http://localhost:3000/order-cancelled
```

### ✅ Frontend (React)

**New Files:**
- `src/components/PayPalPayment.jsx` - Reusable payment button component
- `src/screens/OrderSuccessScreen.jsx` - Payment success page
- `src/screens/OrderCancelledScreen.jsx` - Payment cancellation page

**Updated Files:**
- `src/screens/DetailScreen.jsx` - Integrated PayPal button
- `src/App.js` - Added success/cancelled routes

## How It Works

### Payment Flow

1. **User Clicks "Pay via PayPal"** on service detail page
   - Component validates user is logged in
   - Sends service details to backend

2. **Backend Creates Payment**
   - `CreatePaymentView` receives service details
   - Generates PayPal payment with item info
   - Returns approval URL to frontend

3. **Redirect to PayPal**
   - User redirected to PayPal sandbox
   - Logs in with test account
   - Reviews and approves payment

4. **Return to App**
   - PayPal redirects back to `/order-success`
   - URL includes: `paymentId`, `PayerID`, `serviceId`

5. **Execute Payment**
   - `ExecutePaymentView` confirms payment with PayPal
   - Creates Order record in database
   - Stores transaction ID and price

6. **Show Confirmation**
   - Display order details
   - Show transaction ID
   - Link to order history

## Testing the Integration

### Using Sandbox Credentials

**Buyer Account (for testing payments):**
```
Email: sb-hgxyb49992522@personal.example.com
Password: xL90GPX^
Account ID: USAQRZ8P2PC9E
```

**Business Account (for receiving payments):**
```
Email: sb-wirk049218571@business.example.com
Password: >cdzX6O<
Account ID: MPP6DRPBU5ZYN
```

### Step-by-Step Test

1. **Start Backend:**
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm start
   ```

3. **Create User Account** (or use registered account)
   - Click "Sign Up"
   - Fill in details
   - Submit

4. **Browse Services**
   - Go to Home page
   - Navigate to any service detail page

5. **Initiate Payment**
   - Click "Pay ₱[amount] via PayPal" button
   - You'll be redirected to PayPal sandbox

6. **Use Buyer Credentials**
   - Email: `sb-hgxyb49992522@personal.example.com`
   - Password: `xL90GPX^`
   - Click "Approve" or "Pay Now"

7. **See Order Confirmation**
   - Should see success page
   - Shows order ID and transaction ID
   - Can view in "My Profile" → "Order History"

## Important Notes

### Sandbox vs Live Mode

Current setup uses **SANDBOX** mode for testing:
- No real money is charged
- All transactions are test transactions
- Test credentials required

To switch to **LIVE**:
1. Get live API credentials from PayPal
2. Update `.env` file with live credentials
3. Change `PAYPAL_MODE=live`
4. Deploy to production

### Security Considerations

✅ **Already Implemented:**
- Token-based authentication (JWT)
- Server-side payment validation
- Environment variables for secrets (`.env`)
- Secure payment confirmation
- Transaction ID tracking

📌 **For Production:**
- Use HTTPS only
- Store `.env` securely (not in git)
- Enable CSRF protection
- Validate all inputs server-side
- Log payment attempts
- Monitor for fraud

### Common Issues

**Issue: "Failed to create payment"**
- Check `.env` file has correct credentials
- Verify PayPal mode is `sandbox`
- Ensure backend is running
- Check API responses in browser DevTools

**Issue: "Payment execution failed"**
- Verify user approved payment on PayPal
- Check internet connection
- Ensure correct `paymentId` and `PayerID`
- Check backend logs for details

**Issue: Order not created**
- Check backend `/orders/history/` endpoint
- Verify service exists in database
- Check JWT token is valid
- Look at Chrome DevTools Network tab

## File Structure

```
backend/
├── .env                          # PayPal credentials
├── orders/
│   ├── paypal_service.py        # PayPal API service
│   ├── views.py                 # Payment endpoints
│   ├── urls.py                  # Payment routes
│   └── models.py                # Order model (unchanged)

frontend/
├── src/
│   ├── components/
│   │   └── PayPalPayment.jsx    # Payment button component
│   ├── screens/
│   │   ├── DetailScreen.jsx     # Updated with PayPal
│   │   ├── OrderSuccessScreen.jsx
│   │   └── OrderCancelledScreen.jsx
│   └── App.js                   # Updated routes
```

## API Response Examples

### Create Payment Response
```json
{
  "success": true,
  "payment_id": "PAYID-1ABC2DEF3GHI4JKL5MN",
  "approval_url": "https://www.sandbox.paypal.com/checkoutnow?token=EC-8XN...",
  "service_id": 1,
  "service_name": "Tile Floor Installation",
  "price": 2500
}
```

### Execute Payment Response
```json
{
  "success": true,
  "message": "Payment executed and order created successfully!",
  "order": {
    "id": 15,
    "buyer": "john@example.com",
    "service": 1,
    "paypal_transaction_id": "6UP123456789012PM",
    "price_paid": 2500,
    "date_purchased": "2026-03-16T10:30:00Z"
  },
  "payment_id": "PAYID-1ABC2DEF3GHI4JKL5MN",
  "transaction_id": "6UP123456789012PM"
}
```

## Next Steps

1. **Test the flow** - Complete a sample payment
2. **Verify in admin** - Check order appears in `/orders/history/`
3. **Check transaction IDs** - Confirm PayPal IDs are stored
4. **Monitor logs** - Watch backend logs during payment

## Troubleshooting

**Need help?**
- Check browser console (F12 → Console tab)
- Check network requests (F12 → Network tab)
- View backend logs in terminal
- Check Django admin for orders
- Verify `.env` file has all required variables

## Additional Resources

- [PayPal REST API Docs](https://developer.paypal.com/docs/api/overview/)
- [PayPal Python SDK](https://github.com/paypal/PayPal-Python-SDK)
- [PayPal Sandbox Testing](https://developer.paypal.com/docs/api/overview/sandbox/)
