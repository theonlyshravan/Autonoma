'use client';

import { useAuth } from '../app/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Role = 'customer' | 'service' | 'manufacturer';

export default function RequireAuth({
    children,
    allowedRoles
}: {
    children: React.ReactNode,
    allowedRoles: Role[]
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
            } else if (!allowedRoles.includes(user.role)) {
                // Redirect to their allowed dashboard if they try to access another
                if (user.role === 'customer') router.push('/dashboard/customer');
                else if (user.role === 'service') router.push('/dashboard/service');
                else if (user.role === 'manufacturer') router.push('/dashboard/manufacturing');
                else router.push('/login'); // Fallback
            }
        }
    }, [user, loading, router, allowedRoles]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                <div className="text-blue-500 animate-pulse">Loading Authorization...</div>
            </div>
        );
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return null; // Will redirect
    }

    return <>{children}</>;
}
