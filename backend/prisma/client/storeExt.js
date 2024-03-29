import { Prisma } from "@prisma/client";
import prisma from "./index.js";

const storeExt = Prisma.defineExtension({
  name: "store",
  model: {
    store: {
      async findClosestStores({ longitude, latitude, radius }) {
        const result = await prisma.$queryRaw`
                SELECT DISTINCT ON (distance, Store.store_id)
                    Store.store_id,
                    Store.name,
                    Store.active,
                    Store.description,
                    Store.enter_date,
                    Store.logo,
                    Store.background,
                    Address.street || ' ' || Address.postcode || ', ' || Address.city AS address,
                    ST_Distance(Address.location, ST_MakePoint(${parseFloat(longitude)}, ${parseFloat(latitude)})) as distance,
                    CASE WHEN Status.name = 'Neu' THEN true ELSE false END AS "isNew",
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
                    LEFT JOIN "_StoreStatus" StoreStatus on store.store_id = StoreStatus."B"
                    LEFT JOIN "Status" Status on Status.status_id = StoreStatus."A"
                WHERE ST_DWithin(
                    Address.location,
                    ST_MakePoint(${parseFloat(longitude)}, ${parseFloat(latitude)}),
                    ${radius}
                )
                ORDER BY distance, Store.store_id , "isNew" DESC
                `;
        return result;
      },
    },
  },
});

export default storeExt;
