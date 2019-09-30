import React, { Component } from 'react'
import { connect } from 'react-redux';

import htmlParser from 'react-html-parser';

import { formPostsArray } from 'services/postsServices';

import Breadcrumbs from 'components/partials/Breadcrumbs';
import PageTitle from 'components/partials/PageTitle';
import PageNavigation from 'components/partials/PageNavigation';

import NotFound from 'components/NotFound';
import DailyNotes from 'containers/templates/DailyNotes';
import ContactUs from 'components/ContactUs';
import EMagazine from 'components/EMagazine';

class Page extends Component {
    render() {
        const { main, posts_by_ids } = this.props;

        const {
            current_object = {},
            children = [],
        } = main;

        const page = current_object;
        const posts = posts_by_ids;

        const parentPage = page.parent ? posts_by_ids[page.parent] : {};
        const navTitle = parentPage.title ? parentPage.title : page.title;

        const breadcrumbsProps = {
            parentId: page.parent,
            parentPage,
            currentPage: page,
        };

        const navigationProps = {
            links: formPostsArray(posts, children),
            title: navTitle
        };

        if (page.type === 'note_archive') {
            return <DailyNotes/>
        }

        if (page.type !== 'page') {
            return <NotFound/>;
        }

        if (page.template === 'contact' || page.template === 'tips-oss') {
            return <ContactUs page={current_object}/>;
        }

        if (page.template === 'eblad') {
            return <EMagazine page={current_object}/>
        }

        return (
            <section className="page">
                <div className="wrapper">
                    <div className="grid-container">
                        <div className="grid-4-6">
                            <div className="page-heading">
                                <Breadcrumbs {...breadcrumbsProps}/>
                                <PageTitle title={page.title}/>
                                {children.length ? <PageNavigation {...navigationProps}/> : ''}
                            </div>
                            <div className="content">
                                {htmlParser(page.content)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({ main, posts_by_ids }) => ({
    main,
    posts_by_ids
});

export default connect(mapStateToProps)(Page);