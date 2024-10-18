import {loadStripe} from '@stripe/stripe-js';
export const stripeLoader = await loadStripe('pk_test_51QAUcPFWJ6Mz06exh4BOzNQyXM5uYPjq5w71yZ4h06hHkqAj0fp9E8Eg5MZZMh2vd8PdGbbpnVWSsH6uUyaaG37A00sFPxnWXH');

console.log('l',stripeLoader);
