import express from 'express';
import { logger } from '../../helper/logger.js';
import { sendError, sendServerError, sendSuccess } from '../../helper/client.js';
import prisma from '../../prisma/client/index.js';
import groups from '../../constant/default_customer_groups.json' assert { type: 'json'}


const groupRoute = express.Router()

groupRoute.get('/', async (req, res) => {
    const store_member_id = req.user.id
    try {
        const store = await prisma.store.findMany({
            where: {
                Mod: {
                    some: {
                        store_member_id
                    }
                }
            }, 
            select: { CustomerGroup: {
                select: {
                    customer_group_id: true,
                    title: true
                }
            }} })
        const result = store[0].CustomerGroup
        return sendSuccess(res, "ok", result)
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})

groupRoute.post('/create', async (req, res) => {
    const store_member_id = req.user.id
    const title = req.body.title
    if (!title) return sendError(res, "title must be provided")
    if (groups.some(group => group.title.toLowerCase() === title.toLowerCase())) return sendError(res, "Can not recreate default group")
    try {
        const member = await prisma.StoreMember.findUnique({where: {store_member_id}, select: {store_id: true}})
        await prisma.CustomerGroup.upsert({
            where: {
                store_id_title: {
                    store_id: member.store_id,
                    title,
                },
            },
            update: {},
            create: {
                title,
                store: {
                    connect: { store_id: member.store_id },
                },
            },
        }); 
        return sendSuccess(res, "Create group successfully")
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})

groupRoute.put('/add-user', async (req, res) => {
    const store_member_id = req.user.id
    const {user_id, customer_group_id} = req.body
    if (!(customer_group_id && customer_group_id)) return sendError(res, "User and customer group are required")
    try {
        const storeGroups = await prisma.CustomerGroup.findMany({
            where: {
                store: {
                    Mod: {
                        some: {
                            store_member_id
                        }
                    }
                }
            },
            select: {
                customer_group_id: true,
                store_id: true,
                title: true
            }
        })
        const group = storeGroups.find(x=> x.customer_group_id === customer_group_id)
        if (!group) return sendError(res, "Customer group not found");
        if (groups.some(g => g.title === group.title)) return sendError(res, "Cannot add to default groups")
        const customer = await prisma.customer.findUnique({where: {user_id_store_id: {user_id, store_id: group.store_id}}, select: {user_id: true}})
        if (!customer) return sendError(res, "This user isn't a customer")

        await prisma.CustomerGroup.update({where: {customer_group_id}, data: {
            customers: {
                connect: {user_id}
            }
        }})
        return sendSuccess(res, "Add user to group successfully")
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})

groupRoute.put('/delete-user', async (req, res) => {
    const store_member_id = req.user.id
    const { user_id, customer_group_id } = req.body
    if (!(customer_group_id && customer_group_id)) return sendError(res, "User and customer group are required")
    try {
        const storeGroups = await prisma.CustomerGroup.findMany({
            where: {
                store: {
                    Mod: {
                        some: {
                            store_member_id
                        }
                    }
                }
            },
            select: {
                customer_group_id: true,
                store_id: true,
                title: true
            }
        })
        const group = storeGroups.find(x => x.customer_group_id === customer_group_id)
        if (!group) return sendError(res, "Customer group not found");
        if (groups.some(g => g.title === group.title)) return sendError(res, "Cannot delete from default groups")
        await prisma.CustomerGroup.update({where: {customer_group_id}, data: {
            customers: {
                disconnect: {user_id}
            }
        }})
        return sendSuccess(res, "Delete user from group successfully")
    } catch (err) {
        logger.error(err)
        return sendServerError(res)
    }
})
export default groupRoute