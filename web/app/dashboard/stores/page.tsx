'use client'

import { Button } from "@/app/ui/button";
import { Card } from "@/app/ui/dashboard/cards";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
type error =  {
    success: boolean;
    message: string;
} 
export default function Page() {
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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)       
        try {
            const response = await axios.post('http://gooyi.de:8000/api/admin/store/upload', formData)
            console.log(response.data);
            

        } catch (err: any) {
            const data: error = err.response?.data
            console.log(data);
        
        }

    };


    return (
        <div>
            <p className="text-3xl font-bold my-5 py-5">Stores</p>
            <div>
                <Card 
                    title="Total Stores"
                    value={storeCount}
                    type="customers"
                />
            </div>
            <p className="text-2xl font-semibold my-10 py-10">Upload Store photos</p>
            <div className="container w-1/2  h-80 border-2 border-black rounded my-8 flex items-center justify-center">
                {previewUrl && <img className="" src={previewUrl} alt="Preview" />}
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
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
        </div>

    );
}