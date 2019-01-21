import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getImages } from '../actions';
import { bindActionCreators } from "redux";
import Image from './Image';
import Paginator from './Paginator';

class ImageTable extends Component {
    constructor(props) {
        super(props);
        this.state = { page: 1 };
    }

    componentDidMount() {
        this.props.getImages();
    }

    setPage(p) {
        this.setState({ page: p });
    }

    render() {
        const pageSize = 5;
        const totalPage = Math.floor((this.props.images.length - 1) / pageSize) + 1;
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td width="200px">Image</td>
                            <td>Details</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.images.sort(function (a, b) {
                            var x = a.caption.toLowerCase();
                            var y = b.caption.toLowerCase();
                            if (x < y) { return -1; }
                            if (x > y) { return 1; }
                            return 0;
                        }).slice((this.state.page - 1)* pageSize, this.state.page*pageSize)
                            .map(i => <Image key={i.id} url={i.url} caption={i.caption} height={i.height} width={i.width} />)}
                    </tbody>
                </table>
                {this.props.images.length > pageSize ? <Paginator current={this.state.page} maxPage={totalPage} goToPage={this.setPage.bind(this)} /> : ""}
            </div>
        );
    } 
}

function mapStateToProps(state) {
    const images = state.images;
    return { images };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getImages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageTable);