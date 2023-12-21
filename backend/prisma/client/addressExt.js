import { Prisma } from "@prisma/client";
import prisma from "./index.js";

const addressExt = Prisma.defineExtension({
    name: "address",
    model: {
        address: {
            async create({ data }) {
                const add = {
                    store_id: data.store_id,
                    location: {
                        longitude: data.longitude,
                        latitude: data.latitude,
                    },
                    street: data.street,
                    postcode: data.postcode,
                    city: data.city,
                    detail: data.detail
                }
                const point = `POINT(${add.location.longitude} ${add.location.latitude})`;
                await prisma.$queryRaw`
                INSERT INTO "Address" (store_id, location, street, postcode, city, detail) 
                VALUES (
                    ${add.store_id}, 
                    ST_GeomFromText(${point}, 4326),
                    ${add.street},
                    ${add.postcode},
                    ${add.city},
                    ${add.detail}
                    );
                    `
                    return add
                },
            async findClosestPoints({ longitude, latitude, radius }) {
                const ids = await prisma.$queryRaw
                `
                    SELECT 
                        store_id,
                        ST_Distance(Address.location, ST_MakePoint(${parseFloat(longitude)}, ${parseFloat(latitude)})) as distance
                    FROM "Address" Address
                    WHERE ST_DWithin(
                    Address.location,
                    ST_MakePoint(${parseFloat(longitude)}, ${parseFloat(latitude)}),
                    ${radius}         
                )
                    ORDER BY distance
                `
                return ids
            }
        },

    }
})

export default addressExt