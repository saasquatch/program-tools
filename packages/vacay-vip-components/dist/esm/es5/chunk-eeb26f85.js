var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { b as unwrapExports, c as createCommonjsModule, d as process, e as global$1 } from "./chunk-7081a6f1.js";
var visitor = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }), t.visit = function (e, t) { var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : r, s = void 0, u = Array.isArray(e), c = [e], l = -1, d = [], f = void 0, p = void 0, h = void 0, v = [], y = [], m = e; do {
    var g = ++l === c.length, b = g && 0 !== d.length;
    if (g) {
        if (p = 0 === y.length ? void 0 : v[v.length - 1], f = h, h = y.pop(), b) {
            if (u)
                f = f.slice();
            else {
                var E = {};
                for (var I in f)
                    f.hasOwnProperty(I) && (E[I] = f[I]);
                f = E;
            }
            for (var _ = 0, k = 0; k < d.length; k++) {
                var w = d[k][0], O = d[k][1];
                u && (w -= _), u && null === O ? (f.splice(w, 1), _++) : f[w] = O;
            }
        }
        l = s.index, c = s.keys, d = s.edits, u = s.inArray, s = s.prev;
    }
    else {
        if (p = h ? u ? l : c[l] : void 0, null === (f = h ? h[p] : m) || void 0 === f)
            continue;
        h && v.push(p);
    }
    var T = void 0;
    if (!Array.isArray(f)) {
        if (!i(f))
            throw new Error("Invalid AST Node: " + JSON.stringify(f));
        var S = o(t, f.kind, g);
        if (S) {
            if ((T = S.call(t, f, p, h, v, y)) === n)
                break;
            if (!1 === T) {
                if (!g) {
                    v.pop();
                    continue;
                }
            }
            else if (void 0 !== T && (d.push([p, T]), !g)) {
                if (!i(T)) {
                    v.pop();
                    continue;
                }
                f = T;
            }
        }
    }
    void 0 === T && b && d.push([p, f]), g ? v.pop() : (s = { inArray: u, index: l, keys: c, edits: d, prev: s }, c = (u = Array.isArray(f)) ? f : a[f.kind] || [], l = -1, d = [], h && y.push(h), h = f);
} while (void 0 !== s); return 0 !== d.length && (m = d[d.length - 1][1]), m; }, t.visitInParallel = function (e) { var t = new Array(e.length); return { enter: function (r) { for (var i = 0; i < e.length; i++)
        if (!t[i]) {
            var a = o(e[i], r.kind, !1);
            if (a) {
                var s = a.apply(e[i], arguments);
                if (!1 === s)
                    t[i] = r;
                else if (s === n)
                    t[i] = n;
                else if (void 0 !== s)
                    return s;
            }
        } }, leave: function (r) { for (var i = 0; i < e.length; i++)
        if (t[i])
            t[i] === r && (t[i] = null);
        else {
            var a = o(e[i], r.kind, !0);
            if (a) {
                var s = a.apply(e[i], arguments);
                if (s === n)
                    t[i] = n;
                else if (void 0 !== s && !1 !== s)
                    return s;
            }
        } } }; }, t.visitWithTypeInfo = function (e, t) { return { enter: function (r) { e.enter(r); var n = o(t, r.kind, !1); if (n) {
        var a = n.apply(t, arguments);
        return void 0 !== a && (e.leave(r), i(a) && e.enter(a)), a;
    } }, leave: function (r) { var n = o(t, r.kind, !0), i = void 0; return n && (i = n.apply(t, arguments)), e.leave(r), i; } }; }, t.getVisitFn = o; var r = t.QueryDocumentKeys = { Name: [], Document: ["definitions"], OperationDefinition: ["name", "variableDefinitions", "directives", "selectionSet"], VariableDefinition: ["variable", "type", "defaultValue"], Variable: ["name"], SelectionSet: ["selections"], Field: ["alias", "name", "arguments", "directives", "selectionSet"], Argument: ["name", "value"], FragmentSpread: ["name", "directives"], InlineFragment: ["typeCondition", "directives", "selectionSet"], FragmentDefinition: ["name", "variableDefinitions", "typeCondition", "directives", "selectionSet"], IntValue: [], FloatValue: [], StringValue: [], BooleanValue: [], NullValue: [], EnumValue: [], ListValue: ["values"], ObjectValue: ["fields"], ObjectField: ["name", "value"], Directive: ["name", "arguments"], NamedType: ["name"], ListType: ["type"], NonNullType: ["type"], SchemaDefinition: ["directives", "operationTypes"], OperationTypeDefinition: ["type"], ScalarTypeDefinition: ["description", "name", "directives"], ObjectTypeDefinition: ["description", "name", "interfaces", "directives", "fields"], FieldDefinition: ["description", "name", "arguments", "type", "directives"], InputValueDefinition: ["description", "name", "type", "defaultValue", "directives"], InterfaceTypeDefinition: ["description", "name", "directives", "fields"], UnionTypeDefinition: ["description", "name", "directives", "types"], EnumTypeDefinition: ["description", "name", "directives", "values"], EnumValueDefinition: ["description", "name", "directives"], InputObjectTypeDefinition: ["description", "name", "directives", "fields"], ScalarTypeExtension: ["name", "directives"], ObjectTypeExtension: ["name", "interfaces", "directives", "fields"], InterfaceTypeExtension: ["name", "directives", "fields"], UnionTypeExtension: ["name", "directives", "types"], EnumTypeExtension: ["name", "directives", "values"], InputObjectTypeExtension: ["name", "directives", "fields"], DirectiveDefinition: ["description", "name", "arguments", "locations"] }, n = t.BREAK = {}; function i(e) { return Boolean(e && "string" == typeof e.kind); } function o(e, t, r) { var n = e[t]; if (n) {
    if (!r && "function" == typeof n)
        return n;
    var i = r ? n.leave : n.enter;
    if ("function" == typeof i)
        return i;
}
else {
    var o = r ? e.leave : e.enter;
    if (o) {
        if ("function" == typeof o)
            return o;
        var a = o[t];
        if ("function" == typeof a)
            return a;
    }
} } });
unwrapExports(visitor);
var visitor_1 = visitor.visit, visitor_2 = visitor.visitInParallel, visitor_3 = visitor.visitWithTypeInfo, visitor_4 = visitor.getVisitFn, visitor_5 = visitor.QueryDocumentKeys, visitor_6 = visitor.BREAK, printer = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }), t.print = function (e) { return (0, visitor.visit)(e, { leave: r }); }; var r = { Name: function (e) { return e.value; }, Variable: function (e) { return "$" + e.name; }, Document: function (e) { return n(e.definitions, "\n\n") + "\n"; }, OperationDefinition: function (e) { var t = e.operation, r = e.name, i = o("(", n(e.variableDefinitions, ", "), ")"), a = n(e.directives, " "), s = e.selectionSet; return r || a || i || "query" !== t ? n([t, n([r, i]), a, s], " ") : s; }, VariableDefinition: function (e) { return e.variable + ": " + e.type + o(" = ", e.defaultValue); }, SelectionSet: function (e) { return i(e.selections); }, Field: function (e) { var t = e.alias, r = e.name, i = e.arguments, a = e.directives, s = e.selectionSet; return n([o("", t, ": ") + r + o("(", n(i, ", "), ")"), n(a, " "), s], " "); }, Argument: function (e) { return e.name + ": " + e.value; }, FragmentSpread: function (e) { return "..." + e.name + o(" ", n(e.directives, " ")); }, InlineFragment: function (e) { var t = e.typeCondition, r = e.directives, i = e.selectionSet; return n(["...", o("on ", t), n(r, " "), i], " "); }, FragmentDefinition: function (e) { var t = e.name, r = e.typeCondition, i = e.variableDefinitions, a = e.directives, s = e.selectionSet; return "fragment " + t + o("(", n(i, ", "), ")") + " on " + r + " " + o("", n(a, " "), " ") + s; }, IntValue: function (e) { return e.value; }, FloatValue: function (e) { return e.value; }, StringValue: function (e, t) { var r = e.value; return e.block ? function (e, t) { return " " !== e[0] && "\t" !== e[0] || -1 !== e.indexOf("\n") ? t ? '"""\n' + e.replace(/"""/g, '\\"""') + '\n"""' : a('"""\n' + e.replace(/"""/g, '\\"""')) + '\n"""' : '"""' + e.replace(/"""/g, '\\"""') + '"""'; }(r, "description" === t) : JSON.stringify(r); }, BooleanValue: function (e) { var t = e.value; return JSON.stringify(t); }, NullValue: function () { return "null"; }, EnumValue: function (e) { return e.value; }, ListValue: function (e) { return "[" + n(e.values, ", ") + "]"; }, ObjectValue: function (e) { return "{" + n(e.fields, ", ") + "}"; }, ObjectField: function (e) { return e.name + ": " + e.value; }, Directive: function (e) { return "@" + e.name + o("(", n(e.arguments, ", "), ")"); }, NamedType: function (e) { return e.name; }, ListType: function (e) { return "[" + e.type + "]"; }, NonNullType: function (e) { return e.type + "!"; }, SchemaDefinition: function (e) { var t = e.directives, r = e.operationTypes; return n(["schema", n(t, " "), i(r)], " "); }, OperationTypeDefinition: function (e) { return e.operation + ": " + e.type; }, ScalarTypeDefinition: function (e) { return n([e.description, n(["scalar", e.name, n(e.directives, " ")], " ")], "\n"); }, ObjectTypeDefinition: function (e) { var t = e.description, r = e.name, a = e.interfaces, s = e.directives, u = e.fields; return n([t, n(["type", r, o("implements ", n(a, ", ")), n(s, " "), i(u)], " ")], "\n"); }, FieldDefinition: function (e) { var t = e.description, r = e.name, i = e.arguments, a = e.type, s = e.directives; return n([t, r + o("(", n(i, ", "), ")") + ": " + a + o(" ", n(s, " "))], "\n"); }, InputValueDefinition: function (e) { var t = e.description, r = e.name, i = e.type, a = e.defaultValue, s = e.directives; return n([t, n([r + ": " + i, o("= ", a), n(s, " ")], " ")], "\n"); }, InterfaceTypeDefinition: function (e) { var t = e.description, r = e.name, o = e.directives, a = e.fields; return n([t, n(["interface", r, n(o, " "), i(a)], " ")], "\n"); }, UnionTypeDefinition: function (e) { var t = e.description, r = e.name, i = e.directives, o = e.types; return n([t, n(["union", r, n(i, " "), o && 0 !== o.length ? "= " + n(o, " | ") : ""], " ")], "\n"); }, EnumTypeDefinition: function (e) { var t = e.description, r = e.name, o = e.directives, a = e.values; return n([t, n(["enum", r, n(o, " "), i(a)], " ")], "\n"); }, EnumValueDefinition: function (e) { return n([e.description, n([e.name, n(e.directives, " ")], " ")], "\n"); }, InputObjectTypeDefinition: function (e) { var t = e.description, r = e.name, o = e.directives, a = e.fields; return n([t, n(["input", r, n(o, " "), i(a)], " ")], "\n"); }, ScalarTypeExtension: function (e) { return n(["extend scalar", e.name, n(e.directives, " ")], " "); }, ObjectTypeExtension: function (e) { var t = e.name, r = e.interfaces, a = e.directives, s = e.fields; return n(["extend type", t, o("implements ", n(r, ", ")), n(a, " "), i(s)], " "); }, InterfaceTypeExtension: function (e) { var t = e.name, r = e.directives, o = e.fields; return n(["extend interface", t, n(r, " "), i(o)], " "); }, UnionTypeExtension: function (e) { var t = e.name, r = e.directives, i = e.types; return n(["extend union", t, n(r, " "), i && 0 !== i.length ? "= " + n(i, " | ") : ""], " "); }, EnumTypeExtension: function (e) { var t = e.name, r = e.directives, o = e.values; return n(["extend enum", t, n(r, " "), i(o)], " "); }, InputObjectTypeExtension: function (e) { var t = e.name, r = e.directives, o = e.fields; return n(["extend input", t, n(r, " "), i(o)], " "); }, DirectiveDefinition: function (e) { var t = e.description, r = e.name, i = e.arguments, a = e.locations; return n([t, "directive @" + r + o("(", n(i, ", "), ")") + " on " + n(a, " | ")], "\n"); } }; function n(e, t) { return e ? e.filter(function (e) { return e; }).join(t || "") : ""; } function i(e) { return e && 0 !== e.length ? a("{\n" + n(e, "\n")) + "\n}" : ""; } function o(e, t, r) { return t ? e + t + (r || "") : ""; } function a(e) { return e && e.replace(/\n/g, "\n  "); } });
unwrapExports(printer);
var printer_1 = printer.print, fastJsonStableStringify = function (e, t) { t || (t = {}), "function" == typeof t && (t = { cmp: t }); var r, n = "boolean" == typeof t.cycles && t.cycles, i = t.cmp && (r = t.cmp, function (e) { return function (t, n) { var i = { key: t, value: e[t] }, o = { key: n, value: e[n] }; return r(i, o); }; }), o = []; return function e(t) { if (t && t.toJSON && "function" == typeof t.toJSON && (t = t.toJSON()), void 0 !== t) {
    if ("number" == typeof t)
        return isFinite(t) ? "" + t : "null";
    if ("object" != typeof t)
        return JSON.stringify(t);
    var r, a;
    if (Array.isArray(t)) {
        for (a = "[", r = 0; r < t.length; r++)
            r && (a += ","), a += e(t[r]) || "null";
        return a + "]";
    }
    if (null === t)
        return "null";
    if (-1 !== o.indexOf(t)) {
        if (n)
            return JSON.stringify("__cycle__");
        throw new TypeError("Converting circular structure to JSON");
    }
    var s = o.push(t) - 1, u = Object.keys(t).sort(i && i(t));
    for (a = "", r = 0; r < u.length; r++) {
        var c = u[r], l = e(t[c]);
        l && (a && (a += ","), a += JSON.stringify(c) + ":" + l);
    }
    return o.splice(s, 1), "{" + a + "}";
} }(e); }, __assign = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; };
function isStringValue(e) { return "StringValue" === e.kind; }
function isBooleanValue(e) { return "BooleanValue" === e.kind; }
function isIntValue(e) { return "IntValue" === e.kind; }
function isFloatValue(e) { return "FloatValue" === e.kind; }
function isVariable(e) { return "Variable" === e.kind; }
function isObjectValue(e) { return "ObjectValue" === e.kind; }
function isListValue(e) { return "ListValue" === e.kind; }
function isEnumValue(e) { return "EnumValue" === e.kind; }
function isNullValue(e) { return "NullValue" === e.kind; }
function valueToObjectRepresentation(e, t, r, n) { if (isIntValue(r) || isFloatValue(r))
    e[t.value] = Number(r.value);
else if (isBooleanValue(r) || isStringValue(r))
    e[t.value] = r.value;
else if (isObjectValue(r)) {
    var i = {};
    r.fields.map(function (e) { return valueToObjectRepresentation(i, e.name, e.value, n); }), e[t.value] = i;
}
else if (isVariable(r)) {
    var o = (n || {})[r.name.value];
    e[t.value] = o;
}
else if (isListValue(r))
    e[t.value] = r.values.map(function (e) { var r = {}; return valueToObjectRepresentation(r, t, e, n), r[t.value]; });
else if (isEnumValue(r))
    e[t.value] = r.value;
else {
    if (!isNullValue(r))
        throw new Error('The inline argument "' + t.value + '" of kind "' + r.kind + '"is not supported. Use variables instead of inline arguments to overcome this limitation.');
    e[t.value] = null;
} }
function storeKeyNameFromField(e, t) { var r = null; e.directives && (r = {}, e.directives.forEach(function (e) { r[e.name.value] = {}, e.arguments && e.arguments.forEach(function (n) { var i = n.name, o = n.value; return valueToObjectRepresentation(r[e.name.value], i, o, t); }); })); var n = null; return e.arguments && e.arguments.length && (n = {}, e.arguments.forEach(function (e) { var r = e.name, i = e.value; return valueToObjectRepresentation(n, r, i, t); })), getStoreKeyName(e.name.value, n, r); }
var KNOWN_DIRECTIVES = ["connection", "include", "skip", "client", "rest", "export"];
function getStoreKeyName(e, t, r) { if (r && r.connection && r.connection.key) {
    if (r.connection.filter && r.connection.filter.length > 0) {
        var n = r.connection.filter ? r.connection.filter : [];
        n.sort();
        var i = t, o = {};
        return n.forEach(function (e) { o[e] = i[e]; }), r.connection.key + "(" + JSON.stringify(o) + ")";
    }
    return r.connection.key;
} var a = e; if (t) {
    var s = fastJsonStableStringify(t);
    a += "(" + s + ")";
} return r && Object.keys(r).forEach(function (e) { -1 === KNOWN_DIRECTIVES.indexOf(e) && (r[e] && Object.keys(r[e]).length ? a += "@" + e + "(" + JSON.stringify(r[e]) + ")" : a += "@" + e); }), a; }
function argumentsObjectFromField(e, t) { if (e.arguments && e.arguments.length) {
    var r = {};
    return e.arguments.forEach(function (e) { var n = e.name, i = e.value; return valueToObjectRepresentation(r, n, i, t); }), r;
} return null; }
function resultKeyNameFromField(e) { return e.alias ? e.alias.value : e.name.value; }
function isField(e) { return "Field" === e.kind; }
function isInlineFragment(e) { return "InlineFragment" === e.kind; }
function isIdValue(e) { return e && "id" === e.type; }
function toIdValue(e, t) { return void 0 === t && (t = !1), __assign({ type: "id", generated: t }, "string" == typeof e ? { id: e, typename: void 0 } : e); }
function isJsonValue(e) { return null != e && "object" == typeof e && "json" === e.type; }
function getDirectiveInfoFromField(e, t) { if (e.directives && e.directives.length) {
    var r = {};
    return e.directives.forEach(function (e) { r[e.name.value] = argumentsObjectFromField(e, t); }), r;
} return null; }
function shouldInclude(e, t) { if (void 0 === t && (t = {}), !e.directives)
    return !0; var r = !0; return e.directives.forEach(function (e) { if ("skip" === e.name.value || "include" === e.name.value) {
    var n = e.arguments || [], i = e.name.value;
    if (1 !== n.length)
        throw new Error("Incorrect number of arguments for the @" + i + " directive.");
    var o = n[0];
    if (!o.name || "if" !== o.name.value)
        throw new Error("Invalid argument for the @" + i + " directive.");
    var a = n[0].value, s = !1;
    if (a && "BooleanValue" === a.kind)
        s = a.value;
    else {
        if ("Variable" !== a.kind)
            throw new Error("Argument for the @" + i + " directive must be a variable or a boolean value.");
        if (void 0 === (s = t[a.name.value]))
            throw new Error("Invalid variable referenced in @" + i + " directive.");
    }
    "skip" === i && (s = !s), s || (r = !1);
} }), r; }
function flattenSelections(e) { return e.selectionSet && e.selectionSet.selections.length > 0 ? [e].concat(e.selectionSet.selections.map(function (e) { return [e].concat(flattenSelections(e)); }).reduce(function (e, t) { return e.concat(t); }, [])) : [e]; }
function getDirectiveNames(e) { return e.definitions.filter(function (e) { return e.selectionSet && e.selectionSet.selections; }).map(function (e) { return flattenSelections(e); }).reduce(function (e, t) { return e.concat(t); }, []).filter(function (e) { return e.directives && e.directives.length > 0; }).map(function (e) { return e.directives; }).reduce(function (e, t) { return e.concat(t); }, []).map(function (e) { return e.name.value; }); }
function hasDirectives(e, t) { return getDirectiveNames(t).some(function (t) { return e.indexOf(t) > -1; }); }
var __assign$1 = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; };
function getFragmentQueryDocument(e, t) { var r = t, n = []; if (e.definitions.forEach(function (e) { if ("OperationDefinition" === e.kind)
    throw new Error("Found a " + e.operation + " operation" + (e.name ? " named '" + e.name.value + "'" : "") + ". No operations are allowed when using a fragment as a query. Only fragments are allowed."); "FragmentDefinition" === e.kind && n.push(e); }), void 0 === r) {
    if (1 !== n.length)
        throw new Error("Found " + n.length + " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.");
    r = n[0].name.value;
} return __assign$1({}, e, { definitions: [{ kind: "OperationDefinition", operation: "query", selectionSet: { kind: "SelectionSet", selections: [{ kind: "FragmentSpread", name: { kind: "Name", value: r } }] } }].concat(e.definitions) }); }
function assign(e) { for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r]; return t.forEach(function (t) { void 0 !== t && null !== t && Object.keys(t).forEach(function (r) { e[r] = t[r]; }); }), e; }
function getMutationDefinition(e) { checkDocument(e); var t = e.definitions.filter(function (e) { return "OperationDefinition" === e.kind && "mutation" === e.operation; })[0]; if (!t)
    throw new Error("Must contain a mutation definition."); return t; }
function checkDocument(e) { if ("Document" !== e.kind)
    throw new Error('Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql'); var t = e.definitions.filter(function (e) { return "FragmentDefinition" !== e.kind; }).map(function (e) { if ("OperationDefinition" !== e.kind)
    throw new Error('Schema type definitions not allowed in queries. Found: "' + e.kind + '"'); return e; }); if (t.length > 1)
    throw new Error("Ambiguous GraphQL document: contains " + t.length + " operations"); }
function getOperationDefinition(e) { return checkDocument(e), e.definitions.filter(function (e) { return "OperationDefinition" === e.kind; })[0]; }
function getOperationDefinitionOrDie(e) { var t = getOperationDefinition(e); if (!t)
    throw new Error("GraphQL document is missing an operation"); return t; }
function getOperationName(e) { return e.definitions.filter(function (e) { return "OperationDefinition" === e.kind && e.name; }).map(function (e) { return e.name.value; })[0] || null; }
function getFragmentDefinitions(e) { return e.definitions.filter(function (e) { return "FragmentDefinition" === e.kind; }); }
function getQueryDefinition(e) { var t = getOperationDefinition(e); if (!t || "query" !== t.operation)
    throw new Error("Must contain a query definition."); return t; }
function getMainDefinition(e) { var t; checkDocument(e); for (var r = 0, n = e.definitions; r < n.length; r++) {
    var i = n[r];
    if ("OperationDefinition" === i.kind) {
        var o = i.operation;
        if ("query" === o || "mutation" === o || "subscription" === o)
            return i;
    }
    "FragmentDefinition" !== i.kind || t || (t = i);
} if (t)
    return t; throw new Error("Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment."); }
