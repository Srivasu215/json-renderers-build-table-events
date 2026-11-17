// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
}, n = ({ container: e, dataset: t = [], columns: n = [], options: r = {}, renderTable: i = null, onSearch: a = null, onRowClick: o = null, onRowAction: s = null, onSave: c = null, showLog: l = !1 } = {}) => ({
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
}), r = [
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
], i = {
	version: "1.19.1",
	name: "dom-primitive-engine"
}, a = (e) => {
	e && typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.domPrimitive ??= {}, globalThis.ks.domPrimitive.engine = {
		meta: i,
		runInstructions: e
	});
}, o = ({ element: e, previousResult: t, instruction: n, clientData: r }) => {
	let i = n.sourcePath.fileName;
	if (i === "root") return e;
	if (i === "previous") return t;
	if (i === "clientData") return r;
}, s = (e, t) => {
	let n = e.arguments ?? {}, r = n.columns ?? t.columns, i = n.options ?? t.options, a = n.data ?? t.data;
	return {
		...n,
		columns: r,
		options: i,
		data: a
	};
}, c = ({ element: e, previousResult: t, instruction: n, clientData: r, operations: i }) => {
	let a = o({
		element: e,
		previousResult: t,
		instruction: n,
		clientData: r
	}), c = s(n, r), l = i[n.func] ?? r[n.func] ?? r?.functions?.[n.func];
	if (typeof l != "function") throw TypeError(`Unknown primitive operation: "${n.func}"`);
	return l(a, c, r);
}, l = (e, t, n) => {
	let r = e, i = t.selector;
	return r.closest(i);
}, ee = (e, t, n) => {
	let r = e, i = t.selector;
	return !r || typeof r.querySelector != "function" ? null : r.querySelector(i);
}, u = (e, t, n) => {
	let r = e, i = t.selector;
	return Array.from(r.querySelectorAll(i));
}, d = /* @__PURE__ */ t({
	closest: () => l,
	querySelector: () => ee,
	querySelectorAll: () => u
}), f = (e, t, n) => {
	let r = e, i = t.trim ?? !0, a = r.textContent ?? "";
	return i ? a.trim() : a;
}, p = (e, t, n) => {
	let r = e, i = r.tagName?.toLowerCase(), a = r.type?.toLowerCase();
	return a === "checkbox" ? r.checked ? r.value || !0 : !1 : a === "radio" ? r.checked ? r.value : void 0 : i === "select" && r.multiple ? Array.from(r.selectedOptions, (e) => e.value) : "value" in r && i !== "button" ? r.value : r.textContent?.trim() ?? "";
}, m = (e, t, n) => {
	let r = e, i = t.columns ?? n.columns ?? [], a = t.read ?? "text", o = {};
	return r.forEach((e, t) => {
		let r = i[t];
		if (!r) return;
		let s = a === "value" ? p(e, {}, n) : f(e, {}, n);
		o[r] = s;
	}), o;
}, h = (e, t, n) => {
	let r = e, i = {};
	return r.forEach((e) => {
		let t = e.name;
		if (!t) return;
		let r = p(e, {}, n);
		(e.type?.toLowerCase() !== "radio" || r !== void 0) && (Object.hasOwn(i, t) ? (Array.isArray(i[t]) || (i[t] = [i[t]]), i[t].push(r)) : i[t] = r);
	}), i;
}, g = /* @__PURE__ */ t({
	mapNamedValues: () => h,
	mapValues: () => m,
	readText: () => f,
	readValue: () => p
}), _ = (e, t, n) => {
	let r = t?.key ?? "Enter", i = e && typeof e == "object" && "key" in e ? e : t?.event ?? n?.event;
	return !i || i.key !== r ? null : i.target ?? i.currentTarget ?? e;
}, v = /* @__PURE__ */ t({ isKey: () => _ }), y = {
	...d,
	...g,
	...v
}, b = (e, t, n = {}) => {
	let r = e;
	for (let i of t) {
		if (r === null) return null;
		r = c({
			element: e,
			previousResult: r,
			instruction: i,
			clientData: n,
			operations: y
		});
	}
	return r;
}, x = b;
a(b);
// ../dom-traversal-functions/node_modules/dom-primitive-engine/src/v19/register/meta.js
var S = {
	version: "1.19.1",
	name: "dom-primitive-engine"
}, C = (e) => {
	e && typeof globalThis < "u" && (globalThis.ks ??= {}, globalThis.ks.domPrimitive ??= {}, globalThis.ks.domPrimitive.engine = {
		meta: S,
		runInstructions: e
	});
}, te = ({ element: e, previousResult: t, instruction: n, clientData: r }) => {
	let i = n.sourcePath.fileName;
	if (i === "root") return e;
	if (i === "previous") return t;
	if (i === "clientData") return r;
}, ne = (e, t) => {
	let n = e.arguments ?? {}, r = n.columns ?? t.columns, i = n.options ?? t.options, a = n.data ?? t.data;
	return {
		...n,
		columns: r,
		options: i,
		data: a
	};
}, re = ({ element: e, previousResult: t, instruction: n, clientData: r, operations: i }) => {
	let a = te({
		element: e,
		previousResult: t,
		instruction: n,
		clientData: r
	}), o = ne(n, r), s = i[n.func] ?? r[n.func] ?? r?.functions?.[n.func];
	if (typeof s != "function") throw TypeError(`Unknown primitive operation: "${n.func}"`);
	return s(a, o, r);
}, w = (e, t, n) => {
	let r = e, i = t.selector;
	return r.closest(i);
}, T = (e, t, n) => {
	let r = e, i = t.selector;
	return !r || typeof r.querySelector != "function" ? null : r.querySelector(i);
}, E = (e, t, n) => {
	let r = e, i = t.selector;
	return Array.from(r.querySelectorAll(i));
}, D = /* @__PURE__ */ t({
	closest: () => w,
	querySelector: () => T,
	querySelectorAll: () => E
}), O = (e, t, n) => {
	let r = e, i = t.trim ?? !0, a = r.textContent ?? "";
	return i ? a.trim() : a;
}, k = (e, t, n) => {
	let r = e, i = r.tagName?.toLowerCase(), a = r.type?.toLowerCase();
	return a === "checkbox" ? r.checked ? r.value || !0 : !1 : a === "radio" ? r.checked ? r.value : void 0 : i === "select" && r.multiple ? Array.from(r.selectedOptions, (e) => e.value) : "value" in r && i !== "button" ? r.value : r.textContent?.trim() ?? "";
}, A = (e, t, n) => {
	let r = e, i = t.columns ?? n.columns ?? [], a = t.read ?? "text", o = {};
	return r.forEach((e, t) => {
		let r = i[t];
		if (!r) return;
		let s = a === "value" ? k(e, {}, n) : O(e, {}, n);
		o[r] = s;
	}), o;
}, j = (e, t, n) => {
	let r = e, i = {};
	return r.forEach((e) => {
		let t = e.name;
		if (!t) return;
		let r = k(e, {}, n);
		(e.type?.toLowerCase() !== "radio" || r !== void 0) && (Object.hasOwn(i, t) ? (Array.isArray(i[t]) || (i[t] = [i[t]]), i[t].push(r)) : i[t] = r);
	}), i;
}, M = /* @__PURE__ */ t({
	mapNamedValues: () => j,
	mapValues: () => A,
	readText: () => O,
	readValue: () => k
}), N = (e, t, n) => {
	let r = t?.key ?? "Enter", i = e && typeof e == "object" && "key" in e ? e : t?.event ?? n?.event;
	return !i || i.key !== r ? null : i.target ?? i.currentTarget ?? e;
}, P = /* @__PURE__ */ t({ isKey: () => N }), F = {
	...D,
	...M,
	...P
}, I = (e, t, n = {}) => {
	let r = e;
	for (let i of t) {
		if (r === null) return null;
		r = re({
			element: e,
			previousResult: r,
			instruction: i,
			clientData: n,
			operations: F
		});
	}
	return r;
}, L = I;
C(I);
// ../dom-traversal-functions/src/v3/table/header/instructions.json
var R = [{
	narration: "Find search input control if event came from within header container",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "input, form, div" }
}, {
	narration: "Read search query value from input",
	sourcePath: { fileName: "previous" },
	func: "readValue"
}], z = (e) => e ? (L(e.target || e, R) || "").trim().toLowerCase() : "", B = /* @__PURE__ */ t({
	default: () => z,
	getSearchQuery: () => z,
	instructions: () => R
}), V = (e) => e ? e.tagName === "TR" ? e : e.closest("tr") || null : null, H = (e, t = "") => {
	let n = V(e);
	if (!n) return -1;
	if (t) return Array.from(document.querySelectorAll(t)).indexOf(n);
	let r = n.closest("tbody");
	if (r) return Array.from(r.querySelectorAll(":scope > tr")).indexOf(n);
	let i = n.parentElement;
	return i ? Array.from(i.children).filter((e) => e.tagName === "TR").indexOf(n) : -1;
}, U = (e, t = "table-primary", n = "") => {
	let r = V(e);
	if (!r) return null;
	let i = [];
	if (n) i = Array.from(document.querySelectorAll(n));
	else {
		let e = r.closest("tbody") || r.parentElement;
		e && (i = Array.from(e.querySelectorAll(":scope > tr")));
	}
	return i.forEach((e) => e.classList.remove(t)), r.classList.add(t), r;
}, W = [
	{
		narration: "Find closest body table row",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tr" }
	},
	{
		narration: "Collect all data cells from row",
		sourcePath: { fileName: "previous" },
		func: "querySelectorAll",
		arguments: { selector: "td" }
	},
	{
		narration: "Map collected cell values to columns using clientData",
		sourcePath: { fileName: "previous" },
		func: "mapValues",
		arguments: { read: "text" }
	}
], G = (e, { columns: t = [], dataset: n = [], bodySelector: r = "" } = {}) => {
	let i = V(e);
	if (!i) return null;
	let a = H(i, r);
	return n && Array.isArray(n) && a >= 0 && a < n.length ? n[a] : L(i, W, { columns: t.map((e) => typeof e == "string" ? e : e.columnName || e.field) }) || {};
}, K = /* @__PURE__ */ t({
	getRowData: () => G,
	getRowElement: () => V,
	getRowIndex: () => H,
	highlightRow: () => U,
	instructions: () => W
}), q = [
	{
		narration: "Find closest footer table row",
		sourcePath: { fileName: "root" },
		func: "closest",
		arguments: { selector: "tfoot tr" }
	},
	{
		narration: "Collect all input and select controls in footer row",
		sourcePath: { fileName: "previous" },
		func: "querySelectorAll",
		arguments: { selector: "input, select" }
	},
	{
		narration: "Map named control values into object",
		sourcePath: { fileName: "previous" },
		func: "mapNamedValues"
	}
], J = (e, t = []) => {
	let n = V(e);
	if (!n) return {};
	let r = L(n, q);
	if (r && typeof r == "object" && Object.keys(r).length > 0) return r;
	let i = {};
	return t && t.length > 0 && t.forEach((e) => {
		let t = typeof e == "string" ? e : e.columnName || e.field, r = n.querySelector(`input[name="${t}"], select[name="${t}"]`) || n.querySelector(`input#${t}, select#${t}`);
		r && (i[t] = r.value.trim());
	}), i;
}, Y = (e) => {
	let t = V(e);
	if (!t) return 0;
	let n = Array.from(t.querySelectorAll("input"));
	return n.forEach((e) => {
		e.value = "";
	}), n.length;
}, X = {
	header: B,
	body: K,
	footer: /* @__PURE__ */ t({
		clearRowInputs: () => Y,
		getFooterData: () => J,
		instructions: () => q
	})
}, ie = {
	name: "dom-traversal-functions",
	version: "v3"
};
// ../dom-traversal-functions/src/v3/index.js
((e) => {
	let t = e;
	typeof globalThis < "u" && t && (globalThis.ks ??= {}, globalThis.ks.domTraversal ??= {}, globalThis.ks.domTraversal = {
		meta: ie,
		...t
	});
})({ table: X });
// src/v1/actions/onSearch/instructions.json
var ae = [{
	narration: "From search input, find component container",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "[data-role='table-parent'], .card-body, .container, div" }
}, {
	narration: "Locate search feedback display element",
	sourcePath: { fileName: "previous" },
	func: "querySelector",
	arguments: { selector: "#search-feedback, [data-role='search-feedback']" }
}], oe = (e, t, n) => {
	let r = X?.header?.getSearchQuery ? X.header.getSearchQuery(t) : (t?.value || "").trim().toLowerCase(), i = r ? n.dataset.filter((e) => Object.values(e).some((e) => String(e ?? "").toLowerCase().includes(r))) : n.dataset;
	n.filteredData = i, typeof n.renderTable == "function" && n.renderTable(i);
	let a = x(t, ae);
	a && (a.textContent = r ? `Showing ${i.length} of ${n.dataset.length} records matching "${t.value.trim()}".` : `Showing all ${n.dataset.length} records.`), typeof n.onSearch == "function" && n.onSearch(r, i);
}, se = [{
	narration: "From clicked element, traverse to closest tbody table row",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "tbody tr" }
}], ce = (e, t, n) => {
	let r = x(t, se);
	if (!r || !n.container.contains(r)) return;
	r.parentElement?.querySelectorAll("tr.table-primary, tr.table-active").forEach((e) => {
		e.classList.remove("table-primary", "table-active");
	}), r.classList.add("table-primary");
	let i = X?.body?.getRowIndex ? X.body.getRowIndex(r) : Array.from(r.parentElement.children).indexOf(r), a = n.filteredData[i] || n.dataset[i];
	n.selectedIndex = i, typeof n.onRowClick == "function" && a && n.onRowClick(a, i);
}, Z = [{
	narration: "From clicked button, traverse to closest tbody table row",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "tbody tr" }
}], le = (e, t, n) => {
	e.stopPropagation();
	let r = t.closest("button"), i = x(t, Z);
	if (!r || !i || !n.container.contains(i)) return;
	i.parentElement?.querySelectorAll("tr.table-primary, tr.table-active").forEach((e) => {
		e.classList.remove("table-primary", "table-active");
	}), i.classList.add("table-primary");
	let a = X?.body?.getRowIndex ? X.body.getRowIndex(i) : Array.from(i.parentElement.children).indexOf(i), o = n.filteredData[a] || n.dataset[a];
	n.selectedIndex = a;
	let s = r.dataset.action || r.textContent.trim().toLowerCase() || "show";
	typeof n.onRowAction == "function" && o && n.onRowAction(s, o, a);
}, ue = [{
	narration: "From clicked save button, traverse to closest tfoot row",
	sourcePath: { fileName: "root" },
	func: "closest",
	arguments: { selector: "tfoot tr" }
}], de = (e, t, n) => {
	let r = x(t, ue);
	if (!r || !n.container.contains(r)) return;
	let i = X?.footer?.getFooterData ? X.footer.getFooterData(r, n.columns) : {};
	i && Object.keys(i).length !== 0 || r.querySelectorAll("input, select").forEach((e) => {
		let t = e.id || e.name;
		t && (i[t] = e.value);
	}), X?.footer?.clearRowInputs ? X.footer.clearRowInputs(r) : r.querySelectorAll("input").forEach((e) => e.value = ""), n.dataset.push(i), n.filteredData.push(i), typeof n.renderTable == "function" && n.renderTable(n.filteredData), typeof n.onSave == "function" && n.onSave(i, n.dataset);
}, Q = /* @__PURE__ */ t({
	onFooterSave: () => de,
	onRowAction: () => le,
	onRowClick: () => ce,
	onSearch: () => oe
}), fe = (e, t) => {
	e.addEventListener("input", (n) => {
		for (let i of r) {
			if (i.event !== "input") continue;
			let r = n.target.closest(i.selector);
			if (r && e.contains(r)) {
				let e = Q[i.action];
				typeof e == "function" && e(n, r, t);
				return;
			}
		}
	}), e.addEventListener("click", (n) => {
		for (let i of r) {
			if (i.event !== "click") continue;
			let r = n.target.closest(i.selector);
			if (r && e.contains(r)) {
				let e = Q[i.action];
				typeof e == "function" && e(n, r, t);
				return;
			}
		}
	});
}, pe = {
	name: "json-renderers-build-table-events",
	version: "v1"
}, me = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.jsonRenderers ??= {}, globalThis.ks.jsonRenderers.build ??= {}, globalThis.ks.jsonRenderers.build.tableEvents = {
		meta: pe,
		...e
	});
}, $ = (e = {}) => {
	let t = typeof e.container == "string" ? document.getElementById(e.container) : e.container;
	if (!t) return e.showLog && console.warn("[json-renderers-build-table-events] Container not found:", e.container), null;
	let r = n({
		...e,
		container: t
	});
	return fe(t, r), { getState: () => ({ ...r }) };
};
me({ hookTableEvents: $ });
export { $ as default, $ as hookTableEvents };
