import createState from "./state.js";
import attachBindings from "./bindings/index.js";
import registerGlobal from "./registerGlobal/index.js";

/**
 * Binds delegated table interactions to the root container.
 *
 * @param {object} config
 * @param {string|HTMLElement} config.container - Target container ID or element.
 * @param {Array<object>} config.dataset - The backing table dataset.
 * @param {Array<object>} config.columns - Column definitions.
 * @param {Function} config.renderTable - Callback to re-render the table with updated/filtered records.
 * @param {Function} [config.onSearch] - Search callback.
 * @param {Function} [config.onRowClick] - Row click callback.
 * @param {Function} [config.onRowAction] - Row action button callback.
 * @param {Function} [config.onSave] - Footer save callback.
 * @returns {object} - Active controller instance.
 */
const hookTableEvents = (config = {}) => {
    const rootElement = typeof config.container === "string"
        ? document.getElementById(config.container)
        : config.container;

    if (!rootElement) {
        if (config.showLog) console.warn("[json-renderers-build-table-events] Container not found:", config.container);
        return null;
    }

    const state = createState({
        ...config,
        container: rootElement
    });

    attachBindings(rootElement, state);

    return {
        getState: () => ({ ...state })
    };
};

registerGlobal({ hookTableEvents });

export { hookTableEvents };
export default hookTableEvents;
