import runInstructions from "dom-primitive-engine";
import { table as traversalTable } from "dom-traversal-functions";
import instructions from "./instructions.json" with { type: "json" };

/**
 * Self-contained body row click & highlight handler:
 * 1. Traverses to closest tbody tr via instructions.json.
 * 2. Toggles visual highlight.
 * 3. Emits selected record to onRowClick callback.
 *
 * @param {Event} event - Click event.
 * @param {HTMLElement} matchElement - Clicked row or cell element.
 * @param {object} state - Active state instance.
 */
export const onRowClick = (event, matchElement, state) => {
    const bodyRow = runInstructions(matchElement, instructions);
    if (!bodyRow || !state.container.contains(bodyRow)) return;

    // Highlight selected row visually
    bodyRow.parentElement?.querySelectorAll("tr.table-primary, tr.table-active").forEach(r => {
        r.classList.remove("table-primary", "table-active");
    });
    bodyRow.classList.add("table-primary");

    const rowIndex = traversalTable?.body?.getRowIndex
        ? traversalTable.body.getRowIndex(bodyRow)
        : Array.from(bodyRow.parentElement.children).indexOf(bodyRow);

    const record = state.filteredData[rowIndex] || state.dataset[rowIndex];
    state.selectedIndex = rowIndex;

    if (typeof state.onRowClick === "function" && record) {
        state.onRowClick(record, rowIndex);
    }
};

export default onRowClick;
export { instructions };
