'use client';

import { PriceSection } from '@/components/checkout/price-section';
import { CheckoutFormGradients } from '@/components/gradients/checkout-form-gradients';
import { type Environments, initializePaddle, type Paddle } from '@paddle/paddle-js';
import type { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import throttle from 'lodash.throttle';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

interface PathParams {
  priceId: string;
  [key: string]: string | string[];
}

interface Props {
  userEmail?: string;
}

export function CheckoutContents({ userEmail }: Props) {
  const { priceId } = useParams<PathParams>();
  const [quantity, setQuantity] = useState<number>(1);
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutEventsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckoutEvents = (event: CheckoutEventsData) => {
    setCheckoutData(event);
  };

  const updateItems = useCallback(
    throttle((paddle: Paddle, priceId: string, quantity: number) => {
      paddle.Checkout.updateItems([{ priceId, quantity }]);
    }, 1000),
    [],
  );

  useEffect(() => {
    // Debug logging
    console.log('Checkout initialization:', {
      hasToken: !!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
      environment: process.env.NEXT_PUBLIC_PADDLE_ENV,
      priceId,
      userEmail,
      paddleInitialized: paddle?.Initialized,
    });

    if (!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN) {
      setError('Paddle client token is missing. Please configure NEXT_PUBLIC_PADDLE_CLIENT_TOKEN in your .env.local file.');
      return;
    }

    if (!process.env.NEXT_PUBLIC_PADDLE_ENV) {
      setError('Paddle environment is missing. Please configure NEXT_PUBLIC_PADDLE_ENV in your .env.local file.');
      return;
    }

    if (!priceId) {
      setError('Price ID is missing from the URL.');
      return;
    }

    if (!paddle?.Initialized) {
      console.log('Initializing Paddle...');
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
        eventCallback: (event) => {
          console.log('Paddle event:', event.name, event);
          if (event.name === 'checkout.error') {
            console.error('Checkout error event:', event);
            setError(`Checkout error: ${JSON.stringify(event.data)}`);
          }
          if (event.data && event.name) {
            handleCheckoutEvents(event.data);
          }
        },
        checkout: {
          settings: {
            variant: 'one-page',
            displayMode: 'inline',
            theme: 'dark',
            allowLogout: !userEmail,
            frameTarget: 'paddle-checkout-frame',
            frameInitialHeight: 450,
            frameStyle: 'width: 100%; background-color: transparent; border: none',
            successUrl: `${window.location.origin}/checkout/success`,
          },
        },
      }).then(async (paddleInstance) => {
        if (paddleInstance && priceId) {
          console.log('Paddle initialized successfully');
          setPaddle(paddleInstance);
          try {
            console.log('Opening checkout with:', {
              priceId,
              quantity: 1,
              userEmail,
            });
            paddleInstance.Checkout.open({
              ...(userEmail && { customer: { email: userEmail } }),
              items: [{ priceId: priceId, quantity: 1 }],
            });
          } catch (error) {
            console.error('Paddle Checkout.open error:', error);
            setError(`Failed to open checkout: ${error instanceof Error ? error.message : String(error)}`);
          }
        }
      }).catch((error) => {
        console.error('Paddle initialization error:', error);
        setError(`Failed to initialize Paddle: ${error instanceof Error ? error.message : String(error)}`);
      });
    }
  }, [paddle?.Initialized, priceId, userEmail]);

  useEffect(() => {
    if (paddle && priceId && paddle.Initialized) {
      updateItems(paddle, priceId, quantity);
    }
  }, [paddle, priceId, quantity, updateItems]);

  return (
    <div
      className={
        'rounded-lg md:bg-background/80 md:backdrop-blur-[24px] md:p-10 md:pl-16 md:pt-16 md:min-h-[400px] flex flex-col justify-between relative'
      }
    >
      <CheckoutFormGradients />
      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h3 className="text-red-500 font-semibold mb-2">Checkout Error</h3>
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
      <div className={'flex flex-col md:flex-row gap-8 md:gap-16'}>
        <div className={'w-full md:w-[400px]'}>
          <PriceSection checkoutData={checkoutData} quantity={quantity} handleQuantityChange={setQuantity} />
        </div>
        <div className={'min-w-[375px] lg:min-w-[535px]'}>
          <div className={'text-base leading-[20px] font-semibold mb-8'}>Payment details</div>
          <div className={'paddle-checkout-frame'} />
        </div>
      </div>
    </div>
  );
}