function createFragmentMap(e) { void 0 === e && (e = []); var t = {}; return e.forEach(function (e) { t[e.name.value] = e; }), t; }
function getDefaultValues(e) { if (e && e.variableDefinitions && e.variableDefinitions.length) {
    var t = e.variableDefinitions.filter(function (e) { return e.defaultValue; }).map(function (e) { var t = e.variable, r = e.defaultValue, n = {}; return valueToObjectRepresentation(n, t.name, r), n; });
    return assign.apply(void 0, [{}].concat(t));
} return {}; }
function cloneDeep(e) { if (Array.isArray(e))
    return e.map(function (e) { return cloneDeep(e); }); if (null !== e && "object" == typeof e) {
    var t = {};
    for (var r in e)
        e.hasOwnProperty(r) && (t[r] = cloneDeep(e[r]));
    return t;
} return e; }
var TYPENAME_FIELD = { kind: "Field", name: { kind: "Name", value: "__typename" } };
function isNotEmpty(e, t) { return e.selectionSet.selections.filter(function (e) { return !(e && "FragmentSpread" === e.kind && !isNotEmpty(t[e.name.value], t)); }).length > 0; }
function getDirectiveMatcher(e) { return function (t) { return e.some(function (e) { return !(!e.name || e.name !== t.name.value) || !(!e.test || !e.test(t)); }); }; }
function addTypenameToSelectionSet(e, t) { void 0 === t && (t = !1), e.selections && (t || e.selections.some(function (e) { return "Field" === e.kind && "__typename" === e.name.value; }) || e.selections.push(TYPENAME_FIELD), e.selections.forEach(function (e) { "Field" === e.kind ? 0 !== e.name.value.lastIndexOf("__", 0) && e.selectionSet && addTypenameToSelectionSet(e.selectionSet) : "InlineFragment" === e.kind && e.selectionSet && addTypenameToSelectionSet(e.selectionSet); })); }
function removeDirectivesFromSelectionSet(e, t) { if (!t.selections)
    return t; var r = e.some(function (e) { return e.remove; }); return t.selections = t.selections.map(function (t) { if ("Field" !== t.kind || !t || !t.directives)
    return t; var n, i = getDirectiveMatcher(e); return t.directives = t.directives.filter(function (e) { var t = !i(e); return n || t || !r || (n = !0), t; }), n ? null : t; }).filter(function (e) { return !!e; }), t.selections.forEach(function (t) { "Field" !== t.kind && "InlineFragment" !== t.kind || !t.selectionSet || removeDirectivesFromSelectionSet(e, t.selectionSet); }), t; }
function removeDirectivesFromDocument(e, t) { var r = cloneDeep(t); return r.definitions.forEach(function (t) { removeDirectivesFromSelectionSet(e, t.selectionSet); }), isNotEmpty(getOperationDefinitionOrDie(r), createFragmentMap(getFragmentDefinitions(r))) ? r : null; }
function addTypenameToDocument(e) { checkDocument(e); var t = cloneDeep(e); return t.definitions.forEach(function (e) { var t = "OperationDefinition" === e.kind; addTypenameToSelectionSet(e.selectionSet, t); }), t; }
var connectionRemoveConfig = { test: function (e) { var t = "connection" === e.name.value; return t && (e.arguments && e.arguments.some(function (e) { return "key" === e.name.value; }) || console.warn("Removing an @connection directive even though it does not have a key. You may want to use the key parameter to specify a store key.")), t; } };
function removeConnectionDirectiveFromDocument(e) { return checkDocument(e), removeDirectivesFromDocument([connectionRemoveConfig], e); }
function getEnv() { return void 0 !== process && process.env.NODE_ENV ? process.env.NODE_ENV : "development"; }
function isEnv(e) { return getEnv() === e; }
function isProduction() { return !0 === isEnv("production"); }
function isDevelopment() { return !0 === isEnv("development"); }
function isTest() { return !0 === isEnv("test"); }
function tryFunctionOrLogError(e) { try {
    return e();
}
catch (e) {
    console.error && console.error(e);
} }
function graphQLResultHasError(e) { return e.errors && e.errors.length; }
function isEqual(e, t) { if (e === t)
    return !0; if (e instanceof Date && t instanceof Date)
    return e.getTime() === t.getTime(); if (null != e && "object" == typeof e && null != t && "object" == typeof t) {
    for (var r in e)
        if (Object.prototype.hasOwnProperty.call(e, r)) {
            if (!Object.prototype.hasOwnProperty.call(t, r))
                return !1;
            if (!isEqual(e[r], t[r]))
                return !1;
        }
    for (var r in t)
        if (!Object.prototype.hasOwnProperty.call(e, r))
            return !1;
    return !0;
} return !1; }
function deepFreeze(e) { return Object.freeze(e), Object.getOwnPropertyNames(e).forEach(function (t) { null === e[t] || "object" != typeof e[t] && "function" != typeof e[t] || Object.isFrozen(e[t]) || deepFreeze(e[t]); }), e; }
function maybeDeepFreeze(e) { return !isDevelopment() && !isTest() || "function" == typeof Symbol && "string" == typeof Symbol("") ? e : deepFreeze(e); }
var NetworkStatus, haveWarned = Object.create({});
function warnOnceInDevelopment(e, t) { if (void 0 === t && (t = "warn"), !isProduction() && !haveWarned[e])
    switch (isTest() || (haveWarned[e] = !0), t) {
        case "error":
            console.error(e);
            break;
        default: console.warn(e);
    } }
function isNetworkRequestInFlight(e) { return e < 7; }
!function (e) { e[e.loading = 1] = "loading", e[e.setVariables = 2] = "setVariables", e[e.fetchMore = 3] = "fetchMore", e[e.refetch = 4] = "refetch", e[e.poll = 6] = "poll", e[e.ready = 7] = "ready", e[e.error = 8] = "error"; }(NetworkStatus || (NetworkStatus = {}));
var Observable_1 = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }); var r = function () { function e(e, t) { for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
} } return function (t, r, n) { return r && e(t.prototype, r), n && e(t, n), t; }; }(); function n(e, t) { if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function"); } var i = function () { return "function" == typeof Symbol; }, o = function (e) { return i() && Boolean(Symbol[e]); }, a = function (e) { return o(e) ? Symbol[e] : "@@" + e; }; function s(e, t) { var r = e[t]; if (null != r) {
    if ("function" != typeof r)
        throw new TypeError(r + " is not a function");
    return r;
} } function u(e) { var t = e.constructor; return void 0 !== t && null === (t = t[a("species")]) && (t = void 0), void 0 !== t ? t : g; } function c(e) { return e instanceof g; } function l(e) { l.log ? l.log(e) : setTimeout(function () { throw e; }); } function d(e) { Promise.resolve().then(function () { try {
    e();
}
catch (e) {
    l(e);
} }); } function f(e) { var t = e._cleanup; if (void 0 !== t && (e._cleanup = void 0, t))
    try {
        if ("function" == typeof t)
            t();
        else {
            var r = s(t, "unsubscribe");
            r && r.call(t);
        }
    }
    catch (e) {
        l(e);
    } } function p(e) { e._observer = void 0, e._queue = void 0, e._state = "closed"; } function h(e, t, r) { e._state = "running"; var n = e._observer; try {
    var i = s(n, t);
    switch (t) {
        case "next":
            i && i.call(n, r);
            break;
        case "error":
            if (p(e), !i)
                throw r;
            i.call(n, r);
            break;
        case "complete": p(e), i && i.call(n);
    }
}
catch (e) {
    l(e);
} "closed" === e._state ? f(e) : "running" === e._state && (e._state = "ready"); } function v(e, t, r) { if ("closed" !== e._state) {
    if ("buffering" !== e._state)
        return "ready" !== e._state ? (e._state = "buffering", e._queue = [{ type: t, value: r }], void d(function () { return function (e) { var t = e._queue; if (t) {
            e._queue = void 0, e._state = "ready";
            for (var r = 0; r < t.length && (h(e, t[r].type, t[r].value), "closed" !== e._state); ++r)
                ;
        } }(e); })) : void h(e, t, r);
    e._queue.push({ type: t, value: r });
} } i() && !o("observable") && (Symbol.observable = Symbol("observable")); var y = function () { function e(t, r) { n(this, e), this._cleanup = void 0, this._observer = t, this._queue = void 0, this._state = "initializing"; var i = new m(this); try {
    this._cleanup = r.call(void 0, i);
}
catch (e) {
    i.error(e);
} "initializing" === this._state && (this._state = "ready"); } return r(e, [{ key: "unsubscribe", value: function () { "closed" !== this._state && (p(this), f(this)); } }, { key: "closed", get: function () { return "closed" === this._state; } }]), e; }(), m = function () { function e(t) { n(this, e), this._subscription = t; } return r(e, [{ key: "next", value: function (e) { v(this._subscription, "next", e); } }, { key: "error", value: function (e) { v(this._subscription, "error", e); } }, { key: "complete", value: function () { v(this._subscription, "complete"); } }, { key: "closed", get: function () { return "closed" === this._subscription._state; } }]), e; }(), g = t.Observable = function () { function e(t) { if (n(this, e), !(this instanceof e))
    throw new TypeError("Observable cannot be called as a function"); if ("function" != typeof t)
    throw new TypeError("Observable initializer must be a function"); this._subscriber = t; } return r(e, [{ key: "subscribe", value: function (e) { return "object" == typeof e && null !== e || (e = { next: e, error: arguments[1], complete: arguments[2] }), new y(e, this._subscriber); } }, { key: "forEach", value: function (e) { var t = this; return new Promise(function (r, n) { if ("function" == typeof e)
            var i = t.subscribe({ next: function (t) { try {
                    e(t, o);
                }
                catch (e) {
                    n(e), i.unsubscribe();
                } }, error: n, complete: r });
        else
            n(new TypeError(e + " is not a function")); function o() { i.unsubscribe(), r(); } }); } }, { key: "map", value: function (e) { var t = this; if ("function" != typeof e)
            throw new TypeError(e + " is not a function"); return new (u(this))(function (r) { return t.subscribe({ next: function (t) { try {
                t = e(t);
            }
            catch (e) {
                return r.error(e);
            } r.next(t); }, error: function (e) { r.error(e); }, complete: function () { r.complete(); } }); }); } }, { key: "filter", value: function (e) { var t = this; if ("function" != typeof e)
            throw new TypeError(e + " is not a function"); return new (u(this))(function (r) { return t.subscribe({ next: function (t) { try {
                if (!e(t))
                    return;
            }
            catch (e) {
                return r.error(e);
            } r.next(t); }, error: function (e) { r.error(e); }, complete: function () { r.complete(); } }); }); } }, { key: "reduce", value: function (e) { var t = this; if ("function" != typeof e)
            throw new TypeError(e + " is not a function"); var r = u(this), n = arguments.length > 1, i = !1, o = arguments[1]; return new r(function (r) { return t.subscribe({ next: function (t) { var a = !i; if (i = !0, !a || n)
                try {
                    o = e(o, t);
                }
                catch (e) {
                    return r.error(e);
                }
            else
                o = t; }, error: function (e) { r.error(e); }, complete: function () { if (!i && !n)
                return r.error(new TypeError("Cannot reduce an empty sequence")); r.next(o), r.complete(); } }); }); } }, { key: "concat", value: function () { for (var e = this, t = arguments.length, r = Array(t), n = 0; n < t; n++)
            r[n] = arguments[n]; var i = u(this); return new i(function (t) { var n = void 0; return function e(o) { n = o.subscribe({ next: function (e) { t.next(e); }, error: function (e) { t.error(e); }, complete: function () { 0 === r.length ? (n = void 0, t.complete()) : e(i.from(r.shift())); } }); }(e), function () { n && (n = void 0).unsubscribe(); }; }); } }, { key: "flatMap", value: function (e) { var t = this; if ("function" != typeof e)
            throw new TypeError(e + " is not a function"); var r = u(this); return new r(function (n) { var i = [], o = t.subscribe({ next: function (t) { if (e)
                try {
                    t = e(t);
                }
                catch (e) {
                    return n.error(e);
                } var o = r.from(t).subscribe({ next: function (e) { n.next(e); }, error: function (e) { n.error(e); }, complete: function () { var e = i.indexOf(o); e >= 0 && i.splice(e, 1), a(); } }); i.push(o); }, error: function (e) { n.error(e); }, complete: function () { a(); } }); function a() { o.closed && 0 === i.length && n.complete(); } return function () { i.forEach(function (e) { return e.unsubscribe(); }), o.unsubscribe(); }; }); } }, { key: a("observable"), value: function () { return this; } }], [{ key: "from", value: function (t) { var r = "function" == typeof this ? this : e; if (null == t)
            throw new TypeError(t + " is not an object"); var n = s(t, a("observable")); if (n) {
            var i = n.call(t);
            if (Object(i) !== i)
                throw new TypeError(i + " is not an object");
            return c(i) && i.constructor === r ? i : new r(function (e) { return i.subscribe(e); });
        } if (o("iterator") && (n = s(t, a("iterator"))))
            return new r(function (e) { d(function () { if (!e.closed) {
                var r = !0, i = !1, o = void 0;
                try {
                    for (var a, s = n.call(t)[Symbol.iterator](); !(r = (a = s.next()).done); r = !0) {
                        var u = a.value;
                        if (e.next(u), e.closed)
                            return;
                    }
                }
                catch (e) {
                    i = !0, o = e;
                }
                finally {
                    try {
                        !r && s.return && s.return();
                    }
                    finally {
                        if (i)
                            throw o;
                    }
                }
                e.complete();
            } }); }); if (Array.isArray(t))
            return new r(function (e) { d(function () { if (!e.closed) {
                for (var r = 0; r < t.length; ++r)
                    if (e.next(t[r]), e.closed)
                        return;
                e.complete();
            } }); }); throw new TypeError(t + " is not observable"); } }, { key: "of", value: function () { for (var t = arguments.length, r = Array(t), n = 0; n < t; n++)
            r[n] = arguments[n]; return new ("function" == typeof this ? this : e)(function (e) { d(function () { if (!e.closed) {
            for (var t = 0; t < r.length; ++t)
                if (e.next(r[t]), e.closed)
                    return;
            e.complete();
        } }); }); } }, { key: a("species"), get: function () { return this; } }]), e; }(); i() && Object.defineProperty(g, Symbol("extensions"), { value: { symbol: a("observable"), hostReportError: l }, configurabe: !0 }); });
unwrapExports(Observable_1);
var Observable_2 = Observable_1.Observable, zenObservable = Observable_1.Observable, Observable$1 = zenObservable, __extends = function () { var e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var r in t)
    t.hasOwnProperty(r) && (e[r] = t[r]); }; return function (t, r) { function n() { this.constructor = t; } e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n); }; }(), __assign$2 = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; };
function validateOperation(e) { for (var t = ["query", "operationName", "variables", "extensions", "context"], r = 0, n = Object.keys(e); r < n.length; r++) {
    var i = n[r];
    if (t.indexOf(i) < 0)
        throw new Error("illegal argument: " + i);
} return e; }
var LinkError = function (e) { function t(t, r) { var n = e.call(this, t) || this; return n.link = r, n; } return __extends(t, e), t; }(Error);
function isTerminating(e) { return e.request.length <= 1; }
function fromError(e) { return new Observable$1(function (t) { t.error(e); }); }
function transformOperation(e) { var t = { variables: e.variables || {}, extensions: e.extensions || {}, operationName: e.operationName, query: e.query }; return t.operationName || (t.operationName = "string" != typeof t.query ? getOperationName(t.query) : ""), t; }
function createOperation(e, t) { var r = __assign$2({}, e); return Object.defineProperty(t, "setContext", { enumerable: !1, value: function (e) { r = __assign$2({}, r, "function" == typeof e ? e(r) : e); } }), Object.defineProperty(t, "getContext", { enumerable: !1, value: function () { return __assign$2({}, r); } }), Object.defineProperty(t, "toKey", { enumerable: !1, value: function () { return getKey(t); } }), t; }
function getKey(e) { return printer_1(e.query) + "|" + JSON.stringify(e.variables) + "|" + e.operationName; }
var root, passthrough = function (e, t) { return t ? t(e) : Observable$1.of(); }, toLink = function (e) { return "function" == typeof e ? new ApolloLink(e) : e; }, empty = function () { return new ApolloLink(function (e, t) { return Observable$1.of(); }); }, from = function (e) { return 0 === e.length ? empty() : e.map(toLink).reduce(function (e, t) { return e.concat(t); }); }, split = function (e, t, r) { void 0 === r && (r = new ApolloLink(passthrough)); var n = toLink(t), i = toLink(r); return isTerminating(n) && isTerminating(i) ? new ApolloLink(function (t) { return e(t) ? n.request(t) || Observable$1.of() : i.request(t) || Observable$1.of(); }) : new ApolloLink(function (t, r) { return e(t) ? n.request(t, r) || Observable$1.of() : i.request(t, r) || Observable$1.of(); }); }, concat = function (e, t) { var r = toLink(e); if (isTerminating(r))
    return console.warn(new LinkError("You are calling concat on a terminating link, which will have no effect", r)), r; var n = toLink(t); return isTerminating(n) ? new ApolloLink(function (e) { return r.request(e, function (e) { return n.request(e) || Observable$1.of(); }) || Observable$1.of(); }) : new ApolloLink(function (e, t) { return r.request(e, function (e) { return n.request(e, t) || Observable$1.of(); }) || Observable$1.of(); }); }, ApolloLink = function () { function e(e) { e && (this.request = e); } return e.prototype.split = function (t, r, n) { return void 0 === n && (n = new e(passthrough)), this.concat(split(t, r, n)); }, e.prototype.concat = function (e) { return concat(this, e); }, e.prototype.request = function (e, t) { throw new Error("request is not implemented"); }, e.empty = empty, e.from = from, e.split = split, e.execute = execute, e; }();
function execute(e, t) { return e.request(createOperation(t.context, transformOperation(validateOperation(t)))) || Observable$1.of(); }
function symbolObservablePonyfill(e) { var t, r = e.Symbol; return "function" == typeof r ? r.observable ? t = r.observable : (t = r("observable"), r.observable = t) : t = "@@observable", t; }
var result = symbolObservablePonyfill(root = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== global$1 ? global$1 : "undefined" != typeof module ? module : Function("return this")()), __extends$1 = function () { var e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var r in t)
    t.hasOwnProperty(r) && (e[r] = t[r]); }; return function (t, r) { function n() { this.constructor = t; } e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n); }; }(), Observable$2 = function (e) { function t() { return null !== e && e.apply(this, arguments) || this; } return __extends$1(t, e), t.prototype[result] = function () { return this; }, t.prototype["@@observable"] = function () { return this; }, t; }(Observable$1), __extends$2 = function () { var e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var r in t)
    t.hasOwnProperty(r) && (e[r] = t[r]); }; return function (t, r) { function n() { this.constructor = t; } e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n); }; }();
