import groups from '../constant/default_customer_groups.json' assert { type: 'json'}
import prisma from '../prisma/client/index.js';

export async function createDefaultGroup(store_id) {
    for (const group of groups) {
        await prisma.CustomerGroup.upsert({
            where: {
                store_id_title: {
                    store_id,
                    title: group.title,
                },
            },
            update: {},
            create: {
                title: group.title,
                store: {
                    connect: { store_id: store_id },
                },
            },
        });
    }
}