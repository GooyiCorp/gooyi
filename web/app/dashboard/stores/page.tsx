'use client'

import { Button } from "@/app/ui/button";
import { Card } from "@/app/ui/dashboard/cards";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type error =  {
    success: boolean;
    message: string;
} 
export default function Page() {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false)
    const router = useRouter()
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (!accessToken || !refreshToken) {
            router.push('/')
        } else {setLoggedIn(true)}
    }, [])
    
    
    // Change Store fotos

    
    const [image, setImage] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState<any>(null);
    const [storeCount, setStoreCount] = useState<number>(null);
    const getStoreCount = async () => {
        try {
            const response = await axios.get('http://gooyi.de:8000/api/admin/store')
            setStoreCount(response.data.data.length);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getStoreCount();
    }, [])
    useEffect(() => {
        if (!image) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
            
        }
        reader.readAsDataURL(image);
    }, [image])
    const handleChangePhoto = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)       
        try {
            const response = await axios.post('http://gooyi.de:8000/api/admin/store/upload', formData)
            if (response.data.success) {
                toast(response.data.message, { autoClose: 2000, type: 'success' })
            } 
        } catch (err) {
            const data: error = err.response?.data
            for (const message of data.message) {
                toast(message, { autoClose: 2000, type: 'error' })
            }
        }
    };


    // Update opening hours


    const handleUpdateHours = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        try {
            const response = await axios.put('http://gooyi.de:8000/api/admin/opening-hours/', formData)
            if (response.data.success) {
                toast(response.data.message, { autoClose: 2000, type: 'success' })
            } 
        } catch (err) {
            const data: error = err.response?.data
            console.log(data);
            for (const message of data.message ) {
                toast(message, { autoClose: 2000, type: 'error'})
            }
        }
        

    }







    return (
        isLoggedIn && <div>
            <ToastContainer />
            <p className="text-3xl font-bold my-5 py-5">Stores</p>
            <div>
                <Card 
                    title="Total Stores"
                    value={storeCount}
                    type="customers"
                />
            </div>

            {/* Store Fotos */}


            <p className="text-2xl font-semibold my-10 py-10">Upload Store photos</p>
            <div className="container w-1/2  h-80 border-2 border-black rounded my-8 flex items-center justify-center">
                {previewUrl && <img className="" src={previewUrl} alt="Preview" />}
            </div>
            <form className="flex flex-col" onSubmit={handleChangePhoto}>
                <input type="number" placeholder="store_id" className="rounded max-w-sm my-5" name="store_id"/>
                <select name="type" placeholder="Select type" className="max-w-sm my-5">
                    <option value={'logo'}>Logo</option>
                    <option value={'background'}>Background</option>
                </select>
                <input type="file" onChange={e => setImage(e.target.files[0])} className="my-5" name="image"/>
                <Button className="flex justify-center my-5 py-5 w-28">
                    <p className="text-xl font-semibold">Submit</p>
                </Button>
            </form>



            {/* Change opening hours */}
            <p className="text-2xl font-semibold my-10 py-10">Update opening hours</p>
            <form className="flex flex-col" onSubmit={handleUpdateHours}>
                <input type="number" placeholder="store_id" className="rounded max-w-sm my-5" name="store_id" />
                <p className="text-l font-semibold">Day:</p>
                <select name="day" placeholder="Select day" className="max-w-sm my-5">
                    <option value={'Mon'}>Mon</option>
                    <option value={'Tue'}>Tue</option>
                    <option value={'Wed'}>Wed</option>
                    <option value={'Thu'}>Thu</option>
                    <option value={'Fri'}>Fri</option>
                    <option value={'Sat'}>Sat</option>
                    <option value={'Sun'}>Sun</option>
                </select>
                <p className="text-l font-semibold my-5" >Time to update:</p>
                <input type="text" name="timeString" className="rounded max-w-sm my-5" placeholder="Example: 12:00-20:00"/>
                <Button className="flex justify-center my-5 py-5 w-28">
                    <p className="text-xl font-semibold">Submit</p>
                </Button>
            </form>
        </div>

    );
}