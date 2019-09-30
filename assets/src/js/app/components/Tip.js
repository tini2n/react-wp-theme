import React, { Component } from 'react';

import { fromUtcToHuman, fromUtcToISO } from 'services/dateServices';

import UniversalLink from 'components/UniversalLink';

class Tip extends Component {
    render() {
        const { post } = this.props;
        const { thumbnails, meta, publish_date, title, excerpt } = post;

        const url = meta.external_link;

        return (
            <article className="tip-item">
                <div className="thumbnail-container">
                    {url ?
                        <UniversalLink to={url} target="_blank">
                            <img src={thumbnails.url} alt={thumbnails.alt}/>
                        </UniversalLink>
                        :
                        <img src={thumbnails.url} alt={thumbnails.alt}/>
                    }
                    {meta.label.length ?
                        <div className="labels">
                            {meta.label.map((label, i) => {
                                let labelStyle = {
                                    backgroundColor: label.label_color
                                };

                                return <span key={i} style={{...labelStyle}}>{label.label_text}</span>
                            })}
                        </div>
                    : ''}
                </div>
                <div className="text-container">
                    <time dateTime={fromUtcToISO(publish_date.date)}>{fromUtcToHuman(publish_date.date)}</time>
                    <h3 className="title">{url ? <UniversalLink to={url} target="_blank">{title}</UniversalLink> : title}</h3>
                    <p className="excerpt">{excerpt}</p>
                </div>
            </article>
        )
    }
}

export default Tip;