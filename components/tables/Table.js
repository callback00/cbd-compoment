import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import HeadTable from './HeadTable'
import BodyTable from './BodyTable'

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    renderTitle() {
        const { title, prefixCls } = this.props;

        return title ? (
            <div className={`${prefixCls}-title`}>
                {
                    title()
                }
            </div>
        ) : null;
    }

    renderMainTable() {
        const table = [
            this.renderTable(),
            // this.renderEmptyText(),
        ];

        return table;
    }

    renderTable() {
        const { prefixCls, columns, data, autoMergeCell, scroll = {} } = this.props;

        // 当有滚动条时才会用到这个table，如果有滚动条会返回一个table，没有就返回null
        const headTable = (
            <HeadTable
                key="head" // 这个key必须要写，否则报警告‘Each child in an array or iterator should have a unique "key" prop’，因为renderTable返回的是数组类型的组件
                columns={columns}
                prefixCls={prefixCls}
            />
        );

        // 当无滚动条时，显示的是正常的table
        const bodyTable = (
            <BodyTable
                key="body"
                prefixCls={prefixCls}
                columns={columns}
                data={data}
                autoMergeCell={autoMergeCell}
                scroll ={scroll}
            />
        );

        return [headTable, bodyTable];
    }

    renderFooter() {
        const { footer, prefixCls } = this.props;
        return footer ? (
            <div className={`${prefixCls}-footer`}>
                {
                    footer()
                }
            </div>
        ) : null;
    }

    render() {
        const className = classnames({
            [`${this.props.prefixCls}`]: true,
            [this.props.className]: !!this.props.className
        });

        // 不做固定列先
        const hasLeftFixed = false;
        const hasRightFixed = false;

        return (
            <div
                className={className}
                style={this.props.style}
            >
                {this.renderTitle()}
                <div className={`${this.props.prefixCls}-content`}>
                    {this.renderMainTable()}
                    {hasLeftFixed && this.renderLeftFixedTable()}
                    {hasRightFixed && this.renderRightFixedTable()}
                </div>

                {this.renderFooter()}
            </div>
        );
    }
}


Table.propTypes = {
    prefixCls: PropTypes.string,

    columns: PropTypes.array,
    data: PropTypes.array,
    autoMergeCell: PropTypes.bool, // 数据是否自动合并，在不分页，不固定列时可用

    useFixedHeader: PropTypes.bool, // 这个没什么用，应该根据scroll.y来判断是否固定表头

    bodyStyle: PropTypes.object,
    style: PropTypes.object,

    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onRow: PropTypes.func,
    onHeaderRow: PropTypes.func, //设置头部行属性
    // onRowClick: PropTypes.func, 这些全部废弃，在onRow中定义
    // onRowDoubleClick: PropTypes.func,
    // onRowContextMenu: PropTypes.func,
    // onRowMouseEnter: PropTypes.func,
    // onRowMouseLeave: PropTypes.func,
    showHeader: PropTypes.bool,
    title: PropTypes.func,
    id: PropTypes.string,
    footer: PropTypes.func,
    emptyText: PropTypes.oneOfType([PropTypes.node, PropTypes.func]), // 当table无数据时显示的文案
    scroll: PropTypes.object,
    rowRef: PropTypes.func,
    getBodyWrapper: PropTypes.func,
    children: PropTypes.node, // 要求属性是可渲染节点
    components: PropTypes.shape({
        table: PropTypes.any,
        header: PropTypes.shape({
            wrapper: PropTypes.any,
            row: PropTypes.any,
            cell: PropTypes.any,
        }),
        body: PropTypes.shape({
            wrapper: PropTypes.any,
            row: PropTypes.any,
            cell: PropTypes.any,
        }),
    }),
    // ...ExpandableTable.PropTypes,
}

Table.defaultProps = {
    data: [],
    autoMergeCell: false,
    useFixedHeader: false,
    rowKey: 'key',
    rowClassName: () => '',
    onRow() { },
    onHeaderRow() { },
    prefixCls: 'cbd-table',
    bodyStyle: {},
    style: {},
    showHeader: true,
    scroll: {},
    rowRef: () => null,
    emptyText: () => 'No Data',
}

export default Table