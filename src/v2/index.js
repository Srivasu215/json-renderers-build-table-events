import createState from "./state.js";
import attachBindings from "./bindings/index.js";
import registerGlobal from "./registerGlobal/index.js";

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
