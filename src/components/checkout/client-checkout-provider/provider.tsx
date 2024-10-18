'use client'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"
import { createPaymentIntent } from '@/actions/stripe/checkout-session'
import CheckoutForm from '../checkout-form'
import { Spinner } from '@/components/spinner'

type Props = {
  amount : number,
  caseId : string
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutProvider({amount, caseId}:Props) {
  const [loading, setLoading] = useState(true)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    async function fetchClientSecret() {
      try {
        const response = await createPaymentIntent(amount, caseId) // 70 dollars
        if(!response) return;
        setClientSecret(response.clientSecret)
      } catch (error) {
        console.error('Error fetching client secret:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClientSecret()
  }, [])

  if (loading || !clientSecret) {
    return (
      <div className="w-full h-[400px] flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  )
}