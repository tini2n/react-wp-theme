import React, { Component } from 'react';

import htmlParser from "react-html-parser";

import Breadcrumbs from 'components/partials/Breadcrumbs';
import ContactForm from 'components/ContactForm';
import ContactMap from 'components/ContactMap';

class ContactUs extends Component {
    render() {
        const {
            title,
            parent,
            content,
            map,
            template,
            hide_map
        } = this.props.page;

        const isHided = parseInt(hide_map);

        const breadcrumbsProps = {
            parentId: parent,
            currentPage: { title },
        };

        const mapAttrs = {
            position: [
                map.latitude ? parseFloat(map.latitude) : 0,
                map.longitude ? parseFloat(map.longitude) : 0
            ],
            zoom: [map.zoom ? parseInt(map.zoom) : 0]
        };

        return (
            <section className="contact-us">
                <div className="wrapper-thin">
                    <div className="page-heading">
                        <Breadcrumbs {...breadcrumbsProps}/>
                        <h1 className="page-title">{title}</h1>
                    </div>
                    <div className="content">
                        {htmlParser(content)}
                    </div>
                    {(map.latitude && map.longitude && !isHided) &&
                        <div className="map-container">
                            <ContactMap {...mapAttrs} />
                        </div>
                    }
                    <ContactForm template={template}/>
                </div>
            </section>
        )
    }
}

export default ContactUs;