import bindings from "./bindings.json" with { type: "json" };
import * as actions from "../actions/index.js";

export const attachBindings = (rootElement, state) => {
    // 1. Input Event Delegation (Search)
    rootElement.addEventListener("input", (event) => {
        for (const binding of bindings) {
            if (binding.event !== "input") continue;
            const matchElement = event.target.closest(binding.selector);
            if (matchElement && rootElement.contains(matchElement)) {
                const handler = actions[binding.action];
                if (typeof handler === "function") {
                    handler(event, matchElement, state);
                }
                return;
            }
        }
    });

    // 2. Click Event Delegation (Buttons, Row click)
    rootElement.addEventListener("click", (event) => {
        for (const binding of bindings) {
            if (binding.event !== "click") continue;
            const matchElement = event.target.closest(binding.selector);
            if (matchElement && rootElement.contains(matchElement)) {
                const handler = actions[binding.action];
                if (typeof handler === "function") {
                    handler(event, matchElement, state);
                }
                return;
            }
        }
    });
};

export default attachBindings;
export { bindings };
