export const fotowareConfig = {
    baseUrl: window.AdminSettings.fotoware_base_url,
    wpJsonEndpoint: '/wp-json/api/v1/fotoware-api-layer/',
    restOptions: {
        withCredentials: true,
        headers: {
            'X-WP-Nonce': window.AdminSettings.rest.nonce
        }
    },
    archives: {
        endpoint: '/fotoweb/me/archives/',
        accept: 'application/vnd.fotoware.collectionlist+json'
    },
    assets: {
        endpoint: '/fotoweb/archives/',
        date: 'mtf=1990-01-01',
        accept: 'application/vnd.fotoware.assetlist+json'
    },
    search: {
        endpoint: '/fotoweb/archives/',
        date: 'mtf=1990-01-01',
        accept: 'application/vnd.fotoware.assetlist+json'
    }
};