/**
 * Reactive state container for table event bindings.
 */
export const createState = ({
    container,
    dataset = [],
    columns = [],
    options = {},
    renderTable = null,
    onSearch = null,
    onRowClick = null,
    onRowAction = null,
    onSave = null,
    showLog = false
} = {}) => {
    return {
        container,
        dataset: [...dataset],
        filteredData: [...dataset],
        columns,
        options,
        renderTable,
        selectedIndex: -1,
        onSearch,
        onRowClick,
        onRowAction,
        onSave,
        showLog
    };
};

export default createState;
