import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import HeadTable from './HeadTable'
import BodyTable from './BodyTable'
import SimpleTable from './SimpleTable'

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleBodyScroll = this.handleBodyScroll.bind(this);
        this.saveRef = this.saveRef.bind(this);
    }

    saveRef(name, item) {
        this[name] = item
    }

    // 表头同步body的横向滚动条
    handleBodyScrollLeft(e) {

        const target = e.target;
        // 如果单元格内有滚动事件也会触发，事件冒泡引起的
        if (e.currentTarget !== target) {
            return;
        }

        // this.headTable 由 HeadTable组件返回的名字
        this.headTable.scrollLeft = target.scrollLeft;
    }

    handleBodyScrollTop(e) {
        const target = e.target;
        // 如果单元格内有滚动事件也会触发，事件冒泡引起的
        if (e.currentTarget !== target) {
            return;
        }
    }

    handleBodyScroll(e) {
        // 表头同步滚动
        this.handleBodyScrollLeft(e)

        // 固定列同步滚动
        this.handleBodyScrollTop(e)
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

    renderEmptyText() {
        const { locale, prefixCls, data } = this.props;
        const { emptyText } = locale
        if (data.length) {
            return null;
        }

        const emptyClassName = `${prefixCls}-placeholder`;

        return (
            <div className={emptyClassName} key="emptyText">
                {typeof emptyText === 'function' ? emptyText() : emptyText}
            </div>
        );
    }

    renderMainTable() {
        // 由于返回的是数组，返回的组件key必须要写，否则报警告‘Each child in an array or iterator should have a unique "key" prop’，因为renderTable返回的是数组类型的组件
        const table = [
            this.renderTable(),
            this.renderEmptyText(),
        ];

        return table;
    }

    renderTable() {
        const { prefixCls, bordered, columns, data, autoMergeCell, scroll = {} } = this.props;

        const isAnyColumnsFixed = columns.some(column => !!column.fixed);
        const scrollable = isAnyColumnsFixed || scroll.x || scroll.y;

        if (scrollable) {

            const headTable = (
                <HeadTable
                    key="head"
                    saveRef={this.saveRef}
                    bordered={bordered}
                    columns={columns}
                    prefixCls={prefixCls}
                    scroll={scroll}
                    handleBodyScrollLeft={this.handleBodyScrollLeft}
                />
            );

            const bodyTable = (
                <BodyTable
                    key="body"
                    prefixCls={prefixCls}
                    bordered={bordered}
                    columns={columns}
                    data={data}
                    autoMergeCell={autoMergeCell}
                    scroll={scroll}
                    handleBodyScroll={this.handleBodyScroll}
                />
            );

            const ScrollTable = (
                <div key='scrolltable' className={`${prefixCls}-scroll`} >
                    {
                        headTable
                    }
                    {
                        bodyTable
                    }
                </div>
            );

            return ScrollTable;
        } else {
            return (
                <SimpleTable key={'simple'} prefixCls={prefixCls} bordered={bordered} autoMergeCell={autoMergeCell} columns={columns} data={data} />
            )
        }
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
        const mainCls = classnames({
            [`${this.props.prefixCls}`]: true,
            [this.props.className]: !!this.props.className,
        });

        const contentCls = classnames({
            [`${this.props.prefixCls}-content`]: true,
            ['bordered']: this.props.bordered,
        });

        // 不做固定列先
        const hasLeftFixed = false;
        const hasRightFixed = false;

        return (
            <div
                className={mainCls}
                style={this.props.style}
            >
                {this.renderTitle()}
                <div className={contentCls}>
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
    bordered: PropTypes.bool,
    autoMergeCell: PropTypes.bool, // 数据是否自动合并，在不分页，不固定列时可用

    locale: PropTypes.object,

    useFixedHeader: PropTypes.bool, // 这个没什么用，应该根据scroll.y来判断是否固定表头

    bodyStyle: PropTypes.object,
    style: PropTypes.object,

    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onRow: PropTypes.func,
    onHeaderRow: PropTypes.func, //设置头部行属性
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
    columns: [],
    bordered: true,
    autoMergeCell: false,
    locale: { emptyText: '没有相关数据' },
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