import customer_groups from '../constant/default_customer_groups.json' assert { type: 'json'}
import member_groups from '../constant/default_member_groups.json' assert { type: 'json'}
import permissions from '../constant/default_permissions.json' assert { type: 'json'}
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
export async function createDefaultPermission() {
    for (const permission of permissions) {
        await prisma.Permission.upsert({
            where: {
                name: permission,
            },
            update: {},
            create: {
                name: permission,
            },
        });
    }
}


export async function checkPermission(store_member_id, permission) {
    const store_member = await prisma.StoreMember.findUnique({
        where: {
            store_member_id,
        },
        include: {
            group: {
                include: {
                    permissions: true,
                },
            },
        },
    });

    if (!store_member) {
        return false;
    }

    return store_member.group.permissions.some((p) => p.name === permission);

}