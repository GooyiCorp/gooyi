import { describe, it, assert, assertType } from 'vitest'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()


const host = process.env.host
const PORT = process.env.PORT || 8000

describe('GET /user/category', async () => {
    it('Test get list of categories', async () => {
        const response = await axios.get(`http://${host}:${PORT}/api/user/categories?longitude=8.813460686760042&latitude=53.08322120860202&radius=100000`)
        assert.equal(response.status, 200)
        assert.isArray(response.data.data)
        for (const key in response.data.data) {
            const cate = response.data.data[key]
            assert.hasAllKeys(cate, ['name', 'count'])
            assertType(cate.name, 'string')
            assertType(cate.count, 'number')
        }
    })

    it('Test get stores by category', async () => {
        const response = await axios.get(`http://${host}:${PORT}/api/user/categories/store?name=Sushi&longitude=8.813460686760042&latitude=53.08322120860202&radius=10000`)
        assert.equal(response.status, 200)
        assert.isArray(response.data.data)
        for (const key in response.data.data) {
            const store = response.data.data[key]
            assert.hasAllKeys(store, ['store_id', 'name', 'active', 'description', 'enter_date', 'logo', 'background', 'distance', 'create_at', 'update_at'])
        }
    })
})