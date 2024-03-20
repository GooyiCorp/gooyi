import { describe, it, assert } from 'vitest'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const host = process.env.host
const PORT = process.env.PORT || 8000

describe('GET /user/store', async () => {
    it('Test get stores', async () => {
        const response = await axios.get(`http://${host}:${PORT}/api/user/store?longitude=8.813460686760042&latitude=53.08322120860202&radius=100000`)
        assert.equal(response.status, 200)
        assert.isArray(response.data.data)
        for (const key in response.data.data) {
            const store = response.data.data[key]
            assert.hasAllKeys(store, ['store_id', 'name', 'active', 'description', 'enter_date', 'logo', 'background', 'address', 'distance', 'isNew', 'opening_hours'])
        }
    })
})
