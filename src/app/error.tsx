'use client';

import Breadcrumb from '@/components/breadcrumb';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <Breadcrumb title={error.message}><button onClick={reset}>Try again</button></Breadcrumb>
    </div>
  );
}
