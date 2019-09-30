import React, { Component } from 'react'

import TagItem from 'components/partials/TagItem';

export default class Tags extends Component {
    constructor(props) {
        super(props);

        this.tagsRef = React.createRef();
        this.tag = React.createRef();

        this.state = {
            collapsed: false,
            tagsWidth: [],
            containerWidth: 0
        };

        this.seeAllHandler = this.seeAllHandler.bind(this);
        this.getTagSize = this.getTagSize.bind(this);
    }

    getContainerSize() {
        this.setState({ containerWidth: this.tagsRef.offsetWidth - 60 })
    }

    getTagSize(element) {
        const { tagsWidth } = this.state;
        const width = element.offsetWidth + parseInt(window.getComputedStyle(element).marginRight);

        tagsWidth.push(width);

        this.setState({ tagsWidth })
    }

    seeAllHandler() {
        this.setState({ collapsed: false })
    }

    compareArraySumWithNumber(arr, num) {
        return arr.reduce((sum, curr) => sum + curr, 0) >= num
    }

    renderHidedTags(tags) {
        const { tagsWidth, containerWidth } = this.state;

        return tags.map((tag, i) => {
            const sumSizes = tagsWidth.slice(0, i + 1);
            const isToHide = this.compareArraySumWithNumber(sumSizes, containerWidth);

            return <TagItem key={i} tag={tag} getTagSize={this.getTagSize} isToHide={isToHide} />
        })
    }

    componentDidMount() {
        const { tagsWidth, containerWidth } = this.state;

        this.getContainerSize();
        this.setState({ collapsed: this.compareArraySumWithNumber(tagsWidth, containerWidth) });
    }

    render() {
        const { tags } = this.props;
        const { collapsed } = this.state;

        return (
            <nav className={`tags ${collapsed ? 'collapsed' : '' }`} ref={tags => this.tagsRef = tags}>
                {this.renderHidedTags(tags)}
                {collapsed && <button className="see-all" onClick={this.seeAllHandler}><span>&nbsp;</span></button>}
            </nav>
        )
    }
}