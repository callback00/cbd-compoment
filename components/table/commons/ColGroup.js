import React from 'react';

export default function ColGroup(props) {

    const { columns } = props
    let cols = []
    cols = cols.concat(
        columns.map(c => {
            return <col key={c.dataIndex || c.key} style={{ width: c.width, minWidth: c.width }} />;
        }),
    );

    return (<colgroup>{cols}</colgroup>);
}
