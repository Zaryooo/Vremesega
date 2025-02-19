// app/error-component.tsx
'use client';

import React from 'react';

export default function ErrorComponent() {
  React.useEffect(() => {
    throw new Error('This is a 500 error');
  }, []);

  return null;
}