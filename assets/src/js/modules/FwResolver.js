import http from 'services/httpService'
import { fotowareConfig } from '../utils/constants';

export default class FW {
    assetsNavigationHandler(ev) {
        const endpoint = $(ev.target).data('href').replace('T00%3A00%3A00%2B01%3A00', '');

        return http.get(`${fotowareConfig.wpJsonEndpoint}?endpoint=${encodeURIComponent(`${endpoint}`)}&accept=${encodeURIComponent(fotowareConfig.assets.accept)}`, fotowareConfig.restOptions)
    }

    assetsSearchHandler(ev) {
        const endpoint = $(ev.target).data('href');
        const query = ev.target.value;

        return http.get(`${fotowareConfig.wpJsonEndpoint}?endpoint=${encodeURIComponent(`${endpoint}?q=${query}&${fotowareConfig.assets.date}`)}&accept=${encodeURIComponent(fotowareConfig.assets.accept)}`, fotowareConfig.restOptions)
    }

    assetsRequestHandler(ev) {
        const endpoint = $(ev.target).data('href');

        return http.get(`${fotowareConfig.wpJsonEndpoint}?endpoint=${encodeURIComponent(endpoint + '?' + fotowareConfig.assets.date)}&accept=${encodeURIComponent(fotowareConfig.assets.accept)}`, fotowareConfig.restOptions)
    }

    archiveRequestHandler() {
        return http.get(`${fotowareConfig.wpJsonEndpoint}?endpoint=${encodeURIComponent(fotowareConfig.archives.endpoint)}&accept=${encodeURIComponent(fotowareConfig.archives.accept)}`, fotowareConfig.restOptions)
    }
}