function isApolloError(e) { return e.hasOwnProperty("graphQLErrors"); }
var FetchType, generateErrorMessage = function (e) { var t = ""; return Array.isArray(e.graphQLErrors) && 0 !== e.graphQLErrors.length && e.graphQLErrors.forEach(function (e) { var r = e ? e.message : "Error message not found."; t += "GraphQL error: " + r + "\n"; }), e.networkError && (t += "Network error: " + e.networkError.message + "\n"), t = t.replace(/\n$/, ""); }, ApolloError = function (e) { function t(r) { var n = r.graphQLErrors, i = r.networkError, o = r.errorMessage, a = r.extraInfo, s = e.call(this, o) || this; return s.graphQLErrors = n || [], s.networkError = i || null, s.message = o || generateErrorMessage(s), s.extraInfo = a, s.__proto__ = t.prototype, s; } return __extends$2(t, e), t; }(Error);
!function (e) { e[e.normal = 1] = "normal", e[e.refetch = 2] = "refetch", e[e.poll = 3] = "poll"; }(FetchType || (FetchType = {}));
var __extends$3 = function () { var e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var r in t)
    t.hasOwnProperty(r) && (e[r] = t[r]); }; return function (t, r) { function n() { this.constructor = t; } e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n); }; }(), __assign$3 = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; }, hasError = function (e, t) { return void 0 === t && (t = "none"), e && (e.graphQLErrors && e.graphQLErrors.length > 0 && "none" === t || e.networkError); }, ObservableQuery = function (e) { function t(t) { var r = t.scheduler, n = t.options, i = t.shouldSubscribe, o = void 0 === i || i, a = e.call(this, function (e) { return a.onSubscribe(e); }) || this; return a.isCurrentlyPolling = !1, a.isTornDown = !1, a.options = n, a.variables = n.variables || {}, a.queryId = r.queryManager.generateQueryId(), a.shouldSubscribe = o, a.scheduler = r, a.queryManager = r.queryManager, a.observers = [], a.subscriptionHandles = [], a; } return __extends$3(t, e), t.prototype.result = function () { var e = this; return new Promise(function (t, r) { var n, i = { next: function (r) { t(r), e.observers.some(function (e) { return e !== i; }) || e.queryManager.removeQuery(e.queryId), setTimeout(function () { n.unsubscribe(); }, 0); }, error: function (e) { r(e); } }; n = e.subscribe(i); }); }, t.prototype.currentResult = function () { if (this.isTornDown)
    return { data: this.lastError ? {} : this.lastResult ? this.lastResult.data : {}, error: this.lastError, loading: !1, networkStatus: NetworkStatus.error }; var e = this.queryManager.queryStore.get(this.queryId); if (hasError(e, this.options.errorPolicy))
    return { data: {}, loading: !1, networkStatus: e.networkStatus, error: new ApolloError({ graphQLErrors: e.graphQLErrors, networkError: e.networkError }) }; var t, r = this.queryManager.getCurrentQueryResult(this), n = r.data, i = r.partial, o = !e || e.networkStatus === NetworkStatus.loading, a = "network-only" === this.options.fetchPolicy && o || i && "cache-only" !== this.options.fetchPolicy, s = { data: n, loading: isNetworkRequestInFlight(t = e ? e.networkStatus : a ? NetworkStatus.loading : NetworkStatus.ready), networkStatus: t }; return e && e.graphQLErrors && "all" === this.options.errorPolicy && (s.errors = e.graphQLErrors), i || (this.lastResult = __assign$3({}, s, { stale: !1 })), __assign$3({}, s, { partial: i }); }, t.prototype.getLastResult = function () { return this.lastResult; }, t.prototype.getLastError = function () { return this.lastError; }, t.prototype.resetLastResults = function () { delete this.lastResult, delete this.lastError, this.isTornDown = !1; }, t.prototype.refetch = function (e) { var t = this.options.fetchPolicy; if ("cache-only" === t)
    return Promise.reject(new Error("cache-only fetchPolicy option should not be used together with query refetch.")); isEqual(this.variables, e) || (this.variables = Object.assign({}, this.variables, e)), isEqual(this.options.variables, this.variables) || (this.options.variables = Object.assign({}, this.options.variables, this.variables)); var r = "network-only" === t || "no-cache" === t, n = __assign$3({}, this.options, { fetchPolicy: r ? t : "network-only" }); return this.queryManager.fetchQuery(this.queryId, n, FetchType.refetch).then(function (e) { return maybeDeepFreeze(e); }); }, t.prototype.fetchMore = function (e) { var t, r = this; if (!e.updateQuery)
    throw new Error("updateQuery option is required. This function defines how to update the query data with the new results."); return Promise.resolve().then(function () { var n = r.queryManager.generateQueryId(); return (t = e.query ? e : __assign$3({}, r.options, e, { variables: Object.assign({}, r.variables, e.variables) })).fetchPolicy = "network-only", r.queryManager.fetchQuery(n, t, FetchType.normal, r.queryId); }).then(function (n) { return r.updateQuery(function (r) { return e.updateQuery(r, { fetchMoreResult: n.data, variables: t.variables }); }), n; }); }, t.prototype.subscribeToMore = function (e) { var t = this, r = this.queryManager.startGraphQLSubscription({ query: e.document, variables: e.variables }).subscribe({ next: function (r) { e.updateQuery && t.updateQuery(function (t, n) { var i = n.variables; return e.updateQuery(t, { subscriptionData: r, variables: i }); }); }, error: function (t) { e.onError ? e.onError(t) : console.error("Unhandled GraphQL subscription error", t); } }); return this.subscriptionHandles.push(r), function () { var e = t.subscriptionHandles.indexOf(r); e >= 0 && (t.subscriptionHandles.splice(e, 1), r.unsubscribe()); }; }, t.prototype.setOptions = function (e) { var t = this.options; this.options = Object.assign({}, this.options, e), e.pollInterval ? this.startPolling(e.pollInterval) : 0 === e.pollInterval && this.stopPolling(); var r = "network-only" !== t.fetchPolicy && "network-only" === e.fetchPolicy || "cache-only" === t.fetchPolicy && "cache-only" !== e.fetchPolicy || "standby" === t.fetchPolicy && "standby" !== e.fetchPolicy || !1; return this.setVariables(this.options.variables, r, e.fetchResults); }, t.prototype.setVariables = function (e, t, r) { void 0 === t && (t = !1), void 0 === r && (r = !0), this.isTornDown = !1; var n = e || this.variables; return isEqual(n, this.variables) && !t ? 0 !== this.observers.length && r ? this.result() : new Promise(function (e) { return e(); }) : (this.variables = n, this.options.variables = n, 0 === this.observers.length ? new Promise(function (e) { return e(); }) : this.queryManager.fetchQuery(this.queryId, __assign$3({}, this.options, { variables: this.variables })).then(function (e) { return maybeDeepFreeze(e); })); }, t.prototype.updateQuery = function (e) { var t = this.queryManager.getQueryWithPreviousResult(this.queryId), r = t.previousResult, n = t.variables, i = t.document, o = tryFunctionOrLogError(function () { return e(r, { variables: n }); }); o && (this.queryManager.dataStore.markUpdateQueryResult(i, n, o), this.queryManager.broadcastQueries()); }, t.prototype.stopPolling = function () { this.isCurrentlyPolling && (this.scheduler.stopPollingQuery(this.queryId), this.options.pollInterval = void 0, this.isCurrentlyPolling = !1); }, t.prototype.startPolling = function (e) { if ("cache-first" === this.options.fetchPolicy || "cache-only" === this.options.fetchPolicy)
    throw new Error("Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries."); this.isCurrentlyPolling && (this.scheduler.stopPollingQuery(this.queryId), this.isCurrentlyPolling = !1), this.options.pollInterval = e, this.isCurrentlyPolling = !0, this.scheduler.startPollingQuery(this.options, this.queryId); }, t.prototype.onSubscribe = function (e) { var t = this; return e._subscription && e._subscription._observer && !e._subscription._observer.error && (e._subscription._observer.error = function (e) { console.error("Unhandled error", e.message, e.stack); }), this.observers.push(e), e.next && this.lastResult && e.next(this.lastResult), e.error && this.lastError && e.error(this.lastError), 1 === this.observers.length && this.setUpQuery(), function () { t.observers = t.observers.filter(function (t) { return t !== e; }), 0 === t.observers.length && t.tearDownQuery(); }; }, t.prototype.setUpQuery = function () { var e = this; if (this.shouldSubscribe && this.queryManager.addObservableQuery(this.queryId, this), this.options.pollInterval) {
    if ("cache-first" === this.options.fetchPolicy || "cache-only" === this.options.fetchPolicy)
        throw new Error("Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.");
    this.isCurrentlyPolling = !0, this.scheduler.startPollingQuery(this.options, this.queryId);
} var t = { next: function (t) { e.lastResult = t, e.observers.forEach(function (e) { return e.next && e.next(t); }); }, error: function (t) { e.lastError = t, e.observers.forEach(function (e) { return e.error && e.error(t); }); } }; this.queryManager.startQuery(this.queryId, this.options, this.queryManager.queryListenerForObserver(this.queryId, this.options, t)); }, t.prototype.tearDownQuery = function () { this.isTornDown = !0, this.isCurrentlyPolling && (this.scheduler.stopPollingQuery(this.queryId), this.isCurrentlyPolling = !1), this.subscriptionHandles.forEach(function (e) { return e.unsubscribe(); }), this.subscriptionHandles = [], this.queryManager.removeObservableQuery(this.queryId), this.queryManager.stopQuery(this.queryId), this.observers = []; }, t; }(Observable$2), __extends$4 = function () { var e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var r in t)
    t.hasOwnProperty(r) && (e[r] = t[r]); }; return function (t, r) { function n() { this.constructor = t; } e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n); }; }(), DedupLink = function (e) { function t() { var t = null !== e && e.apply(this, arguments) || this; return t.inFlightRequestObservables = new Map, t.subscribers = new Map, t; } return __extends$4(t, e), t.prototype.request = function (e, t) { var r = this; if (e.getContext().forceFetch)
    return t(e); var n = e.toKey(), i = function (e) { return r.inFlightRequestObservables.delete(e), r.subscribers.get(e); }; if (!this.inFlightRequestObservables.get(n)) {
    var o, a = t(e), s = new Observable$1(function (e) { var t = r.subscribers.get(n); return t || (t = { next: [], error: [], complete: [] }), r.subscribers.set(n, { next: t.next.concat([e.next.bind(e)]), error: t.error.concat([e.error.bind(e)]), complete: t.complete.concat([e.complete.bind(e)]) }), o || (o = a.subscribe({ next: function (e) { var t = i(n); r.subscribers.delete(n), t && (t.next.forEach(function (t) { return t(e); }), t.complete.forEach(function (e) { return e(); })); }, error: function (e) { var t = i(n); r.subscribers.delete(n), t && t.error.forEach(function (t) { return t(e); }); } })), function () { o && o.unsubscribe(), r.inFlightRequestObservables.delete(n); }; });
    this.inFlightRequestObservables.set(n, s);
} return this.inFlightRequestObservables.get(n); }, t; }(ApolloLink), __assign$4 = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; }, QueryScheduler = function () { function e(e) { var t = e.queryManager, r = e.ssrMode; this.inFlightQueries = {}, this.registeredQueries = {}, this.intervalQueries = {}, this.pollingTimers = {}, this.ssrMode = !1, this.queryManager = t, this.ssrMode = r || !1; } return e.prototype.checkInFlight = function (e) { var t = this.queryManager.queryStore.get(e); return t && t.networkStatus !== NetworkStatus.ready && t.networkStatus !== NetworkStatus.error; }, e.prototype.fetchQuery = function (e, t, r) { var n = this; return new Promise(function (i, o) { n.queryManager.fetchQuery(e, t, r).then(function (e) { i(e); }).catch(function (e) { o(e); }); }); }, e.prototype.startPollingQuery = function (e, t, r) { if (!e.pollInterval)
    throw new Error("Attempted to start a polling query without a polling interval."); return this.ssrMode ? t : (this.registeredQueries[t] = e, r && this.queryManager.addQueryListener(t, r), this.addQueryOnInterval(t, e), t); }, e.prototype.stopPollingQuery = function (e) { delete this.registeredQueries[e]; }, e.prototype.fetchQueriesOnInterval = function (e) { var t = this; this.intervalQueries[e] = this.intervalQueries[e].filter(function (r) { if (!t.registeredQueries.hasOwnProperty(r) || t.registeredQueries[r].pollInterval !== e)
    return !1; if (t.checkInFlight(r))
    return !0; var n = t.registeredQueries[r], i = __assign$4({}, n); return i.fetchPolicy = "network-only", t.fetchQuery(r, i, FetchType.poll).catch(function () { }), !0; }), 0 === this.intervalQueries[e].length && (clearInterval(this.pollingTimers[e]), delete this.intervalQueries[e]); }, e.prototype.addQueryOnInterval = function (e, t) { var r = this, n = t.pollInterval; if (!n)
    throw new Error("A poll interval is required to start polling query with id '" + e + "'."); this.intervalQueries.hasOwnProperty(n.toString()) && this.intervalQueries[n].length > 0 ? this.intervalQueries[n].push(e) : (this.intervalQueries[n] = [e], this.pollingTimers[n] = setInterval(function () { r.fetchQueriesOnInterval(n); }, n)); }, e.prototype.registerPollingQuery = function (e) { if (!e.pollInterval)
    throw new Error("Attempted to register a non-polling query with the scheduler."); return new ObservableQuery({ scheduler: this, options: e }); }, e; }(), MutationStore = function () { function e() { this.store = {}; } return e.prototype.getStore = function () { return this.store; }, e.prototype.get = function (e) { return this.store[e]; }, e.prototype.initMutation = function (e, t, r) { this.store[e] = { mutationString: t, variables: r || {}, loading: !0, error: null }; }, e.prototype.markMutationError = function (e, t) { var r = this.store[e]; r && (r.loading = !1, r.error = t); }, e.prototype.markMutationResult = function (e) { var t = this.store[e]; t && (t.loading = !1, t.error = null); }, e.prototype.reset = function () { this.store = {}; }, e; }(), __assign$5 = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; }, QueryStore = function () { function e() { this.store = {}; } return e.prototype.getStore = function () { return this.store; }, e.prototype.get = function (e) { return this.store[e]; }, e.prototype.initQuery = function (e) { var t = this.store[e.queryId]; if (t && t.document !== e.document && printer_1(t.document) !== printer_1(e.document))
    throw new Error("Internal Error: may not update existing query string in store"); var r, n = !1, i = null; e.storePreviousVariables && t && t.networkStatus !== NetworkStatus.loading && (isEqual(t.variables, e.variables) || (n = !0, i = t.variables)), r = n ? NetworkStatus.setVariables : e.isPoll ? NetworkStatus.poll : e.isRefetch ? NetworkStatus.refetch : NetworkStatus.loading; var o = []; t && t.graphQLErrors && (o = t.graphQLErrors), this.store[e.queryId] = { document: e.document, variables: e.variables, previousVariables: i, networkError: null, graphQLErrors: o, networkStatus: r, metadata: e.metadata }, "string" == typeof e.fetchMoreForQueryId && this.store[e.fetchMoreForQueryId] && (this.store[e.fetchMoreForQueryId].networkStatus = NetworkStatus.fetchMore); }, e.prototype.markQueryResult = function (e, t, r) { this.store[e] && (this.store[e].networkError = null, this.store[e].graphQLErrors = t.errors && t.errors.length ? t.errors : [], this.store[e].previousVariables = null, this.store[e].networkStatus = NetworkStatus.ready, "string" == typeof r && this.store[r] && (this.store[r].networkStatus = NetworkStatus.ready)); }, e.prototype.markQueryError = function (e, t, r) { this.store[e] && (this.store[e].networkError = t, this.store[e].networkStatus = NetworkStatus.error, "string" == typeof r && this.markQueryResultClient(r, !0)); }, e.prototype.markQueryResultClient = function (e, t) { this.store[e] && (this.store[e].networkError = null, this.store[e].previousVariables = null, this.store[e].networkStatus = t ? NetworkStatus.ready : NetworkStatus.loading); }, e.prototype.stopQuery = function (e) { delete this.store[e]; }, e.prototype.reset = function (e) { var t = this; this.store = Object.keys(this.store).filter(function (t) { return e.indexOf(t) > -1; }).reduce(function (e, r) { return e[r] = __assign$5({}, t.store[r], { networkStatus: NetworkStatus.loading }), e; }, {}); }, e; }(), __assign$6 = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; }, defaultQueryInfo = { listeners: [], invalidated: !1, document: null, newData: null, lastRequestId: null, observableQuery: null, subscriptions: [] }, QueryManager = function () { function e(e) { var t = e.link, r = e.queryDeduplication, n = void 0 !== r && r, i = e.store, o = e.onBroadcast, a = void 0 === o ? function () { } : o, s = e.ssrMode, u = void 0 !== s && s; this.mutationStore = new MutationStore, this.queryStore = new QueryStore, this.idCounter = 1, this.queries = new Map, this.fetchQueryPromises = new Map, this.queryIdsByName = {}, this.link = t, this.deduplicator = ApolloLink.from([new DedupLink, t]), this.queryDeduplication = n, this.dataStore = i, this.onBroadcast = a, this.scheduler = new QueryScheduler({ queryManager: this, ssrMode: u }); } return e.prototype.mutate = function (e) { var t = this, r = e.mutation, n = e.variables, i = e.optimisticResponse, o = e.updateQueries, a = e.refetchQueries, s = void 0 === a ? [] : a, u = e.update, c = e.errorPolicy, l = void 0 === c ? "none" : c, d = e.fetchPolicy, f = e.context, p = void 0 === f ? {} : f; if (!r)
    throw new Error("mutation option is required. You must specify your GraphQL document in the mutation option."); if (d && "no-cache" !== d)
    throw new Error("fetchPolicy for mutations currently only supports the 'no-cache' policy"); var h = this.generateQueryId(), v = this.dataStore.getCache(); r = v.transformDocument(r), n = assign({}, getDefaultValues(getMutationDefinition(r)), n); var y = printer_1(r); this.setQuery(h, function () { return { document: r }; }); var m = function () { var e = {}; return o && Object.keys(o).forEach(function (r) { return (t.queryIdsByName[r] || []).forEach(function (n) { e[n] = { updater: o[r], query: t.queryStore.get(n) }; }); }), e; }; return this.mutationStore.initMutation(h, y, n), this.dataStore.markMutationInit({ mutationId: h, document: r, variables: n || {}, updateQueries: m(), update: u, optimisticResponse: i }), this.broadcastQueries(), new Promise(function (e, o) { var a, c, f = t.buildOperationForLink(r, n, __assign$6({}, p, { optimisticResponse: i })); execute(t.link, f).subscribe({ next: function (e) { graphQLResultHasError(e) && "none" === l ? c = new ApolloError({ graphQLErrors: e.errors }) : (t.mutationStore.markMutationResult(h), "no-cache" !== d && t.dataStore.markMutationResult({ mutationId: h, result: e, document: r, variables: n || {}, updateQueries: m(), update: u }), a = e); }, error: function (e) { t.mutationStore.markMutationError(h, e), t.dataStore.markMutationComplete({ mutationId: h, optimisticResponse: i }), t.broadcastQueries(), t.setQuery(h, function () { return { document: void 0 }; }), o(new ApolloError({ networkError: e })); }, complete: function () { c && t.mutationStore.markMutationError(h, c), t.dataStore.markMutationComplete({ mutationId: h, optimisticResponse: i }), t.broadcastQueries(), c ? o(c) : ("function" == typeof s && (s = s(a)), s && s.forEach(function (e) { "string" != typeof e ? t.query({ query: e.query, variables: e.variables, fetchPolicy: "network-only" }) : t.refetchQueryByName(e); }), t.setQuery(h, function () { return { document: void 0 }; }), "ignore" === l && a && graphQLResultHasError(a) && delete a.errors, e(a)); } }); }); }, e.prototype.fetchQuery = function (e, t, r, n) { var i, o = this, a = t.variables, s = void 0 === a ? {} : a, u = t.metadata, c = void 0 === u ? null : u, l = t.fetchPolicy, d = void 0 === l ? "cache-first" : l, f = this.dataStore.getCache().transformDocument(t.query), p = "network-only" === d || "no-cache" === d; if (r !== FetchType.refetch && "network-only" !== d && "no-cache" !== d) {
    var h = this.dataStore.getCache().diff({ query: f, variables: s, returnPartialData: !0, optimistic: !1 }), v = h.complete, y = h.result;
    p = !v || "cache-and-network" === d, i = y;
} var m = p && "cache-only" !== d && "standby" !== d; hasDirectives(["live"], f) && (m = !0); var g = this.generateRequestId(), b = this.updateQueryWatch(e, f, t); if (this.setQuery(e, function () { return { document: f, lastRequestId: g, invalidated: !0, cancel: b }; }), this.invalidate(!0, n), this.queryStore.initQuery({ queryId: e, document: f, storePreviousVariables: m, variables: s, isPoll: r === FetchType.poll, isRefetch: r === FetchType.refetch, metadata: c, fetchMoreForQueryId: n }), this.broadcastQueries(), (!m || "cache-and-network" === d) && (this.queryStore.markQueryResultClient(e, !m), this.invalidate(!0, e, n), this.broadcastQueries()), m) {
    var E = this.fetchRequest({ requestId: g, queryId: e, document: f, options: t, fetchMoreForQueryId: n }).catch(function (t) { if (isApolloError(t))
        throw t; var r = o.getQuery(e).lastRequestId; throw g >= (r || 1) && (o.queryStore.markQueryError(e, t, n), o.invalidate(!0, e, n), o.broadcastQueries()), o.removeFetchQueryPromise(g), new ApolloError({ networkError: t }); });
    if ("cache-and-network" !== d)
        return E;
    E.catch(function () { });
} return Promise.resolve({ data: i }); }, e.prototype.queryListenerForObserver = function (e, t, r) { var n = this, i = !1; return function (o, a) { if (n.invalidate(!1, e), o) {
    var s = n.getQuery(e).observableQuery, u = s ? s.options.fetchPolicy : t.fetchPolicy;
    if ("standby" !== u) {
        var c = s ? s.options.errorPolicy : t.errorPolicy, l = s ? s.getLastResult() : null, d = s ? s.getLastError() : null, f = !a && null != o.previousVariables || "cache-only" === u || "cache-and-network" === u, p = Boolean(l && o.networkStatus !== l.networkStatus), h = c && (d && d.graphQLErrors) !== o.graphQLErrors && "none" !== c;
        if (!isNetworkRequestInFlight(o.networkStatus) || p && t.notifyOnNetworkStatusChange || f) {
            if ((!c || "none" === c) && o.graphQLErrors && o.graphQLErrors.length > 0 || o.networkError) {
                var v = new ApolloError({ graphQLErrors: o.graphQLErrors, networkError: o.networkError });
                if (i = !0, r.error)
                    try {
                        r.error(v);
                    }
                    catch (e) {
                        setTimeout(function () { throw e; }, 0);
                    }
                else
                    setTimeout(function () { throw v; }, 0), isProduction() || console.info("An unhandled error was thrown because no error handler is registered for the query " + printer_1(o.document));
                return;
            }
            try {
                var y = void 0, m = void 0;
                if (a)
                    n.setQuery(e, function () { return { newData: null }; }), y = a.result, m = !a.complete || !1;
                else if (l && l.data && !h)
                    y = l.data, m = !1;
                else {
                    var g = n.getQuery(e).document, b = n.dataStore.getCache().diff({ query: g, variables: o.previousVariables || o.variables, optimistic: !0 });
                    y = b.result, m = !b.complete;
                }
                var E = void 0;
                if (E = m && "cache-only" !== u ? { data: l && l.data, loading: isNetworkRequestInFlight(o.networkStatus), networkStatus: o.networkStatus, stale: !0 } : { data: y, loading: isNetworkRequestInFlight(o.networkStatus), networkStatus: o.networkStatus, stale: !1 }, "all" === c && o.graphQLErrors && o.graphQLErrors.length > 0 && (E.errors = o.graphQLErrors), r.next && (!l || !E || l.networkStatus !== E.networkStatus || l.stale !== E.stale || l.data !== E.data || i))
                    try {
                        r.next(maybeDeepFreeze(E));
                    }
                    catch (e) {
                        setTimeout(function () { throw e; }, 0);
                    }
                i = !1;
            }
            catch (e) {
                return i = !0, void (r.error && r.error(new ApolloError({ networkError: e })));
            }
        }
    }
} }; }, e.prototype.watchQuery = function (e, t) { if (void 0 === t && (t = !0), "standby" === e.fetchPolicy)
    throw new Error('client.watchQuery cannot be called with fetchPolicy set to "standby"'); var r = getQueryDefinition(e.query); if (r.variableDefinitions && r.variableDefinitions.length) {
    var n = getDefaultValues(r);
    e.variables = assign({}, n, e.variables);
} void 0 === e.notifyOnNetworkStatusChange && (e.notifyOnNetworkStatusChange = !1); var i = __assign$6({}, e); return new ObservableQuery({ scheduler: this.scheduler, options: i, shouldSubscribe: t }); }, e.prototype.query = function (e) { var t = this; if (!e.query)
    throw new Error("query option is required. You must specify your GraphQL document in the query option."); if ("Document" !== e.query.kind)
    throw new Error('You must wrap the query string in a "gql" tag.'); if (e.returnPartialData)
    throw new Error("returnPartialData option only supported on watchQuery."); if (e.pollInterval)
    throw new Error("pollInterval option only supported on watchQuery."); var r = this.idCounter; return new Promise(function (n, i) { return t.addFetchQueryPromise(r, n, i), t.watchQuery(e, !1).result().then(function (e) { t.removeFetchQueryPromise(r), n(e); }).catch(function (e) { t.removeFetchQueryPromise(r), i(e); }); }); }, e.prototype.generateQueryId = function () { var e = this.idCounter.toString(); return this.idCounter++, e; }, e.prototype.stopQueryInStore = function (e) { this.queryStore.stopQuery(e), this.invalidate(!0, e), this.broadcastQueries(); }, e.prototype.addQueryListener = function (e, t) { this.setQuery(e, function (e) { var r = e.listeners; return { listeners: (void 0 === r ? [] : r).concat([t]), invalidate: !1 }; }); }, e.prototype.updateQueryWatch = function (e, t, r) { var n = this, i = this.getQuery(e).cancel; return i && i(), this.dataStore.getCache().watch({ query: t, variables: r.variables, optimistic: !0, previousResult: function () { var t = null, r = n.getQuery(e).observableQuery; if (r) {
        var i = r.getLastResult();
        i && (t = i.data);
    } return t; }, callback: function (t) { n.setQuery(e, function () { return { invalidated: !0, newData: t }; }); } }); }, e.prototype.addFetchQueryPromise = function (e, t, r) { this.fetchQueryPromises.set(e.toString(), { resolve: t, reject: r }); }, e.prototype.removeFetchQueryPromise = function (e) { this.fetchQueryPromises.delete(e.toString()); }, e.prototype.addObservableQuery = function (e, t) { this.setQuery(e, function () { return { observableQuery: t }; }); var r = getQueryDefinition(t.options.query); if (r.name && r.name.value) {
    var n = r.name.value;
    this.queryIdsByName[n] = this.queryIdsByName[n] || [], this.queryIdsByName[n].push(t.queryId);
} }, e.prototype.removeObservableQuery = function (e) { var t = this.getQuery(e), r = t.observableQuery, n = t.cancel; if (n && n(), r) {
    var i = getQueryDefinition(r.options.query), o = i.name ? i.name.value : null;
    this.setQuery(e, function () { return { observableQuery: null }; }), o && (this.queryIdsByName[o] = this.queryIdsByName[o].filter(function (e) { return !(r.queryId === e); }));
} }, e.prototype.clearStore = function () { this.fetchQueryPromises.forEach(function (e) { (0, e.reject)(new Error("Store reset while query was in flight(not completed in link chain)")); }); var e = []; return this.queries.forEach(function (t, r) { t.observableQuery && e.push(r); }), this.queryStore.reset(e), this.mutationStore.reset(), this.dataStore.reset(); }, e.prototype.resetStore = function () { var e = this; return this.clearStore().then(function () { return e.reFetchObservableQueries(); }); }, e.prototype.getObservableQueryPromises = function (e) { var t = this, r = []; return this.queries.forEach(function (n, i) { var o = n.observableQuery; if (o) {
    var a = o.options.fetchPolicy;
    o.resetLastResults(), "cache-only" === a || !e && "standby" === a || r.push(o.refetch()), t.setQuery(i, function () { return { newData: null }; }), t.invalidate(!0, i);
} }), r; }, e.prototype.reFetchObservableQueries = function (e) { var t = this.getObservableQueryPromises(e); return this.broadcastQueries(), Promise.all(t); }, e.prototype.startQuery = function (e, t, r) { return this.addQueryListener(e, r), this.fetchQuery(e, t).catch(function () { }), e; }, e.prototype.startGraphQLSubscription = function (e) { var t, r = this, n = e.query, i = this.dataStore.getCache().transformDocument(n), o = assign({}, getDefaultValues(getOperationDefinition(n)), e.variables), a = []; return new Observable$2(function (e) { if (a.push(e), 1 === a.length) {
    var n = { next: function (e) { r.dataStore.markSubscriptionResult(e, i, o), r.broadcastQueries(), a.forEach(function (t) { t.next && t.next(e); }); }, error: function (e) { a.forEach(function (t) { t.error && t.error(e); }); } }, s = r.buildOperationForLink(i, o);
    t = execute(r.link, s).subscribe(n);
} return function () { 0 === (a = a.filter(function (t) { return t !== e; })).length && t && t.unsubscribe(); }; }); }, e.prototype.stopQuery = function (e) { this.stopQueryInStore(e), this.removeQuery(e); }, e.prototype.removeQuery = function (e) { this.getQuery(e).subscriptions.forEach(function (e) { return e.unsubscribe(); }), this.queries.delete(e); }, e.prototype.getCurrentQueryResult = function (e, t) { void 0 === t && (t = !0); var r = e.options, n = r.variables, i = r.query, o = e.getLastResult(), a = this.getQuery(e.queryId).newData; if (a)
    return maybeDeepFreeze({ data: a.result, partial: !1 }); try {
    return maybeDeepFreeze({ data: this.dataStore.getCache().read({ query: i, variables: n, previousResult: o ? o.data : void 0, optimistic: t }), partial: !1 });
}
catch (e) {
    return maybeDeepFreeze({ data: {}, partial: !0 });
} }, e.prototype.getQueryWithPreviousResult = function (e) { var t; if ("string" == typeof e) {
    var r = this.getQuery(e).observableQuery;
    if (!r)
        throw new Error("ObservableQuery with this id doesn't exist: " + e);
    t = r;
}
else
    t = e; var n = t.options, i = n.variables, o = n.query; return { previousResult: this.getCurrentQueryResult(t, !1).data, variables: i, document: o }; }, e.prototype.broadcastQueries = function () { var e = this; this.onBroadcast(), this.queries.forEach(function (t, r) { t.invalidated && t.listeners && t.listeners.filter(function (e) { return !!e; }).forEach(function (n) { n(e.queryStore.get(r), t.newData); }); }); }, e.prototype.fetchRequest = function (e) { var t, r, n = this, i = e.requestId, o = e.queryId, a = e.document, s = e.options, u = e.fetchMoreForQueryId, c = s.variables, l = s.context, d = s.errorPolicy, f = void 0 === d ? "none" : d, p = s.fetchPolicy, h = this.buildOperationForLink(a, c, __assign$6({}, l, { forceFetch: !this.queryDeduplication })); return new Promise(function (e, s) { n.addFetchQueryPromise(i, e, s); var l = execute(n.deduplicator, h).subscribe({ next: function (e) { var l = n.getQuery(o).lastRequestId; if (i >= (l || 1)) {
        if ("no-cache" !== p)
            try {
                n.dataStore.markQueryResult(e, a, c, u, "ignore" === f || "all" === f);
            }
            catch (e) {
                return void s(e);
            }
        else
            n.setQuery(o, function () { return { newData: { result: e.data, complete: !0 } }; });
        n.queryStore.markQueryResult(o, e, u), n.invalidate(!0, o, u), n.broadcastQueries();
    } if (e.errors && "none" === f)
        s(new ApolloError({ graphQLErrors: e.errors }));
    else if ("all" === f && (r = e.errors), u || "no-cache" === p)
        t = e.data;
    else
        try {
            t = n.dataStore.getCache().read({ variables: c, query: a, optimistic: !1 });
        }
        catch (e) { } }, error: function (e) { n.removeFetchQueryPromise(i), n.setQuery(o, function (e) { return { subscriptions: e.subscriptions.filter(function (e) { return e !== l; }) }; }), s(e); }, complete: function () { n.removeFetchQueryPromise(i), n.setQuery(o, function (e) { return { subscriptions: e.subscriptions.filter(function (e) { return e !== l; }) }; }), e({ data: t, errors: r, loading: !1, networkStatus: NetworkStatus.ready, stale: !1 }); } }); n.setQuery(o, function (e) { return { subscriptions: e.subscriptions.concat([l]) }; }); }); }, e.prototype.refetchQueryByName = function (e) { var t = this, r = this.queryIdsByName[e]; if (void 0 !== r)
    return Promise.all(r.map(function (e) { return t.getQuery(e).observableQuery; }).filter(function (e) { return !!e; }).map(function (e) { return e.refetch(); })); }, e.prototype.generateRequestId = function () { var e = this.idCounter; return this.idCounter++, e; }, e.prototype.getQuery = function (e) { return this.queries.get(e) || __assign$6({}, defaultQueryInfo); }, e.prototype.setQuery = function (e, t) { var r = this.getQuery(e), n = __assign$6({}, r, t(r)); this.queries.set(e, n); }, e.prototype.invalidate = function (e, t, r) { t && this.setQuery(t, function () { return { invalidated: e }; }), r && this.setQuery(r, function () { return { invalidated: e }; }); }, e.prototype.buildOperationForLink = function (e, t, r) { var n = this.dataStore.getCache(); return { query: n.transformForLink ? n.transformForLink(e) : e, variables: t, operationName: getOperationName(e) || void 0, context: __assign$6({}, r, { cache: n, getCacheKey: function (e) { if (n.config)
            return n.config.dataIdFromObject(e); throw new Error("To use context.getCacheKey, you need to use a cache that has a configurable dataIdFromObject, like apollo-cache-inmemory."); } }) }; }, e; }(), DataStore = function () { function e(e) { this.cache = e; } return e.prototype.getCache = function () { return this.cache; }, e.prototype.markQueryResult = function (e, t, r, n, i) { void 0 === i && (i = !1); var o = !graphQLResultHasError(e); i && graphQLResultHasError(e) && e.data && (o = !0), !n && o && this.cache.write({ result: e.data, dataId: "ROOT_QUERY", query: t, variables: r }); }, e.prototype.markSubscriptionResult = function (e, t, r) { graphQLResultHasError(e) || this.cache.write({ result: e.data, dataId: "ROOT_SUBSCRIPTION", query: t, variables: r }); }, e.prototype.markMutationInit = function (e) { var t, r = this; e.optimisticResponse && (t = "function" == typeof e.optimisticResponse ? e.optimisticResponse(e.variables) : e.optimisticResponse, this.cache.recordOptimisticTransaction(function (n) { var i = r.cache; r.cache = n; try {
    r.markMutationResult({ mutationId: e.mutationId, result: { data: t }, document: e.document, variables: e.variables, updateQueries: e.updateQueries, update: e.update });
}
finally {
    r.cache = i;
} }, e.mutationId)); }, e.prototype.markMutationResult = function (e) { var t = this; if (!graphQLResultHasError(e.result)) {
    var r = [];
    r.push({ result: e.result.data, dataId: "ROOT_MUTATION", query: e.document, variables: e.variables }), e.updateQueries && Object.keys(e.updateQueries).filter(function (t) { return e.updateQueries[t]; }).forEach(function (n) { var i = e.updateQueries[n], o = i.query, a = i.updater, s = t.cache.diff({ query: o.document, variables: o.variables, returnPartialData: !0, optimistic: !1 }), u = s.result; if (s.complete) {
        var c = tryFunctionOrLogError(function () { return a(u, { mutationResult: e.result, queryName: getOperationName(o.document) || void 0, queryVariables: o.variables }); });
        c && r.push({ result: c, dataId: "ROOT_QUERY", query: o.document, variables: o.variables });
    } }), this.cache.performTransaction(function (e) { r.forEach(function (t) { return e.write(t); }); });
    var n = e.update;
    n && this.cache.performTransaction(function (t) { tryFunctionOrLogError(function () { return n(t, e.result); }); });
} }, e.prototype.markMutationComplete = function (e) { var t = e.mutationId; e.optimisticResponse && this.cache.removeOptimistic(t); }, e.prototype.markUpdateQueryResult = function (e, t, r) { this.cache.write({ result: r, dataId: "ROOT_QUERY", variables: t, query: e }); }, e.prototype.reset = function () { return this.cache.reset(); }, e; }(), version_1 = "2.3.5", __assign$7 = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; }, hasSuggestedDevtools = !1, supportedDirectives = new ApolloLink(function (e, t) { return e.query = removeConnectionDirectiveFromDocument(e.query), t(e); }), ApolloClient = function () { function e(e) { var t = this; this.defaultOptions = {}, this.resetStoreCallbacks = []; var r = e.link, n = e.cache, i = e.ssrMode, o = void 0 !== i && i, a = e.ssrForceFetchDelay, s = void 0 === a ? 0 : a, u = e.connectToDevTools, c = e.queryDeduplication, l = void 0 === c || c, d = e.defaultOptions; if (!r || !n)
    throw new Error("\n        In order to initialize Apollo Client, you must specify link & cache properties on the config object.\n        This is part of the required upgrade when migrating from Apollo Client 1.0 to Apollo Client 2.0.\n        For more information, please visit:\n          https://www.apollographql.com/docs/react/basics/setup.html\n        to help you get started.\n      "); this.link = supportedDirectives.concat(r), this.cache = n, this.store = new DataStore(n), this.disableNetworkFetches = o || s > 0, this.queryDeduplication = l, this.ssrMode = o, this.defaultOptions = d || {}, s && setTimeout(function () { return t.disableNetworkFetches = !1; }, s), this.watchQuery = this.watchQuery.bind(this), this.query = this.query.bind(this), this.mutate = this.mutate.bind(this), this.resetStore = this.resetStore.bind(this), this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this); var f = !isProduction() && "undefined" != typeof window && !window.__APOLLO_CLIENT__; (void 0 === u ? f : u && "undefined" != typeof window) && (window.__APOLLO_CLIENT__ = this), hasSuggestedDevtools || isProduction() || (hasSuggestedDevtools = !0, "undefined" != typeof window && window.document && window.top === window.self && void 0 === window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ && window.navigator && window.navigator.userAgent.indexOf("Chrome")), this.version = version_1; } return e.prototype.watchQuery = function (e) { return this.initQueryManager(), this.defaultOptions.watchQuery && (e = __assign$7({}, this.defaultOptions.watchQuery, e)), !this.disableNetworkFetches || "network-only" !== e.fetchPolicy && "cache-and-network" !== e.fetchPolicy || (e = __assign$7({}, e, { fetchPolicy: "cache-first" })), this.queryManager.watchQuery(e); }, e.prototype.query = function (e) { if (this.initQueryManager(), this.defaultOptions.query && (e = __assign$7({}, this.defaultOptions.query, e)), "cache-and-network" === e.fetchPolicy)
    throw new Error("cache-and-network fetchPolicy can only be used with watchQuery"); return this.disableNetworkFetches && "network-only" === e.fetchPolicy && (e = __assign$7({}, e, { fetchPolicy: "cache-first" })), this.queryManager.query(e); }, e.prototype.mutate = function (e) { return this.initQueryManager(), this.defaultOptions.mutate && (e = __assign$7({}, this.defaultOptions.mutate, e)), this.queryManager.mutate(e); }, e.prototype.subscribe = function (e) { return this.initQueryManager(), this.queryManager.startGraphQLSubscription(e); }, e.prototype.readQuery = function (e) { return this.initProxy().readQuery(e); }, e.prototype.readFragment = function (e) { return this.initProxy().readFragment(e); }, e.prototype.writeQuery = function (e) { var t = this.initProxy().writeQuery(e); return this.queryManager.broadcastQueries(), t; }, e.prototype.writeFragment = function (e) { var t = this.initProxy().writeFragment(e); return this.queryManager.broadcastQueries(), t; }, e.prototype.writeData = function (e) { var t = this.initProxy().writeData(e); return this.queryManager.broadcastQueries(), t; }, e.prototype.__actionHookForDevTools = function (e) { this.devToolsHookCb = e; }, e.prototype.__requestRaw = function (e) { return execute(this.link, e); }, e.prototype.initQueryManager = function () { var e = this; this.queryManager || (this.queryManager = new QueryManager({ link: this.link, store: this.store, queryDeduplication: this.queryDeduplication, ssrMode: this.ssrMode, onBroadcast: function () { e.devToolsHookCb && e.devToolsHookCb({ action: {}, state: { queries: e.queryManager.queryStore.getStore(), mutations: e.queryManager.mutationStore.getStore() }, dataWithOptimisticResults: e.cache.extract(!0) }); } })); }, e.prototype.resetStore = function () { var e = this; return Promise.resolve().then(function () { return e.queryManager ? e.queryManager.clearStore() : Promise.resolve(null); }).then(function () { return Promise.all(e.resetStoreCallbacks.map(function (e) { return e(); })); }).then(function () { return e.queryManager && e.queryManager.reFetchObservableQueries ? e.queryManager.reFetchObservableQueries() : Promise.resolve(null); }); }, e.prototype.onResetStore = function (e) { var t = this; return this.resetStoreCallbacks.push(e), function () { t.resetStoreCallbacks = t.resetStoreCallbacks.filter(function (t) { return t !== e; }); }; }, e.prototype.reFetchObservableQueries = function (e) { return this.queryManager ? this.queryManager.reFetchObservableQueries(e) : Promise.resolve(null); }, e.prototype.extract = function (e) { return this.initProxy().extract(e); }, e.prototype.restore = function (e) { return this.initProxy().restore(e); }, e.prototype.initProxy = function () { return this.proxy || (this.initQueryManager(), this.proxy = this.cache), this.proxy; }, e; }(), __assign$8 = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; }, defaultHttpOptions = { includeQuery: !0, includeExtensions: !1 }, defaultHeaders = { accept: "*/*", "content-type": "application/json" }, defaultOptions = { method: "POST" }, fallbackHttpConfig = { http: defaultHttpOptions, headers: defaultHeaders, options: defaultOptions }, throwServerError = function (e, t, r) { var n = new Error(r); throw n.response = e, n.statusCode = e.status, n.result = t, n; }, parseAndCheckHttpResponse = function (e) { return function (t) { return t.text().then(function (e) { try {
    return JSON.parse(e);
}
catch (n) {
    var r = n;
    return r.response = t, r.statusCode = t.status, r.bodyText = e, Promise.reject(r);
} }).then(function (r) { return t.status >= 300 && throwServerError(t, r, "Response not successful: Received status code " + t.status), Array.isArray(r) || r.hasOwnProperty("data") || r.hasOwnProperty("errors") || throwServerError(t, r, "Server response was missing for query '" + (Array.isArray(e) ? e.map(function (e) { return e.operationName; }) : e.operationName) + "'."), r; }); }; }, checkFetcher = function (e) { if (!e && "undefined" == typeof fetch) {
    var t = "unfetch";
    throw "undefined" == typeof window && (t = "node-fetch"), new Error("\nfetch is not found globally and no fetcher passed, to fix pass a fetch for\nyour environment like https://www.npmjs.com/package/" + t + ".\n\nFor example:\nimport fetch from '" + t + "';\nimport { createHttpLink } from 'apollo-link-http';\n\nconst link = createHttpLink({ uri: '/graphql', fetch: fetch });");
} }, createSignalIfSupported = function () { if ("undefined" == typeof AbortController)
    return { controller: !1, signal: !1 }; var e = new AbortController; return { controller: e, signal: e.signal }; }, selectHttpOptionsAndBody = function (e, t) { for (var r = [], n = 2; n < arguments.length; n++)
    r[n - 2] = arguments[n]; var i = __assign$8({}, t.options, { headers: t.headers, credentials: t.credentials }), o = t.http; r.forEach(function (e) { i = __assign$8({}, i, e.options, { headers: __assign$8({}, i.headers, e.headers) }), e.credentials && (i.credentials = e.credentials), o = __assign$8({}, o, e.http); }); var a = e.operationName, s = e.extensions, u = e.variables, c = e.query, l = { operationName: a, variables: u }; return o.includeExtensions && (l.extensions = s), o.includeQuery && (l.query = printer_1(c)), { options: i, body: l }; }, serializeFetchParameter = function (e, t) { var r; try {
    r = JSON.stringify(e);
}
catch (e) {
    var n = new Error("Network request failed. " + t + " is not serializable: " + e.message);
    throw n.parseError = e, n;
} return r; }, selectURI = function (e, t) { return e.getContext().uri || ("function" == typeof t ? t(e) : t || "/graphql"); }, __extends$5 = function () { var e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var r in t)
    t.hasOwnProperty(r) && (e[r] = t[r]); }; return function (t, r) { function n() { this.constructor = t; } e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n); }; }(), __rest = function (e, t) { var r = {}; for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]); if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
    var i = 0;
    for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
        t.indexOf(n[i]) < 0 && (r[n[i]] = e[n[i]]);
} return r; }, createHttpLink = function (e) { void 0 === e && (e = {}); var t = e.uri, r = void 0 === t ? "/graphql" : t, n = e.fetch, i = e.includeExtensions, o = e.useGETForQueries, a = __rest(e, ["uri", "fetch", "includeExtensions", "useGETForQueries"]); checkFetcher(n), n || (n = fetch); var s = { http: { includeExtensions: i }, options: a.fetchOptions, credentials: a.credentials, headers: a.headers }; return new ApolloLink(function (e) { var t, i = selectURI(e, r), a = e.getContext(), u = { http: a.http, options: a.fetchOptions, credentials: a.credentials, headers: a.headers }, c = selectHttpOptionsAndBody(e, fallbackHttpConfig, s, u), l = c.options, d = c.body; if (!l.signal) {
    var f = createSignalIfSupported(), p = f.controller, h = f.signal;
    (t = p) && (l.signal = h);
} if (o && !e.query.definitions.some(function (e) { return "OperationDefinition" === e.kind && "mutation" === e.operation; }) && (l.method = "GET"), "GET" === l.method) {
    var v = rewriteURIForGET(i, d), y = v.newURI, m = v.parseError;
    if (m)
        return fromError(m);
    i = y;
}
else
    try {
        l.body = serializeFetchParameter(d, "Payload");
    }
    catch (m) {
        return fromError(m);
    } return new Observable$1(function (r) { return n(i, l).then(function (t) { return e.setContext({ response: t }), t; }).then(parseAndCheckHttpResponse(e)).then(function (e) { return r.next(e), r.complete(), e; }).catch(function (e) { "AbortError" !== e.name && (e.result && e.result.errors && e.result.data && r.next(e.result), r.error(e)); }), function () { t && t.abort(); }; }); }); };
