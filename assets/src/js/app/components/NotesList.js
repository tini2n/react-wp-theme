import React, { Component } from 'react';

import Note from 'components/Note';
import LoadMore from 'components/LoadMore';

class NotesList extends Component {
    constructor(props) {
        super(props);

        this.list = React.createRef();
    }

    render() {
        const {
            notes,
            categories,
            isArchive,
            loadMoreProps
        } = this.props;

        return (
            <div className="notes-list">
                <h2 className="section-title">Smånytt</h2>
                <div className="list" ref={list => this.list = list}>
                    {notes.map((note, i) => <Note key={i} post={note} categories={categories} isArchive={isArchive}/>)}
                </div>
                {isArchive && <LoadMore {...loadMoreProps}/>}
            </div>
        )
    }
}

export default NotesList;