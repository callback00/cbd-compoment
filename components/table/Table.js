import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';

import ExpandableTable from './ExpandableTable'
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

        this.pubStore = createPubStore({ handleColumnsSize: this.handleColumnsSize.bind(this) });

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

        // 在mac的高清屏幕下，滚动条的宽度是不固定的，需要动态计算，win 10 的应用、文本的百分比设置也会影响到这里，笔者的175%显示正常，换成100%后左固定列露出滚动条。
        if (this['tbodyTable-left']) {
            let scrollbarWidth = this['tbodyTable-left'].offsetWidth - this['tbodyTable-left'].clientWidth

            // 修正滚动条计算时小于17的值，小于17时会造成div没有精确重叠，导致设置阴影效果时会出现间隙
            if (scrollbarWidth < 17) {
                scrollbarWidth = 17
            }
            this['tbodyTable-left'].style.marginRight = (0 - scrollbarWidth) + 'px'
        }

        this.handleFixedTableScrollBar();

        window.addEventListener('resize', this.debouncedResize)
    }

    componentDidUpdate() {
        this.handleFixedTableScrollBar()
    }

    handleFixedTableScrollBar() {
        // 处理窗口大小改变时底部滚动条的显示及高度不差
        if (this['tbodyTable'] && this['tbodyTable'].offsetHeight - this['tbodyTable'].clientHeight > 0) {
            if (this.props.columns.some(column => column.fixed === 'left') && this['tbodyTable-left']) {
                this['tbodyTable-left'].style['overflowX'] = 'scroll'

                this['tbodyTable-left'].parentElement.style['marginBottom'] = this['tbodyTable'].clientHeight - this['tbodyTable'].offsetHeight + 'px'
            }
            if (this.props.columns.some(column => column.fixed === 'right') && this['tbodyTable-right']) {
                this['tbodyTable-right'].style['overflowX'] = 'scroll'

                this['tbodyTable-right'].parentElement.style['marginBottom'] = this['tbodyTable'].clientHeight - this['tbodyTable'].offsetHeight + 'px'
            }
        } else {
            if (this.props.columns.some(column => column.fixed === 'left') && this['tbodyTable-left']) {
                this['tbodyTable-left'].style['overflowX'] = 'hidden'
                this['tbodyTable-left'].parentElement.style['marginBottom'] = '0px'
            }
            if (this.props.columns.some(column => column.fixed === 'right') && this['tbodyTable-right']) {
                this['tbodyTable-right'].style['overflowX'] = 'hidden'
                this['tbodyTable-right'].parentElement.style['marginBottom'] = '0px'
            }
        }
    }

    handleWindowResize() {
        this.forceUpdate()
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

    // 调整列宽
    handleColumnsSize(changeColumnDataIndex, width) {

        this.columnManager.leafColumns.forEach((element, index) => {
            if (element.dataIndex === changeColumnDataIndex) {
                this.columnManager.leafColumns[index].width = width;
            }
        });
        this.forceUpdate();
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
        const { prefixCls, bordered, columns, data, onRow, onCell, autoMergeCell, scroll = {} } = this.props;

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
                    dataManager={this.dataManager}
                    columnManager={this.columnManager}
                    autoMergeCell={autoMergeCell}
                    scroll={scroll}
                    fixed={fixed}
                    pubStore={this.pubStore}
                    handleBodyScroll={this.handleBodyScroll}
                    onRow={onRow}
                    onCell={onCell}
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
                    onRow={onRow}
                    onCell={onCell}
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

        // return (
        //     <ExpandableTable >
        //         {
        //             (item) => {
        //                 console.log(this.lastScrollTop = 0)
        //                 return (
        //                     <div>111</div>
        //                 )
        //             }
        //         }
        //     </ExpandableTable>
        // )
    }
}


Table.propTypes = {
    prefixCls: PropTypes.string,

    columns: PropTypes.array,
    data: PropTypes.array,
    bordered: PropTypes.bool,
    autoMergeCell: PropTypes.bool, // 数据是否自动合并，在不分页，不固定列时可用
    locale: PropTypes.object, // 用于处理空文本，语言显示等。目前用于空文本显示
    expandedRowRender: PropTypes.func,

    style: PropTypes.object,
    onRow: PropTypes.func, // onRow和onCell是两个及其开放的接口，只要返回的是tr、td可识别的属性，就可以达到客户自定义行列规则的效果。
    onCell: PropTypes.func,
    title: PropTypes.func,
    footer: PropTypes.func,
    scroll: PropTypes.object,
}

Table.defaultProps = {
    data: [],
    columns: [],
    bordered: true,
    autoMergeCell: false,
    locale: { emptyText: '没有相关数据' },
    onRow: () => { },
    onCell: () => { },
    prefixCls: 'lyj-table',
    style: {},
    scroll: {},

}

export default Table