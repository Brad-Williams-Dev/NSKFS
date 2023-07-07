import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'uqzl86v4',
    dataset: 'production',
    useCdn: true // Enable CDN caching (optional, but recommended)
});

export default client;
