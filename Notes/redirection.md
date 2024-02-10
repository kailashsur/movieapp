## Best approch to make redirection according to a condition

<code>
'use client'
 
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
 
export default function Page() {
  const router = useRouter()

  const [auth, setAuth] = useState(false);
 
  // Function to handle navigation to the dashboard
  const goToDashboard = () => {
    router.push('/');
  }

  // Effect hook to perform navigation when auth state changes
  useEffect(() => {
    if (!auth) {
      goToDashboard();
    }
  }, [auth]);

  // Render button for authenticated user
  return (
    <button type="button" onClick={goToDashboard}>
      Dashboard
    </button>
  );
}

<code>