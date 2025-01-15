/*! For license information please see firebase-forms.js.LICENSE.txt */
!function(){var t={39386:function(t,e,n){"use strict";
/**
 * Support for translating between Uint8Array instances and JavaScript
 * native types.
 *
 * {@link module:Layout~Layout|Layout} is the basis of a class
 * hierarchy that associates property names with sequences of encoded
 * bytes.
 *
 * Layouts are supported for these scalar (numeric) types:
 * * {@link module:Layout~UInt|Unsigned integers in little-endian
 *   format} with {@link module:Layout.u8|8-bit}, {@link
 *   module:Layout.u16|16-bit}, {@link module:Layout.u24|24-bit},
 *   {@link module:Layout.u32|32-bit}, {@link
 *   module:Layout.u40|40-bit}, and {@link module:Layout.u48|48-bit}
 *   representation ranges;
 * * {@link module:Layout~UIntBE|Unsigned integers in big-endian
 *   format} with {@link module:Layout.u16be|16-bit}, {@link
 *   module:Layout.u24be|24-bit}, {@link module:Layout.u32be|32-bit},
 *   {@link module:Layout.u40be|40-bit}, and {@link
 *   module:Layout.u48be|48-bit} representation ranges;
 * * {@link module:Layout~Int|Signed integers in little-endian
 *   format} with {@link module:Layout.s8|8-bit}, {@link
 *   module:Layout.s16|16-bit}, {@link module:Layout.s24|24-bit},
 *   {@link module:Layout.s32|32-bit}, {@link
 *   module:Layout.s40|40-bit}, and {@link module:Layout.s48|48-bit}
 *   representation ranges;
 * * {@link module:Layout~IntBE|Signed integers in big-endian format}
 *   with {@link module:Layout.s16be|16-bit}, {@link
 *   module:Layout.s24be|24-bit}, {@link module:Layout.s32be|32-bit},
 *   {@link module:Layout.s40be|40-bit}, and {@link
 *   module:Layout.s48be|48-bit} representation ranges;
 * * 64-bit integral values that decode to an exact (if magnitude is
 *   less than 2^53) or nearby integral Number in {@link
 *   module:Layout.nu64|unsigned little-endian}, {@link
 *   module:Layout.nu64be|unsigned big-endian}, {@link
 *   module:Layout.ns64|signed little-endian}, and {@link
 *   module:Layout.ns64be|unsigned big-endian} encodings;
 * * 32-bit floating point values with {@link
 *   module:Layout.f32|little-endian} and {@link
 *   module:Layout.f32be|big-endian} representations;
 * * 64-bit floating point values with {@link
 *   module:Layout.f64|little-endian} and {@link
 *   module:Layout.f64be|big-endian} representations;
 * * {@link module:Layout.const|Constants} that take no space in the
 *   encoded expression.
 *
 * and for these aggregate types:
 * * {@link module:Layout.seq|Sequence}s of instances of a {@link
 *   module:Layout~Layout|Layout}, with JavaScript representation as
 *   an Array and constant or data-dependent {@link
 *   module:Layout~Sequence#count|length};
 * * {@link module:Layout.struct|Structure}s that aggregate a
 *   heterogeneous sequence of {@link module:Layout~Layout|Layout}
 *   instances, with JavaScript representation as an Object;
 * * {@link module:Layout.union|Union}s that support multiple {@link
 *   module:Layout~VariantLayout|variant layouts} over a fixed
 *   (padded) or variable (not padded) span of bytes, using an
 *   unsigned integer at the start of the data or a separate {@link
 *   module:Layout.unionLayoutDiscriminator|layout element} to
 *   determine which layout to use when interpreting the buffer
 *   contents;
 * * {@link module:Layout.bits|BitStructure}s that contain a sequence
 *   of individual {@link
 *   module:Layout~BitStructure#addField|BitField}s packed into an 8,
 *   16, 24, or 32-bit unsigned integer starting at the least- or
 *   most-significant bit;
 * * {@link module:Layout.cstr|C strings} of varying length;
 * * {@link module:Layout.blob|Blobs} of fixed- or variable-{@link
 *   module:Layout~Blob#length|length} raw data.
 *
 * All {@link module:Layout~Layout|Layout} instances are immutable
 * after construction, to prevent internal state from becoming
 * inconsistent.
 *
 * @local Layout
 * @local ExternalLayout
 * @local GreedyCount
 * @local OffsetLayout
 * @local UInt
 * @local UIntBE
 * @local Int
 * @local IntBE
 * @local NearUInt64
 * @local NearUInt64BE
 * @local NearInt64
 * @local NearInt64BE
 * @local Float
 * @local FloatBE
 * @local Double
 * @local DoubleBE
 * @local Sequence
 * @local Structure
 * @local UnionDiscriminator
 * @local UnionLayoutDiscriminator
 * @local Union
 * @local VariantLayout
 * @local BitStructure
 * @local BitField
 * @local Boolean
 * @local Blob
 * @local CString
 * @local Constant
 * @local bindConstructorLayout
 * @module Layout
 * @license MIT
 * @author Peter A. Bigot
 * @see {@link https://github.com/pabigot/buffer-layout|buffer-layout on GitHub}
 */Object.defineProperty(e,"__esModule",{value:!0}),e.s16=e.s8=e.nu64be=e.u48be=e.u40be=e.u32be=e.u24be=e.u16be=e.nu64=e.u48=e.u40=e.u32=e.u24=e.u16=e.u8=e.offset=e.greedy=e.Constant=e.UTF8=e.CString=e.Blob=e.Boolean=e.BitField=e.BitStructure=e.VariantLayout=e.Union=e.UnionLayoutDiscriminator=e.UnionDiscriminator=e.Structure=e.Sequence=e.DoubleBE=e.Double=e.FloatBE=e.Float=e.NearInt64BE=e.NearInt64=e.NearUInt64BE=e.NearUInt64=e.IntBE=e.Int=e.UIntBE=e.UInt=e.OffsetLayout=e.GreedyCount=e.ExternalLayout=e.bindConstructorLayout=e.nameWithProperty=e.Layout=e.uint8ArrayToBuffer=e.checkUint8Array=void 0,e.constant=e.utf8=e.cstr=e.blob=e.unionLayoutDiscriminator=e.union=e.seq=e.bits=e.struct=e.f64be=e.f64=e.f32be=e.f32=e.ns64be=e.s48be=e.s40be=e.s32be=e.s24be=e.s16be=e.ns64=e.s48=e.s40=e.s32=e.s24=void 0;const r=n(48764);function i(t){if(!(t instanceof Uint8Array))throw new TypeError("b must be a Uint8Array")}function o(t){return i(t),r.Buffer.from(t.buffer,t.byteOffset,t.length)}e.checkUint8Array=i,e.uint8ArrayToBuffer=o;class s{constructor(t,e){if(!Number.isInteger(t))throw new TypeError("span must be an integer");this.span=t,this.property=e}makeDestinationObject(){return{}}getSpan(t,e){if(0>this.span)throw new RangeError("indeterminate span");return this.span}replicate(t){const e=Object.create(this.constructor.prototype);return Object.assign(e,this),e.property=t,e}fromArray(t){}}function a(t,e){return e.property?t+"["+e.property+"]":t}e.Layout=s,e.nameWithProperty=a,e.bindConstructorLayout=function(t,e){if("function"!=typeof t)throw new TypeError("Class must be constructor");if(Object.prototype.hasOwnProperty.call(t,"layout_"))throw new Error("Class is already bound to a layout");if(!(e&&e instanceof s))throw new TypeError("layout must be a Layout");if(Object.prototype.hasOwnProperty.call(e,"boundConstructor_"))throw new Error("layout is already bound to a constructor");t.layout_=e,e.boundConstructor_=t,e.makeDestinationObject=()=>new t,Object.defineProperty(t.prototype,"encode",{value(t,n){return e.encode(this,t,n)},writable:!0}),Object.defineProperty(t,"decode",{value(t,n){return e.decode(t,n)},writable:!0})};class u extends s{isCount(){throw new Error("ExternalLayout is abstract")}}e.ExternalLayout=u;class c extends u{constructor(t=1,e){if(!Number.isInteger(t)||0>=t)throw new TypeError("elementSpan must be a (positive) integer");super(-1,e),this.elementSpan=t}isCount(){return!0}decode(t,e=0){i(t);const n=t.length-e;return Math.floor(n/this.elementSpan)}encode(t,e,n){return 0}}e.GreedyCount=c;class l extends u{constructor(t,e=0,n){if(!(t instanceof s))throw new TypeError("layout must be a Layout");if(!Number.isInteger(e))throw new TypeError("offset must be integer or undefined");super(t.span,n||t.property),this.layout=t,this.offset=e}isCount(){return this.layout instanceof h||this.layout instanceof f}decode(t,e=0){return this.layout.decode(t,e+this.offset)}encode(t,e,n=0){return this.layout.encode(t,e,n+this.offset)}}e.OffsetLayout=l;class h extends s{constructor(t,e){if(super(t,e),6<this.span)throw new RangeError("span must not exceed 6 bytes")}decode(t,e=0){return o(t).readUIntLE(e,this.span)}encode(t,e,n=0){return o(e).writeUIntLE(t,n,this.span),this.span}}e.UInt=h;class f extends s{constructor(t,e){if(super(t,e),6<this.span)throw new RangeError("span must not exceed 6 bytes")}decode(t,e=0){return o(t).readUIntBE(e,this.span)}encode(t,e,n=0){return o(e).writeUIntBE(t,n,this.span),this.span}}e.UIntBE=f;class d extends s{constructor(t,e){if(super(t,e),6<this.span)throw new RangeError("span must not exceed 6 bytes")}decode(t,e=0){return o(t).readIntLE(e,this.span)}encode(t,e,n=0){return o(e).writeIntLE(t,n,this.span),this.span}}e.Int=d;class p extends s{constructor(t,e){if(super(t,e),6<this.span)throw new RangeError("span must not exceed 6 bytes")}decode(t,e=0){return o(t).readIntBE(e,this.span)}encode(t,e,n=0){return o(e).writeIntBE(t,n,this.span),this.span}}e.IntBE=p;const g=Math.pow(2,32);function m(t){const e=Math.floor(t/g);return{hi32:e,lo32:t-e*g}}function y(t,e){return t*g+e}class v extends s{constructor(t){super(8,t)}decode(t,e=0){const n=o(t),r=n.readUInt32LE(e);return y(n.readUInt32LE(e+4),r)}encode(t,e,n=0){const r=m(t),i=o(e);return i.writeUInt32LE(r.lo32,n),i.writeUInt32LE(r.hi32,n+4),8}}e.NearUInt64=v;class b extends s{constructor(t){super(8,t)}decode(t,e=0){const n=o(t);return y(n.readUInt32BE(e),n.readUInt32BE(e+4))}encode(t,e,n=0){const r=m(t),i=o(e);return i.writeUInt32BE(r.hi32,n),i.writeUInt32BE(r.lo32,n+4),8}}e.NearUInt64BE=b;class w extends s{constructor(t){super(8,t)}decode(t,e=0){const n=o(t),r=n.readUInt32LE(e);return y(n.readInt32LE(e+4),r)}encode(t,e,n=0){const r=m(t),i=o(e);return i.writeUInt32LE(r.lo32,n),i.writeInt32LE(r.hi32,n+4),8}}e.NearInt64=w;class E extends s{constructor(t){super(8,t)}decode(t,e=0){const n=o(t);return y(n.readInt32BE(e),n.readUInt32BE(e+4))}encode(t,e,n=0){const r=m(t),i=o(e);return i.writeInt32BE(r.hi32,n),i.writeUInt32BE(r.lo32,n+4),8}}e.NearInt64BE=E;class I extends s{constructor(t){super(4,t)}decode(t,e=0){return o(t).readFloatLE(e)}encode(t,e,n=0){return o(e).writeFloatLE(t,n),4}}e.Float=I;class S extends s{constructor(t){super(4,t)}decode(t,e=0){return o(t).readFloatBE(e)}encode(t,e,n=0){return o(e).writeFloatBE(t,n),4}}e.FloatBE=S;class _ extends s{constructor(t){super(8,t)}decode(t,e=0){return o(t).readDoubleLE(e)}encode(t,e,n=0){return o(e).writeDoubleLE(t,n),8}}e.Double=_;class k extends s{constructor(t){super(8,t)}decode(t,e=0){return o(t).readDoubleBE(e)}encode(t,e,n=0){return o(e).writeDoubleBE(t,n),8}}e.DoubleBE=k;class A extends s{constructor(t,e,n){if(!(t instanceof s))throw new TypeError("elementLayout must be a Layout");if(!(e instanceof u&&e.isCount()||Number.isInteger(e)&&0<=e))throw new TypeError("count must be non-negative integer or an unsigned integer ExternalLayout");let r=-1;!(e instanceof u)&&0<t.span&&(r=e*t.span),super(r,n),this.elementLayout=t,this.count=e}getSpan(t,e=0){if(0<=this.span)return this.span;let n=0,r=this.count;if(r instanceof u&&(r=r.decode(t,e)),0<this.elementLayout.span)n=r*this.elementLayout.span;else{let i=0;for(;i<r;)n+=this.elementLayout.getSpan(t,e+n),++i}return n}decode(t,e=0){const n=[];let r=0,i=this.count;for(i instanceof u&&(i=i.decode(t,e));r<i;)n.push(this.elementLayout.decode(t,e)),e+=this.elementLayout.getSpan(t,e),r+=1;return n}encode(t,e,n=0){const r=this.elementLayout,i=t.reduce(((t,i)=>t+r.encode(i,e,n+t)),0);return this.count instanceof u&&this.count.encode(t.length,e,n),i}}e.Sequence=A;class T extends s{constructor(t,e,n){if(!Array.isArray(t)||!t.reduce(((t,e)=>t&&e instanceof s),!0))throw new TypeError("fields must be array of Layout instances");"boolean"==typeof e&&void 0===n&&(n=e,e=void 0);for(const e of t)if(0>e.span&&void 0===e.property)throw new Error("fields cannot contain unnamed variable-length layout");let r=-1;try{r=t.reduce(((t,e)=>t+e.getSpan()),0)}catch(t){}super(r,e),this.fields=t,this.decodePrefixes=!!n}getSpan(t,e=0){if(0<=this.span)return this.span;let n=0;try{n=this.fields.reduce(((n,r)=>{const i=r.getSpan(t,e);return e+=i,n+i}),0)}catch(t){throw new RangeError("indeterminate span")}return n}decode(t,e=0){i(t);const n=this.makeDestinationObject();for(const r of this.fields)if(void 0!==r.property&&(n[r.property]=r.decode(t,e)),e+=r.getSpan(t,e),this.decodePrefixes&&t.length===e)break;return n}encode(t,e,n=0){const r=n;let i=0,o=0;for(const r of this.fields){let s=r.span;if(o=0<s?s:0,void 0!==r.property){const i=t[r.property];void 0!==i&&(o=r.encode(i,e,n),0>s&&(s=r.getSpan(e,n)))}i=n,n+=s}return i+o-r}fromArray(t){const e=this.makeDestinationObject();for(const n of this.fields)void 0!==n.property&&0<t.length&&(e[n.property]=t.shift());return e}layoutFor(t){if("string"!=typeof t)throw new TypeError("property must be string");for(const e of this.fields)if(e.property===t)return e}offsetOf(t){if("string"!=typeof t)throw new TypeError("property must be string");let e=0;for(const n of this.fields){if(n.property===t)return e;0>n.span?e=-1:0<=e&&(e+=n.span)}}}e.Structure=T;class x{constructor(t){this.property=t}decode(t,e){throw new Error("UnionDiscriminator is abstract")}encode(t,e,n){throw new Error("UnionDiscriminator is abstract")}}e.UnionDiscriminator=x;class O extends x{constructor(t,e){if(!(t instanceof u&&t.isCount()))throw new TypeError("layout must be an unsigned integer ExternalLayout");super(e||t.property||"variant"),this.layout=t}decode(t,e){return this.layout.decode(t,e)}encode(t,e,n){return this.layout.encode(t,e,n)}}e.UnionLayoutDiscriminator=O;class R extends s{constructor(t,e,n){let r;if(t instanceof h||t instanceof f)r=new O(new l(t));else if(t instanceof u&&t.isCount())r=new O(t);else{if(!(t instanceof x))throw new TypeError("discr must be a UnionDiscriminator or an unsigned integer layout");r=t}if(void 0===e&&(e=null),!(null===e||e instanceof s))throw new TypeError("defaultLayout must be null or a Layout");if(null!==e){if(0>e.span)throw new Error("defaultLayout must have constant span");void 0===e.property&&(e=e.replicate("content"))}let i=-1;e&&(i=e.span,0<=i&&(t instanceof h||t instanceof f)&&(i+=r.layout.span)),super(i,n),this.discriminator=r,this.usesPrefixDiscriminator=t instanceof h||t instanceof f,this.defaultLayout=e,this.registry={};let o=this.defaultGetSourceVariant.bind(this);this.getSourceVariant=function(t){return o(t)},this.configGetSourceVariant=function(t){o=t.bind(this)}}getSpan(t,e=0){if(0<=this.span)return this.span;const n=this.getVariant(t,e);if(!n)throw new Error("unable to determine span for unrecognized variant");return n.getSpan(t,e)}defaultGetSourceVariant(t){if(Object.prototype.hasOwnProperty.call(t,this.discriminator.property)){if(this.defaultLayout&&this.defaultLayout.property&&Object.prototype.hasOwnProperty.call(t,this.defaultLayout.property))return;const e=this.registry[t[this.discriminator.property]];if(e&&(!e.layout||e.property&&Object.prototype.hasOwnProperty.call(t,e.property)))return e}else for(const e in this.registry){const n=this.registry[e];if(n.property&&Object.prototype.hasOwnProperty.call(t,n.property))return n}throw new Error("unable to infer src variant")}decode(t,e=0){let n;const r=this.discriminator,i=r.decode(t,e),o=this.registry[i];if(void 0===o){const o=this.defaultLayout;let s=0;this.usesPrefixDiscriminator&&(s=r.layout.span),n=this.makeDestinationObject(),n[r.property]=i,n[o.property]=o.decode(t,e+s)}else n=o.decode(t,e);return n}encode(t,e,n=0){const r=this.getSourceVariant(t);if(void 0===r){const r=this.discriminator,i=this.defaultLayout;let o=0;return this.usesPrefixDiscriminator&&(o=r.layout.span),r.encode(t[r.property],e,n),o+i.encode(t[i.property],e,n+o)}return r.encode(t,e,n)}addVariant(t,e,n){const r=new M(this,t,e,n);return this.registry[t]=r,r}getVariant(t,e=0){let n;return n=t instanceof Uint8Array?this.discriminator.decode(t,e):t,this.registry[n]}}e.Union=R;class M extends s{constructor(t,e,n,r){if(!(t instanceof R))throw new TypeError("union must be a Union");if(!Number.isInteger(e)||0>e)throw new TypeError("variant must be a (non-negative) integer");if("string"==typeof n&&void 0===r&&(r=n,n=null),n){if(!(n instanceof s))throw new TypeError("layout must be a Layout");if(null!==t.defaultLayout&&0<=n.span&&n.span>t.defaultLayout.span)throw new Error("variant span exceeds span of containing union");if("string"!=typeof r)throw new TypeError("variant must have a String property")}let i=t.span;0>t.span&&(i=n?n.span:0,0<=i&&t.usesPrefixDiscriminator&&(i+=t.discriminator.layout.span)),super(i,r),this.union=t,this.variant=e,this.layout=n||null}getSpan(t,e=0){if(0<=this.span)return this.span;let n=0;this.union.usesPrefixDiscriminator&&(n=this.union.discriminator.layout.span);let r=0;return this.layout&&(r=this.layout.getSpan(t,e+n)),n+r}decode(t,e=0){const n=this.makeDestinationObject();if(this!==this.union.getVariant(t,e))throw new Error("variant mismatch");let r=0;return this.union.usesPrefixDiscriminator&&(r=this.union.discriminator.layout.span),this.layout?n[this.property]=this.layout.decode(t,e+r):this.property?n[this.property]=!0:this.union.usesPrefixDiscriminator&&(n[this.union.discriminator.property]=this.variant),n}encode(t,e,n=0){let r=0;if(this.union.usesPrefixDiscriminator&&(r=this.union.discriminator.layout.span),this.layout&&!Object.prototype.hasOwnProperty.call(t,this.property))throw new TypeError("variant lacks property "+this.property);this.union.discriminator.encode(this.variant,e,n);let i=r;if(this.layout&&(this.layout.encode(t[this.property],e,n+r),i+=this.layout.getSpan(e,n+r),0<=this.union.span&&i>this.union.span))throw new Error("encoded variant overruns containing union");return i}fromArray(t){if(this.layout)return this.layout.fromArray(t)}}function P(t){return 0>t&&(t+=4294967296),t}e.VariantLayout=M;class C extends s{constructor(t,e,n){if(!(t instanceof h||t instanceof f))throw new TypeError("word must be a UInt or UIntBE layout");if("string"==typeof e&&void 0===n&&(n=e,e=!1),4<t.span)throw new RangeError("word cannot exceed 32 bits");super(t.span,n),this.word=t,this.msb=!!e,this.fields=[];let r=0;this._packedSetValue=function(t){return r=P(t),this},this._packedGetValue=function(){return r}}decode(t,e=0){const n=this.makeDestinationObject(),r=this.word.decode(t,e);this._packedSetValue(r);for(const e of this.fields)void 0!==e.property&&(n[e.property]=e.decode(t));return n}encode(t,e,n=0){const r=this.word.decode(e,n);this._packedSetValue(r);for(const e of this.fields)if(void 0!==e.property){const n=t[e.property];void 0!==n&&e.encode(n)}return this.word.encode(this._packedGetValue(),e,n)}addField(t,e){const n=new N(this,t,e);return this.fields.push(n),n}addBoolean(t){const e=new L(this,t);return this.fields.push(e),e}fieldFor(t){if("string"!=typeof t)throw new TypeError("property must be string");for(const e of this.fields)if(e.property===t)return e}}e.BitStructure=C;class N{constructor(t,e,n){if(!(t instanceof C))throw new TypeError("container must be a BitStructure");if(!Number.isInteger(e)||0>=e)throw new TypeError("bits must be positive integer");const r=8*t.span,i=t.fields.reduce(((t,e)=>t+e.bits),0);if(e+i>r)throw new Error("bits too long for span remainder ("+(r-i)+" of "+r+" remain)");this.container=t,this.bits=e,this.valueMask=(1<<e)-1,32===e&&(this.valueMask=4294967295),this.start=i,this.container.msb&&(this.start=r-i-e),this.wordMask=P(this.valueMask<<this.start),this.property=n}decode(t,e){return P(this.container._packedGetValue()&this.wordMask)>>>this.start}encode(t){if("number"!=typeof t||!Number.isInteger(t)||t!==P(t&this.valueMask))throw new TypeError(a("BitField.encode",this)+" value must be integer not exceeding "+this.valueMask);const e=this.container._packedGetValue(),n=P(t<<this.start);this.container._packedSetValue(P(e&~this.wordMask)|n)}}e.BitField=N;class L extends N{constructor(t,e){super(t,1,e)}decode(t,e){return!!super.decode(t,e)}encode(t){"boolean"==typeof t&&(t=+t),super.encode(t)}}e.Boolean=L;class B extends s{constructor(t,e){if(!(t instanceof u&&t.isCount()||Number.isInteger(t)&&0<=t))throw new TypeError("length must be positive integer or an unsigned integer ExternalLayout");let n=-1;t instanceof u||(n=t),super(n,e),this.length=t}getSpan(t,e){let n=this.span;return 0>n&&(n=this.length.decode(t,e)),n}decode(t,e=0){let n=this.span;return 0>n&&(n=this.length.decode(t,e)),o(t).slice(e,e+n)}encode(t,e,n){let r=this.length;if(this.length instanceof u&&(r=t.length),!(t instanceof Uint8Array&&r===t.length))throw new TypeError(a("Blob.encode",this)+" requires (length "+r+") Uint8Array as src");if(n+r>e.length)throw new RangeError("encoding overruns Uint8Array");const i=o(t);return o(e).write(i.toString("hex"),n,r,"hex"),this.length instanceof u&&this.length.encode(r,e,n),r}}e.Blob=B;class D extends s{constructor(t){super(-1,t)}getSpan(t,e=0){i(t);let n=e;for(;n<t.length&&0!==t[n];)n+=1;return 1+n-e}decode(t,e=0){const n=this.getSpan(t,e);return o(t).slice(e,e+n-1).toString("utf-8")}encode(t,e,n=0){"string"!=typeof t&&(t=String(t));const i=r.Buffer.from(t,"utf8"),s=i.length;if(n+s>e.length)throw new RangeError("encoding overruns Buffer");const a=o(e);return i.copy(a,n),a[n+s]=0,s+1}}e.CString=D;class U extends s{constructor(t,e){if("string"==typeof t&&void 0===e&&(e=t,t=void 0),void 0===t)t=-1;else if(!Number.isInteger(t))throw new TypeError("maxSpan must be an integer");super(-1,e),this.maxSpan=t}getSpan(t,e=0){return i(t),t.length-e}decode(t,e=0){const n=this.getSpan(t,e);if(0<=this.maxSpan&&this.maxSpan<n)throw new RangeError("text length exceeds maxSpan");return o(t).slice(e,e+n).toString("utf-8")}encode(t,e,n=0){"string"!=typeof t&&(t=String(t));const i=r.Buffer.from(t,"utf8"),s=i.length;if(0<=this.maxSpan&&this.maxSpan<s)throw new RangeError("text length exceeds maxSpan");if(n+s>e.length)throw new RangeError("encoding overruns Buffer");return i.copy(o(e),n),s}}e.UTF8=U;class j extends s{constructor(t,e){super(0,e),this.value=t}decode(t,e){return this.value}encode(t,e,n){return 0}}e.Constant=j,e.greedy=(t,e)=>new c(t,e),e.offset=(t,e,n)=>new l(t,e,n),e.u8=t=>new h(1,t),e.u16=t=>new h(2,t),e.u24=t=>new h(3,t),e.u32=t=>new h(4,t),e.u40=t=>new h(5,t),e.u48=t=>new h(6,t),e.nu64=t=>new v(t),e.u16be=t=>new f(2,t),e.u24be=t=>new f(3,t),e.u32be=t=>new f(4,t),e.u40be=t=>new f(5,t),e.u48be=t=>new f(6,t),e.nu64be=t=>new b(t),e.s8=t=>new d(1,t),e.s16=t=>new d(2,t),e.s24=t=>new d(3,t),e.s32=t=>new d(4,t),e.s40=t=>new d(5,t),e.s48=t=>new d(6,t),e.ns64=t=>new w(t),e.s16be=t=>new p(2,t),e.s24be=t=>new p(3,t),e.s32be=t=>new p(4,t),e.s40be=t=>new p(5,t),e.s48be=t=>new p(6,t),e.ns64be=t=>new E(t),e.f32=t=>new I(t),e.f32be=t=>new S(t),e.f64=t=>new _(t),e.f64be=t=>new k(t),e.struct=(t,e,n)=>new T(t,e,n),e.bits=(t,e,n)=>new C(t,e,n),e.seq=(t,e,n)=>new A(t,e,n),e.union=(t,e,n)=>new R(t,e,n),e.unionLayoutDiscriminator=(t,e)=>new O(t,e),e.blob=(t,e)=>new B(t,e),e.cstr=t=>new D(t),e.utf8=(t,e)=>new U(t,e),e.constant=(t,e)=>new j(t,e)},69282:function(t,e,n){"use strict";var r=n(34155),i=n(25108);function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(i=r.key,s=void 0,s=function(t,e){if("object"!==o(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!==o(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(i,"string"),"symbol"===o(s)?s:String(s)),r)}var i,s}function a(t,e,n){return e&&s(t.prototype,e),n&&s(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}var u,c,l=n(62136).codes,h=l.ERR_AMBIGUOUS_ARGUMENT,f=l.ERR_INVALID_ARG_TYPE,d=l.ERR_INVALID_ARG_VALUE,p=l.ERR_INVALID_RETURN_VALUE,g=l.ERR_MISSING_ARGS,m=n(25961),y=n(89539).inspect,v=n(89539).types,b=v.isPromise,w=v.isRegExp,E=n(28162)(),I=n(75624)(),S=n(21924)("RegExp.prototype.test");new Map;function _(){var t=n(19158);u=t.isDeepEqual,c=t.isDeepStrictEqual}var k=!1,A=t.exports=R,T={};function x(t){if(t.message instanceof Error)throw t.message;throw new m(t)}function O(t,e,n,r){if(!n){var i=!1;if(0===e)i=!0,r="No value argument passed to `assert.ok()`";else if(r instanceof Error)throw r;var o=new m({actual:n,expected:!0,message:r,operator:"==",stackStartFn:t});throw o.generatedMessage=i,o}}function R(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];O.apply(void 0,[R,e.length].concat(e))}A.fail=function t(e,n,o,s,a){var u,c=arguments.length;if(0===c)u="Failed";else if(1===c)o=e,e=void 0;else{if(!1===k)k=!0,(r.emitWarning?r.emitWarning:i.warn.bind(i))("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.","DeprecationWarning","DEP0094");2===c&&(s="!=")}if(o instanceof Error)throw o;var l={actual:e,expected:n,operator:void 0===s?"fail":s,stackStartFn:a||t};void 0!==o&&(l.message=o);var h=new m(l);throw u&&(h.message=u,h.generatedMessage=!0),h},A.AssertionError=m,A.ok=R,A.equal=function t(e,n,r){if(arguments.length<2)throw new g("actual","expected");e!=n&&x({actual:e,expected:n,message:r,operator:"==",stackStartFn:t})},A.notEqual=function t(e,n,r){if(arguments.length<2)throw new g("actual","expected");e==n&&x({actual:e,expected:n,message:r,operator:"!=",stackStartFn:t})},A.deepEqual=function t(e,n,r){if(arguments.length<2)throw new g("actual","expected");void 0===u&&_(),u(e,n)||x({actual:e,expected:n,message:r,operator:"deepEqual",stackStartFn:t})},A.notDeepEqual=function t(e,n,r){if(arguments.length<2)throw new g("actual","expected");void 0===u&&_(),u(e,n)&&x({actual:e,expected:n,message:r,operator:"notDeepEqual",stackStartFn:t})},A.deepStrictEqual=function t(e,n,r){if(arguments.length<2)throw new g("actual","expected");void 0===u&&_(),c(e,n)||x({actual:e,expected:n,message:r,operator:"deepStrictEqual",stackStartFn:t})},A.notDeepStrictEqual=function t(e,n,r){if(arguments.length<2)throw new g("actual","expected");void 0===u&&_();c(e,n)&&x({actual:e,expected:n,message:r,operator:"notDeepStrictEqual",stackStartFn:t})},A.strictEqual=function t(e,n,r){if(arguments.length<2)throw new g("actual","expected");I(e,n)||x({actual:e,expected:n,message:r,operator:"strictEqual",stackStartFn:t})},A.notStrictEqual=function t(e,n,r){if(arguments.length<2)throw new g("actual","expected");I(e,n)&&x({actual:e,expected:n,message:r,operator:"notStrictEqual",stackStartFn:t})};var M=a((function t(e,n,r){var i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n.forEach((function(t){t in e&&(void 0!==r&&"string"==typeof r[t]&&w(e[t])&&S(e[t],r[t])?i[t]=r[t]:i[t]=e[t])}))}));function P(t,e,n,r){if("function"!=typeof e){if(w(e))return S(e,t);if(2===arguments.length)throw new f("expected",["Function","RegExp"],e);if("object"!==o(t)||null===t){var i=new m({actual:t,expected:e,message:n,operator:"deepStrictEqual",stackStartFn:r});throw i.operator=r.name,i}var s=Object.keys(e);if(e instanceof Error)s.push("name","message");else if(0===s.length)throw new d("error",e,"may not be an empty object");return void 0===u&&_(),s.forEach((function(i){"string"==typeof t[i]&&w(e[i])&&S(e[i],t[i])||function(t,e,n,r,i,o){if(!(n in t)||!c(t[n],e[n])){if(!r){var s=new M(t,i),a=new M(e,i,t),u=new m({actual:s,expected:a,operator:"deepStrictEqual",stackStartFn:o});throw u.actual=t,u.expected=e,u.operator=o.name,u}x({actual:t,expected:e,message:r,operator:o.name,stackStartFn:o})}}(t,e,i,n,s,r)})),!0}return void 0!==e.prototype&&t instanceof e||!Error.isPrototypeOf(e)&&!0===e.call({},t)}function C(t){if("function"!=typeof t)throw new f("fn","Function",t);try{t()}catch(t){return t}return T}function N(t){return b(t)||null!==t&&"object"===o(t)&&"function"==typeof t.then&&"function"==typeof t.catch}function L(t){return Promise.resolve().then((function(){var e;if("function"==typeof t){if(!N(e=t()))throw new p("instance of Promise","promiseFn",e)}else{if(!N(t))throw new f("promiseFn",["Function","Promise"],t);e=t}return Promise.resolve().then((function(){return e})).then((function(){return T})).catch((function(t){return t}))}))}function B(t,e,n,r){if("string"==typeof n){if(4===arguments.length)throw new f("error",["Object","Error","Function","RegExp"],n);if("object"===o(e)&&null!==e){if(e.message===n)throw new h("error/message",'The error message "'.concat(e.message,'" is identical to the message.'))}else if(e===n)throw new h("error/message",'The error "'.concat(e,'" is identical to the message.'));r=n,n=void 0}else if(null!=n&&"object"!==o(n)&&"function"!=typeof n)throw new f("error",["Object","Error","Function","RegExp"],n);if(e===T){var i="";n&&n.name&&(i+=" (".concat(n.name,")")),i+=r?": ".concat(r):".";var s="rejects"===t.name?"rejection":"exception";x({actual:void 0,expected:n,operator:t.name,message:"Missing expected ".concat(s).concat(i),stackStartFn:t})}if(n&&!P(e,n,r,t))throw e}function D(t,e,n,r){if(e!==T){if("string"==typeof n&&(r=n,n=void 0),!n||P(e,n)){var i=r?": ".concat(r):".",o="doesNotReject"===t.name?"rejection":"exception";x({actual:e,expected:n,operator:t.name,message:"Got unwanted ".concat(o).concat(i,"\n")+'Actual message: "'.concat(e&&e.message,'"'),stackStartFn:t})}throw e}}function U(t,e,n,r,i){if(!w(e))throw new f("regexp","RegExp",e);var s="match"===i;if("string"!=typeof t||S(e,t)!==s){if(n instanceof Error)throw n;var a=!n;n=n||("string"!=typeof t?'The "string" argument must be of type string. Received type '+"".concat(o(t)," (").concat(y(t),")"):(s?"The input did not match the regular expression ":"The input was expected to not match the regular expression ")+"".concat(y(e),". Input:\n\n").concat(y(t),"\n"));var u=new m({actual:t,expected:e,message:n,operator:i,stackStartFn:r});throw u.generatedMessage=a,u}}function j(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];O.apply(void 0,[j,e.length].concat(e))}A.throws=function t(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];B.apply(void 0,[t,C(e)].concat(r))},A.rejects=function t(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return L(e).then((function(e){return B.apply(void 0,[t,e].concat(r))}))},A.doesNotThrow=function t(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];D.apply(void 0,[t,C(e)].concat(r))},A.doesNotReject=function t(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return L(e).then((function(e){return D.apply(void 0,[t,e].concat(r))}))},A.ifError=function t(e){if(null!=e){var n="ifError got unwanted exception: ";"object"===o(e)&&"string"==typeof e.message?0===e.message.length&&e.constructor?n+=e.constructor.name:n+=e.message:n+=y(e);var r=new m({actual:e,expected:null,operator:"ifError",message:n,stackStartFn:t}),i=e.stack;if("string"==typeof i){var s=i.split("\n");s.shift();for(var a=r.stack.split("\n"),u=0;u<s.length;u++){var c=a.indexOf(s[u]);if(-1!==c){a=a.slice(0,c);break}}r.stack="".concat(a.join("\n"),"\n").concat(s.join("\n"))}throw r}},A.match=function t(e,n,r){U(e,n,r,t,"match")},A.doesNotMatch=function t(e,n,r){U(e,n,r,t,"doesNotMatch")},A.strict=E(j,A,{equal:A.strictEqual,deepEqual:A.deepStrictEqual,notEqual:A.notStrictEqual,notDeepEqual:A.notDeepStrictEqual}),A.strict.strict=A.strict},25961:function(t,e,n){"use strict";var r=n(34155);function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e,n){return(e=u(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,u(r.key),r)}}function u(t){var e=function(t,e){if("object"!==m(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!==m(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===m(e)?e:String(e)}function c(t,e){if(e&&("object"===m(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return l(t)}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function h(t){var e="function"==typeof Map?new Map:void 0;return h=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return f(t,arguments,g(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),p(r,t)},h(t)}function f(t,e,n){return f=d()?Reflect.construct.bind():function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&p(i,n.prototype),i},f.apply(null,arguments)}function d(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function p(t,e){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},p(t,e)}function g(t){return g=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},g(t)}function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}var y=n(89539).inspect,v=n(62136).codes.ERR_INVALID_ARG_TYPE;function b(t,e,n){return(void 0===n||n>t.length)&&(n=t.length),t.substring(n-e.length,n)===e}var w="",E="",I="",S="",_={deepStrictEqual:"Expected values to be strictly deep-equal:",strictEqual:"Expected values to be strictly equal:",strictEqualObject:'Expected "actual" to be reference-equal to "expected":',deepEqual:"Expected values to be loosely deep-equal:",equal:"Expected values to be loosely equal:",notDeepStrictEqual:'Expected "actual" not to be strictly deep-equal to:',notStrictEqual:'Expected "actual" to be strictly unequal to:',notStrictEqualObject:'Expected "actual" not to be reference-equal to "expected":',notDeepEqual:'Expected "actual" not to be loosely deep-equal to:',notEqual:'Expected "actual" to be loosely unequal to:',notIdentical:"Values identical but not reference-equal:"};function k(t){var e=Object.keys(t),n=Object.create(Object.getPrototypeOf(t));return e.forEach((function(e){n[e]=t[e]})),Object.defineProperty(n,"message",{value:t.message}),n}function A(t){return y(t,{compact:!1,customInspect:!1,depth:1e3,maxArrayLength:1/0,showHidden:!1,breakLength:1/0,showProxy:!1,sorted:!0,getters:!0})}function T(t,e,n){var i="",o="",s=0,a="",u=!1,c=A(t),l=c.split("\n"),h=A(e).split("\n"),f=0,d="";if("strictEqual"===n&&"object"===m(t)&&"object"===m(e)&&null!==t&&null!==e&&(n="strictEqualObject"),1===l.length&&1===h.length&&l[0]!==h[0]){var p=l[0].length+h[0].length;if(p<=10){if(!("object"===m(t)&&null!==t||"object"===m(e)&&null!==e||0===t&&0===e))return"".concat(_[n],"\n\n")+"".concat(l[0]," !== ").concat(h[0],"\n")}else if("strictEqualObject"!==n){if(p<(r.stderr&&r.stderr.isTTY?r.stderr.columns:80)){for(;l[0][f]===h[0][f];)f++;f>2&&(d="\n  ".concat(function(t,e){if(e=Math.floor(e),0==t.length||0==e)return"";var n=t.length*e;for(e=Math.floor(Math.log(e)/Math.log(2));e;)t+=t,e--;return t+t.substring(0,n-t.length)}(" ",f),"^"),f=0)}}}for(var g=l[l.length-1],y=h[h.length-1];g===y&&(f++<2?a="\n  ".concat(g).concat(a):i=g,l.pop(),h.pop(),0!==l.length&&0!==h.length);)g=l[l.length-1],y=h[h.length-1];var v=Math.max(l.length,h.length);if(0===v){var k=c.split("\n");if(k.length>30)for(k[26]="".concat(w,"...").concat(S);k.length>27;)k.pop();return"".concat(_.notIdentical,"\n\n").concat(k.join("\n"),"\n")}f>3&&(a="\n".concat(w,"...").concat(S).concat(a),u=!0),""!==i&&(a="\n  ".concat(i).concat(a),i="");var T=0,x=_[n]+"\n".concat(E,"+ actual").concat(S," ").concat(I,"- expected").concat(S),O=" ".concat(w,"...").concat(S," Lines skipped");for(f=0;f<v;f++){var R=f-s;if(l.length<f+1)R>1&&f>2&&(R>4?(o+="\n".concat(w,"...").concat(S),u=!0):R>3&&(o+="\n  ".concat(h[f-2]),T++),o+="\n  ".concat(h[f-1]),T++),s=f,i+="\n".concat(I,"-").concat(S," ").concat(h[f]),T++;else if(h.length<f+1)R>1&&f>2&&(R>4?(o+="\n".concat(w,"...").concat(S),u=!0):R>3&&(o+="\n  ".concat(l[f-2]),T++),o+="\n  ".concat(l[f-1]),T++),s=f,o+="\n".concat(E,"+").concat(S," ").concat(l[f]),T++;else{var M=h[f],P=l[f],C=P!==M&&(!b(P,",")||P.slice(0,-1)!==M);C&&b(M,",")&&M.slice(0,-1)===P&&(C=!1,P+=","),C?(R>1&&f>2&&(R>4?(o+="\n".concat(w,"...").concat(S),u=!0):R>3&&(o+="\n  ".concat(l[f-2]),T++),o+="\n  ".concat(l[f-1]),T++),s=f,o+="\n".concat(E,"+").concat(S," ").concat(P),i+="\n".concat(I,"-").concat(S," ").concat(M),T+=2):(o+=i,i="",1!==R&&0!==f||(o+="\n  ".concat(P),T++))}if(T>20&&f<v-2)return"".concat(x).concat(O,"\n").concat(o,"\n").concat(w,"...").concat(S).concat(i,"\n")+"".concat(w,"...").concat(S)}return"".concat(x).concat(u?O:"","\n").concat(o).concat(i).concat(a).concat(d)}var x=function(t,e){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&p(t,e)}(b,t);var n,i,s,u,h,f=(n=b,i=d(),function(){var t,e=g(n);if(i){var r=g(this).constructor;t=Reflect.construct(e,arguments,r)}else t=e.apply(this,arguments);return c(this,t)});function b(t){var e;if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,b),"object"!==m(t)||null===t)throw new v("options","Object",t);var n=t.message,i=t.operator,o=t.stackStartFn,s=t.actual,a=t.expected,u=Error.stackTraceLimit;if(Error.stackTraceLimit=0,null!=n)e=f.call(this,String(n));else if(r.stderr&&r.stderr.isTTY&&(r.stderr&&r.stderr.getColorDepth&&1!==r.stderr.getColorDepth()?(w="[34m",E="[32m",S="[39m",I="[31m"):(w="",E="",S="",I="")),"object"===m(s)&&null!==s&&"object"===m(a)&&null!==a&&"stack"in s&&s instanceof Error&&"stack"in a&&a instanceof Error&&(s=k(s),a=k(a)),"deepStrictEqual"===i||"strictEqual"===i)e=f.call(this,T(s,a,i));else if("notDeepStrictEqual"===i||"notStrictEqual"===i){var h=_[i],d=A(s).split("\n");if("notStrictEqual"===i&&"object"===m(s)&&null!==s&&(h=_.notStrictEqualObject),d.length>30)for(d[26]="".concat(w,"...").concat(S);d.length>27;)d.pop();e=1===d.length?f.call(this,"".concat(h," ").concat(d[0])):f.call(this,"".concat(h,"\n\n").concat(d.join("\n"),"\n"))}else{var p=A(s),g="",y=_[i];"notDeepEqual"===i||"notEqual"===i?(p="".concat(_[i],"\n\n").concat(p)).length>1024&&(p="".concat(p.slice(0,1021),"...")):(g="".concat(A(a)),p.length>512&&(p="".concat(p.slice(0,509),"...")),g.length>512&&(g="".concat(g.slice(0,509),"...")),"deepEqual"===i||"equal"===i?p="".concat(y,"\n\n").concat(p,"\n\nshould equal\n\n"):g=" ".concat(i," ").concat(g)),e=f.call(this,"".concat(p).concat(g))}return Error.stackTraceLimit=u,e.generatedMessage=!n,Object.defineProperty(l(e),"name",{value:"AssertionError [ERR_ASSERTION]",enumerable:!1,writable:!0,configurable:!0}),e.code="ERR_ASSERTION",e.actual=s,e.expected=a,e.operator=i,Error.captureStackTrace&&Error.captureStackTrace(l(e),o),e.stack,e.name="AssertionError",c(e)}return s=b,(u=[{key:"toString",value:function(){return"".concat(this.name," [").concat(this.code,"]: ").concat(this.message)}},{key:e,value:function(t,e){return y(this,o(o({},e),{},{customInspect:!1,depth:0}))}}])&&a(s.prototype,u),h&&a(s,h),Object.defineProperty(s,"prototype",{writable:!1}),b}(h(Error),y.custom);t.exports=x},62136:function(t,e,n){"use strict";function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,(o=i.key,s=void 0,s=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,e||"default");if("object"!==r(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(o,"string"),"symbol"===r(s)?s:String(s)),i)}var o,s}function o(t,e){return o=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},o(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return function(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,n)}}function a(t){return a=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},a(t)}var u,c,l={};function h(t,e,n){n||(n=Error);var r=function(n){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&o(t,e)}(l,n);var r,a,u,c=s(l);function l(n,r,i){var o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),o=c.call(this,function(t,n,r){return"string"==typeof e?e:e(t,n,r)}(n,r,i)),o.code=t,o}return r=l,a&&i(r.prototype,a),u&&i(r,u),Object.defineProperty(r,"prototype",{writable:!1}),r}(n);l[t]=r}function f(t,e){if(Array.isArray(t)){var n=t.length;return t=t.map((function(t){return String(t)})),n>2?"one of ".concat(e," ").concat(t.slice(0,n-1).join(", "),", or ")+t[n-1]:2===n?"one of ".concat(e," ").concat(t[0]," or ").concat(t[1]):"of ".concat(e," ").concat(t[0])}return"of ".concat(e," ").concat(String(t))}h("ERR_AMBIGUOUS_ARGUMENT",'The "%s" argument is ambiguous. %s',TypeError),h("ERR_INVALID_ARG_TYPE",(function(t,e,i){var o,s,a,c;if(void 0===u&&(u=n(69282)),u("string"==typeof t,"'name' must be a string"),"string"==typeof e&&(s="not ",e.substr(!a||a<0?0:+a,s.length)===s)?(o="must not be",e=e.replace(/^not /,"")):o="must be",function(t,e,n){return(void 0===n||n>t.length)&&(n=t.length),t.substring(n-e.length,n)===e}(t," argument"))c="The ".concat(t," ").concat(o," ").concat(f(e,"type"));else{var l=function(t,e,n){return"number"!=typeof n&&(n=0),!(n+e.length>t.length)&&-1!==t.indexOf(e,n)}(t,".")?"property":"argument";c='The "'.concat(t,'" ').concat(l," ").concat(o," ").concat(f(e,"type"))}return c+=". Received type ".concat(r(i))}),TypeError),h("ERR_INVALID_ARG_VALUE",(function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"is invalid";void 0===c&&(c=n(89539));var i=c.inspect(e);return i.length>128&&(i="".concat(i.slice(0,128),"...")),"The argument '".concat(t,"' ").concat(r,". Received ").concat(i)}),TypeError,RangeError),h("ERR_INVALID_RETURN_VALUE",(function(t,e,n){var i;return i=n&&n.constructor&&n.constructor.name?"instance of ".concat(n.constructor.name):"type ".concat(r(n)),"Expected ".concat(t,' to be returned from the "').concat(e,'"')+" function but got ".concat(i,".")}),TypeError),h("ERR_MISSING_ARGS",(function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];void 0===u&&(u=n(69282)),u(e.length>0,"At least one arg needs to be specified");var i="The ",o=e.length;switch(e=e.map((function(t){return'"'.concat(t,'"')})),o){case 1:i+="".concat(e[0]," argument");break;case 2:i+="".concat(e[0]," and ").concat(e[1]," arguments");break;default:i+=e.slice(0,o-1).join(", "),i+=", and ".concat(e[o-1]," arguments")}return"".concat(i," must be specified")}),TypeError),t.exports.codes=l},19158:function(t,e,n){"use strict";function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,i,o,s,a=[],u=!0,c=!1;try{if(o=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=o.call(n)).done)&&(a.push(r.value),a.length!==e);u=!0);}catch(t){c=!0,i=t}finally{try{if(!u&&null!=n.return&&(s=n.return(),Object(s)!==s))return}finally{if(c)throw i}}return a}}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}var s=void 0!==/a/g.flags,a=function(t){var e=[];return t.forEach((function(t){return e.push(t)})),e},u=function(t){var e=[];return t.forEach((function(t,n){return e.push([n,t])})),e},c=Object.is?Object.is:n(20609),l=Object.getOwnPropertySymbols?Object.getOwnPropertySymbols:function(){return[]},h=Number.isNaN?Number.isNaN:n(20360);function f(t){return t.call.bind(t)}var d=f(Object.prototype.hasOwnProperty),p=f(Object.prototype.propertyIsEnumerable),g=f(Object.prototype.toString),m=n(89539).types,y=m.isAnyArrayBuffer,v=m.isArrayBufferView,b=m.isDate,w=m.isMap,E=m.isRegExp,I=m.isSet,S=m.isNativeError,_=m.isBoxedPrimitive,k=m.isNumberObject,A=m.isStringObject,T=m.isBooleanObject,x=m.isBigIntObject,O=m.isSymbolObject,R=m.isFloat32Array,M=m.isFloat64Array;function P(t){if(0===t.length||t.length>10)return!0;for(var e=0;e<t.length;e++){var n=t.charCodeAt(e);if(n<48||n>57)return!0}return 10===t.length&&t>=Math.pow(2,32)}function C(t){return Object.keys(t).filter(P).concat(l(t).filter(Object.prototype.propertyIsEnumerable.bind(t)))}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */function N(t,e){if(t===e)return 0;for(var n=t.length,r=e.length,i=0,o=Math.min(n,r);i<o;++i)if(t[i]!==e[i]){n=t[i],r=e[i];break}return n<r?-1:r<n?1:0}var L=0,B=1,D=2,U=3;function j(t,e,n,r){if(t===e)return 0!==t||(!n||c(t,e));if(n){if("object"!==o(t))return"number"==typeof t&&h(t)&&h(e);if("object"!==o(e)||null===t||null===e)return!1;if(Object.getPrototypeOf(t)!==Object.getPrototypeOf(e))return!1}else{if(null===t||"object"!==o(t))return(null===e||"object"!==o(e))&&t==e;if(null===e||"object"!==o(e))return!1}var i,a,u,l,f=g(t);if(f!==g(e))return!1;if(Array.isArray(t)){if(t.length!==e.length)return!1;var d=C(t),p=C(e);return d.length===p.length&&V(t,e,n,r,B,d)}if("[object Object]"===f&&(!w(t)&&w(e)||!I(t)&&I(e)))return!1;if(b(t)){if(!b(e)||Date.prototype.getTime.call(t)!==Date.prototype.getTime.call(e))return!1}else if(E(t)){if(!E(e)||(u=t,l=e,!(s?u.source===l.source&&u.flags===l.flags:RegExp.prototype.toString.call(u)===RegExp.prototype.toString.call(l))))return!1}else if(S(t)||t instanceof Error){if(t.message!==e.message||t.name!==e.name)return!1}else{if(v(t)){if(n||!R(t)&&!M(t)){if(!function(t,e){return t.byteLength===e.byteLength&&0===N(new Uint8Array(t.buffer,t.byteOffset,t.byteLength),new Uint8Array(e.buffer,e.byteOffset,e.byteLength))}(t,e))return!1}else if(!function(t,e){if(t.byteLength!==e.byteLength)return!1;for(var n=0;n<t.byteLength;n++)if(t[n]!==e[n])return!1;return!0}(t,e))return!1;var m=C(t),P=C(e);return m.length===P.length&&V(t,e,n,r,L,m)}if(I(t))return!(!I(e)||t.size!==e.size)&&V(t,e,n,r,D);if(w(t))return!(!w(e)||t.size!==e.size)&&V(t,e,n,r,U);if(y(t)){if(a=e,(i=t).byteLength!==a.byteLength||0!==N(new Uint8Array(i),new Uint8Array(a)))return!1}else if(_(t)&&!function(t,e){return k(t)?k(e)&&c(Number.prototype.valueOf.call(t),Number.prototype.valueOf.call(e)):A(t)?A(e)&&String.prototype.valueOf.call(t)===String.prototype.valueOf.call(e):T(t)?T(e)&&Boolean.prototype.valueOf.call(t)===Boolean.prototype.valueOf.call(e):x(t)?x(e)&&BigInt.prototype.valueOf.call(t)===BigInt.prototype.valueOf.call(e):O(e)&&Symbol.prototype.valueOf.call(t)===Symbol.prototype.valueOf.call(e)}(t,e))return!1}return V(t,e,n,r,L)}function F(t,e){return e.filter((function(e){return p(t,e)}))}function V(t,e,n,i,s,c){if(5===arguments.length){c=Object.keys(t);var h=Object.keys(e);if(c.length!==h.length)return!1}for(var f=0;f<c.length;f++)if(!d(e,c[f]))return!1;if(n&&5===arguments.length){var g=l(t);if(0!==g.length){var m=0;for(f=0;f<g.length;f++){var y=g[f];if(p(t,y)){if(!p(e,y))return!1;c.push(y),m++}else if(p(e,y))return!1}var v=l(e);if(g.length!==v.length&&F(e,v).length!==m)return!1}else{var b=l(e);if(0!==b.length&&0!==F(e,b).length)return!1}}if(0===c.length&&(s===L||s===B&&0===t.length||0===t.size))return!0;if(void 0===i)i={val1:new Map,val2:new Map,position:0};else{var w=i.val1.get(t);if(void 0!==w){var E=i.val2.get(e);if(void 0!==E)return w===E}i.position++}i.val1.set(t,i.position),i.val2.set(e,i.position);var I=function(t,e,n,i,s,c){var l=0;if(c===D){if(!function(t,e,n,r){for(var i=null,s=a(t),u=0;u<s.length;u++){var c=s[u];if("object"===o(c)&&null!==c)null===i&&(i=new Set),i.add(c);else if(!e.has(c)){if(n)return!1;if(!$(t,e,c))return!1;null===i&&(i=new Set),i.add(c)}}if(null!==i){for(var l=a(e),h=0;h<l.length;h++){var f=l[h];if("object"===o(f)&&null!==f){if(!z(i,f,n,r))return!1}else if(!n&&!t.has(f)&&!z(i,f,n,r))return!1}return 0===i.size}return!0}(t,e,n,s))return!1}else if(c===U){if(!function(t,e,n,i){for(var s=null,a=u(t),c=0;c<a.length;c++){var l=r(a[c],2),h=l[0],f=l[1];if("object"===o(h)&&null!==h)null===s&&(s=new Set),s.add(h);else{var d=e.get(h);if(void 0===d&&!e.has(h)||!j(f,d,n,i)){if(n)return!1;if(!W(t,e,h,f,i))return!1;null===s&&(s=new Set),s.add(h)}}}if(null!==s){for(var p=u(e),g=0;g<p.length;g++){var m=r(p[g],2),y=m[0],v=m[1];if("object"===o(y)&&null!==y){if(!H(s,t,y,v,n,i))return!1}else if(!(n||t.has(y)&&j(t.get(y),v,!1,i)||H(s,t,y,v,!1,i)))return!1}return 0===s.size}return!0}(t,e,n,s))return!1}else if(c===B)for(;l<t.length;l++){if(!d(t,l)){if(d(e,l))return!1;for(var h=Object.keys(t);l<h.length;l++){var f=h[l];if(!d(e,f)||!j(t[f],e[f],n,s))return!1}return h.length===Object.keys(e).length}if(!d(e,l)||!j(t[l],e[l],n,s))return!1}for(l=0;l<i.length;l++){var p=i[l];if(!j(t[p],e[p],n,s))return!1}return!0}(t,e,n,c,i,s);return i.val1.delete(t),i.val2.delete(e),I}function z(t,e,n,r){for(var i=a(t),o=0;o<i.length;o++){var s=i[o];if(j(e,s,n,r))return t.delete(s),!0}return!1}function q(t){switch(o(t)){case"undefined":return null;case"object":return;case"symbol":return!1;case"string":t=+t;case"number":if(h(t))return!1}return!0}function $(t,e,n){var r=q(n);return null!=r?r:e.has(r)&&!t.has(r)}function W(t,e,n,r,i){var o=q(n);if(null!=o)return o;var s=e.get(o);return!(void 0===s&&!e.has(o)||!j(r,s,!1,i))&&(!t.has(o)&&j(r,s,!1,i))}function H(t,e,n,r,i,o){for(var s=a(t),u=0;u<s.length;u++){var c=s[u];if(j(n,c,i,o)&&j(r,e.get(c),i,o))return t.delete(c),!0}return!1}t.exports={isDeepEqual:function(t,e){return j(t,e,false)},isDeepStrictEqual:function(t,e){return j(t,e,true)}}},58162:function(t,e,n){"use strict";var r=n(89509).Buffer;t.exports=function(t){if(t.length>=255)throw new TypeError("Alphabet too long");for(var e=new Uint8Array(256),n=0;n<e.length;n++)e[n]=255;for(var i=0;i<t.length;i++){var o=t.charAt(i),s=o.charCodeAt(0);if(255!==e[s])throw new TypeError(o+" is ambiguous");e[s]=i}var a=t.length,u=t.charAt(0),c=Math.log(a)/Math.log(256),l=Math.log(256)/Math.log(a);function h(t){if("string"!=typeof t)throw new TypeError("Expected String");if(0===t.length)return r.alloc(0);for(var n=0,i=0,o=0;t[n]===u;)i++,n++;for(var s=(t.length-n)*c+1>>>0,l=new Uint8Array(s);t[n];){var h=e[t.charCodeAt(n)];if(255===h)return;for(var f=0,d=s-1;(0!==h||f<o)&&-1!==d;d--,f++)h+=a*l[d]>>>0,l[d]=h%256>>>0,h=h/256>>>0;if(0!==h)throw new Error("Non-zero carry");o=f,n++}for(var p=s-o;p!==s&&0===l[p];)p++;var g=r.allocUnsafe(i+(s-p));g.fill(0,0,i);for(var m=i;p!==s;)g[m++]=l[p++];return g}return{encode:function(e){if((Array.isArray(e)||e instanceof Uint8Array)&&(e=r.from(e)),!r.isBuffer(e))throw new TypeError("Expected Buffer");if(0===e.length)return"";for(var n=0,i=0,o=0,s=e.length;o!==s&&0===e[o];)o++,n++;for(var c=(s-o)*l+1>>>0,h=new Uint8Array(c);o!==s;){for(var f=e[o],d=0,p=c-1;(0!==f||d<i)&&-1!==p;p--,d++)f+=256*h[p]>>>0,h[p]=f%a>>>0,f=f/a>>>0;if(0!==f)throw new Error("Non-zero carry");i=d,o++}for(var g=c-i;g!==c&&0===h[g];)g++;for(var m=u.repeat(n);g<c;++g)m+=t.charAt(h[g]);return m},decodeUnsafe:h,decode:function(t){var e=h(t);if(e)return e;throw new Error("Non-base"+a+" character")}}}},79742:function(t,e){"use strict";e.byteLength=function(t){var e=a(t),n=e[0],r=e[1];return 3*(n+r)/4-r},e.toByteArray=function(t){var e,n,o=a(t),s=o[0],u=o[1],c=new i(function(t,e,n){return 3*(e+n)/4-n}(0,s,u)),l=0,h=u>0?s-4:s;for(n=0;n<h;n+=4)e=r[t.charCodeAt(n)]<<18|r[t.charCodeAt(n+1)]<<12|r[t.charCodeAt(n+2)]<<6|r[t.charCodeAt(n+3)],c[l++]=e>>16&255,c[l++]=e>>8&255,c[l++]=255&e;2===u&&(e=r[t.charCodeAt(n)]<<2|r[t.charCodeAt(n+1)]>>4,c[l++]=255&e);1===u&&(e=r[t.charCodeAt(n)]<<10|r[t.charCodeAt(n+1)]<<4|r[t.charCodeAt(n+2)]>>2,c[l++]=e>>8&255,c[l++]=255&e);return c},e.fromByteArray=function(t){for(var e,r=t.length,i=r%3,o=[],s=16383,a=0,c=r-i;a<c;a+=s)o.push(u(t,a,a+s>c?c:a+s));1===i?(e=t[r-1],o.push(n[e>>2]+n[e<<4&63]+"==")):2===i&&(e=(t[r-2]<<8)+t[r-1],o.push(n[e>>10]+n[e>>4&63]+n[e<<2&63]+"="));return o.join("")};for(var n=[],r=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=0;s<64;++s)n[s]=o[s],r[o.charCodeAt(s)]=s;function a(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var n=t.indexOf("=");return-1===n&&(n=e),[n,n===e?0:4-n%4]}function u(t,e,r){for(var i,o,s=[],a=e;a<r;a+=3)i=(t[a]<<16&16711680)+(t[a+1]<<8&65280)+(255&t[a+2]),s.push(n[(o=i)>>18&63]+n[o>>12&63]+n[o>>6&63]+n[63&o]);return s.join("")}r["-".charCodeAt(0)]=62,r["_".charCodeAt(0)]=63},40475:function(t,e,n){"use strict";var r=n(48764).Buffer;Object.defineProperty(e,"__esModule",{value:!0}),e.toBigIntLE=function(t){{const e=r.from(t);e.reverse();const n=e.toString("hex");return 0===n.length?BigInt(0):BigInt(`0x${n}`)}},e.toBigIntBE=function(t){{const e=t.toString("hex");return 0===e.length?BigInt(0):BigInt(`0x${e}`)}},e.toBufferLE=function(t,e){{const n=t.toString(16),i=r.from(n.padStart(2*e,"0").slice(0,2*e),"hex");return i.reverse(),i}},e.toBufferBE=function(t,e){{const n=t.toString(16);return r.from(n.padStart(2*e,"0").slice(0,2*e),"hex")}}},13550:function(t,e,n){!function(t,e){"use strict";function r(t,e){if(!t)throw new Error(e||"Assertion failed")}function i(t,e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}function o(t,e,n){if(o.isBN(t))return t;this.negative=0,this.words=null,this.length=0,this.red=null,null!==t&&("le"!==e&&"be"!==e||(n=e,e=10),this._init(t||0,e||10,n||"be"))}var s;"object"==typeof t?t.exports=o:e.BN=o,o.BN=o,o.wordSize=26;try{s="undefined"!=typeof window&&void 0!==window.Buffer?window.Buffer:n(46601).Buffer}catch(t){}function a(t,e){var n=t.charCodeAt(e);return n>=48&&n<=57?n-48:n>=65&&n<=70?n-55:n>=97&&n<=102?n-87:void r(!1,"Invalid character in "+t)}function u(t,e,n){var r=a(t,n);return n-1>=e&&(r|=a(t,n-1)<<4),r}function c(t,e,n,i){for(var o=0,s=0,a=Math.min(t.length,n),u=e;u<a;u++){var c=t.charCodeAt(u)-48;o*=i,s=c>=49?c-49+10:c>=17?c-17+10:c,r(c>=0&&s<i,"Invalid character"),o+=s}return o}function l(t,e){t.words=e.words,t.length=e.length,t.negative=e.negative,t.red=e.red}if(o.isBN=function(t){return t instanceof o||null!==t&&"object"==typeof t&&t.constructor.wordSize===o.wordSize&&Array.isArray(t.words)},o.max=function(t,e){return t.cmp(e)>0?t:e},o.min=function(t,e){return t.cmp(e)<0?t:e},o.prototype._init=function(t,e,n){if("number"==typeof t)return this._initNumber(t,e,n);if("object"==typeof t)return this._initArray(t,e,n);"hex"===e&&(e=16),r(e===(0|e)&&e>=2&&e<=36);var i=0;"-"===(t=t.toString().replace(/\s+/g,""))[0]&&(i++,this.negative=1),i<t.length&&(16===e?this._parseHex(t,i,n):(this._parseBase(t,e,i),"le"===n&&this._initArray(this.toArray(),e,n)))},o.prototype._initNumber=function(t,e,n){t<0&&(this.negative=1,t=-t),t<67108864?(this.words=[67108863&t],this.length=1):t<4503599627370496?(this.words=[67108863&t,t/67108864&67108863],this.length=2):(r(t<9007199254740992),this.words=[67108863&t,t/67108864&67108863,1],this.length=3),"le"===n&&this._initArray(this.toArray(),e,n)},o.prototype._initArray=function(t,e,n){if(r("number"==typeof t.length),t.length<=0)return this.words=[0],this.length=1,this;this.length=Math.ceil(t.length/3),this.words=new Array(this.length);for(var i=0;i<this.length;i++)this.words[i]=0;var o,s,a=0;if("be"===n)for(i=t.length-1,o=0;i>=0;i-=3)s=t[i]|t[i-1]<<8|t[i-2]<<16,this.words[o]|=s<<a&67108863,this.words[o+1]=s>>>26-a&67108863,(a+=24)>=26&&(a-=26,o++);else if("le"===n)for(i=0,o=0;i<t.length;i+=3)s=t[i]|t[i+1]<<8|t[i+2]<<16,this.words[o]|=s<<a&67108863,this.words[o+1]=s>>>26-a&67108863,(a+=24)>=26&&(a-=26,o++);return this._strip()},o.prototype._parseHex=function(t,e,n){this.length=Math.ceil((t.length-e)/6),this.words=new Array(this.length);for(var r=0;r<this.length;r++)this.words[r]=0;var i,o=0,s=0;if("be"===n)for(r=t.length-1;r>=e;r-=2)i=u(t,e,r)<<o,this.words[s]|=67108863&i,o>=18?(o-=18,s+=1,this.words[s]|=i>>>26):o+=8;else for(r=(t.length-e)%2==0?e+1:e;r<t.length;r+=2)i=u(t,e,r)<<o,this.words[s]|=67108863&i,o>=18?(o-=18,s+=1,this.words[s]|=i>>>26):o+=8;this._strip()},o.prototype._parseBase=function(t,e,n){this.words=[0],this.length=1;for(var r=0,i=1;i<=67108863;i*=e)r++;r--,i=i/e|0;for(var o=t.length-n,s=o%r,a=Math.min(o,o-s)+n,u=0,l=n;l<a;l+=r)u=c(t,l,l+r,e),this.imuln(i),this.words[0]+u<67108864?this.words[0]+=u:this._iaddn(u);if(0!==s){var h=1;for(u=c(t,l,t.length,e),l=0;l<s;l++)h*=e;this.imuln(h),this.words[0]+u<67108864?this.words[0]+=u:this._iaddn(u)}this._strip()},o.prototype.copy=function(t){t.words=new Array(this.length);for(var e=0;e<this.length;e++)t.words[e]=this.words[e];t.length=this.length,t.negative=this.negative,t.red=this.red},o.prototype._move=function(t){l(t,this)},o.prototype.clone=function(){var t=new o(null);return this.copy(t),t},o.prototype._expand=function(t){for(;this.length<t;)this.words[this.length++]=0;return this},o.prototype._strip=function(){for(;this.length>1&&0===this.words[this.length-1];)this.length--;return this._normSign()},o.prototype._normSign=function(){return 1===this.length&&0===this.words[0]&&(this.negative=0),this},"undefined"!=typeof Symbol&&"function"==typeof Symbol.for)try{o.prototype[Symbol.for("nodejs.util.inspect.custom")]=h}catch(t){o.prototype.inspect=h}else o.prototype.inspect=h;function h(){return(this.red?"<BN-R: ":"<BN: ")+this.toString(16)+">"}var f=["","0","00","000","0000","00000","000000","0000000","00000000","000000000","0000000000","00000000000","000000000000","0000000000000","00000000000000","000000000000000","0000000000000000","00000000000000000","000000000000000000","0000000000000000000","00000000000000000000","000000000000000000000","0000000000000000000000","00000000000000000000000","000000000000000000000000","0000000000000000000000000"],d=[0,0,25,16,12,11,10,9,8,8,7,7,7,7,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],p=[0,0,33554432,43046721,16777216,48828125,60466176,40353607,16777216,43046721,1e7,19487171,35831808,62748517,7529536,11390625,16777216,24137569,34012224,47045881,64e6,4084101,5153632,6436343,7962624,9765625,11881376,14348907,17210368,20511149,243e5,28629151,33554432,39135393,45435424,52521875,60466176];o.prototype.toString=function(t,e){var n;if(e=0|e||1,16===(t=t||10)||"hex"===t){n="";for(var i=0,o=0,s=0;s<this.length;s++){var a=this.words[s],u=(16777215&(a<<i|o)).toString(16);o=a>>>24-i&16777215,(i+=2)>=26&&(i-=26,s--),n=0!==o||s!==this.length-1?f[6-u.length]+u+n:u+n}for(0!==o&&(n=o.toString(16)+n);n.length%e!=0;)n="0"+n;return 0!==this.negative&&(n="-"+n),n}if(t===(0|t)&&t>=2&&t<=36){var c=d[t],l=p[t];n="";var h=this.clone();for(h.negative=0;!h.isZero();){var g=h.modrn(l).toString(t);n=(h=h.idivn(l)).isZero()?g+n:f[c-g.length]+g+n}for(this.isZero()&&(n="0"+n);n.length%e!=0;)n="0"+n;return 0!==this.negative&&(n="-"+n),n}r(!1,"Base should be between 2 and 36")},o.prototype.toNumber=function(){var t=this.words[0];return 2===this.length?t+=67108864*this.words[1]:3===this.length&&1===this.words[2]?t+=4503599627370496+67108864*this.words[1]:this.length>2&&r(!1,"Number can only safely store up to 53 bits"),0!==this.negative?-t:t},o.prototype.toJSON=function(){return this.toString(16,2)},s&&(o.prototype.toBuffer=function(t,e){return this.toArrayLike(s,t,e)}),o.prototype.toArray=function(t,e){return this.toArrayLike(Array,t,e)};function g(t,e,n){n.negative=e.negative^t.negative;var r=t.length+e.length|0;n.length=r,r=r-1|0;var i=0|t.words[0],o=0|e.words[0],s=i*o,a=67108863&s,u=s/67108864|0;n.words[0]=a;for(var c=1;c<r;c++){for(var l=u>>>26,h=67108863&u,f=Math.min(c,e.length-1),d=Math.max(0,c-t.length+1);d<=f;d++){var p=c-d|0;l+=(s=(i=0|t.words[p])*(o=0|e.words[d])+h)/67108864|0,h=67108863&s}n.words[c]=0|h,u=0|l}return 0!==u?n.words[c]=0|u:n.length--,n._strip()}o.prototype.toArrayLike=function(t,e,n){this._strip();var i=this.byteLength(),o=n||Math.max(1,i);r(i<=o,"byte array longer than desired length"),r(o>0,"Requested array length <= 0");var s=function(t,e){return t.allocUnsafe?t.allocUnsafe(e):new t(e)}(t,o);return this["_toArrayLike"+("le"===e?"LE":"BE")](s,i),s},o.prototype._toArrayLikeLE=function(t,e){for(var n=0,r=0,i=0,o=0;i<this.length;i++){var s=this.words[i]<<o|r;t[n++]=255&s,n<t.length&&(t[n++]=s>>8&255),n<t.length&&(t[n++]=s>>16&255),6===o?(n<t.length&&(t[n++]=s>>24&255),r=0,o=0):(r=s>>>24,o+=2)}if(n<t.length)for(t[n++]=r;n<t.length;)t[n++]=0},o.prototype._toArrayLikeBE=function(t,e){for(var n=t.length-1,r=0,i=0,o=0;i<this.length;i++){var s=this.words[i]<<o|r;t[n--]=255&s,n>=0&&(t[n--]=s>>8&255),n>=0&&(t[n--]=s>>16&255),6===o?(n>=0&&(t[n--]=s>>24&255),r=0,o=0):(r=s>>>24,o+=2)}if(n>=0)for(t[n--]=r;n>=0;)t[n--]=0},Math.clz32?o.prototype._countBits=function(t){return 32-Math.clz32(t)}:o.prototype._countBits=function(t){var e=t,n=0;return e>=4096&&(n+=13,e>>>=13),e>=64&&(n+=7,e>>>=7),e>=8&&(n+=4,e>>>=4),e>=2&&(n+=2,e>>>=2),n+e},o.prototype._zeroBits=function(t){if(0===t)return 26;var e=t,n=0;return 0==(8191&e)&&(n+=13,e>>>=13),0==(127&e)&&(n+=7,e>>>=7),0==(15&e)&&(n+=4,e>>>=4),0==(3&e)&&(n+=2,e>>>=2),0==(1&e)&&n++,n},o.prototype.bitLength=function(){var t=this.words[this.length-1],e=this._countBits(t);return 26*(this.length-1)+e},o.prototype.zeroBits=function(){if(this.isZero())return 0;for(var t=0,e=0;e<this.length;e++){var n=this._zeroBits(this.words[e]);if(t+=n,26!==n)break}return t},o.prototype.byteLength=function(){return Math.ceil(this.bitLength()/8)},o.prototype.toTwos=function(t){return 0!==this.negative?this.abs().inotn(t).iaddn(1):this.clone()},o.prototype.fromTwos=function(t){return this.testn(t-1)?this.notn(t).iaddn(1).ineg():this.clone()},o.prototype.isNeg=function(){return 0!==this.negative},o.prototype.neg=function(){return this.clone().ineg()},o.prototype.ineg=function(){return this.isZero()||(this.negative^=1),this},o.prototype.iuor=function(t){for(;this.length<t.length;)this.words[this.length++]=0;for(var e=0;e<t.length;e++)this.words[e]=this.words[e]|t.words[e];return this._strip()},o.prototype.ior=function(t){return r(0==(this.negative|t.negative)),this.iuor(t)},o.prototype.or=function(t){return this.length>t.length?this.clone().ior(t):t.clone().ior(this)},o.prototype.uor=function(t){return this.length>t.length?this.clone().iuor(t):t.clone().iuor(this)},o.prototype.iuand=function(t){var e;e=this.length>t.length?t:this;for(var n=0;n<e.length;n++)this.words[n]=this.words[n]&t.words[n];return this.length=e.length,this._strip()},o.prototype.iand=function(t){return r(0==(this.negative|t.negative)),this.iuand(t)},o.prototype.and=function(t){return this.length>t.length?this.clone().iand(t):t.clone().iand(this)},o.prototype.uand=function(t){return this.length>t.length?this.clone().iuand(t):t.clone().iuand(this)},o.prototype.iuxor=function(t){var e,n;this.length>t.length?(e=this,n=t):(e=t,n=this);for(var r=0;r<n.length;r++)this.words[r]=e.words[r]^n.words[r];if(this!==e)for(;r<e.length;r++)this.words[r]=e.words[r];return this.length=e.length,this._strip()},o.prototype.ixor=function(t){return r(0==(this.negative|t.negative)),this.iuxor(t)},o.prototype.xor=function(t){return this.length>t.length?this.clone().ixor(t):t.clone().ixor(this)},o.prototype.uxor=function(t){return this.length>t.length?this.clone().iuxor(t):t.clone().iuxor(this)},o.prototype.inotn=function(t){r("number"==typeof t&&t>=0);var e=0|Math.ceil(t/26),n=t%26;this._expand(e),n>0&&e--;for(var i=0;i<e;i++)this.words[i]=67108863&~this.words[i];return n>0&&(this.words[i]=~this.words[i]&67108863>>26-n),this._strip()},o.prototype.notn=function(t){return this.clone().inotn(t)},o.prototype.setn=function(t,e){r("number"==typeof t&&t>=0);var n=t/26|0,i=t%26;return this._expand(n+1),this.words[n]=e?this.words[n]|1<<i:this.words[n]&~(1<<i),this._strip()},o.prototype.iadd=function(t){var e,n,r;if(0!==this.negative&&0===t.negative)return this.negative=0,e=this.isub(t),this.negative^=1,this._normSign();if(0===this.negative&&0!==t.negative)return t.negative=0,e=this.isub(t),t.negative=1,e._normSign();this.length>t.length?(n=this,r=t):(n=t,r=this);for(var i=0,o=0;o<r.length;o++)e=(0|n.words[o])+(0|r.words[o])+i,this.words[o]=67108863&e,i=e>>>26;for(;0!==i&&o<n.length;o++)e=(0|n.words[o])+i,this.words[o]=67108863&e,i=e>>>26;if(this.length=n.length,0!==i)this.words[this.length]=i,this.length++;else if(n!==this)for(;o<n.length;o++)this.words[o]=n.words[o];return this},o.prototype.add=function(t){var e;return 0!==t.negative&&0===this.negative?(t.negative=0,e=this.sub(t),t.negative^=1,e):0===t.negative&&0!==this.negative?(this.negative=0,e=t.sub(this),this.negative=1,e):this.length>t.length?this.clone().iadd(t):t.clone().iadd(this)},o.prototype.isub=function(t){if(0!==t.negative){t.negative=0;var e=this.iadd(t);return t.negative=1,e._normSign()}if(0!==this.negative)return this.negative=0,this.iadd(t),this.negative=1,this._normSign();var n,r,i=this.cmp(t);if(0===i)return this.negative=0,this.length=1,this.words[0]=0,this;i>0?(n=this,r=t):(n=t,r=this);for(var o=0,s=0;s<r.length;s++)o=(e=(0|n.words[s])-(0|r.words[s])+o)>>26,this.words[s]=67108863&e;for(;0!==o&&s<n.length;s++)o=(e=(0|n.words[s])+o)>>26,this.words[s]=67108863&e;if(0===o&&s<n.length&&n!==this)for(;s<n.length;s++)this.words[s]=n.words[s];return this.length=Math.max(this.length,s),n!==this&&(this.negative=1),this._strip()},o.prototype.sub=function(t){return this.clone().isub(t)};var m=function(t,e,n){var r,i,o,s=t.words,a=e.words,u=n.words,c=0,l=0|s[0],h=8191&l,f=l>>>13,d=0|s[1],p=8191&d,g=d>>>13,m=0|s[2],y=8191&m,v=m>>>13,b=0|s[3],w=8191&b,E=b>>>13,I=0|s[4],S=8191&I,_=I>>>13,k=0|s[5],A=8191&k,T=k>>>13,x=0|s[6],O=8191&x,R=x>>>13,M=0|s[7],P=8191&M,C=M>>>13,N=0|s[8],L=8191&N,B=N>>>13,D=0|s[9],U=8191&D,j=D>>>13,F=0|a[0],V=8191&F,z=F>>>13,q=0|a[1],$=8191&q,W=q>>>13,H=0|a[2],K=8191&H,G=H>>>13,J=0|a[3],Q=8191&J,X=J>>>13,Y=0|a[4],Z=8191&Y,tt=Y>>>13,et=0|a[5],nt=8191&et,rt=et>>>13,it=0|a[6],ot=8191&it,st=it>>>13,at=0|a[7],ut=8191&at,ct=at>>>13,lt=0|a[8],ht=8191&lt,ft=lt>>>13,dt=0|a[9],pt=8191&dt,gt=dt>>>13;n.negative=t.negative^e.negative,n.length=19;var mt=(c+(r=Math.imul(h,V))|0)+((8191&(i=(i=Math.imul(h,z))+Math.imul(f,V)|0))<<13)|0;c=((o=Math.imul(f,z))+(i>>>13)|0)+(mt>>>26)|0,mt&=67108863,r=Math.imul(p,V),i=(i=Math.imul(p,z))+Math.imul(g,V)|0,o=Math.imul(g,z);var yt=(c+(r=r+Math.imul(h,$)|0)|0)+((8191&(i=(i=i+Math.imul(h,W)|0)+Math.imul(f,$)|0))<<13)|0;c=((o=o+Math.imul(f,W)|0)+(i>>>13)|0)+(yt>>>26)|0,yt&=67108863,r=Math.imul(y,V),i=(i=Math.imul(y,z))+Math.imul(v,V)|0,o=Math.imul(v,z),r=r+Math.imul(p,$)|0,i=(i=i+Math.imul(p,W)|0)+Math.imul(g,$)|0,o=o+Math.imul(g,W)|0;var vt=(c+(r=r+Math.imul(h,K)|0)|0)+((8191&(i=(i=i+Math.imul(h,G)|0)+Math.imul(f,K)|0))<<13)|0;c=((o=o+Math.imul(f,G)|0)+(i>>>13)|0)+(vt>>>26)|0,vt&=67108863,r=Math.imul(w,V),i=(i=Math.imul(w,z))+Math.imul(E,V)|0,o=Math.imul(E,z),r=r+Math.imul(y,$)|0,i=(i=i+Math.imul(y,W)|0)+Math.imul(v,$)|0,o=o+Math.imul(v,W)|0,r=r+Math.imul(p,K)|0,i=(i=i+Math.imul(p,G)|0)+Math.imul(g,K)|0,o=o+Math.imul(g,G)|0;var bt=(c+(r=r+Math.imul(h,Q)|0)|0)+((8191&(i=(i=i+Math.imul(h,X)|0)+Math.imul(f,Q)|0))<<13)|0;c=((o=o+Math.imul(f,X)|0)+(i>>>13)|0)+(bt>>>26)|0,bt&=67108863,r=Math.imul(S,V),i=(i=Math.imul(S,z))+Math.imul(_,V)|0,o=Math.imul(_,z),r=r+Math.imul(w,$)|0,i=(i=i+Math.imul(w,W)|0)+Math.imul(E,$)|0,o=o+Math.imul(E,W)|0,r=r+Math.imul(y,K)|0,i=(i=i+Math.imul(y,G)|0)+Math.imul(v,K)|0,o=o+Math.imul(v,G)|0,r=r+Math.imul(p,Q)|0,i=(i=i+Math.imul(p,X)|0)+Math.imul(g,Q)|0,o=o+Math.imul(g,X)|0;var wt=(c+(r=r+Math.imul(h,Z)|0)|0)+((8191&(i=(i=i+Math.imul(h,tt)|0)+Math.imul(f,Z)|0))<<13)|0;c=((o=o+Math.imul(f,tt)|0)+(i>>>13)|0)+(wt>>>26)|0,wt&=67108863,r=Math.imul(A,V),i=(i=Math.imul(A,z))+Math.imul(T,V)|0,o=Math.imul(T,z),r=r+Math.imul(S,$)|0,i=(i=i+Math.imul(S,W)|0)+Math.imul(_,$)|0,o=o+Math.imul(_,W)|0,r=r+Math.imul(w,K)|0,i=(i=i+Math.imul(w,G)|0)+Math.imul(E,K)|0,o=o+Math.imul(E,G)|0,r=r+Math.imul(y,Q)|0,i=(i=i+Math.imul(y,X)|0)+Math.imul(v,Q)|0,o=o+Math.imul(v,X)|0,r=r+Math.imul(p,Z)|0,i=(i=i+Math.imul(p,tt)|0)+Math.imul(g,Z)|0,o=o+Math.imul(g,tt)|0;var Et=(c+(r=r+Math.imul(h,nt)|0)|0)+((8191&(i=(i=i+Math.imul(h,rt)|0)+Math.imul(f,nt)|0))<<13)|0;c=((o=o+Math.imul(f,rt)|0)+(i>>>13)|0)+(Et>>>26)|0,Et&=67108863,r=Math.imul(O,V),i=(i=Math.imul(O,z))+Math.imul(R,V)|0,o=Math.imul(R,z),r=r+Math.imul(A,$)|0,i=(i=i+Math.imul(A,W)|0)+Math.imul(T,$)|0,o=o+Math.imul(T,W)|0,r=r+Math.imul(S,K)|0,i=(i=i+Math.imul(S,G)|0)+Math.imul(_,K)|0,o=o+Math.imul(_,G)|0,r=r+Math.imul(w,Q)|0,i=(i=i+Math.imul(w,X)|0)+Math.imul(E,Q)|0,o=o+Math.imul(E,X)|0,r=r+Math.imul(y,Z)|0,i=(i=i+Math.imul(y,tt)|0)+Math.imul(v,Z)|0,o=o+Math.imul(v,tt)|0,r=r+Math.imul(p,nt)|0,i=(i=i+Math.imul(p,rt)|0)+Math.imul(g,nt)|0,o=o+Math.imul(g,rt)|0;var It=(c+(r=r+Math.imul(h,ot)|0)|0)+((8191&(i=(i=i+Math.imul(h,st)|0)+Math.imul(f,ot)|0))<<13)|0;c=((o=o+Math.imul(f,st)|0)+(i>>>13)|0)+(It>>>26)|0,It&=67108863,r=Math.imul(P,V),i=(i=Math.imul(P,z))+Math.imul(C,V)|0,o=Math.imul(C,z),r=r+Math.imul(O,$)|0,i=(i=i+Math.imul(O,W)|0)+Math.imul(R,$)|0,o=o+Math.imul(R,W)|0,r=r+Math.imul(A,K)|0,i=(i=i+Math.imul(A,G)|0)+Math.imul(T,K)|0,o=o+Math.imul(T,G)|0,r=r+Math.imul(S,Q)|0,i=(i=i+Math.imul(S,X)|0)+Math.imul(_,Q)|0,o=o+Math.imul(_,X)|0,r=r+Math.imul(w,Z)|0,i=(i=i+Math.imul(w,tt)|0)+Math.imul(E,Z)|0,o=o+Math.imul(E,tt)|0,r=r+Math.imul(y,nt)|0,i=(i=i+Math.imul(y,rt)|0)+Math.imul(v,nt)|0,o=o+Math.imul(v,rt)|0,r=r+Math.imul(p,ot)|0,i=(i=i+Math.imul(p,st)|0)+Math.imul(g,ot)|0,o=o+Math.imul(g,st)|0;var St=(c+(r=r+Math.imul(h,ut)|0)|0)+((8191&(i=(i=i+Math.imul(h,ct)|0)+Math.imul(f,ut)|0))<<13)|0;c=((o=o+Math.imul(f,ct)|0)+(i>>>13)|0)+(St>>>26)|0,St&=67108863,r=Math.imul(L,V),i=(i=Math.imul(L,z))+Math.imul(B,V)|0,o=Math.imul(B,z),r=r+Math.imul(P,$)|0,i=(i=i+Math.imul(P,W)|0)+Math.imul(C,$)|0,o=o+Math.imul(C,W)|0,r=r+Math.imul(O,K)|0,i=(i=i+Math.imul(O,G)|0)+Math.imul(R,K)|0,o=o+Math.imul(R,G)|0,r=r+Math.imul(A,Q)|0,i=(i=i+Math.imul(A,X)|0)+Math.imul(T,Q)|0,o=o+Math.imul(T,X)|0,r=r+Math.imul(S,Z)|0,i=(i=i+Math.imul(S,tt)|0)+Math.imul(_,Z)|0,o=o+Math.imul(_,tt)|0,r=r+Math.imul(w,nt)|0,i=(i=i+Math.imul(w,rt)|0)+Math.imul(E,nt)|0,o=o+Math.imul(E,rt)|0,r=r+Math.imul(y,ot)|0,i=(i=i+Math.imul(y,st)|0)+Math.imul(v,ot)|0,o=o+Math.imul(v,st)|0,r=r+Math.imul(p,ut)|0,i=(i=i+Math.imul(p,ct)|0)+Math.imul(g,ut)|0,o=o+Math.imul(g,ct)|0;var _t=(c+(r=r+Math.imul(h,ht)|0)|0)+((8191&(i=(i=i+Math.imul(h,ft)|0)+Math.imul(f,ht)|0))<<13)|0;c=((o=o+Math.imul(f,ft)|0)+(i>>>13)|0)+(_t>>>26)|0,_t&=67108863,r=Math.imul(U,V),i=(i=Math.imul(U,z))+Math.imul(j,V)|0,o=Math.imul(j,z),r=r+Math.imul(L,$)|0,i=(i=i+Math.imul(L,W)|0)+Math.imul(B,$)|0,o=o+Math.imul(B,W)|0,r=r+Math.imul(P,K)|0,i=(i=i+Math.imul(P,G)|0)+Math.imul(C,K)|0,o=o+Math.imul(C,G)|0,r=r+Math.imul(O,Q)|0,i=(i=i+Math.imul(O,X)|0)+Math.imul(R,Q)|0,o=o+Math.imul(R,X)|0,r=r+Math.imul(A,Z)|0,i=(i=i+Math.imul(A,tt)|0)+Math.imul(T,Z)|0,o=o+Math.imul(T,tt)|0,r=r+Math.imul(S,nt)|0,i=(i=i+Math.imul(S,rt)|0)+Math.imul(_,nt)|0,o=o+Math.imul(_,rt)|0,r=r+Math.imul(w,ot)|0,i=(i=i+Math.imul(w,st)|0)+Math.imul(E,ot)|0,o=o+Math.imul(E,st)|0,r=r+Math.imul(y,ut)|0,i=(i=i+Math.imul(y,ct)|0)+Math.imul(v,ut)|0,o=o+Math.imul(v,ct)|0,r=r+Math.imul(p,ht)|0,i=(i=i+Math.imul(p,ft)|0)+Math.imul(g,ht)|0,o=o+Math.imul(g,ft)|0;var kt=(c+(r=r+Math.imul(h,pt)|0)|0)+((8191&(i=(i=i+Math.imul(h,gt)|0)+Math.imul(f,pt)|0))<<13)|0;c=((o=o+Math.imul(f,gt)|0)+(i>>>13)|0)+(kt>>>26)|0,kt&=67108863,r=Math.imul(U,$),i=(i=Math.imul(U,W))+Math.imul(j,$)|0,o=Math.imul(j,W),r=r+Math.imul(L,K)|0,i=(i=i+Math.imul(L,G)|0)+Math.imul(B,K)|0,o=o+Math.imul(B,G)|0,r=r+Math.imul(P,Q)|0,i=(i=i+Math.imul(P,X)|0)+Math.imul(C,Q)|0,o=o+Math.imul(C,X)|0,r=r+Math.imul(O,Z)|0,i=(i=i+Math.imul(O,tt)|0)+Math.imul(R,Z)|0,o=o+Math.imul(R,tt)|0,r=r+Math.imul(A,nt)|0,i=(i=i+Math.imul(A,rt)|0)+Math.imul(T,nt)|0,o=o+Math.imul(T,rt)|0,r=r+Math.imul(S,ot)|0,i=(i=i+Math.imul(S,st)|0)+Math.imul(_,ot)|0,o=o+Math.imul(_,st)|0,r=r+Math.imul(w,ut)|0,i=(i=i+Math.imul(w,ct)|0)+Math.imul(E,ut)|0,o=o+Math.imul(E,ct)|0,r=r+Math.imul(y,ht)|0,i=(i=i+Math.imul(y,ft)|0)+Math.imul(v,ht)|0,o=o+Math.imul(v,ft)|0;var At=(c+(r=r+Math.imul(p,pt)|0)|0)+((8191&(i=(i=i+Math.imul(p,gt)|0)+Math.imul(g,pt)|0))<<13)|0;c=((o=o+Math.imul(g,gt)|0)+(i>>>13)|0)+(At>>>26)|0,At&=67108863,r=Math.imul(U,K),i=(i=Math.imul(U,G))+Math.imul(j,K)|0,o=Math.imul(j,G),r=r+Math.imul(L,Q)|0,i=(i=i+Math.imul(L,X)|0)+Math.imul(B,Q)|0,o=o+Math.imul(B,X)|0,r=r+Math.imul(P,Z)|0,i=(i=i+Math.imul(P,tt)|0)+Math.imul(C,Z)|0,o=o+Math.imul(C,tt)|0,r=r+Math.imul(O,nt)|0,i=(i=i+Math.imul(O,rt)|0)+Math.imul(R,nt)|0,o=o+Math.imul(R,rt)|0,r=r+Math.imul(A,ot)|0,i=(i=i+Math.imul(A,st)|0)+Math.imul(T,ot)|0,o=o+Math.imul(T,st)|0,r=r+Math.imul(S,ut)|0,i=(i=i+Math.imul(S,ct)|0)+Math.imul(_,ut)|0,o=o+Math.imul(_,ct)|0,r=r+Math.imul(w,ht)|0,i=(i=i+Math.imul(w,ft)|0)+Math.imul(E,ht)|0,o=o+Math.imul(E,ft)|0;var Tt=(c+(r=r+Math.imul(y,pt)|0)|0)+((8191&(i=(i=i+Math.imul(y,gt)|0)+Math.imul(v,pt)|0))<<13)|0;c=((o=o+Math.imul(v,gt)|0)+(i>>>13)|0)+(Tt>>>26)|0,Tt&=67108863,r=Math.imul(U,Q),i=(i=Math.imul(U,X))+Math.imul(j,Q)|0,o=Math.imul(j,X),r=r+Math.imul(L,Z)|0,i=(i=i+Math.imul(L,tt)|0)+Math.imul(B,Z)|0,o=o+Math.imul(B,tt)|0,r=r+Math.imul(P,nt)|0,i=(i=i+Math.imul(P,rt)|0)+Math.imul(C,nt)|0,o=o+Math.imul(C,rt)|0,r=r+Math.imul(O,ot)|0,i=(i=i+Math.imul(O,st)|0)+Math.imul(R,ot)|0,o=o+Math.imul(R,st)|0,r=r+Math.imul(A,ut)|0,i=(i=i+Math.imul(A,ct)|0)+Math.imul(T,ut)|0,o=o+Math.imul(T,ct)|0,r=r+Math.imul(S,ht)|0,i=(i=i+Math.imul(S,ft)|0)+Math.imul(_,ht)|0,o=o+Math.imul(_,ft)|0;var xt=(c+(r=r+Math.imul(w,pt)|0)|0)+((8191&(i=(i=i+Math.imul(w,gt)|0)+Math.imul(E,pt)|0))<<13)|0;c=((o=o+Math.imul(E,gt)|0)+(i>>>13)|0)+(xt>>>26)|0,xt&=67108863,r=Math.imul(U,Z),i=(i=Math.imul(U,tt))+Math.imul(j,Z)|0,o=Math.imul(j,tt),r=r+Math.imul(L,nt)|0,i=(i=i+Math.imul(L,rt)|0)+Math.imul(B,nt)|0,o=o+Math.imul(B,rt)|0,r=r+Math.imul(P,ot)|0,i=(i=i+Math.imul(P,st)|0)+Math.imul(C,ot)|0,o=o+Math.imul(C,st)|0,r=r+Math.imul(O,ut)|0,i=(i=i+Math.imul(O,ct)|0)+Math.imul(R,ut)|0,o=o+Math.imul(R,ct)|0,r=r+Math.imul(A,ht)|0,i=(i=i+Math.imul(A,ft)|0)+Math.imul(T,ht)|0,o=o+Math.imul(T,ft)|0;var Ot=(c+(r=r+Math.imul(S,pt)|0)|0)+((8191&(i=(i=i+Math.imul(S,gt)|0)+Math.imul(_,pt)|0))<<13)|0;c=((o=o+Math.imul(_,gt)|0)+(i>>>13)|0)+(Ot>>>26)|0,Ot&=67108863,r=Math.imul(U,nt),i=(i=Math.imul(U,rt))+Math.imul(j,nt)|0,o=Math.imul(j,rt),r=r+Math.imul(L,ot)|0,i=(i=i+Math.imul(L,st)|0)+Math.imul(B,ot)|0,o=o+Math.imul(B,st)|0,r=r+Math.imul(P,ut)|0,i=(i=i+Math.imul(P,ct)|0)+Math.imul(C,ut)|0,o=o+Math.imul(C,ct)|0,r=r+Math.imul(O,ht)|0,i=(i=i+Math.imul(O,ft)|0)+Math.imul(R,ht)|0,o=o+Math.imul(R,ft)|0;var Rt=(c+(r=r+Math.imul(A,pt)|0)|0)+((8191&(i=(i=i+Math.imul(A,gt)|0)+Math.imul(T,pt)|0))<<13)|0;c=((o=o+Math.imul(T,gt)|0)+(i>>>13)|0)+(Rt>>>26)|0,Rt&=67108863,r=Math.imul(U,ot),i=(i=Math.imul(U,st))+Math.imul(j,ot)|0,o=Math.imul(j,st),r=r+Math.imul(L,ut)|0,i=(i=i+Math.imul(L,ct)|0)+Math.imul(B,ut)|0,o=o+Math.imul(B,ct)|0,r=r+Math.imul(P,ht)|0,i=(i=i+Math.imul(P,ft)|0)+Math.imul(C,ht)|0,o=o+Math.imul(C,ft)|0;var Mt=(c+(r=r+Math.imul(O,pt)|0)|0)+((8191&(i=(i=i+Math.imul(O,gt)|0)+Math.imul(R,pt)|0))<<13)|0;c=((o=o+Math.imul(R,gt)|0)+(i>>>13)|0)+(Mt>>>26)|0,Mt&=67108863,r=Math.imul(U,ut),i=(i=Math.imul(U,ct))+Math.imul(j,ut)|0,o=Math.imul(j,ct),r=r+Math.imul(L,ht)|0,i=(i=i+Math.imul(L,ft)|0)+Math.imul(B,ht)|0,o=o+Math.imul(B,ft)|0;var Pt=(c+(r=r+Math.imul(P,pt)|0)|0)+((8191&(i=(i=i+Math.imul(P,gt)|0)+Math.imul(C,pt)|0))<<13)|0;c=((o=o+Math.imul(C,gt)|0)+(i>>>13)|0)+(Pt>>>26)|0,Pt&=67108863,r=Math.imul(U,ht),i=(i=Math.imul(U,ft))+Math.imul(j,ht)|0,o=Math.imul(j,ft);var Ct=(c+(r=r+Math.imul(L,pt)|0)|0)+((8191&(i=(i=i+Math.imul(L,gt)|0)+Math.imul(B,pt)|0))<<13)|0;c=((o=o+Math.imul(B,gt)|0)+(i>>>13)|0)+(Ct>>>26)|0,Ct&=67108863;var Nt=(c+(r=Math.imul(U,pt))|0)+((8191&(i=(i=Math.imul(U,gt))+Math.imul(j,pt)|0))<<13)|0;return c=((o=Math.imul(j,gt))+(i>>>13)|0)+(Nt>>>26)|0,Nt&=67108863,u[0]=mt,u[1]=yt,u[2]=vt,u[3]=bt,u[4]=wt,u[5]=Et,u[6]=It,u[7]=St,u[8]=_t,u[9]=kt,u[10]=At,u[11]=Tt,u[12]=xt,u[13]=Ot,u[14]=Rt,u[15]=Mt,u[16]=Pt,u[17]=Ct,u[18]=Nt,0!==c&&(u[19]=c,n.length++),n};function y(t,e,n){n.negative=e.negative^t.negative,n.length=t.length+e.length;for(var r=0,i=0,o=0;o<n.length-1;o++){var s=i;i=0;for(var a=67108863&r,u=Math.min(o,e.length-1),c=Math.max(0,o-t.length+1);c<=u;c++){var l=o-c,h=(0|t.words[l])*(0|e.words[c]),f=67108863&h;a=67108863&(f=f+a|0),i+=(s=(s=s+(h/67108864|0)|0)+(f>>>26)|0)>>>26,s&=67108863}n.words[o]=a,r=s,s=i}return 0!==r?n.words[o]=r:n.length--,n._strip()}function v(t,e,n){return y(t,e,n)}function b(t,e){this.x=t,this.y=e}Math.imul||(m=g),o.prototype.mulTo=function(t,e){var n=this.length+t.length;return 10===this.length&&10===t.length?m(this,t,e):n<63?g(this,t,e):n<1024?y(this,t,e):v(this,t,e)},b.prototype.makeRBT=function(t){for(var e=new Array(t),n=o.prototype._countBits(t)-1,r=0;r<t;r++)e[r]=this.revBin(r,n,t);return e},b.prototype.revBin=function(t,e,n){if(0===t||t===n-1)return t;for(var r=0,i=0;i<e;i++)r|=(1&t)<<e-i-1,t>>=1;return r},b.prototype.permute=function(t,e,n,r,i,o){for(var s=0;s<o;s++)r[s]=e[t[s]],i[s]=n[t[s]]},b.prototype.transform=function(t,e,n,r,i,o){this.permute(o,t,e,n,r,i);for(var s=1;s<i;s<<=1)for(var a=s<<1,u=Math.cos(2*Math.PI/a),c=Math.sin(2*Math.PI/a),l=0;l<i;l+=a)for(var h=u,f=c,d=0;d<s;d++){var p=n[l+d],g=r[l+d],m=n[l+d+s],y=r[l+d+s],v=h*m-f*y;y=h*y+f*m,m=v,n[l+d]=p+m,r[l+d]=g+y,n[l+d+s]=p-m,r[l+d+s]=g-y,d!==a&&(v=u*h-c*f,f=u*f+c*h,h=v)}},b.prototype.guessLen13b=function(t,e){var n=1|Math.max(e,t),r=1&n,i=0;for(n=n/2|0;n;n>>>=1)i++;return 1<<i+1+r},b.prototype.conjugate=function(t,e,n){if(!(n<=1))for(var r=0;r<n/2;r++){var i=t[r];t[r]=t[n-r-1],t[n-r-1]=i,i=e[r],e[r]=-e[n-r-1],e[n-r-1]=-i}},b.prototype.normalize13b=function(t,e){for(var n=0,r=0;r<e/2;r++){var i=8192*Math.round(t[2*r+1]/e)+Math.round(t[2*r]/e)+n;t[r]=67108863&i,n=i<67108864?0:i/67108864|0}return t},b.prototype.convert13b=function(t,e,n,i){for(var o=0,s=0;s<e;s++)o+=0|t[s],n[2*s]=8191&o,o>>>=13,n[2*s+1]=8191&o,o>>>=13;for(s=2*e;s<i;++s)n[s]=0;r(0===o),r(0==(-8192&o))},b.prototype.stub=function(t){for(var e=new Array(t),n=0;n<t;n++)e[n]=0;return e},b.prototype.mulp=function(t,e,n){var r=2*this.guessLen13b(t.length,e.length),i=this.makeRBT(r),o=this.stub(r),s=new Array(r),a=new Array(r),u=new Array(r),c=new Array(r),l=new Array(r),h=new Array(r),f=n.words;f.length=r,this.convert13b(t.words,t.length,s,r),this.convert13b(e.words,e.length,c,r),this.transform(s,o,a,u,r,i),this.transform(c,o,l,h,r,i);for(var d=0;d<r;d++){var p=a[d]*l[d]-u[d]*h[d];u[d]=a[d]*h[d]+u[d]*l[d],a[d]=p}return this.conjugate(a,u,r),this.transform(a,u,f,o,r,i),this.conjugate(f,o,r),this.normalize13b(f,r),n.negative=t.negative^e.negative,n.length=t.length+e.length,n._strip()},o.prototype.mul=function(t){var e=new o(null);return e.words=new Array(this.length+t.length),this.mulTo(t,e)},o.prototype.mulf=function(t){var e=new o(null);return e.words=new Array(this.length+t.length),v(this,t,e)},o.prototype.imul=function(t){return this.clone().mulTo(t,this)},o.prototype.imuln=function(t){var e=t<0;e&&(t=-t),r("number"==typeof t),r(t<67108864);for(var n=0,i=0;i<this.length;i++){var o=(0|this.words[i])*t,s=(67108863&o)+(67108863&n);n>>=26,n+=o/67108864|0,n+=s>>>26,this.words[i]=67108863&s}return 0!==n&&(this.words[i]=n,this.length++),e?this.ineg():this},o.prototype.muln=function(t){return this.clone().imuln(t)},o.prototype.sqr=function(){return this.mul(this)},o.prototype.isqr=function(){return this.imul(this.clone())},o.prototype.pow=function(t){var e=function(t){for(var e=new Array(t.bitLength()),n=0;n<e.length;n++){var r=n/26|0,i=n%26;e[n]=t.words[r]>>>i&1}return e}(t);if(0===e.length)return new o(1);for(var n=this,r=0;r<e.length&&0===e[r];r++,n=n.sqr());if(++r<e.length)for(var i=n.sqr();r<e.length;r++,i=i.sqr())0!==e[r]&&(n=n.mul(i));return n},o.prototype.iushln=function(t){r("number"==typeof t&&t>=0);var e,n=t%26,i=(t-n)/26,o=67108863>>>26-n<<26-n;if(0!==n){var s=0;for(e=0;e<this.length;e++){var a=this.words[e]&o,u=(0|this.words[e])-a<<n;this.words[e]=u|s,s=a>>>26-n}s&&(this.words[e]=s,this.length++)}if(0!==i){for(e=this.length-1;e>=0;e--)this.words[e+i]=this.words[e];for(e=0;e<i;e++)this.words[e]=0;this.length+=i}return this._strip()},o.prototype.ishln=function(t){return r(0===this.negative),this.iushln(t)},o.prototype.iushrn=function(t,e,n){var i;r("number"==typeof t&&t>=0),i=e?(e-e%26)/26:0;var o=t%26,s=Math.min((t-o)/26,this.length),a=67108863^67108863>>>o<<o,u=n;if(i-=s,i=Math.max(0,i),u){for(var c=0;c<s;c++)u.words[c]=this.words[c];u.length=s}if(0===s);else if(this.length>s)for(this.length-=s,c=0;c<this.length;c++)this.words[c]=this.words[c+s];else this.words[0]=0,this.length=1;var l=0;for(c=this.length-1;c>=0&&(0!==l||c>=i);c--){var h=0|this.words[c];this.words[c]=l<<26-o|h>>>o,l=h&a}return u&&0!==l&&(u.words[u.length++]=l),0===this.length&&(this.words[0]=0,this.length=1),this._strip()},o.prototype.ishrn=function(t,e,n){return r(0===this.negative),this.iushrn(t,e,n)},o.prototype.shln=function(t){return this.clone().ishln(t)},o.prototype.ushln=function(t){return this.clone().iushln(t)},o.prototype.shrn=function(t){return this.clone().ishrn(t)},o.prototype.ushrn=function(t){return this.clone().iushrn(t)},o.prototype.testn=function(t){r("number"==typeof t&&t>=0);var e=t%26,n=(t-e)/26,i=1<<e;return!(this.length<=n)&&!!(this.words[n]&i)},o.prototype.imaskn=function(t){r("number"==typeof t&&t>=0);var e=t%26,n=(t-e)/26;if(r(0===this.negative,"imaskn works only with positive numbers"),this.length<=n)return this;if(0!==e&&n++,this.length=Math.min(n,this.length),0!==e){var i=67108863^67108863>>>e<<e;this.words[this.length-1]&=i}return this._strip()},o.prototype.maskn=function(t){return this.clone().imaskn(t)},o.prototype.iaddn=function(t){return r("number"==typeof t),r(t<67108864),t<0?this.isubn(-t):0!==this.negative?1===this.length&&(0|this.words[0])<=t?(this.words[0]=t-(0|this.words[0]),this.negative=0,this):(this.negative=0,this.isubn(t),this.negative=1,this):this._iaddn(t)},o.prototype._iaddn=function(t){this.words[0]+=t;for(var e=0;e<this.length&&this.words[e]>=67108864;e++)this.words[e]-=67108864,e===this.length-1?this.words[e+1]=1:this.words[e+1]++;return this.length=Math.max(this.length,e+1),this},o.prototype.isubn=function(t){if(r("number"==typeof t),r(t<67108864),t<0)return this.iaddn(-t);if(0!==this.negative)return this.negative=0,this.iaddn(t),this.negative=1,this;if(this.words[0]-=t,1===this.length&&this.words[0]<0)this.words[0]=-this.words[0],this.negative=1;else for(var e=0;e<this.length&&this.words[e]<0;e++)this.words[e]+=67108864,this.words[e+1]-=1;return this._strip()},o.prototype.addn=function(t){return this.clone().iaddn(t)},o.prototype.subn=function(t){return this.clone().isubn(t)},o.prototype.iabs=function(){return this.negative=0,this},o.prototype.abs=function(){return this.clone().iabs()},o.prototype._ishlnsubmul=function(t,e,n){var i,o,s=t.length+n;this._expand(s);var a=0;for(i=0;i<t.length;i++){o=(0|this.words[i+n])+a;var u=(0|t.words[i])*e;a=((o-=67108863&u)>>26)-(u/67108864|0),this.words[i+n]=67108863&o}for(;i<this.length-n;i++)a=(o=(0|this.words[i+n])+a)>>26,this.words[i+n]=67108863&o;if(0===a)return this._strip();for(r(-1===a),a=0,i=0;i<this.length;i++)a=(o=-(0|this.words[i])+a)>>26,this.words[i]=67108863&o;return this.negative=1,this._strip()},o.prototype._wordDiv=function(t,e){var n=(this.length,t.length),r=this.clone(),i=t,s=0|i.words[i.length-1];0!==(n=26-this._countBits(s))&&(i=i.ushln(n),r.iushln(n),s=0|i.words[i.length-1]);var a,u=r.length-i.length;if("mod"!==e){(a=new o(null)).length=u+1,a.words=new Array(a.length);for(var c=0;c<a.length;c++)a.words[c]=0}var l=r.clone()._ishlnsubmul(i,1,u);0===l.negative&&(r=l,a&&(a.words[u]=1));for(var h=u-1;h>=0;h--){var f=67108864*(0|r.words[i.length+h])+(0|r.words[i.length+h-1]);for(f=Math.min(f/s|0,67108863),r._ishlnsubmul(i,f,h);0!==r.negative;)f--,r.negative=0,r._ishlnsubmul(i,1,h),r.isZero()||(r.negative^=1);a&&(a.words[h]=f)}return a&&a._strip(),r._strip(),"div"!==e&&0!==n&&r.iushrn(n),{div:a||null,mod:r}},o.prototype.divmod=function(t,e,n){return r(!t.isZero()),this.isZero()?{div:new o(0),mod:new o(0)}:0!==this.negative&&0===t.negative?(a=this.neg().divmod(t,e),"mod"!==e&&(i=a.div.neg()),"div"!==e&&(s=a.mod.neg(),n&&0!==s.negative&&s.iadd(t)),{div:i,mod:s}):0===this.negative&&0!==t.negative?(a=this.divmod(t.neg(),e),"mod"!==e&&(i=a.div.neg()),{div:i,mod:a.mod}):0!=(this.negative&t.negative)?(a=this.neg().divmod(t.neg(),e),"div"!==e&&(s=a.mod.neg(),n&&0!==s.negative&&s.isub(t)),{div:a.div,mod:s}):t.length>this.length||this.cmp(t)<0?{div:new o(0),mod:this}:1===t.length?"div"===e?{div:this.divn(t.words[0]),mod:null}:"mod"===e?{div:null,mod:new o(this.modrn(t.words[0]))}:{div:this.divn(t.words[0]),mod:new o(this.modrn(t.words[0]))}:this._wordDiv(t,e);var i,s,a},o.prototype.div=function(t){return this.divmod(t,"div",!1).div},o.prototype.mod=function(t){return this.divmod(t,"mod",!1).mod},o.prototype.umod=function(t){return this.divmod(t,"mod",!0).mod},o.prototype.divRound=function(t){var e=this.divmod(t);if(e.mod.isZero())return e.div;var n=0!==e.div.negative?e.mod.isub(t):e.mod,r=t.ushrn(1),i=t.andln(1),o=n.cmp(r);return o<0||1===i&&0===o?e.div:0!==e.div.negative?e.div.isubn(1):e.div.iaddn(1)},o.prototype.modrn=function(t){var e=t<0;e&&(t=-t),r(t<=67108863);for(var n=(1<<26)%t,i=0,o=this.length-1;o>=0;o--)i=(n*i+(0|this.words[o]))%t;return e?-i:i},o.prototype.modn=function(t){return this.modrn(t)},o.prototype.idivn=function(t){var e=t<0;e&&(t=-t),r(t<=67108863);for(var n=0,i=this.length-1;i>=0;i--){var o=(0|this.words[i])+67108864*n;this.words[i]=o/t|0,n=o%t}return this._strip(),e?this.ineg():this},o.prototype.divn=function(t){return this.clone().idivn(t)},o.prototype.egcd=function(t){r(0===t.negative),r(!t.isZero());var e=this,n=t.clone();e=0!==e.negative?e.umod(t):e.clone();for(var i=new o(1),s=new o(0),a=new o(0),u=new o(1),c=0;e.isEven()&&n.isEven();)e.iushrn(1),n.iushrn(1),++c;for(var l=n.clone(),h=e.clone();!e.isZero();){for(var f=0,d=1;0==(e.words[0]&d)&&f<26;++f,d<<=1);if(f>0)for(e.iushrn(f);f-- >0;)(i.isOdd()||s.isOdd())&&(i.iadd(l),s.isub(h)),i.iushrn(1),s.iushrn(1);for(var p=0,g=1;0==(n.words[0]&g)&&p<26;++p,g<<=1);if(p>0)for(n.iushrn(p);p-- >0;)(a.isOdd()||u.isOdd())&&(a.iadd(l),u.isub(h)),a.iushrn(1),u.iushrn(1);e.cmp(n)>=0?(e.isub(n),i.isub(a),s.isub(u)):(n.isub(e),a.isub(i),u.isub(s))}return{a:a,b:u,gcd:n.iushln(c)}},o.prototype._invmp=function(t){r(0===t.negative),r(!t.isZero());var e=this,n=t.clone();e=0!==e.negative?e.umod(t):e.clone();for(var i,s=new o(1),a=new o(0),u=n.clone();e.cmpn(1)>0&&n.cmpn(1)>0;){for(var c=0,l=1;0==(e.words[0]&l)&&c<26;++c,l<<=1);if(c>0)for(e.iushrn(c);c-- >0;)s.isOdd()&&s.iadd(u),s.iushrn(1);for(var h=0,f=1;0==(n.words[0]&f)&&h<26;++h,f<<=1);if(h>0)for(n.iushrn(h);h-- >0;)a.isOdd()&&a.iadd(u),a.iushrn(1);e.cmp(n)>=0?(e.isub(n),s.isub(a)):(n.isub(e),a.isub(s))}return(i=0===e.cmpn(1)?s:a).cmpn(0)<0&&i.iadd(t),i},o.prototype.gcd=function(t){if(this.isZero())return t.abs();if(t.isZero())return this.abs();var e=this.clone(),n=t.clone();e.negative=0,n.negative=0;for(var r=0;e.isEven()&&n.isEven();r++)e.iushrn(1),n.iushrn(1);for(;;){for(;e.isEven();)e.iushrn(1);for(;n.isEven();)n.iushrn(1);var i=e.cmp(n);if(i<0){var o=e;e=n,n=o}else if(0===i||0===n.cmpn(1))break;e.isub(n)}return n.iushln(r)},o.prototype.invm=function(t){return this.egcd(t).a.umod(t)},o.prototype.isEven=function(){return 0==(1&this.words[0])},o.prototype.isOdd=function(){return 1==(1&this.words[0])},o.prototype.andln=function(t){return this.words[0]&t},o.prototype.bincn=function(t){r("number"==typeof t);var e=t%26,n=(t-e)/26,i=1<<e;if(this.length<=n)return this._expand(n+1),this.words[n]|=i,this;for(var o=i,s=n;0!==o&&s<this.length;s++){var a=0|this.words[s];o=(a+=o)>>>26,a&=67108863,this.words[s]=a}return 0!==o&&(this.words[s]=o,this.length++),this},o.prototype.isZero=function(){return 1===this.length&&0===this.words[0]},o.prototype.cmpn=function(t){var e,n=t<0;if(0!==this.negative&&!n)return-1;if(0===this.negative&&n)return 1;if(this._strip(),this.length>1)e=1;else{n&&(t=-t),r(t<=67108863,"Number is too big");var i=0|this.words[0];e=i===t?0:i<t?-1:1}return 0!==this.negative?0|-e:e},o.prototype.cmp=function(t){if(0!==this.negative&&0===t.negative)return-1;if(0===this.negative&&0!==t.negative)return 1;var e=this.ucmp(t);return 0!==this.negative?0|-e:e},o.prototype.ucmp=function(t){if(this.length>t.length)return 1;if(this.length<t.length)return-1;for(var e=0,n=this.length-1;n>=0;n--){var r=0|this.words[n],i=0|t.words[n];if(r!==i){r<i?e=-1:r>i&&(e=1);break}}return e},o.prototype.gtn=function(t){return 1===this.cmpn(t)},o.prototype.gt=function(t){return 1===this.cmp(t)},o.prototype.gten=function(t){return this.cmpn(t)>=0},o.prototype.gte=function(t){return this.cmp(t)>=0},o.prototype.ltn=function(t){return-1===this.cmpn(t)},o.prototype.lt=function(t){return-1===this.cmp(t)},o.prototype.lten=function(t){return this.cmpn(t)<=0},o.prototype.lte=function(t){return this.cmp(t)<=0},o.prototype.eqn=function(t){return 0===this.cmpn(t)},o.prototype.eq=function(t){return 0===this.cmp(t)},o.red=function(t){return new A(t)},o.prototype.toRed=function(t){return r(!this.red,"Already a number in reduction context"),r(0===this.negative,"red works only with positives"),t.convertTo(this)._forceRed(t)},o.prototype.fromRed=function(){return r(this.red,"fromRed works only with numbers in reduction context"),this.red.convertFrom(this)},o.prototype._forceRed=function(t){return this.red=t,this},o.prototype.forceRed=function(t){return r(!this.red,"Already a number in reduction context"),this._forceRed(t)},o.prototype.redAdd=function(t){return r(this.red,"redAdd works only with red numbers"),this.red.add(this,t)},o.prototype.redIAdd=function(t){return r(this.red,"redIAdd works only with red numbers"),this.red.iadd(this,t)},o.prototype.redSub=function(t){return r(this.red,"redSub works only with red numbers"),this.red.sub(this,t)},o.prototype.redISub=function(t){return r(this.red,"redISub works only with red numbers"),this.red.isub(this,t)},o.prototype.redShl=function(t){return r(this.red,"redShl works only with red numbers"),this.red.shl(this,t)},o.prototype.redMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.mul(this,t)},o.prototype.redIMul=function(t){return r(this.red,"redMul works only with red numbers"),this.red._verify2(this,t),this.red.imul(this,t)},o.prototype.redSqr=function(){return r(this.red,"redSqr works only with red numbers"),this.red._verify1(this),this.red.sqr(this)},o.prototype.redISqr=function(){return r(this.red,"redISqr works only with red numbers"),this.red._verify1(this),this.red.isqr(this)},o.prototype.redSqrt=function(){return r(this.red,"redSqrt works only with red numbers"),this.red._verify1(this),this.red.sqrt(this)},o.prototype.redInvm=function(){return r(this.red,"redInvm works only with red numbers"),this.red._verify1(this),this.red.invm(this)},o.prototype.redNeg=function(){return r(this.red,"redNeg works only with red numbers"),this.red._verify1(this),this.red.neg(this)},o.prototype.redPow=function(t){return r(this.red&&!t.red,"redPow(normalNum)"),this.red._verify1(this),this.red.pow(this,t)};var w={k256:null,p224:null,p192:null,p25519:null};function E(t,e){this.name=t,this.p=new o(e,16),this.n=this.p.bitLength(),this.k=new o(1).iushln(this.n).isub(this.p),this.tmp=this._tmp()}function I(){E.call(this,"k256","ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")}function S(){E.call(this,"p224","ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")}function _(){E.call(this,"p192","ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")}function k(){E.call(this,"25519","7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")}function A(t){if("string"==typeof t){var e=o._prime(t);this.m=e.p,this.prime=e}else r(t.gtn(1),"modulus must be greater than 1"),this.m=t,this.prime=null}function T(t){A.call(this,t),this.shift=this.m.bitLength(),this.shift%26!=0&&(this.shift+=26-this.shift%26),this.r=new o(1).iushln(this.shift),this.r2=this.imod(this.r.sqr()),this.rinv=this.r._invmp(this.m),this.minv=this.rinv.mul(this.r).isubn(1).div(this.m),this.minv=this.minv.umod(this.r),this.minv=this.r.sub(this.minv)}E.prototype._tmp=function(){var t=new o(null);return t.words=new Array(Math.ceil(this.n/13)),t},E.prototype.ireduce=function(t){var e,n=t;do{this.split(n,this.tmp),e=(n=(n=this.imulK(n)).iadd(this.tmp)).bitLength()}while(e>this.n);var r=e<this.n?-1:n.ucmp(this.p);return 0===r?(n.words[0]=0,n.length=1):r>0?n.isub(this.p):void 0!==n.strip?n.strip():n._strip(),n},E.prototype.split=function(t,e){t.iushrn(this.n,0,e)},E.prototype.imulK=function(t){return t.imul(this.k)},i(I,E),I.prototype.split=function(t,e){for(var n=4194303,r=Math.min(t.length,9),i=0;i<r;i++)e.words[i]=t.words[i];if(e.length=r,t.length<=9)return t.words[0]=0,void(t.length=1);var o=t.words[9];for(e.words[e.length++]=o&n,i=10;i<t.length;i++){var s=0|t.words[i];t.words[i-10]=(s&n)<<4|o>>>22,o=s}o>>>=22,t.words[i-10]=o,0===o&&t.length>10?t.length-=10:t.length-=9},I.prototype.imulK=function(t){t.words[t.length]=0,t.words[t.length+1]=0,t.length+=2;for(var e=0,n=0;n<t.length;n++){var r=0|t.words[n];e+=977*r,t.words[n]=67108863&e,e=64*r+(e/67108864|0)}return 0===t.words[t.length-1]&&(t.length--,0===t.words[t.length-1]&&t.length--),t},i(S,E),i(_,E),i(k,E),k.prototype.imulK=function(t){for(var e=0,n=0;n<t.length;n++){var r=19*(0|t.words[n])+e,i=67108863&r;r>>>=26,t.words[n]=i,e=r}return 0!==e&&(t.words[t.length++]=e),t},o._prime=function(t){if(w[t])return w[t];var e;if("k256"===t)e=new I;else if("p224"===t)e=new S;else if("p192"===t)e=new _;else{if("p25519"!==t)throw new Error("Unknown prime "+t);e=new k}return w[t]=e,e},A.prototype._verify1=function(t){r(0===t.negative,"red works only with positives"),r(t.red,"red works only with red numbers")},A.prototype._verify2=function(t,e){r(0==(t.negative|e.negative),"red works only with positives"),r(t.red&&t.red===e.red,"red works only with red numbers")},A.prototype.imod=function(t){return this.prime?this.prime.ireduce(t)._forceRed(this):(l(t,t.umod(this.m)._forceRed(this)),t)},A.prototype.neg=function(t){return t.isZero()?t.clone():this.m.sub(t)._forceRed(this)},A.prototype.add=function(t,e){this._verify2(t,e);var n=t.add(e);return n.cmp(this.m)>=0&&n.isub(this.m),n._forceRed(this)},A.prototype.iadd=function(t,e){this._verify2(t,e);var n=t.iadd(e);return n.cmp(this.m)>=0&&n.isub(this.m),n},A.prototype.sub=function(t,e){this._verify2(t,e);var n=t.sub(e);return n.cmpn(0)<0&&n.iadd(this.m),n._forceRed(this)},A.prototype.isub=function(t,e){this._verify2(t,e);var n=t.isub(e);return n.cmpn(0)<0&&n.iadd(this.m),n},A.prototype.shl=function(t,e){return this._verify1(t),this.imod(t.ushln(e))},A.prototype.imul=function(t,e){return this._verify2(t,e),this.imod(t.imul(e))},A.prototype.mul=function(t,e){return this._verify2(t,e),this.imod(t.mul(e))},A.prototype.isqr=function(t){return this.imul(t,t.clone())},A.prototype.sqr=function(t){return this.mul(t,t)},A.prototype.sqrt=function(t){if(t.isZero())return t.clone();var e=this.m.andln(3);if(r(e%2==1),3===e){var n=this.m.add(new o(1)).iushrn(2);return this.pow(t,n)}for(var i=this.m.subn(1),s=0;!i.isZero()&&0===i.andln(1);)s++,i.iushrn(1);r(!i.isZero());var a=new o(1).toRed(this),u=a.redNeg(),c=this.m.subn(1).iushrn(1),l=this.m.bitLength();for(l=new o(2*l*l).toRed(this);0!==this.pow(l,c).cmp(u);)l.redIAdd(u);for(var h=this.pow(l,i),f=this.pow(t,i.addn(1).iushrn(1)),d=this.pow(t,i),p=s;0!==d.cmp(a);){for(var g=d,m=0;0!==g.cmp(a);m++)g=g.redSqr();r(m<p);var y=this.pow(h,new o(1).iushln(p-m-1));f=f.redMul(y),h=y.redSqr(),d=d.redMul(h),p=m}return f},A.prototype.invm=function(t){var e=t._invmp(this.m);return 0!==e.negative?(e.negative=0,this.imod(e).redNeg()):this.imod(e)},A.prototype.pow=function(t,e){if(e.isZero())return new o(1).toRed(this);if(0===e.cmpn(1))return t.clone();var n=new Array(16);n[0]=new o(1).toRed(this),n[1]=t;for(var r=2;r<n.length;r++)n[r]=this.mul(n[r-1],t);var i=n[0],s=0,a=0,u=e.bitLength()%26;for(0===u&&(u=26),r=e.length-1;r>=0;r--){for(var c=e.words[r],l=u-1;l>=0;l--){var h=c>>l&1;i!==n[0]&&(i=this.sqr(i)),0!==h||0!==s?(s<<=1,s|=h,(4===++a||0===r&&0===l)&&(i=this.mul(i,n[s]),a=0,s=0)):a=0}u=26}return i},A.prototype.convertTo=function(t){var e=t.umod(this.m);return e===t?e.clone():e},A.prototype.convertFrom=function(t){var e=t.clone();return e.red=null,e},o.mont=function(t){return new T(t)},i(T,A),T.prototype.convertTo=function(t){return this.imod(t.ushln(this.shift))},T.prototype.convertFrom=function(t){var e=this.imod(t.mul(this.rinv));return e.red=null,e},T.prototype.imul=function(t,e){if(t.isZero()||e.isZero())return t.words[0]=0,t.length=1,t;var n=t.imul(e),r=n.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),i=n.isub(r).iushrn(this.shift),o=i;return i.cmp(this.m)>=0?o=i.isub(this.m):i.cmpn(0)<0&&(o=i.iadd(this.m)),o._forceRed(this)},T.prototype.mul=function(t,e){if(t.isZero()||e.isZero())return new o(0)._forceRed(this);var n=t.mul(e),r=n.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),i=n.isub(r).iushrn(this.shift),s=i;return i.cmp(this.m)>=0?s=i.isub(this.m):i.cmpn(0)<0&&(s=i.iadd(this.m)),s._forceRed(this)},T.prototype.invm=function(t){return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)}}(t=n.nmd(t),this)},25532:function(t,e,n){"use strict";var r=n(48764).Buffer,i=this&&this.__createBinding||(Object.create?function(t,e,n,r){void 0===r&&(r=n),Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[n]}})}:function(t,e,n,r){void 0===r&&(r=n),t[r]=e[n]}),o=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),s=this&&this.__decorate||function(t,e,n,r){var i,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(s=(o<3?i(s):o>3?i(e,n,s):i(e,n))||s);return o>3&&s&&Object.defineProperty(e,n,s),s},a=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)"default"!==n&&Object.hasOwnProperty.call(t,n)&&i(e,t,n);return o(e,t),e},u=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.deserializeUnchecked=e.deserialize=e.serialize=e.BinaryReader=e.BinaryWriter=e.BorshError=e.baseDecode=e.baseEncode=void 0;const c=u(n(13550)),l=u(n(77191)),h=a(n(11379)),f=new("function"!=typeof TextDecoder?h.TextDecoder:TextDecoder)("utf-8",{fatal:!0});e.baseEncode=function(t){return"string"==typeof t&&(t=r.from(t,"utf8")),l.default.encode(r.from(t))},e.baseDecode=function(t){return r.from(l.default.decode(t))};const d=1024;class p extends Error{constructor(t){super(t),this.fieldPath=[],this.originalMessage=t}addToFieldPath(t){this.fieldPath.splice(0,0,t),this.message=this.originalMessage+": "+this.fieldPath.join(".")}}e.BorshError=p;class g{constructor(){this.buf=r.alloc(d),this.length=0}maybeResize(){this.buf.length<16+this.length&&(this.buf=r.concat([this.buf,r.alloc(d)]))}writeU8(t){this.maybeResize(),this.buf.writeUInt8(t,this.length),this.length+=1}writeU16(t){this.maybeResize(),this.buf.writeUInt16LE(t,this.length),this.length+=2}writeU32(t){this.maybeResize(),this.buf.writeUInt32LE(t,this.length),this.length+=4}writeU64(t){this.maybeResize(),this.writeBuffer(r.from(new c.default(t).toArray("le",8)))}writeU128(t){this.maybeResize(),this.writeBuffer(r.from(new c.default(t).toArray("le",16)))}writeU256(t){this.maybeResize(),this.writeBuffer(r.from(new c.default(t).toArray("le",32)))}writeU512(t){this.maybeResize(),this.writeBuffer(r.from(new c.default(t).toArray("le",64)))}writeBuffer(t){this.buf=r.concat([r.from(this.buf.subarray(0,this.length)),t,r.alloc(d)]),this.length+=t.length}writeString(t){this.maybeResize();const e=r.from(t,"utf8");this.writeU32(e.length),this.writeBuffer(e)}writeFixedArray(t){this.writeBuffer(r.from(t))}writeArray(t,e){this.maybeResize(),this.writeU32(t.length);for(const n of t)this.maybeResize(),e(n)}toArray(){return this.buf.subarray(0,this.length)}}function m(t,e,n){const r=n.value;n.value=function(...t){try{return r.apply(this,t)}catch(t){if(t instanceof RangeError){const e=t.code;if(["ERR_BUFFER_OUT_OF_BOUNDS","ERR_OUT_OF_RANGE"].indexOf(e)>=0)throw new p("Reached the end of buffer when deserializing")}throw t}}}e.BinaryWriter=g;class y{constructor(t){this.buf=t,this.offset=0}readU8(){const t=this.buf.readUInt8(this.offset);return this.offset+=1,t}readU16(){const t=this.buf.readUInt16LE(this.offset);return this.offset+=2,t}readU32(){const t=this.buf.readUInt32LE(this.offset);return this.offset+=4,t}readU64(){const t=this.readBuffer(8);return new c.default(t,"le")}readU128(){const t=this.readBuffer(16);return new c.default(t,"le")}readU256(){const t=this.readBuffer(32);return new c.default(t,"le")}readU512(){const t=this.readBuffer(64);return new c.default(t,"le")}readBuffer(t){if(this.offset+t>this.buf.length)throw new p(`Expected buffer length ${t} isn't within bounds`);const e=this.buf.slice(this.offset,this.offset+t);return this.offset+=t,e}readString(){const t=this.readU32(),e=this.readBuffer(t);try{return f.decode(e)}catch(t){throw new p(`Error decoding UTF-8 string: ${t}`)}}readFixedArray(t){return new Uint8Array(this.readBuffer(t))}readArray(t){const e=this.readU32(),n=Array();for(let r=0;r<e;++r)n.push(t());return n}}function v(t){return t.charAt(0).toUpperCase()+t.slice(1)}function b(t,e,n,r,i){try{if("string"==typeof r)i[`write${v(r)}`](n);else if(r instanceof Array)if("number"==typeof r[0]){if(n.length!==r[0])throw new p(`Expecting byte array of length ${r[0]}, but got ${n.length} bytes`);i.writeFixedArray(n)}else if(2===r.length&&"number"==typeof r[1]){if(n.length!==r[1])throw new p(`Expecting byte array of length ${r[1]}, but got ${n.length} bytes`);for(let e=0;e<r[1];e++)b(t,null,n[e],r[0],i)}else i.writeArray(n,(n=>{b(t,e,n,r[0],i)}));else if(void 0!==r.kind)switch(r.kind){case"option":null==n?i.writeU8(0):(i.writeU8(1),b(t,e,n,r.type,i));break;case"map":i.writeU32(n.size),n.forEach(((n,o)=>{b(t,e,o,r.key,i),b(t,e,n,r.value,i)}));break;default:throw new p(`FieldType ${r} unrecognized`)}else w(t,n,i)}catch(t){throw t instanceof p&&t.addToFieldPath(e),t}}function w(t,e,n){if("function"==typeof e.borshSerialize)return void e.borshSerialize(n);const r=t.get(e.constructor);if(!r)throw new p(`Class ${e.constructor.name} is missing in schema`);if("struct"===r.kind)r.fields.map((([r,i])=>{b(t,r,e[r],i,n)}));else{if("enum"!==r.kind)throw new p(`Unexpected schema kind: ${r.kind} for ${e.constructor.name}`);{const i=e[r.field];for(let o=0;o<r.values.length;++o){const[s,a]=r.values[o];if(s===i){n.writeU8(o),b(t,s,e[s],a,n);break}}}}}function E(t,e,n,r){try{if("string"==typeof n)return r[`read${v(n)}`]();if(n instanceof Array){if("number"==typeof n[0])return r.readFixedArray(n[0]);if("number"==typeof n[1]){const e=[];for(let i=0;i<n[1];i++)e.push(E(t,null,n[0],r));return e}return r.readArray((()=>E(t,e,n[0],r)))}if("option"===n.kind){return r.readU8()?E(t,e,n.type,r):void 0}if("map"===n.kind){let i=new Map;const o=r.readU32();for(let s=0;s<o;s++){const o=E(t,e,n.key,r),s=E(t,e,n.value,r);i.set(o,s)}return i}return I(t,n,r)}catch(t){throw t instanceof p&&t.addToFieldPath(e),t}}function I(t,e,n){if("function"==typeof e.borshDeserialize)return e.borshDeserialize(n);const r=t.get(e);if(!r)throw new p(`Class ${e.name} is missing in schema`);if("struct"===r.kind){const r={};for(const[i,o]of t.get(e).fields)r[i]=E(t,i,o,n);return new e(r)}if("enum"===r.kind){const i=n.readU8();if(i>=r.values.length)throw new p(`Enum index: ${i} is out of range`);const[o,s]=r.values[i];return new e({[o]:E(t,o,s,n)})}throw new p(`Unexpected schema kind: ${r.kind} for ${e.constructor.name}`)}s([m],y.prototype,"readU8",null),s([m],y.prototype,"readU16",null),s([m],y.prototype,"readU32",null),s([m],y.prototype,"readU64",null),s([m],y.prototype,"readU128",null),s([m],y.prototype,"readU256",null),s([m],y.prototype,"readU512",null),s([m],y.prototype,"readString",null),s([m],y.prototype,"readFixedArray",null),s([m],y.prototype,"readArray",null),e.BinaryReader=y,e.serialize=function(t,e,n=g){const r=new n;return w(t,e,r),r.toArray()},e.deserialize=function(t,e,n,r=y){const i=new r(n),o=I(t,e,i);if(i.offset<n.length)throw new p(`Unexpected ${n.length-i.offset} bytes after deserialized data`);return o},e.deserializeUnchecked=function(t,e,n,r=y){return I(t,e,new r(n))}},77191:function(t,e,n){var r=n(58162);t.exports=r("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")},48764:function(t,e,n){"use strict";var r=n(25108);
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */const i=n(79742),o=n(80645),s="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;e.Buffer=c,e.SlowBuffer=function(t){+t!=t&&(t=0);return c.alloc(+t)},e.INSPECT_MAX_BYTES=50;const a=2147483647;function u(t){if(t>a)throw new RangeError('The value "'+t+'" is invalid for option "size"');const e=new Uint8Array(t);return Object.setPrototypeOf(e,c.prototype),e}function c(t,e,n){if("number"==typeof t){if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');return f(t)}return l(t,e,n)}function l(t,e,n){if("string"==typeof t)return function(t,e){"string"==typeof e&&""!==e||(e="utf8");if(!c.isEncoding(e))throw new TypeError("Unknown encoding: "+e);const n=0|m(t,e);let r=u(n);const i=r.write(t,e);i!==n&&(r=r.slice(0,i));return r}(t,e);if(ArrayBuffer.isView(t))return function(t){if(Q(t,Uint8Array)){const e=new Uint8Array(t);return p(e.buffer,e.byteOffset,e.byteLength)}return d(t)}(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(Q(t,ArrayBuffer)||t&&Q(t.buffer,ArrayBuffer))return p(t,e,n);if("undefined"!=typeof SharedArrayBuffer&&(Q(t,SharedArrayBuffer)||t&&Q(t.buffer,SharedArrayBuffer)))return p(t,e,n);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');const r=t.valueOf&&t.valueOf();if(null!=r&&r!==t)return c.from(r,e,n);const i=function(t){if(c.isBuffer(t)){const e=0|g(t.length),n=u(e);return 0===n.length||t.copy(n,0,0,e),n}if(void 0!==t.length)return"number"!=typeof t.length||X(t.length)?u(0):d(t);if("Buffer"===t.type&&Array.isArray(t.data))return d(t.data)}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return c.from(t[Symbol.toPrimitive]("string"),e,n);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function h(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function f(t){return h(t),u(t<0?0:0|g(t))}function d(t){const e=t.length<0?0:0|g(t.length),n=u(e);for(let r=0;r<e;r+=1)n[r]=255&t[r];return n}function p(t,e,n){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(n||0))throw new RangeError('"length" is outside of buffer bounds');let r;return r=void 0===e&&void 0===n?new Uint8Array(t):void 0===n?new Uint8Array(t,e):new Uint8Array(t,e,n),Object.setPrototypeOf(r,c.prototype),r}function g(t){if(t>=a)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+a.toString(16)+" bytes");return 0|t}function m(t,e){if(c.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||Q(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);const n=t.length,r=arguments.length>2&&!0===arguments[2];if(!r&&0===n)return 0;let i=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return K(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return G(t).length;default:if(i)return r?-1:K(t).length;e=(""+e).toLowerCase(),i=!0}}function y(t,e,n){let r=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if((n>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return M(this,e,n);case"utf8":case"utf-8":return T(this,e,n);case"ascii":return O(this,e,n);case"latin1":case"binary":return R(this,e,n);case"base64":return A(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return P(this,e,n);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}function v(t,e,n){const r=t[e];t[e]=t[n],t[n]=r}function b(t,e,n,r,i){if(0===t.length)return-1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),X(n=+n)&&(n=i?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(i)return-1;n=t.length-1}else if(n<0){if(!i)return-1;n=0}if("string"==typeof e&&(e=c.from(e,r)),c.isBuffer(e))return 0===e.length?-1:w(t,e,n,r,i);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):w(t,[e],n,r,i);throw new TypeError("val must be string, number or Buffer")}function w(t,e,n,r,i){let o,s=1,a=t.length,u=e.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(t.length<2||e.length<2)return-1;s=2,a/=2,u/=2,n/=2}function c(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(i){let r=-1;for(o=n;o<a;o++)if(c(t,o)===c(e,-1===r?0:o-r)){if(-1===r&&(r=o),o-r+1===u)return r*s}else-1!==r&&(o-=o-r),r=-1}else for(n+u>a&&(n=a-u),o=n;o>=0;o--){let n=!0;for(let r=0;r<u;r++)if(c(t,o+r)!==c(e,r)){n=!1;break}if(n)return o}return-1}function E(t,e,n,r){n=Number(n)||0;const i=t.length-n;r?(r=Number(r))>i&&(r=i):r=i;const o=e.length;let s;for(r>o/2&&(r=o/2),s=0;s<r;++s){const r=parseInt(e.substr(2*s,2),16);if(X(r))return s;t[n+s]=r}return s}function I(t,e,n,r){return J(K(e,t.length-n),t,n,r)}function S(t,e,n,r){return J(function(t){const e=[];for(let n=0;n<t.length;++n)e.push(255&t.charCodeAt(n));return e}(e),t,n,r)}function _(t,e,n,r){return J(G(e),t,n,r)}function k(t,e,n,r){return J(function(t,e){let n,r,i;const o=[];for(let s=0;s<t.length&&!((e-=2)<0);++s)n=t.charCodeAt(s),r=n>>8,i=n%256,o.push(i),o.push(r);return o}(e,t.length-n),t,n,r)}function A(t,e,n){return 0===e&&n===t.length?i.fromByteArray(t):i.fromByteArray(t.slice(e,n))}function T(t,e,n){n=Math.min(t.length,n);const r=[];let i=e;for(;i<n;){const e=t[i];let o=null,s=e>239?4:e>223?3:e>191?2:1;if(i+s<=n){let n,r,a,u;switch(s){case 1:e<128&&(o=e);break;case 2:n=t[i+1],128==(192&n)&&(u=(31&e)<<6|63&n,u>127&&(o=u));break;case 3:n=t[i+1],r=t[i+2],128==(192&n)&&128==(192&r)&&(u=(15&e)<<12|(63&n)<<6|63&r,u>2047&&(u<55296||u>57343)&&(o=u));break;case 4:n=t[i+1],r=t[i+2],a=t[i+3],128==(192&n)&&128==(192&r)&&128==(192&a)&&(u=(15&e)<<18|(63&n)<<12|(63&r)<<6|63&a,u>65535&&u<1114112&&(o=u))}}null===o?(o=65533,s=1):o>65535&&(o-=65536,r.push(o>>>10&1023|55296),o=56320|1023&o),r.push(o),i+=s}return function(t){const e=t.length;if(e<=x)return String.fromCharCode.apply(String,t);let n="",r=0;for(;r<e;)n+=String.fromCharCode.apply(String,t.slice(r,r+=x));return n}(r)}e.kMaxLength=a,c.TYPED_ARRAY_SUPPORT=function(){try{const t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return!1}}(),c.TYPED_ARRAY_SUPPORT||void 0===r||"function"!=typeof r.error||r.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(c.prototype,"parent",{enumerable:!0,get:function(){if(c.isBuffer(this))return this.buffer}}),Object.defineProperty(c.prototype,"offset",{enumerable:!0,get:function(){if(c.isBuffer(this))return this.byteOffset}}),c.poolSize=8192,c.from=function(t,e,n){return l(t,e,n)},Object.setPrototypeOf(c.prototype,Uint8Array.prototype),Object.setPrototypeOf(c,Uint8Array),c.alloc=function(t,e,n){return function(t,e,n){return h(t),t<=0?u(t):void 0!==e?"string"==typeof n?u(t).fill(e,n):u(t).fill(e):u(t)}(t,e,n)},c.allocUnsafe=function(t){return f(t)},c.allocUnsafeSlow=function(t){return f(t)},c.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==c.prototype},c.compare=function(t,e){if(Q(t,Uint8Array)&&(t=c.from(t,t.offset,t.byteLength)),Q(e,Uint8Array)&&(e=c.from(e,e.offset,e.byteLength)),!c.isBuffer(t)||!c.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let n=t.length,r=e.length;for(let i=0,o=Math.min(n,r);i<o;++i)if(t[i]!==e[i]){n=t[i],r=e[i];break}return n<r?-1:r<n?1:0},c.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},c.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return c.alloc(0);let n;if(void 0===e)for(e=0,n=0;n<t.length;++n)e+=t[n].length;const r=c.allocUnsafe(e);let i=0;for(n=0;n<t.length;++n){let e=t[n];if(Q(e,Uint8Array))i+e.length>r.length?(c.isBuffer(e)||(e=c.from(e)),e.copy(r,i)):Uint8Array.prototype.set.call(r,e,i);else{if(!c.isBuffer(e))throw new TypeError('"list" argument must be an Array of Buffers');e.copy(r,i)}i+=e.length}return r},c.byteLength=m,c.prototype._isBuffer=!0,c.prototype.swap16=function(){const t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)v(this,e,e+1);return this},c.prototype.swap32=function(){const t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)v(this,e,e+3),v(this,e+1,e+2);return this},c.prototype.swap64=function(){const t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)v(this,e,e+7),v(this,e+1,e+6),v(this,e+2,e+5),v(this,e+3,e+4);return this},c.prototype.toString=function(){const t=this.length;return 0===t?"":0===arguments.length?T(this,0,t):y.apply(this,arguments)},c.prototype.toLocaleString=c.prototype.toString,c.prototype.equals=function(t){if(!c.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===c.compare(this,t)},c.prototype.inspect=function(){let t="";const n=e.INSPECT_MAX_BYTES;return t=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim(),this.length>n&&(t+=" ... "),"<Buffer "+t+">"},s&&(c.prototype[s]=c.prototype.inspect),c.prototype.compare=function(t,e,n,r,i){if(Q(t,Uint8Array)&&(t=c.from(t,t.offset,t.byteLength)),!c.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===e&&(e=0),void 0===n&&(n=t?t.length:0),void 0===r&&(r=0),void 0===i&&(i=this.length),e<0||n>t.length||r<0||i>this.length)throw new RangeError("out of range index");if(r>=i&&e>=n)return 0;if(r>=i)return-1;if(e>=n)return 1;if(this===t)return 0;let o=(i>>>=0)-(r>>>=0),s=(n>>>=0)-(e>>>=0);const a=Math.min(o,s),u=this.slice(r,i),l=t.slice(e,n);for(let t=0;t<a;++t)if(u[t]!==l[t]){o=u[t],s=l[t];break}return o<s?-1:s<o?1:0},c.prototype.includes=function(t,e,n){return-1!==this.indexOf(t,e,n)},c.prototype.indexOf=function(t,e,n){return b(this,t,e,n,!0)},c.prototype.lastIndexOf=function(t,e,n){return b(this,t,e,n,!1)},c.prototype.write=function(t,e,n,r){if(void 0===e)r="utf8",n=this.length,e=0;else if(void 0===n&&"string"==typeof e)r=e,n=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e>>>=0,isFinite(n)?(n>>>=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}const i=this.length-e;if((void 0===n||n>i)&&(n=i),t.length>0&&(n<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");let o=!1;for(;;)switch(r){case"hex":return E(this,t,e,n);case"utf8":case"utf-8":return I(this,t,e,n);case"ascii":case"latin1":case"binary":return S(this,t,e,n);case"base64":return _(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return k(this,t,e,n);default:if(o)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),o=!0}},c.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};const x=4096;function O(t,e,n){let r="";n=Math.min(t.length,n);for(let i=e;i<n;++i)r+=String.fromCharCode(127&t[i]);return r}function R(t,e,n){let r="";n=Math.min(t.length,n);for(let i=e;i<n;++i)r+=String.fromCharCode(t[i]);return r}function M(t,e,n){const r=t.length;(!e||e<0)&&(e=0),(!n||n<0||n>r)&&(n=r);let i="";for(let r=e;r<n;++r)i+=Y[t[r]];return i}function P(t,e,n){const r=t.slice(e,n);let i="";for(let t=0;t<r.length-1;t+=2)i+=String.fromCharCode(r[t]+256*r[t+1]);return i}function C(t,e,n){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}function N(t,e,n,r,i,o){if(!c.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('"value" argument is out of bounds');if(n+r>t.length)throw new RangeError("Index out of range")}function L(t,e,n,r,i){q(e,r,i,t,n,7);let o=Number(e&BigInt(4294967295));t[n++]=o,o>>=8,t[n++]=o,o>>=8,t[n++]=o,o>>=8,t[n++]=o;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[n++]=s,s>>=8,t[n++]=s,s>>=8,t[n++]=s,s>>=8,t[n++]=s,n}function B(t,e,n,r,i){q(e,r,i,t,n,7);let o=Number(e&BigInt(4294967295));t[n+7]=o,o>>=8,t[n+6]=o,o>>=8,t[n+5]=o,o>>=8,t[n+4]=o;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[n+3]=s,s>>=8,t[n+2]=s,s>>=8,t[n+1]=s,s>>=8,t[n]=s,n+8}function D(t,e,n,r,i,o){if(n+r>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function U(t,e,n,r,i){return e=+e,n>>>=0,i||D(t,0,n,4),o.write(t,e,n,r,23,4),n+4}function j(t,e,n,r,i){return e=+e,n>>>=0,i||D(t,0,n,8),o.write(t,e,n,r,52,8),n+8}c.prototype.slice=function(t,e){const n=this.length;(t=~~t)<0?(t+=n)<0&&(t=0):t>n&&(t=n),(e=void 0===e?n:~~e)<0?(e+=n)<0&&(e=0):e>n&&(e=n),e<t&&(e=t);const r=this.subarray(t,e);return Object.setPrototypeOf(r,c.prototype),r},c.prototype.readUintLE=c.prototype.readUIntLE=function(t,e,n){t>>>=0,e>>>=0,n||C(t,e,this.length);let r=this[t],i=1,o=0;for(;++o<e&&(i*=256);)r+=this[t+o]*i;return r},c.prototype.readUintBE=c.prototype.readUIntBE=function(t,e,n){t>>>=0,e>>>=0,n||C(t,e,this.length);let r=this[t+--e],i=1;for(;e>0&&(i*=256);)r+=this[t+--e]*i;return r},c.prototype.readUint8=c.prototype.readUInt8=function(t,e){return t>>>=0,e||C(t,1,this.length),this[t]},c.prototype.readUint16LE=c.prototype.readUInt16LE=function(t,e){return t>>>=0,e||C(t,2,this.length),this[t]|this[t+1]<<8},c.prototype.readUint16BE=c.prototype.readUInt16BE=function(t,e){return t>>>=0,e||C(t,2,this.length),this[t]<<8|this[t+1]},c.prototype.readUint32LE=c.prototype.readUInt32LE=function(t,e){return t>>>=0,e||C(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},c.prototype.readUint32BE=c.prototype.readUInt32BE=function(t,e){return t>>>=0,e||C(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},c.prototype.readBigUInt64LE=Z((function(t){$(t>>>=0,"offset");const e=this[t],n=this[t+7];void 0!==e&&void 0!==n||W(t,this.length-8);const r=e+256*this[++t]+65536*this[++t]+this[++t]*2**24,i=this[++t]+256*this[++t]+65536*this[++t]+n*2**24;return BigInt(r)+(BigInt(i)<<BigInt(32))})),c.prototype.readBigUInt64BE=Z((function(t){$(t>>>=0,"offset");const e=this[t],n=this[t+7];void 0!==e&&void 0!==n||W(t,this.length-8);const r=e*2**24+65536*this[++t]+256*this[++t]+this[++t],i=this[++t]*2**24+65536*this[++t]+256*this[++t]+n;return(BigInt(r)<<BigInt(32))+BigInt(i)})),c.prototype.readIntLE=function(t,e,n){t>>>=0,e>>>=0,n||C(t,e,this.length);let r=this[t],i=1,o=0;for(;++o<e&&(i*=256);)r+=this[t+o]*i;return i*=128,r>=i&&(r-=Math.pow(2,8*e)),r},c.prototype.readIntBE=function(t,e,n){t>>>=0,e>>>=0,n||C(t,e,this.length);let r=e,i=1,o=this[t+--r];for(;r>0&&(i*=256);)o+=this[t+--r]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*e)),o},c.prototype.readInt8=function(t,e){return t>>>=0,e||C(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},c.prototype.readInt16LE=function(t,e){t>>>=0,e||C(t,2,this.length);const n=this[t]|this[t+1]<<8;return 32768&n?4294901760|n:n},c.prototype.readInt16BE=function(t,e){t>>>=0,e||C(t,2,this.length);const n=this[t+1]|this[t]<<8;return 32768&n?4294901760|n:n},c.prototype.readInt32LE=function(t,e){return t>>>=0,e||C(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},c.prototype.readInt32BE=function(t,e){return t>>>=0,e||C(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},c.prototype.readBigInt64LE=Z((function(t){$(t>>>=0,"offset");const e=this[t],n=this[t+7];void 0!==e&&void 0!==n||W(t,this.length-8);const r=this[t+4]+256*this[t+5]+65536*this[t+6]+(n<<24);return(BigInt(r)<<BigInt(32))+BigInt(e+256*this[++t]+65536*this[++t]+this[++t]*2**24)})),c.prototype.readBigInt64BE=Z((function(t){$(t>>>=0,"offset");const e=this[t],n=this[t+7];void 0!==e&&void 0!==n||W(t,this.length-8);const r=(e<<24)+65536*this[++t]+256*this[++t]+this[++t];return(BigInt(r)<<BigInt(32))+BigInt(this[++t]*2**24+65536*this[++t]+256*this[++t]+n)})),c.prototype.readFloatLE=function(t,e){return t>>>=0,e||C(t,4,this.length),o.read(this,t,!0,23,4)},c.prototype.readFloatBE=function(t,e){return t>>>=0,e||C(t,4,this.length),o.read(this,t,!1,23,4)},c.prototype.readDoubleLE=function(t,e){return t>>>=0,e||C(t,8,this.length),o.read(this,t,!0,52,8)},c.prototype.readDoubleBE=function(t,e){return t>>>=0,e||C(t,8,this.length),o.read(this,t,!1,52,8)},c.prototype.writeUintLE=c.prototype.writeUIntLE=function(t,e,n,r){if(t=+t,e>>>=0,n>>>=0,!r){N(this,t,e,n,Math.pow(2,8*n)-1,0)}let i=1,o=0;for(this[e]=255&t;++o<n&&(i*=256);)this[e+o]=t/i&255;return e+n},c.prototype.writeUintBE=c.prototype.writeUIntBE=function(t,e,n,r){if(t=+t,e>>>=0,n>>>=0,!r){N(this,t,e,n,Math.pow(2,8*n)-1,0)}let i=n-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+n},c.prototype.writeUint8=c.prototype.writeUInt8=function(t,e,n){return t=+t,e>>>=0,n||N(this,t,e,1,255,0),this[e]=255&t,e+1},c.prototype.writeUint16LE=c.prototype.writeUInt16LE=function(t,e,n){return t=+t,e>>>=0,n||N(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},c.prototype.writeUint16BE=c.prototype.writeUInt16BE=function(t,e,n){return t=+t,e>>>=0,n||N(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},c.prototype.writeUint32LE=c.prototype.writeUInt32LE=function(t,e,n){return t=+t,e>>>=0,n||N(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},c.prototype.writeUint32BE=c.prototype.writeUInt32BE=function(t,e,n){return t=+t,e>>>=0,n||N(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},c.prototype.writeBigUInt64LE=Z((function(t,e=0){return L(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),c.prototype.writeBigUInt64BE=Z((function(t,e=0){return B(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),c.prototype.writeIntLE=function(t,e,n,r){if(t=+t,e>>>=0,!r){const r=Math.pow(2,8*n-1);N(this,t,e,n,r-1,-r)}let i=0,o=1,s=0;for(this[e]=255&t;++i<n&&(o*=256);)t<0&&0===s&&0!==this[e+i-1]&&(s=1),this[e+i]=(t/o>>0)-s&255;return e+n},c.prototype.writeIntBE=function(t,e,n,r){if(t=+t,e>>>=0,!r){const r=Math.pow(2,8*n-1);N(this,t,e,n,r-1,-r)}let i=n-1,o=1,s=0;for(this[e+i]=255&t;--i>=0&&(o*=256);)t<0&&0===s&&0!==this[e+i+1]&&(s=1),this[e+i]=(t/o>>0)-s&255;return e+n},c.prototype.writeInt8=function(t,e,n){return t=+t,e>>>=0,n||N(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},c.prototype.writeInt16LE=function(t,e,n){return t=+t,e>>>=0,n||N(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},c.prototype.writeInt16BE=function(t,e,n){return t=+t,e>>>=0,n||N(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},c.prototype.writeInt32LE=function(t,e,n){return t=+t,e>>>=0,n||N(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},c.prototype.writeInt32BE=function(t,e,n){return t=+t,e>>>=0,n||N(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},c.prototype.writeBigInt64LE=Z((function(t,e=0){return L(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),c.prototype.writeBigInt64BE=Z((function(t,e=0){return B(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),c.prototype.writeFloatLE=function(t,e,n){return U(this,t,e,!0,n)},c.prototype.writeFloatBE=function(t,e,n){return U(this,t,e,!1,n)},c.prototype.writeDoubleLE=function(t,e,n){return j(this,t,e,!0,n)},c.prototype.writeDoubleBE=function(t,e,n){return j(this,t,e,!1,n)},c.prototype.copy=function(t,e,n,r){if(!c.isBuffer(t))throw new TypeError("argument should be a Buffer");if(n||(n=0),r||0===r||(r=this.length),e>=t.length&&(e=t.length),e||(e=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),t.length-e<r-n&&(r=t.length-e+n);const i=r-n;return this===t&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(e,n,r):Uint8Array.prototype.set.call(t,this.subarray(n,r),e),i},c.prototype.fill=function(t,e,n,r){if("string"==typeof t){if("string"==typeof e?(r=e,e=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!c.isEncoding(r))throw new TypeError("Unknown encoding: "+r);if(1===t.length){const e=t.charCodeAt(0);("utf8"===r&&e<128||"latin1"===r)&&(t=e)}}else"number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;let i;if(e>>>=0,n=void 0===n?this.length:n>>>0,t||(t=0),"number"==typeof t)for(i=e;i<n;++i)this[i]=t;else{const o=c.isBuffer(t)?t:c.from(t,r),s=o.length;if(0===s)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(i=0;i<n-e;++i)this[i+e]=o[i%s]}return this};const F={};function V(t,e,n){F[t]=class extends n{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(t){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:t,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}function z(t){let e="",n=t.length;const r="-"===t[0]?1:0;for(;n>=r+4;n-=3)e=`_${t.slice(n-3,n)}${e}`;return`${t.slice(0,n)}${e}`}function q(t,e,n,r,i,o){if(t>n||t<e){const r="bigint"==typeof e?"n":"";let i;throw i=o>3?0===e||e===BigInt(0)?`>= 0${r} and < 2${r} ** ${8*(o+1)}${r}`:`>= -(2${r} ** ${8*(o+1)-1}${r}) and < 2 ** ${8*(o+1)-1}${r}`:`>= ${e}${r} and <= ${n}${r}`,new F.ERR_OUT_OF_RANGE("value",i,t)}!function(t,e,n){$(e,"offset"),void 0!==t[e]&&void 0!==t[e+n]||W(e,t.length-(n+1))}(r,i,o)}function $(t,e){if("number"!=typeof t)throw new F.ERR_INVALID_ARG_TYPE(e,"number",t)}function W(t,e,n){if(Math.floor(t)!==t)throw $(t,n),new F.ERR_OUT_OF_RANGE(n||"offset","an integer",t);if(e<0)throw new F.ERR_BUFFER_OUT_OF_BOUNDS;throw new F.ERR_OUT_OF_RANGE(n||"offset",`>= ${n?1:0} and <= ${e}`,t)}V("ERR_BUFFER_OUT_OF_BOUNDS",(function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"}),RangeError),V("ERR_INVALID_ARG_TYPE",(function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`}),TypeError),V("ERR_OUT_OF_RANGE",(function(t,e,n){let r=`The value of "${t}" is out of range.`,i=n;return Number.isInteger(n)&&Math.abs(n)>2**32?i=z(String(n)):"bigint"==typeof n&&(i=String(n),(n>BigInt(2)**BigInt(32)||n<-(BigInt(2)**BigInt(32)))&&(i=z(i)),i+="n"),r+=` It must be ${e}. Received ${i}`,r}),RangeError);const H=/[^+/0-9A-Za-z-_]/g;function K(t,e){let n;e=e||1/0;const r=t.length;let i=null;const o=[];for(let s=0;s<r;++s){if(n=t.charCodeAt(s),n>55295&&n<57344){if(!i){if(n>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(s+1===r){(e-=3)>-1&&o.push(239,191,189);continue}i=n;continue}if(n<56320){(e-=3)>-1&&o.push(239,191,189),i=n;continue}n=65536+(i-55296<<10|n-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,n<128){if((e-=1)<0)break;o.push(n)}else if(n<2048){if((e-=2)<0)break;o.push(n>>6|192,63&n|128)}else if(n<65536){if((e-=3)<0)break;o.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return o}function G(t){return i.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(H,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function J(t,e,n,r){let i;for(i=0;i<r&&!(i+n>=e.length||i>=t.length);++i)e[i+n]=t[i];return i}function Q(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}function X(t){return t!=t}const Y=function(){const t="0123456789abcdef",e=new Array(256);for(let n=0;n<16;++n){const r=16*n;for(let i=0;i<16;++i)e[r+i]=t[n]+t[i]}return e}();function Z(t){return"undefined"==typeof BigInt?tt:t}function tt(){throw new Error("BigInt not supported")}},21924:function(t,e,n){"use strict";var r=n(40210),i=n(55559),o=i(r("String.prototype.indexOf"));t.exports=function(t,e){var n=r(t,!!e);return"function"==typeof n&&o(t,".prototype.")>-1?i(n):n}},55559:function(t,e,n){"use strict";var r=n(58612),i=n(40210),o=n(67771),s=i("%TypeError%"),a=i("%Function.prototype.apply%"),u=i("%Function.prototype.call%"),c=i("%Reflect.apply%",!0)||r.call(u,a),l=i("%Object.defineProperty%",!0),h=i("%Math.max%");if(l)try{l({},"a",{value:1})}catch(t){l=null}t.exports=function(t){if("function"!=typeof t)throw new s("a function is required");var e=c(r,u,arguments);return o(e,1+h(0,t.length-(arguments.length-1)),!0)};var f=function(){return c(r,a,arguments)};l?l(t.exports,"apply",{value:f}):t.exports.apply=f},25108:function(t,e,n){var r=n(89539),i=n(69282);function o(){return(new Date).getTime()}var s,a=Array.prototype.slice,u={};s=void 0!==n.g&&n.g.console?n.g.console:"undefined"!=typeof window&&window.console?window.console:{};for(var c=[[function(){},"log"],[function(){s.log.apply(s,arguments)},"info"],[function(){s.log.apply(s,arguments)},"warn"],[function(){s.warn.apply(s,arguments)},"error"],[function(t){u[t]=o()},"time"],[function(t){var e=u[t];if(!e)throw new Error("No such label: "+t);delete u[t];var n=o()-e;s.log(t+": "+n+"ms")},"timeEnd"],[function(){var t=new Error;t.name="Trace",t.message=r.format.apply(null,arguments),s.error(t.stack)},"trace"],[function(t){s.log(r.inspect(t)+"\n")},"dir"],[function(t){if(!t){var e=a.call(arguments,1);i.ok(!1,r.format.apply(null,e))}},"assert"]],l=0;l<c.length;l++){var h=c[l],f=h[0],d=h[1];s[d]||(s[d]=f)}t.exports=s},24963:function(t){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},17722:function(t,e,n){var r=n(86314)("unscopables"),i=Array.prototype;null==i[r]&&n(87728)(i,r,{}),t.exports=function(t){i[r][t]=!0}},76793:function(t,e,n){"use strict";var r=n(24496)(!0);t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},27007:function(t,e,n){var r=n(55286);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},79315:function(t,e,n){var r=n(22110),i=n(10875),o=n(92337);t.exports=function(t){return function(e,n,s){var a,u=r(e),c=i(u.length),l=o(s,c);if(t&&n!=n){for(;c>l;)if((a=u[l++])!=a)return!0}else for(;c>l;l++)if((t||l in u)&&u[l]===n)return t||l||0;return!t&&-1}}},41488:function(t,e,n){var r=n(92032),i=n(86314)("toStringTag"),o="Arguments"==r(function(){return arguments}());t.exports=function(t){var e,n,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),i))?n:o?r(e):"Object"==(s=r(e))&&"function"==typeof e.callee?"Arguments":s}},92032:function(t){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},25645:function(t){var e=t.exports={version:"2.6.9"};"number"==typeof __e&&(__e=e)},741:function(t,e,n){var r=n(24963);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},91355:function(t){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},67057:function(t,e,n){t.exports=!n(74253)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},62457:function(t,e,n){var r=n(55286),i=n(3816).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},74430:function(t){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},42985:function(t,e,n){var r=n(3816),i=n(25645),o=n(87728),s=n(77234),a=n(741),u="prototype",c=function(t,e,n){var l,h,f,d,p=t&c.F,g=t&c.G,m=t&c.S,y=t&c.P,v=t&c.B,b=g?r:m?r[e]||(r[e]={}):(r[e]||{})[u],w=g?i:i[e]||(i[e]={}),E=w[u]||(w[u]={});for(l in g&&(n=e),n)f=((h=!p&&b&&void 0!==b[l])?b:n)[l],d=v&&h?a(f,r):y&&"function"==typeof f?a(Function.call,f):f,b&&s(b,l,f,t&c.U),w[l]!=f&&o(w,l,d),y&&E[l]!=f&&(E[l]=f)};r.core=i,c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},74253:function(t){t.exports=function(t){try{return!!t()}catch(t){return!0}}},28082:function(t,e,n){"use strict";n(18269);var r=n(77234),i=n(87728),o=n(74253),s=n(91355),a=n(86314),u=n(21165),c=a("species"),l=!o((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),h=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var f=a(t),d=!o((function(){var e={};return e[f]=function(){return 7},7!=""[t](e)})),p=d?!o((function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[c]=function(){return n}),n[f](""),!e})):void 0;if(!d||!p||"replace"===t&&!l||"split"===t&&!h){var g=/./[f],m=n(s,f,""[t],(function(t,e,n,r,i){return e.exec===u?d&&!i?{done:!0,value:g.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}})),y=m[0],v=m[1];r(String.prototype,t,y),i(RegExp.prototype,f,2==e?function(t,e){return v.call(t,this,e)}:function(t){return v.call(t,this)})}}},53218:function(t,e,n){"use strict";var r=n(27007);t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},40018:function(t,e,n){t.exports=n(3825)("native-function-to-string",Function.toString)},3816:function(t){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},79181:function(t){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},87728:function(t,e,n){var r=n(99275),i=n(90681);t.exports=n(67057)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},40639:function(t,e,n){var r=n(3816).document;t.exports=r&&r.documentElement},1734:function(t,e,n){t.exports=!n(67057)&&!n(74253)((function(){return 7!=Object.defineProperty(n(62457)("div"),"a",{get:function(){return 7}}).a}))},49797:function(t,e,n){var r=n(92032);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},55286:function(t){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},55364:function(t,e,n){var r=n(55286),i=n(92032),o=n(86314)("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==i(t))}},49988:function(t,e,n){"use strict";var r=n(42503),i=n(90681),o=n(22943),s={};n(87728)(s,n(86314)("iterator"),(function(){return this})),t.exports=function(t,e,n){t.prototype=r(s,{next:i(1,n)}),o(t,e+" Iterator")}},42923:function(t,e,n){"use strict";var r=n(4461),i=n(42985),o=n(77234),s=n(87728),a=n(87234),u=n(49988),c=n(22943),l=n(468),h=n(86314)("iterator"),f=!([].keys&&"next"in[].keys()),d="keys",p="values",g=function(){return this};t.exports=function(t,e,n,m,y,v,b){u(n,e,m);var w,E,I,S=function(t){if(!f&&t in T)return T[t];switch(t){case d:case p:return function(){return new n(this,t)}}return function(){return new n(this,t)}},_=e+" Iterator",k=y==p,A=!1,T=t.prototype,x=T[h]||T["@@iterator"]||y&&T[y],O=x||S(y),R=y?k?S("entries"):O:void 0,M="Array"==e&&T.entries||x;if(M&&(I=l(M.call(new t)))!==Object.prototype&&I.next&&(c(I,_,!0),r||"function"==typeof I[h]||s(I,h,g)),k&&x&&x.name!==p&&(A=!0,O=function(){return x.call(this)}),r&&!b||!f&&!A&&T[h]||s(T,h,O),a[e]=O,a[_]=g,y)if(w={values:k?O:S(p),keys:v?O:S(d),entries:R},b)for(E in w)E in T||o(T,E,w[E]);else i(i.P+i.F*(f||A),e,w);return w}},15436:function(t){t.exports=function(t,e){return{value:e,done:!!t}}},87234:function(t){t.exports={}},4461:function(t){t.exports=!1},42503:function(t,e,n){var r=n(27007),i=n(35588),o=n(74430),s=n(69335)("IE_PROTO"),a=function(){},u="prototype",c=function(){var t,e=n(62457)("iframe"),r=o.length;for(e.style.display="none",n(40639).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;r--;)delete c[u][o[r]];return c()};t.exports=Object.create||function(t,e){var n;return null!==t?(a[u]=r(t),n=new a,a[u]=null,n[s]=t):n=c(),void 0===e?n:i(n,e)}},99275:function(t,e,n){var r=n(27007),i=n(1734),o=n(21689),s=Object.defineProperty;e.f=n(67057)?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},35588:function(t,e,n){var r=n(99275),i=n(27007),o=n(47184);t.exports=n(67057)?Object.defineProperties:function(t,e){i(t);for(var n,s=o(e),a=s.length,u=0;a>u;)r.f(t,n=s[u++],e[n]);return t}},468:function(t,e,n){var r=n(79181),i=n(20508),o=n(69335)("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},60189:function(t,e,n){var r=n(79181),i=n(22110),o=n(79315)(!1),s=n(69335)("IE_PROTO");t.exports=function(t,e){var n,a=i(t),u=0,c=[];for(n in a)n!=s&&r(a,n)&&c.push(n);for(;e.length>u;)r(a,n=e[u++])&&(~o(c,n)||c.push(n));return c}},47184:function(t,e,n){var r=n(60189),i=n(74430);t.exports=Object.keys||function(t){return r(t,i)}},90681:function(t){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},77234:function(t,e,n){var r=n(3816),i=n(87728),o=n(79181),s=n(93953)("src"),a=n(40018),u="toString",c=(""+a).split(u);n(25645).inspectSource=function(t){return a.call(t)},(t.exports=function(t,e,n,a){var u="function"==typeof n;u&&(o(n,"name")||i(n,"name",e)),t[e]!==n&&(u&&(o(n,s)||i(n,s,t[e]?""+t[e]:c.join(String(e)))),t===r?t[e]=n:a?t[e]?t[e]=n:i(t,e,n):(delete t[e],i(t,e,n)))})(Function.prototype,u,(function(){return"function"==typeof this&&this[s]||a.call(this)}))},27787:function(t,e,n){"use strict";var r=n(41488),i=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"==typeof n){var o=n.call(t,e);if("object"!=typeof o)throw new TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return i.call(t,e)}},21165:function(t,e,n){"use strict";var r,i,o=n(53218),s=RegExp.prototype.exec,a=String.prototype.replace,u=s,c="lastIndex",l=(r=/a/,i=/b*/g,s.call(r,"a"),s.call(i,"a"),0!==r[c]||0!==i[c]),h=void 0!==/()??/.exec("")[1];(l||h)&&(u=function(t){var e,n,r,i,u=this;return h&&(n=new RegExp("^"+u.source+"$(?!\\s)",o.call(u))),l&&(e=u[c]),r=s.call(u,t),l&&r&&(u[c]=u.global?r.index+r[0].length:e),h&&r&&r.length>1&&a.call(r[0],n,(function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(r[i]=void 0)})),r}),t.exports=u},27195:function(t){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e}},22943:function(t,e,n){var r=n(99275).f,i=n(79181),o=n(86314)("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},69335:function(t,e,n){var r=n(3825)("keys"),i=n(93953);t.exports=function(t){return r[t]||(r[t]=i(t))}},3825:function(t,e,n){var r=n(25645),i=n(3816),o="__core-js_shared__",s=i[o]||(i[o]={});(t.exports=function(t,e){return s[t]||(s[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(4461)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},58364:function(t,e,n){var r=n(27007),i=n(24963),o=n(86314)("species");t.exports=function(t,e){var n,s=r(t).constructor;return void 0===s||null==(n=r(s)[o])?e:i(n)}},24496:function(t,e,n){var r=n(81467),i=n(91355);t.exports=function(t){return function(e,n){var o,s,a=String(i(e)),u=r(n),c=a.length;return u<0||u>=c?t?"":void 0:(o=a.charCodeAt(u))<55296||o>56319||u+1===c||(s=a.charCodeAt(u+1))<56320||s>57343?t?a.charAt(u):o:t?a.slice(u,u+2):s-56320+(o-55296<<10)+65536}}},92337:function(t,e,n){var r=n(81467),i=Math.max,o=Math.min;t.exports=function(t,e){return(t=r(t))<0?i(t+e,0):o(t,e)}},81467:function(t){var e=Math.ceil,n=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?n:e)(t)}},22110:function(t,e,n){var r=n(49797),i=n(91355);t.exports=function(t){return r(i(t))}},10875:function(t,e,n){var r=n(81467),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},20508:function(t,e,n){var r=n(91355);t.exports=function(t){return Object(r(t))}},21689:function(t,e,n){var r=n(55286);t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},93953:function(t){var e=0,n=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+n).toString(36))}},86314:function(t,e,n){var r=n(3825)("wks"),i=n(93953),o=n(3816).Symbol,s="function"==typeof o;(t.exports=function(t){return r[t]||(r[t]=s&&o[t]||(s?o:i)("Symbol."+t))}).store=r},56997:function(t,e,n){"use strict";var r=n(17722),i=n(15436),o=n(87234),s=n(22110);t.exports=n(42923)(Array,"Array",(function(t,e){this._t=s(t),this._i=0,this._k=e}),(function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,i(1)):i(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])}),"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},18269:function(t,e,n){"use strict";var r=n(21165);n(42985)({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},76774:function(t,e,n){n(67057)&&"g"!=/./g.flags&&n(99275).f(RegExp.prototype,"flags",{configurable:!0,get:n(53218)})},76142:function(t,e,n){"use strict";var r=n(27007),i=n(27195),o=n(27787);n(28082)("search",1,(function(t,e,n,s){return[function(n){var r=t(this),i=null==n?void 0:n[e];return void 0!==i?i.call(n,r):new RegExp(n)[e](String(r))},function(t){var e=s(n,t,this);if(e.done)return e.value;var a=r(t),u=String(this),c=a.lastIndex;i(c,0)||(a.lastIndex=0);var l=o(a,u);return i(a.lastIndex,c)||(a.lastIndex=c),null===l?-1:l.index}]}))},51876:function(t,e,n){"use strict";var r=n(55364),i=n(27007),o=n(58364),s=n(76793),a=n(10875),u=n(27787),c=n(21165),l=n(74253),h=Math.min,f=[].push,d="split",p="length",g="lastIndex",m=4294967295,y=!l((function(){RegExp(m,"y")}));n(28082)("split",2,(function(t,e,n,l){var v;return v="c"=="abbc"[d](/(b)*/)[1]||4!="test"[d](/(?:)/,-1)[p]||2!="ab"[d](/(?:ab)*/)[p]||4!="."[d](/(.?)(.?)/)[p]||"."[d](/()()/)[p]>1||""[d](/.?/)[p]?function(t,e){var i=String(this);if(void 0===t&&0===e)return[];if(!r(t))return n.call(i,t,e);for(var o,s,a,u=[],l=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),h=0,d=void 0===e?m:e>>>0,y=new RegExp(t.source,l+"g");(o=c.call(y,i))&&!((s=y[g])>h&&(u.push(i.slice(h,o.index)),o[p]>1&&o.index<i[p]&&f.apply(u,o.slice(1)),a=o[0][p],h=s,u[p]>=d));)y[g]===o.index&&y[g]++;return h===i[p]?!a&&y.test("")||u.push(""):u.push(i.slice(h)),u[p]>d?u.slice(0,d):u}:"0"[d](void 0,0)[p]?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,r){var i=t(this),o=null==n?void 0:n[e];return void 0!==o?o.call(n,i,r):v.call(String(i),n,r)},function(t,e){var r=l(v,t,this,e,v!==n);if(r.done)return r.value;var c=i(t),f=String(this),d=o(c,RegExp),p=c.unicode,g=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(y?"y":"g"),b=new d(y?c:"^(?:"+c.source+")",g),w=void 0===e?m:e>>>0;if(0===w)return[];if(0===f.length)return null===u(b,f)?[f]:[];for(var E=0,I=0,S=[];I<f.length;){b.lastIndex=y?I:0;var _,k=u(b,y?f:f.slice(I));if(null===k||(_=h(a(b.lastIndex+(y?0:I)),f.length))===E)I=s(f,I,p);else{if(S.push(f.slice(E,I)),S.length===w)return S;for(var A=1;A<=k.length-1;A++)if(S.push(k[A]),S.length===w)return S;I=E=_}}return S.push(f.slice(E)),S}]}))},66108:function(t,e,n){"use strict";n(76774);var r=n(27007),i=n(53218),o=n(67057),s="toString",a=/./[s],u=function(t){n(77234)(RegExp.prototype,s,t,!0)};n(74253)((function(){return"/a/b"!=a.call({source:"a",flags:"b"})}))?u((function(){var t=r(this);return"/".concat(t.source,"/","flags"in t?t.flags:!o&&t instanceof RegExp?i.call(t):void 0)})):a.name!=s&&u((function(){return a.call(this)}))},91181:function(t,e,n){for(var r=n(56997),i=n(47184),o=n(77234),s=n(3816),a=n(87728),u=n(87234),c=n(86314),l=c("iterator"),h=c("toStringTag"),f=u.Array,d={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=i(d),g=0;g<p.length;g++){var m,y=p[g],v=d[y],b=s[y],w=b&&b.prototype;if(w&&(w[l]||a(w,l,f),w[h]||a(w,h,y),u[y]=f,v))for(m in r)w[m]||o(w,m,r[m],!0)}},12296:function(t,e,n){"use strict";var r=n(31044)(),i=n(40210),o=r&&i("%Object.defineProperty%",!0);if(o)try{o({},"a",{value:1})}catch(t){o=!1}var s=i("%SyntaxError%"),a=i("%TypeError%"),u=n(27296);t.exports=function(t,e,n){if(!t||"object"!=typeof t&&"function"!=typeof t)throw new a("`obj` must be an object or a function`");if("string"!=typeof e&&"symbol"!=typeof e)throw new a("`property` must be a string or a symbol`");if(arguments.length>3&&"boolean"!=typeof arguments[3]&&null!==arguments[3])throw new a("`nonEnumerable`, if provided, must be a boolean or null");if(arguments.length>4&&"boolean"!=typeof arguments[4]&&null!==arguments[4])throw new a("`nonWritable`, if provided, must be a boolean or null");if(arguments.length>5&&"boolean"!=typeof arguments[5]&&null!==arguments[5])throw new a("`nonConfigurable`, if provided, must be a boolean or null");if(arguments.length>6&&"boolean"!=typeof arguments[6])throw new a("`loose`, if provided, must be a boolean");var r=arguments.length>3?arguments[3]:null,i=arguments.length>4?arguments[4]:null,c=arguments.length>5?arguments[5]:null,l=arguments.length>6&&arguments[6],h=!!u&&u(t,e);if(o)o(t,e,{configurable:null===c&&h?h.configurable:!c,enumerable:null===r&&h?h.enumerable:!r,value:n,writable:null===i&&h?h.writable:!i});else{if(!l&&(r||i||c))throw new s("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");t[e]=n}}},4289:function(t,e,n){"use strict";var r=n(82215),i="function"==typeof Symbol&&"symbol"==typeof Symbol("foo"),o=Object.prototype.toString,s=Array.prototype.concat,a=n(12296),u=n(31044)(),c=function(t,e,n,r){if(e in t)if(!0===r){if(t[e]===n)return}else if("function"!=typeof(i=r)||"[object Function]"!==o.call(i)||!r())return;var i;u?a(t,e,n,!0):a(t,e,n)},l=function(t,e){var n=arguments.length>2?arguments[2]:{},o=r(e);i&&(o=s.call(o,Object.getOwnPropertySymbols(e)));for(var a=0;a<o.length;a+=1)c(t,o[a],e[o[a]],n[o[a]])};l.supportsDescriptors=!!u,t.exports=l},26729:function(t){"use strict";var e=Object.prototype.hasOwnProperty,n="~";function r(){}function i(t,e,n){this.fn=t,this.context=e,this.once=n||!1}function o(t,e,r,o,s){if("function"!=typeof r)throw new TypeError("The listener must be a function");var a=new i(r,o||t,s),u=n?n+e:e;return t._events[u]?t._events[u].fn?t._events[u]=[t._events[u],a]:t._events[u].push(a):(t._events[u]=a,t._eventsCount++),t}function s(t,e){0==--t._eventsCount?t._events=new r:delete t._events[e]}function a(){this._events=new r,this._eventsCount=0}Object.create&&(r.prototype=Object.create(null),(new r).__proto__||(n=!1)),a.prototype.eventNames=function(){var t,r,i=[];if(0===this._eventsCount)return i;for(r in t=this._events)e.call(t,r)&&i.push(n?r.slice(1):r);return Object.getOwnPropertySymbols?i.concat(Object.getOwnPropertySymbols(t)):i},a.prototype.listeners=function(t){var e=n?n+t:t,r=this._events[e];if(!r)return[];if(r.fn)return[r.fn];for(var i=0,o=r.length,s=new Array(o);i<o;i++)s[i]=r[i].fn;return s},a.prototype.listenerCount=function(t){var e=n?n+t:t,r=this._events[e];return r?r.fn?1:r.length:0},a.prototype.emit=function(t,e,r,i,o,s){var a=n?n+t:t;if(!this._events[a])return!1;var u,c,l=this._events[a],h=arguments.length;if(l.fn){switch(l.once&&this.removeListener(t,l.fn,void 0,!0),h){case 1:return l.fn.call(l.context),!0;case 2:return l.fn.call(l.context,e),!0;case 3:return l.fn.call(l.context,e,r),!0;case 4:return l.fn.call(l.context,e,r,i),!0;case 5:return l.fn.call(l.context,e,r,i,o),!0;case 6:return l.fn.call(l.context,e,r,i,o,s),!0}for(c=1,u=new Array(h-1);c<h;c++)u[c-1]=arguments[c];l.fn.apply(l.context,u)}else{var f,d=l.length;for(c=0;c<d;c++)switch(l[c].once&&this.removeListener(t,l[c].fn,void 0,!0),h){case 1:l[c].fn.call(l[c].context);break;case 2:l[c].fn.call(l[c].context,e);break;case 3:l[c].fn.call(l[c].context,e,r);break;case 4:l[c].fn.call(l[c].context,e,r,i);break;default:if(!u)for(f=1,u=new Array(h-1);f<h;f++)u[f-1]=arguments[f];l[c].fn.apply(l[c].context,u)}}return!0},a.prototype.on=function(t,e,n){return o(this,t,e,n,!1)},a.prototype.once=function(t,e,n){return o(this,t,e,n,!0)},a.prototype.removeListener=function(t,e,r,i){var o=n?n+t:t;if(!this._events[o])return this;if(!e)return s(this,o),this;var a=this._events[o];if(a.fn)a.fn!==e||i&&!a.once||r&&a.context!==r||s(this,o);else{for(var u=0,c=[],l=a.length;u<l;u++)(a[u].fn!==e||i&&!a[u].once||r&&a[u].context!==r)&&c.push(a[u]);c.length?this._events[o]=1===c.length?c[0]:c:s(this,o)}return this},a.prototype.removeAllListeners=function(t){var e;return t?(e=n?n+t:t,this._events[e]&&s(this,e)):(this._events=new r,this._eventsCount=0),this},a.prototype.off=a.prototype.removeListener,a.prototype.addListener=a.prototype.on,a.prefixed=n,a.EventEmitter=a,t.exports=a},94029:function(t,e,n){"use strict";var r=n(95320),i=Object.prototype.toString,o=Object.prototype.hasOwnProperty;t.exports=function(t,e,n){if(!r(e))throw new TypeError("iterator must be a function");var s;arguments.length>=3&&(s=n),"[object Array]"===i.call(t)?function(t,e,n){for(var r=0,i=t.length;r<i;r++)o.call(t,r)&&(null==n?e(t[r],r,t):e.call(n,t[r],r,t))}(t,e,s):"string"==typeof t?function(t,e,n){for(var r=0,i=t.length;r<i;r++)null==n?e(t.charAt(r),r,t):e.call(n,t.charAt(r),r,t)}(t,e,s):function(t,e,n){for(var r in t)o.call(t,r)&&(null==n?e(t[r],r,t):e.call(n,t[r],r,t))}(t,e,s)}},17648:function(t){"use strict";var e=Object.prototype.toString,n=Math.max,r=function(t,e){for(var n=[],r=0;r<t.length;r+=1)n[r]=t[r];for(var i=0;i<e.length;i+=1)n[i+t.length]=e[i];return n};t.exports=function(t){var i=this;if("function"!=typeof i||"[object Function]"!==e.apply(i))throw new TypeError("Function.prototype.bind called on incompatible "+i);for(var o,s=function(t,e){for(var n=[],r=e||0,i=0;r<t.length;r+=1,i+=1)n[i]=t[r];return n}(arguments,1),a=n(0,i.length-s.length),u=[],c=0;c<a;c++)u[c]="$"+c;if(o=Function("binder","return function ("+function(t,e){for(var n="",r=0;r<t.length;r+=1)n+=t[r],r+1<t.length&&(n+=e);return n}(u,",")+"){ return binder.apply(this,arguments); }")((function(){if(this instanceof o){var e=i.apply(this,r(s,arguments));return Object(e)===e?e:this}return i.apply(t,r(s,arguments))})),i.prototype){var l=function(){};l.prototype=i.prototype,o.prototype=new l,l.prototype=null}return o}},58612:function(t,e,n){"use strict";var r=n(17648);t.exports=Function.prototype.bind||r},40210:function(t,e,n){"use strict";var r,i=SyntaxError,o=Function,s=TypeError,a=function(t){try{return o('"use strict"; return ('+t+").constructor;")()}catch(t){}},u=Object.getOwnPropertyDescriptor;if(u)try{u({},"")}catch(t){u=null}var c=function(){throw new s},l=u?function(){try{return c}catch(t){try{return u(arguments,"callee").get}catch(t){return c}}}():c,h=n(41405)(),f=n(28185)(),d=Object.getPrototypeOf||(f?function(t){return t.__proto__}:null),p={},g="undefined"!=typeof Uint8Array&&d?d(Uint8Array):r,m={"%AggregateError%":"undefined"==typeof AggregateError?r:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?r:ArrayBuffer,"%ArrayIteratorPrototype%":h&&d?d([][Symbol.iterator]()):r,"%AsyncFromSyncIteratorPrototype%":r,"%AsyncFunction%":p,"%AsyncGenerator%":p,"%AsyncGeneratorFunction%":p,"%AsyncIteratorPrototype%":p,"%Atomics%":"undefined"==typeof Atomics?r:Atomics,"%BigInt%":"undefined"==typeof BigInt?r:BigInt,"%BigInt64Array%":"undefined"==typeof BigInt64Array?r:BigInt64Array,"%BigUint64Array%":"undefined"==typeof BigUint64Array?r:BigUint64Array,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?r:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"==typeof Float32Array?r:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?r:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?r:FinalizationRegistry,"%Function%":o,"%GeneratorFunction%":p,"%Int8Array%":"undefined"==typeof Int8Array?r:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?r:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?r:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":h&&d?d(d([][Symbol.iterator]())):r,"%JSON%":"object"==typeof JSON?JSON:r,"%Map%":"undefined"==typeof Map?r:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&h&&d?d((new Map)[Symbol.iterator]()):r,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?r:Promise,"%Proxy%":"undefined"==typeof Proxy?r:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"==typeof Reflect?r:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?r:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&h&&d?d((new Set)[Symbol.iterator]()):r,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?r:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":h&&d?d(""[Symbol.iterator]()):r,"%Symbol%":h?Symbol:r,"%SyntaxError%":i,"%ThrowTypeError%":l,"%TypedArray%":g,"%TypeError%":s,"%Uint8Array%":"undefined"==typeof Uint8Array?r:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?r:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?r:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?r:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"==typeof WeakMap?r:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?r:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?r:WeakSet};if(d)try{null.error}catch(t){var y=d(d(t));m["%Error.prototype%"]=y}var v=function t(e){var n;if("%AsyncFunction%"===e)n=a("async function () {}");else if("%GeneratorFunction%"===e)n=a("function* () {}");else if("%AsyncGeneratorFunction%"===e)n=a("async function* () {}");else if("%AsyncGenerator%"===e){var r=t("%AsyncGeneratorFunction%");r&&(n=r.prototype)}else if("%AsyncIteratorPrototype%"===e){var i=t("%AsyncGenerator%");i&&d&&(n=d(i.prototype))}return m[e]=n,n},b={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},w=n(58612),E=n(48824),I=w.call(Function.call,Array.prototype.concat),S=w.call(Function.apply,Array.prototype.splice),_=w.call(Function.call,String.prototype.replace),k=w.call(Function.call,String.prototype.slice),A=w.call(Function.call,RegExp.prototype.exec),T=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,x=/\\(\\)?/g,O=function(t,e){var n,r=t;if(E(b,r)&&(r="%"+(n=b[r])[0]+"%"),E(m,r)){var o=m[r];if(o===p&&(o=v(r)),void 0===o&&!e)throw new s("intrinsic "+t+" exists, but is not available. Please file an issue!");return{alias:n,name:r,value:o}}throw new i("intrinsic "+t+" does not exist!")};t.exports=function(t,e){if("string"!=typeof t||0===t.length)throw new s("intrinsic name must be a non-empty string");if(arguments.length>1&&"boolean"!=typeof e)throw new s('"allowMissing" argument must be a boolean');if(null===A(/^%?[^%]*%?$/,t))throw new i("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var n=function(t){var e=k(t,0,1),n=k(t,-1);if("%"===e&&"%"!==n)throw new i("invalid intrinsic syntax, expected closing `%`");if("%"===n&&"%"!==e)throw new i("invalid intrinsic syntax, expected opening `%`");var r=[];return _(t,T,(function(t,e,n,i){r[r.length]=n?_(i,x,"$1"):e||t})),r}(t),r=n.length>0?n[0]:"",o=O("%"+r+"%",e),a=o.name,c=o.value,l=!1,h=o.alias;h&&(r=h[0],S(n,I([0,1],h)));for(var f=1,d=!0;f<n.length;f+=1){var p=n[f],g=k(p,0,1),y=k(p,-1);if(('"'===g||"'"===g||"`"===g||'"'===y||"'"===y||"`"===y)&&g!==y)throw new i("property names with quotes must have matching quotes");if("constructor"!==p&&d||(l=!0),E(m,a="%"+(r+="."+p)+"%"))c=m[a];else if(null!=c){if(!(p in c)){if(!e)throw new s("base intrinsic for "+t+" exists, but the property is not available.");return}if(u&&f+1>=n.length){var v=u(c,p);c=(d=!!v)&&"get"in v&&!("originalValue"in v.get)?v.get:c[p]}else d=E(c,p),c=c[p];d&&!l&&(m[a]=c)}}return c}},27296:function(t,e,n){"use strict";var r=n(40210)("%Object.getOwnPropertyDescriptor%",!0);if(r)try{r([],"length")}catch(t){r=null}t.exports=r},31044:function(t,e,n){"use strict";var r=n(40210)("%Object.defineProperty%",!0),i=function(){if(r)try{return r({},"a",{value:1}),!0}catch(t){return!1}return!1};i.hasArrayLengthDefineBug=function(){if(!i())return null;try{return 1!==r([],"length",{value:1}).length}catch(t){return!0}},t.exports=i},28185:function(t){"use strict";var e={foo:{}},n=Object;t.exports=function(){return{__proto__:e}.foo===e.foo&&!({__proto__:null}instanceof n)}},41405:function(t,e,n){"use strict";var r="undefined"!=typeof Symbol&&Symbol,i=n(55419);t.exports=function(){return"function"==typeof r&&("function"==typeof Symbol&&("symbol"==typeof r("foo")&&("symbol"==typeof Symbol("bar")&&i())))}},55419:function(t){"use strict";t.exports=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"==typeof Symbol.iterator)return!0;var t={},e=Symbol("test"),n=Object(e);if("string"==typeof e)return!1;if("[object Symbol]"!==Object.prototype.toString.call(e))return!1;if("[object Symbol]"!==Object.prototype.toString.call(n))return!1;for(e in t[e]=42,t)return!1;if("function"==typeof Object.keys&&0!==Object.keys(t).length)return!1;if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(t).length)return!1;var r=Object.getOwnPropertySymbols(t);if(1!==r.length||r[0]!==e)return!1;if(!Object.prototype.propertyIsEnumerable.call(t,e))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){var i=Object.getOwnPropertyDescriptor(t,e);if(42!==i.value||!0!==i.enumerable)return!1}return!0}},96410:function(t,e,n){"use strict";var r=n(55419);t.exports=function(){return r()&&!!Symbol.toStringTag}},48824:function(t,e,n){"use strict";var r=Function.prototype.call,i=Object.prototype.hasOwnProperty,o=n(58612);t.exports=o.call(r,i)},80645:function(t,e){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
e.read=function(t,e,n,r,i){var o,s,a=8*i-r-1,u=(1<<a)-1,c=u>>1,l=-7,h=n?i-1:0,f=n?-1:1,d=t[e+h];for(h+=f,o=d&(1<<-l)-1,d>>=-l,l+=a;l>0;o=256*o+t[e+h],h+=f,l-=8);for(s=o&(1<<-l)-1,o>>=-l,l+=r;l>0;s=256*s+t[e+h],h+=f,l-=8);if(0===o)o=1-c;else{if(o===u)return s?NaN:1/0*(d?-1:1);s+=Math.pow(2,r),o-=c}return(d?-1:1)*s*Math.pow(2,o-r)},e.write=function(t,e,n,r,i,o){var s,a,u,c=8*o-i-1,l=(1<<c)-1,h=l>>1,f=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,d=r?0:o-1,p=r?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,s=l):(s=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-s))<1&&(s--,u*=2),(e+=s+h>=1?f/u:f*Math.pow(2,1-h))*u>=2&&(s++,u/=2),s+h>=l?(a=0,s=l):s+h>=1?(a=(e*u-1)*Math.pow(2,i),s+=h):(a=e*Math.pow(2,h-1)*Math.pow(2,i),s=0));i>=8;t[n+d]=255&a,d+=p,a/=256,i-=8);for(s=s<<i|a,c+=i;c>0;t[n+d]=255&s,d+=p,s/=256,c-=8);t[n+d-p]|=128*g}},35717:function(t){"function"==typeof Object.create?t.exports=function(t,e){e&&(t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:t.exports=function(t,e){if(e){t.super_=e;var n=function(){};n.prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t}}},82584:function(t,e,n){"use strict";var r=n(96410)(),i=n(21924)("Object.prototype.toString"),o=function(t){return!(r&&t&&"object"==typeof t&&Symbol.toStringTag in t)&&"[object Arguments]"===i(t)},s=function(t){return!!o(t)||null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Array]"!==i(t)&&"[object Function]"===i(t.callee)},a=function(){return o(arguments)}();o.isLegacyArguments=s,t.exports=a?o:s},95320:function(t){"use strict";var e,n,r=Function.prototype.toString,i="object"==typeof Reflect&&null!==Reflect&&Reflect.apply;if("function"==typeof i&&"function"==typeof Object.defineProperty)try{e=Object.defineProperty({},"length",{get:function(){throw n}}),n={},i((function(){throw 42}),null,e)}catch(t){t!==n&&(i=null)}else i=null;var o=/^\s*class\b/,s=function(t){try{var e=r.call(t);return o.test(e)}catch(t){return!1}},a=Object.prototype.toString,u="function"==typeof Symbol&&!!Symbol.toStringTag,c="object"==typeof document&&void 0===document.all&&void 0!==document.all?document.all:{};t.exports=i?function(t){if(t===c)return!0;if(!t)return!1;if("function"!=typeof t&&"object"!=typeof t)return!1;if("function"==typeof t&&!t.prototype)return!0;try{i(t,null,e)}catch(t){if(t!==n)return!1}return!s(t)}:function(t){if(t===c)return!0;if(!t)return!1;if("function"!=typeof t&&"object"!=typeof t)return!1;if("function"==typeof t&&!t.prototype)return!0;if(u)return function(t){try{return!s(t)&&(r.call(t),!0)}catch(t){return!1}}(t);if(s(t))return!1;var e=a.call(t);return"[object Function]"===e||"[object GeneratorFunction]"===e}},48662:function(t,e,n){"use strict";var r,i=Object.prototype.toString,o=Function.prototype.toString,s=/^\s*(?:function)?\*/,a=n(96410)(),u=Object.getPrototypeOf;t.exports=function(t){if("function"!=typeof t)return!1;if(s.test(o.call(t)))return!0;if(!a)return"[object GeneratorFunction]"===i.call(t);if(!u)return!1;if(void 0===r){var e=function(){if(!a)return!1;try{return Function("return function*() {}")()}catch(t){}}();r=!!e&&u(e)}return u(t)===r}},98611:function(t){"use strict";t.exports=function(t){return t!=t}},20360:function(t,e,n){"use strict";var r=n(55559),i=n(4289),o=n(98611),s=n(29415),a=n(23194),u=r(s(),Number);i(u,{getPolyfill:s,implementation:o,shim:a}),t.exports=u},29415:function(t,e,n){"use strict";var r=n(98611);t.exports=function(){return Number.isNaN&&Number.isNaN(NaN)&&!Number.isNaN("a")?Number.isNaN:r}},23194:function(t,e,n){"use strict";var r=n(4289),i=n(29415);t.exports=function(){var t=i();return r(Number,{isNaN:t},{isNaN:function(){return Number.isNaN!==t}}),t}},85692:function(t,e,n){"use strict";var r=n(86430);t.exports=function(t){return!!r(t)}},31198:function(t,e,n){"use strict";const r=n(21614).v4,i=n(17741),o=function(t,e){if(!(this instanceof o))return new o(t,e);e||(e={}),this.options={reviver:void 0!==e.reviver?e.reviver:null,replacer:void 0!==e.replacer?e.replacer:null,generator:void 0!==e.generator?e.generator:function(){return r()},version:void 0!==e.version?e.version:2,notificationIdNull:"boolean"==typeof e.notificationIdNull&&e.notificationIdNull},this.callServer=t};t.exports=o,o.prototype.request=function(t,e,n,r){const o=this;let s=null;const a=Array.isArray(t)&&"function"==typeof e;if(1===this.options.version&&a)throw new TypeError("JSON-RPC 1.0 does not support batching");if(a||!a&&t&&"object"==typeof t&&"function"==typeof e)r=e,s=t;else{"function"==typeof n&&(r=n,n=void 0);const o="function"==typeof r;try{s=i(t,e,n,{generator:this.options.generator,version:this.options.version,notificationIdNull:this.options.notificationIdNull})}catch(t){if(o)return r(t);throw t}if(!o)return s}let u;try{u=JSON.stringify(s,this.options.replacer)}catch(t){return r(t)}return this.callServer(u,(function(t,e){o._parseResponse(t,e,r)})),s},o.prototype._parseResponse=function(t,e,n){if(t)return void n(t);if(!e)return n();let r;try{r=JSON.parse(e,this.options.reviver)}catch(t){return n(t)}if(3===n.length){if(Array.isArray(r)){const t=function(t){return void 0!==t.error},e=function(e){return!t(e)};return n(null,r.filter(t),r.filter(e))}return n(null,r.error,r.result)}n(null,r)}},17741:function(t,e,n){"use strict";const r=n(21614).v4;t.exports=function(t,e,n,i){if("string"!=typeof t)throw new TypeError(t+" must be a string");const o="number"==typeof(i=i||{}).version?i.version:2;if(1!==o&&2!==o)throw new TypeError(o+" must be 1 or 2");const s={method:t};if(2===o&&(s.jsonrpc="2.0"),e){if("object"!=typeof e&&!Array.isArray(e))throw new TypeError(e+" must be an object, array or omitted");s.params=e}if(void 0===n){const t="function"==typeof i.generator?i.generator:function(){return r()};s.id=t(s,i)}else 2===o&&null===n?i.notificationIdNull&&(s.id=null):s.id=n;return s}},24244:function(t){"use strict";var e=function(t){return t!=t};t.exports=function(t,n){return 0===t&&0===n?1/t==1/n:t===n||!(!e(t)||!e(n))}},20609:function(t,e,n){"use strict";var r=n(4289),i=n(55559),o=n(24244),s=n(75624),a=n(52281),u=i(s(),Object);r(u,{getPolyfill:s,implementation:o,shim:a}),t.exports=u},75624:function(t,e,n){"use strict";var r=n(24244);t.exports=function(){return"function"==typeof Object.is?Object.is:r}},52281:function(t,e,n){"use strict";var r=n(75624),i=n(4289);t.exports=function(){var t=r();return i(Object,{is:t},{is:function(){return Object.is!==t}}),t}},18987:function(t,e,n){"use strict";var r;if(!Object.keys){var i=Object.prototype.hasOwnProperty,o=Object.prototype.toString,s=n(21414),a=Object.prototype.propertyIsEnumerable,u=!a.call({toString:null},"toString"),c=a.call((function(){}),"prototype"),l=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],h=function(t){var e=t.constructor;return e&&e.prototype===t},f={$applicationCache:!0,$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$onmozfullscreenchange:!0,$onmozfullscreenerror:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},d=function(){if("undefined"==typeof window)return!1;for(var t in window)try{if(!f["$"+t]&&i.call(window,t)&&null!==window[t]&&"object"==typeof window[t])try{h(window[t])}catch(t){return!0}}catch(t){return!0}return!1}();r=function(t){var e=null!==t&&"object"==typeof t,n="[object Function]"===o.call(t),r=s(t),a=e&&"[object String]"===o.call(t),f=[];if(!e&&!n&&!r)throw new TypeError("Object.keys called on a non-object");var p=c&&n;if(a&&t.length>0&&!i.call(t,0))for(var g=0;g<t.length;++g)f.push(String(g));if(r&&t.length>0)for(var m=0;m<t.length;++m)f.push(String(m));else for(var y in t)p&&"prototype"===y||!i.call(t,y)||f.push(String(y));if(u)for(var v=function(t){if("undefined"==typeof window||!d)return h(t);try{return h(t)}catch(t){return!1}}(t),b=0;b<l.length;++b)v&&"constructor"===l[b]||!i.call(t,l[b])||f.push(l[b]);return f}}t.exports=r},82215:function(t,e,n){"use strict";var r=Array.prototype.slice,i=n(21414),o=Object.keys,s=o?function(t){return o(t)}:n(18987),a=Object.keys;s.shim=function(){if(Object.keys){var t=function(){var t=Object.keys(arguments);return t&&t.length===arguments.length}(1,2);t||(Object.keys=function(t){return i(t)?a(r.call(t)):a(t)})}else Object.keys=s;return Object.keys||s},t.exports=s},21414:function(t){"use strict";var e=Object.prototype.toString;t.exports=function(t){var n=e.call(t),r="[object Arguments]"===n;return r||(r="[object Array]"!==n&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===e.call(t.callee)),r}},92837:function(t,e,n){"use strict";var r=n(82215),i=n(55419)(),o=n(21924),s=Object,a=o("Array.prototype.push"),u=o("Object.prototype.propertyIsEnumerable"),c=i?Object.getOwnPropertySymbols:null;t.exports=function(t,e){if(null==t)throw new TypeError("target must be an object");var n=s(t);if(1===arguments.length)return n;for(var o=1;o<arguments.length;++o){var l=s(arguments[o]),h=r(l),f=i&&(Object.getOwnPropertySymbols||c);if(f)for(var d=f(l),p=0;p<d.length;++p){var g=d[p];u(l,g)&&a(h,g)}for(var m=0;m<h.length;++m){var y=h[m];if(u(l,y)){var v=l[y];n[y]=v}}}return n}},28162:function(t,e,n){"use strict";var r=n(92837);t.exports=function(){return Object.assign?function(){if(!Object.assign)return!1;for(var t="abcdefghijklmnopqrst",e=t.split(""),n={},r=0;r<e.length;++r)n[e[r]]=e[r];var i=Object.assign({},n),o="";for(var s in i)o+=s;return t!==o}()||function(){if(!Object.assign||!Object.preventExtensions)return!1;var t=Object.preventExtensions({1:2});try{Object.assign(t,"xy")}catch(e){return"y"===t[1]}return!1}()?r:Object.assign:r}},34155:function(t){var e,n,r=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function s(t){if(e===setTimeout)return setTimeout(t,0);if((e===i||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(n){try{return e.call(null,t,0)}catch(n){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:i}catch(t){e=i}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(t){n=o}}();var a,u=[],c=!1,l=-1;function h(){c&&a&&(c=!1,a.length?u=a.concat(u):l=-1,u.length&&f())}function f(){if(!c){var t=s(h);c=!0;for(var e=u.length;e;){for(a=u,u=[];++l<e;)a&&a[l].run();l=-1,e=u.length}a=null,c=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{return n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function d(t,e){this.fun=t,this.array=e}function p(){}r.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];u.push(new d(t,e)),1!==u.length||c||s(f)},d.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=p,r.addListener=p,r.once=p,r.off=p,r.removeListener=p,r.removeAllListeners=p,r.emit=p,r.prependListener=p,r.prependOnceListener=p,r.listeners=function(t){return[]},r.binding=function(t){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(t){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},66855:function(t,e,n){"use strict";var r=n(48764).Buffer,i=n(64836);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n(64687)),s=i(n(17156)),a=i(n(18698)),u=i(n(56690)),c=i(n(89728)),l=i(n(61655)),h=i(n(94993)),f=i(n(73808)),d=n(26729),p=n(70395);function g(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=(0,f.default)(t);if(e){var i=(0,f.default)(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return(0,h.default)(this,n)}}var m=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]])}return n},y=function(t){(0,l.default)(d,t);var e,n,i,h,f=g(d);function d(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ws://localhost:8080",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3?arguments[3]:void 0,o=arguments.length>4?arguments[4]:void 0;(0,u.default)(this,d);var s=r.autoconnect,a=void 0===s||s,c=r.reconnect,l=void 0===c||c,h=r.reconnect_interval,g=void 0===h?1e3:h,y=r.max_reconnects,v=void 0===y?5:y,b=m(r,["autoconnect","reconnect","reconnect_interval","max_reconnects"]);return(e=f.call(this)).webSocketFactory=t,e.queue={},e.rpc_id=0,e.address=n,e.autoconnect=a,e.ready=!1,e.reconnect=l,e.reconnect_timer_id=void 0,e.reconnect_interval=g,e.max_reconnects=v,e.rest_options=b,e.current_reconnects=0,e.generate_request_id=i||function(){return++e.rpc_id},e.dataPack=o||new p.DefaultDataPack,e.autoconnect&&e._connect(e.address,Object.assign({autoconnect:e.autoconnect,reconnect:e.reconnect,reconnect_interval:e.reconnect_interval,max_reconnects:e.max_reconnects},e.rest_options)),e}return(0,c.default)(d,[{key:"connect",value:function(){this.socket||this._connect(this.address,Object.assign({autoconnect:this.autoconnect,reconnect:this.reconnect,reconnect_interval:this.reconnect_interval,max_reconnects:this.max_reconnects},this.rest_options))}},{key:"call",value:function(t,e,n,r){var i=this;return r||"object"!==(0,a.default)(n)||(r=n,n=null),new Promise((function(o,s){if(!i.ready)return s(new Error("socket not ready"));var a=i.generate_request_id(t,e),u={jsonrpc:"2.0",method:t,params:e||void 0,id:a};i.socket.send(i.dataPack.encode(u),r,(function(t){if(t)return s(t);i.queue[a]={promise:[o,s]},n&&(i.queue[a].timeout=setTimeout((function(){delete i.queue[a],s(new Error("reply timeout"))}),n))}))}))}},{key:"login",value:(h=(0,s.default)(o.default.mark((function t(e){var n;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.call("rpc.login",e);case 2:if(n=t.sent){t.next=5;break}throw new Error("authentication failed");case 5:return t.abrupt("return",n);case 6:case"end":return t.stop()}}),t,this)}))),function(t){return h.apply(this,arguments)})},{key:"listMethods",value:(i=(0,s.default)(o.default.mark((function t(){return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.call("__listMethods");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)}))),function(){return i.apply(this,arguments)})},{key:"notify",value:function(t,e){var n=this;return new Promise((function(r,i){if(!n.ready)return i(new Error("socket not ready"));var o={jsonrpc:"2.0",method:t,params:e};n.socket.send(n.dataPack.encode(o),(function(t){if(t)return i(t);r()}))}))}},{key:"subscribe",value:(n=(0,s.default)(o.default.mark((function t(e){var n;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"string"==typeof e&&(e=[e]),t.next=3,this.call("rpc.on",e);case 3:if(n=t.sent,"string"!=typeof e||"ok"===n[e]){t.next=6;break}throw new Error("Failed subscribing to an event '"+e+"' with: "+n[e]);case 6:return t.abrupt("return",n);case 7:case"end":return t.stop()}}),t,this)}))),function(t){return n.apply(this,arguments)})},{key:"unsubscribe",value:(e=(0,s.default)(o.default.mark((function t(e){var n;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"string"==typeof e&&(e=[e]),t.next=3,this.call("rpc.off",e);case 3:if(n=t.sent,"string"!=typeof e||"ok"===n[e]){t.next=6;break}throw new Error("Failed unsubscribing from an event with: "+n);case 6:return t.abrupt("return",n);case 7:case"end":return t.stop()}}),t,this)}))),function(t){return e.apply(this,arguments)})},{key:"close",value:function(t,e){this.socket.close(t||1e3,e)}},{key:"_connect",value:function(t,e){var n=this;clearTimeout(this.reconnect_timer_id),this.socket=this.webSocketFactory(t,e),this.socket.addEventListener("open",(function(){n.ready=!0,n.emit("open"),n.current_reconnects=0})),this.socket.addEventListener("message",(function(t){var e=t.data;e instanceof ArrayBuffer&&(e=r.from(e).toString());try{e=n.dataPack.decode(e)}catch(t){return}if(e.notification&&n.listeners(e.notification).length){if(!Object.keys(e.params).length)return n.emit(e.notification);var i=[e.notification];if(e.params.constructor===Object)i.push(e.params);else for(var o=0;o<e.params.length;o++)i.push(e.params[o]);return Promise.resolve().then((function(){n.emit.apply(n,i)}))}if(!n.queue[e.id])return e.method&&e.params?Promise.resolve().then((function(){n.emit(e.method,e.params)})):void 0;"error"in e=="result"in e&&n.queue[e.id].promise[1](new Error('Server response malformed. Response must include either "result" or "error", but not both.')),n.queue[e.id].timeout&&clearTimeout(n.queue[e.id].timeout),e.error?n.queue[e.id].promise[1](e.error):n.queue[e.id].promise[0](e.result),delete n.queue[e.id]})),this.socket.addEventListener("error",(function(t){return n.emit("error",t)})),this.socket.addEventListener("close",(function(r){var i=r.code,o=r.reason;n.ready&&setTimeout((function(){return n.emit("close",i,o)}),0),n.ready=!1,n.socket=void 0,1e3!==i&&(n.current_reconnects++,n.reconnect&&(n.max_reconnects>n.current_reconnects||0===n.max_reconnects)&&(n.reconnect_timer_id=setTimeout((function(){return n._connect(t,e)}),n.reconnect_interval)))}))}}]),d}(d.EventEmitter);e.default=y},89062:function(t,e,n){"use strict";var r=n(64836);Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){return new l(t,e)};var i=r(n(56690)),o=r(n(89728)),s=r(n(61655)),a=r(n(94993)),u=r(n(73808));function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=(0,u.default)(t);if(e){var i=(0,u.default)(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return(0,a.default)(this,n)}}var l=function(t){(0,s.default)(n,t);var e=c(n);function n(t,r,o){var s;return(0,i.default)(this,n),(s=e.call(this)).socket=new window.WebSocket(t,o),s.socket.onopen=function(){return s.emit("open")},s.socket.onmessage=function(t){return s.emit("message",t.data)},s.socket.onerror=function(t){return s.emit("error",t)},s.socket.onclose=function(t){s.emit("close",t.code,t.reason)},s}return(0,o.default)(n,[{key:"send",value:function(t,e,n){var r=n||e;try{this.socket.send(t),r()}catch(t){r(t)}}},{key:"close",value:function(t,e){this.socket.close(t,e)}},{key:"addEventListener",value:function(t,e,n){this.socket.addEventListener(t,e,n)}}]),n}(n(26729).EventEmitter)},70395:function(t,e,n){"use strict";var r=n(64836);Object.defineProperty(e,"__esModule",{value:!0}),e.DefaultDataPack=void 0,e.createError=function(t,e){var n={code:t,message:s.get(t)||"Internal Server Error"};e&&(n.data=e);return n};var i=r(n(56690)),o=r(n(89728)),s=new Map([[-32e3,"Event not provided"],[-32600,"Invalid Request"],[-32601,"Method not found"],[-32602,"Invalid params"],[-32603,"Internal error"],[-32604,"Params not found"],[-32605,"Method forbidden"],[-32606,"Event forbidden"],[-32700,"Parse error"]]),a=function(){function t(){(0,i.default)(this,t)}return(0,o.default)(t,[{key:"encode",value:function(t){return JSON.stringify(t)}},{key:"decode",value:function(t){return JSON.parse(t)}}]),t}();e.DefaultDataPack=a},89509:function(t,e,n){
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var r=n(48764),i=r.Buffer;function o(t,e){for(var n in t)e[n]=t[n]}function s(t,e,n){return i(t,e,n)}i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?t.exports=r:(o(r,e),e.Buffer=s),s.prototype=Object.create(i.prototype),o(i,s),s.from=function(t,e,n){if("number"==typeof t)throw new TypeError("Argument must not be a number");return i(t,e,n)},s.alloc=function(t,e,n){if("number"!=typeof t)throw new TypeError("Argument must be a number");var r=i(t);return void 0!==e?"string"==typeof n?r.fill(e,n):r.fill(e):r.fill(0),r},s.allocUnsafe=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return i(t)},s.allocUnsafeSlow=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return r.SlowBuffer(t)}},67771:function(t,e,n){"use strict";var r=n(40210),i=n(12296),o=n(31044)(),s=n(27296),a=r("%TypeError%"),u=r("%Math.floor%");t.exports=function(t,e){if("function"!=typeof t)throw new a("`fn` is not a function");if("number"!=typeof e||e<0||e>4294967295||u(e)!==e)throw new a("`length` must be a positive 32-bit integer");var n=arguments.length>2&&!!arguments[2],r=!0,c=!0;if("length"in t&&s){var l=s(t,"length");l&&!l.configurable&&(r=!1),l&&!l.writable&&(c=!1)}return(r||c||!n)&&(o?i(t,"length",e,!0,!0):i(t,"length",e)),t}},11379:function(t,e){"use strict";function n(t,e,n){return e<=t&&t<=n}function r(t){if(void 0===t)return{};if(t===Object(t))return t;throw TypeError("Could not convert argument to dictionary")}function i(t){this.tokens=[].slice.call(t)}i.prototype={endOfStream:function(){return!this.tokens.length},read:function(){return this.tokens.length?this.tokens.shift():-1},prepend:function(t){if(Array.isArray(t))for(var e=t;e.length;)this.tokens.unshift(e.pop());else this.tokens.unshift(t)},push:function(t){if(Array.isArray(t))for(var e=t;e.length;)this.tokens.push(e.shift());else this.tokens.push(t)}};var o=-1;function s(t,e){if(t)throw TypeError("Decoder error");return e||65533}var a="utf-8";function u(t,e){if(!(this instanceof u))return new u(t,e);if((t=void 0!==t?String(t).toLowerCase():a)!==a)throw new Error("Encoding not supported. Only utf-8 is supported");e=r(e),this._streaming=!1,this._BOMseen=!1,this._decoder=null,this._fatal=Boolean(e.fatal),this._ignoreBOM=Boolean(e.ignoreBOM),Object.defineProperty(this,"encoding",{value:"utf-8"}),Object.defineProperty(this,"fatal",{value:this._fatal}),Object.defineProperty(this,"ignoreBOM",{value:this._ignoreBOM})}function c(t,e){if(!(this instanceof c))return new c(t,e);if((t=void 0!==t?String(t).toLowerCase():a)!==a)throw new Error("Encoding not supported. Only utf-8 is supported");e=r(e),this._streaming=!1,this._encoder=null,this._options={fatal:Boolean(e.fatal)},Object.defineProperty(this,"encoding",{value:"utf-8"})}function l(t){var e=t.fatal,r=0,i=0,a=0,u=128,c=191;this.handler=function(t,l){if(-1===l&&0!==a)return a=0,s(e);if(-1===l)return o;if(0===a){if(n(l,0,127))return l;if(n(l,194,223))a=1,r=l-192;else if(n(l,224,239))224===l&&(u=160),237===l&&(c=159),a=2,r=l-224;else{if(!n(l,240,244))return s(e);240===l&&(u=144),244===l&&(c=143),a=3,r=l-240}return r<<=6*a,null}if(!n(l,u,c))return r=a=i=0,u=128,c=191,t.prepend(l),s(e);if(u=128,c=191,r+=l-128<<6*(a-(i+=1)),i!==a)return null;var h=r;return r=a=i=0,h}}function h(t){t.fatal;this.handler=function(t,e){if(-1===e)return o;if(n(e,0,127))return e;var r,i;n(e,128,2047)?(r=1,i=192):n(e,2048,65535)?(r=2,i=224):n(e,65536,1114111)&&(r=3,i=240);for(var s=[(e>>6*r)+i];r>0;){var a=e>>6*(r-1);s.push(128|63&a),r-=1}return s}}u.prototype={decode:function(t,e){var n;n="object"==typeof t&&t instanceof ArrayBuffer?new Uint8Array(t):"object"==typeof t&&"buffer"in t&&t.buffer instanceof ArrayBuffer?new Uint8Array(t.buffer,t.byteOffset,t.byteLength):new Uint8Array(0),e=r(e),this._streaming||(this._decoder=new l({fatal:this._fatal}),this._BOMseen=!1),this._streaming=Boolean(e.stream);for(var s,a=new i(n),u=[];!a.endOfStream()&&(s=this._decoder.handler(a,a.read()))!==o;)null!==s&&(Array.isArray(s)?u.push.apply(u,s):u.push(s));if(!this._streaming){do{if((s=this._decoder.handler(a,a.read()))===o)break;null!==s&&(Array.isArray(s)?u.push.apply(u,s):u.push(s))}while(!a.endOfStream());this._decoder=null}return u.length&&(-1===["utf-8"].indexOf(this.encoding)||this._ignoreBOM||this._BOMseen||(65279===u[0]?(this._BOMseen=!0,u.shift()):this._BOMseen=!0)),function(t){for(var e="",n=0;n<t.length;++n){var r=t[n];r<=65535?e+=String.fromCharCode(r):(r-=65536,e+=String.fromCharCode(55296+(r>>10),56320+(1023&r)))}return e}(u)}},c.prototype={encode:function(t,e){t=t?String(t):"",e=r(e),this._streaming||(this._encoder=new h(this._options)),this._streaming=Boolean(e.stream);for(var n,s=[],a=new i(function(t){for(var e=String(t),n=e.length,r=0,i=[];r<n;){var o=e.charCodeAt(r);if(o<55296||o>57343)i.push(o);else if(56320<=o&&o<=57343)i.push(65533);else if(55296<=o&&o<=56319)if(r===n-1)i.push(65533);else{var s=t.charCodeAt(r+1);if(56320<=s&&s<=57343){var a=1023&o,u=1023&s;i.push(65536+(a<<10)+u),r+=1}else i.push(65533)}r+=1}return i}(t));!a.endOfStream()&&(n=this._encoder.handler(a,a.read()))!==o;)Array.isArray(n)?s.push.apply(s,n):s.push(n);if(!this._streaming){for(;(n=this._encoder.handler(a,a.read()))!==o;)Array.isArray(n)?s.push.apply(s,n):s.push(n);this._encoder=null}return new Uint8Array(s)}},e.TextEncoder=c,e.TextDecoder=u},20384:function(t){t.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},55955:function(t,e,n){"use strict";var r=n(82584),i=n(48662),o=n(86430),s=n(85692);function a(t){return t.call.bind(t)}var u="undefined"!=typeof BigInt,c="undefined"!=typeof Symbol,l=a(Object.prototype.toString),h=a(Number.prototype.valueOf),f=a(String.prototype.valueOf),d=a(Boolean.prototype.valueOf);if(u)var p=a(BigInt.prototype.valueOf);if(c)var g=a(Symbol.prototype.valueOf);function m(t,e){if("object"!=typeof t)return!1;try{return e(t),!0}catch(t){return!1}}function y(t){return"[object Map]"===l(t)}function v(t){return"[object Set]"===l(t)}function b(t){return"[object WeakMap]"===l(t)}function w(t){return"[object WeakSet]"===l(t)}function E(t){return"[object ArrayBuffer]"===l(t)}function I(t){return"undefined"!=typeof ArrayBuffer&&(E.working?E(t):t instanceof ArrayBuffer)}function S(t){return"[object DataView]"===l(t)}function _(t){return"undefined"!=typeof DataView&&(S.working?S(t):t instanceof DataView)}e.isArgumentsObject=r,e.isGeneratorFunction=i,e.isTypedArray=s,e.isPromise=function(t){return"undefined"!=typeof Promise&&t instanceof Promise||null!==t&&"object"==typeof t&&"function"==typeof t.then&&"function"==typeof t.catch},e.isArrayBufferView=function(t){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):s(t)||_(t)},e.isUint8Array=function(t){return"Uint8Array"===o(t)},e.isUint8ClampedArray=function(t){return"Uint8ClampedArray"===o(t)},e.isUint16Array=function(t){return"Uint16Array"===o(t)},e.isUint32Array=function(t){return"Uint32Array"===o(t)},e.isInt8Array=function(t){return"Int8Array"===o(t)},e.isInt16Array=function(t){return"Int16Array"===o(t)},e.isInt32Array=function(t){return"Int32Array"===o(t)},e.isFloat32Array=function(t){return"Float32Array"===o(t)},e.isFloat64Array=function(t){return"Float64Array"===o(t)},e.isBigInt64Array=function(t){return"BigInt64Array"===o(t)},e.isBigUint64Array=function(t){return"BigUint64Array"===o(t)},y.working="undefined"!=typeof Map&&y(new Map),e.isMap=function(t){return"undefined"!=typeof Map&&(y.working?y(t):t instanceof Map)},v.working="undefined"!=typeof Set&&v(new Set),e.isSet=function(t){return"undefined"!=typeof Set&&(v.working?v(t):t instanceof Set)},b.working="undefined"!=typeof WeakMap&&b(new WeakMap),e.isWeakMap=function(t){return"undefined"!=typeof WeakMap&&(b.working?b(t):t instanceof WeakMap)},w.working="undefined"!=typeof WeakSet&&w(new WeakSet),e.isWeakSet=function(t){return w(t)},E.working="undefined"!=typeof ArrayBuffer&&E(new ArrayBuffer),e.isArrayBuffer=I,S.working="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView&&S(new DataView(new ArrayBuffer(1),0,1)),e.isDataView=_;var k="undefined"!=typeof SharedArrayBuffer?SharedArrayBuffer:void 0;function A(t){return"[object SharedArrayBuffer]"===l(t)}function T(t){return void 0!==k&&(void 0===A.working&&(A.working=A(new k)),A.working?A(t):t instanceof k)}function x(t){return m(t,h)}function O(t){return m(t,f)}function R(t){return m(t,d)}function M(t){return u&&m(t,p)}function P(t){return c&&m(t,g)}e.isSharedArrayBuffer=T,e.isAsyncFunction=function(t){return"[object AsyncFunction]"===l(t)},e.isMapIterator=function(t){return"[object Map Iterator]"===l(t)},e.isSetIterator=function(t){return"[object Set Iterator]"===l(t)},e.isGeneratorObject=function(t){return"[object Generator]"===l(t)},e.isWebAssemblyCompiledModule=function(t){return"[object WebAssembly.Module]"===l(t)},e.isNumberObject=x,e.isStringObject=O,e.isBooleanObject=R,e.isBigIntObject=M,e.isSymbolObject=P,e.isBoxedPrimitive=function(t){return x(t)||O(t)||R(t)||M(t)||P(t)},e.isAnyArrayBuffer=function(t){return"undefined"!=typeof Uint8Array&&(I(t)||T(t))},["isProxy","isExternal","isModuleNamespaceObject"].forEach((function(t){Object.defineProperty(e,t,{enumerable:!1,value:function(){throw new Error(t+" is not supported in userland")}})}))},89539:function(t,e,n){var r=n(34155),i=n(25108),o=Object.getOwnPropertyDescriptors||function(t){for(var e=Object.keys(t),n={},r=0;r<e.length;r++)n[e[r]]=Object.getOwnPropertyDescriptor(t,e[r]);return n},s=/%[sdj%]/g;e.format=function(t){if(!w(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(l(arguments[n]));return e.join(" ")}n=1;for(var r=arguments,i=r.length,o=String(t).replace(s,(function(t){if("%%"===t)return"%";if(n>=i)return t;switch(t){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(t){return"[Circular]"}default:return t}})),a=r[n];n<i;a=r[++n])v(a)||!S(a)?o+=" "+a:o+=" "+l(a);return o},e.deprecate=function(t,n){if(void 0!==r&&!0===r.noDeprecation)return t;if(void 0===r)return function(){return e.deprecate(t,n).apply(this,arguments)};var o=!1;return function(){if(!o){if(r.throwDeprecation)throw new Error(n);r.traceDeprecation?i.trace(n):i.error(n),o=!0}return t.apply(this,arguments)}};var a={},u=/^$/;if(r.env.NODE_DEBUG){var c=r.env.NODE_DEBUG;c=c.replace(/[|\\{}()[\]^$+?.]/g,"\\$&").replace(/\*/g,".*").replace(/,/g,"$|^").toUpperCase(),u=new RegExp("^"+c+"$","i")}function l(t,n){var r={seen:[],stylize:f};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),y(n)?r.showHidden=n:n&&e._extend(r,n),E(r.showHidden)&&(r.showHidden=!1),E(r.depth)&&(r.depth=2),E(r.colors)&&(r.colors=!1),E(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=h),d(r,t,r.depth)}function h(t,e){var n=l.styles[e];return n?"["+l.colors[n][0]+"m"+t+"["+l.colors[n][1]+"m":t}function f(t,e){return t}function d(t,n,r){if(t.customInspect&&n&&A(n.inspect)&&n.inspect!==e.inspect&&(!n.constructor||n.constructor.prototype!==n)){var i=n.inspect(r,t);return w(i)||(i=d(t,i,r)),i}var o=function(t,e){if(E(e))return t.stylize("undefined","undefined");if(w(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string")}if(b(e))return t.stylize(""+e,"number");if(y(e))return t.stylize(""+e,"boolean");if(v(e))return t.stylize("null","null")}(t,n);if(o)return o;var s=Object.keys(n),a=function(t){var e={};return t.forEach((function(t,n){e[t]=!0})),e}(s);if(t.showHidden&&(s=Object.getOwnPropertyNames(n)),k(n)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return p(n);if(0===s.length){if(A(n)){var u=n.name?": "+n.name:"";return t.stylize("[Function"+u+"]","special")}if(I(n))return t.stylize(RegExp.prototype.toString.call(n),"regexp");if(_(n))return t.stylize(Date.prototype.toString.call(n),"date");if(k(n))return p(n)}var c,l="",h=!1,f=["{","}"];(m(n)&&(h=!0,f=["[","]"]),A(n))&&(l=" [Function"+(n.name?": "+n.name:"")+"]");return I(n)&&(l=" "+RegExp.prototype.toString.call(n)),_(n)&&(l=" "+Date.prototype.toUTCString.call(n)),k(n)&&(l=" "+p(n)),0!==s.length||h&&0!=n.length?r<0?I(n)?t.stylize(RegExp.prototype.toString.call(n),"regexp"):t.stylize("[Object]","special"):(t.seen.push(n),c=h?function(t,e,n,r,i){for(var o=[],s=0,a=e.length;s<a;++s)R(e,String(s))?o.push(g(t,e,n,r,String(s),!0)):o.push("");return i.forEach((function(i){i.match(/^\d+$/)||o.push(g(t,e,n,r,i,!0))})),o}(t,n,r,a,s):s.map((function(e){return g(t,n,r,a,e,h)})),t.seen.pop(),function(t,e,n){var r=t.reduce((function(t,e){return e.indexOf("\n")>=0&&0,t+e.replace(/\u001b\[\d\d?m/g,"").length+1}),0);if(r>60)return n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1];return n[0]+e+" "+t.join(", ")+" "+n[1]}(c,l,f)):f[0]+l+f[1]}function p(t){return"["+Error.prototype.toString.call(t)+"]"}function g(t,e,n,r,i,o){var s,a,u;if((u=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]}).get?a=u.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):u.set&&(a=t.stylize("[Setter]","special")),R(r,i)||(s="["+i+"]"),a||(t.seen.indexOf(u.value)<0?(a=v(n)?d(t,u.value,null):d(t,u.value,n-1)).indexOf("\n")>-1&&(a=o?a.split("\n").map((function(t){return"  "+t})).join("\n").slice(2):"\n"+a.split("\n").map((function(t){return"   "+t})).join("\n")):a=t.stylize("[Circular]","special")),E(s)){if(o&&i.match(/^\d+$/))return a;(s=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.slice(1,-1),s=t.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=t.stylize(s,"string"))}return s+": "+a}function m(t){return Array.isArray(t)}function y(t){return"boolean"==typeof t}function v(t){return null===t}function b(t){return"number"==typeof t}function w(t){return"string"==typeof t}function E(t){return void 0===t}function I(t){return S(t)&&"[object RegExp]"===T(t)}function S(t){return"object"==typeof t&&null!==t}function _(t){return S(t)&&"[object Date]"===T(t)}function k(t){return S(t)&&("[object Error]"===T(t)||t instanceof Error)}function A(t){return"function"==typeof t}function T(t){return Object.prototype.toString.call(t)}function x(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(t){if(t=t.toUpperCase(),!a[t])if(u.test(t)){var n=r.pid;a[t]=function(){var r=e.format.apply(e,arguments);i.error("%s %d: %s",t,n,r)}}else a[t]=function(){};return a[t]},e.inspect=l,l.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},l.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.types=n(55955),e.isArray=m,e.isBoolean=y,e.isNull=v,e.isNullOrUndefined=function(t){return null==t},e.isNumber=b,e.isString=w,e.isSymbol=function(t){return"symbol"==typeof t},e.isUndefined=E,e.isRegExp=I,e.types.isRegExp=I,e.isObject=S,e.isDate=_,e.types.isDate=_,e.isError=k,e.types.isNativeError=k,e.isFunction=A,e.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||void 0===t},e.isBuffer=n(20384);var O=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function R(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){var t,n;i.log("%s - %s",(t=new Date,n=[x(t.getHours()),x(t.getMinutes()),x(t.getSeconds())].join(":"),[t.getDate(),O[t.getMonth()],n].join(" ")),e.format.apply(e,arguments))},e.inherits=n(35717),e._extend=function(t,e){if(!e||!S(e))return t;for(var n=Object.keys(e),r=n.length;r--;)t[n[r]]=e[n[r]];return t};var M="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function P(t,e){if(!t){var n=new Error("Promise was rejected with a falsy value");n.reason=t,t=n}return e(t)}e.promisify=function(t){if("function"!=typeof t)throw new TypeError('The "original" argument must be of type Function');if(M&&t[M]){var e;if("function"!=typeof(e=t[M]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(e,M,{value:e,enumerable:!1,writable:!1,configurable:!0}),e}function e(){for(var e,n,r=new Promise((function(t,r){e=t,n=r})),i=[],o=0;o<arguments.length;o++)i.push(arguments[o]);i.push((function(t,r){t?n(t):e(r)}));try{t.apply(this,i)}catch(t){n(t)}return r}return Object.setPrototypeOf(e,Object.getPrototypeOf(t)),M&&Object.defineProperty(e,M,{value:e,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(e,o(t))},e.promisify.custom=M,e.callbackify=function(t){if("function"!=typeof t)throw new TypeError('The "original" argument must be of type Function');function e(){for(var e=[],n=0;n<arguments.length;n++)e.push(arguments[n]);var i=e.pop();if("function"!=typeof i)throw new TypeError("The last argument must be of type Function");var o=this,s=function(){return i.apply(o,arguments)};t.apply(this,e).then((function(t){r.nextTick(s.bind(null,null,t))}),(function(t){r.nextTick(P.bind(null,t,s))}))}return Object.setPrototypeOf(e,Object.getPrototypeOf(t)),Object.defineProperties(e,o(t)),e}},21614:function(t,e,n){"use strict";var r;n.r(e),n.d(e,{NIL:function(){return P},parse:function(){return m},stringify:function(){return f},v1:function(){return g},v3:function(){return A},v4:function(){return T},v5:function(){return M},validate:function(){return a},version:function(){return C}});var i=new Uint8Array(16);function o(){if(!r&&!(r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(i)}var s=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var a=function(t){return"string"==typeof t&&s.test(t)},u=[],c=0;c<256;++c)u.push((c+256).toString(16).substr(1));var l,h,f=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(u[t[e+0]]+u[t[e+1]]+u[t[e+2]]+u[t[e+3]]+"-"+u[t[e+4]]+u[t[e+5]]+"-"+u[t[e+6]]+u[t[e+7]]+"-"+u[t[e+8]]+u[t[e+9]]+"-"+u[t[e+10]]+u[t[e+11]]+u[t[e+12]]+u[t[e+13]]+u[t[e+14]]+u[t[e+15]]).toLowerCase();if(!a(n))throw TypeError("Stringified UUID is invalid");return n},d=0,p=0;var g=function(t,e,n){var r=e&&n||0,i=e||new Array(16),s=(t=t||{}).node||l,a=void 0!==t.clockseq?t.clockseq:h;if(null==s||null==a){var u=t.random||(t.rng||o)();null==s&&(s=l=[1|u[0],u[1],u[2],u[3],u[4],u[5]]),null==a&&(a=h=16383&(u[6]<<8|u[7]))}var c=void 0!==t.msecs?t.msecs:Date.now(),g=void 0!==t.nsecs?t.nsecs:p+1,m=c-d+(g-p)/1e4;if(m<0&&void 0===t.clockseq&&(a=a+1&16383),(m<0||c>d)&&void 0===t.nsecs&&(g=0),g>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");d=c,p=g,h=a;var y=(1e4*(268435455&(c+=122192928e5))+g)%4294967296;i[r++]=y>>>24&255,i[r++]=y>>>16&255,i[r++]=y>>>8&255,i[r++]=255&y;var v=c/4294967296*1e4&268435455;i[r++]=v>>>8&255,i[r++]=255&v,i[r++]=v>>>24&15|16,i[r++]=v>>>16&255,i[r++]=a>>>8|128,i[r++]=255&a;for(var b=0;b<6;++b)i[r+b]=s[b];return e||f(i)};var m=function(t){if(!a(t))throw TypeError("Invalid UUID");var e,n=new Uint8Array(16);return n[0]=(e=parseInt(t.slice(0,8),16))>>>24,n[1]=e>>>16&255,n[2]=e>>>8&255,n[3]=255&e,n[4]=(e=parseInt(t.slice(9,13),16))>>>8,n[5]=255&e,n[6]=(e=parseInt(t.slice(14,18),16))>>>8,n[7]=255&e,n[8]=(e=parseInt(t.slice(19,23),16))>>>8,n[9]=255&e,n[10]=(e=parseInt(t.slice(24,36),16))/1099511627776&255,n[11]=e/4294967296&255,n[12]=e>>>24&255,n[13]=e>>>16&255,n[14]=e>>>8&255,n[15]=255&e,n};function y(t,e,n){function r(t,r,i,o){if("string"==typeof t&&(t=function(t){t=unescape(encodeURIComponent(t));for(var e=[],n=0;n<t.length;++n)e.push(t.charCodeAt(n));return e}(t)),"string"==typeof r&&(r=m(r)),16!==r.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");var s=new Uint8Array(16+t.length);if(s.set(r),s.set(t,r.length),(s=n(s))[6]=15&s[6]|e,s[8]=63&s[8]|128,i){o=o||0;for(var a=0;a<16;++a)i[o+a]=s[a];return i}return f(s)}try{r.name=t}catch(t){}return r.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",r.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",r}function v(t){return 14+(t+64>>>9<<4)+1}function b(t,e){var n=(65535&t)+(65535&e);return(t>>16)+(e>>16)+(n>>16)<<16|65535&n}function w(t,e,n,r,i,o){return b((s=b(b(e,t),b(r,o)))<<(a=i)|s>>>32-a,n);var s,a}function E(t,e,n,r,i,o,s){return w(e&n|~e&r,t,e,i,o,s)}function I(t,e,n,r,i,o,s){return w(e&r|n&~r,t,e,i,o,s)}function S(t,e,n,r,i,o,s){return w(e^n^r,t,e,i,o,s)}function _(t,e,n,r,i,o,s){return w(n^(e|~r),t,e,i,o,s)}var k=function(t){if("string"==typeof t){var e=unescape(encodeURIComponent(t));t=new Uint8Array(e.length);for(var n=0;n<e.length;++n)t[n]=e.charCodeAt(n)}return function(t){for(var e=[],n=32*t.length,r="0123456789abcdef",i=0;i<n;i+=8){var o=t[i>>5]>>>i%32&255,s=parseInt(r.charAt(o>>>4&15)+r.charAt(15&o),16);e.push(s)}return e}(function(t,e){t[e>>5]|=128<<e%32,t[v(e)-1]=e;for(var n=1732584193,r=-271733879,i=-1732584194,o=271733878,s=0;s<t.length;s+=16){var a=n,u=r,c=i,l=o;n=E(n,r,i,o,t[s],7,-680876936),o=E(o,n,r,i,t[s+1],12,-389564586),i=E(i,o,n,r,t[s+2],17,606105819),r=E(r,i,o,n,t[s+3],22,-1044525330),n=E(n,r,i,o,t[s+4],7,-176418897),o=E(o,n,r,i,t[s+5],12,1200080426),i=E(i,o,n,r,t[s+6],17,-1473231341),r=E(r,i,o,n,t[s+7],22,-45705983),n=E(n,r,i,o,t[s+8],7,1770035416),o=E(o,n,r,i,t[s+9],12,-1958414417),i=E(i,o,n,r,t[s+10],17,-42063),r=E(r,i,o,n,t[s+11],22,-1990404162),n=E(n,r,i,o,t[s+12],7,1804603682),o=E(o,n,r,i,t[s+13],12,-40341101),i=E(i,o,n,r,t[s+14],17,-1502002290),n=I(n,r=E(r,i,o,n,t[s+15],22,1236535329),i,o,t[s+1],5,-165796510),o=I(o,n,r,i,t[s+6],9,-1069501632),i=I(i,o,n,r,t[s+11],14,643717713),r=I(r,i,o,n,t[s],20,-373897302),n=I(n,r,i,o,t[s+5],5,-701558691),o=I(o,n,r,i,t[s+10],9,38016083),i=I(i,o,n,r,t[s+15],14,-660478335),r=I(r,i,o,n,t[s+4],20,-405537848),n=I(n,r,i,o,t[s+9],5,568446438),o=I(o,n,r,i,t[s+14],9,-1019803690),i=I(i,o,n,r,t[s+3],14,-187363961),r=I(r,i,o,n,t[s+8],20,1163531501),n=I(n,r,i,o,t[s+13],5,-1444681467),o=I(o,n,r,i,t[s+2],9,-51403784),i=I(i,o,n,r,t[s+7],14,1735328473),n=S(n,r=I(r,i,o,n,t[s+12],20,-1926607734),i,o,t[s+5],4,-378558),o=S(o,n,r,i,t[s+8],11,-2022574463),i=S(i,o,n,r,t[s+11],16,1839030562),r=S(r,i,o,n,t[s+14],23,-35309556),n=S(n,r,i,o,t[s+1],4,-1530992060),o=S(o,n,r,i,t[s+4],11,1272893353),i=S(i,o,n,r,t[s+7],16,-155497632),r=S(r,i,o,n,t[s+10],23,-1094730640),n=S(n,r,i,o,t[s+13],4,681279174),o=S(o,n,r,i,t[s],11,-358537222),i=S(i,o,n,r,t[s+3],16,-722521979),r=S(r,i,o,n,t[s+6],23,76029189),n=S(n,r,i,o,t[s+9],4,-640364487),o=S(o,n,r,i,t[s+12],11,-421815835),i=S(i,o,n,r,t[s+15],16,530742520),n=_(n,r=S(r,i,o,n,t[s+2],23,-995338651),i,o,t[s],6,-198630844),o=_(o,n,r,i,t[s+7],10,1126891415),i=_(i,o,n,r,t[s+14],15,-1416354905),r=_(r,i,o,n,t[s+5],21,-57434055),n=_(n,r,i,o,t[s+12],6,1700485571),o=_(o,n,r,i,t[s+3],10,-1894986606),i=_(i,o,n,r,t[s+10],15,-1051523),r=_(r,i,o,n,t[s+1],21,-2054922799),n=_(n,r,i,o,t[s+8],6,1873313359),o=_(o,n,r,i,t[s+15],10,-30611744),i=_(i,o,n,r,t[s+6],15,-1560198380),r=_(r,i,o,n,t[s+13],21,1309151649),n=_(n,r,i,o,t[s+4],6,-145523070),o=_(o,n,r,i,t[s+11],10,-1120210379),i=_(i,o,n,r,t[s+2],15,718787259),r=_(r,i,o,n,t[s+9],21,-343485551),n=b(n,a),r=b(r,u),i=b(i,c),o=b(o,l)}return[n,r,i,o]}(function(t){if(0===t.length)return[];for(var e=8*t.length,n=new Uint32Array(v(e)),r=0;r<e;r+=8)n[r>>5]|=(255&t[r/8])<<r%32;return n}(t),8*t.length))},A=y("v3",48,k);var T=function(t,e,n){var r=(t=t||{}).random||(t.rng||o)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,e){n=n||0;for(var i=0;i<16;++i)e[n+i]=r[i];return e}return f(r)};function x(t,e,n,r){switch(t){case 0:return e&n^~e&r;case 1:case 3:return e^n^r;case 2:return e&n^e&r^n&r}}function O(t,e){return t<<e|t>>>32-e}var R=function(t){var e=[1518500249,1859775393,2400959708,3395469782],n=[1732584193,4023233417,2562383102,271733878,3285377520];if("string"==typeof t){var r=unescape(encodeURIComponent(t));t=[];for(var i=0;i<r.length;++i)t.push(r.charCodeAt(i))}else Array.isArray(t)||(t=Array.prototype.slice.call(t));t.push(128);for(var o=t.length/4+2,s=Math.ceil(o/16),a=new Array(s),u=0;u<s;++u){for(var c=new Uint32Array(16),l=0;l<16;++l)c[l]=t[64*u+4*l]<<24|t[64*u+4*l+1]<<16|t[64*u+4*l+2]<<8|t[64*u+4*l+3];a[u]=c}a[s-1][14]=8*(t.length-1)/Math.pow(2,32),a[s-1][14]=Math.floor(a[s-1][14]),a[s-1][15]=8*(t.length-1)&4294967295;for(var h=0;h<s;++h){for(var f=new Uint32Array(80),d=0;d<16;++d)f[d]=a[h][d];for(var p=16;p<80;++p)f[p]=O(f[p-3]^f[p-8]^f[p-14]^f[p-16],1);for(var g=n[0],m=n[1],y=n[2],v=n[3],b=n[4],w=0;w<80;++w){var E=Math.floor(w/20),I=O(g,5)+x(E,m,y,v)+b+e[E]+f[w]>>>0;b=v,v=y,y=O(m,30)>>>0,m=g,g=I}n[0]=n[0]+g>>>0,n[1]=n[1]+m>>>0,n[2]=n[2]+y>>>0,n[3]=n[3]+v>>>0,n[4]=n[4]+b>>>0}return[n[0]>>24&255,n[0]>>16&255,n[0]>>8&255,255&n[0],n[1]>>24&255,n[1]>>16&255,n[1]>>8&255,255&n[1],n[2]>>24&255,n[2]>>16&255,n[2]>>8&255,255&n[2],n[3]>>24&255,n[3]>>16&255,n[3]>>8&255,255&n[3],n[4]>>24&255,n[4]>>16&255,n[4]>>8&255,255&n[4]]},M=y("v5",80,R),P="00000000-0000-0000-0000-000000000000";var C=function(t){if(!a(t))throw TypeError("Invalid UUID");return parseInt(t.substr(14,1),16)}},86430:function(t,e,n){"use strict";var r=n(94029),i=n(63083),o=n(55559),s=n(21924),a=n(27296),u=s("Object.prototype.toString"),c=n(96410)(),l="undefined"==typeof globalThis?n.g:globalThis,h=i(),f=s("String.prototype.slice"),d=Object.getPrototypeOf,p=s("Array.prototype.indexOf",!0)||function(t,e){for(var n=0;n<t.length;n+=1)if(t[n]===e)return n;return-1},g={__proto__:null};r(h,c&&a&&d?function(t){var e=new l[t];if(Symbol.toStringTag in e){var n=d(e),r=a(n,Symbol.toStringTag);if(!r){var i=d(n);r=a(i,Symbol.toStringTag)}g["$"+t]=o(r.get)}}:function(t){var e=new l[t],n=e.slice||e.set;n&&(g["$"+t]=o(n))});t.exports=function(t){if(!t||"object"!=typeof t)return!1;if(!c){var e=f(u(t),8,-1);return p(h,e)>-1?e:"Object"===e&&function(t){var e=!1;return r(g,(function(n,r){if(!e)try{n(t),e=f(r,1)}catch(t){}})),e}(t)}return a?function(t){var e=!1;return r(g,(function(n,r){if(!e)try{"$"+n(t)===r&&(e=f(r,1))}catch(t){}})),e}(t):null}},46601:function(){},66115:function(t){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t},t.exports.__esModule=!0,t.exports.default=t.exports},17156:function(t){function e(t,e,n,r,i,o,s){try{var a=t[o](s),u=a.value}catch(t){return void n(t)}a.done?e(u):Promise.resolve(u).then(r,i)}t.exports=function(t){return function(){var n=this,r=arguments;return new Promise((function(i,o){var s=t.apply(n,r);function a(t){e(s,i,o,a,u,"next",t)}function u(t){e(s,i,o,a,u,"throw",t)}a(void 0)}))}},t.exports.__esModule=!0,t.exports.default=t.exports},56690:function(t){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t.exports.__esModule=!0,t.exports.default=t.exports},89728:function(t,e,n){var r=n(64062);function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,r(i.key),i)}}t.exports=function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t},t.exports.__esModule=!0,t.exports.default=t.exports},73808:function(t){function e(n){return t.exports=e=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},t.exports.__esModule=!0,t.exports.default=t.exports,e(n)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},61655:function(t,e,n){var r=n(6015);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&r(t,e)},t.exports.__esModule=!0,t.exports.default=t.exports},64836:function(t){t.exports=function(t){return t&&t.__esModule?t:{default:t}},t.exports.__esModule=!0,t.exports.default=t.exports},94993:function(t,e,n){var r=n(18698).default,i=n(66115);t.exports=function(t,e){if(e&&("object"===r(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return i(t)},t.exports.__esModule=!0,t.exports.default=t.exports},17061:function(t,e,n){var r=n(18698).default;function i(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */t.exports=i=function(){return n},t.exports.__esModule=!0,t.exports.default=t.exports;var e,n={},o=Object.prototype,s=o.hasOwnProperty,a=Object.defineProperty||function(t,e,n){t[e]=n.value},u="function"==typeof Symbol?Symbol:{},c=u.iterator||"@@iterator",l=u.asyncIterator||"@@asyncIterator",h=u.toStringTag||"@@toStringTag";function f(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(e){f=function(t,e,n){return t[e]=n}}function d(t,e,n,r){var i=e&&e.prototype instanceof w?e:w,o=Object.create(i.prototype),s=new C(r||[]);return a(o,"_invoke",{value:O(t,n,s)}),o}function p(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}n.wrap=d;var g="suspendedStart",m="suspendedYield",y="executing",v="completed",b={};function w(){}function E(){}function I(){}var S={};f(S,c,(function(){return this}));var _=Object.getPrototypeOf,k=_&&_(_(N([])));k&&k!==o&&s.call(k,c)&&(S=k);var A=I.prototype=w.prototype=Object.create(S);function T(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function x(t,e){function n(i,o,a,u){var c=p(t[i],t,o);if("throw"!==c.type){var l=c.arg,h=l.value;return h&&"object"==r(h)&&s.call(h,"__await")?e.resolve(h.__await).then((function(t){n("next",t,a,u)}),(function(t){n("throw",t,a,u)})):e.resolve(h).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,u)}))}u(c.arg)}var i;a(this,"_invoke",{value:function(t,r){function o(){return new e((function(e,i){n(t,r,e,i)}))}return i=i?i.then(o,o):o()}})}function O(t,n,r){var i=g;return function(o,s){if(i===y)throw new Error("Generator is already running");if(i===v){if("throw"===o)throw s;return{value:e,done:!0}}for(r.method=o,r.arg=s;;){var a=r.delegate;if(a){var u=R(a,r);if(u){if(u===b)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(i===g)throw i=v,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);i=y;var c=p(t,n,r);if("normal"===c.type){if(i=r.done?v:m,c.arg===b)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(i=v,r.method="throw",r.arg=c.arg)}}}function R(t,n){var r=n.method,i=t.iterator[r];if(i===e)return n.delegate=null,"throw"===r&&t.iterator.return&&(n.method="return",n.arg=e,R(t,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),b;var o=p(i,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,b;var s=o.arg;return s?s.done?(n[t.resultName]=s.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,b):s:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,b)}function M(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(M,this),this.reset(!0)}function N(t){if(t||""===t){var n=t[c];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,o=function n(){for(;++i<t.length;)if(s.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return o.next=o}}throw new TypeError(r(t)+" is not iterable")}return E.prototype=I,a(A,"constructor",{value:I,configurable:!0}),a(I,"constructor",{value:E,configurable:!0}),E.displayName=f(I,h,"GeneratorFunction"),n.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===E||"GeneratorFunction"===(e.displayName||e.name))},n.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,I):(t.__proto__=I,f(t,h,"GeneratorFunction")),t.prototype=Object.create(A),t},n.awrap=function(t){return{__await:t}},T(x.prototype),f(x.prototype,l,(function(){return this})),n.AsyncIterator=x,n.async=function(t,e,r,i,o){void 0===o&&(o=Promise);var s=new x(d(t,e,r,i),o);return n.isGeneratorFunction(e)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},T(A),f(A,h,"Generator"),f(A,c,(function(){return this})),f(A,"toString",(function(){return"[object Generator]"})),n.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},n.values=N,C.prototype={constructor:C,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(P),!t)for(var n in this)"t"===n.charAt(0)&&s.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function r(r,i){return a.type="throw",a.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],a=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var u=s.call(o,"catchLoc"),c=s.call(o,"finallyLoc");if(u&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&s.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,b):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),b},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),P(n),b}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;P(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:N(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),b}},n}t.exports=i,t.exports.__esModule=!0,t.exports.default=t.exports},6015:function(t){function e(n,r){return t.exports=e=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},t.exports.__esModule=!0,t.exports.default=t.exports,e(n,r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},95036:function(t,e,n){var r=n(18698).default;t.exports=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var i=n.call(t,e||"default");if("object"!==r(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)},t.exports.__esModule=!0,t.exports.default=t.exports},64062:function(t,e,n){var r=n(18698).default,i=n(95036);t.exports=function(t){var e=i(t,"string");return"symbol"===r(e)?e:String(e)},t.exports.__esModule=!0,t.exports.default=t.exports},18698:function(t){function e(n){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(n)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},64687:function(t,e,n){var r=n(17061)();t.exports=r;try{regeneratorRuntime=r}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=r:Function("r","regeneratorRuntime = r")(r)}},63083:function(t,e,n){"use strict";var r=["BigInt64Array","BigUint64Array","Float32Array","Float64Array","Int16Array","Int32Array","Int8Array","Uint16Array","Uint32Array","Uint8Array","Uint8ClampedArray"],i="undefined"==typeof globalThis?n.g:globalThis;t.exports=function(){for(var t=[],e=0;e<r.length;e++)"function"==typeof i[r[e]]&&(t[t.length]=r[e]);return t}}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={id:r,loaded:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t};var r={};!function(){"use strict";n.r(r);var t={};n.r(t),n.d(t,{bitGet:function(){return wm},bitLen:function(){return bm},bitMask:function(){return Im},bitSet:function(){return Em},bytesToHex:function(){return sm},bytesToNumberBE:function(){return lm},bytesToNumberLE:function(){return hm},concatBytes:function(){return mm},createHmacDrbg:function(){return km},ensureBytes:function(){return gm},equalBytes:function(){return ym},hexToBytes:function(){return cm},hexToNumber:function(){return um},numberToBytesBE:function(){return fm},numberToBytesLE:function(){return dm},numberToHexUnpadded:function(){return am},numberToVarBytesBE:function(){return pm},utf8ToBytes:function(){return vm},validateObject:function(){return Tm}});n(51876),n(66108),n(91181);function e(t){let e=t+"=",n=document.cookie.split(";");for(let t=0;t<n.length;t++){let r=n[t];for(;" "===r.charAt(0);)r=r.substring(1);if(0===r.indexOf(e))return r.substring(e.length,r.length)}return null}var i=n(25108),o=n(34155);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const s=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=63&i|128):55296==(64512&i)&&r+1<t.length&&56320==(64512&t.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&t.charCodeAt(++r)),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=63&i|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=63&i|128)}return e},a={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let e=0;e<t.length;e+=3){const i=t[e],o=e+1<t.length,s=o?t[e+1]:0,a=e+2<t.length,u=a?t[e+2]:0,c=i>>2,l=(3&i)<<4|s>>4;let h=(15&s)<<2|u>>6,f=63&u;a||(f=64,o||(h=64)),r.push(n[c],n[l],n[h],n[f])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(s(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=t[n++];e[r++]=String.fromCharCode((31&i)<<6|63&o)}else if(i>239&&i<365){const o=((7&i)<<18|(63&t[n++])<<12|(63&t[n++])<<6|63&t[n++])-65536;e[r++]=String.fromCharCode(55296+(o>>10)),e[r++]=String.fromCharCode(56320+(1023&o))}else{const o=t[n++],s=t[n++];e[r++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&s)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let e=0;e<t.length;){const i=n[t.charAt(e++)],o=e<t.length?n[t.charAt(e)]:0;++e;const s=e<t.length?n[t.charAt(e)]:64;++e;const a=e<t.length?n[t.charAt(e)]:64;if(++e,null==i||null==o||null==s||null==a)throw new u;const c=i<<2|o>>4;if(r.push(c),64!==s){const t=o<<4&240|s>>2;if(r.push(t),64!==a){const t=s<<6&192|a;r.push(t)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const c=function(t){return function(t){const e=s(t);return a.encodeByteArray(e,!0)}(t).replace(/\./g,"")},l=function(t){try{return a.decodeString(t,!0)}catch(t){i.error("base64Decode failed: ",t)}return null};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const h=()=>
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==n.g)return n.g;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,f=()=>{try{return h()||(()=>{if(void 0===o||void 0===o.env)return;const t=o.env.__FIREBASE_DEFAULTS__;return t?JSON.parse(t):void 0})()||(()=>{if("undefined"==typeof document)return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(t){return}const e=t&&l(t[1]);return e&&JSON.parse(e)})()}catch(t){return void i.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`)}},d=t=>{var e,n;return null===(n=null===(e=f())||void 0===e?void 0:e.emulatorHosts)||void 0===n?void 0:n[t]},p=t=>{const e=d(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return"["===e[0]?[e.substring(1,n-1),r]:[e.substring(0,n),r]},g=()=>{var t;return null===(t=f())||void 0===t?void 0:t.config},m=t=>{var e;return null===(e=f())||void 0===e?void 0:e[`_${t}`]};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class y{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),"function"==typeof t&&(this.promise.catch((()=>{})),1===t.length?t(e):t(e,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[c(JSON.stringify({alg:"none",type:"JWT"})),c(JSON.stringify(o)),""].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function w(){var t;const e=null===(t=f())||void 0===t?void 0:t.forceEnvironment;if("node"===e)return!0;if("browser"===e)return!1;try{return"[object process]"===Object.prototype.toString.call(n.g.process)}catch(t){return!1}}function E(){try{return"object"==typeof indexedDB}catch(t){return!1}}class I extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,I.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,S.prototype.create)}}class S{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},r=`${this.service}/${t}`,i=this.errors[t],o=i?function(t,e){return t.replace(_,((t,n)=>{const r=e[n];return null!=r?String(r):`<${n}?>`}))}(i,n):"Error",s=`${this.serviceName}: ${o} (${r}).`;return new I(r,s,n)}}const _=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const n=t[i],o=e[i];if(A(n)&&A(o)){if(!k(n,o))return!1}else if(n!==o)return!1}for(const t of r)if(!n.includes(t))return!1;return!0}function A(t){return null!==t&&"object"==typeof t}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function T(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach((t=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(t))})):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function x(t){const e={};return t.replace(/^\?/,"").split("&").forEach((t=>{if(t){const[n,r]=t.split("=");e[decodeURIComponent(n)]=decodeURIComponent(r)}})),e}function O(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then((()=>{t(this)})).catch((t=>{this.error(t)}))}next(t){this.forEachObserver((e=>{e.next(t)}))}error(t){this.forEachObserver((e=>{e.error(t)})),this.close(t)}complete(){this.forEachObserver((t=>{t.complete()})),this.close()}subscribe(t,e,n){let r;if(void 0===t&&void 0===e&&void 0===n)throw new Error("Missing Observer.");r=function(t,e){if("object"!=typeof t||null===t)return!1;for(const n of e)if(n in t&&"function"==typeof t[n])return!0;return!1}(t,["next","error","complete"])?t:{next:t,error:e,complete:n},void 0===r.next&&(r.next=M),void 0===r.error&&(r.error=M),void 0===r.complete&&(r.complete=M);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch(t){}})),this.observers.push(r),i}unsubscribeOne(t){void 0!==this.observers&&void 0!==this.observers[t]&&(delete this.observers[t],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then((()=>{if(void 0!==this.observers&&void 0!==this.observers[t])try{e(this.observers[t])}catch(t){void 0!==i&&i.error&&i.error(t)}}))}close(t){this.finalized||(this.finalized=!0,void 0!==t&&(this.finalError=t),this.task.then((()=>{this.observers=void 0,this.onNoObservers=void 0})))}}function M(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function P(t){return t&&t._delegate?t._delegate:t}class C{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N="[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const t=new y;if(this.instancesDeferred.set(e,t),this.isInitialized(e)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:e});n&&t.resolve(n)}catch(t){}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(null==t?void 0:t.identifier),r=null!==(e=null==t?void 0:t.optional)&&void 0!==e&&e;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(t){if(r)return null;throw t}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,this.shouldAutoInitialize()){if(function(t){return"EAGER"===t.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t))try{this.getOrInitializeService({instanceIdentifier:N})}catch(t){}for(const[t,e]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(t);try{const t=this.getOrInitializeService({instanceIdentifier:n});e.resolve(t)}catch(t){}}}}clearInstance(t=N){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter((t=>"INTERNAL"in t)).map((t=>t.INTERNAL.delete())),...t.filter((t=>"_delete"in t)).map((t=>t._delete()))])}isComponentSet(){return null!=this.component}isInitialized(t=N){return this.instances.has(t)}getOptions(t=N){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[t,e]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(t)&&e.resolve(r)}return r}onInit(t,e){var n;const r=this.normalizeInstanceIdentifier(e),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(t),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&t(o,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const r of n)try{r(t,e)}catch(t){}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(r=t,r===N?void 0:r),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch(t){}var r;return n||null}normalizeInstanceIdentifier(t=N){return this.component?this.component.multipleInstances?t:N:t}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}}class B{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new L(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}var D=n(25108);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U=[];var j;!function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"}(j||(j={}));const F={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},V=j.INFO,z={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},q=(t,e,...n)=>{if(e<t.logLevel)return;const r=(new Date).toISOString(),i=z[e];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);D[i](`[${r}]  ${t.name}:`,...n)};class ${constructor(t){this.name=t,this._logLevel=V,this._logHandler=q,this._userLogHandler=null,U.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in j))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel="string"==typeof t?F[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...t),this._logHandler(this,j.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...t),this._logHandler(this,j.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,j.INFO,...t),this._logHandler(this,j.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,j.WARN,...t),this._logHandler(this,j.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...t),this._logHandler(this,j.ERROR,...t)}}const W=(t,e)=>e.some((e=>t instanceof e));let H,K;const G=new WeakMap,J=new WeakMap,Q=new WeakMap,X=new WeakMap,Y=new WeakMap;let Z={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return J.get(t);if("objectStoreNames"===e)return t.objectStoreNames||Q.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return nt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t}};function tt(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(K||(K=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(rt(this),e),nt(G.get(this))}:function(...e){return nt(t.apply(rt(this),e))}:function(e,...n){const r=t.call(rt(this),e,...n);return Q.set(r,e.sort?e.sort():[e]),nt(r)}}function et(t){return"function"==typeof t?tt(t):(t instanceof IDBTransaction&&function(t){if(J.has(t))return;const e=new Promise(((e,n)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{e(),r()},o=()=>{n(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)}));J.set(t,e)}(t),W(t,H||(H=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(t,Z):t)}function nt(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,n)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{e(nt(t.result)),r()},o=()=>{n(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)}));return e.then((e=>{e instanceof IDBCursor&&G.set(e,t)})).catch((()=>{})),Y.set(e,t),e}(t);if(X.has(t))return X.get(t);const e=et(t);return e!==t&&(X.set(t,e),Y.set(e,t)),e}const rt=t=>Y.get(t);const it=["get","getKey","getAll","getAllKeys","count"],ot=["put","add","delete","clear"],st=new Map;function at(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(st.get(e))return st.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=ot.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!it.includes(n))return;const o=async function(t,...e){const o=this.transaction(t,i?"readwrite":"readonly");let s=o.store;return r&&(s=s.index(e.shift())),(await Promise.all([s[n](...e),i&&o.done]))[0]};return st.set(e,o),o}Z=(t=>({...t,get:(e,n,r)=>at(e,n)||t.get(e,n,r),has:(e,n)=>!!at(e,n)||t.has(e,n)}))(Z);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ut{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map((t=>{if(function(t){const e=t.getComponent();return"VERSION"===(null==e?void 0:e.type)}(t)){const e=t.getImmediate();return`${e.library}/${e.version}`}return null})).filter((t=>t)).join(" ")}}const ct="@firebase/app",lt="0.9.13",ht=new $("@firebase/app"),ft="[DEFAULT]",dt={[ct]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},pt=new Map,gt=new Map;function mt(t,e){try{t.container.addComponent(e)}catch(n){ht.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function yt(t){const e=t.name;if(gt.has(e))return ht.debug(`There were multiple attempts to register component ${e}.`),!1;gt.set(e,t);for(const e of pt.values())mt(e,t);return!0}function vt(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const bt=new S("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wt{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new C("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw bt.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et="9.23.0";function It(t,e={}){let n=t;if("object"!=typeof e){e={name:e}}const r=Object.assign({name:ft,automaticDataCollectionEnabled:!1},e),i=r.name;if("string"!=typeof i||!i)throw bt.create("bad-app-name",{appName:String(i)});if(n||(n=g()),!n)throw bt.create("no-options");const o=pt.get(i);if(o){if(k(n,o.options)&&k(r,o.config))return o;throw bt.create("duplicate-app",{appName:i})}const s=new B(i);for(const t of gt.values())s.addComponent(t);const a=new wt(n,r,s);return pt.set(i,a),a}function St(t=ft){const e=pt.get(t);if(!e&&t===ft&&g())return It();if(!e)throw bt.create("no-app",{appName:t});return e}function _t(t,e,n){var r;let i=null!==(r=dt[t])&&void 0!==r?r:t;n&&(i+=`-${n}`);const o=i.match(/\s|\//),s=e.match(/\s|\//);if(o||s){const t=[`Unable to register library "${i}" with version "${e}":`];return o&&t.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&s&&t.push("and"),s&&t.push(`version name "${e}" contains illegal characters (whitespace or "/")`),void ht.warn(t.join(" "))}yt(new C(`${i}-version`,(()=>({library:i,version:e})),"VERSION"))}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const kt="firebase-heartbeat-database",At=1,Tt="firebase-heartbeat-store";let xt=null;function Ot(){return xt||(xt=function(t,e,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const s=indexedDB.open(t,e),a=nt(s);return r&&s.addEventListener("upgradeneeded",(t=>{r(nt(s.result),t.oldVersion,t.newVersion,nt(s.transaction),t)})),n&&s.addEventListener("blocked",(t=>n(t.oldVersion,t.newVersion,t))),a.then((t=>{o&&t.addEventListener("close",(()=>o())),i&&t.addEventListener("versionchange",(t=>i(t.oldVersion,t.newVersion,t)))})).catch((()=>{})),a}(kt,At,{upgrade:(t,e)=>{if(0===e)t.createObjectStore(Tt)}}).catch((t=>{throw bt.create("idb-open",{originalErrorMessage:t.message})}))),xt}async function Rt(t,e){try{const n=(await Ot()).transaction(Tt,"readwrite"),r=n.objectStore(Tt);await r.put(e,Mt(t)),await n.done}catch(t){if(t instanceof I)ht.warn(t.message);else{const e=bt.create("idb-set",{originalErrorMessage:null==t?void 0:t.message});ht.warn(e.message)}}}function Mt(t){return`${t.name}!${t.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Nt(e),this._heartbeatsCachePromise=this._storage.read().then((t=>(this._heartbeatsCache=t,t)))}async triggerHeartbeat(){const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),e=Ct();if(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate!==e&&!this._heartbeatsCache.heartbeats.some((t=>t.date===e)))return this._heartbeatsCache.heartbeats.push({date:e,agent:t}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((t=>{const e=new Date(t.date).valueOf();return Date.now()-e<=2592e6})),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";const t=Ct(),{heartbeatsToSend:e,unsentEntries:n}=function(t,e=1024){const n=[];let r=t.slice();for(const i of t){const t=n.find((t=>t.agent===i.agent));if(t){if(t.dates.push(i.date),Lt(n)>e){t.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Lt(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}(this._heartbeatsCache.heartbeats),r=c(JSON.stringify({version:2,heartbeats:e}));return this._heartbeatsCache.lastSentHeartbeatDate=t,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function Ct(){return(new Date).toISOString().substring(0,10)}class Nt{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return!!E()&&new Promise(((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var t;e((null===(t=i.error)||void 0===t?void 0:t.message)||"")}}catch(t){e(t)}})).then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){const t=await async function(t){try{const e=await Ot();return await e.transaction(Tt).objectStore(Tt).get(Mt(t))}catch(t){if(t instanceof I)ht.warn(t.message);else{const e=bt.create("idb-get",{originalErrorMessage:null==t?void 0:t.message});ht.warn(e.message)}}}(this.app);return t||{heartbeats:[]}}return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return Rt(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:t.heartbeats})}}async add(t){var e;if(await this._canUseIndexedDBPromise){const n=await this.read();return Rt(this.app,{lastSentHeartbeatDate:null!==(e=t.lastSentHeartbeatDate)&&void 0!==e?e:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...t.heartbeats]})}}}function Lt(t){return c(JSON.stringify({version:2,heartbeats:t})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Bt;Bt="",yt(new C("platform-logger",(t=>new ut(t)),"PRIVATE")),yt(new C("heartbeat",(t=>new Pt(t)),"PRIVATE")),_t(ct,lt,Bt),_t(ct,lt,"esm2017"),_t("fire-js","");function Dt(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]])}return n}Object.create;Object.create;"function"==typeof SuppressedError&&SuppressedError;var Ut=n(25108);function jt(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Ft=jt,Vt=new S("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),zt=new $("@firebase/auth");function qt(t,...e){zt.logLevel<=j.ERROR&&zt.error(`Auth (${Et}): ${t}`,...e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(t,...e){throw Kt(t,...e)}function Wt(t,...e){return Kt(t,...e)}function Ht(t,e,n){const r=Object.assign(Object.assign({},Ft()),{[e]:n});return new S("auth","Firebase",r).create(e,{appName:t.name})}function Kt(t,...e){if("string"!=typeof t){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Vt.create(t,...e)}function Gt(t,e,...n){if(!t)throw Kt(e,...n)}function Jt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw qt(e),new Error(e)}function Qt(t,e){t||Jt(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(){var t;return"undefined"!=typeof self&&(null===(t=self.location)||void 0===t?void 0:t.href)||""}function Yt(){return"http:"===Zt()||"https:"===Zt()}function Zt(){var t;return"undefined"!=typeof self&&(null===(t=self.location)||void 0===t?void 0:t.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&(Yt()||function(){const t="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof t&&void 0!==t.id}()||"connection"in navigator))||navigator.onLine}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ee{constructor(t,e){this.shortDelay=t,this.longDelay=e,Qt(e>t,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(b())||"object"==typeof navigator&&"ReactNative"===navigator.product}get(){return te()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(t,e){Qt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{static initialize(t,e,n){this.fetchImpl=t,e&&(this.headersImpl=e),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:void Jt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:void Jt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:void Jt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ie={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},oe=new ee(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function ae(t,e,n,r,i={}){return ue(t,i,(async()=>{let i={},o={};r&&("GET"===e?o=r:i={body:JSON.stringify(r)});const s=T(Object.assign({key:t.config.apiKey},o)).slice(1),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/json",t.languageCode&&(a["X-Firebase-Locale"]=t.languageCode),re.fetch()(le(t,t.config.apiHost,n,s),Object.assign({method:e,headers:a,referrerPolicy:"no-referrer"},i))}))}async function ue(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},ie),e);try{const e=new he(t),i=await Promise.race([n(),e.promise]);e.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw fe(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const e=i.ok?o.errorMessage:o.error.message,[n,s]=e.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw fe(t,"credential-already-in-use",o);if("EMAIL_EXISTS"===n)throw fe(t,"email-already-in-use",o);if("USER_DISABLED"===n)throw fe(t,"user-disabled",o);const a=r[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(s)throw Ht(t,a,s);$t(t,a)}}catch(e){if(e instanceof I)throw e;$t(t,"network-request-failed",{message:String(e)})}}async function ce(t,e,n,r,i={}){const o=await ae(t,e,n,r,i);return"mfaPendingCredential"in o&&$t(t,"multi-factor-auth-required",{_serverResponse:o}),o}function le(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?ne(t.config,i):`${t.config.apiScheme}://${i}`}class he{constructor(t){this.auth=t,this.timer=null,this.promise=new Promise(((t,e)=>{this.timer=setTimeout((()=>e(Wt(this.auth,"network-request-failed"))),oe.get())}))}clearNetworkTimeout(){clearTimeout(this.timer)}}function fe(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Wt(t,e,r);return i.customData._tokenResponse=n,i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function de(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch(t){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(t){return 1e3*Number(t)}function ge(t){const[e,n,r]=t.split(".");if(void 0===e||void 0===n||void 0===r)return qt("JWT malformed, contained fewer than 3 sections"),null;try{const t=l(n);return t?JSON.parse(t):(qt("Failed to decode base64 JWT payload"),null)}catch(t){return qt("Caught error parsing JWT payload as JSON",null==t?void 0:t.toString()),null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function me(t,e,n=!1){if(n)return e;try{return await e}catch(e){throw e instanceof I&&function({code:t}){return"auth/user-disabled"===t||"auth/user-token-expired"===t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)&&t.auth.currentUser===t&&await t.auth.signOut(),e}}class ye{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(t){var e;if(t){const t=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),t}{this.errorBackoff=3e4;const t=(null!==(e=this.user.stsTokenManager.expirationTime)&&void 0!==e?e:0)-Date.now()-3e5;return Math.max(0,t)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout((async()=>{await this.iteration()}),e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){return void("auth/network-request-failed"===(null==t?void 0:t.code)&&this.schedule(!0))}this.schedule()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=de(this.lastLoginAt),this.creationTime=de(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function be(t){var e;const n=t.auth,r=await t.getIdToken(),i=await me(t,async function(t,e){return ae(t,"POST","/v1/accounts:lookup",e)}(n,{idToken:r}));Gt(null==i?void 0:i.users.length,n,"internal-error");const o=i.users[0];t._notifyReloadListener(o);const s=(null===(e=o.providerUserInfo)||void 0===e?void 0:e.length)?o.providerUserInfo.map((t=>{var{providerId:e}=t,n=Dt(t,["providerId"]);return{providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})):[];const a=(u=t.providerData,c=s,[...u.filter((t=>!c.some((e=>e.providerId===t.providerId)))),...c]);var u,c;const l=t.isAnonymous,h=!(t.email&&o.passwordHash||(null==a?void 0:a.length)),f=!!l&&h,d={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:a,metadata:new ve(o.createdAt,o.lastLoginAt),isAnonymous:f};Object.assign(t,d)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class we{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){Gt(t.idToken,"internal-error"),Gt(void 0!==t.idToken,"internal-error"),Gt(void 0!==t.refreshToken,"internal-error");const e="expiresIn"in t&&void 0!==t.expiresIn?Number(t.expiresIn):function(t){const e=ge(t);return Gt(e,"internal-error"),Gt(void 0!==e.exp,"internal-error"),Gt(void 0!==e.iat,"internal-error"),Number(e.exp)-Number(e.iat)}(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}async getToken(t,e=!1){return Gt(!this.accessToken||this.refreshToken,t,"user-token-expired"),e||!this.accessToken||this.isExpired?this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:n,refreshToken:r,expiresIn:i}=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */await async function(t,e){const n=await ue(t,{},(async()=>{const n=T({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=le(t,r,"/v1/token",`key=${i}`),s=await t._getAdditionalHeaders();return s["Content-Type"]="application/x-www-form-urlencoded",re.fetch()(o,{method:"POST",headers:s,body:n})}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(t,e);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(t,e,n){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(t,e){const{refreshToken:n,accessToken:r,expirationTime:i}=e,o=new we;return n&&(Gt("string"==typeof n,"internal-error",{appName:t}),o.refreshToken=n),r&&(Gt("string"==typeof r,"internal-error",{appName:t}),o.accessToken=r),i&&(Gt("number"==typeof i,"internal-error",{appName:t}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new we,this.toJSON())}_performRefresh(){return Jt("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(t,e){Gt("string"==typeof t||void 0===t,"internal-error",{appName:e})}class Ie{constructor(t){var{uid:e,auth:n,stsTokenManager:r}=t,i=Dt(t,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ye(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new ve(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(t){const e=await me(this,this.stsTokenManager.getToken(this.auth,t));return Gt(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return async function(t,e=!1){const n=P(t),r=await n.getIdToken(e),i=ge(r);Gt(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const o="object"==typeof i.firebase?i.firebase:void 0,s=null==o?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:de(pe(i.auth_time)),issuedAtTime:de(pe(i.iat)),expirationTime:de(pe(i.exp)),signInProvider:s||null,signInSecondFactor:(null==o?void 0:o.sign_in_second_factor)||null}}(this,t)}reload(){return async function(t){const e=P(t);await be(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}(this)}_assign(t){this!==t&&(Gt(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map((t=>Object.assign({},t))),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new Ie(Object.assign(Object.assign({},this),{auth:t,stsTokenManager:this.stsTokenManager._clone()}));return e.metadata._copy(this.metadata),e}_onReload(t){Gt(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let n=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),n=!0),e&&await be(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){const t=await this.getIdToken();return await me(this,async function(t,e){return ae(t,"POST","/v1/accounts:delete",e)}(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((t=>Object.assign({},t))),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){var n,r,i,o,s,a,u,c;const l=null!==(n=e.displayName)&&void 0!==n?n:void 0,h=null!==(r=e.email)&&void 0!==r?r:void 0,f=null!==(i=e.phoneNumber)&&void 0!==i?i:void 0,d=null!==(o=e.photoURL)&&void 0!==o?o:void 0,p=null!==(s=e.tenantId)&&void 0!==s?s:void 0,g=null!==(a=e._redirectEventId)&&void 0!==a?a:void 0,m=null!==(u=e.createdAt)&&void 0!==u?u:void 0,y=null!==(c=e.lastLoginAt)&&void 0!==c?c:void 0,{uid:v,emailVerified:b,isAnonymous:w,providerData:E,stsTokenManager:I}=e;Gt(v&&I,t,"internal-error");const S=we.fromJSON(this.name,I);Gt("string"==typeof v,t,"internal-error"),Ee(l,t.name),Ee(h,t.name),Gt("boolean"==typeof b,t,"internal-error"),Gt("boolean"==typeof w,t,"internal-error"),Ee(f,t.name),Ee(d,t.name),Ee(p,t.name),Ee(g,t.name),Ee(m,t.name),Ee(y,t.name);const _=new Ie({uid:v,auth:t,email:h,emailVerified:b,displayName:l,isAnonymous:w,photoURL:d,phoneNumber:f,tenantId:p,stsTokenManager:S,createdAt:m,lastLoginAt:y});return E&&Array.isArray(E)&&(_.providerData=E.map((t=>Object.assign({},t)))),g&&(_._redirectEventId=g),_}static async _fromIdTokenResponse(t,e,n=!1){const r=new we;r.updateFromServerResponse(e);const i=new Ie({uid:e.localId,auth:t,stsTokenManager:r,isAnonymous:n});return await be(i),i}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se=new Map;function _e(t){Qt(t instanceof Function,"Expected a class definition");let e=Se.get(t);return e?(Qt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Se.set(t,e),e)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return void 0===e?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}ke.type="NONE";const Ae=ke;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(t,e,n){return`firebase:${t}:${e}:${n}`}class xe{constructor(t,e,n){this.persistence=t,this.auth=e,this.userKey=n;const{config:r,name:i}=this.auth;this.fullUserKey=Te(this.userKey,r.apiKey,i),this.fullPersistenceKey=Te("persistence",r.apiKey,i),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);return t?Ie._fromJSON(this.auth,t):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=t,e?this.setCurrentUser(e):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,n="authUser"){if(!e.length)return new xe(_e(Ae),t,n);const r=(await Promise.all(e.map((async t=>{if(await t._isAvailable())return t})))).filter((t=>t));let i=r[0]||_e(Ae);const o=Te(n,t.config.apiKey,t.name);let s=null;for(const n of e)try{const e=await n._get(o);if(e){const r=Ie._fromJSON(t,e);n!==i&&(s=r),i=n;break}}catch(t){}const a=r.filter((t=>t._shouldAllowMigration));return i._shouldAllowMigration&&a.length?(i=a[0],s&&await i._set(o,s.toJSON()),await Promise.all(e.map((async t=>{if(t!==i)try{await t._remove(o)}catch(t){}}))),new xe(i,t,n)):new xe(i,t,n)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oe(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ce(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Re(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Le(e))return"Blackberry";if(Be(e))return"Webos";if(Me(e))return"Safari";if((e.includes("chrome/")||Pe(e))&&!e.includes("edge/"))return"Chrome";if(Ne(e))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=t.match(e);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function Re(t=b()){return/firefox\//i.test(t)}function Me(t=b()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Pe(t=b()){return/crios\//i.test(t)}function Ce(t=b()){return/iemobile/i.test(t)}function Ne(t=b()){return/android/i.test(t)}function Le(t=b()){return/blackberry/i.test(t)}function Be(t=b()){return/webos/i.test(t)}function De(t=b()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Ue(){return function(){const t=b();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}()&&10===document.documentMode}function je(t=b()){return De(t)||Ne(t)||Be(t)||Le(t)||/windows phone/i.test(t)||Ce(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Fe(t,e=[]){let n;switch(t){case"Browser":n=Oe(b());break;case"Worker":n=`${Oe(b())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Et}/${r}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ve(t,e){return ae(t,"GET","/v2/recaptchaConfig",se(t,e))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(t){return void 0!==t&&void 0!==t.enterprise}class qe{constructor(t){if(this.siteKey="",this.emailPasswordEnabled=!1,void 0===t.recaptchaKey)throw new Error("recaptchaKey undefined");this.siteKey=t.recaptchaKey.split("/")[3],this.emailPasswordEnabled=t.recaptchaEnforcementState.some((t=>"EMAIL_PASSWORD_PROVIDER"===t.provider&&"OFF"!==t.enforcementState))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(t){return new Promise(((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=t=>{const e=Wt("internal-error");e.customData=t,n(e)},r.type="text/javascript",r.charset="UTF-8",function(){var t,e;return null!==(e=null===(t=document.getElementsByTagName("head"))||void 0===t?void 0:t[0])&&void 0!==e?e:document}().appendChild(r)}))}function We(t){return`__${t}${Math.floor(1e6*Math.random())}`}class He{constructor(t){this.type="recaptcha-enterprise",this.auth=Qe(t)}async verify(t="verify",e=!1){function n(e,n,r){const i=window.grecaptcha;ze(i)?i.enterprise.ready((()=>{i.enterprise.execute(e,{action:t}).then((t=>{n(t)})).catch((()=>{n("NO_RECAPTCHA")}))})):r(Error("No reCAPTCHA enterprise script loaded."))}return new Promise(((t,r)=>{(async function(t){if(!e){if(null==t.tenantId&&null!=t._agentRecaptchaConfig)return t._agentRecaptchaConfig.siteKey;if(null!=t.tenantId&&void 0!==t._tenantRecaptchaConfigs[t.tenantId])return t._tenantRecaptchaConfigs[t.tenantId].siteKey}return new Promise((async(e,n)=>{Ve(t,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then((r=>{if(void 0!==r.recaptchaKey){const n=new qe(r);return null==t.tenantId?t._agentRecaptchaConfig=n:t._tenantRecaptchaConfigs[t.tenantId]=n,e(n.siteKey)}n(new Error("recaptcha Enterprise site key undefined"))})).catch((t=>{n(t)}))}))})(this.auth).then((i=>{if(!e&&ze(window.grecaptcha))n(i,t,r);else{if("undefined"==typeof window)return void r(new Error("RecaptchaVerifier is only supported in browser"));$e("https://www.google.com/recaptcha/enterprise.js?render="+i).then((()=>{n(i,t,r)})).catch((t=>{r(t)}))}})).catch((t=>{r(t)}))}))}}async function Ke(t,e,n,r=!1){const i=new He(t);let o;try{o=await i.verify(n)}catch(t){o=await i.verify(n,!0)}const s=Object.assign({},e);return r?Object.assign(s,{captchaResp:o}):Object.assign(s,{captchaResponse:o}),Object.assign(s,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(s,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),s}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const n=e=>new Promise(((n,r)=>{try{n(t(e))}catch(t){r(t)}}));n.onAbort=e,this.queue.push(n);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const n of this.queue)await n(t),n.onAbort&&e.push(n.onAbort)}catch(t){e.reverse();for(const t of e)try{t()}catch(t){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==t?void 0:t.message})}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(t,e,n,r){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Xe(this),this.idTokenSubscription=new Xe(this),this.beforeStateQueue=new Ge(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Vt,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=_e(e)),this._initializationPromise=this.queue((async()=>{var n,r;if(!this._deleted&&(this.persistenceManager=await xe.create(this,t),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(t){}await this.initializeCurrentUser(e),this.lastNotifiedUid=(null===(r=this.currentUser)||void 0===r?void 0:r.uid)||null,this._deleted||(this._isInitialized=!0)}})),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();return this.currentUser||t?this.currentUser&&t&&this.currentUser.uid===t.uid?(this._currentUser._assign(t),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(t,!0):void 0}async initializeCurrentUser(t){var e;const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null===(e=this.redirectUser)||void 0===e?void 0:e._redirectEventId,o=null==r?void 0:r._redirectEventId,s=await this.tryRedirectSignIn(t);n&&n!==o||!(null==s?void 0:s.user)||(r=s.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(t){r=n,this._popupRedirectResolver._overrideRedirectResult(this,(()=>Promise.reject(t)))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Gt(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch(t){await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await be(t)}catch(t){if("auth/network-request-failed"!==(null==t?void 0:t.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(t){const e=t?P(t):null;return e&&Gt(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&Gt(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue((async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()}))}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(t){return this.queue((async()=>{await this.assertedPersistence.setPersistence(_e(t))}))}async initializeRecaptchaConfig(){const t=await Ve(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),e=new qe(t);if(null==this.tenantId?this._agentRecaptchaConfig=e:this._tenantRecaptchaConfigs[this.tenantId]=e,e.emailPasswordEnabled){new He(this).verify()}}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(t){this._errorFactory=new S("auth","Firebase",t())}onAuthStateChanged(t,e,n){return this.registerStateListener(this.authStateSubscription,t,e,n)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,n){return this.registerStateListener(this.idTokenSubscription,t,e,n)}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(t=this._currentUser)||void 0===t?void 0:t.toJSON()}}async _setRedirectUser(t,e){const n=await this.getOrInitRedirectPersistenceManager(e);return null===t?n.removeCurrentUser():n.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&_e(t)||this._popupRedirectResolver;Gt(e,this,"argument-error"),this.redirectPersistenceManager=await xe.create(this,[_e(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,n;return this._isInitialized&&await this.queue((async()=>{})),(null===(e=this._currentUser)||void 0===e?void 0:e._redirectEventId)===t?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue((async()=>this.directlySetCurrentUser(t)))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t,e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(e=null===(t=this.currentUser)||void 0===t?void 0:t.uid)&&void 0!==e?e:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,n,r){if(this._deleted)return()=>{};const i="function"==typeof e?e:e.next.bind(e),o=this._isInitialized?Promise.resolve():this._initializationPromise;return Gt(o,this,"internal-error"),o.then((()=>i(this.currentUser))),"function"==typeof e?t.addObserver(e,n,r):t.addObserver(e)}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return Gt(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){t&&!this.frameworks.includes(t)&&(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Fe(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var t;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null===(t=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===t?void 0:t.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;const e=await(null===(t=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===t?void 0:t.getToken());return(null==e?void 0:e.error)&&function(t,...e){zt.logLevel<=j.WARN&&zt.warn(`Auth (${Et}): ${t}`,...e)}(`Error while retrieving App Check token: ${e.error}`),null==e?void 0:e.token}}function Qe(t){return P(t)}class Xe{constructor(t){this.auth=t,this.observer=null,this.addObserver=function(t,e){const n=new R(t,e);return n.subscribe.bind(n)}((t=>this.observer=t))}get next(){return Gt(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(t,e,n){const r=Qe(t);Gt(r._canInitEmulator,r,"emulator-config-failed"),Gt(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!(null==n?void 0:n.disableWarnings),o=Ze(e),{host:s,port:a}=function(t){const e=Ze(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const t=i[1];return{host:t,port:tn(r.substr(t.length+1))}}{const[t,e]=r.split(":");return{host:t,port:tn(e)}}}(e),u=null===a?"":`:${a}`;r.config.emulator={url:`${o}//${s}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:s,port:a,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||function(){function t(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}void 0!==Ut&&"function"==typeof Ut.info&&Ut.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",t):t())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */()}function Ze(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function tn(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}class en{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return Jt("not implemented")}_getIdTokenResponse(t){return Jt("not implemented")}_linkToIdToken(t,e){return Jt("not implemented")}_getReauthenticationResolver(t){return Jt("not implemented")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nn(t,e){return ae(t,"POST","/v1/accounts:update",e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function rn(t,e){return ce(t,"POST","/v1/accounts:signInWithPassword",se(t,e))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class on extends en{constructor(t,e,n,r=null){super("password",n),this._email=t,this._password=e,this._tenantId=r}static _fromEmailAndPassword(t,e){return new on(t,e,"password")}static _fromEmailAndCode(t,e,n=null){return new on(t,e,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(t){const e="string"==typeof t?JSON.parse(t):t;if((null==e?void 0:e.email)&&(null==e?void 0:e.password)){if("password"===e.signInMethod)return this._fromEmailAndPassword(e.email,e.password);if("emailLink"===e.signInMethod)return this._fromEmailAndCode(e.email,e.password,e.tenantId)}return null}async _getIdTokenResponse(t){var e;switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(null===(e=t._getRecaptchaConfig())||void 0===e?void 0:e.emailPasswordEnabled){const e=await Ke(t,n,"signInWithPassword");return rn(t,e)}return rn(t,n).catch((async e=>{if("auth/missing-recaptcha-token"===e.code){Ut.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const e=await Ke(t,n,"signInWithPassword");return rn(t,e)}return Promise.reject(e)}));case"emailLink":
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(t,e){return ce(t,"POST","/v1/accounts:signInWithEmailLink",se(t,e))}(t,{email:this._email,oobCode:this._password});default:$t(t,"internal-error")}}async _linkToIdToken(t,e){switch(this.signInMethod){case"password":return nn(t,{idToken:e,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return async function(t,e){return ce(t,"POST","/v1/accounts:signInWithEmailLink",se(t,e))}(t,{idToken:e,email:this._email,oobCode:this._password});default:$t(t,"internal-error")}}_getReauthenticationResolver(t){return this._getIdTokenResponse(t)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sn(t,e){return ce(t,"POST","/v1/accounts:signInWithIdp",se(t,e))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an extends en{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new an(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):$t("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e="string"==typeof t?JSON.parse(t):t,{providerId:n,signInMethod:r}=e,i=Dt(e,["providerId","signInMethod"]);if(!n||!r)return null;const o=new an(n,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(t){return sn(t,this.buildRequest())}_linkToIdToken(t,e){const n=this.buildRequest();return n.idToken=e,sn(t,n)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,sn(t,e)}buildRequest(){const t={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=T(e)}return t}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un={USER_NOT_FOUND:"user-not-found"};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class cn extends en{constructor(t){super("phone","phone"),this.params=t}static _fromVerification(t,e){return new cn({verificationId:t,verificationCode:e})}static _fromTokenResponse(t,e){return new cn({phoneNumber:t,temporaryProof:e})}_getIdTokenResponse(t){return async function(t,e){return ce(t,"POST","/v1/accounts:signInWithPhoneNumber",se(t,e))}(t,this._makeVerificationRequest())}_linkToIdToken(t,e){return async function(t,e){const n=await ce(t,"POST","/v1/accounts:signInWithPhoneNumber",se(t,e));if(n.temporaryProof)throw fe(t,"account-exists-with-different-credential",n);return n}(t,Object.assign({idToken:e},this._makeVerificationRequest()))}_getReauthenticationResolver(t){return async function(t,e){return ce(t,"POST","/v1/accounts:signInWithPhoneNumber",se(t,Object.assign(Object.assign({},e),{operation:"REAUTH"})),un)}(t,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:t,phoneNumber:e,verificationId:n,verificationCode:r}=this.params;return t&&e?{temporaryProof:t,phoneNumber:e}:{sessionInfo:n,code:r}}toJSON(){const t={providerId:this.providerId};return this.params.phoneNumber&&(t.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(t.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(t.verificationCode=this.params.verificationCode),this.params.verificationId&&(t.verificationId=this.params.verificationId),t}static fromJSON(t){"string"==typeof t&&(t=JSON.parse(t));const{verificationId:e,verificationCode:n,phoneNumber:r,temporaryProof:i}=t;return n||e||r||i?new cn({verificationId:e,verificationCode:n,phoneNumber:r,temporaryProof:i}):null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(t){var e,n,r,i,o,s;const a=x(O(t)),u=null!==(e=a.apiKey)&&void 0!==e?e:null,c=null!==(n=a.oobCode)&&void 0!==n?n:null,l=function(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(r=a.mode)&&void 0!==r?r:null);Gt(u&&c&&l,"argument-error"),this.apiKey=u,this.operation=l,this.code=c,this.continueUrl=null!==(i=a.continueUrl)&&void 0!==i?i:null,this.languageCode=null!==(o=a.languageCode)&&void 0!==o?o:null,this.tenantId=null!==(s=a.tenantId)&&void 0!==s?s:null}static parseLink(t){const e=function(t){const e=x(O(t)).link,n=e?x(O(e)).deep_link_id:null,r=x(O(t)).deep_link_id;return(r?x(O(r)).link:null)||r||n||e||t}(t);try{return new ln(e)}catch(t){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class hn{constructor(){this.providerId=hn.PROVIDER_ID}static credential(t,e){return on._fromEmailAndPassword(t,e)}static credentialWithLink(t,e){const n=ln.parseLink(e);return Gt(n,"argument-error"),on._fromEmailAndCode(t,n.code,n.tenantId)}}hn.PROVIDER_ID="password",hn.EMAIL_PASSWORD_SIGN_IN_METHOD="password",hn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fn{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn extends fn{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class pn extends dn{constructor(){super("facebook.com")}static credential(t){return an._fromParams({providerId:pn.PROVIDER_ID,signInMethod:pn.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return pn.credentialFromTaggedObject(t)}static credentialFromError(t){return pn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t))return null;if(!t.oauthAccessToken)return null;try{return pn.credential(t.oauthAccessToken)}catch(t){return null}}}pn.FACEBOOK_SIGN_IN_METHOD="facebook.com",pn.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gn extends dn{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return an._fromParams({providerId:gn.PROVIDER_ID,signInMethod:gn.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return gn.credentialFromTaggedObject(t)}static credentialFromError(t){return gn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:n}=t;if(!e&&!n)return null;try{return gn.credential(e,n)}catch(t){return null}}}gn.GOOGLE_SIGN_IN_METHOD="google.com",gn.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mn extends dn{constructor(){super("github.com")}static credential(t){return an._fromParams({providerId:mn.PROVIDER_ID,signInMethod:mn.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return mn.credentialFromTaggedObject(t)}static credentialFromError(t){return mn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t))return null;if(!t.oauthAccessToken)return null;try{return mn.credential(t.oauthAccessToken)}catch(t){return null}}}mn.GITHUB_SIGN_IN_METHOD="github.com",mn.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class yn extends dn{constructor(){super("twitter.com")}static credential(t,e){return an._fromParams({providerId:yn.PROVIDER_ID,signInMethod:yn.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return yn.credentialFromTaggedObject(t)}static credentialFromError(t){return yn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:n}=t;if(!e||!n)return null;try{return yn.credential(e,n)}catch(t){return null}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function vn(t,e){return ce(t,"POST","/v1/accounts:signUp",se(t,e))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */yn.TWITTER_SIGN_IN_METHOD="twitter.com",yn.PROVIDER_ID="twitter.com";class bn{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,n,r=!1){const i=await Ie._fromIdTokenResponse(t,n,r),o=wn(n);return new bn({user:i,providerId:o,_tokenResponse:n,operationType:e})}static async _forOperation(t,e,n){await t._updateTokensIfNecessary(n,!0);const r=wn(n);return new bn({user:t,providerId:r,_tokenResponse:n,operationType:e})}}function wn(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class En extends I{constructor(t,e,n,r){var i;super(e.code,e.message),this.operationType=n,this.user=r,Object.setPrototypeOf(this,En.prototype),this.customData={appName:t.name,tenantId:null!==(i=t.tenantId)&&void 0!==i?i:void 0,_serverResponse:e.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(t,e,n,r){return new En(t,e,n,r)}}function In(t,e,n,r){return("reauthenticate"===e?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch((n=>{if("auth/multi-factor-auth-required"===n.code)throw En._fromErrorAndOperation(t,n,e,r);throw n}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sn(t,e,n=!1){const r=await me(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return bn._forOperation(t,"link",r)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function _n(t,e,n=!1){const{auth:r}=t,i="reauthenticate";try{const o=await me(t,In(r,i,e,t),n);Gt(o.idToken,r,"internal-error");const s=ge(o.idToken);Gt(s,r,"internal-error");const{sub:a}=s;return Gt(t.uid===a,r,"user-mismatch"),bn._forOperation(t,i,o)}catch(t){throw"auth/user-not-found"===(null==t?void 0:t.code)&&$t(r,"user-mismatch"),t}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kn(t,e,n=!1){const r="signIn",i=await In(t,r,e),o=await bn._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(o.user),o}new WeakMap;const An="__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(An,"1"),this.storage.removeItem(An),Promise.resolve(!0)):Promise.resolve(!1)}catch(t){return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn extends Tn{constructor(){super((()=>window.localStorage),"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=function(){const t=b();return Me(t)||De(t)}()&&function(){try{return!(!window||window===window.top)}catch(t){return!1}}(),this.fallbackToPolling=je(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const n=this.storage.getItem(e),r=this.localCache[e];n!==r&&t(e,r,n)}}onStorageEvent(t,e=!1){if(!t.key)return void this.forAllChangedKeys(((t,e,n)=>{this.notifyListeners(t,n)}));const n=t.key;if(e?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const r=this.storage.getItem(n);if(t.newValue!==r)null!==t.newValue?this.storage.setItem(n,t.newValue):this.storage.removeItem(n);else if(this.localCache[n]===t.newValue&&!e)return}const r=()=>{const t=this.storage.getItem(n);(e||this.localCache[n]!==t)&&this.notifyListeners(n,t)},i=this.storage.getItem(n);Ue()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(r,10):r()}notifyListeners(t,e){this.localCache[t]=e;const n=this.listeners[t];if(n)for(const t of Array.from(n))t(e?JSON.parse(e):e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((()=>{this.forAllChangedKeys(((t,e,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:n}),!0)}))}),1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),0===this.listeners[t].size&&delete this.listeners[t]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}xn.type="LOCAL";const On=xn;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn extends Tn{constructor(){super((()=>window.sessionStorage),"SESSION")}_addListener(t,e){}_removeListener(t,e){}}Rn.type="SESSION";const Mn=Rn;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pn{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find((e=>e.isListeningto(t)));if(e)return e;const n=new Pn(t);return this.receivers.push(n),n}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:n,eventType:r,data:i}=e.data,o=this.handlersMap[r];if(!(null==o?void 0:o.size))return;e.ports[0].postMessage({status:"ack",eventId:n,eventType:r});const s=Array.from(o).map((async t=>t(e.origin,i))),a=await function(t){return Promise.all(t.map((async t=>{try{return{fulfilled:!0,value:await t}}catch(t){return{fulfilled:!1,reason:t}}})))}(s);e.ports[0].postMessage({status:"done",eventId:n,eventType:r,response:a})}_subscribe(t,e){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),e&&0!==this.handlersMap[t].size||delete this.handlersMap[t],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Cn(t="",e=10){let n="";for(let t=0;t<e;t++)n+=Math.floor(10*Math.random());return t+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Pn.receivers=[];class Nn{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,n=50){const r="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise(((s,a)=>{const u=Cn("",20);r.port1.start();const c=setTimeout((()=>{a(new Error("unsupported_event"))}),n);o={messageChannel:r,onMessage(t){const e=t;if(e.data.eventId===u)switch(e.data.status){case"ack":clearTimeout(c),i=setTimeout((()=>{a(new Error("timeout"))}),3e3);break;case"done":clearTimeout(i),s(e.data.response);break;default:clearTimeout(c),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:u,data:e},[r.port2])})).finally((()=>{o&&this.removeMessageHandler(o)}))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Bn(){return void 0!==Ln().WorkerGlobalScope&&"function"==typeof Ln().importScripts}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Dn="firebaseLocalStorageDb",Un="firebaseLocalStorage",jn="fbase_key";class Fn{constructor(t){this.request=t}toPromise(){return new Promise(((t,e)=>{this.request.addEventListener("success",(()=>{t(this.request.result)})),this.request.addEventListener("error",(()=>{e(this.request.error)}))}))}}function Vn(t,e){return t.transaction([Un],e?"readwrite":"readonly").objectStore(Un)}function zn(){const t=indexedDB.open(Dn,1);return new Promise(((e,n)=>{t.addEventListener("error",(()=>{n(t.error)})),t.addEventListener("upgradeneeded",(()=>{const e=t.result;try{e.createObjectStore(Un,{keyPath:jn})}catch(t){n(t)}})),t.addEventListener("success",(async()=>{const n=t.result;n.objectStoreNames.contains(Un)?e(n):(n.close(),await function(){const t=indexedDB.deleteDatabase(Dn);return new Fn(t).toPromise()}(),e(await zn()))}))}))}async function qn(t,e,n){const r=Vn(t,!0).put({[jn]:e,value:n});return new Fn(r).toPromise()}function $n(t,e){const n=Vn(t,!0).delete(e);return new Fn(n).toPromise()}class Wn{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((()=>{}),(()=>{}))}async _openDb(){return this.db||(this.db=await zn()),this.db}async _withRetries(t){let e=0;for(;;)try{const e=await this._openDb();return await t(e)}catch(t){if(e++>3)throw t;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Bn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Pn._getInstance(Bn()?self:null),this.receiver._subscribe("keyChanged",(async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)}))),this.receiver._subscribe("ping",(async(t,e)=>["keyChanged"]))}async initializeSender(){var t,e;if(this.activeServiceWorker=await async function(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(t){return null}}(),!this.activeServiceWorker)return;this.sender=new Nn(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null===(t=n[0])||void 0===t?void 0:t.fulfilled)&&(null===(e=n[0])||void 0===e?void 0:e.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(this.sender&&this.activeServiceWorker&&function(){var t;return(null===(t=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null}()===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await zn();return await qn(t,An,"1"),await $n(t,An),!0}catch(t){}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite((async()=>(await this._withRetries((n=>qn(n,t,e))),this.localCache[t]=e,this.notifyServiceWorker(t))))}async _get(t){const e=await this._withRetries((e=>async function(t,e){const n=Vn(t,!1).get(e),r=await new Fn(n).toPromise();return void 0===r?null:r.value}(e,t)));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite((async()=>(await this._withRetries((e=>$n(e,t))),delete this.localCache[t],this.notifyServiceWorker(t))))}async _poll(){const t=await this._withRetries((t=>{const e=Vn(t,!1).getAll();return new Fn(e).toPromise()}));if(!t)return[];if(0!==this.pendingWrites)return[];const e=[],n=new Set;for(const{fbase_key:r,value:i}of t)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),e.push(r));for(const t of Object.keys(this.localCache))this.localCache[t]&&!n.has(t)&&(this.notifyListeners(t,null),e.push(t));return e}notifyListeners(t,e){this.localCache[t]=e;const n=this.listeners[t];if(n)for(const t of Array.from(n))t(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((async()=>this._poll()),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),0===this.listeners[t].size&&delete this.listeners[t]),0===Object.keys(this.listeners).length&&this.stopPolling()}}Wn.type="LOCAL";const Hn=Wn;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
We("rcb"),new ee(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Kn="recaptcha";async function Gn(t,e,n){var r;const i=await n.verify();try{let o;if(Gt("string"==typeof i,t,"argument-error"),Gt(n.type===Kn,t,"argument-error"),o="string"==typeof e?{phoneNumber:e}:e,"session"in o){const e=o.session;if("phoneNumber"in o){Gt("enroll"===e.type,t,"internal-error");const n=
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */await function(t,e){return ae(t,"POST","/v2/accounts/mfaEnrollment:start",se(t,e))}(t,{idToken:e.credential,phoneEnrollmentInfo:{phoneNumber:o.phoneNumber,recaptchaToken:i}});return n.phoneSessionInfo.sessionInfo}{Gt("signin"===e.type,t,"internal-error");const n=(null===(r=o.multiFactorHint)||void 0===r?void 0:r.uid)||o.multiFactorUid;Gt(n,t,"missing-multi-factor-info");const s=await function(t,e){return ae(t,"POST","/v2/accounts/mfaSignIn:start",se(t,e))}(t,{mfaPendingCredential:e.credential,mfaEnrollmentId:n,phoneSignInInfo:{recaptchaToken:i}});return s.phoneResponseInfo.sessionInfo}}{const{sessionInfo:e}=await async function(t,e){return ae(t,"POST","/v1/accounts:sendVerificationCode",se(t,e))}(t,{phoneNumber:o.phoneNumber,recaptchaToken:i});return e}}finally{n._reset()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Jn{constructor(t){this.providerId=Jn.PROVIDER_ID,this.auth=Qe(t)}verifyPhoneNumber(t,e){return Gn(this.auth,t,P(e))}static credential(t,e){return cn._fromVerification(t,e)}static credentialFromResult(t){const e=t;return Jn.credentialFromTaggedObject(e)}static credentialFromError(t){return Jn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{phoneNumber:e,temporaryProof:n}=t;return e&&n?cn._fromTokenResponse(e,n):null}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Qn(t,e){return e?_e(e):(Gt(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Jn.PROVIDER_ID="phone",Jn.PHONE_SIGN_IN_METHOD="phone";class Xn extends en{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return sn(t,this._buildIdpRequest())}_linkToIdToken(t,e){return sn(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return sn(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function Yn(t){return kn(t.auth,new Xn(t),t.bypassAuthState)}function Zn(t){const{auth:e,user:n}=t;return Gt(n,e,"internal-error"),_n(n,new Xn(t),t.bypassAuthState)}async function tr(t){const{auth:e,user:n}=t;return Gt(n,e,"internal-error"),Sn(n,new Xn(t),t.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(t,e,n,r,i=!1){this.auth=t,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise((async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(t){this.reject(t)}}))}async onAuthEvent(t){const{urlResponse:e,sessionId:n,postBody:r,tenantId:i,error:o,type:s}=t;if(o)return void this.reject(o);const a={auth:this.auth,requestUri:e,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(s)(a))}catch(t){this.reject(t)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return Yn;case"linkViaPopup":case"linkViaRedirect":return tr;case"reauthViaPopup":case"reauthViaRedirect":return Zn;default:$t(this.auth,"internal-error")}}resolve(t){Qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){Qt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr=new ee(2e3,1e4);class rr extends er{constructor(t,e,n,r,i){super(t,e,r,i),this.provider=n,this.authWindow=null,this.pollId=null,rr.currentPopupAction&&rr.currentPopupAction.cancel(),rr.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return Gt(t,this.auth,"internal-error"),t}async onExecution(){Qt(1===this.filter.length,"Popup operations only handle one event");const t=Cn();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch((t=>{this.reject(t)})),this.resolver._isIframeWebStorageSupported(this.auth,(t=>{t||this.reject(Wt(this.auth,"web-storage-unsupported"))})),this.pollUserCancellation()}get eventId(){var t;return(null===(t=this.authWindow)||void 0===t?void 0:t.associatedEvent)||null}cancel(){this.reject(Wt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,rr.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,n;(null===(n=null===(e=this.authWindow)||void 0===e?void 0:e.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout((()=>{this.pollId=null,this.reject(Wt(this.auth,"popup-closed-by-user"))}),8e3):this.pollId=window.setTimeout(t,nr.get())};t()}}rr.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ir="pendingRedirect",or=new Map;class sr extends er{constructor(t,e,n=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,n),this.eventId=null}async execute(){let t=or.get(this.auth._key());if(!t){try{const e=await async function(t,e){const n=cr(e),r=ur(t);if(!await r._isAvailable())return!1;const i="true"===await r._get(n);return await r._remove(n),i}(this.resolver,this.auth),n=e?await super.execute():null;t=()=>Promise.resolve(n)}catch(e){t=()=>Promise.reject(e)}or.set(this.auth._key(),t)}return this.bypassAuthState||or.set(this.auth._key(),(()=>Promise.resolve(null))),t()}async onAuthEvent(t){if("signInViaRedirect"===t.type)return super.onAuthEvent(t);if("unknown"!==t.type){if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}}function ar(t,e){or.set(t._key(),e)}function ur(t){return _e(t._redirectPersistence)}function cr(t){return Te(ir,t.config.apiKey,t.name)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lr(t,e,n=!1){const r=Qe(t),i=Qn(r,e),o=new sr(r,i,n),s=await o.execute();return s&&!n&&(delete s.user._redirectEventId,await r._persistUserIfCurrent(s.user),await r._setRedirectUser(null,e)),s}class hr{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach((n=>{this.isEventForConsumer(t,n)&&(e=!0,this.sendToConsumer(t,n),this.saveEventToCache(t))})),this.hasHandledPotentialRedirect||!function(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return dr(t);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var n;if(t.error&&!dr(t)){const r=(null===(n=t.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";e.onError(Wt(this.auth,r))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const n=null===e.eventId||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&n}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(fr(t))}saveEventToCache(t){this.cachedEventUids.add(fr(t)),this.lastProcessedEventTime=Date.now()}}function fr(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter((t=>t)).join("-")}function dr({type:t,error:e}){return"unknown"===t&&"auth/no-auth-event"===(null==e?void 0:e.code)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const pr=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,gr=/^https?/;async function mr(t){if(t.config.emulator)return;const{authorizedDomains:e}=await async function(t,e={}){return ae(t,"GET","/v1/projects",e)}(t);for(const t of e)try{if(yr(t))return}catch(t){}$t(t,"unauthorized-domain")}function yr(t){const e=Xt(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const i=new URL(t);return""===i.hostname&&""===r?"chrome-extension:"===n&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===r}if(!gr.test(n))return!1;if(pr.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr=new ee(3e4,6e4);function br(){const t=Ln().___jsl;if(null==t?void 0:t.H)for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let e=0;e<t.CP.length;e++)t.CP[e]=null}let wr=null;function Er(t){return wr=wr||function(t){return new Promise(((e,n)=>{var r,i,o;function s(){br(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{br(),n(Wt(t,"network-request-failed"))},timeout:vr.get()})}if(null===(i=null===(r=Ln().gapi)||void 0===r?void 0:r.iframes)||void 0===i?void 0:i.Iframe)e(gapi.iframes.getContext());else{if(!(null===(o=Ln().gapi)||void 0===o?void 0:o.load)){const e=We("iframefcb");return Ln()[e]=()=>{gapi.load?s():n(Wt(t,"network-request-failed"))},$e(`https://apis.google.com/js/api.js?onload=${e}`).catch((t=>n(t)))}s()}})).catch((t=>{throw wr=null,t}))}(t),wr}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir=new ee(5e3,15e3),Sr="__/auth/iframe",_r="emulator/auth/iframe",kr={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ar=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Tr(t){const e=t.config;Gt(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?ne(e,_r):`https://${t.config.authDomain}/${Sr}`,r={apiKey:e.apiKey,appName:t.name,v:Et},i=Ar.get(t.config.apiHost);i&&(r.eid=i);const o=t._getFrameworks();return o.length&&(r.fw=o.join(",")),`${n}?${T(r).slice(1)}`}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const xr={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class Or{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(t){}}}function Rr(t,e,n,r=500,i=600){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),s=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const u=Object.assign(Object.assign({},xr),{width:r.toString(),height:i.toString(),top:o,left:s}),c=b().toLowerCase();n&&(a=Pe(c)?"_blank":n),Re(c)&&(e=e||"http://localhost",u.scrollbars="yes");const l=Object.entries(u).reduce(((t,[e,n])=>`${t}${e}=${n},`),"");if(function(t=b()){var e;return De(t)&&!!(null===(e=window.navigator)||void 0===e?void 0:e.standalone)}(c)&&"_self"!==a)return function(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e||"",a),new Or(null);const h=window.open(e||"",a,l);Gt(h,t,"popup-blocked");try{h.focus()}catch(t){}return new Or(h)}const Mr="__/auth/handler",Pr="emulator/auth/handler",Cr=encodeURIComponent("fac");async function Nr(t,e,n,r,i,o){Gt(t.config.authDomain,t,"auth-domain-config-required"),Gt(t.config.apiKey,t,"invalid-api-key");const s={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Et,eventId:i};if(e instanceof fn){e.setDefaultLanguage(t.languageCode),s.providerId=e.providerId||"",function(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}(e.getCustomParameters())||(s.customParameters=JSON.stringify(e.getCustomParameters()));for(const[t,e]of Object.entries(o||{}))s[t]=e}if(e instanceof dn){const t=e.getScopes().filter((t=>""!==t));t.length>0&&(s.scopes=t.join(","))}t.tenantId&&(s.tid=t.tenantId);const a=s;for(const t of Object.keys(a))void 0===a[t]&&delete a[t];const u=await t._getAppCheckToken(),c=u?`#${Cr}=${encodeURIComponent(u)}`:"";return`${function({config:t}){if(!t.emulator)return`https://${t.authDomain}/${Mr}`;return ne(t,Pr)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)}?${T(a).slice(1)}${c}`}const Lr="webStorageSupport";const Br=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Mn,this._completeRedirectFn=lr,this._overrideRedirectResult=ar}async _openPopup(t,e,n,r){var i;Qt(null===(i=this.eventManagers[t._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");return Rr(t,await Nr(t,e,n,Xt(),r),Cn())}async _openRedirect(t,e,n,r){await this._originValidation(t);return function(t){Ln().location.href=t}(await Nr(t,e,n,Xt(),r)),new Promise((()=>{}))}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:t,promise:n}=this.eventManagers[e];return t?Promise.resolve(t):(Qt(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(t);return this.eventManagers[e]={promise:n},n.catch((()=>{delete this.eventManagers[e]})),n}async initAndGetManager(t){const e=await async function(t){const e=await Er(t),n=Ln().gapi;return Gt(n,t,"internal-error"),e.open({where:document.body,url:Tr(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:kr,dontclear:!0},(e=>new Promise((async(n,r)=>{await e.restyle({setHideOnLeave:!1});const i=Wt(t,"network-request-failed"),o=Ln().setTimeout((()=>{r(i)}),Ir.get());function s(){Ln().clearTimeout(o),n(e)}e.ping(s).then(s,(()=>{r(i)}))}))))}(t),n=new hr(t);return e.register("authEvent",(e=>{Gt(null==e?void 0:e.authEvent,t,"invalid-auth-event");return{status:n.onEvent(e.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:n},this.iframes[t._key()]=e,n}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(Lr,{type:Lr},(n=>{var r;const i=null===(r=null==n?void 0:n[0])||void 0===r?void 0:r[Lr];void 0!==i&&e(!!i),$t(t,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=mr(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return je()||Me()||De()}};var Dr="@firebase/auth",Ur="0.23.2";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jr{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),(null===(t=this.auth.currentUser)||void 0===t?void 0:t.uid)||null}async getToken(t){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(t)}}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged((e=>{t((null==e?void 0:e.stsTokenManager.accessToken)||null)}));this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){Gt(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Fr=m("authIdTokenMaxAge")||300;let Vr=null;var zr;zr="Browser",yt(new C("auth",((t,{options:e})=>{const n=t.getProvider("app").getImmediate(),r=t.getProvider("heartbeat"),i=t.getProvider("app-check-internal"),{apiKey:o,authDomain:s}=n.options;Gt(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const a={apiKey:o,authDomain:s,clientPlatform:zr,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Fe(zr)},u=new Je(n,r,i,a);return function(t,e){const n=(null==e?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(_e);(null==e?void 0:e.errorMap)&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,null==e?void 0:e.popupRedirectResolver)}(u,e),u}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((t,e,n)=>{t.getProvider("auth-internal").initialize()}))),yt(new C("auth-internal",(t=>(t=>new jr(t))(Qe(t.getProvider("auth").getImmediate()))),"PRIVATE").setInstantiationMode("EXPLICIT")),_t(Dr,Ur,function(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(zr)),_t(Dr,Ur,"esm2017");n(76142);const qr=new class{urlParams={};originalUrl="";cleanUpParams=["utm_source","utm_id","utm_medium","utm_campaign","utm_term","utm_content","adset","adsetid","deep_link","referrer","affiliate_id"];constructor(){}saveParamsFromUrl(){let t=window.location.search.substring(1);if(t.length){let e=Object.fromEntries(new URLSearchParams(t));this.urlParams=e}return this.cleanParamsFromUrl(),this.urlParams}cleanParamsFromUrl(){let t=window.location,e=new URL(t.toString());return this.cleanUpParams.forEach((t=>e.searchParams.delete(t))),history.replaceState&&(this.originalUrl=t.toString(),history.replaceState({},"",e.toString())),e.toString()}};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
_t("firebase","9.23.0","app");var $r,Wr="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},Hr={},Kr=Kr||{},Gr=Wr||self;function Jr(t){var e=typeof t;return"array"==(e="object"!=e?e:t?Array.isArray(t)?"array":e:"null")||"object"==e&&"number"==typeof t.length}function Qr(t){var e=typeof t;return"object"==e&&null!=t||"function"==e}var Xr="closure_uid_"+(1e9*Math.random()>>>0),Yr=0;function Zr(t,e,n){return t.call.apply(t.bind,arguments)}function ti(t,e,n){if(!t)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),t.apply(e,n)}}return function(){return t.apply(e,arguments)}}function ei(t,e,n){return(ei=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Zr:ti).apply(null,arguments)}function ni(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var e=n.slice();return e.push.apply(e,arguments),t.apply(this,e)}}function ri(t,e){function n(){}n.prototype=e.prototype,t.$=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.ac=function(t,n,r){for(var i=Array(arguments.length-2),o=2;o<arguments.length;o++)i[o-2]=arguments[o];return e.prototype[n].apply(t,i)}}function ii(){this.s=this.s,this.o=this.o}ii.prototype.s=!1,ii.prototype.sa=function(){var t;!this.s&&(this.s=!0,this.N(),0)&&(t=this,Object.prototype.hasOwnProperty.call(t,Xr)&&t[Xr]||(t[Xr]=++Yr))},ii.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const oi=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if("string"==typeof t)return"string"!=typeof e||1!=e.length?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1};function si(t){const e=t.length;if(0<e){const n=Array(e);for(let r=0;r<e;r++)n[r]=t[r];return n}return[]}function ai(t,e){for(let e=1;e<arguments.length;e++){const n=arguments[e];if(Jr(n)){const e=t.length||0,r=n.length||0;t.length=e+r;for(let i=0;i<r;i++)t[e+i]=n[i]}else t.push(n)}}function ui(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}ui.prototype.h=function(){this.defaultPrevented=!0};var ci=function(){if(!Gr.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{Gr.addEventListener("test",(()=>{}),e),Gr.removeEventListener("test",(()=>{}),e)}catch(t){}return t}();function li(t){return/^[\s\xa0]*$/.test(t)}function hi(){var t=Gr.navigator;return t&&(t=t.userAgent)?t:""}function fi(t){return-1!=hi().indexOf(t)}function di(t){return di[" "](t),t}di[" "]=function(){};var pi,gi,mi,yi=fi("Opera"),vi=fi("Trident")||fi("MSIE"),bi=fi("Edge"),wi=bi||vi,Ei=fi("Gecko")&&!(-1!=hi().toLowerCase().indexOf("webkit")&&!fi("Edge"))&&!(fi("Trident")||fi("MSIE"))&&!fi("Edge"),Ii=-1!=hi().toLowerCase().indexOf("webkit")&&!fi("Edge");function Si(){var t=Gr.document;return t?t.documentMode:void 0}t:{var _i="",ki=(gi=hi(),Ei?/rv:([^\);]+)(\)|;)/.exec(gi):bi?/Edge\/([\d\.]+)/.exec(gi):vi?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(gi):Ii?/WebKit\/(\S+)/.exec(gi):yi?/(?:Version)[ \/]?(\S+)/.exec(gi):void 0);if(ki&&(_i=ki?ki[1]:""),vi){var Ai=Si();if(null!=Ai&&Ai>parseFloat(_i)){pi=String(Ai);break t}}pi=_i}if(Gr.document&&vi){var Ti=Si();mi=Ti||(parseInt(pi,10)||void 0)}else mi=void 0;var xi=mi;function Oi(t,e){if(ui.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,r=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(Ei){t:{try{di(e.nodeName);var i=!0;break t}catch(t){}i=!1}i||(e=null)}}else"mouseover"==n?e=t.fromElement:"mouseout"==n&&(e=t.toElement);this.relatedTarget=e,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==t.clientX?t.clientX:t.pageX,this.clientY=void 0!==t.clientY?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType="string"==typeof t.pointerType?t.pointerType:Ri[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&Oi.$.h.call(this)}}ri(Oi,ui);var Ri={2:"touch",3:"pen",4:"mouse"};Oi.prototype.h=function(){Oi.$.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var Mi="closure_listenable_"+(1e6*Math.random()|0),Pi=0;function Ci(t,e,n,r,i){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!r,this.la=i,this.key=++Pi,this.fa=this.ia=!1}function Ni(t){t.fa=!0,t.listener=null,t.proxy=null,t.src=null,t.la=null}function Li(t,e,n){for(const r in t)e.call(n,t[r],r,t)}function Bi(t){const e={};for(const n in t)e[n]=t[n];return e}const Di="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Ui(t,e){let n,r;for(let e=1;e<arguments.length;e++){for(n in r=arguments[e],r)t[n]=r[n];for(let e=0;e<Di.length;e++)n=Di[e],Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}}function ji(t){this.src=t,this.g={},this.h=0}function Fi(t,e){var n=e.type;if(n in t.g){var r,i=t.g[n],o=oi(i,e);(r=0<=o)&&Array.prototype.splice.call(i,o,1),r&&(Ni(e),0==t.g[n].length&&(delete t.g[n],t.h--))}}function Vi(t,e,n,r){for(var i=0;i<t.length;++i){var o=t[i];if(!o.fa&&o.listener==e&&o.capture==!!n&&o.la==r)return i}return-1}ji.prototype.add=function(t,e,n,r,i){var o=t.toString();(t=this.g[o])||(t=this.g[o]=[],this.h++);var s=Vi(t,e,r,i);return-1<s?(e=t[s],n||(e.ia=!1)):((e=new Ci(e,this.src,o,!!r,i)).ia=n,t.push(e)),e};var zi="closure_lm_"+(1e6*Math.random()|0),qi={};function $i(t,e,n,r,i){if(r&&r.once)return Hi(t,e,n,r,i);if(Array.isArray(e)){for(var o=0;o<e.length;o++)$i(t,e[o],n,r,i);return null}return n=Zi(n),t&&t[Mi]?t.O(e,n,Qr(r)?!!r.capture:!!r,i):Wi(t,e,n,!1,r,i)}function Wi(t,e,n,r,i,o){if(!e)throw Error("Invalid event type");var s=Qr(i)?!!i.capture:!!i,a=Xi(t);if(a||(t[zi]=a=new ji(t)),(n=a.add(e,n,r,s,o)).proxy)return n;if(r=function(){function t(n){return e.call(t.src,t.listener,n)}const e=Qi;return t}(),n.proxy=r,r.src=t,r.listener=n,t.addEventListener)ci||(i=s),void 0===i&&(i=!1),t.addEventListener(e.toString(),r,i);else if(t.attachEvent)t.attachEvent(Ji(e.toString()),r);else{if(!t.addListener||!t.removeListener)throw Error("addEventListener and attachEvent are unavailable.");t.addListener(r)}return n}function Hi(t,e,n,r,i){if(Array.isArray(e)){for(var o=0;o<e.length;o++)Hi(t,e[o],n,r,i);return null}return n=Zi(n),t&&t[Mi]?t.P(e,n,Qr(r)?!!r.capture:!!r,i):Wi(t,e,n,!0,r,i)}function Ki(t,e,n,r,i){if(Array.isArray(e))for(var o=0;o<e.length;o++)Ki(t,e[o],n,r,i);else r=Qr(r)?!!r.capture:!!r,n=Zi(n),t&&t[Mi]?(t=t.i,(e=String(e).toString())in t.g&&(-1<(n=Vi(o=t.g[e],n,r,i))&&(Ni(o[n]),Array.prototype.splice.call(o,n,1),0==o.length&&(delete t.g[e],t.h--)))):t&&(t=Xi(t))&&(e=t.g[e.toString()],t=-1,e&&(t=Vi(e,n,r,i)),(n=-1<t?e[t]:null)&&Gi(n))}function Gi(t){if("number"!=typeof t&&t&&!t.fa){var e=t.src;if(e&&e[Mi])Fi(e.i,t);else{var n=t.type,r=t.proxy;e.removeEventListener?e.removeEventListener(n,r,t.capture):e.detachEvent?e.detachEvent(Ji(n),r):e.addListener&&e.removeListener&&e.removeListener(r),(n=Xi(e))?(Fi(n,t),0==n.h&&(n.src=null,e[zi]=null)):Ni(t)}}}function Ji(t){return t in qi?qi[t]:qi[t]="on"+t}function Qi(t,e){if(t.fa)t=!0;else{e=new Oi(e,this);var n=t.listener,r=t.la||t.src;t.ia&&Gi(t),t=n.call(r,e)}return t}function Xi(t){return(t=t[zi])instanceof ji?t:null}var Yi="__closure_events_fn_"+(1e9*Math.random()>>>0);function Zi(t){return"function"==typeof t?t:(t[Yi]||(t[Yi]=function(e){return t.handleEvent(e)}),t[Yi])}function to(){ii.call(this),this.i=new ji(this),this.S=this,this.J=null}function eo(t,e){var n,r=t.J;if(r)for(n=[];r;r=r.J)n.push(r);if(t=t.S,r=e.type||e,"string"==typeof e)e=new ui(e,t);else if(e instanceof ui)e.target=e.target||t;else{var i=e;Ui(e=new ui(r,t),i)}if(i=!0,n)for(var o=n.length-1;0<=o;o--){var s=e.g=n[o];i=no(s,r,!0,e)&&i}if(i=no(s=e.g=t,r,!0,e)&&i,i=no(s,r,!1,e)&&i,n)for(o=0;o<n.length;o++)i=no(s=e.g=n[o],r,!1,e)&&i}function no(t,e,n,r){if(!(e=t.i.g[String(e)]))return!0;e=e.concat();for(var i=!0,o=0;o<e.length;++o){var s=e[o];if(s&&!s.fa&&s.capture==n){var a=s.listener,u=s.la||s.src;s.ia&&Fi(t.i,s),i=!1!==a.call(u,r)&&i}}return i&&!r.defaultPrevented}ri(to,ii),to.prototype[Mi]=!0,to.prototype.removeEventListener=function(t,e,n,r){Ki(this,t,e,n,r)},to.prototype.N=function(){if(to.$.N.call(this),this.i){var t,e=this.i;for(t in e.g){for(var n=e.g[t],r=0;r<n.length;r++)Ni(n[r]);delete e.g[t],e.h--}}this.J=null},to.prototype.O=function(t,e,n,r){return this.i.add(String(t),e,!1,n,r)},to.prototype.P=function(t,e,n,r){return this.i.add(String(t),e,!0,n,r)};var ro=Gr.JSON.stringify;function io(){var t=ho;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}var oo=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}((()=>new so),(t=>t.reset()));class so{constructor(){this.next=this.g=this.h=null}set(t,e){this.h=t,this.g=e,this.next=null}reset(){this.next=this.g=this.h=null}}function ao(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function uo(t){Gr.setTimeout((()=>{throw t}),0)}let co,lo=!1,ho=new class{constructor(){this.h=this.g=null}add(t,e){const n=oo.get();n.set(t,e),this.h?this.h.next=n:this.g=n,this.h=n}},fo=()=>{const t=Gr.Promise.resolve(void 0);co=()=>{t.then(po)}};var po=()=>{for(var t;t=io();){try{t.h.call(t.g)}catch(t){uo(t)}var e=oo;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}lo=!1};function go(t,e){to.call(this),this.h=t||1,this.g=e||Gr,this.j=ei(this.qb,this),this.l=Date.now()}function mo(t){t.ga=!1,t.T&&(t.g.clearTimeout(t.T),t.T=null)}function yo(t,e,n){if("function"==typeof t)n&&(t=ei(t,n));else{if(!t||"function"!=typeof t.handleEvent)throw Error("Invalid listener argument");t=ei(t.handleEvent,t)}return 2147483647<Number(e)?-1:Gr.setTimeout(t,e||0)}function vo(t){t.g=yo((()=>{t.g=null,t.i&&(t.i=!1,vo(t))}),t.j);const e=t.h;t.h=null,t.m.apply(null,e)}ri(go,to),($r=go.prototype).ga=!1,$r.T=null,$r.qb=function(){if(this.ga){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-t):(this.T&&(this.g.clearTimeout(this.T),this.T=null),eo(this,"tick"),this.ga&&(mo(this),this.start()))}},$r.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())},$r.N=function(){go.$.N.call(this),mo(this),delete this.g};class bo extends ii{constructor(t,e){super(),this.m=t,this.j=e,this.h=null,this.i=!1,this.g=null}l(t){this.h=arguments,this.g?this.i=!0:vo(this)}N(){super.N(),this.g&&(Gr.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function wo(t){ii.call(this),this.h=t,this.g={}}ri(wo,ii);var Eo=[];function Io(t,e,n,r){Array.isArray(n)||(n&&(Eo[0]=n.toString()),n=Eo);for(var i=0;i<n.length;i++){var o=$i(e,n[i],r||t.handleEvent,!1,t.h||t);if(!o)break;t.g[o.key]=o}}function So(t){Li(t.g,(function(t,e){this.g.hasOwnProperty(e)&&Gi(t)}),t),t.g={}}function _o(){this.g=!0}function ko(t,e,n,r){t.info((function(){return"XMLHTTP TEXT ("+e+"): "+function(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n)for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var r=n[t];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var o=i[0];if("noop"!=o&&"stop"!=o&&"close"!=o)for(var s=1;s<i.length;s++)i[s]=""}}}return ro(n)}catch(t){return e}}(t,n)+(r?" "+r:"")}))}wo.prototype.N=function(){wo.$.N.call(this),So(this)},wo.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},_o.prototype.Ea=function(){this.g=!1},_o.prototype.info=function(){};var Ao={},To=null;function xo(){return To=To||new to}function Oo(t){ui.call(this,Ao.Ta,t)}function Ro(t){const e=xo();eo(e,new Oo(e))}function Mo(t,e){ui.call(this,Ao.STAT_EVENT,t),this.stat=e}function Po(t){const e=xo();eo(e,new Mo(e,t))}function Co(t,e){ui.call(this,Ao.Ua,t),this.size=e}function No(t,e){if("function"!=typeof t)throw Error("Fn must not be null and must be a function");return Gr.setTimeout((function(){t()}),e)}Ao.Ta="serverreachability",ri(Oo,ui),Ao.STAT_EVENT="statevent",ri(Mo,ui),Ao.Ua="timingevent",ri(Co,ui);var Lo={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},Bo={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function Do(){}function Uo(t){return t.h||(t.h=t.i())}function jo(){}Do.prototype.h=null;var Fo,Vo={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function zo(){ui.call(this,"d")}function qo(){ui.call(this,"c")}function $o(){}function Wo(t,e,n,r){this.l=t,this.j=e,this.m=n,this.W=r||1,this.U=new wo(this),this.P=Ko,t=wi?125:void 0,this.V=new go(t),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new Ho}function Ho(){this.i=null,this.g="",this.h=!1}ri(zo,ui),ri(qo,ui),ri($o,Do),$o.prototype.g=function(){return new XMLHttpRequest},$o.prototype.i=function(){return{}},Fo=new $o;var Ko=45e3,Go={},Jo={};function Qo(t,e,n){t.L=1,t.v=gs(ls(e)),t.s=n,t.S=!0,Xo(t,null)}function Xo(t,e){t.G=Date.now(),es(t),t.A=ls(t.v);var n=t.A,r=t.W;Array.isArray(r)||(r=[String(r)]),xs(n.i,"t",r),t.C=0,n=t.l.J,t.h=new Ho,t.g=xa(t.l,n?e:null,!t.s),0<t.O&&(t.M=new bo(ei(t.Pa,t,t.g),t.O)),Io(t.U,t.g,"readystatechange",t.nb),e=t.I?Bi(t.I):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ha(t.A,t.u,t.s,e)):(t.u="GET",t.g.ha(t.A,t.u,null,e)),Ro(),function(t,e,n,r,i,o){t.info((function(){if(t.g)if(o)for(var s="",a=o.split("&"),u=0;u<a.length;u++){var c=a[u].split("=");if(1<c.length){var l=c[0];c=c[1];var h=l.split("_");s=2<=h.length&&"type"==h[1]?s+(l+"=")+c+"&":s+(l+"=redacted&")}}else s=null;else s=o;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+e+"\n"+n+"\n"+s}))}(t.j,t.u,t.A,t.m,t.W,t.s)}function Yo(t){return!!t.g&&("GET"==t.u&&2!=t.L&&t.l.Ha)}function Zo(t,e,n){let r,i=!0;for(;!t.J&&t.C<n.length;){if(r=ts(t,n),r==Jo){4==e&&(t.o=4,Po(14),i=!1),ko(t.j,t.m,null,"[Incomplete Response]");break}if(r==Go){t.o=4,Po(15),ko(t.j,t.m,n,"[Invalid Chunk]"),i=!1;break}ko(t.j,t.m,r,null),ss(t,r)}Yo(t)&&r!=Jo&&r!=Go&&(t.h.g="",t.C=0),4!=e||0!=n.length||t.h.h||(t.o=1,Po(16),i=!1),t.i=t.i&&i,i?0<n.length&&!t.ba&&(t.ba=!0,(e=t.l).g==t&&e.ca&&!e.M&&(e.l.info("Great, no buffering proxy detected. Bytes received: "+n.length),wa(e),e.M=!0,Po(11))):(ko(t.j,t.m,n,"[Invalid Chunked Response]"),os(t),is(t))}function ts(t,e){var n=t.C,r=e.indexOf("\n",n);return-1==r?Jo:(n=Number(e.substring(n,r)),isNaN(n)?Go:(r+=1)+n>e.length?Jo:(e=e.slice(r,r+n),t.C=r+n,e))}function es(t){t.Y=Date.now()+t.P,ns(t,t.P)}function ns(t,e){if(null!=t.B)throw Error("WatchDog timer not null");t.B=No(ei(t.lb,t),e)}function rs(t){t.B&&(Gr.clearTimeout(t.B),t.B=null)}function is(t){0==t.l.H||t.J||Sa(t.l,t)}function os(t){rs(t);var e=t.M;e&&"function"==typeof e.sa&&e.sa(),t.M=null,mo(t.V),So(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.sa())}function ss(t,e){try{var n=t.l;if(0!=n.H&&(n.g==t||Ls(n.i,t)))if(!t.K&&Ls(n.i,t)&&3==n.H){try{var r=n.Ja.g.parse(e)}catch(t){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){t:if(!n.u){if(n.g){if(!(n.g.G+3e3<t.G))break t;Ia(n),fa(n)}ba(n),Po(18)}}else n.Fa=i[1],0<n.Fa-n.V&&37500>i[2]&&n.G&&0==n.A&&!n.v&&(n.v=No(ei(n.ib,n),6e3));if(1>=Ns(n.i)&&n.oa){try{n.oa()}catch(t){}n.oa=void 0}}else ka(n,11)}else if((t.K||n.g==t)&&Ia(n),!li(e))for(i=n.Ja.g.parse(e),e=0;e<i.length;e++){let c=i[e];if(n.V=c[0],c=c[1],2==n.H)if("c"==c[0]){n.K=c[1],n.pa=c[2];const e=c[3];null!=e&&(n.ra=e,n.l.info("VER="+n.ra));const i=c[4];null!=i&&(n.Ga=i,n.l.info("SVER="+n.Ga));const l=c[5];null!=l&&"number"==typeof l&&0<l&&(r=1.5*l,n.L=r,n.l.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=t.g;if(h){const t=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(t){var o=r.i;o.g||-1==t.indexOf("spdy")&&-1==t.indexOf("quic")&&-1==t.indexOf("h2")||(o.j=o.l,o.g=new Set,o.h&&(Bs(o,o.h),o.h=null))}if(r.F){const t=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;t&&(r.Da=t,ps(r.I,r.F,t))}}n.H=3,n.h&&n.h.Ba(),n.ca&&(n.S=Date.now()-t.G,n.l.info("Handshake RTT: "+n.S+"ms"));var s=t;if((r=n).wa=Ta(r,r.J?r.pa:null,r.Y),s.K){Ds(r.i,s);var a=s,u=r.L;u&&a.setTimeout(u),a.B&&(rs(a),es(a)),r.g=s}else va(r);0<n.j.length&&pa(n)}else"stop"!=c[0]&&"close"!=c[0]||ka(n,7);else 3==n.H&&("stop"==c[0]||"close"==c[0]?"stop"==c[0]?ka(n,7):ha(n):"noop"!=c[0]&&n.h&&n.h.Aa(c),n.A=0)}Ro()}catch(t){}}function as(t,e){if(t.forEach&&"function"==typeof t.forEach)t.forEach(e,void 0);else if(Jr(t)||"string"==typeof t)Array.prototype.forEach.call(t,e,void 0);else for(var n=function(t){if(t.ta&&"function"==typeof t.ta)return t.ta();if(!t.Z||"function"!=typeof t.Z){if("undefined"!=typeof Map&&t instanceof Map)return Array.from(t.keys());if(!("undefined"!=typeof Set&&t instanceof Set)){if(Jr(t)||"string"==typeof t){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const r in t)e[n++]=r;return e}}}(t),r=function(t){if(t.Z&&"function"==typeof t.Z)return t.Z();if("undefined"!=typeof Map&&t instanceof Map||"undefined"!=typeof Set&&t instanceof Set)return Array.from(t.values());if("string"==typeof t)return t.split("");if(Jr(t)){for(var e=[],n=t.length,r=0;r<n;r++)e.push(t[r]);return e}for(r in e=[],n=0,t)e[n++]=t[r];return e}(t),i=r.length,o=0;o<i;o++)e.call(void 0,r[o],n&&n[o],t)}($r=Wo.prototype).setTimeout=function(t){this.P=t},$r.nb=function(t){t=t.target;const e=this.M;e&&3==oa(t)?e.l():this.Pa(t)},$r.Pa=function(t){try{if(t==this.g)t:{const l=oa(this.g);var e=this.g.Ia();this.g.da();if(!(3>l)&&(3!=l||wi||this.g&&(this.h.h||this.g.ja()||sa(this.g)))){this.J||4!=l||7==e||Ro(),rs(this);var n=this.g.da();this.ca=n;e:if(Yo(this)){var r=sa(this.g);t="";var i=r.length,o=4==oa(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){os(this),is(this);var s="";break e}this.h.i=new Gr.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,t+=this.h.i.decode(r[e],{stream:o&&e==i-1});r.splice(0,i),this.h.g+=t,this.C=0,s=this.h.g}else s=this.g.ja();if(this.i=200==n,function(t,e,n,r,i,o,s){t.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+e+"\n"+n+"\n"+o+" "+s}))}(this.j,this.u,this.A,this.m,this.W,l,n),this.i){if(this.aa&&!this.K){e:{if(this.g){var a,u=this.g;if((a=u.g?u.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!li(a)){var c=a;break e}}c=null}if(!(n=c)){this.i=!1,this.o=3,Po(12),os(this),is(this);break t}ko(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ss(this,n)}this.S?(Zo(this,l,s),wi&&this.i&&3==l&&(Io(this.U,this.V,"tick",this.mb),this.V.start())):(ko(this.j,this.m,s,null),ss(this,s)),4==l&&os(this),this.i&&!this.J&&(4==l?Sa(this.l,this):(this.i=!1,es(this)))}else(function(t){const e={};t=(t.g&&2<=oa(t)&&t.g.getAllResponseHeaders()||"").split("\r\n");for(let r=0;r<t.length;r++){if(li(t[r]))continue;var n=ao(t[r]);const i=n[0];if("string"!=typeof(n=n[1]))continue;n=n.trim();const o=e[i]||[];e[i]=o,o.push(n)}!function(t,e){for(const n in t)e.call(void 0,t[n],n,t)}(e,(function(t){return t.join(", ")}))})(this.g),400==n&&0<s.indexOf("Unknown SID")?(this.o=3,Po(12)):(this.o=0,Po(13)),os(this),is(this)}}}catch(t){}},$r.mb=function(){if(this.g){var t=oa(this.g),e=this.g.ja();this.C<e.length&&(rs(this),Zo(this,t,e),this.i&&4!=t&&es(this))}},$r.cancel=function(){this.J=!0,os(this)},$r.lb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(function(t,e){t.info((function(){return"TIMEOUT: "+e}))}(this.j,this.A),2!=this.L&&(Ro(),Po(17)),os(this),this.o=2,is(this)):ns(this,this.Y-t)};var us=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function cs(t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,t instanceof cs){this.h=t.h,hs(this,t.j),this.s=t.s,this.g=t.g,fs(this,t.m),this.l=t.l;var e=t.i,n=new _s;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),ds(this,n),this.o=t.o}else t&&(e=String(t).match(us))?(this.h=!1,hs(this,e[1]||"",!0),this.s=ms(e[2]||""),this.g=ms(e[3]||"",!0),fs(this,e[4]),this.l=ms(e[5]||"",!0),ds(this,e[6]||"",!0),this.o=ms(e[7]||"")):(this.h=!1,this.i=new _s(null,this.h))}function ls(t){return new cs(t)}function hs(t,e,n){t.j=n?ms(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function fs(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function ds(t,e,n){e instanceof _s?(t.i=e,function(t,e){e&&!t.j&&(ks(t),t.i=null,t.g.forEach((function(t,e){var n=e.toLowerCase();e!=n&&(As(this,e),xs(this,n,t))}),t)),t.j=e}(t.i,t.h)):(n||(e=ys(e,Is)),t.i=new _s(e,t.h))}function ps(t,e,n){t.i.set(e,n)}function gs(t){return ps(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function ms(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function ys(t,e,n){return"string"==typeof t?(t=encodeURI(t).replace(e,vs),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function vs(t){return"%"+((t=t.charCodeAt(0))>>4&15).toString(16)+(15&t).toString(16)}cs.prototype.toString=function(){var t=[],e=this.j;e&&t.push(ys(e,bs,!0),":");var n=this.g;return(n||"file"==e)&&(t.push("//"),(e=this.s)&&t.push(ys(e,bs,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.m)&&t.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&t.push("/"),t.push(ys(n,"/"==n.charAt(0)?Es:ws,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.o)&&t.push("#",ys(n,Ss)),t.join("")};var bs=/[#\/\?@]/g,ws=/[#\?:]/g,Es=/[#\?]/g,Is=/[#\?@]/g,Ss=/#/g;function _s(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function ks(t){t.g||(t.g=new Map,t.h=0,t.i&&function(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var r=t[n].indexOf("="),i=null;if(0<=r){var o=t[n].substring(0,r);i=t[n].substring(r+1)}else o=t[n];e(o,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(t.i,(function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)})))}function As(t,e){ks(t),e=Os(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function Ts(t,e){return ks(t),e=Os(t,e),t.g.has(e)}function xs(t,e,n){As(t,e),0<n.length&&(t.i=null,t.g.set(Os(t,e),si(n)),t.h+=n.length)}function Os(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}($r=_s.prototype).add=function(t,e){ks(this),this.i=null,t=Os(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this},$r.forEach=function(t,e){ks(this),this.g.forEach((function(n,r){n.forEach((function(n){t.call(e,n,r,this)}),this)}),this)},$r.ta=function(){ks(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let r=0;r<e.length;r++){const i=t[r];for(let t=0;t<i.length;t++)n.push(e[r])}return n},$r.Z=function(t){ks(this);let e=[];if("string"==typeof t)Ts(this,t)&&(e=e.concat(this.g.get(Os(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e},$r.set=function(t,e){return ks(this),this.i=null,Ts(this,t=Os(this,t))&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this},$r.get=function(t,e){return t&&0<(t=this.Z(t)).length?String(t[0]):e},$r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var r=e[n];const o=encodeURIComponent(String(r)),s=this.Z(r);for(r=0;r<s.length;r++){var i=o;""!==s[r]&&(i+="="+encodeURIComponent(String(s[r]))),t.push(i)}}return this.i=t.join("&")};var Rs=class{constructor(t,e){this.g=t,this.map=e}};function Ms(t){this.l=t||Ps,Gr.PerformanceNavigationTiming?t=0<(t=Gr.performance.getEntriesByType("navigation")).length&&("hq"==t[0].nextHopProtocol||"h2"==t[0].nextHopProtocol):t=!!(Gr.g&&Gr.g.Ka&&Gr.g.Ka()&&Gr.g.Ka().ec),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Ps=10;function Cs(t){return!!t.h||!!t.g&&t.g.size>=t.j}function Ns(t){return t.h?1:t.g?t.g.size:0}function Ls(t,e){return t.h?t.h==e:!!t.g&&t.g.has(e)}function Bs(t,e){t.g?t.g.add(e):t.h=e}function Ds(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}function Us(t){if(null!=t.h)return t.i.concat(t.h.F);if(null!=t.g&&0!==t.g.size){let e=t.i;for(const n of t.g.values())e=e.concat(n.F);return e}return si(t.i)}Ms.prototype.cancel=function(){if(this.i=Us(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const t of this.g.values())t.cancel();this.g.clear()}};var js=class{stringify(t){return Gr.JSON.stringify(t,void 0)}parse(t){return Gr.JSON.parse(t,void 0)}};function Fs(){this.g=new js}function Vs(t,e,n){const r=n||"";try{as(t,(function(t,n){let i=t;Qr(t)&&(i=ro(t)),e.push(r+n+"="+encodeURIComponent(i))}))}catch(t){throw e.push(r+"type="+encodeURIComponent("_badmap")),t}}function zs(t,e,n,r,i){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,i(r)}catch(t){}}function qs(t){this.l=t.fc||null,this.j=t.ob||!1}function $s(t,e){to.call(this),this.F=t,this.u=e,this.m=void 0,this.readyState=Ws,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}ri(qs,Do),qs.prototype.g=function(){return new $s(this.l,this.j)},qs.prototype.i=function(t){return function(){return t}}({}),ri($s,to);var Ws=0;function Hs(t){t.j.read().then(t.Xa.bind(t)).catch(t.ka.bind(t))}function Ks(t){t.readyState=4,t.l=null,t.j=null,t.A=null,Gs(t)}function Gs(t){t.onreadystatechange&&t.onreadystatechange.call(t)}($r=$s.prototype).open=function(t,e){if(this.readyState!=Ws)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,Gs(this)},$r.send=function(t){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.F||Gr).fetch(new Request(this.B,e)).then(this.$a.bind(this),this.ka.bind(this))},$r.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch((()=>{})),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Ks(this)),this.readyState=Ws},$r.$a=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Gs(this)),this.g&&(this.readyState=3,Gs(this),this.g)))if("arraybuffer"===this.responseType)t.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(void 0!==Gr.ReadableStream&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Hs(this)}else t.text().then(this.Za.bind(this),this.ka.bind(this))},$r.Xa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Ks(this):Gs(this),3==this.readyState&&Hs(this)}},$r.Za=function(t){this.g&&(this.response=this.responseText=t,Ks(this))},$r.Ya=function(t){this.g&&(this.response=t,Ks(this))},$r.ka=function(){this.g&&Ks(this)},$r.setRequestHeader=function(t,e){this.v.append(t,e)},$r.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},$r.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join("\r\n")},Object.defineProperty($s.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(t){this.m=t?"include":"same-origin"}});var Js=Gr.JSON.parse;function Qs(t){to.call(this),this.headers=new Map,this.u=t||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=Xs,this.L=this.M=!1}ri(Qs,to);var Xs="",Ys=/^https?$/i,Zs=["POST","PUT"];function ta(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,ea(t),ra(t)}function ea(t){t.F||(t.F=!0,eo(t,"complete"),eo(t,"error"))}function na(t){if(t.h&&void 0!==Kr&&(!t.C[1]||4!=oa(t)||2!=t.da()))if(t.v&&4==oa(t))yo(t.La,0,t);else if(eo(t,"readystatechange"),4==oa(t)){t.h=!1;try{const s=t.da();t:switch(s){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break t;default:e=!1}var n;if(!(n=e)){var r;if(r=0===s){var i=String(t.I).match(us)[1]||null;!i&&Gr.self&&Gr.self.location&&(i=Gr.self.location.protocol.slice(0,-1)),r=!Ys.test(i?i.toLowerCase():"")}n=r}if(n)eo(t,"complete"),eo(t,"success");else{t.m=6;try{var o=2<oa(t)?t.g.statusText:""}catch(t){o=""}t.j=o+" ["+t.da()+"]",ea(t)}}finally{ra(t)}}}function ra(t,e){if(t.g){ia(t);const n=t.g,r=t.C[0]?()=>{}:null;t.g=null,t.C=null,e||eo(t,"ready");try{n.onreadystatechange=r}catch(t){}}}function ia(t){t.g&&t.L&&(t.g.ontimeout=null),t.A&&(Gr.clearTimeout(t.A),t.A=null)}function oa(t){return t.g?t.g.readyState:0}function sa(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.K){case Xs:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch(t){return null}}function aa(t){let e="";return Li(t,(function(t,n){e+=n,e+=":",e+=t,e+="\r\n"})),e}function ua(t,e,n){t:{for(r in n){var r=!1;break t}r=!0}r||(n=aa(n),"string"==typeof t?null!=n&&encodeURIComponent(String(n)):ps(t,e,n))}function ca(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function la(t){this.Ga=0,this.j=[],this.l=new _o,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=ca("failFast",!1,t),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=ca("baseRetryDelayMs",5e3,t),this.hb=ca("retryDelaySeedMs",1e4,t),this.eb=ca("forwardChannelMaxRetries",2,t),this.xa=ca("forwardChannelRequestTimeoutMs",2e4,t),this.va=t&&t.xmlHttpFactory||void 0,this.Ha=t&&t.dc||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.i=new Ms(t&&t.concurrentRequestLimit),this.Ja=new Fs,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=t&&t.bc||!1,t&&t.Ea&&this.l.Ea(),t&&t.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&t&&t.detectBufferingProxy||!1,this.qa=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.qa=t.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}function ha(t){if(da(t),3==t.H){var e=t.W++,n=ls(t.I);if(ps(n,"SID",t.K),ps(n,"RID",e),ps(n,"TYPE","terminate"),ma(t,n),(e=new Wo(t,t.l,e)).L=2,e.v=gs(ls(n)),n=!1,Gr.navigator&&Gr.navigator.sendBeacon)try{n=Gr.navigator.sendBeacon(e.v.toString(),"")}catch(t){}!n&&Gr.Image&&((new Image).src=e.v,n=!0),n||(e.g=xa(e.l,null),e.g.ha(e.v)),e.G=Date.now(),es(e)}Aa(t)}function fa(t){t.g&&(wa(t),t.g.cancel(),t.g=null)}function da(t){fa(t),t.u&&(Gr.clearTimeout(t.u),t.u=null),Ia(t),t.i.cancel(),t.m&&("number"==typeof t.m&&Gr.clearTimeout(t.m),t.m=null)}function pa(t){if(!Cs(t.i)&&!t.m){t.m=!0;var e=t.Na;co||fo(),lo||(co(),lo=!0),ho.add(e,t),t.C=0}}function ga(t,e){var n;n=e?e.m:t.W++;const r=ls(t.I);ps(r,"SID",t.K),ps(r,"RID",n),ps(r,"AID",t.V),ma(t,r),t.o&&t.s&&ua(r,t.o,t.s),n=new Wo(t,t.l,n,t.C+1),null===t.o&&(n.I=t.s),e&&(t.j=e.F.concat(t.j)),e=ya(t,n,1e3),n.setTimeout(Math.round(.5*t.xa)+Math.round(.5*t.xa*Math.random())),Bs(t.i,n),Qo(n,r,e)}function ma(t,e){t.na&&Li(t.na,(function(t,n){ps(e,n,t)})),t.h&&as({},(function(t,n){ps(e,n,t)}))}function ya(t,e,n){n=Math.min(t.j.length,n);var r=t.h?ei(t.h.Va,t.h,t):null;t:{var i=t.j;let e=-1;for(;;){const t=["count="+n];-1==e?0<n?(e=i[0].g,t.push("ofs="+e)):e=0:t.push("ofs="+e);let o=!0;for(let s=0;s<n;s++){let n=i[s].g;const a=i[s].map;if(n-=e,0>n)e=Math.max(0,i[s].g-100),o=!1;else try{Vs(a,t,"req"+n+"_")}catch(t){r&&r(a)}}if(o){r=t.join("&");break t}}}return t=t.j.splice(0,n),e.F=t,r}function va(t){if(!t.g&&!t.u){t.ba=1;var e=t.Ma;co||fo(),lo||(co(),lo=!0),ho.add(e,t),t.A=0}}function ba(t){return!(t.g||t.u||3<=t.A)&&(t.ba++,t.u=No(ei(t.Ma,t),_a(t,t.A)),t.A++,!0)}function wa(t){null!=t.B&&(Gr.clearTimeout(t.B),t.B=null)}function Ea(t){t.g=new Wo(t,t.l,"rpc",t.ba),null===t.o&&(t.g.I=t.s),t.g.O=0;var e=ls(t.wa);ps(e,"RID","rpc"),ps(e,"SID",t.K),ps(e,"AID",t.V),ps(e,"CI",t.G?"0":"1"),!t.G&&t.qa&&ps(e,"TO",t.qa),ps(e,"TYPE","xmlhttp"),ma(t,e),t.o&&t.s&&ua(e,t.o,t.s),t.L&&t.g.setTimeout(t.L);var n=t.g;t=t.pa,n.L=1,n.v=gs(ls(e)),n.s=null,n.S=!0,Xo(n,t)}function Ia(t){null!=t.v&&(Gr.clearTimeout(t.v),t.v=null)}function Sa(t,e){var n=null;if(t.g==e){Ia(t),wa(t),t.g=null;var r=2}else{if(!Ls(t.i,e))return;n=e.F,Ds(t.i,e),r=1}if(0!=t.H)if(e.i)if(1==r){n=e.s?e.s.length:0,e=Date.now()-e.G;var i=t.C;eo(r=xo(),new Co(r,n)),pa(t)}else va(t);else if(3==(i=e.o)||0==i&&0<e.ca||!(1==r&&function(t,e){return!(Ns(t.i)>=t.i.j-(t.m?1:0)||(t.m?(t.j=e.F.concat(t.j),0):1==t.H||2==t.H||t.C>=(t.cb?0:t.eb)||(t.m=No(ei(t.Na,t,e),_a(t,t.C)),t.C++,0)))}(t,e)||2==r&&ba(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),i){case 1:ka(t,5);break;case 4:ka(t,10);break;case 3:ka(t,6);break;default:ka(t,2)}}function _a(t,e){let n=t.ab+Math.floor(Math.random()*t.hb);return t.isActive()||(n*=2),n*e}function ka(t,e){if(t.l.info("Error code "+e),2==e){var n=null;t.h&&(n=null);var r=ei(t.pb,t);n||(n=new cs("//www.google.com/images/cleardot.gif"),Gr.location&&"http"==Gr.location.protocol||hs(n,"https"),gs(n)),function(t,e){const n=new _o;if(Gr.Image){const r=new Image;r.onload=ni(zs,n,r,"TestLoadImage: loaded",!0,e),r.onerror=ni(zs,n,r,"TestLoadImage: error",!1,e),r.onabort=ni(zs,n,r,"TestLoadImage: abort",!1,e),r.ontimeout=ni(zs,n,r,"TestLoadImage: timeout",!1,e),Gr.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=t}else e(!1)}(n.toString(),r)}else Po(2);t.H=0,t.h&&t.h.za(e),Aa(t),da(t)}function Aa(t){if(t.H=0,t.ma=[],t.h){const e=Us(t.i);0==e.length&&0==t.j.length||(ai(t.ma,e),ai(t.ma,t.j),t.i.i.length=0,si(t.j),t.j.length=0),t.h.ya()}}function Ta(t,e,n){var r=n instanceof cs?ls(n):new cs(n);if(""!=r.g)e&&(r.g=e+"."+r.g),fs(r,r.m);else{var i=Gr.location;r=i.protocol,e=e?e+"."+i.hostname:i.hostname,i=+i.port;var o=new cs(null);r&&hs(o,r),e&&(o.g=e),i&&fs(o,i),n&&(o.l=n),r=o}return n=t.F,e=t.Da,n&&e&&ps(r,n,e),ps(r,"VER",t.ra),ma(t,r),r}function xa(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return(e=n&&t.Ha&&!t.va?new Qs(new qs({ob:!0})):new Qs(t.va)).Oa(t.J),e}function Oa(){}function Ra(){if(vi&&!(10<=Number(xi)))throw Error("Environmental error: no available transport.")}function Ma(t,e){to.call(this),this.g=new la(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.Ca&&(t?t["X-WebChannel-Client-Profile"]=e.Ca:t={"X-WebChannel-Client-Profile":e.Ca}),this.g.U=t,(t=e&&e.cc)&&!li(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!li(e)&&(this.g.F=e,null!==(t=this.h)&&e in t&&(e in(t=this.h)&&delete t[e])),this.j=new Na(this)}function Pa(t){zo.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){t:{for(const n in e){t=n;break t}t=void 0}(this.i=t)&&(t=this.i,e=null!==e&&t in e?e[t]:void 0),this.data=e}else this.data=t}function Ca(){qo.call(this),this.status=1}function Na(t){this.g=t}function La(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}function Ba(t,e,n){n||(n=0);var r=Array(16);if("string"==typeof e)for(var i=0;16>i;++i)r[i]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(i=0;16>i;++i)r[i]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],i=t.g[2];var o=t.g[3],s=e+(o^n&(i^o))+r[0]+3614090360&4294967295;s=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=(n=(i=(o=(e=n+(s<<7&4294967295|s>>>25))+((s=o+(i^e&(n^i))+r[1]+3905402710&4294967295)<<12&4294967295|s>>>20))+((s=i+(n^o&(e^n))+r[2]+606105819&4294967295)<<17&4294967295|s>>>15))+((s=n+(e^i&(o^e))+r[3]+3250441966&4294967295)<<22&4294967295|s>>>10))+((s=e+(o^n&(i^o))+r[4]+4118548399&4294967295)<<7&4294967295|s>>>25))+((s=o+(i^e&(n^i))+r[5]+1200080426&4294967295)<<12&4294967295|s>>>20))+((s=i+(n^o&(e^n))+r[6]+2821735955&4294967295)<<17&4294967295|s>>>15))+((s=n+(e^i&(o^e))+r[7]+4249261313&4294967295)<<22&4294967295|s>>>10))+((s=e+(o^n&(i^o))+r[8]+1770035416&4294967295)<<7&4294967295|s>>>25))+((s=o+(i^e&(n^i))+r[9]+2336552879&4294967295)<<12&4294967295|s>>>20))+((s=i+(n^o&(e^n))+r[10]+4294925233&4294967295)<<17&4294967295|s>>>15))+((s=n+(e^i&(o^e))+r[11]+2304563134&4294967295)<<22&4294967295|s>>>10))+((s=e+(o^n&(i^o))+r[12]+1804603682&4294967295)<<7&4294967295|s>>>25))+((s=o+(i^e&(n^i))+r[13]+4254626195&4294967295)<<12&4294967295|s>>>20))+((s=i+(n^o&(e^n))+r[14]+2792965006&4294967295)<<17&4294967295|s>>>15))+((s=n+(e^i&(o^e))+r[15]+1236535329&4294967295)<<22&4294967295|s>>>10))+((s=e+(i^o&(n^i))+r[1]+4129170786&4294967295)<<5&4294967295|s>>>27))+((s=o+(n^i&(e^n))+r[6]+3225465664&4294967295)<<9&4294967295|s>>>23))+((s=i+(e^n&(o^e))+r[11]+643717713&4294967295)<<14&4294967295|s>>>18))+((s=n+(o^e&(i^o))+r[0]+3921069994&4294967295)<<20&4294967295|s>>>12))+((s=e+(i^o&(n^i))+r[5]+3593408605&4294967295)<<5&4294967295|s>>>27))+((s=o+(n^i&(e^n))+r[10]+38016083&4294967295)<<9&4294967295|s>>>23))+((s=i+(e^n&(o^e))+r[15]+3634488961&4294967295)<<14&4294967295|s>>>18))+((s=n+(o^e&(i^o))+r[4]+3889429448&4294967295)<<20&4294967295|s>>>12))+((s=e+(i^o&(n^i))+r[9]+568446438&4294967295)<<5&4294967295|s>>>27))+((s=o+(n^i&(e^n))+r[14]+3275163606&4294967295)<<9&4294967295|s>>>23))+((s=i+(e^n&(o^e))+r[3]+4107603335&4294967295)<<14&4294967295|s>>>18))+((s=n+(o^e&(i^o))+r[8]+1163531501&4294967295)<<20&4294967295|s>>>12))+((s=e+(i^o&(n^i))+r[13]+2850285829&4294967295)<<5&4294967295|s>>>27))+((s=o+(n^i&(e^n))+r[2]+4243563512&4294967295)<<9&4294967295|s>>>23))+((s=i+(e^n&(o^e))+r[7]+1735328473&4294967295)<<14&4294967295|s>>>18))+((s=n+(o^e&(i^o))+r[12]+2368359562&4294967295)<<20&4294967295|s>>>12))+((s=e+(n^i^o)+r[5]+4294588738&4294967295)<<4&4294967295|s>>>28))+((s=o+(e^n^i)+r[8]+2272392833&4294967295)<<11&4294967295|s>>>21))+((s=i+(o^e^n)+r[11]+1839030562&4294967295)<<16&4294967295|s>>>16))+((s=n+(i^o^e)+r[14]+4259657740&4294967295)<<23&4294967295|s>>>9))+((s=e+(n^i^o)+r[1]+2763975236&4294967295)<<4&4294967295|s>>>28))+((s=o+(e^n^i)+r[4]+1272893353&4294967295)<<11&4294967295|s>>>21))+((s=i+(o^e^n)+r[7]+4139469664&4294967295)<<16&4294967295|s>>>16))+((s=n+(i^o^e)+r[10]+3200236656&4294967295)<<23&4294967295|s>>>9))+((s=e+(n^i^o)+r[13]+681279174&4294967295)<<4&4294967295|s>>>28))+((s=o+(e^n^i)+r[0]+3936430074&4294967295)<<11&4294967295|s>>>21))+((s=i+(o^e^n)+r[3]+3572445317&4294967295)<<16&4294967295|s>>>16))+((s=n+(i^o^e)+r[6]+76029189&4294967295)<<23&4294967295|s>>>9))+((s=e+(n^i^o)+r[9]+3654602809&4294967295)<<4&4294967295|s>>>28))+((s=o+(e^n^i)+r[12]+3873151461&4294967295)<<11&4294967295|s>>>21))+((s=i+(o^e^n)+r[15]+530742520&4294967295)<<16&4294967295|s>>>16))+((s=n+(i^o^e)+r[2]+3299628645&4294967295)<<23&4294967295|s>>>9))+((s=e+(i^(n|~o))+r[0]+4096336452&4294967295)<<6&4294967295|s>>>26))+((s=o+(n^(e|~i))+r[7]+1126891415&4294967295)<<10&4294967295|s>>>22))+((s=i+(e^(o|~n))+r[14]+2878612391&4294967295)<<15&4294967295|s>>>17))+((s=n+(o^(i|~e))+r[5]+4237533241&4294967295)<<21&4294967295|s>>>11))+((s=e+(i^(n|~o))+r[12]+1700485571&4294967295)<<6&4294967295|s>>>26))+((s=o+(n^(e|~i))+r[3]+2399980690&4294967295)<<10&4294967295|s>>>22))+((s=i+(e^(o|~n))+r[10]+4293915773&4294967295)<<15&4294967295|s>>>17))+((s=n+(o^(i|~e))+r[1]+2240044497&4294967295)<<21&4294967295|s>>>11))+((s=e+(i^(n|~o))+r[8]+1873313359&4294967295)<<6&4294967295|s>>>26))+((s=o+(n^(e|~i))+r[15]+4264355552&4294967295)<<10&4294967295|s>>>22))+((s=i+(e^(o|~n))+r[6]+2734768916&4294967295)<<15&4294967295|s>>>17))+((s=n+(o^(i|~e))+r[13]+1309151649&4294967295)<<21&4294967295|s>>>11))+((o=(e=n+((s=e+(i^(n|~o))+r[4]+4149444226&4294967295)<<6&4294967295|s>>>26))+((s=o+(n^(e|~i))+r[11]+3174756917&4294967295)<<10&4294967295|s>>>22))^((i=o+((s=i+(e^(o|~n))+r[2]+718787259&4294967295)<<15&4294967295|s>>>17))|~e))+r[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(i+(s<<21&4294967295|s>>>11))&4294967295,t.g[2]=t.g[2]+i&4294967295,t.g[3]=t.g[3]+o&4294967295}function Da(t,e){this.h=e;for(var n=[],r=!0,i=t.length-1;0<=i;i--){var o=0|t[i];r&&o==e||(n[i]=o,r=!1)}this.g=n}($r=Qs.prototype).Oa=function(t){this.M=t},$r.ha=function(t,e,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+t);e=e?e.toUpperCase():"GET",this.I=t,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():Fo.g(),this.C=this.u?Uo(this.u):Uo(Fo),this.g.onreadystatechange=ei(this.La,this);try{this.G=!0,this.g.open(e,String(t),!0),this.G=!1}catch(t){return void ta(this,t)}if(t=n||"",n=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var i in r)n.set(i,r[i]);else{if("function"!=typeof r.keys||"function"!=typeof r.get)throw Error("Unknown input type for opt_headers: "+String(r));for(const t of r.keys())n.set(t,r.get(t))}r=Array.from(n.keys()).find((t=>"content-type"==t.toLowerCase())),i=Gr.FormData&&t instanceof Gr.FormData,!(0<=oi(Zs,e))||r||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[t,e]of n)this.g.setRequestHeader(t,e);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{ia(this),0<this.B&&((this.L=function(t){return vi&&"number"==typeof t.timeout&&void 0!==t.ontimeout}(this.g))?(this.g.timeout=this.B,this.g.ontimeout=ei(this.ua,this)):this.A=yo(this.ua,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(t){ta(this,t)}},$r.ua=function(){void 0!==Kr&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,eo(this,"timeout"),this.abort(8))},$r.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,eo(this,"complete"),eo(this,"abort"),ra(this))},$r.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),ra(this,!0)),Qs.$.N.call(this)},$r.La=function(){this.s||(this.G||this.v||this.l?na(this):this.kb())},$r.kb=function(){na(this)},$r.isActive=function(){return!!this.g},$r.da=function(){try{return 2<oa(this)?this.g.status:-1}catch(t){return-1}},$r.ja=function(){try{return this.g?this.g.responseText:""}catch(t){return""}},$r.Wa=function(t){if(this.g){var e=this.g.responseText;return t&&0==e.indexOf(t)&&(e=e.substring(t.length)),Js(e)}},$r.Ia=function(){return this.m},$r.Sa=function(){return"string"==typeof this.j?this.j:String(this.j)},($r=la.prototype).ra=8,$r.H=1,$r.Na=function(t){if(this.m)if(this.m=null,1==this.H){if(!t){this.W=Math.floor(1e5*Math.random()),t=this.W++;const i=new Wo(this,this.l,t);let o=this.s;if(this.U&&(o?(o=Bi(o),Ui(o,this.U)):o=this.U),null!==this.o||this.O||(i.I=o,o=null),this.P)t:{for(var e=0,n=0;n<this.j.length;n++){var r=this.j[n];if(void 0===(r="__data__"in r.map&&"string"==typeof(r=r.map.__data__)?r.length:void 0))break;if(4096<(e+=r)){e=n;break t}if(4096===e||n===this.j.length-1){e=n+1;break t}}e=1e3}else e=1e3;e=ya(this,i,e),ps(n=ls(this.I),"RID",t),ps(n,"CVER",22),this.F&&ps(n,"X-HTTP-Session-Id",this.F),ma(this,n),o&&(this.O?e="headers="+encodeURIComponent(String(aa(o)))+"&"+e:this.o&&ua(n,this.o,o)),Bs(this.i,i),this.bb&&ps(n,"TYPE","init"),this.P?(ps(n,"$req",e),ps(n,"SID","null"),i.aa=!0,Qo(i,n,null)):Qo(i,n,e),this.H=2}}else 3==this.H&&(t?ga(this,t):0==this.j.length||Cs(this.i)||ga(this))},$r.Ma=function(){if(this.u=null,Ea(this),this.ca&&!(this.M||null==this.g||0>=this.S)){var t=2*this.S;this.l.info("BP detection timer enabled: "+t),this.B=No(ei(this.jb,this),t)}},$r.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,Po(10),fa(this),Ea(this))},$r.ib=function(){null!=this.v&&(this.v=null,fa(this),ba(this),Po(19))},$r.pb=function(t){t?(this.l.info("Successfully pinged google.com"),Po(2)):(this.l.info("Failed to ping google.com"),Po(1))},$r.isActive=function(){return!!this.h&&this.h.isActive(this)},($r=Oa.prototype).Ba=function(){},$r.Aa=function(){},$r.za=function(){},$r.ya=function(){},$r.isActive=function(){return!0},$r.Va=function(){},Ra.prototype.g=function(t,e){return new Ma(t,e)},ri(Ma,to),Ma.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var t=this.g,e=this.l,n=this.h||void 0;Po(0),t.Y=e,t.na=n||{},t.G=t.aa,t.I=Ta(t,null,t.Y),pa(t)},Ma.prototype.close=function(){ha(this.g)},Ma.prototype.u=function(t){var e=this.g;if("string"==typeof t){var n={};n.__data__=t,t=n}else this.v&&((n={}).__data__=ro(t),t=n);e.j.push(new Rs(e.fb++,t)),3==e.H&&pa(e)},Ma.prototype.N=function(){this.g.h=null,delete this.j,ha(this.g),delete this.g,Ma.$.N.call(this)},ri(Pa,zo),ri(Ca,qo),ri(Na,Oa),Na.prototype.Ba=function(){eo(this.g,"a")},Na.prototype.Aa=function(t){eo(this.g,new Pa(t))},Na.prototype.za=function(t){eo(this.g,new Ca)},Na.prototype.ya=function(){eo(this.g,"b")},ri(La,(function(){this.blockSize=-1})),La.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0},La.prototype.j=function(t,e){void 0===e&&(e=t.length);for(var n=e-this.blockSize,r=this.m,i=this.h,o=0;o<e;){if(0==i)for(;o<=n;)Ba(this,t,o),o+=this.blockSize;if("string"==typeof t){for(;o<e;)if(r[i++]=t.charCodeAt(o++),i==this.blockSize){Ba(this,r),i=0;break}}else for(;o<e;)if(r[i++]=t[o++],i==this.blockSize){Ba(this,r),i=0;break}}this.h=i,this.i+=e},La.prototype.l=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.i;for(e=t.length-8;e<t.length;++e)t[e]=255&n,n/=256;for(this.j(t),t=Array(16),e=n=0;4>e;++e)for(var r=0;32>r;r+=8)t[n++]=this.g[e]>>>r&255;return t};var Ua={};function ja(t){return-128<=t&&128>t?function(t,e){var n=Ua;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}(t,(function(t){return new Da([0|t],0>t?-1:0)})):new Da([0|t],0>t?-1:0)}function Fa(t){if(isNaN(t)||!isFinite(t))return za;if(0>t)return Ka(Fa(-t));for(var e=[],n=1,r=0;t>=n;r++)e[r]=t/n|0,n*=Va;return new Da(e,0)}var Va=4294967296,za=ja(0),qa=ja(1),$a=ja(16777216);function Wa(t){if(0!=t.h)return!1;for(var e=0;e<t.g.length;e++)if(0!=t.g[e])return!1;return!0}function Ha(t){return-1==t.h}function Ka(t){for(var e=t.g.length,n=[],r=0;r<e;r++)n[r]=~t.g[r];return new Da(n,~t.h).add(qa)}function Ga(t,e){return t.add(Ka(e))}function Ja(t,e){for(;(65535&t[e])!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function Qa(t,e){this.g=t,this.h=e}function Xa(t,e){if(Wa(e))throw Error("division by zero");if(Wa(t))return new Qa(za,za);if(Ha(t))return e=Xa(Ka(t),e),new Qa(Ka(e.g),Ka(e.h));if(Ha(e))return e=Xa(t,Ka(e)),new Qa(Ka(e.g),e.h);if(30<t.g.length){if(Ha(t)||Ha(e))throw Error("slowDivide_ only works with positive integers.");for(var n=qa,r=e;0>=r.X(t);)n=Ya(n),r=Ya(r);var i=Za(n,1),o=Za(r,1);for(r=Za(r,2),n=Za(n,2);!Wa(r);){var s=o.add(r);0>=s.X(t)&&(i=i.add(n),o=s),r=Za(r,1),n=Za(n,1)}return e=Ga(t,i.R(e)),new Qa(i,e)}for(i=za;0<=t.X(e);){for(n=Math.max(1,Math.floor(t.ea()/e.ea())),r=48>=(r=Math.ceil(Math.log(n)/Math.LN2))?1:Math.pow(2,r-48),s=(o=Fa(n)).R(e);Ha(s)||0<s.X(t);)s=(o=Fa(n-=r)).R(e);Wa(o)&&(o=qa),i=i.add(o),t=Ga(t,s)}return new Qa(i,t)}function Ya(t){for(var e=t.g.length+1,n=[],r=0;r<e;r++)n[r]=t.D(r)<<1|t.D(r-1)>>>31;return new Da(n,t.h)}function Za(t,e){var n=e>>5;e%=32;for(var r=t.g.length-n,i=[],o=0;o<r;o++)i[o]=0<e?t.D(o+n)>>>e|t.D(o+n+1)<<32-e:t.D(o+n);return new Da(i,t.h)}($r=Da.prototype).ea=function(){if(Ha(this))return-Ka(this).ea();for(var t=0,e=1,n=0;n<this.g.length;n++){var r=this.D(n);t+=(0<=r?r:Va+r)*e,e*=Va}return t},$r.toString=function(t){if(2>(t=t||10)||36<t)throw Error("radix out of range: "+t);if(Wa(this))return"0";if(Ha(this))return"-"+Ka(this).toString(t);for(var e=Fa(Math.pow(t,6)),n=this,r="";;){var i=Xa(n,e).g,o=((0<(n=Ga(n,i.R(e))).g.length?n.g[0]:n.h)>>>0).toString(t);if(Wa(n=i))return o+r;for(;6>o.length;)o="0"+o;r=o+r}},$r.D=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h},$r.X=function(t){return Ha(t=Ga(this,t))?-1:Wa(t)?0:1},$r.abs=function(){return Ha(this)?Ka(this):this},$r.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0,i=0;i<=e;i++){var o=r+(65535&this.D(i))+(65535&t.D(i)),s=(o>>>16)+(this.D(i)>>>16)+(t.D(i)>>>16);r=s>>>16,o&=65535,s&=65535,n[i]=s<<16|o}return new Da(n,-2147483648&n[n.length-1]?-1:0)},$r.R=function(t){if(Wa(this)||Wa(t))return za;if(Ha(this))return Ha(t)?Ka(this).R(Ka(t)):Ka(Ka(this).R(t));if(Ha(t))return Ka(this.R(Ka(t)));if(0>this.X($a)&&0>t.X($a))return Fa(this.ea()*t.ea());for(var e=this.g.length+t.g.length,n=[],r=0;r<2*e;r++)n[r]=0;for(r=0;r<this.g.length;r++)for(var i=0;i<t.g.length;i++){var o=this.D(r)>>>16,s=65535&this.D(r),a=t.D(i)>>>16,u=65535&t.D(i);n[2*r+2*i]+=s*u,Ja(n,2*r+2*i),n[2*r+2*i+1]+=o*u,Ja(n,2*r+2*i+1),n[2*r+2*i+1]+=s*a,Ja(n,2*r+2*i+1),n[2*r+2*i+2]+=o*a,Ja(n,2*r+2*i+2)}for(r=0;r<e;r++)n[r]=n[2*r+1]<<16|n[2*r];for(r=e;r<2*e;r++)n[r]=0;return new Da(n,0)},$r.gb=function(t){return Xa(this,t).h},$r.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.D(r)&t.D(r);return new Da(n,this.h&t.h)},$r.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.D(r)|t.D(r);return new Da(n,this.h|t.h)},$r.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],r=0;r<e;r++)n[r]=this.D(r)^t.D(r);return new Da(n,this.h^t.h)},Ra.prototype.createWebChannel=Ra.prototype.g,Ma.prototype.send=Ma.prototype.u,Ma.prototype.open=Ma.prototype.m,Ma.prototype.close=Ma.prototype.close,Lo.NO_ERROR=0,Lo.TIMEOUT=8,Lo.HTTP_ERROR=6,Bo.COMPLETE="complete",jo.EventType=Vo,Vo.OPEN="a",Vo.CLOSE="b",Vo.ERROR="c",Vo.MESSAGE="d",to.prototype.listen=to.prototype.O,Qs.prototype.listenOnce=Qs.prototype.P,Qs.prototype.getLastError=Qs.prototype.Sa,Qs.prototype.getLastErrorCode=Qs.prototype.Ia,Qs.prototype.getStatus=Qs.prototype.da,Qs.prototype.getResponseJson=Qs.prototype.Wa,Qs.prototype.getResponseText=Qs.prototype.ja,Qs.prototype.send=Qs.prototype.ha,Qs.prototype.setWithCredentials=Qs.prototype.Oa,La.prototype.digest=La.prototype.l,La.prototype.reset=La.prototype.reset,La.prototype.update=La.prototype.j,Da.prototype.add=Da.prototype.add,Da.prototype.multiply=Da.prototype.R,Da.prototype.modulo=Da.prototype.gb,Da.prototype.compare=Da.prototype.X,Da.prototype.toNumber=Da.prototype.ea,Da.prototype.toString=Da.prototype.toString,Da.prototype.getBits=Da.prototype.D,Da.fromNumber=Fa,Da.fromString=function t(e,n){if(0==e.length)throw Error("number format error: empty string");if(2>(n=n||10)||36<n)throw Error("radix out of range: "+n);if("-"==e.charAt(0))return Ka(t(e.substring(1),n));if(0<=e.indexOf("-"))throw Error('number format error: interior "-" character');for(var r=Fa(Math.pow(n,8)),i=za,o=0;o<e.length;o+=8){var s=Math.min(8,e.length-o),a=parseInt(e.substring(o,o+s),n);8>s?(s=Fa(Math.pow(n,s)),i=i.R(s).add(Fa(a))):i=(i=i.R(r)).add(Fa(a))}return i};var tu=Hr.createWebChannelTransport=function(){return new Ra},eu=Hr.getStatEventTarget=function(){return xo()},nu=Hr.ErrorCode=Lo,ru=Hr.EventType=Bo,iu=Hr.Event=Ao,ou=Hr.Stat={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},su=Hr.FetchXmlHttpFactory=qs,au=Hr.WebChannel=jo,uu=Hr.XhrIo=Qs,cu=(Hr.Md5=La,Hr.Integer=Da);n(34155);const lu="@firebase/firestore";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(t){this.uid=t}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}hu.UNAUTHENTICATED=new hu(null),hu.GOOGLE_CREDENTIALS=new hu("google-credentials-uid"),hu.FIRST_PARTY=new hu("first-party-uid"),hu.MOCK_USER=new hu("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let fu="9.23.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du=new $("@firebase/firestore");function pu(){return du.logLevel}function gu(t,...e){if(du.logLevel<=j.DEBUG){const n=e.map(vu);du.debug(`Firestore (${fu}): ${t}`,...n)}}function mu(t,...e){if(du.logLevel<=j.ERROR){const n=e.map(vu);du.error(`Firestore (${fu}): ${t}`,...n)}}function yu(t,...e){if(du.logLevel<=j.WARN){const n=e.map(vu);du.warn(`Firestore (${fu}): ${t}`,...n)}}function vu(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e)}catch(e){return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bu(t="Unexpected state"){const e=`FIRESTORE (${fu}) INTERNAL ASSERTION FAILED: `+t;throw mu(e),new Error(e)}function wu(t,e){t||bu()}function Eu(t,e){return t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iu={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Su extends I{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Au{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(hu.UNAUTHENTICATED)))}shutdown(){}}class Tu{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class xu{constructor(t){this.t=t,this.currentUser=hu.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){let n=this.i;const r=t=>this.i!==n?(n=this.i,e(t)):Promise.resolve();let i=new _u;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new _u,t.enqueueRetryable((()=>r(this.currentUser)))};const o=()=>{const e=i;t.enqueueRetryable((async()=>{await e.promise,await r(this.currentUser)}))},s=t=>{gu("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=t,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit((t=>s(t))),setTimeout((()=>{if(!this.auth){const t=this.t.getImmediate({optional:!0});t?s(t):(gu("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new _u)}}),0),o()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((e=>this.i!==t?(gu("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):e?(wu("string"==typeof e.accessToken),new ku(e.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const t=this.auth&&this.auth.getUid();return wu(null===t||"string"==typeof t),new hu(t)}}class Ou{constructor(t,e,n){this.h=t,this.l=e,this.m=n,this.type="FirstParty",this.user=hu.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);const t=this.p();return t&&this.g.set("Authorization",t),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class Ru{constructor(t,e,n){this.h=t,this.l=e,this.m=n}getToken(){return Promise.resolve(new Ou(this.h,this.l,this.m))}start(t,e){t.enqueueRetryable((()=>e(hu.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Mu{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Pu{constructor(t){this.I=t,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(t,e){const n=t=>{null!=t.error&&gu("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${t.error.message}`);const n=t.token!==this.T;return this.T=t.token,gu("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?e(t.token):Promise.resolve()};this.o=e=>{t.enqueueRetryable((()=>n(e)))};const r=t=>{gu("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=t,this.appCheck.addTokenListener(this.o)};this.I.onInit((t=>r(t))),setTimeout((()=>{if(!this.appCheck){const t=this.I.getImmediate({optional:!0});t?r(t):gu("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((t=>t?(wu("string"==typeof t.token),this.T=t.token,new Mu(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Cu(t){const e="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else for(let e=0;e<t;e++)n[e]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{static A(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(256/62);let n="";for(;n.length<20;){const r=Cu(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<e&&(n+=t.charAt(r[i]%62))}return n}}function Lu(t,e){return t<e?-1:t>e?1:0}function Bu(t,e,n){return t.length===e.length&&t.every(((t,r)=>n(t,e[r])))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Du{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new Su(Iu.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new Su(Iu.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new Su(Iu.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new Su(Iu.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return Du.fromMillis(Date.now())}static fromDate(t){return Du.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new Du(e,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?Lu(this.nanoseconds,t.nanoseconds):Lu(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(t){this.timestamp=t}static fromTimestamp(t){return new Uu(t)}static min(){return new Uu(new Du(0,0))}static max(){return new Uu(new Du(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(t,e,n){void 0===e?e=0:e>t.length&&bu(),void 0===n?n=t.length-e:n>t.length-e&&bu(),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return 0===ju.comparator(this,t)}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof ju?t.forEach((t=>{e.push(t)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return 0===this.length}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const n=t.get(r),i=e.get(r);if(n<i)return-1;if(n>i)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Fu extends ju{construct(t,e,n){return new Fu(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new Su(Iu.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter((t=>t.length>0)))}return new Fu(e)}static emptyPath(){return new Fu([])}}const Vu=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class zu extends ju{construct(t,e,n){return new zu(t,e,n)}static isValidIdentifier(t){return Vu.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),zu.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new zu(["__name__"])}static fromServerFormat(t){const e=[];let n="",r=0;const i=()=>{if(0===n.length)throw new Su(Iu.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let o=!1;for(;r<t.length;){const e=t[r];if("\\"===e){if(r+1===t.length)throw new Su(Iu.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const e=t[r+1];if("\\"!==e&&"."!==e&&"`"!==e)throw new Su(Iu.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=e,r+=2}else"`"===e?(o=!o,r++):"."!==e||o?(n+=e,r++):(i(),r++)}if(i(),o)throw new Su(Iu.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new zu(e)}static emptyPath(){return new zu([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(t){this.path=t}static fromPath(t){return new qu(Fu.fromString(t))}static fromName(t){return new qu(Fu.fromString(t).popFirst(5))}static empty(){return new qu(Fu.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return null!==t&&0===Fu.comparator(this.path,t.path)}toString(){return this.path.toString()}static comparator(t,e){return Fu.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new qu(new Fu(t.slice()))}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(t,e,n,r){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=r}}$u.UNKNOWN_ID=-1;function Wu(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=Uu.fromTimestamp(1e9===r?new Du(n+1,0):new Du(n,r));return new Ku(i,qu.empty(),e)}function Hu(t){return new Ku(t.readTime,t.key,-1)}class Ku{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Ku(Uu.min(),qu.empty(),-1)}static max(){return new Ku(Uu.max(),qu.empty(),-1)}}function Gu(t,e){let n=t.readTime.compareTo(e.readTime);return 0!==n?n:(n=qu.comparator(t.documentKey,e.documentKey),0!==n?n:Lu(t.largestBatchId,e.largestBatchId))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ju="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Qu{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xu(t){if(t.code!==Iu.FAILED_PRECONDITION||t.message!==Ju)throw t;gu("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&bu(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new Yu(((n,r)=>{this.nextCallback=e=>{this.wrapSuccess(t,e).next(n,r)},this.catchCallback=t=>{this.wrapFailure(e,t).next(n,r)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof Yu?e:Yu.resolve(e)}catch(t){return Yu.reject(t)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):Yu.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):Yu.reject(e)}static resolve(t){return new Yu(((e,n)=>{e(t)}))}static reject(t){return new Yu(((e,n)=>{n(t)}))}static waitFor(t){return new Yu(((e,n)=>{let r=0,i=0,o=!1;t.forEach((t=>{++r,t.next((()=>{++i,o&&i===r&&e()}),(t=>n(t)))})),o=!0,i===r&&e()}))}static or(t){let e=Yu.resolve(!1);for(const n of t)e=e.next((t=>t?Yu.resolve(t):n()));return e}static forEach(t,e){const n=[];return t.forEach(((t,r)=>{n.push(e.call(this,t,r))})),this.waitFor(n)}static mapArray(t,e){return new Yu(((n,r)=>{const i=t.length,o=new Array(i);let s=0;for(let a=0;a<i;a++){const u=a;e(t[u]).next((t=>{o[u]=t,++s,s===i&&n(o)}),(t=>r(t)))}}))}static doWhile(t,e){return new Yu(((n,r)=>{const i=()=>{!0===t()?e().next((()=>{i()}),r):n()};i()}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zu(t){return"IndexedDbTransactionError"===t.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tc{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=t=>this.ot(t),this.ut=t=>e.writeSequenceNumber(t))}ot(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ut&&this.ut(t),t}}function ec(t){return null==t}function nc(t){return 0===t&&1/t==-1/0}function rc(t){return"number"==typeof t&&Number.isInteger(t)&&!nc(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */tc.ct=-1;const ic=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],oc=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],sc=oc;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ac(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function uc(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function cc(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(t,e){this.comparator=t,this.root=e||fc.EMPTY}insert(t,e){return new lc(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,fc.BLACK,null,null))}remove(t){return new lc(this.comparator,this.root.remove(t,this.comparator).copy(null,null,fc.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(0===r)return e+n.left.size;r<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,n)=>(t(e,n),!1)))}toString(){const t=[];return this.inorderTraversal(((e,n)=>(t.push(`${e}:${n}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new hc(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new hc(this.root,t,this.comparator,!1)}getReverseIterator(){return new hc(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new hc(this.root,t,this.comparator,!0)}}class hc{constructor(t,e,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&r&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(0===i){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class fc{constructor(t,e,n,r,i){this.key=t,this.value=e,this.color=null!=n?n:fc.RED,this.left=null!=r?r:fc.EMPTY,this.right=null!=i?i:fc.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,r,i){return new fc(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let r=this;const i=n(t,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(t,e,n),null):0===i?r.copy(null,e,null,null,null):r.copy(null,null,null,null,r.right.insert(t,e,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return fc.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,r=this;if(e(t,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(t,e),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===e(t,r.key)){if(r.right.isEmpty())return fc.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(t,e))}return r.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,fc.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,fc.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw bu();if(this.right.isRed())throw bu();const t=this.left.check();if(t!==this.right.check())throw bu();return t+(this.isRed()?0:1)}}fc.EMPTY=null,fc.RED=!0,fc.BLACK=!1,fc.EMPTY=new class{constructor(){this.size=0}get key(){throw bu()}get value(){throw bu()}get color(){throw bu()}get left(){throw bu()}get right(){throw bu()}copy(t,e,n,r,i){return this}insert(t,e,n){return new fc(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class dc{constructor(t){this.comparator=t,this.data=new lc(this.comparator)}has(t){return null!==this.data.get(t)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,n)=>(t(e),!1)))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,t[1])>=0)return;e(r.key)}}forEachWhile(t,e){let n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new pc(this.data.getIterator())}getIteratorFrom(t){return new pc(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((t=>{e=e.add(t)})),e}isEqual(t){if(!(t instanceof dc))return!1;if(this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const t=e.getNext().key,r=n.getNext().key;if(0!==this.comparator(t,r))return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new dc(this.comparator);return e.data=t,e}}class pc{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gc{constructor(t){this.fields=t,t.sort(zu.comparator)}static empty(){return new gc([])}unionWith(t){let e=new dc(zu.comparator);for(const t of this.fields)e=e.add(t);for(const n of t)e=e.add(n);return new gc(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return Bu(this.fields,t.fields,((t,e)=>t.isEqual(e)))}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class yc{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(t){try{return atob(t)}catch(t){throw"undefined"!=typeof DOMException&&t instanceof DOMException?new mc("Invalid base64 string: "+t):t}}(t);return new yc(e)}static fromUint8Array(t){const e=function(t){let e="";for(let n=0;n<t.length;++n)e+=String.fromCharCode(t[n]);return e}(t);return new yc(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Lu(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}yc.EMPTY_BYTE_STRING=new yc("");const vc=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function bc(t){if(wu(!!t),"string"==typeof t){let e=0;const n=vc.exec(t);if(wu(!!n),n[1]){let t=n[1];t=(t+"000000000").substr(0,9),e=Number(t)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:wc(t.seconds),nanos:wc(t.nanos)}}function wc(t){return"number"==typeof t?t:"string"==typeof t?Number(t):0}function Ec(t){return"string"==typeof t?yc.fromBase64String(t):yc.fromUint8Array(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ic(t){var e,n;return"server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function Sc(t){const e=t.mapValue.fields.__previous_value__;return Ic(e)?Sc(e):e}function _c(t){const e=bc(t.mapValue.fields.__local_write_time__.timestampValue);return new Du(e.seconds,e.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc{constructor(t,e,n,r,i,o,s,a,u){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=s,this.longPollingOptions=a,this.useFetchStreams=u}}class Ac{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new Ac("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(t){return t instanceof Ac&&t.projectId===this.projectId&&t.database===this.database}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tc={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function xc(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Ic(t)?4:jc(t)?9007199254740991:10:bu()}function Oc(t,e){if(t===e)return!0;const n=xc(t);if(n!==xc(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return _c(t).isEqual(_c(e));case 3:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)return t.timestampValue===e.timestampValue;const n=bc(t.timestampValue),r=bc(e.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(t,e){return Ec(t.bytesValue).isEqual(Ec(e.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(t,e){return wc(t.geoPointValue.latitude)===wc(e.geoPointValue.latitude)&&wc(t.geoPointValue.longitude)===wc(e.geoPointValue.longitude)}(t,e);case 2:return function(t,e){if("integerValue"in t&&"integerValue"in e)return wc(t.integerValue)===wc(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){const n=wc(t.doubleValue),r=wc(e.doubleValue);return n===r?nc(n)===nc(r):isNaN(n)&&isNaN(r)}return!1}(t,e);case 9:return Bu(t.arrayValue.values||[],e.arrayValue.values||[],Oc);case 10:return function(t,e){const n=t.mapValue.fields||{},r=e.mapValue.fields||{};if(ac(n)!==ac(r))return!1;for(const t in n)if(n.hasOwnProperty(t)&&(void 0===r[t]||!Oc(n[t],r[t])))return!1;return!0}(t,e);default:return bu()}}function Rc(t,e){return void 0!==(t.values||[]).find((t=>Oc(t,e)))}function Mc(t,e){if(t===e)return 0;const n=xc(t),r=xc(e);if(n!==r)return Lu(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return Lu(t.booleanValue,e.booleanValue);case 2:return function(t,e){const n=wc(t.integerValue||t.doubleValue),r=wc(e.integerValue||e.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(t,e);case 3:return Pc(t.timestampValue,e.timestampValue);case 4:return Pc(_c(t),_c(e));case 5:return Lu(t.stringValue,e.stringValue);case 6:return function(t,e){const n=Ec(t),r=Ec(e);return n.compareTo(r)}(t.bytesValue,e.bytesValue);case 7:return function(t,e){const n=t.split("/"),r=e.split("/");for(let t=0;t<n.length&&t<r.length;t++){const e=Lu(n[t],r[t]);if(0!==e)return e}return Lu(n.length,r.length)}(t.referenceValue,e.referenceValue);case 8:return function(t,e){const n=Lu(wc(t.latitude),wc(e.latitude));return 0!==n?n:Lu(wc(t.longitude),wc(e.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(t,e){const n=t.values||[],r=e.values||[];for(let t=0;t<n.length&&t<r.length;++t){const e=Mc(n[t],r[t]);if(e)return e}return Lu(n.length,r.length)}(t.arrayValue,e.arrayValue);case 10:return function(t,e){if(t===Tc.mapValue&&e===Tc.mapValue)return 0;if(t===Tc.mapValue)return 1;if(e===Tc.mapValue)return-1;const n=t.fields||{},r=Object.keys(n),i=e.fields||{},o=Object.keys(i);r.sort(),o.sort();for(let t=0;t<r.length&&t<o.length;++t){const e=Lu(r[t],o[t]);if(0!==e)return e;const s=Mc(n[r[t]],i[o[t]]);if(0!==s)return s}return Lu(r.length,o.length)}(t.mapValue,e.mapValue);default:throw bu()}}function Pc(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return Lu(t,e);const n=bc(t),r=bc(e),i=Lu(n.seconds,r.seconds);return 0!==i?i:Lu(n.nanos,r.nanos)}function Cc(t){return Nc(t)}function Nc(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){const e=bc(t);return`time(${e.seconds},${e.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?Ec(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,qu.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(t){let e="[",n=!0;for(const r of t.values||[])n?n=!1:e+=",",e+=Nc(r);return e+"]"}(t.arrayValue):"mapValue"in t?function(t){const e=Object.keys(t.fields||{}).sort();let n="{",r=!0;for(const i of e)r?r=!1:n+=",",n+=`${i}:${Nc(t.fields[i])}`;return n+"}"}(t.mapValue):bu();var e,n}function Lc(t){return!!t&&"integerValue"in t}function Bc(t){return!!t&&"arrayValue"in t}function Dc(t){return!!t&&"mapValue"in t}function Uc(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==typeof t.timestampValue)return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return uc(t.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Uc(n))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Uc(t.arrayValue.values[n]);return e}return Object.assign({},t)}function jc(t){return"__max__"===(((t.mapValue||{}).fields||{}).__type__||{}).stringValue}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Fc{constructor(t){this.value=t}static empty(){return new Fc({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Dc(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Uc(e)}setAll(t){let e=zu.emptyPath(),n={},r=[];t.forEach(((t,i)=>{if(!e.isImmediateParentOf(i)){const t=this.getFieldsMap(e);this.applyChanges(t,n,r),n={},r=[],e=i.popLast()}t?n[i.lastSegment()]=Uc(t):r.push(i.lastSegment())}));const i=this.getFieldsMap(e);this.applyChanges(i,n,r)}delete(t){const e=this.field(t.popLast());Dc(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Oc(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let r=e.mapValue.fields[t.get(n)];Dc(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=r),e=r}return e.mapValue.fields}applyChanges(t,e,n){uc(e,((e,n)=>t[e]=n));for(const e of n)delete t[e]}clone(){return new Fc(Uc(this.value))}}function Vc(t){const e=[];return uc(t.fields,((t,n)=>{const r=new zu([t]);if(Dc(n)){const t=Vc(n.mapValue).fields;if(0===t.length)e.push(r);else for(const n of t)e.push(r.child(n))}else e.push(r)})),new gc(e)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class zc{constructor(t,e,n,r,i,o,s){this.key=t,this.documentType=e,this.version=n,this.readTime=r,this.createTime=i,this.data=o,this.documentState=s}static newInvalidDocument(t){return new zc(t,0,Uu.min(),Uu.min(),Uu.min(),Fc.empty(),0)}static newFoundDocument(t,e,n,r){return new zc(t,1,e,Uu.min(),n,r,0)}static newNoDocument(t,e){return new zc(t,2,e,Uu.min(),Uu.min(),Fc.empty(),0)}static newUnknownDocument(t,e){return new zc(t,3,e,Uu.min(),Uu.min(),Fc.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(Uu.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Fc.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Fc.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Uu.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(t){return t instanceof zc&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new zc(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(t,e){this.position=t,this.inclusive=e}}function $c(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const o=e[i],s=t.position[i];if(r=o.field.isKeyField()?qu.comparator(qu.fromName(s.referenceValue),n.key):Mc(s,n.data.field(o.field)),"desc"===o.dir&&(r*=-1),0!==r)break}return r}function Wc(t,e){if(null===t)return null===e;if(null===e)return!1;if(t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Oc(t.position[n],e.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(t,e="asc"){this.field=t,this.dir=e}}function Kc(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{}class Jc extends Gc{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?"in"===e||"not-in"===e?this.createKeyFieldInFilter(t,e,n):new rl(t,e,n):"array-contains"===e?new al(t,n):"in"===e?new ul(t,n):"not-in"===e?new cl(t,n):"array-contains-any"===e?new ll(t,n):new Jc(t,e,n)}static createKeyFieldInFilter(t,e,n){return"in"===e?new il(t,n):new ol(t,n)}matches(t){const e=t.data.field(this.field);return"!="===this.op?null!==e&&this.matchesComparison(Mc(e,this.value)):null!==e&&xc(this.value)===xc(e)&&this.matchesComparison(Mc(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return 0===t;case"!=":return 0!==t;case">":return t>0;case">=":return t>=0;default:return bu()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class Qc extends Gc{constructor(t,e){super(),this.filters=t,this.op=e,this.lt=null}static create(t,e){return new Qc(t,e)}matches(t){return Xc(this)?void 0===this.filters.find((e=>!e.matches(t))):void 0!==this.filters.find((e=>e.matches(t)))}getFlattenedFilters(){return null!==this.lt||(this.lt=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.lt}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const t=this.ft((t=>t.isInequality()));return null!==t?t.field:null}ft(t){for(const e of this.getFlattenedFilters())if(t(e))return e;return null}}function Xc(t){return"and"===t.op}function Yc(t){return Zc(t)&&Xc(t)}function Zc(t){for(const e of t.filters)if(e instanceof Qc)return!1;return!0}function tl(t){if(t instanceof Jc)return t.field.canonicalString()+t.op.toString()+Cc(t.value);if(Yc(t))return t.filters.map((t=>tl(t))).join(",");{const e=t.filters.map((t=>tl(t))).join(",");return`${t.op}(${e})`}}function el(t,e){return t instanceof Jc?function(t,e){return e instanceof Jc&&t.op===e.op&&t.field.isEqual(e.field)&&Oc(t.value,e.value)}(t,e):t instanceof Qc?function(t,e){return e instanceof Qc&&t.op===e.op&&t.filters.length===e.filters.length&&t.filters.reduce(((t,n,r)=>t&&el(n,e.filters[r])),!0)}(t,e):void bu()}function nl(t){return t instanceof Jc?function(t){return`${t.field.canonicalString()} ${t.op} ${Cc(t.value)}`}(t):t instanceof Qc?function(t){return t.op.toString()+" {"+t.getFilters().map(nl).join(" ,")+"}"}(t):"Filter"}class rl extends Jc{constructor(t,e,n){super(t,e,n),this.key=qu.fromName(n.referenceValue)}matches(t){const e=qu.comparator(t.key,this.key);return this.matchesComparison(e)}}class il extends Jc{constructor(t,e){super(t,"in",e),this.keys=sl("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class ol extends Jc{constructor(t,e){super(t,"not-in",e),this.keys=sl("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function sl(t,e){var n;return((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map((t=>qu.fromName(t.referenceValue)))}class al extends Jc{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Bc(e)&&Rc(e.arrayValue,this.value)}}class ul extends Jc{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return null!==e&&Rc(this.value.arrayValue,e)}}class cl extends Jc{constructor(t,e){super(t,"not-in",e)}matches(t){if(Rc(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return null!==e&&!Rc(this.value.arrayValue,e)}}class ll extends Jc{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Bc(e)||!e.arrayValue.values)&&e.arrayValue.values.some((t=>Rc(this.value.arrayValue,t)))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hl{constructor(t,e=null,n=[],r=[],i=null,o=null,s=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=o,this.endAt=s,this.dt=null}}function fl(t,e=null,n=[],r=[],i=null,o=null,s=null){return new hl(t,e,n,r,i,o,s)}function dl(t){const e=Eu(t);if(null===e.dt){let t=e.path.canonicalString();null!==e.collectionGroup&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((t=>tl(t))).join(","),t+="|ob:",t+=e.orderBy.map((t=>function(t){return t.field.canonicalString()+t.dir}(t))).join(","),ec(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((t=>Cc(t))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((t=>Cc(t))).join(",")),e.dt=t}return e.dt}function pl(t,e){if(t.limit!==e.limit)return!1;if(t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!Kc(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!el(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Wc(t.startAt,e.startAt)&&Wc(t.endAt,e.endAt)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gl{constructor(t,e=null,n=[],r=[],i=null,o="F",s=null,a=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=o,this.startAt=s,this.endAt=a,this.wt=null,this._t=null,this.startAt,this.endAt}}function ml(t,e,n,r,i,o,s,a){return new gl(t,e,n,r,i,o,s,a)}function yl(t){return new gl(t)}function vl(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField())}function bl(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function wl(t){for(const e of t.filters){const t=e.getFirstInequalityField();if(null!==t)return t}return null}function El(t){return null!==t.collectionGroup}function Il(t){const e=Eu(t);if(null===e.wt){e.wt=[];const t=wl(e),n=bl(e);if(null!==t&&null===n)t.isKeyField()||e.wt.push(new Hc(t)),e.wt.push(new Hc(zu.keyField(),"asc"));else{let t=!1;for(const n of e.explicitOrderBy)e.wt.push(n),n.field.isKeyField()&&(t=!0);if(!t){const t=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.wt.push(new Hc(zu.keyField(),t))}}}return e.wt}function Sl(t){const e=Eu(t);if(!e._t)if("F"===e.limitType)e._t=fl(e.path,e.collectionGroup,Il(e),e.filters,e.limit,e.startAt,e.endAt);else{const t=[];for(const n of Il(e)){const e="desc"===n.dir?"asc":"desc";t.push(new Hc(n.field,e))}const n=e.endAt?new qc(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new qc(e.startAt.position,e.startAt.inclusive):null;e._t=fl(e.path,e.collectionGroup,t,e.filters,e.limit,n,r)}return e._t}function _l(t,e,n){return new gl(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function kl(t,e){return pl(Sl(t),Sl(e))&&t.limitType===e.limitType}function Al(t){return`${dl(Sl(t))}|lt:${t.limitType}`}function Tl(t){return`Query(target=${function(t){let e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=`, filters: [${t.filters.map((t=>nl(t))).join(", ")}]`),ec(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=`, orderBy: [${t.orderBy.map((t=>function(t){return`${t.field.canonicalString()} (${t.dir})`}(t))).join(", ")}]`),t.startAt&&(e+=", startAt: ",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((t=>Cc(t))).join(",")),t.endAt&&(e+=", endAt: ",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((t=>Cc(t))).join(",")),`Target(${e})`}(Sl(t))}; limitType=${t.limitType})`}function xl(t,e){return e.isFoundDocument()&&function(t,e){const n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):qu.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n)}(t,e)&&function(t,e){for(const n of Il(t))if(!n.field.isKeyField()&&null===e.data.field(n.field))return!1;return!0}(t,e)&&function(t,e){for(const n of t.filters)if(!n.matches(e))return!1;return!0}(t,e)&&function(t,e){return!(t.startAt&&!function(t,e,n){const r=$c(t,e,n);return t.inclusive?r<=0:r<0}(t.startAt,Il(t),e))&&!(t.endAt&&!function(t,e,n){const r=$c(t,e,n);return t.inclusive?r>=0:r>0}(t.endAt,Il(t),e))}(t,e)}function Ol(t){return(e,n)=>{let r=!1;for(const i of Il(t)){const t=Rl(i,e,n);if(0!==t)return t;r=r||i.field.isKeyField()}return 0}}function Rl(t,e,n){const r=t.field.isKeyField()?qu.comparator(e.key,n.key):function(t,e,n){const r=e.data.field(t),i=n.data.field(t);return null!==r&&null!==i?Mc(r,i):bu()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return bu()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n)for(const[e,r]of n)if(this.equalsFn(e,t))return r}has(t){return void 0!==this.get(t)}set(t,e){const n=this.mapKeyFn(t),r=this.inner[n];if(void 0===r)return this.inner[n]=[[t,e]],void this.innerSize++;for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],t))return void(r[n]=[t,e]);r.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],t))return 1===n.length?delete this.inner[e]:n.splice(r,1),this.innerSize--,!0;return!1}forEach(t){uc(this.inner,((e,n)=>{for(const[e,r]of n)t(e,r)}))}isEmpty(){return cc(this.inner)}size(){return this.innerSize}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl=new lc(qu.comparator);function Cl(){return Pl}const Nl=new lc(qu.comparator);function Ll(...t){let e=Nl;for(const n of t)e=e.insert(n.key,n);return e}function Bl(t){let e=Nl;return t.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function Dl(){return jl()}function Ul(){return jl()}function jl(){return new Ml((t=>t.toString()),((t,e)=>t.isEqual(e)))}const Fl=new lc(qu.comparator),Vl=new dc(qu.comparator);function zl(...t){let e=Vl;for(const n of t)e=e.add(n);return e}const ql=new dc(Lu);function $l(){return ql}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:nc(e)?"-0":e}}function Hl(t){return{integerValue:""+t}}function Kl(t,e){return rc(e)?Hl(e):Wl(t,e)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(){this._=void 0}}function Jl(t,e,n){return t instanceof Yl?function(t,e){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&Ic(e)&&(e=Sc(e)),e&&(n.fields.__previous_value__=e),{mapValue:n}}(n,e):t instanceof Zl?th(t,e):t instanceof eh?nh(t,e):function(t,e){const n=Xl(t,e),r=ih(n)+ih(t.gt);return Lc(n)&&Lc(t.gt)?Hl(r):Wl(t.serializer,r)}(t,e)}function Ql(t,e,n){return t instanceof Zl?th(t,e):t instanceof eh?nh(t,e):n}function Xl(t,e){return t instanceof rh?Lc(n=e)||function(t){return!!t&&"doubleValue"in t}(n)?e:{integerValue:0}:null;var n}class Yl extends Gl{}class Zl extends Gl{constructor(t){super(),this.elements=t}}function th(t,e){const n=oh(e);for(const e of t.elements)n.some((t=>Oc(t,e)))||n.push(e);return{arrayValue:{values:n}}}class eh extends Gl{constructor(t){super(),this.elements=t}}function nh(t,e){let n=oh(e);for(const e of t.elements)n=n.filter((t=>!Oc(t,e)));return{arrayValue:{values:n}}}class rh extends Gl{constructor(t,e){super(),this.serializer=t,this.gt=e}}function ih(t){return wc(t.integerValue||t.doubleValue)}function oh(t){return Bc(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(t,e){this.version=t,this.transformResults=e}}class ah{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new ah}static exists(t){return new ah(void 0,t)}static updateTime(t){return new ah(t)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function uh(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument()}class ch{}function lh(t,e){if(!t.hasLocalMutations||e&&0===e.fields.length)return null;if(null===e)return t.isNoDocument()?new wh(t.key,ah.none()):new gh(t.key,t.data,ah.none());{const n=t.data,r=Fc.empty();let i=new dc(zu.comparator);for(let t of e.fields)if(!i.has(t)){let e=n.field(t);null===e&&t.length>1&&(t=t.popLast(),e=n.field(t)),null===e?r.delete(t):r.set(t,e),i=i.add(t)}return new mh(t.key,r,new gc(i.toArray()),ah.none())}}function hh(t,e,n){t instanceof gh?function(t,e,n){const r=t.value.clone(),i=vh(t.fieldTransforms,e,n.transformResults);r.setAll(i),e.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(t,e,n):t instanceof mh?function(t,e,n){if(!uh(t.precondition,e))return void e.convertToUnknownDocument(n.version);const r=vh(t.fieldTransforms,e,n.transformResults),i=e.data;i.setAll(yh(t)),i.setAll(r),e.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(t,e,n):function(t,e,n){e.convertToNoDocument(n.version).setHasCommittedMutations()}(0,e,n)}function fh(t,e,n,r){return t instanceof gh?function(t,e,n,r){if(!uh(t.precondition,e))return n;const i=t.value.clone(),o=bh(t.fieldTransforms,r,e);return i.setAll(o),e.convertToFoundDocument(e.version,i).setHasLocalMutations(),null}(t,e,n,r):t instanceof mh?function(t,e,n,r){if(!uh(t.precondition,e))return n;const i=bh(t.fieldTransforms,r,e),o=e.data;return o.setAll(yh(t)),o.setAll(i),e.convertToFoundDocument(e.version,o).setHasLocalMutations(),null===n?null:n.unionWith(t.fieldMask.fields).unionWith(t.fieldTransforms.map((t=>t.field)))}(t,e,n,r):function(t,e,n){return uh(t.precondition,e)?(e.convertToNoDocument(e.version).setHasLocalMutations(),null):n}(t,e,n)}function dh(t,e){let n=null;for(const r of t.fieldTransforms){const t=e.data.field(r.field),i=Xl(r.transform,t||null);null!=i&&(null===n&&(n=Fc.empty()),n.set(r.field,i))}return n||null}function ph(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(t,e){return void 0===t&&void 0===e||!(!t||!e)&&Bu(t,e,((t,e)=>function(t,e){return t.field.isEqual(e.field)&&function(t,e){return t instanceof Zl&&e instanceof Zl||t instanceof eh&&e instanceof eh?Bu(t.elements,e.elements,Oc):t instanceof rh&&e instanceof rh?Oc(t.gt,e.gt):t instanceof Yl&&e instanceof Yl}(t.transform,e.transform)}(t,e)))}(t.fieldTransforms,e.fieldTransforms)&&(0===t.type?t.value.isEqual(e.value):1!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class gh extends ch{constructor(t,e,n,r=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class mh extends ch{constructor(t,e,n,r,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function yh(t){const e=new Map;return t.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}})),e}function vh(t,e,n){const r=new Map;wu(t.length===n.length);for(let i=0;i<n.length;i++){const o=t[i],s=o.transform,a=e.data.field(o.field);r.set(o.field,Ql(s,a,n[i]))}return r}function bh(t,e,n){const r=new Map;for(const i of t){const t=i.transform,o=n.data.field(i.field);r.set(i.field,Jl(t,o,e))}return r}class wh extends ch{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Eh extends ch{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(t,e,n,r){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let e=0;e<this.mutations.length;e++){const r=this.mutations[e];r.key.isEqual(t.key)&&hh(r,t,n[e])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=fh(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=fh(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=Ul();return this.mutations.forEach((r=>{const i=t.get(r.key),o=i.overlayedDocument;let s=this.applyToLocalView(o,i.mutatedFields);s=e.has(r.key)?null:s;const a=lh(o,s);null!==a&&n.set(r.key,a),o.isValidDocument()||o.convertToNoDocument(Uu.min())})),n}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),zl())}isEqual(t){return this.batchId===t.batchId&&Bu(this.mutations,t.mutations,((t,e)=>ph(t,e)))&&Bu(this.baseMutations,t.baseMutations,((t,e)=>ph(t,e)))}}class Sh{constructor(t,e,n,r){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=r}static from(t,e,n){wu(t.mutations.length===n.length);let r=Fl;const i=t.mutations;for(let t=0;t<i.length;t++)r=r.insert(i[t].key,n[t].version);return new Sh(t,e,n,r)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return null!==t&&this.mutation===t.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var kh,Ah;function Th(t){switch(t){default:return bu();case Iu.CANCELLED:case Iu.UNKNOWN:case Iu.DEADLINE_EXCEEDED:case Iu.RESOURCE_EXHAUSTED:case Iu.INTERNAL:case Iu.UNAVAILABLE:case Iu.UNAUTHENTICATED:return!1;case Iu.INVALID_ARGUMENT:case Iu.NOT_FOUND:case Iu.ALREADY_EXISTS:case Iu.PERMISSION_DENIED:case Iu.FAILED_PRECONDITION:case Iu.ABORTED:case Iu.OUT_OF_RANGE:case Iu.UNIMPLEMENTED:case Iu.DATA_LOSS:return!0}}function xh(t){if(void 0===t)return mu("GRPC error has no .code"),Iu.UNKNOWN;switch(t){case kh.OK:return Iu.OK;case kh.CANCELLED:return Iu.CANCELLED;case kh.UNKNOWN:return Iu.UNKNOWN;case kh.DEADLINE_EXCEEDED:return Iu.DEADLINE_EXCEEDED;case kh.RESOURCE_EXHAUSTED:return Iu.RESOURCE_EXHAUSTED;case kh.INTERNAL:return Iu.INTERNAL;case kh.UNAVAILABLE:return Iu.UNAVAILABLE;case kh.UNAUTHENTICATED:return Iu.UNAUTHENTICATED;case kh.INVALID_ARGUMENT:return Iu.INVALID_ARGUMENT;case kh.NOT_FOUND:return Iu.NOT_FOUND;case kh.ALREADY_EXISTS:return Iu.ALREADY_EXISTS;case kh.PERMISSION_DENIED:return Iu.PERMISSION_DENIED;case kh.FAILED_PRECONDITION:return Iu.FAILED_PRECONDITION;case kh.ABORTED:return Iu.ABORTED;case kh.OUT_OF_RANGE:return Iu.OUT_OF_RANGE;case kh.UNIMPLEMENTED:return Iu.UNIMPLEMENTED;case kh.DATA_LOSS:return Iu.DATA_LOSS;default:return bu()}}(Ah=kh||(kh={}))[Ah.OK=0]="OK",Ah[Ah.CANCELLED=1]="CANCELLED",Ah[Ah.UNKNOWN=2]="UNKNOWN",Ah[Ah.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ah[Ah.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ah[Ah.NOT_FOUND=5]="NOT_FOUND",Ah[Ah.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ah[Ah.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ah[Ah.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ah[Ah.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ah[Ah.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ah[Ah.ABORTED=10]="ABORTED",Ah[Ah.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ah[Ah.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ah[Ah.INTERNAL=13]="INTERNAL",Ah[Ah.UNAVAILABLE=14]="UNAVAILABLE",Ah[Ah.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
new cu([4294967295,4294967295],0);Error;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Rh(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Mh(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Ph(t,e){return Rh(t,e.toTimestamp())}function Ch(t){return wu(!!t),Uu.fromTimestamp(function(t){const e=bc(t);return new Du(e.seconds,e.nanos)}(t))}function Nh(t,e){return function(t){return new Fu(["projects",t.projectId,"databases",t.database])}(t).child("documents").child(e).canonicalString()}function Lh(t){const e=Fu.fromString(t);return wu(Hh(e)),e}function Bh(t,e){return Nh(t.databaseId,e.path)}function Dh(t){const e=Lh(t);return 4===e.length?Fu.emptyPath():jh(e)}function Uh(t){return new Fu(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function jh(t){return wu(t.length>4&&"documents"===t.get(4)),t.popFirst(5)}function Fh(t,e,n){return{name:Bh(t,e),fields:n.value.mapValue.fields}}function Vh(t,e){let n;if(e instanceof gh)n={update:Fh(t,e.key,e.value)};else if(e instanceof wh)n={delete:Bh(t,e.key)};else if(e instanceof mh)n={update:Fh(t,e.key,e.data),updateMask:Wh(e.fieldMask)};else{if(!(e instanceof Eh))return bu();n={verify:Bh(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map((t=>function(t,e){const n=e.transform;if(n instanceof Yl)return{fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Zl)return{fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof eh)return{fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof rh)return{fieldPath:e.field.canonicalString(),increment:n.gt};throw bu()}(0,t)))),e.precondition.isNone||(n.currentDocument=function(t,e){return void 0!==e.updateTime?{updateTime:Ph(t,e.updateTime)}:void 0!==e.exists?{exists:e.exists}:bu()}(t,e.precondition)),n}function zh(t){let e=Dh(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){wu(1===r);const t=n.from[0];t.allDescendants?i=t.collectionId:e=e.child(t.collectionId)}let o=[];n.where&&(o=function(t){const e=qh(t);return e instanceof Qc&&Yc(e)?e.getFilters():[e]}(n.where));let s=[];n.orderBy&&(s=n.orderBy.map((t=>function(t){return new Hc($h(t.field),function(t){switch(t){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction))}(t))));let a=null;n.limit&&(a=function(t){let e;return e="object"==typeof t?t.value:t,ec(e)?null:e}(n.limit));let u=null;n.startAt&&(u=function(t){const e=!!t.before,n=t.values||[];return new qc(n,e)}(n.startAt));let c=null;return n.endAt&&(c=function(t){const e=!t.before,n=t.values||[];return new qc(n,e)}(n.endAt)),ml(e,i,s,o,a,"F",u,c)}function qh(t){return void 0!==t.unaryFilter?function(t){switch(t.unaryFilter.op){case"IS_NAN":const e=$h(t.unaryFilter.field);return Jc.create(e,"==",{doubleValue:NaN});case"IS_NULL":const n=$h(t.unaryFilter.field);return Jc.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=$h(t.unaryFilter.field);return Jc.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=$h(t.unaryFilter.field);return Jc.create(i,"!=",{nullValue:"NULL_VALUE"});default:return bu()}}(t):void 0!==t.fieldFilter?function(t){return Jc.create($h(t.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return bu()}}(t.fieldFilter.op),t.fieldFilter.value)}(t):void 0!==t.compositeFilter?function(t){return Qc.create(t.compositeFilter.filters.map((t=>qh(t))),function(t){switch(t){case"AND":return"and";case"OR":return"or";default:return bu()}}(t.compositeFilter.op))}(t):bu()}function $h(t){return zu.fromServerFormat(t.fieldPath)}function Wh(t){const e=[];return t.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Hh(t){return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{constructor(t){this.fe=t}}function Gh(t){const e=zh({parent:t.parent,structuredQuery:t.structuredQuery});return"LAST"===t.limitType?_l(e,e.limit,"L"):e}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Jh{constructor(){}_e(t,e){this.me(t,e),e.ge()}me(t,e){if("nullValue"in t)this.ye(e,5);else if("booleanValue"in t)this.ye(e,10),e.pe(t.booleanValue?1:0);else if("integerValue"in t)this.ye(e,15),e.pe(wc(t.integerValue));else if("doubleValue"in t){const n=wc(t.doubleValue);isNaN(n)?this.ye(e,13):(this.ye(e,15),nc(n)?e.pe(0):e.pe(n))}else if("timestampValue"in t){const n=t.timestampValue;this.ye(e,20),"string"==typeof n?e.Ie(n):(e.Ie(`${n.seconds||""}`),e.pe(n.nanos||0))}else if("stringValue"in t)this.Te(t.stringValue,e),this.Ee(e);else if("bytesValue"in t)this.ye(e,30),e.Ae(Ec(t.bytesValue)),this.Ee(e);else if("referenceValue"in t)this.ve(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.ye(e,45),e.pe(n.latitude||0),e.pe(n.longitude||0)}else"mapValue"in t?jc(t)?this.ye(e,Number.MAX_SAFE_INTEGER):(this.Re(t.mapValue,e),this.Ee(e)):"arrayValue"in t?(this.Pe(t.arrayValue,e),this.Ee(e)):bu()}Te(t,e){this.ye(e,25),this.be(t,e)}be(t,e){e.Ie(t)}Re(t,e){const n=t.fields||{};this.ye(e,55);for(const t of Object.keys(n))this.Te(t,e),this.me(n[t],e)}Pe(t,e){const n=t.values||[];this.ye(e,50);for(const t of n)this.me(t,e)}ve(t,e){this.ye(e,37),qu.fromName(t).path.forEach((t=>{this.ye(e,60),this.be(t,e)}))}ye(t,e){t.pe(e)}Ee(t){t.pe(2)}}Jh.Ve=new Jh;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Qh{constructor(){this.rn=new Xh}addToCollectionParentIndex(t,e){return this.rn.add(e),Yu.resolve()}getCollectionParents(t,e){return Yu.resolve(this.rn.getEntries(e))}addFieldIndex(t,e){return Yu.resolve()}deleteFieldIndex(t,e){return Yu.resolve()}getDocumentsMatchingTarget(t,e){return Yu.resolve(null)}getIndexType(t,e){return Yu.resolve(0)}getFieldIndexes(t,e){return Yu.resolve([])}getNextCollectionGroupToUpdate(t){return Yu.resolve(null)}getMinOffset(t,e){return Yu.resolve(Ku.min())}getMinOffsetFromCollectionGroup(t,e){return Yu.resolve(Ku.min())}updateCollectionGroup(t,e,n){return Yu.resolve()}updateIndexEntries(t,e){return Yu.resolve()}}class Xh{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e]||new dc(Fu.comparator),i=!r.has(n);return this.index[e]=r.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),r=this.index[e];return r&&r.has(n)}getEntries(t){return(this.index[t]||new dc(Fu.comparator)).toArray()}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Uint8Array(0);class Yh{constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}static withCacheSize(t){return new Yh(t,Yh.DEFAULT_COLLECTION_PERCENTILE,Yh.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Yh.DEFAULT_COLLECTION_PERCENTILE=10,Yh.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Yh.DEFAULT=new Yh(41943040,Yh.DEFAULT_COLLECTION_PERCENTILE,Yh.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Yh.DISABLED=new Yh(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Zh{constructor(t){this.Nn=t}next(){return this.Nn+=2,this.Nn}static kn(){return new Zh(0)}static Mn(){return new Zh(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tf{constructor(){this.changes=new Ml((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,zc.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return void 0!==n?Yu.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ef{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nf{constructor(t,e,n,r){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=r}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next((r=>(n=r,this.remoteDocumentCache.getEntry(t,e)))).next((t=>(null!==n&&fh(n.mutation,t,gc.empty(),Du.now()),t)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((e=>this.getLocalViewOfDocuments(t,e,zl()).next((()=>e))))}getLocalViewOfDocuments(t,e,n=zl()){const r=Dl();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,n).next((t=>{let e=Ll();return t.forEach(((t,n)=>{e=e.insert(t,n.overlayedDocument)})),e}))))}getOverlayedDocuments(t,e){const n=Dl();return this.populateOverlays(t,n,e).next((()=>this.computeViews(t,e,n,zl())))}populateOverlays(t,e,n){const r=[];return n.forEach((t=>{e.has(t)||r.push(t)})),this.documentOverlayCache.getOverlays(t,r).next((t=>{t.forEach(((t,n)=>{e.set(t,n)}))}))}computeViews(t,e,n,r){let i=Cl();const o=jl(),s=jl();return e.forEach(((t,e)=>{const s=n.get(e.key);r.has(e.key)&&(void 0===s||s.mutation instanceof mh)?i=i.insert(e.key,e):void 0!==s?(o.set(e.key,s.mutation.getFieldMask()),fh(s.mutation,e,s.mutation.getFieldMask(),Du.now())):o.set(e.key,gc.empty())})),this.recalculateAndSaveOverlays(t,i).next((t=>(t.forEach(((t,e)=>o.set(t,e))),e.forEach(((t,e)=>{var n;return s.set(t,new ef(e,null!==(n=o.get(t))&&void 0!==n?n:null))})),s)))}recalculateAndSaveOverlays(t,e){const n=jl();let r=new lc(((t,e)=>t-e)),i=zl();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((t=>{for(const i of t)i.keys().forEach((t=>{const o=e.get(t);if(null===o)return;let s=n.get(t)||gc.empty();s=i.applyToLocalView(o,s),n.set(t,s);const a=(r.get(i.batchId)||zl()).add(t);r=r.insert(i.batchId,a)}))})).next((()=>{const o=[],s=r.getReverseIterator();for(;s.hasNext();){const r=s.getNext(),a=r.key,u=r.value,c=Ul();u.forEach((t=>{if(!i.has(t)){const r=lh(e.get(t),n.get(t));null!==r&&c.set(t,r),i=i.add(t)}})),o.push(this.documentOverlayCache.saveOverlays(t,a,c))}return Yu.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((e=>this.recalculateAndSaveOverlays(t,e)))}getDocumentsMatchingQuery(t,e,n){return function(t){return qu.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):El(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n):this.getDocumentsMatchingCollectionQuery(t,e,n)}getNextDocuments(t,e,n,r){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,r).next((i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,r-i.size):Yu.resolve(Dl());let s=-1,a=i;return o.next((e=>Yu.forEach(e,((e,n)=>(s<n.largestBatchId&&(s=n.largestBatchId),i.get(e)?Yu.resolve():this.remoteDocumentCache.getEntry(t,e).next((t=>{a=a.insert(e,t)}))))).next((()=>this.populateOverlays(t,e,i))).next((()=>this.computeViews(t,a,e,zl()))).next((t=>({batchId:s,changes:Bl(t)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new qu(e)).next((t=>{let e=Ll();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e}))}getDocumentsMatchingCollectionGroupQuery(t,e,n){const r=e.collectionGroup;let i=Ll();return this.indexManager.getCollectionParents(t,r).next((o=>Yu.forEach(o,(o=>{const s=function(t,e){return new gl(e,null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}(e,o.child(r));return this.getDocumentsMatchingCollectionQuery(t,s,n).next((t=>{t.forEach(((t,e)=>{i=i.insert(t,e)}))}))})).next((()=>i))))}getDocumentsMatchingCollectionQuery(t,e,n){let r;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next((i=>(r=i,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,r)))).next((t=>{r.forEach(((e,n)=>{const r=n.getKey();null===t.get(r)&&(t=t.insert(r,zc.newInvalidDocument(r)))}));let n=Ll();return t.forEach(((t,i)=>{const o=r.get(t);void 0!==o&&fh(o.mutation,i,gc.empty(),Du.now()),xl(e,i)&&(n=n.insert(t,i))})),n}))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf{constructor(t){this.serializer=t,this.cs=new Map,this.hs=new Map}getBundleMetadata(t,e){return Yu.resolve(this.cs.get(e))}saveBundleMetadata(t,e){var n;return this.cs.set(e.id,{id:(n=e).id,version:n.version,createTime:Ch(n.createTime)}),Yu.resolve()}getNamedQuery(t,e){return Yu.resolve(this.hs.get(e))}saveNamedQuery(t,e){return this.hs.set(e.name,function(t){return{name:t.name,query:Gh(t.bundledQuery),readTime:Ch(t.readTime)}}(e)),Yu.resolve()}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(){this.overlays=new lc(qu.comparator),this.ls=new Map}getOverlay(t,e){return Yu.resolve(this.overlays.get(e))}getOverlays(t,e){const n=Dl();return Yu.forEach(e,(e=>this.getOverlay(t,e).next((t=>{null!==t&&n.set(e,t)})))).next((()=>n))}saveOverlays(t,e,n){return n.forEach(((n,r)=>{this.we(t,e,r)})),Yu.resolve()}removeOverlaysForBatchId(t,e,n){const r=this.ls.get(n);return void 0!==r&&(r.forEach((t=>this.overlays=this.overlays.remove(t))),this.ls.delete(n)),Yu.resolve()}getOverlaysForCollection(t,e,n){const r=Dl(),i=e.length+1,o=new qu(e.child("")),s=this.overlays.getIteratorFrom(o);for(;s.hasNext();){const t=s.getNext().value,o=t.getKey();if(!e.isPrefixOf(o.path))break;o.path.length===i&&t.largestBatchId>n&&r.set(t.getKey(),t)}return Yu.resolve(r)}getOverlaysForCollectionGroup(t,e,n,r){let i=new lc(((t,e)=>t-e));const o=this.overlays.getIterator();for(;o.hasNext();){const t=o.getNext().value;if(t.getKey().getCollectionGroup()===e&&t.largestBatchId>n){let e=i.get(t.largestBatchId);null===e&&(e=Dl(),i=i.insert(t.largestBatchId,e)),e.set(t.getKey(),t)}}const s=Dl(),a=i.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach(((t,e)=>s.set(t,e))),!(s.size()>=r)););return Yu.resolve(s)}we(t,e,n){const r=this.overlays.get(n.key);if(null!==r){const t=this.ls.get(r.largestBatchId).delete(n.key);this.ls.set(r.largestBatchId,t)}this.overlays=this.overlays.insert(n.key,new _h(e,n));let i=this.ls.get(e);void 0===i&&(i=zl(),this.ls.set(e,i)),this.ls.set(e,i.add(n.key))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(){this.fs=new dc(af.ds),this.ws=new dc(af._s)}isEmpty(){return this.fs.isEmpty()}addReference(t,e){const n=new af(t,e);this.fs=this.fs.add(n),this.ws=this.ws.add(n)}gs(t,e){t.forEach((t=>this.addReference(t,e)))}removeReference(t,e){this.ys(new af(t,e))}ps(t,e){t.forEach((t=>this.removeReference(t,e)))}Is(t){const e=new qu(new Fu([])),n=new af(e,t),r=new af(e,t+1),i=[];return this.ws.forEachInRange([n,r],(t=>{this.ys(t),i.push(t.key)})),i}Ts(){this.fs.forEach((t=>this.ys(t)))}ys(t){this.fs=this.fs.delete(t),this.ws=this.ws.delete(t)}Es(t){const e=new qu(new Fu([])),n=new af(e,t),r=new af(e,t+1);let i=zl();return this.ws.forEachInRange([n,r],(t=>{i=i.add(t.key)})),i}containsKey(t){const e=new af(t,0),n=this.fs.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key)}}class af{constructor(t,e){this.key=t,this.As=e}static ds(t,e){return qu.comparator(t.key,e.key)||Lu(t.As,e.As)}static _s(t,e){return Lu(t.As,e.As)||qu.comparator(t.key,e.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.vs=1,this.Rs=new dc(af.ds)}checkEmpty(t){return Yu.resolve(0===this.mutationQueue.length)}addMutationBatch(t,e,n,r){const i=this.vs;this.vs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Ih(i,e,n,r);this.mutationQueue.push(o);for(const e of r)this.Rs=this.Rs.add(new af(e.key,i)),this.indexManager.addToCollectionParentIndex(t,e.key.path.popLast());return Yu.resolve(o)}lookupMutationBatch(t,e){return Yu.resolve(this.Ps(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,r=this.bs(n),i=r<0?0:r;return Yu.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return Yu.resolve(0===this.mutationQueue.length?-1:this.vs-1)}getAllMutationBatches(t){return Yu.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new af(e,0),r=new af(e,Number.POSITIVE_INFINITY),i=[];return this.Rs.forEachInRange([n,r],(t=>{const e=this.Ps(t.As);i.push(e)})),Yu.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new dc(Lu);return e.forEach((t=>{const e=new af(t,0),r=new af(t,Number.POSITIVE_INFINITY);this.Rs.forEachInRange([e,r],(t=>{n=n.add(t.As)}))})),Yu.resolve(this.Vs(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,r=n.length+1;let i=n;qu.isDocumentKey(i)||(i=i.child(""));const o=new af(new qu(i),0);let s=new dc(Lu);return this.Rs.forEachWhile((t=>{const e=t.key.path;return!!n.isPrefixOf(e)&&(e.length===r&&(s=s.add(t.As)),!0)}),o),Yu.resolve(this.Vs(s))}Vs(t){const e=[];return t.forEach((t=>{const n=this.Ps(t);null!==n&&e.push(n)})),e}removeMutationBatch(t,e){wu(0===this.Ss(e.batchId,"removed")),this.mutationQueue.shift();let n=this.Rs;return Yu.forEach(e.mutations,(r=>{const i=new af(r.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,r.key)})).next((()=>{this.Rs=n}))}Cn(t){}containsKey(t,e){const n=new af(e,0),r=this.Rs.firstAfterOrEqual(n);return Yu.resolve(e.isEqual(r&&r.key))}performConsistencyCheck(t){return this.mutationQueue.length,Yu.resolve()}Ss(t,e){return this.bs(t)}bs(t){return 0===this.mutationQueue.length?0:t-this.mutationQueue[0].batchId}Ps(t){const e=this.bs(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(t){this.Ds=t,this.docs=new lc(qu.comparator),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,r=this.docs.get(n),i=r?r.size:0,o=this.Ds(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return Yu.resolve(n?n.document.mutableCopy():zc.newInvalidDocument(e))}getEntries(t,e){let n=Cl();return e.forEach((t=>{const e=this.docs.get(t);n=n.insert(t,e?e.document.mutableCopy():zc.newInvalidDocument(t))})),Yu.resolve(n)}getDocumentsMatchingQuery(t,e,n,r){let i=Cl();const o=e.path,s=new qu(o.child("")),a=this.docs.getIteratorFrom(s);for(;a.hasNext();){const{key:t,value:{document:s}}=a.getNext();if(!o.isPrefixOf(t.path))break;t.path.length>o.length+1||Gu(Hu(s),n)<=0||(r.has(s.key)||xl(e,s))&&(i=i.insert(s.key,s.mutableCopy()))}return Yu.resolve(i)}getAllFromCollectionGroup(t,e,n,r){bu()}Cs(t,e){return Yu.forEach(this.docs,(t=>e(t)))}newChangeBuffer(t){return new lf(this)}getSize(t){return Yu.resolve(this.size)}}class lf extends tf{constructor(t){super(),this.os=t}applyChanges(t){const e=[];return this.changes.forEach(((n,r)=>{r.isValidDocument()?e.push(this.os.addEntry(t,r)):this.os.removeEntry(n)})),Yu.waitFor(e)}getFromCache(t,e){return this.os.getEntry(t,e)}getAllFromCache(t,e){return this.os.getEntries(t,e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(t){this.persistence=t,this.xs=new Ml((t=>dl(t)),pl),this.lastRemoteSnapshotVersion=Uu.min(),this.highestTargetId=0,this.Ns=0,this.ks=new sf,this.targetCount=0,this.Ms=Zh.kn()}forEachTarget(t,e){return this.xs.forEach(((t,n)=>e(n))),Yu.resolve()}getLastRemoteSnapshotVersion(t){return Yu.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return Yu.resolve(this.Ns)}allocateTargetId(t){return this.highestTargetId=this.Ms.next(),Yu.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.Ns&&(this.Ns=e),Yu.resolve()}Fn(t){this.xs.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.Ms=new Zh(e),this.highestTargetId=e),t.sequenceNumber>this.Ns&&(this.Ns=t.sequenceNumber)}addTargetData(t,e){return this.Fn(e),this.targetCount+=1,Yu.resolve()}updateTargetData(t,e){return this.Fn(e),Yu.resolve()}removeTargetData(t,e){return this.xs.delete(e.target),this.ks.Is(e.targetId),this.targetCount-=1,Yu.resolve()}removeTargets(t,e,n){let r=0;const i=[];return this.xs.forEach(((o,s)=>{s.sequenceNumber<=e&&null===n.get(s.targetId)&&(this.xs.delete(o),i.push(this.removeMatchingKeysForTargetId(t,s.targetId)),r++)})),Yu.waitFor(i).next((()=>r))}getTargetCount(t){return Yu.resolve(this.targetCount)}getTargetData(t,e){const n=this.xs.get(e)||null;return Yu.resolve(n)}addMatchingKeys(t,e,n){return this.ks.gs(e,n),Yu.resolve()}removeMatchingKeys(t,e,n){this.ks.ps(e,n);const r=this.persistence.referenceDelegate,i=[];return r&&e.forEach((e=>{i.push(r.markPotentiallyOrphaned(t,e))})),Yu.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.ks.Is(e),Yu.resolve()}getMatchingKeysForTargetId(t,e){const n=this.ks.Es(e);return Yu.resolve(n)}containsKey(t,e){return Yu.resolve(this.ks.containsKey(e))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(t,e){this.$s={},this.overlays={},this.Os=new tc(0),this.Fs=!1,this.Fs=!0,this.referenceDelegate=t(this),this.Bs=new hf(this),this.indexManager=new Qh,this.remoteDocumentCache=function(t){return new cf(t)}((t=>this.referenceDelegate.Ls(t))),this.serializer=new Kh(e),this.qs=new rf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Fs=!1,Promise.resolve()}get started(){return this.Fs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new of,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.$s[t.toKey()];return n||(n=new uf(e,this.referenceDelegate),this.$s[t.toKey()]=n),n}getTargetCache(){return this.Bs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qs}runTransaction(t,e,n){gu("MemoryPersistence","Starting transaction:",t);const r=new df(this.Os.next());return this.referenceDelegate.Us(),n(r).next((t=>this.referenceDelegate.Ks(r).next((()=>t)))).toPromise().then((t=>(r.raiseOnCommittedEvent(),t)))}Gs(t,e){return Yu.or(Object.values(this.$s).map((n=>()=>n.containsKey(t,e))))}}class df extends Qu{constructor(t){super(),this.currentSequenceNumber=t}}class pf{constructor(t){this.persistence=t,this.Qs=new sf,this.js=null}static zs(t){return new pf(t)}get Ws(){if(this.js)return this.js;throw bu()}addReference(t,e,n){return this.Qs.addReference(n,e),this.Ws.delete(n.toString()),Yu.resolve()}removeReference(t,e,n){return this.Qs.removeReference(n,e),this.Ws.add(n.toString()),Yu.resolve()}markPotentiallyOrphaned(t,e){return this.Ws.add(e.toString()),Yu.resolve()}removeTarget(t,e){this.Qs.Is(e.targetId).forEach((t=>this.Ws.add(t.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next((t=>{t.forEach((t=>this.Ws.add(t.toString())))})).next((()=>n.removeTargetData(t,e)))}Us(){this.js=new Set}Ks(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Yu.forEach(this.Ws,(n=>{const r=qu.fromPath(n);return this.Hs(t,r).next((t=>{t||e.removeEntry(r,Uu.min())}))})).next((()=>(this.js=null,e.apply(t))))}updateLimboDocument(t,e){return this.Hs(t,e).next((t=>{t?this.Ws.delete(e.toString()):this.Ws.add(e.toString())}))}Ls(t){return 0}Hs(t,e){return Yu.or([()=>Yu.resolve(this.Qs.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Gs(t,e)])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gf{constructor(t,e,n,r){this.targetId=t,this.fromCache=e,this.Fi=n,this.Bi=r}static Li(t,e){let n=zl(),r=zl();for(const t of e.docChanges)switch(t.type){case 0:n=n.add(t.doc.key);break;case 1:r=r.add(t.doc.key)}return new gf(t,e.fromCache,n,r)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf{constructor(){this.qi=!1}initialize(t,e){this.Ui=t,this.indexManager=e,this.qi=!0}getDocumentsMatchingQuery(t,e,n,r){return this.Ki(t,e).next((i=>i||this.Gi(t,e,r,n))).next((n=>n||this.Qi(t,e)))}Ki(t,e){if(vl(e))return Yu.resolve(null);let n=Sl(e);return this.indexManager.getIndexType(t,n).next((r=>0===r?null:(null!==e.limit&&1===r&&(e=_l(e,null,"F"),n=Sl(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next((r=>{const i=zl(...r);return this.Ui.getDocuments(t,i).next((r=>this.indexManager.getMinOffset(t,n).next((n=>{const o=this.ji(e,r);return this.zi(e,o,i,n.readTime)?this.Ki(t,_l(e,null,"F")):this.Wi(t,o,e,n)}))))})))))}Gi(t,e,n,r){return vl(e)||r.isEqual(Uu.min())?this.Qi(t,e):this.Ui.getDocuments(t,n).next((i=>{const o=this.ji(e,i);return this.zi(e,o,n,r)?this.Qi(t,e):(pu()<=j.DEBUG&&gu("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Tl(e)),this.Wi(t,o,e,Wu(r,-1)))}))}ji(t,e){let n=new dc(Ol(t));return e.forEach(((e,r)=>{xl(t,r)&&(n=n.add(r))})),n}zi(t,e,n,r){if(null===t.limit)return!1;if(n.size!==e.size)return!0;const i="F"===t.limitType?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Qi(t,e){return pu()<=j.DEBUG&&gu("QueryEngine","Using full collection scan to execute query:",Tl(e)),this.Ui.getDocumentsMatchingQuery(t,e,Ku.min())}Wi(t,e,n,r){return this.Ui.getDocumentsMatchingQuery(t,n,r).next((t=>(e.forEach((e=>{t=t.insert(e.key,e)})),t)))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yf{constructor(t,e,n,r){this.persistence=t,this.Hi=e,this.serializer=r,this.Ji=new lc(Lu),this.Yi=new Ml((t=>dl(t)),pl),this.Xi=new Map,this.Zi=t.getRemoteDocumentCache(),this.Bs=t.getTargetCache(),this.qs=t.getBundleCache(),this.tr(n)}tr(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new nf(this.Zi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Zi.setIndexManager(this.indexManager),this.Hi.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.Ji)))}}function vf(t,e,n,r){return new yf(t,e,n,r)}async function bf(t,e){const n=Eu(t);return await n.persistence.runTransaction("Handle user change","readonly",(t=>{let r;return n.mutationQueue.getAllMutationBatches(t).next((i=>(r=i,n.tr(e),n.mutationQueue.getAllMutationBatches(t)))).next((e=>{const i=[],o=[];let s=zl();for(const t of r){i.push(t.batchId);for(const e of t.mutations)s=s.add(e.key)}for(const t of e){o.push(t.batchId);for(const e of t.mutations)s=s.add(e.key)}return n.localDocuments.getDocuments(t,s).next((t=>({er:t,removedBatchIds:i,addedBatchIds:o})))}))}))}function wf(t){const e=Eu(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Bs.getLastRemoteSnapshotVersion(t)))}function Ef(t,e){const n=Eu(t);return n.persistence.runTransaction("Get next mutation batch","readonly",(t=>(void 0===e&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(t,e))))}class If{constructor(){this.activeTargetIds=$l()}lr(t){this.activeTargetIds=this.activeTargetIds.add(t)}dr(t){this.activeTargetIds=this.activeTargetIds.delete(t)}hr(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Sf{constructor(){this.Hr=new If,this.Jr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t){return this.Hr.lr(t),this.Jr[t]||"not-current"}updateQueryState(t,e,n){this.Jr[t]=e}removeLocalQueryTarget(t){this.Hr.dr(t)}isLocalQueryTarget(t){return this.Hr.activeTargetIds.has(t)}clearQueryState(t){delete this.Jr[t]}getAllActiveQueryTargets(){return this.Hr.activeTargetIds}isActiveQueryTarget(t){return this.Hr.activeTargetIds.has(t)}start(){return this.Hr=new If,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{Yr(t){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(){this.Xr=()=>this.Zr(),this.eo=()=>this.no(),this.so=[],this.io()}Yr(t){this.so.push(t)}shutdown(){window.removeEventListener("online",this.Xr),window.removeEventListener("offline",this.eo)}io(){window.addEventListener("online",this.Xr),window.addEventListener("offline",this.eo)}Zr(){gu("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.so)t(0)}no(){gu("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.so)t(1)}static D(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Af=null;function Tf(){return null===Af?Af=268435456+Math.round(2147483648*Math.random()):Af++,"0x"+Af.toString(16)
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const xf={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Of{constructor(t){this.ro=t.ro,this.oo=t.oo}uo(t){this.co=t}ao(t){this.ho=t}onMessage(t){this.lo=t}close(){this.oo()}send(t){this.ro(t)}fo(){this.co()}wo(t){this.ho(t)}_o(t){this.lo(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf="WebChannelConnection";class Mf extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http";this.mo=e+"://"+t.host,this.yo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get po(){return!1}Io(t,e,n,r,i){const o=Tf(),s=this.To(t,e);gu("RestConnection",`Sending RPC '${t}' ${o}:`,s,n);const a={};return this.Eo(a,r,i),this.Ao(t,s,a,n).then((e=>(gu("RestConnection",`Received RPC '${t}' ${o}: `,e),e)),(e=>{throw yu("RestConnection",`RPC '${t}' ${o} failed with error: `,e,"url: ",s,"request:",n),e}))}vo(t,e,n,r,i,o){return this.Io(t,e,n,r,i)}Eo(t,e,n){t["X-Goog-Api-Client"]="gl-js/ fire/"+fu,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((e,n)=>t[n]=e)),n&&n.headers.forEach(((e,n)=>t[n]=e))}To(t,e){const n=xf[t];return`${this.mo}/v1/${e}:${n}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Ao(t,e,n,r){const i=Tf();return new Promise(((o,s)=>{const a=new uu;a.setWithCredentials(!0),a.listenOnce(ru.COMPLETE,(()=>{try{switch(a.getLastErrorCode()){case nu.NO_ERROR:const e=a.getResponseJson();gu(Rf,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(e)),o(e);break;case nu.TIMEOUT:gu(Rf,`RPC '${t}' ${i} timed out`),s(new Su(Iu.DEADLINE_EXCEEDED,"Request time out"));break;case nu.HTTP_ERROR:const n=a.getStatus();if(gu(Rf,`RPC '${t}' ${i} failed with status:`,n,"response text:",a.getResponseText()),n>0){let t=a.getResponseJson();Array.isArray(t)&&(t=t[0]);const e=null==t?void 0:t.error;if(e&&e.status&&e.message){const t=function(t){const e=t.toLowerCase().replace(/_/g,"-");return Object.values(Iu).indexOf(e)>=0?e:Iu.UNKNOWN}(e.status);s(new Su(t,e.message))}else s(new Su(Iu.UNKNOWN,"Server responded with status "+a.getStatus()))}else s(new Su(Iu.UNAVAILABLE,"Connection failed."));break;default:bu()}}finally{gu(Rf,`RPC '${t}' ${i} completed.`)}}));const u=JSON.stringify(r);gu(Rf,`RPC '${t}' ${i} sending request:`,r),a.send(e,"POST",u,n,15)}))}Ro(t,e,n){const r=Tf(),i=[this.mo,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=tu(),s=eu(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;void 0!==u&&(a.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(a.xmlHttpFactory=new su({})),this.Eo(a.initMessageHeaders,e,n),a.encodeInitMessageHeaders=!0;const c=i.join("");gu(Rf,`Creating RPC '${t}' stream ${r}: ${c}`,a);const l=o.createWebChannel(c,a);let h=!1,f=!1;const d=new Of({ro:e=>{f?gu(Rf,`Not sending because RPC '${t}' stream ${r} is closed:`,e):(h||(gu(Rf,`Opening RPC '${t}' stream ${r} transport.`),l.open(),h=!0),gu(Rf,`RPC '${t}' stream ${r} sending:`,e),l.send(e))},oo:()=>l.close()}),p=(t,e,n)=>{t.listen(e,(t=>{try{n(t)}catch(t){setTimeout((()=>{throw t}),0)}}))};return p(l,au.EventType.OPEN,(()=>{f||gu(Rf,`RPC '${t}' stream ${r} transport opened.`)})),p(l,au.EventType.CLOSE,(()=>{f||(f=!0,gu(Rf,`RPC '${t}' stream ${r} transport closed`),d.wo())})),p(l,au.EventType.ERROR,(e=>{f||(f=!0,yu(Rf,`RPC '${t}' stream ${r} transport errored:`,e),d.wo(new Su(Iu.UNAVAILABLE,"The operation could not be completed")))})),p(l,au.EventType.MESSAGE,(e=>{var n;if(!f){const i=e.data[0];wu(!!i);const o=i,s=o.error||(null===(n=o[0])||void 0===n?void 0:n.error);if(s){gu(Rf,`RPC '${t}' stream ${r} received error:`,s);const e=s.status;let n=function(t){const e=kh[t];if(void 0!==e)return xh(e)}(e),i=s.message;void 0===n&&(n=Iu.INTERNAL,i="Unknown error status: "+e+" with message "+s.message),f=!0,d.wo(new Su(n,i)),l.close()}else gu(Rf,`RPC '${t}' stream ${r} received:`,i),d._o(i)}})),p(s,iu.STAT_EVENT,(e=>{e.stat===ou.PROXY?gu(Rf,`RPC '${t}' stream ${r} detected buffering proxy`):e.stat===ou.NOPROXY&&gu(Rf,`RPC '${t}' stream ${r} detected no buffering proxy`)})),setTimeout((()=>{d.fo()}),0),d}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pf(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cf(t){return new Oh(t,!0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(t,e,n=1e3,r=1.5,i=6e4){this.ii=t,this.timerId=e,this.Po=n,this.bo=r,this.Vo=i,this.So=0,this.Do=null,this.Co=Date.now(),this.reset()}reset(){this.So=0}xo(){this.So=this.Vo}No(t){this.cancel();const e=Math.floor(this.So+this.ko()),n=Math.max(0,Date.now()-this.Co),r=Math.max(0,e-n);r>0&&gu("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.So} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.Do=this.ii.enqueueAfterDelay(this.timerId,r,(()=>(this.Co=Date.now(),t()))),this.So*=this.bo,this.So<this.Po&&(this.So=this.Po),this.So>this.Vo&&(this.So=this.Vo)}Mo(){null!==this.Do&&(this.Do.skipDelay(),this.Do=null)}cancel(){null!==this.Do&&(this.Do.cancel(),this.Do=null)}ko(){return(Math.random()-.5)*this.So}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(t,e,n,r,i,o,s,a){this.ii=t,this.$o=n,this.Oo=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=s,this.listener=a,this.state=0,this.Fo=0,this.Bo=null,this.Lo=null,this.stream=null,this.qo=new Nf(t,e)}Uo(){return 1===this.state||5===this.state||this.Ko()}Ko(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.Go()}async stop(){this.Uo()&&await this.close(0)}Qo(){this.state=0,this.qo.reset()}jo(){this.Ko()&&null===this.Bo&&(this.Bo=this.ii.enqueueAfterDelay(this.$o,6e4,(()=>this.zo())))}Wo(t){this.Ho(),this.stream.send(t)}async zo(){if(this.Ko())return this.close(0)}Ho(){this.Bo&&(this.Bo.cancel(),this.Bo=null)}Jo(){this.Lo&&(this.Lo.cancel(),this.Lo=null)}async close(t,e){this.Ho(),this.Jo(),this.qo.cancel(),this.Fo++,4!==t?this.qo.reset():e&&e.code===Iu.RESOURCE_EXHAUSTED?(mu(e.toString()),mu("Using maximum backoff delay to prevent overloading the backend."),this.qo.xo()):e&&e.code===Iu.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.Yo(),this.stream.close(),this.stream=null),this.state=t,await this.listener.ao(e)}Yo(){}auth(){this.state=1;const t=this.Xo(this.Fo),e=this.Fo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([t,n])=>{this.Fo===e&&this.Zo(t,n)}),(e=>{t((()=>{const t=new Su(Iu.UNKNOWN,"Fetching auth token failed: "+e.message);return this.tu(t)}))}))}Zo(t,e){const n=this.Xo(this.Fo);this.stream=this.eu(t,e),this.stream.uo((()=>{n((()=>(this.state=2,this.Lo=this.ii.enqueueAfterDelay(this.Oo,1e4,(()=>(this.Ko()&&(this.state=3),Promise.resolve()))),this.listener.uo())))})),this.stream.ao((t=>{n((()=>this.tu(t)))})),this.stream.onMessage((t=>{n((()=>this.onMessage(t)))}))}Go(){this.state=5,this.qo.No((async()=>{this.state=0,this.start()}))}tu(t){return gu("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}Xo(t){return e=>{this.ii.enqueueAndForget((()=>this.Fo===t?e():(gu("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Bf extends Lf{constructor(t,e,n,r,i,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,r,o),this.serializer=i,this.ru=!1}get ou(){return this.ru}start(){this.ru=!1,this.lastStreamToken=void 0,super.start()}Yo(){this.ru&&this.uu([])}eu(t,e){return this.connection.Ro("Write",t,e)}onMessage(t){if(wu(!!t.streamToken),this.lastStreamToken=t.streamToken,this.ru){this.qo.reset();const e=function(t,e){return t&&t.length>0?(wu(void 0!==e),t.map((t=>function(t,e){let n=t.updateTime?Ch(t.updateTime):Ch(e);return n.isEqual(Uu.min())&&(n=Ch(e)),new sh(n,t.transformResults||[])}(t,e)))):[]}(t.writeResults,t.commitTime),n=Ch(t.commitTime);return this.listener.cu(n,e)}return wu(!t.writeResults||0===t.writeResults.length),this.ru=!0,this.listener.au()}hu(){const t={};t.database=Uh(this.serializer),this.Wo(t)}uu(t){const e={streamToken:this.lastStreamToken,writes:t.map((t=>Vh(this.serializer,t)))};this.Wo(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df extends class{}{constructor(t,e,n,r){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=r,this.lu=!1}fu(){if(this.lu)throw new Su(Iu.FAILED_PRECONDITION,"The client has already been terminated.")}Io(t,e,n){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([r,i])=>this.connection.Io(t,e,n,r,i))).catch((t=>{throw"FirebaseError"===t.name?(t.code===Iu.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new Su(Iu.UNKNOWN,t.toString())}))}vo(t,e,n,r){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.vo(t,e,n,i,o,r))).catch((t=>{throw"FirebaseError"===t.name?(t.code===Iu.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),t):new Su(Iu.UNKNOWN,t.toString())}))}terminate(){this.lu=!0}}class Uf{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.wu=0,this._u=null,this.mu=!0}gu(){0===this.wu&&(this.yu("Unknown"),this._u=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._u=null,this.pu("Backend didn't respond within 10 seconds."),this.yu("Offline"),Promise.resolve()))))}Iu(t){"Online"===this.state?this.yu("Unknown"):(this.wu++,this.wu>=1&&(this.Tu(),this.pu(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.yu("Offline")))}set(t){this.Tu(),this.wu=0,"Online"===t&&(this.mu=!1),this.yu(t)}yu(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}pu(t){const e=`Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.mu?(mu(e),this.mu=!1):gu("OnlineStateTracker",e)}Tu(){null!==this._u&&(this._u.cancel(),this._u=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf{constructor(t,e,n,r,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Eu=[],this.Au=new Map,this.vu=new Set,this.Ru=[],this.Pu=i,this.Pu.Yr((t=>{n.enqueueAndForget((async()=>{zf(this)&&(gu("RemoteStore","Restarting streams for network reachability change."),await async function(t){const e=Eu(t);e.vu.add(4),await Vf(e),e.bu.set("Unknown"),e.vu.delete(4),await Ff(e)}(this))}))})),this.bu=new Uf(n,r)}}async function Ff(t){if(zf(t))for(const e of t.Ru)await e(!0)}async function Vf(t){for(const e of t.Ru)await e(!1)}function zf(t){return 0===Eu(t).vu.size}async function qf(t,e,n){if(!Zu(e))throw e;t.vu.add(1),await Vf(t),t.bu.set("Offline"),n||(n=()=>wf(t.localStore)),t.asyncQueue.enqueueRetryable((async()=>{gu("RemoteStore","Retrying IndexedDB access"),await n(),t.vu.delete(1),await Ff(t)}))}function $f(t,e){return e().catch((n=>qf(t,n,e)))}async function Wf(t){const e=Eu(t),n=nd(e);let r=e.Eu.length>0?e.Eu[e.Eu.length-1].batchId:-1;for(;Hf(e);)try{const t=await Ef(e.localStore,r);if(null===t){0===e.Eu.length&&n.jo();break}r=t.batchId,Kf(e,t)}catch(t){await qf(e,t)}Gf(e)&&Jf(e)}function Hf(t){return zf(t)&&t.Eu.length<10}function Kf(t,e){t.Eu.push(e);const n=nd(t);n.Ko()&&n.ou&&n.uu(e.mutations)}function Gf(t){return zf(t)&&!nd(t).Uo()&&t.Eu.length>0}function Jf(t){nd(t).start()}async function Qf(t){nd(t).hu()}async function Xf(t){const e=nd(t);for(const n of t.Eu)e.uu(n.mutations)}async function Yf(t,e,n){const r=t.Eu.shift(),i=Sh.from(r,e,n);await $f(t,(()=>t.remoteSyncer.applySuccessfulWrite(i))),await Wf(t)}async function Zf(t,e){e&&nd(t).ou&&await async function(t,e){if(Th(n=e.code)&&n!==Iu.ABORTED){const n=t.Eu.shift();nd(t).Qo(),await $f(t,(()=>t.remoteSyncer.rejectFailedWrite(n.batchId,e))),await Wf(t)}var n}(t,e),Gf(t)&&Jf(t)}async function td(t,e){const n=Eu(t);n.asyncQueue.verifyOperationInProgress(),gu("RemoteStore","RemoteStore received new credentials");const r=zf(n);n.vu.add(3),await Vf(n),r&&n.bu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.vu.delete(3),await Ff(n)}async function ed(t,e){const n=Eu(t);e?(n.vu.delete(2),await Ff(n)):e||(n.vu.add(2),await Vf(n),n.bu.set("Unknown"))}function nd(t){return t.Du||(t.Du=function(t,e,n){const r=Eu(t);return r.fu(),new Bf(e,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,n)}(t.datastore,t.asyncQueue,{uo:Qf.bind(null,t),ao:Zf.bind(null,t),au:Xf.bind(null,t),cu:Yf.bind(null,t)}),t.Ru.push((async e=>{e?(t.Du.Qo(),await Wf(t)):(await t.Du.stop(),t.Eu.length>0&&(gu("RemoteStore",`Stopping write stream with ${t.Eu.length} pending writes`),t.Eu=[]))}))),t.Du
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class rd{constructor(t,e,n,r,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new _u,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((t=>{}))}static createAndSchedule(t,e,n,r,i){const o=Date.now()+n,s=new rd(t,e,o,r,i);return s.start(n),s}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new Su(Iu.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function id(t,e){if(mu("AsyncQueue",`${e}: ${t}`),Zu(t))return new Su(Iu.UNAVAILABLE,`${e}: ${t}`);throw t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{constructor(){this.queries=new Ml((t=>Al(t)),kl),this.onlineState="Unknown",this.ku=new Set}}function sd(t){t.ku.forEach((t=>{t.next()}))}class ad{constructor(t,e,n,r,i,o){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.dc={},this.wc=new Ml((t=>Al(t)),kl),this._c=new Map,this.mc=new Set,this.gc=new lc(qu.comparator),this.yc=new Map,this.Ic=new sf,this.Tc={},this.Ec=new Map,this.Ac=Zh.Mn(),this.onlineState="Unknown",this.vc=void 0}get isPrimaryClient(){return!0===this.vc}}function ud(t,e,n){const r=Eu(t);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const t=[];r.wc.forEach(((n,r)=>{const i=r.view.Mu(e);i.snapshot&&t.push(i.snapshot)})),function(t,e){const n=Eu(t);n.onlineState=e;let r=!1;n.queries.forEach(((t,n)=>{for(const t of n.listeners)t.Mu(e)&&(r=!0)})),r&&sd(n)}(r.eventManager,e),t.length&&r.dc.nu(t),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function cd(t,e){const n=Eu(t),r=e.batch.batchId;try{const t=await function(t,e){const n=Eu(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(t=>{const r=e.batch.keys(),i=n.Zi.newChangeBuffer({trackRemovals:!0});return function(t,e,n,r){const i=n.batch,o=i.keys();let s=Yu.resolve();return o.forEach((t=>{s=s.next((()=>r.getEntry(e,t))).next((e=>{const o=n.docVersions.get(t);wu(null!==o),e.version.compareTo(o)<0&&(i.applyToRemoteDocument(e,n),e.isValidDocument()&&(e.setReadTime(n.commitVersion),r.addEntry(e)))}))})),s.next((()=>t.mutationQueue.removeMutationBatch(e,i)))}(n,t,e,i).next((()=>i.apply(t))).next((()=>n.mutationQueue.performConsistencyCheck(t))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(t,r,e.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,function(t){let e=zl();for(let n=0;n<t.mutationResults.length;++n)t.mutationResults[n].transformResults.length>0&&(e=e.add(t.batch.mutations[n].key));return e}(e)))).next((()=>n.localDocuments.getDocuments(t,r)))}))}(n.localStore,e);fd(n,r,null),hd(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await dd(n,t)}catch(t){await Xu(t)}}async function ld(t,e,n){const r=Eu(t);try{const t=await function(t,e){const n=Eu(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",(t=>{let r;return n.mutationQueue.lookupMutationBatch(t,e).next((e=>(wu(null!==e),r=e.keys(),n.mutationQueue.removeMutationBatch(t,e)))).next((()=>n.mutationQueue.performConsistencyCheck(t))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(t,r,e))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t,r))).next((()=>n.localDocuments.getDocuments(t,r)))}))}(r.localStore,e);fd(r,e,n),hd(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await dd(r,t)}catch(n){await Xu(n)}}function hd(t,e){(t.Ec.get(e)||[]).forEach((t=>{t.resolve()})),t.Ec.delete(e)}function fd(t,e,n){const r=Eu(t);let i=r.Tc[r.currentUser.toKey()];if(i){const t=i.get(e);t&&(n?t.reject(n):t.resolve(),i=i.remove(e)),r.Tc[r.currentUser.toKey()]=i}}async function dd(t,e,n){const r=Eu(t),i=[],o=[],s=[];r.wc.isEmpty()||(r.wc.forEach(((t,a)=>{s.push(r.Rc(a,e,n).then((t=>{if((t||n)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,(null==t?void 0:t.fromCache)?"not-current":"current"),t){i.push(t);const e=gf.Li(a.targetId,t);o.push(e)}})))})),await Promise.all(s),r.dc.nu(i),await async function(t,e){const n=Eu(t);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(t=>Yu.forEach(e,(e=>Yu.forEach(e.Fi,(r=>n.persistence.referenceDelegate.addReference(t,e.targetId,r))).next((()=>Yu.forEach(e.Bi,(r=>n.persistence.referenceDelegate.removeReference(t,e.targetId,r)))))))))}catch(t){if(!Zu(t))throw t;gu("LocalStore","Failed to update sequence numbers: "+t)}for(const t of e){const e=t.targetId;if(!t.fromCache){const t=n.Ji.get(e),r=t.snapshotVersion,i=t.withLastLimboFreeSnapshotVersion(r);n.Ji=n.Ji.insert(e,i)}}}(r.localStore,o))}async function pd(t,e){const n=Eu(t);if(!n.currentUser.isEqual(e)){gu("SyncEngine","User change. New user:",e.toKey());const t=await bf(n.localStore,e);n.currentUser=e,function(t,e){t.Ec.forEach((t=>{t.forEach((t=>{t.reject(new Su(Iu.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),t.Ec.clear()}(n),n.sharedClientState.handleUserChange(e,t.removedBatchIds,t.addedBatchIds),await dd(n,t.er)}}function gd(t){const e=Eu(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=cd.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ld.bind(null,e),e}class md{constructor(){this.synchronizeTabs=!1}async initialize(t){this.serializer=Cf(t.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(t),this.persistence=this.createPersistence(t),await this.persistence.start(),this.localStore=this.createLocalStore(t),this.gcScheduler=this.createGarbageCollectionScheduler(t,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(t,this.localStore)}createGarbageCollectionScheduler(t,e){return null}createIndexBackfillerScheduler(t,e){return null}createLocalStore(t){return vf(this.persistence,new mf,t.initialUser,this.serializer)}createPersistence(t){return new ff(pf.zs,this.serializer)}createSharedClientState(t){return new Sf}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class yd{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=t=>ud(this.syncEngine,t,1),this.remoteStore.remoteSyncer.handleCredentialChange=pd.bind(null,this.syncEngine),await ed(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new od}createDatastore(t){const e=Cf(t.databaseInfo.databaseId),n=(r=t.databaseInfo,new Mf(r));var r;return function(t,e,n,r){return new Df(t,e,n,r)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return e=this.localStore,n=this.datastore,r=t.asyncQueue,i=t=>ud(this.syncEngine,t,0),o=kf.D()?new kf:new _f,new jf(e,n,r,i,o);var e,n,r,i,o}createSyncEngine(t,e){return function(t,e,n,r,i,o,s){const a=new ad(t,e,n,r,i,o);return s&&(a.vc=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return async function(t){const e=Eu(t);gu("RemoteStore","RemoteStore shutting down."),e.vu.add(5),await Vf(e),e.Pu.shutdown(),e.bu.set("Unknown")}(this.remoteStore)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class vd{constructor(t,e,n,r){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=r,this.user=hu.UNAUTHENTICATED,this.clientId=Nu.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,(async t=>{gu("FirestoreClient","Received user=",t.uid),await this.authCredentialListener(t),this.user=t})),this.appCheckCredentials.start(n,(t=>(gu("FirestoreClient","Received new app check token=",t),this.appCheckCredentialListener(t,this.user))))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new Su(Iu.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new _u;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=id(e,"Failed to shutdown persistence");t.reject(n)}})),t.promise}}async function bd(t,e){t.asyncQueue.verifyOperationInProgress(),gu("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener((async t=>{r.isEqual(t)||(await bf(e.localStore,t),r=t)})),e.persistence.setDatabaseDeletedListener((()=>t.terminate())),t._offlineComponents=e}async function wd(t,e){t.asyncQueue.verifyOperationInProgress();const n=await Id(t);gu("FirestoreClient","Initializing OnlineComponentProvider");const r=await t.getConfiguration();await e.initialize(n,r),t.setCredentialChangeListener((t=>td(e.remoteStore,t))),t.setAppCheckTokenChangeListener(((t,n)=>td(e.remoteStore,n))),t._onlineComponents=e}function Ed(t){return"FirebaseError"===t.name?t.code===Iu.FAILED_PRECONDITION||t.code===Iu.UNIMPLEMENTED:!("undefined"!=typeof DOMException&&t instanceof DOMException)||22===t.code||20===t.code||11===t.code}async function Id(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){gu("FirestoreClient","Using user provided OfflineComponentProvider");try{await bd(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!Ed(n))throw n;yu("Error using user provided cache. Falling back to memory cache: "+n),await bd(t,new md)}}else gu("FirestoreClient","Using default OfflineComponentProvider"),await bd(t,new md);return t._offlineComponents}async function Sd(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(gu("FirestoreClient","Using user provided OnlineComponentProvider"),await wd(t,t._uninitializedComponentsProvider._online)):(gu("FirestoreClient","Using default OnlineComponentProvider"),await wd(t,new yd))),t._onlineComponents}function _d(t){return Sd(t).then((t=>t.syncEngine))}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function kd(t){const e={};return void 0!==t.timeoutSeconds&&(e.timeoutSeconds=t.timeoutSeconds),e
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}const Ad=new Map;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Td(t,e,n){if(!n)throw new Su(Iu.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function xd(t){if(!qu.isDocumentKey(t))throw new Su(Iu.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Od(t){if(qu.isDocumentKey(t))throw new Su(Iu.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Rd(t){if(void 0===t)return"undefined";if(null===t)return"null";if("string"==typeof t)return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return""+t;if("object"==typeof t){if(t instanceof Array)return"an array";{const e=function(t){return t.constructor?t.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return"function"==typeof t?"a function":bu()}function Md(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new Su(Iu.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Rd(t);throw new Su(Iu.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pd{constructor(t){var e,n;if(void 0===t.host){if(void 0!==t.ssl)throw new Su(Iu.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.cache=t.localCache,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new Su(Iu.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}(function(t,e,n,r){if(!0===e&&!0===r)throw new Su(Iu.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)})("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:void 0===t.experimentalAutoDetectLongPolling?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=kd(null!==(n=t.experimentalLongPollingOptions)&&void 0!==n?n:{}),function(t){if(void 0!==t.timeoutSeconds){if(isNaN(t.timeoutSeconds))throw new Su(Iu.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (must not be NaN)`);if(t.timeoutSeconds<5)throw new Su(Iu.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (minimum allowed value is 5)`);if(t.timeoutSeconds>30)throw new Su(Iu.INVALID_ARGUMENT,`invalid long polling timeout: ${t.timeoutSeconds} (maximum allowed value is 30)`)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(e=this.experimentalLongPollingOptions,n=t.experimentalLongPollingOptions,e.timeoutSeconds===n.timeoutSeconds)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams;var e,n}}class Cd{constructor(t,e,n,r){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Pd({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new Su(Iu.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(t){if(this._settingsFrozen)throw new Su(Iu.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Pd(t),void 0!==t.credentials&&(this._authCredentials=function(t){if(!t)return new Au;switch(t.type){case"firstParty":return new Ru(t.sessionIndex||"0",t.iamToken||null,t.authTokenFactory||null);case"provider":return t.client;default:throw new Su(Iu.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const e=Ad.get(t);e&&(gu("ComponentProvider","Removing Datastore"),Ad.delete(t),e.terminate())}(this),Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Nd{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Bd(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Nd(this.firestore,t,this._key)}}class Ld{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new Ld(this.firestore,t,this._query)}}class Bd extends Ld{constructor(t,e,n){super(t,e,yl(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Nd(this.firestore,null,new qu(t))}withConverter(t){return new Bd(this.firestore,t,this._path)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Dd{constructor(){this.Gc=Promise.resolve(),this.Qc=[],this.jc=!1,this.zc=[],this.Wc=null,this.Hc=!1,this.Jc=!1,this.Yc=[],this.qo=new Nf(this,"async_queue_retry"),this.Xc=()=>{const t=Pf();t&&gu("AsyncQueue","Visibility state changed to "+t.visibilityState),this.qo.Mo()};const t=Pf();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Xc)}get isShuttingDown(){return this.jc}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.Zc(),this.ta(t)}enterRestrictedMode(t){if(!this.jc){this.jc=!0,this.Jc=t||!1;const e=Pf();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.Xc)}}enqueue(t){if(this.Zc(),this.jc)return new Promise((()=>{}));const e=new _u;return this.ta((()=>this.jc&&this.Jc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Qc.push(t),this.ea())))}async ea(){if(0!==this.Qc.length){try{await this.Qc[0](),this.Qc.shift(),this.qo.reset()}catch(t){if(!Zu(t))throw t;gu("AsyncQueue","Operation failed with retryable error: "+t)}this.Qc.length>0&&this.qo.No((()=>this.ea()))}}ta(t){const e=this.Gc.then((()=>(this.Hc=!0,t().catch((t=>{this.Wc=t,this.Hc=!1;const e=function(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack),e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t);throw mu("INTERNAL UNHANDLED ERROR: ",e),t})).then((t=>(this.Hc=!1,t))))));return this.Gc=e,e}enqueueAfterDelay(t,e,n){this.Zc(),this.Yc.indexOf(t)>-1&&(e=0);const r=rd.createAndSchedule(this,t,e,n,(t=>this.na(t)));return this.zc.push(r),r}Zc(){this.Wc&&bu()}verifyOperationInProgress(){}async sa(){let t;do{t=this.Gc,await t}while(t!==this.Gc)}ia(t){for(const e of this.zc)if(e.timerId===t)return!0;return!1}ra(t){return this.sa().then((()=>{this.zc.sort(((t,e)=>t.targetTimeMs-e.targetTimeMs));for(const e of this.zc)if(e.skipDelay(),"all"!==t&&e.timerId===t)break;return this.sa()}))}oa(t){this.Yc.push(t)}na(t){const e=this.zc.indexOf(t);this.zc.splice(e,1)}}class Ud extends Cd{constructor(t,e,n,r){super(t,e,n,r),this.type="firestore",this._queue=new Dd,this._persistenceKey=(null==r?void 0:r.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||Fd(this),this._firestoreClient.terminate()}}function jd(t){return t._firestoreClient||Fd(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function Fd(t){var e,n,r;const i=t._freezeSettings(),o=function(t,e,n,r){return new kc(t,e,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,kd(r.experimentalLongPollingOptions),r.useFetchStreams)}(t._databaseId,(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",t._persistenceKey,i);t._firestoreClient=new vd(t._authCredentials,t._appCheckCredentials,t._queue,o),(null===(n=i.cache)||void 0===n?void 0:n._offlineComponentProvider)&&(null===(r=i.cache)||void 0===r?void 0:r._onlineComponentProvider)&&(t._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.cache.kind,_offline:i.cache._offlineComponentProvider,_online:i.cache._onlineComponentProvider})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Vd{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Vd(yc.fromBase64String(t))}catch(t){throw new Su(Iu.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(t){return new Vd(yc.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(...t){for(let e=0;e<t.length;++e)if(0===t[e].length)throw new Su(Iu.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new zu(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qd{constructor(t){this._methodName=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new Su(Iu.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new Su(Iu.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return Lu(this._lat,t._lat)||Lu(this._long,t._long)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wd=/^__.*__$/;class Hd{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return null!==this.fieldMask?new mh(t,this.data,this.fieldMask,e,this.fieldTransforms):new gh(t,this.data,e,this.fieldTransforms)}}function Kd(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw bu()}}class Gd{constructor(t,e,n,r,i,o){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=r,void 0===i&&this.ua(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get ca(){return this.settings.ca}aa(t){return new Gd(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ha(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.aa({path:n,la:!1});return r.fa(t),r}da(t){var e;const n=null===(e=this.path)||void 0===e?void 0:e.child(t),r=this.aa({path:n,la:!1});return r.ua(),r}wa(t){return this.aa({path:void 0,la:!0})}_a(t){return op(t,this.settings.methodName,this.settings.ma||!1,this.path,this.settings.ga)}contains(t){return void 0!==this.fieldMask.find((e=>t.isPrefixOf(e)))||void 0!==this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))}ua(){if(this.path)for(let t=0;t<this.path.length;t++)this.fa(this.path.get(t))}fa(t){if(0===t.length)throw this._a("Document fields must not be empty");if(Kd(this.ca)&&Wd.test(t))throw this._a('Document fields cannot begin and end with "__"')}}class Jd{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||Cf(t)}ya(t,e,n,r=!1){return new Gd({ca:t,methodName:e,ga:n,path:zu.emptyPath(),la:!1,ma:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Qd(t){const e=t._freezeSettings(),n=Cf(t._databaseId);return new Jd(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Xd(t,e,n,r,i,o={}){const s=t.ya(o.merge||o.mergeFields?2:0,e,n,i);ep("Data must be an object, but it was:",s,r);const a=Zd(r,s);let u,c;if(o.merge)u=new gc(s.fieldMask),c=s.fieldTransforms;else if(o.mergeFields){const t=[];for(const r of o.mergeFields){const i=np(e,r,n);if(!s.contains(i))throw new Su(Iu.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);sp(t,i)||t.push(i)}u=new gc(t),c=s.fieldTransforms.filter((t=>u.covers(t.field)))}else u=null,c=s.fieldTransforms;return new Hd(new Fc(a),u,c)}function Yd(t,e){if(tp(t=P(t)))return ep("Unsupported field value:",e,t),Zd(t,e);if(t instanceof qd)return function(t,e){if(!Kd(e.ca))throw e._a(`${t._methodName}() can only be used with update() and set()`);if(!e.path)throw e._a(`${t._methodName}() is not currently supported inside arrays`);const n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n)}(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.la&&4!==e.ca)throw e._a("Nested arrays are not supported");return function(t,e){const n=[];let r=0;for(const i of t){let t=Yd(i,e.wa(r));null==t&&(t={nullValue:"NULL_VALUE"}),n.push(t),r++}return{arrayValue:{values:n}}}(t,e)}return function(t,e){if(null===(t=P(t)))return{nullValue:"NULL_VALUE"};if("number"==typeof t)return Kl(e.serializer,t);if("boolean"==typeof t)return{booleanValue:t};if("string"==typeof t)return{stringValue:t};if(t instanceof Date){const n=Du.fromDate(t);return{timestampValue:Rh(e.serializer,n)}}if(t instanceof Du){const n=new Du(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return{timestampValue:Rh(e.serializer,n)}}if(t instanceof $d)return{geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof Vd)return{bytesValue:Mh(e.serializer,t._byteString)};if(t instanceof Nd){const n=e.databaseId,r=t.firestore._databaseId;if(!r.isEqual(n))throw e._a(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:Nh(t.firestore._databaseId||e.databaseId,t._key.path)}}throw e._a(`Unsupported field value: ${Rd(t)}`)}(t,e)}function Zd(t,e){const n={};return cc(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):uc(t,((t,r)=>{const i=Yd(r,e.ha(t));null!=i&&(n[t]=i)})),{mapValue:{fields:n}}}function tp(t){return!("object"!=typeof t||null===t||t instanceof Array||t instanceof Date||t instanceof Du||t instanceof $d||t instanceof Vd||t instanceof Nd||t instanceof qd)}function ep(t,e,n){if(!tp(n)||!function(t){return"object"==typeof t&&null!==t&&(Object.getPrototypeOf(t)===Object.prototype||null===Object.getPrototypeOf(t))}(n)){const r=Rd(n);throw"an object"===r?e._a(t+" a custom object"):e._a(t+" "+r)}}function np(t,e,n){if((e=P(e))instanceof zd)return e._internalPath;if("string"==typeof e)return ip(t,e);throw op("Field path arguments must be of type string or ",t,!1,void 0,n)}const rp=new RegExp("[~\\*/\\[\\]]");function ip(t,e,n){if(e.search(rp)>=0)throw op(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new zd(...e.split("."))._internalPath}catch(r){throw op(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function op(t,e,n,r,i){const o=r&&!r.isEmpty(),s=void 0!==i;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let u="";return(o||s)&&(u+=" (found",o&&(u+=` in field ${r}`),s&&(u+=` in document ${i}`),u+=")"),new Su(Iu.INVALID_ARGUMENT,a+t+u)}function sp(t,e){return t.some((t=>t.isEqual(e)))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ap(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}function up(t,e){const n=Md(t.firestore,Ud),r=function(t,e,...n){if(t=P(t),1===arguments.length&&(e=Nu.A()),Td("doc","path",e),t instanceof Cd){const r=Fu.fromString(e,...n);return xd(r),new Nd(t,null,new qu(r))}{if(!(t instanceof Nd||t instanceof Bd))throw new Su(Iu.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fu.fromString(e,...n));return xd(r),new Nd(t.firestore,t instanceof Bd?t.converter:null,new qu(r))}}(t),i=ap(t.converter,e);return cp(n,[Xd(Qd(t.firestore),"addDoc",r._key,i,null!==t.converter,{}).toMutation(r._key,ah.exists(!1))]).then((()=>r))}function cp(t,e){return function(t,e){const n=new _u;return t.asyncQueue.enqueueAndForget((async()=>async function(t,e,n){const r=gd(t);try{const t=await function(t,e){const n=Eu(t),r=Du.now(),i=e.reduce(((t,e)=>t.add(e.key)),zl());let o,s;return n.persistence.runTransaction("Locally write mutations","readwrite",(t=>{let a=Cl(),u=zl();return n.Zi.getEntries(t,i).next((t=>{a=t,a.forEach(((t,e)=>{e.isValidDocument()||(u=u.add(t))}))})).next((()=>n.localDocuments.getOverlayedDocuments(t,a))).next((i=>{o=i;const s=[];for(const t of e){const e=dh(t,o.get(t.key).overlayedDocument);null!=e&&s.push(new mh(t.key,e,Vc(e.value.mapValue),ah.exists(!0)))}return n.mutationQueue.addMutationBatch(t,r,s,e)})).next((e=>{s=e;const r=e.applyToLocalDocumentSet(o,u);return n.documentOverlayCache.saveOverlays(t,e.batchId,r)}))})).then((()=>({batchId:s.batchId,changes:Bl(o)})))}(r.localStore,e);r.sharedClientState.addPendingMutation(t.batchId),function(t,e,n){let r=t.Tc[t.currentUser.toKey()];r||(r=new lc(Lu)),r=r.insert(e,n),t.Tc[t.currentUser.toKey()]=r}(r,t.batchId,n),await dd(r,t.changes),await Wf(r.remoteStore)}catch(t){const e=id(t,"Failed to persist write");n.reject(e)}}(await _d(t),e,n))),n.promise}(jd(t),e)}!function(t,e=!0){!function(t){fu=t}(Et),yt(new C("firestore",((t,{instanceIdentifier:n,options:r})=>{const i=t.getProvider("app").getImmediate(),o=new Ud(new xu(t.getProvider("auth-internal")),new Pu(t.getProvider("app-check-internal")),function(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new Su(Iu.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ac(t.options.projectId,e)}(i,n),i);return r=Object.assign({useFetchStreams:e},r),o._setSettings(r),o}),"PUBLIC").setMultipleInstances(!0)),_t(lu,"3.13.0",t),_t(lu,"3.13.0","esm2017")}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const lp="firebasestorage.googleapis.com",hp="storageBucket";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fp extends I{constructor(t,e,n=0){super(gp(t),`Firebase Storage: ${e} (${gp(t)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,fp.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return gp(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}\n${this.customData.serverResponse}`:this.message=this._baseMessage}}var dp,pp;function gp(t){return"storage/"+t}function mp(){return new fp(dp.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function yp(){return new fp(dp.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function vp(){return new fp(dp.CANCELED,"User canceled the upload/download.")}function bp(){return new fp(dp.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function wp(t){return new fp(dp.INVALID_ARGUMENT,t)}function Ep(){return new fp(dp.APP_DELETED,"The Firebase app was deleted.")}function Ip(t,e){return new fp(dp.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function Sp(t){throw new fp(dp.INTERNAL_ERROR,"Internal error: "+t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"}(dp||(dp={}));class _p{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let n;try{n=_p.makeFromUrl(t,e)}catch(e){return new _p(t,"")}if(""===n.path)return n;throw r=t,new fp(dp.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.");var r}static makeFromUrl(t,e){let n=null;const r="([A-Za-z0-9.\\-_]+)";const i=new RegExp("^gs://"+r+"(/(.*))?$","i");function o(t){t.path_=decodeURIComponent(t.path)}const s=e.replace(/[.]/g,"\\."),a=[{regex:i,indices:{bucket:1,path:3},postModify:function(t){"/"===t.path.charAt(t.path.length-1)&&(t.path_=t.path_.slice(0,-1))}},{regex:new RegExp(`^https?://${s}/v[A-Za-z0-9_]+/b/${r}/o(/([^?#]*).*)?$`,"i"),indices:{bucket:1,path:3},postModify:o},{regex:new RegExp(`^https?://${e===lp?"(?:storage.googleapis.com|storage.cloud.google.com)":e}/${r}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:o}];for(let e=0;e<a.length;e++){const r=a[e],i=r.regex.exec(t);if(i){const t=i[r.indices.bucket];let e=i[r.indices.path];e||(e=""),n=new _p(t,e),r.postModify(n);break}}if(null==n)throw function(t){return new fp(dp.INVALID_URL,"Invalid URL '"+t+"'.")}(t);return n}}class kp{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ap(t){return"string"==typeof t||t instanceof String}function Tp(t){return xp()&&t instanceof Blob}function xp(){return"undefined"!=typeof Blob&&!w()}function Op(t,e,n,r){if(r<e)throw wp(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw wp(`Invalid value for '${t}'. Expected ${n} or less.`)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rp(t,e,n){let r=e;return null==n&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function Mp(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){n=n+(e(r)+"="+e(t[r]))+"&"}return n=n.slice(0,-1),n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Pp(t,e){const n=t>=500&&t<600,r=-1!==[408,429].indexOf(t),i=-1!==e.indexOf(t);return n||r||i}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"}(pp||(pp={}));class Cp{constructor(t,e,n,r,i,o,s,a,u,c,l,h=!0){this.url_=t,this.method_=e,this.headers_=n,this.body_=r,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=s,this.errorCallback_=a,this.timeout_=u,this.progressCallback_=c,this.connectionFactory_=l,this.retry=h,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise(((t,e)=>{this.resolve_=t,this.reject_=e,this.start_()}))}start_(){const t=(t,e)=>{if(e)return void t(!1,new Np(!1,null,!0));const n=this.connectionFactory_();this.pendingConnection_=n;const r=t=>{const e=t.loaded,n=t.lengthComputable?t.total:-1;null!==this.progressCallback_&&this.progressCallback_(e,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.body_,this.headers_).then((()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;const e=n.getErrorCode()===pp.NO_ERROR,i=n.getStatus();if(!e||Pp(i,this.additionalRetryCodes_)&&this.retry){const e=n.getErrorCode()===pp.ABORT;return void t(!1,new Np(!1,null,e))}const o=-1!==this.successCodes_.indexOf(i);t(!0,new Np(o,n))}))},e=(t,e)=>{const n=this.resolve_,r=this.reject_,i=e.connection;if(e.wasSuccessCode)try{const t=this.callback_(i,i.getResponse());!
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(t){return void 0!==t}(t)?n():n(t)}catch(t){r(t)}else if(null!==i){const t=mp();t.serverResponse=i.getErrorText(),this.errorCallback_?r(this.errorCallback_(i,t)):r(t)}else if(e.canceled){r(this.appDelete_?Ep():vp())}else{r(yp())}};this.canceled_?e(0,new Np(!1,null,!0)):this.backoffId_=function(t,e,n){let r=1,i=null,o=null,s=!1,a=0;function u(){return 2===a}let c=!1;function l(...t){c||(c=!0,e.apply(null,t))}function h(e){i=setTimeout((()=>{i=null,t(d,u())}),e)}function f(){o&&clearTimeout(o)}function d(t,...e){if(c)return void f();if(t)return f(),void l.call(null,t,...e);if(u()||s)return f(),void l.call(null,t,...e);let n;r<64&&(r*=2),1===a?(a=2,n=0):n=1e3*(r+Math.random()),h(n)}let p=!1;function g(t){p||(p=!0,f(),c||(null!==i?(t||(a=2),clearTimeout(i),h(0)):t||(a=1)))}return h(0),o=setTimeout((()=>{s=!0,g(!0)}),n),g}(t,e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,null!==this.backoffId_&&function(t){t(!1)}(this.backoffId_),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class Np{constructor(t,e,n){this.wasSuccessCode=t,this.connection=e,this.canceled=!!n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Lp(){return"undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function Bp(...t){const e=Lp();if(void 0!==e){const n=new e;for(let e=0;e<t.length;e++)n.append(t[e]);return n.getBlob()}if(xp())return new Blob(t);throw new fp(dp.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Dp(t){if("undefined"==typeof atob)throw e="base-64",new fp(dp.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`);var e;return atob(t)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Up={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class jp{constructor(t,e){this.data=t,this.contentType=e||null}}function Fp(t,e){switch(t){case Up.RAW:return new jp(Vp(e));case Up.BASE64:case Up.BASE64URL:return new jp(zp(t,e));case Up.DATA_URL:return new jp(function(t){const e=new qp(t);return e.base64?zp(Up.BASE64,e.rest):function(t){let e;try{e=decodeURIComponent(t)}catch(t){throw Ip(Up.DATA_URL,"Malformed data URL.")}return Vp(e)}(e.rest)}(e),new qp(e).contentType)}throw mp()}function Vp(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|63&r);else if(55296==(64512&r)){if(n<t.length-1&&56320==(64512&t.charCodeAt(n+1))){r=65536|(1023&r)<<10|1023&t.charCodeAt(++n),e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)}else e.push(239,191,189)}else 56320==(64512&r)?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(e)}function zp(t,e){switch(t){case Up.BASE64:{const n=-1!==e.indexOf("-"),r=-1!==e.indexOf("_");if(n||r){throw Ip(t,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?")}break}case Up.BASE64URL:{const n=-1!==e.indexOf("+"),r=-1!==e.indexOf("/");if(n||r){throw Ip(t,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?")}e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=Dp(e)}catch(e){if(e.message.includes("polyfill"))throw e;throw Ip(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let t=0;t<n.length;t++)r[t]=n.charCodeAt(t);return r}class qp{constructor(t){this.base64=!1,this.contentType=null;const e=t.match(/^data:([^,]+)?,/);if(null===e)throw Ip(Up.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=e[1]||null;null!=n&&(this.base64=function(t,e){if(!(t.length>=e.length))return!1;return t.substring(t.length-e.length)===e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=t.substring(t.indexOf(",")+1)}}class $p{constructor(t,e){let n=0,r="";Tp(t)?(this.data_=t,n=t.size,r=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),n=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),n=t.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(t,e){if(Tp(this.data_)){const n=function(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}(this.data_,t,e);return null===n?null:new $p(n)}{const n=new Uint8Array(this.data_.buffer,t,e-t);return new $p(n,!0)}}static getBlob(...t){if(xp()){const e=t.map((t=>t instanceof $p?t.data_:t));return new $p(Bp.apply(null,e))}{const e=t.map((t=>Ap(t)?Fp(Up.RAW,t).data:t.data_));let n=0;e.forEach((t=>{n+=t.byteLength}));const r=new Uint8Array(n);let i=0;return e.forEach((t=>{for(let e=0;e<t.length;e++)r[i++]=t[e]})),new $p(r,!0)}}uploadData(){return this.data_}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wp(t){let e;try{e=JSON.parse(t)}catch(t){return null}return function(t){return"object"==typeof t&&!Array.isArray(t)}(e)?e:null}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hp(t){const e=t.lastIndexOf("/",t.length-2);return-1===e?t:t.slice(e+1)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kp(t,e){return e}class Gp{constructor(t,e,n,r){this.server=t,this.local=e||t,this.writable=!!n,this.xform=r||Kp}}let Jp=null;function Qp(){if(Jp)return Jp;const t=[];t.push(new Gp("bucket")),t.push(new Gp("generation")),t.push(new Gp("metageneration")),t.push(new Gp("name","fullPath",!0));const e=new Gp("name");e.xform=function(t,e){return function(t){return!Ap(t)||t.length<2?t:Hp(t)}(e)},t.push(e);const n=new Gp("size");return n.xform=function(t,e){return void 0!==e?Number(e):e},t.push(n),t.push(new Gp("timeCreated")),t.push(new Gp("updated")),t.push(new Gp("md5Hash",null,!0)),t.push(new Gp("cacheControl",null,!0)),t.push(new Gp("contentDisposition",null,!0)),t.push(new Gp("contentEncoding",null,!0)),t.push(new Gp("contentLanguage",null,!0)),t.push(new Gp("contentType",null,!0)),t.push(new Gp("metadata","customMetadata",!0)),Jp=t,Jp}function Xp(t,e,n){const r={type:"file"},i=n.length;for(let t=0;t<i;t++){const i=n[t];r[i.local]=i.xform(r,e[i.server])}return function(t,e){Object.defineProperty(t,"ref",{get:function(){const n=t.bucket,r=t.fullPath,i=new _p(n,r);return e._makeStorageReference(i)}})}(r,t),r}function Yp(t,e,n){const r=Wp(e);if(null===r)return null;return Xp(t,r,n)}function Zp(t,e){const n={},r=e.length;for(let i=0;i<r;i++){const r=e[i];r.writable&&(n[r.server]=t[r.local])}return JSON.stringify(n)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{constructor(t,e,n,r){this.url=t,this.method=e,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eg(t){if(!t)throw mp()}function ng(t,e){return function(n,r){const i=Yp(t,r,e);return eg(null!==i),i}}function rg(t){return function(e,n){let r;var i,o;return 401===e.getStatus()?r=e.getErrorText().includes("Firebase App Check token is invalid")?new fp(dp.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new fp(dp.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===e.getStatus()?(o=t.bucket,r=new fp(dp.QUOTA_EXCEEDED,"Quota for bucket '"+o+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===e.getStatus()?(i=t.path,r=new fp(dp.UNAUTHORIZED,"User does not have permission to access '"+i+"'.")):r=n,r.status=e.getStatus(),r.serverResponse=n.serverResponse,r}}function ig(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=function(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}(null,e)),r}function og(t,e,n,r,i){const o=e.bucketOnlyServerUrl(),s={"X-Goog-Upload-Protocol":"multipart"};const a=function(){let t="";for(let e=0;e<2;e++)t+=Math.random().toString().slice(2);return t}();s["Content-Type"]="multipart/related; boundary="+a;const u=ig(e,r,i),c="--"+a+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+Zp(u,n)+"\r\n--"+a+"\r\nContent-Type: "+u.contentType+"\r\n\r\n",l="\r\n--"+a+"--",h=$p.getBlob(c,r,l);if(null===h)throw bp();const f={name:u.fullPath},d=Rp(o,t.host,t._protocol),p=t.maxUploadRetryTime,g=new tg(d,"POST",ng(t,n),p);return g.urlParams=f,g.headers=s,g.body=h.uploadData(),g.errorHandler=rg(e),g}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let sg=null;class ag{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=pp.NO_ERROR,this.sendPromise_=new Promise((t=>{this.xhr_.addEventListener("abort",(()=>{this.errorCode_=pp.ABORT,t()})),this.xhr_.addEventListener("error",(()=>{this.errorCode_=pp.NETWORK_ERROR,t()})),this.xhr_.addEventListener("load",(()=>{t()}))}))}send(t,e,n,r){if(this.sent_)throw Sp("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(e,t,!0),void 0!==r)for(const t in r)r.hasOwnProperty(t)&&this.xhr_.setRequestHeader(t,r[t].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Sp("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Sp("cannot .getStatus() before sending");try{return this.xhr_.status}catch(t){return-1}}getResponse(){if(!this.sent_)throw Sp("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Sp("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",t)}}class ug extends ag{initXhr(){this.xhr_.responseType="text"}}function cg(){return sg?sg():new ug}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class lg{constructor(t,e){this._service=t,this._location=e instanceof _p?e:_p.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new lg(t,e)}get root(){const t=new _p(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Hp(this._location.path)}get storage(){return this._service}get parent(){const t=function(t){if(0===t.length)return null;const e=t.lastIndexOf("/");return-1===e?"":t.slice(0,e)}(this._location.path);if(null===t)return null;const e=new _p(this._location.bucket,t);return new lg(this._service,e)}_throwIfRoot(t){if(""===this._location.path)throw function(t){return new fp(dp.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(t)}}function hg(t,e,n){t._throwIfRoot("uploadBytes");const r=og(t.storage,t._location,Qp(),new $p(e,!0),n);return t.storage.makeRequestWithTokens(r,cg).then((e=>({metadata:e,ref:t})))}function fg(t,e){const n=function(t,e){const n=e.split("/").filter((t=>t.length>0)).join("/");return 0===t.length?n:t+"/"+n}(t._location.path,e),r=new _p(t._location.bucket,n);return new lg(t.storage,r)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dg(t,e){if(t instanceof mg){const n=t;if(null==n._bucket)throw new fp(dp.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+hp+"' property when initializing the app?");const r=new lg(n,n._bucket);return null!=e?dg(r,e):r}return void 0!==e?fg(t,e):t}function pg(t,e){if(e&&/^[A-Za-z]+:\/\//.test(e)){if(t instanceof mg)return new lg(t,e);throw wp("To use ref(service, url), the first argument must be a Storage instance.")}return dg(t,e)}function gg(t,e){const n=null==e?void 0:e[hp];return null==n?null:_p.makeFromBucketSpec(n,t)}class mg{constructor(t,e,n,r,i){this.app=t,this._authProvider=e,this._appCheckProvider=n,this._url=r,this._firebaseVersion=i,this._bucket=null,this._host=lp,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=r?_p.makeFromBucketSpec(r,this._host):gg(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,null!=this._url?this._bucket=_p.makeFromBucketSpec(this._url,t):this._bucket=gg(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){Op("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){Op("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(null!==e)return e.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});if(t){return(await t.getToken()).token}return null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach((t=>t.cancel())),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new lg(this,t)}_makeRequest(t,e,n,r,i=!0){if(this._deleted)return new kp(Ep());{const o=function(t,e,n,r,i,o,s=!0){const a=Mp(t.urlParams),u=t.url+a,c=Object.assign({},t.headers);return function(t,e){e&&(t["X-Firebase-GMPID"]=e)}(c,e),function(t,e){null!==e&&e.length>0&&(t.Authorization="Firebase "+e)}(c,n),function(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(null!=e?e:"AppManager")}(c,o),function(t,e){null!==e&&(t["X-Firebase-AppCheck"]=e)}(c,r),new Cp(u,t.method,c,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i,s)}(t,this._appId,n,r,e,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then((()=>this._requests.delete(o)),(()=>this._requests.delete(o))),o}}async makeRequestWithTokens(t,e){const[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,n,r).getPromise()}}const yg="@firebase/storage",vg="0.11.2",bg="storage";function wg(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new mg(n,r,i,e,Et)}yt(new C(bg,wg,"PUBLIC").setMultipleInstances(!0)),_t(yg,vg,""),_t(yg,vg,"esm2017");var Eg=n(21614),Ig=n(48764);function Sg(t){if(!Number.isSafeInteger(t)||t<0)throw new Error(`Wrong positive integer: ${t}`)}function _g(t,...e){if(!(t instanceof Uint8Array))throw new Error("Expected Uint8Array");if(e.length>0&&!e.includes(t.length))throw new Error(`Expected Uint8Array of length ${e}, not of length=${t.length}`)}function kg(t){if("function"!=typeof t||"function"!=typeof t.create)throw new Error("Hash should be wrapped by utils.wrapConstructor");Sg(t.outputLen),Sg(t.blockLen)}function Ag(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function Tg(t,e){_g(t);const n=e.outputLen;if(t.length<n)throw new Error(`digestInto() expects output buffer of length at least ${n}`)}const xg="object"==typeof globalThis&&"crypto"in globalThis?globalThis.crypto:void 0,Og=t=>t instanceof Uint8Array,Rg=t=>new DataView(t.buffer,t.byteOffset,t.byteLength),Mg=(t,e)=>t<<32-e|t>>>e;if(!(68===new Uint8Array(new Uint32Array([287454020]).buffer)[0]))throw new Error("Non little-endian hardware is not supported");function Pg(t){if("string"!=typeof t)throw new Error("utf8ToBytes expected string, got "+typeof t);return new Uint8Array((new TextEncoder).encode(t))}function Cg(t){if("string"==typeof t&&(t=Pg(t)),!Og(t))throw new Error("expected Uint8Array, got "+typeof t);return t}function Ng(...t){const e=new Uint8Array(t.reduce(((t,e)=>t+e.length),0));let n=0;return t.forEach((t=>{if(!Og(t))throw new Error("Uint8Array expected");e.set(t,n),n+=t.length})),e}class Lg{clone(){return this._cloneInto()}}function Bg(t){const e=e=>t().update(Cg(e)).digest(),n=t();return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=()=>t(),e}function Dg(t=32){if(xg&&"function"==typeof xg.getRandomValues)return xg.getRandomValues(new Uint8Array(t));throw new Error("crypto.getRandomValues must be defined")}class Ug extends Lg{constructor(t,e,n,r){super(),this.blockLen=t,this.outputLen=e,this.padOffset=n,this.isLE=r,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(t),this.view=Rg(this.buffer)}update(t){Ag(this);const{view:e,buffer:n,blockLen:r}=this,i=(t=Cg(t)).length;for(let o=0;o<i;){const s=Math.min(r-this.pos,i-o);if(s!==r)n.set(t.subarray(o,o+s),this.pos),this.pos+=s,o+=s,this.pos===r&&(this.process(e,0),this.pos=0);else{const e=Rg(t);for(;r<=i-o;o+=r)this.process(e,o)}}return this.length+=t.length,this.roundClean(),this}digestInto(t){Ag(this),Tg(t,this),this.finished=!0;const{buffer:e,view:n,blockLen:r,isLE:i}=this;let{pos:o}=this;e[o++]=128,this.buffer.subarray(o).fill(0),this.padOffset>r-o&&(this.process(n,0),o=0);for(let t=o;t<r;t++)e[t]=0;!function(t,e,n,r){if("function"==typeof t.setBigUint64)return t.setBigUint64(e,n,r);const i=BigInt(32),o=BigInt(4294967295),s=Number(n>>i&o),a=Number(n&o),u=r?4:0,c=r?0:4;t.setUint32(e+u,s,r),t.setUint32(e+c,a,r)}(n,r-8,BigInt(8*this.length),i),this.process(n,0);const s=Rg(t),a=this.outputLen;if(a%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const u=a/4,c=this.get();if(u>c.length)throw new Error("_sha2: outputLen bigger than state");for(let t=0;t<u;t++)s.setUint32(4*t,c[t],i)}digest(){const{buffer:t,outputLen:e}=this;this.digestInto(t);const n=t.slice(0,e);return this.destroy(),n}_cloneInto(t){t||(t=new this.constructor),t.set(...this.get());const{blockLen:e,buffer:n,length:r,finished:i,destroyed:o,pos:s}=this;return t.length=r,t.pos=s,t.finished=i,t.destroyed=o,r%e&&t.buffer.set(n),t}}const jg=BigInt(2**32-1),Fg=BigInt(32);function Vg(t,e=!1){return e?{h:Number(t&jg),l:Number(t>>Fg&jg)}:{h:0|Number(t>>Fg&jg),l:0|Number(t&jg)}}function zg(t,e=!1){let n=new Uint32Array(t.length),r=new Uint32Array(t.length);for(let i=0;i<t.length;i++){const{h:o,l:s}=Vg(t[i],e);[n[i],r[i]]=[o,s]}return[n,r]}const qg=(t,e,n)=>t<<n|e>>>32-n,$g=(t,e,n)=>e<<n|t>>>32-n,Wg=(t,e,n)=>e<<n-32|t>>>64-n,Hg=(t,e,n)=>t<<n-32|e>>>64-n;const Kg={fromBig:Vg,split:zg,toBig:(t,e)=>BigInt(t>>>0)<<Fg|BigInt(e>>>0),shrSH:(t,e,n)=>t>>>n,shrSL:(t,e,n)=>t<<32-n|e>>>n,rotrSH:(t,e,n)=>t>>>n|e<<32-n,rotrSL:(t,e,n)=>t<<32-n|e>>>n,rotrBH:(t,e,n)=>t<<64-n|e>>>n-32,rotrBL:(t,e,n)=>t>>>n-32|e<<64-n,rotr32H:(t,e)=>e,rotr32L:(t,e)=>t,rotlSH:qg,rotlSL:$g,rotlBH:Wg,rotlBL:Hg,add:function(t,e,n,r){const i=(e>>>0)+(r>>>0);return{h:t+n+(i/2**32|0)|0,l:0|i}},add3L:(t,e,n)=>(t>>>0)+(e>>>0)+(n>>>0),add3H:(t,e,n,r)=>e+n+r+(t/2**32|0)|0,add4L:(t,e,n,r)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0),add4H:(t,e,n,r,i)=>e+n+r+i+(t/2**32|0)|0,add5H:(t,e,n,r,i,o)=>e+n+r+i+o+(t/2**32|0)|0,add5L:(t,e,n,r,i)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0)+(i>>>0)};var Gg=Kg;const[Jg,Qg]=(()=>Gg.split(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map((t=>BigInt(t)))))(),Xg=new Uint32Array(80),Yg=new Uint32Array(80);class Zg extends Ug{constructor(){super(128,64,16,!1),this.Ah=1779033703,this.Al=-205731576,this.Bh=-1150833019,this.Bl=-2067093701,this.Ch=1013904242,this.Cl=-23791573,this.Dh=-1521486534,this.Dl=1595750129,this.Eh=1359893119,this.El=-1377402159,this.Fh=-1694144372,this.Fl=725511199,this.Gh=528734635,this.Gl=-79577749,this.Hh=1541459225,this.Hl=327033209}get(){const{Ah:t,Al:e,Bh:n,Bl:r,Ch:i,Cl:o,Dh:s,Dl:a,Eh:u,El:c,Fh:l,Fl:h,Gh:f,Gl:d,Hh:p,Hl:g}=this;return[t,e,n,r,i,o,s,a,u,c,l,h,f,d,p,g]}set(t,e,n,r,i,o,s,a,u,c,l,h,f,d,p,g){this.Ah=0|t,this.Al=0|e,this.Bh=0|n,this.Bl=0|r,this.Ch=0|i,this.Cl=0|o,this.Dh=0|s,this.Dl=0|a,this.Eh=0|u,this.El=0|c,this.Fh=0|l,this.Fl=0|h,this.Gh=0|f,this.Gl=0|d,this.Hh=0|p,this.Hl=0|g}process(t,e){for(let n=0;n<16;n++,e+=4)Xg[n]=t.getUint32(e),Yg[n]=t.getUint32(e+=4);for(let t=16;t<80;t++){const e=0|Xg[t-15],n=0|Yg[t-15],r=Gg.rotrSH(e,n,1)^Gg.rotrSH(e,n,8)^Gg.shrSH(e,n,7),i=Gg.rotrSL(e,n,1)^Gg.rotrSL(e,n,8)^Gg.shrSL(e,n,7),o=0|Xg[t-2],s=0|Yg[t-2],a=Gg.rotrSH(o,s,19)^Gg.rotrBH(o,s,61)^Gg.shrSH(o,s,6),u=Gg.rotrSL(o,s,19)^Gg.rotrBL(o,s,61)^Gg.shrSL(o,s,6),c=Gg.add4L(i,u,Yg[t-7],Yg[t-16]),l=Gg.add4H(c,r,a,Xg[t-7],Xg[t-16]);Xg[t]=0|l,Yg[t]=0|c}let{Ah:n,Al:r,Bh:i,Bl:o,Ch:s,Cl:a,Dh:u,Dl:c,Eh:l,El:h,Fh:f,Fl:d,Gh:p,Gl:g,Hh:m,Hl:y}=this;for(let t=0;t<80;t++){const e=Gg.rotrSH(l,h,14)^Gg.rotrSH(l,h,18)^Gg.rotrBH(l,h,41),v=Gg.rotrSL(l,h,14)^Gg.rotrSL(l,h,18)^Gg.rotrBL(l,h,41),b=l&f^~l&p,w=h&d^~h&g,E=Gg.add5L(y,v,w,Qg[t],Yg[t]),I=Gg.add5H(E,m,e,b,Jg[t],Xg[t]),S=0|E,_=Gg.rotrSH(n,r,28)^Gg.rotrBH(n,r,34)^Gg.rotrBH(n,r,39),k=Gg.rotrSL(n,r,28)^Gg.rotrBL(n,r,34)^Gg.rotrBL(n,r,39),A=n&i^n&s^i&s,T=r&o^r&a^o&a;m=0|p,y=0|g,p=0|f,g=0|d,f=0|l,d=0|h,({h:l,l:h}=Gg.add(0|u,0|c,0|I,0|S)),u=0|s,c=0|a,s=0|i,a=0|o,i=0|n,o=0|r;const x=Gg.add3L(S,k,T);n=Gg.add3H(x,I,_,A),r=0|x}({h:n,l:r}=Gg.add(0|this.Ah,0|this.Al,0|n,0|r)),({h:i,l:o}=Gg.add(0|this.Bh,0|this.Bl,0|i,0|o)),({h:s,l:a}=Gg.add(0|this.Ch,0|this.Cl,0|s,0|a)),({h:u,l:c}=Gg.add(0|this.Dh,0|this.Dl,0|u,0|c)),({h:l,l:h}=Gg.add(0|this.Eh,0|this.El,0|l,0|h)),({h:f,l:d}=Gg.add(0|this.Fh,0|this.Fl,0|f,0|d)),({h:p,l:g}=Gg.add(0|this.Gh,0|this.Gl,0|p,0|g)),({h:m,l:y}=Gg.add(0|this.Hh,0|this.Hl,0|m,0|y)),this.set(n,r,i,o,s,a,u,c,l,h,f,d,p,g,m,y)}roundClean(){Xg.fill(0),Yg.fill(0)}destroy(){this.buffer.fill(0),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}}const tm=Bg((()=>new Zg)),em=BigInt(0),nm=BigInt(1),rm=BigInt(2),im=t=>t instanceof Uint8Array,om=Array.from({length:256},((t,e)=>e.toString(16).padStart(2,"0")));function sm(t){if(!im(t))throw new Error("Uint8Array expected");let e="";for(let n=0;n<t.length;n++)e+=om[t[n]];return e}function am(t){const e=t.toString(16);return 1&e.length?`0${e}`:e}function um(t){if("string"!=typeof t)throw new Error("hex string expected, got "+typeof t);return BigInt(""===t?"0":`0x${t}`)}function cm(t){if("string"!=typeof t)throw new Error("hex string expected, got "+typeof t);const e=t.length;if(e%2)throw new Error("padded hex string expected, got unpadded hex of length "+e);const n=new Uint8Array(e/2);for(let e=0;e<n.length;e++){const r=2*e,i=t.slice(r,r+2),o=Number.parseInt(i,16);if(Number.isNaN(o)||o<0)throw new Error("Invalid byte sequence");n[e]=o}return n}function lm(t){return um(sm(t))}function hm(t){if(!im(t))throw new Error("Uint8Array expected");return um(sm(Uint8Array.from(t).reverse()))}function fm(t,e){return cm(t.toString(16).padStart(2*e,"0"))}function dm(t,e){return fm(t,e).reverse()}function pm(t){return cm(am(t))}function gm(t,e,n){let r;if("string"==typeof e)try{r=cm(e)}catch(n){throw new Error(`${t} must be valid hex string, got "${e}". Cause: ${n}`)}else{if(!im(e))throw new Error(`${t} must be hex string or Uint8Array`);r=Uint8Array.from(e)}const i=r.length;if("number"==typeof n&&i!==n)throw new Error(`${t} expected ${n} bytes, got ${i}`);return r}function mm(...t){const e=new Uint8Array(t.reduce(((t,e)=>t+e.length),0));let n=0;return t.forEach((t=>{if(!im(t))throw new Error("Uint8Array expected");e.set(t,n),n+=t.length})),e}function ym(t,e){if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}function vm(t){if("string"!=typeof t)throw new Error("utf8ToBytes expected string, got "+typeof t);return new Uint8Array((new TextEncoder).encode(t))}function bm(t){let e;for(e=0;t>em;t>>=nm,e+=1);return e}function wm(t,e){return t>>BigInt(e)&nm}const Em=(t,e,n)=>t|(n?nm:em)<<BigInt(e),Im=t=>(rm<<BigInt(t-1))-nm,Sm=t=>new Uint8Array(t),_m=t=>Uint8Array.from(t);function km(t,e,n){if("number"!=typeof t||t<2)throw new Error("hashLen must be a number");if("number"!=typeof e||e<2)throw new Error("qByteLen must be a number");if("function"!=typeof n)throw new Error("hmacFn must be a function");let r=Sm(t),i=Sm(t),o=0;const s=()=>{r.fill(1),i.fill(0),o=0},a=(...t)=>n(i,r,...t),u=(t=Sm())=>{i=a(_m([0]),t),r=a(),0!==t.length&&(i=a(_m([1]),t),r=a())},c=()=>{if(o++>=1e3)throw new Error("drbg: tried 1000 values");let t=0;const n=[];for(;t<e;){r=a();const e=r.slice();n.push(e),t+=r.length}return mm(...n)};return(t,e)=>{let n;for(s(),u(t);!(n=e(c()));)u();return s(),n}}const Am={bigint:t=>"bigint"==typeof t,function:t=>"function"==typeof t,boolean:t=>"boolean"==typeof t,string:t=>"string"==typeof t,stringOrUint8Array:t=>"string"==typeof t||t instanceof Uint8Array,isSafeInteger:t=>Number.isSafeInteger(t),array:t=>Array.isArray(t),field:(t,e)=>e.Fp.isValid(t),hash:t=>"function"==typeof t&&Number.isSafeInteger(t.outputLen)};function Tm(t,e,n={}){const r=(e,n,r)=>{const i=Am[n];if("function"!=typeof i)throw new Error(`Invalid validator "${n}", expected function`);const o=t[e];if(!(r&&void 0===o||i(o,t)))throw new Error(`Invalid param ${String(e)}=${o} (${typeof o}), expected ${n}`)};for(const[t,n]of Object.entries(e))r(t,n,!1);for(const[t,e]of Object.entries(n))r(t,e,!0);return t}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const xm=BigInt(0),Om=BigInt(1),Rm=BigInt(2),Mm=BigInt(3),Pm=BigInt(4),Cm=BigInt(5),Nm=BigInt(8);BigInt(9),BigInt(16);function Lm(t,e){const n=t%e;return n>=xm?n:e+n}function Bm(t,e,n){if(n<=xm||e<xm)throw new Error("Expected power/modulo > 0");if(n===Om)return xm;let r=Om;for(;e>xm;)e&Om&&(r=r*t%n),t=t*t%n,e>>=Om;return r}function Dm(t,e,n){let r=t;for(;e-- >xm;)r*=r,r%=n;return r}function Um(t,e){if(t===xm||e<=xm)throw new Error(`invert: expected positive integers, got n=${t} mod=${e}`);let n=Lm(t,e),r=e,i=xm,o=Om,s=Om,a=xm;for(;n!==xm;){const t=r/n,e=r%n,u=i-s*t,c=o-a*t;r=n,n=e,i=s,o=a,s=u,a=c}if(r!==Om)throw new Error("invert: does not exist");return Lm(i,e)}function jm(t){if(t%Pm===Mm){const e=(t+Om)/Pm;return function(t,n){const r=t.pow(n,e);if(!t.eql(t.sqr(r),n))throw new Error("Cannot find square root");return r}}if(t%Nm===Cm){const e=(t-Cm)/Nm;return function(t,n){const r=t.mul(n,Rm),i=t.pow(r,e),o=t.mul(n,i),s=t.mul(t.mul(o,Rm),i),a=t.mul(o,t.sub(s,t.ONE));if(!t.eql(t.sqr(a),n))throw new Error("Cannot find square root");return a}}return function(t){const e=(t-Om)/Rm;let n,r,i;for(n=t-Om,r=0;n%Rm===xm;n/=Rm,r++);for(i=Rm;i<t&&Bm(i,e,t)!==t-Om;i++);if(1===r){const e=(t+Om)/Pm;return function(t,n){const r=t.pow(n,e);if(!t.eql(t.sqr(r),n))throw new Error("Cannot find square root");return r}}const o=(n+Om)/Rm;return function(t,s){if(t.pow(s,e)===t.neg(t.ONE))throw new Error("Cannot find square root");let a=r,u=t.pow(t.mul(t.ONE,i),n),c=t.pow(s,o),l=t.pow(s,n);for(;!t.eql(l,t.ONE);){if(t.eql(l,t.ZERO))return t.ZERO;let e=1;for(let n=t.sqr(l);e<a&&!t.eql(n,t.ONE);e++)n=t.sqr(n);const n=t.pow(u,Om<<BigInt(a-e-1));u=t.sqr(n),c=t.mul(c,n),l=t.mul(l,u),a=e}return c}}(t)}const Fm=(t,e)=>(Lm(t,e)&Om)===Om,Vm=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function zm(t){const e=Vm.reduce(((t,e)=>(t[e]="function",t)),{ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"});return Tm(t,e)}function qm(t,e){const n=void 0!==e?e:t.toString(2).length;return{nBitLength:n,nByteLength:Math.ceil(n/8)}}function $m(t,e,n=!1,r={}){if(t<=xm)throw new Error(`Expected Field ORDER > 0, got ${t}`);const{nBitLength:i,nByteLength:o}=qm(t,e);if(o>2048)throw new Error("Field lengths over 2048 bytes are not supported");const s=jm(t),a=Object.freeze({ORDER:t,BITS:i,BYTES:o,MASK:Im(i),ZERO:xm,ONE:Om,create:e=>Lm(e,t),isValid:e=>{if("bigint"!=typeof e)throw new Error("Invalid field element: expected bigint, got "+typeof e);return xm<=e&&e<t},is0:t=>t===xm,isOdd:t=>(t&Om)===Om,neg:e=>Lm(-e,t),eql:(t,e)=>t===e,sqr:e=>Lm(e*e,t),add:(e,n)=>Lm(e+n,t),sub:(e,n)=>Lm(e-n,t),mul:(e,n)=>Lm(e*n,t),pow:(t,e)=>function(t,e,n){if(n<xm)throw new Error("Expected power > 0");if(n===xm)return t.ONE;if(n===Om)return e;let r=t.ONE,i=e;for(;n>xm;)n&Om&&(r=t.mul(r,i)),i=t.sqr(i),n>>=Om;return r}(a,t,e),div:(e,n)=>Lm(e*Um(n,t),t),sqrN:t=>t*t,addN:(t,e)=>t+e,subN:(t,e)=>t-e,mulN:(t,e)=>t*e,inv:e=>Um(e,t),sqrt:r.sqrt||(t=>s(a,t)),invertBatch:t=>function(t,e){const n=new Array(e.length),r=e.reduce(((e,r,i)=>t.is0(r)?e:(n[i]=e,t.mul(e,r))),t.ONE),i=t.inv(r);return e.reduceRight(((e,r,i)=>t.is0(r)?e:(n[i]=t.mul(e,n[i]),t.mul(e,r))),i),n}(a,t),cmov:(t,e,n)=>n?e:t,toBytes:t=>n?dm(t,o):fm(t,o),fromBytes:t=>{if(t.length!==o)throw new Error(`Fp.fromBytes: expected ${o}, got ${t.length}`);return n?hm(t):lm(t)}});return Object.freeze(a)}function Wm(t){if("bigint"!=typeof t)throw new Error("field order must be bigint");const e=t.toString(2).length;return Math.ceil(e/8)}function Hm(t){const e=Wm(t);return e+Math.ceil(e/2)}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Km=BigInt(0),Gm=BigInt(1);function Jm(t,e){const n=(t,e)=>{const n=e.negate();return t?n:e},r=t=>({windows:Math.ceil(e/t)+1,windowSize:2**(t-1)});return{constTimeNegate:n,unsafeLadder(e,n){let r=t.ZERO,i=e;for(;n>Km;)n&Gm&&(r=r.add(i)),i=i.double(),n>>=Gm;return r},precomputeWindow(t,e){const{windows:n,windowSize:i}=r(e),o=[];let s=t,a=s;for(let t=0;t<n;t++){a=s,o.push(a);for(let t=1;t<i;t++)a=a.add(s),o.push(a);s=a.double()}return o},wNAF(e,i,o){const{windows:s,windowSize:a}=r(e);let u=t.ZERO,c=t.BASE;const l=BigInt(2**e-1),h=2**e,f=BigInt(e);for(let t=0;t<s;t++){const e=t*a;let r=Number(o&l);o>>=f,r>a&&(r-=h,o+=Gm);const s=e,d=e+Math.abs(r)-1,p=t%2!=0,g=r<0;0===r?c=c.add(n(p,i[s])):u=u.add(n(g,i[d]))}return{p:u,f:c}},wNAFCached(t,e,n,r){const i=t._WINDOW_SIZE||1;let o=e.get(t);return o||(o=this.precomputeWindow(t,i),1!==i&&e.set(t,r(o))),this.wNAF(i,o,n)}}}function Qm(t){return zm(t.Fp),Tm(t,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...qm(t.n,t.nBitLength),...t,p:t.Fp.ORDER})}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Xm=BigInt(0),Ym=BigInt(1),Zm=BigInt(2),ty=BigInt(8),ey={zip215:!0};function ny(t){const e=function(t){const e=Qm(t);return Tm(t,{hash:"function",a:"bigint",d:"bigint",randomBytes:"function"},{adjustScalarBytes:"function",domain:"function",uvRatio:"function",mapToCurve:"function"}),Object.freeze({...e})}(t),{Fp:n,n:r,prehash:i,hash:o,randomBytes:s,nByteLength:a,h:u}=e,c=Zm<<BigInt(8*a)-Ym,l=n.create,h=e.uvRatio||((t,e)=>{try{return{isValid:!0,value:n.sqrt(t*n.inv(e))}}catch(t){return{isValid:!1,value:Xm}}}),f=e.adjustScalarBytes||(t=>t),d=e.domain||((t,e,n)=>{if(e.length||n)throw new Error("Contexts/pre-hash are not supported");return t}),p=t=>"bigint"==typeof t&&Xm<t,g=(t,e)=>p(t)&&p(e)&&t<e,m=t=>t===Xm||g(t,c);function y(t,e){if(g(t,e))return t;throw new Error(`Expected valid scalar < ${e}, got ${typeof t} ${t}`)}function v(t){return t===Xm?t:y(t,r)}const b=new Map;function w(t){if(!(t instanceof E))throw new Error("ExtendedPoint expected")}class E{constructor(t,e,n,r){if(this.ex=t,this.ey=e,this.ez=n,this.et=r,!m(t))throw new Error("x required");if(!m(e))throw new Error("y required");if(!m(n))throw new Error("z required");if(!m(r))throw new Error("t required")}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static fromAffine(t){if(t instanceof E)throw new Error("extended point not allowed");const{x:e,y:n}=t||{};if(!m(e)||!m(n))throw new Error("invalid affine point");return new E(e,n,Ym,l(e*n))}static normalizeZ(t){const e=n.invertBatch(t.map((t=>t.ez)));return t.map(((t,n)=>t.toAffine(e[n]))).map(E.fromAffine)}_setWindowSize(t){this._WINDOW_SIZE=t,b.delete(this)}assertValidity(){const{a:t,d:n}=e;if(this.is0())throw new Error("bad point: ZERO");const{ex:r,ey:i,ez:o,et:s}=this,a=l(r*r),u=l(i*i),c=l(o*o),h=l(c*c),f=l(a*t);if(l(c*l(f+u))!==l(h+l(n*l(a*u))))throw new Error("bad point: equation left != right (1)");if(l(r*i)!==l(o*s))throw new Error("bad point: equation left != right (2)")}equals(t){w(t);const{ex:e,ey:n,ez:r}=this,{ex:i,ey:o,ez:s}=t,a=l(e*s),u=l(i*r),c=l(n*s),h=l(o*r);return a===u&&c===h}is0(){return this.equals(E.ZERO)}negate(){return new E(l(-this.ex),this.ey,this.ez,l(-this.et))}double(){const{a:t}=e,{ex:n,ey:r,ez:i}=this,o=l(n*n),s=l(r*r),a=l(Zm*l(i*i)),u=l(t*o),c=n+r,h=l(l(c*c)-o-s),f=u+s,d=f-a,p=u-s,g=l(h*d),m=l(f*p),y=l(h*p),v=l(d*f);return new E(g,m,v,y)}add(t){w(t);const{a:n,d:r}=e,{ex:i,ey:o,ez:s,et:a}=this,{ex:u,ey:c,ez:h,et:f}=t;if(n===BigInt(-1)){const t=l((o-i)*(c+u)),e=l((o+i)*(c-u)),n=l(e-t);if(n===Xm)return this.double();const r=l(s*Zm*f),d=l(a*Zm*h),p=d+r,g=e+t,m=d-r,y=l(p*n),v=l(g*m),b=l(p*m),w=l(n*g);return new E(y,v,w,b)}const d=l(i*u),p=l(o*c),g=l(a*r*f),m=l(s*h),y=l((i+o)*(u+c)-d-p),v=m-g,b=m+g,I=l(p-n*d),S=l(y*v),_=l(b*I),k=l(y*I),A=l(v*b);return new E(S,_,A,k)}subtract(t){return this.add(t.negate())}wNAF(t){return _.wNAFCached(this,b,t,E.normalizeZ)}multiply(t){const{p:e,f:n}=this.wNAF(y(t,r));return E.normalizeZ([e,n])[0]}multiplyUnsafe(t){let e=v(t);return e===Xm?S:this.equals(S)||e===Ym?this:this.equals(I)?this.wNAF(e).p:_.unsafeLadder(this,e)}isSmallOrder(){return this.multiplyUnsafe(u).is0()}isTorsionFree(){return _.unsafeLadder(this,r).is0()}toAffine(t){const{ex:e,ey:r,ez:i}=this,o=this.is0();null==t&&(t=o?ty:n.inv(i));const s=l(e*t),a=l(r*t),u=l(i*t);if(o)return{x:Xm,y:Ym};if(u!==Ym)throw new Error("invZ was invalid");return{x:s,y:a}}clearCofactor(){const{h:t}=e;return t===Ym?this:this.multiplyUnsafe(t)}static fromHex(t,r=!1){const{d:i,a:o}=e,s=n.BYTES,a=(t=gm("pointHex",t,s)).slice(),u=t[s-1];a[s-1]=-129&u;const f=hm(a);f===Xm||y(f,r?c:n.ORDER);const d=l(f*f),p=l(d-Ym),g=l(i*d-o);let{isValid:m,value:v}=h(p,g);if(!m)throw new Error("Point.fromHex: invalid y coordinate");const b=(v&Ym)===Ym,w=0!=(128&u);if(!r&&v===Xm&&w)throw new Error("Point.fromHex: x=0 and x_0=1");return w!==b&&(v=l(-v)),E.fromAffine({x:v,y:f})}static fromPrivateKey(t){return T(t).point}toRawBytes(){const{x:t,y:e}=this.toAffine(),r=dm(e,n.BYTES);return r[r.length-1]|=t&Ym?128:0,r}toHex(){return sm(this.toRawBytes())}}E.BASE=new E(e.Gx,e.Gy,Ym,l(e.Gx*e.Gy)),E.ZERO=new E(Xm,Ym,Ym,Xm);const{BASE:I,ZERO:S}=E,_=Jm(E,8*a);function k(t){return Lm(t,r)}function A(t){return k(hm(t))}function T(t){const e=a;t=gm("private key",t,e);const n=gm("hashed private key",o(t),2*e),r=f(n.slice(0,e)),i=n.slice(e,2*e),s=A(r),u=I.multiply(s),c=u.toRawBytes();return{head:r,prefix:i,scalar:s,point:u,pointBytes:c}}function x(t=new Uint8Array,...e){const n=mm(...e);return A(o(d(n,gm("context",t),!!i)))}const O=ey;I._setWindowSize(8);return{CURVE:e,getPublicKey:function(t){return T(t).pointBytes},sign:function(t,e,r={}){t=gm("message",t),i&&(t=i(t));const{prefix:o,scalar:s,pointBytes:u}=T(e),c=x(r.context,o,t),l=I.multiply(c).toRawBytes(),h=k(c+x(r.context,l,u,t)*s);return v(h),gm("result",mm(l,dm(h,n.BYTES)),2*a)},verify:function(t,e,r,o=O){const{context:s,zip215:a}=o,u=n.BYTES;t=gm("signature",t,2*u),e=gm("message",e),i&&(e=i(e));const c=hm(t.slice(u,2*u));let l,h,f;try{l=E.fromHex(r,a),h=E.fromHex(t.slice(0,u),a),f=I.multiplyUnsafe(c)}catch(t){return!1}if(!a&&l.isSmallOrder())return!1;const d=x(s,h.toRawBytes(),l.toRawBytes(),e);return h.add(l.multiplyUnsafe(d)).subtract(f).clearCofactor().equals(E.ZERO)},ExtendedPoint:E,utils:{getExtendedPublicKey:T,randomPrivateKey:()=>s(n.BYTES),precompute(t=8,e=E.BASE){return e._setWindowSize(t),e.multiply(BigInt(3)),e}}}}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
BigInt(0),BigInt(1);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ry=BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"),iy=BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752"),oy=(BigInt(0),BigInt(1)),sy=BigInt(2),ay=BigInt(5),uy=BigInt(10),cy=BigInt(20),ly=BigInt(40),hy=BigInt(80);function fy(t){const e=ry,n=t*t%e*t%e,r=Dm(n,sy,e)*n%e,i=Dm(r,oy,e)*t%e,o=Dm(i,ay,e)*i%e,s=Dm(o,uy,e)*o%e,a=Dm(s,cy,e)*s%e,u=Dm(a,ly,e)*a%e,c=Dm(u,hy,e)*u%e,l=Dm(c,hy,e)*u%e,h=Dm(l,uy,e)*o%e;return{pow_p_5_8:Dm(h,sy,e)*t%e,b2:n}}function dy(t){return t[0]&=248,t[31]&=127,t[31]|=64,t}function py(t,e){const n=ry,r=Lm(e*e*e,n),i=Lm(r*r*e,n);let o=Lm(t*r*fy(t*i).pow_p_5_8,n);const s=Lm(e*o*o,n),a=o,u=Lm(o*iy,n),c=s===t,l=s===Lm(-t,n),h=s===Lm(-t*iy,n);return c&&(o=a),(l||h)&&(o=u),Fm(o,n)&&(o=Lm(-o,n)),{isValid:c||l,value:o}}const gy=$m(ry,void 0,!0),my={a:BigInt(-1),d:BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),Fp:gy,n:BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),h:BigInt(8),Gx:BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),Gy:BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),hash:tm,randomBytes:Dg,adjustScalarBytes:dy,uvRatio:py},yy=ny(my);function vy(t,e,n){if(e.length>255)throw new Error("Context is too big");return Ng(Pg("SigEd25519 no Ed25519 collisions"),new Uint8Array([n?1:0,e.length]),e,t)}const by=(gy.ORDER+BigInt(3))/BigInt(8);gy.pow(sy,by),gy.sqrt(gy.neg(gy.ONE)),gy.ORDER,BigInt(5),BigInt(8),BigInt(486662);!function(t,e){if(!t.isOdd)throw new Error("Field doesn't have isOdd");const n=t.sqrt(e);t.isOdd(n)&&t.neg(n)}(gy,gy.neg(BigInt(486664)));BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235"),BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578"),BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838"),BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952"),BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");var wy=n(13550),Ey=n.n(wy),Iy=n(77191),Sy=n.n(Iy);const _y=(t,e,n)=>t&e^~t&n,ky=(t,e,n)=>t&e^t&n^e&n,Ay=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),Ty=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),xy=new Uint32Array(64);class Oy extends Ug{constructor(){super(64,32,8,!1),this.A=0|Ty[0],this.B=0|Ty[1],this.C=0|Ty[2],this.D=0|Ty[3],this.E=0|Ty[4],this.F=0|Ty[5],this.G=0|Ty[6],this.H=0|Ty[7]}get(){const{A:t,B:e,C:n,D:r,E:i,F:o,G:s,H:a}=this;return[t,e,n,r,i,o,s,a]}set(t,e,n,r,i,o,s,a){this.A=0|t,this.B=0|e,this.C=0|n,this.D=0|r,this.E=0|i,this.F=0|o,this.G=0|s,this.H=0|a}process(t,e){for(let n=0;n<16;n++,e+=4)xy[n]=t.getUint32(e,!1);for(let t=16;t<64;t++){const e=xy[t-15],n=xy[t-2],r=Mg(e,7)^Mg(e,18)^e>>>3,i=Mg(n,17)^Mg(n,19)^n>>>10;xy[t]=i+xy[t-7]+r+xy[t-16]|0}let{A:n,B:r,C:i,D:o,E:s,F:a,G:u,H:c}=this;for(let t=0;t<64;t++){const e=c+(Mg(s,6)^Mg(s,11)^Mg(s,25))+_y(s,a,u)+Ay[t]+xy[t]|0,l=(Mg(n,2)^Mg(n,13)^Mg(n,22))+ky(n,r,i)|0;c=u,u=a,a=s,s=o+e|0,o=i,i=r,r=n,n=e+l|0}n=n+this.A|0,r=r+this.B|0,i=i+this.C|0,o=o+this.D|0,s=s+this.E|0,a=a+this.F|0,u=u+this.G|0,c=c+this.H|0,this.set(n,r,i,o,s,a,u,c)}roundClean(){xy.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}const Ry=Bg((()=>new Oy));var My=n(25532),Py=n(39386),Cy=n(40475);n(25108);class Ny extends TypeError{constructor(t,e){let n;const{message:r,...i}=t,{path:o}=t;super(0===o.length?r:"At path: "+o.join(".")+" -- "+r),Object.assign(this,i),this.name=this.constructor.name,this.failures=()=>{var r;return null!=(r=n)?r:n=[t,...e()]}}}function Ly(t){return"object"==typeof t&&null!=t}function By(t){return"string"==typeof t?JSON.stringify(t):""+t}function Dy(t,e,n,r){if(!0===t)return;!1===t?t={}:"string"==typeof t&&(t={message:t});const{path:i,branch:o}=e,{type:s}=n,{refinement:a,message:u="Expected a value of type `"+s+"`"+(a?" with refinement `"+a+"`":"")+", but received: `"+By(r)+"`"}=t;return{value:r,type:s,refinement:a,key:i[i.length-1],path:i,branch:o,...t,message:u}}function*Uy(t,e,n,r){(function(t){return Ly(t)&&"function"==typeof t[Symbol.iterator]})(t)||(t=[t]);for(const i of t){const t=Dy(i,e,n,r);t&&(yield t)}}function*jy(t,e,n={}){const{path:r=[],branch:i=[t],coerce:o=!1,mask:s=!1}=n,a={path:r,branch:i};if(o&&(t=e.coercer(t,a),s&&"type"!==e.type&&Ly(e.schema)&&Ly(t)&&!Array.isArray(t)))for(const n in t)void 0===e.schema[n]&&delete t[n];let u=!0;for(const n of e.validator(t,a))u=!1,yield[n,void 0];for(let[n,c,l]of e.entries(t,a)){const e=jy(c,l,{path:void 0===n?r:[...r,n],branch:void 0===n?i:[...i,c],coerce:o,mask:s});for(const r of e)r[0]?(u=!1,yield[r[0],void 0]):o&&(c=r[1],void 0===n?t=c:t instanceof Map?t.set(n,c):t instanceof Set?t.add(c):Ly(t)&&(t[n]=c))}if(u)for(const n of e.refiner(t,a))u=!1,yield[n,void 0];u&&(yield[void 0,t])}class Fy{constructor(t){const{type:e,schema:n,validator:r,refiner:i,coercer:o=(t=>t),entries:s=function*(){}}=t;this.type=e,this.schema=n,this.entries=s,this.coercer=o,this.validator=r?(t,e)=>Uy(r(t,e),e,this,t):()=>[],this.refiner=i?(t,e)=>Uy(i(t,e),e,this,t):()=>[]}assert(t){return Vy(t,this)}create(t){return zy(t,this)}is(t){return qy(t,this)}mask(t){return function(t,e){const n=$y(t,e,{coerce:!0,mask:!0});if(n[0])throw n[0];return n[1]}(t,this)}validate(t,e={}){return $y(t,this,e)}}function Vy(t,e){const n=$y(t,e);if(n[0])throw n[0]}function zy(t,e){const n=$y(t,e,{coerce:!0});if(n[0])throw n[0];return n[1]}function qy(t,e){return!$y(t,e)[0]}function $y(t,e,n={}){const r=jy(t,e,n),i=function(t){const{done:e,value:n}=t.next();return e?void 0:n}(r);if(i[0]){return[new Ny(i[0],(function*(){for(const t of r)t[0]&&(yield t[0])})),void 0]}return[void 0,i[1]]}function Wy(t,e){return new Fy({type:t,schema:null,validator:e})}function Hy(t){return new Fy({type:"array",schema:t,*entries(e){if(t&&Array.isArray(e))for(const[n,r]of e.entries())yield[n,r,t]},coercer(t){return Array.isArray(t)?t.slice():t},validator(t){return Array.isArray(t)||"Expected an array value, but received: "+By(t)}})}function Ky(){return Wy("boolean",(t=>"boolean"==typeof t))}function Gy(t){return Wy("instance",(e=>e instanceof t||"Expected a `"+t.name+"` instance, but received: "+By(e)))}function Jy(t){const e=By(t),n=typeof t;return new Fy({type:"literal",schema:"string"===n||"number"===n||"boolean"===n?t:null,validator(n){return n===t||"Expected the literal `"+e+"`, but received: "+By(n)}})}function Qy(){return Wy("never",(()=>!1))}function Xy(t){return new Fy({...t,validator:(e,n)=>null===e||t.validator(e,n),refiner:(e,n)=>null===e||t.refiner(e,n)})}function Yy(){return Wy("number",(t=>"number"==typeof t&&!isNaN(t)||"Expected a number, but received: "+By(t)))}function Zy(t){return new Fy({...t,validator:(e,n)=>void 0===e||t.validator(e,n),refiner:(e,n)=>void 0===e||t.refiner(e,n)})}function tv(t,e){return new Fy({type:"record",schema:null,*entries(n){if(Ly(n))for(const r in n){const i=n[r];yield[r,r,t],yield[r,i,e]}},validator(t){return Ly(t)||"Expected an object, but received: "+By(t)}})}function ev(){return Wy("string",(t=>"string"==typeof t||"Expected a string, but received: "+By(t)))}function nv(t){const e=Qy();return new Fy({type:"tuple",schema:null,*entries(n){if(Array.isArray(n)){const r=Math.max(t.length,n.length);for(let i=0;i<r;i++)yield[i,n[i],t[i]||e]}},validator(t){return Array.isArray(t)||"Expected an array, but received: "+By(t)}})}function rv(t){const e=Object.keys(t);return new Fy({type:"type",schema:t,*entries(n){if(Ly(n))for(const r of e)yield[r,n[r],t[r]]},validator(t){return Ly(t)||"Expected an object, but received: "+By(t)}})}function iv(t){const e=t.map((t=>t.type)).join(" | ");return new Fy({type:"union",schema:null,validator(n,r){const i=[];for(const e of t){const[...t]=jy(n,e,r),[o]=t;if(!o[0])return[];for(const[e]of t)e&&i.push(e)}return["Expected the value to satisfy a union of `"+e+"`, but received: "+By(n),...i]}})}function ov(){return Wy("unknown",(()=>!0))}function sv(t,e,n){return new Fy({...t,coercer:(r,i)=>qy(r,e)?t.coercer(n(r,i),i):t.coercer(r,i)})}n(31198);var av=n(66855);n(89062);const[uv,cv,lv]=[[],[],[]],hv=BigInt(0),fv=BigInt(1),dv=BigInt(2),pv=BigInt(7),gv=BigInt(256),mv=BigInt(113);for(let t=0,e=fv,n=1,r=0;t<24;t++){[n,r]=[r,(2*n+3*r)%5],uv.push(2*(5*r+n)),cv.push((t+1)*(t+2)/2%64);let i=hv;for(let t=0;t<7;t++)e=(e<<fv^(e>>pv)*mv)%gv,e&dv&&(i^=fv<<(fv<<BigInt(t))-fv);lv.push(i)}const[yv,vv]=zg(lv,!0),bv=(t,e,n)=>n>32?Wg(t,e,n):qg(t,e,n),wv=(t,e,n)=>n>32?Hg(t,e,n):$g(t,e,n);class Ev extends Lg{constructor(t,e,n,r=!1,i=24){if(super(),this.blockLen=t,this.suffix=e,this.outputLen=n,this.enableXOF=r,this.rounds=i,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,Sg(n),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");var o;this.state=new Uint8Array(200),this.state32=(o=this.state,new Uint32Array(o.buffer,o.byteOffset,Math.floor(o.byteLength/4)))}keccak(){!function(t,e=24){const n=new Uint32Array(10);for(let r=24-e;r<24;r++){for(let e=0;e<10;e++)n[e]=t[e]^t[e+10]^t[e+20]^t[e+30]^t[e+40];for(let e=0;e<10;e+=2){const r=(e+8)%10,i=(e+2)%10,o=n[i],s=n[i+1],a=bv(o,s,1)^n[r],u=wv(o,s,1)^n[r+1];for(let n=0;n<50;n+=10)t[e+n]^=a,t[e+n+1]^=u}let e=t[2],i=t[3];for(let n=0;n<24;n++){const r=cv[n],o=bv(e,i,r),s=wv(e,i,r),a=uv[n];e=t[a],i=t[a+1],t[a]=o,t[a+1]=s}for(let e=0;e<50;e+=10){for(let r=0;r<10;r++)n[r]=t[e+r];for(let r=0;r<10;r++)t[e+r]^=~n[(r+2)%10]&n[(r+4)%10]}t[0]^=yv[r],t[1]^=vv[r]}n.fill(0)}(this.state32,this.rounds),this.posOut=0,this.pos=0}update(t){Ag(this);const{blockLen:e,state:n}=this,r=(t=Cg(t)).length;for(let i=0;i<r;){const o=Math.min(e-this.pos,r-i);for(let e=0;e<o;e++)n[this.pos++]^=t[i++];this.pos===e&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;const{state:t,suffix:e,pos:n,blockLen:r}=this;t[n]^=e,0!=(128&e)&&n===r-1&&this.keccak(),t[r-1]^=128,this.keccak()}writeInto(t){Ag(this,!1),_g(t),this.finish();const e=this.state,{blockLen:n}=this;for(let r=0,i=t.length;r<i;){this.posOut>=n&&this.keccak();const o=Math.min(n-this.posOut,i-r);t.set(e.subarray(this.posOut,this.posOut+o),r),this.posOut+=o,r+=o}return t}xofInto(t){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(t)}xof(t){return Sg(t),this.xofInto(new Uint8Array(t))}digestInto(t){if(Tg(t,this),this.finished)throw new Error("digest() was already called");return this.writeInto(t),this.destroy(),t}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(t){const{blockLen:e,suffix:n,outputLen:r,rounds:i,enableXOF:o}=this;return t||(t=new Ev(e,n,r,o,i)),t.state32.set(this.state32),t.pos=this.pos,t.posOut=this.posOut,t.finished=this.finished,t.rounds=i,t.suffix=n,t.outputLen=r,t.enableXOF=o,t.destroyed=this.destroyed,t}}const Iv=(t,e,n)=>Bg((()=>new Ev(e,t,n))),Sv=Iv(1,136,32);const{bytesToNumberBE:_v,hexToBytes:kv}=t,Av={Err:class extends Error{constructor(t=""){super(t)}},_parseInt(t){const{Err:e}=Av;if(t.length<2||2!==t[0])throw new e("Invalid signature integer tag");const n=t[1],r=t.subarray(2,n+2);if(!n||r.length!==n)throw new e("Invalid signature integer: wrong length");if(128&r[0])throw new e("Invalid signature integer: negative");if(0===r[0]&&!(128&r[1]))throw new e("Invalid signature integer: unnecessary leading zero");return{d:_v(r),l:t.subarray(n+2)}},toSig(t){const{Err:e}=Av,n="string"==typeof t?kv(t):t;if(!(n instanceof Uint8Array))throw new Error("ui8a expected");let r=n.length;if(r<2||48!=n[0])throw new e("Invalid signature tag");if(n[1]!==r-2)throw new e("Invalid signature: incorrect length");const{d:i,l:o}=Av._parseInt(n.subarray(2)),{d:s,l:a}=Av._parseInt(o);if(a.length)throw new e("Invalid signature: left bytes after parsing");return{r:i,s:s}},hexFromSig(t){const e=t=>8&Number.parseInt(t[0],16)?"00"+t:t,n=t=>{const e=t.toString(16);return 1&e.length?`0${e}`:e},r=e(n(t.s)),i=e(n(t.r)),o=r.length/2,s=i.length/2,a=n(o),u=n(s);return`30${n(s+o+4)}02${u}${i}02${a}${r}`}},Tv=BigInt(0),xv=BigInt(1),Ov=(BigInt(2),BigInt(3));BigInt(4);function Rv(t){const e=
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function(t){const e=Qm(t);Tm(e,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});const{endo:n,Fp:r,a:i}=e;if(n){if(!r.eql(i,r.ZERO))throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");if("object"!=typeof n||"bigint"!=typeof n.beta||"function"!=typeof n.splitScalar)throw new Error("Expected endomorphism with beta: bigint and splitScalar: function")}return Object.freeze({...e})}(t),{Fp:n}=e,r=e.toBytes||((t,e,r)=>{const i=e.toAffine();return mm(Uint8Array.from([4]),n.toBytes(i.x),n.toBytes(i.y))}),i=e.fromBytes||(t=>{const e=t.subarray(1);return{x:n.fromBytes(e.subarray(0,n.BYTES)),y:n.fromBytes(e.subarray(n.BYTES,2*n.BYTES))}});function o(t){const{a:r,b:i}=e,o=n.sqr(t),s=n.mul(o,t);return n.add(n.add(s,n.mul(t,r)),i)}if(!n.eql(n.sqr(e.Gy),o(e.Gx)))throw new Error("bad generator point: equation left != right");function s(t){return"bigint"==typeof t&&Tv<t&&t<e.n}function a(t){if(!s(t))throw new Error("Expected valid bigint: 0 < bigint < curve.n")}function u(t){const{allowedPrivateKeyLengths:n,nByteLength:r,wrapPrivateKey:i,n:o}=e;if(n&&"bigint"!=typeof t){if(t instanceof Uint8Array&&(t=sm(t)),"string"!=typeof t||!n.includes(t.length))throw new Error("Invalid key");t=t.padStart(2*r,"0")}let s;try{s="bigint"==typeof t?t:lm(gm("private key",t,r))}catch(e){throw new Error(`private key must be ${r} bytes, hex or bigint, not ${typeof t}`)}return i&&(s=Lm(s,o)),a(s),s}const c=new Map;function l(t){if(!(t instanceof h))throw new Error("ProjectivePoint expected")}class h{constructor(t,e,r){if(this.px=t,this.py=e,this.pz=r,null==t||!n.isValid(t))throw new Error("x required");if(null==e||!n.isValid(e))throw new Error("y required");if(null==r||!n.isValid(r))throw new Error("z required")}static fromAffine(t){const{x:e,y:r}=t||{};if(!t||!n.isValid(e)||!n.isValid(r))throw new Error("invalid affine point");if(t instanceof h)throw new Error("projective point not allowed");const i=t=>n.eql(t,n.ZERO);return i(e)&&i(r)?h.ZERO:new h(e,r,n.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(t){const e=n.invertBatch(t.map((t=>t.pz)));return t.map(((t,n)=>t.toAffine(e[n]))).map(h.fromAffine)}static fromHex(t){const e=h.fromAffine(i(gm("pointHex",t)));return e.assertValidity(),e}static fromPrivateKey(t){return h.BASE.multiply(u(t))}_setWindowSize(t){this._WINDOW_SIZE=t,c.delete(this)}assertValidity(){if(this.is0()){if(e.allowInfinityPoint&&!n.is0(this.py))return;throw new Error("bad point: ZERO")}const{x:t,y:r}=this.toAffine();if(!n.isValid(t)||!n.isValid(r))throw new Error("bad point: x or y not FE");const i=n.sqr(r),s=o(t);if(!n.eql(i,s))throw new Error("bad point: equation left != right");if(!this.isTorsionFree())throw new Error("bad point: not in prime-order subgroup")}hasEvenY(){const{y:t}=this.toAffine();if(n.isOdd)return!n.isOdd(t);throw new Error("Field doesn't support isOdd")}equals(t){l(t);const{px:e,py:r,pz:i}=this,{px:o,py:s,pz:a}=t,u=n.eql(n.mul(e,a),n.mul(o,i)),c=n.eql(n.mul(r,a),n.mul(s,i));return u&&c}negate(){return new h(this.px,n.neg(this.py),this.pz)}double(){const{a:t,b:r}=e,i=n.mul(r,Ov),{px:o,py:s,pz:a}=this;let u=n.ZERO,c=n.ZERO,l=n.ZERO,f=n.mul(o,o),d=n.mul(s,s),p=n.mul(a,a),g=n.mul(o,s);return g=n.add(g,g),l=n.mul(o,a),l=n.add(l,l),u=n.mul(t,l),c=n.mul(i,p),c=n.add(u,c),u=n.sub(d,c),c=n.add(d,c),c=n.mul(u,c),u=n.mul(g,u),l=n.mul(i,l),p=n.mul(t,p),g=n.sub(f,p),g=n.mul(t,g),g=n.add(g,l),l=n.add(f,f),f=n.add(l,f),f=n.add(f,p),f=n.mul(f,g),c=n.add(c,f),p=n.mul(s,a),p=n.add(p,p),f=n.mul(p,g),u=n.sub(u,f),l=n.mul(p,d),l=n.add(l,l),l=n.add(l,l),new h(u,c,l)}add(t){l(t);const{px:r,py:i,pz:o}=this,{px:s,py:a,pz:u}=t;let c=n.ZERO,f=n.ZERO,d=n.ZERO;const p=e.a,g=n.mul(e.b,Ov);let m=n.mul(r,s),y=n.mul(i,a),v=n.mul(o,u),b=n.add(r,i),w=n.add(s,a);b=n.mul(b,w),w=n.add(m,y),b=n.sub(b,w),w=n.add(r,o);let E=n.add(s,u);return w=n.mul(w,E),E=n.add(m,v),w=n.sub(w,E),E=n.add(i,o),c=n.add(a,u),E=n.mul(E,c),c=n.add(y,v),E=n.sub(E,c),d=n.mul(p,w),c=n.mul(g,v),d=n.add(c,d),c=n.sub(y,d),d=n.add(y,d),f=n.mul(c,d),y=n.add(m,m),y=n.add(y,m),v=n.mul(p,v),w=n.mul(g,w),y=n.add(y,v),v=n.sub(m,v),v=n.mul(p,v),w=n.add(w,v),m=n.mul(y,w),f=n.add(f,m),m=n.mul(E,w),c=n.mul(b,c),c=n.sub(c,m),m=n.mul(b,y),d=n.mul(E,d),d=n.add(d,m),new h(c,f,d)}subtract(t){return this.add(t.negate())}is0(){return this.equals(h.ZERO)}wNAF(t){return d.wNAFCached(this,c,t,(t=>{const e=n.invertBatch(t.map((t=>t.pz)));return t.map(((t,n)=>t.toAffine(e[n]))).map(h.fromAffine)}))}multiplyUnsafe(t){const r=h.ZERO;if(t===Tv)return r;if(a(t),t===xv)return this;const{endo:i}=e;if(!i)return d.unsafeLadder(this,t);let{k1neg:o,k1:s,k2neg:u,k2:c}=i.splitScalar(t),l=r,f=r,p=this;for(;s>Tv||c>Tv;)s&xv&&(l=l.add(p)),c&xv&&(f=f.add(p)),p=p.double(),s>>=xv,c>>=xv;return o&&(l=l.negate()),u&&(f=f.negate()),f=new h(n.mul(f.px,i.beta),f.py,f.pz),l.add(f)}multiply(t){a(t);let r,i,o=t;const{endo:s}=e;if(s){const{k1neg:t,k1:e,k2neg:a,k2:u}=s.splitScalar(o);let{p:c,f:l}=this.wNAF(e),{p:f,f:p}=this.wNAF(u);c=d.constTimeNegate(t,c),f=d.constTimeNegate(a,f),f=new h(n.mul(f.px,s.beta),f.py,f.pz),r=c.add(f),i=l.add(p)}else{const{p:t,f:e}=this.wNAF(o);r=t,i=e}return h.normalizeZ([r,i])[0]}multiplyAndAddUnsafe(t,e,n){const r=h.BASE,i=(t,e)=>e!==Tv&&e!==xv&&t.equals(r)?t.multiply(e):t.multiplyUnsafe(e),o=i(this,e).add(i(t,n));return o.is0()?void 0:o}toAffine(t){const{px:e,py:r,pz:i}=this,o=this.is0();null==t&&(t=o?n.ONE:n.inv(i));const s=n.mul(e,t),a=n.mul(r,t),u=n.mul(i,t);if(o)return{x:n.ZERO,y:n.ZERO};if(!n.eql(u,n.ONE))throw new Error("invZ was invalid");return{x:s,y:a}}isTorsionFree(){const{h:t,isTorsionFree:n}=e;if(t===xv)return!0;if(n)return n(h,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){const{h:t,clearCofactor:n}=e;return t===xv?this:n?n(h,this):this.multiplyUnsafe(e.h)}toRawBytes(t=!0){return this.assertValidity(),r(h,this,t)}toHex(t=!0){return sm(this.toRawBytes(t))}}h.BASE=new h(e.Gx,e.Gy,n.ONE),h.ZERO=new h(n.ZERO,n.ONE,n.ZERO);const f=e.nBitLength,d=Jm(h,e.endo?Math.ceil(f/2):f);return{CURVE:e,ProjectivePoint:h,normPrivateKeyToScalar:u,weierstrassEquation:o,isWithinCurveOrder:s}}function Mv(t){const e=function(t){const e=Qm(t);return Tm(e,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...e})}(t),{Fp:n,n:r}=e,i=n.BYTES+1,o=2*n.BYTES+1;function s(t){return Lm(t,r)}function a(t){return Um(t,r)}const{ProjectivePoint:u,normPrivateKeyToScalar:c,weierstrassEquation:l,isWithinCurveOrder:h}=Rv({...e,toBytes(t,e,r){const i=e.toAffine(),o=n.toBytes(i.x),s=mm;return r?s(Uint8Array.from([e.hasEvenY()?2:3]),o):s(Uint8Array.from([4]),o,n.toBytes(i.y))},fromBytes(t){const e=t.length,r=t[0],s=t.subarray(1);if(e!==i||2!==r&&3!==r){if(e===o&&4===r){return{x:n.fromBytes(s.subarray(0,n.BYTES)),y:n.fromBytes(s.subarray(n.BYTES,2*n.BYTES))}}throw new Error(`Point of length ${e} was invalid. Expected ${i} compressed bytes or ${o} uncompressed bytes`)}{const t=lm(s);if(!(Tv<(a=t)&&a<n.ORDER))throw new Error("Point is not on curve");const e=l(t);let i=n.sqrt(e);return 1==(1&r)!==((i&xv)===xv)&&(i=n.neg(i)),{x:t,y:i}}var a}}),f=t=>sm(fm(t,e.nByteLength));function d(t){return t>r>>xv}const p=(t,e,n)=>lm(t.slice(e,n));class g{constructor(t,e,n){this.r=t,this.s=e,this.recovery=n,this.assertValidity()}static fromCompact(t){const n=e.nByteLength;return t=gm("compactSignature",t,2*n),new g(p(t,0,n),p(t,n,2*n))}static fromDER(t){const{r:e,s:n}=Av.toSig(gm("DER",t));return new g(e,n)}assertValidity(){if(!h(this.r))throw new Error("r must be 0 < r < CURVE.n");if(!h(this.s))throw new Error("s must be 0 < s < CURVE.n")}addRecoveryBit(t){return new g(this.r,this.s,t)}recoverPublicKey(t){const{r:r,s:i,recovery:o}=this,c=b(gm("msgHash",t));if(null==o||![0,1,2,3].includes(o))throw new Error("recovery id invalid");const l=2===o||3===o?r+e.n:r;if(l>=n.ORDER)throw new Error("recovery id 2 or 3 invalid");const h=0==(1&o)?"02":"03",d=u.fromHex(h+f(l)),p=a(l),g=s(-c*p),m=s(i*p),y=u.BASE.multiplyAndAddUnsafe(d,g,m);if(!y)throw new Error("point at infinify");return y.assertValidity(),y}hasHighS(){return d(this.s)}normalizeS(){return this.hasHighS()?new g(this.r,s(-this.s),this.recovery):this}toDERRawBytes(){return cm(this.toDERHex())}toDERHex(){return Av.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return cm(this.toCompactHex())}toCompactHex(){return f(this.r)+f(this.s)}}const m={isValidPrivateKey(t){try{return c(t),!0}catch(t){return!1}},normPrivateKeyToScalar:c,randomPrivateKey:()=>{const t=Hm(e.n);return function(t,e,n=!1){const r=t.length,i=Wm(e),o=Hm(e);if(r<16||r<o||r>1024)throw new Error(`expected ${o}-1024 bytes of input, got ${r}`);const s=Lm(n?lm(t):hm(t),e-Om)+Om;return n?dm(s,i):fm(s,i)}(e.randomBytes(t),e.n)},precompute(t=8,e=u.BASE){return e._setWindowSize(t),e.multiply(BigInt(3)),e}};function y(t){const e=t instanceof Uint8Array,n="string"==typeof t,r=(e||n)&&t.length;return e?r===i||r===o:n?r===2*i||r===2*o:t instanceof u}const v=e.bits2int||function(t){const n=lm(t),r=8*t.length-e.nBitLength;return r>0?n>>BigInt(r):n},b=e.bits2int_modN||function(t){return s(v(t))},w=Im(e.nBitLength);function E(t){if("bigint"!=typeof t)throw new Error("bigint expected");if(!(Tv<=t&&t<w))throw new Error(`bigint expected < 2^${e.nBitLength}`);return fm(t,e.nByteLength)}function I(t,r,i=S){if(["recovered","canonical"].some((t=>t in i)))throw new Error("sign() legacy options not supported");const{hash:o,randomBytes:l}=e;let{lowS:f,prehash:p,extraEntropy:m}=i;null==f&&(f=!0),t=gm("msgHash",t),p&&(t=gm("prehashed msgHash",o(t)));const y=b(t),w=c(r),I=[E(w),E(y)];if(null!=m){const t=!0===m?l(n.BYTES):m;I.push(gm("extraEntropy",t))}const _=mm(...I),k=y;return{seed:_,k2sig:function(t){const e=v(t);if(!h(e))return;const n=a(e),r=u.BASE.multiply(e).toAffine(),i=s(r.x);if(i===Tv)return;const o=s(n*s(k+i*w));if(o===Tv)return;let c=(r.x===i?0:2)|Number(r.y&xv),l=o;return f&&d(o)&&(l=function(t){return d(t)?s(-t):t}(o),c^=1),new g(i,l,c)}}}const S={lowS:e.lowS,prehash:!1},_={lowS:e.lowS,prehash:!1};return u.BASE._setWindowSize(8),{CURVE:e,getPublicKey:function(t,e=!0){return u.fromPrivateKey(t).toRawBytes(e)},getSharedSecret:function(t,e,n=!0){if(y(t))throw new Error("first arg must be private key");if(!y(e))throw new Error("second arg must be public key");return u.fromHex(e).multiply(c(t)).toRawBytes(n)},sign:function(t,n,r=S){const{seed:i,k2sig:o}=I(t,n,r),s=e;return km(s.hash.outputLen,s.nByteLength,s.hmac)(i,o)},verify:function(t,n,r,i=_){const o=t;if(n=gm("msgHash",n),r=gm("publicKey",r),"strict"in i)throw new Error("options.strict was renamed to lowS");const{lowS:c,prehash:l}=i;let h,f;try{if("string"==typeof o||o instanceof Uint8Array)try{h=g.fromDER(o)}catch(t){if(!(t instanceof Av.Err))throw t;h=g.fromCompact(o)}else{if("object"!=typeof o||"bigint"!=typeof o.r||"bigint"!=typeof o.s)throw new Error("PARSE");{const{r:t,s:e}=o;h=new g(t,e)}}f=u.fromHex(r)}catch(t){if("PARSE"===t.message)throw new Error("signature must be Signature instance, Uint8Array or hex string");return!1}if(c&&h.hasHighS())return!1;l&&(n=e.hash(n));const{r:d,s:p}=h,m=b(n),y=a(p),v=s(m*y),w=s(d*y),E=u.BASE.multiplyAndAddUnsafe(f,v,w)?.toAffine();return!!E&&s(E.x)===d},ProjectivePoint:u,Signature:g,utils:m}}class Pv extends Lg{constructor(t,e){super(),this.finished=!1,this.destroyed=!1,kg(t);const n=Cg(e);if(this.iHash=t.create(),"function"!=typeof this.iHash.update)throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const r=this.blockLen,i=new Uint8Array(r);i.set(n.length>r?t.create().update(n).digest():n);for(let t=0;t<i.length;t++)i[t]^=54;this.iHash.update(i),this.oHash=t.create();for(let t=0;t<i.length;t++)i[t]^=106;this.oHash.update(i),i.fill(0)}update(t){return Ag(this),this.iHash.update(t),this}digestInto(t){Ag(this),_g(t,this.outputLen),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){const t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||(t=Object.create(Object.getPrototypeOf(this),{}));const{oHash:e,iHash:n,finished:r,destroyed:i,blockLen:o,outputLen:s}=this;return t.finished=r,t.destroyed=i,t.blockLen=o,t.outputLen=s,t.oHash=e._cloneInto(t.oHash),t.iHash=n._cloneInto(t.iHash),t}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const Cv=(t,e,n)=>new Pv(t,e).update(n).digest();
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Nv(t){return{hash:t,hmac:(e,...n)=>Cv(t,e,Ng(...n)),randomBytes:Dg}}Cv.create=(t,e)=>new Pv(t,e);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Lv=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),Bv=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),Dv=BigInt(1),Uv=BigInt(2),jv=(t,e)=>(t+e/Uv)/e;function Fv(t){const e=Lv,n=BigInt(3),r=BigInt(6),i=BigInt(11),o=BigInt(22),s=BigInt(23),a=BigInt(44),u=BigInt(88),c=t*t*t%e,l=c*c*t%e,h=Dm(l,n,e)*l%e,f=Dm(h,n,e)*l%e,d=Dm(f,Uv,e)*c%e,p=Dm(d,i,e)*d%e,g=Dm(p,o,e)*p%e,m=Dm(g,a,e)*g%e,y=Dm(m,u,e)*m%e,v=Dm(y,a,e)*g%e,b=Dm(v,n,e)*l%e,w=Dm(b,s,e)*p%e,E=Dm(w,r,e)*c%e,I=Dm(E,Uv,e);if(!Vv.eql(Vv.sqr(I),t))throw new Error("Cannot find square root");return I}const Vv=$m(Lv,void 0,void 0,{sqrt:Fv}),zv=function(t,e){const n=e=>Mv({...t,...Nv(e)});return Object.freeze({...n(e),create:n})}({a:BigInt(0),b:BigInt(7),Fp:Vv,n:Bv,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:t=>{const e=Bv,n=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),r=-Dv*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),i=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),o=n,s=BigInt("0x100000000000000000000000000000000"),a=jv(o*t,e),u=jv(-r*t,e);let c=Lm(t-a*n-u*i,e),l=Lm(-a*r-u*o,e);const h=c>s,f=l>s;if(h&&(c=e-c),f&&(l=e-l),c>s||l>s)throw new Error("splitScalar: Endomorphism failed, k="+t);return{k1neg:h,k1:c,k2neg:f,k2:l}}}},Ry);BigInt(0);zv.ProjectivePoint;var qv=n(25108);yy.utils.randomPrivateKey;const $v=()=>{const t=yy.utils.randomPrivateKey(),e=Wv(t),n=new Uint8Array(64);return n.set(t),n.set(e,32),{publicKey:e,secretKey:n}},Wv=yy.getPublicKey;function Hv(t){try{return yy.ExtendedPoint.fromHex(t),!0}catch{return!1}}const Kv=(t,e)=>yy.sign(t,e.slice(0,32)),Gv=yy.verify,Jv=t=>Ig.Buffer.isBuffer(t)?t:t instanceof Uint8Array?Ig.Buffer.from(t.buffer,t.byteOffset,t.byteLength):Ig.Buffer.from(t);class Qv{constructor(t){Object.assign(this,t)}encode(){return Ig.Buffer.from((0,My.serialize)(Xv,this))}static decode(t){return(0,My.deserialize)(Xv,this,t)}static decodeUnchecked(t){return(0,My.deserializeUnchecked)(Xv,this,t)}}const Xv=new Map;var Yv;let Zv;const tb=32;let eb=1;Zv=Symbol.toStringTag;class nb extends Qv{constructor(t){if(super({}),this._bn=void 0,function(t){return void 0!==t._bn}(t))this._bn=t._bn;else{if("string"==typeof t){const e=Sy().decode(t);if(e.length!=tb)throw new Error("Invalid public key input");this._bn=new(Ey())(e)}else this._bn=new(Ey())(t);if(this._bn.byteLength()>tb)throw new Error("Invalid public key input")}}static unique(){const t=new nb(eb);return eb+=1,new nb(t.toBuffer())}equals(t){return this._bn.eq(t._bn)}toBase58(){return Sy().encode(this.toBytes())}toJSON(){return this.toBase58()}toBytes(){const t=this.toBuffer();return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}toBuffer(){const t=this._bn.toArrayLike(Ig.Buffer);if(t.length===tb)return t;const e=Ig.Buffer.alloc(32);return t.copy(e,32-t.length),e}get[Zv](){return`PublicKey(${this.toString()})`}toString(){return this.toBase58()}static async createWithSeed(t,e,n){const r=Ig.Buffer.concat([t.toBuffer(),Ig.Buffer.from(e),n.toBuffer()]),i=Ry(r);return new nb(i)}static createProgramAddressSync(t,e){let n=Ig.Buffer.alloc(0);t.forEach((function(t){if(t.length>32)throw new TypeError("Max seed length exceeded");n=Ig.Buffer.concat([n,Jv(t)])})),n=Ig.Buffer.concat([n,e.toBuffer(),Ig.Buffer.from("ProgramDerivedAddress")]);const r=Ry(n);if(Hv(r))throw new Error("Invalid seeds, address must fall off the curve");return new nb(r)}static async createProgramAddress(t,e){return this.createProgramAddressSync(t,e)}static findProgramAddressSync(t,e){let n,r=255;for(;0!=r;){try{const i=t.concat(Ig.Buffer.from([r]));n=this.createProgramAddressSync(i,e)}catch(t){if(t instanceof TypeError)throw t;r--;continue}return[n,r]}throw new Error("Unable to find a viable program address nonce")}static async findProgramAddress(t,e){return this.findProgramAddressSync(t,e)}static isOnCurve(t){return Hv(new nb(t).toBytes())}}Yv=nb,nb.default=new Yv("11111111111111111111111111111111"),Xv.set(nb,{kind:"struct",fields:[["_bn","u256"]]});new nb("BPFLoader1111111111111111111111111111111111");const rb=1232;class ib extends Error{constructor(t){super(`Signature ${t} has expired: block height exceeded.`),this.signature=void 0,this.signature=t}}Object.defineProperty(ib.prototype,"name",{value:"TransactionExpiredBlockheightExceededError"});class ob extends Error{constructor(t,e){super(`Transaction was not confirmed in ${e.toFixed(2)} seconds. It is unknown if it succeeded or failed. Check signature ${t} using the Solana Explorer or CLI tools.`),this.signature=void 0,this.signature=t}}Object.defineProperty(ob.prototype,"name",{value:"TransactionExpiredTimeoutError"});class sb extends Error{constructor(t){super(`Signature ${t} has expired: the nonce is no longer valid.`),this.signature=void 0,this.signature=t}}Object.defineProperty(sb.prototype,"name",{value:"TransactionExpiredNonceInvalidError"});class ab{constructor(t,e){this.staticAccountKeys=void 0,this.accountKeysFromLookups=void 0,this.staticAccountKeys=t,this.accountKeysFromLookups=e}keySegments(){const t=[this.staticAccountKeys];return this.accountKeysFromLookups&&(t.push(this.accountKeysFromLookups.writable),t.push(this.accountKeysFromLookups.readonly)),t}get(t){for(const e of this.keySegments()){if(t<e.length)return e[t];t-=e.length}}get length(){return this.keySegments().flat().length}compileInstructions(t){if(this.length>256)throw new Error("Account index overflow encountered during compilation");const e=new Map;this.keySegments().flat().forEach(((t,n)=>{e.set(t.toBase58(),n)}));const n=t=>{const n=e.get(t.toBase58());if(void 0===n)throw new Error("Encountered an unknown instruction account key during compilation");return n};return t.map((t=>({programIdIndex:n(t.programId),accountKeyIndexes:t.keys.map((t=>n(t.pubkey))),data:t.data})))}}const ub=(t="publicKey")=>Py.blob(32,t),cb=(t="string")=>{const e=Py.struct([Py.u32("length"),Py.u32("lengthPadding"),Py.blob(Py.offset(Py.u32(),-8),"chars")],t),n=e.decode.bind(e),r=e.encode.bind(e),i=e;return i.decode=(t,e)=>n(t,e).chars.toString(),i.encode=(t,e,n)=>{const i={chars:Ig.Buffer.from(t,"utf8")};return r(i,e,n)},i.alloc=t=>Py.u32().span+Py.u32().span+Ig.Buffer.from(t,"utf8").length,i};function lb(t,e){const n=t=>{if(t.span>=0)return t.span;if("function"==typeof t.alloc)return t.alloc(e[t.property]);if("count"in t&&"elementLayout"in t){const r=e[t.property];if(Array.isArray(r))return r.length*n(t.elementLayout)}else if("fields"in t)return lb({layout:t},e[t.property]);return 0};let r=0;return t.layout.fields.forEach((t=>{r+=n(t)})),r}function hb(t){let e=0,n=0;for(;;){let r=t.shift();if(e|=(127&r)<<7*n,n+=1,0==(128&r))break}return e}function fb(t,e){let n=e;for(;;){let e=127&n;if(n>>=7,0==n){t.push(e);break}e|=128,t.push(e)}}function db(t,e){if(!t)throw new Error(e||"Assertion failed")}class pb{constructor(t,e){this.payer=void 0,this.keyMetaMap=void 0,this.payer=t,this.keyMetaMap=e}static compile(t,e){const n=new Map,r=t=>{const e=t.toBase58();let r=n.get(e);return void 0===r&&(r={isSigner:!1,isWritable:!1,isInvoked:!1},n.set(e,r)),r},i=r(e);i.isSigner=!0,i.isWritable=!0;for(const e of t){r(e.programId).isInvoked=!0;for(const t of e.keys){const e=r(t.pubkey);e.isSigner||=t.isSigner,e.isWritable||=t.isWritable}}return new pb(e,n)}getMessageComponents(){const t=[...this.keyMetaMap.entries()];db(t.length<=256,"Max static account keys length exceeded");const e=t.filter((([,t])=>t.isSigner&&t.isWritable)),n=t.filter((([,t])=>t.isSigner&&!t.isWritable)),r=t.filter((([,t])=>!t.isSigner&&t.isWritable)),i=t.filter((([,t])=>!t.isSigner&&!t.isWritable)),o={numRequiredSignatures:e.length+n.length,numReadonlySignedAccounts:n.length,numReadonlyUnsignedAccounts:i.length};{db(e.length>0,"Expected at least one writable signer key");const[t]=e[0];db(t===this.payer.toBase58(),"Expected first writable signer key to be the fee payer")}return[o,[...e.map((([t])=>new nb(t))),...n.map((([t])=>new nb(t))),...r.map((([t])=>new nb(t))),...i.map((([t])=>new nb(t)))]]}extractTableLookup(t){const[e,n]=this.drainKeysFoundInLookupTable(t.state.addresses,(t=>!t.isSigner&&!t.isInvoked&&t.isWritable)),[r,i]=this.drainKeysFoundInLookupTable(t.state.addresses,(t=>!t.isSigner&&!t.isInvoked&&!t.isWritable));if(0!==e.length||0!==r.length)return[{accountKey:t.key,writableIndexes:e,readonlyIndexes:r},{writable:n,readonly:i}]}drainKeysFoundInLookupTable(t,e){const n=new Array,r=new Array;for(const[i,o]of this.keyMetaMap.entries())if(e(o)){const e=new nb(i),o=t.findIndex((t=>t.equals(e)));o>=0&&(db(o<256,"Max lookup table index exceeded"),n.push(o),r.push(e),this.keyMetaMap.delete(i))}return[n,r]}}class gb{constructor(t){this.header=void 0,this.accountKeys=void 0,this.recentBlockhash=void 0,this.instructions=void 0,this.indexToProgramIds=new Map,this.header=t.header,this.accountKeys=t.accountKeys.map((t=>new nb(t))),this.recentBlockhash=t.recentBlockhash,this.instructions=t.instructions,this.instructions.forEach((t=>this.indexToProgramIds.set(t.programIdIndex,this.accountKeys[t.programIdIndex])))}get version(){return"legacy"}get staticAccountKeys(){return this.accountKeys}get compiledInstructions(){return this.instructions.map((t=>({programIdIndex:t.programIdIndex,accountKeyIndexes:t.accounts,data:Sy().decode(t.data)})))}get addressTableLookups(){return[]}getAccountKeys(){return new ab(this.staticAccountKeys)}static compile(t){const e=pb.compile(t.instructions,t.payerKey),[n,r]=e.getMessageComponents(),i=new ab(r).compileInstructions(t.instructions).map((t=>({programIdIndex:t.programIdIndex,accounts:t.accountKeyIndexes,data:Sy().encode(t.data)})));return new gb({header:n,accountKeys:r,recentBlockhash:t.recentBlockhash,instructions:i})}isAccountSigner(t){return t<this.header.numRequiredSignatures}isAccountWritable(t){const e=this.header.numRequiredSignatures;if(t>=this.header.numRequiredSignatures){return t-e<this.accountKeys.length-e-this.header.numReadonlyUnsignedAccounts}return t<e-this.header.numReadonlySignedAccounts}isProgramId(t){return this.indexToProgramIds.has(t)}programIds(){return[...this.indexToProgramIds.values()]}nonProgramIds(){return this.accountKeys.filter(((t,e)=>!this.isProgramId(e)))}serialize(){const t=this.accountKeys.length;let e=[];fb(e,t);const n=this.instructions.map((t=>{const{accounts:e,programIdIndex:n}=t,r=Array.from(Sy().decode(t.data));let i=[];fb(i,e.length);let o=[];return fb(o,r.length),{programIdIndex:n,keyIndicesCount:Ig.Buffer.from(i),keyIndices:e,dataLength:Ig.Buffer.from(o),data:r}}));let r=[];fb(r,n.length);let i=Ig.Buffer.alloc(rb);Ig.Buffer.from(r).copy(i);let o=r.length;n.forEach((t=>{const e=Py.struct([Py.u8("programIdIndex"),Py.blob(t.keyIndicesCount.length,"keyIndicesCount"),Py.seq(Py.u8("keyIndex"),t.keyIndices.length,"keyIndices"),Py.blob(t.dataLength.length,"dataLength"),Py.seq(Py.u8("userdatum"),t.data.length,"data")]).encode(t,i,o);o+=e})),i=i.slice(0,o);const s=Py.struct([Py.blob(1,"numRequiredSignatures"),Py.blob(1,"numReadonlySignedAccounts"),Py.blob(1,"numReadonlyUnsignedAccounts"),Py.blob(e.length,"keyCount"),Py.seq(ub("key"),t,"keys"),ub("recentBlockhash")]),a={numRequiredSignatures:Ig.Buffer.from([this.header.numRequiredSignatures]),numReadonlySignedAccounts:Ig.Buffer.from([this.header.numReadonlySignedAccounts]),numReadonlyUnsignedAccounts:Ig.Buffer.from([this.header.numReadonlyUnsignedAccounts]),keyCount:Ig.Buffer.from(e),keys:this.accountKeys.map((t=>Jv(t.toBytes()))),recentBlockhash:Sy().decode(this.recentBlockhash)};let u=Ig.Buffer.alloc(2048);const c=s.encode(a,u);return i.copy(u,c),u.slice(0,c+i.length)}static from(t){let e=[...t];const n=e.shift();if(n!==(127&n))throw new Error("Versioned messages must be deserialized with VersionedMessage.deserialize()");const r=e.shift(),i=e.shift(),o=hb(e);let s=[];for(let t=0;t<o;t++){const t=e.slice(0,tb);e=e.slice(tb),s.push(new nb(Ig.Buffer.from(t)))}const a=e.slice(0,tb);e=e.slice(tb);const u=hb(e);let c=[];for(let t=0;t<u;t++){const t=e.shift(),n=hb(e),r=e.slice(0,n);e=e.slice(n);const i=hb(e),o=e.slice(0,i),s=Sy().encode(Ig.Buffer.from(o));e=e.slice(i),c.push({programIdIndex:t,accounts:r,data:s})}const l={header:{numRequiredSignatures:n,numReadonlySignedAccounts:r,numReadonlyUnsignedAccounts:i},recentBlockhash:Sy().encode(Ig.Buffer.from(a)),accountKeys:s,instructions:c};return new gb(l)}}const mb=Ig.Buffer.alloc(64).fill(0);class yb{constructor(t){this.keys=void 0,this.programId=void 0,this.data=Ig.Buffer.alloc(0),this.programId=t.programId,this.keys=t.keys,t.data&&(this.data=t.data)}toJSON(){return{keys:this.keys.map((({pubkey:t,isSigner:e,isWritable:n})=>({pubkey:t.toJSON(),isSigner:e,isWritable:n}))),programId:this.programId.toJSON(),data:[...this.data]}}}class vb{get signature(){return this.signatures.length>0?this.signatures[0].signature:null}constructor(t){if(this.signatures=[],this.feePayer=void 0,this.instructions=[],this.recentBlockhash=void 0,this.lastValidBlockHeight=void 0,this.nonceInfo=void 0,this.minNonceContextSlot=void 0,this._message=void 0,this._json=void 0,t)if(t.feePayer&&(this.feePayer=t.feePayer),t.signatures&&(this.signatures=t.signatures),Object.prototype.hasOwnProperty.call(t,"nonceInfo")){const{minContextSlot:e,nonceInfo:n}=t;this.minNonceContextSlot=e,this.nonceInfo=n}else if(Object.prototype.hasOwnProperty.call(t,"lastValidBlockHeight")){const{blockhash:e,lastValidBlockHeight:n}=t;this.recentBlockhash=e,this.lastValidBlockHeight=n}else{const{recentBlockhash:e,nonceInfo:n}=t;n&&(this.nonceInfo=n),this.recentBlockhash=e}}toJSON(){return{recentBlockhash:this.recentBlockhash||null,feePayer:this.feePayer?this.feePayer.toJSON():null,nonceInfo:this.nonceInfo?{nonce:this.nonceInfo.nonce,nonceInstruction:this.nonceInfo.nonceInstruction.toJSON()}:null,instructions:this.instructions.map((t=>t.toJSON())),signers:this.signatures.map((({publicKey:t})=>t.toJSON()))}}add(...t){if(0===t.length)throw new Error("No instructions");return t.forEach((t=>{"instructions"in t?this.instructions=this.instructions.concat(t.instructions):"data"in t&&"programId"in t&&"keys"in t?this.instructions.push(t):this.instructions.push(new yb(t))})),this}compileMessage(){if(this._message&&JSON.stringify(this.toJSON())===JSON.stringify(this._json))return this._message;let t,e,n;if(this.nonceInfo?(t=this.nonceInfo.nonce,e=this.instructions[0]!=this.nonceInfo.nonceInstruction?[this.nonceInfo.nonceInstruction,...this.instructions]:this.instructions):(t=this.recentBlockhash,e=this.instructions),!t)throw new Error("Transaction recentBlockhash required");if(e.length<1&&qv.warn("No instructions provided"),this.feePayer)n=this.feePayer;else{if(!(this.signatures.length>0&&this.signatures[0].publicKey))throw new Error("Transaction fee payer required");n=this.signatures[0].publicKey}for(let t=0;t<e.length;t++)if(void 0===e[t].programId)throw new Error(`Transaction instruction index ${t} has undefined program id`);const r=[],i=[];e.forEach((t=>{t.keys.forEach((t=>{i.push({...t})}));const e=t.programId.toString();r.includes(e)||r.push(e)})),r.forEach((t=>{i.push({pubkey:new nb(t),isSigner:!1,isWritable:!1})}));const o=[];i.forEach((t=>{const e=t.pubkey.toString(),n=o.findIndex((t=>t.pubkey.toString()===e));n>-1?(o[n].isWritable=o[n].isWritable||t.isWritable,o[n].isSigner=o[n].isSigner||t.isSigner):o.push(t)})),o.sort((function(t,e){if(t.isSigner!==e.isSigner)return t.isSigner?-1:1;if(t.isWritable!==e.isWritable)return t.isWritable?-1:1;return t.pubkey.toBase58().localeCompare(e.pubkey.toBase58(),"en",{localeMatcher:"best fit",usage:"sort",sensitivity:"variant",ignorePunctuation:!1,numeric:!1,caseFirst:"lower"})}));const s=o.findIndex((t=>t.pubkey.equals(n)));if(s>-1){const[t]=o.splice(s,1);t.isSigner=!0,t.isWritable=!0,o.unshift(t)}else o.unshift({pubkey:n,isSigner:!0,isWritable:!0});for(const t of this.signatures){const e=o.findIndex((e=>e.pubkey.equals(t.publicKey)));if(!(e>-1))throw new Error(`unknown signer: ${t.publicKey.toString()}`);o[e].isSigner||(o[e].isSigner=!0,qv.warn("Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release."))}let a=0,u=0,c=0;const l=[],h=[];o.forEach((({pubkey:t,isSigner:e,isWritable:n})=>{e?(l.push(t.toString()),a+=1,n||(u+=1)):(h.push(t.toString()),n||(c+=1))}));const f=l.concat(h),d=e.map((t=>{const{data:e,programId:n}=t;return{programIdIndex:f.indexOf(n.toString()),accounts:t.keys.map((t=>f.indexOf(t.pubkey.toString()))),data:Sy().encode(e)}}));return d.forEach((t=>{db(t.programIdIndex>=0),t.accounts.forEach((t=>db(t>=0)))})),new gb({header:{numRequiredSignatures:a,numReadonlySignedAccounts:u,numReadonlyUnsignedAccounts:c},accountKeys:f,recentBlockhash:t,instructions:d})}_compile(){const t=this.compileMessage(),e=t.accountKeys.slice(0,t.header.numRequiredSignatures);if(this.signatures.length===e.length){if(this.signatures.every(((t,n)=>e[n].equals(t.publicKey))))return t}return this.signatures=e.map((t=>({signature:null,publicKey:t}))),t}serializeMessage(){return this._compile().serialize()}async getEstimatedFee(t){return(await t.getFeeForMessage(this.compileMessage())).value}setSigners(...t){if(0===t.length)throw new Error("No signers");const e=new Set;this.signatures=t.filter((t=>{const n=t.toString();return!e.has(n)&&(e.add(n),!0)})).map((t=>({signature:null,publicKey:t})))}sign(...t){if(0===t.length)throw new Error("No signers");const e=new Set,n=[];for(const r of t){const t=r.publicKey.toString();e.has(t)||(e.add(t),n.push(r))}this.signatures=n.map((t=>({signature:null,publicKey:t.publicKey})));const r=this._compile();this._partialSign(r,...n)}partialSign(...t){if(0===t.length)throw new Error("No signers");const e=new Set,n=[];for(const r of t){const t=r.publicKey.toString();e.has(t)||(e.add(t),n.push(r))}const r=this._compile();this._partialSign(r,...n)}_partialSign(t,...e){const n=t.serialize();e.forEach((t=>{const e=Kv(n,t.secretKey);this._addSignature(t.publicKey,Jv(e))}))}addSignature(t,e){this._compile(),this._addSignature(t,e)}_addSignature(t,e){db(64===e.length);const n=this.signatures.findIndex((e=>t.equals(e.publicKey)));if(n<0)throw new Error(`unknown signer: ${t.toString()}`);this.signatures[n].signature=Ig.Buffer.from(e)}verifySignatures(t){return this._verifySignatures(this.serializeMessage(),void 0===t||t)}_verifySignatures(t,e){for(const{signature:n,publicKey:r}of this.signatures)if(null===n){if(e)return!1}else if(!Gv(n,t,r.toBytes()))return!1;return!0}serialize(t){const{requireAllSignatures:e,verifySignatures:n}=Object.assign({requireAllSignatures:!0,verifySignatures:!0},t),r=this.serializeMessage();if(n&&!this._verifySignatures(r,e))throw new Error("Signature verification failed");return this._serialize(r)}_serialize(t){const{signatures:e}=this,n=[];fb(n,e.length);const r=n.length+64*e.length+t.length,i=Ig.Buffer.alloc(r);return db(e.length<256),Ig.Buffer.from(n).copy(i,0),e.forEach((({signature:t},e)=>{null!==t&&(db(64===t.length,"signature has invalid length"),Ig.Buffer.from(t).copy(i,n.length+64*e))})),t.copy(i,n.length+64*e.length),db(i.length<=rb,`Transaction too large: ${i.length} > 1232`),i}get keys(){return db(1===this.instructions.length),this.instructions[0].keys.map((t=>t.pubkey))}get programId(){return db(1===this.instructions.length),this.instructions[0].programId}get data(){return db(1===this.instructions.length),this.instructions[0].data}static from(t){let e=[...t];const n=hb(e);let r=[];for(let t=0;t<n;t++){const t=e.slice(0,64);e=e.slice(64),r.push(Sy().encode(Ig.Buffer.from(t)))}return vb.populate(gb.from(e),r)}static populate(t,e=[]){const n=new vb;return n.recentBlockhash=t.recentBlockhash,t.header.numRequiredSignatures>0&&(n.feePayer=t.accountKeys[0]),e.forEach(((e,r)=>{const i={signature:e==Sy().encode(mb)?null:Sy().decode(e),publicKey:t.accountKeys[r]};n.signatures.push(i)})),t.instructions.forEach((e=>{const r=e.accounts.map((e=>{const r=t.accountKeys[e];return{pubkey:r,isSigner:n.signatures.some((t=>t.publicKey.toString()===r.toString()))||t.isAccountSigner(e),isWritable:t.isAccountWritable(e)}}));n.instructions.push(new yb({keys:r,programId:t.accountKeys[e.programIdIndex],data:Sy().decode(e.data)}))})),n._message=t,n._json=n.toJSON(),n}}const bb=new nb("SysvarC1ock11111111111111111111111111111111"),wb=(new nb("SysvarEpochSchedu1e111111111111111111111111"),new nb("Sysvar1nstructions1111111111111111111111111"),new nb("SysvarRecentB1ockHashes11111111111111111111")),Eb=new nb("SysvarRent111111111111111111111111111111111"),Ib=(new nb("SysvarRewards111111111111111111111111111111"),new nb("SysvarS1otHashes111111111111111111111111111"),new nb("SysvarS1otHistory11111111111111111111111111"),new nb("SysvarStakeHistory1111111111111111111111111"));async function Sb(t,e,n,r){const i=r&&{skipPreflight:r.skipPreflight,preflightCommitment:r.preflightCommitment||r.commitment,maxRetries:r.maxRetries,minContextSlot:r.minContextSlot},o=await t.sendTransaction(e,n,i);let s;if(null!=e.recentBlockhash&&null!=e.lastValidBlockHeight)s=(await t.confirmTransaction({abortSignal:r?.abortSignal,signature:o,blockhash:e.recentBlockhash,lastValidBlockHeight:e.lastValidBlockHeight},r&&r.commitment)).value;else if(null!=e.minNonceContextSlot&&null!=e.nonceInfo){const{nonceInstruction:n}=e.nonceInfo,i=n.keys[0].pubkey;s=(await t.confirmTransaction({abortSignal:r?.abortSignal,minContextSlot:e.minNonceContextSlot,nonceAccountPubkey:i,nonceValue:e.nonceInfo.nonce,signature:o},r&&r.commitment)).value}else null!=r?.abortSignal&&qv.warn("sendAndConfirmTransaction(): A transaction with a deprecated confirmation strategy was supplied along with an `abortSignal`. Only transactions having `lastValidBlockHeight` or a combination of `nonceInfo` and `minNonceContextSlot` are abortable."),s=(await t.confirmTransaction(o,r&&r.commitment)).value;if(s.err)throw new Error(`Transaction ${o} failed (${JSON.stringify(s)})`);return o}function _b(t){return new Promise((e=>setTimeout(e,t)))}function kb(t,e){const n=t.layout.span>=0?t.layout.span:lb(t,e),r=Ig.Buffer.alloc(n),i=Object.assign({instruction:t.index},e);return t.layout.encode(i,r),r}const Ab=Py.nu64("lamportsPerSignature"),Tb=Py.struct([Py.u32("version"),Py.u32("state"),ub("authorizedPubkey"),ub("nonce"),Py.struct([Ab],"feeCalculator")]),xb=Tb.span;const Ob=(Rb=8,t=>{const e=(0,Py.blob)(Rb,t),{encode:n,decode:r}=(t=>({decode:t.decode.bind(t),encode:t.encode.bind(t)}))(e),i=e;return i.decode=(t,e)=>{const n=r(t,e);return(0,Cy.toBigIntLE)(Ig.Buffer.from(n))},i.encode=(t,e,r)=>{const i=(0,Cy.toBufferLE)(t,Rb);return n(i,e,r)},i});var Rb;const Mb=Object.freeze({Create:{index:0,layout:Py.struct([Py.u32("instruction"),Py.ns64("lamports"),Py.ns64("space"),ub("programId")])},Assign:{index:1,layout:Py.struct([Py.u32("instruction"),ub("programId")])},Transfer:{index:2,layout:Py.struct([Py.u32("instruction"),Ob("lamports")])},CreateWithSeed:{index:3,layout:Py.struct([Py.u32("instruction"),ub("base"),cb("seed"),Py.ns64("lamports"),Py.ns64("space"),ub("programId")])},AdvanceNonceAccount:{index:4,layout:Py.struct([Py.u32("instruction")])},WithdrawNonceAccount:{index:5,layout:Py.struct([Py.u32("instruction"),Py.ns64("lamports")])},InitializeNonceAccount:{index:6,layout:Py.struct([Py.u32("instruction"),ub("authorized")])},AuthorizeNonceAccount:{index:7,layout:Py.struct([Py.u32("instruction"),ub("authorized")])},Allocate:{index:8,layout:Py.struct([Py.u32("instruction"),Py.ns64("space")])},AllocateWithSeed:{index:9,layout:Py.struct([Py.u32("instruction"),ub("base"),cb("seed"),Py.ns64("space"),ub("programId")])},AssignWithSeed:{index:10,layout:Py.struct([Py.u32("instruction"),ub("base"),cb("seed"),ub("programId")])},TransferWithSeed:{index:11,layout:Py.struct([Py.u32("instruction"),Ob("lamports"),cb("seed"),ub("programId")])},UpgradeNonceAccount:{index:12,layout:Py.struct([Py.u32("instruction")])}});class Pb{constructor(){}static createAccount(t){const e=kb(Mb.Create,{lamports:t.lamports,space:t.space,programId:Jv(t.programId.toBuffer())});return new yb({keys:[{pubkey:t.fromPubkey,isSigner:!0,isWritable:!0},{pubkey:t.newAccountPubkey,isSigner:!0,isWritable:!0}],programId:this.programId,data:e})}static transfer(t){let e,n;if("basePubkey"in t){e=kb(Mb.TransferWithSeed,{lamports:BigInt(t.lamports),seed:t.seed,programId:Jv(t.programId.toBuffer())}),n=[{pubkey:t.fromPubkey,isSigner:!1,isWritable:!0},{pubkey:t.basePubkey,isSigner:!0,isWritable:!1},{pubkey:t.toPubkey,isSigner:!1,isWritable:!0}]}else{e=kb(Mb.Transfer,{lamports:BigInt(t.lamports)}),n=[{pubkey:t.fromPubkey,isSigner:!0,isWritable:!0},{pubkey:t.toPubkey,isSigner:!1,isWritable:!0}]}return new yb({keys:n,programId:this.programId,data:e})}static assign(t){let e,n;if("basePubkey"in t){e=kb(Mb.AssignWithSeed,{base:Jv(t.basePubkey.toBuffer()),seed:t.seed,programId:Jv(t.programId.toBuffer())}),n=[{pubkey:t.accountPubkey,isSigner:!1,isWritable:!0},{pubkey:t.basePubkey,isSigner:!0,isWritable:!1}]}else{e=kb(Mb.Assign,{programId:Jv(t.programId.toBuffer())}),n=[{pubkey:t.accountPubkey,isSigner:!0,isWritable:!0}]}return new yb({keys:n,programId:this.programId,data:e})}static createAccountWithSeed(t){const e=kb(Mb.CreateWithSeed,{base:Jv(t.basePubkey.toBuffer()),seed:t.seed,lamports:t.lamports,space:t.space,programId:Jv(t.programId.toBuffer())});let n=[{pubkey:t.fromPubkey,isSigner:!0,isWritable:!0},{pubkey:t.newAccountPubkey,isSigner:!1,isWritable:!0}];return t.basePubkey!=t.fromPubkey&&n.push({pubkey:t.basePubkey,isSigner:!0,isWritable:!1}),new yb({keys:n,programId:this.programId,data:e})}static createNonceAccount(t){const e=new vb;"basePubkey"in t&&"seed"in t?e.add(Pb.createAccountWithSeed({fromPubkey:t.fromPubkey,newAccountPubkey:t.noncePubkey,basePubkey:t.basePubkey,seed:t.seed,lamports:t.lamports,space:xb,programId:this.programId})):e.add(Pb.createAccount({fromPubkey:t.fromPubkey,newAccountPubkey:t.noncePubkey,lamports:t.lamports,space:xb,programId:this.programId}));const n={noncePubkey:t.noncePubkey,authorizedPubkey:t.authorizedPubkey};return e.add(this.nonceInitialize(n)),e}static nonceInitialize(t){const e=kb(Mb.InitializeNonceAccount,{authorized:Jv(t.authorizedPubkey.toBuffer())}),n={keys:[{pubkey:t.noncePubkey,isSigner:!1,isWritable:!0},{pubkey:wb,isSigner:!1,isWritable:!1},{pubkey:Eb,isSigner:!1,isWritable:!1}],programId:this.programId,data:e};return new yb(n)}static nonceAdvance(t){const e=kb(Mb.AdvanceNonceAccount),n={keys:[{pubkey:t.noncePubkey,isSigner:!1,isWritable:!0},{pubkey:wb,isSigner:!1,isWritable:!1},{pubkey:t.authorizedPubkey,isSigner:!0,isWritable:!1}],programId:this.programId,data:e};return new yb(n)}static nonceWithdraw(t){const e=kb(Mb.WithdrawNonceAccount,{lamports:t.lamports});return new yb({keys:[{pubkey:t.noncePubkey,isSigner:!1,isWritable:!0},{pubkey:t.toPubkey,isSigner:!1,isWritable:!0},{pubkey:wb,isSigner:!1,isWritable:!1},{pubkey:Eb,isSigner:!1,isWritable:!1},{pubkey:t.authorizedPubkey,isSigner:!0,isWritable:!1}],programId:this.programId,data:e})}static nonceAuthorize(t){const e=kb(Mb.AuthorizeNonceAccount,{authorized:Jv(t.newAuthorizedPubkey.toBuffer())});return new yb({keys:[{pubkey:t.noncePubkey,isSigner:!1,isWritable:!0},{pubkey:t.authorizedPubkey,isSigner:!0,isWritable:!1}],programId:this.programId,data:e})}static allocate(t){let e,n;if("basePubkey"in t){e=kb(Mb.AllocateWithSeed,{base:Jv(t.basePubkey.toBuffer()),seed:t.seed,space:t.space,programId:Jv(t.programId.toBuffer())}),n=[{pubkey:t.accountPubkey,isSigner:!1,isWritable:!0},{pubkey:t.basePubkey,isSigner:!0,isWritable:!1}]}else{e=kb(Mb.Allocate,{space:t.space}),n=[{pubkey:t.accountPubkey,isSigner:!0,isWritable:!0}]}return new yb({keys:n,programId:this.programId,data:e})}}Pb.programId=new nb("11111111111111111111111111111111");class Cb{constructor(){}static getMinNumSignatures(t){return 2*(Math.ceil(t/Cb.chunkSize)+1+1)}static async load(t,e,n,r,i){{const o=await t.getMinimumBalanceForRentExemption(i.length),s=await t.getAccountInfo(n.publicKey,"confirmed");let a=null;if(null!==s){if(s.executable)return qv.error("Program load failed, account is already executable"),!1;s.data.length!==i.length&&(a=a||new vb,a.add(Pb.allocate({accountPubkey:n.publicKey,space:i.length}))),s.owner.equals(r)||(a=a||new vb,a.add(Pb.assign({accountPubkey:n.publicKey,programId:r}))),s.lamports<o&&(a=a||new vb,a.add(Pb.transfer({fromPubkey:e.publicKey,toPubkey:n.publicKey,lamports:o-s.lamports})))}else a=(new vb).add(Pb.createAccount({fromPubkey:e.publicKey,newAccountPubkey:n.publicKey,lamports:o>0?o:1,space:i.length,programId:r}));null!==a&&await Sb(t,a,[e,n],{commitment:"confirmed"})}const o=Py.struct([Py.u32("instruction"),Py.u32("offset"),Py.u32("bytesLength"),Py.u32("bytesLengthPadding"),Py.seq(Py.u8("byte"),Py.offset(Py.u32(),-8),"bytes")]),s=Cb.chunkSize;let a=0,u=i,c=[];for(;u.length>0;){const i=u.slice(0,s),l=Ig.Buffer.alloc(s+16);o.encode({instruction:0,offset:a,bytes:i,bytesLength:0,bytesLengthPadding:0},l);const h=(new vb).add({keys:[{pubkey:n.publicKey,isSigner:!0,isWritable:!0}],programId:r,data:l});if(c.push(Sb(t,h,[e,n],{commitment:"confirmed"})),t._rpcEndpoint.includes("solana.com")){const t=4;await _b(1e3/t)}a+=s,u=u.slice(s)}await Promise.all(c);{const i=Py.struct([Py.u32("instruction")]),o=Ig.Buffer.alloc(i.span);i.encode({instruction:1},o);const s=(new vb).add({keys:[{pubkey:n.publicKey,isSigner:!0,isWritable:!0},{pubkey:Eb,isSigner:!1,isWritable:!1}],programId:r,data:o}),a="processed",u=await t.sendTransaction(s,[e,n],{preflightCommitment:a}),{context:c,value:l}=await t.confirmTransaction({signature:u,lastValidBlockHeight:s.lastValidBlockHeight,blockhash:s.recentBlockhash},a);if(l.err)throw new Error(`Transaction ${u} failed (${JSON.stringify(l)})`);for(;;){try{if(await t.getSlot({commitment:a})>c.slot)break}catch{}await new Promise((t=>setTimeout(t,Math.round(200))))}}return!0}}Cb.chunkSize=932;new nb("BPFLoader2111111111111111111111111111111111");Object.prototype.toString,Object.keys;Error;Error;globalThis.fetch;av.default;Py.struct([Py.u32("typeIndex"),Ob("deactivationSlot"),Py.nu64("lastExtendedSlot"),Py.u8("lastExtendedStartIndex"),Py.u8(),Py.seq(ub(),Py.offset(Py.u8(),-1),"authority")]);const Nb=sv(Gy(nb),ev(),(t=>new nb(t))),Lb=nv([ev(),Jy("base64")]),Bb=sv(Gy(Ig.Buffer),Lb,(t=>Ig.Buffer.from(t[0],"base64")));function Db(t){return iv([rv({jsonrpc:Jy("2.0"),id:ev(),result:t}),rv({jsonrpc:Jy("2.0"),id:ev(),error:rv({code:ov(),message:ev(),data:Zy(Wy("any",(()=>!0)))})})])}const Ub=Db(ov());function jb(t){return sv(Db(t),Ub,(e=>"error"in e?e:{...e,result:zy(e.result,t)}))}function Fb(t){return jb(rv({context:rv({slot:Yy()}),value:t}))}function Vb(t){return rv({context:rv({slot:Yy()}),value:t})}const zb=rv({foundation:Yy(),foundationTerm:Yy(),initial:Yy(),taper:Yy(),terminal:Yy()}),qb=(jb(Hy(Xy(rv({epoch:Yy(),effectiveSlot:Yy(),amount:Yy(),postBalance:Yy(),commission:Zy(Xy(Yy()))})))),Hy(rv({slot:Yy(),prioritizationFee:Yy()}))),$b=rv({total:Yy(),validator:Yy(),foundation:Yy(),epoch:Yy()}),Wb=rv({epoch:Yy(),slotIndex:Yy(),slotsInEpoch:Yy(),absoluteSlot:Yy(),blockHeight:Zy(Yy()),transactionCount:Zy(Yy())}),Hb=rv({slotsPerEpoch:Yy(),leaderScheduleSlotOffset:Yy(),warmup:Ky(),firstNormalEpoch:Yy(),firstNormalSlot:Yy()}),Kb=tv(ev(),Hy(Yy())),Gb=Xy(iv([rv({}),ev()])),Jb=rv({err:Gb}),Qb=Jy("receivedSignature");rv({"solana-core":ev(),"feature-set":Zy(Yy())}),Fb(rv({err:Xy(iv([rv({}),ev()])),logs:Xy(Hy(ev())),accounts:Zy(Xy(Hy(Xy(rv({executable:Ky(),owner:ev(),lamports:Yy(),data:Hy(ev()),rentEpoch:Zy(Yy())}))))),unitsConsumed:Zy(Yy()),returnData:Zy(Xy(rv({programId:ev(),data:nv([ev(),Jy("base64")])})))})),Fb(rv({byIdentity:tv(ev(),Hy(Yy())),range:rv({firstSlot:Yy(),lastSlot:Yy()})}));jb(zb),jb($b),jb(qb),jb(Wb),jb(Hb),jb(Kb),jb(Yy()),Fb(rv({total:Yy(),circulating:Yy(),nonCirculating:Yy(),nonCirculatingAccounts:Hy(Nb)}));const Xb=rv({amount:ev(),uiAmount:Xy(Yy()),decimals:Yy(),uiAmountString:Zy(ev())}),Yb=(Fb(Hy(rv({address:Nb,amount:ev(),uiAmount:Xy(Yy()),decimals:Yy(),uiAmountString:Zy(ev())}))),Fb(Hy(rv({pubkey:Nb,account:rv({executable:Ky(),owner:Nb,lamports:Yy(),data:Bb,rentEpoch:Yy()})}))),rv({program:ev(),parsed:ov(),space:Yy()})),Zb=(Fb(Hy(rv({pubkey:Nb,account:rv({executable:Ky(),owner:Nb,lamports:Yy(),data:Yb,rentEpoch:Yy()})}))),Fb(Hy(rv({lamports:Yy(),address:Nb}))),rv({executable:Ky(),owner:Nb,lamports:Yy(),data:Bb,rentEpoch:Yy()})),tw=(rv({pubkey:Nb,account:Zb}),sv(iv([Gy(Ig.Buffer),Yb]),iv([Lb,Yb]),(t=>Array.isArray(t)?zy(t,Bb):t))),ew=rv({executable:Ky(),owner:Nb,lamports:Yy(),data:tw,rentEpoch:Yy()}),nw=(rv({pubkey:Nb,account:ew}),rv({state:iv([Jy("active"),Jy("inactive"),Jy("activating"),Jy("deactivating")]),active:Yy(),inactive:Yy()}),jb(Hy(rv({signature:ev(),slot:Yy(),err:Gb,memo:Xy(ev()),blockTime:Zy(Xy(Yy()))}))),jb(Hy(rv({signature:ev(),slot:Yy(),err:Gb,memo:Xy(ev()),blockTime:Zy(Xy(Yy()))}))),rv({subscription:Yy(),result:Vb(Zb)}),rv({pubkey:Nb,account:Zb})),rw=(rv({subscription:Yy(),result:Vb(nw)}),rv({parent:Yy(),slot:Yy(),root:Yy()})),iw=(rv({subscription:Yy(),result:rw}),iv([rv({type:iv([Jy("firstShredReceived"),Jy("completed"),Jy("optimisticConfirmation"),Jy("root")]),slot:Yy(),timestamp:Yy()}),rv({type:Jy("createdBank"),parent:Yy(),slot:Yy(),timestamp:Yy()}),rv({type:Jy("frozen"),slot:Yy(),timestamp:Yy(),stats:rv({numTransactionEntries:Yy(),numSuccessfulTransactions:Yy(),numFailedTransactions:Yy(),maxTransactionsPerEntry:Yy()})}),rv({type:Jy("dead"),slot:Yy(),timestamp:Yy(),err:ev()})])),ow=(rv({subscription:Yy(),result:iw}),rv({subscription:Yy(),result:Vb(iv([Jb,Qb]))}),rv({subscription:Yy(),result:Yy()}),rv({pubkey:ev(),gossip:Xy(ev()),tpu:Xy(ev()),rpc:Xy(ev()),version:Xy(ev())}),rv({votePubkey:ev(),nodePubkey:ev(),activatedStake:Yy(),epochVoteAccount:Ky(),epochCredits:Hy(nv([Yy(),Yy(),Yy()])),commission:Yy(),lastVote:Yy(),rootSlot:Xy(Yy())})),sw=(jb(rv({current:Hy(ow),delinquent:Hy(ow)})),iv([Jy("processed"),Jy("confirmed"),Jy("finalized")])),aw=rv({slot:Yy(),confirmations:Xy(Yy()),err:Gb,confirmationStatus:Zy(sw)}),uw=(Fb(Hy(Xy(aw))),jb(Yy()),rv({accountKey:Nb,writableIndexes:Hy(Yy()),readonlyIndexes:Hy(Yy())})),cw=rv({signatures:Hy(ev()),message:rv({accountKeys:Hy(ev()),header:rv({numRequiredSignatures:Yy(),numReadonlySignedAccounts:Yy(),numReadonlyUnsignedAccounts:Yy()}),instructions:Hy(rv({accounts:Hy(Yy()),data:ev(),programIdIndex:Yy()})),recentBlockhash:ev(),addressTableLookups:Zy(Hy(uw))})}),lw=rv({pubkey:Nb,signer:Ky(),writable:Ky(),source:Zy(iv([Jy("transaction"),Jy("lookupTable")]))}),hw=rv({accountKeys:Hy(lw),signatures:Hy(ev())}),fw=rv({parsed:ov(),program:ev(),programId:Nb}),dw=rv({accounts:Hy(Nb),data:ev(),programId:Nb}),pw=sv(iv([dw,fw]),iv([rv({parsed:ov(),program:ev(),programId:ev()}),rv({accounts:Hy(ev()),data:ev(),programId:ev()})]),(t=>zy(t,"accounts"in t?dw:fw))),gw=rv({signatures:Hy(ev()),message:rv({accountKeys:Hy(lw),instructions:Hy(pw),recentBlockhash:ev(),addressTableLookups:Zy(Xy(Hy(uw)))})}),mw=rv({accountIndex:Yy(),mint:ev(),owner:Zy(ev()),uiTokenAmount:Xb}),yw=rv({writable:Hy(Nb),readonly:Hy(Nb)}),vw=rv({err:Gb,fee:Yy(),innerInstructions:Zy(Xy(Hy(rv({index:Yy(),instructions:Hy(rv({accounts:Hy(Yy()),data:ev(),programIdIndex:Yy()}))})))),preBalances:Hy(Yy()),postBalances:Hy(Yy()),logMessages:Zy(Xy(Hy(ev()))),preTokenBalances:Zy(Xy(Hy(mw))),postTokenBalances:Zy(Xy(Hy(mw))),loadedAddresses:Zy(yw),computeUnitsConsumed:Zy(Yy())}),bw=rv({err:Gb,fee:Yy(),innerInstructions:Zy(Xy(Hy(rv({index:Yy(),instructions:Hy(pw)})))),preBalances:Hy(Yy()),postBalances:Hy(Yy()),logMessages:Zy(Xy(Hy(ev()))),preTokenBalances:Zy(Xy(Hy(mw))),postTokenBalances:Zy(Xy(Hy(mw))),loadedAddresses:Zy(yw),computeUnitsConsumed:Zy(Yy())}),ww=iv([Jy(0),Jy("legacy")]),Ew=rv({pubkey:ev(),lamports:Yy(),postBalance:Xy(Yy()),rewardType:Xy(ev()),commission:Zy(Xy(Yy()))}),Iw=(jb(Xy(rv({blockhash:ev(),previousBlockhash:ev(),parentSlot:Yy(),transactions:Hy(rv({transaction:cw,meta:Xy(vw),version:Zy(ww)})),rewards:Zy(Hy(Ew)),blockTime:Xy(Yy()),blockHeight:Xy(Yy())}))),jb(Xy(rv({blockhash:ev(),previousBlockhash:ev(),parentSlot:Yy(),rewards:Zy(Hy(Ew)),blockTime:Xy(Yy()),blockHeight:Xy(Yy())}))),jb(Xy(rv({blockhash:ev(),previousBlockhash:ev(),parentSlot:Yy(),transactions:Hy(rv({transaction:hw,meta:Xy(vw),version:Zy(ww)})),rewards:Zy(Hy(Ew)),blockTime:Xy(Yy()),blockHeight:Xy(Yy())}))),jb(Xy(rv({blockhash:ev(),previousBlockhash:ev(),parentSlot:Yy(),transactions:Hy(rv({transaction:gw,meta:Xy(bw),version:Zy(ww)})),rewards:Zy(Hy(Ew)),blockTime:Xy(Yy()),blockHeight:Xy(Yy())}))),jb(Xy(rv({blockhash:ev(),previousBlockhash:ev(),parentSlot:Yy(),transactions:Hy(rv({transaction:hw,meta:Xy(bw),version:Zy(ww)})),rewards:Zy(Hy(Ew)),blockTime:Xy(Yy()),blockHeight:Xy(Yy())}))),jb(Xy(rv({blockhash:ev(),previousBlockhash:ev(),parentSlot:Yy(),rewards:Zy(Hy(Ew)),blockTime:Xy(Yy()),blockHeight:Xy(Yy())}))),jb(Xy(rv({blockhash:ev(),previousBlockhash:ev(),parentSlot:Yy(),transactions:Hy(rv({transaction:cw,meta:Xy(vw)})),rewards:Zy(Hy(Ew)),blockTime:Xy(Yy())}))),jb(Xy(rv({blockhash:ev(),previousBlockhash:ev(),parentSlot:Yy(),signatures:Hy(ev()),blockTime:Xy(Yy())}))),jb(Xy(rv({slot:Yy(),meta:Xy(vw),blockTime:Zy(Xy(Yy())),transaction:cw,version:Zy(ww)}))),jb(Xy(rv({slot:Yy(),transaction:gw,meta:Xy(bw),blockTime:Zy(Xy(Yy())),version:Zy(ww)}))),Fb(rv({blockhash:ev(),feeCalculator:rv({lamportsPerSignature:Yy()})})),Fb(rv({blockhash:ev(),lastValidBlockHeight:Yy()})),Fb(Ky()),jb(Hy(rv({slot:Yy(),numTransactions:Yy(),numSlots:Yy(),samplePeriodSecs:Yy()}))),Fb(Xy(rv({feeCalculator:rv({lamportsPerSignature:Yy()})}))),jb(ev()),jb(ev()),rv({err:Gb,logs:Hy(ev()),signature:ev()}));rv({result:Vb(Iw),subscription:Yy()});class Sw{constructor(t){this._keypair=void 0,this._keypair=t??$v()}static generate(){return new Sw($v())}static fromSecretKey(t,e){if(64!==t.byteLength)throw new Error("bad secret key size");const n=t.slice(32,64);if(!e||!e.skipValidation){const e=t.slice(0,32),r=Wv(e);for(let t=0;t<32;t++)if(n[t]!==r[t])throw new Error("provided secretKey is invalid")}return new Sw({publicKey:n,secretKey:t})}static fromSeed(t){const e=Wv(t),n=new Uint8Array(64);return n.set(t),n.set(e,32),new Sw({publicKey:e,secretKey:n})}get publicKey(){return new nb(this._keypair.publicKey)}get secretKey(){return new Uint8Array(this._keypair.secretKey)}}const _w=Object.freeze({CreateLookupTable:{index:0,layout:Py.struct([Py.u32("instruction"),Ob("recentSlot"),Py.u8("bumpSeed")])},FreezeLookupTable:{index:1,layout:Py.struct([Py.u32("instruction")])},ExtendLookupTable:{index:2,layout:Py.struct([Py.u32("instruction"),Ob(),Py.seq(ub(),Py.offset(Py.u32(),-8),"addresses")])},DeactivateLookupTable:{index:3,layout:Py.struct([Py.u32("instruction")])},CloseLookupTable:{index:4,layout:Py.struct([Py.u32("instruction")])}});class kw{constructor(){}static createLookupTable(t){const[e,n]=nb.findProgramAddressSync([t.authority.toBuffer(),(0,Cy.toBufferLE)(BigInt(t.recentSlot),8)],this.programId),r=kb(_w.CreateLookupTable,{recentSlot:BigInt(t.recentSlot),bumpSeed:n}),i=[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:t.authority,isSigner:!0,isWritable:!1},{pubkey:t.payer,isSigner:!0,isWritable:!0},{pubkey:Pb.programId,isSigner:!1,isWritable:!1}];return[new yb({programId:this.programId,keys:i,data:r}),e]}static freezeLookupTable(t){const e=kb(_w.FreezeLookupTable),n=[{pubkey:t.lookupTable,isSigner:!1,isWritable:!0},{pubkey:t.authority,isSigner:!0,isWritable:!1}];return new yb({programId:this.programId,keys:n,data:e})}static extendLookupTable(t){const e=kb(_w.ExtendLookupTable,{addresses:t.addresses.map((t=>t.toBytes()))}),n=[{pubkey:t.lookupTable,isSigner:!1,isWritable:!0},{pubkey:t.authority,isSigner:!0,isWritable:!1}];return t.payer&&n.push({pubkey:t.payer,isSigner:!0,isWritable:!0},{pubkey:Pb.programId,isSigner:!1,isWritable:!1}),new yb({programId:this.programId,keys:n,data:e})}static deactivateLookupTable(t){const e=kb(_w.DeactivateLookupTable),n=[{pubkey:t.lookupTable,isSigner:!1,isWritable:!0},{pubkey:t.authority,isSigner:!0,isWritable:!1}];return new yb({programId:this.programId,keys:n,data:e})}static closeLookupTable(t){const e=kb(_w.CloseLookupTable),n=[{pubkey:t.lookupTable,isSigner:!1,isWritable:!0},{pubkey:t.authority,isSigner:!0,isWritable:!1},{pubkey:t.recipient,isSigner:!1,isWritable:!0}];return new yb({programId:this.programId,keys:n,data:e})}}kw.programId=new nb("AddressLookupTab1e1111111111111111111111111");const Aw=Object.freeze({RequestUnits:{index:0,layout:Py.struct([Py.u8("instruction"),Py.u32("units"),Py.u32("additionalFee")])},RequestHeapFrame:{index:1,layout:Py.struct([Py.u8("instruction"),Py.u32("bytes")])},SetComputeUnitLimit:{index:2,layout:Py.struct([Py.u8("instruction"),Py.u32("units")])},SetComputeUnitPrice:{index:3,layout:Py.struct([Py.u8("instruction"),Ob("microLamports")])}});class Tw{constructor(){}static requestUnits(t){const e=kb(Aw.RequestUnits,t);return new yb({keys:[],programId:this.programId,data:e})}static requestHeapFrame(t){const e=kb(Aw.RequestHeapFrame,t);return new yb({keys:[],programId:this.programId,data:e})}static setComputeUnitLimit(t){const e=kb(Aw.SetComputeUnitLimit,t);return new yb({keys:[],programId:this.programId,data:e})}static setComputeUnitPrice(t){const e=kb(Aw.SetComputeUnitPrice,{microLamports:BigInt(t.microLamports)});return new yb({keys:[],programId:this.programId,data:e})}}Tw.programId=new nb("ComputeBudget111111111111111111111111111111");const xw=Py.struct([Py.u8("numSignatures"),Py.u8("padding"),Py.u16("signatureOffset"),Py.u16("signatureInstructionIndex"),Py.u16("publicKeyOffset"),Py.u16("publicKeyInstructionIndex"),Py.u16("messageDataOffset"),Py.u16("messageDataSize"),Py.u16("messageInstructionIndex")]);class Ow{constructor(){}static createInstructionWithPublicKey(t){const{publicKey:e,message:n,signature:r,instructionIndex:i}=t;db(32===e.length,`Public Key must be 32 bytes but received ${e.length} bytes`),db(64===r.length,`Signature must be 64 bytes but received ${r.length} bytes`);const o=xw.span,s=o+e.length,a=s+r.length,u=Ig.Buffer.alloc(a+n.length),c=null==i?65535:i;return xw.encode({numSignatures:1,padding:0,signatureOffset:s,signatureInstructionIndex:c,publicKeyOffset:o,publicKeyInstructionIndex:c,messageDataOffset:a,messageDataSize:n.length,messageInstructionIndex:c},u),u.fill(e,o),u.fill(r,s),u.fill(n,a),new yb({keys:[],programId:Ow.programId,data:u})}static createInstructionWithPrivateKey(t){const{privateKey:e,message:n,instructionIndex:r}=t;db(64===e.length,`Private key must be 64 bytes but received ${e.length} bytes`);try{const t=Sw.fromSecretKey(e),i=t.publicKey.toBytes(),o=Kv(n,t.secretKey);return this.createInstructionWithPublicKey({publicKey:i,message:n,signature:o,instructionIndex:r})}catch(t){throw new Error(`Error creating instruction; ${t}`)}}}Ow.programId=new nb("Ed25519SigVerify111111111111111111111111111");zv.utils.isValidPrivateKey;const Rw=zv.getPublicKey,Mw=Py.struct([Py.u8("numSignatures"),Py.u16("signatureOffset"),Py.u8("signatureInstructionIndex"),Py.u16("ethAddressOffset"),Py.u8("ethAddressInstructionIndex"),Py.u16("messageDataOffset"),Py.u16("messageDataSize"),Py.u8("messageInstructionIndex"),Py.blob(20,"ethAddress"),Py.blob(64,"signature"),Py.u8("recoveryId")]);class Pw{constructor(){}static publicKeyToEthAddress(t){db(64===t.length,`Public key must be 64 bytes but received ${t.length} bytes`);try{return Ig.Buffer.from(Sv(Jv(t))).slice(-20)}catch(t){throw new Error(`Error constructing Ethereum address: ${t}`)}}static createInstructionWithPublicKey(t){const{publicKey:e,message:n,signature:r,recoveryId:i,instructionIndex:o}=t;return Pw.createInstructionWithEthAddress({ethAddress:Pw.publicKeyToEthAddress(e),message:n,signature:r,recoveryId:i,instructionIndex:o})}static createInstructionWithEthAddress(t){const{ethAddress:e,message:n,signature:r,recoveryId:i,instructionIndex:o=0}=t;let s;s="string"==typeof e?e.startsWith("0x")?Ig.Buffer.from(e.substr(2),"hex"):Ig.Buffer.from(e,"hex"):e,db(20===s.length,`Address must be 20 bytes but received ${s.length} bytes`);const a=12+s.length,u=a+r.length+1,c=Ig.Buffer.alloc(Mw.span+n.length);return Mw.encode({numSignatures:1,signatureOffset:a,signatureInstructionIndex:o,ethAddressOffset:12,ethAddressInstructionIndex:o,messageDataOffset:u,messageDataSize:n.length,messageInstructionIndex:o,signature:Jv(r),ethAddress:Jv(s),recoveryId:i},c),c.fill(Jv(n),Mw.span),new yb({keys:[],programId:Pw.programId,data:c})}static createInstructionWithPrivateKey(t){const{privateKey:e,message:n,instructionIndex:r}=t;db(32===e.length,`Private key must be 32 bytes but received ${e.length} bytes`);try{const t=Jv(e),i=Rw(t,!1).slice(1),o=Ig.Buffer.from(Sv(Jv(n))),[s,a]=((t,e)=>{const n=zv.sign(t,e);return[n.toCompactRawBytes(),n.recovery]})(o,t);return this.createInstructionWithPublicKey({publicKey:i,message:n,signature:s,recoveryId:a,instructionIndex:r})}catch(t){throw new Error(`Error creating instruction; ${t}`)}}}var Cw;Pw.programId=new nb("KeccakSecp256k11111111111111111111111111111");const Nw=new nb("StakeConfig11111111111111111111111111111111");class Lw{constructor(t,e,n){this.unixTimestamp=void 0,this.epoch=void 0,this.custodian=void 0,this.unixTimestamp=t,this.epoch=e,this.custodian=n}}Cw=Lw,Lw.default=new Cw(0,0,nb.default);const Bw=Object.freeze({Initialize:{index:0,layout:Py.struct([Py.u32("instruction"),((t="authorized")=>Py.struct([ub("staker"),ub("withdrawer")],t))(),((t="lockup")=>Py.struct([Py.ns64("unixTimestamp"),Py.ns64("epoch"),ub("custodian")],t))()])},Authorize:{index:1,layout:Py.struct([Py.u32("instruction"),ub("newAuthorized"),Py.u32("stakeAuthorizationType")])},Delegate:{index:2,layout:Py.struct([Py.u32("instruction")])},Split:{index:3,layout:Py.struct([Py.u32("instruction"),Py.ns64("lamports")])},Withdraw:{index:4,layout:Py.struct([Py.u32("instruction"),Py.ns64("lamports")])},Deactivate:{index:5,layout:Py.struct([Py.u32("instruction")])},Merge:{index:7,layout:Py.struct([Py.u32("instruction")])},AuthorizeWithSeed:{index:8,layout:Py.struct([Py.u32("instruction"),ub("newAuthorized"),Py.u32("stakeAuthorizationType"),cb("authoritySeed"),ub("authorityOwner")])}});Object.freeze({Staker:{index:0},Withdrawer:{index:1}});class Dw{constructor(){}static initialize(t){const{stakePubkey:e,authorized:n,lockup:r}=t,i=r||Lw.default,o=kb(Bw.Initialize,{authorized:{staker:Jv(n.staker.toBuffer()),withdrawer:Jv(n.withdrawer.toBuffer())},lockup:{unixTimestamp:i.unixTimestamp,epoch:i.epoch,custodian:Jv(i.custodian.toBuffer())}}),s={keys:[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:Eb,isSigner:!1,isWritable:!1}],programId:this.programId,data:o};return new yb(s)}static createAccountWithSeed(t){const e=new vb;e.add(Pb.createAccountWithSeed({fromPubkey:t.fromPubkey,newAccountPubkey:t.stakePubkey,basePubkey:t.basePubkey,seed:t.seed,lamports:t.lamports,space:this.space,programId:this.programId}));const{stakePubkey:n,authorized:r,lockup:i}=t;return e.add(this.initialize({stakePubkey:n,authorized:r,lockup:i}))}static createAccount(t){const e=new vb;e.add(Pb.createAccount({fromPubkey:t.fromPubkey,newAccountPubkey:t.stakePubkey,lamports:t.lamports,space:this.space,programId:this.programId}));const{stakePubkey:n,authorized:r,lockup:i}=t;return e.add(this.initialize({stakePubkey:n,authorized:r,lockup:i}))}static delegate(t){const{stakePubkey:e,authorizedPubkey:n,votePubkey:r}=t,i=kb(Bw.Delegate);return(new vb).add({keys:[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:r,isSigner:!1,isWritable:!1},{pubkey:bb,isSigner:!1,isWritable:!1},{pubkey:Ib,isSigner:!1,isWritable:!1},{pubkey:Nw,isSigner:!1,isWritable:!1},{pubkey:n,isSigner:!0,isWritable:!1}],programId:this.programId,data:i})}static authorize(t){const{stakePubkey:e,authorizedPubkey:n,newAuthorizedPubkey:r,stakeAuthorizationType:i,custodianPubkey:o}=t,s=kb(Bw.Authorize,{newAuthorized:Jv(r.toBuffer()),stakeAuthorizationType:i.index}),a=[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:bb,isSigner:!1,isWritable:!0},{pubkey:n,isSigner:!0,isWritable:!1}];return o&&a.push({pubkey:o,isSigner:!1,isWritable:!1}),(new vb).add({keys:a,programId:this.programId,data:s})}static authorizeWithSeed(t){const{stakePubkey:e,authorityBase:n,authoritySeed:r,authorityOwner:i,newAuthorizedPubkey:o,stakeAuthorizationType:s,custodianPubkey:a}=t,u=kb(Bw.AuthorizeWithSeed,{newAuthorized:Jv(o.toBuffer()),stakeAuthorizationType:s.index,authoritySeed:r,authorityOwner:Jv(i.toBuffer())}),c=[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:n,isSigner:!0,isWritable:!1},{pubkey:bb,isSigner:!1,isWritable:!1}];return a&&c.push({pubkey:a,isSigner:!1,isWritable:!1}),(new vb).add({keys:c,programId:this.programId,data:u})}static splitInstruction(t){const{stakePubkey:e,authorizedPubkey:n,splitStakePubkey:r,lamports:i}=t,o=kb(Bw.Split,{lamports:i});return new yb({keys:[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:r,isSigner:!1,isWritable:!0},{pubkey:n,isSigner:!0,isWritable:!1}],programId:this.programId,data:o})}static split(t){const e=new vb;return e.add(Pb.createAccount({fromPubkey:t.authorizedPubkey,newAccountPubkey:t.splitStakePubkey,lamports:0,space:this.space,programId:this.programId})),e.add(this.splitInstruction(t))}static splitWithSeed(t){const{stakePubkey:e,authorizedPubkey:n,splitStakePubkey:r,basePubkey:i,seed:o,lamports:s}=t,a=new vb;return a.add(Pb.allocate({accountPubkey:r,basePubkey:i,seed:o,space:this.space,programId:this.programId})),a.add(this.splitInstruction({stakePubkey:e,authorizedPubkey:n,splitStakePubkey:r,lamports:s}))}static merge(t){const{stakePubkey:e,sourceStakePubKey:n,authorizedPubkey:r}=t,i=kb(Bw.Merge);return(new vb).add({keys:[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:n,isSigner:!1,isWritable:!0},{pubkey:bb,isSigner:!1,isWritable:!1},{pubkey:Ib,isSigner:!1,isWritable:!1},{pubkey:r,isSigner:!0,isWritable:!1}],programId:this.programId,data:i})}static withdraw(t){const{stakePubkey:e,authorizedPubkey:n,toPubkey:r,lamports:i,custodianPubkey:o}=t,s=kb(Bw.Withdraw,{lamports:i}),a=[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:r,isSigner:!1,isWritable:!0},{pubkey:bb,isSigner:!1,isWritable:!1},{pubkey:Ib,isSigner:!1,isWritable:!1},{pubkey:n,isSigner:!0,isWritable:!1}];return o&&a.push({pubkey:o,isSigner:!1,isWritable:!1}),(new vb).add({keys:a,programId:this.programId,data:s})}static deactivate(t){const{stakePubkey:e,authorizedPubkey:n}=t,r=kb(Bw.Deactivate);return(new vb).add({keys:[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:bb,isSigner:!1,isWritable:!1},{pubkey:n,isSigner:!0,isWritable:!1}],programId:this.programId,data:r})}}Dw.programId=new nb("Stake11111111111111111111111111111111111111"),Dw.space=200;const Uw=Object.freeze({InitializeAccount:{index:0,layout:Py.struct([Py.u32("instruction"),((t="voteInit")=>Py.struct([ub("nodePubkey"),ub("authorizedVoter"),ub("authorizedWithdrawer"),Py.u8("commission")],t))()])},Authorize:{index:1,layout:Py.struct([Py.u32("instruction"),ub("newAuthorized"),Py.u32("voteAuthorizationType")])},Withdraw:{index:3,layout:Py.struct([Py.u32("instruction"),Py.ns64("lamports")])},AuthorizeWithSeed:{index:10,layout:Py.struct([Py.u32("instruction"),((t="voteAuthorizeWithSeedArgs")=>Py.struct([Py.u32("voteAuthorizationType"),ub("currentAuthorityDerivedKeyOwnerPubkey"),cb("currentAuthorityDerivedKeySeed"),ub("newAuthorized")],t))()])}});Object.freeze({Voter:{index:0},Withdrawer:{index:1}});class jw{constructor(){}static initializeAccount(t){const{votePubkey:e,nodePubkey:n,voteInit:r}=t,i=kb(Uw.InitializeAccount,{voteInit:{nodePubkey:Jv(r.nodePubkey.toBuffer()),authorizedVoter:Jv(r.authorizedVoter.toBuffer()),authorizedWithdrawer:Jv(r.authorizedWithdrawer.toBuffer()),commission:r.commission}}),o={keys:[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:Eb,isSigner:!1,isWritable:!1},{pubkey:bb,isSigner:!1,isWritable:!1},{pubkey:n,isSigner:!0,isWritable:!1}],programId:this.programId,data:i};return new yb(o)}static createAccount(t){const e=new vb;return e.add(Pb.createAccount({fromPubkey:t.fromPubkey,newAccountPubkey:t.votePubkey,lamports:t.lamports,space:this.space,programId:this.programId})),e.add(this.initializeAccount({votePubkey:t.votePubkey,nodePubkey:t.voteInit.nodePubkey,voteInit:t.voteInit}))}static authorize(t){const{votePubkey:e,authorizedPubkey:n,newAuthorizedPubkey:r,voteAuthorizationType:i}=t,o=kb(Uw.Authorize,{newAuthorized:Jv(r.toBuffer()),voteAuthorizationType:i.index}),s=[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:bb,isSigner:!1,isWritable:!1},{pubkey:n,isSigner:!0,isWritable:!1}];return(new vb).add({keys:s,programId:this.programId,data:o})}static authorizeWithSeed(t){const{currentAuthorityDerivedKeyBasePubkey:e,currentAuthorityDerivedKeyOwnerPubkey:n,currentAuthorityDerivedKeySeed:r,newAuthorizedPubkey:i,voteAuthorizationType:o,votePubkey:s}=t,a=kb(Uw.AuthorizeWithSeed,{voteAuthorizeWithSeedArgs:{currentAuthorityDerivedKeyOwnerPubkey:Jv(n.toBuffer()),currentAuthorityDerivedKeySeed:r,newAuthorized:Jv(i.toBuffer()),voteAuthorizationType:o.index}}),u=[{pubkey:s,isSigner:!1,isWritable:!0},{pubkey:bb,isSigner:!1,isWritable:!1},{pubkey:e,isSigner:!0,isWritable:!1}];return(new vb).add({keys:u,programId:this.programId,data:a})}static withdraw(t){const{votePubkey:e,authorizedWithdrawerPubkey:n,lamports:r,toPubkey:i}=t,o=kb(Uw.Withdraw,{lamports:r}),s=[{pubkey:e,isSigner:!1,isWritable:!0},{pubkey:i,isSigner:!1,isWritable:!0},{pubkey:n,isSigner:!0,isWritable:!1}];return(new vb).add({keys:s,programId:this.programId,data:o})}static safeWithdraw(t,e,n){if(t.lamports>e-n)throw new Error("Withdraw will leave vote account with insuffcient funds.");return jw.withdraw(t)}}jw.programId=new nb("Vote111111111111111111111111111111111111111"),jw.space=3731;new nb("Va1idator1nfo111111111111111111111111111111"),rv({name:ev(),website:Zy(ev()),details:Zy(ev()),keybaseUsername:Zy(ev())});new nb("Vote111111111111111111111111111111111111111"),Py.struct([ub("nodePubkey"),ub("authorizedWithdrawer"),Py.u8("commission"),Py.nu64(),Py.seq(Py.struct([Py.nu64("slot"),Py.u32("confirmationCount")]),Py.offset(Py.u32(),-8),"votes"),Py.u8("rootSlotValid"),Py.nu64("rootSlot"),Py.nu64(),Py.seq(Py.struct([Py.nu64("epoch"),ub("authorizedVoter")]),Py.offset(Py.u32(),-8),"authorizedVoters"),Py.struct([Py.seq(Py.struct([ub("authorizedPubkey"),Py.nu64("epochOfLastAuthorizedSwitch"),Py.nu64("targetEpoch")]),32,"buf"),Py.nu64("idx"),Py.u8("isEmpty")],"priorVoters"),Py.nu64(),Py.seq(Py.struct([Py.nu64("epoch"),Py.nu64("credits"),Py.nu64("prevCredits")]),Py.offset(Py.u32(),-8),"epochCredits"),Py.struct([Py.nu64("slot"),Py.nu64("timestamp")],"lastTimestamp")]);const Fw={apiKey:"AIzaSyAWYtvT34s3r3CoFCrar7mOaSMq1Tjsxt8",authDomain:"star-atlas-59214.firebaseapp.com",projectId:"star-atlas-59214",storageBucket:"star-atlas-59214.appspot.com",messagingSenderId:"696825973961",appId:"1:696825973961:web:15c8f196ee02b401755118",measurementId:"G-K2EEN980KD"},Vw=document.querySelector(".form.form-is-ajax");let zw,qw,$w,Ww;async function Hw(t,e){for(let n=0;n<t.length;n++)await e(t[n],n,t)}Vw&&Vw.dataset.collection&&Vw.dataset.collection.length&&(zw=It(Fw),qw=function(t=St(),e){const n=vt(t=P(t),bg).getImmediate({identifier:e}),r=p("storage");return r&&function(t,e,n,r={}){!function(t,e,n,r={}){t.host=`${e}:${n}`,t._protocol="http";const{mockUserToken:i}=r;i&&(t._overrideAuthToken="string"==typeof i?i:v(i,t.app.options.projectId))}(t,e,n,r)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n,...r),n}(zw),$w=function(t,e){const n="string"==typeof t?t:e||"(default)",r=vt("object"==typeof t?t:St(),"firestore").getImmediate({identifier:n});if(!r._initialized){const t=p("firestore");t&&function(t,e,n,r={}){var i;const o=(t=Md(t,Cd))._getSettings(),s=`${e}:${n}`;if("firestore.googleapis.com"!==o.host&&o.host!==s&&yu("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},o),{host:s,ssl:!1})),r.mockUserToken){let e,n;if("string"==typeof r.mockUserToken)e=r.mockUserToken,n=hu.MOCK_USER;else{e=v(r.mockUserToken,null===(i=t._app)||void 0===i?void 0:i.options.projectId);const o=r.mockUserToken.sub||r.mockUserToken.user_id;if(!o)throw new Su(Iu.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new hu(o)}t._authCredentials=new Tu(new ku(e,n))}}(r,...t)}return r}(zw),Ww=function(t=St()){const e=vt(t,"auth");if(e.isInitialized())return e.getImmediate();const n=function(t,e){const n=vt(t,"auth");if(n.isInitialized()){const t=n.getImmediate();if(k(n.getOptions(),null!=e?e:{}))return t;$t(t,"already-initialized")}return n.initialize({options:e})}(t,{popupRedirectResolver:Br,persistence:[Hn,On,Mn]}),r=m("authTokenSyncURL");if(r){const t=(i=r,async t=>{const e=t&&await t.getIdTokenResult(),n=e&&((new Date).getTime()-Date.parse(e.issuedAtTime))/1e3;if(n&&n>Fr)return;const r=null==e?void 0:e.token;Vr!==r&&(Vr=r,await fetch(i,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))});!function(t,e,n){P(t).beforeAuthStateChanged(e,n)}(n,t,(()=>t(n.currentUser))),function(t,e,n,r){P(t).onIdTokenChanged(e,n,r)}(n,(e=>t(e)))}var i;const o=d("auth");return o&&Ye(n,`http://${o}`),n}(zw));class Kw{isTracking=!0;isSubmitting=!1;BtnSubmit;DOMFormFields;DOMForm;DOMFormSent;DOMDefaultError;_defaultError="";DATAControl;formObject={};files=[];firebaseCollection="";isFirebaseForm=!0;headerLogo;contentLinks;footerNavLinks;redirectTo="";isRedirect=!1;trackingButtonEl="";trackingButtonButton="";trackingButtonAction="";trackingEngagement="";origParams={};sentUrlParams=!1;cookieId=null;pageViewParams={utm_source:"source",utm_medium:"medium",utm_campaign:"referral_campaign",utm_term:"term",utm_content:"content",adset:"adset",adsetid:"adsetid"};initParams={utm_source:"channel",utm_medium:"medium",utm_campaign:"campaign",utm_term:"term",utm_content:"content",adset:"adset",deep_link:"deep_link",referrer:"referral",affiliate_id:"affiliate_id"};constructor(){let t=this;qr.saveParamsFromUrl(),this.origParams=qr.urlParams,this.DATAControl=[],this.DOMForm=document.querySelector(".form.form-is-ajax"),this.DOMForm&&(this.BtnSubmit=document.querySelector(".form-submit"),this.DOMFormFields=document.querySelectorAll(".form-field"),this.DOMFormFields.forEach((t=>{const e=t.querySelectorAll("input, textarea, select");this.DATAControl.push({el:t,elements:e})})),this.firebaseCollection=this.DOMForm.dataset.collection,this.firebaseCollection||(this.isFirebaseForm=!1),this.BtnSubmit&&this.BtnSubmit.addEventListener("click",this.onSubmitForm.bind(this),!1),this.DOMFormSent=document.querySelector(".form-submit-content"),this.DOMDefaultError=document.querySelector(".default-error-message"),this._defaultError=this.DOMDefaultError.innerHTML,this.trackingButtonEl=this.DOMForm.dataset.trackingButton||"",this.trackingButtonAction=this.DOMForm.dataset.trackingAction||"",this.trackingEngagement=this.DOMForm.dataset.trackingEngagement||"",this.isRedirect=""!=this.DOMForm.dataset.redirect,this.isRedirect&&(this.redirectTo=this.DOMForm.dataset.redirect)),this.headerLogo=document.body.querySelector("header a"),this.contentLinks=document.body.querySelectorAll(".content a"),this.footerNavLinks=document.body.querySelectorAll(".footer-nav a"),this.headerLogo.addEventListener("click",(function(e){e.preventDefault();const n=this.getAttribute("href");t.trackClick("firebase_form_logo","go_to_site",n).then((()=>{t.resumeClick(n)}))})),this.contentLinks.forEach((t=>{t.addEventListener("click",this.onContentLinkClick.bind(this,t),!1)})),this.footerNavLinks.forEach((t=>{t.addEventListener("click",this.onFooterNavClick.bind(this,t),!1)})),this.isTracking&&(this.checkTrackingCookie(),this.trackEvent("session"),this.trackPageView()),this.bindEvents()}bindEvents(){this.DOMForm&&(this.DOMForm.addEventListener("submit",this.onSubmitForm.bind(this),!1),this.DATAControl.forEach((t=>{t.elements.forEach((e=>{e.addEventListener("blur",(n=>{e.validity.valid?t.el.classList.remove("field-error"):t.el.classList.add("field-error")}))})),t.elements.forEach((e=>{e.addEventListener("keydown",(n=>{e.validity.valid&&t.el.classList.remove("field-error")}))})),t.elements.forEach((e=>{e.addEventListener("change",(n=>{e.validity.valid?t.el.classList.remove("field-error"):t.el.classList.add("field-error")}))}))})))}async onSubmitForm(t){t.preventDefault();var e=this;const n=await this.trackClick("form_submit_button","submit_form").then((()=>e.validateForm()));if(!this.isSubmitting)if(this.isSubmitting=!0,this.DOMDefaultError.classList.remove("display-error"),this.DOMDefaultError.innerHTML=this._defaultError,n){this.hideErrorMessages(),this.BtnSubmit.classList.add("is-submit"),this.BtnSubmit.disabled=!0,this.files=[],this.formObject={};new FormData(this.DOMForm).forEach(((t,e)=>{if(Reflect.has(this.formObject,e))Array.isArray(this.formObject[e])||(this.formObject[e]=[this.formObject[e]]),this.formObject[e].push(t);else{if(t instanceof File){const n=t;n.name.length&&this.files.push({field:e,file:n}),this.formObject[e]=""}else this.formObject[e]=t}})),this.isFirebaseForm?await this.submitFirebaseForm():await this.submitAjaxForm().catch((t=>{t.message&&(this.DOMDefaultError.innerHTML=t.message),this.DOMDefaultError.classList.add("display-error")})).then((()=>{e.BtnSubmit.classList.remove("is-submit"),e.BtnSubmit.disabled=!1,e.isSubmitting=!1}))}else this.isSubmitting=!1,this.DOMDefaultError.classList.add("display-error")}async submitAjaxForm(){const t=this,e=this.formObject,n=this.DOMForm.dataset.action,r=this.DOMForm.dataset.method;let i="";if(Object.keys(e).length&&n&&r){let o=await fetch(n,{method:r,headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}),s=await o.json();if(s.success)return t.DOMFormSent.classList.add("form-submitted"),t.DOMForm.classList.add("is-submitted"),await t.trackFormSubmission(),t.isRedirect?t.resumeClick(t.redirectTo):t.DOMFormSent.classList.add("form-submitted"),Promise.resolve();s.message&&""!=s.message&&(i=s.message)}return Promise.reject({message:i})}async submitFirebaseForm(){const t=this;return async function(t){var e;const n=Qe(t);if(await n._initializationPromise,null===(e=n.currentUser)||void 0===e?void 0:e.isAnonymous)return new bn({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await vn(n,{returnSecureToken:!0}),i=await bn._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(i.user),i}(Ww).then((async()=>{this.files.length?await Hw(this.files,(async e=>{const n=e.file.name,r=(i=qw,o="/"+t.firebaseCollection+"/"+(0,Eg.v4)()+"_"+n,pg(i=P(i),o));var i,o;t.formObject[e.field]=r.toString();const s=await function(t,e,n){return hg(t=P(t),e,n)}(r,e.file).then((t=>{})).catch((t=>{throw"file_upload"}));return s})).then((async()=>{await t.sendFormToFirebase()})):await t.sendFormToFirebase()})).catch((e=>{"file_upload"==e&&(t.DOMDefaultError.innerHTML="Error uploading file, please check file and try again."),t.DOMDefaultError.classList.add("display-error")})).then((()=>{t.BtnSubmit.classList.remove("is-submit"),t.BtnSubmit.disabled=!1,t.isSubmitting=!1}))}async sendFormToFirebase(){const t=this.formObject;(await up(function(t,e,...n){if(t=P(t),Td("collection","path",e),t instanceof Cd){const r=Fu.fromString(e,...n);return Od(r),new Bd(t,null,r)}{if(!(t instanceof Nd||t instanceof Bd))throw new Su(Iu.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fu.fromString(e,...n));return Od(r),new Bd(t.firestore,null,r)}}($w,this.firebaseCollection),t)).id&&(this.DOMForm.classList.add("is-submitted"),await this.trackFormSubmission(),this.isRedirect?this.resumeClick(this.redirectTo):this.DOMFormSent.classList.add("form-submitted"))}hideErrorMessages(){}async trackFormSubmission(){this.isTracking&&(this.trackingButtonEl&&await this.trackClick(this.trackingButtonEl,this.trackingButtonAction),this.trackingEngagement&&await this.trackEngagement(this.trackingEngagement),window.gtag_report_conversion&&await window.gtag_report_conversion())}async validateSolanaAddress(t){try{const e=new nb(t);return await nb.isOnCurve(e.toBuffer())}catch(t){return!1}}async validateForm(){let t=!0;return await Hw(this.DATAControl,(async e=>{await Hw(e.elements,(async n=>{let r=!1;"wallet_address"===n.name?(r=!1,n.value.length>=32&&n.value.length<=44?r=await this.validateSolanaAddress(n.value):n.validity.valid&&0===n.value.length&&(r=!0)):r=n.validity.valid,r?e.el.classList.remove("field-error"):(e.el.classList.add("field-error"),t=!1)}))})).then((()=>{if(!t){const t=document.querySelector(".field-error");t.scrollIntoView({behavior:"smooth"}),t.querySelector("input, textarea").focus({preventScroll:!0})}})),t}async onFooterNavClick(t,e){e.preventDefault();const n=t.getAttribute("href"),r=this.getElementTitle(t,"landing_page","footer_nav");this.trackClick(r,"go_to_site",n).then((()=>{this.resumeClick(n)}))}async onContentLinkClick(t,e){const n=t.getAttribute("href");if(n){e.preventDefault();const r=this.getElementTitle(t,"landing_page","content_link");this.trackClick(r,"go_to_site",n).then((()=>{this.resumeClick(n)}))}}isInternal(t){let e=!1;return(0===t.indexOf(window.location.origin)||t.indexOf("staratlas.com")>-1||0===t.indexOf("/"))&&(e=!0),this.isFile(t)&&(e=!1),e}isFile(t){return t.split("/").pop().split(".").length>1}resumeClick(t){const e=this.isInternal(t);-1!==t.indexOf("mailto")||e?window.location.href=t:window.open(t,"_blank")}getElementTitle(t,e="",n=""){return t.dataset.title?n=t.dataset.title:t.getAttribute("title")&&(n=t.getAttribute("title")),e=e.concat("_",n).toLowerCase().replaceAll(" ","_")}checkTrackingCookie(){if(null!==e("tracker"))this.cookieId=e("tracker");else{if(!this.isTracking)return;this.cookieId=Math.random().toString(36).substr(2,15),function(t,e,n){let r=new Date;r.setTime(r.getTime()+24*n*60*60*1e3);const i="expires="+r.toUTCString(),o="."+location.hostname.split(".").reverse()[1]+"."+location.hostname.split(".").reverse()[0];document.cookie=t+"="+e+";"+i+";domain="+o+";path=/"}("tracker",this.cookieId,30);let t={description:"Star Atlas Initializer"};this.origParams&&Object.keys(this.origParams).length&&Object.assign(t,this.getUrlParameters(this.initParams)),this.trackEvent("init",t)}}trackPageView(){let t={event_type:"page_load",description:window.location.href};this.origParams&&Object.keys(this.origParams).length&&!this.sentUrlParams&&(Object.assign(t,this.getUrlParameters(this.pageViewParams)),this.sentUrlParams=!0),this.trackEvent("adreferral",t)}async trackClick(t="",e="",n=""){const r=window.location.protocol+"//"+window.location.host;let i=""===n?null:r+n;if("string"==typeof n&&(0===n.indexOf("#")&&(i=n),n.indexOf("http")>-1&&(i=n)),this.isTracking){return this.trackEvent("click",{click_ts:(new Date).toISOString(),cookie_id:this.cookieId,element:t,action:e,url:window.location.href,destination_url:i})}}async trackEngagement(t="",e="",n=""){return await this.trackEvent("engagement",{event_ts:(new Date).toISOString(),action_type:t,app_id:e,char_value_1:n})}async trackEvent(t="",e={}){return"event_ts"in e==!1&&(e.event_ts=(new Date).toISOString()),"cookie_id"in e==!1&&this.cookieId&&(e.cookie_id=this.cookieId),!window.SFLoad||!window.sf||void 0===window.sf.logEvent||await window.sf.logEvent(t,e)}getUrlParameters(t={}){let e=this.origParams,n={};return e&&Object.keys(e).length&&Object.entries(t).forEach((([t,r])=>{t in e&&(n[r]=e[t])})),n}}window.onload=()=>{window.FirebaseForms=new Kw}}()}();