function rewriteURIForGET(e, t) { var r = [], n = function (e, t) { r.push(e + "=" + encodeURIComponent(t)); }; if ("query" in t && n("query", t.query), t.operationName && n("operationName", t.operationName), t.variables) {
    var i = void 0;
    try {
        i = serializeFetchParameter(t.variables, "Variables map");
    }
    catch (e) {
        return { parseError: e };
    }
    n("variables", i);
} if (t.extensions) {
    var o = void 0;
    try {
        o = serializeFetchParameter(t.extensions, "Extensions map");
    }
    catch (e) {
        return { parseError: e };
    }
    n("extensions", o);
} var a = "", s = e, u = e.indexOf("#"); return -1 !== u && (a = e.substr(u), s = e.substr(0, u)), { newURI: s + (-1 === s.indexOf("?") ? "?" : "&") + r.join("&") + a }; }
var HttpLink = function (e) { function t(t) { return e.call(this, createHttpLink(t).request) || this; } return __extends$5(t, e), t; }(ApolloLink);
function queryFromPojo(e) { return { kind: "Document", definitions: [{ kind: "OperationDefinition", operation: "query", name: { kind: "Name", value: "GeneratedClientQuery" }, selectionSet: selectionSetFromObj(e) }] }; }
function fragmentFromPojo(e, t) { return { kind: "Document", definitions: [{ kind: "FragmentDefinition", typeCondition: { kind: "NamedType", name: { kind: "Name", value: t || "__FakeType" } }, name: { kind: "Name", value: "GeneratedClientQuery" }, selectionSet: selectionSetFromObj(e) }] }; }
function selectionSetFromObj(e) { if ("number" == typeof e || "boolean" == typeof e || "string" == typeof e || void 0 === e || null === e)
    return null; if (Array.isArray(e))
    return selectionSetFromObj(e[0]); var t = []; return Object.keys(e).forEach(function (r) { var n = { kind: "Field", name: { kind: "Name", value: r } }, i = selectionSetFromObj(e[r]); i && (n.selectionSet = i), t.push(n); }), { kind: "SelectionSet", selections: t }; }
