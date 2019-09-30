import config from './config'

const { routes } = config;

export default {
    home: {
        pathname: routes.home,
        state: {
            template: 'Front page'
        }
    },
    article: {
        pathname: routes.article
    },
    tv: {
        pathname: routes.tv
    },
    category: {
        pathname: routes.category
    },
    tag: {
        pathname: routes.tag
    },
    tvs: {
        pathname: routes.tv_archive
    },
    notices: {
        pathname: routes.notice_archive
    }
}