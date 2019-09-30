import React, { Component } from 'react';

class Note extends Component {
    constructor(props) {
        super(props);

        this.lead = React.createRef();
        this.note = React.createRef();
    }

    componentDidMount() {
        const { isArchive } = this.props;

        if (this.lead.clientHeight > 100 && !isArchive) {
            this.note.classList.add('is-read-more');
        }
    }

    render() {
        const {
            post,
            categories,
            isArchive
        } = this.props;

        const {
            title,
            excerpt,
            main_category_id
        } = post;

        const category = main_category_id && categories[main_category_id].title;

        return (
            <article className={`note-item`} ref={note => this.note = note}>
                <div className="text-container">
                    {category && <h5 className="category-label">{category}</h5>}
                    {title && <h3 className="title">{title}</h3>}
                    {excerpt && <p className="lead" ref={lead => this.lead = lead}>{excerpt}</p>}
                </div>
                {!isArchive && <span className="read-more" onClick={() => this.note.classList.remove('is-read-more')}>les mer</span>}
            </article>
        )
    }
}

export default Note;