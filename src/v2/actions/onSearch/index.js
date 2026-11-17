import runInstructions from "dom-primitive-engine";
import { table as traversalTable } from "dom-traversal-functions";
import instructions from "./instructions.json" with { type: "json" };

/**
 * Self-contained search handler:
 * 1. Extracts query via dom-traversal-functions v3.
 * 2. Filters the state dataset.
 * 3. Triggers localized table re-render via state.renderTable callback.
 * 4. Traverses to and updates search feedback element via instructions.json.
 *
 * @param {Event} event - Input event.
 * @param {HTMLElement} matchElement - Search input element.
 * @param {object} state - Active state instance.
 */
export const onSearch = (event, matchElement, state) => {
    // 1. Extract query using dom-traversal-functions v3
    const query = traversalTable?.header?.getSearchQuery
        ? traversalTable.header.getSearchQuery(matchElement)
        : (matchElement?.value || "").trim().toLowerCase();

    // 2. Filter dataset
    const filtered = query
        ? state.dataset.filter(item =>
            Object.values(item).some(val =>
                String(val ?? "").toLowerCase().includes(query)
            )
        )
        : state.dataset;

    state.filteredData = filtered;

    // 3. Localized re-render of table rows
    if (typeof state.renderTable === "function") {
        state.renderTable(filtered);
    }

    // 4. Update feedback element via declarative traversal
    const searchFeedback = runInstructions(matchElement, instructions);
    if (searchFeedback) {
        searchFeedback.textContent = query
            ? `Showing ${filtered.length} of ${state.dataset.length} records matching "${matchElement.value.trim()}".`
            : `Showing all ${state.dataset.length} records.`;
    }

    // 5. Fire optional consumer callback
    if (typeof state.onSearch === "function") {
        state.onSearch(query, filtered);
    }
};

export default onSearch;
export { instructions };
