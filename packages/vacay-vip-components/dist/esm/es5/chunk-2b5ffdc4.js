var hop = Object.prototype.hasOwnProperty;
function extend(e) { var t, r, o, n, a = Array.prototype.slice.call(arguments, 1); for (t = 0, r = a.length; t < r; t += 1)
    if (o = a[t])
        for (n in o)
            hop.call(o, n) && (e[n] = o[n]); return e; }
var realDefineProp = function () { try {
    return !!Object.defineProperty({}, "a", {});
}
catch (e) {
    return !1;
} }(), defineProperty = realDefineProp ? Object.defineProperty : function (e, t, r) { "get" in r && e.__defineGetter__ ? e.__defineGetter__(t, r.get) : (!hop.call(e, t) || "value" in r) && (e[t] = r.value); }, objCreate = Object.create || function (e, t) { var r, o; function n() { } for (o in n.prototype = e, r = new n, t)
    hop.call(t, o) && defineProperty(r, o, t[o]); return r; };
function Compiler(e, t, r) { this.locales = e, this.formats = t, this.pluralFn = r; }
function StringFormat(e) { this.id = e; }
function PluralFormat(e, t, r, o, n) { this.id = e, this.useOrdinal = t, this.offset = r, this.options = o, this.pluralFn = n; }
function PluralOffsetString(e, t, r, o) { this.id = e, this.offset = t, this.numberFormat = r, this.string = o; }
function SelectFormat(e, t) { this.id = e, this.options = t; }
Compiler.prototype.compile = function (e) { return this.pluralStack = [], this.currentPlural = null, this.pluralNumberFormat = null, this.compileMessage(e); }, Compiler.prototype.compileMessage = function (e) { if (!e || "messageFormatPattern" !== e.type)
    throw new Error('Message AST is not of type: "messageFormatPattern"'); var t, r, o, n = e.elements, a = []; for (t = 0, r = n.length; t < r; t += 1)
    switch ((o = n[t]).type) {
        case "messageTextElement":
            a.push(this.compileMessageText(o));
            break;
        case "argumentElement":
            a.push(this.compileArgument(o));
            break;
        default: throw new Error("Message element does not have a valid type");
    } return a; }, Compiler.prototype.compileMessageText = function (e) { return this.currentPlural && /(^|[^\\])#/g.test(e.value) ? (this.pluralNumberFormat || (this.pluralNumberFormat = new Intl.NumberFormat(this.locales)), new PluralOffsetString(this.currentPlural.id, this.currentPlural.format.offset, this.pluralNumberFormat, e.value)) : e.value.replace(/\\#/g, "#"); }, Compiler.prototype.compileArgument = function (e) { var t = e.format; if (!t)
    return new StringFormat(e.id); var r, o = this.formats, n = this.locales, a = this.pluralFn; switch (t.type) {
    case "numberFormat": return r = o.number[t.style], { id: e.id, format: new Intl.NumberFormat(n, r).format };
    case "dateFormat": return r = o.date[t.style], { id: e.id, format: new Intl.DateTimeFormat(n, r).format };
    case "timeFormat": return r = o.time[t.style], { id: e.id, format: new Intl.DateTimeFormat(n, r).format };
    case "pluralFormat": return r = this.compileOptions(e), new PluralFormat(e.id, t.ordinal, t.offset, r, a);
    case "selectFormat": return r = this.compileOptions(e), new SelectFormat(e.id, r);
    default: throw new Error("Message element does not have a valid format type");
} }, Compiler.prototype.compileOptions = function (e) { var t, r, o, n = e.format, a = n.options, i = {}; for (this.pluralStack.push(this.currentPlural), this.currentPlural = "pluralFormat" === n.type ? e : null, t = 0, r = a.length; t < r; t += 1)
    i[(o = a[t]).selector] = this.compileMessage(o.value); return this.currentPlural = this.pluralStack.pop(), i; }, StringFormat.prototype.format = function (e) { return e || "number" == typeof e ? "string" == typeof e ? e : String(e) : ""; }, PluralFormat.prototype.getOption = function (e) { var t = this.options; return t["=" + e] || t[this.pluralFn(e - this.offset, this.useOrdinal)] || t.other; }, PluralOffsetString.prototype.format = function (e) { var t = this.numberFormat.format(e - this.offset); return this.string.replace(/(^|[^\\])#/g, "$1" + t).replace(/\\#/g, "#"); }, SelectFormat.prototype.getOption = function (e) { var t = this.options; return t[e] || t.other; };
var parser = function () { function e(t, r, o, n) { this.message = t, this.expected = r, this.found = o, this.location = n, this.name = "SyntaxError", "function" == typeof Error.captureStackTrace && Error.captureStackTrace(this, e); } return function (e, t) { function r() { this.constructor = e; } r.prototype = t.prototype, e.prototype = new r; }(e, Error), { SyntaxError: e, parse: function (t) { var r, o = arguments.length > 1 ? arguments[1] : {}, n = {}, a = { start: Me }, i = Me, l = function (e) { return { type: "messageFormatPattern", elements: e, location: Se() }; }, s = function (e) { var t, r, o, n, a, i = ""; for (t = 0, o = e.length; t < o; t += 1)
        for (r = 0, a = (n = e[t]).length; r < a; r += 1)
            i += n[r]; return i; }, u = function (e) { return { type: "messageTextElement", value: e, location: Se() }; }, c = /^[^ \t\n\r,.+={}#]/, p = { type: "class", value: "[^ \\t\\n\\r,.+={}#]", description: "[^ \\t\\n\\r,.+={}#]" }, f = "{", m = { type: "literal", value: "{", description: '"{"' }, h = ",", d = { type: "literal", value: ",", description: '","' }, y = "}", v = { type: "literal", value: "}", description: '"}"' }, g = function (e, t) { return { type: "argumentElement", id: e, format: t && t[2], location: Se() }; }, F = "number", _ = { type: "literal", value: "number", description: '"number"' }, w = "date", b = { type: "literal", value: "date", description: '"date"' }, P = "time", R = { type: "literal", value: "time", description: '"time"' }, S = function (e, t) { return { type: e + "Format", style: t && t[2], location: Se() }; }, C = "plural", A = { type: "literal", value: "plural", description: '"plural"' }, L = function (e) { return { type: e.type, ordinal: !1, offset: e.offset || 0, options: e.options, location: Se() }; }, M = "selectordinal", E = { type: "literal", value: "selectordinal", description: '"selectordinal"' }, x = function (e) { return { type: e.type, ordinal: !0, offset: e.offset || 0, options: e.options, location: Se() }; }, T = "select", I = { type: "literal", value: "select", description: '"select"' }, O = function (e) { return { type: "selectFormat", options: e, location: Se() }; }, N = "=", j = { type: "literal", value: "=", description: '"="' }, D = function (e, t) { return { type: "optionalFormatPattern", selector: e, value: t, location: Se() }; }, $ = "offset:", k = { type: "literal", value: "offset:", description: '"offset:"' }, U = function (e) { return e; }, Y = function (e, t) { return { type: "pluralFormat", offset: e, options: t, location: Se() }; }, G = { type: "other", description: "whitespace" }, B = /^[ \t\n\r]/, J = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" }, V = { type: "other", description: "optionalWhitespace" }, Z = /^[0-9]/, z = { type: "class", value: "[0-9]", description: "[0-9]" }, W = /^[0-9a-f]/i, q = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" }, H = "0", K = { type: "literal", value: "0", description: '"0"' }, Q = /^[1-9]/, X = { type: "class", value: "[1-9]", description: "[1-9]" }, ee = function (e) { return parseInt(e, 10); }, te = /^[^{}\\\0-\x1F \t\n\r]/, re = { type: "class", value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]", description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]" }, oe = "\\\\", ne = { type: "literal", value: "\\\\", description: '"\\\\\\\\"' }, ae = function () { return "\\"; }, ie = "\\#", le = { type: "literal", value: "\\#", description: '"\\\\#"' }, se = function () { return "\\#"; }, ue = "\\{", ce = { type: "literal", value: "\\{", description: '"\\\\{"' }, pe = function () { return "{"; }, fe = "\\}", me = { type: "literal", value: "\\}", description: '"\\\\}"' }, he = function () { return "}"; }, de = "\\u", ye = { type: "literal", value: "\\u", description: '"\\\\u"' }, ve = function (e) { return String.fromCharCode(parseInt(e, 16)); }, ge = function (e) { return e.join(""); }, Fe = 0, _e = 0, we = [{ line: 1, column: 1, seenCR: !1 }], be = 0, Pe = [], Re = 0; if ("startRule" in o) {
        if (!(o.startRule in a))
            throw new Error("Can't start parsing from rule \"" + o.startRule + '".');
        i = a[o.startRule];
    } function Se() { return Ae(_e, Fe); } function Ce(e) { var r, o, n = we[e]; if (n)
        return n; for (r = e - 1; !we[r];)
        r--; for (n = { line: (n = we[r]).line, column: n.column, seenCR: n.seenCR }; r < e;)
        "\n" === (o = t.charAt(r)) ? (n.seenCR || n.line++, n.column = 1, n.seenCR = !1) : "\r" === o || "\u2028" === o || "\u2029" === o ? (n.line++, n.column = 1, n.seenCR = !0) : (n.column++, n.seenCR = !1), r++; return we[e] = n, n; } function Ae(e, t) { var r = Ce(e), o = Ce(t); return { start: { offset: e, line: r.line, column: r.column }, end: { offset: t, line: o.line, column: o.column } }; } function Le(e) { Fe < be || (Fe > be && (be = Fe, Pe = []), Pe.push(e)); } function Me() { return Ee(); } function Ee() { var e, t, r; for (e = Fe, t = [], r = xe(); r !== n;)
        t.push(r), r = xe(); return t !== n && (_e = e, t = l(t)), t; } function xe() { var e; return (e = function () { var e, r; return e = Fe, (r = function () { var e, r, o, a, i, l; if (e = Fe, r = [], o = Fe, (a = Ne()) !== n && (i = Ue()) !== n && (l = Ne()) !== n ? o = a = [a, i, l] : (Fe = o, o = n), o !== n)
        for (; o !== n;)
            r.push(o), o = Fe, (a = Ne()) !== n && (i = Ue()) !== n && (l = Ne()) !== n ? o = a = [a, i, l] : (Fe = o, o = n);
    else
        r = n; return r !== n && (_e = e, r = s(r)), (e = r) === n && (e = Fe, e = (r = Oe()) !== n ? t.substring(e, Fe) : r), e; }()) !== n && (_e = e, r = u(r)), r; }()) === n && (e = function () { var e, r, o, a, i, l, s; return e = Fe, 123 === t.charCodeAt(Fe) ? (r = f, Fe++) : (r = n, 0 === Re && Le(m)), r !== n && Ne() !== n && (o = function () { var e, r, o; if ((e = $e()) === n) {
        if (e = Fe, r = [], c.test(t.charAt(Fe)) ? (o = t.charAt(Fe), Fe++) : (o = n, 0 === Re && Le(p)), o !== n)
            for (; o !== n;)
                r.push(o), c.test(t.charAt(Fe)) ? (o = t.charAt(Fe), Fe++) : (o = n, 0 === Re && Le(p));
        else
            r = n;
        e = r !== n ? t.substring(e, Fe) : r;
    } return e; }()) !== n && Ne() !== n ? (a = Fe, 44 === t.charCodeAt(Fe) ? (i = h, Fe++) : (i = n, 0 === Re && Le(d)), i !== n && (l = Ne()) !== n && (s = function () { var e; return (e = function () { var e, r, o, a, i, l; return e = Fe, t.substr(Fe, 6) === F ? (r = F, Fe += 6) : (r = n, 0 === Re && Le(_)), r === n && (t.substr(Fe, 4) === w ? (r = w, Fe += 4) : (r = n, 0 === Re && Le(b)), r === n && (t.substr(Fe, 4) === P ? (r = P, Fe += 4) : (r = n, 0 === Re && Le(R)))), r !== n && Ne() !== n ? (o = Fe, 44 === t.charCodeAt(Fe) ? (a = h, Fe++) : (a = n, 0 === Re && Le(d)), a !== n && (i = Ne()) !== n && (l = Ue()) !== n ? o = a = [a, i, l] : (Fe = o, o = n), o === n && (o = null), o !== n ? (_e = e, e = r = S(r, o)) : (Fe = e, e = n)) : (Fe = e, e = n), e; }()) === n && (e = function () { var e, r, o, a; return e = Fe, t.substr(Fe, 6) === C ? (r = C, Fe += 6) : (r = n, 0 === Re && Le(A)), r !== n && Ne() !== n ? (44 === t.charCodeAt(Fe) ? (o = h, Fe++) : (o = n, 0 === Re && Le(d)), o !== n && Ne() !== n && (a = Ie()) !== n ? (_e = e, e = r = L(a)) : (Fe = e, e = n)) : (Fe = e, e = n), e; }()) === n && (e = function () { var e, r, o, a; return e = Fe, t.substr(Fe, 13) === M ? (r = M, Fe += 13) : (r = n, 0 === Re && Le(E)), r !== n && Ne() !== n ? (44 === t.charCodeAt(Fe) ? (o = h, Fe++) : (o = n, 0 === Re && Le(d)), o !== n && Ne() !== n && (a = Ie()) !== n ? (_e = e, e = r = x(a)) : (Fe = e, e = n)) : (Fe = e, e = n), e; }()) === n && (e = function () { var e, r, o, a, i; if (e = Fe, t.substr(Fe, 6) === T ? (r = T, Fe += 6) : (r = n, 0 === Re && Le(I)), r !== n)
        if (Ne() !== n)
            if (44 === t.charCodeAt(Fe) ? (o = h, Fe++) : (o = n, 0 === Re && Le(d)), o !== n)
                if (Ne() !== n) {
                    if (a = [], (i = Te()) !== n)
                        for (; i !== n;)
                            a.push(i), i = Te();
                    else
                        a = n;
                    a !== n ? (_e = e, e = r = O(a)) : (Fe = e, e = n);
                }
                else
                    Fe = e, e = n;
            else
                Fe = e, e = n;
        else
            Fe = e, e = n;
    else
        Fe = e, e = n; return e; }()), e; }()) !== n ? a = i = [i, l, s] : (Fe = a, a = n), a === n && (a = null), a !== n && (i = Ne()) !== n ? (125 === t.charCodeAt(Fe) ? (l = y, Fe++) : (l = n, 0 === Re && Le(v)), l !== n ? (_e = e, e = r = g(o, a)) : (Fe = e, e = n)) : (Fe = e, e = n)) : (Fe = e, e = n), e; }()), e; } function Te() { var e, r, o, a, i; return e = Fe, Ne() !== n && (r = function () { var e, r, o, a; return e = Fe, r = Fe, 61 === t.charCodeAt(Fe) ? (o = N, Fe++) : (o = n, 0 === Re && Le(j)), o !== n && (a = $e()) !== n ? r = o = [o, a] : (Fe = r, r = n), (e = r !== n ? t.substring(e, Fe) : r) === n && (e = Ue()), e; }()) !== n && Ne() !== n ? (123 === t.charCodeAt(Fe) ? (o = f, Fe++) : (o = n, 0 === Re && Le(m)), o !== n && Ne() !== n && (a = Ee()) !== n && Ne() !== n ? (125 === t.charCodeAt(Fe) ? (i = y, Fe++) : (i = n, 0 === Re && Le(v)), i !== n ? (_e = e, e = D(r, a)) : (Fe = e, e = n)) : (Fe = e, e = n)) : (Fe = e, e = n), e; } function Ie() { var e, r, o, a; if (e = Fe, (r = function () { var e, r, o; return e = Fe, t.substr(Fe, 7) === $ ? (r = $, Fe += 7) : (r = n, 0 === Re && Le(k)), r !== n && Ne() !== n && (o = $e()) !== n ? (_e = e, e = r = U(o)) : (Fe = e, e = n), e; }()) === n && (r = null), r !== n)
        if (Ne() !== n) {
            if (o = [], (a = Te()) !== n)
                for (; a !== n;)
                    o.push(a), a = Te();
            else
                o = n;
            o !== n ? (_e = e, e = r = Y(r, o)) : (Fe = e, e = n);
        }
        else
            Fe = e, e = n;
    else
        Fe = e, e = n; return e; } function Oe() { var e, r; if (Re++, e = [], B.test(t.charAt(Fe)) ? (r = t.charAt(Fe), Fe++) : (r = n, 0 === Re && Le(J)), r !== n)
        for (; r !== n;)
            e.push(r), B.test(t.charAt(Fe)) ? (r = t.charAt(Fe), Fe++) : (r = n, 0 === Re && Le(J));
    else
        e = n; return Re--, e === n && (r = n, 0 === Re && Le(G)), e; } function Ne() { var e, r, o; for (Re++, e = Fe, r = [], o = Oe(); o !== n;)
        r.push(o), o = Oe(); return e = r !== n ? t.substring(e, Fe) : r, Re--, e === n && (r = n, 0 === Re && Le(V)), e; } function je() { var e; return Z.test(t.charAt(Fe)) ? (e = t.charAt(Fe), Fe++) : (e = n, 0 === Re && Le(z)), e; } function De() { var e; return W.test(t.charAt(Fe)) ? (e = t.charAt(Fe), Fe++) : (e = n, 0 === Re && Le(q)), e; } function $e() { var e, r, o, a, i, l; if (e = Fe, 48 === t.charCodeAt(Fe) ? (r = H, Fe++) : (r = n, 0 === Re && Le(K)), r === n) {
        if (r = Fe, o = Fe, Q.test(t.charAt(Fe)) ? (a = t.charAt(Fe), Fe++) : (a = n, 0 === Re && Le(X)), a !== n) {
            for (i = [], l = je(); l !== n;)
                i.push(l), l = je();
            i !== n ? o = a = [a, i] : (Fe = o, o = n);
        }
        else
            Fe = o, o = n;
        r = o !== n ? t.substring(r, Fe) : o;
    } return r !== n && (_e = e, r = ee(r)), r; } function ke() { var e, r, o, a, i, l, s, u; return te.test(t.charAt(Fe)) ? (e = t.charAt(Fe), Fe++) : (e = n, 0 === Re && Le(re)), e === n && (e = Fe, t.substr(Fe, 2) === oe ? (r = oe, Fe += 2) : (r = n, 0 === Re && Le(ne)), r !== n && (_e = e, r = ae()), (e = r) === n && (e = Fe, t.substr(Fe, 2) === ie ? (r = ie, Fe += 2) : (r = n, 0 === Re && Le(le)), r !== n && (_e = e, r = se()), (e = r) === n && (e = Fe, t.substr(Fe, 2) === ue ? (r = ue, Fe += 2) : (r = n, 0 === Re && Le(ce)), r !== n && (_e = e, r = pe()), (e = r) === n && (e = Fe, t.substr(Fe, 2) === fe ? (r = fe, Fe += 2) : (r = n, 0 === Re && Le(me)), r !== n && (_e = e, r = he()), (e = r) === n && (e = Fe, t.substr(Fe, 2) === de ? (r = de, Fe += 2) : (r = n, 0 === Re && Le(ye)), r !== n ? (o = Fe, a = Fe, (i = De()) !== n && (l = De()) !== n && (s = De()) !== n && (u = De()) !== n ? a = i = [i, l, s, u] : (Fe = a, a = n), (o = a !== n ? t.substring(o, Fe) : a) !== n ? (_e = e, e = r = ve(o)) : (Fe = e, e = n)) : (Fe = e, e = n)))))), e; } function Ue() { var e, t, r; if (e = Fe, t = [], (r = ke()) !== n)
        for (; r !== n;)
            t.push(r), r = ke();
    else
        t = n; return t !== n && (_e = e, t = ge(t)), t; } if ((r = i()) !== n && Fe === t.length)
        return r; throw r !== n && Fe < t.length && Le({ type: "end", description: "end of input" }), function (t, r, o, n) { return null !== r && function (e) { var t = 1; for (e.sort(function (e, t) { return e.description < t.description ? -1 : e.description > t.description ? 1 : 0; }); t < e.length;)
        e[t - 1] === e[t] ? e.splice(t, 1) : t++; }(r), new e(function (e, t) { var r, o = new Array(e.length); for (r = 0; r < e.length; r++)
        o[r] = e[r].description; return "Expected " + (e.length > 1 ? o.slice(0, -1).join(", ") + " or " + o[e.length - 1] : o[0]) + " but " + (t ? '"' + function (e) { function r(e) { return e.charCodeAt(0).toString(16).toUpperCase(); } return t.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (e) { return "\\x0" + r(e); }).replace(/[\x10-\x1F\x80-\xFF]/g, function (e) { return "\\x" + r(e); }).replace(/[\u0100-\u0FFF]/g, function (e) { return "\\u0" + r(e); }).replace(/[\u1000-\uFFFF]/g, function (e) { return "\\u" + r(e); }); }() + '"' : "end of input") + " found."; }(r, o), r, o, n); }(0, Pe, be < t.length ? t.charAt(be) : null, be < t.length ? Ae(be, be + 1) : Ae(be, be)); } }; }();
function MessageFormat(e, t, r) { var o = "string" == typeof e ? MessageFormat.__parse(e) : e; if (!o || "messageFormatPattern" !== o.type)
    throw new TypeError("A message must be provided as a String or AST."); r = this._mergeFormats(MessageFormat.formats, r), defineProperty(this, "_locale", { value: this._resolveLocale(t) }); var n = this._findPluralRuleFunction(this._locale), a = this._compilePattern(o, t, r, n), i = this; this.format = function (t) { try {
    return i._format(a, t);
}
catch (t) {
    throw t.variableId ? new Error("The intl string context variable '" + t.variableId + "' was not provided to the string '" + e + "'") : t;
} }; }
defineProperty(MessageFormat, "formats", { enumerable: !0, value: { number: { currency: { style: "currency" }, percent: { style: "percent" } }, date: { short: { month: "numeric", day: "numeric", year: "2-digit" }, medium: { month: "short", day: "numeric", year: "numeric" }, long: { month: "long", day: "numeric", year: "numeric" }, full: { weekday: "long", month: "long", day: "numeric", year: "numeric" } }, time: { short: { hour: "numeric", minute: "numeric" }, medium: { hour: "numeric", minute: "numeric", second: "numeric" }, long: { hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" }, full: { hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" } } } }), defineProperty(MessageFormat, "__localeData__", { value: objCreate(null) }), defineProperty(MessageFormat, "__addLocaleData", { value: function (e) { if (!e || !e.locale)
        throw new Error("Locale data provided to IntlMessageFormat is missing a `locale` property"); MessageFormat.__localeData__[e.locale.toLowerCase()] = e; } }), defineProperty(MessageFormat, "__parse", { value: parser.parse }), defineProperty(MessageFormat, "defaultLocale", { enumerable: !0, writable: !0, value: void 0 }), MessageFormat.prototype.resolvedOptions = function () { return { locale: this._locale }; }, MessageFormat.prototype._compilePattern = function (e, t, r, o) { return new Compiler(t, r, o).compile(e); }, MessageFormat.prototype._findPluralRuleFunction = function (e) { for (var t = MessageFormat.__localeData__, r = t[e.toLowerCase()]; r;) {
    if (r.pluralRuleFunction)
        return r.pluralRuleFunction;
    r = r.parentLocale && t[r.parentLocale.toLowerCase()];
} throw new Error("Locale data added to IntlMessageFormat is missing a `pluralRuleFunction` for :" + e); }, MessageFormat.prototype._format = function (e, t) { var r, o, n, a, i, l, s = ""; for (r = 0, o = e.length; r < o; r += 1)
    if ("string" != typeof (n = e[r])) {
        if (a = n.id, !t || !hop.call(t, a))
            throw (l = new Error("A value must be provided for: " + a)).variableId = a, l;
        i = t[a], n.options ? s += this._format(n.getOption(i), t) : s += n.format(i);
    }
    else
        s += n; return s; }, MessageFormat.prototype._mergeFormats = function (e, t) { var r, o, n = {}; for (r in e)
    hop.call(e, r) && (n[r] = o = objCreate(e[r]), t && hop.call(t, r) && extend(o, t[r])); return n; }, MessageFormat.prototype._resolveLocale = function (e) { "string" == typeof e && (e = [e]), e = (e || []).concat(MessageFormat.defaultLocale); var t, r, o, n, a = MessageFormat.__localeData__; for (t = 0, r = e.length; t < r; t += 1)
    for (o = e[t].toLowerCase().split("-"); o.length;) {
        if (n = a[o.join("-")])
            return n.locale;
        o.pop();
    } var i = e.pop(); throw new Error("No locale data has been added to IntlMessageFormat for: " + e.join(", ") + ", or the default locale: " + i); };
var defaultLocale = { locale: "en", pluralRuleFunction: function (e, t) { var r = String(e).split("."), o = !r[1], n = Number(r[0]) == e, a = n && r[0].slice(-1), i = n && r[0].slice(-2); return t ? 1 == a && 11 != i ? "one" : 2 == a && 12 != i ? "two" : 3 == a && 13 != i ? "few" : "other" : 1 == e && o ? "one" : "other"; } };
MessageFormat.__addLocaleData(defaultLocale), MessageFormat.defaultLocale = "en";
var round = Math.round;
function daysToYears(e) { return 400 * e / 146097; }
function diff(e, t) { var r = round((t = +t) - (e = +e)), o = round(r / 1e3), n = round(o / 60), a = round(n / 60), i = round(a / 24), l = round(i / 7), s = daysToYears(i), u = round(12 * s), c = round(s); return { millisecond: r, second: o, "second-short": o, minute: n, "minute-short": n, hour: a, "hour-short": a, day: i, "day-short": i, week: l, "week-short": l, month: u, "month-short": u, year: c, "year-short": c }; }
var hop$1 = Object.prototype.hasOwnProperty, toString = Object.prototype.toString, realDefineProp$1 = function () { try {
    return !!Object.defineProperty({}, "a", {});
}
catch (e) {
    return !1;
} }(), defineProperty$1 = realDefineProp$1 ? Object.defineProperty : function (e, t, r) { "get" in r && e.__defineGetter__ ? e.__defineGetter__(t, r.get) : (!hop$1.call(e, t) || "value" in r) && (e[t] = r.value); }, objCreate$1 = Object.create || function (e, t) { var r, o; function n() { } for (o in n.prototype = e, r = new n, t)
    hop$1.call(t, o) && defineProperty$1(r, o, t[o]); return r; }, arrIndexOf = Array.prototype.indexOf || function (e, t) { if (!this.length)
    return -1; for (var r = t || 0, o = this.length; r < o; r++)
    if (this[r] === e)
        return r; return -1; }, isArray = Array.isArray || function (e) { return "[object Array]" === toString.call(e); }, dateNow = Date.now || function () { return (new Date).getTime(); }, FIELDS = ["second", "second-short", "minute", "minute-short", "hour", "hour-short", "day", "day-short", "month", "month-short", "year", "year-short"], STYLES = ["best fit", "numeric"];
function RelativeFormat(e, t) { t = t || {}, isArray(e) && (e = e.concat()), defineProperty$1(this, "_locale", { value: this._resolveLocale(e) }), defineProperty$1(this, "_options", { value: { style: this._resolveStyle(t.style), units: this._isValidUnits(t.units) && t.units } }), defineProperty$1(this, "_locales", { value: e }), defineProperty$1(this, "_fields", { value: this._findFields(this._locale) }), defineProperty$1(this, "_messages", { value: objCreate$1(null) }); var r = this; this.format = function (e, t) { return r._format(e, t); }; }
defineProperty$1(RelativeFormat, "__localeData__", { value: objCreate$1(null) }), defineProperty$1(RelativeFormat, "__addLocaleData", { value: function (e) { if (!e || !e.locale)
        throw new Error("Locale data provided to IntlRelativeFormat is missing a `locale` property value"); RelativeFormat.__localeData__[e.locale.toLowerCase()] = e, MessageFormat.__addLocaleData(e); } }), defineProperty$1(RelativeFormat, "defaultLocale", { enumerable: !0, writable: !0, value: void 0 }), defineProperty$1(RelativeFormat, "thresholds", { enumerable: !0, value: { second: 45, "second-short": 45, minute: 45, "minute-short": 45, hour: 22, "hour-short": 22, day: 26, "day-short": 26, month: 11, "month-short": 11 } }), RelativeFormat.prototype.resolvedOptions = function () { return { locale: this._locale, style: this._options.style, units: this._options.units }; }, RelativeFormat.prototype._compileMessage = function (e) { var t, r = this._locales, o = (this._locale, this._fields[e].relativeTime), n = "", a = ""; for (t in o.future)
    o.future.hasOwnProperty(t) && (n += " " + t + " {" + o.future[t].replace("{0}", "#") + "}"); for (t in o.past)
    o.past.hasOwnProperty(t) && (a += " " + t + " {" + o.past[t].replace("{0}", "#") + "}"); return new MessageFormat("{when, select, future {{0, plural, " + n + "}}past {{0, plural, " + a + "}}}", r); }, RelativeFormat.prototype._getMessage = function (e) { var t = this._messages; return t[e] || (t[e] = this._compileMessage(e)), t[e]; }, RelativeFormat.prototype._getRelativeUnits = function (e, t) { var r = this._fields[t]; if (r.relative)
    return r.relative[e]; }, RelativeFormat.prototype._findFields = function (e) { for (var t = RelativeFormat.__localeData__, r = t[e.toLowerCase()]; r;) {
    if (r.fields)
        return r.fields;
    r = r.parentLocale && t[r.parentLocale.toLowerCase()];
} throw new Error("Locale data added to IntlRelativeFormat is missing `fields` for :" + e); }, RelativeFormat.prototype._format = function (e, t) { var r = t && void 0 !== t.now ? t.now : dateNow(); if (void 0 === e && (e = r), !isFinite(r))
    throw new RangeError("The `now` option provided to IntlRelativeFormat#format() is not in valid range."); if (!isFinite(e))
    throw new RangeError("The date value provided to IntlRelativeFormat#format() is not in valid range."); var o = diff(r, e), n = this._options.units || this._selectUnits(o), a = o[n]; if ("numeric" !== this._options.style) {
    var i = this._getRelativeUnits(a, n);
    if (i)
        return i;
} return this._getMessage(n).format({ 0: Math.abs(a), when: a < 0 ? "past" : "future" }); }, RelativeFormat.prototype._isValidUnits = function (e) { if (!e || arrIndexOf.call(FIELDS, e) >= 0)
    return !0; if ("string" == typeof e) {
    var t = /s$/.test(e) && e.substr(0, e.length - 1);
    if (t && arrIndexOf.call(FIELDS, t) >= 0)
        throw new Error('"' + e + '" is not a valid IntlRelativeFormat `units` value, did you mean: ' + t);
} throw new Error('"' + e + '" is not a valid IntlRelativeFormat `units` value, it must be one of: "' + FIELDS.join('", "') + '"'); }, RelativeFormat.prototype._resolveLocale = function (e) { "string" == typeof e && (e = [e]), e = (e || []).concat(RelativeFormat.defaultLocale); var t, r, o, n, a = RelativeFormat.__localeData__; for (t = 0, r = e.length; t < r; t += 1)
    for (o = e[t].toLowerCase().split("-"); o.length;) {
        if (n = a[o.join("-")])
            return n.locale;
        o.pop();
    } var i = e.pop(); throw new Error("No locale data has been added to IntlRelativeFormat for: " + e.join(", ") + ", or the default locale: " + i); }, RelativeFormat.prototype._resolveStyle = function (e) { if (!e)
    return STYLES[0]; if (arrIndexOf.call(STYLES, e) >= 0)
    return e; throw new Error('"' + e + '" is not a valid IntlRelativeFormat `style` value, it must be one of: "' + STYLES.join('", "') + '"'); }, RelativeFormat.prototype._selectUnits = function (e) { var t, r, o, n = FIELDS.filter(function (e) { return e.indexOf("-short") < 1; }); for (t = 0, r = n.length; t < r && (o = n[t], !(Math.abs(e[o]) < RelativeFormat.thresholds[o])); t += 1)
    ; return o; };
var defaultLocale$1 = { locale: "en", pluralRuleFunction: function (e, t) { var r = String(e).split("."), o = !r[1], n = Number(r[0]) == e, a = n && r[0].slice(-1), i = n && r[0].slice(-2); return t ? 1 == a && 11 != i ? "one" : 2 == a && 12 != i ? "two" : 3 == a && 13 != i ? "few" : "other" : 1 == e && o ? "one" : "other"; }, fields: { year: { displayName: "year", relative: { 0: "this year", 1: "next year", "-1": "last year" }, relativeTime: { future: { one: "in {0} year", other: "in {0} years" }, past: { one: "{0} year ago", other: "{0} years ago" } } }, "year-short": { displayName: "yr.", relative: { 0: "this yr.", 1: "next yr.", "-1": "last yr." }, relativeTime: { future: { one: "in {0} yr.", other: "in {0} yr." }, past: { one: "{0} yr. ago", other: "{0} yr. ago" } } }, month: { displayName: "month", relative: { 0: "this month", 1: "next month", "-1": "last month" }, relativeTime: { future: { one: "in {0} month", other: "in {0} months" }, past: { one: "{0} month ago", other: "{0} months ago" } } }, "month-short": { displayName: "mo.", relative: { 0: "this mo.", 1: "next mo.", "-1": "last mo." }, relativeTime: { future: { one: "in {0} mo.", other: "in {0} mo." }, past: { one: "{0} mo. ago", other: "{0} mo. ago" } } }, day: { displayName: "day", relative: { 0: "today", 1: "tomorrow", "-1": "yesterday" }, relativeTime: { future: { one: "in {0} day", other: "in {0} days" }, past: { one: "{0} day ago", other: "{0} days ago" } } }, "day-short": { displayName: "day", relative: { 0: "today", 1: "tomorrow", "-1": "yesterday" }, relativeTime: { future: { one: "in {0} day", other: "in {0} days" }, past: { one: "{0} day ago", other: "{0} days ago" } } }, hour: { displayName: "hour", relative: { 0: "this hour" }, relativeTime: { future: { one: "in {0} hour", other: "in {0} hours" }, past: { one: "{0} hour ago", other: "{0} hours ago" } } }, "hour-short": { displayName: "hr.", relative: { 0: "this hour" }, relativeTime: { future: { one: "in {0} hr.", other: "in {0} hr." }, past: { one: "{0} hr. ago", other: "{0} hr. ago" } } }, minute: { displayName: "minute", relative: { 0: "this minute" }, relativeTime: { future: { one: "in {0} minute", other: "in {0} minutes" }, past: { one: "{0} minute ago", other: "{0} minutes ago" } } }, "minute-short": { displayName: "min.", relative: { 0: "this minute" }, relativeTime: { future: { one: "in {0} min.", other: "in {0} min." }, past: { one: "{0} min. ago", other: "{0} min. ago" } } }, second: { displayName: "second", relative: { 0: "now" }, relativeTime: { future: { one: "in {0} second", other: "in {0} seconds" }, past: { one: "{0} second ago", other: "{0} seconds ago" } } }, "second-short": { displayName: "sec.", relative: { 0: "now" }, relativeTime: { future: { one: "in {0} sec.", other: "in {0} sec." }, past: { one: "{0} sec. ago", other: "{0} sec. ago" } } } } };
RelativeFormat.__addLocaleData(defaultLocale$1), RelativeFormat.defaultLocale = "en";
var FormatJS = { format: function (e, t) { return new MessageFormat(e, (window.widgetIdent.locale || "en-US").replace("_", "-")).format(t); }, formatRelative: function (e) { return new RelativeFormat((window.widgetIdent.locale || "en-US").replace("_", "-")).format(e); } };
function fromPolyfillService() { if (!window.Intl) {
    var e = document.createElement("script");
    e.src = "https://polyfillz.herokuapp.com/v2/polyfill.min.js?features=Intl.~locale.en", document.getElementsByTagName("head")[0].appendChild(e);
} }
fromPolyfillService();
export { FormatJS as a };
