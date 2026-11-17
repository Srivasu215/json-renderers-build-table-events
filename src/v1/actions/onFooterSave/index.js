import runInstructions from "dom-primitive-engine";
import { table as traversalTable } from "dom-traversal-functions";
import instructions from "./instructions.json" with { type: "json" };

/**
 * Self-contained footer save handler:
 * 1. Traverses to closest tfoot tr via instructions.json.
 * 2. Extracts footer inputs via dom-traversal-functions v3.
 * 3. Clears inputs.
 * 4. Appends to dataset and triggers state.renderTable callback.
 * 5. Emits to onSave callback.
 *
 * @param {Event} event - Click event.
 * @param {HTMLElement} matchElement - Save button element.
 * @param {object} state - Active state instance.
 */
export const onFooterSave = (event, matchElement, state) => {
    // 1. Locate footer row via declarative instructions
    const footerRow = runInstructions(matchElement, instructions);
    if (!footerRow || !state.container.contains(footerRow)) return;

    // 2. Extract footer data using dom-traversal-functions v3
    const footerData = traversalTable?.footer?.getFooterData
        ? traversalTable.footer.getFooterData(footerRow, state.columns)
        : {};

    // Fallback extraction if empty
    if (!footerData || Object.keys(footerData).length === 0) {
        footerRow.querySelectorAll("input, select").forEach(input => {
            const colKey = input.id || input.name;
            if (colKey) footerData[colKey] = input.value;
        });
    }

    // 3. Clear inputs
    if (traversalTable?.footer?.clearRowInputs) {
        traversalTable.footer.clearRowInputs(footerRow);
    } else {
        footerRow.querySelectorAll("input").forEach(i => i.value = "");
    }

    // 4. Update state dataset
    state.dataset.push(footerData);
    state.filteredData.push(footerData);

    // 5. Localized table re-render via state callback
    if (typeof state.renderTable === "function") {
        state.renderTable(state.filteredData);
    }

    // 6. Fire consumer callback
    if (typeof state.onSave === "function") {
        state.onSave(footerData, state.dataset);
    }
};

export default onFooterSave;
export { instructions };