var justTypenameQuery = { kind: "Document", definitions: [{ kind: "OperationDefinition", operation: "query", name: null, variableDefinitions: null, directives: [], selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", alias: null, name: { kind: "Name", value: "__typename" }, arguments: [], directives: [], selectionSet: null }] } }] }, ApolloCache = function () { function e() { } return e.prototype.transformDocument = function (e) { return e; }, e.prototype.transformForLink = function (e) { return e; }, e.prototype.readQuery = function (e, t) { return void 0 === t && (t = !1), this.read({ query: e.query, variables: e.variables, optimistic: t }); }, e.prototype.readFragment = function (e, t) { return void 0 === t && (t = !1), this.read({ query: getFragmentQueryDocument(e.fragment, e.fragmentName), variables: e.variables, rootId: e.id, optimistic: t }); }, e.prototype.writeQuery = function (e) { this.write({ dataId: "ROOT_QUERY", result: e.data, query: e.query, variables: e.variables }); }, e.prototype.writeFragment = function (e) { this.write({ dataId: e.id, result: e.data, variables: e.variables, query: getFragmentQueryDocument(e.fragment, e.fragmentName) }); }, e.prototype.writeData = function (e) { var t = e.id, r = e.data; if (void 0 !== t) {
    var n = null;
    try {
        n = this.read({ rootId: t, optimistic: !1, query: justTypenameQuery });
    }
    catch (e) { }
    var i = n && n.__typename || "__ClientData", o = Object.assign({ __typename: i }, r);
    this.writeFragment({ id: t, fragment: fragmentFromPojo(o, i), data: o });
}
else
    this.writeQuery({ query: queryFromPojo(r), data: r }); }, e; }(), haveWarned$1 = !1, HeuristicFragmentMatcher = function () { function e() { } return e.prototype.ensureReady = function () { return Promise.resolve(); }, e.prototype.canBypassInit = function () { return !0; }, e.prototype.match = function (e, t, r) { var n = r.store.get(e.id); return !n && "ROOT_QUERY" === e.id || !!n && (n.__typename ? n.__typename === t || (warnOnceInDevelopment("You are using the simple (heuristic) fragment matcher, but your queries contain union or interface types.\n     Apollo Client will not be able to able to accurately map fragments.To make this error go away, use the IntrospectionFragmentMatcher as described in the docs: https://www.apollographql.com/docs/react/recipes/fragment-matching.html", "error"), r.returnPartialData = !0, !0) : (haveWarned$1 || (console.warn("You're using fragments in your queries, but either don't have the addTypename:\n  true option set in Apollo Client, or you are trying to write a fragment to the store without the __typename.\n   Please turn on the addTypename option and include __typename when writing fragments so that Apollo Client\n   can accurately match fragments."), console.warn("Could not find __typename on Fragment ", t, n), console.warn("DEPRECATION WARNING: using fragments without __typename is unsupported behavior and will be removed in future versions of Apollo client. You should fix this and set addTypename to true now."), isTest() || (haveWarned$1 = !0)), r.returnPartialData = !0, !0)); }, e; }(), ObjectCache = function () { function e(e) { void 0 === e && (e = Object.create(null)), this.data = e; } return e.prototype.toObject = function () { return this.data; }, e.prototype.get = function (e) { return this.data[e]; }, e.prototype.set = function (e, t) { this.data[e] = t; }, e.prototype.delete = function (e) { this.data[e] = void 0; }, e.prototype.clear = function () { this.data = Object.create(null); }, e.prototype.replace = function (e) { this.data = e || Object.create(null); }, e; }();
function defaultNormalizedCacheFactory(e) { return new ObjectCache(e); }
var __extends$6 = function () { var e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var r in t)
    t.hasOwnProperty(r) && (e[r] = t[r]); }; return function (t, r) { function n() { this.constructor = t; } e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n); }; }(), __assign$9 = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; }, WriteError = function (e) { function t() { var t = null !== e && e.apply(this, arguments) || this; return t.type = "WriteError", t; } return __extends$6(t, e), t; }(Error);
function enhanceErrorWithDocument(e, t) { var r = new WriteError("Error writing result to store for query:\n " + printer_1(t)); return r.message += "\n" + e.message, r.stack = e.stack, r; }
function writeResultToStore(e) { var t = e.dataId, r = e.result, n = e.document, i = e.storeFactory, o = void 0 === i ? defaultNormalizedCacheFactory : i, a = e.store, s = void 0 === a ? o() : a, u = e.variables, c = e.dataIdFromObject, l = e.fragmentMatcherFunction, d = getOperationDefinition(n), f = d.selectionSet, p = createFragmentMap(getFragmentDefinitions(n)); u = assign({}, getDefaultValues(d), u); try {
    return writeSelectionSetToStore({ result: r, dataId: t, selectionSet: f, context: { store: s, storeFactory: o, processedData: {}, variables: u, dataIdFromObject: c, fragmentMap: p, fragmentMatcherFunction: l } });
}
catch (e) {
    throw enhanceErrorWithDocument(e, n);
} }
function writeSelectionSetToStore(e) { var t = e.result, r = e.dataId, n = e.selectionSet, i = e.context, o = i.variables, a = i.store, s = i.fragmentMap; return n.selections.forEach(function (e) { var n = shouldInclude(e, o); if (isField(e)) {
    var a = resultKeyNameFromField(e), u = t[a];
    n && (void 0 !== u ? writeFieldToStore({ dataId: r, value: u, field: e, context: i }) : !(e.directives && e.directives.length && e.directives.some(function (e) { return e.name && "defer" === e.name.value; })) && i.fragmentMatcherFunction && (isProduction() || console.warn("Missing field " + a + " in " + JSON.stringify(t, null, 2).substring(0, 100))));
}
else {
    var c = void 0;
    if (isInlineFragment(e))
        c = e;
    else if (!(c = (s || {})[e.name.value]))
        throw new Error("No fragment named " + e.name.value + ".");
    var l = !0;
    if (i.fragmentMatcherFunction && c.typeCondition) {
        var d = toIdValue({ id: "self", typename: void 0 }), f = { store: new ObjectCache({ self: t }), returnPartialData: !1, hasMissingField: !1, cacheRedirects: {} };
        l = i.fragmentMatcherFunction(d, c.typeCondition.name.value, f), !isProduction() && f.returnPartialData && console.error("WARNING: heuristic fragment matching going on!");
    }
    n && l && writeSelectionSetToStore({ result: t, selectionSet: c.selectionSet, dataId: r, context: i });
} }), a; }
function isGeneratedId(e) { return "$" === e[0]; }
function mergeWithGenerated(e, t, r) { var n = r.get(e), i = r.get(t); Object.keys(n).forEach(function (o) { var a = n[o], s = i[o]; isIdValue(a) && isGeneratedId(a.id) && isIdValue(s) && mergeWithGenerated(a.id, s.id, r), r.delete(e), r.set(t, __assign$9({}, n, i)); }); }
function isDataProcessed(e, t, r) { if (!r)
    return !1; if (r[e]) {
    if (r[e].indexOf(t) >= 0)
        return !0;
    r[e].push(t);
}
else
    r[e] = [t]; return !1; }
function writeFieldToStore(e) { var t, r, n = e.field, i = e.value, o = e.dataId, a = e.context, s = a.variables, u = a.dataIdFromObject, c = a.store, l = storeKeyNameFromField(n, s), d = !1, f = ""; if (n.selectionSet && null !== i)
    if (Array.isArray(i))
        t = processArrayValue(i, o + "." + l, n.selectionSet, a);
    else {
        var p = o + "." + l, h = !0;
        if (isGeneratedId(p) || (p = "$" + p), u) {
            var v = u(i);
            if (v && isGeneratedId(v))
                throw new Error('IDs returned by dataIdFromObject cannot begin with the "$" character.');
            v && (p = v, h = !1);
        }
        isDataProcessed(p, n, a.processedData) || writeSelectionSetToStore({ dataId: p, result: i, selectionSet: n.selectionSet, context: a });
        var y = i.__typename;
        t = toIdValue({ id: p, typename: y }, h);
        var m = (r = c.get(o)) && r[l];
        if (m !== t && isIdValue(m)) {
            var g = void 0 !== m.typename, b = void 0 !== y, E = g && b && m.typename !== y;
            if (h && !m.generated && !E)
                throw new Error("Store error: the application attempted to write an object with no provided id but the store already contains an id of " + m.id + " for this object. The selectionSet that was trying to be written is:\n" + printer_1(n));
            if (g && !b)
                throw new Error("Store error: the application attempted to write an object with no provided typename but the store already contains an object with typename of " + m.typename + " for the object of id " + m.id + ". The selectionSet that was trying to be written is:\n" + printer_1(n));
            m.generated && (f = m.id, E ? h || c.delete(f) : d = !0);
        }
    }
else
    t = null != i && "object" == typeof i ? { type: "json", json: i } : i; var I, _ = __assign$9({}, c.get(o), ((I = {})[l] = t, I)); d && mergeWithGenerated(f, t.id, c), (r = c.get(o)) && t === r[l] || c.set(o, _); }
function processArrayValue(e, t, r, n) { return e.map(function (e, i) { if (null === e)
    return null; var o = t + "." + i; if (Array.isArray(e))
    return processArrayValue(e, o, r, n); var a = !0; if (n.dataIdFromObject) {
    var s = n.dataIdFromObject(e);
    s && (o = s, a = !1);
} return isDataProcessed(o, r, n.processedData) || writeSelectionSetToStore({ dataId: o, result: e, selectionSet: r, context: n }), toIdValue({ id: o, typename: e.__typename }, a); }); }
function graphql(e, t, r, n, i, o) { void 0 === o && (o = {}); var a = getMainDefinition(t), s = { fragmentMap: createFragmentMap(getFragmentDefinitions(t)), contextValue: n, variableValues: i, resultMapper: o.resultMapper, resolver: e, fragmentMatcher: o.fragmentMatcher || function () { return !0; } }; return executeSelectionSet(a.selectionSet, r, s); }
function executeSelectionSet(e, t, r) { var n = r.fragmentMap, i = r.contextValue, o = r.variableValues, a = {}; return e.selections.forEach(function (e) { if (shouldInclude(e, o))
    if (isField(e)) {
        var s = executeField(e, t, r), u = resultKeyNameFromField(e);
        void 0 !== s && (void 0 === a[u] ? a[u] = s : merge(a[u], s));
    }
    else {
        var c = void 0;
        if (isInlineFragment(e))
            c = e;
        else if (!(c = n[e.name.value]))
            throw new Error("No fragment named " + e.name.value);
        var l = c.typeCondition.name.value;
        if (r.fragmentMatcher(t, l, i)) {
            var d = executeSelectionSet(c.selectionSet, t, r);
            merge(a, d);
        }
    } }), r.resultMapper ? r.resultMapper(a, t) : a; }
function executeField(e, t, r) { var n = r.variableValues, i = r.contextValue, o = (0, r.resolver)(e.name.value, t, argumentsObjectFromField(e, n), i, { isLeaf: !e.selectionSet, resultKey: resultKeyNameFromField(e), directives: getDirectiveInfoFromField(e, n) }); return e.selectionSet ? null == o ? o : Array.isArray(o) ? executeSubSelectedArray(e, o, r) : executeSelectionSet(e.selectionSet, o, r) : o; }
function executeSubSelectedArray(e, t, r) { return t.map(function (t) { return null === t ? null : Array.isArray(t) ? executeSubSelectedArray(e, t, r) : executeSelectionSet(e.selectionSet, t, r); }); }
var hasOwn = Object.prototype.hasOwnProperty;
function merge(e, t) { null !== t && "object" == typeof t && Object.keys(t).forEach(function (r) { var n = t[r]; hasOwn.call(e, r) ? merge(e[r], n) : e[r] = n; }); }
var __assign$a = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; }, ID_KEY = "undefined" != typeof Symbol ? Symbol("id") : "@@id";
function readQueryFromStore(e) { return diffQueryAgainstStore(__assign$a({}, e, { returnPartialData: !1 })).result; }
var readStoreResolver = function (e, t, r, n, i) { var o = i.resultKey, a = i.directives; assertIdValue(t); var s = t.id, u = n.store.get(s), c = e; (r || a) && (c = getStoreKeyName(c, r, a)); var l = void 0; if (u && void 0 === (l = u[c]) && n.cacheRedirects && (u.__typename || "ROOT_QUERY" === s)) {
    var d = u.__typename || "Query", f = n.cacheRedirects[d];
    if (f) {
        var p = f[e];
        p && (l = p(u, r, { getCacheKey: function (e) { return toIdValue({ id: n.dataIdFromObject(e), typename: e.__typename }); } }));
    }
} if (void 0 === l) {
    if (!n.returnPartialData)
        throw new Error("Can't find field " + c + " on object (" + s + ") " + JSON.stringify(u, null, 2) + ".");
    return n.hasMissingField = !0, l;
} return isJsonValue(l) ? t.previousResult && isEqual(t.previousResult[o], l.json) ? t.previousResult[o] : l.json : (t.previousResult && (l = addPreviousResultToIdValues(l, t.previousResult[o])), l); };
function diffQueryAgainstStore(e) { var t = e.store, r = e.query, n = e.variables, i = e.previousResult, o = e.returnPartialData, a = void 0 === o || o, s = e.rootId, u = void 0 === s ? "ROOT_QUERY" : s, c = e.fragmentMatcherFunction, l = e.config; n = assign({}, getDefaultValues(getQueryDefinition(r)), n); var d = { store: t, returnPartialData: a, dataIdFromObject: l && l.dataIdFromObject || null, cacheRedirects: l && l.cacheRedirects || {}, hasMissingField: !1 }; return { result: graphql(readStoreResolver, r, { type: "id", id: u, previousResult: i }, d, n, { fragmentMatcher: c, resultMapper: resultMapper }), complete: !d.hasMissingField }; }
function assertIdValue(e) { if (!isIdValue(e))
    throw new Error("Encountered a sub-selection on the query, but the store doesn't have an object reference. This should never happen during normal use unless you have custom code that is directly manipulating the store; please file an issue."); }
function addPreviousResultToIdValues(e, t) { if (isIdValue(e))
    return __assign$a({}, e, { previousResult: t }); if (Array.isArray(e)) {
    var r = new Map;
    return Array.isArray(t) && t.forEach(function (e) { e && e[ID_KEY] && r.set(e[ID_KEY], e); }), e.map(function (e, n) { var i = t && t[n]; return isIdValue(e) && (i = r.get(e.id) || i), addPreviousResultToIdValues(e, i); });
} return e; }
function resultMapper(e, t) { if (t.previousResult) {
    var r = Object.keys(e);
    if (Object.keys(t.previousResult).every(function (e) { return r.indexOf(e) > -1; }) && r.every(function (r) { return areNestedArrayItemsStrictlyEqual(e[r], t.previousResult[r]); }))
        return t.previousResult;
} return Object.defineProperty(e, ID_KEY, { enumerable: !1, configurable: !0, writable: !1, value: t.id }), e; }
function areNestedArrayItemsStrictlyEqual(e, t) { return e === t || !(!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length) && e.every(function (e, r) { return areNestedArrayItemsStrictlyEqual(e, t[r]); }); }
var __assign$b = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; }, RecordingCache = function () { function e(e) { void 0 === e && (e = {}), this.data = e, this.recordedData = {}; } return e.prototype.record = function (e) { e(this); var t = this.recordedData; return this.recordedData = {}, t; }, e.prototype.toObject = function () { return __assign$b({}, this.data, this.recordedData); }, e.prototype.get = function (e) { return this.recordedData.hasOwnProperty(e) ? this.recordedData[e] : this.data[e]; }, e.prototype.set = function (e, t) { this.get(e) !== t && (this.recordedData[e] = t); }, e.prototype.delete = function (e) { this.recordedData[e] = void 0; }, e.prototype.clear = function () { var e = this; Object.keys(this.data).forEach(function (t) { return e.delete(t); }), this.recordedData = {}; }, e.prototype.replace = function (e) { this.clear(), this.recordedData = __assign$b({}, e); }, e; }();
function record(e, t) { return new RecordingCache(e).record(t); }
var __extends$7 = function () { var e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var r in t)
    t.hasOwnProperty(r) && (e[r] = t[r]); }; return function (t, r) { function n() { this.constructor = t; } e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n); }; }(), __assign$c = Object.assign || function (e) { for (var t, r = 1, n = arguments.length; r < n; r++)
    for (var i in t = arguments[r])
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]); return e; }, defaultConfig = { fragmentMatcher: new HeuristicFragmentMatcher, dataIdFromObject: defaultDataIdFromObject, addTypename: !0, storeFactory: defaultNormalizedCacheFactory };
function defaultDataIdFromObject(e) { if (e.__typename) {
    if (void 0 !== e.id)
        return e.__typename + ":" + e.id;
    if (void 0 !== e._id)
        return e.__typename + ":" + e._id;
} return null; }
var InMemoryCache = function (e) { function t(t) { void 0 === t && (t = {}); var r = e.call(this) || this; return r.optimistic = [], r.watches = [], r.typenameDocumentCache = new WeakMap, r.silenceBroadcast = !1, r.config = __assign$c({}, defaultConfig, t), r.config.customResolvers && (console.warn("customResolvers have been renamed to cacheRedirects. Please update your config as we will be deprecating customResolvers in the next major version."), r.config.cacheRedirects = r.config.customResolvers), r.config.cacheResolvers && (console.warn("cacheResolvers have been renamed to cacheRedirects. Please update your config as we will be deprecating cacheResolvers in the next major version."), r.config.cacheRedirects = r.config.cacheResolvers), r.addTypename = r.config.addTypename, r.data = r.config.storeFactory(), r; } return __extends$7(t, e), t.prototype.restore = function (e) { return e && this.data.replace(e), this; }, t.prototype.extract = function (e) { if (void 0 === e && (e = !1), e && this.optimistic.length > 0) {
    var t = this.optimistic.map(function (e) { return e.data; });
    return Object.assign.apply(Object, [{}, this.data.toObject()].concat(t));
} return this.data.toObject(); }, t.prototype.read = function (e) { return e.rootId && void 0 === this.data.get(e.rootId) ? null : readQueryFromStore({ store: this.config.storeFactory(this.extract(e.optimistic)), query: this.transformDocument(e.query), variables: e.variables, rootId: e.rootId, fragmentMatcherFunction: this.config.fragmentMatcher.match, previousResult: e.previousResult, config: this.config }); }, t.prototype.write = function (e) { writeResultToStore({ dataId: e.dataId, result: e.result, variables: e.variables, document: this.transformDocument(e.query), store: this.data, dataIdFromObject: this.config.dataIdFromObject, fragmentMatcherFunction: this.config.fragmentMatcher.match }), this.broadcastWatches(); }, t.prototype.diff = function (e) { return diffQueryAgainstStore({ store: this.config.storeFactory(this.extract(e.optimistic)), query: this.transformDocument(e.query), variables: e.variables, returnPartialData: e.returnPartialData, previousResult: e.previousResult, fragmentMatcherFunction: this.config.fragmentMatcher.match, config: this.config }); }, t.prototype.watch = function (e) { var t = this; return this.watches.push(e), function () { t.watches = t.watches.filter(function (t) { return t !== e; }); }; }, t.prototype.evict = function (e) { throw new Error("eviction is not implemented on InMemory Cache"); }, t.prototype.reset = function () { return this.data.clear(), this.broadcastWatches(), Promise.resolve(); }, t.prototype.removeOptimistic = function (e) { var t = this, r = this.optimistic.filter(function (t) { return t.id !== e; }); this.optimistic = [], r.forEach(function (e) { t.recordOptimisticTransaction(e.transaction, e.id); }), this.broadcastWatches(); }, t.prototype.performTransaction = function (e) { var t = this.silenceBroadcast; this.silenceBroadcast = !0, e(this), t || (this.silenceBroadcast = !1), this.broadcastWatches(); }, t.prototype.recordOptimisticTransaction = function (e, t) { var r = this; this.silenceBroadcast = !0; var n = record(this.extract(!0), function (t) { var n = r.data; r.data = t, r.performTransaction(e), r.data = n; }); this.optimistic.push({ id: t, transaction: e, data: n }), this.silenceBroadcast = !1, this.broadcastWatches(); }, t.prototype.transformDocument = function (e) { if (this.addTypename) {
    var t = this.typenameDocumentCache.get(e);
    return t || this.typenameDocumentCache.set(e, t = addTypenameToDocument(e)), t;
} return e; }, t.prototype.readQuery = function (e, t) { return void 0 === t && (t = !1), this.read({ query: e.query, variables: e.variables, optimistic: t }); }, t.prototype.readFragment = function (e, t) { return void 0 === t && (t = !1), this.read({ query: this.transformDocument(getFragmentQueryDocument(e.fragment, e.fragmentName)), variables: e.variables, rootId: e.id, optimistic: t }); }, t.prototype.writeQuery = function (e) { this.write({ dataId: "ROOT_QUERY", result: e.data, query: this.transformDocument(e.query), variables: e.variables }); }, t.prototype.writeFragment = function (e) { this.write({ dataId: e.id, result: e.data, query: this.transformDocument(getFragmentQueryDocument(e.fragment, e.fragmentName)), variables: e.variables }); }, t.prototype.broadcastWatches = function () { var e = this; this.silenceBroadcast || this.watches.forEach(function (t) { var r = e.diff({ query: t.query, variables: t.variables, previousResult: t.previousResult && t.previousResult(), optimistic: t.optimistic }); t.callback(r); }); }, t; }(ApolloCache), invariant_1 = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function (e, t) { if (!e)
    throw new Error(t); }; });
