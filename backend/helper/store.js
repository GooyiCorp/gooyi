import customer_groups from '../constant/default_customer_groups.json' assert { type: 'json'}
import member_groups from '../constant/default_member_groups.json' assert { type: 'json'}
import prisma from '../prisma/client/index.js';

export async function createDefaultGroup(store_id) {
    for (const group of customer_groups) {
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
                    connect: { store_id },
                },
            },
        });
    }
}

export async function createDefaultGroupMember(store_id) {
    for (const group of member_groups) {
        await prisma.StoreMemberGroup.upsert({
            where:{
                store_id_name: {
                    store_id,
                    name: group.name,
                }
            },
            update: {},
            create: {
                name: group.name,
                store: {
                    connect: { store_id: store_id },
                }
            },
            
        })
    }
}