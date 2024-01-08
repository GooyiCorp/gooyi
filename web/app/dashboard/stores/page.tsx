'use client'

import { Button } from "@/app/ui/button";
import { Card } from "@/app/ui/dashboard/cards";
import Request from "@/helper/request";
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
    const accessToken = typeof window !== "undefined" ? window.localStorage.getItem('accessToken') : false
    const refreshToken = typeof window !== "undefined" ? window.localStorage.getItem('refreshToken') : false
    useEffect(() => {
        if (!accessToken || !refreshToken) {
            router.push('/')
        } else {setLoggedIn(true)}
    }, [])
    
    // Create store
    type opening = {
        Mon: string;
        Tue: string;
        Wed: string;
        Thu: string;
        Fri: string;
        Sat: string;
        Sun: string;
    } | null
    const [name, setName] = useState<string>("")
    const [active, setActive] = useState<boolean>(false)
    const [description, setDescription] = useState<string>("")
    const [enterDate, setEnterDate] = useState<string>('')
    const [longitude, setLongitude] = useState<string>("")
    const [latitude, setLatitude] = useState<string>("")
    const [street, setStreet] = useState<string>("")
    const [postcode, setPostcode] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [openingHours, setOpeningHours] = useState<opening>({
        Mon: '',
        Tue: '',
        Wed: '',
        Thu: '',
        Fri: '',
        Sat: '',
        Sun: '',
    })
    const [categories, setCategories] = useState<string[]>([])
    const [category,  setCategory] = useState<string | null>("")
    const [services, setServices] = useState<string[]>([])
    const [service, setService] = useState<string>("")
    const addCategory = (event: any) => {
        event.preventDefault();
        setCategory('')
        setCategories(prev => [...prev, category])    
    }
    const dropCategory = (event: any) => {
        event.preventDefault();
        setCategories(prev => prev.slice(0, -1))
    }
    const addService = (event: any) => {
        event.preventDefault();
        setService('')
        setServices(prev => [...prev, service])    
    }
    const dropService = (event: any) => {
        event.preventDefault();
        setServices(prev => prev.slice(0, -1))
    }

    const handleCreateStore = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = { name, active, description, enter_date: enterDate, longitude, latitude, street, postcode, city, opening_hours:openingHours, service: services, category: categories }
        const response = await Request('admin/store/create', "POST", data, accessToken)
        console.log(response)
        if (response.success) {
            toast(response.message, { autoClose: 2000, type: 'success' })
        }    
        
    }




    // Change Store fotos    
    const [image, setImage] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState<any>(null);
    const [storeCount, setStoreCount] = useState<number>(null);
    const getStoreCount = async () => {
            const response = await Request('admin/store', "GET", null, accessToken)
            setStoreCount(response.data.length);
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
        const response = await Request('admin/store/upload', "POST", formData, accessToken)
        if (response.success) {
            toast(response.message, { autoClose: 2000, type: 'success' })
        }
    };


    // Update opening hours


    const handleUpdateHours = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const response = await Request('admin/opening-hours/', "PUT", formData, accessToken)
        if (response.success) {
            toast(response.message, { autoClose: 2000, type: 'success' })
        } 
    }







    return (
        isLoggedIn && 
        <div>
            <ToastContainer />
            <p className="text-3xl font-bold my-5 py-5">Stores</p>
            <div>
                <Card 
                    title="Total Stores"
                    value={storeCount}
                    type="customers"
                />
            </div>

            {/* Create Store */}
            
            <p className="text-2xl font-semibold my-5 py-10">Create Store</p>
            <form className="flex flex-col" onSubmit={handleCreateStore}>
                <input type="text" placeholder="Store Name" className="rounded max-w-sm my-5"  onChange={e => setName(e.currentTarget.value)} value={name}/>
                <div className="flex flex-row ">
                    <p>Active: {active ? "True" : "False"}</p>
                    <button onClick={() => setActive(prev => !prev)} className="rounded border-2 w-20 mx-1">change</button>
                </div>
                <input type="text" placeholder="Description" value={description} className="rounded max-w-sm my-5" onChange={e => setDescription(e.currentTarget.value)}/>
                    <div className="flex items-center">
                    <p>Enter Date: </p>
                    <input type="date" placeholder="Enter Date" className="rounded max-w-sm my-5 mx-2" onChange={e => setEnterDate(e.currentTarget.value)}/>
                </div>
                <input type="text" placeholder="Longitude" value={longitude} className="rounded max-w-sm my-5" onChange={e => setLongitude(e.currentTarget.value)}/>
                <input type="text" placeholder="Latitude" value={latitude} className="rounded max-w-sm my-5" onChange={e => setLatitude(e.currentTarget.value)} />
                <input type="text" placeholder="Street" value={street} className="rounded max-w-sm my-5" onChange={e => setStreet(e.currentTarget.value)} />
                <input type="text" placeholder="Post code" name={postcode} className="rounded max-w-sm my-5" onChange={e => setPostcode(e.currentTarget.value)} />
                <input type="text" placeholder="City" value={city} className="rounded max-w-sm my-5" onChange={e => setCity(e.currentTarget.value)} />
                <p className="text-l font-semibold my-1 py-1">Opening Hours</p>
                <input type="text" placeholder="Montag" value={openingHours.Mon} className="rounded max-w-sm my-5" onChange={e => setOpeningHours({ ...openingHours,Mon: e.currentTarget.value})}/>
                <input type="text" placeholder="Dienstag" value={openingHours.Tue} className="rounded max-w-sm my-5" onChange={e => setOpeningHours({ ...openingHours, Tue: e.currentTarget.value })} />
                <input type="text" placeholder="Mittwoch" value={openingHours.Wed} className="rounded max-w-sm my-5" onChange={e => setOpeningHours({ ...openingHours, Wed: e.currentTarget.value })} />
                <input type="text" placeholder="Donnerstag" value={openingHours.Thu} className="rounded max-w-sm my-5" onChange={e => setOpeningHours({ ...openingHours, Thu: e.currentTarget.value })} />
                <input type="text" placeholder="Fritag" value={openingHours.Fri} className="rounded max-w-sm my-5" onChange={e => setOpeningHours({ ...openingHours, Fri: e.currentTarget.value })} />
                <input type="text" placeholder="Samtag" value={openingHours.Sat} className="rounded max-w-sm my-5" onChange={e => setOpeningHours({ ...openingHours, Sat: e.currentTarget.value })} />
                <input type="text" placeholder="Sontag" value={openingHours.Sun} className="rounded max-w-sm my-5" onChange={e => setOpeningHours({ ...openingHours, Sun: e.currentTarget.value })} />
                
                {categories.map((item, index) => <span key={index}>{item}</span>)}
                <div className="flex items-center">
                    <p>Add Category: </p>
                    <input type="text" placeholder="Add Category" className="rounded max-w-sm my-5 mx-10" onChange={e => setCategory(e.currentTarget.value)} value={category}/>
                    <button className="rounded border-2 w-10 mx-1" onClick={e => addCategory(e)}>Add</button>
                    <button className="rounded border-2 w-10 mx-1" onClick={e => dropCategory(e)}>Drop</button>
                </div>
                {services.map((item, index) => <span key={index}>{item}</span>)}
                <div className="flex items-center">
                    <p>Add Service: </p>
                    <input type="text" placeholder="Add Category" className="rounded max-w-sm my-5 mx-10" onChange={e => setService(e.currentTarget.value)} value={service}/>
                    <button className="rounded border-2 w-10 mx-1" onClick={e => addService(e)}>Add</button>
                    <button className="rounded border-2 w-10 mx-1" onClick={e => dropService(e)}>Drop</button>
                </div>
                <Button className="flex justify-center my-5 py-5 w-28">
                    <p className="text-xl font-semibold">Submit</p>
                </Button>
            </form>




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