unwrapExports(invariant_1);
var source = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }), t.Source = void 0; var r, n = (r = invariant_1) && r.__esModule ? r : { default: r }; t.Source = function e(t, r, i) { !function (t, r) { if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function"); }(this), this.body = t, this.name = r || "GraphQL request", this.locationOffset = i || { line: 1, column: 1 }, this.locationOffset.line > 0 || (0, n.default)(0, "line in locationOffset is 1-indexed and must be positive"), this.locationOffset.column > 0 || (0, n.default)(0, "column in locationOffset is 1-indexed and must be positive"); }; });
unwrapExports(source);
var source_1 = source.Source, location = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }), t.getLocation = function (e, t) { for (var r = /\r\n|[\n\r]/g, n = 1, i = t + 1, o = void 0; (o = r.exec(e.body)) && o.index < t;)
    n += 1, i = t + 1 - (o.index + o[0].length); return { line: n, column: i }; }; });
unwrapExports(location);
var location_1 = location.getLocation, printError_1 = createCommonjsModule(function (e, t) { function r(e, t) { var r = t.line, o = e.locationOffset.line - 1, a = function (e, t) { return 1 === t.line ? e.locationOffset.column - 1 : 0; }(e, t), s = r + o, u = t.column + a, c = (s - 1).toString(), l = s.toString(), d = (s + 1).toString(), f = d.length, p = e.body.split(/\r\n|[\n\r]/g); return p[0] = n(e.locationOffset.column - 1) + p[0], [e.name + " (" + s + ":" + u + ")", r >= 2 && i(f, c) + ": " + p[r - 2], i(f, l) + ": " + p[r - 1], n(2 + f + u - 1) + "^", r < p.length && i(f, d) + ": " + p[r]].filter(Boolean).join("\n"); } function n(e) { return Array(e + 1).join(" "); } function i(e, t) { return n(e - t.length) + t; } Object.defineProperty(t, "__esModule", { value: !0 }), t.printError = function (e) { var t = []; if (e.nodes)
    e.nodes.forEach(function (e) { e.loc && t.push(r(e.loc.source, (0, location.getLocation)(e.loc.source, e.loc.start))); });
else if (e.source && e.locations) {
    var n = e.source;
    e.locations.forEach(function (e) { t.push(r(n, e)); });
} return 0 === t.length ? e.message : [e.message].concat(t).join("\n\n") + "\n"; }; });
unwrapExports(printError_1);
var printError_2 = printError_1.printError, GraphQLError_1 = createCommonjsModule(function (e, t) { function r(e, t, n, i, o, a, s) { var u = Array.isArray(t) ? 0 !== t.length ? t : void 0 : t ? [t] : void 0, c = n; if (!c && u) {
    var l = u[0];
    c = l && l.loc && l.loc.source;
} var d = i; !d && u && (d = u.reduce(function (e, t) { return t.loc && e.push(t.loc.start), e; }, [])), d && 0 === d.length && (d = void 0); var f = void 0; if (i && n) {
    var p = n;
    f = i.map(function (e) { return (0, location.getLocation)(p, e); });
}
else
    u && (f = u.reduce(function (e, t) { return t.loc && e.push((0, location.getLocation)(t.loc.source, t.loc.start)), e; }, [])); Object.defineProperties(this, { message: { value: e, enumerable: !0, writable: !0 }, locations: { value: f || void 0, enumerable: !0 }, path: { value: o || void 0, enumerable: !0 }, nodes: { value: u || void 0 }, source: { value: c || void 0 }, positions: { value: d || void 0 }, originalError: { value: a }, extensions: { value: s || a && a.extensions } }), a && a.stack ? Object.defineProperty(this, "stack", { value: a.stack, writable: !0, configurable: !0 }) : Error.captureStackTrace ? Error.captureStackTrace(this, r) : Object.defineProperty(this, "stack", { value: Error().stack, writable: !0, configurable: !0 }); } Object.defineProperty(t, "__esModule", { value: !0 }), t.GraphQLError = r, r.prototype = Object.create(Error.prototype, { constructor: { value: r }, name: { value: "GraphQLError" }, toString: { value: function () { return (0, printError_1.printError)(this); } } }); });
unwrapExports(GraphQLError_1);
var GraphQLError_2 = GraphQLError_1.GraphQLError, syntaxError_1 = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }), t.syntaxError = function (e, t, r) { return new GraphQLError_1.GraphQLError("Syntax Error: " + r, void 0, e, [t]); }; });
unwrapExports(syntaxError_1);
var syntaxError_2 = syntaxError_1.syntaxError, locatedError_1 = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }), t.locatedError = function (e, t, r) { return e && Array.isArray(e.path) ? e : new GraphQLError_1.GraphQLError(e && e.message, e && e.nodes || t, e && e.source, e && e.positions, r, e); }; });
unwrapExports(locatedError_1);
var locatedError_2 = locatedError_1.locatedError, formatError_1 = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }); var r = Object.assign || function (e) { for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t];
    for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
} return e; }; t.formatError = function (e) { return e || (0, i.default)(0, "Received null or undefined error."), r({}, e.extensions, { message: e.message || "An unknown error occurred.", locations: e.locations, path: e.path }); }; var n, i = (n = invariant_1) && n.__esModule ? n : { default: n }; });
unwrapExports(formatError_1);
var formatError_2 = formatError_1.formatError, error = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }), Object.defineProperty(t, "GraphQLError", { enumerable: !0, get: function () { return GraphQLError_1.GraphQLError; } }), Object.defineProperty(t, "syntaxError", { enumerable: !0, get: function () { return syntaxError_1.syntaxError; } }), Object.defineProperty(t, "locatedError", { enumerable: !0, get: function () { return locatedError_1.locatedError; } }), Object.defineProperty(t, "printError", { enumerable: !0, get: function () { return printError_1.printError; } }), Object.defineProperty(t, "formatError", { enumerable: !0, get: function () { return formatError_1.formatError; } }); });
unwrapExports(error);
var blockStringValue_1 = createCommonjsModule(function (e, t) { function r(e) { for (var t = 0; t < e.length && (" " === e[t] || "\t" === e[t]);)
    t++; return t; } function n(e) { return r(e) === e.length; } Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function (e) { for (var t = e.split(/\r\n|[\n\r]/g), i = null, o = 1; o < t.length; o++) {
    var a = t[o], s = r(a);
    if (s < a.length && (null === i || s < i) && 0 === (i = s))
        break;
} if (i)
    for (var u = 1; u < t.length; u++)
        t[u] = t[u].slice(i); for (; t.length > 0 && n(t[0]);)
    t.shift(); for (; t.length > 0 && n(t[t.length - 1]);)
    t.pop(); return t.join("\n"); }; });
