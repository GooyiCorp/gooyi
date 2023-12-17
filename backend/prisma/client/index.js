import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
    model: {
        address: {
            async create(data) {
                const add = {
                    store_id: data.store_id,
                    location: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                    },
                    street: data.street,
                    postcode: data.postcode,
                    city: data.city,
                    detail: data.detail
                }
                const point = `POINT(${add.location.longitude} ${add.location.latitude})`;
            }
        }
    }
})


export default prisma