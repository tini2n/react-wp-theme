import React, { Component } from 'react';

import Breadcrumbs from 'components/partials/Breadcrumbs';
import PageTitle from 'components/partials/PageTitle';

class EMagazine extends Component {
    constructor(props) {
        super(props);
    }

    removeScripts() {
        const jqueryScript = document.getElementById('jquery-script');
        const iframeResizerScript = document.getElementById('iframe-resizer-script');
        const apiScript = document.getElementById('buyandread-api-script');

        jqueryScript.remove();
        iframeResizerScript.remove();
        apiScript.remove();
    }

    buyAndReadInit() {
        if (window.$barapi) {
            const $barapi = window.$barapi;
            const $ = jQuery;

            if ($barapi) {
                $barapi.mainPage({
                    wluid: "travoggaloppnytt",
                    apiKey: "14e48169990d0df5312357acc21f9fa9",
                    target: $("#barApiWrapper"),
                    page: "selectEdition", // Default page
                    iframeResize: true,
                    size: { width: "100%", height: "800px" },
                    options: { loginRequired: true, hideRegister: true }
                });
            }

            return true
        } else {
            throw new ReferenceError('$barapi didn\'t loaded')
        }
    }

    loadJQuery() {
        return new Promise(resolve => {
            const head = document.getElementsByTagName('head')[0];
            const script = document.createElement('script');

            script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
            script.type = 'text/javascript';
            script.id = 'jquery-script';

            head.appendChild(script);

            script.onload = () => {
                resolve()
            }
        })
    }

    loadScripts() {
        return new Promise(resolve => {
            const head = document.getElementsByTagName('head')[0];
            const iframeResizerScript = document.createElement('script');
            const apiScript = document.createElement('script');

            iframeResizerScript.type = 'text/javascript';
            iframeResizerScript.id = 'iframe-resizer-script';
            iframeResizerScript.src = 'https://www.buyandread.com/static/js/libs/iframeResizer.min.js';

            apiScript.src = 'https://www.buyandread.com/static/js/dist/api.min.js';
            apiScript.type = 'text/javascript';
            apiScript.id = 'buyandread-api-script';

            head.appendChild(iframeResizerScript);
            head.appendChild(apiScript);

            apiScript.onload = () => {
                resolve()
            };
        })
    }

    componentDidMount() {
        this.loadJQuery()
            .then(() => this.loadScripts())
            .then(() => this.buyAndReadInit())
    }

    componentWillUnmount() {
        this.removeScripts();
    }

    render() {
        const { page } = this.props;

        const breadcrumbsProps = {
            parentId: page.parent,
            parentPage: {
                title: 'forside',
                link: '/'
            },
            currentPage: page,
        };

        return (
            <section className="page e-magazine">
                <div className="wrapper">
                    <div className="grid-container">
                        <div className="grid-4-6">
                            <div className="page-heading">
                                <Breadcrumbs {...breadcrumbsProps}/>
                                <PageTitle title={page.title}/>
                            </div>
                            <div className="content">
                                <div id="barApiWrapper"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default EMagazine;