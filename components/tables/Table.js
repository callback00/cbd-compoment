import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

import HeadTable from './HeadTable'
import BodyTable from './BodyTable'
import SimpleTable from './SimpleTable'

import DataManager from './utils/DataManager'
import ColumnManager from './utils/ColumnManager';
import createPubStore from './utils/PubStore'

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.pubStore = createPubStore();

        // 以参数的形式传递给子组件，感觉这样的方式不是很好，但是还没找到更好的解决方案
        this.dataManager = new DataManager(props.data);
        this.columnManager = new ColumnManager(props.columns);

        this.handleBodyScroll = this.handleBodyScroll.bind(this);
        this.saveRef = this.saveRef.bind(this);

        this.debouncedResize = debounce(() => {
            this.handleWindowResize()
        }, 100);

        this.lastScrollTop = 0;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.dataManager = new DataManager(nextProps.data);
        }
        if (nextProps.columns !== this.props.columns) {
            this.columnManager = new ColumnManager(nextProps.columns);
        }
    }

    componentDidMount() {
        this.handleFixedTableScrollBar();

        addEventListener('resize', this.debouncedResize)
    }

    componentDidUpdate() {
        this.handleFixedTableScrollBar()
    }

    handleFixedTableScrollBar() {
        if (this['tbodyTable'] && this['tbodyTable'].offsetHeight - this['tbodyTable'].clientHeight > 0) {
            if (this.props.columns.some(column => column.fixed === 'left') && this['tbodyTable-left']) {
                this['tbodyTable-left'].style['overflowX'] = 'scroll'
            }
            if (this.props.columns.some(column => column.fixed === 'right') && this['tbodyTable-right']) {
                this['tbodyTable-right'].style['overflowX'] = 'scroll'
            }
        }
    }

    handleWindowResize() {
        this.setState({
        })
    }

    // 表头同步body的横向滚动条
    handleBodyScrollLeft(e) {

        const target = e.target;
        // 如果单元格内有滚动事件也会触发，事件冒泡引起的
        if (e.currentTarget !== target) {
            return;
        }
        // this.headTable 由 HeadTable组件返回的名字,this['tbodyTable']在body里返回
        if (target === this['tbodyTable']) {
            this.headTable.scrollLeft = target.scrollLeft;
        }

        this.lastScrollLeft = target.scrollLeft;
    }

    handleBodyScrollTop(e) {
        const target = e.target;
        // 如果单元格内有滚动事件也会触发，事件冒泡引起的
        if (e.currentTarget !== target) {
            return;
        }

        // 这个if语句用于去抖，不去掉重复的赋值，在鼠标滚轮事件极快的时候会有严重的抖动，最后造成行不对齐
        if (target.scrollTop !== this.lastScrollTop) {
            if (this['tbodyTable-left'] && target !== this['tbodyTable-left']) {
                this['tbodyTable-left'].scrollTop = target.scrollTop;
            }

            if (this['tbodyTable-right'] && target !== this['tbodyTable-right']) {
                this['tbodyTable-right'].scrollTop = target.scrollTop;
            }

            if (this['tbodyTable'] && target !== this['tbodyTable']) {
                this['tbodyTable'].scrollTop = target.scrollTop;
            }
        }

        this.lastScrollTop = target.scrollTop

    }

    handleBodyScroll(e) {
        // 表头同步滚动
        this.handleBodyScrollLeft(e)

        // 固定列同步滚动
        this.handleBodyScrollTop(e)
    }

    // 用于获取子组件内的元素实例，目前只用在处理同步滚动条时
    saveRef(name, element) {
        if (element) {
            this[name] = element
        }
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
        // 由于返回的是数组，返回的组件key必须要写，否则报警告‘Each child in an array or iterator should have a unique "key" prop’，因为renderTable返回的是数组类型的组件
        const table = [
            this.renderTable({}),
            this.renderEmptyText(),
        ];

        return table;
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

    renderTable(options) {
        const { fixed } = options
        const { prefixCls, bordered, columns, data, autoMergeCell, scroll = {} } = this.props;

        const isAnyColumnsFixed = columns.some(column => !!column.fixed);
        const scrollable = isAnyColumnsFixed || scroll.x || scroll.y;

        if (scrollable) {

            const headTable = (
                <HeadTable
                    key="head"
                    saveRef={this.saveRef}
                    bordered={bordered}
                    columnManager={this.columnManager}
                    prefixCls={prefixCls}
                    scroll={scroll}
                    fixed={fixed}
                    pubStore={this.pubStore}
                    handleBodyScrollLeft={this.handleBodyScrollLeft}
                />
            );

            const bodyTable = (
                <BodyTable
                    key="body"
                    saveRef={this.saveRef}
                    prefixCls={prefixCls}
                    bordered={bordered}
                    dataManager={this.dataManager}
                    columnManager={this.columnManager}
                    autoMergeCell={autoMergeCell}
                    scroll={scroll}
                    fixed={fixed}
                    pubStore={this.pubStore}
                    handleBodyScroll={this.handleBodyScroll}
                />
            );

            const cls = classNames({
                [`${prefixCls}-scroll`]: true,
                [`fixed`]: fixed ? true : false,
                [`${fixed}`]: fixed ? true : false
            })

            const ScrollTable = (
                <div key={`scrolltable${fixed ? `${fixed}` : ''}`} className={cls} >
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
                <SimpleTable
                    key={'simple'}
                    prefixCls={prefixCls}
                    bordered={bordered}
                    autoMergeCell={autoMergeCell}
                    dataManager={this.dataManager}
                    columnManager={this.columnManager}
                />
            )
        }
    }

    renderLeftFixedTable() {
        const { prefixCls, columns } = this.props;
        const isAnyLeftColumnsFixed = columns.some(column => column.fixed === 'left');

        return (
            isAnyLeftColumnsFixed ?
                this.renderTable({ fixed: 'left' }) : null
        );
    }

    renderRightFixedTable() {
        const { prefixCls, columns } = this.props;
        const isAnyRightColumnsFixed = columns.some(column => column.fixed === 'right');

        return (
            isAnyRightColumnsFixed ?
                this.renderTable({ fixed: 'right' }) : null
        );
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
        const mainCls = classNames({
            [`${this.props.prefixCls}`]: true,
            [this.props.className]: !!this.props.className,
        });

        const contentCls = classNames({
            [`${this.props.prefixCls}-content`]: true,
            ['bordered']: this.props.bordered,
        });

        return (
            <div
                className={mainCls}
                style={this.props.style}
            >
                {this.renderTitle()}
                <div className={contentCls}>
                    {this.renderMainTable()}
                    {this.renderLeftFixedTable()}
                    {this.renderRightFixedTable()}
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