unwrapExports(blockStringValue_1);
var lexer = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }), t.TokenKind = void 0, t.createLexer = function (e, t) { var r = new D(a, 0, 0, 0, 0, null); return { source: e, options: t, lastToken: r, token: r, line: 1, lineStart: 0, advance: i, lookahead: o }; }, t.getTokenDesc = function (e) { var t = e.value; return t ? e.kind + ' "' + t + '"' : e.kind; }; var r, n = (r = blockStringValue_1) && r.__esModule ? r : { default: r }; function i() { return this.lastToken = this.token, this.token = this.lookahead(); } function o() { var e = this.token; if (e.kind !== s)
    do {
        e = e.next || (e.next = x(this, e));
    } while (e.kind === T); return e; } var a = "<SOF>", s = "<EOF>", u = "!", c = "$", l = "(", d = ")", f = "...", p = ":", h = "=", v = "@", y = "[", m = "]", g = "{", b = "|", E = "}", I = "Name", _ = "Int", k = "Float", w = "String", O = "BlockString", T = "Comment"; t.TokenKind = { SOF: a, EOF: s, BANG: u, DOLLAR: c, PAREN_L: l, PAREN_R: d, SPREAD: f, COLON: p, EQUALS: h, AT: v, BRACKET_L: y, BRACKET_R: m, BRACE_L: g, PIPE: b, BRACE_R: E, NAME: I, INT: _, FLOAT: k, STRING: w, BLOCK_STRING: O, COMMENT: T }; var S = String.prototype.charCodeAt, N = String.prototype.slice; function D(e, t, r, n, i, o, a) { this.kind = e, this.start = t, this.end = r, this.line = n, this.column = i, this.value = a, this.prev = o, this.next = null; } function F(e) { return isNaN(e) ? s : e < 127 ? JSON.stringify(String.fromCharCode(e)) : '"\\u' + ("00" + e.toString(16).toUpperCase()).slice(-4) + '"'; } function x(e, t) { var r = e.source, i = r.body, o = i.length, a = function (e, t, r) { for (var n = e.length, i = t; i < n;) {
    var o = S.call(e, i);
    if (9 === o || 32 === o || 44 === o || 65279 === o)
        ++i;
    else if (10 === o)
        ++i, ++r.line, r.lineStart = i;
    else {
        if (13 !== o)
            break;
        10 === S.call(e, i + 1) ? i += 2 : ++i, ++r.line, r.lineStart = i;
    }
} return i; }(i, t.end, e), x = e.line, P = 1 + a - e.lineStart; if (a >= o)
    return new D(s, o, o, x, P, t); var C = S.call(i, a); if (C < 32 && 9 !== C && 10 !== C && 13 !== C)
    throw (0, error.syntaxError)(r, a, "Cannot contain the invalid character " + F(C) + "."); switch (C) {
    case 33: return new D(u, a, a + 1, x, P, t);
    case 35: return function (e, t, r, n, i) { var o = e.body, a = void 0, s = t; do {
        a = S.call(o, ++s);
    } while (null !== a && (a > 31 || 9 === a)); return new D(T, t, s, r, n, i, N.call(o, t + 1, s)); }(r, a, x, P, t);
    case 36: return new D(c, a, a + 1, x, P, t);
    case 40: return new D(l, a, a + 1, x, P, t);
    case 41: return new D(d, a, a + 1, x, P, t);
    case 46:
        if (46 === S.call(i, a + 1) && 46 === S.call(i, a + 2))
            return new D(f, a, a + 3, x, P, t);
        break;
    case 58: return new D(p, a, a + 1, x, P, t);
    case 61: return new D(h, a, a + 1, x, P, t);
    case 64: return new D(v, a, a + 1, x, P, t);
    case 91: return new D(y, a, a + 1, x, P, t);
    case 93: return new D(m, a, a + 1, x, P, t);
    case 123: return new D(g, a, a + 1, x, P, t);
    case 124: return new D(b, a, a + 1, x, P, t);
    case 125: return new D(E, a, a + 1, x, P, t);
    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
    case 71:
    case 72:
    case 73:
    case 74:
    case 75:
    case 76:
    case 77:
    case 78:
    case 79:
    case 80:
    case 81:
    case 82:
    case 83:
    case 84:
    case 85:
    case 86:
    case 87:
    case 88:
    case 89:
    case 90:
    case 95:
    case 97:
    case 98:
    case 99:
    case 100:
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
    case 106:
    case 107:
    case 108:
    case 109:
    case 110:
    case 111:
    case 112:
    case 113:
    case 114:
    case 115:
    case 116:
    case 117:
    case 118:
    case 119:
    case 120:
    case 121:
    case 122: return function (e, t, r, n, i) { for (var o = e.body, a = o.length, s = t + 1, u = 0; s !== a && null !== (u = S.call(o, s)) && (95 === u || u >= 48 && u <= 57 || u >= 65 && u <= 90 || u >= 97 && u <= 122);)
        ++s; return new D(I, t, s, r, n, i, N.call(o, t, s)); }(r, a, x, P, t);
    case 45:
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57: return function (e, t, r, n, i, o) { var a = e.body, s = r, u = t, c = !1; if (45 === s && (s = S.call(a, ++u)), 48 === s) {
        if ((s = S.call(a, ++u)) >= 48 && s <= 57)
            throw (0, error.syntaxError)(e, u, "Invalid number, unexpected digit after 0: " + F(s) + ".");
    }
    else
        u = A(e, u, s), s = S.call(a, u); return 46 === s && (c = !0, s = S.call(a, ++u), u = A(e, u, s), s = S.call(a, u)), 69 !== s && 101 !== s || (c = !0, 43 !== (s = S.call(a, ++u)) && 45 !== s || (s = S.call(a, ++u)), u = A(e, u, s)), new D(c ? k : _, t, u, n, i, o, N.call(a, t, u)); }(r, a, C, x, P, t);
    case 34: return 34 === S.call(i, a + 1) && 34 === S.call(i, a + 2) ? function (e, t, r, i, o) { for (var a = e.body, s = t + 3, u = s, c = 0, l = ""; s < a.length && null !== (c = S.call(a, s));) {
        if (34 === c && 34 === S.call(a, s + 1) && 34 === S.call(a, s + 2))
            return l += N.call(a, u, s), new D(O, t, s + 3, r, i, o, (0, n.default)(l));
        if (c < 32 && 9 !== c && 10 !== c && 13 !== c)
            throw (0, error.syntaxError)(e, s, "Invalid character within String: " + F(c) + ".");
        92 === c && 34 === S.call(a, s + 1) && 34 === S.call(a, s + 2) && 34 === S.call(a, s + 3) ? (l += N.call(a, u, s) + '"""', u = s += 4) : ++s;
    } throw (0, error.syntaxError)(e, s, "Unterminated string."); }(r, a, x, P, t) : function (e, t, r, n, i) { for (var o, a, s, u, c = e.body, l = t + 1, d = l, f = 0, p = ""; l < c.length && null !== (f = S.call(c, l)) && 10 !== f && 13 !== f;) {
        if (34 === f)
            return p += N.call(c, d, l), new D(w, t, l + 1, r, n, i, p);
        if (f < 32 && 9 !== f)
            throw (0, error.syntaxError)(e, l, "Invalid character within String: " + F(f) + ".");
        if (++l, 92 === f) {
            switch ((p += N.call(c, d, l - 1), f = S.call(c, l))) {
                case 34:
                    p += '"';
                    break;
                case 47:
                    p += "/";
                    break;
                case 92:
                    p += "\\";
                    break;
                case 98:
                    p += "\b";
                    break;
                case 102:
                    p += "\f";
                    break;
                case 110:
                    p += "\n";
                    break;
                case 114:
                    p += "\r";
                    break;
                case 116:
                    p += "\t";
                    break;
                case 117:
                    var h = (o = S.call(c, l + 1), a = S.call(c, l + 2), s = S.call(c, l + 3), u = S.call(c, l + 4), R(o) << 12 | R(a) << 8 | R(s) << 4 | R(u));
                    if (h < 0)
                        throw (0, error.syntaxError)(e, l, "Invalid character escape sequence: \\u" + c.slice(l + 1, l + 5) + ".");
                    p += String.fromCharCode(h), l += 4;
                    break;
                default: throw (0, error.syntaxError)(e, l, "Invalid character escape sequence: \\" + String.fromCharCode(f) + ".");
            }
            d = ++l;
        }
    } throw (0, error.syntaxError)(e, l, "Unterminated string."); }(r, a, x, P, t);
} throw (0, error.syntaxError)(r, a, function (e) { return 39 === e ? "Unexpected single quote character ('), did you mean to use a double quote (\")?" : "Cannot parse the unexpected character " + F(e) + "."; }(C)); } function A(e, t, r) { var n = e.body, i = t, o = r; if (o >= 48 && o <= 57) {
    do {
        o = S.call(n, ++i);
    } while (o >= 48 && o <= 57);
    return i;
} throw (0, error.syntaxError)(e, i, "Invalid number, expected digit but got: " + F(o) + "."); } function R(e) { return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1; } D.prototype.toJSON = D.prototype.inspect = function () { return { kind: this.kind, value: this.value, line: this.line, column: this.column }; }; });
unwrapExports(lexer);
var lexer_1 = lexer.TokenKind, lexer_2 = lexer.createLexer, lexer_3 = lexer.getTokenDesc, kinds = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }), t.NAME = "Name", t.DOCUMENT = "Document", t.OPERATION_DEFINITION = "OperationDefinition", t.VARIABLE_DEFINITION = "VariableDefinition", t.VARIABLE = "Variable", t.SELECTION_SET = "SelectionSet", t.FIELD = "Field", t.ARGUMENT = "Argument", t.FRAGMENT_SPREAD = "FragmentSpread", t.INLINE_FRAGMENT = "InlineFragment", t.FRAGMENT_DEFINITION = "FragmentDefinition", t.INT = "IntValue", t.FLOAT = "FloatValue", t.STRING = "StringValue", t.BOOLEAN = "BooleanValue", t.NULL = "NullValue", t.ENUM = "EnumValue", t.LIST = "ListValue", t.OBJECT = "ObjectValue", t.OBJECT_FIELD = "ObjectField", t.DIRECTIVE = "Directive", t.NAMED_TYPE = "NamedType", t.LIST_TYPE = "ListType", t.NON_NULL_TYPE = "NonNullType", t.SCHEMA_DEFINITION = "SchemaDefinition", t.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", t.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", t.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", t.FIELD_DEFINITION = "FieldDefinition", t.INPUT_VALUE_DEFINITION = "InputValueDefinition", t.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", t.UNION_TYPE_DEFINITION = "UnionTypeDefinition", t.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", t.ENUM_VALUE_DEFINITION = "EnumValueDefinition", t.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", t.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", t.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", t.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", t.UNION_TYPE_EXTENSION = "UnionTypeExtension", t.ENUM_TYPE_EXTENSION = "EnumTypeExtension", t.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension", t.DIRECTIVE_DEFINITION = "DirectiveDefinition"; });
unwrapExports(kinds);
var kinds_1 = kinds.NAME, kinds_2 = kinds.DOCUMENT, kinds_3 = kinds.OPERATION_DEFINITION, kinds_4 = kinds.VARIABLE_DEFINITION, kinds_5 = kinds.VARIABLE, kinds_6 = kinds.SELECTION_SET, kinds_7 = kinds.FIELD, kinds_8 = kinds.ARGUMENT, kinds_9 = kinds.FRAGMENT_SPREAD, kinds_10 = kinds.INLINE_FRAGMENT, kinds_11 = kinds.FRAGMENT_DEFINITION, kinds_12 = kinds.INT, kinds_13 = kinds.FLOAT, kinds_14 = kinds.STRING, kinds_15 = kinds.BOOLEAN, kinds_16 = kinds.NULL, kinds_17 = kinds.ENUM, kinds_18 = kinds.LIST, kinds_19 = kinds.OBJECT, kinds_20 = kinds.OBJECT_FIELD, kinds_21 = kinds.DIRECTIVE, kinds_22 = kinds.NAMED_TYPE, kinds_23 = kinds.LIST_TYPE, kinds_24 = kinds.NON_NULL_TYPE, kinds_25 = kinds.SCHEMA_DEFINITION, kinds_26 = kinds.OPERATION_TYPE_DEFINITION, kinds_27 = kinds.SCALAR_TYPE_DEFINITION, kinds_28 = kinds.OBJECT_TYPE_DEFINITION, kinds_29 = kinds.FIELD_DEFINITION, kinds_30 = kinds.INPUT_VALUE_DEFINITION, kinds_31 = kinds.INTERFACE_TYPE_DEFINITION, kinds_32 = kinds.UNION_TYPE_DEFINITION, kinds_33 = kinds.ENUM_TYPE_DEFINITION, kinds_34 = kinds.ENUM_VALUE_DEFINITION, kinds_35 = kinds.INPUT_OBJECT_TYPE_DEFINITION, kinds_36 = kinds.SCALAR_TYPE_EXTENSION, kinds_37 = kinds.OBJECT_TYPE_EXTENSION, kinds_38 = kinds.INTERFACE_TYPE_EXTENSION, kinds_39 = kinds.UNION_TYPE_EXTENSION, kinds_40 = kinds.ENUM_TYPE_EXTENSION, kinds_41 = kinds.INPUT_OBJECT_TYPE_EXTENSION, kinds_42 = kinds.DIRECTIVE_DEFINITION, directiveLocation = createCommonjsModule(function (e, t) { Object.defineProperty(t, "__esModule", { value: !0 }), t.DirectiveLocation = { QUERY: "QUERY", MUTATION: "MUTATION", SUBSCRIPTION: "SUBSCRIPTION", FIELD: "FIELD", FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION", FRAGMENT_SPREAD: "FRAGMENT_SPREAD", INLINE_FRAGMENT: "INLINE_FRAGMENT", SCHEMA: "SCHEMA", SCALAR: "SCALAR", OBJECT: "OBJECT", FIELD_DEFINITION: "FIELD_DEFINITION", ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION", INTERFACE: "INTERFACE", UNION: "UNION", ENUM: "ENUM", ENUM_VALUE: "ENUM_VALUE", INPUT_OBJECT: "INPUT_OBJECT", INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION" }; });
unwrapExports(directiveLocation);
var directiveLocation_1 = directiveLocation.DirectiveLocation, parser = createCommonjsModule(function (e, t) { function r(e) { var t = U(e, lexer.TokenKind.NAME); return { kind: kinds.NAME, value: t.value, loc: Q(e, t) }; } function n(e) { if ($(e, lexer.TokenKind.NAME))
    switch (e.token.value) {
        case "query":
        case "mutation":
        case "subscription":
        case "fragment": return i(e);
        case "schema":
        case "scalar":
        case "type":
        case "interface":
        case "union":
        case "enum":
        case "input":
        case "extend":
        case "directive": return O(e);
    }
else {
    if ($(e, lexer.TokenKind.BRACE_L))
        return i(e);
    if (T(e))
        return O(e);
} throw K(e); } function i(e) { if ($(e, lexer.TokenKind.NAME))
    switch (e.token.value) {
        case "query":
        case "mutation":
        case "subscription": return o(e);
        case "fragment": return function (e) { var t = e.token; return B(e, "fragment"), e.options.experimentalFragmentVariables ? { kind: kinds.FRAGMENT_DEFINITION, name: v(e), variableDefinitions: s(e), typeCondition: (B(e, "on"), w(e)), directives: I(e, !1), selectionSet: l(e), loc: Q(e, t) } : { kind: kinds.FRAGMENT_DEFINITION, name: v(e), typeCondition: (B(e, "on"), w(e)), directives: I(e, !1), selectionSet: l(e), loc: Q(e, t) }; }(e);
    }
else if ($(e, lexer.TokenKind.BRACE_L))
    return o(e); throw K(e); } function o(e) { var t = e.token; if ($(e, lexer.TokenKind.BRACE_L))
    return { kind: kinds.OPERATION_DEFINITION, operation: "query", name: void 0, variableDefinitions: [], directives: [], selectionSet: l(e), loc: Q(e, t) }; var n = a(e), i = void 0; return $(e, lexer.TokenKind.NAME) && (i = r(e)), { kind: kinds.OPERATION_DEFINITION, operation: n, name: i, variableDefinitions: s(e), directives: I(e, !1), selectionSet: l(e), loc: Q(e, t) }; } function a(e) { var t = U(e, lexer.TokenKind.NAME); switch (t.value) {
    case "query": return "query";
    case "mutation": return "mutation";
    case "subscription": return "subscription";
} throw K(e, t); } function s(e) { return $(e, lexer.TokenKind.PAREN_L) ? G(e, lexer.TokenKind.PAREN_L, u, lexer.TokenKind.PAREN_R) : []; } function u(e) { var t = e.token; return { kind: kinds.VARIABLE_DEFINITION, variable: c(e), type: (U(e, lexer.TokenKind.COLON), k(e)), defaultValue: V(e, lexer.TokenKind.EQUALS) ? y(e, !0) : void 0, loc: Q(e, t) }; } function c(e) { var t = e.token; return U(e, lexer.TokenKind.DOLLAR), { kind: kinds.VARIABLE, name: r(e), loc: Q(e, t) }; } function l(e) { var t = e.token; return { kind: kinds.SELECTION_SET, selections: G(e, lexer.TokenKind.BRACE_L, d, lexer.TokenKind.BRACE_R), loc: Q(e, t) }; } function d(e) { return $(e, lexer.TokenKind.SPREAD) ? function (e) { var t = e.token; if (U(e, lexer.TokenKind.SPREAD), $(e, lexer.TokenKind.NAME) && "on" !== e.token.value)
    return { kind: kinds.FRAGMENT_SPREAD, name: v(e), directives: I(e, !1), loc: Q(e, t) }; var r = void 0; return "on" === e.token.value && (e.advance(), r = w(e)), { kind: kinds.INLINE_FRAGMENT, typeCondition: r, directives: I(e, !1), selectionSet: l(e), loc: Q(e, t) }; }(e) : function (e) { var t = e.token, n = r(e), i = void 0, o = void 0; return V(e, lexer.TokenKind.COLON) ? (i = n, o = r(e)) : o = n, { kind: kinds.FIELD, alias: i, name: o, arguments: f(e, !1), directives: I(e, !1), selectionSet: $(e, lexer.TokenKind.BRACE_L) ? l(e) : void 0, loc: Q(e, t) }; }(e); } function f(e, t) { var r = t ? h : p; return $(e, lexer.TokenKind.PAREN_L) ? G(e, lexer.TokenKind.PAREN_L, r, lexer.TokenKind.PAREN_R) : []; } function p(e) { var t = e.token; return { kind: kinds.ARGUMENT, name: r(e), value: (U(e, lexer.TokenKind.COLON), y(e, !1)), loc: Q(e, t) }; } function h(e) { var t = e.token; return { kind: kinds.ARGUMENT, name: r(e), value: (U(e, lexer.TokenKind.COLON), g(e)), loc: Q(e, t) }; } function v(e) { if ("on" === e.token.value)
    throw K(e); return r(e); } function y(e, t) { var r = e.token; switch (r.kind) {
    case lexer.TokenKind.BRACKET_L: return function (e, t) { var r = e.token, n = t ? g : b; return { kind: kinds.LIST, values: function (e, t, r, n) { U(e, t); for (var i = []; !V(e, n);)
            i.push(r(e)); return i; }(e, lexer.TokenKind.BRACKET_L, n, lexer.TokenKind.BRACKET_R), loc: Q(e, r) }; }(e, t);
    case lexer.TokenKind.BRACE_L: return function (e, t) { var r = e.token; U(e, lexer.TokenKind.BRACE_L); for (var n = []; !V(e, lexer.TokenKind.BRACE_R);)
        n.push(E(e, t)); return { kind: kinds.OBJECT, fields: n, loc: Q(e, r) }; }(e, t);
    case lexer.TokenKind.INT: return e.advance(), { kind: kinds.INT, value: r.value, loc: Q(e, r) };
    case lexer.TokenKind.FLOAT: return e.advance(), { kind: kinds.FLOAT, value: r.value, loc: Q(e, r) };
    case lexer.TokenKind.STRING:
    case lexer.TokenKind.BLOCK_STRING: return m(e);
    case lexer.TokenKind.NAME: return "true" === r.value || "false" === r.value ? (e.advance(), { kind: kinds.BOOLEAN, value: "true" === r.value, loc: Q(e, r) }) : "null" === r.value ? (e.advance(), { kind: kinds.NULL, loc: Q(e, r) }) : (e.advance(), { kind: kinds.ENUM, value: r.value, loc: Q(e, r) });
    case lexer.TokenKind.DOLLAR: if (!t)
        return c(e);
} throw K(e); } function m(e) { var t = e.token; return e.advance(), { kind: kinds.STRING, value: t.value, block: t.kind === lexer.TokenKind.BLOCK_STRING, loc: Q(e, t) }; } function g(e) { return y(e, !0); } function b(e) { return y(e, !1); } function E(e, t) { var n = e.token; return { kind: kinds.OBJECT_FIELD, name: r(e), value: (U(e, lexer.TokenKind.COLON), y(e, t)), loc: Q(e, n) }; } function I(e, t) { for (var r = []; $(e, lexer.TokenKind.AT);)
    r.push(_(e, t)); return r; } function _(e, t) { var n = e.token; return U(e, lexer.TokenKind.AT), { kind: kinds.DIRECTIVE, name: r(e), arguments: f(e, t), loc: Q(e, n) }; } function k(e) { var t = e.token, r = void 0; return V(e, lexer.TokenKind.BRACKET_L) ? (r = k(e), U(e, lexer.TokenKind.BRACKET_R), r = { kind: kinds.LIST_TYPE, type: r, loc: Q(e, t) }) : r = w(e), V(e, lexer.TokenKind.BANG) ? { kind: kinds.NON_NULL_TYPE, type: r, loc: Q(e, t) } : r; } function w(e) { var t = e.token; return { kind: kinds.NAMED_TYPE, name: r(e), loc: Q(e, t) }; } function O(e) { var t = T(e) ? e.lookahead() : e.token; if (t.kind === lexer.TokenKind.NAME)
    switch (t.value) {
        case "schema": return function (e) { var t = e.token; B(e, "schema"); var r = I(e, !0), n = G(e, lexer.TokenKind.BRACE_L, N, lexer.TokenKind.BRACE_R); return { kind: kinds.SCHEMA_DEFINITION, directives: r, operationTypes: n, loc: Q(e, t) }; }(e);
        case "scalar": return function (e) { var t = e.token, n = S(e); B(e, "scalar"); var i = r(e), o = I(e, !0); return { kind: kinds.SCALAR_TYPE_DEFINITION, description: n, name: i, directives: o, loc: Q(e, t) }; }(e);
        case "type": return function (e) { var t = e.token, n = S(e); B(e, "type"); var i = r(e), o = D(e), a = I(e, !0), s = F(e); return { kind: kinds.OBJECT_TYPE_DEFINITION, description: n, name: i, interfaces: o, directives: a, fields: s, loc: Q(e, t) }; }(e);
        case "interface": return function (e) { var t = e.token, n = S(e); B(e, "interface"); var i = r(e), o = I(e, !0), a = F(e); return { kind: kinds.INTERFACE_TYPE_DEFINITION, description: n, name: i, directives: o, fields: a, loc: Q(e, t) }; }(e);
        case "union": return function (e) { var t = e.token, n = S(e); B(e, "union"); var i = r(e), o = I(e, !0), a = P(e); return { kind: kinds.UNION_TYPE_DEFINITION, description: n, name: i, directives: o, types: a, loc: Q(e, t) }; }(e);
        case "enum": return function (e) { var t = e.token, n = S(e); B(e, "enum"); var i = r(e), o = I(e, !0), a = C(e); return { kind: kinds.ENUM_TYPE_DEFINITION, description: n, name: i, directives: o, values: a, loc: Q(e, t) }; }(e);
        case "input": return function (e) { var t = e.token, n = S(e); B(e, "input"); var i = r(e), o = I(e, !0), a = L(e); return { kind: kinds.INPUT_OBJECT_TYPE_DEFINITION, description: n, name: i, directives: o, fields: a, loc: Q(e, t) }; }(e);
        case "extend": return function (e) { var t = e.lookahead(); if (t.kind === lexer.TokenKind.NAME)
            switch (t.value) {
                case "scalar": return function (e) { var t = e.token; B(e, "extend"), B(e, "scalar"); var n = r(e), i = I(e, !0); if (0 === i.length)
                    throw K(e); return { kind: kinds.SCALAR_TYPE_EXTENSION, name: n, directives: i, loc: Q(e, t) }; }(e);
                case "type": return function (e) { var t = e.token; B(e, "extend"), B(e, "type"); var n = r(e), i = D(e), o = I(e, !0), a = F(e); if (0 === i.length && 0 === o.length && 0 === a.length)
                    throw K(e); return { kind: kinds.OBJECT_TYPE_EXTENSION, name: n, interfaces: i, directives: o, fields: a, loc: Q(e, t) }; }(e);
                case "interface": return function (e) { var t = e.token; B(e, "extend"), B(e, "interface"); var n = r(e), i = I(e, !0), o = F(e); if (0 === i.length && 0 === o.length)
                    throw K(e); return { kind: kinds.INTERFACE_TYPE_EXTENSION, name: n, directives: i, fields: o, loc: Q(e, t) }; }(e);
                case "union": return function (e) { var t = e.token; B(e, "extend"), B(e, "union"); var n = r(e), i = I(e, !0), o = P(e); if (0 === i.length && 0 === o.length)
                    throw K(e); return { kind: kinds.UNION_TYPE_EXTENSION, name: n, directives: i, types: o, loc: Q(e, t) }; }(e);
                case "enum": return function (e) { var t = e.token; B(e, "extend"), B(e, "enum"); var n = r(e), i = I(e, !0), o = C(e); if (0 === i.length && 0 === o.length)
                    throw K(e); return { kind: kinds.ENUM_TYPE_EXTENSION, name: n, directives: i, values: o, loc: Q(e, t) }; }(e);
                case "input": return function (e) { var t = e.token; B(e, "extend"), B(e, "input"); var n = r(e), i = I(e, !0), o = L(e); if (0 === i.length && 0 === o.length)
                    throw K(e); return { kind: kinds.INPUT_OBJECT_TYPE_EXTENSION, name: n, directives: i, fields: o, loc: Q(e, t) }; }(e);
            } throw K(e, t); }(e);
        case "directive": return function (e) { var t = e.token, n = S(e); B(e, "directive"), U(e, lexer.TokenKind.AT); var i = r(e), o = A(e); B(e, "on"); var a = function (e) { V(e, lexer.TokenKind.PIPE); var t = []; do {
            t.push(M(e));
        } while (V(e, lexer.TokenKind.PIPE)); return t; }(e); return { kind: kinds.DIRECTIVE_DEFINITION, description: n, name: i, arguments: o, locations: a, loc: Q(e, t) }; }(e);
    } throw K(e, t); } function T(e) { return $(e, lexer.TokenKind.STRING) || $(e, lexer.TokenKind.BLOCK_STRING); } function S(e) { if (T(e))
    return m(e); } function N(e) { var t = e.token, r = a(e); U(e, lexer.TokenKind.COLON); var n = w(e); return { kind: kinds.OPERATION_TYPE_DEFINITION, operation: r, type: n, loc: Q(e, t) }; } function D(e) { var t = []; if ("implements" === e.token.value) {
    e.advance();
    do {
        t.push(w(e));
    } while ($(e, lexer.TokenKind.NAME));
} return t; } function F(e) { return $(e, lexer.TokenKind.BRACE_L) ? G(e, lexer.TokenKind.BRACE_L, x, lexer.TokenKind.BRACE_R) : []; } function x(e) { var t = e.token, n = S(e), i = r(e), o = A(e); U(e, lexer.TokenKind.COLON); var a = k(e), s = I(e, !0); return { kind: kinds.FIELD_DEFINITION, description: n, name: i, arguments: o, type: a, directives: s, loc: Q(e, t) }; } function A(e) { return $(e, lexer.TokenKind.PAREN_L) ? G(e, lexer.TokenKind.PAREN_L, R, lexer.TokenKind.PAREN_R) : []; } function R(e) { var t = e.token, n = S(e), i = r(e); U(e, lexer.TokenKind.COLON); var o = k(e), a = void 0; V(e, lexer.TokenKind.EQUALS) && (a = g(e)); var s = I(e, !0); return { kind: kinds.INPUT_VALUE_DEFINITION, description: n, name: i, type: o, defaultValue: a, directives: s, loc: Q(e, t) }; } function P(e) { var t = []; if (V(e, lexer.TokenKind.EQUALS)) {
    V(e, lexer.TokenKind.PIPE);
    do {
        t.push(w(e));
    } while (V(e, lexer.TokenKind.PIPE));
} return t; } function C(e) { return $(e, lexer.TokenKind.BRACE_L) ? G(e, lexer.TokenKind.BRACE_L, q, lexer.TokenKind.BRACE_R) : []; } function q(e) { var t = e.token, n = S(e), i = r(e), o = I(e, !0); return { kind: kinds.ENUM_VALUE_DEFINITION, description: n, name: i, directives: o, loc: Q(e, t) }; } function L(e) { return $(e, lexer.TokenKind.BRACE_L) ? G(e, lexer.TokenKind.BRACE_L, R, lexer.TokenKind.BRACE_R) : []; } function M(e) { var t = e.token, n = r(e); if (directiveLocation.DirectiveLocation.hasOwnProperty(n.value))
    return n; throw K(e, t); } function Q(e, t) { if (!e.options.noLocation)
    return new j(t, e.lastToken, e.source); } function j(e, t, r) { this.start = e.start, this.end = t.end, this.startToken = e, this.endToken = t, this.source = r; } function $(e, t) { return e.token.kind === t; } function V(e, t) { var r = e.token.kind === t; return r && e.advance(), r; } function U(e, t) { var r = e.token; if (r.kind === t)
    return e.advance(), r; throw (0, error.syntaxError)(e.source, r.start, "Expected " + t + ", found " + (0, lexer.getTokenDesc)(r)); } function B(e, t) { var r = e.token; if (r.kind === lexer.TokenKind.NAME && r.value === t)
    return e.advance(), r; throw (0, error.syntaxError)(e.source, r.start, 'Expected "' + t + '", found ' + (0, lexer.getTokenDesc)(r)); } function K(e, t) { var r = t || e.token; return (0, error.syntaxError)(e.source, r.start, "Unexpected " + (0, lexer.getTokenDesc)(r)); } function G(e, t, r, n) { U(e, t); for (var i = [r(e)]; !V(e, n);)
    i.push(r(e)); return i; } Object.defineProperty(t, "__esModule", { value: !0 }), t.parse = function (e, t) { var r = "string" == typeof e ? new source.Source(e) : e; if (!(r instanceof source.Source))
    throw new TypeError("Must provide Source. Received: " + String(r)); return function (e) { var t = e.token; U(e, lexer.TokenKind.SOF); var r = []; do {
    r.push(n(e));
} while (!V(e, lexer.TokenKind.EOF)); return { kind: kinds.DOCUMENT, definitions: r, loc: Q(e, t) }; }((0, lexer.createLexer)(r, t || {})); }, t.parseValue = function (e, t) { var r = "string" == typeof e ? new source.Source(e) : e, n = (0, lexer.createLexer)(r, t || {}); U(n, lexer.TokenKind.SOF); var i = y(n, !1); return U(n, lexer.TokenKind.EOF), i; }, t.parseType = function (e, t) { var r = "string" == typeof e ? new source.Source(e) : e, n = (0, lexer.createLexer)(r, t || {}); U(n, lexer.TokenKind.SOF); var i = k(n); return U(n, lexer.TokenKind.EOF), i; }, t.parseConstValue = g, t.parseTypeReference = k, t.parseNamedType = w, j.prototype.toJSON = j.prototype.inspect = function () { return { start: this.start, end: this.end }; }; });
unwrapExports(parser);
var parser_1 = parser.parse, parser_2 = parser.parseValue, parser_3 = parser.parseType, parser_4 = parser.parseConstValue, parser_5 = parser.parseTypeReference, parser_6 = parser.parseNamedType, parse = parser.parse;
function normalize(e) { return e.replace(/[\s,]+/g, " ").trim(); }
var docCache = {}, fragmentSourceMap = {};
function cacheKeyFromLoc(e) { return normalize(e.source.body.substring(e.start, e.end)); }
function resetCaches() { docCache = {}, fragmentSourceMap = {}; }
var printFragmentWarnings = !0;
function processFragments(e) { for (var t = {}, r = [], n = 0; n < e.definitions.length; n++) {
    var i = e.definitions[n];
    if ("FragmentDefinition" === i.kind) {
        var o = i.name.value, a = cacheKeyFromLoc(i.loc);
        fragmentSourceMap.hasOwnProperty(o) && !fragmentSourceMap[o][a] ? (printFragmentWarnings && console.warn("Warning: fragment with name " + o + " already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names"), fragmentSourceMap[o][a] = !0) : fragmentSourceMap.hasOwnProperty(o) || (fragmentSourceMap[o] = {}, fragmentSourceMap[o][a] = !0), t[a] || (t[a] = !0, r.push(i));
    }
    else
        r.push(i);
} return e.definitions = r, e; }
function disableFragmentWarnings() { printFragmentWarnings = !1; }
function stripLoc(e, t) { var r = Object.prototype.toString.call(e); if ("[object Array]" === r)
    return e.map(function (e) { return stripLoc(e, t); }); if ("[object Object]" !== r)
    throw new Error("Unexpected input."); t && e.loc && delete e.loc, e.loc && (delete e.loc.startToken, delete e.loc.endToken); var n, i, o, a = Object.keys(e); for (n in a)
    a.hasOwnProperty(n) && (i = e[a[n]], "[object Object]" !== (o = Object.prototype.toString.call(i)) && "[object Array]" !== o || (e[a[n]] = stripLoc(i, !0))); return e; }
var experimentalFragmentVariables = !1;
function parseDocument(e) { var t = normalize(e); if (docCache[t])
    return docCache[t]; var r = parse(e, { experimentalFragmentVariables: experimentalFragmentVariables }); if (!r || "Document" !== r.kind)
    throw new Error("Not a valid GraphQL document."); return r = stripLoc(r = processFragments(r), !1), docCache[t] = r, r; }
function enableExperimentalFragmentVariables() { experimentalFragmentVariables = !0; }
function disableExperimentalFragmentVariables() { experimentalFragmentVariables = !1; }
function gql() { for (var e = Array.prototype.slice.call(arguments), t = e[0], r = "string" == typeof t ? t : t[0], n = 1; n < e.length; n++)
    e[n] && e[n].kind && "Document" === e[n].kind ? r += e[n].loc.source.body : r += e[n], r += t[n]; return parseDocument(r); }
gql.default = gql, gql.resetCaches = resetCaches, gql.disableFragmentWarnings = disableFragmentWarnings, gql.enableExperimentalFragmentVariables = enableExperimentalFragmentVariables, gql.disableExperimentalFragmentVariables = disableExperimentalFragmentVariables;
var src = gql, __awaiter = function (e, t, r, n) { return new (r || (r = Promise))(function (i, o) { function a(e) { try {
    u(n.next(e));
}
catch (e) {
    o(e);
} } function s(e) { try {
    u(n.throw(e));
}
catch (e) {
    o(e);
} } function u(e) { e.done ? i(e.value) : new r(function (t) { t(e.value); }).then(a, s); } u((n = n.apply(e, t || [])).next()); }); };
function widgetIdent() { return window.widgetIdent; }
window.widgetIdent || (window.widgetIdent = { env: "demo" });
var today = new Date, demoUser = { shareLink: "http://ssqt.co", fueltankCode: "12AS3F", referralcode: "RIDDIKULUS", messageLink: { EMAIL: "http://short.staging.referralsaasquatch.com/mJjFXu", FACEBOOK: "http://short.staging.referralsaasquatch.com/mwjFXu", TWITTER: "http://short.staging.referralsaasquatch.com/mwjFXu", SMS: "http://short.staging.referralsaasquatch.com/mwjFXu", WHATSAPP: "http://short.staging.referralsaasquatch.com/mwjFXu", LINKEDIN: "http://short.staging.referralsaasquatch.com/mwjFXu", PINTEREST: "http://short.staging.referralsaasquatch.com/mwjFXu", FBMESSENGER: "http://short.staging.referralsaasquatch.com/mwjFXu" }, referrals: { totalCount: 8, data: [{ dateReferralStarted: today.setDate(today.getDate() - 2), referredUser: { firstName: "Remus", lastName: "Lupin" }, rewards: [{ prettyValue: "$20.00", dateExpires: today.setDate(today.getDate() - 2), statuses: ["EXPIRED"] }, { prettyValue: "$10.00", statuses: ["AVAILABLE"] }, { prettyValue: "$5.00", statuses: ["AVAILABLE"] }] }, { dateReferralStarted: today.setDate(today.getDate() - 1), referredUser: { firstName: "Gellert", lastName: "Grindelwald" }, rewards: [] }, { dateReferralStarted: today.setDate(today.getDate() - 1), referredUser: { firstName: "", lastName: "" }, rewards: [{ prettyValue: "$20.00", dateExpires: today.setDate(today.getDate() - 2), statuses: ["EXPIRED"] }] }, { dateReferralStarted: today.setDate(today.getDate() - 5), referredUser: { firstName: "Lavender", lastName: "Brown" }, rewards: [{ prettyValue: "$20.00", statuses: ["CANCELLED"] }] }, { dateReferralStarted: today.setDate(today.getDate() - 4), referredUser: { firstName: "Blaise", lastName: "Zabini" }, rewards: [{ prettyValue: "$20.00", statuses: ["AVAILABLE"] }, { prettyValue: "$10.00", statuses: ["AVAILABLE"] }] }, { dateReferralStarted: today.setDate(today.getDate() - 10), referredUser: { firstName: "Argus", lastName: "Filch" }, rewards: [] }, { dateReferralStarted: today.setDate(today.getDate() - 15), referredUser: { firstName: "Ron", lastName: "Weasley" }, rewards: [{ prettyValue: "$20.00", statuses: ["AVAILABLE"] }] }, { dateReferralStarted: today.setDate(today.getDate() - 2), referredUser: { firstName: "Hermione", lastName: "Granger" }, rewards: [{ prettyValue: "$20.00", statuses: ["AVAILABLE"] }, { prettyValue: "$10.00", statuses: ["AVAILABLE"] }, { prettyValue: "$5.00", statuses: ["AVAILABLE"] }, { prettyValue: "5%", statuses: ["AVAILABLE"] }, { prettyValue: "5%", statuses: ["AVAILABLE"] }, { prettyValue: "5%", statuses: ["AVAILABLE"] }] }] }, referredByReferral: { dateReferralStarted: today.setDate(today.getDate() - 2), referrerUser: { firstName: "Rubeus", lastName: "Hagrid", referralCode: "RUBEUSHAGRID12" }, rewards: [{ fuelTankCode: "CODE1234", prettyValue: "$10.00", statuses: ["AVAILABLE"] }] }, referralsMonth: { totalCount: 6 }, referralsWeek: { totalCount: 3 }, rewardsCount: { totalCount: 14 }, rewardsMonth: { totalCount: 7 }, rewardsWeek: { totalCount: 4 }, rewardBalanceDetails: [{ prettyAvailableValue: "200.00", prettyAssignedCredit: "300.00", prettyRedeemedCredit: "100.00", dateExpires: "1545096080", dateCreated: "1545084080", unit: "CASH/LONG", rewardUnit: { currency: { displayName: "Canadian Dollar", symbol: "$", currencyCode: "CAD" } } }, { prettyAvailableValue: "200.00", prettyAssignedCredit: "300.00", prettyRedeemedCredit: "100.00", dateExpires: "1545094080", dateCreated: "1545074080", unit: "CASH/MEDIUM", rewardUnit: { currency: { displayName: "Canadian Dollar", symbol: "$", currencyCode: "CAD" } } }, { prettyAvailableValue: "200.00", prettyAssignedCredit: "300.00", prettyRedeemedCredit: "100.00", dateExpires: "1545089080", dateCreated: "1545074080", unit: "CASH/SHORTEST", rewardUnit: { currency: { displayName: "Canadian Dollar", symbol: "$", currencyCode: "CAD" } } }], rewardBalances: [{ type: "CREDIT", unit: "CENTS", value: 17e3, prettyValue: "$170.00", totalAssignedCredit: "17000", totalRedeemedCredit: "1500", prettyAssignedCredit: "$170.00", prettyRedeemedCredit: "$15.00" }, { type: "PCT_DISCOUNT", unit: "%", value: 15, prettyValue: "15%" }, { type: "CREDIT", unit: "CASH/CAD", count: 3, totalPendingCredit: 2e4, totalAssignedCredit: 3e4, totalRedeemedCredit: 1e4, totalExpiredCredit: 0, totalCancelledCredit: 0, prettyPendingCredit: "$200.00", prettyAssignedCredit: "$300.00", prettyRedeemedCredit: "$100.00", value: 3e4, prettyValue: "$300.00" }, { type: "CREDIT", unit: "CASH/USD", count: 6, totalPendingCredit: 25e3, totalAssignedCredit: 4e4, totalRedeemedCredit: 1e4, totalExpiredCredit: 15e3, totalCancelledCredit: 1e4, prettyPendingCredit: "USD250.00", prettyAssignedCredit: "USD400.00", prettyRedeemedCredit: "USD150.00", value: 4e4, prettyValue: "USD400.00" }] }, squatchJsApi = window.frameElement ? window.frameElement.squatchJsApi : {}, apolloClient = function () { var _a = widgetIdent(), e = _a.tenantAlias, t = _a.appDomain, r = _a.token; return new ApolloClient({ link: new HttpLink({ uri: t + "/api/v1/" + e + "/graphql", headers: { Authorization: "Bearer " + r } }), cache: new InMemoryCache }); }, API = { version: "Welcome to widget-host", analytics: { shareEvent: function (e) {
            var t = widgetIdent();
            if ("demo" === t.env || !t)
                return Promise.resolve({});
            var r = t.userId, n = t.accountId, _a = t.programId, i = _a === void 0 ? "classic" : _a, o = t.engagementMedium, a = { eventMeta: { id: r, accountId: n, programId: i, type: "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT", meta: { engagementMedium: o, shareMedium: e } } };
            return apolloClient().mutate({ mutation: src(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          mutation ($eventMeta: UserAnalyticsEvent!) {\n            createUserAnalyticsEvent(eventMeta: $eventMeta)\n          }\n        "], ["\n          mutation ($eventMeta: UserAnalyticsEvent!) {\n            createUserAnalyticsEvent(eventMeta: $eventMeta)\n          }\n        "]))), variables: a }).then(function (e) { return e.data.createUserAnalyticsEvent; });
        }, loadEvent: function () { return Promise.resolve({ event: "loadEvent" }); } }, graphql: { getClient: function () { return apolloClient(); }, getUserFragment: function (e, t) {
            var r = src(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          fragment UserFragment on User {\n            ", "\n          }"], ["\n          fragment UserFragment on User {\n            ", "\n          }"])), e), _a = widgetIdent(), n = _a.userId, i = _a.accountId, o = Object.assign({}, t, { userId: n, accountId: i });
            return this.getClient().query({ query: src(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n          query($userId: String!, $accountId: String!, $offset: Int) {\n            user(id: $userId, accountId: $accountId) {\n              ...UserFragment\n            }\n          }\n          ", "\n        "], ["\n          query($userId: String!, $accountId: String!, $offset: Int) {\n            user(id: $userId, accountId: $accountId) {\n              ...UserFragment\n            }\n          }\n          ", "\n        "])), r), variables: o });
        }, getShareLink: function () {
            var e = widgetIdent();
            if ("demo" === e.env || !e)
                return Promise.resolve(demoUser.shareLink);
            var t = e.userId, r = e.accountId, _a = e.programId, n = _a === void 0 ? null : _a, i = e.engagementMedium, o = { userId: t, accountId: r, programId: n, engagementMedium: i };
            return this.getClient().query({ query: src(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n          query($userId: String!, $accountId: String!, $programId: ID, $engagementMedium: UserEngagementMedium!) {\n            user(id: $userId, accountId: $accountId) {\n              shareLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: DIRECT)\n            }\n          }\n        "], ["\n          query($userId: String!, $accountId: String!, $programId: ID, $engagementMedium: UserEngagementMedium!) {\n            user(id: $userId, accountId: $accountId) {\n              shareLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: DIRECT)\n            }\n          }\n        "]))), variables: o }).then(function (e) { return e.data.user.shareLink; });
        }, getReferrals: function (e, t) {
            if (e === void 0) { e = 0; }
            if (t === void 0) { t = 3; }
            var r = widgetIdent();
            if ("demo" === r.env || !r) {
                var r_1 = demoUser.referrals, n_1 = demoUser.referredByReferral, i_1 = { referrals: { totalCount: r_1.totalCount, data: r_1.data.slice(e, e + t) }, referredByReferral: n_1 };
                return Promise.resolve(i_1);
            }
            var n = r.userId, i = r.accountId, _a = r.programId, o = _a === void 0 ? null : _a, a = { limit: t, offset: e, userId: n, accountId: i, programId: o, programId_exists: !!o };
            return this.getClient().query({ query: src(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n          query(\n            $userId: String!,\n            $accountId: String!,\n            $offset: Int!,\n            $limit: Int!,\n            $programId: ID,\n            $programId_exists: Boolean!\n          ) {\n            user(id: $userId, accountId: $accountId) {\n              referrals(limit: $limit, offset: $offset, filter: {\n                programId_eq: $programId\n                programId_exists: $programId_exists\n              }) {\n                totalCount\n                data {\n                  dateReferralStarted\n                  referredUser {\n                    firstName\n                    lastName\n                  }\n                  rewards (filter: {\n                    userId_eq: $userId\n                    accountId_eq: $accountId\n                  }) {\n                    prettyValue\n                    statuses\n                  }\n                }\n              }\n              referredByReferral(programId: $programId) {\n                referrerUser {\n                  firstName\n                  lastName\n                }\n                dateReferralStarted\n                rewards(filter: {\n                  userId_eq: $userId\n                  accountId_eq: $accountId\n                }) {\n                  prettyValue\n                  statuses\n                }\n              }\n            }\n          }\n        "], ["\n          query(\n            $userId: String!,\n            $accountId: String!,\n            $offset: Int!,\n            $limit: Int!,\n            $programId: ID,\n            $programId_exists: Boolean!\n          ) {\n            user(id: $userId, accountId: $accountId) {\n              referrals(limit: $limit, offset: $offset, filter: {\n                programId_eq: $programId\n                programId_exists: $programId_exists\n              }) {\n                totalCount\n                data {\n                  dateReferralStarted\n                  referredUser {\n                    firstName\n                    lastName\n                  }\n                  rewards (filter: {\n                    userId_eq: $userId\n                    accountId_eq: $accountId\n                  }) {\n                    prettyValue\n                    statuses\n                  }\n                }\n              }\n              referredByReferral(programId: $programId) {\n                referrerUser {\n                  firstName\n                  lastName\n                }\n                dateReferralStarted\n                rewards(filter: {\n                  userId_eq: $userId\n                  accountId_eq: $accountId\n                }) {\n                  prettyValue\n                  statuses\n                }\n              }\n            }\n          }\n        "]))), variables: a }).then(function (e) { return e.data.user; });
        }, getStats: function () {
            var e = widgetIdent();
            if ("demo" === e.env || !e) {
                var e_1 = demoUser.referrals, t_1 = demoUser.referralsMonth, r_2 = demoUser.referralsWeek, n_2 = demoUser.rewardsCount, i_2 = demoUser.rewardsMonth, o = demoUser.rewardsWeek, a = demoUser.rewardBalances, s = { referralsCount: e_1, referralsMonth: t_1, referralsWeek: r_2, rewardsCount: n_2, rewardsMonth: i_2, rewardsWeek: o, rewardBalances: a };
                return Promise.resolve(s);
            }
            var t = e.userId, r = e.accountId, _a = e.programId, n = _a === void 0 ? null : _a, i = { userId: t, accountId: r, programId: n, programId_exists: !!n };
            return this.getClient().query({ query: src(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n        query(\n          $userId: String!,\n          $accountId: String!,\n          $programId: ID,\n          $programId_exists: Boolean!\n        ) {\n          user(id: $userId, accountId: $accountId) {\n            referralsCount: referrals(filter: {\n              programId_eq: $programId\n              programId_exists: $programId_exists\n            }) {\n              totalCount\n            }\n            referralsMonth: referrals(filter: {\n              programId_eq: $programId\n              programId_exists: $programId_exists\n              dateReferralStarted_timeframe: \"this_month\"\n            }) {\n              totalCount\n            }\n            referralsWeek: referrals(filter: {\n              programId_eq: $programId\n              programId_exists: $programId_exists\n              dateReferralStarted_timeframe: \"this_week\"\n            }) {\n              totalCount\n            }\n            rewardsCount: rewards(filter: {\n              programId_eq: $programId\n              programId_exists: $programId_exists\n            }) {\n              totalCount\n            }\n            rewardsMonth: rewards(filter: {\n              programId_eq: $programId\n              programId_exists: $programId_exists\n              dateGiven_timeframe: \"this_month\"\n            }) {\n              totalCount\n            }\n            rewardsWeek: rewards(filter: {\n              programId_eq: $programId\n              programId_exists: $programId_exists\n              dateGiven_timeframe: \"this_week\"\n            }) {\n              totalCount\n            }\n            rewardBalances(programId: $programId)\n          }\n        }\n        "], ["\n        query(\n          $userId: String!,\n          $accountId: String!,\n          $programId: ID,\n          $programId_exists: Boolean!\n        ) {\n          user(id: $userId, accountId: $accountId) {\n            referralsCount: referrals(filter: {\n              programId_eq: $programId\n              programId_exists: $programId_exists\n            }) {\n              totalCount\n            }\n            referralsMonth: referrals(filter: {\n              programId_eq: $programId\n              programId_exists: $programId_exists\n              dateReferralStarted_timeframe: \"this_month\"\n            }) {\n              totalCount\n            }\n            referralsWeek: referrals(filter: {\n              programId_eq: $programId\n              programId_exists: $programId_exists\n              dateReferralStarted_timeframe: \"this_week\"\n            }) {\n              totalCount\n            }\n            rewardsCount: rewards(filter: {\n              programId_eq: $programId\n              programId_exists: $programId_exists\n            }) {\n              totalCount\n            }\n            rewardsMonth: rewards(filter: {\n              programId_eq: $programId\n              programId_exists: $programId_exists\n              dateGiven_timeframe: \"this_month\"\n            }) {\n              totalCount\n            }\n            rewardsWeek: rewards(filter: {\n              programId_eq: $programId\n              programId_exists: $programId_exists\n              dateGiven_timeframe: \"this_week\"\n            }) {\n              totalCount\n            }\n            rewardBalances(programId: $programId)\n          }\n        }\n        "]))), variables: i }).then(function (e) { return e.data.user; });
        }, getBalanceDetails: function () {
            var e = widgetIdent();
            if ("demo" === e.env || !e) {
                var e_2 = demoUser.rewardBalanceDetails, t_2 = { rewardBalanceDetails: e_2 };
                return Promise.resolve(t_2);
            }
            var t = e.userId, r = e.accountId, _a = e.programId, n = _a === void 0 ? null : _a, i = e.locale, o = { userId: t, accountId: r, programId: n, locale: i };
            return this.getClient().query({ query: src(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n        query(\n          $userId: String!,\n          $accountId: String!,\n          $programId: ID,\n          $locale: String!\n        ) {\n          user(id: $userId, accountId: $accountId) {\n            rewardBalanceDetails(programId: $programId) {\n              prettyAvailableValue\n              unit\n              ... on CreditRewardBalance {\n                prettyAssignedCredit\n                prettyRedeemedCredit\n                rewardUnit {\n                  currency {\n                    displayName(locale: $locale)\n                    symbol(locale: $locale)\n                    currencyCode\n                  }\n                }\n              }\n            }\n          }\n        }\n        "], ["\n        query(\n          $userId: String!,\n          $accountId: String!,\n          $programId: ID,\n          $locale: String!\n        ) {\n          user(id: $userId, accountId: $accountId) {\n            rewardBalanceDetails(programId: $programId) {\n              prettyAvailableValue\n              unit\n              ... on CreditRewardBalance {\n                prettyAssignedCredit\n                prettyRedeemedCredit\n                rewardUnit {\n                  currency {\n                    displayName(locale: $locale)\n                    symbol(locale: $locale)\n                    currencyCode\n                  }\n                }\n              }\n            }\n          }\n        }\n        "]))), variables: o }).then(function (e) { return e.data.user; });
        }, getRewardExpiries: function () {
            var e = widgetIdent();
            if ("demo" === e.env || !e) {
                var e_3 = demoUser.rewardBalanceDetails, t_3 = { rewardBalanceDetails: e_3 };
                return Promise.resolve(t_3);
            }
            var t = e.userId, r = e.accountId, _a = e.programId, n = _a === void 0 ? null : _a, i = e.locale, o = { userId: t, accountId: r, programId: n, locale: i };
            return this.getClient().query({ query: src(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n        query(\n          $userId: String!,\n          $accountId: String!,\n          $programId: ID,\n          $locale: String!\n        ) {\n          user(id: $userId, accountId: $accountId) {\n            rewards(programId_eq: $programId) {\n              data {\n                dateCreated\n                dateScheduledFor\n                dateExpires\n                prettyValue\n                unit\n              }\n            }\n          }\n        }\n        "], ["\n        query(\n          $userId: String!,\n          $accountId: String!,\n          $programId: ID,\n          $locale: String!\n        ) {\n          user(id: $userId, accountId: $accountId) {\n            rewards(programId_eq: $programId) {\n              data {\n                dateCreated\n                dateScheduledFor\n                dateExpires\n                prettyValue\n                unit\n              }\n            }\n          }\n        }\n        "]))), variables: o }).then(function (e) { return e.data.user; });
        }, getReferralCode: function () {
            return __awaiter(this, void 0, void 0, function () {
                var e, t, r, n, i;
                return __generator(this, function (_a) {
                    e = widgetIdent();
                    if ("demo" === e.env || !e)
                        return [2 /*return*/, demoUser.referralcode];
                    t = e.userId, r = e.accountId, n = e.programId, i = { userId: t, accountId: r, programId: n };
                    return [2 /*return*/, this.getClient().query({ query: src(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n          query($userId: String!, $accountId: String!, $programId: ID!) {\n            user(id: $userId, accountId: $accountId) {\n              referralCode(programId: $programId)\n            }\n          }\n        "], ["\n          query($userId: String!, $accountId: String!, $programId: ID!) {\n            user(id: $userId, accountId: $accountId) {\n              referralCode(programId: $programId)\n            }\n          }\n        "]))), variables: i }).then(function (e) { return e.data.user.referralCode; })];
                });
            });
        }, getFueltankCode: function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var t, r, n, i, o;
                return __generator(this, function (_a) {
                    t = widgetIdent();
                    if ("demo" === t.env || !t)
                        return [2 /*return*/, { referredByReferral: demoUser.referredByReferral, rewards: { data: demoUser.referredByReferral.rewards } }];
                    r = t.userId, n = t.accountId, i = t.programId, o = { userId: r, accountId: n, programId: i, rewardKey: e };
                    return [2 /*return*/, this.getClient().query({ query: src(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n          query($userId: String!, $accountId: String!, $programId: ID!, $rewardKey: String!) {\n            user(id: $userId, accountId: $accountId) {\n              referredByReferral (programId: $programId) {\n                referrerUser {\n                  referralCode (programId: $programId)\n                }\n              }\n              rewards (filter: {\n                programId_eq: $programId\n                programRewardKey_eq: $rewardKey\n              }) {\n                count\n                totalCount\n                data {\n                  fuelTankCode\n                }\n              }\n            }\n          }\n        "], ["\n          query($userId: String!, $accountId: String!, $programId: ID!, $rewardKey: String!) {\n            user(id: $userId, accountId: $accountId) {\n              referredByReferral (programId: $programId) {\n                referrerUser {\n                  referralCode (programId: $programId)\n                }\n              }\n              rewards (filter: {\n                programId_eq: $programId\n                programRewardKey_eq: $rewardKey\n              }) {\n                count\n                totalCount\n                data {\n                  fuelTankCode\n                }\n              }\n            }\n          }\n        "]))), variables: o }).then(function (e) { return e.data.user; })];
                });
            });
        }, getMessageLinks: function (e) {
            var t = widgetIdent();
            if ("demo" === t.env || !t)
                return Promise.resolve(demoUser.messageLink);
            var r = t.userId, n = t.accountId, _a = t.programId, i = _a === void 0 ? null : _a, o = t.engagementMedium, a = { userId: r, accountId: n, programId: i, engagementMedium: o };
            return this.getClient().query({ query: src(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n          query($userId: String!, $accountId: String!, $programId: ID, $engagementMedium: UserEngagementMedium!) {\n            user(id: $userId, accountId: $accountId) {\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n            }\n          }\n        "], ["\n          query($userId: String!, $accountId: String!, $programId: ID, $engagementMedium: UserEngagementMedium!) {\n            user(id: $userId, accountId: $accountId) {\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n              ", ":messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: ", ")\n            }\n          }\n        "])), e[0], e[0], e[1], e[1], e[2], e[2], e[3], e[3], e[4], e[4], e[5], e[5], e[6], e[6], e[7], e[7], e[8], e[8]), variables: a }).then(function (e) { return e.data.user; });
        }, getUserProgress: function () {
            var e = widgetIdent();
            if ("demo" === e.env || !e) {
                var e_4 = { customFields: { demo_totalValue: 16 }, rewardBalanceDetails: [{ prettyAvailableValue: "$10.00" }], rewards: { count: 1 } };
                return Promise.resolve(e_4);
            }
            var t = e.userId, r = e.accountId, n = e.programId, i = { userId: t, accountId: r, programId: n };
            return this.getClient().query({ query: src(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n          query($userId: String!, $accountId: String!, $programId: ID) {\n            user(id: $userId, accountId: $accountId){\n              customFields\n              rewardBalanceDetails(programId: $programId) {\n                prettyAvailableValue(formatType:UNIT_FORMATTED)\n              }\n              rewards(limit:1000,offset:0, filter:{programId_eq: $programId}){\n                count\n              }\n            }\n          }\n          "], ["\n          query($userId: String!, $accountId: String!, $programId: ID) {\n            user(id: $userId, accountId: $accountId){\n              customFields\n              rewardBalanceDetails(programId: $programId) {\n                prettyAvailableValue(formatType:UNIT_FORMATTED)\n              }\n              rewards(limit:1000,offset:0, filter:{programId_eq: $programId}){\n                count\n              }\n            }\n          }\n          "]))), variables: i }).then(function (e) { return e.data.user; });
        }, getProgramRules: function () {
            var e = widgetIdent();
            if ("demo" === e.env || !e) {
                var e_5 = { id: "demo", name: "Demo Program", rules: { programWindow: "", rewardRules: { rewardRulesType: 1, rewardGoal: 24, isRecurring: 1, defaultCurrency: "CAD" } } };
                return Promise.resolve(e_5);
            }
            var t = e.programId, r = { programId: t };
            return this.getClient().query({ query: src(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n          query($programId: ID!) {\n            program(id:$programId){\n              id\n              name\n              rules\n            }\n          }\n          "], ["\n          query($programId: ID!) {\n            program(id:$programId){\n              id\n              name\n              rules\n            }\n          }\n          "]))), variables: r }).then(function (e) { return e.data.program; });
        } }, ui: squatchJsApi };
export { API as a, widgetIdent as b };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13;
