'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';


export default function Page() {
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (!accessToken || !refreshToken) router.push('/')
    }, [])

    return (
        <div>


        </div>
    )
}