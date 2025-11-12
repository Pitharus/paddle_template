'use client';

import { useEffect, useState } from 'react';

export default function DebugPaddlePage() {
  const [config, setConfig] = useState<{
    hasToken: boolean;
    tokenPrefix: string;
    environment: string | undefined;
    tokenLength: number;
  } | null>(null);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '';
    setConfig({
      hasToken: !!token,
      tokenPrefix: token.substring(0, 10),
      environment: process.env.NEXT_PUBLIC_PADDLE_ENV,
      tokenLength: token.length,
    });
  }, []);

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Paddle Configuration Debug</h1>
        
        <div className="space-y-4">
          <div className="p-6 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
            {config && (
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span>Has Token:</span>
                  <span className={config.hasToken ? 'text-green-500' : 'text-red-500'}>
                    {config.hasToken ? '✓ Yes' : '✗ No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Token Prefix:</span>
                  <span className="text-blue-400">{config.tokenPrefix || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Token Length:</span>
                  <span className={config.tokenLength > 30 ? 'text-green-500' : 'text-red-500'}>
                    {config.tokenLength} chars {config.tokenLength > 30 ? '✓' : '✗ (should be ~40-50 chars)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Environment:</span>
                  <span className={config.environment ? 'text-green-500' : 'text-red-500'}>
                    {config.environment || 'NOT SET'}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Common Issues</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">⚠️</span>
                <span>
                  <strong>Token too short:</strong> Your client token appears incomplete. It should be around 40-50 characters.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">⚠️</span>
                <span>
                  <strong>Invalid Price ID:</strong> Make sure the price ID exists in your Paddle {config?.environment} account.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">⚠️</span>
                <span>
                  <strong>Price not active:</strong> Check that the price is active in your Paddle dashboard.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">How to Fix</h2>
            <ol className="space-y-3 text-sm list-decimal list-inside">
              <li>
                Go to{' '}
                <a
                  href="https://sandbox-vendors.paddle.com/authentication-v2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Paddle Sandbox → Developer Tools → Authentication
                </a>
              </li>
              <li>Create a new <strong>Client-side token</strong> (not API key)</li>
              <li>Copy the FULL token (it should start with <code className="px-1 py-0.5 bg-muted rounded">test_</code>)</li>
              <li>Update your <code className="px-1 py-0.5 bg-muted rounded">.env</code> file with the complete token</li>
              <li>Restart your development server</li>
            </ol>
          </div>

          <div className="p-6 bg-card rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Test Price ID</h2>
            <p className="text-sm mb-4">
              Go to{' '}
              <a
                href="https://sandbox-vendors.paddle.com/products"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Paddle Sandbox → Products
              </a>
              {' '}to find a valid price ID.
            </p>
            <p className="text-sm text-muted-foreground">
              Example: <code className="px-1 py-0.5 bg-muted rounded">pri_01k9q29xjybx2r9pptec3ht08b</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
