// Cache connection
import { createClient } from "redis";
const Redis = createClient({ url: 'redis://redis:6379' });
export default Redis