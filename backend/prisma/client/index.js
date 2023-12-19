import { Prisma, PrismaClient } from "@prisma/client";

const addressExt = Prisma.defineExtension({
    name: "address",
    model: {
        address: {
            async create({data}) {
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
            }
        },
        
    }
})

const storeExt = Prisma.defineExtension({
    name: 'store',
    model: {
        store: {
            async findClosestStores({ longitude, latitude, radius }) {
                const result = await prisma.$queryRaw
                    `
                SELECT  
                    Store.store_id, 
                    Store.name,
                    Store.category,
                    Store.active,
                    Store.description,
                    Store.enter_date,
                    Store.logo,
                    Store.background,
                    Address.street || ' ' || Address.postcode || ', ' || Address.city AS address,
                    ST_Distance(Address.location, ST_MakePoint(${parseFloat(longitude)}, ${parseFloat(latitude)})) as distance,
                    json_build_object(
                        'Mon', OpeningHour."Mon",
                        'Tue', OpeningHour."Tue",
                        'Wed', OpeningHour."Wed",
                        'Thu', OpeningHour."Thu",
                        'Fri', OpeningHour."Fri",
                        'Sat', OpeningHour."Sat",
                        'Sun', OpeningHour."Sun"
                    ) as opening_hours
                FROM 
                    "Store" Store 
                    INNER JOIN "Address" Address ON Store.store_id = Address.store_id
                    INNER JOIN "OpeningHour" OpeningHour ON Store.store_id = OpeningHour.store_id
                WHERE ST_DWithin(
                    Address.location,
                    ST_MakePoint(${parseFloat(longitude)}, ${parseFloat(latitude)}),
                    ${radius}         
                )
                ORDER BY distance
                `
                return result
            }
        }
    }
})

const prisma = new PrismaClient().$extends(addressExt).$extends(storeExt)


export default prisma


// npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma
