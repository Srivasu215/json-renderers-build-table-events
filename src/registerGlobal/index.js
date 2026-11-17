import meta from "./meta.js";

export const registerGlobal = (inDefinition) => {
    if (typeof globalThis === "undefined" || !inDefinition) return;

    globalThis.ks ??= {};
    globalThis.ks.jsonRenderers ??= {};
    globalThis.ks.jsonRenderers.build ??= {};

    globalThis.ks.jsonRenderers.build.tableEvents = {
        meta,
        ...inDefinition
    };
};

export default registerGlobal;
