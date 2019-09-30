import React, { Component, Fragment } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import htmlParser from 'react-html-parser';

import UniversalLink from 'components/UniversalLink';
import Link from 'components/InternalLink'

import Logo from 'components/partials/Logo';
import ArrowIcon from 'icons/arrow-icon.svg';

export default class Footer extends Component {
    scrollToTop() {
        scroll.scrollToTop({ duration: 400 })
    }

    render() {
        const {
            footer,
            categories,
            menu = [],
        } = this.props;

        const info = footer.left_col;
        const contacts = footer.center_col;
        const phone = footer.main_tlf;
        const contactLink = footer.contact_link;

        const phonePegExp = /[^a-z .]\.*([0-9])*\d/g;

        let year = new Date();
        year = year.getFullYear();

        return (
            <footer id="footer">
                <div className="footer-main">
                    <div className="wrapper-outer">
                        <div className="footer-logo-row">
                            <Logo/>
                            <div className="phone-bar">
                                {phone &&
                                    <div className="phone">
                                        <small>Sentralbord telefon</small>
                                        <a href={`tel:+47${phone.match(phonePegExp).join('')}`} >{phone}</a>
                                    </div>
                                }
                                {contactLink &&
                                    <nav>
                                        <Link to={contactLink}>kontakt oss</Link>
                                    </nav>
                                }
                                <button className="to-top" onClick={this.scrollToTop}>
                                    <ArrowIcon/>
                                </button>
                            </div>
                        </div>
                        <div className="footer-misc-row">
                            <div className="col office-info">
                                {info.map((item, i) =>
                                    <Fragment key={i}>
                                        {item.heading && <h5>{item.heading}</h5>}
                                        {item.text && <div>{htmlParser(item.text)}</div>}
                                    </Fragment>
                                )}
                            </div>
                            <div className="col contacts">
                                {contacts.map((item, i) =>
                                    <Fragment key={i}>
                                        {item.heading && <h5>{item.heading}</h5>}
                                        {(item.tlf || item.fax || item.email) && (
                                            <dl>
                                                {parseInt(item.tlf) ? (
                                                    <Fragment>
                                                        <dt>Tlf:</dt>
                                                        <dd><a href={`tel:+47${item.tlf.match(phonePegExp).join('')}`}>{item.tlf}</a></dd>
                                                    </Fragment>
                                                ) : ''}
                                                {parseInt(item.fax) ? (
                                                    <Fragment>
                                                        <dt>Faks:</dt>
                                                        <dd><a href={`tel:47${item.fax.match(phonePegExp).join('')}`}>{item.fax}</a></dd>
                                                    </Fragment>
                                                ) : ''}
                                                {item.email && (
                                                    <Fragment>
                                                        <dt>E-post:</dt>
                                                        <dd><a href={`mailto:${item.email}`}>{item.email}</a></dd>
                                                    </Fragment>
                                                )}
                                            </dl>
                                        )}
                                    </Fragment>
                                )}
                            </div>
                            <div className="col">
                                <h5>NYHETER</h5>
                                <div className="categories">
                                    {!!categories.length && categories.map((category, i) =>
                                        <UniversalLink key={i} className="tag-item" to={category.url} target={category.target}>{category.title}</UniversalLink>)}
                                </div>
                            </div>
                            <div className="col">
                                <nav className="menu">
                                    {menu && menu.map((item, i) =>
                                        <UniversalLink key={i} to={item.url} target={item.target}>{item.title}</UniversalLink>)}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <div className="wrapper-outer">
                        <p><span>Trav og Galopp-Nytt &#169; {year}</span>|<span><Link to="/behandling-av-personopplysninger/" target="_blank">Personvern og informasjonskapsler</Link></span></p>
                        <p>Design og utvikling: <a href="http://innocode.no" target="_blank" rel="noopener noreferrer">Innocode AS</a></p>
                    </div>
                </div>
            </footer>
        )
    }
}