export const apiUrl = `${window.ThemeSettings.rest.url}${window.ThemeSettings.rest.namespace}`;

export const profile = {
    connectIdAuth: window.ThemeSettings.profile.connect_id_auth,
    connectIdRegistration: window.ThemeSettings.profile.connect_id_registration,
    isLogged: window.ThemeSettings.profile.is_logged_in,
    isSubscribed: window.ThemeSettings.profile.is_subscribed
};

export const gdpr = window.ThemeSettings.gdpr;

export const products = window.ThemeSettings.products;

export const isInApp = window.navigator.userAgent === '_pm_redirect_to_login_';

export const apiEndpoints = {
    posts: '/get_posts_by_ids',
    feed: '/nearest_feed',
    home: '/home_posts',
    postIds: '/get_posts',
    searchPostsIds: '/get_search_posts',
    postsIdsByType: '/get_posts?post_type=',
    contactForm: '/form_request_send',
    subscriptionForm: '/subscribe_connect_id',
};

export default {
    ...window.ThemeSettings,
}