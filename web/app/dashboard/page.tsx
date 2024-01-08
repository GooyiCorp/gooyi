'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';


export default function Page() {
    const router = useRouter()
    useEffect(() => {
        const accessToken = typeof window !== "undefined" ? window.localStorage.getItem('accessToken') : false
        const refreshToken = typeof window !== "undefined" ? window.localStorage.getItem('refreshToken') : false
        if (!accessToken || !refreshToken) router.push('/')
    }, [])

    return (
        <div>


        </div>
    )
}