import React, { Component } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import nb from 'date-fns/locale/nb'
import moment from 'moment';
import queryString from 'query-string';

registerLocale('nb', nb);
setDefaultLocale('nb');

class DateFilter extends Component {
    constructor(props) {
        super(props);

        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleClear = this.handleClear.bind(this);

        const after = queryString.parse(location.search).after;
        const before = queryString.parse(location.search).before;

        const startDate = after ? new Date(after) : new Date();
        const endDate = before ? new Date(before) : new Date();

        this.state = {
            startDate,
            endDate,
            query: queryString.parse(location.search)
        };
    }

    handleChangeStart(date) {
        const { endDate } = this.state;

        if (date > endDate) {
            this.setState({
                startDate: date,
                endDate: date
            });
        } else {
            this.setState({ startDate: date });
        }
    }

    handleChangeEnd(date) {
        const { startDate } = this.state;

        if (date < startDate) {
            this.setState({
                startDate: date,
                endDate: date
            })
        } else {
            this.setState({ endDate: date });
        }
    }

    handleFilter() {
        const {
            startDate,
            endDate,
        } = this.state;

        const { history } = this.props;

        const newQuery = queryString.parse(location.search);

        newQuery.before = moment(endDate).format('YYYY-MM-DD');
        newQuery.after = moment(startDate).format('YYYY-MM-DD');

        history.push(`?${queryString.stringify(newQuery)}`);
    }

    handleClear() {
        const { query } = this.state;
        const { history } = this.props;

        this.setState({
            startDate: new Date(),
            endDate: new Date()
        });

        const newQuery = query;

        delete newQuery.after;
        delete newQuery.before;
        delete newQuery.cat_name;
        delete newQuery.post_type;

        history.push(`?${queryString.stringify(newQuery)}`);
    }

    render () {
        const { startDate, endDate } = this.state;

        return (
            <div className="date-filter">
                <span className="title">filtrer etter periode</span>
                <div className="datepicker">
                    <DatePicker dateFormat={'dd/MM/yyyy'}
                                selected={startDate}
                                startDate={startDate}
                                endDate={endDate}
                                selectsStart
                                onChange={this.handleChangeStart}/>
                    <DatePicker dateFormat={'dd/MM/yyyy'}
                                selected={endDate}
                                startDate={startDate}
                                endDate={endDate}
                                selectsEnd
                                onChange={this.handleChangeEnd}/>
                </div>
                <div className="buttons-container">
                    <button className="clear" onClick={this.handleClear}>fjern alle filtre</button>
                    <button className="submit" onClick={this.handleFilter}>filter</button>
                </div>
            </div>
        )
    }
}

export default DateFilter;