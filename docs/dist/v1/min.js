import { table as e } from "dom-traversal-functions";
// \0rolldown/runtime.js
var t = Object.defineProperty, n = (e, n) => {
	let r = {};
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n || t(r, Symbol.toStringTag, { value: "Module" }), r;
}, r = ({ container: e, dataset: t = [], columns: n = [], options: r = {}, renderTable: i = null, onSearch: a = null, onRowClick: o = null, onRowAction: s = null, onSave: c = null, showLog: l = !1 } = {}) => ({
	container: e,
	dataset: [...t],
	filteredData: [...t],
	columns: n,
	options: r,
	renderTable: i,
	selectedIndex: -1,
	onSearch: a,
	onRowClick: o,
	onRowAction: s,
	onSave: c,
	showLog: l
}), i = [
	{
		event: "input",
		selector: "input[type='search'], input[name='search'], [data-role='table-search'], #tableSearch, .table-search-input",
		action: "onSearch"
	},
	{
		event: "click",
		selector: "tfoot button, button.ks-btn-save, [data-role='table-save']",
		action: "onFooterSave"
	},
	{
		event: "click",
		selector: "tbody button, button.ks-btn-show, [data-role='row-action']",
		action: "onRowAction"
	},
	{
		event: "click",
		selector: "tbody tr",
		action: "onRowClick"
	}
], a = {
	version: "1.19.1",
	name: "dom-primitive-engine"
}, o = (e) => {
	e && typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.domPrimitive ??= {}, globalThis.ks.domPrimitive.engine = {
		meta: a,
		runInstructions: e
	});
}, s = ({ element: e, previousResult: t, instruction: n, clientData: r }) => {
	let i = n.sourcePath.fileName;
	if (i === "root") return e;
	if (i === "previous") return t;
	if (i === "clientData") return r;
}, c = (e, t) => {
	let n = e.arguments ?? {}, r = n.columns ?? t.columns, i = n.options ?? t.options, a = n.data ?? t.data;
	return {
		...n,
		columns: r,
		options: i,
		data: a
	};
}, l = ({ element: e, previousResult: t, instruction: n, clientData: r, operations: i }) => {
	let a = s({
		element: e,
		previousResult: t,
		instruction: n,
		clientData: r
	}), o = c(n, r), l = i[n.func] ?? r[n.func] ?? r?.functions?.[n.func];
	if (typeof l != "function") throw TypeError(`Unknown primitive operation: "${n.func}"`);
	return l(a, o, r);
}, u = (e, t, n) => {
	let r = e, i = t.selector;
	return r.closest(i);
}, d = (e, t, n) => {
	let r = e, i = t.selector;
	return !r || typeof r.querySelector != "function" ? null : r.querySelector(i);
}, f = (e, t, n) => {
	let r = e, i = t.selector;
	return Array.from(r.querySelectorAll(i));
}, p = /* @__PURE__ */ n({
	closest: () => u,
	querySelector: () => d,
	querySelectorAll: () => f
}), m = (e, t, n) => {
	let r = e, i = t.trim ?? !0, a = r.textContent ?? "";
	return i ? a.trim() : a;
}, h = (e, t, n) => {
	let r = e, i = r.tagName?.toLowerCase(), a = r.type?.toLowerCase();
	return a === "checkbox" ? r.checked ? r.value || !0 : !1 : a === "radio" ? r.checked ? r.value : void 0 : i === "select" && r.multiple ? Array.from(r.selectedOptions, (e) => e.value) : "value" in r && i !== "button" ? r.value : r.textContent?.trim() ?? "";
}, g = (e, t, n) => {
	let r = e, i = t.columns ?? n.columns ?? [], a = t.read ?? "text", o = {};
	return r.forEach((e, t) => {
		let r = i[t];
		if (!r) return;
		let s = a === "value" ? h(e, {}, n) : m(e, {}, n);
		o[r] = s;
	}), o;
}, _ = (e, t, n) => {
	let r = e, i = {};
	return r.forEach((e) => {
		let t = e.name;
		if (!t) return;
		let r = h(e, {}, n);
		(e.type?.toLowerCase() !== "radio" || r !== void 0) && (Object.hasOwn(i, t) ? (Array.isArray(i[t]) || (i[t] = [i[t]]), i[t].push(r)) : i[t] = r);
	}), i;
}, v = /* @__PURE__ */ n({
	mapNamedValues: () => _,
	mapValues: () => g,
	readText: () => m,
	readValue: () => h
}), y = (e, t, n) => {
	let r = t?.key ?? "Enter", i = e && typeof e == "object" && "key" in e ? e : t?.event ?? n?.event;
	return !i || i.key !== r ? null : i.target ?? i.currentTarget ?? e;
}, b = /* @__PURE__ */ n({ isKey: () => y }), x = {
	...p,
	...v,
	...b
}, S = (e, t, n = {}) => {
	let r = e;
	for (let i of t) {
		if (r === null) return null;
		r = l({
			element: e,
			previousResult: r,
			instruction: i,
			clientData: n,
			operations: x
		});
	}
	return r;
}, C = S;
o(S);
// src/v1/actions/onSearch/instructions.json
var w = [{
	narration: "From search input, find component container",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "[data-role='table-parent'], .card-body, .container, div" }
}, {
	narration: "Locate search feedback display element",
	sourcePath: { fileName: "previous" },
	func: "querySelector",
	arguments: { selector: "#search-feedback, [data-role='search-feedback']" }
}], T = (t, n, r) => {
	let i = e?.header?.getSearchQuery ? e.header.getSearchQuery(n) : (n?.value || "").trim().toLowerCase(), a = i ? r.dataset.filter((e) => Object.values(e).some((e) => String(e ?? "").toLowerCase().includes(i))) : r.dataset;
	r.filteredData = a, typeof r.renderTable == "function" && r.renderTable(a);
	let o = C(n, w);
	o && (o.textContent = i ? `Showing ${a.length} of ${r.dataset.length} records matching "${n.value.trim()}".` : `Showing all ${r.dataset.length} records.`), typeof r.onSearch == "function" && r.onSearch(i, a);
}, E = [{
	narration: "From clicked element, traverse to closest tbody table row",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "tbody tr" }
}], D = (t, n, r) => {
	let i = C(n, E);
	if (!i || !r.container.contains(i)) return;
	i.parentElement?.querySelectorAll("tr.table-primary, tr.table-active").forEach((e) => {
		e.classList.remove("table-primary", "table-active");
	}), i.classList.add("table-primary");
	let a = e?.body?.getRowIndex ? e.body.getRowIndex(i) : Array.from(i.parentElement.children).indexOf(i), o = r.filteredData[a] || r.dataset[a];
	r.selectedIndex = a, typeof r.onRowClick == "function" && o && r.onRowClick(o, a);
}, O = [{
	narration: "From clicked button, traverse to closest tbody table row",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "tbody tr" }
}], k = (t, n, r) => {
	t.stopPropagation();
	let i = n.closest("button"), a = C(n, O);
	if (!i || !a || !r.container.contains(a)) return;
	a.parentElement?.querySelectorAll("tr.table-primary, tr.table-active").forEach((e) => {
		e.classList.remove("table-primary", "table-active");
	}), a.classList.add("table-primary");
	let o = e?.body?.getRowIndex ? e.body.getRowIndex(a) : Array.from(a.parentElement.children).indexOf(a), s = r.filteredData[o] || r.dataset[o];
	r.selectedIndex = o;
	let c = i.dataset.action || i.textContent.trim().toLowerCase() || "show";
	typeof r.onRowAction == "function" && s && r.onRowAction(c, s, o);
}, A = [{
	narration: "From clicked save button, traverse to closest tfoot row",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "tfoot tr" }
}], j = (t, n, r) => {
	let i = C(n, A);
	if (!i || !r.container.contains(i)) return;
	let a = e?.footer?.getFooterData ? e.footer.getFooterData(i, r.columns) : {};
	a && Object.keys(a).length !== 0 || i.querySelectorAll("input, select").forEach((e) => {
		let t = e.id || e.name;
		t && (a[t] = e.value);
	}), e?.footer?.clearRowInputs ? e.footer.clearRowInputs(i) : i.querySelectorAll("input").forEach((e) => e.value = ""), r.dataset.push(a), r.filteredData.push(a), typeof r.renderTable == "function" && r.renderTable(r.filteredData), typeof r.onSave == "function" && r.onSave(a, r.dataset);
}, M = /* @__PURE__ */ n({
	onFooterSave: () => j,
	onRowAction: () => k,
	onRowClick: () => D,
	onSearch: () => T
}), N = (e, t) => {
	e.addEventListener("input", (n) => {
		for (let r of i) {
			if (r.event !== "input") continue;
			let i = n.target.closest(r.selector);
			if (i && e.contains(i)) {
				let e = M[r.action];
				typeof e == "function" && e(n, i, t);
				return;
			}
		}
	}), e.addEventListener("click", (n) => {
		for (let r of i) {
			if (r.event !== "click") continue;
			let i = n.target.closest(r.selector);
			if (i && e.contains(i)) {
				let e = M[r.action];
				typeof e == "function" && e(n, i, t);
				return;
			}
		}
	});
}, P = {
	name: "json-renderers-build-table-events",
	version: "v1"
}, F = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.build ??= {}, globalThis.ks.jsonRenderers.build.tableEvents = {
		meta: P,
		...e
	});
}, I = (e = {}) => {
	let t = typeof e.container == "string" ? document.getElementById(e.container) : e.container;
	if (!t) return e.showLog && console.warn("[json-renderers-build-table-events] Container not found:", e.container), null;
	let n = r({
		...e,
		container: t
	});
	return N(t, n), { getState: () => ({ ...n }) };
};
F({ hookTableEvents: I });
export { I as default, I as hookTableEvents };
