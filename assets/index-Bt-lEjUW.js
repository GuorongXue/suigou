(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();var ud={exports:{}},Na={},fd={exports:{}},Ft={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ug;function v1(){if(ug)return Ft;ug=1;var i=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),n=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),l=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),h=Symbol.for("react.memo"),p=Symbol.for("react.lazy"),m=Symbol.iterator;function v(F){return F===null||typeof F!="object"?null:(F=m&&F[m]||F["@@iterator"],typeof F=="function"?F:null)}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,S={};function _(F,Y,Ce){this.props=F,this.context=Y,this.refs=S,this.updater=Ce||y}_.prototype.isReactComponent={},_.prototype.setState=function(F,Y){if(typeof F!="object"&&typeof F!="function"&&F!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,F,Y,"setState")},_.prototype.forceUpdate=function(F){this.updater.enqueueForceUpdate(this,F,"forceUpdate")};function x(){}x.prototype=_.prototype;function R(F,Y,Ce){this.props=F,this.context=Y,this.refs=S,this.updater=Ce||y}var P=R.prototype=new x;P.constructor=R,M(P,_.prototype),P.isPureReactComponent=!0;var E=Array.isArray,V=Object.prototype.hasOwnProperty,N={current:null},D={key:!0,ref:!0,__self:!0,__source:!0};function B(F,Y,Ce){var K,ce={},we=null,xe=null;if(Y!=null)for(K in Y.ref!==void 0&&(xe=Y.ref),Y.key!==void 0&&(we=""+Y.key),Y)V.call(Y,K)&&!D.hasOwnProperty(K)&&(ce[K]=Y[K]);var Ie=arguments.length-2;if(Ie===1)ce.children=Ce;else if(1<Ie){for(var Oe=Array(Ie),Ge=0;Ge<Ie;Ge++)Oe[Ge]=arguments[Ge+2];ce.children=Oe}if(F&&F.defaultProps)for(K in Ie=F.defaultProps,Ie)ce[K]===void 0&&(ce[K]=Ie[K]);return{$$typeof:i,type:F,key:we,ref:xe,props:ce,_owner:N.current}}function L(F,Y){return{$$typeof:i,type:F.type,key:Y,ref:F.ref,props:F.props,_owner:F._owner}}function A(F){return typeof F=="object"&&F!==null&&F.$$typeof===i}function U(F){var Y={"=":"=0",":":"=2"};return"$"+F.replace(/[=:]/g,function(Ce){return Y[Ce]})}var q=/\/+/g;function X(F,Y){return typeof F=="object"&&F!==null&&F.key!=null?U(""+F.key):Y.toString(36)}function ne(F,Y,Ce,K,ce){var we=typeof F;(we==="undefined"||we==="boolean")&&(F=null);var xe=!1;if(F===null)xe=!0;else switch(we){case"string":case"number":xe=!0;break;case"object":switch(F.$$typeof){case i:case e:xe=!0}}if(xe)return xe=F,ce=ce(xe),F=K===""?"."+X(xe,0):K,E(ce)?(Ce="",F!=null&&(Ce=F.replace(q,"$&/")+"/"),ne(ce,Y,Ce,"",function(Ge){return Ge})):ce!=null&&(A(ce)&&(ce=L(ce,Ce+(!ce.key||xe&&xe.key===ce.key?"":(""+ce.key).replace(q,"$&/")+"/")+F)),Y.push(ce)),1;if(xe=0,K=K===""?".":K+":",E(F))for(var Ie=0;Ie<F.length;Ie++){we=F[Ie];var Oe=K+X(we,Ie);xe+=ne(we,Y,Ce,Oe,ce)}else if(Oe=v(F),typeof Oe=="function")for(F=Oe.call(F),Ie=0;!(we=F.next()).done;)we=we.value,Oe=K+X(we,Ie++),xe+=ne(we,Y,Ce,Oe,ce);else if(we==="object")throw Y=String(F),Error("Objects are not valid as a React child (found: "+(Y==="[object Object]"?"object with keys {"+Object.keys(F).join(", ")+"}":Y)+"). If you meant to render a collection of children, use an array instead.");return xe}function he(F,Y,Ce){if(F==null)return F;var K=[],ce=0;return ne(F,K,"","",function(we){return Y.call(Ce,we,ce++)}),K}function ae(F){if(F._status===-1){var Y=F._result;Y=Y(),Y.then(function(Ce){(F._status===0||F._status===-1)&&(F._status=1,F._result=Ce)},function(Ce){(F._status===0||F._status===-1)&&(F._status=2,F._result=Ce)}),F._status===-1&&(F._status=0,F._result=Y)}if(F._status===1)return F._result.default;throw F._result}var Me={current:null},$={transition:null},z={ReactCurrentDispatcher:Me,ReactCurrentBatchConfig:$,ReactCurrentOwner:N};function ee(){throw Error("act(...) is not supported in production builds of React.")}return Ft.Children={map:he,forEach:function(F,Y,Ce){he(F,function(){Y.apply(this,arguments)},Ce)},count:function(F){var Y=0;return he(F,function(){Y++}),Y},toArray:function(F){return he(F,function(Y){return Y})||[]},only:function(F){if(!A(F))throw Error("React.Children.only expected to receive a single React element child.");return F}},Ft.Component=_,Ft.Fragment=t,Ft.Profiler=s,Ft.PureComponent=R,Ft.StrictMode=n,Ft.Suspense=f,Ft.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=z,Ft.act=ee,Ft.cloneElement=function(F,Y,Ce){if(F==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+F+".");var K=M({},F.props),ce=F.key,we=F.ref,xe=F._owner;if(Y!=null){if(Y.ref!==void 0&&(we=Y.ref,xe=N.current),Y.key!==void 0&&(ce=""+Y.key),F.type&&F.type.defaultProps)var Ie=F.type.defaultProps;for(Oe in Y)V.call(Y,Oe)&&!D.hasOwnProperty(Oe)&&(K[Oe]=Y[Oe]===void 0&&Ie!==void 0?Ie[Oe]:Y[Oe])}var Oe=arguments.length-2;if(Oe===1)K.children=Ce;else if(1<Oe){Ie=Array(Oe);for(var Ge=0;Ge<Oe;Ge++)Ie[Ge]=arguments[Ge+2];K.children=Ie}return{$$typeof:i,type:F.type,key:ce,ref:we,props:K,_owner:xe}},Ft.createContext=function(F){return F={$$typeof:l,_currentValue:F,_currentValue2:F,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},F.Provider={$$typeof:a,_context:F},F.Consumer=F},Ft.createElement=B,Ft.createFactory=function(F){var Y=B.bind(null,F);return Y.type=F,Y},Ft.createRef=function(){return{current:null}},Ft.forwardRef=function(F){return{$$typeof:u,render:F}},Ft.isValidElement=A,Ft.lazy=function(F){return{$$typeof:p,_payload:{_status:-1,_result:F},_init:ae}},Ft.memo=function(F,Y){return{$$typeof:h,type:F,compare:Y===void 0?null:Y}},Ft.startTransition=function(F){var Y=$.transition;$.transition={};try{F()}finally{$.transition=Y}},Ft.unstable_act=ee,Ft.useCallback=function(F,Y){return Me.current.useCallback(F,Y)},Ft.useContext=function(F){return Me.current.useContext(F)},Ft.useDebugValue=function(){},Ft.useDeferredValue=function(F){return Me.current.useDeferredValue(F)},Ft.useEffect=function(F,Y){return Me.current.useEffect(F,Y)},Ft.useId=function(){return Me.current.useId()},Ft.useImperativeHandle=function(F,Y,Ce){return Me.current.useImperativeHandle(F,Y,Ce)},Ft.useInsertionEffect=function(F,Y){return Me.current.useInsertionEffect(F,Y)},Ft.useLayoutEffect=function(F,Y){return Me.current.useLayoutEffect(F,Y)},Ft.useMemo=function(F,Y){return Me.current.useMemo(F,Y)},Ft.useReducer=function(F,Y,Ce){return Me.current.useReducer(F,Y,Ce)},Ft.useRef=function(F){return Me.current.useRef(F)},Ft.useState=function(F){return Me.current.useState(F)},Ft.useSyncExternalStore=function(F,Y,Ce){return Me.current.useSyncExternalStore(F,Y,Ce)},Ft.useTransition=function(){return Me.current.useTransition()},Ft.version="18.3.1",Ft}var fg;function ap(){return fg||(fg=1,fd.exports=v1()),fd.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dg;function y1(){if(dg)return Na;dg=1;var i=ap(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),n=Object.prototype.hasOwnProperty,s=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function l(u,f,h){var p,m={},v=null,y=null;h!==void 0&&(v=""+h),f.key!==void 0&&(v=""+f.key),f.ref!==void 0&&(y=f.ref);for(p in f)n.call(f,p)&&!a.hasOwnProperty(p)&&(m[p]=f[p]);if(u&&u.defaultProps)for(p in f=u.defaultProps,f)m[p]===void 0&&(m[p]=f[p]);return{$$typeof:e,type:u,key:v,ref:y,props:m,_owner:s.current}}return Na.Fragment=t,Na.jsx=l,Na.jsxs=l,Na}var hg;function _1(){return hg||(hg=1,ud.exports=y1()),ud.exports}var O=_1(),xt=ap(),mc={},dd={exports:{}},ri={},hd={exports:{}},pd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pg;function x1(){return pg||(pg=1,(function(i){function e($,z){var ee=$.length;$.push(z);e:for(;0<ee;){var F=ee-1>>>1,Y=$[F];if(0<s(Y,z))$[F]=z,$[ee]=Y,ee=F;else break e}}function t($){return $.length===0?null:$[0]}function n($){if($.length===0)return null;var z=$[0],ee=$.pop();if(ee!==z){$[0]=ee;e:for(var F=0,Y=$.length,Ce=Y>>>1;F<Ce;){var K=2*(F+1)-1,ce=$[K],we=K+1,xe=$[we];if(0>s(ce,ee))we<Y&&0>s(xe,ce)?($[F]=xe,$[we]=ee,F=we):($[F]=ce,$[K]=ee,F=K);else if(we<Y&&0>s(xe,ee))$[F]=xe,$[we]=ee,F=we;else break e}}return z}function s($,z){var ee=$.sortIndex-z.sortIndex;return ee!==0?ee:$.id-z.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;i.unstable_now=function(){return a.now()}}else{var l=Date,u=l.now();i.unstable_now=function(){return l.now()-u}}var f=[],h=[],p=1,m=null,v=3,y=!1,M=!1,S=!1,_=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,R=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function P($){for(var z=t(h);z!==null;){if(z.callback===null)n(h);else if(z.startTime<=$)n(h),z.sortIndex=z.expirationTime,e(f,z);else break;z=t(h)}}function E($){if(S=!1,P($),!M)if(t(f)!==null)M=!0,ae(V);else{var z=t(h);z!==null&&Me(E,z.startTime-$)}}function V($,z){M=!1,S&&(S=!1,x(B),B=-1),y=!0;var ee=v;try{for(P(z),m=t(f);m!==null&&(!(m.expirationTime>z)||$&&!U());){var F=m.callback;if(typeof F=="function"){m.callback=null,v=m.priorityLevel;var Y=F(m.expirationTime<=z);z=i.unstable_now(),typeof Y=="function"?m.callback=Y:m===t(f)&&n(f),P(z)}else n(f);m=t(f)}if(m!==null)var Ce=!0;else{var K=t(h);K!==null&&Me(E,K.startTime-z),Ce=!1}return Ce}finally{m=null,v=ee,y=!1}}var N=!1,D=null,B=-1,L=5,A=-1;function U(){return!(i.unstable_now()-A<L)}function q(){if(D!==null){var $=i.unstable_now();A=$;var z=!0;try{z=D(!0,$)}finally{z?X():(N=!1,D=null)}}else N=!1}var X;if(typeof R=="function")X=function(){R(q)};else if(typeof MessageChannel<"u"){var ne=new MessageChannel,he=ne.port2;ne.port1.onmessage=q,X=function(){he.postMessage(null)}}else X=function(){_(q,0)};function ae($){D=$,N||(N=!0,X())}function Me($,z){B=_(function(){$(i.unstable_now())},z)}i.unstable_IdlePriority=5,i.unstable_ImmediatePriority=1,i.unstable_LowPriority=4,i.unstable_NormalPriority=3,i.unstable_Profiling=null,i.unstable_UserBlockingPriority=2,i.unstable_cancelCallback=function($){$.callback=null},i.unstable_continueExecution=function(){M||y||(M=!0,ae(V))},i.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<$?Math.floor(1e3/$):5},i.unstable_getCurrentPriorityLevel=function(){return v},i.unstable_getFirstCallbackNode=function(){return t(f)},i.unstable_next=function($){switch(v){case 1:case 2:case 3:var z=3;break;default:z=v}var ee=v;v=z;try{return $()}finally{v=ee}},i.unstable_pauseExecution=function(){},i.unstable_requestPaint=function(){},i.unstable_runWithPriority=function($,z){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var ee=v;v=$;try{return z()}finally{v=ee}},i.unstable_scheduleCallback=function($,z,ee){var F=i.unstable_now();switch(typeof ee=="object"&&ee!==null?(ee=ee.delay,ee=typeof ee=="number"&&0<ee?F+ee:F):ee=F,$){case 1:var Y=-1;break;case 2:Y=250;break;case 5:Y=1073741823;break;case 4:Y=1e4;break;default:Y=5e3}return Y=ee+Y,$={id:p++,callback:z,priorityLevel:$,startTime:ee,expirationTime:Y,sortIndex:-1},ee>F?($.sortIndex=ee,e(h,$),t(f)===null&&$===t(h)&&(S?(x(B),B=-1):S=!0,Me(E,ee-F))):($.sortIndex=Y,e(f,$),M||y||(M=!0,ae(V))),$},i.unstable_shouldYield=U,i.unstable_wrapCallback=function($){var z=v;return function(){var ee=v;v=z;try{return $.apply(this,arguments)}finally{v=ee}}}})(pd)),pd}var mg;function S1(){return mg||(mg=1,hd.exports=x1()),hd.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gg;function M1(){if(gg)return ri;gg=1;var i=ap(),e=S1();function t(r){for(var o="https://reactjs.org/docs/error-decoder.html?invariant="+r,c=1;c<arguments.length;c++)o+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+r+"; visit "+o+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var n=new Set,s={};function a(r,o){l(r,o),l(r+"Capture",o)}function l(r,o){for(s[r]=o,r=0;r<o.length;r++)n.add(o[r])}var u=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,h=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,p={},m={};function v(r){return f.call(m,r)?!0:f.call(p,r)?!1:h.test(r)?m[r]=!0:(p[r]=!0,!1)}function y(r,o,c,d){if(c!==null&&c.type===0)return!1;switch(typeof o){case"function":case"symbol":return!0;case"boolean":return d?!1:c!==null?!c.acceptsBooleans:(r=r.toLowerCase().slice(0,5),r!=="data-"&&r!=="aria-");default:return!1}}function M(r,o,c,d){if(o===null||typeof o>"u"||y(r,o,c,d))return!0;if(d)return!1;if(c!==null)switch(c.type){case 3:return!o;case 4:return o===!1;case 5:return isNaN(o);case 6:return isNaN(o)||1>o}return!1}function S(r,o,c,d,g,w,C){this.acceptsBooleans=o===2||o===3||o===4,this.attributeName=d,this.attributeNamespace=g,this.mustUseProperty=c,this.propertyName=r,this.type=o,this.sanitizeURL=w,this.removeEmptyString=C}var _={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(r){_[r]=new S(r,0,!1,r,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(r){var o=r[0];_[o]=new S(o,1,!1,r[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(r){_[r]=new S(r,2,!1,r.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(r){_[r]=new S(r,2,!1,r,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(r){_[r]=new S(r,3,!1,r.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(r){_[r]=new S(r,3,!0,r,null,!1,!1)}),["capture","download"].forEach(function(r){_[r]=new S(r,4,!1,r,null,!1,!1)}),["cols","rows","size","span"].forEach(function(r){_[r]=new S(r,6,!1,r,null,!1,!1)}),["rowSpan","start"].forEach(function(r){_[r]=new S(r,5,!1,r.toLowerCase(),null,!1,!1)});var x=/[\-:]([a-z])/g;function R(r){return r[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(r){var o=r.replace(x,R);_[o]=new S(o,1,!1,r,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(r){var o=r.replace(x,R);_[o]=new S(o,1,!1,r,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(r){var o=r.replace(x,R);_[o]=new S(o,1,!1,r,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(r){_[r]=new S(r,1,!1,r.toLowerCase(),null,!1,!1)}),_.xlinkHref=new S("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(r){_[r]=new S(r,1,!1,r.toLowerCase(),null,!0,!0)});function P(r,o,c,d){var g=_.hasOwnProperty(o)?_[o]:null;(g!==null?g.type!==0:d||!(2<o.length)||o[0]!=="o"&&o[0]!=="O"||o[1]!=="n"&&o[1]!=="N")&&(M(o,c,g,d)&&(c=null),d||g===null?v(o)&&(c===null?r.removeAttribute(o):r.setAttribute(o,""+c)):g.mustUseProperty?r[g.propertyName]=c===null?g.type===3?!1:"":c:(o=g.attributeName,d=g.attributeNamespace,c===null?r.removeAttribute(o):(g=g.type,c=g===3||g===4&&c===!0?"":""+c,d?r.setAttributeNS(d,o,c):r.setAttribute(o,c))))}var E=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,V=Symbol.for("react.element"),N=Symbol.for("react.portal"),D=Symbol.for("react.fragment"),B=Symbol.for("react.strict_mode"),L=Symbol.for("react.profiler"),A=Symbol.for("react.provider"),U=Symbol.for("react.context"),q=Symbol.for("react.forward_ref"),X=Symbol.for("react.suspense"),ne=Symbol.for("react.suspense_list"),he=Symbol.for("react.memo"),ae=Symbol.for("react.lazy"),Me=Symbol.for("react.offscreen"),$=Symbol.iterator;function z(r){return r===null||typeof r!="object"?null:(r=$&&r[$]||r["@@iterator"],typeof r=="function"?r:null)}var ee=Object.assign,F;function Y(r){if(F===void 0)try{throw Error()}catch(c){var o=c.stack.trim().match(/\n( *(at )?)/);F=o&&o[1]||""}return`
`+F+r}var Ce=!1;function K(r,o){if(!r||Ce)return"";Ce=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(o)if(o=function(){throw Error()},Object.defineProperty(o.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(o,[])}catch(ge){var d=ge}Reflect.construct(r,[],o)}else{try{o.call()}catch(ge){d=ge}r.call(o.prototype)}else{try{throw Error()}catch(ge){d=ge}r()}}catch(ge){if(ge&&d&&typeof ge.stack=="string"){for(var g=ge.stack.split(`
`),w=d.stack.split(`
`),C=g.length-1,j=w.length-1;1<=C&&0<=j&&g[C]!==w[j];)j--;for(;1<=C&&0<=j;C--,j--)if(g[C]!==w[j]){if(C!==1||j!==1)do if(C--,j--,0>j||g[C]!==w[j]){var te=`
`+g[C].replace(" at new "," at ");return r.displayName&&te.includes("<anonymous>")&&(te=te.replace("<anonymous>",r.displayName)),te}while(1<=C&&0<=j);break}}}finally{Ce=!1,Error.prepareStackTrace=c}return(r=r?r.displayName||r.name:"")?Y(r):""}function ce(r){switch(r.tag){case 5:return Y(r.type);case 16:return Y("Lazy");case 13:return Y("Suspense");case 19:return Y("SuspenseList");case 0:case 2:case 15:return r=K(r.type,!1),r;case 11:return r=K(r.type.render,!1),r;case 1:return r=K(r.type,!0),r;default:return""}}function we(r){if(r==null)return null;if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r;switch(r){case D:return"Fragment";case N:return"Portal";case L:return"Profiler";case B:return"StrictMode";case X:return"Suspense";case ne:return"SuspenseList"}if(typeof r=="object")switch(r.$$typeof){case U:return(r.displayName||"Context")+".Consumer";case A:return(r._context.displayName||"Context")+".Provider";case q:var o=r.render;return r=r.displayName,r||(r=o.displayName||o.name||"",r=r!==""?"ForwardRef("+r+")":"ForwardRef"),r;case he:return o=r.displayName||null,o!==null?o:we(r.type)||"Memo";case ae:o=r._payload,r=r._init;try{return we(r(o))}catch{}}return null}function xe(r){var o=r.type;switch(r.tag){case 24:return"Cache";case 9:return(o.displayName||"Context")+".Consumer";case 10:return(o._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return r=o.render,r=r.displayName||r.name||"",o.displayName||(r!==""?"ForwardRef("+r+")":"ForwardRef");case 7:return"Fragment";case 5:return o;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return we(o);case 8:return o===B?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof o=="function")return o.displayName||o.name||null;if(typeof o=="string")return o}return null}function Ie(r){switch(typeof r){case"boolean":case"number":case"string":case"undefined":return r;case"object":return r;default:return""}}function Oe(r){var o=r.type;return(r=r.nodeName)&&r.toLowerCase()==="input"&&(o==="checkbox"||o==="radio")}function Ge(r){var o=Oe(r)?"checked":"value",c=Object.getOwnPropertyDescriptor(r.constructor.prototype,o),d=""+r[o];if(!r.hasOwnProperty(o)&&typeof c<"u"&&typeof c.get=="function"&&typeof c.set=="function"){var g=c.get,w=c.set;return Object.defineProperty(r,o,{configurable:!0,get:function(){return g.call(this)},set:function(C){d=""+C,w.call(this,C)}}),Object.defineProperty(r,o,{enumerable:c.enumerable}),{getValue:function(){return d},setValue:function(C){d=""+C},stopTracking:function(){r._valueTracker=null,delete r[o]}}}}function Ke(r){r._valueTracker||(r._valueTracker=Ge(r))}function ye(r){if(!r)return!1;var o=r._valueTracker;if(!o)return!0;var c=o.getValue(),d="";return r&&(d=Oe(r)?r.checked?"true":"false":r.value),r=d,r!==c?(o.setValue(r),!0):!1}function Le(r){if(r=r||(typeof document<"u"?document:void 0),typeof r>"u")return null;try{return r.activeElement||r.body}catch{return r.body}}function W(r,o){var c=o.checked;return ee({},o,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:c??r._wrapperState.initialChecked})}function le(r,o){var c=o.defaultValue==null?"":o.defaultValue,d=o.checked!=null?o.checked:o.defaultChecked;c=Ie(o.value!=null?o.value:c),r._wrapperState={initialChecked:d,initialValue:c,controlled:o.type==="checkbox"||o.type==="radio"?o.checked!=null:o.value!=null}}function Ee(r,o){o=o.checked,o!=null&&P(r,"checked",o,!1)}function Ue(r,o){Ee(r,o);var c=Ie(o.value),d=o.type;if(c!=null)d==="number"?(c===0&&r.value===""||r.value!=c)&&(r.value=""+c):r.value!==""+c&&(r.value=""+c);else if(d==="submit"||d==="reset"){r.removeAttribute("value");return}o.hasOwnProperty("value")?Je(r,o.type,c):o.hasOwnProperty("defaultValue")&&Je(r,o.type,Ie(o.defaultValue)),o.checked==null&&o.defaultChecked!=null&&(r.defaultChecked=!!o.defaultChecked)}function Pe(r,o,c){if(o.hasOwnProperty("value")||o.hasOwnProperty("defaultValue")){var d=o.type;if(!(d!=="submit"&&d!=="reset"||o.value!==void 0&&o.value!==null))return;o=""+r._wrapperState.initialValue,c||o===r.value||(r.value=o),r.defaultValue=o}c=r.name,c!==""&&(r.name=""),r.defaultChecked=!!r._wrapperState.initialChecked,c!==""&&(r.name=c)}function Je(r,o,c){(o!=="number"||Le(r.ownerDocument)!==r)&&(c==null?r.defaultValue=""+r._wrapperState.initialValue:r.defaultValue!==""+c&&(r.defaultValue=""+c))}var ze=Array.isArray;function H(r,o,c,d){if(r=r.options,o){o={};for(var g=0;g<c.length;g++)o["$"+c[g]]=!0;for(c=0;c<r.length;c++)g=o.hasOwnProperty("$"+r[c].value),r[c].selected!==g&&(r[c].selected=g),g&&d&&(r[c].defaultSelected=!0)}else{for(c=""+Ie(c),o=null,g=0;g<r.length;g++){if(r[g].value===c){r[g].selected=!0,d&&(r[g].defaultSelected=!0);return}o!==null||r[g].disabled||(o=r[g])}o!==null&&(o.selected=!0)}}function T(r,o){if(o.dangerouslySetInnerHTML!=null)throw Error(t(91));return ee({},o,{value:void 0,defaultValue:void 0,children:""+r._wrapperState.initialValue})}function G(r,o){var c=o.value;if(c==null){if(c=o.children,o=o.defaultValue,c!=null){if(o!=null)throw Error(t(92));if(ze(c)){if(1<c.length)throw Error(t(93));c=c[0]}o=c}o==null&&(o=""),c=o}r._wrapperState={initialValue:Ie(c)}}function be(r,o){var c=Ie(o.value),d=Ie(o.defaultValue);c!=null&&(c=""+c,c!==r.value&&(r.value=c),o.defaultValue==null&&r.defaultValue!==c&&(r.defaultValue=c)),d!=null&&(r.defaultValue=""+d)}function _e(r){var o=r.textContent;o===r._wrapperState.initialValue&&o!==""&&o!==null&&(r.value=o)}function Ae(r){switch(r){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Qe(r,o){return r==null||r==="http://www.w3.org/1999/xhtml"?Ae(o):r==="http://www.w3.org/2000/svg"&&o==="foreignObject"?"http://www.w3.org/1999/xhtml":r}var je,et=(function(r){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(o,c,d,g){MSApp.execUnsafeLocalFunction(function(){return r(o,c,d,g)})}:r})(function(r,o){if(r.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in r)r.innerHTML=o;else{for(je=je||document.createElement("div"),je.innerHTML="<svg>"+o.valueOf().toString()+"</svg>",o=je.firstChild;r.firstChild;)r.removeChild(r.firstChild);for(;o.firstChild;)r.appendChild(o.firstChild)}});function Tt(r,o){if(o){var c=r.firstChild;if(c&&c===r.lastChild&&c.nodeType===3){c.nodeValue=o;return}}r.textContent=o}var De={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},it=["Webkit","ms","Moz","O"];Object.keys(De).forEach(function(r){it.forEach(function(o){o=o+r.charAt(0).toUpperCase()+r.substring(1),De[o]=De[r]})});function pt(r,o,c){return o==null||typeof o=="boolean"||o===""?"":c||typeof o!="number"||o===0||De.hasOwnProperty(r)&&De[r]?(""+o).trim():o+"px"}function _t(r,o){r=r.style;for(var c in o)if(o.hasOwnProperty(c)){var d=c.indexOf("--")===0,g=pt(c,o[c],d);c==="float"&&(c="cssFloat"),d?r.setProperty(c,g):r[c]=g}}var tt=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Rt(r,o){if(o){if(tt[r]&&(o.children!=null||o.dangerouslySetInnerHTML!=null))throw Error(t(137,r));if(o.dangerouslySetInnerHTML!=null){if(o.children!=null)throw Error(t(60));if(typeof o.dangerouslySetInnerHTML!="object"||!("__html"in o.dangerouslySetInnerHTML))throw Error(t(61))}if(o.style!=null&&typeof o.style!="object")throw Error(t(62))}}function Te(r,o){if(r.indexOf("-")===-1)return typeof o.is=="string";switch(r){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var dt=null;function Q(r){return r=r.target||r.srcElement||window,r.correspondingUseElement&&(r=r.correspondingUseElement),r.nodeType===3?r.parentNode:r}var We=null,ve=null,Re=null;function Ze(r){if(r=_a(r)){if(typeof We!="function")throw Error(t(280));var o=r.stateNode;o&&(o=Pl(o),We(r.stateNode,r.type,o))}}function Ye(r){ve?Re?Re.push(r):Re=[r]:ve=r}function Mt(){if(ve){var r=ve,o=Re;if(Re=ve=null,Ze(r),o)for(r=0;r<o.length;r++)Ze(o[r])}}function Xt(r,o){return r(o)}function qt(){}var Ot=!1;function gn(r,o,c){if(Ot)return r(o,c);Ot=!0;try{return Xt(r,o,c)}finally{Ot=!1,(ve!==null||Re!==null)&&(qt(),Mt())}}function b(r,o){var c=r.stateNode;if(c===null)return null;var d=Pl(c);if(d===null)return null;c=d[o];e:switch(o){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(d=!d.disabled)||(r=r.type,d=!(r==="button"||r==="input"||r==="select"||r==="textarea")),r=!d;break e;default:r=!1}if(r)return null;if(c&&typeof c!="function")throw Error(t(231,o,typeof c));return c}var k=!1;if(u)try{var Z={};Object.defineProperty(Z,"passive",{get:function(){k=!0}}),window.addEventListener("test",Z,Z),window.removeEventListener("test",Z,Z)}catch{k=!1}function ie(r,o,c,d,g,w,C,j,te){var ge=Array.prototype.slice.call(arguments,3);try{o.apply(c,ge)}catch(Fe){this.onError(Fe)}}var de=!1,Ne=null,Se=!1,qe=null,at={onError:function(r){de=!0,Ne=r}};function ot(r,o,c,d,g,w,C,j,te){de=!1,Ne=null,ie.apply(at,arguments)}function rt(r,o,c,d,g,w,C,j,te){if(ot.apply(this,arguments),de){if(de){var ge=Ne;de=!1,Ne=null}else throw Error(t(198));Se||(Se=!0,qe=ge)}}function vt(r){var o=r,c=r;if(r.alternate)for(;o.return;)o=o.return;else{r=o;do o=r,(o.flags&4098)!==0&&(c=o.return),r=o.return;while(r)}return o.tag===3?c:null}function Lt(r){if(r.tag===13){var o=r.memoizedState;if(o===null&&(r=r.alternate,r!==null&&(o=r.memoizedState)),o!==null)return o.dehydrated}return null}function Pt(r){if(vt(r)!==r)throw Error(t(188))}function wt(r){var o=r.alternate;if(!o){if(o=vt(r),o===null)throw Error(t(188));return o!==r?null:r}for(var c=r,d=o;;){var g=c.return;if(g===null)break;var w=g.alternate;if(w===null){if(d=g.return,d!==null){c=d;continue}break}if(g.child===w.child){for(w=g.child;w;){if(w===c)return Pt(g),r;if(w===d)return Pt(g),o;w=w.sibling}throw Error(t(188))}if(c.return!==d.return)c=g,d=w;else{for(var C=!1,j=g.child;j;){if(j===c){C=!0,c=g,d=w;break}if(j===d){C=!0,d=g,c=w;break}j=j.sibling}if(!C){for(j=w.child;j;){if(j===c){C=!0,c=w,d=g;break}if(j===d){C=!0,d=w,c=g;break}j=j.sibling}if(!C)throw Error(t(189))}}if(c.alternate!==d)throw Error(t(190))}if(c.tag!==3)throw Error(t(188));return c.stateNode.current===c?r:o}function I(r){return r=wt(r),r!==null?re(r):null}function re(r){if(r.tag===5||r.tag===6)return r;for(r=r.child;r!==null;){var o=re(r);if(o!==null)return o;r=r.sibling}return null}var ue=e.unstable_scheduleCallback,pe=e.unstable_cancelCallback,se=e.unstable_shouldYield,Ve=e.unstable_requestPaint,Be=e.unstable_now,ct=e.unstable_getCurrentPriorityLevel,ut=e.unstable_ImmediatePriority,St=e.unstable_UserBlockingPriority,At=e.unstable_NormalPriority,mt=e.unstable_LowPriority,Ht=e.unstable_IdlePriority,$t=null,zt=null;function kn(r){if(zt&&typeof zt.onCommitFiberRoot=="function")try{zt.onCommitFiberRoot($t,r,void 0,(r.current.flags&128)===128)}catch{}}var Dt=Math.clz32?Math.clz32:Wt,yt=Math.log,Ci=Math.LN2;function Wt(r){return r>>>=0,r===0?32:31-(yt(r)/Ci|0)|0}var Un=64,Ri=4194304;function _n(r){switch(r&-r){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return r&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return r}}function Gi(r,o){var c=r.pendingLanes;if(c===0)return 0;var d=0,g=r.suspendedLanes,w=r.pingedLanes,C=c&268435455;if(C!==0){var j=C&~g;j!==0?d=_n(j):(w&=C,w!==0&&(d=_n(w)))}else C=c&~g,C!==0?d=_n(C):w!==0&&(d=_n(w));if(d===0)return 0;if(o!==0&&o!==d&&(o&g)===0&&(g=d&-d,w=o&-o,g>=w||g===16&&(w&4194240)!==0))return o;if((d&4)!==0&&(d|=c&16),o=r.entangledLanes,o!==0)for(r=r.entanglements,o&=d;0<o;)c=31-Dt(o),g=1<<c,d|=r[c],o&=~g;return d}function tn(r,o){switch(r){case 1:case 2:case 4:return o+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return o+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function pi(r,o){for(var c=r.suspendedLanes,d=r.pingedLanes,g=r.expirationTimes,w=r.pendingLanes;0<w;){var C=31-Dt(w),j=1<<C,te=g[C];te===-1?((j&c)===0||(j&d)!==0)&&(g[C]=tn(j,o)):te<=o&&(r.expiredLanes|=j),w&=~j}}function tr(r){return r=r.pendingLanes&-1073741825,r!==0?r:r&1073741824?1073741824:0}function Gn(){var r=Un;return Un<<=1,(Un&4194240)===0&&(Un=64),r}function mi(r){for(var o=[],c=0;31>c;c++)o.push(r);return o}function Jn(r,o,c){r.pendingLanes|=o,o!==536870912&&(r.suspendedLanes=0,r.pingedLanes=0),r=r.eventTimes,o=31-Dt(o),r[o]=c}function pl(r,o){var c=r.pendingLanes&~o;r.pendingLanes=o,r.suspendedLanes=0,r.pingedLanes=0,r.expiredLanes&=o,r.mutableReadLanes&=o,r.entangledLanes&=o,o=r.entanglements;var d=r.eventTimes;for(r=r.expirationTimes;0<c;){var g=31-Dt(c),w=1<<g;o[g]=0,d[g]=-1,r[g]=-1,c&=~w}}function Iu(r,o){var c=r.entangledLanes|=o;for(r=r.entanglements;c;){var d=31-Dt(c),g=1<<d;g&o|r[d]&o&&(r[d]|=o),c&=~g}}var Kt=0;function Vp(r){return r&=-r,1<r?4<r?(r&268435455)!==0?16:536870912:4:1}var Gp,Du,Wp,jp,$p,Nu=!1,ml=[],br=null,Tr=null,Ar=null,ia=new Map,ra=new Map,Cr=[],z_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Xp(r,o){switch(r){case"focusin":case"focusout":br=null;break;case"dragenter":case"dragleave":Tr=null;break;case"mouseover":case"mouseout":Ar=null;break;case"pointerover":case"pointerout":ia.delete(o.pointerId);break;case"gotpointercapture":case"lostpointercapture":ra.delete(o.pointerId)}}function sa(r,o,c,d,g,w){return r===null||r.nativeEvent!==w?(r={blockedOn:o,domEventName:c,eventSystemFlags:d,nativeEvent:w,targetContainers:[g]},o!==null&&(o=_a(o),o!==null&&Du(o)),r):(r.eventSystemFlags|=d,o=r.targetContainers,g!==null&&o.indexOf(g)===-1&&o.push(g),r)}function B_(r,o,c,d,g){switch(o){case"focusin":return br=sa(br,r,o,c,d,g),!0;case"dragenter":return Tr=sa(Tr,r,o,c,d,g),!0;case"mouseover":return Ar=sa(Ar,r,o,c,d,g),!0;case"pointerover":var w=g.pointerId;return ia.set(w,sa(ia.get(w)||null,r,o,c,d,g)),!0;case"gotpointercapture":return w=g.pointerId,ra.set(w,sa(ra.get(w)||null,r,o,c,d,g)),!0}return!1}function qp(r){var o=rs(r.target);if(o!==null){var c=vt(o);if(c!==null){if(o=c.tag,o===13){if(o=Lt(c),o!==null){r.blockedOn=o,$p(r.priority,function(){Wp(c)});return}}else if(o===3&&c.stateNode.current.memoizedState.isDehydrated){r.blockedOn=c.tag===3?c.stateNode.containerInfo:null;return}}}r.blockedOn=null}function gl(r){if(r.blockedOn!==null)return!1;for(var o=r.targetContainers;0<o.length;){var c=Uu(r.domEventName,r.eventSystemFlags,o[0],r.nativeEvent);if(c===null){c=r.nativeEvent;var d=new c.constructor(c.type,c);dt=d,c.target.dispatchEvent(d),dt=null}else return o=_a(c),o!==null&&Du(o),r.blockedOn=c,!1;o.shift()}return!0}function Kp(r,o,c){gl(r)&&c.delete(o)}function H_(){Nu=!1,br!==null&&gl(br)&&(br=null),Tr!==null&&gl(Tr)&&(Tr=null),Ar!==null&&gl(Ar)&&(Ar=null),ia.forEach(Kp),ra.forEach(Kp)}function oa(r,o){r.blockedOn===o&&(r.blockedOn=null,Nu||(Nu=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,H_)))}function aa(r){function o(g){return oa(g,r)}if(0<ml.length){oa(ml[0],r);for(var c=1;c<ml.length;c++){var d=ml[c];d.blockedOn===r&&(d.blockedOn=null)}}for(br!==null&&oa(br,r),Tr!==null&&oa(Tr,r),Ar!==null&&oa(Ar,r),ia.forEach(o),ra.forEach(o),c=0;c<Cr.length;c++)d=Cr[c],d.blockedOn===r&&(d.blockedOn=null);for(;0<Cr.length&&(c=Cr[0],c.blockedOn===null);)qp(c),c.blockedOn===null&&Cr.shift()}var Fs=E.ReactCurrentBatchConfig,vl=!0;function V_(r,o,c,d){var g=Kt,w=Fs.transition;Fs.transition=null;try{Kt=1,ku(r,o,c,d)}finally{Kt=g,Fs.transition=w}}function G_(r,o,c,d){var g=Kt,w=Fs.transition;Fs.transition=null;try{Kt=4,ku(r,o,c,d)}finally{Kt=g,Fs.transition=w}}function ku(r,o,c,d){if(vl){var g=Uu(r,o,c,d);if(g===null)Qu(r,o,d,yl,c),Xp(r,d);else if(B_(g,r,o,c,d))d.stopPropagation();else if(Xp(r,d),o&4&&-1<z_.indexOf(r)){for(;g!==null;){var w=_a(g);if(w!==null&&Gp(w),w=Uu(r,o,c,d),w===null&&Qu(r,o,d,yl,c),w===g)break;g=w}g!==null&&d.stopPropagation()}else Qu(r,o,d,null,c)}}var yl=null;function Uu(r,o,c,d){if(yl=null,r=Q(d),r=rs(r),r!==null)if(o=vt(r),o===null)r=null;else if(c=o.tag,c===13){if(r=Lt(o),r!==null)return r;r=null}else if(c===3){if(o.stateNode.current.memoizedState.isDehydrated)return o.tag===3?o.stateNode.containerInfo:null;r=null}else o!==r&&(r=null);return yl=r,null}function Yp(r){switch(r){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(ct()){case ut:return 1;case St:return 4;case At:case mt:return 16;case Ht:return 536870912;default:return 16}default:return 16}}var Rr=null,Ou=null,_l=null;function Zp(){if(_l)return _l;var r,o=Ou,c=o.length,d,g="value"in Rr?Rr.value:Rr.textContent,w=g.length;for(r=0;r<c&&o[r]===g[r];r++);var C=c-r;for(d=1;d<=C&&o[c-d]===g[w-d];d++);return _l=g.slice(r,1<d?1-d:void 0)}function xl(r){var o=r.keyCode;return"charCode"in r?(r=r.charCode,r===0&&o===13&&(r=13)):r=o,r===10&&(r=13),32<=r||r===13?r:0}function Sl(){return!0}function Jp(){return!1}function li(r){function o(c,d,g,w,C){this._reactName=c,this._targetInst=g,this.type=d,this.nativeEvent=w,this.target=C,this.currentTarget=null;for(var j in r)r.hasOwnProperty(j)&&(c=r[j],this[j]=c?c(w):w[j]);return this.isDefaultPrevented=(w.defaultPrevented!=null?w.defaultPrevented:w.returnValue===!1)?Sl:Jp,this.isPropagationStopped=Jp,this}return ee(o.prototype,{preventDefault:function(){this.defaultPrevented=!0;var c=this.nativeEvent;c&&(c.preventDefault?c.preventDefault():typeof c.returnValue!="unknown"&&(c.returnValue=!1),this.isDefaultPrevented=Sl)},stopPropagation:function(){var c=this.nativeEvent;c&&(c.stopPropagation?c.stopPropagation():typeof c.cancelBubble!="unknown"&&(c.cancelBubble=!0),this.isPropagationStopped=Sl)},persist:function(){},isPersistent:Sl}),o}var zs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(r){return r.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Fu=li(zs),la=ee({},zs,{view:0,detail:0}),W_=li(la),zu,Bu,ca,Ml=ee({},la,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Vu,button:0,buttons:0,relatedTarget:function(r){return r.relatedTarget===void 0?r.fromElement===r.srcElement?r.toElement:r.fromElement:r.relatedTarget},movementX:function(r){return"movementX"in r?r.movementX:(r!==ca&&(ca&&r.type==="mousemove"?(zu=r.screenX-ca.screenX,Bu=r.screenY-ca.screenY):Bu=zu=0,ca=r),zu)},movementY:function(r){return"movementY"in r?r.movementY:Bu}}),Qp=li(Ml),j_=ee({},Ml,{dataTransfer:0}),$_=li(j_),X_=ee({},la,{relatedTarget:0}),Hu=li(X_),q_=ee({},zs,{animationName:0,elapsedTime:0,pseudoElement:0}),K_=li(q_),Y_=ee({},zs,{clipboardData:function(r){return"clipboardData"in r?r.clipboardData:window.clipboardData}}),Z_=li(Y_),J_=ee({},zs,{data:0}),em=li(J_),Q_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ex={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},tx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function nx(r){var o=this.nativeEvent;return o.getModifierState?o.getModifierState(r):(r=tx[r])?!!o[r]:!1}function Vu(){return nx}var ix=ee({},la,{key:function(r){if(r.key){var o=Q_[r.key]||r.key;if(o!=="Unidentified")return o}return r.type==="keypress"?(r=xl(r),r===13?"Enter":String.fromCharCode(r)):r.type==="keydown"||r.type==="keyup"?ex[r.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Vu,charCode:function(r){return r.type==="keypress"?xl(r):0},keyCode:function(r){return r.type==="keydown"||r.type==="keyup"?r.keyCode:0},which:function(r){return r.type==="keypress"?xl(r):r.type==="keydown"||r.type==="keyup"?r.keyCode:0}}),rx=li(ix),sx=ee({},Ml,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),tm=li(sx),ox=ee({},la,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Vu}),ax=li(ox),lx=ee({},zs,{propertyName:0,elapsedTime:0,pseudoElement:0}),cx=li(lx),ux=ee({},Ml,{deltaX:function(r){return"deltaX"in r?r.deltaX:"wheelDeltaX"in r?-r.wheelDeltaX:0},deltaY:function(r){return"deltaY"in r?r.deltaY:"wheelDeltaY"in r?-r.wheelDeltaY:"wheelDelta"in r?-r.wheelDelta:0},deltaZ:0,deltaMode:0}),fx=li(ux),dx=[9,13,27,32],Gu=u&&"CompositionEvent"in window,ua=null;u&&"documentMode"in document&&(ua=document.documentMode);var hx=u&&"TextEvent"in window&&!ua,nm=u&&(!Gu||ua&&8<ua&&11>=ua),im=" ",rm=!1;function sm(r,o){switch(r){case"keyup":return dx.indexOf(o.keyCode)!==-1;case"keydown":return o.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function om(r){return r=r.detail,typeof r=="object"&&"data"in r?r.data:null}var Bs=!1;function px(r,o){switch(r){case"compositionend":return om(o);case"keypress":return o.which!==32?null:(rm=!0,im);case"textInput":return r=o.data,r===im&&rm?null:r;default:return null}}function mx(r,o){if(Bs)return r==="compositionend"||!Gu&&sm(r,o)?(r=Zp(),_l=Ou=Rr=null,Bs=!1,r):null;switch(r){case"paste":return null;case"keypress":if(!(o.ctrlKey||o.altKey||o.metaKey)||o.ctrlKey&&o.altKey){if(o.char&&1<o.char.length)return o.char;if(o.which)return String.fromCharCode(o.which)}return null;case"compositionend":return nm&&o.locale!=="ko"?null:o.data;default:return null}}var gx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function am(r){var o=r&&r.nodeName&&r.nodeName.toLowerCase();return o==="input"?!!gx[r.type]:o==="textarea"}function lm(r,o,c,d){Ye(d),o=Al(o,"onChange"),0<o.length&&(c=new Fu("onChange","change",null,c,d),r.push({event:c,listeners:o}))}var fa=null,da=null;function vx(r){Tm(r,0)}function wl(r){var o=js(r);if(ye(o))return r}function yx(r,o){if(r==="change")return o}var cm=!1;if(u){var Wu;if(u){var ju="oninput"in document;if(!ju){var um=document.createElement("div");um.setAttribute("oninput","return;"),ju=typeof um.oninput=="function"}Wu=ju}else Wu=!1;cm=Wu&&(!document.documentMode||9<document.documentMode)}function fm(){fa&&(fa.detachEvent("onpropertychange",dm),da=fa=null)}function dm(r){if(r.propertyName==="value"&&wl(da)){var o=[];lm(o,da,r,Q(r)),gn(vx,o)}}function _x(r,o,c){r==="focusin"?(fm(),fa=o,da=c,fa.attachEvent("onpropertychange",dm)):r==="focusout"&&fm()}function xx(r){if(r==="selectionchange"||r==="keyup"||r==="keydown")return wl(da)}function Sx(r,o){if(r==="click")return wl(o)}function Mx(r,o){if(r==="input"||r==="change")return wl(o)}function wx(r,o){return r===o&&(r!==0||1/r===1/o)||r!==r&&o!==o}var Pi=typeof Object.is=="function"?Object.is:wx;function ha(r,o){if(Pi(r,o))return!0;if(typeof r!="object"||r===null||typeof o!="object"||o===null)return!1;var c=Object.keys(r),d=Object.keys(o);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var g=c[d];if(!f.call(o,g)||!Pi(r[g],o[g]))return!1}return!0}function hm(r){for(;r&&r.firstChild;)r=r.firstChild;return r}function pm(r,o){var c=hm(r);r=0;for(var d;c;){if(c.nodeType===3){if(d=r+c.textContent.length,r<=o&&d>=o)return{node:c,offset:o-r};r=d}e:{for(;c;){if(c.nextSibling){c=c.nextSibling;break e}c=c.parentNode}c=void 0}c=hm(c)}}function mm(r,o){return r&&o?r===o?!0:r&&r.nodeType===3?!1:o&&o.nodeType===3?mm(r,o.parentNode):"contains"in r?r.contains(o):r.compareDocumentPosition?!!(r.compareDocumentPosition(o)&16):!1:!1}function gm(){for(var r=window,o=Le();o instanceof r.HTMLIFrameElement;){try{var c=typeof o.contentWindow.location.href=="string"}catch{c=!1}if(c)r=o.contentWindow;else break;o=Le(r.document)}return o}function $u(r){var o=r&&r.nodeName&&r.nodeName.toLowerCase();return o&&(o==="input"&&(r.type==="text"||r.type==="search"||r.type==="tel"||r.type==="url"||r.type==="password")||o==="textarea"||r.contentEditable==="true")}function Ex(r){var o=gm(),c=r.focusedElem,d=r.selectionRange;if(o!==c&&c&&c.ownerDocument&&mm(c.ownerDocument.documentElement,c)){if(d!==null&&$u(c)){if(o=d.start,r=d.end,r===void 0&&(r=o),"selectionStart"in c)c.selectionStart=o,c.selectionEnd=Math.min(r,c.value.length);else if(r=(o=c.ownerDocument||document)&&o.defaultView||window,r.getSelection){r=r.getSelection();var g=c.textContent.length,w=Math.min(d.start,g);d=d.end===void 0?w:Math.min(d.end,g),!r.extend&&w>d&&(g=d,d=w,w=g),g=pm(c,w);var C=pm(c,d);g&&C&&(r.rangeCount!==1||r.anchorNode!==g.node||r.anchorOffset!==g.offset||r.focusNode!==C.node||r.focusOffset!==C.offset)&&(o=o.createRange(),o.setStart(g.node,g.offset),r.removeAllRanges(),w>d?(r.addRange(o),r.extend(C.node,C.offset)):(o.setEnd(C.node,C.offset),r.addRange(o)))}}for(o=[],r=c;r=r.parentNode;)r.nodeType===1&&o.push({element:r,left:r.scrollLeft,top:r.scrollTop});for(typeof c.focus=="function"&&c.focus(),c=0;c<o.length;c++)r=o[c],r.element.scrollLeft=r.left,r.element.scrollTop=r.top}}var bx=u&&"documentMode"in document&&11>=document.documentMode,Hs=null,Xu=null,pa=null,qu=!1;function vm(r,o,c){var d=c.window===c?c.document:c.nodeType===9?c:c.ownerDocument;qu||Hs==null||Hs!==Le(d)||(d=Hs,"selectionStart"in d&&$u(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),pa&&ha(pa,d)||(pa=d,d=Al(Xu,"onSelect"),0<d.length&&(o=new Fu("onSelect","select",null,o,c),r.push({event:o,listeners:d}),o.target=Hs)))}function El(r,o){var c={};return c[r.toLowerCase()]=o.toLowerCase(),c["Webkit"+r]="webkit"+o,c["Moz"+r]="moz"+o,c}var Vs={animationend:El("Animation","AnimationEnd"),animationiteration:El("Animation","AnimationIteration"),animationstart:El("Animation","AnimationStart"),transitionend:El("Transition","TransitionEnd")},Ku={},ym={};u&&(ym=document.createElement("div").style,"AnimationEvent"in window||(delete Vs.animationend.animation,delete Vs.animationiteration.animation,delete Vs.animationstart.animation),"TransitionEvent"in window||delete Vs.transitionend.transition);function bl(r){if(Ku[r])return Ku[r];if(!Vs[r])return r;var o=Vs[r],c;for(c in o)if(o.hasOwnProperty(c)&&c in ym)return Ku[r]=o[c];return r}var _m=bl("animationend"),xm=bl("animationiteration"),Sm=bl("animationstart"),Mm=bl("transitionend"),wm=new Map,Em="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Pr(r,o){wm.set(r,o),a(o,[r])}for(var Yu=0;Yu<Em.length;Yu++){var Zu=Em[Yu],Tx=Zu.toLowerCase(),Ax=Zu[0].toUpperCase()+Zu.slice(1);Pr(Tx,"on"+Ax)}Pr(_m,"onAnimationEnd"),Pr(xm,"onAnimationIteration"),Pr(Sm,"onAnimationStart"),Pr("dblclick","onDoubleClick"),Pr("focusin","onFocus"),Pr("focusout","onBlur"),Pr(Mm,"onTransitionEnd"),l("onMouseEnter",["mouseout","mouseover"]),l("onMouseLeave",["mouseout","mouseover"]),l("onPointerEnter",["pointerout","pointerover"]),l("onPointerLeave",["pointerout","pointerover"]),a("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),a("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),a("onBeforeInput",["compositionend","keypress","textInput","paste"]),a("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),a("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),a("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ma="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Cx=new Set("cancel close invalid load scroll toggle".split(" ").concat(ma));function bm(r,o,c){var d=r.type||"unknown-event";r.currentTarget=c,rt(d,o,void 0,r),r.currentTarget=null}function Tm(r,o){o=(o&4)!==0;for(var c=0;c<r.length;c++){var d=r[c],g=d.event;d=d.listeners;e:{var w=void 0;if(o)for(var C=d.length-1;0<=C;C--){var j=d[C],te=j.instance,ge=j.currentTarget;if(j=j.listener,te!==w&&g.isPropagationStopped())break e;bm(g,j,ge),w=te}else for(C=0;C<d.length;C++){if(j=d[C],te=j.instance,ge=j.currentTarget,j=j.listener,te!==w&&g.isPropagationStopped())break e;bm(g,j,ge),w=te}}}if(Se)throw r=qe,Se=!1,qe=null,r}function sn(r,o){var c=o[of];c===void 0&&(c=o[of]=new Set);var d=r+"__bubble";c.has(d)||(Am(o,r,2,!1),c.add(d))}function Ju(r,o,c){var d=0;o&&(d|=4),Am(c,r,d,o)}var Tl="_reactListening"+Math.random().toString(36).slice(2);function ga(r){if(!r[Tl]){r[Tl]=!0,n.forEach(function(c){c!=="selectionchange"&&(Cx.has(c)||Ju(c,!1,r),Ju(c,!0,r))});var o=r.nodeType===9?r:r.ownerDocument;o===null||o[Tl]||(o[Tl]=!0,Ju("selectionchange",!1,o))}}function Am(r,o,c,d){switch(Yp(o)){case 1:var g=V_;break;case 4:g=G_;break;default:g=ku}c=g.bind(null,o,c,r),g=void 0,!k||o!=="touchstart"&&o!=="touchmove"&&o!=="wheel"||(g=!0),d?g!==void 0?r.addEventListener(o,c,{capture:!0,passive:g}):r.addEventListener(o,c,!0):g!==void 0?r.addEventListener(o,c,{passive:g}):r.addEventListener(o,c,!1)}function Qu(r,o,c,d,g){var w=d;if((o&1)===0&&(o&2)===0&&d!==null)e:for(;;){if(d===null)return;var C=d.tag;if(C===3||C===4){var j=d.stateNode.containerInfo;if(j===g||j.nodeType===8&&j.parentNode===g)break;if(C===4)for(C=d.return;C!==null;){var te=C.tag;if((te===3||te===4)&&(te=C.stateNode.containerInfo,te===g||te.nodeType===8&&te.parentNode===g))return;C=C.return}for(;j!==null;){if(C=rs(j),C===null)return;if(te=C.tag,te===5||te===6){d=w=C;continue e}j=j.parentNode}}d=d.return}gn(function(){var ge=w,Fe=Q(c),He=[];e:{var ke=wm.get(r);if(ke!==void 0){var st=Fu,ft=r;switch(r){case"keypress":if(xl(c)===0)break e;case"keydown":case"keyup":st=rx;break;case"focusin":ft="focus",st=Hu;break;case"focusout":ft="blur",st=Hu;break;case"beforeblur":case"afterblur":st=Hu;break;case"click":if(c.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":st=Qp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":st=$_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":st=ax;break;case _m:case xm:case Sm:st=K_;break;case Mm:st=cx;break;case"scroll":st=W_;break;case"wheel":st=fx;break;case"copy":case"cut":case"paste":st=Z_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":st=tm}var ht=(o&4)!==0,dn=!ht&&r==="scroll",fe=ht?ke!==null?ke+"Capture":null:ke;ht=[];for(var oe=ge,me;oe!==null;){me=oe;var Xe=me.stateNode;if(me.tag===5&&Xe!==null&&(me=Xe,fe!==null&&(Xe=b(oe,fe),Xe!=null&&ht.push(va(oe,Xe,me)))),dn)break;oe=oe.return}0<ht.length&&(ke=new st(ke,ft,null,c,Fe),He.push({event:ke,listeners:ht}))}}if((o&7)===0){e:{if(ke=r==="mouseover"||r==="pointerover",st=r==="mouseout"||r==="pointerout",ke&&c!==dt&&(ft=c.relatedTarget||c.fromElement)&&(rs(ft)||ft[nr]))break e;if((st||ke)&&(ke=Fe.window===Fe?Fe:(ke=Fe.ownerDocument)?ke.defaultView||ke.parentWindow:window,st?(ft=c.relatedTarget||c.toElement,st=ge,ft=ft?rs(ft):null,ft!==null&&(dn=vt(ft),ft!==dn||ft.tag!==5&&ft.tag!==6)&&(ft=null)):(st=null,ft=ge),st!==ft)){if(ht=Qp,Xe="onMouseLeave",fe="onMouseEnter",oe="mouse",(r==="pointerout"||r==="pointerover")&&(ht=tm,Xe="onPointerLeave",fe="onPointerEnter",oe="pointer"),dn=st==null?ke:js(st),me=ft==null?ke:js(ft),ke=new ht(Xe,oe+"leave",st,c,Fe),ke.target=dn,ke.relatedTarget=me,Xe=null,rs(Fe)===ge&&(ht=new ht(fe,oe+"enter",ft,c,Fe),ht.target=me,ht.relatedTarget=dn,Xe=ht),dn=Xe,st&&ft)t:{for(ht=st,fe=ft,oe=0,me=ht;me;me=Gs(me))oe++;for(me=0,Xe=fe;Xe;Xe=Gs(Xe))me++;for(;0<oe-me;)ht=Gs(ht),oe--;for(;0<me-oe;)fe=Gs(fe),me--;for(;oe--;){if(ht===fe||fe!==null&&ht===fe.alternate)break t;ht=Gs(ht),fe=Gs(fe)}ht=null}else ht=null;st!==null&&Cm(He,ke,st,ht,!1),ft!==null&&dn!==null&&Cm(He,dn,ft,ht,!0)}}e:{if(ke=ge?js(ge):window,st=ke.nodeName&&ke.nodeName.toLowerCase(),st==="select"||st==="input"&&ke.type==="file")var gt=yx;else if(am(ke))if(cm)gt=Mx;else{gt=xx;var Et=_x}else(st=ke.nodeName)&&st.toLowerCase()==="input"&&(ke.type==="checkbox"||ke.type==="radio")&&(gt=Sx);if(gt&&(gt=gt(r,ge))){lm(He,gt,c,Fe);break e}Et&&Et(r,ke,ge),r==="focusout"&&(Et=ke._wrapperState)&&Et.controlled&&ke.type==="number"&&Je(ke,"number",ke.value)}switch(Et=ge?js(ge):window,r){case"focusin":(am(Et)||Et.contentEditable==="true")&&(Hs=Et,Xu=ge,pa=null);break;case"focusout":pa=Xu=Hs=null;break;case"mousedown":qu=!0;break;case"contextmenu":case"mouseup":case"dragend":qu=!1,vm(He,c,Fe);break;case"selectionchange":if(bx)break;case"keydown":case"keyup":vm(He,c,Fe)}var bt;if(Gu)e:{switch(r){case"compositionstart":var Ct="onCompositionStart";break e;case"compositionend":Ct="onCompositionEnd";break e;case"compositionupdate":Ct="onCompositionUpdate";break e}Ct=void 0}else Bs?sm(r,c)&&(Ct="onCompositionEnd"):r==="keydown"&&c.keyCode===229&&(Ct="onCompositionStart");Ct&&(nm&&c.locale!=="ko"&&(Bs||Ct!=="onCompositionStart"?Ct==="onCompositionEnd"&&Bs&&(bt=Zp()):(Rr=Fe,Ou="value"in Rr?Rr.value:Rr.textContent,Bs=!0)),Et=Al(ge,Ct),0<Et.length&&(Ct=new em(Ct,r,null,c,Fe),He.push({event:Ct,listeners:Et}),bt?Ct.data=bt:(bt=om(c),bt!==null&&(Ct.data=bt)))),(bt=hx?px(r,c):mx(r,c))&&(ge=Al(ge,"onBeforeInput"),0<ge.length&&(Fe=new em("onBeforeInput","beforeinput",null,c,Fe),He.push({event:Fe,listeners:ge}),Fe.data=bt))}Tm(He,o)})}function va(r,o,c){return{instance:r,listener:o,currentTarget:c}}function Al(r,o){for(var c=o+"Capture",d=[];r!==null;){var g=r,w=g.stateNode;g.tag===5&&w!==null&&(g=w,w=b(r,c),w!=null&&d.unshift(va(r,w,g)),w=b(r,o),w!=null&&d.push(va(r,w,g))),r=r.return}return d}function Gs(r){if(r===null)return null;do r=r.return;while(r&&r.tag!==5);return r||null}function Cm(r,o,c,d,g){for(var w=o._reactName,C=[];c!==null&&c!==d;){var j=c,te=j.alternate,ge=j.stateNode;if(te!==null&&te===d)break;j.tag===5&&ge!==null&&(j=ge,g?(te=b(c,w),te!=null&&C.unshift(va(c,te,j))):g||(te=b(c,w),te!=null&&C.push(va(c,te,j)))),c=c.return}C.length!==0&&r.push({event:o,listeners:C})}var Rx=/\r\n?/g,Px=/\u0000|\uFFFD/g;function Rm(r){return(typeof r=="string"?r:""+r).replace(Rx,`
`).replace(Px,"")}function Cl(r,o,c){if(o=Rm(o),Rm(r)!==o&&c)throw Error(t(425))}function Rl(){}var ef=null,tf=null;function nf(r,o){return r==="textarea"||r==="noscript"||typeof o.children=="string"||typeof o.children=="number"||typeof o.dangerouslySetInnerHTML=="object"&&o.dangerouslySetInnerHTML!==null&&o.dangerouslySetInnerHTML.__html!=null}var rf=typeof setTimeout=="function"?setTimeout:void 0,Lx=typeof clearTimeout=="function"?clearTimeout:void 0,Pm=typeof Promise=="function"?Promise:void 0,Ix=typeof queueMicrotask=="function"?queueMicrotask:typeof Pm<"u"?function(r){return Pm.resolve(null).then(r).catch(Dx)}:rf;function Dx(r){setTimeout(function(){throw r})}function sf(r,o){var c=o,d=0;do{var g=c.nextSibling;if(r.removeChild(c),g&&g.nodeType===8)if(c=g.data,c==="/$"){if(d===0){r.removeChild(g),aa(o);return}d--}else c!=="$"&&c!=="$?"&&c!=="$!"||d++;c=g}while(c);aa(o)}function Lr(r){for(;r!=null;r=r.nextSibling){var o=r.nodeType;if(o===1||o===3)break;if(o===8){if(o=r.data,o==="$"||o==="$!"||o==="$?")break;if(o==="/$")return null}}return r}function Lm(r){r=r.previousSibling;for(var o=0;r;){if(r.nodeType===8){var c=r.data;if(c==="$"||c==="$!"||c==="$?"){if(o===0)return r;o--}else c==="/$"&&o++}r=r.previousSibling}return null}var Ws=Math.random().toString(36).slice(2),Wi="__reactFiber$"+Ws,ya="__reactProps$"+Ws,nr="__reactContainer$"+Ws,of="__reactEvents$"+Ws,Nx="__reactListeners$"+Ws,kx="__reactHandles$"+Ws;function rs(r){var o=r[Wi];if(o)return o;for(var c=r.parentNode;c;){if(o=c[nr]||c[Wi]){if(c=o.alternate,o.child!==null||c!==null&&c.child!==null)for(r=Lm(r);r!==null;){if(c=r[Wi])return c;r=Lm(r)}return o}r=c,c=r.parentNode}return null}function _a(r){return r=r[Wi]||r[nr],!r||r.tag!==5&&r.tag!==6&&r.tag!==13&&r.tag!==3?null:r}function js(r){if(r.tag===5||r.tag===6)return r.stateNode;throw Error(t(33))}function Pl(r){return r[ya]||null}var af=[],$s=-1;function Ir(r){return{current:r}}function on(r){0>$s||(r.current=af[$s],af[$s]=null,$s--)}function nn(r,o){$s++,af[$s]=r.current,r.current=o}var Dr={},On=Ir(Dr),Qn=Ir(!1),ss=Dr;function Xs(r,o){var c=r.type.contextTypes;if(!c)return Dr;var d=r.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===o)return d.__reactInternalMemoizedMaskedChildContext;var g={},w;for(w in c)g[w]=o[w];return d&&(r=r.stateNode,r.__reactInternalMemoizedUnmaskedChildContext=o,r.__reactInternalMemoizedMaskedChildContext=g),g}function ei(r){return r=r.childContextTypes,r!=null}function Ll(){on(Qn),on(On)}function Im(r,o,c){if(On.current!==Dr)throw Error(t(168));nn(On,o),nn(Qn,c)}function Dm(r,o,c){var d=r.stateNode;if(o=o.childContextTypes,typeof d.getChildContext!="function")return c;d=d.getChildContext();for(var g in d)if(!(g in o))throw Error(t(108,xe(r)||"Unknown",g));return ee({},c,d)}function Il(r){return r=(r=r.stateNode)&&r.__reactInternalMemoizedMergedChildContext||Dr,ss=On.current,nn(On,r),nn(Qn,Qn.current),!0}function Nm(r,o,c){var d=r.stateNode;if(!d)throw Error(t(169));c?(r=Dm(r,o,ss),d.__reactInternalMemoizedMergedChildContext=r,on(Qn),on(On),nn(On,r)):on(Qn),nn(Qn,c)}var ir=null,Dl=!1,lf=!1;function km(r){ir===null?ir=[r]:ir.push(r)}function Ux(r){Dl=!0,km(r)}function Nr(){if(!lf&&ir!==null){lf=!0;var r=0,o=Kt;try{var c=ir;for(Kt=1;r<c.length;r++){var d=c[r];do d=d(!0);while(d!==null)}ir=null,Dl=!1}catch(g){throw ir!==null&&(ir=ir.slice(r+1)),ue(ut,Nr),g}finally{Kt=o,lf=!1}}return null}var qs=[],Ks=0,Nl=null,kl=0,gi=[],vi=0,os=null,rr=1,sr="";function as(r,o){qs[Ks++]=kl,qs[Ks++]=Nl,Nl=r,kl=o}function Um(r,o,c){gi[vi++]=rr,gi[vi++]=sr,gi[vi++]=os,os=r;var d=rr;r=sr;var g=32-Dt(d)-1;d&=~(1<<g),c+=1;var w=32-Dt(o)+g;if(30<w){var C=g-g%5;w=(d&(1<<C)-1).toString(32),d>>=C,g-=C,rr=1<<32-Dt(o)+g|c<<g|d,sr=w+r}else rr=1<<w|c<<g|d,sr=r}function cf(r){r.return!==null&&(as(r,1),Um(r,1,0))}function uf(r){for(;r===Nl;)Nl=qs[--Ks],qs[Ks]=null,kl=qs[--Ks],qs[Ks]=null;for(;r===os;)os=gi[--vi],gi[vi]=null,sr=gi[--vi],gi[vi]=null,rr=gi[--vi],gi[vi]=null}var ci=null,ui=null,an=!1,Li=null;function Om(r,o){var c=Si(5,null,null,0);c.elementType="DELETED",c.stateNode=o,c.return=r,o=r.deletions,o===null?(r.deletions=[c],r.flags|=16):o.push(c)}function Fm(r,o){switch(r.tag){case 5:var c=r.type;return o=o.nodeType!==1||c.toLowerCase()!==o.nodeName.toLowerCase()?null:o,o!==null?(r.stateNode=o,ci=r,ui=Lr(o.firstChild),!0):!1;case 6:return o=r.pendingProps===""||o.nodeType!==3?null:o,o!==null?(r.stateNode=o,ci=r,ui=null,!0):!1;case 13:return o=o.nodeType!==8?null:o,o!==null?(c=os!==null?{id:rr,overflow:sr}:null,r.memoizedState={dehydrated:o,treeContext:c,retryLane:1073741824},c=Si(18,null,null,0),c.stateNode=o,c.return=r,r.child=c,ci=r,ui=null,!0):!1;default:return!1}}function ff(r){return(r.mode&1)!==0&&(r.flags&128)===0}function df(r){if(an){var o=ui;if(o){var c=o;if(!Fm(r,o)){if(ff(r))throw Error(t(418));o=Lr(c.nextSibling);var d=ci;o&&Fm(r,o)?Om(d,c):(r.flags=r.flags&-4097|2,an=!1,ci=r)}}else{if(ff(r))throw Error(t(418));r.flags=r.flags&-4097|2,an=!1,ci=r}}}function zm(r){for(r=r.return;r!==null&&r.tag!==5&&r.tag!==3&&r.tag!==13;)r=r.return;ci=r}function Ul(r){if(r!==ci)return!1;if(!an)return zm(r),an=!0,!1;var o;if((o=r.tag!==3)&&!(o=r.tag!==5)&&(o=r.type,o=o!=="head"&&o!=="body"&&!nf(r.type,r.memoizedProps)),o&&(o=ui)){if(ff(r))throw Bm(),Error(t(418));for(;o;)Om(r,o),o=Lr(o.nextSibling)}if(zm(r),r.tag===13){if(r=r.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(t(317));e:{for(r=r.nextSibling,o=0;r;){if(r.nodeType===8){var c=r.data;if(c==="/$"){if(o===0){ui=Lr(r.nextSibling);break e}o--}else c!=="$"&&c!=="$!"&&c!=="$?"||o++}r=r.nextSibling}ui=null}}else ui=ci?Lr(r.stateNode.nextSibling):null;return!0}function Bm(){for(var r=ui;r;)r=Lr(r.nextSibling)}function Ys(){ui=ci=null,an=!1}function hf(r){Li===null?Li=[r]:Li.push(r)}var Ox=E.ReactCurrentBatchConfig;function xa(r,o,c){if(r=c.ref,r!==null&&typeof r!="function"&&typeof r!="object"){if(c._owner){if(c=c._owner,c){if(c.tag!==1)throw Error(t(309));var d=c.stateNode}if(!d)throw Error(t(147,r));var g=d,w=""+r;return o!==null&&o.ref!==null&&typeof o.ref=="function"&&o.ref._stringRef===w?o.ref:(o=function(C){var j=g.refs;C===null?delete j[w]:j[w]=C},o._stringRef=w,o)}if(typeof r!="string")throw Error(t(284));if(!c._owner)throw Error(t(290,r))}return r}function Ol(r,o){throw r=Object.prototype.toString.call(o),Error(t(31,r==="[object Object]"?"object with keys {"+Object.keys(o).join(", ")+"}":r))}function Hm(r){var o=r._init;return o(r._payload)}function Vm(r){function o(fe,oe){if(r){var me=fe.deletions;me===null?(fe.deletions=[oe],fe.flags|=16):me.push(oe)}}function c(fe,oe){if(!r)return null;for(;oe!==null;)o(fe,oe),oe=oe.sibling;return null}function d(fe,oe){for(fe=new Map;oe!==null;)oe.key!==null?fe.set(oe.key,oe):fe.set(oe.index,oe),oe=oe.sibling;return fe}function g(fe,oe){return fe=Vr(fe,oe),fe.index=0,fe.sibling=null,fe}function w(fe,oe,me){return fe.index=me,r?(me=fe.alternate,me!==null?(me=me.index,me<oe?(fe.flags|=2,oe):me):(fe.flags|=2,oe)):(fe.flags|=1048576,oe)}function C(fe){return r&&fe.alternate===null&&(fe.flags|=2),fe}function j(fe,oe,me,Xe){return oe===null||oe.tag!==6?(oe=rd(me,fe.mode,Xe),oe.return=fe,oe):(oe=g(oe,me),oe.return=fe,oe)}function te(fe,oe,me,Xe){var gt=me.type;return gt===D?Fe(fe,oe,me.props.children,Xe,me.key):oe!==null&&(oe.elementType===gt||typeof gt=="object"&&gt!==null&&gt.$$typeof===ae&&Hm(gt)===oe.type)?(Xe=g(oe,me.props),Xe.ref=xa(fe,oe,me),Xe.return=fe,Xe):(Xe=ac(me.type,me.key,me.props,null,fe.mode,Xe),Xe.ref=xa(fe,oe,me),Xe.return=fe,Xe)}function ge(fe,oe,me,Xe){return oe===null||oe.tag!==4||oe.stateNode.containerInfo!==me.containerInfo||oe.stateNode.implementation!==me.implementation?(oe=sd(me,fe.mode,Xe),oe.return=fe,oe):(oe=g(oe,me.children||[]),oe.return=fe,oe)}function Fe(fe,oe,me,Xe,gt){return oe===null||oe.tag!==7?(oe=ms(me,fe.mode,Xe,gt),oe.return=fe,oe):(oe=g(oe,me),oe.return=fe,oe)}function He(fe,oe,me){if(typeof oe=="string"&&oe!==""||typeof oe=="number")return oe=rd(""+oe,fe.mode,me),oe.return=fe,oe;if(typeof oe=="object"&&oe!==null){switch(oe.$$typeof){case V:return me=ac(oe.type,oe.key,oe.props,null,fe.mode,me),me.ref=xa(fe,null,oe),me.return=fe,me;case N:return oe=sd(oe,fe.mode,me),oe.return=fe,oe;case ae:var Xe=oe._init;return He(fe,Xe(oe._payload),me)}if(ze(oe)||z(oe))return oe=ms(oe,fe.mode,me,null),oe.return=fe,oe;Ol(fe,oe)}return null}function ke(fe,oe,me,Xe){var gt=oe!==null?oe.key:null;if(typeof me=="string"&&me!==""||typeof me=="number")return gt!==null?null:j(fe,oe,""+me,Xe);if(typeof me=="object"&&me!==null){switch(me.$$typeof){case V:return me.key===gt?te(fe,oe,me,Xe):null;case N:return me.key===gt?ge(fe,oe,me,Xe):null;case ae:return gt=me._init,ke(fe,oe,gt(me._payload),Xe)}if(ze(me)||z(me))return gt!==null?null:Fe(fe,oe,me,Xe,null);Ol(fe,me)}return null}function st(fe,oe,me,Xe,gt){if(typeof Xe=="string"&&Xe!==""||typeof Xe=="number")return fe=fe.get(me)||null,j(oe,fe,""+Xe,gt);if(typeof Xe=="object"&&Xe!==null){switch(Xe.$$typeof){case V:return fe=fe.get(Xe.key===null?me:Xe.key)||null,te(oe,fe,Xe,gt);case N:return fe=fe.get(Xe.key===null?me:Xe.key)||null,ge(oe,fe,Xe,gt);case ae:var Et=Xe._init;return st(fe,oe,me,Et(Xe._payload),gt)}if(ze(Xe)||z(Xe))return fe=fe.get(me)||null,Fe(oe,fe,Xe,gt,null);Ol(oe,Xe)}return null}function ft(fe,oe,me,Xe){for(var gt=null,Et=null,bt=oe,Ct=oe=0,Cn=null;bt!==null&&Ct<me.length;Ct++){bt.index>Ct?(Cn=bt,bt=null):Cn=bt.sibling;var jt=ke(fe,bt,me[Ct],Xe);if(jt===null){bt===null&&(bt=Cn);break}r&&bt&&jt.alternate===null&&o(fe,bt),oe=w(jt,oe,Ct),Et===null?gt=jt:Et.sibling=jt,Et=jt,bt=Cn}if(Ct===me.length)return c(fe,bt),an&&as(fe,Ct),gt;if(bt===null){for(;Ct<me.length;Ct++)bt=He(fe,me[Ct],Xe),bt!==null&&(oe=w(bt,oe,Ct),Et===null?gt=bt:Et.sibling=bt,Et=bt);return an&&as(fe,Ct),gt}for(bt=d(fe,bt);Ct<me.length;Ct++)Cn=st(bt,fe,Ct,me[Ct],Xe),Cn!==null&&(r&&Cn.alternate!==null&&bt.delete(Cn.key===null?Ct:Cn.key),oe=w(Cn,oe,Ct),Et===null?gt=Cn:Et.sibling=Cn,Et=Cn);return r&&bt.forEach(function(Gr){return o(fe,Gr)}),an&&as(fe,Ct),gt}function ht(fe,oe,me,Xe){var gt=z(me);if(typeof gt!="function")throw Error(t(150));if(me=gt.call(me),me==null)throw Error(t(151));for(var Et=gt=null,bt=oe,Ct=oe=0,Cn=null,jt=me.next();bt!==null&&!jt.done;Ct++,jt=me.next()){bt.index>Ct?(Cn=bt,bt=null):Cn=bt.sibling;var Gr=ke(fe,bt,jt.value,Xe);if(Gr===null){bt===null&&(bt=Cn);break}r&&bt&&Gr.alternate===null&&o(fe,bt),oe=w(Gr,oe,Ct),Et===null?gt=Gr:Et.sibling=Gr,Et=Gr,bt=Cn}if(jt.done)return c(fe,bt),an&&as(fe,Ct),gt;if(bt===null){for(;!jt.done;Ct++,jt=me.next())jt=He(fe,jt.value,Xe),jt!==null&&(oe=w(jt,oe,Ct),Et===null?gt=jt:Et.sibling=jt,Et=jt);return an&&as(fe,Ct),gt}for(bt=d(fe,bt);!jt.done;Ct++,jt=me.next())jt=st(bt,fe,Ct,jt.value,Xe),jt!==null&&(r&&jt.alternate!==null&&bt.delete(jt.key===null?Ct:jt.key),oe=w(jt,oe,Ct),Et===null?gt=jt:Et.sibling=jt,Et=jt);return r&&bt.forEach(function(g1){return o(fe,g1)}),an&&as(fe,Ct),gt}function dn(fe,oe,me,Xe){if(typeof me=="object"&&me!==null&&me.type===D&&me.key===null&&(me=me.props.children),typeof me=="object"&&me!==null){switch(me.$$typeof){case V:e:{for(var gt=me.key,Et=oe;Et!==null;){if(Et.key===gt){if(gt=me.type,gt===D){if(Et.tag===7){c(fe,Et.sibling),oe=g(Et,me.props.children),oe.return=fe,fe=oe;break e}}else if(Et.elementType===gt||typeof gt=="object"&&gt!==null&&gt.$$typeof===ae&&Hm(gt)===Et.type){c(fe,Et.sibling),oe=g(Et,me.props),oe.ref=xa(fe,Et,me),oe.return=fe,fe=oe;break e}c(fe,Et);break}else o(fe,Et);Et=Et.sibling}me.type===D?(oe=ms(me.props.children,fe.mode,Xe,me.key),oe.return=fe,fe=oe):(Xe=ac(me.type,me.key,me.props,null,fe.mode,Xe),Xe.ref=xa(fe,oe,me),Xe.return=fe,fe=Xe)}return C(fe);case N:e:{for(Et=me.key;oe!==null;){if(oe.key===Et)if(oe.tag===4&&oe.stateNode.containerInfo===me.containerInfo&&oe.stateNode.implementation===me.implementation){c(fe,oe.sibling),oe=g(oe,me.children||[]),oe.return=fe,fe=oe;break e}else{c(fe,oe);break}else o(fe,oe);oe=oe.sibling}oe=sd(me,fe.mode,Xe),oe.return=fe,fe=oe}return C(fe);case ae:return Et=me._init,dn(fe,oe,Et(me._payload),Xe)}if(ze(me))return ft(fe,oe,me,Xe);if(z(me))return ht(fe,oe,me,Xe);Ol(fe,me)}return typeof me=="string"&&me!==""||typeof me=="number"?(me=""+me,oe!==null&&oe.tag===6?(c(fe,oe.sibling),oe=g(oe,me),oe.return=fe,fe=oe):(c(fe,oe),oe=rd(me,fe.mode,Xe),oe.return=fe,fe=oe),C(fe)):c(fe,oe)}return dn}var Zs=Vm(!0),Gm=Vm(!1),Fl=Ir(null),zl=null,Js=null,pf=null;function mf(){pf=Js=zl=null}function gf(r){var o=Fl.current;on(Fl),r._currentValue=o}function vf(r,o,c){for(;r!==null;){var d=r.alternate;if((r.childLanes&o)!==o?(r.childLanes|=o,d!==null&&(d.childLanes|=o)):d!==null&&(d.childLanes&o)!==o&&(d.childLanes|=o),r===c)break;r=r.return}}function Qs(r,o){zl=r,pf=Js=null,r=r.dependencies,r!==null&&r.firstContext!==null&&((r.lanes&o)!==0&&(ti=!0),r.firstContext=null)}function yi(r){var o=r._currentValue;if(pf!==r)if(r={context:r,memoizedValue:o,next:null},Js===null){if(zl===null)throw Error(t(308));Js=r,zl.dependencies={lanes:0,firstContext:r}}else Js=Js.next=r;return o}var ls=null;function yf(r){ls===null?ls=[r]:ls.push(r)}function Wm(r,o,c,d){var g=o.interleaved;return g===null?(c.next=c,yf(o)):(c.next=g.next,g.next=c),o.interleaved=c,or(r,d)}function or(r,o){r.lanes|=o;var c=r.alternate;for(c!==null&&(c.lanes|=o),c=r,r=r.return;r!==null;)r.childLanes|=o,c=r.alternate,c!==null&&(c.childLanes|=o),c=r,r=r.return;return c.tag===3?c.stateNode:null}var kr=!1;function _f(r){r.updateQueue={baseState:r.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function jm(r,o){r=r.updateQueue,o.updateQueue===r&&(o.updateQueue={baseState:r.baseState,firstBaseUpdate:r.firstBaseUpdate,lastBaseUpdate:r.lastBaseUpdate,shared:r.shared,effects:r.effects})}function ar(r,o){return{eventTime:r,lane:o,tag:0,payload:null,callback:null,next:null}}function Ur(r,o,c){var d=r.updateQueue;if(d===null)return null;if(d=d.shared,(Vt&2)!==0){var g=d.pending;return g===null?o.next=o:(o.next=g.next,g.next=o),d.pending=o,or(r,c)}return g=d.interleaved,g===null?(o.next=o,yf(d)):(o.next=g.next,g.next=o),d.interleaved=o,or(r,c)}function Bl(r,o,c){if(o=o.updateQueue,o!==null&&(o=o.shared,(c&4194240)!==0)){var d=o.lanes;d&=r.pendingLanes,c|=d,o.lanes=c,Iu(r,c)}}function $m(r,o){var c=r.updateQueue,d=r.alternate;if(d!==null&&(d=d.updateQueue,c===d)){var g=null,w=null;if(c=c.firstBaseUpdate,c!==null){do{var C={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};w===null?g=w=C:w=w.next=C,c=c.next}while(c!==null);w===null?g=w=o:w=w.next=o}else g=w=o;c={baseState:d.baseState,firstBaseUpdate:g,lastBaseUpdate:w,shared:d.shared,effects:d.effects},r.updateQueue=c;return}r=c.lastBaseUpdate,r===null?c.firstBaseUpdate=o:r.next=o,c.lastBaseUpdate=o}function Hl(r,o,c,d){var g=r.updateQueue;kr=!1;var w=g.firstBaseUpdate,C=g.lastBaseUpdate,j=g.shared.pending;if(j!==null){g.shared.pending=null;var te=j,ge=te.next;te.next=null,C===null?w=ge:C.next=ge,C=te;var Fe=r.alternate;Fe!==null&&(Fe=Fe.updateQueue,j=Fe.lastBaseUpdate,j!==C&&(j===null?Fe.firstBaseUpdate=ge:j.next=ge,Fe.lastBaseUpdate=te))}if(w!==null){var He=g.baseState;C=0,Fe=ge=te=null,j=w;do{var ke=j.lane,st=j.eventTime;if((d&ke)===ke){Fe!==null&&(Fe=Fe.next={eventTime:st,lane:0,tag:j.tag,payload:j.payload,callback:j.callback,next:null});e:{var ft=r,ht=j;switch(ke=o,st=c,ht.tag){case 1:if(ft=ht.payload,typeof ft=="function"){He=ft.call(st,He,ke);break e}He=ft;break e;case 3:ft.flags=ft.flags&-65537|128;case 0:if(ft=ht.payload,ke=typeof ft=="function"?ft.call(st,He,ke):ft,ke==null)break e;He=ee({},He,ke);break e;case 2:kr=!0}}j.callback!==null&&j.lane!==0&&(r.flags|=64,ke=g.effects,ke===null?g.effects=[j]:ke.push(j))}else st={eventTime:st,lane:ke,tag:j.tag,payload:j.payload,callback:j.callback,next:null},Fe===null?(ge=Fe=st,te=He):Fe=Fe.next=st,C|=ke;if(j=j.next,j===null){if(j=g.shared.pending,j===null)break;ke=j,j=ke.next,ke.next=null,g.lastBaseUpdate=ke,g.shared.pending=null}}while(!0);if(Fe===null&&(te=He),g.baseState=te,g.firstBaseUpdate=ge,g.lastBaseUpdate=Fe,o=g.shared.interleaved,o!==null){g=o;do C|=g.lane,g=g.next;while(g!==o)}else w===null&&(g.shared.lanes=0);fs|=C,r.lanes=C,r.memoizedState=He}}function Xm(r,o,c){if(r=o.effects,o.effects=null,r!==null)for(o=0;o<r.length;o++){var d=r[o],g=d.callback;if(g!==null){if(d.callback=null,d=c,typeof g!="function")throw Error(t(191,g));g.call(d)}}}var Sa={},ji=Ir(Sa),Ma=Ir(Sa),wa=Ir(Sa);function cs(r){if(r===Sa)throw Error(t(174));return r}function xf(r,o){switch(nn(wa,o),nn(Ma,r),nn(ji,Sa),r=o.nodeType,r){case 9:case 11:o=(o=o.documentElement)?o.namespaceURI:Qe(null,"");break;default:r=r===8?o.parentNode:o,o=r.namespaceURI||null,r=r.tagName,o=Qe(o,r)}on(ji),nn(ji,o)}function eo(){on(ji),on(Ma),on(wa)}function qm(r){cs(wa.current);var o=cs(ji.current),c=Qe(o,r.type);o!==c&&(nn(Ma,r),nn(ji,c))}function Sf(r){Ma.current===r&&(on(ji),on(Ma))}var ln=Ir(0);function Vl(r){for(var o=r;o!==null;){if(o.tag===13){var c=o.memoizedState;if(c!==null&&(c=c.dehydrated,c===null||c.data==="$?"||c.data==="$!"))return o}else if(o.tag===19&&o.memoizedProps.revealOrder!==void 0){if((o.flags&128)!==0)return o}else if(o.child!==null){o.child.return=o,o=o.child;continue}if(o===r)break;for(;o.sibling===null;){if(o.return===null||o.return===r)return null;o=o.return}o.sibling.return=o.return,o=o.sibling}return null}var Mf=[];function wf(){for(var r=0;r<Mf.length;r++)Mf[r]._workInProgressVersionPrimary=null;Mf.length=0}var Gl=E.ReactCurrentDispatcher,Ef=E.ReactCurrentBatchConfig,us=0,cn=null,xn=null,Tn=null,Wl=!1,Ea=!1,ba=0,Fx=0;function Fn(){throw Error(t(321))}function bf(r,o){if(o===null)return!1;for(var c=0;c<o.length&&c<r.length;c++)if(!Pi(r[c],o[c]))return!1;return!0}function Tf(r,o,c,d,g,w){if(us=w,cn=o,o.memoizedState=null,o.updateQueue=null,o.lanes=0,Gl.current=r===null||r.memoizedState===null?Vx:Gx,r=c(d,g),Ea){w=0;do{if(Ea=!1,ba=0,25<=w)throw Error(t(301));w+=1,Tn=xn=null,o.updateQueue=null,Gl.current=Wx,r=c(d,g)}while(Ea)}if(Gl.current=Xl,o=xn!==null&&xn.next!==null,us=0,Tn=xn=cn=null,Wl=!1,o)throw Error(t(300));return r}function Af(){var r=ba!==0;return ba=0,r}function $i(){var r={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Tn===null?cn.memoizedState=Tn=r:Tn=Tn.next=r,Tn}function _i(){if(xn===null){var r=cn.alternate;r=r!==null?r.memoizedState:null}else r=xn.next;var o=Tn===null?cn.memoizedState:Tn.next;if(o!==null)Tn=o,xn=r;else{if(r===null)throw Error(t(310));xn=r,r={memoizedState:xn.memoizedState,baseState:xn.baseState,baseQueue:xn.baseQueue,queue:xn.queue,next:null},Tn===null?cn.memoizedState=Tn=r:Tn=Tn.next=r}return Tn}function Ta(r,o){return typeof o=="function"?o(r):o}function Cf(r){var o=_i(),c=o.queue;if(c===null)throw Error(t(311));c.lastRenderedReducer=r;var d=xn,g=d.baseQueue,w=c.pending;if(w!==null){if(g!==null){var C=g.next;g.next=w.next,w.next=C}d.baseQueue=g=w,c.pending=null}if(g!==null){w=g.next,d=d.baseState;var j=C=null,te=null,ge=w;do{var Fe=ge.lane;if((us&Fe)===Fe)te!==null&&(te=te.next={lane:0,action:ge.action,hasEagerState:ge.hasEagerState,eagerState:ge.eagerState,next:null}),d=ge.hasEagerState?ge.eagerState:r(d,ge.action);else{var He={lane:Fe,action:ge.action,hasEagerState:ge.hasEagerState,eagerState:ge.eagerState,next:null};te===null?(j=te=He,C=d):te=te.next=He,cn.lanes|=Fe,fs|=Fe}ge=ge.next}while(ge!==null&&ge!==w);te===null?C=d:te.next=j,Pi(d,o.memoizedState)||(ti=!0),o.memoizedState=d,o.baseState=C,o.baseQueue=te,c.lastRenderedState=d}if(r=c.interleaved,r!==null){g=r;do w=g.lane,cn.lanes|=w,fs|=w,g=g.next;while(g!==r)}else g===null&&(c.lanes=0);return[o.memoizedState,c.dispatch]}function Rf(r){var o=_i(),c=o.queue;if(c===null)throw Error(t(311));c.lastRenderedReducer=r;var d=c.dispatch,g=c.pending,w=o.memoizedState;if(g!==null){c.pending=null;var C=g=g.next;do w=r(w,C.action),C=C.next;while(C!==g);Pi(w,o.memoizedState)||(ti=!0),o.memoizedState=w,o.baseQueue===null&&(o.baseState=w),c.lastRenderedState=w}return[w,d]}function Km(){}function Ym(r,o){var c=cn,d=_i(),g=o(),w=!Pi(d.memoizedState,g);if(w&&(d.memoizedState=g,ti=!0),d=d.queue,Pf(Qm.bind(null,c,d,r),[r]),d.getSnapshot!==o||w||Tn!==null&&Tn.memoizedState.tag&1){if(c.flags|=2048,Aa(9,Jm.bind(null,c,d,g,o),void 0,null),An===null)throw Error(t(349));(us&30)!==0||Zm(c,o,g)}return g}function Zm(r,o,c){r.flags|=16384,r={getSnapshot:o,value:c},o=cn.updateQueue,o===null?(o={lastEffect:null,stores:null},cn.updateQueue=o,o.stores=[r]):(c=o.stores,c===null?o.stores=[r]:c.push(r))}function Jm(r,o,c,d){o.value=c,o.getSnapshot=d,e0(o)&&t0(r)}function Qm(r,o,c){return c(function(){e0(o)&&t0(r)})}function e0(r){var o=r.getSnapshot;r=r.value;try{var c=o();return!Pi(r,c)}catch{return!0}}function t0(r){var o=or(r,1);o!==null&&ki(o,r,1,-1)}function n0(r){var o=$i();return typeof r=="function"&&(r=r()),o.memoizedState=o.baseState=r,r={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ta,lastRenderedState:r},o.queue=r,r=r.dispatch=Hx.bind(null,cn,r),[o.memoizedState,r]}function Aa(r,o,c,d){return r={tag:r,create:o,destroy:c,deps:d,next:null},o=cn.updateQueue,o===null?(o={lastEffect:null,stores:null},cn.updateQueue=o,o.lastEffect=r.next=r):(c=o.lastEffect,c===null?o.lastEffect=r.next=r:(d=c.next,c.next=r,r.next=d,o.lastEffect=r)),r}function i0(){return _i().memoizedState}function jl(r,o,c,d){var g=$i();cn.flags|=r,g.memoizedState=Aa(1|o,c,void 0,d===void 0?null:d)}function $l(r,o,c,d){var g=_i();d=d===void 0?null:d;var w=void 0;if(xn!==null){var C=xn.memoizedState;if(w=C.destroy,d!==null&&bf(d,C.deps)){g.memoizedState=Aa(o,c,w,d);return}}cn.flags|=r,g.memoizedState=Aa(1|o,c,w,d)}function r0(r,o){return jl(8390656,8,r,o)}function Pf(r,o){return $l(2048,8,r,o)}function s0(r,o){return $l(4,2,r,o)}function o0(r,o){return $l(4,4,r,o)}function a0(r,o){if(typeof o=="function")return r=r(),o(r),function(){o(null)};if(o!=null)return r=r(),o.current=r,function(){o.current=null}}function l0(r,o,c){return c=c!=null?c.concat([r]):null,$l(4,4,a0.bind(null,o,r),c)}function Lf(){}function c0(r,o){var c=_i();o=o===void 0?null:o;var d=c.memoizedState;return d!==null&&o!==null&&bf(o,d[1])?d[0]:(c.memoizedState=[r,o],r)}function u0(r,o){var c=_i();o=o===void 0?null:o;var d=c.memoizedState;return d!==null&&o!==null&&bf(o,d[1])?d[0]:(r=r(),c.memoizedState=[r,o],r)}function f0(r,o,c){return(us&21)===0?(r.baseState&&(r.baseState=!1,ti=!0),r.memoizedState=c):(Pi(c,o)||(c=Gn(),cn.lanes|=c,fs|=c,r.baseState=!0),o)}function zx(r,o){var c=Kt;Kt=c!==0&&4>c?c:4,r(!0);var d=Ef.transition;Ef.transition={};try{r(!1),o()}finally{Kt=c,Ef.transition=d}}function d0(){return _i().memoizedState}function Bx(r,o,c){var d=Br(r);if(c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null},h0(r))p0(o,c);else if(c=Wm(r,o,c,d),c!==null){var g=jn();ki(c,r,d,g),m0(c,o,d)}}function Hx(r,o,c){var d=Br(r),g={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(h0(r))p0(o,g);else{var w=r.alternate;if(r.lanes===0&&(w===null||w.lanes===0)&&(w=o.lastRenderedReducer,w!==null))try{var C=o.lastRenderedState,j=w(C,c);if(g.hasEagerState=!0,g.eagerState=j,Pi(j,C)){var te=o.interleaved;te===null?(g.next=g,yf(o)):(g.next=te.next,te.next=g),o.interleaved=g;return}}catch{}finally{}c=Wm(r,o,g,d),c!==null&&(g=jn(),ki(c,r,d,g),m0(c,o,d))}}function h0(r){var o=r.alternate;return r===cn||o!==null&&o===cn}function p0(r,o){Ea=Wl=!0;var c=r.pending;c===null?o.next=o:(o.next=c.next,c.next=o),r.pending=o}function m0(r,o,c){if((c&4194240)!==0){var d=o.lanes;d&=r.pendingLanes,c|=d,o.lanes=c,Iu(r,c)}}var Xl={readContext:yi,useCallback:Fn,useContext:Fn,useEffect:Fn,useImperativeHandle:Fn,useInsertionEffect:Fn,useLayoutEffect:Fn,useMemo:Fn,useReducer:Fn,useRef:Fn,useState:Fn,useDebugValue:Fn,useDeferredValue:Fn,useTransition:Fn,useMutableSource:Fn,useSyncExternalStore:Fn,useId:Fn,unstable_isNewReconciler:!1},Vx={readContext:yi,useCallback:function(r,o){return $i().memoizedState=[r,o===void 0?null:o],r},useContext:yi,useEffect:r0,useImperativeHandle:function(r,o,c){return c=c!=null?c.concat([r]):null,jl(4194308,4,a0.bind(null,o,r),c)},useLayoutEffect:function(r,o){return jl(4194308,4,r,o)},useInsertionEffect:function(r,o){return jl(4,2,r,o)},useMemo:function(r,o){var c=$i();return o=o===void 0?null:o,r=r(),c.memoizedState=[r,o],r},useReducer:function(r,o,c){var d=$i();return o=c!==void 0?c(o):o,d.memoizedState=d.baseState=o,r={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:r,lastRenderedState:o},d.queue=r,r=r.dispatch=Bx.bind(null,cn,r),[d.memoizedState,r]},useRef:function(r){var o=$i();return r={current:r},o.memoizedState=r},useState:n0,useDebugValue:Lf,useDeferredValue:function(r){return $i().memoizedState=r},useTransition:function(){var r=n0(!1),o=r[0];return r=zx.bind(null,r[1]),$i().memoizedState=r,[o,r]},useMutableSource:function(){},useSyncExternalStore:function(r,o,c){var d=cn,g=$i();if(an){if(c===void 0)throw Error(t(407));c=c()}else{if(c=o(),An===null)throw Error(t(349));(us&30)!==0||Zm(d,o,c)}g.memoizedState=c;var w={value:c,getSnapshot:o};return g.queue=w,r0(Qm.bind(null,d,w,r),[r]),d.flags|=2048,Aa(9,Jm.bind(null,d,w,c,o),void 0,null),c},useId:function(){var r=$i(),o=An.identifierPrefix;if(an){var c=sr,d=rr;c=(d&~(1<<32-Dt(d)-1)).toString(32)+c,o=":"+o+"R"+c,c=ba++,0<c&&(o+="H"+c.toString(32)),o+=":"}else c=Fx++,o=":"+o+"r"+c.toString(32)+":";return r.memoizedState=o},unstable_isNewReconciler:!1},Gx={readContext:yi,useCallback:c0,useContext:yi,useEffect:Pf,useImperativeHandle:l0,useInsertionEffect:s0,useLayoutEffect:o0,useMemo:u0,useReducer:Cf,useRef:i0,useState:function(){return Cf(Ta)},useDebugValue:Lf,useDeferredValue:function(r){var o=_i();return f0(o,xn.memoizedState,r)},useTransition:function(){var r=Cf(Ta)[0],o=_i().memoizedState;return[r,o]},useMutableSource:Km,useSyncExternalStore:Ym,useId:d0,unstable_isNewReconciler:!1},Wx={readContext:yi,useCallback:c0,useContext:yi,useEffect:Pf,useImperativeHandle:l0,useInsertionEffect:s0,useLayoutEffect:o0,useMemo:u0,useReducer:Rf,useRef:i0,useState:function(){return Rf(Ta)},useDebugValue:Lf,useDeferredValue:function(r){var o=_i();return xn===null?o.memoizedState=r:f0(o,xn.memoizedState,r)},useTransition:function(){var r=Rf(Ta)[0],o=_i().memoizedState;return[r,o]},useMutableSource:Km,useSyncExternalStore:Ym,useId:d0,unstable_isNewReconciler:!1};function Ii(r,o){if(r&&r.defaultProps){o=ee({},o),r=r.defaultProps;for(var c in r)o[c]===void 0&&(o[c]=r[c]);return o}return o}function If(r,o,c,d){o=r.memoizedState,c=c(d,o),c=c==null?o:ee({},o,c),r.memoizedState=c,r.lanes===0&&(r.updateQueue.baseState=c)}var ql={isMounted:function(r){return(r=r._reactInternals)?vt(r)===r:!1},enqueueSetState:function(r,o,c){r=r._reactInternals;var d=jn(),g=Br(r),w=ar(d,g);w.payload=o,c!=null&&(w.callback=c),o=Ur(r,w,g),o!==null&&(ki(o,r,g,d),Bl(o,r,g))},enqueueReplaceState:function(r,o,c){r=r._reactInternals;var d=jn(),g=Br(r),w=ar(d,g);w.tag=1,w.payload=o,c!=null&&(w.callback=c),o=Ur(r,w,g),o!==null&&(ki(o,r,g,d),Bl(o,r,g))},enqueueForceUpdate:function(r,o){r=r._reactInternals;var c=jn(),d=Br(r),g=ar(c,d);g.tag=2,o!=null&&(g.callback=o),o=Ur(r,g,d),o!==null&&(ki(o,r,d,c),Bl(o,r,d))}};function g0(r,o,c,d,g,w,C){return r=r.stateNode,typeof r.shouldComponentUpdate=="function"?r.shouldComponentUpdate(d,w,C):o.prototype&&o.prototype.isPureReactComponent?!ha(c,d)||!ha(g,w):!0}function v0(r,o,c){var d=!1,g=Dr,w=o.contextType;return typeof w=="object"&&w!==null?w=yi(w):(g=ei(o)?ss:On.current,d=o.contextTypes,w=(d=d!=null)?Xs(r,g):Dr),o=new o(c,w),r.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,o.updater=ql,r.stateNode=o,o._reactInternals=r,d&&(r=r.stateNode,r.__reactInternalMemoizedUnmaskedChildContext=g,r.__reactInternalMemoizedMaskedChildContext=w),o}function y0(r,o,c,d){r=o.state,typeof o.componentWillReceiveProps=="function"&&o.componentWillReceiveProps(c,d),typeof o.UNSAFE_componentWillReceiveProps=="function"&&o.UNSAFE_componentWillReceiveProps(c,d),o.state!==r&&ql.enqueueReplaceState(o,o.state,null)}function Df(r,o,c,d){var g=r.stateNode;g.props=c,g.state=r.memoizedState,g.refs={},_f(r);var w=o.contextType;typeof w=="object"&&w!==null?g.context=yi(w):(w=ei(o)?ss:On.current,g.context=Xs(r,w)),g.state=r.memoizedState,w=o.getDerivedStateFromProps,typeof w=="function"&&(If(r,o,w,c),g.state=r.memoizedState),typeof o.getDerivedStateFromProps=="function"||typeof g.getSnapshotBeforeUpdate=="function"||typeof g.UNSAFE_componentWillMount!="function"&&typeof g.componentWillMount!="function"||(o=g.state,typeof g.componentWillMount=="function"&&g.componentWillMount(),typeof g.UNSAFE_componentWillMount=="function"&&g.UNSAFE_componentWillMount(),o!==g.state&&ql.enqueueReplaceState(g,g.state,null),Hl(r,c,g,d),g.state=r.memoizedState),typeof g.componentDidMount=="function"&&(r.flags|=4194308)}function to(r,o){try{var c="",d=o;do c+=ce(d),d=d.return;while(d);var g=c}catch(w){g=`
Error generating stack: `+w.message+`
`+w.stack}return{value:r,source:o,stack:g,digest:null}}function Nf(r,o,c){return{value:r,source:null,stack:c??null,digest:o??null}}function kf(r,o){try{console.error(o.value)}catch(c){setTimeout(function(){throw c})}}var jx=typeof WeakMap=="function"?WeakMap:Map;function _0(r,o,c){c=ar(-1,c),c.tag=3,c.payload={element:null};var d=o.value;return c.callback=function(){tc||(tc=!0,Yf=d),kf(r,o)},c}function x0(r,o,c){c=ar(-1,c),c.tag=3;var d=r.type.getDerivedStateFromError;if(typeof d=="function"){var g=o.value;c.payload=function(){return d(g)},c.callback=function(){kf(r,o)}}var w=r.stateNode;return w!==null&&typeof w.componentDidCatch=="function"&&(c.callback=function(){kf(r,o),typeof d!="function"&&(Fr===null?Fr=new Set([this]):Fr.add(this));var C=o.stack;this.componentDidCatch(o.value,{componentStack:C!==null?C:""})}),c}function S0(r,o,c){var d=r.pingCache;if(d===null){d=r.pingCache=new jx;var g=new Set;d.set(o,g)}else g=d.get(o),g===void 0&&(g=new Set,d.set(o,g));g.has(c)||(g.add(c),r=s1.bind(null,r,o,c),o.then(r,r))}function M0(r){do{var o;if((o=r.tag===13)&&(o=r.memoizedState,o=o!==null?o.dehydrated!==null:!0),o)return r;r=r.return}while(r!==null);return null}function w0(r,o,c,d,g){return(r.mode&1)===0?(r===o?r.flags|=65536:(r.flags|=128,c.flags|=131072,c.flags&=-52805,c.tag===1&&(c.alternate===null?c.tag=17:(o=ar(-1,1),o.tag=2,Ur(c,o,1))),c.lanes|=1),r):(r.flags|=65536,r.lanes=g,r)}var $x=E.ReactCurrentOwner,ti=!1;function Wn(r,o,c,d){o.child=r===null?Gm(o,null,c,d):Zs(o,r.child,c,d)}function E0(r,o,c,d,g){c=c.render;var w=o.ref;return Qs(o,g),d=Tf(r,o,c,d,w,g),c=Af(),r!==null&&!ti?(o.updateQueue=r.updateQueue,o.flags&=-2053,r.lanes&=~g,lr(r,o,g)):(an&&c&&cf(o),o.flags|=1,Wn(r,o,d,g),o.child)}function b0(r,o,c,d,g){if(r===null){var w=c.type;return typeof w=="function"&&!id(w)&&w.defaultProps===void 0&&c.compare===null&&c.defaultProps===void 0?(o.tag=15,o.type=w,T0(r,o,w,d,g)):(r=ac(c.type,null,d,o,o.mode,g),r.ref=o.ref,r.return=o,o.child=r)}if(w=r.child,(r.lanes&g)===0){var C=w.memoizedProps;if(c=c.compare,c=c!==null?c:ha,c(C,d)&&r.ref===o.ref)return lr(r,o,g)}return o.flags|=1,r=Vr(w,d),r.ref=o.ref,r.return=o,o.child=r}function T0(r,o,c,d,g){if(r!==null){var w=r.memoizedProps;if(ha(w,d)&&r.ref===o.ref)if(ti=!1,o.pendingProps=d=w,(r.lanes&g)!==0)(r.flags&131072)!==0&&(ti=!0);else return o.lanes=r.lanes,lr(r,o,g)}return Uf(r,o,c,d,g)}function A0(r,o,c){var d=o.pendingProps,g=d.children,w=r!==null?r.memoizedState:null;if(d.mode==="hidden")if((o.mode&1)===0)o.memoizedState={baseLanes:0,cachePool:null,transitions:null},nn(io,fi),fi|=c;else{if((c&1073741824)===0)return r=w!==null?w.baseLanes|c:c,o.lanes=o.childLanes=1073741824,o.memoizedState={baseLanes:r,cachePool:null,transitions:null},o.updateQueue=null,nn(io,fi),fi|=r,null;o.memoizedState={baseLanes:0,cachePool:null,transitions:null},d=w!==null?w.baseLanes:c,nn(io,fi),fi|=d}else w!==null?(d=w.baseLanes|c,o.memoizedState=null):d=c,nn(io,fi),fi|=d;return Wn(r,o,g,c),o.child}function C0(r,o){var c=o.ref;(r===null&&c!==null||r!==null&&r.ref!==c)&&(o.flags|=512,o.flags|=2097152)}function Uf(r,o,c,d,g){var w=ei(c)?ss:On.current;return w=Xs(o,w),Qs(o,g),c=Tf(r,o,c,d,w,g),d=Af(),r!==null&&!ti?(o.updateQueue=r.updateQueue,o.flags&=-2053,r.lanes&=~g,lr(r,o,g)):(an&&d&&cf(o),o.flags|=1,Wn(r,o,c,g),o.child)}function R0(r,o,c,d,g){if(ei(c)){var w=!0;Il(o)}else w=!1;if(Qs(o,g),o.stateNode===null)Yl(r,o),v0(o,c,d),Df(o,c,d,g),d=!0;else if(r===null){var C=o.stateNode,j=o.memoizedProps;C.props=j;var te=C.context,ge=c.contextType;typeof ge=="object"&&ge!==null?ge=yi(ge):(ge=ei(c)?ss:On.current,ge=Xs(o,ge));var Fe=c.getDerivedStateFromProps,He=typeof Fe=="function"||typeof C.getSnapshotBeforeUpdate=="function";He||typeof C.UNSAFE_componentWillReceiveProps!="function"&&typeof C.componentWillReceiveProps!="function"||(j!==d||te!==ge)&&y0(o,C,d,ge),kr=!1;var ke=o.memoizedState;C.state=ke,Hl(o,d,C,g),te=o.memoizedState,j!==d||ke!==te||Qn.current||kr?(typeof Fe=="function"&&(If(o,c,Fe,d),te=o.memoizedState),(j=kr||g0(o,c,j,d,ke,te,ge))?(He||typeof C.UNSAFE_componentWillMount!="function"&&typeof C.componentWillMount!="function"||(typeof C.componentWillMount=="function"&&C.componentWillMount(),typeof C.UNSAFE_componentWillMount=="function"&&C.UNSAFE_componentWillMount()),typeof C.componentDidMount=="function"&&(o.flags|=4194308)):(typeof C.componentDidMount=="function"&&(o.flags|=4194308),o.memoizedProps=d,o.memoizedState=te),C.props=d,C.state=te,C.context=ge,d=j):(typeof C.componentDidMount=="function"&&(o.flags|=4194308),d=!1)}else{C=o.stateNode,jm(r,o),j=o.memoizedProps,ge=o.type===o.elementType?j:Ii(o.type,j),C.props=ge,He=o.pendingProps,ke=C.context,te=c.contextType,typeof te=="object"&&te!==null?te=yi(te):(te=ei(c)?ss:On.current,te=Xs(o,te));var st=c.getDerivedStateFromProps;(Fe=typeof st=="function"||typeof C.getSnapshotBeforeUpdate=="function")||typeof C.UNSAFE_componentWillReceiveProps!="function"&&typeof C.componentWillReceiveProps!="function"||(j!==He||ke!==te)&&y0(o,C,d,te),kr=!1,ke=o.memoizedState,C.state=ke,Hl(o,d,C,g);var ft=o.memoizedState;j!==He||ke!==ft||Qn.current||kr?(typeof st=="function"&&(If(o,c,st,d),ft=o.memoizedState),(ge=kr||g0(o,c,ge,d,ke,ft,te)||!1)?(Fe||typeof C.UNSAFE_componentWillUpdate!="function"&&typeof C.componentWillUpdate!="function"||(typeof C.componentWillUpdate=="function"&&C.componentWillUpdate(d,ft,te),typeof C.UNSAFE_componentWillUpdate=="function"&&C.UNSAFE_componentWillUpdate(d,ft,te)),typeof C.componentDidUpdate=="function"&&(o.flags|=4),typeof C.getSnapshotBeforeUpdate=="function"&&(o.flags|=1024)):(typeof C.componentDidUpdate!="function"||j===r.memoizedProps&&ke===r.memoizedState||(o.flags|=4),typeof C.getSnapshotBeforeUpdate!="function"||j===r.memoizedProps&&ke===r.memoizedState||(o.flags|=1024),o.memoizedProps=d,o.memoizedState=ft),C.props=d,C.state=ft,C.context=te,d=ge):(typeof C.componentDidUpdate!="function"||j===r.memoizedProps&&ke===r.memoizedState||(o.flags|=4),typeof C.getSnapshotBeforeUpdate!="function"||j===r.memoizedProps&&ke===r.memoizedState||(o.flags|=1024),d=!1)}return Of(r,o,c,d,w,g)}function Of(r,o,c,d,g,w){C0(r,o);var C=(o.flags&128)!==0;if(!d&&!C)return g&&Nm(o,c,!1),lr(r,o,w);d=o.stateNode,$x.current=o;var j=C&&typeof c.getDerivedStateFromError!="function"?null:d.render();return o.flags|=1,r!==null&&C?(o.child=Zs(o,r.child,null,w),o.child=Zs(o,null,j,w)):Wn(r,o,j,w),o.memoizedState=d.state,g&&Nm(o,c,!0),o.child}function P0(r){var o=r.stateNode;o.pendingContext?Im(r,o.pendingContext,o.pendingContext!==o.context):o.context&&Im(r,o.context,!1),xf(r,o.containerInfo)}function L0(r,o,c,d,g){return Ys(),hf(g),o.flags|=256,Wn(r,o,c,d),o.child}var Ff={dehydrated:null,treeContext:null,retryLane:0};function zf(r){return{baseLanes:r,cachePool:null,transitions:null}}function I0(r,o,c){var d=o.pendingProps,g=ln.current,w=!1,C=(o.flags&128)!==0,j;if((j=C)||(j=r!==null&&r.memoizedState===null?!1:(g&2)!==0),j?(w=!0,o.flags&=-129):(r===null||r.memoizedState!==null)&&(g|=1),nn(ln,g&1),r===null)return df(o),r=o.memoizedState,r!==null&&(r=r.dehydrated,r!==null)?((o.mode&1)===0?o.lanes=1:r.data==="$!"?o.lanes=8:o.lanes=1073741824,null):(C=d.children,r=d.fallback,w?(d=o.mode,w=o.child,C={mode:"hidden",children:C},(d&1)===0&&w!==null?(w.childLanes=0,w.pendingProps=C):w=lc(C,d,0,null),r=ms(r,d,c,null),w.return=o,r.return=o,w.sibling=r,o.child=w,o.child.memoizedState=zf(c),o.memoizedState=Ff,r):Bf(o,C));if(g=r.memoizedState,g!==null&&(j=g.dehydrated,j!==null))return Xx(r,o,C,d,j,g,c);if(w){w=d.fallback,C=o.mode,g=r.child,j=g.sibling;var te={mode:"hidden",children:d.children};return(C&1)===0&&o.child!==g?(d=o.child,d.childLanes=0,d.pendingProps=te,o.deletions=null):(d=Vr(g,te),d.subtreeFlags=g.subtreeFlags&14680064),j!==null?w=Vr(j,w):(w=ms(w,C,c,null),w.flags|=2),w.return=o,d.return=o,d.sibling=w,o.child=d,d=w,w=o.child,C=r.child.memoizedState,C=C===null?zf(c):{baseLanes:C.baseLanes|c,cachePool:null,transitions:C.transitions},w.memoizedState=C,w.childLanes=r.childLanes&~c,o.memoizedState=Ff,d}return w=r.child,r=w.sibling,d=Vr(w,{mode:"visible",children:d.children}),(o.mode&1)===0&&(d.lanes=c),d.return=o,d.sibling=null,r!==null&&(c=o.deletions,c===null?(o.deletions=[r],o.flags|=16):c.push(r)),o.child=d,o.memoizedState=null,d}function Bf(r,o){return o=lc({mode:"visible",children:o},r.mode,0,null),o.return=r,r.child=o}function Kl(r,o,c,d){return d!==null&&hf(d),Zs(o,r.child,null,c),r=Bf(o,o.pendingProps.children),r.flags|=2,o.memoizedState=null,r}function Xx(r,o,c,d,g,w,C){if(c)return o.flags&256?(o.flags&=-257,d=Nf(Error(t(422))),Kl(r,o,C,d)):o.memoizedState!==null?(o.child=r.child,o.flags|=128,null):(w=d.fallback,g=o.mode,d=lc({mode:"visible",children:d.children},g,0,null),w=ms(w,g,C,null),w.flags|=2,d.return=o,w.return=o,d.sibling=w,o.child=d,(o.mode&1)!==0&&Zs(o,r.child,null,C),o.child.memoizedState=zf(C),o.memoizedState=Ff,w);if((o.mode&1)===0)return Kl(r,o,C,null);if(g.data==="$!"){if(d=g.nextSibling&&g.nextSibling.dataset,d)var j=d.dgst;return d=j,w=Error(t(419)),d=Nf(w,d,void 0),Kl(r,o,C,d)}if(j=(C&r.childLanes)!==0,ti||j){if(d=An,d!==null){switch(C&-C){case 4:g=2;break;case 16:g=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:g=32;break;case 536870912:g=268435456;break;default:g=0}g=(g&(d.suspendedLanes|C))!==0?0:g,g!==0&&g!==w.retryLane&&(w.retryLane=g,or(r,g),ki(d,r,g,-1))}return nd(),d=Nf(Error(t(421))),Kl(r,o,C,d)}return g.data==="$?"?(o.flags|=128,o.child=r.child,o=o1.bind(null,r),g._reactRetry=o,null):(r=w.treeContext,ui=Lr(g.nextSibling),ci=o,an=!0,Li=null,r!==null&&(gi[vi++]=rr,gi[vi++]=sr,gi[vi++]=os,rr=r.id,sr=r.overflow,os=o),o=Bf(o,d.children),o.flags|=4096,o)}function D0(r,o,c){r.lanes|=o;var d=r.alternate;d!==null&&(d.lanes|=o),vf(r.return,o,c)}function Hf(r,o,c,d,g){var w=r.memoizedState;w===null?r.memoizedState={isBackwards:o,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:g}:(w.isBackwards=o,w.rendering=null,w.renderingStartTime=0,w.last=d,w.tail=c,w.tailMode=g)}function N0(r,o,c){var d=o.pendingProps,g=d.revealOrder,w=d.tail;if(Wn(r,o,d.children,c),d=ln.current,(d&2)!==0)d=d&1|2,o.flags|=128;else{if(r!==null&&(r.flags&128)!==0)e:for(r=o.child;r!==null;){if(r.tag===13)r.memoizedState!==null&&D0(r,c,o);else if(r.tag===19)D0(r,c,o);else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===o)break e;for(;r.sibling===null;){if(r.return===null||r.return===o)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}d&=1}if(nn(ln,d),(o.mode&1)===0)o.memoizedState=null;else switch(g){case"forwards":for(c=o.child,g=null;c!==null;)r=c.alternate,r!==null&&Vl(r)===null&&(g=c),c=c.sibling;c=g,c===null?(g=o.child,o.child=null):(g=c.sibling,c.sibling=null),Hf(o,!1,g,c,w);break;case"backwards":for(c=null,g=o.child,o.child=null;g!==null;){if(r=g.alternate,r!==null&&Vl(r)===null){o.child=g;break}r=g.sibling,g.sibling=c,c=g,g=r}Hf(o,!0,c,null,w);break;case"together":Hf(o,!1,null,null,void 0);break;default:o.memoizedState=null}return o.child}function Yl(r,o){(o.mode&1)===0&&r!==null&&(r.alternate=null,o.alternate=null,o.flags|=2)}function lr(r,o,c){if(r!==null&&(o.dependencies=r.dependencies),fs|=o.lanes,(c&o.childLanes)===0)return null;if(r!==null&&o.child!==r.child)throw Error(t(153));if(o.child!==null){for(r=o.child,c=Vr(r,r.pendingProps),o.child=c,c.return=o;r.sibling!==null;)r=r.sibling,c=c.sibling=Vr(r,r.pendingProps),c.return=o;c.sibling=null}return o.child}function qx(r,o,c){switch(o.tag){case 3:P0(o),Ys();break;case 5:qm(o);break;case 1:ei(o.type)&&Il(o);break;case 4:xf(o,o.stateNode.containerInfo);break;case 10:var d=o.type._context,g=o.memoizedProps.value;nn(Fl,d._currentValue),d._currentValue=g;break;case 13:if(d=o.memoizedState,d!==null)return d.dehydrated!==null?(nn(ln,ln.current&1),o.flags|=128,null):(c&o.child.childLanes)!==0?I0(r,o,c):(nn(ln,ln.current&1),r=lr(r,o,c),r!==null?r.sibling:null);nn(ln,ln.current&1);break;case 19:if(d=(c&o.childLanes)!==0,(r.flags&128)!==0){if(d)return N0(r,o,c);o.flags|=128}if(g=o.memoizedState,g!==null&&(g.rendering=null,g.tail=null,g.lastEffect=null),nn(ln,ln.current),d)break;return null;case 22:case 23:return o.lanes=0,A0(r,o,c)}return lr(r,o,c)}var k0,Vf,U0,O0;k0=function(r,o){for(var c=o.child;c!==null;){if(c.tag===5||c.tag===6)r.appendChild(c.stateNode);else if(c.tag!==4&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===o)break;for(;c.sibling===null;){if(c.return===null||c.return===o)return;c=c.return}c.sibling.return=c.return,c=c.sibling}},Vf=function(){},U0=function(r,o,c,d){var g=r.memoizedProps;if(g!==d){r=o.stateNode,cs(ji.current);var w=null;switch(c){case"input":g=W(r,g),d=W(r,d),w=[];break;case"select":g=ee({},g,{value:void 0}),d=ee({},d,{value:void 0}),w=[];break;case"textarea":g=T(r,g),d=T(r,d),w=[];break;default:typeof g.onClick!="function"&&typeof d.onClick=="function"&&(r.onclick=Rl)}Rt(c,d);var C;c=null;for(ge in g)if(!d.hasOwnProperty(ge)&&g.hasOwnProperty(ge)&&g[ge]!=null)if(ge==="style"){var j=g[ge];for(C in j)j.hasOwnProperty(C)&&(c||(c={}),c[C]="")}else ge!=="dangerouslySetInnerHTML"&&ge!=="children"&&ge!=="suppressContentEditableWarning"&&ge!=="suppressHydrationWarning"&&ge!=="autoFocus"&&(s.hasOwnProperty(ge)?w||(w=[]):(w=w||[]).push(ge,null));for(ge in d){var te=d[ge];if(j=g!=null?g[ge]:void 0,d.hasOwnProperty(ge)&&te!==j&&(te!=null||j!=null))if(ge==="style")if(j){for(C in j)!j.hasOwnProperty(C)||te&&te.hasOwnProperty(C)||(c||(c={}),c[C]="");for(C in te)te.hasOwnProperty(C)&&j[C]!==te[C]&&(c||(c={}),c[C]=te[C])}else c||(w||(w=[]),w.push(ge,c)),c=te;else ge==="dangerouslySetInnerHTML"?(te=te?te.__html:void 0,j=j?j.__html:void 0,te!=null&&j!==te&&(w=w||[]).push(ge,te)):ge==="children"?typeof te!="string"&&typeof te!="number"||(w=w||[]).push(ge,""+te):ge!=="suppressContentEditableWarning"&&ge!=="suppressHydrationWarning"&&(s.hasOwnProperty(ge)?(te!=null&&ge==="onScroll"&&sn("scroll",r),w||j===te||(w=[])):(w=w||[]).push(ge,te))}c&&(w=w||[]).push("style",c);var ge=w;(o.updateQueue=ge)&&(o.flags|=4)}},O0=function(r,o,c,d){c!==d&&(o.flags|=4)};function Ca(r,o){if(!an)switch(r.tailMode){case"hidden":o=r.tail;for(var c=null;o!==null;)o.alternate!==null&&(c=o),o=o.sibling;c===null?r.tail=null:c.sibling=null;break;case"collapsed":c=r.tail;for(var d=null;c!==null;)c.alternate!==null&&(d=c),c=c.sibling;d===null?o||r.tail===null?r.tail=null:r.tail.sibling=null:d.sibling=null}}function zn(r){var o=r.alternate!==null&&r.alternate.child===r.child,c=0,d=0;if(o)for(var g=r.child;g!==null;)c|=g.lanes|g.childLanes,d|=g.subtreeFlags&14680064,d|=g.flags&14680064,g.return=r,g=g.sibling;else for(g=r.child;g!==null;)c|=g.lanes|g.childLanes,d|=g.subtreeFlags,d|=g.flags,g.return=r,g=g.sibling;return r.subtreeFlags|=d,r.childLanes=c,o}function Kx(r,o,c){var d=o.pendingProps;switch(uf(o),o.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return zn(o),null;case 1:return ei(o.type)&&Ll(),zn(o),null;case 3:return d=o.stateNode,eo(),on(Qn),on(On),wf(),d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null),(r===null||r.child===null)&&(Ul(o)?o.flags|=4:r===null||r.memoizedState.isDehydrated&&(o.flags&256)===0||(o.flags|=1024,Li!==null&&(Qf(Li),Li=null))),Vf(r,o),zn(o),null;case 5:Sf(o);var g=cs(wa.current);if(c=o.type,r!==null&&o.stateNode!=null)U0(r,o,c,d,g),r.ref!==o.ref&&(o.flags|=512,o.flags|=2097152);else{if(!d){if(o.stateNode===null)throw Error(t(166));return zn(o),null}if(r=cs(ji.current),Ul(o)){d=o.stateNode,c=o.type;var w=o.memoizedProps;switch(d[Wi]=o,d[ya]=w,r=(o.mode&1)!==0,c){case"dialog":sn("cancel",d),sn("close",d);break;case"iframe":case"object":case"embed":sn("load",d);break;case"video":case"audio":for(g=0;g<ma.length;g++)sn(ma[g],d);break;case"source":sn("error",d);break;case"img":case"image":case"link":sn("error",d),sn("load",d);break;case"details":sn("toggle",d);break;case"input":le(d,w),sn("invalid",d);break;case"select":d._wrapperState={wasMultiple:!!w.multiple},sn("invalid",d);break;case"textarea":G(d,w),sn("invalid",d)}Rt(c,w),g=null;for(var C in w)if(w.hasOwnProperty(C)){var j=w[C];C==="children"?typeof j=="string"?d.textContent!==j&&(w.suppressHydrationWarning!==!0&&Cl(d.textContent,j,r),g=["children",j]):typeof j=="number"&&d.textContent!==""+j&&(w.suppressHydrationWarning!==!0&&Cl(d.textContent,j,r),g=["children",""+j]):s.hasOwnProperty(C)&&j!=null&&C==="onScroll"&&sn("scroll",d)}switch(c){case"input":Ke(d),Pe(d,w,!0);break;case"textarea":Ke(d),_e(d);break;case"select":case"option":break;default:typeof w.onClick=="function"&&(d.onclick=Rl)}d=g,o.updateQueue=d,d!==null&&(o.flags|=4)}else{C=g.nodeType===9?g:g.ownerDocument,r==="http://www.w3.org/1999/xhtml"&&(r=Ae(c)),r==="http://www.w3.org/1999/xhtml"?c==="script"?(r=C.createElement("div"),r.innerHTML="<script><\/script>",r=r.removeChild(r.firstChild)):typeof d.is=="string"?r=C.createElement(c,{is:d.is}):(r=C.createElement(c),c==="select"&&(C=r,d.multiple?C.multiple=!0:d.size&&(C.size=d.size))):r=C.createElementNS(r,c),r[Wi]=o,r[ya]=d,k0(r,o,!1,!1),o.stateNode=r;e:{switch(C=Te(c,d),c){case"dialog":sn("cancel",r),sn("close",r),g=d;break;case"iframe":case"object":case"embed":sn("load",r),g=d;break;case"video":case"audio":for(g=0;g<ma.length;g++)sn(ma[g],r);g=d;break;case"source":sn("error",r),g=d;break;case"img":case"image":case"link":sn("error",r),sn("load",r),g=d;break;case"details":sn("toggle",r),g=d;break;case"input":le(r,d),g=W(r,d),sn("invalid",r);break;case"option":g=d;break;case"select":r._wrapperState={wasMultiple:!!d.multiple},g=ee({},d,{value:void 0}),sn("invalid",r);break;case"textarea":G(r,d),g=T(r,d),sn("invalid",r);break;default:g=d}Rt(c,g),j=g;for(w in j)if(j.hasOwnProperty(w)){var te=j[w];w==="style"?_t(r,te):w==="dangerouslySetInnerHTML"?(te=te?te.__html:void 0,te!=null&&et(r,te)):w==="children"?typeof te=="string"?(c!=="textarea"||te!=="")&&Tt(r,te):typeof te=="number"&&Tt(r,""+te):w!=="suppressContentEditableWarning"&&w!=="suppressHydrationWarning"&&w!=="autoFocus"&&(s.hasOwnProperty(w)?te!=null&&w==="onScroll"&&sn("scroll",r):te!=null&&P(r,w,te,C))}switch(c){case"input":Ke(r),Pe(r,d,!1);break;case"textarea":Ke(r),_e(r);break;case"option":d.value!=null&&r.setAttribute("value",""+Ie(d.value));break;case"select":r.multiple=!!d.multiple,w=d.value,w!=null?H(r,!!d.multiple,w,!1):d.defaultValue!=null&&H(r,!!d.multiple,d.defaultValue,!0);break;default:typeof g.onClick=="function"&&(r.onclick=Rl)}switch(c){case"button":case"input":case"select":case"textarea":d=!!d.autoFocus;break e;case"img":d=!0;break e;default:d=!1}}d&&(o.flags|=4)}o.ref!==null&&(o.flags|=512,o.flags|=2097152)}return zn(o),null;case 6:if(r&&o.stateNode!=null)O0(r,o,r.memoizedProps,d);else{if(typeof d!="string"&&o.stateNode===null)throw Error(t(166));if(c=cs(wa.current),cs(ji.current),Ul(o)){if(d=o.stateNode,c=o.memoizedProps,d[Wi]=o,(w=d.nodeValue!==c)&&(r=ci,r!==null))switch(r.tag){case 3:Cl(d.nodeValue,c,(r.mode&1)!==0);break;case 5:r.memoizedProps.suppressHydrationWarning!==!0&&Cl(d.nodeValue,c,(r.mode&1)!==0)}w&&(o.flags|=4)}else d=(c.nodeType===9?c:c.ownerDocument).createTextNode(d),d[Wi]=o,o.stateNode=d}return zn(o),null;case 13:if(on(ln),d=o.memoizedState,r===null||r.memoizedState!==null&&r.memoizedState.dehydrated!==null){if(an&&ui!==null&&(o.mode&1)!==0&&(o.flags&128)===0)Bm(),Ys(),o.flags|=98560,w=!1;else if(w=Ul(o),d!==null&&d.dehydrated!==null){if(r===null){if(!w)throw Error(t(318));if(w=o.memoizedState,w=w!==null?w.dehydrated:null,!w)throw Error(t(317));w[Wi]=o}else Ys(),(o.flags&128)===0&&(o.memoizedState=null),o.flags|=4;zn(o),w=!1}else Li!==null&&(Qf(Li),Li=null),w=!0;if(!w)return o.flags&65536?o:null}return(o.flags&128)!==0?(o.lanes=c,o):(d=d!==null,d!==(r!==null&&r.memoizedState!==null)&&d&&(o.child.flags|=8192,(o.mode&1)!==0&&(r===null||(ln.current&1)!==0?Sn===0&&(Sn=3):nd())),o.updateQueue!==null&&(o.flags|=4),zn(o),null);case 4:return eo(),Vf(r,o),r===null&&ga(o.stateNode.containerInfo),zn(o),null;case 10:return gf(o.type._context),zn(o),null;case 17:return ei(o.type)&&Ll(),zn(o),null;case 19:if(on(ln),w=o.memoizedState,w===null)return zn(o),null;if(d=(o.flags&128)!==0,C=w.rendering,C===null)if(d)Ca(w,!1);else{if(Sn!==0||r!==null&&(r.flags&128)!==0)for(r=o.child;r!==null;){if(C=Vl(r),C!==null){for(o.flags|=128,Ca(w,!1),d=C.updateQueue,d!==null&&(o.updateQueue=d,o.flags|=4),o.subtreeFlags=0,d=c,c=o.child;c!==null;)w=c,r=d,w.flags&=14680066,C=w.alternate,C===null?(w.childLanes=0,w.lanes=r,w.child=null,w.subtreeFlags=0,w.memoizedProps=null,w.memoizedState=null,w.updateQueue=null,w.dependencies=null,w.stateNode=null):(w.childLanes=C.childLanes,w.lanes=C.lanes,w.child=C.child,w.subtreeFlags=0,w.deletions=null,w.memoizedProps=C.memoizedProps,w.memoizedState=C.memoizedState,w.updateQueue=C.updateQueue,w.type=C.type,r=C.dependencies,w.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext}),c=c.sibling;return nn(ln,ln.current&1|2),o.child}r=r.sibling}w.tail!==null&&Be()>ro&&(o.flags|=128,d=!0,Ca(w,!1),o.lanes=4194304)}else{if(!d)if(r=Vl(C),r!==null){if(o.flags|=128,d=!0,c=r.updateQueue,c!==null&&(o.updateQueue=c,o.flags|=4),Ca(w,!0),w.tail===null&&w.tailMode==="hidden"&&!C.alternate&&!an)return zn(o),null}else 2*Be()-w.renderingStartTime>ro&&c!==1073741824&&(o.flags|=128,d=!0,Ca(w,!1),o.lanes=4194304);w.isBackwards?(C.sibling=o.child,o.child=C):(c=w.last,c!==null?c.sibling=C:o.child=C,w.last=C)}return w.tail!==null?(o=w.tail,w.rendering=o,w.tail=o.sibling,w.renderingStartTime=Be(),o.sibling=null,c=ln.current,nn(ln,d?c&1|2:c&1),o):(zn(o),null);case 22:case 23:return td(),d=o.memoizedState!==null,r!==null&&r.memoizedState!==null!==d&&(o.flags|=8192),d&&(o.mode&1)!==0?(fi&1073741824)!==0&&(zn(o),o.subtreeFlags&6&&(o.flags|=8192)):zn(o),null;case 24:return null;case 25:return null}throw Error(t(156,o.tag))}function Yx(r,o){switch(uf(o),o.tag){case 1:return ei(o.type)&&Ll(),r=o.flags,r&65536?(o.flags=r&-65537|128,o):null;case 3:return eo(),on(Qn),on(On),wf(),r=o.flags,(r&65536)!==0&&(r&128)===0?(o.flags=r&-65537|128,o):null;case 5:return Sf(o),null;case 13:if(on(ln),r=o.memoizedState,r!==null&&r.dehydrated!==null){if(o.alternate===null)throw Error(t(340));Ys()}return r=o.flags,r&65536?(o.flags=r&-65537|128,o):null;case 19:return on(ln),null;case 4:return eo(),null;case 10:return gf(o.type._context),null;case 22:case 23:return td(),null;case 24:return null;default:return null}}var Zl=!1,Bn=!1,Zx=typeof WeakSet=="function"?WeakSet:Set,lt=null;function no(r,o){var c=r.ref;if(c!==null)if(typeof c=="function")try{c(null)}catch(d){fn(r,o,d)}else c.current=null}function Gf(r,o,c){try{c()}catch(d){fn(r,o,d)}}var F0=!1;function Jx(r,o){if(ef=vl,r=gm(),$u(r)){if("selectionStart"in r)var c={start:r.selectionStart,end:r.selectionEnd};else e:{c=(c=r.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();if(d&&d.rangeCount!==0){c=d.anchorNode;var g=d.anchorOffset,w=d.focusNode;d=d.focusOffset;try{c.nodeType,w.nodeType}catch{c=null;break e}var C=0,j=-1,te=-1,ge=0,Fe=0,He=r,ke=null;t:for(;;){for(var st;He!==c||g!==0&&He.nodeType!==3||(j=C+g),He!==w||d!==0&&He.nodeType!==3||(te=C+d),He.nodeType===3&&(C+=He.nodeValue.length),(st=He.firstChild)!==null;)ke=He,He=st;for(;;){if(He===r)break t;if(ke===c&&++ge===g&&(j=C),ke===w&&++Fe===d&&(te=C),(st=He.nextSibling)!==null)break;He=ke,ke=He.parentNode}He=st}c=j===-1||te===-1?null:{start:j,end:te}}else c=null}c=c||{start:0,end:0}}else c=null;for(tf={focusedElem:r,selectionRange:c},vl=!1,lt=o;lt!==null;)if(o=lt,r=o.child,(o.subtreeFlags&1028)!==0&&r!==null)r.return=o,lt=r;else for(;lt!==null;){o=lt;try{var ft=o.alternate;if((o.flags&1024)!==0)switch(o.tag){case 0:case 11:case 15:break;case 1:if(ft!==null){var ht=ft.memoizedProps,dn=ft.memoizedState,fe=o.stateNode,oe=fe.getSnapshotBeforeUpdate(o.elementType===o.type?ht:Ii(o.type,ht),dn);fe.__reactInternalSnapshotBeforeUpdate=oe}break;case 3:var me=o.stateNode.containerInfo;me.nodeType===1?me.textContent="":me.nodeType===9&&me.documentElement&&me.removeChild(me.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Xe){fn(o,o.return,Xe)}if(r=o.sibling,r!==null){r.return=o.return,lt=r;break}lt=o.return}return ft=F0,F0=!1,ft}function Ra(r,o,c){var d=o.updateQueue;if(d=d!==null?d.lastEffect:null,d!==null){var g=d=d.next;do{if((g.tag&r)===r){var w=g.destroy;g.destroy=void 0,w!==void 0&&Gf(o,c,w)}g=g.next}while(g!==d)}}function Jl(r,o){if(o=o.updateQueue,o=o!==null?o.lastEffect:null,o!==null){var c=o=o.next;do{if((c.tag&r)===r){var d=c.create;c.destroy=d()}c=c.next}while(c!==o)}}function Wf(r){var o=r.ref;if(o!==null){var c=r.stateNode;switch(r.tag){case 5:r=c;break;default:r=c}typeof o=="function"?o(r):o.current=r}}function z0(r){var o=r.alternate;o!==null&&(r.alternate=null,z0(o)),r.child=null,r.deletions=null,r.sibling=null,r.tag===5&&(o=r.stateNode,o!==null&&(delete o[Wi],delete o[ya],delete o[of],delete o[Nx],delete o[kx])),r.stateNode=null,r.return=null,r.dependencies=null,r.memoizedProps=null,r.memoizedState=null,r.pendingProps=null,r.stateNode=null,r.updateQueue=null}function B0(r){return r.tag===5||r.tag===3||r.tag===4}function H0(r){e:for(;;){for(;r.sibling===null;){if(r.return===null||B0(r.return))return null;r=r.return}for(r.sibling.return=r.return,r=r.sibling;r.tag!==5&&r.tag!==6&&r.tag!==18;){if(r.flags&2||r.child===null||r.tag===4)continue e;r.child.return=r,r=r.child}if(!(r.flags&2))return r.stateNode}}function jf(r,o,c){var d=r.tag;if(d===5||d===6)r=r.stateNode,o?c.nodeType===8?c.parentNode.insertBefore(r,o):c.insertBefore(r,o):(c.nodeType===8?(o=c.parentNode,o.insertBefore(r,c)):(o=c,o.appendChild(r)),c=c._reactRootContainer,c!=null||o.onclick!==null||(o.onclick=Rl));else if(d!==4&&(r=r.child,r!==null))for(jf(r,o,c),r=r.sibling;r!==null;)jf(r,o,c),r=r.sibling}function $f(r,o,c){var d=r.tag;if(d===5||d===6)r=r.stateNode,o?c.insertBefore(r,o):c.appendChild(r);else if(d!==4&&(r=r.child,r!==null))for($f(r,o,c),r=r.sibling;r!==null;)$f(r,o,c),r=r.sibling}var Dn=null,Di=!1;function Or(r,o,c){for(c=c.child;c!==null;)V0(r,o,c),c=c.sibling}function V0(r,o,c){if(zt&&typeof zt.onCommitFiberUnmount=="function")try{zt.onCommitFiberUnmount($t,c)}catch{}switch(c.tag){case 5:Bn||no(c,o);case 6:var d=Dn,g=Di;Dn=null,Or(r,o,c),Dn=d,Di=g,Dn!==null&&(Di?(r=Dn,c=c.stateNode,r.nodeType===8?r.parentNode.removeChild(c):r.removeChild(c)):Dn.removeChild(c.stateNode));break;case 18:Dn!==null&&(Di?(r=Dn,c=c.stateNode,r.nodeType===8?sf(r.parentNode,c):r.nodeType===1&&sf(r,c),aa(r)):sf(Dn,c.stateNode));break;case 4:d=Dn,g=Di,Dn=c.stateNode.containerInfo,Di=!0,Or(r,o,c),Dn=d,Di=g;break;case 0:case 11:case 14:case 15:if(!Bn&&(d=c.updateQueue,d!==null&&(d=d.lastEffect,d!==null))){g=d=d.next;do{var w=g,C=w.destroy;w=w.tag,C!==void 0&&((w&2)!==0||(w&4)!==0)&&Gf(c,o,C),g=g.next}while(g!==d)}Or(r,o,c);break;case 1:if(!Bn&&(no(c,o),d=c.stateNode,typeof d.componentWillUnmount=="function"))try{d.props=c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(j){fn(c,o,j)}Or(r,o,c);break;case 21:Or(r,o,c);break;case 22:c.mode&1?(Bn=(d=Bn)||c.memoizedState!==null,Or(r,o,c),Bn=d):Or(r,o,c);break;default:Or(r,o,c)}}function G0(r){var o=r.updateQueue;if(o!==null){r.updateQueue=null;var c=r.stateNode;c===null&&(c=r.stateNode=new Zx),o.forEach(function(d){var g=a1.bind(null,r,d);c.has(d)||(c.add(d),d.then(g,g))})}}function Ni(r,o){var c=o.deletions;if(c!==null)for(var d=0;d<c.length;d++){var g=c[d];try{var w=r,C=o,j=C;e:for(;j!==null;){switch(j.tag){case 5:Dn=j.stateNode,Di=!1;break e;case 3:Dn=j.stateNode.containerInfo,Di=!0;break e;case 4:Dn=j.stateNode.containerInfo,Di=!0;break e}j=j.return}if(Dn===null)throw Error(t(160));V0(w,C,g),Dn=null,Di=!1;var te=g.alternate;te!==null&&(te.return=null),g.return=null}catch(ge){fn(g,o,ge)}}if(o.subtreeFlags&12854)for(o=o.child;o!==null;)W0(o,r),o=o.sibling}function W0(r,o){var c=r.alternate,d=r.flags;switch(r.tag){case 0:case 11:case 14:case 15:if(Ni(o,r),Xi(r),d&4){try{Ra(3,r,r.return),Jl(3,r)}catch(ht){fn(r,r.return,ht)}try{Ra(5,r,r.return)}catch(ht){fn(r,r.return,ht)}}break;case 1:Ni(o,r),Xi(r),d&512&&c!==null&&no(c,c.return);break;case 5:if(Ni(o,r),Xi(r),d&512&&c!==null&&no(c,c.return),r.flags&32){var g=r.stateNode;try{Tt(g,"")}catch(ht){fn(r,r.return,ht)}}if(d&4&&(g=r.stateNode,g!=null)){var w=r.memoizedProps,C=c!==null?c.memoizedProps:w,j=r.type,te=r.updateQueue;if(r.updateQueue=null,te!==null)try{j==="input"&&w.type==="radio"&&w.name!=null&&Ee(g,w),Te(j,C);var ge=Te(j,w);for(C=0;C<te.length;C+=2){var Fe=te[C],He=te[C+1];Fe==="style"?_t(g,He):Fe==="dangerouslySetInnerHTML"?et(g,He):Fe==="children"?Tt(g,He):P(g,Fe,He,ge)}switch(j){case"input":Ue(g,w);break;case"textarea":be(g,w);break;case"select":var ke=g._wrapperState.wasMultiple;g._wrapperState.wasMultiple=!!w.multiple;var st=w.value;st!=null?H(g,!!w.multiple,st,!1):ke!==!!w.multiple&&(w.defaultValue!=null?H(g,!!w.multiple,w.defaultValue,!0):H(g,!!w.multiple,w.multiple?[]:"",!1))}g[ya]=w}catch(ht){fn(r,r.return,ht)}}break;case 6:if(Ni(o,r),Xi(r),d&4){if(r.stateNode===null)throw Error(t(162));g=r.stateNode,w=r.memoizedProps;try{g.nodeValue=w}catch(ht){fn(r,r.return,ht)}}break;case 3:if(Ni(o,r),Xi(r),d&4&&c!==null&&c.memoizedState.isDehydrated)try{aa(o.containerInfo)}catch(ht){fn(r,r.return,ht)}break;case 4:Ni(o,r),Xi(r);break;case 13:Ni(o,r),Xi(r),g=r.child,g.flags&8192&&(w=g.memoizedState!==null,g.stateNode.isHidden=w,!w||g.alternate!==null&&g.alternate.memoizedState!==null||(Kf=Be())),d&4&&G0(r);break;case 22:if(Fe=c!==null&&c.memoizedState!==null,r.mode&1?(Bn=(ge=Bn)||Fe,Ni(o,r),Bn=ge):Ni(o,r),Xi(r),d&8192){if(ge=r.memoizedState!==null,(r.stateNode.isHidden=ge)&&!Fe&&(r.mode&1)!==0)for(lt=r,Fe=r.child;Fe!==null;){for(He=lt=Fe;lt!==null;){switch(ke=lt,st=ke.child,ke.tag){case 0:case 11:case 14:case 15:Ra(4,ke,ke.return);break;case 1:no(ke,ke.return);var ft=ke.stateNode;if(typeof ft.componentWillUnmount=="function"){d=ke,c=ke.return;try{o=d,ft.props=o.memoizedProps,ft.state=o.memoizedState,ft.componentWillUnmount()}catch(ht){fn(d,c,ht)}}break;case 5:no(ke,ke.return);break;case 22:if(ke.memoizedState!==null){X0(He);continue}}st!==null?(st.return=ke,lt=st):X0(He)}Fe=Fe.sibling}e:for(Fe=null,He=r;;){if(He.tag===5){if(Fe===null){Fe=He;try{g=He.stateNode,ge?(w=g.style,typeof w.setProperty=="function"?w.setProperty("display","none","important"):w.display="none"):(j=He.stateNode,te=He.memoizedProps.style,C=te!=null&&te.hasOwnProperty("display")?te.display:null,j.style.display=pt("display",C))}catch(ht){fn(r,r.return,ht)}}}else if(He.tag===6){if(Fe===null)try{He.stateNode.nodeValue=ge?"":He.memoizedProps}catch(ht){fn(r,r.return,ht)}}else if((He.tag!==22&&He.tag!==23||He.memoizedState===null||He===r)&&He.child!==null){He.child.return=He,He=He.child;continue}if(He===r)break e;for(;He.sibling===null;){if(He.return===null||He.return===r)break e;Fe===He&&(Fe=null),He=He.return}Fe===He&&(Fe=null),He.sibling.return=He.return,He=He.sibling}}break;case 19:Ni(o,r),Xi(r),d&4&&G0(r);break;case 21:break;default:Ni(o,r),Xi(r)}}function Xi(r){var o=r.flags;if(o&2){try{e:{for(var c=r.return;c!==null;){if(B0(c)){var d=c;break e}c=c.return}throw Error(t(160))}switch(d.tag){case 5:var g=d.stateNode;d.flags&32&&(Tt(g,""),d.flags&=-33);var w=H0(r);$f(r,w,g);break;case 3:case 4:var C=d.stateNode.containerInfo,j=H0(r);jf(r,j,C);break;default:throw Error(t(161))}}catch(te){fn(r,r.return,te)}r.flags&=-3}o&4096&&(r.flags&=-4097)}function Qx(r,o,c){lt=r,j0(r)}function j0(r,o,c){for(var d=(r.mode&1)!==0;lt!==null;){var g=lt,w=g.child;if(g.tag===22&&d){var C=g.memoizedState!==null||Zl;if(!C){var j=g.alternate,te=j!==null&&j.memoizedState!==null||Bn;j=Zl;var ge=Bn;if(Zl=C,(Bn=te)&&!ge)for(lt=g;lt!==null;)C=lt,te=C.child,C.tag===22&&C.memoizedState!==null?q0(g):te!==null?(te.return=C,lt=te):q0(g);for(;w!==null;)lt=w,j0(w),w=w.sibling;lt=g,Zl=j,Bn=ge}$0(r)}else(g.subtreeFlags&8772)!==0&&w!==null?(w.return=g,lt=w):$0(r)}}function $0(r){for(;lt!==null;){var o=lt;if((o.flags&8772)!==0){var c=o.alternate;try{if((o.flags&8772)!==0)switch(o.tag){case 0:case 11:case 15:Bn||Jl(5,o);break;case 1:var d=o.stateNode;if(o.flags&4&&!Bn)if(c===null)d.componentDidMount();else{var g=o.elementType===o.type?c.memoizedProps:Ii(o.type,c.memoizedProps);d.componentDidUpdate(g,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var w=o.updateQueue;w!==null&&Xm(o,w,d);break;case 3:var C=o.updateQueue;if(C!==null){if(c=null,o.child!==null)switch(o.child.tag){case 5:c=o.child.stateNode;break;case 1:c=o.child.stateNode}Xm(o,C,c)}break;case 5:var j=o.stateNode;if(c===null&&o.flags&4){c=j;var te=o.memoizedProps;switch(o.type){case"button":case"input":case"select":case"textarea":te.autoFocus&&c.focus();break;case"img":te.src&&(c.src=te.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(o.memoizedState===null){var ge=o.alternate;if(ge!==null){var Fe=ge.memoizedState;if(Fe!==null){var He=Fe.dehydrated;He!==null&&aa(He)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}Bn||o.flags&512&&Wf(o)}catch(ke){fn(o,o.return,ke)}}if(o===r){lt=null;break}if(c=o.sibling,c!==null){c.return=o.return,lt=c;break}lt=o.return}}function X0(r){for(;lt!==null;){var o=lt;if(o===r){lt=null;break}var c=o.sibling;if(c!==null){c.return=o.return,lt=c;break}lt=o.return}}function q0(r){for(;lt!==null;){var o=lt;try{switch(o.tag){case 0:case 11:case 15:var c=o.return;try{Jl(4,o)}catch(te){fn(o,c,te)}break;case 1:var d=o.stateNode;if(typeof d.componentDidMount=="function"){var g=o.return;try{d.componentDidMount()}catch(te){fn(o,g,te)}}var w=o.return;try{Wf(o)}catch(te){fn(o,w,te)}break;case 5:var C=o.return;try{Wf(o)}catch(te){fn(o,C,te)}}}catch(te){fn(o,o.return,te)}if(o===r){lt=null;break}var j=o.sibling;if(j!==null){j.return=o.return,lt=j;break}lt=o.return}}var e1=Math.ceil,Ql=E.ReactCurrentDispatcher,Xf=E.ReactCurrentOwner,xi=E.ReactCurrentBatchConfig,Vt=0,An=null,vn=null,Nn=0,fi=0,io=Ir(0),Sn=0,Pa=null,fs=0,ec=0,qf=0,La=null,ni=null,Kf=0,ro=1/0,cr=null,tc=!1,Yf=null,Fr=null,nc=!1,zr=null,ic=0,Ia=0,Zf=null,rc=-1,sc=0;function jn(){return(Vt&6)!==0?Be():rc!==-1?rc:rc=Be()}function Br(r){return(r.mode&1)===0?1:(Vt&2)!==0&&Nn!==0?Nn&-Nn:Ox.transition!==null?(sc===0&&(sc=Gn()),sc):(r=Kt,r!==0||(r=window.event,r=r===void 0?16:Yp(r.type)),r)}function ki(r,o,c,d){if(50<Ia)throw Ia=0,Zf=null,Error(t(185));Jn(r,c,d),((Vt&2)===0||r!==An)&&(r===An&&((Vt&2)===0&&(ec|=c),Sn===4&&Hr(r,Nn)),ii(r,d),c===1&&Vt===0&&(o.mode&1)===0&&(ro=Be()+500,Dl&&Nr()))}function ii(r,o){var c=r.callbackNode;pi(r,o);var d=Gi(r,r===An?Nn:0);if(d===0)c!==null&&pe(c),r.callbackNode=null,r.callbackPriority=0;else if(o=d&-d,r.callbackPriority!==o){if(c!=null&&pe(c),o===1)r.tag===0?Ux(Y0.bind(null,r)):km(Y0.bind(null,r)),Ix(function(){(Vt&6)===0&&Nr()}),c=null;else{switch(Vp(d)){case 1:c=ut;break;case 4:c=St;break;case 16:c=At;break;case 536870912:c=Ht;break;default:c=At}c=rg(c,K0.bind(null,r))}r.callbackPriority=o,r.callbackNode=c}}function K0(r,o){if(rc=-1,sc=0,(Vt&6)!==0)throw Error(t(327));var c=r.callbackNode;if(so()&&r.callbackNode!==c)return null;var d=Gi(r,r===An?Nn:0);if(d===0)return null;if((d&30)!==0||(d&r.expiredLanes)!==0||o)o=oc(r,d);else{o=d;var g=Vt;Vt|=2;var w=J0();(An!==r||Nn!==o)&&(cr=null,ro=Be()+500,hs(r,o));do try{i1();break}catch(j){Z0(r,j)}while(!0);mf(),Ql.current=w,Vt=g,vn!==null?o=0:(An=null,Nn=0,o=Sn)}if(o!==0){if(o===2&&(g=tr(r),g!==0&&(d=g,o=Jf(r,g))),o===1)throw c=Pa,hs(r,0),Hr(r,d),ii(r,Be()),c;if(o===6)Hr(r,d);else{if(g=r.current.alternate,(d&30)===0&&!t1(g)&&(o=oc(r,d),o===2&&(w=tr(r),w!==0&&(d=w,o=Jf(r,w))),o===1))throw c=Pa,hs(r,0),Hr(r,d),ii(r,Be()),c;switch(r.finishedWork=g,r.finishedLanes=d,o){case 0:case 1:throw Error(t(345));case 2:ps(r,ni,cr);break;case 3:if(Hr(r,d),(d&130023424)===d&&(o=Kf+500-Be(),10<o)){if(Gi(r,0)!==0)break;if(g=r.suspendedLanes,(g&d)!==d){jn(),r.pingedLanes|=r.suspendedLanes&g;break}r.timeoutHandle=rf(ps.bind(null,r,ni,cr),o);break}ps(r,ni,cr);break;case 4:if(Hr(r,d),(d&4194240)===d)break;for(o=r.eventTimes,g=-1;0<d;){var C=31-Dt(d);w=1<<C,C=o[C],C>g&&(g=C),d&=~w}if(d=g,d=Be()-d,d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3e3>d?3e3:4320>d?4320:1960*e1(d/1960))-d,10<d){r.timeoutHandle=rf(ps.bind(null,r,ni,cr),d);break}ps(r,ni,cr);break;case 5:ps(r,ni,cr);break;default:throw Error(t(329))}}}return ii(r,Be()),r.callbackNode===c?K0.bind(null,r):null}function Jf(r,o){var c=La;return r.current.memoizedState.isDehydrated&&(hs(r,o).flags|=256),r=oc(r,o),r!==2&&(o=ni,ni=c,o!==null&&Qf(o)),r}function Qf(r){ni===null?ni=r:ni.push.apply(ni,r)}function t1(r){for(var o=r;;){if(o.flags&16384){var c=o.updateQueue;if(c!==null&&(c=c.stores,c!==null))for(var d=0;d<c.length;d++){var g=c[d],w=g.getSnapshot;g=g.value;try{if(!Pi(w(),g))return!1}catch{return!1}}}if(c=o.child,o.subtreeFlags&16384&&c!==null)c.return=o,o=c;else{if(o===r)break;for(;o.sibling===null;){if(o.return===null||o.return===r)return!0;o=o.return}o.sibling.return=o.return,o=o.sibling}}return!0}function Hr(r,o){for(o&=~qf,o&=~ec,r.suspendedLanes|=o,r.pingedLanes&=~o,r=r.expirationTimes;0<o;){var c=31-Dt(o),d=1<<c;r[c]=-1,o&=~d}}function Y0(r){if((Vt&6)!==0)throw Error(t(327));so();var o=Gi(r,0);if((o&1)===0)return ii(r,Be()),null;var c=oc(r,o);if(r.tag!==0&&c===2){var d=tr(r);d!==0&&(o=d,c=Jf(r,d))}if(c===1)throw c=Pa,hs(r,0),Hr(r,o),ii(r,Be()),c;if(c===6)throw Error(t(345));return r.finishedWork=r.current.alternate,r.finishedLanes=o,ps(r,ni,cr),ii(r,Be()),null}function ed(r,o){var c=Vt;Vt|=1;try{return r(o)}finally{Vt=c,Vt===0&&(ro=Be()+500,Dl&&Nr())}}function ds(r){zr!==null&&zr.tag===0&&(Vt&6)===0&&so();var o=Vt;Vt|=1;var c=xi.transition,d=Kt;try{if(xi.transition=null,Kt=1,r)return r()}finally{Kt=d,xi.transition=c,Vt=o,(Vt&6)===0&&Nr()}}function td(){fi=io.current,on(io)}function hs(r,o){r.finishedWork=null,r.finishedLanes=0;var c=r.timeoutHandle;if(c!==-1&&(r.timeoutHandle=-1,Lx(c)),vn!==null)for(c=vn.return;c!==null;){var d=c;switch(uf(d),d.tag){case 1:d=d.type.childContextTypes,d!=null&&Ll();break;case 3:eo(),on(Qn),on(On),wf();break;case 5:Sf(d);break;case 4:eo();break;case 13:on(ln);break;case 19:on(ln);break;case 10:gf(d.type._context);break;case 22:case 23:td()}c=c.return}if(An=r,vn=r=Vr(r.current,null),Nn=fi=o,Sn=0,Pa=null,qf=ec=fs=0,ni=La=null,ls!==null){for(o=0;o<ls.length;o++)if(c=ls[o],d=c.interleaved,d!==null){c.interleaved=null;var g=d.next,w=c.pending;if(w!==null){var C=w.next;w.next=g,d.next=C}c.pending=d}ls=null}return r}function Z0(r,o){do{var c=vn;try{if(mf(),Gl.current=Xl,Wl){for(var d=cn.memoizedState;d!==null;){var g=d.queue;g!==null&&(g.pending=null),d=d.next}Wl=!1}if(us=0,Tn=xn=cn=null,Ea=!1,ba=0,Xf.current=null,c===null||c.return===null){Sn=1,Pa=o,vn=null;break}e:{var w=r,C=c.return,j=c,te=o;if(o=Nn,j.flags|=32768,te!==null&&typeof te=="object"&&typeof te.then=="function"){var ge=te,Fe=j,He=Fe.tag;if((Fe.mode&1)===0&&(He===0||He===11||He===15)){var ke=Fe.alternate;ke?(Fe.updateQueue=ke.updateQueue,Fe.memoizedState=ke.memoizedState,Fe.lanes=ke.lanes):(Fe.updateQueue=null,Fe.memoizedState=null)}var st=M0(C);if(st!==null){st.flags&=-257,w0(st,C,j,w,o),st.mode&1&&S0(w,ge,o),o=st,te=ge;var ft=o.updateQueue;if(ft===null){var ht=new Set;ht.add(te),o.updateQueue=ht}else ft.add(te);break e}else{if((o&1)===0){S0(w,ge,o),nd();break e}te=Error(t(426))}}else if(an&&j.mode&1){var dn=M0(C);if(dn!==null){(dn.flags&65536)===0&&(dn.flags|=256),w0(dn,C,j,w,o),hf(to(te,j));break e}}w=te=to(te,j),Sn!==4&&(Sn=2),La===null?La=[w]:La.push(w),w=C;do{switch(w.tag){case 3:w.flags|=65536,o&=-o,w.lanes|=o;var fe=_0(w,te,o);$m(w,fe);break e;case 1:j=te;var oe=w.type,me=w.stateNode;if((w.flags&128)===0&&(typeof oe.getDerivedStateFromError=="function"||me!==null&&typeof me.componentDidCatch=="function"&&(Fr===null||!Fr.has(me)))){w.flags|=65536,o&=-o,w.lanes|=o;var Xe=x0(w,j,o);$m(w,Xe);break e}}w=w.return}while(w!==null)}eg(c)}catch(gt){o=gt,vn===c&&c!==null&&(vn=c=c.return);continue}break}while(!0)}function J0(){var r=Ql.current;return Ql.current=Xl,r===null?Xl:r}function nd(){(Sn===0||Sn===3||Sn===2)&&(Sn=4),An===null||(fs&268435455)===0&&(ec&268435455)===0||Hr(An,Nn)}function oc(r,o){var c=Vt;Vt|=2;var d=J0();(An!==r||Nn!==o)&&(cr=null,hs(r,o));do try{n1();break}catch(g){Z0(r,g)}while(!0);if(mf(),Vt=c,Ql.current=d,vn!==null)throw Error(t(261));return An=null,Nn=0,Sn}function n1(){for(;vn!==null;)Q0(vn)}function i1(){for(;vn!==null&&!se();)Q0(vn)}function Q0(r){var o=ig(r.alternate,r,fi);r.memoizedProps=r.pendingProps,o===null?eg(r):vn=o,Xf.current=null}function eg(r){var o=r;do{var c=o.alternate;if(r=o.return,(o.flags&32768)===0){if(c=Kx(c,o,fi),c!==null){vn=c;return}}else{if(c=Yx(c,o),c!==null){c.flags&=32767,vn=c;return}if(r!==null)r.flags|=32768,r.subtreeFlags=0,r.deletions=null;else{Sn=6,vn=null;return}}if(o=o.sibling,o!==null){vn=o;return}vn=o=r}while(o!==null);Sn===0&&(Sn=5)}function ps(r,o,c){var d=Kt,g=xi.transition;try{xi.transition=null,Kt=1,r1(r,o,c,d)}finally{xi.transition=g,Kt=d}return null}function r1(r,o,c,d){do so();while(zr!==null);if((Vt&6)!==0)throw Error(t(327));c=r.finishedWork;var g=r.finishedLanes;if(c===null)return null;if(r.finishedWork=null,r.finishedLanes=0,c===r.current)throw Error(t(177));r.callbackNode=null,r.callbackPriority=0;var w=c.lanes|c.childLanes;if(pl(r,w),r===An&&(vn=An=null,Nn=0),(c.subtreeFlags&2064)===0&&(c.flags&2064)===0||nc||(nc=!0,rg(At,function(){return so(),null})),w=(c.flags&15990)!==0,(c.subtreeFlags&15990)!==0||w){w=xi.transition,xi.transition=null;var C=Kt;Kt=1;var j=Vt;Vt|=4,Xf.current=null,Jx(r,c),W0(c,r),Ex(tf),vl=!!ef,tf=ef=null,r.current=c,Qx(c),Ve(),Vt=j,Kt=C,xi.transition=w}else r.current=c;if(nc&&(nc=!1,zr=r,ic=g),w=r.pendingLanes,w===0&&(Fr=null),kn(c.stateNode),ii(r,Be()),o!==null)for(d=r.onRecoverableError,c=0;c<o.length;c++)g=o[c],d(g.value,{componentStack:g.stack,digest:g.digest});if(tc)throw tc=!1,r=Yf,Yf=null,r;return(ic&1)!==0&&r.tag!==0&&so(),w=r.pendingLanes,(w&1)!==0?r===Zf?Ia++:(Ia=0,Zf=r):Ia=0,Nr(),null}function so(){if(zr!==null){var r=Vp(ic),o=xi.transition,c=Kt;try{if(xi.transition=null,Kt=16>r?16:r,zr===null)var d=!1;else{if(r=zr,zr=null,ic=0,(Vt&6)!==0)throw Error(t(331));var g=Vt;for(Vt|=4,lt=r.current;lt!==null;){var w=lt,C=w.child;if((lt.flags&16)!==0){var j=w.deletions;if(j!==null){for(var te=0;te<j.length;te++){var ge=j[te];for(lt=ge;lt!==null;){var Fe=lt;switch(Fe.tag){case 0:case 11:case 15:Ra(8,Fe,w)}var He=Fe.child;if(He!==null)He.return=Fe,lt=He;else for(;lt!==null;){Fe=lt;var ke=Fe.sibling,st=Fe.return;if(z0(Fe),Fe===ge){lt=null;break}if(ke!==null){ke.return=st,lt=ke;break}lt=st}}}var ft=w.alternate;if(ft!==null){var ht=ft.child;if(ht!==null){ft.child=null;do{var dn=ht.sibling;ht.sibling=null,ht=dn}while(ht!==null)}}lt=w}}if((w.subtreeFlags&2064)!==0&&C!==null)C.return=w,lt=C;else e:for(;lt!==null;){if(w=lt,(w.flags&2048)!==0)switch(w.tag){case 0:case 11:case 15:Ra(9,w,w.return)}var fe=w.sibling;if(fe!==null){fe.return=w.return,lt=fe;break e}lt=w.return}}var oe=r.current;for(lt=oe;lt!==null;){C=lt;var me=C.child;if((C.subtreeFlags&2064)!==0&&me!==null)me.return=C,lt=me;else e:for(C=oe;lt!==null;){if(j=lt,(j.flags&2048)!==0)try{switch(j.tag){case 0:case 11:case 15:Jl(9,j)}}catch(gt){fn(j,j.return,gt)}if(j===C){lt=null;break e}var Xe=j.sibling;if(Xe!==null){Xe.return=j.return,lt=Xe;break e}lt=j.return}}if(Vt=g,Nr(),zt&&typeof zt.onPostCommitFiberRoot=="function")try{zt.onPostCommitFiberRoot($t,r)}catch{}d=!0}return d}finally{Kt=c,xi.transition=o}}return!1}function tg(r,o,c){o=to(c,o),o=_0(r,o,1),r=Ur(r,o,1),o=jn(),r!==null&&(Jn(r,1,o),ii(r,o))}function fn(r,o,c){if(r.tag===3)tg(r,r,c);else for(;o!==null;){if(o.tag===3){tg(o,r,c);break}else if(o.tag===1){var d=o.stateNode;if(typeof o.type.getDerivedStateFromError=="function"||typeof d.componentDidCatch=="function"&&(Fr===null||!Fr.has(d))){r=to(c,r),r=x0(o,r,1),o=Ur(o,r,1),r=jn(),o!==null&&(Jn(o,1,r),ii(o,r));break}}o=o.return}}function s1(r,o,c){var d=r.pingCache;d!==null&&d.delete(o),o=jn(),r.pingedLanes|=r.suspendedLanes&c,An===r&&(Nn&c)===c&&(Sn===4||Sn===3&&(Nn&130023424)===Nn&&500>Be()-Kf?hs(r,0):qf|=c),ii(r,o)}function ng(r,o){o===0&&((r.mode&1)===0?o=1:(o=Ri,Ri<<=1,(Ri&130023424)===0&&(Ri=4194304)));var c=jn();r=or(r,o),r!==null&&(Jn(r,o,c),ii(r,c))}function o1(r){var o=r.memoizedState,c=0;o!==null&&(c=o.retryLane),ng(r,c)}function a1(r,o){var c=0;switch(r.tag){case 13:var d=r.stateNode,g=r.memoizedState;g!==null&&(c=g.retryLane);break;case 19:d=r.stateNode;break;default:throw Error(t(314))}d!==null&&d.delete(o),ng(r,c)}var ig;ig=function(r,o,c){if(r!==null)if(r.memoizedProps!==o.pendingProps||Qn.current)ti=!0;else{if((r.lanes&c)===0&&(o.flags&128)===0)return ti=!1,qx(r,o,c);ti=(r.flags&131072)!==0}else ti=!1,an&&(o.flags&1048576)!==0&&Um(o,kl,o.index);switch(o.lanes=0,o.tag){case 2:var d=o.type;Yl(r,o),r=o.pendingProps;var g=Xs(o,On.current);Qs(o,c),g=Tf(null,o,d,r,g,c);var w=Af();return o.flags|=1,typeof g=="object"&&g!==null&&typeof g.render=="function"&&g.$$typeof===void 0?(o.tag=1,o.memoizedState=null,o.updateQueue=null,ei(d)?(w=!0,Il(o)):w=!1,o.memoizedState=g.state!==null&&g.state!==void 0?g.state:null,_f(o),g.updater=ql,o.stateNode=g,g._reactInternals=o,Df(o,d,r,c),o=Of(null,o,d,!0,w,c)):(o.tag=0,an&&w&&cf(o),Wn(null,o,g,c),o=o.child),o;case 16:d=o.elementType;e:{switch(Yl(r,o),r=o.pendingProps,g=d._init,d=g(d._payload),o.type=d,g=o.tag=c1(d),r=Ii(d,r),g){case 0:o=Uf(null,o,d,r,c);break e;case 1:o=R0(null,o,d,r,c);break e;case 11:o=E0(null,o,d,r,c);break e;case 14:o=b0(null,o,d,Ii(d.type,r),c);break e}throw Error(t(306,d,""))}return o;case 0:return d=o.type,g=o.pendingProps,g=o.elementType===d?g:Ii(d,g),Uf(r,o,d,g,c);case 1:return d=o.type,g=o.pendingProps,g=o.elementType===d?g:Ii(d,g),R0(r,o,d,g,c);case 3:e:{if(P0(o),r===null)throw Error(t(387));d=o.pendingProps,w=o.memoizedState,g=w.element,jm(r,o),Hl(o,d,null,c);var C=o.memoizedState;if(d=C.element,w.isDehydrated)if(w={element:d,isDehydrated:!1,cache:C.cache,pendingSuspenseBoundaries:C.pendingSuspenseBoundaries,transitions:C.transitions},o.updateQueue.baseState=w,o.memoizedState=w,o.flags&256){g=to(Error(t(423)),o),o=L0(r,o,d,c,g);break e}else if(d!==g){g=to(Error(t(424)),o),o=L0(r,o,d,c,g);break e}else for(ui=Lr(o.stateNode.containerInfo.firstChild),ci=o,an=!0,Li=null,c=Gm(o,null,d,c),o.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{if(Ys(),d===g){o=lr(r,o,c);break e}Wn(r,o,d,c)}o=o.child}return o;case 5:return qm(o),r===null&&df(o),d=o.type,g=o.pendingProps,w=r!==null?r.memoizedProps:null,C=g.children,nf(d,g)?C=null:w!==null&&nf(d,w)&&(o.flags|=32),C0(r,o),Wn(r,o,C,c),o.child;case 6:return r===null&&df(o),null;case 13:return I0(r,o,c);case 4:return xf(o,o.stateNode.containerInfo),d=o.pendingProps,r===null?o.child=Zs(o,null,d,c):Wn(r,o,d,c),o.child;case 11:return d=o.type,g=o.pendingProps,g=o.elementType===d?g:Ii(d,g),E0(r,o,d,g,c);case 7:return Wn(r,o,o.pendingProps,c),o.child;case 8:return Wn(r,o,o.pendingProps.children,c),o.child;case 12:return Wn(r,o,o.pendingProps.children,c),o.child;case 10:e:{if(d=o.type._context,g=o.pendingProps,w=o.memoizedProps,C=g.value,nn(Fl,d._currentValue),d._currentValue=C,w!==null)if(Pi(w.value,C)){if(w.children===g.children&&!Qn.current){o=lr(r,o,c);break e}}else for(w=o.child,w!==null&&(w.return=o);w!==null;){var j=w.dependencies;if(j!==null){C=w.child;for(var te=j.firstContext;te!==null;){if(te.context===d){if(w.tag===1){te=ar(-1,c&-c),te.tag=2;var ge=w.updateQueue;if(ge!==null){ge=ge.shared;var Fe=ge.pending;Fe===null?te.next=te:(te.next=Fe.next,Fe.next=te),ge.pending=te}}w.lanes|=c,te=w.alternate,te!==null&&(te.lanes|=c),vf(w.return,c,o),j.lanes|=c;break}te=te.next}}else if(w.tag===10)C=w.type===o.type?null:w.child;else if(w.tag===18){if(C=w.return,C===null)throw Error(t(341));C.lanes|=c,j=C.alternate,j!==null&&(j.lanes|=c),vf(C,c,o),C=w.sibling}else C=w.child;if(C!==null)C.return=w;else for(C=w;C!==null;){if(C===o){C=null;break}if(w=C.sibling,w!==null){w.return=C.return,C=w;break}C=C.return}w=C}Wn(r,o,g.children,c),o=o.child}return o;case 9:return g=o.type,d=o.pendingProps.children,Qs(o,c),g=yi(g),d=d(g),o.flags|=1,Wn(r,o,d,c),o.child;case 14:return d=o.type,g=Ii(d,o.pendingProps),g=Ii(d.type,g),b0(r,o,d,g,c);case 15:return T0(r,o,o.type,o.pendingProps,c);case 17:return d=o.type,g=o.pendingProps,g=o.elementType===d?g:Ii(d,g),Yl(r,o),o.tag=1,ei(d)?(r=!0,Il(o)):r=!1,Qs(o,c),v0(o,d,g),Df(o,d,g,c),Of(null,o,d,!0,r,c);case 19:return N0(r,o,c);case 22:return A0(r,o,c)}throw Error(t(156,o.tag))};function rg(r,o){return ue(r,o)}function l1(r,o,c,d){this.tag=r,this.key=c,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=o,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=d,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Si(r,o,c,d){return new l1(r,o,c,d)}function id(r){return r=r.prototype,!(!r||!r.isReactComponent)}function c1(r){if(typeof r=="function")return id(r)?1:0;if(r!=null){if(r=r.$$typeof,r===q)return 11;if(r===he)return 14}return 2}function Vr(r,o){var c=r.alternate;return c===null?(c=Si(r.tag,o,r.key,r.mode),c.elementType=r.elementType,c.type=r.type,c.stateNode=r.stateNode,c.alternate=r,r.alternate=c):(c.pendingProps=o,c.type=r.type,c.flags=0,c.subtreeFlags=0,c.deletions=null),c.flags=r.flags&14680064,c.childLanes=r.childLanes,c.lanes=r.lanes,c.child=r.child,c.memoizedProps=r.memoizedProps,c.memoizedState=r.memoizedState,c.updateQueue=r.updateQueue,o=r.dependencies,c.dependencies=o===null?null:{lanes:o.lanes,firstContext:o.firstContext},c.sibling=r.sibling,c.index=r.index,c.ref=r.ref,c}function ac(r,o,c,d,g,w){var C=2;if(d=r,typeof r=="function")id(r)&&(C=1);else if(typeof r=="string")C=5;else e:switch(r){case D:return ms(c.children,g,w,o);case B:C=8,g|=8;break;case L:return r=Si(12,c,o,g|2),r.elementType=L,r.lanes=w,r;case X:return r=Si(13,c,o,g),r.elementType=X,r.lanes=w,r;case ne:return r=Si(19,c,o,g),r.elementType=ne,r.lanes=w,r;case Me:return lc(c,g,w,o);default:if(typeof r=="object"&&r!==null)switch(r.$$typeof){case A:C=10;break e;case U:C=9;break e;case q:C=11;break e;case he:C=14;break e;case ae:C=16,d=null;break e}throw Error(t(130,r==null?r:typeof r,""))}return o=Si(C,c,o,g),o.elementType=r,o.type=d,o.lanes=w,o}function ms(r,o,c,d){return r=Si(7,r,d,o),r.lanes=c,r}function lc(r,o,c,d){return r=Si(22,r,d,o),r.elementType=Me,r.lanes=c,r.stateNode={isHidden:!1},r}function rd(r,o,c){return r=Si(6,r,null,o),r.lanes=c,r}function sd(r,o,c){return o=Si(4,r.children!==null?r.children:[],r.key,o),o.lanes=c,o.stateNode={containerInfo:r.containerInfo,pendingChildren:null,implementation:r.implementation},o}function u1(r,o,c,d,g){this.tag=o,this.containerInfo=r,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=mi(0),this.expirationTimes=mi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=mi(0),this.identifierPrefix=d,this.onRecoverableError=g,this.mutableSourceEagerHydrationData=null}function od(r,o,c,d,g,w,C,j,te){return r=new u1(r,o,c,j,te),o===1?(o=1,w===!0&&(o|=8)):o=0,w=Si(3,null,null,o),r.current=w,w.stateNode=r,w.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null},_f(w),r}function f1(r,o,c){var d=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:N,key:d==null?null:""+d,children:r,containerInfo:o,implementation:c}}function sg(r){if(!r)return Dr;r=r._reactInternals;e:{if(vt(r)!==r||r.tag!==1)throw Error(t(170));var o=r;do{switch(o.tag){case 3:o=o.stateNode.context;break e;case 1:if(ei(o.type)){o=o.stateNode.__reactInternalMemoizedMergedChildContext;break e}}o=o.return}while(o!==null);throw Error(t(171))}if(r.tag===1){var c=r.type;if(ei(c))return Dm(r,c,o)}return o}function og(r,o,c,d,g,w,C,j,te){return r=od(c,d,!0,r,g,w,C,j,te),r.context=sg(null),c=r.current,d=jn(),g=Br(c),w=ar(d,g),w.callback=o??null,Ur(c,w,g),r.current.lanes=g,Jn(r,g,d),ii(r,d),r}function cc(r,o,c,d){var g=o.current,w=jn(),C=Br(g);return c=sg(c),o.context===null?o.context=c:o.pendingContext=c,o=ar(w,C),o.payload={element:r},d=d===void 0?null:d,d!==null&&(o.callback=d),r=Ur(g,o,C),r!==null&&(ki(r,g,C,w),Bl(r,g,C)),C}function uc(r){if(r=r.current,!r.child)return null;switch(r.child.tag){case 5:return r.child.stateNode;default:return r.child.stateNode}}function ag(r,o){if(r=r.memoizedState,r!==null&&r.dehydrated!==null){var c=r.retryLane;r.retryLane=c!==0&&c<o?c:o}}function ad(r,o){ag(r,o),(r=r.alternate)&&ag(r,o)}function d1(){return null}var lg=typeof reportError=="function"?reportError:function(r){console.error(r)};function ld(r){this._internalRoot=r}fc.prototype.render=ld.prototype.render=function(r){var o=this._internalRoot;if(o===null)throw Error(t(409));cc(r,o,null,null)},fc.prototype.unmount=ld.prototype.unmount=function(){var r=this._internalRoot;if(r!==null){this._internalRoot=null;var o=r.containerInfo;ds(function(){cc(null,r,null,null)}),o[nr]=null}};function fc(r){this._internalRoot=r}fc.prototype.unstable_scheduleHydration=function(r){if(r){var o=jp();r={blockedOn:null,target:r,priority:o};for(var c=0;c<Cr.length&&o!==0&&o<Cr[c].priority;c++);Cr.splice(c,0,r),c===0&&qp(r)}};function cd(r){return!(!r||r.nodeType!==1&&r.nodeType!==9&&r.nodeType!==11)}function dc(r){return!(!r||r.nodeType!==1&&r.nodeType!==9&&r.nodeType!==11&&(r.nodeType!==8||r.nodeValue!==" react-mount-point-unstable "))}function cg(){}function h1(r,o,c,d,g){if(g){if(typeof d=="function"){var w=d;d=function(){var ge=uc(C);w.call(ge)}}var C=og(o,d,r,0,null,!1,!1,"",cg);return r._reactRootContainer=C,r[nr]=C.current,ga(r.nodeType===8?r.parentNode:r),ds(),C}for(;g=r.lastChild;)r.removeChild(g);if(typeof d=="function"){var j=d;d=function(){var ge=uc(te);j.call(ge)}}var te=od(r,0,!1,null,null,!1,!1,"",cg);return r._reactRootContainer=te,r[nr]=te.current,ga(r.nodeType===8?r.parentNode:r),ds(function(){cc(o,te,c,d)}),te}function hc(r,o,c,d,g){var w=c._reactRootContainer;if(w){var C=w;if(typeof g=="function"){var j=g;g=function(){var te=uc(C);j.call(te)}}cc(o,C,r,g)}else C=h1(c,o,r,g,d);return uc(C)}Gp=function(r){switch(r.tag){case 3:var o=r.stateNode;if(o.current.memoizedState.isDehydrated){var c=_n(o.pendingLanes);c!==0&&(Iu(o,c|1),ii(o,Be()),(Vt&6)===0&&(ro=Be()+500,Nr()))}break;case 13:ds(function(){var d=or(r,1);if(d!==null){var g=jn();ki(d,r,1,g)}}),ad(r,1)}},Du=function(r){if(r.tag===13){var o=or(r,134217728);if(o!==null){var c=jn();ki(o,r,134217728,c)}ad(r,134217728)}},Wp=function(r){if(r.tag===13){var o=Br(r),c=or(r,o);if(c!==null){var d=jn();ki(c,r,o,d)}ad(r,o)}},jp=function(){return Kt},$p=function(r,o){var c=Kt;try{return Kt=r,o()}finally{Kt=c}},We=function(r,o,c){switch(o){case"input":if(Ue(r,c),o=c.name,c.type==="radio"&&o!=null){for(c=r;c.parentNode;)c=c.parentNode;for(c=c.querySelectorAll("input[name="+JSON.stringify(""+o)+'][type="radio"]'),o=0;o<c.length;o++){var d=c[o];if(d!==r&&d.form===r.form){var g=Pl(d);if(!g)throw Error(t(90));ye(d),Ue(d,g)}}}break;case"textarea":be(r,c);break;case"select":o=c.value,o!=null&&H(r,!!c.multiple,o,!1)}},Xt=ed,qt=ds;var p1={usingClientEntryPoint:!1,Events:[_a,js,Pl,Ye,Mt,ed]},Da={findFiberByHostInstance:rs,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},m1={bundleType:Da.bundleType,version:Da.version,rendererPackageName:Da.rendererPackageName,rendererConfig:Da.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:E.ReactCurrentDispatcher,findHostInstanceByFiber:function(r){return r=I(r),r===null?null:r.stateNode},findFiberByHostInstance:Da.findFiberByHostInstance||d1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var pc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!pc.isDisabled&&pc.supportsFiber)try{$t=pc.inject(m1),zt=pc}catch{}}return ri.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=p1,ri.createPortal=function(r,o){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!cd(o))throw Error(t(200));return f1(r,o,null,c)},ri.createRoot=function(r,o){if(!cd(r))throw Error(t(299));var c=!1,d="",g=lg;return o!=null&&(o.unstable_strictMode===!0&&(c=!0),o.identifierPrefix!==void 0&&(d=o.identifierPrefix),o.onRecoverableError!==void 0&&(g=o.onRecoverableError)),o=od(r,1,!1,null,null,c,!1,d,g),r[nr]=o.current,ga(r.nodeType===8?r.parentNode:r),new ld(o)},ri.findDOMNode=function(r){if(r==null)return null;if(r.nodeType===1)return r;var o=r._reactInternals;if(o===void 0)throw typeof r.render=="function"?Error(t(188)):(r=Object.keys(r).join(","),Error(t(268,r)));return r=I(o),r=r===null?null:r.stateNode,r},ri.flushSync=function(r){return ds(r)},ri.hydrate=function(r,o,c){if(!dc(o))throw Error(t(200));return hc(null,r,o,!0,c)},ri.hydrateRoot=function(r,o,c){if(!cd(r))throw Error(t(405));var d=c!=null&&c.hydratedSources||null,g=!1,w="",C=lg;if(c!=null&&(c.unstable_strictMode===!0&&(g=!0),c.identifierPrefix!==void 0&&(w=c.identifierPrefix),c.onRecoverableError!==void 0&&(C=c.onRecoverableError)),o=og(o,null,r,1,c??null,g,!1,w,C),r[nr]=o.current,ga(r),d)for(r=0;r<d.length;r++)c=d[r],g=c._getVersion,g=g(c._source),o.mutableSourceEagerHydrationData==null?o.mutableSourceEagerHydrationData=[c,g]:o.mutableSourceEagerHydrationData.push(c,g);return new fc(o)},ri.render=function(r,o,c){if(!dc(o))throw Error(t(200));return hc(null,r,o,!1,c)},ri.unmountComponentAtNode=function(r){if(!dc(r))throw Error(t(40));return r._reactRootContainer?(ds(function(){hc(null,null,r,!1,function(){r._reactRootContainer=null,r[nr]=null})}),!0):!1},ri.unstable_batchedUpdates=ed,ri.unstable_renderSubtreeIntoContainer=function(r,o,c,d){if(!dc(c))throw Error(t(200));if(r==null||r._reactInternals===void 0)throw Error(t(38));return hc(r,o,c,!1,d)},ri.version="18.3.1-next-f1338f8080-20240426",ri}var vg;function w1(){if(vg)return dd.exports;vg=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(e){console.error(e)}}return i(),dd.exports=M1(),dd.exports}var yg;function E1(){if(yg)return mc;yg=1;var i=w1();return mc.createRoot=i.createRoot,mc.hydrateRoot=i.hydrateRoot,mc}var b1=E1();const T1="modulepreload",A1=function(i){return"/suigou/"+i},_g={},C1=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let l=function(h){return Promise.all(h.map(p=>Promise.resolve(p).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};document.getElementsByTagName("link");const u=document.querySelector("meta[property=csp-nonce]"),f=(u==null?void 0:u.nonce)||(u==null?void 0:u.getAttribute("nonce"));s=l(t.map(h=>{if(h=A1(h),h in _g)return;_g[h]=!0;const p=h.endsWith(".css"),m=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${m}`))return;const v=document.createElement("link");if(v.rel=p?"stylesheet":T1,p||(v.as="script"),v.crossOrigin="",v.href=h,f&&v.setAttribute("nonce",f),document.head.appendChild(v),p)return new Promise((y,M)=>{v.addEventListener("load",y),v.addEventListener("error",()=>M(new Error(`Unable to preload CSS for ${h}`)))})}))}function a(l){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=l,window.dispatchEvent(u),!u.defaultPrevented)throw l}return s.then(l=>{for(const u of l||[])u.status==="rejected"&&a(u.reason);return e().catch(a)})},R1=`# 物件形态原型库（archetypes）：来自公开资料的真实尺寸档位与拓扑特征\r
# 用途：意图默认值 + 形态校验档位的单一数据源（代码不再硬编码尺寸档位）\r
meta:\r
  id: archetypes\r
  source: 百度百科(电脑桌855818)/百度AI聚合搜索(2026-08 采集)：电脑桌尺寸、家用置物架、衣柜国标、鞋柜层高、鱼缸底柜承重；2026-08-14 补用户实拍案例库（随构/21，三个带完整BOM的锚点案例）\r
  confidence: public+verified-cases\r
  review: pending-expert\r
  version: 0.2.0\r
  updated: 2026-08-14\r
\r
archetypes:\r
  computer-desk:\r
    name: 电脑桌（含上层置物变体）\r
    # 桌面上表面高度：标准75cm，通用区间72~76；740 腿高有实拍案例 BOM 实证（极简桌 740×4）\r
    deskTopHeightMm: { min: 680, std: 740, max: 800 }\r
    # 桌面深度：60cm 为入门舒适线（显示器+键鼠+理线），双屏 65~70；<55 压迫视线\r
    depthMm: { min: 550, std: 650, max: 800 }\r
    # 宽度：单人单屏 100~120cm；双屏/带主机 140~160cm+\r
    widthMm: { min: 800, std: 1200, max: 1800 }\r
    # 纯桌总高=桌面高；带上层置物架（hutch）变体总高常见 1.1~1.8m\r
    overallHeightMm: { min: 680, hutchMin: 1100, hutchMax: 1800 }\r
    # 上层搁板：显示器/置物辅层，深度为主桌面的 40%~70%，靠后放置\r
    upperShelfDepthRatio: { min: 0.4, std: 0.55, max: 0.7 }\r
    topology:\r
      legroom: required        # 正面腿部净空必须开放\r
      bottomPanel: forbidden   # 底板封死=货架/柜体语义\r
      fullHeightSidePanels: forbidden\r
      frontDoor: forbidden\r
\r
  storage-rack:\r
    name: 家用置物架/货架\r
    depthMm: { min: 250, std: 400, max: 600 }     # 书250-300 杂物350-450 重型40-60cm\r
    shelfPitchMm: { min: 250, std: 320, max: 500 } # 固定层板约30cm；重型35-50可调\r
    overallHeightMm: { min: 600, std: 1700, max: 2000 }\r
    widthMm: { min: 400, std: 900, max: 1200 }     # 常见模数 40/50/60/80/100cm\r
    note: 落地架>1.6m 建议上墙固定防倾倒；底层留 150-200mm 便于扫地机\r
\r
  wardrobe:\r
    name: 衣柜（开放式/柜体）\r
    depthMm: { min: 550, std: 600, max: 630 }      # <55 厚外套顶门；>60 卫生死角\r
    overallHeightMm: { min: 2000, std: 2400, max: 2600 }\r
    shortHangMm: { min: 900, std: 1000, max: 1200 } # 短衣区净高\r
    longHangMm: { min: 1300, std: 1450, max: 1700 } # 长衣区净高（羽绒服/长裙取高值）\r
    note: 挂衣杆离地 1600-1850；杆顶距上层板留 50-60mm 取放衣架\r
\r
  shoe-rack:\r
    name: 鞋架/鞋柜\r
    depthMm: { min: 300, std: 350, max: 450 }      # 350 净深可平放44码；含鞋盒≥380\r
    shelfPitchMm: { min: 120, std: 160, max: 200 } # 平底120-150 运动150-180 高帮180-200\r
    bootZoneMm: { min: 250, max: 500 }             # 短靴250-350 长靴400-500\r
    bottomGapMm: { min: 150, std: 180, max: 200 }  # 底部留空放常穿鞋\r
    overallHeightMm: { min: 850, std: 1000, max: 1200 }\r
\r
  aquarium-stand:\r
    name: 鱼缸架/底柜\r
    standHeightMm: { min: 700, std: 750, max: 900 } # 淡水70-75 海水(设备)80-90\r
    overallWithTankMm: { min: 1200, max: 1400 }     # 站立平视缸中上部\r
    topMarginMm: { length: 40, width: 25 }          # 柜面比缸底长+3~5cm 宽+2~3cm\r
    loadFactorVsWater: 1.5                          # 标称承重≥满水总重×1.5（含缸体/底砂/造景安全系数）\r
    minHouseholdKg: 200                             # 家用鱼缸通常总重≥200kg（经验最低值，非系数）\r
    note: 大缸(>1m)必须金属框架/多立柱+全支撑面；严禁点状支撑与普通家具替代\r
\r
  industrial-workbench:\r
    name: 车间/维修工作台\r
    workTopHeightMm: { min: 780, std: 800, max: 850 } # 站姿操作\r
    depthMm: { min: 600, std: 750, max: 900 }\r
    widthMm: { min: 1000, std: 1200, max: 1800 }\r
    note: 允许下层板/抽屉/重横撑；与家用电脑桌语义区分\r
\r
  drawer-tower:\r
    name: 抽屉塔（周转箱/成品抽屉收纳柜）\r
    # 实拍案例双实证：四层740/三层575（节距165）；三抽屉柜490/3（节距163）\r
    drawerPitchMm: { min: 160, std: 165, max: 230 }   # 标准箱148高→165节距；高箱230→~240节距\r
    frameOverheadMm: { std: 80 }                       # 框架高 = 层数×节距 + 顶部结构区\r
    widthMm: { min: 350, std: 400, max: 700 }\r
    depthMm: { min: 400, std: 405, max: 450 }          # 周转箱 40cm 长边沿深度方向\r
    overallHeightMm: { min: 490, std: 740, max: 1100 }\r
    topology:\r
      drawers: front                                   # 正面即抽屉，无门\r
      sidePegboard: common                             # 侧面洞洞板（自打孔海洋板）高频\r
      mobility: caster-or-leveling                     # 福马轮或调平地脚\r
    note: 抽屉=周转箱+底托+三折轨道（工具场景）或成品抽屉+反弹轨道（家具场景）；轨道固定立柱侧槽\r
`,P1=`meta:\r
  id: anchor-30\r
  source: jlcfa-process-page\r
  confidence: verified\r
  review: approved\r
  version: 0.6.0\r
connector:\r
  id: anchor-30\r
  name: 锚式连接件 30系列\r
  category: anchor\r
  visibility: hidden\r
  compatible: { slotWidths: [8], series: [eu-3030] }\r
  strengthClass: 4\r
  loadRole: primary\r
  removable: true\r
  lengthOffset: 0\r
  attach: { facesRequired: 2, orientation: perpendicular }\r
  machining:\r
    - type: through-hole\r
      diameter: 11.5\r
      onMember: adjacent\r
      offsetFromEnd: "19 - slotWallThickness + 2"   # G=19-T+2(源:工艺页)\r
  bom:\r
    - { sku: tpef-308-0, qty: 1 }\r
`,L1=`meta:\r
  id: corner-bracket-30\r
  source: jlcfa-designer\r
  confidence: verified   # v0.2 行家评审第二部分\r
  review: approved\r
  version: 0.6.0\r
connector:\r
  id: corner-bracket-30\r
  name: 角码 30系列(面型)\r
  category: corner\r
  visibility: external\r
  compatible: { slotWidths: [8], series: [eu-3030, eu-4040-s8] }\r
  strengthClass: 3        # 行家排序：端攻5 > 锚式4 > 角码3 > 内置2\r
  loadRole: primary\r
  removable: true\r
  lengthOffset: 0         # 角码不占端面，下料长度无修正\r
  attach: { facesRequired: 2, orientation: perpendicular }\r
  machining: []           # 免加工\r
  bom:\r
    - { sku: corner-bracket-30-body, qty: 1 }\r
    - { sku: t-nut-m6, qty: 2 }\r
    - { sku: bolt-m6-l12, qty: 2 }\r
`,I1=`# 三维角件 2020：真实案例实证（工具收纳柜 670×400×815 用量×4，角部三向连接）
meta:
  id: corner-cube-20
  source: 用户实拍案例库（随构/21 工具收纳柜 BOM ×4）
  confidence: verified
  review: pending-expert
  version: 0.1.0
  updated: 2026-08-14
connector:
  id: corner-cube-20
  name: 三维角件 2020(立方三孔)
  category: corner-cube
  visibility: exposed
  compatible: { slotWidths: [6], series: [eu-2020, eu-2040] }
  strengthClass: 3
  loadRole: primary
  note: 立方三孔角件，同时接三向端面；2020 框架角部主力（小型柜体角部美观整洁）
  removable: true
  lengthOffset: 0
  attach: { facesRequired: 3, orientation: corner }
  machining:
    - { type: end-tap, thread: M6, depth: 15, onMember: beam, note: '梁端面攻丝接三通(2020系列 M6)' }
  bom:
    - { sku: corner-cube-20, qty: 1 }
    - { sku: edla-s1-m6-l30, qty: 3 }
`,D1=`meta:\r
  id: internal-30\r
  source: jlcfa-designer\r
  confidence: verified\r
  review: approved\r
  version: 0.6.0\r
connector:\r
  id: internal-30\r
  name: 内置连接件 30系列\r
  category: internal\r
  visibility: hidden\r
  compatible: { slotWidths: [8], series: [eu-3030] }\r
  strengthClass: 2        # 行家关键修正：原误标3级高于角码\r
  loadRole: positioning-aesthetic\r
  note: 定位与外观用途，长期振动下易松动，禁止单独主承重\r
  removable: true\r
  lengthOffset: 0\r
  attach: { facesRequired: 2, orientation: perpendicular }\r
  machining:\r
    - { type: wrench-hole, diameter: 8.5, onMember: self, note: 扳手操作孔(源:工艺页30系列欧标8.5) }\r
  bom:\r
    - { sku: internal-conn-30, qty: 1 }\r
`,N1=`# 内置角槽 2020：真实案例实证的 2020 系列主承重连接件（工具收纳柜 670×400×815 用量×30）\r
meta:\r
  id: internal-slot-20\r
  source: 用户实拍案例库（随构/21 工具收纳柜 BOM）\r
  confidence: verified\r
  review: pending-expert\r
  version: 0.1.0\r
  updated: 2026-08-14\r
connector:\r
  id: internal-slot-20\r
  name: 内置角槽 2020\r
  category: internal\r
  visibility: hidden\r
  compatible: { slotWidths: [6], series: [eu-2020, eu-2040] }\r
  strengthClass: 3\r
  loadRole: primary\r
  note: 2020 系列主力连接方案（真实抽屉车整柜用它承重）；槽内隐藏、免打孔\r
  removable: true\r
  lengthOffset: 0\r
  attach: { facesRequired: 2, orientation: perpendicular }\r
  machining: []\r
  bom:\r
    - { sku: internal-slot-20, qty: 1 }\r
    - { sku: screw-m4-8-pan, qty: 2 }\r
`,k1=`meta:\r
  id: screw-joint-30\r
  source: jlcfa-order-page\r
  confidence: verified\r
  review: approved\r
  version: 0.6.0\r
connector:\r
  id: screw-joint-30\r
  name: 打孔攻丝连接 30系列(M8圆柱头)\r
  category: tap\r
  visibility: hidden\r
  compatible: { slotWidths: [8], series: [eu-3030] }\r
  strengthClass: 5        # 行家：端面攻丝=轴向预紧充分利用端面受力，四类中最强\r
  loadRole: primary\r
  removable: true\r
  lengthOffset: 0\r
  attach: { facesRequired: 1, orientation: perpendicular, usesCoreHole: true }\r
  machining:\r
    - { type: end-tap, thread: M8, pitch: 1.25, depth: 20, onMember: target }   # 被连接件端面攻丝，M8×1.25粗牙\r
    - { type: counterbore, d: 9, D: 14, depth: 8.5, onMember: through }   # 穿过件沉头孔(源:工艺页欧标30 Z8)\r
  bom:\r
    - { sku: edla-s1-m8-l40, qty: 1, priceUntaxed: 0.5646 }   # 源:配件清单页\r
`,U1=`# 三通端面连接件 3030：真实案例实证（三抽屉柜 8 角全部用三通，中梁用角码）\r
meta:\r
  id: three-way-30\r
  source: 用户实拍案例库（随构/21 木制收纳柜 BOM ×8 + 安装工艺谱系图）\r
  confidence: verified\r
  review: pending-expert\r
  version: 0.1.0\r
  updated: 2026-08-14\r
connector:\r
  id: three-way-30\r
  name: 三通端面连接件 30系列\r
  category: corner-cube\r
  visibility: exposed\r
  compatible: { slotWidths: [8], series: [eu-3030] }\r
  strengthClass: 3\r
  loadRole: primary\r
  note: 立方三孔角件，同时接三向端面；3030 框架角部主力（角部美观整洁，中梁配角码）\r
  removable: true\r
  lengthOffset: 0\r
  attach: { facesRequired: 3, orientation: corner }\r
  machining:\r
    - { type: end-tap, thread: M8, depth: 20, onMember: beam, note: 梁端面攻丝接三通(源:案例BOM) }\r
  bom:\r
    - { sku: three-way-cube-30, qty: 1 }\r
    - { sku: edla-s1-m8-l40, qty: 3 }\r
`,O1=`# 垂直角码 2020：外挂面板固定（工具收纳柜侧板/背板外挂×4）
meta:
  id: vertical-bracket-20
  source: 用户实拍案例库（随构/21 工具收纳柜 BOM ×4 + 安装工艺谱系图）
  confidence: verified
  review: pending-expert
  version: 0.1.0
  updated: 2026-08-14
connector:
  id: vertical-bracket-20
  name: 垂直角码 2020(外挂面板)
  category: vertical-bracket
  visibility: external
  compatible: { slotWidths: [6], series: [eu-2020, eu-2040] }
  strengthClass: 2
  loadRole: primary
  note: L 型垂直角码，用于将面板(洞洞板/海洋板)外挂于框架侧面；螺钉入柱槽+面板角孔
  removable: true
  lengthOffset: 0
  attach: { facesRequired: 2, orientation: perpendicular }
  machining: []
  bom:
    - { sku: vertical-bracket-20, qty: 1 }
    - { sku: screw-m4-10-pan, qty: 2 }
    - { sku: t-nut-m4, qty: 2 }
`,F1=`# 紧固件/配件单价库 v0.1（未税CNY；edla 为配件清单页实价，其余为量级估价 inferred）\r
meta:\r
  id: fasteners\r
  source: jlcfa-parts-page + market-estimate\r
  confidence: inferred\r
  review: pending\r
  version: 0.1.0\r
fasteners:\r
  t-nut-m6:            { name: T型螺母 M6,            price: 0.15 }\r
  bolt-m6-l12:         { name: 内六角螺栓 M6×12,      price: 0.10 }\r
  bolt-m6-l16:         { name: 内六角螺栓 M6×16,      price: 0.12 }\r
  corner-bracket-30-body: { name: 角码本体 30系列,    price: 2.50 }\r
  tpef-308-0:          { name: 锚式连接件本体,        price: 1.80 }\r
  internal-conn-30:    { name: 内置连接件本体,        price: 1.20 }\r
  edla-s1-m8-l40:      { name: 端攻螺栓 M8×40 圆柱头, price: 0.5646, confidence: verified }\r
  epdm-gasket-pad:     { name: EPDM 胶垫,             price: 0.50 }\r
  clamp-strip-200:     { name: 压条 200mm,            price: 1.50 }\r
  caster-stem-m8-50:   { name: 丝杆脚轮 M8 Φ50,       price: 8.00 }\r
  led-strip-m:         { name: LED灯条 12V /米,       price: 15.00 }\r
  led-psu-24w:         { name: LED电源适配器 24W,     price: 20.00 }\r
  hinge-slot-30:       { name: 槽装合页 30系列,      price: 6.00 }\r
  glass-hinge:         { name: 玻璃门铰(免打孔夹式), price: 12.00 }\r
  magnetic-catch:      { name: 磁吸门扰,             price: 2.00 }\r
  handle-96:           { name: 拉手 孔距96mm,        price: 5.00 }\r
  handle-adhesive:     { name: 粘贴式把手(玻璃/亚克力), price: 3.00 }\r
  # ---- 真实案例库补充（随构/21，来自实拍产品 BOM，价格为市场量级估价）----\r
  foma-caster-gd40f:   { name: 福马轮 GD-40F(调平+移动 高70), price: 25.00 }\r
  leveling-foot-m8:    { name: 调平地脚 M8×D40×50,    price: 3.00 }\r
  extend-nut-m8-40:    { name: 不锈钢加长螺母柱 M8×16×40, price: 2.50 }\r
  drawer-slide-350:    { name: 三折抽屉轨道 35cm/副,  price: 12.00 }\r
  rebound-slide-350:   { name: 反弹抽屉轨道 350/副(按压无拉手), price: 18.00 }\r
  turnover-box-148:    { name: 工业风周转箱 40×30×14.8, price: 15.00 }\r
  turnover-box-230:    { name: 工业风周转箱 40×30×23,  price: 20.00 }\r
  drawer-box-ready:    { name: 成品抽屉盒(木面板),      price: 35.00 }\r
  shelf-support-20:    { name: 层板托 2020(平嵌隐形),  price: 1.50 }\r
  shelf-support-30:    { name: 层板托 3030(平嵌隐形),  price: 2.00 }\r
  flat-corner-plate:   { name: 平面直角连接件(板材固定薄L片), price: 1.00 }\r
  vertical-bracket-20: { name: 垂直角码 2020(外挂面板), price: 1.20 }\r
  corner-cube-20: { name: 三维角件 2020(立方三孔), price: 2.00 }\r
  edla-s1-m6-l30: { name: 端攻螺栓 M6×30 圆柱头, price: 0.45 }\r
  three-way-cube-30:   { name: 三通端面连接件本体 30系列, price: 4.50 }\r
  internal-slot-20:    { name: 内置角槽本体 2020,      price: 1.00 }\r
  end-cap-20:          { name: 端面盖板 2020,          price: 0.80 }\r
  end-cap-30:          { name: 端面盖板 3030,          price: 1.00 }\r
  screw-m4-8-pan:      { name: 内六角半圆头螺丝 M4×8, price: 0.08 }\r
  screw-m4-10-pan:     { name: 内六角半圆头螺丝 M4×10, price: 0.08 }\r
  selftap-m4-10:       { name: 自攻螺丝 M4×10,        price: 0.05 }\r
  selftap-m4-15:       { name: 自攻钉 M4×15,          price: 0.05 }\r
  washer-4-10:         { name: 垫片 内4外10,           price: 0.03 }\r
  t-nut-m4:            { name: T型螺母 M4,             price: 0.12 }\r
`,z1=`# 材料库 + 力学数据源分级（v0.2 行家评审第三部分，verified）\r
materials:\r
  al-6063-t5:\r
    elasticModulus: 6.9e4   # MPa\r
    density: 2700           # kg/m³\r
    poisson: 0.33\r
    confidence: verified\r
\r
dataSourceTiers:            # meta.source 分级标准（行家给出）\r
  tier1-5star: [厂商CAD, 厂商Catalog]              # FEA验证，可信度最高，可入库\r
  tier2-4star: [机械设计手册, Roark's, Shigley's]   # 只用于公式，不用于型材参数\r
  tier3-3star: [网络转载, 淘宝, 论坛]               # 禁止入库\r
\r
brandOverrides: {}          # 待填：Bosch Rexroth / item / MISUMI / 80/20 官方型录（A/Ix/Iy/Wx/Wy/rx/ry）\r
`,B1=`# 板材库 v0.2：厚度/面密度/单价；固定方式按板厚分档（随构/21 安装工艺谱系）\r
# 档位：≤6mm→corner-flat(面板角槽/平面直角件)；10~12mm→shelf-support(层板托平嵌隐形)；≥15mm→t-nut-screw(螺栓四角)；脆性板→gasket-clamp\r
meta:\r
  id: panels\r
  source: market-estimate + 随构/21 安装工艺实拍谱系\r
  confidence: inferred+verified-mounts\r
  review: pending\r
  version: 0.2.0\r
panels:\r
  wood:\r
    name: 多层实木板\r
    thickness: 18\r
    kgPerM2: 11\r
    pricePerM2: 90\r
    mount: t-nut-screw\r
    holeDiameter: 7        # M6 螺栓过孔\r
    mountNote: T型螺母+螺钉四角固定，长孔浮动留胀缩(mat-wood)\r
  wood-12:\r
    name: 多层实木板 12mm(平嵌层板)\r
    thickness: 12\r
    kgPerM2: 7.5\r
    pricePerM2: 70\r
    mount: shelf-support\r
    holeDiameter: 0        # 层板托免打孔（自攻仅入托件）\r
    mountNote: 层板托平嵌隐形固定，受力面大可后装（安装工艺谱系 12mm 档）\r
  glass:\r
    name: 钢化玻璃\r
    thickness: 8\r
    kgPerM2: 20\r
    pricePerM2: 120\r
    mount: gasket-clamp    # 玻璃不打孔：胶垫承托+压条\r
    holeDiameter: 0\r
    mountNote: 钢化玻璃+EPDM胶垫四角承托+压条(mat-glass)\r
  acrylic:\r
    name: 亚克力板\r
    thickness: 5\r
    kgPerM2: 6\r
    pricePerM2: 150\r
    mount: gasket-clamp\r
    holeDiameter: 0\r
    mountNote: 胶垫承托+压条，留热胀间隙(mat-acrylic)\r
  pegboard:\r
    name: 洞洞板(自打孔海洋板)\r
    thickness: 5\r
    kgPerM2: 5\r
    pricePerM2: 60\r
    mount: corner-flat\r
    holeDiameter: 5        # 宜家孔制式 Φ5\r
    mountNote: 平面直角件/垂直角码外挂固定（╤6mm 薄板档）；孔距50边距10宜家制式\r
  wire-mesh:\r
    name: 围网(钢丝网片)\r
    thickness: 2\r
    kgPerM2: 2\r
    pricePerM2: 40\r
    mount: t-nut-screw\r
    holeDiameter: 7\r
    mountNote: 网片U型包边后四角螺栓固定，适用防护/透风围护（非结构剪力板）\r
`,H1=`# 装配可行性规则（v0.6 新增："装得上拆不下"四大坑，verified）\r
rules:\r
  - { id: asm-001, check: tool_access,       desc: 工具空间校验——装时手能进、拆时扳手进不去 }\r
  - { id: asm-002, check: assembly_sequence, desc: 装配顺序校验——先内梁后外框→最后一颗螺丝装不上 }\r
  - { id: asm-003, check: end_access,        desc: 内置连接件需端面插入口——两端封死即失败, when: { connector: internal } }\r
  - { id: asm-004, check: modular_design,    desc: 大型框架须拆分设计（运输/维修）, when: { maxDim: ">2000" } }\r
`,V1=`# CAM 加工工艺规则包 v0.2（2026-08-05 嘉立创工艺页 xc.jlcfa.com/process 全量采集，source: jlcfa-process-page, confidence: public）\r
# 定位：连接件 machining 声明 → 工序链与工艺参数的映射；Process Sheet 数据源\r
\r
material:\r
  alloy: 6063-T5\r
  wallThicknessTolerance: GB/T 5237.1-2017 高精级\r
  weightNote: 标注米重为覆膜重量，发货撕膜重包装后 ±5% 差异\r
\r
# 下料公差（工艺页实标，替代 v0.1 的单一±0.3）\r
cutTolerance:\r
  "L<=1000": ±0.3\r
  "L>1000": ±0.5\r
\r
# 套裁参数（原料标准长 + 锯口损耗；kerf 为行业量级估值 inferred）\r
nesting:\r
  stockLengthMm: 6000\r
  kerfMm: 5\r
\r
# ---- v0.3 壁厚/外形/孔位公差全表（2026-08-05 工艺页锚点区块采集）----\r
# 壁厚语义（工艺页图示）：A=翅壁壁厚(商城标注值) B=封闭腔间壁 C=两封闭腔间隔断壁 H=非壁厚尺寸 E=孔位基准尺寸\r
wallThicknessActual:            # 具体型号实标（A壁厚/B壁厚/H外形）\r
  "2020":  { A: 1.4±0.15, B: null,      H: 20.0±0.30 }\r
  "3030A": { A: 1.5±0.15, B: 1.3±0.20,  H: 30.0±0.50 }\r
  "4040B": { A: 2.4±0.15, B: 2.0±0.25,  H: 40.0±0.50 }\r
  # 标准依据：GB/T 5237.1-2017 高精级 + GB/T 14846-2014（I类软合金 6063）\r
\r
wallThicknessTolerance:         # 按公称壁厚区间 × A/B/C 壁类（外接圆≤100mm）；两表推测为高精级/普通级，页面未明示待核\r
  table1:                       # 第一表（推测高精级）\r
    "<=1.50":      { A: ±0.15, B: ±0.20, C: ±0.25 }\r
    "1.50-3.00":   { A: ±0.15, B: ±0.25, C: ±0.30 }\r
    "3.00-6.00":   { A: ±0.20, B: ±0.40, C: ±0.50 }\r
    "6.00-10.00":  { A: ±0.25, B: ±0.60, C: ±0.75 }\r
    "10.00-15.00": { A: ±0.30, B: ±0.80, C: ±1.00 }\r
  table2:                       # 第二表（推测普通级）\r
    "<=1.50":      { A: ±0.20, B: ±0.30, C: ±0.35 }\r
    "1.50-3.00":   { A: ±0.20, B: ±0.40, C: ±0.50 }\r
    "3.00-6.00":   { A: ±0.30, B: ±0.60, C: ±0.75 }\r
    "6.00-10.00":  { A: ±0.35, B: ±0.80, C: ±1.00 }\r
    "10.00-15.00": { A: ±0.40, B: ±1.00, C: ±1.20 }\r
\r
outlineTolerance:               # 外形尺寸公差（非壁厚尺寸H，按外接圆直径分档）\r
  circumscribed<=100:\r
    "H<=10": ±0.25\r
    "10-25": ±0.30\r
    "25-50": ±0.50\r
    "50-100": ±0.70\r
  circumscribed100-200:\r
    "H<=10": ±0.30\r
    "10-25": ±0.40\r
    "25-50": ±0.60\r
    "50-100": ±0.90\r
    "100-150": ±1.10\r
    "150-200": ±1.30\r
\r
holePositionTolerance:          # 孔位尺寸公差（H区间 × E区间矩阵，外接圆≤100mm主档）\r
  circumscribed<=100:\r
    "H<=10":   { "E<=20": ±0.25, "20-30": ±0.40, "30-40": ±0.50, "40-60": ±0.65, "60-80": ±0.75, "80-100": ±0.85 }\r
    "H10-25":  { "E<=20": ±0.30, "20-30": ±0.45, "30-40": ±0.55, "40-60": ±0.70, "60-80": ±0.80, "80-100": ±0.90 }\r
    "H25-50":  { "E<=20": ±0.50, "20-30": ±0.65, "30-40": ±0.75, "40-60": ±0.90, "60-80": ±1.00, "80-100": ±1.10 }\r
    "H50-100": { "E<=20": ±0.70, "20-30": ±0.85, "30-40": ±0.95, "40-60": ±1.10, "60-80": ±1.20, "80-100": ±1.30 }\r
  # 外接圆>100~200mm 档整体加严约+0.05~0.2/档并扩展到E≤180，出图需要时再展开\r
\r
\r
# 加工公差（工艺页实标）\r
machiningTolerance:\r
  holeDiameter: H7级\r
  holePosition: ±0.2      # 孔位位置度 mm\r
  holeCenterDistance: ±0.2\r
  depth: ±0.2\r
  tapPosition: ±0.2\r
  tapPrecision: 6H级公制内螺纹，通止规全检\r
  tapPerpendicularity: ≤0.1°\r
  deburr: 孔口双面去毛刺，沉头面无划伤（嘉立创默认工艺）\r
  tapFinish: 铝用切削液，孔口倒角C0.5，螺纹底部无积屑\r
\r
# 端面攻牙全表（型号 → 中心孔/螺纹/标准深度）\r
tapTable:\r
  gb-15:        { coreHole: 2.5,  thread: M3,  depth: 8 }\r
  gb-15-b:      { coreHole: 3.3,  thread: M4,  depth: 10 }\r
  eu-2020D:     { coreHole: 4.2,  thread: M5,  depth: 12 }\r
  eu-20-gb-30:  { coreHole: 5.0,  thread: M6,  depth: 15 }\r
  eu-30-40s8-gb40: { coreHole: 6.8~7, thread: M8, depth: 20 }\r
  gb-4040-txcq: { coreHole: 8.8,  thread: M10, depth: 24 }\r
  eu-40s10-45:  { coreHole: 10~10.3, thread: M12, depth: 28 }\r
  eu-50:        { coreHole: 12,   thread: M14, depth: 36 }\r
\r
# 沉头孔全表（系列 → Z规格/d/D/H）\r
counterboreTable:\r
  eu-1515:      { z: 4,  d: 4.5, D: 8,    H: 5 }\r
  eu-2020D:     { z: 5,  d: 5.5, D: 9.5,  H: 5.5 }\r
  eu-20-gb30:   { z: 6,  d: 6.5, D: 11,   H: 6.5 }\r
  eu-30-40s8:   { z: 8,  d: 9,   D: 14,   H: 8.5 }\r
  eu-40s10-45-50: { z: 8, d: 9,  D: 14,   H: 8.5, note: 需配合螺纹套 }\r
  heavy:        { z: 12, d: 13,  D: 20,   H: 12.5 }\r
\r
# 扳手孔表（系列 → 孔径）\r
wrenchHoleTable:\r
  eu-20: 6.5\r
  eu-30: 8.5\r
  gb-30: 6.5\r
  eu-40: 8.5\r
  gb-40: 8.5\r
  eu-45: 12.5\r
\r
# 锚式通孔表（补 40槽10/45 系列）\r
anchorHoleTable:\r
  eu-30-40s8:  { G: 19-T+2, H: 11.5, parts: [TPEF-308-0, TPEG-308-90] }\r
  eu-40s10-45: { G: 27-T+2, H: 17,   parts: [TPHC-4510-0, TPHD-4510-90] }\r
  # T = 型材槽口壁厚\r
\r
# 口哨连接件盲孔表（新连接件类型数据，09文档缺口补齐）\r
whistleBlindHoleTable:\r
  eu-20: { G: 13, H: 12.5, D: 9,    connector: TPDF-206-D4.5-ZP, bom: [EDLA-S2-M4-L4, TPAA-N-6-M4] }\r
  eu-30: { G: 16, H: 15,   D: 12.5, connector: TPEH-308-D6.5-ZP, bom: [EDLA-S1-M6-L20, TPAH-N-B-M6] }\r
  eu-40: { G: 19, H: 19,   D: 18,   connector: TPFN-408-D6.5-ZP-OB, bom: [EDLA-S1-M6-L25, TPAS-N-B-M6] }\r
  eu-45: { G: 19, H: 19,   D: 18,   connector: TPGR-4010-D9-ZP, bom: [EDLA-S1-M8-L25, TPBB-N-10-M8] }\r
\r
# 斜切（Phase 0 范围外，数据先入库）\r
miterCut:\r
  standard: 45°\r
  custom: 30°~150°（更高精度走CNC）\r
  tolerance: { angle: ±0.2°, jointGap: ±0.3, length: ±0.3 }\r
\r
# 推荐螺钉表（连接件 BOM 校验源）\r
screwTable:\r
  eu-3030-z8: { cylinder: EDLA-S1-M8-L40, panHead: EDLG-S1-M8-L20, standard: [DIN 912-1983, ISO7380-1-2011] }\r
  eu-4040-z8: { cylinder: EDLA-S1-M8-L45, panHead: EDLG-S1-M8-L20 }\r
  eu-2020-z6: { cylinder: EDLA-S1-M6-L25, panHead: EDLG-S1-M6-L16 }\r
\r
# 加工朝向（出图必标字段：打孔朝前/朝后；斜切朝上/下/前/后——Process Sheet 预留）\r
machiningOrientation: [朝上, 朝下, 朝前, 朝后]\r
\r
# 工艺规则：加工特征 → 工序 + 完整参数\r
rules:\r
  - id: cam-001\r
    feature: end-tap\r
    process: 切割 → 去毛刺 → 端面攻丝\r
    params: { thread: M8×1.25, depth: 20, chamfer: C0.5, note: 参数按截面系列查 tapTable }\r
    ends: per-joint\r
  - id: cam-002\r
    feature: through-hole\r
    process: 切割 → 钻孔 → 去毛刺\r
    params: { diameter: 11.5, offsetFromEnd: "G=19-T+2", face: 槽面 }\r
  - id: cam-003\r
    feature: deburr\r
    process: 去毛刺\r
    appliesTo: all\r
    note: 嘉立创孔口双面去毛刺为默认；整料锐边倒钝仍需在图纸声明\r
  - id: cam-004\r
    feature: chamfer\r
    process: 倒角\r
    params: { default: 锐边倒钝, optional: R0.5 }\r
  - id: cam-005\r
    feature: counterbore\r
    process: 切割 → 钻孔 → 沉头 → 去毛刺\r
    params: { d: 9, D: 14, depth: 8.5, note: 按截面系列查 counterboreTable }\r
  - id: cam-006\r
    feature: wrench-hole\r
    process: 切割 → 钻孔 → 去毛刺\r
    params: { diameter: 8.5, note: 按系列查 wrenchHoleTable }\r
  - id: cam-007\r
    feature: blind-hole\r
    process: 切割 → 钻盲孔 → 去毛刺\r
    params: { note: 口哨连接件用，按系列查 whistleBlindHoleTable，深度公差±0.2 }\r
\r
# 工序卡输出格式（Process Sheet，四类制造文件之③）\r
processSheetColumns: [件号, 截面, 长度, 公差, 数量, 工序链, 加工参数, 加工朝向, 去毛刺, 倒角]\r
`,G1=`# 连接决策 v0.3（行家评审第二部分修正 + 组合连接/主框架惯例）\r
dimensions:\r
  mobility: [fixed, caster]    # 脚轮结构载荷特性远劣于固定（水平冲击+扭转+疲劳）\r
\r
# Schema级修正：接点支持多连接件组合，各带角色（打破"一接点一连接件"假设）\r
jointModel:\r
  connectorsPerJoint: multiple\r
  connectorRoles: [stiffness, positioning]\r
  industryPattern: 角码(刚度) + 内置(定位) 组合使用（工业设备常见做法）\r
\r
rules:\r
  - { id: con-001, when: { joint: corner-90, load: light, hiddenRequired: false }, use: corner-bracket-30, confidence: verified }\r
  - { id: con-002, when: { joint: corner-90, hiddenRequired: true, load: light, loadRole: secondary }, use: internal-30,\r
      rationale: 仅限外观定位与轻载辅助，禁止主承重（行家）, confidence: verified }\r
  - { id: con-003, when: { joint: corner-90, load: heavy }, use: anchor-30, confidence: verified }\r
  - { id: con-004, when: { joint: end-to-face, alignedCoreHole: true }, use: screw-joint-30,\r
      rationale: 端面攻丝为四类中抗弯最强（轴向预紧）, confidence: verified }\r
  - { id: con-005, version: 2, when: { mobility: caster },\r
      impactFactor: 2.5,       # 越门槛瞬间冲击2~3倍静载，取中值入设计载荷\r
      upgradeOptions: [connectionLevel+1, profileSeries+1, doubleCornerBrackets],\r
      requireDiagonalBrace: true, confidence: verified }\r
  - { id: con-006, type: combo, pattern: { stiffness: corner-bracket-30, positioning: internal-30 },\r
      rationale: 内置负责定位美观、角码负责刚度——新人误以为内置高级，实际承载不行（行家）, confidence: verified }\r
  - { id: con-007, when: { frameRole: mainFrame }, prefer: screw-joint-30,\r
      rationale: 主框架几乎全用端面攻丝——刚度最高/不易松/受力最好（行家）, confidence: verified }\r
  - { id: con-008, when: { joint: beam-bending-corner, scene: [workbench, cnc, laser, aquarium] },\r
      require: corner-bracket-each-corner, rationale: 横梁受弯四角必加角码（行家）, confidence: verified }\r
\r
designPrinciples:\r
  - 尽量形成闭合框架（行家）\r
`,W1=`# 材料接口规则 v0.2（行家实答替换预设，verified）\r
rules:\r
  - id: mat-wood\r
    material: wood-board\r
    risk: 吸湿热胀冷缩尺寸变化明显\r
    mount: [长孔, 压条, 浮动安装]      # 禁止完全锁死\r
    action: allow_expansion_gap\r
  - id: mat-glass\r
    material: glass\r
    risk: 抗压强/抗拉弱/边缘极脆——风险最大的板材\r
    forbidden: 玻璃直接压铝槽\r
    require: [EPDM胶条, 橡胶垫, 尼龙垫片]\r
    safetyNote: 必须钢化玻璃，边缘倒角\r
  - id: mat-acrylic\r
    material: acrylic\r
    thermalExpansion: 70e-6   # /K，大于铝\r
    example: 1m跨度温差40℃伸长≈2.8mm，锁死→开裂/鼓包\r
    rule: "length > 500mm → require_clearance"\r
  - id: mat-led\r
    material: led-strip\r
    mount: slot-inlay          # 槽内嵌入(槽宽8mm适配10mm内灯条需检查)\r
    maxWidth: 8\r
`,j1=`# 加工计价 v0.1（每处/每刀 未税CNY；嘉立创工艺页按孔计价的量级估价，inferred 待实价核对）\r
meta:\r
  id: pricing\r
  source: jlcfa-process-page-estimate\r
  confidence: inferred\r
  review: pending\r
  version: 0.1.0\r
machiningPrice:\r
  through-hole: 1.0    # 通孔/孔\r
  end-tap: 1.5         # 端面攻牙/孔\r
  counterbore: 2.0     # 沉头孔/孔\r
  wrench-hole: 1.0     # 扳手操作孔/孔\r
  miter-cut: 5.0       # 非标斜切/刀（斜撑每段两端各一刀）\r
  panel-hole: 1.0      # 板材钻孔/孔\r
`,$1=`# 选型规则 v0.2（行家评审第一部分通过，阈值 verified）\r
loadModel:\r
  loadType: [distributed, concentrated]\r
  # 行家：集中载荷挠度显著大于均布；规则默认按均布评估，集中载荷时跨度降一档\r
rules:\r
  - { id: sel-001,  when: { span: "<=600",  loadKg: "<=20", loadType: distributed }, use: eu-2020,\r
      rationale: 2020定位轻型框架/护罩/电子设备，不承担较大结构载荷（行家原话）, confidence: verified }\r
  - { id: sel-001b, when: { span: "<=800",  loadKg: "<=10", loadType: distributed }, use: eu-2020, confidence: verified }\r
  - { id: sel-002,  when: { span: "<=1000", loadKg: "<=50", loadType: distributed }, use: eu-3030,\r
      rationale: 行家闭眼边界1000@50均布, confidence: verified }\r
  - { id: sel-002b, when: { span: "<=800",  loadKg: "<=80", loadType: distributed }, use: eu-3030, confidence: verified }\r
  - { id: sel-003,  when: { anyOf: { span: ">1200", loadKg: ">80", scene: vibration, need: precision } }, use: eu-4040-s8,\r
      rationale: 4040核心优势是刚度更大挠度更小（非仅强度）, confidence: verified }\r
  - { id: sel-004,  when: { scene: [aquarium, child, overhead] }, action: upgradeOneSeries, rationale: 高风险场景升一级 }\r
  - { id: sel-005,  when: { loadType: concentrated }, action: downgradeSpanOneLevel,\r
      rationale: 集中载荷挠度约为均布的显著倍数, confidence: verified }\r
  - { id: sel-006,  type: post-selection,\r
      rule: 短立柱可比横梁小一级；高立柱不可简单降级（校核Euler屈曲而非弯曲）,\r
      heightThreshold: 800,   # ⚠ inferred 高度分界待二次确认\r
      confidence: partially-verified }\r
conflicts:\r
  priority: [safety, budget, aesthetics]   # 安全永远压倒预算\r
`,X1=`# 公差链规则（v0.6 新增，verified）\r
stack:\r
  single: ±0.3          # 单根切割公差\r
  fourFrame: 0.6~1.2    # 四边框累积→对角线误差/门板装不上/玻璃塞不进\r
  modules: ±0.3×n       # 模块拼接线性累积（3×1000mm→±0.9）\r
sensitiveScenes: [玻璃嵌入(间隙仅1~2mm), 滑轨平行度, 门框卡滞]\r
cuttingPrecision:        # 按应用推荐切割精度（行家表）\r
  普通机架: ±0.5\r
  工作台: ±0.3\r
  门框/玻璃框: ±0.2\r
  精密设备: ±0.1\r
rules:\r
  - { id: tol-001, check: "accumulatedError > clearance → warning + 建议提升切割精度档位" }\r
`,q1=`# 校验规则 v0.6（挠度场景化 + Euler屈曲完整规范 + 斜撑五触发 + 禁忌组合）\r
deflectionLimits:            # val-002 v2：按场景选限值（行家行业分档，verified）\r
  diy-furniture: L/275       # 行业 L/250~L/300 取中\r
  industrial-rack: L/300     # 默认值\r
  workbench: L/450           # L/400~L/500\r
  automation: L/500\r
  precision: L/800\r
  optical: L/1000            # 行业 L/1000~L/2000 保守端\r
\r
rules:\r
  - { id: val-001, type: max-span, expr: "span <= verified阈值(见selection)", onFail: reject-and-ask, confidence: verified }\r
  - { id: val-002, version: 2, type: deflection,\r
      expr: "5*q*L^4/(384*E*I) <= deflectionLimits[scene]",\r
      defaultScene: industrial-rack, onFail: suggest, confidence: verified }\r
  - { id: val-003, type: high-risk-scene, when: { scene: [aquarium, child, overhead] },\r
      action: { addSafetyFactor: 2.0, deflectionCheckMandatory: true, showWarning: true },\r
      rationale: 行家：人身安全结构安全系数≥2.0且必须控制挠度（不能只满足强度）, confidence: verified }\r
  - id: val-004\r
    version: 2\r
    type: post-buckling\r
    # 认知前提：立柱失效通常不是压碎，而是欧拉屈曲失稳\r
    formula: "Pcr = pi^2 * E * I / (K*L)^2"\r
    allowable: "P_allow = Pcr / 3"          # 安全系数=3（行家）\r
    trigger: { postHeight: ">=800" }         # 800mm为软件默认触发值（工程经验分界非物理分界）\r
    K:\r
      default: 1.0                           # 型材框架实际≈0.8~1.0；禁止按两端固定0.5算（过于乐观）\r
      table: { 两端铰支: 1.0, 悬臂柱: 2.0, 两端固定: 0.5, 一端固定一端铰支: 0.7 }\r
    slenderness:                             # λ = K·L / r，r = √(I/A)\r
      "<30": 短柱按材料压缩强度\r
      "30..80": 过渡区综合判断\r
      ">80": Euler适用\r
      ">120": 典型细长柱\r
    confidence: verified\r
  - { id: val-005, type: bracing, version: 2,\r
      when: { anyOf: { height: ">1000", aspectRatio: ">3", mobility: caster, vibration: any, highSpeedMotion: any } },\r
      action: requireDiagonalBrace,\r
      rationale: 晃不是型材不够强，是整体抗剪不足（行家原话，入AI解释话术库）, confidence: verified }\r
  - { id: val-006, type: forbidden-combo, checks:\r
        [内置连接件不得单独承担主承重, 长横梁不得只靠单个角码（至少双侧固定，尽量闭合框架）],\r
      confidence: verified }\r
  - { id: val-007, type: dynamic-load, check: 动态载荷下禁止仅靠型材槽内摩擦连接, confidence: verified }\r
  - { id: val-008, type: connection-strength, rule: "beam >= 4040 → connection_strength >= medium；主承重节点禁单内置",\r
      confidence: verified }\r
  - { id: val-postband, type: post-height-band, expr: "height > 2000 → warn 建议中部横撑",\r
      source: postHeightBands.general, addedBy: M5-req-009, confidence: verified }\r
\r
postHeightBands:                             # 立柱高度分档（行家，verified）\r
  general: { "<600": 不考虑屈曲, "600..800": 看载荷, "800..1200": 建议校核, ">1200": 必须校核, ">2000": 需加横撑 }\r
  eu-2020: { "<600": 安全, "600..800": 仅轻载, ">800": 不推荐单独承重 }\r
  eu-3030: { "<1000": 安全, "1000..1500": 需计算, ">1500": 建议升级 }\r
  eu-4040-s8: { "<1500": 通常安全, "1500..2500": 校核, ">2500": 加横撑 }\r
\r
# "一看就晃"四模式（AI预警话术素材）\r
wobblePatterns:\r
  - 高瘦结构 H/W>3（如400宽×1800高=4.5）\r
  - 无抗侧向结构（无斜撑/背板/三角）\r
  - 四角仅普通角码（静载可以，有人扶一下整框摆动）\r
  - 脚轮+高架（wheel && height>800 → 必须加撑）\r
\r
# 行家六规则引擎总纲（引擎最小校验集，验收基准）\r
engineChecklist:\r
  1: { name: stiffness_check,    condition: span_limit_exceeded,           action: upgrade_profile }\r
  2: { name: connection_check,   condition: load_high && connector_low,    action: warning }\r
  3: { name: stability_check,    condition: "H/W > 3",                     action: require_brace }\r
  4: { name: material_interface, condition: glass_or_acrylic,              action: add_soft_layer }\r
  5: { name: assembly_check,     condition: no_tool_access,                action: redesign }\r
  6: { name: tolerance_stack,    condition: accumulated_error > clearance, action: warning }\r
`,K1=`meta:\r
  id: eu-2020\r
  source: jlcfa-library-screenshot\r
  confidence: public\r
  review: pending\r
  version: 0.6.0\r
  updated: 2026-08-05\r
section:\r
  id: eu-2020\r
  name: 2020铝型材 欧标\r
  standard: eu\r
  series: 20\r
  size: [20, 20]\r
  slot: { type: T, width: 6 }\r
  wallThickness: 1.4                # ✓ 工艺页实标 2020 A翅壁 1.4±0.15 吻合\r
  slotWallThickness: 1.5             # 槽口壁厚 T（6mm 槽宽对应≈1.5）\r
  weightPerMeter: 0.48\r
  coreHole: { diameter: 5.0, tapping: M6, tapDepth: 15 }   # 源:工艺页(欧标20系列)\r
  faces:\r
    - { index: 0, normal: [1, 0, 0], slots: [{ offset: 0, width: 6 }] }\r
    - { index: 1, normal: [-1, 0, 0], slots: [{ offset: 0, width: 6 }] }\r
    - { index: 2, normal: [0, 1, 0], slots: [{ offset: 0, width: 6 }] }\r
    - { index: 3, normal: [0, -1, 0], slots: [{ offset: 0, width: 6 }] }\r
  outlineRef: dxf/eu-2020.dxf   # 待描摹\r
  # 显示几何参数（供参数化挤出渲染，近似值，仅用于展示不用于制造）\r
  geometry: { lipDepth: 1.5, cavityWidth: 11, cavityDepth: 4 }\r
  price: { perMeter: 13.30, currency: CNY, tax: false }\r
  mechanics:\r
    # v0.2 行家评审：默认值+range，厂家间差20%~50%，正式设计用 brandOverrides\r
    momentOfInertia: { ix: 0.7e4, iy: 0.7e4, range: [0.6e4, 0.8e4] }   # mm^4\r
    elasticModulus: 6.9e4    # MPa 6063-T5\r
`,Y1=`meta:\r
  id: eu-2040\r
  source: public-catalog-inferred\r
  confidence: inferred\r
  review: pending\r
  version: 0.1.0\r
  updated: 2026-08-19\r
section:\r
  id: eu-2040\r
  name: 2040铝型材 欧标（矩形梁）\r
  standard: eu\r
  series: 20\r
  size: [20, 40]                     # 宽20 × 高40：立放作横梁，强轴抗弯≈2020的8倍\r
  slot: { type: T, width: 6 }\r
  wallThickness: 1.4\r
  slotWallThickness: 1.5\r
  weightPerMeter: 0.94\r
  coreHole: { diameter: 5.0, tapping: M6, tapDepth: 15 }\r
  # 双芯孔：沿高度方向 ±10（截面局部坐标 [x, y]）\r
  coreHolePositions: [[0, 10], [0, -10]]\r
  faces:\r
    # x± 为 40 宽面（各2槽，offset ±10）；y± 为 20 窄面（各1槽）\r
    - { index: 0, normal: [1, 0, 0], slots: [{ offset: 10, width: 6 }, { offset: -10, width: 6 }] }\r
    - { index: 1, normal: [-1, 0, 0], slots: [{ offset: 10, width: 6 }, { offset: -10, width: 6 }] }\r
    - { index: 2, normal: [0, 1, 0], slots: [{ offset: 0, width: 6 }] }\r
    - { index: 3, normal: [0, -1, 0], slots: [{ offset: 0, width: 6 }] }\r
  outlineRef: dxf/eu-2040.dxf   # 待描摹\r
  geometry: { lipDepth: 1.5, cavityWidth: 11, cavityDepth: 4 }\r
  price: { perMeter: 25.00, currency: CNY, tax: false }\r
  mechanics:\r
    # inferred：公开目录典型值；ix=强轴（立放抗竖直弯），iy=弱轴\r
    momentOfInertia: { ix: 6.0e4, iy: 1.4e4, range: [5.5e4, 6.6e4] }\r
    elasticModulus: 6.9e4    # MPa 6063-T5\r
`,Z1=`meta:\r
  id: eu-3030\r
  source: jlcfa-library-screenshot\r
  confidence: public\r
  review: pending\r
  version: 0.6.0\r
  updated: 2026-08-05\r
section:\r
  id: eu-3030\r
  name: 3030铝型材 欧标\r
  standard: eu\r
  series: 30\r
  size: [30, 30]\r
  slot: { type: T, width: 8 }\r
  # 壁厚拆分：A翅壁=1.5（结构计算），槽口壁厚T=2.0（锚式公式 G=19-T+2）\r
  wallThickness: 1.5                # 工艺页 3030A 实标 A翅壁=1.5±0.15\r
  slotWallThickness: 2.0             # 槽口壁厚 T（锚式连接件公式依赖字段）\r
  weightPerMeter: 0.85\r
  coreHole: { diameter: 6.8, tapping: M8, tapDepth: 20 }   # 源:工艺页(欧标30系列 6.8/7→M8/20mm)\r
  faces:\r
    - { index: 0, normal: [1, 0, 0], slots: [{ offset: 0, width: 8 }] }\r
    - { index: 1, normal: [-1, 0, 0], slots: [{ offset: 0, width: 8 }] }\r
    - { index: 2, normal: [0, 1, 0], slots: [{ offset: 0, width: 8 }] }\r
    - { index: 3, normal: [0, -1, 0], slots: [{ offset: 0, width: 8 }] }\r
  outlineRef: dxf/eu-3030.dxf\r
  geometry: { lipDepth: 2.0, cavityWidth: 16.5, cavityDepth: 6 }\r
  # 24.47 由清单页实价反推(123mm→3.01, 实际成交价证据强于库页截图 23.62)；两来源差异待下次采集核实\r
  price: { perMeter: 24.47, currency: CNY, tax: false }\r
  mechanics:\r
    momentOfInertia: { ix: 3.3e4, iy: 3.3e4, range: [3.0e4, 3.8e4] }\r
    elasticModulus: 6.9e4\r
`,J1=`meta:\r
  id: eu-4040-s8\r
  source: jlcfa-process-page\r
  confidence: public\r
  review: pending\r
  version: 0.6.0\r
  updated: 2026-08-05\r
section:\r
  id: eu-4040-s8\r
  name: 4040铝型材 欧标 槽8\r
  standard: eu\r
  series: 40\r
  size: [40, 40]\r
  slot: { type: T, width: 8 }\r
  wallThickness: 2.4           # 参考值：工艺页 4040B A翅壁 2.4±0.15（型号是否对应本槽8截面待核，confidence: inferred）\r
  weightPerMeter: 1.5          # 市场量级估值(confidence: inferred)，待实采\r
  coreHole: { diameter: 6.8, tapping: M8, tapDepth: 20 }   # 源:工艺页(欧标40槽8同30系列)\r
  faces:\r
    - { index: 0, normal: [1, 0, 0], slots: [{ offset: 0, width: 8 }] }\r
    - { index: 1, normal: [-1, 0, 0], slots: [{ offset: 0, width: 8 }] }\r
    - { index: 2, normal: [0, 1, 0], slots: [{ offset: 0, width: 8 }] }\r
    - { index: 3, normal: [0, -1, 0], slots: [{ offset: 0, width: 8 }] }\r
  outlineRef: dxf/eu-4040-s8.dxf\r
  geometry: { lipDepth: 2.5, cavityWidth: 20, cavityDepth: 8 }\r
  price: { perMeter: 42 }      # 市场量级估价(confidence: inferred)，待嘉立创实价核对\r
  mechanics:\r
    momentOfInertia: { ix: 8.8e4, iy: 8.8e4, range: [8.0e4, 10.0e4] }   # 重型系列可超10 cm⁴\r
    elasticModulus: 6.9e4\r
`,Q1=`# Golden 用例（与规则包一一对应，M3 规则引擎的验收基准）\r
tests:\r
  - { id: t-sel-002-a, rule: sel-002, input: { span: 900, loadKg: 50 }, expect: { use: eu-3030 } }\r
  - { id: t-sel-004-a, rule: sel-004, input: { span: 500, loadKg: 20, scene: aquarium }, expect: { use: eu-3030 } }  # 2020升级到3030\r
  - { id: t-con-001-a, rule: con-001, input: { joint: corner-90, load: light }, expect: { use: corner-bracket-30, machiningCount: 0 } }\r
  - { id: t-con-002-a, rule: con-002, input: { joint: corner-90, load: light, hiddenRequired: true }, expect: { use: anchor-30 } }  # M5 req-010回归：隐藏式不得推内置件单独主承重\r
  - { id: t-con-003-a, rule: con-003, input: { joint: corner-90, load: heavy }, expect: { use: anchor-30, machining: [{ type: through-hole, diameter: 11.5 }] } }\r
  - { id: t-cut-001, rule: length-derivation, input: { overallWidth: 700, posts: eu-3030, connector: corner-bracket-30 }, expect: { beamLength: 640 } }\r
    # 640mm 从演示柜真实清单反推验证（700 − 2×30），长度推导规则的第一条实证锚点\r
  - { id: t-price-001, rule: pricing, input: { section: eu-3030, length: 123 }, expect: { priceUntaxed: 3.01, tolerance: 0.05 } }  # 与清单页实价核对✓\r
`,eS=`# M5 回归用例：13-需求测试集 原生组 req-001~010（原话一字不改）\r
# expected = 人工标注要点（评分对照用，禁止用于自动断言以免掩盖问题）\r
meta:\r
  id: m5-native\r
  source: obsidian 13-需求测试集 原生组\r
  confidence: verified\r
  review: approved\r
  version: 1.0.0\r
cases:\r
  - id: req-001\r
    raw: "我想做一个DIY悬挑落地灯，评论给出了方案：2020型材 8mm光轴 锁定件 型材角码 灯杆"\r
    expected: 悬挑=超纲降级；不编造尺寸；_riskFlags含悬臂；生成底座立柱部分+说明\r
  - id: req-002\r
    raw: "想做一个3d打印机架子 拓竹P系列 带线材收纳箱 两层"\r
    expected: dimensions null(靠假设)；打印机尺寸进_assumptions；振动→斜撑建议；两层\r
  - id: req-003\r
    raw: "电茶炉架子 下方放水桶 中间带一层置物空间 放茶叶茶具等 上面是平台 可以是镂空雕塑的板材"\r
    expected: 尺寸全缺→追问；水+电风险标记；镂空板=非标接口记录；3层\r
  - id: req-004\r
    raw: "铝型材电脑桌架子 双层加中间立面洞洞板设计 上方置物展览架 中间放27寸超杀pro的显示器带移动可调节支架 桌子长1.5m进深90cm"\r
    expected: 宽1500深900正确抽取；跨度1500触发升4040或中柱；洞洞板side；高度追问\r
  - id: req-005\r
    raw: "铝型材五斗柜子 5个木制抽屉带把手带导轨 整体高度约1.5米颜色原木风"\r
    expected: 高1500；抽屉×5=超纲降级记录；不编造宽深；木材接口\r
  - id: req-006\r
    raw: "铝型材桌面护眼灯 三段式 75 30 5 cob灯"\r
    expected: 无单位数字→dimensions null+假设cm进_assumptions+追问；灯具类降级\r
  - id: req-007\r
    raw: "门后面放一个鞋架和置物架 整体宽度为20cm 鞋架斜着放 原木色"\r
    expected: 深(或宽)200极窄；斜放层板=超纲记录；固定方式追问；细高结构风险\r
  - id: req-008\r
    raw: "铝型材工具柜带滑轮 整体大小约为 1m*40 高度为90 两个抽屉 一个大的柜子侧开门 侧板带挂架功能"\r
    expected: 1000×400×900混合单位正确解析；caster全链路(冲击2.5/脚轮M8/斜撑)；抽屉侧开门降级\r
  - id: req-009\r
    raw: "铝型材中古感的开放式衣柜 预算1000 高2.4m 深度60.宽1.8米 具有分区功能 上方收纳区 中间短衣区和长衣区 下面两个抽屉和鞋柜"\r
    expected: 1800×600×2400；预算敏感high；height>2000风险；分区/抽屉降级记录\r
  - id: req-010\r
    raw: "45立方极简美学铝型材海洋板亚克力抽屉柜 H,D,W:45CM"\r
    expected: 450×450×450紧凑表达解析；海洋板=未覆盖材料诚实记录；亚克力接口\r
`,lp=Symbol.for("yaml.alias"),sh=Symbol.for("yaml.document"),Qr=Symbol.for("yaml.map"),cy=Symbol.for("yaml.pair"),Ji=Symbol.for("yaml.scalar"),Ko=Symbol.for("yaml.seq"),Ai=Symbol.for("yaml.node.type"),Yo=i=>!!i&&typeof i=="object"&&i[Ai]===lp,pu=i=>!!i&&typeof i=="object"&&i[Ai]===sh,ll=i=>!!i&&typeof i=="object"&&i[Ai]===Qr,mn=i=>!!i&&typeof i=="object"&&i[Ai]===cy,rn=i=>!!i&&typeof i=="object"&&i[Ai]===Ji,cl=i=>!!i&&typeof i=="object"&&i[Ai]===Ko;function hn(i){if(i&&typeof i=="object")switch(i[Ai]){case Qr:case Ko:return!0}return!1}function pn(i){if(i&&typeof i=="object")switch(i[Ai]){case lp:case Qr:case Ji:case Ko:return!0}return!1}const uy=i=>(rn(i)||hn(i))&&!!i.anchor,Ms=Symbol("break visit"),tS=Symbol("skip children"),Xa=Symbol("remove node");function Zo(i,e){const t=nS(e);pu(i)?Co(null,i.contents,t,Object.freeze([i]))===Xa&&(i.contents=null):Co(null,i,t,Object.freeze([]))}Zo.BREAK=Ms;Zo.SKIP=tS;Zo.REMOVE=Xa;function Co(i,e,t,n){const s=iS(i,e,t,n);if(pn(s)||mn(s))return rS(i,n,s),Co(i,s,t,n);if(typeof s!="symbol"){if(hn(e)){n=Object.freeze(n.concat(e));for(let a=0;a<e.items.length;++a){const l=Co(a,e.items[a],t,n);if(typeof l=="number")a=l-1;else{if(l===Ms)return Ms;l===Xa&&(e.items.splice(a,1),a-=1)}}}else if(mn(e)){n=Object.freeze(n.concat(e));const a=Co("key",e.key,t,n);if(a===Ms)return Ms;a===Xa&&(e.key=null);const l=Co("value",e.value,t,n);if(l===Ms)return Ms;l===Xa&&(e.value=null)}}return s}function nS(i){return typeof i=="object"&&(i.Collection||i.Node||i.Value)?Object.assign({Alias:i.Node,Map:i.Node,Scalar:i.Node,Seq:i.Node},i.Value&&{Map:i.Value,Scalar:i.Value,Seq:i.Value},i.Collection&&{Map:i.Collection,Seq:i.Collection},i):i}function iS(i,e,t,n){var s,a,l,u,f;if(typeof t=="function")return t(i,e,n);if(ll(e))return(s=t.Map)==null?void 0:s.call(t,i,e,n);if(cl(e))return(a=t.Seq)==null?void 0:a.call(t,i,e,n);if(mn(e))return(l=t.Pair)==null?void 0:l.call(t,i,e,n);if(rn(e))return(u=t.Scalar)==null?void 0:u.call(t,i,e,n);if(Yo(e))return(f=t.Alias)==null?void 0:f.call(t,i,e,n)}function rS(i,e,t){const n=e[e.length-1];if(hn(n))n.items[i]=t;else if(mn(n))i==="key"?n.key=t:n.value=t;else if(pu(n))n.contents=t;else{const s=Yo(n)?"alias":"scalar";throw new Error(`Cannot replace node with ${s} parent`)}}const sS={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},oS=i=>i.replace(/[!,[\]{}]/g,e=>sS[e]);class qn{constructor(e,t){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},qn.defaultYaml,e),this.tags=Object.assign({},qn.defaultTags,t)}clone(){const e=new qn(this.yaml,this.tags);return e.docStart=this.docStart,e}atDocument(){const e=new qn(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:qn.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},qn.defaultTags);break}return e}add(e,t){this.atNextDocument&&(this.yaml={explicit:qn.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},qn.defaultTags),this.atNextDocument=!1);const n=e.trim().split(/[ \t]+/),s=n.shift();switch(s){case"%TAG":{if(n.length!==2&&(t(0,"%TAG directive should contain exactly two parts"),n.length<2))return!1;const[a,l]=n;return this.tags[a]=l,!0}case"%YAML":{if(this.yaml.explicit=!0,n.length!==1)return t(0,"%YAML directive should contain exactly one part"),!1;const[a]=n;if(a==="1.1"||a==="1.2")return this.yaml.version=a,!0;{const l=/^\d+\.\d+$/.test(a);return t(6,`Unsupported YAML version ${a}`,l),!1}}default:return t(0,`Unknown directive ${s}`,!0),!1}}tagName(e,t){if(e==="!")return"!";if(e[0]!=="!")return t(`Not a valid tag: ${e}`),null;if(e[1]==="<"){const l=e.slice(2,-1);return l==="!"||l==="!!"?(t(`Verbatim tags aren't resolved, so ${e} is invalid.`),null):(e[e.length-1]!==">"&&t("Verbatim tags must end with a >"),l)}const[,n,s]=e.match(/^(.*!)([^!]*)$/s);s||t(`The ${e} tag has no suffix`);const a=this.tags[n];if(a)try{return a+decodeURIComponent(s)}catch(l){return t(String(l)),null}return n==="!"?e:(t(`Could not resolve tag: ${e}`),null)}tagString(e){for(const[t,n]of Object.entries(this.tags))if(e.startsWith(n))return t+oS(e.substring(n.length));return e[0]==="!"?e:`!<${e}>`}toString(e){const t=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],n=Object.entries(this.tags);let s;if(e&&n.length>0&&pn(e.contents)){const a={};Zo(e.contents,(l,u)=>{pn(u)&&u.tag&&(a[u.tag]=!0)}),s=Object.keys(a)}else s=[];for(const[a,l]of n)a==="!!"&&l==="tag:yaml.org,2002:"||(!e||s.some(u=>u.startsWith(l)))&&t.push(`%TAG ${a} ${l}`);return t.join(`
`)}}qn.defaultYaml={explicit:!1,version:"1.2"};qn.defaultTags={"!!":"tag:yaml.org,2002:"};function fy(i){if(/[\x00-\x19\s,[\]{}]/.test(i)){const t=`Anchor must not contain whitespace or control characters: ${JSON.stringify(i)}`;throw new Error(t)}return!0}function dy(i){const e=new Set;return Zo(i,{Value(t,n){n.anchor&&e.add(n.anchor)}}),e}function hy(i,e){for(let t=1;;++t){const n=`${i}${t}`;if(!e.has(n))return n}}function aS(i,e){const t=[],n=new Map;let s=null;return{onAnchor:a=>{t.push(a),s??(s=dy(i));const l=hy(e,s);return s.add(l),l},setAnchors:()=>{for(const a of t){const l=n.get(a);if(typeof l=="object"&&l.anchor&&(rn(l.node)||hn(l.node)))l.node.anchor=l.anchor;else{const u=new Error("Failed to resolve repeated object (this should not happen)");throw u.source=a,u}}},sourceObjects:n}}function Ro(i,e,t,n){if(n&&typeof n=="object")if(Array.isArray(n))for(let s=0,a=n.length;s<a;++s){const l=n[s],u=Ro(i,n,String(s),l);u===void 0?delete n[s]:u!==l&&(n[s]=u)}else if(n instanceof Map)for(const s of Array.from(n.keys())){const a=n.get(s),l=Ro(i,n,s,a);l===void 0?n.delete(s):l!==a&&n.set(s,l)}else if(n instanceof Set)for(const s of Array.from(n)){const a=Ro(i,n,s,s);a===void 0?n.delete(s):a!==s&&(n.delete(s),n.add(a))}else for(const[s,a]of Object.entries(n)){const l=Ro(i,n,s,a);l===void 0?delete n[s]:l!==a&&(n[s]=l)}return i.call(e,t,n)}function Ti(i,e,t){if(Array.isArray(i))return i.map((n,s)=>Ti(n,String(s),t));if(i&&typeof i.toJSON=="function"){if(!t||!uy(i))return i.toJSON(e,t);const n={aliasCount:0,count:1,res:void 0};t.anchors.set(i,n),t.onCreate=a=>{n.res=a,delete t.onCreate};const s=i.toJSON(e,t);return t.onCreate&&t.onCreate(s),s}return typeof i=="bigint"&&!(t!=null&&t.keep)?Number(i):i}class cp{constructor(e){Object.defineProperty(this,Ai,{value:e})}clone(){const e=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(e.range=this.range.slice()),e}toJS(e,{mapAsMap:t,maxAliasCount:n,onAnchor:s,reviver:a}={}){if(!pu(e))throw new TypeError("A document argument is required");const l={anchors:new Map,doc:e,keep:!0,mapAsMap:t===!0,mapKeyWarned:!1,maxAliasCount:typeof n=="number"?n:100},u=Ti(this,"",l);if(typeof s=="function")for(const{count:f,res:h}of l.anchors.values())s(h,f);return typeof a=="function"?Ro(a,{"":u},"",u):u}}class up extends cp{constructor(e){super(lp),this.source=e,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(e,t){if((t==null?void 0:t.maxAliasCount)===0)throw new ReferenceError("Alias resolution is disabled");let n;t!=null&&t.aliasResolveCache?n=t.aliasResolveCache:(n=[],Zo(e,{Node:(a,l)=>{(Yo(l)||uy(l))&&n.push(l)}}),t&&(t.aliasResolveCache=n));let s;for(const a of n){if(a===this)break;a.anchor===this.source&&(s=a)}return s}toJSON(e,t){if(!t)return{source:this.source};const{anchors:n,doc:s,maxAliasCount:a}=t,l=this.resolve(s,t);if(!l){const f=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(f)}let u=n.get(l);if(u||(Ti(l,null,t),u=n.get(l)),(u==null?void 0:u.res)===void 0){const f="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(f)}if(a>=0&&(u.count+=1,u.aliasCount===0&&(u.aliasCount=Zc(s,l,n)),u.count*u.aliasCount>a)){const f="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(f)}return u.res}toString(e,t,n){const s=`*${this.source}`;if(e){if(fy(this.source),e.options.verifyAliasOrder&&!e.anchors.has(this.source)){const a=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(a)}if(e.implicitKey)return`${s} `}return s}}function Zc(i,e,t){if(Yo(e)){const n=e.resolve(i),s=t&&n&&t.get(n);return s?s.count*s.aliasCount:0}else if(hn(e)){let n=0;for(const s of e.items){const a=Zc(i,s,t);a>n&&(n=a)}return n}else if(mn(e)){const n=Zc(i,e.key,t),s=Zc(i,e.value,t);return Math.max(n,s)}return 1}const py=i=>!i||typeof i!="function"&&typeof i!="object";class It extends cp{constructor(e){super(Ji),this.value=e}toJSON(e,t){return t!=null&&t.keep?this.value:Ti(this.value,e,t)}toString(){return String(this.value)}}It.BLOCK_FOLDED="BLOCK_FOLDED";It.BLOCK_LITERAL="BLOCK_LITERAL";It.PLAIN="PLAIN";It.QUOTE_DOUBLE="QUOTE_DOUBLE";It.QUOTE_SINGLE="QUOTE_SINGLE";const lS="tag:yaml.org,2002:";function cS(i,e,t){if(e){const n=t.filter(a=>a.tag===e),s=n.find(a=>!a.format)??n[0];if(!s)throw new Error(`Tag ${e} not found`);return s}return t.find(n=>{var s;return((s=n.identify)==null?void 0:s.call(n,i))&&!n.format})}function tl(i,e,t){var m,v,y;if(pu(i)&&(i=i.contents),pn(i))return i;if(mn(i)){const M=(v=(m=t.schema[Qr]).createNode)==null?void 0:v.call(m,t.schema,null,t);return M.items.push(i),M}(i instanceof String||i instanceof Number||i instanceof Boolean||typeof BigInt<"u"&&i instanceof BigInt)&&(i=i.valueOf());const{aliasDuplicateObjects:n,onAnchor:s,onTagObj:a,schema:l,sourceObjects:u}=t;let f;if(n&&i&&typeof i=="object"){if(f=u.get(i),f)return f.anchor??(f.anchor=s(i)),new up(f.anchor);f={anchor:null,node:null},u.set(i,f)}e!=null&&e.startsWith("!!")&&(e=lS+e.slice(2));let h=cS(i,e,l.tags);if(!h){if(i&&typeof i.toJSON=="function"&&(i=i.toJSON()),!i||typeof i!="object"){const M=new It(i);return f&&(f.node=M),M}h=i instanceof Map?l[Qr]:Symbol.iterator in Object(i)?l[Ko]:l[Qr]}a&&(a(h),delete t.onTagObj);const p=h!=null&&h.createNode?h.createNode(t.schema,i,t):typeof((y=h==null?void 0:h.nodeClass)==null?void 0:y.from)=="function"?h.nodeClass.from(t.schema,i,t):new It(i);return e?p.tag=e:h.default||(p.tag=h.tag),f&&(f.node=p),p}function ou(i,e,t){let n=t;for(let s=e.length-1;s>=0;--s){const a=e[s];if(typeof a=="number"&&Number.isInteger(a)&&a>=0){const l=[];l[a]=n,n=l}else n=new Map([[a,n]])}return tl(n,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:i,sourceObjects:new Map})}const Va=i=>i==null||typeof i=="object"&&!!i[Symbol.iterator]().next().done;class my extends cp{constructor(e,t){super(e),Object.defineProperty(this,"schema",{value:t,configurable:!0,enumerable:!1,writable:!0})}clone(e){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return e&&(t.schema=e),t.items=t.items.map(n=>pn(n)||mn(n)?n.clone(e):n),this.range&&(t.range=this.range.slice()),t}addIn(e,t){if(Va(e))this.add(t);else{const[n,...s]=e,a=this.get(n,!0);if(hn(a))a.addIn(s,t);else if(a===void 0&&this.schema)this.set(n,ou(this.schema,s,t));else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${s}`)}}deleteIn(e){const[t,...n]=e;if(n.length===0)return this.delete(t);const s=this.get(t,!0);if(hn(s))return s.deleteIn(n);throw new Error(`Expected YAML collection at ${t}. Remaining path: ${n}`)}getIn(e,t){const[n,...s]=e,a=this.get(n,!0);return s.length===0?!t&&rn(a)?a.value:a:hn(a)?a.getIn(s,t):void 0}hasAllNullValues(e){return this.items.every(t=>{if(!mn(t))return!1;const n=t.value;return n==null||e&&rn(n)&&n.value==null&&!n.commentBefore&&!n.comment&&!n.tag})}hasIn(e){const[t,...n]=e;if(n.length===0)return this.has(t);const s=this.get(t,!0);return hn(s)?s.hasIn(n):!1}setIn(e,t){const[n,...s]=e;if(s.length===0)this.set(n,t);else{const a=this.get(n,!0);if(hn(a))a.setIn(s,t);else if(a===void 0&&this.schema)this.set(n,ou(this.schema,s,t));else throw new Error(`Expected YAML collection at ${n}. Remaining path: ${s}`)}}}const uS=i=>i.replace(/^(?!$)(?: $)?/gm,"#");function yr(i,e){return/^\n+$/.test(i)?i.substring(1):e?i.replace(/^(?! *$)/gm,e):i}const Ts=(i,e,t)=>i.endsWith(`
`)?yr(t,e):t.includes(`
`)?`
`+yr(t,e):(i.endsWith(" ")?"":" ")+t,gy="flow",oh="block",Jc="quoted";function mu(i,e,t="flow",{indentAtStart:n,lineWidth:s=80,minContentWidth:a=20,onFold:l,onOverflow:u}={}){if(!s||s<0)return i;s<a&&(a=0);const f=Math.max(1+a,1+s-e.length);if(i.length<=f)return i;const h=[],p={};let m=s-e.length;typeof n=="number"&&(n>s-Math.max(2,a)?h.push(0):m=s-n);let v,y,M=!1,S=-1,_=-1,x=-1;t===oh&&(S=xg(i,S,e.length),S!==-1&&(m=S+f));for(let P;P=i[S+=1];){if(t===Jc&&P==="\\"){switch(_=S,i[S+1]){case"x":S+=3;break;case"u":S+=5;break;case"U":S+=9;break;default:S+=1}x=S}if(P===`
`)t===oh&&(S=xg(i,S,e.length)),m=S+e.length+f,v=void 0;else{if(P===" "&&y&&y!==" "&&y!==`
`&&y!=="	"){const E=i[S+1];E&&E!==" "&&E!==`
`&&E!=="	"&&(v=S)}if(S>=m)if(v)h.push(v),m=v+f,v=void 0;else if(t===Jc){for(;y===" "||y==="	";)y=P,P=i[S+=1],M=!0;const E=S>x+1?S-2:_-1;if(p[E])return i;h.push(E),p[E]=!0,m=E+f,v=void 0}else M=!0}y=P}if(M&&u&&u(),h.length===0)return i;l&&l();let R=i.slice(0,h[0]);for(let P=0;P<h.length;++P){const E=h[P],V=h[P+1]||i.length;E===0?R=`
${e}${i.slice(0,V)}`:(t===Jc&&p[E]&&(R+=`${i[E]}\\`),R+=`
${e}${i.slice(E+1,V)}`)}return R}function xg(i,e,t){let n=e,s=e+1,a=i[s];for(;a===" "||a==="	";)if(e<s+t)a=i[++e];else{do a=i[++e];while(a&&a!==`
`);n=e,s=e+1,a=i[s]}return n}const gu=(i,e)=>({indentAtStart:e?i.indent.length:i.indentAtStart,lineWidth:i.options.lineWidth,minContentWidth:i.options.minContentWidth}),vu=i=>/^(%|---|\.\.\.)/m.test(i);function fS(i,e,t){if(!e||e<0)return!1;const n=e-t,s=i.length;if(s<=n)return!1;for(let a=0,l=0;a<s;++a)if(i[a]===`
`){if(a-l>n)return!0;if(l=a+1,s-l<=n)return!1}return!0}function qa(i,e){const t=JSON.stringify(i);if(e.options.doubleQuotedAsJSON)return t;const{implicitKey:n}=e,s=e.options.doubleQuotedMinMultiLineLength,a=e.indent||(vu(i)?"  ":"");let l="",u=0;for(let f=0,h=t[f];h;h=t[++f])if(h===" "&&t[f+1]==="\\"&&t[f+2]==="n"&&(l+=t.slice(u,f)+"\\ ",f+=1,u=f,h="\\"),h==="\\")switch(t[f+1]){case"u":{l+=t.slice(u,f);const p=t.substr(f+2,4);switch(p){case"0000":l+="\\0";break;case"0007":l+="\\a";break;case"000b":l+="\\v";break;case"001b":l+="\\e";break;case"0085":l+="\\N";break;case"00a0":l+="\\_";break;case"2028":l+="\\L";break;case"2029":l+="\\P";break;default:p.substr(0,2)==="00"?l+="\\x"+p.substr(2):l+=t.substr(f,6)}f+=5,u=f+1}break;case"n":if(n||t[f+2]==='"'||t.length<s)f+=1;else{for(l+=t.slice(u,f)+`

`;t[f+2]==="\\"&&t[f+3]==="n"&&t[f+4]!=='"';)l+=`
`,f+=2;l+=a,t[f+2]===" "&&(l+="\\"),f+=1,u=f+1}break;default:f+=1}return l=u?l+t.slice(u):t,n?l:mu(l,a,Jc,gu(e,!1))}function ah(i,e){if(e.options.singleQuote===!1||e.implicitKey&&i.includes(`
`)||/[ \t]\n|\n[ \t]/.test(i))return qa(i,e);const t=e.indent||(vu(i)?"  ":""),n="'"+i.replace(/'/g,"''").replace(/\n+/g,`$&
${t}`)+"'";return e.implicitKey?n:mu(n,t,gy,gu(e,!1))}function Po(i,e){const{singleQuote:t}=e.options;let n;if(t===!1)n=qa;else{const s=i.includes('"'),a=i.includes("'");s&&!a?n=ah:a&&!s?n=qa:n=t?ah:qa}return n(i,e)}let lh;try{lh=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{lh=/\n+(?!\n|$)/g}function Qc({comment:i,type:e,value:t},n,s,a){const{blockQuote:l,commentString:u,lineWidth:f}=n.options;if(!l||/\n[\t ]+$/.test(t))return Po(t,n);const h=n.indent||(n.forceBlockIndent||vu(t)?"  ":""),p=l==="literal"?!0:l==="folded"||e===It.BLOCK_FOLDED?!1:e===It.BLOCK_LITERAL?!0:!fS(t,f,h.length);if(!t)return p?`|
`:`>
`;let m,v;for(v=t.length;v>0;--v){const V=t[v-1];if(V!==`
`&&V!=="	"&&V!==" ")break}let y=t.substring(v);const M=y.indexOf(`
`);M===-1?m="-":t===y||M!==y.length-1?(m="+",a&&a()):m="",y&&(t=t.slice(0,-y.length),y[y.length-1]===`
`&&(y=y.slice(0,-1)),y=y.replace(lh,`$&${h}`));let S=!1,_,x=-1;for(_=0;_<t.length;++_){const V=t[_];if(V===" ")S=!0;else if(V===`
`)x=_;else break}let R=t.substring(0,x<_?x+1:_);R&&(t=t.substring(R.length),R=R.replace(/\n+/g,`$&${h}`));let E=(S?h?"2":"1":"")+m;if(i&&(E+=" "+u(i.replace(/ ?[\r\n]+/g," ")),s&&s()),!p){const V=t.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${h}`);let N=!1;const D=gu(n,!0);l!=="folded"&&e!==It.BLOCK_FOLDED&&(D.onOverflow=()=>{N=!0});const B=mu(`${R}${V}${y}`,h,oh,D);if(!N)return`>${E}
${h}${B}`}return t=t.replace(/\n+/g,`$&${h}`),`|${E}
${h}${R}${t}${y}`}function dS(i,e,t,n){const{type:s,value:a}=i,{actualString:l,implicitKey:u,indent:f,indentStep:h,inFlow:p}=e;if(u&&a.includes(`
`)||p&&/[[\]{},]/.test(a))return Po(a,e);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(a))return u||p||!a.includes(`
`)?Po(a,e):Qc(i,e,t,n);if(!u&&!p&&s!==It.PLAIN&&a.includes(`
`))return Qc(i,e,t,n);if(vu(a)){if(f==="")return e.forceBlockIndent=!0,Qc(i,e,t,n);if(u&&f===h)return Po(a,e)}const m=a.replace(/\n+/g,`$&
${f}`);if(l){const v=S=>{var _;return S.default&&S.tag!=="tag:yaml.org,2002:str"&&((_=S.test)==null?void 0:_.test(m))},{compat:y,tags:M}=e.doc.schema;if(M.some(v)||y!=null&&y.some(v))return Po(a,e)}return u?m:mu(m,f,gy,gu(e,!1))}function fp(i,e,t,n){const{implicitKey:s,inFlow:a}=e,l=typeof i.value=="string"?i:Object.assign({},i,{value:String(i.value)});let{type:u}=i;u!==It.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(l.value)&&(u=It.QUOTE_DOUBLE);const f=p=>{switch(p){case It.BLOCK_FOLDED:case It.BLOCK_LITERAL:return s||a?Po(l.value,e):Qc(l,e,t,n);case It.QUOTE_DOUBLE:return qa(l.value,e);case It.QUOTE_SINGLE:return ah(l.value,e);case It.PLAIN:return dS(l,e,t,n);default:return null}};let h=f(u);if(h===null){const{defaultKeyType:p,defaultStringType:m}=e.options,v=s&&p||m;if(h=f(v),h===null)throw new Error(`Unsupported default string type ${v}`)}return h}function vy(i,e){const t=Object.assign({blockQuote:!0,commentString:uS,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},i.schema.toStringOptions,e);let n;switch(t.collectionStyle){case"block":n=!1;break;case"flow":n=!0;break;default:n=null}return{anchors:new Set,doc:i,flowCollectionPadding:t.flowCollectionPadding?" ":"",indent:"",indentStep:typeof t.indent=="number"?" ".repeat(t.indent):"  ",inFlow:n,options:t}}function hS(i,e){var s;if(e.tag){const a=i.filter(l=>l.tag===e.tag);if(a.length>0)return a.find(l=>l.format===e.format)??a[0]}let t,n;if(rn(e)){n=e.value;let a=i.filter(l=>{var u;return(u=l.identify)==null?void 0:u.call(l,n)});if(a.length>1){const l=a.filter(u=>u.test);l.length>0&&(a=l)}t=a.find(l=>l.format===e.format)??a.find(l=>!l.format)}else n=e,t=i.find(a=>a.nodeClass&&n instanceof a.nodeClass);if(!t){const a=((s=n==null?void 0:n.constructor)==null?void 0:s.name)??(n===null?"null":typeof n);throw new Error(`Tag not resolved for ${a} value`)}return t}function pS(i,e,{anchors:t,doc:n}){if(!n.directives)return"";const s=[],a=(rn(i)||hn(i))&&i.anchor;a&&fy(a)&&(t.add(a),s.push(`&${a}`));const l=i.tag??(e.default?null:e.tag);return l&&s.push(n.directives.tagString(l)),s.join(" ")}function Ho(i,e,t,n){var f;if(mn(i))return i.toString(e,t,n);if(Yo(i)){if(e.doc.directives)return i.toString(e);if((f=e.resolvedAliases)!=null&&f.has(i))throw new TypeError("Cannot stringify circular structure without alias nodes");e.resolvedAliases?e.resolvedAliases.add(i):e.resolvedAliases=new Set([i]),i=i.resolve(e.doc)}let s;const a=pn(i)?i:e.doc.createNode(i,{onTagObj:h=>s=h});s??(s=hS(e.doc.schema.tags,a));const l=pS(a,s,e);l.length>0&&(e.indentAtStart=(e.indentAtStart??0)+l.length+1);const u=typeof s.stringify=="function"?s.stringify(a,e,t,n):rn(a)?fp(a,e,t,n):a.toString(e,t,n);return l?rn(a)||u[0]==="{"||u[0]==="["?`${l} ${u}`:`${l}
${e.indent}${u}`:u}function mS({key:i,value:e},t,n,s){const{allNullValues:a,doc:l,indent:u,indentStep:f,options:{commentString:h,indentSeq:p,simpleKeys:m}}=t;let v=pn(i)&&i.comment||null;if(m){if(v)throw new Error("With simple keys, key nodes cannot have comments");if(hn(i)||!pn(i)&&typeof i=="object"){const D="With simple keys, collection cannot be used as a key value";throw new Error(D)}}let y=!m&&(!i||v&&e==null&&!t.inFlow||hn(i)||(rn(i)?i.type===It.BLOCK_FOLDED||i.type===It.BLOCK_LITERAL:typeof i=="object"));t=Object.assign({},t,{allNullValues:!1,implicitKey:!y&&(m||!a),indent:u+f});let M=!1,S=!1,_=Ho(i,t,()=>M=!0,()=>S=!0);if(!y&&!t.inFlow&&_.length>1024){if(m)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");y=!0}if(t.inFlow){if(a||e==null)return M&&n&&n(),_===""?"?":y?`? ${_}`:_}else if(a&&!m||e==null&&y)return _=`? ${_}`,v&&!M?_+=Ts(_,t.indent,h(v)):S&&s&&s(),_;M&&(v=null),y?(v&&(_+=Ts(_,t.indent,h(v))),_=`? ${_}
${u}:`):(_=`${_}:`,v&&(_+=Ts(_,t.indent,h(v))));let x,R,P;pn(e)?(x=!!e.spaceBefore,R=e.commentBefore,P=e.comment):(x=!1,R=null,P=null,e&&typeof e=="object"&&(e=l.createNode(e))),t.implicitKey=!1,!y&&!v&&rn(e)&&(t.indentAtStart=_.length+1),S=!1,!p&&f.length>=2&&!t.inFlow&&!y&&cl(e)&&!e.flow&&!e.tag&&!e.anchor&&(t.indent=t.indent.substring(2));let E=!1;const V=Ho(e,t,()=>E=!0,()=>S=!0);let N=" ";if(v||x||R){if(N=x?`
`:"",R){const D=h(R);N+=`
${yr(D,t.indent)}`}V===""&&!t.inFlow?N===`
`&&P&&(N=`

`):N+=`
${t.indent}`}else if(!y&&hn(e)){const D=V[0],B=V.indexOf(`
`),L=B!==-1,A=t.inFlow??e.flow??e.items.length===0;if(L||!A){let U=!1;if(L&&(D==="&"||D==="!")){let q=V.indexOf(" ");D==="&"&&q!==-1&&q<B&&V[q+1]==="!"&&(q=V.indexOf(" ",q+1)),(q===-1||B<q)&&(U=!0)}U||(N=`
${t.indent}`)}}else(V===""||V[0]===`
`)&&(N="");return _+=N+V,t.inFlow?E&&n&&n():P&&!E?_+=Ts(_,t.indent,h(P)):S&&s&&s(),_}function yy(i,e){(i==="debug"||i==="warn")&&console.warn(e)}const gc="<<",Sr={identify:i=>i===gc||typeof i=="symbol"&&i.description===gc,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new It(Symbol(gc)),{addToJSMap:_y}),stringify:()=>gc},gS=(i,e)=>(Sr.identify(e)||rn(e)&&(!e.type||e.type===It.PLAIN)&&Sr.identify(e.value))&&(i==null?void 0:i.doc.schema.tags.some(t=>t.tag===Sr.tag&&t.default));function _y(i,e,t){const n=xy(i,t);if(cl(n))for(const s of n.items)md(i,e,s);else if(Array.isArray(n))for(const s of n)md(i,e,s);else md(i,e,n)}function md(i,e,t){const n=xy(i,t);if(!ll(n))throw new Error("Merge sources must be maps or map aliases");const s=n.toJSON(null,i,Map);for(const[a,l]of s)e instanceof Map?e.has(a)||e.set(a,l):e instanceof Set?e.add(a):Object.prototype.hasOwnProperty.call(e,a)||Object.defineProperty(e,a,{value:l,writable:!0,enumerable:!0,configurable:!0});return e}function xy(i,e){return i&&Yo(e)?e.resolve(i.doc,i):e}function Sy(i,e,{key:t,value:n}){if(pn(t)&&t.addToJSMap)t.addToJSMap(i,e,n);else if(gS(i,t))_y(i,e,n);else{const s=Ti(t,"",i);if(e instanceof Map)e.set(s,Ti(n,s,i));else if(e instanceof Set)e.add(s);else{const a=vS(t,s,i),l=Ti(n,a,i);a in e?Object.defineProperty(e,a,{value:l,writable:!0,enumerable:!0,configurable:!0}):e[a]=l}}return e}function vS(i,e,t){if(e===null)return"";if(typeof e!="object")return String(e);if(pn(i)&&(t!=null&&t.doc)){const n=vy(t.doc,{});n.anchors=new Set;for(const a of t.anchors.keys())n.anchors.add(a.anchor);n.inFlow=!0,n.inStringifyKey=!0;const s=i.toString(n);if(!t.mapKeyWarned){let a=JSON.stringify(s);a.length>40&&(a=a.substring(0,36)+'..."'),yy(t.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${a}. Set mapAsMap: true to use object keys.`),t.mapKeyWarned=!0}return s}return JSON.stringify(e)}function dp(i,e,t){const n=tl(i,void 0,t),s=tl(e,void 0,t);return new Kn(n,s)}class Kn{constructor(e,t=null){Object.defineProperty(this,Ai,{value:cy}),this.key=e,this.value=t}clone(e){let{key:t,value:n}=this;return pn(t)&&(t=t.clone(e)),pn(n)&&(n=n.clone(e)),new Kn(t,n)}toJSON(e,t){const n=t!=null&&t.mapAsMap?new Map:{};return Sy(t,n,this)}toString(e,t,n){return e!=null&&e.doc?mS(this,e,t,n):JSON.stringify(this)}}function My(i,e,t){return(e.inFlow??i.flow?_S:yS)(i,e,t)}function yS({comment:i,items:e},t,{blockItemPrefix:n,flowChars:s,itemIndent:a,onChompKeep:l,onComment:u}){const{indent:f,options:{commentString:h}}=t,p=Object.assign({},t,{indent:a,type:null});let m=!1;const v=[];for(let M=0;M<e.length;++M){const S=e[M];let _=null;if(pn(S))!m&&S.spaceBefore&&v.push(""),au(t,v,S.commentBefore,m),S.comment&&(_=S.comment);else if(mn(S)){const R=pn(S.key)?S.key:null;R&&(!m&&R.spaceBefore&&v.push(""),au(t,v,R.commentBefore,m))}m=!1;let x=Ho(S,p,()=>_=null,()=>m=!0);_&&(x+=Ts(x,a,h(_))),m&&_&&(m=!1),v.push(n+x)}let y;if(v.length===0)y=s.start+s.end;else{y=v[0];for(let M=1;M<v.length;++M){const S=v[M];y+=S?`
${f}${S}`:`
`}}return i?(y+=`
`+yr(h(i),f),u&&u()):m&&l&&l(),y}function _S({items:i},e,{flowChars:t,itemIndent:n}){const{indent:s,indentStep:a,flowCollectionPadding:l,options:{commentString:u}}=e;n+=a;const f=Object.assign({},e,{indent:n,inFlow:!0,type:null});let h=!1,p=0;const m=[];for(let M=0;M<i.length;++M){const S=i[M];let _=null;if(pn(S))S.spaceBefore&&m.push(""),au(e,m,S.commentBefore,!1),S.comment&&(_=S.comment);else if(mn(S)){const R=pn(S.key)?S.key:null;R&&(R.spaceBefore&&m.push(""),au(e,m,R.commentBefore,!1),R.comment&&(h=!0));const P=pn(S.value)?S.value:null;P?(P.comment&&(_=P.comment),P.commentBefore&&(h=!0)):S.value==null&&(R!=null&&R.comment)&&(_=R.comment)}_&&(h=!0);let x=Ho(S,f,()=>_=null);h||(h=m.length>p||x.includes(`
`)),M<i.length-1?x+=",":e.options.trailingComma&&(e.options.lineWidth>0&&(h||(h=m.reduce((R,P)=>R+P.length+2,2)+(x.length+2)>e.options.lineWidth)),h&&(x+=",")),_&&(x+=Ts(x,n,u(_))),m.push(x),p=m.length}const{start:v,end:y}=t;if(m.length===0)return v+y;if(!h){const M=m.reduce((S,_)=>S+_.length+2,2);h=e.options.lineWidth>0&&M>e.options.lineWidth}if(h){let M=v;for(const S of m)M+=S?`
${a}${s}${S}`:`
`;return`${M}
${s}${y}`}else return`${v}${l}${m.join(" ")}${l}${y}`}function au({indent:i,options:{commentString:e}},t,n,s){if(n&&s&&(n=n.replace(/^\n+/,"")),n){const a=yr(e(n),i);t.push(a.trimStart())}}function As(i,e){const t=rn(e)?e.value:e;for(const n of i)if(mn(n)&&(n.key===e||n.key===t||rn(n.key)&&n.key.value===t))return n}class Ei extends my{static get tagName(){return"tag:yaml.org,2002:map"}constructor(e){super(Qr,e),this.items=[]}static from(e,t,n){const{keepUndefined:s,replacer:a}=n,l=new this(e),u=(f,h)=>{if(typeof a=="function")h=a.call(t,f,h);else if(Array.isArray(a)&&!a.includes(f))return;(h!==void 0||s)&&l.items.push(dp(f,h,n))};if(t instanceof Map)for(const[f,h]of t)u(f,h);else if(t&&typeof t=="object")for(const f of Object.keys(t))u(f,t[f]);return typeof e.sortMapEntries=="function"&&l.items.sort(e.sortMapEntries),l}add(e,t){var l;let n;mn(e)?n=e:!e||typeof e!="object"||!("key"in e)?n=new Kn(e,e==null?void 0:e.value):n=new Kn(e.key,e.value);const s=As(this.items,n.key),a=(l=this.schema)==null?void 0:l.sortMapEntries;if(s){if(!t)throw new Error(`Key ${n.key} already set`);rn(s.value)&&py(n.value)?s.value.value=n.value:s.value=n.value}else if(a){const u=this.items.findIndex(f=>a(n,f)<0);u===-1?this.items.push(n):this.items.splice(u,0,n)}else this.items.push(n)}delete(e){const t=As(this.items,e);return t?this.items.splice(this.items.indexOf(t),1).length>0:!1}get(e,t){const n=As(this.items,e),s=n==null?void 0:n.value;return(!t&&rn(s)?s.value:s)??void 0}has(e){return!!As(this.items,e)}set(e,t){this.add(new Kn(e,t),!0)}toJSON(e,t,n){const s=n?new n:t!=null&&t.mapAsMap?new Map:{};t!=null&&t.onCreate&&t.onCreate(s);for(const a of this.items)Sy(t,s,a);return s}toString(e,t,n){if(!e)return JSON.stringify(this);for(const s of this.items)if(!mn(s))throw new Error(`Map items must all be pairs; found ${JSON.stringify(s)} instead`);return!e.allNullValues&&this.hasAllNullValues(!1)&&(e=Object.assign({},e,{allNullValues:!0})),My(this,e,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:e.indent||"",onChompKeep:n,onComment:t})}}const Jo={collection:"map",default:!0,nodeClass:Ei,tag:"tag:yaml.org,2002:map",resolve(i,e){return ll(i)||e("Expected a mapping for this tag"),i},createNode:(i,e,t)=>Ei.from(i,e,t)};class Ls extends my{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(e){super(Ko,e),this.items=[]}add(e){this.items.push(e)}delete(e){const t=vc(e);return typeof t!="number"?!1:this.items.splice(t,1).length>0}get(e,t){const n=vc(e);if(typeof n!="number")return;const s=this.items[n];return!t&&rn(s)?s.value:s}has(e){const t=vc(e);return typeof t=="number"&&t<this.items.length}set(e,t){const n=vc(e);if(typeof n!="number")throw new Error(`Expected a valid index, not ${e}.`);const s=this.items[n];rn(s)&&py(t)?s.value=t:this.items[n]=t}toJSON(e,t){const n=[];t!=null&&t.onCreate&&t.onCreate(n);let s=0;for(const a of this.items)n.push(Ti(a,String(s++),t));return n}toString(e,t,n){return e?My(this,e,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(e.indent||"")+"  ",onChompKeep:n,onComment:t}):JSON.stringify(this)}static from(e,t,n){const{replacer:s}=n,a=new this(e);if(t&&Symbol.iterator in Object(t)){let l=0;for(let u of t){if(typeof s=="function"){const f=t instanceof Set?u:String(l++);u=s.call(t,f,u)}a.items.push(tl(u,void 0,n))}}return a}}function vc(i){let e=rn(i)?i.value:i;return e&&typeof e=="string"&&(e=Number(e)),typeof e=="number"&&Number.isInteger(e)&&e>=0?e:null}const Qo={collection:"seq",default:!0,nodeClass:Ls,tag:"tag:yaml.org,2002:seq",resolve(i,e){return cl(i)||e("Expected a sequence for this tag"),i},createNode:(i,e,t)=>Ls.from(i,e,t)},yu={identify:i=>typeof i=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:i=>i,stringify(i,e,t,n){return e=Object.assign({actualString:!0},e),fp(i,e,t,n)}},_u={identify:i=>i==null,createNode:()=>new It(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new It(null),stringify:({source:i},e)=>typeof i=="string"&&_u.test.test(i)?i:e.options.nullStr},hp={identify:i=>typeof i=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:i=>new It(i[0]==="t"||i[0]==="T"),stringify({source:i,value:e},t){if(i&&hp.test.test(i)){const n=i[0]==="t"||i[0]==="T";if(e===n)return i}return e?t.options.trueStr:t.options.falseStr}};function Vi({format:i,minFractionDigits:e,tag:t,value:n}){if(typeof n=="bigint")return String(n);const s=typeof n=="number"?n:Number(n);if(!isFinite(s))return isNaN(s)?".nan":s<0?"-.inf":".inf";let a=Object.is(n,-0)?"-0":JSON.stringify(n);if(!i&&e&&(!t||t==="tag:yaml.org,2002:float")&&/^-?\d/.test(a)&&!a.includes("e")){let l=a.indexOf(".");l<0&&(l=a.length,a+=".");let u=e-(a.length-l-1);for(;u-- >0;)a+="0"}return a}const wy={identify:i=>typeof i=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:i=>i.slice(-3).toLowerCase()==="nan"?NaN:i[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Vi},Ey={identify:i=>typeof i=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:i=>parseFloat(i),stringify(i){const e=Number(i.value);return isFinite(e)?e.toExponential():Vi(i)}},by={identify:i=>typeof i=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(i){const e=new It(parseFloat(i)),t=i.indexOf(".");return t!==-1&&i[i.length-1]==="0"&&(e.minFractionDigits=i.length-t-1),e},stringify:Vi},xu=i=>typeof i=="bigint"||Number.isInteger(i),pp=(i,e,t,{intAsBigInt:n})=>n?BigInt(i):parseInt(i.substring(e),t);function Ty(i,e,t){const{value:n}=i;return xu(n)&&n>=0?t+n.toString(e):Vi(i)}const Ay={identify:i=>xu(i)&&i>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(i,e,t)=>pp(i,2,8,t),stringify:i=>Ty(i,8,"0o")},Cy={identify:xu,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(i,e,t)=>pp(i,0,10,t),stringify:Vi},Ry={identify:i=>xu(i)&&i>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(i,e,t)=>pp(i,2,16,t),stringify:i=>Ty(i,16,"0x")},xS=[Jo,Qo,yu,_u,hp,Ay,Cy,Ry,wy,Ey,by];function Sg(i){return typeof i=="bigint"||Number.isInteger(i)}const yc=({value:i})=>JSON.stringify(i),SS=[{identify:i=>typeof i=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:i=>i,stringify:yc},{identify:i=>i==null,createNode:()=>new It(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:yc},{identify:i=>typeof i=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:i=>i==="true",stringify:yc},{identify:Sg,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(i,e,{intAsBigInt:t})=>t?BigInt(i):parseInt(i,10),stringify:({value:i})=>Sg(i)?i.toString():JSON.stringify(i)},{identify:i=>typeof i=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:i=>parseFloat(i),stringify:yc}],MS={default:!0,tag:"",test:/^/,resolve(i,e){return e(`Unresolved plain scalar ${JSON.stringify(i)}`),i}},wS=[Jo,Qo].concat(SS,MS),mp={identify:i=>i instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(i,e){if(typeof atob=="function"){const t=atob(i.replace(/[\n\r]/g,"")),n=new Uint8Array(t.length);for(let s=0;s<t.length;++s)n[s]=t.charCodeAt(s);return n}else return e("This environment does not support reading binary tags; either Buffer or atob is required"),i},stringify({comment:i,type:e,value:t},n,s,a){if(!t)return"";const l=t;let u;if(typeof btoa=="function"){let f="";for(let h=0;h<l.length;++h)f+=String.fromCharCode(l[h]);u=btoa(f)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(e??(e=It.BLOCK_LITERAL),e!==It.QUOTE_DOUBLE){const f=Math.max(n.options.lineWidth-n.indent.length,n.options.minContentWidth),h=Math.ceil(u.length/f),p=new Array(h);for(let m=0,v=0;m<h;++m,v+=f)p[m]=u.substr(v,f);u=p.join(e===It.BLOCK_LITERAL?`
`:" ")}return fp({comment:i,type:e,value:u},n,s,a)}};function Py(i,e){if(cl(i))for(let t=0;t<i.items.length;++t){let n=i.items[t];if(!mn(n)){if(ll(n)){n.items.length>1&&e("Each pair must have its own sequence indicator");const s=n.items[0]||new Kn(new It(null));if(n.commentBefore&&(s.key.commentBefore=s.key.commentBefore?`${n.commentBefore}
${s.key.commentBefore}`:n.commentBefore),n.comment){const a=s.value??s.key;a.comment=a.comment?`${n.comment}
${a.comment}`:n.comment}n=s}i.items[t]=mn(n)?n:new Kn(n)}}else e("Expected a sequence for this tag");return i}function Ly(i,e,t){const{replacer:n}=t,s=new Ls(i);s.tag="tag:yaml.org,2002:pairs";let a=0;if(e&&Symbol.iterator in Object(e))for(let l of e){typeof n=="function"&&(l=n.call(e,String(a++),l));let u,f;if(Array.isArray(l))if(l.length===2)u=l[0],f=l[1];else throw new TypeError(`Expected [key, value] tuple: ${l}`);else if(l&&l instanceof Object){const h=Object.keys(l);if(h.length===1)u=h[0],f=l[u];else throw new TypeError(`Expected tuple with one key, not ${h.length} keys`)}else u=l;s.items.push(dp(u,f,t))}return s}const gp={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:Py,createNode:Ly};class No extends Ls{constructor(){super(),this.add=Ei.prototype.add.bind(this),this.delete=Ei.prototype.delete.bind(this),this.get=Ei.prototype.get.bind(this),this.has=Ei.prototype.has.bind(this),this.set=Ei.prototype.set.bind(this),this.tag=No.tag}toJSON(e,t){if(!t)return super.toJSON(e);const n=new Map;t!=null&&t.onCreate&&t.onCreate(n);for(const s of this.items){let a,l;if(mn(s)?(a=Ti(s.key,"",t),l=Ti(s.value,a,t)):a=Ti(s,"",t),n.has(a))throw new Error("Ordered maps must not include duplicate keys");n.set(a,l)}return n}static from(e,t,n){const s=Ly(e,t,n),a=new this;return a.items=s.items,a}}No.tag="tag:yaml.org,2002:omap";const vp={collection:"seq",identify:i=>i instanceof Map,nodeClass:No,default:!1,tag:"tag:yaml.org,2002:omap",resolve(i,e){const t=Py(i,e),n=[];for(const{key:s}of t.items)rn(s)&&(n.includes(s.value)?e(`Ordered maps must not include duplicate keys: ${s.value}`):n.push(s.value));return Object.assign(new No,t)},createNode:(i,e,t)=>No.from(i,e,t)};function Iy({value:i,source:e},t){return e&&(i?Dy:Ny).test.test(e)?e:i?t.options.trueStr:t.options.falseStr}const Dy={identify:i=>i===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new It(!0),stringify:Iy},Ny={identify:i=>i===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new It(!1),stringify:Iy},ES={identify:i=>typeof i=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:i=>i.slice(-3).toLowerCase()==="nan"?NaN:i[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Vi},bS={identify:i=>typeof i=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:i=>parseFloat(i.replace(/_/g,"")),stringify(i){const e=Number(i.value);return isFinite(e)?e.toExponential():Vi(i)}},TS={identify:i=>typeof i=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(i){const e=new It(parseFloat(i.replace(/_/g,""))),t=i.indexOf(".");if(t!==-1){const n=i.substring(t+1).replace(/_/g,"");n[n.length-1]==="0"&&(e.minFractionDigits=n.length)}return e},stringify:Vi},ul=i=>typeof i=="bigint"||Number.isInteger(i);function Su(i,e,t,{intAsBigInt:n}){const s=i[0];if((s==="-"||s==="+")&&(e+=1),i=i.substring(e).replace(/_/g,""),n){switch(t){case 2:i=`0b${i}`;break;case 8:i=`0o${i}`;break;case 16:i=`0x${i}`;break}const l=BigInt(i);return s==="-"?BigInt(-1)*l:l}const a=parseInt(i,t);return s==="-"?-1*a:a}function yp(i,e,t){const{value:n}=i;if(ul(n)){const s=n.toString(e);return n<0?"-"+t+s.substr(1):t+s}return Vi(i)}const AS={identify:ul,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(i,e,t)=>Su(i,2,2,t),stringify:i=>yp(i,2,"0b")},CS={identify:ul,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(i,e,t)=>Su(i,1,8,t),stringify:i=>yp(i,8,"0")},RS={identify:ul,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(i,e,t)=>Su(i,0,10,t),stringify:Vi},PS={identify:ul,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(i,e,t)=>Su(i,2,16,t),stringify:i=>yp(i,16,"0x")};class ko extends Ei{constructor(e){super(e),this.tag=ko.tag}add(e){let t;mn(e)?t=e:e&&typeof e=="object"&&"key"in e&&"value"in e&&e.value===null?t=new Kn(e.key,null):t=new Kn(e,null),As(this.items,t.key)||this.items.push(t)}get(e,t){const n=As(this.items,e);return!t&&mn(n)?rn(n.key)?n.key.value:n.key:n}set(e,t){if(typeof t!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);const n=As(this.items,e);n&&!t?this.items.splice(this.items.indexOf(n),1):!n&&t&&this.items.push(new Kn(e))}toJSON(e,t){return super.toJSON(e,t,Set)}toString(e,t,n){if(!e)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},e,{allNullValues:!0}),t,n);throw new Error("Set items must all have null values")}static from(e,t,n){const{replacer:s}=n,a=new this(e);if(t&&Symbol.iterator in Object(t))for(let l of t)typeof s=="function"&&(l=s.call(t,l,l)),a.items.push(dp(l,null,n));return a}}ko.tag="tag:yaml.org,2002:set";const _p={collection:"map",identify:i=>i instanceof Set,nodeClass:ko,default:!1,tag:"tag:yaml.org,2002:set",createNode:(i,e,t)=>ko.from(i,e,t),resolve(i,e){if(ll(i)){if(i.hasAllNullValues(!0))return Object.assign(new ko,i);e("Set items must all have null values")}else e("Expected a mapping for this tag");return i}};function xp(i,e){const t=i[0],n=t==="-"||t==="+"?i.substring(1):i,s=l=>e?BigInt(l):Number(l),a=n.replace(/_/g,"").split(":").reduce((l,u)=>l*s(60)+s(u),s(0));return t==="-"?s(-1)*a:a}function ky(i){let{value:e}=i,t=l=>l;if(typeof e=="bigint")t=l=>BigInt(l);else if(isNaN(e)||!isFinite(e))return Vi(i);let n="";e<0&&(n="-",e*=t(-1));const s=t(60),a=[e%s];return e<60?a.unshift(0):(e=(e-a[0])/s,a.unshift(e%s),e>=60&&(e=(e-a[0])/s,a.unshift(e))),n+a.map(l=>String(l).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const Uy={identify:i=>typeof i=="bigint"||Number.isInteger(i),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(i,e,{intAsBigInt:t})=>xp(i,t),stringify:ky},Oy={identify:i=>typeof i=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:i=>xp(i,!1),stringify:ky},Mu={identify:i=>i instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(i){const e=i.match(Mu.test);if(!e)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,t,n,s,a,l,u]=e.map(Number),f=e[7]?Number((e[7]+"00").substr(1,3)):0;let h=Date.UTC(t,n-1,s,a||0,l||0,u||0,f);const p=e[8];if(p&&p!=="Z"){let m=xp(p,!1);Math.abs(m)<30&&(m*=60),h-=6e4*m}return new Date(h)},stringify:({value:i})=>(i==null?void 0:i.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},Mg=[Jo,Qo,yu,_u,Dy,Ny,AS,CS,RS,PS,ES,bS,TS,mp,Sr,vp,gp,_p,Uy,Oy,Mu],wg=new Map([["core",xS],["failsafe",[Jo,Qo,yu]],["json",wS],["yaml11",Mg],["yaml-1.1",Mg]]),Eg={binary:mp,bool:hp,float:by,floatExp:Ey,floatNaN:wy,floatTime:Oy,int:Cy,intHex:Ry,intOct:Ay,intTime:Uy,map:Jo,merge:Sr,null:_u,omap:vp,pairs:gp,seq:Qo,set:_p,timestamp:Mu},LS={"tag:yaml.org,2002:binary":mp,"tag:yaml.org,2002:merge":Sr,"tag:yaml.org,2002:omap":vp,"tag:yaml.org,2002:pairs":gp,"tag:yaml.org,2002:set":_p,"tag:yaml.org,2002:timestamp":Mu};function gd(i,e,t){const n=wg.get(e);if(n&&!i)return t&&!n.includes(Sr)?n.concat(Sr):n.slice();let s=n;if(!s)if(Array.isArray(i))s=[];else{const a=Array.from(wg.keys()).filter(l=>l!=="yaml11").map(l=>JSON.stringify(l)).join(", ");throw new Error(`Unknown schema "${e}"; use one of ${a} or define customTags array`)}if(Array.isArray(i))for(const a of i)s=s.concat(a);else typeof i=="function"&&(s=i(s.slice()));return t&&(s=s.concat(Sr)),s.reduce((a,l)=>{const u=typeof l=="string"?Eg[l]:l;if(!u){const f=JSON.stringify(l),h=Object.keys(Eg).map(p=>JSON.stringify(p)).join(", ");throw new Error(`Unknown custom tag ${f}; use one of ${h}`)}return a.includes(u)||a.push(u),a},[])}const IS=(i,e)=>i.key<e.key?-1:i.key>e.key?1:0;class Sp{constructor({compat:e,customTags:t,merge:n,resolveKnownTags:s,schema:a,sortMapEntries:l,toStringDefaults:u}){this.compat=Array.isArray(e)?gd(e,"compat"):e?gd(null,e):null,this.name=typeof a=="string"&&a||"core",this.knownTags=s?LS:{},this.tags=gd(t,this.name,n),this.toStringOptions=u??null,Object.defineProperty(this,Qr,{value:Jo}),Object.defineProperty(this,Ji,{value:yu}),Object.defineProperty(this,Ko,{value:Qo}),this.sortMapEntries=typeof l=="function"?l:l===!0?IS:null}clone(){const e=Object.create(Sp.prototype,Object.getOwnPropertyDescriptors(this));return e.tags=this.tags.slice(),e}}function DS(i,e){var f;const t=[];let n=e.directives===!0;if(e.directives!==!1&&i.directives){const h=i.directives.toString(i);h?(t.push(h),n=!0):i.directives.docStart&&(n=!0)}n&&t.push("---");const s=vy(i,e),{commentString:a}=s.options;if(i.commentBefore){t.length!==1&&t.unshift("");const h=a(i.commentBefore);t.unshift(yr(h,""))}let l=!1,u=null;if(i.contents){if(pn(i.contents)){if(i.contents.spaceBefore&&n&&t.push(""),i.contents.commentBefore){const m=a(i.contents.commentBefore);t.push(yr(m,""))}s.forceBlockIndent=!!i.comment,u=i.contents.comment}const h=u?void 0:()=>l=!0;let p=Ho(i.contents,s,()=>u=null,h);u&&(p+=Ts(p,"",a(u))),(p[0]==="|"||p[0]===">")&&t[t.length-1]==="---"?t[t.length-1]=`--- ${p}`:t.push(p)}else t.push(Ho(i.contents,s));if((f=i.directives)!=null&&f.docEnd)if(i.comment){const h=a(i.comment);h.includes(`
`)?(t.push("..."),t.push(yr(h,""))):t.push(`... ${h}`)}else t.push("...");else{let h=i.comment;h&&l&&(h=h.replace(/^\n+/,"")),h&&((!l||u)&&t[t.length-1]!==""&&t.push(""),t.push(yr(a(h),"")))}return t.join(`
`)+`
`}class wu{constructor(e,t,n){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,Ai,{value:sh});let s=null;typeof t=="function"||Array.isArray(t)?s=t:n===void 0&&t&&(n=t,t=void 0);const a=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},n);this.options=a;let{version:l}=a;n!=null&&n._directives?(this.directives=n._directives.atDocument(),this.directives.yaml.explicit&&(l=this.directives.yaml.version)):this.directives=new qn({version:l}),this.setSchema(l,n),this.contents=e===void 0?null:this.createNode(e,s,n)}clone(){const e=Object.create(wu.prototype,{[Ai]:{value:sh}});return e.commentBefore=this.commentBefore,e.comment=this.comment,e.errors=this.errors.slice(),e.warnings=this.warnings.slice(),e.options=Object.assign({},this.options),this.directives&&(e.directives=this.directives.clone()),e.schema=this.schema.clone(),e.contents=pn(this.contents)?this.contents.clone(e.schema):this.contents,this.range&&(e.range=this.range.slice()),e}add(e){oo(this.contents)&&this.contents.add(e)}addIn(e,t){oo(this.contents)&&this.contents.addIn(e,t)}createAlias(e,t){if(!e.anchor){const n=dy(this);e.anchor=!t||n.has(t)?hy(t||"a",n):t}return new up(e.anchor)}createNode(e,t,n){let s;if(typeof t=="function")e=t.call({"":e},"",e),s=t;else if(Array.isArray(t)){const _=R=>typeof R=="number"||R instanceof String||R instanceof Number,x=t.filter(_).map(String);x.length>0&&(t=t.concat(x)),s=t}else n===void 0&&t&&(n=t,t=void 0);const{aliasDuplicateObjects:a,anchorPrefix:l,flow:u,keepUndefined:f,onTagObj:h,tag:p}=n??{},{onAnchor:m,setAnchors:v,sourceObjects:y}=aS(this,l||"a"),M={aliasDuplicateObjects:a??!0,keepUndefined:f??!1,onAnchor:m,onTagObj:h,replacer:s,schema:this.schema,sourceObjects:y},S=tl(e,p,M);return u&&hn(S)&&(S.flow=!0),v(),S}createPair(e,t,n={}){const s=this.createNode(e,null,n),a=this.createNode(t,null,n);return new Kn(s,a)}delete(e){return oo(this.contents)?this.contents.delete(e):!1}deleteIn(e){return Va(e)?this.contents==null?!1:(this.contents=null,!0):oo(this.contents)?this.contents.deleteIn(e):!1}get(e,t){return hn(this.contents)?this.contents.get(e,t):void 0}getIn(e,t){return Va(e)?!t&&rn(this.contents)?this.contents.value:this.contents:hn(this.contents)?this.contents.getIn(e,t):void 0}has(e){return hn(this.contents)?this.contents.has(e):!1}hasIn(e){return Va(e)?this.contents!==void 0:hn(this.contents)?this.contents.hasIn(e):!1}set(e,t){this.contents==null?this.contents=ou(this.schema,[e],t):oo(this.contents)&&this.contents.set(e,t)}setIn(e,t){Va(e)?this.contents=t:this.contents==null?this.contents=ou(this.schema,Array.from(e),t):oo(this.contents)&&this.contents.setIn(e,t)}setSchema(e,t={}){typeof e=="number"&&(e=String(e));let n;switch(e){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new qn({version:"1.1"}),n={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=e:this.directives=new qn({version:e}),n={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,n=null;break;default:{const s=JSON.stringify(e);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${s}`)}}if(t.schema instanceof Object)this.schema=t.schema;else if(n)this.schema=new Sp(Object.assign(n,t));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:e,jsonArg:t,mapAsMap:n,maxAliasCount:s,onAnchor:a,reviver:l}={}){const u={anchors:new Map,doc:this,keep:!e,mapAsMap:n===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},f=Ti(this.contents,t??"",u);if(typeof a=="function")for(const{count:h,res:p}of u.anchors.values())a(p,h);return typeof l=="function"?Ro(l,{"":f},"",f):f}toJSON(e,t){return this.toJS({json:!0,jsonArg:e,mapAsMap:!1,onAnchor:t})}toString(e={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in e&&(!Number.isInteger(e.indent)||Number(e.indent)<=0)){const t=JSON.stringify(e.indent);throw new Error(`"indent" option must be a positive integer, not ${t}`)}return DS(this,e)}}function oo(i){if(hn(i))return!0;throw new Error("Expected a YAML collection as document contents")}class Fy extends Error{constructor(e,t,n,s){super(),this.name=e,this.code=n,this.message=s,this.pos=t}}class Ga extends Fy{constructor(e,t,n){super("YAMLParseError",e,t,n)}}class NS extends Fy{constructor(e,t,n){super("YAMLWarning",e,t,n)}}const bg=(i,e)=>t=>{if(t.pos[0]===-1)return;t.linePos=t.pos.map(u=>e.linePos(u));const{line:n,col:s}=t.linePos[0];t.message+=` at line ${n}, column ${s}`;let a=s-1,l=i.substring(e.lineStarts[n-1],e.lineStarts[n]).replace(/[\n\r]+$/,"");if(a>=60&&l.length>80){const u=Math.min(a-39,l.length-79);l="…"+l.substring(u),a-=u-1}if(l.length>80&&(l=l.substring(0,79)+"…"),n>1&&/^ *$/.test(l.substring(0,a))){let u=i.substring(e.lineStarts[n-2],e.lineStarts[n-1]);u.length>80&&(u=u.substring(0,79)+`…
`),l=u+l}if(/[^ ]/.test(l)){let u=1;const f=t.linePos[1];(f==null?void 0:f.line)===n&&f.col>s&&(u=Math.max(1,Math.min(f.col-s,80-a)));const h=" ".repeat(a)+"^".repeat(u);t.message+=`:

${l}
${h}
`}};function Vo(i,{flow:e,indicator:t,next:n,offset:s,onError:a,parentIndent:l,startOnNewline:u}){let f=!1,h=u,p=u,m="",v="",y=!1,M=!1,S=null,_=null,x=null,R=null,P=null,E=null,V=null;for(const B of i)switch(M&&(B.type!=="space"&&B.type!=="newline"&&B.type!=="comma"&&a(B.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),M=!1),S&&(h&&B.type!=="comment"&&B.type!=="newline"&&a(S,"TAB_AS_INDENT","Tabs are not allowed as indentation"),S=null),B.type){case"space":!e&&(t!=="doc-start"||(n==null?void 0:n.type)!=="flow-collection")&&B.source.includes("	")&&(S=B),p=!0;break;case"comment":{p||a(B,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const L=B.source.substring(1)||" ";m?m+=v+L:m=L,v="",h=!1;break}case"newline":h?m?m+=B.source:(!E||t!=="seq-item-ind")&&(f=!0):v+=B.source,h=!0,y=!0,(_||x)&&(R=B),p=!0;break;case"anchor":_&&a(B,"MULTIPLE_ANCHORS","A node can have at most one anchor"),B.source.endsWith(":")&&a(B.offset+B.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),_=B,V??(V=B.offset),h=!1,p=!1,M=!0;break;case"tag":{x&&a(B,"MULTIPLE_TAGS","A node can have at most one tag"),x=B,V??(V=B.offset),h=!1,p=!1,M=!0;break}case t:(_||x)&&a(B,"BAD_PROP_ORDER",`Anchors and tags must be after the ${B.source} indicator`),E&&a(B,"UNEXPECTED_TOKEN",`Unexpected ${B.source} in ${e??"collection"}`),E=B,h=t==="seq-item-ind"||t==="explicit-key-ind",p=!1;break;case"comma":if(e){P&&a(B,"UNEXPECTED_TOKEN",`Unexpected , in ${e}`),P=B,h=!1,p=!1;break}default:a(B,"UNEXPECTED_TOKEN",`Unexpected ${B.type} token`),h=!1,p=!1}const N=i[i.length-1],D=N?N.offset+N.source.length:s;return M&&n&&n.type!=="space"&&n.type!=="newline"&&n.type!=="comma"&&(n.type!=="scalar"||n.source!=="")&&a(n.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),S&&(h&&S.indent<=l||(n==null?void 0:n.type)==="block-map"||(n==null?void 0:n.type)==="block-seq")&&a(S,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:P,found:E,spaceBefore:f,comment:m,hasNewline:y,anchor:_,tag:x,newlineAfterProp:R,end:D,start:V??D}}function nl(i){if(!i)return null;switch(i.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(i.source.includes(`
`))return!0;if(i.end){for(const e of i.end)if(e.type==="newline")return!0}return!1;case"flow-collection":for(const e of i.items){for(const t of e.start)if(t.type==="newline")return!0;if(e.sep){for(const t of e.sep)if(t.type==="newline")return!0}if(nl(e.key)||nl(e.value))return!0}return!1;default:return!0}}function ch(i,e,t){if((e==null?void 0:e.type)==="flow-collection"){const n=e.end[0];n.indent===i&&(n.source==="]"||n.source==="}")&&nl(e)&&t(n,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function zy(i,e,t){const{uniqueKeys:n}=i.options;if(n===!1)return!1;const s=typeof n=="function"?n:(a,l)=>a===l||rn(a)&&rn(l)&&a.value===l.value;return e.some(a=>s(a.key,t))}const Tg="All mapping items must start at the same column";function kS({composeNode:i,composeEmptyNode:e},t,n,s,a){var p;const l=(a==null?void 0:a.nodeClass)??Ei,u=new l(t.schema);t.atRoot&&(t.atRoot=!1);let f=n.offset,h=null;for(const m of n.items){const{start:v,key:y,sep:M,value:S}=m,_=Vo(v,{indicator:"explicit-key-ind",next:y??(M==null?void 0:M[0]),offset:f,onError:s,parentIndent:n.indent,startOnNewline:!0}),x=!_.found;if(x){if(y&&(y.type==="block-seq"?s(f,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in y&&y.indent!==n.indent&&s(f,"BAD_INDENT",Tg)),!_.anchor&&!_.tag&&!M){h=_.end,_.comment&&(u.comment?u.comment+=`
`+_.comment:u.comment=_.comment);continue}(_.newlineAfterProp||nl(y))&&s(y??v[v.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((p=_.found)==null?void 0:p.indent)!==n.indent&&s(f,"BAD_INDENT",Tg);t.atKey=!0;const R=_.end,P=y?i(t,y,_,s):e(t,R,v,null,_,s);t.schema.compat&&ch(n.indent,y,s),t.atKey=!1,zy(t,u.items,P)&&s(R,"DUPLICATE_KEY","Map keys must be unique");const E=Vo(M??[],{indicator:"map-value-ind",next:S,offset:P.range[2],onError:s,parentIndent:n.indent,startOnNewline:!y||y.type==="block-scalar"});if(f=E.end,E.found){x&&((S==null?void 0:S.type)==="block-map"&&!E.hasNewline&&s(f,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),t.options.strict&&_.start<E.found.offset-1024&&s(P.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const V=S?i(t,S,E,s):e(t,f,M,null,E,s);t.schema.compat&&ch(n.indent,S,s),f=V.range[2];const N=new Kn(P,V);t.options.keepSourceTokens&&(N.srcToken=m),u.items.push(N)}else{x&&s(P.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),E.comment&&(P.comment?P.comment+=`
`+E.comment:P.comment=E.comment);const V=new Kn(P);t.options.keepSourceTokens&&(V.srcToken=m),u.items.push(V)}}return h&&h<f&&s(h,"IMPOSSIBLE","Map comment with trailing content"),u.range=[n.offset,f,h??f],u}function US({composeNode:i,composeEmptyNode:e},t,n,s,a){const l=(a==null?void 0:a.nodeClass)??Ls,u=new l(t.schema);t.atRoot&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let f=n.offset,h=null;for(const{start:p,value:m}of n.items){const v=Vo(p,{indicator:"seq-item-ind",next:m,offset:f,onError:s,parentIndent:n.indent,startOnNewline:!0});if(!v.found)if(v.anchor||v.tag||m)(m==null?void 0:m.type)==="block-seq"?s(v.end,"BAD_INDENT","All sequence items must start at the same column"):s(f,"MISSING_CHAR","Sequence item without - indicator");else{h=v.end,v.comment&&(u.comment=v.comment);continue}const y=m?i(t,m,v,s):e(t,v.end,p,null,v,s);t.schema.compat&&ch(n.indent,m,s),f=y.range[2],u.items.push(y)}return u.range=[n.offset,f,h??f],u}function fl(i,e,t,n){let s="";if(i){let a=!1,l="";for(const u of i){const{source:f,type:h}=u;switch(h){case"space":a=!0;break;case"comment":{t&&!a&&n(u,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const p=f.substring(1)||" ";s?s+=l+p:s=p,l="";break}case"newline":s&&(l+=f),a=!0;break;default:n(u,"UNEXPECTED_TOKEN",`Unexpected ${h} at node end`)}e+=f.length}}return{comment:s,offset:e}}const vd="Block collections are not allowed within flow collections",yd=i=>i&&(i.type==="block-map"||i.type==="block-seq");function OS({composeNode:i,composeEmptyNode:e},t,n,s,a){var _;const l=n.start.source==="{",u=l?"flow map":"flow sequence",f=(a==null?void 0:a.nodeClass)??(l?Ei:Ls),h=new f(t.schema);h.flow=!0;const p=t.atRoot;p&&(t.atRoot=!1),t.atKey&&(t.atKey=!1);let m=n.offset+n.start.source.length;for(let x=0;x<n.items.length;++x){const R=n.items[x],{start:P,key:E,sep:V,value:N}=R,D=Vo(P,{flow:u,indicator:"explicit-key-ind",next:E??(V==null?void 0:V[0]),offset:m,onError:s,parentIndent:n.indent,startOnNewline:!1});if(!D.found){if(!D.anchor&&!D.tag&&!V&&!N){x===0&&D.comma?s(D.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${u}`):x<n.items.length-1&&s(D.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${u}`),D.comment&&(h.comment?h.comment+=`
`+D.comment:h.comment=D.comment),m=D.end;continue}!l&&t.options.strict&&nl(E)&&s(E,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(x===0)D.comma&&s(D.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${u}`);else if(D.comma||s(D.start,"MISSING_CHAR",`Missing , between ${u} items`),D.comment){let B="";e:for(const L of P)switch(L.type){case"comma":case"space":break;case"comment":B=L.source.substring(1);break e;default:break e}if(B){let L=h.items[h.items.length-1];mn(L)&&(L=L.value??L.key),L.comment?L.comment+=`
`+B:L.comment=B,D.comment=D.comment.substring(B.length+1)}}if(!l&&!V&&!D.found){const B=N?i(t,N,D,s):e(t,D.end,V,null,D,s);h.items.push(B),m=B.range[2],yd(N)&&s(B.range,"BLOCK_IN_FLOW",vd)}else{t.atKey=!0;const B=D.end,L=E?i(t,E,D,s):e(t,B,P,null,D,s);yd(E)&&s(L.range,"BLOCK_IN_FLOW",vd),t.atKey=!1;const A=Vo(V??[],{flow:u,indicator:"map-value-ind",next:N,offset:L.range[2],onError:s,parentIndent:n.indent,startOnNewline:!1});if(A.found){if(!l&&!D.found&&t.options.strict){if(V)for(const X of V){if(X===A.found)break;if(X.type==="newline"){s(X,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}D.start<A.found.offset-1024&&s(A.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else N&&("source"in N&&((_=N.source)==null?void 0:_[0])===":"?s(N,"MISSING_CHAR",`Missing space after : in ${u}`):s(A.start,"MISSING_CHAR",`Missing , or : between ${u} items`));const U=N?i(t,N,A,s):A.found?e(t,A.end,V,null,A,s):null;U?yd(N)&&s(U.range,"BLOCK_IN_FLOW",vd):A.comment&&(L.comment?L.comment+=`
`+A.comment:L.comment=A.comment);const q=new Kn(L,U);if(t.options.keepSourceTokens&&(q.srcToken=R),l){const X=h;zy(t,X.items,L)&&s(B,"DUPLICATE_KEY","Map keys must be unique"),X.items.push(q)}else{const X=new Ei(t.schema);X.flow=!0,X.items.push(q);const ne=(U??L).range;X.range=[L.range[0],ne[1],ne[2]],h.items.push(X)}m=U?U.range[2]:A.end}}const v=l?"}":"]",[y,...M]=n.end;let S=m;if((y==null?void 0:y.source)===v)S=y.offset+y.source.length;else{const x=u[0].toUpperCase()+u.substring(1),R=p?`${x} must end with a ${v}`:`${x} in block collection must be sufficiently indented and end with a ${v}`;s(m,p?"MISSING_CHAR":"BAD_INDENT",R),y&&y.source.length!==1&&M.unshift(y)}if(M.length>0){const x=fl(M,S,t.options.strict,s);x.comment&&(h.comment?h.comment+=`
`+x.comment:h.comment=x.comment),h.range=[n.offset,S,x.offset]}else h.range=[n.offset,S,S];return h}function _d(i,e,t,n,s,a){const l=t.type==="block-map"?kS(i,e,t,n,a):t.type==="block-seq"?US(i,e,t,n,a):OS(i,e,t,n,a),u=l.constructor;return s==="!"||s===u.tagName?(l.tag=u.tagName,l):(s&&(l.tag=s),l)}function FS(i,e,t,n,s){var v;const a=n.tag,l=a?e.directives.tagName(a.source,y=>s(a,"TAG_RESOLVE_FAILED",y)):null;if(t.type==="block-seq"){const{anchor:y,newlineAfterProp:M}=n,S=y&&a?y.offset>a.offset?y:a:y??a;S&&(!M||M.offset<S.offset)&&s(S,"MISSING_CHAR","Missing newline after block sequence props")}const u=t.type==="block-map"?"map":t.type==="block-seq"?"seq":t.start.source==="{"?"map":"seq";if(!a||!l||l==="!"||l===Ei.tagName&&u==="map"||l===Ls.tagName&&u==="seq")return _d(i,e,t,s,l);let f=e.schema.tags.find(y=>y.tag===l&&y.collection===u);if(!f){const y=e.schema.knownTags[l];if((y==null?void 0:y.collection)===u)e.schema.tags.push(Object.assign({},y,{default:!1})),f=y;else return y?s(a,"BAD_COLLECTION_TYPE",`${y.tag} used for ${u} collection, but expects ${y.collection??"scalar"}`,!0):s(a,"TAG_RESOLVE_FAILED",`Unresolved tag: ${l}`,!0),_d(i,e,t,s,l)}const h=_d(i,e,t,s,l,f),p=((v=f.resolve)==null?void 0:v.call(f,h,y=>s(a,"TAG_RESOLVE_FAILED",y),e.options))??h,m=pn(p)?p:new It(p);return m.range=h.range,m.tag=l,f!=null&&f.format&&(m.format=f.format),m}function zS(i,e,t){const n=e.offset,s=BS(e,i.options.strict,t);if(!s)return{value:"",type:null,comment:"",range:[n,n,n]};const a=s.mode===">"?It.BLOCK_FOLDED:It.BLOCK_LITERAL,l=e.source?HS(e.source):[];let u=l.length;for(let S=l.length-1;S>=0;--S){const _=l[S][1];if(_===""||_==="\r")u=S;else break}if(u===0){const S=s.chomp==="+"&&l.length>0?`
`.repeat(Math.max(1,l.length-1)):"";let _=n+s.length;return e.source&&(_+=e.source.length),{value:S,type:a,comment:s.comment,range:[n,_,_]}}let f=e.indent+s.indent,h=e.offset+s.length,p=0;for(let S=0;S<u;++S){const[_,x]=l[S];if(x===""||x==="\r")s.indent===0&&_.length>f&&(f=_.length);else{_.length<f&&t(h+_.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),s.indent===0&&(f=_.length),p=S,f===0&&!i.atRoot&&t(h,"BAD_INDENT","Block scalar values in collections must be indented");break}h+=_.length+x.length+1}for(let S=l.length-1;S>=u;--S)l[S][0].length>f&&(u=S+1);let m="",v="",y=!1;for(let S=0;S<p;++S)m+=l[S][0].slice(f)+`
`;for(let S=p;S<u;++S){let[_,x]=l[S];h+=_.length+x.length+1;const R=x[x.length-1]==="\r";if(R&&(x=x.slice(0,-1)),x&&_.length<f){const E=`Block scalar lines must not be less indented than their ${s.indent?"explicit indentation indicator":"first line"}`;t(h-x.length-(R?2:1),"BAD_INDENT",E),_=""}a===It.BLOCK_LITERAL?(m+=v+_.slice(f)+x,v=`
`):_.length>f||x[0]==="	"?(v===" "?v=`
`:!y&&v===`
`&&(v=`

`),m+=v+_.slice(f)+x,v=`
`,y=!0):x===""?v===`
`?m+=`
`:v=`
`:(m+=v+x,v=" ",y=!1)}switch(s.chomp){case"-":break;case"+":for(let S=u;S<l.length;++S)m+=`
`+l[S][0].slice(f);m[m.length-1]!==`
`&&(m+=`
`);break;default:m+=`
`}const M=n+s.length+e.source.length;return{value:m,type:a,comment:s.comment,range:[n,M,M]}}function BS({offset:i,props:e},t,n){if(e[0].type!=="block-scalar-header")return n(e[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:s}=e[0],a=s[0];let l=0,u="",f=-1;for(let v=1;v<s.length;++v){const y=s[v];if(!u&&(y==="-"||y==="+"))u=y;else{const M=Number(y);!l&&M?l=M:f===-1&&(f=i+v)}}f!==-1&&n(f,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${s}`);let h=!1,p="",m=s.length;for(let v=1;v<e.length;++v){const y=e[v];switch(y.type){case"space":h=!0;case"newline":m+=y.source.length;break;case"comment":t&&!h&&n(y,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),m+=y.source.length,p=y.source.substring(1);break;case"error":n(y,"UNEXPECTED_TOKEN",y.message),m+=y.source.length;break;default:{const M=`Unexpected token in block scalar header: ${y.type}`;n(y,"UNEXPECTED_TOKEN",M);const S=y.source;S&&typeof S=="string"&&(m+=S.length)}}}return{mode:a,indent:l,chomp:u,comment:p,length:m}}function HS(i){const e=i.split(/\n( *)/),t=e[0],n=t.match(/^( *)/),a=[n!=null&&n[1]?[n[1],t.slice(n[1].length)]:["",t]];for(let l=1;l<e.length;l+=2)a.push([e[l],e[l+1]]);return a}function VS(i,e,t){const{offset:n,type:s,source:a,end:l}=i;let u,f;const h=(v,y,M)=>t(n+v,y,M);switch(s){case"scalar":u=It.PLAIN,f=GS(a,h);break;case"single-quoted-scalar":u=It.QUOTE_SINGLE,f=WS(a,h);break;case"double-quoted-scalar":u=It.QUOTE_DOUBLE,f=jS(a,h);break;default:return t(i,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${s}`),{value:"",type:null,comment:"",range:[n,n+a.length,n+a.length]}}const p=n+a.length,m=fl(l,p,e,t);return{value:f,type:u,comment:m.comment,range:[n,p,m.offset]}}function GS(i,e){let t="";switch(i[0]){case"	":t="a tab character";break;case",":t="flow indicator character ,";break;case"%":t="directive indicator character %";break;case"|":case">":{t=`block scalar indicator ${i[0]}`;break}case"@":case"`":{t=`reserved character ${i[0]}`;break}}return t&&e(0,"BAD_SCALAR_START",`Plain value cannot start with ${t}`),By(i)}function WS(i,e){return(i[i.length-1]!=="'"||i.length===1)&&e(i.length,"MISSING_CHAR","Missing closing 'quote"),By(i.slice(1,-1)).replace(/''/g,"'")}function By(i){let e,t;try{e=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),t=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{e=/(.*?)[ \t]*\r?\n/sy,t=/[ \t]*(.*?)[ \t]*\r?\n/sy}let n=e.exec(i);if(!n)return i;let s=n[1],a=" ",l=e.lastIndex;for(t.lastIndex=l;n=t.exec(i);)n[1]===""?a===`
`?s+=a:a=`
`:(s+=a+n[1],a=" "),l=t.lastIndex;const u=/[ \t]*(.*)/sy;return u.lastIndex=l,n=u.exec(i),s+a+((n==null?void 0:n[1])??"")}function jS(i,e){let t="";for(let n=1;n<i.length-1;++n){const s=i[n];if(!(s==="\r"&&i[n+1]===`
`))if(s===`
`){const{fold:a,offset:l}=$S(i,n);t+=a,n=l}else if(s==="\\"){let a=i[++n];const l=XS[a];if(l)t+=l;else if(a===`
`)for(a=i[n+1];a===" "||a==="	";)a=i[++n+1];else if(a==="\r"&&i[n+1]===`
`)for(a=i[++n+1];a===" "||a==="	";)a=i[++n+1];else if(a==="x"||a==="u"||a==="U"){const u=a==="x"?2:a==="u"?4:8;t+=qS(i,n+1,u,e),n+=u}else{const u=i.substr(n-1,2);e(n-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${u}`),t+=u}}else if(s===" "||s==="	"){const a=n;let l=i[n+1];for(;l===" "||l==="	";)l=i[++n+1];l!==`
`&&!(l==="\r"&&i[n+2]===`
`)&&(t+=n>a?i.slice(a,n+1):s)}else t+=s}return(i[i.length-1]!=='"'||i.length===1)&&e(i.length,"MISSING_CHAR",'Missing closing "quote'),t}function $S(i,e){let t="",n=i[e+1];for(;(n===" "||n==="	"||n===`
`||n==="\r")&&!(n==="\r"&&i[e+2]!==`
`);)n===`
`&&(t+=`
`),e+=1,n=i[e+1];return t||(t=" "),{fold:t,offset:e}}const XS={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function qS(i,e,t,n){const s=i.substr(e,t),l=s.length===t&&/^[0-9a-fA-F]+$/.test(s)?parseInt(s,16):NaN;try{return String.fromCodePoint(l)}catch{const u=i.substr(e-2,t+2);return n(e-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${u}`),u}}function Hy(i,e,t,n){const{value:s,type:a,comment:l,range:u}=e.type==="block-scalar"?zS(i,e,n):VS(e,i.options.strict,n),f=t?i.directives.tagName(t.source,m=>n(t,"TAG_RESOLVE_FAILED",m)):null;let h;i.options.stringKeys&&i.atKey?h=i.schema[Ji]:f?h=KS(i.schema,s,f,t,n):e.type==="scalar"?h=YS(i,s,e,n):h=i.schema[Ji];let p;try{const m=h.resolve(s,v=>n(t??e,"TAG_RESOLVE_FAILED",v),i.options);p=rn(m)?m:new It(m)}catch(m){const v=m instanceof Error?m.message:String(m);n(t??e,"TAG_RESOLVE_FAILED",v),p=new It(s)}return p.range=u,p.source=s,a&&(p.type=a),f&&(p.tag=f),h.format&&(p.format=h.format),l&&(p.comment=l),p}function KS(i,e,t,n,s){var u;if(t==="!")return i[Ji];const a=[];for(const f of i.tags)if(!f.collection&&f.tag===t)if(f.default&&f.test)a.push(f);else return f;for(const f of a)if((u=f.test)!=null&&u.test(e))return f;const l=i.knownTags[t];return l&&!l.collection?(i.tags.push(Object.assign({},l,{default:!1,test:void 0})),l):(s(n,"TAG_RESOLVE_FAILED",`Unresolved tag: ${t}`,t!=="tag:yaml.org,2002:str"),i[Ji])}function YS({atKey:i,directives:e,schema:t},n,s,a){const l=t.tags.find(u=>{var f;return(u.default===!0||i&&u.default==="key")&&((f=u.test)==null?void 0:f.test(n))})||t[Ji];if(t.compat){const u=t.compat.find(f=>{var h;return f.default&&((h=f.test)==null?void 0:h.test(n))})??t[Ji];if(l.tag!==u.tag){const f=e.tagString(l.tag),h=e.tagString(u.tag),p=`Value may be parsed as either ${f} or ${h}`;a(s,"TAG_RESOLVE_FAILED",p,!0)}}return l}function ZS(i,e,t){if(e){t??(t=e.length);for(let n=t-1;n>=0;--n){let s=e[n];switch(s.type){case"space":case"comment":case"newline":i-=s.source.length;continue}for(s=e[++n];(s==null?void 0:s.type)==="space";)i+=s.source.length,s=e[++n];break}}return i}const JS={composeNode:Vy,composeEmptyNode:Mp};function Vy(i,e,t,n){const s=i.atKey,{spaceBefore:a,comment:l,anchor:u,tag:f}=t;let h,p=!0;switch(e.type){case"alias":h=QS(i,e,n),(u||f)&&n(e,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":h=Hy(i,e,f,n),u&&(h.anchor=u.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{h=FS(JS,i,e,t,n),u&&(h.anchor=u.source.substring(1))}catch(m){const v=m instanceof Error?m.message:String(m);n(e,"RESOURCE_EXHAUSTION",v)}break;default:{const m=e.type==="error"?e.message:`Unsupported token (type: ${e.type})`;n(e,"UNEXPECTED_TOKEN",m),p=!1}}return h??(h=Mp(i,e.offset,void 0,null,t,n)),u&&h.anchor===""&&n(u,"BAD_ALIAS","Anchor cannot be an empty string"),s&&i.options.stringKeys&&(!rn(h)||typeof h.value!="string"||h.tag&&h.tag!=="tag:yaml.org,2002:str")&&n(f??e,"NON_STRING_KEY","With stringKeys, all keys must be strings"),a&&(h.spaceBefore=!0),l&&(e.type==="scalar"&&e.source===""?h.comment=l:h.commentBefore=l),i.options.keepSourceTokens&&p&&(h.srcToken=e),h}function Mp(i,e,t,n,{spaceBefore:s,comment:a,anchor:l,tag:u,end:f},h){const p={type:"scalar",offset:ZS(e,t,n),indent:-1,source:""},m=Hy(i,p,u,h);return l&&(m.anchor=l.source.substring(1),m.anchor===""&&h(l,"BAD_ALIAS","Anchor cannot be an empty string")),s&&(m.spaceBefore=!0),a&&(m.comment=a,m.range[2]=f),m}function QS({options:i},{offset:e,source:t,end:n},s){const a=new up(t.substring(1));a.source===""&&s(e,"BAD_ALIAS","Alias cannot be an empty string"),a.source.endsWith(":")&&s(e+t.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const l=e+t.length,u=fl(n,l,i.strict,s);return a.range=[e,l,u.offset],u.comment&&(a.comment=u.comment),a}function eM(i,e,{offset:t,start:n,value:s,end:a},l){const u=Object.assign({_directives:e},i),f=new wu(void 0,u),h={atKey:!1,atRoot:!0,directives:f.directives,options:f.options,schema:f.schema},p=Vo(n,{indicator:"doc-start",next:s??(a==null?void 0:a[0]),offset:t,onError:l,parentIndent:0,startOnNewline:!0});p.found&&(f.directives.docStart=!0,s&&(s.type==="block-map"||s.type==="block-seq")&&!p.hasNewline&&l(p.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),f.contents=s?Vy(h,s,p,l):Mp(h,p.end,n,null,p,l);const m=f.contents.range[2],v=fl(a,m,!1,l);return v.comment&&(f.comment=v.comment),f.range=[t,m,v.offset],f}function ka(i){if(typeof i=="number")return[i,i+1];if(Array.isArray(i))return i.length===2?i:[i[0],i[1]];const{offset:e,source:t}=i;return[e,e+(typeof t=="string"?t.length:1)]}function Ag(i){var s;let e="",t=!1,n=!1;for(let a=0;a<i.length;++a){const l=i[a];switch(l[0]){case"#":e+=(e===""?"":n?`

`:`
`)+(l.substring(1)||" "),t=!0,n=!1;break;case"%":((s=i[a+1])==null?void 0:s[0])!=="#"&&(a+=1),t=!1;break;default:t||(n=!0),t=!1}}return{comment:e,afterEmptyLine:n}}class tM{constructor(e={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(t,n,s,a)=>{const l=ka(t);a?this.warnings.push(new NS(l,n,s)):this.errors.push(new Ga(l,n,s))},this.directives=new qn({version:e.version||"1.2"}),this.options=e}decorate(e,t){const{comment:n,afterEmptyLine:s}=Ag(this.prelude);if(n){const a=e.contents;if(t)e.comment=e.comment?`${e.comment}
${n}`:n;else if(s||e.directives.docStart||!a)e.commentBefore=n;else if(hn(a)&&!a.flow&&a.items.length>0){let l=a.items[0];mn(l)&&(l=l.key);const u=l.commentBefore;l.commentBefore=u?`${n}
${u}`:n}else{const l=a.commentBefore;a.commentBefore=l?`${n}
${l}`:n}}if(t){for(let a=0;a<this.errors.length;++a)e.errors.push(this.errors[a]);for(let a=0;a<this.warnings.length;++a)e.warnings.push(this.warnings[a])}else e.errors=this.errors,e.warnings=this.warnings;this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Ag(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(e,t=!1,n=-1){for(const s of e)yield*this.next(s);yield*this.end(t,n)}*next(e){switch(e.type){case"directive":this.directives.add(e.source,(t,n,s)=>{const a=ka(e);a[0]+=t,this.onError(a,"BAD_DIRECTIVE",n,s)}),this.prelude.push(e.source),this.atDirectives=!0;break;case"document":{const t=eM(this.options,this.directives,e,this.onError);this.atDirectives&&!t.directives.docStart&&this.onError(e,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(t,!1),this.doc&&(yield this.doc),this.doc=t,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(e.source);break;case"error":{const t=e.source?`${e.message}: ${JSON.stringify(e.source)}`:e.message,n=new Ga(ka(e),"UNEXPECTED_TOKEN",t);this.atDirectives||!this.doc?this.errors.push(n):this.doc.errors.push(n);break}case"doc-end":{if(!this.doc){const n="Unexpected doc-end without preceding document";this.errors.push(new Ga(ka(e),"UNEXPECTED_TOKEN",n));break}this.doc.directives.docEnd=!0;const t=fl(e.end,e.offset+e.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),t.comment){const n=this.doc.comment;this.doc.comment=n?`${n}
${t.comment}`:t.comment}this.doc.range[2]=t.offset;break}default:this.errors.push(new Ga(ka(e),"UNEXPECTED_TOKEN",`Unsupported token ${e.type}`))}}*end(e=!1,t=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(e){const n=Object.assign({_directives:this.directives},this.options),s=new wu(void 0,n);this.atDirectives&&this.onError(t,"MISSING_CHAR","Missing directives-end indicator line"),s.range=[0,t,t],this.decorate(s,!1),yield s}}}const Gy="\uFEFF",Wy="",jy="",uh="";function nM(i){switch(i){case Gy:return"byte-order-mark";case Wy:return"doc-mode";case jy:return"flow-error-end";case uh:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(i[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function Ui(i){switch(i){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const Cg=new Set("0123456789ABCDEFabcdef"),iM=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),_c=new Set(",[]{}"),rM=new Set(` ,[]{}
\r	`),xd=i=>!i||rM.has(i);class sM{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(e,t=!1){if(e){if(typeof e!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+e:e,this.lineEndPos=null}this.atEnd=!t;let n=this.next??"stream";for(;n&&(t||this.hasChars(1));)n=yield*this.parseNext(n)}atLineEnd(){let e=this.pos,t=this.buffer[e];for(;t===" "||t==="	";)t=this.buffer[++e];return!t||t==="#"||t===`
`?!0:t==="\r"?this.buffer[e+1]===`
`:!1}charAt(e){return this.buffer[this.pos+e]}continueScalar(e){let t=this.buffer[e];if(this.indentNext>0){let n=0;for(;t===" ";)t=this.buffer[++n+e];if(t==="\r"){const s=this.buffer[n+e+1];if(s===`
`||!s&&!this.atEnd)return e+n+1}return t===`
`||n>=this.indentNext||!t&&!this.atEnd?e+n:-1}if(t==="-"||t==="."){const n=this.buffer.substr(e,3);if((n==="---"||n==="...")&&Ui(this.buffer[e+3]))return-1}return e}getLine(){let e=this.lineEndPos;return(typeof e!="number"||e!==-1&&e<this.pos)&&(e=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=e),e===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[e-1]==="\r"&&(e-=1),this.buffer.substring(this.pos,e))}hasChars(e){return this.pos+e<=this.buffer.length}setNext(e){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=e,null}peek(e){return this.buffer.substr(this.pos,e)}*parseNext(e){switch(e){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let e=this.getLine();if(e===null)return this.setNext("stream");if(e[0]===Gy&&(yield*this.pushCount(1),e=e.substring(1)),e[0]==="%"){let t=e.length,n=e.indexOf("#");for(;n!==-1;){const a=e[n-1];if(a===" "||a==="	"){t=n-1;break}else n=e.indexOf("#",n+1)}for(;;){const a=e[t-1];if(a===" "||a==="	")t-=1;else break}const s=(yield*this.pushCount(t))+(yield*this.pushSpaces(!0));return yield*this.pushCount(e.length-s),this.pushNewline(),"stream"}if(this.atLineEnd()){const t=yield*this.pushSpaces(!0);return yield*this.pushCount(e.length-t),yield*this.pushNewline(),"stream"}return yield Wy,yield*this.parseLineStart()}*parseLineStart(){const e=this.charAt(0);if(!e&&!this.atEnd)return this.setNext("line-start");if(e==="-"||e==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const t=this.peek(3);if((t==="---"||t==="...")&&Ui(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,t==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!Ui(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[e,t]=this.peek(2);if(!t&&!this.atEnd)return this.setNext("block-start");if((e==="-"||e==="?"||e===":")&&Ui(t)){const n=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=n,"block-start"}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const e=this.getLine();if(e===null)return this.setNext("doc");let t=yield*this.pushIndicators();switch(e[t]){case"#":yield*this.pushCount(e.length-t);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(xd),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return t+=yield*this.parseBlockScalarHeader(),t+=yield*this.pushSpaces(!0),yield*this.pushCount(e.length-t),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let e,t,n=-1;do e=yield*this.pushNewline(),e>0?(t=yield*this.pushSpaces(!1),this.indentValue=n=t):t=0,t+=yield*this.pushSpaces(!0);while(e+t>0);const s=this.getLine();if(s===null)return this.setNext("flow");if((n!==-1&&n<this.indentNext&&s[0]!=="#"||n===0&&(s.startsWith("---")||s.startsWith("..."))&&Ui(s[3]))&&!(n===this.indentNext-1&&this.flowLevel===1&&(s[0]==="]"||s[0]==="}")))return this.flowLevel=0,yield jy,yield*this.parseLineStart();let a=0;for(;s[a]===",";)a+=yield*this.pushCount(1),a+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(a+=yield*this.pushIndicators(),s[a]){case void 0:return"flow";case"#":return yield*this.pushCount(s.length-a),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(xd),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const l=this.charAt(1);if(this.flowKey||Ui(l)||l===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const e=this.charAt(0);let t=this.buffer.indexOf(e,this.pos+1);if(e==="'")for(;t!==-1&&this.buffer[t+1]==="'";)t=this.buffer.indexOf("'",t+2);else for(;t!==-1;){let a=0;for(;this.buffer[t-1-a]==="\\";)a+=1;if(a%2===0)break;t=this.buffer.indexOf('"',t+1)}const n=this.buffer.substring(0,t);let s=n.indexOf(`
`,this.pos);if(s!==-1){for(;s!==-1;){const a=this.continueScalar(s+1);if(a===-1)break;s=n.indexOf(`
`,a)}s!==-1&&(t=s-(n[s-1]==="\r"?2:1))}if(t===-1){if(!this.atEnd)return this.setNext("quoted-scalar");t=this.buffer.length}return yield*this.pushToIndex(t+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let e=this.pos;for(;;){const t=this.buffer[++e];if(t==="+")this.blockScalarKeep=!0;else if(t>"0"&&t<="9")this.blockScalarIndent=Number(t)-1;else if(t!=="-")break}return yield*this.pushUntil(t=>Ui(t)||t==="#")}*parseBlockScalar(){let e=this.pos-1,t=0,n;e:for(let a=this.pos;n=this.buffer[a];++a)switch(n){case" ":t+=1;break;case`
`:e=a,t=0;break;case"\r":{const l=this.buffer[a+1];if(!l&&!this.atEnd)return this.setNext("block-scalar");if(l===`
`)break}default:break e}if(!n&&!this.atEnd)return this.setNext("block-scalar");if(t>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=t:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const a=this.continueScalar(e+1);if(a===-1)break;e=this.buffer.indexOf(`
`,a)}while(e!==-1);if(e===-1){if(!this.atEnd)return this.setNext("block-scalar");e=this.buffer.length}}let s=e+1;for(n=this.buffer[s];n===" ";)n=this.buffer[++s];if(n==="	"){for(;n==="	"||n===" "||n==="\r"||n===`
`;)n=this.buffer[++s];e=s-1}else if(!this.blockScalarKeep)do{let a=e-1,l=this.buffer[a];l==="\r"&&(l=this.buffer[--a]);const u=a;for(;l===" ";)l=this.buffer[--a];if(l===`
`&&a>=this.pos&&a+1+t>u)e=a;else break}while(!0);return yield uh,yield*this.pushToIndex(e+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const e=this.flowLevel>0;let t=this.pos-1,n=this.pos-1,s;for(;s=this.buffer[++n];)if(s===":"){const a=this.buffer[n+1];if(Ui(a)||e&&_c.has(a))break;t=n}else if(Ui(s)){let a=this.buffer[n+1];if(s==="\r"&&(a===`
`?(n+=1,s=`
`,a=this.buffer[n+1]):t=n),a==="#"||e&&_c.has(a))break;if(s===`
`){const l=this.continueScalar(n+1);if(l===-1)break;n=Math.max(n,l-2)}}else{if(e&&_c.has(s))break;t=n}return!s&&!this.atEnd?this.setNext("plain-scalar"):(yield uh,yield*this.pushToIndex(t+1,!0),e?"flow":"doc")}*pushCount(e){return e>0?(yield this.buffer.substr(this.pos,e),this.pos+=e,e):0}*pushToIndex(e,t){const n=this.buffer.slice(this.pos,e);return n?(yield n,this.pos+=n.length,n.length):(t&&(yield""),0)}*pushIndicators(){let e=0;e:for(;;){switch(this.charAt(0)){case"!":e+=yield*this.pushTag(),e+=yield*this.pushSpaces(!0);continue e;case"&":e+=yield*this.pushUntil(xd),e+=yield*this.pushSpaces(!0);continue e;case"-":case"?":case":":{const t=this.flowLevel>0,n=this.charAt(1);if(Ui(n)||t&&_c.has(n)){t?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,e+=yield*this.pushCount(1),e+=yield*this.pushSpaces(!0);continue e}}}break e}return e}*pushTag(){if(this.charAt(1)==="<"){let e=this.pos+2,t=this.buffer[e];for(;!Ui(t)&&t!==">";)t=this.buffer[++e];return yield*this.pushToIndex(t===">"?e+1:e,!1)}else{let e=this.pos+1,t=this.buffer[e];for(;t;)if(iM.has(t))t=this.buffer[++e];else if(t==="%"&&Cg.has(this.buffer[e+1])&&Cg.has(this.buffer[e+2]))t=this.buffer[e+=3];else break;return yield*this.pushToIndex(e,!1)}}*pushNewline(){const e=this.buffer[this.pos];return e===`
`?yield*this.pushCount(1):e==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(e){let t=this.pos-1,n;do n=this.buffer[++t];while(n===" "||e&&n==="	");const s=t-this.pos;return s>0&&(yield this.buffer.substr(this.pos,s),this.pos=t),s}*pushUntil(e){let t=this.pos,n=this.buffer[t];for(;!e(n);)n=this.buffer[++t];return yield*this.pushToIndex(t,!1)}}class oM{constructor(){this.lineStarts=[],this.addNewLine=e=>this.lineStarts.push(e),this.linePos=e=>{let t=0,n=this.lineStarts.length;for(;t<n;){const a=t+n>>1;this.lineStarts[a]<e?t=a+1:n=a}if(this.lineStarts[t]===e)return{line:t+1,col:1};if(t===0)return{line:0,col:e};const s=this.lineStarts[t-1];return{line:t,col:e-s+1}}}}function Yr(i,e){for(let t=0;t<i.length;++t)if(i[t].type===e)return!0;return!1}function Rg(i){for(let e=0;e<i.length;++e)switch(i[e].type){case"space":case"comment":case"newline":break;default:return e}return-1}function $y(i){switch(i==null?void 0:i.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function xc(i){switch(i.type){case"document":return i.start;case"block-map":{const e=i.items[i.items.length-1];return e.sep??e.start}case"block-seq":return i.items[i.items.length-1].start;default:return[]}}function ao(i){var t;if(i.length===0)return[];let e=i.length;e:for(;--e>=0;)switch(i[e].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((t=i[++e])==null?void 0:t.type)==="space";);return i.splice(e,i.length)}function lu(i,e){if(e.length<1e5)Array.prototype.push.apply(i,e);else for(let t=0;t<e.length;++t)i.push(e[t])}function Pg(i){if(i.start.type==="flow-seq-start")for(const e of i.items)e.sep&&!e.value&&!Yr(e.start,"explicit-key-ind")&&!Yr(e.sep,"map-value-ind")&&(e.key&&(e.value=e.key),delete e.key,$y(e.value)?e.value.end?lu(e.value.end,e.sep):e.value.end=e.sep:lu(e.start,e.sep),delete e.sep)}class aM{constructor(e){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new sM,this.onNewLine=e}*parse(e,t=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const n of this.lexer.lex(e,t))yield*this.next(n);t||(yield*this.end())}*next(e){if(this.source=e,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=e.length;return}const t=nM(e);if(t)if(t==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=t,yield*this.step(),t){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+e.length);break;case"space":this.atNewLine&&e[0]===" "&&(this.indent+=e.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=e.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=e.length}else{const n=`Not a YAML token: ${e}`;yield*this.pop({type:"error",offset:this.offset,message:n,source:e}),this.offset+=e.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const e=this.peek(1);if(this.type==="doc-end"&&(e==null?void 0:e.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!e)return yield*this.stream();switch(e.type){case"document":return yield*this.document(e);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(e);case"block-scalar":return yield*this.blockScalar(e);case"block-map":return yield*this.blockMap(e);case"block-seq":return yield*this.blockSequence(e);case"flow-collection":return yield*this.flowCollection(e);case"doc-end":return yield*this.documentEnd(e)}yield*this.pop()}peek(e){return this.stack[this.stack.length-e]}*pop(e){const t=e??this.stack.pop();if(!t)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield t;else{const n=this.peek(1);switch(t.type==="block-scalar"?t.indent="indent"in n?n.indent:0:t.type==="flow-collection"&&n.type==="document"&&(t.indent=0),t.type==="flow-collection"&&Pg(t),n.type){case"document":n.value=t;break;case"block-scalar":n.props.push(t);break;case"block-map":{const s=n.items[n.items.length-1];if(s.value){n.items.push({start:[],key:t,sep:[]}),this.onKeyLine=!0;return}else if(s.sep)s.value=t;else{Object.assign(s,{key:t,sep:[]}),this.onKeyLine=!s.explicitKey;return}break}case"block-seq":{const s=n.items[n.items.length-1];s.value?n.items.push({start:[],value:t}):s.value=t;break}case"flow-collection":{const s=n.items[n.items.length-1];!s||s.value?n.items.push({start:[],key:t,sep:[]}):s.sep?s.value=t:Object.assign(s,{key:t,sep:[]});return}default:yield*this.pop(),yield*this.pop(t)}if((n.type==="document"||n.type==="block-map"||n.type==="block-seq")&&(t.type==="block-map"||t.type==="block-seq")){const s=t.items[t.items.length-1];s&&!s.sep&&!s.value&&s.start.length>0&&Rg(s.start)===-1&&(t.indent===0||s.start.every(a=>a.type!=="comment"||a.indent<t.indent))&&(n.type==="document"?n.end=s.start:n.items.push({start:s.start}),t.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const e={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&e.start.push(this.sourceToken),this.stack.push(e);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(e){if(e.value)return yield*this.lineEnd(e);switch(this.type){case"doc-start":{Rg(e.start)!==-1?(yield*this.pop(),yield*this.step()):e.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":e.start.push(this.sourceToken);return}const t=this.startBlockValue(e);t?this.stack.push(t):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(e){if(this.type==="map-value-ind"){const t=xc(this.peek(2)),n=ao(t);let s;e.end?(s=e.end,s.push(this.sourceToken),delete e.end):s=[this.sourceToken];const a={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:n,key:e,sep:s}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=a}else yield*this.lineEnd(e)}*blockScalar(e){switch(this.type){case"space":case"comment":case"newline":e.props.push(this.sourceToken);return;case"scalar":if(e.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(e){var n;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,t.value){const s="end"in t.value?t.value.end:void 0,a=Array.isArray(s)?s[s.length-1]:void 0;(a==null?void 0:a.type)==="comment"?s==null||s.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else if(t.sep)t.sep.push(this.sourceToken);else{if(this.atIndentedComment(t.start,e.indent)){const s=e.items[e.items.length-2],a=(n=s==null?void 0:s.value)==null?void 0:n.end;if(Array.isArray(a)){lu(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return}if(this.indent>=e.indent){const s=!this.onKeyLine&&this.indent===e.indent,a=s&&(t.sep||t.explicitKey)&&this.type!=="seq-item-ind";let l=[];if(a&&t.sep&&!t.value){const u=[];for(let f=0;f<t.sep.length;++f){const h=t.sep[f];switch(h.type){case"newline":u.push(f);break;case"space":break;case"comment":h.indent>e.indent&&(u.length=0);break;default:u.length=0}}u.length>=2&&(l=t.sep.splice(u[1]))}switch(this.type){case"anchor":case"tag":a||t.value?(l.push(this.sourceToken),e.items.push({start:l}),this.onKeyLine=!0):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"explicit-key-ind":!t.sep&&!t.explicitKey?(t.start.push(this.sourceToken),t.explicitKey=!0):a||t.value?(l.push(this.sourceToken),e.items.push({start:l,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(t.explicitKey)if(t.sep)if(t.value)e.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Yr(t.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:l,key:null,sep:[this.sourceToken]}]});else if($y(t.key)&&!Yr(t.sep,"newline")){const u=ao(t.start),f=t.key,h=t.sep;h.push(this.sourceToken),delete t.key,delete t.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:u,key:f,sep:h}]})}else l.length>0?t.sep=t.sep.concat(l,this.sourceToken):t.sep.push(this.sourceToken);else if(Yr(t.start,"newline"))Object.assign(t,{key:null,sep:[this.sourceToken]});else{const u=ao(t.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:u,key:null,sep:[this.sourceToken]}]})}else t.sep?t.value||a?e.items.push({start:l,key:null,sep:[this.sourceToken]}):Yr(t.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const u=this.flowScalar(this.type);a||t.value?(e.items.push({start:l,key:u,sep:[]}),this.onKeyLine=!0):t.sep?this.stack.push(u):(Object.assign(t,{key:u,sep:[]}),this.onKeyLine=!0);return}default:{const u=this.startBlockValue(e);if(u){if(u.type==="block-seq"){if(!t.explicitKey&&t.sep&&!Yr(t.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else s&&e.items.push({start:l});this.stack.push(u);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(e){var n;const t=e.items[e.items.length-1];switch(this.type){case"newline":if(t.value){const s="end"in t.value?t.value.end:void 0,a=Array.isArray(s)?s[s.length-1]:void 0;(a==null?void 0:a.type)==="comment"?s==null||s.push(this.sourceToken):e.items.push({start:[this.sourceToken]})}else t.start.push(this.sourceToken);return;case"space":case"comment":if(t.value)e.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(t.start,e.indent)){const s=e.items[e.items.length-2],a=(n=s==null?void 0:s.value)==null?void 0:n.end;if(Array.isArray(a)){lu(a,t.start),a.push(this.sourceToken),e.items.pop();return}}t.start.push(this.sourceToken)}return;case"anchor":case"tag":if(t.value||this.indent<=e.indent)break;t.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==e.indent)break;t.value||Yr(t.start,"seq-item-ind")?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return}if(this.indent>e.indent){const s=this.startBlockValue(e);if(s){this.stack.push(s);return}}yield*this.pop(),yield*this.step()}*flowCollection(e){const t=e.items[e.items.length-1];if(this.type==="flow-error-end"){let n;do yield*this.pop(),n=this.peek(1);while((n==null?void 0:n.type)==="flow-collection")}else if(e.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!t||t.sep?e.items.push({start:[this.sourceToken]}):t.start.push(this.sourceToken);return;case"map-value-ind":!t||t.value?e.items.push({start:[],key:null,sep:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):Object.assign(t,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!t||t.value?e.items.push({start:[this.sourceToken]}):t.sep?t.sep.push(this.sourceToken):t.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const s=this.flowScalar(this.type);!t||t.value?e.items.push({start:[],key:s,sep:[]}):t.sep?this.stack.push(s):Object.assign(t,{key:s,sep:[]});return}case"flow-map-end":case"flow-seq-end":e.end.push(this.sourceToken);return}const n=this.startBlockValue(e);n?this.stack.push(n):(yield*this.pop(),yield*this.step())}else{const n=this.peek(2);if(n.type==="block-map"&&(this.type==="map-value-ind"&&n.indent===e.indent||this.type==="newline"&&!n.items[n.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&n.type!=="flow-collection"){const s=xc(n),a=ao(s);Pg(e);const l=e.end.splice(1,e.end.length);l.push(this.sourceToken);const u={type:"block-map",offset:e.offset,indent:e.indent,items:[{start:a,key:e,sep:l}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=u}else yield*this.lineEnd(e)}}flowScalar(e){if(this.onNewLine){let t=this.source.indexOf(`
`)+1;for(;t!==0;)this.onNewLine(this.offset+t),t=this.source.indexOf(`
`,t)+1}return{type:e,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(e){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const t=xc(e),n=ao(t);return n.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:n,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const t=xc(e),n=ao(t);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:n,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(e,t){return this.type!=="comment"||this.indent<=t?!1:e.every(n=>n.type==="newline"||n.type==="space")}*documentEnd(e){this.type!=="doc-mode"&&(e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(e){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:e.end?e.end.push(this.sourceToken):e.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function lM(i){const e=i.prettyErrors!==!1;return{lineCounter:i.lineCounter||e&&new oM||null,prettyErrors:e}}function cM(i,e={}){const{lineCounter:t,prettyErrors:n}=lM(e),s=new aM(t==null?void 0:t.addNewLine),a=new tM(e);let l=null;for(const u of a.compose(s.parse(i),!0,i.length))if(!l)l=u;else if(l.options.logLevel!=="silent"){l.errors.push(new Ga(u.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return n&&t&&(l.errors.forEach(bg(i,t)),l.warnings.forEach(bg(i,t))),l}function uM(i,e,t){let n;const s=cM(i,t);if(!s)return null;if(s.warnings.forEach(a=>yy(s.options.logLevel,a)),s.errors.length>0){if(s.options.logLevel!=="silent")throw s.errors[0];s.errors=[]}return s.toJS(Object.assign({reviver:n},t))}const fM=Object.assign({"../../knowledge/archetypes.yaml":R1,"../../knowledge/connectors/anchor-30.yaml":P1,"../../knowledge/connectors/corner-bracket-30.yaml":L1,"../../knowledge/connectors/corner-cube-20.yaml":I1,"../../knowledge/connectors/internal-30.yaml":D1,"../../knowledge/connectors/internal-slot-20.yaml":N1,"../../knowledge/connectors/screw-joint-30.yaml":k1,"../../knowledge/connectors/three-way-30.yaml":U1,"../../knowledge/connectors/vertical-bracket-20.yaml":O1,"../../knowledge/fasteners.yaml":F1,"../../knowledge/materials.yaml":z1,"../../knowledge/panels.yaml":B1,"../../knowledge/rules/assembly.yaml":H1,"../../knowledge/rules/cam.yaml":V1,"../../knowledge/rules/connection.yaml":G1,"../../knowledge/rules/material-interface.yaml":W1,"../../knowledge/rules/pricing.yaml":j1,"../../knowledge/rules/selection.yaml":$1,"../../knowledge/rules/tolerance.yaml":X1,"../../knowledge/rules/validation.yaml":q1,"../../knowledge/sections/eu-2020.yaml":K1,"../../knowledge/sections/eu-2040.yaml":Y1,"../../knowledge/sections/eu-3030.yaml":Z1,"../../knowledge/sections/eu-4040-s8.yaml":J1,"../../knowledge/tests/golden.yaml":Q1,"../../knowledge/tests/m5-native.yaml":eS});function dM(){const i={sections:[],connectors:[],rules:{},tests:{},materials:{},panels:{},fasteners:{},archetypes:{}};for(const[e,t]of Object.entries(fM)){const n=uM(t);if(e.includes("/sections/"))i.sections.push(n);else if(e.includes("/connectors/"))i.connectors.push(n);else if(e.includes("/rules/")){const s=e.split("/").pop().replace(".yaml","");i.rules[s]=n}else if(e.includes("/tests/")){const s=e.split("/").pop().replace(".yaml","");i.tests[s]=n}else e.endsWith("materials.yaml")?i.materials=n:e.endsWith("panels.yaml")?i.panels=n.panels:e.endsWith("fasteners.yaml")?i.fasteners=n.fasteners:e.endsWith("archetypes.yaml")&&(i.archetypes=n.archetypes)}return i.sections.sort((e,t)=>e.section.series-t.section.series),i}function hM(i,e){var z,ee,F,Y,Ce,K,ce,we,xe,Ie,Oe,Ge,Ke,ye,Le,W;const t=[],{spec:n,members:s}=i,a=e.sections.find(le=>le.section.id===n.sectionId).section,l=((z=n.beamSectionId?e.sections.find(le=>le.section.id===n.beamSectionId):void 0)==null?void 0:z.section)??a,u=l.size[1],f=e.connectors.find(le=>le.connector.id===n.connectorId).connector,h=a.mechanics.elasticModulus,p=l.mechanics.momentOfInertia.ix,m=e.rules.validation,v=((ee=m==null?void 0:m.deflectionLimits)==null?void 0:ee[n.scene])??"L/300",y=Number(v.split("/")[1]??300),M=n.highRisk?2:1,S=n.mobility==="caster"?2.5:1,_=n.loadKg*9.81*M*S;n.highRisk&&t.push({level:"info",ruleId:"val-003",message:"高风险场景：设计载荷已按安全系数 2.0 放大，挠度校验强制执行"}),n.mobility==="caster"&&t.push({level:"info",ruleId:"con-005",message:"脚轮工况：设计载荷已按冲击系数 2.5 放大"});const x=n.workbenchDeskTopHeightMm??Math.min(n.height,740),R=n.scene==="workbench"?i.panels.filter(le=>le.mode==="shelf-overlap"||le.mode==="top-inset").sort((le,Ee)=>{const Ue=le.position[1]+le.boxSize[1]/2,Pe=Ee.position[1]+Ee.boxSize[1]/2;return Math.abs(Ue-x)-Math.abs(Pe-x)})[0]:void 0,P=R?R.mode==="top-inset"?n.height-u/2:R.position[1]-R.boxSize[1]/2-u/2:n.height-u/2,E=s.filter(le=>le.role!=="post"&&Math.abs(le.position[1]-P)<1),V=E.reduce((le,Ee)=>Ee.length>le.length?Ee:le,E[0]);if(V){const le=V.length,Ee=_/2,Ue=n.loadType==="concentrated"?Ee*le**3/(48*h*p):5*(Ee/le)*le**4/(384*h*p),Pe=le/y,Je=E.filter(ze=>ze.length===le).map(ze=>ze.id);Ue>Pe?t.push({level:"error",ruleId:"val-002",memberIds:Je,message:`挠度超限：估算 ${Ue.toFixed(2)}mm > 允许 ${Pe.toFixed(2)}mm（${n.scene} 档 L/${y}）。建议升级截面、缩短跨度或加中柱`}):Ue>Pe*.7?t.push({level:"warn",ruleId:"val-002",memberIds:Je,message:`挠度接近限值：估算 ${Ue.toFixed(2)}mm / 允许 ${Pe.toFixed(2)}mm（余量不足30%）`}):t.push({level:"pass",ruleId:"val-002",message:`挠度校验通过：${Ue.toFixed(2)}mm ≤ ${Pe.toFixed(2)}mm（L/${y}）`})}const N=s.filter(le=>le.role==="post");if(n.height>=800&&N.length>0){const Ue=Math.PI**2*h*p/(1*n.height)**2/3,Pe=_/N.length;Pe>Ue?t.push({level:"error",ruleId:"val-004",memberIds:N.map(Je=>Je.id),message:`立柱屈曲风险：单柱载荷 ${(Pe/9.81).toFixed(0)}kg > 允许 ${(Ue/9.81).toFixed(0)}kg（Pcr/3）。建议升级截面或加横撑`}):t.push({level:"pass",ruleId:"val-004",message:`屈曲校验通过：单柱 ${(Pe/9.81).toFixed(0)}kg ≤ 允许 ${(Ue/9.81).toFixed(0)}kg`})}if(n.height>2e3&&t.push({level:"warn",ruleId:"val-postband",message:`高度 ${n.height}mm 超过 2000mm（行家档位）：建议中部加一圈横撑降低屈曲有效长度；当前隔板层横梁可兼作横撑，但层间距>1200mm 时仍需补撑`}),n.scene==="workbench"){const le=e.archetypes["computer-desk"],Ee=((F=le==null?void 0:le.overallHeightMm)==null?void 0:F.hutchMin)??1100,Ue=((Y=le==null?void 0:le.overallHeightMm)==null?void 0:Y.hutchMax)??1800,Pe=((Ce=le==null?void 0:le.deskTopHeightMm)==null?void 0:Ce.min)??680,Je=((K=le==null?void 0:le.deskTopHeightMm)==null?void 0:K.max)??800,ze=n.height>=Pe&&n.height<=Je;!ze&&(n.height<Ee||n.height>Ue)&&t.push({level:"warn",ruleId:"val-workbench-height",message:`电脑桌合理总高：纯桌面 ${Pe}~${Je}mm 或带上架 ${Ee}~${Ue}mm，当前 ${n.height}mm 偏离常用区间；请确认是否仍是电脑桌语义`});const H=((ce=le==null?void 0:le.deskTopHeightMm)==null?void 0:ce.min)??680,T=((we=le==null?void 0:le.deskTopHeightMm)==null?void 0:we.max)??800;!ze&&((n.workbenchDeskTopHeightMm??740)<H||(n.workbenchDeskTopHeightMm??740)>T)&&t.push({level:"warn",ruleId:"val-workbench-desk-top",message:`主桌面高度建议 ${H}~${T}mm，当前 ${n.workbenchDeskTopHeightMm??740}mm 可能影响坐姿与键鼠操作舒适度`});const G=((xe=le==null?void 0:le.depthMm)==null?void 0:xe.min)??550;n.depth<G&&t.push({level:"warn",ruleId:"val-workbench-depth",message:`桌面深度 ${n.depth}mm < ${G}mm：显示器距离过近伤眼、键盘无处安放（真实电脑桌深度≥550，舒适线600）`}),(n.bottomPanel!=="none"||n.doorPanel!=="none"||n.backPanel!=="none"&&n.backPanel!=="pegboard"||n.leftPanel!=="none"||n.rightPanel!=="none")&&t.push({level:"warn",ruleId:"val-workbench-topology",message:"当前为工作台场景但存在底板/门板/全高侧背板，形态更接近柜体；若目标是电脑桌，建议保持开放式拓扑"})}if(n.archetype==="storage-rack"){const le=e.archetypes["storage-rack"],Ee=((Ie=le==null?void 0:le.overallHeightMm)==null?void 0:Ie.max)??2e3;n.height>1600&&n.mobility!=="caster"&&t.push({level:"warn",ruleId:"val-rack-tipover",message:`落地置物架高 ${n.height}mm > 1600mm：建议上墙固定防倾倒（真实档位：常见 1500~1800，上限 ${Ee}）`});const Ue=((Oe=le==null?void 0:le.depthMm)==null?void 0:Oe.max)??600;n.depth>Ue&&t.push({level:"info",ruleId:"val-rack-depth",message:`置物架深度 ${n.depth}mm 超过常见上限 ${Ue}mm：里侧物品难以取放，建议分两排或减深`})}if(n.archetype==="wardrobe"){const le=e.archetypes.wardrobe,Ee=((Ge=le==null?void 0:le.depthMm)==null?void 0:Ge.min)??550,Ue=((Ke=le==null?void 0:le.depthMm)==null?void 0:Ke.max)??630;(n.depth<Ee||n.depth>Ue)&&t.push({level:"warn",ruleId:"val-wardrobe-depth",message:`衣柜深度建议 ${Ee}~${Ue}mm（<${Ee} 厚外套挂不下，>${Ue} 浪费空间），当前 ${n.depth}mm`})}if(n.archetype==="aquarium-stand"){const le=e.archetypes["aquarium-stand"],Ee=(le==null?void 0:le.loadFactorVsWater)??1.5,Ue=(le==null?void 0:le.minHouseholdKg)??200;t.push({level:"warn",ruleId:"val-aquarium-load",message:`鱼缸架承重必须≥满水总重×${Ee}（含缸体/底砂/造景）；家用通常≥${Ue}kg，当前设计载荷 ${n.loadKg}kg，请确认已按满水状态核算，禁止点状支撑`});const Pe=((ye=le==null?void 0:le.standHeightMm)==null?void 0:ye.min)??700,Je=((Le=le==null?void 0:le.standHeightMm)==null?void 0:Le.max)??900;(n.height<Pe||n.height>Je)&&t.push({level:"info",ruleId:"val-aquarium-height",message:`鱼缸底架常见高度 ${Pe}~${Je}mm（含缸总高宜 1200~1400），当前 ${n.height}mm`})}const D=n.brace,B=le=>le!=="none"&&le!=="wire-mesh",L=B(n.backPanel)||B(n.leftPanel)||B(n.rightPanel),A=n.height/n.width,U=n.height/n.depth,q=[];n.height>1e3&&q.push("高度>1000mm"),(A>3||U>3)&&q.push(`高宽比${Math.max(A,U).toFixed(1)}>3`),n.mobility==="caster"&&q.push("脚轮工况"),n.vibration&&q.push("设备振动工况"),q.length>0&&!D&&!L?t.push({level:"warn",ruleId:"val-005",message:`建议加斜撑/背板：${q.join("、")}。晃不是型材不够强，是整体抗剪不足`}):q.length>0&&t.push({level:"pass",ruleId:"val-005",message:`斜撑触发条件存在（${q.join("、")}），已配置${D?"背面斜撑":""}${D&&L?"+":""}${L?"侧围板抗剪":""}`});const X=n.loadType==="concentrated"?.75:1,ne={"eu-2020":le=>le<=10?800:le<=20?600:0,"eu-3030":le=>le<=50?1e3:le<=80?800:0,"eu-4040-s8":()=>1500},he=Math.max(...s.filter(le=>le.role!=="post").map(le=>le.length)),ae=n.loadKg*M*S,Me=(((W=ne[a.id])==null?void 0:W.call(ne,ae))??0)*X;Me===0?t.push({level:"error",ruleId:"val-001",message:`${a.name} 不适用于 ${ae.toFixed(0)}kg 设计载荷（超出选型规则上限），建议升级截面`}):he>Me&&t.push({level:"warn",ruleId:"val-001",message:`跨度 ${he}mm 超出 ${a.name} 在 ${ae.toFixed(0)}kg 下的建议值 ${Me.toFixed(0)}mm（sel 规则），建议升级或加中柱`}),f.loadRole==="positioning-aesthetic"&&t.push({level:"error",ruleId:"val-006",message:`${f.name} 仅限定位/外观用途，禁止单独主承重。建议改用角码/锚式/端攻，或与角码组合（con-006）`}),ae>50&&f.strengthClass<=2&&t.push({level:"warn",ruleId:"val-008",message:`设计载荷 ${ae.toFixed(0)}kg 较大而连接件强度等级仅 ${f.strengthClass}/5，建议升级连接方式`});const $=n.height>800||n.height/Math.min(n.width,n.depth)>2;D||L?t.push({level:"pass",ruleId:"val-lateral",message:`已有抗侧向体系（${[D?"背面斜撑":"",L?"侧围板":""].filter(Boolean).join("+")}），侧向刚度显著改善`}):t.push({level:$?"warn":"info",ruleId:"val-lateral",message:$?"侧向稳定性未验证：无斜撑/背板体系，竖向校验通过不代表不会晃。可勾选背面斜撑或添加侧围板":"侧向稳定性未验证（矮框架风险较低）：本版本仅校验竖向挠度/屈曲"});for(const le of i.panels)le.material==="glass"&&t.push({level:"warn",ruleId:"mat-glass",message:`玻璃板（${le.size[0]}×${le.size[1]}）必须钢化+边缘倒角，嵌槽加 EPDM 胶条，禁止直接压铝槽——风险最大的板材`}),le.material==="acrylic"&&Math.max(le.size[0],le.size[1])>500&&t.push({level:"info",ruleId:"mat-acrylic",message:`亚克力板跨度 ${Math.max(le.size[0],le.size[1]).toFixed(0)}mm > 500：已留 1.5mm 热胀间隙（锁死会开裂/鼓包）`}),le.material==="wood"&&t.push({level:"info",ruleId:"mat-wood",message:"木板吸湿胀缩：已按浮动安装预留间隙，禁止四边完全锁死"});return t}function pM(i,e){var Ot,gn;const t=[],n=e.sections.find(b=>b.section.id===i.sectionId);if(!n)throw new Error(`知识库中不存在截面 ${i.sectionId}`);const s=n.section,a=s.size[0],l=i.beamSectionId?e.sections.find(b=>b.section.id===i.beamSectionId):n;if(!l)throw new Error(`知识库中不存在梁截面 ${i.beamSectionId}`);const u=l.section;if(u.size[0]!==a)throw new Error(`梁截面宽 ${u.size[0]}mm 必须等于立柱宽 ${a}mm（槽对齐约束）`);const h=(u.size[1]-a)/2;if(h>0&&((i.drawerCount??0)>0||i.centerColumn))throw new Error("矩形梁（2040）暂不支持抽屉塔/中柱分区组合：内部结构 y 基准待扩展（诚实降级）");const p=e.connectors.find(b=>b.connector.id===i.connectorId);if(!p)throw new Error(`知识库中不存在连接件 ${i.connectorId}`);const m=p.connector,v=!m.compatible.series.includes(s.id)||!m.compatible.slotWidths.includes(s.slot.width);m.loadRole==="positioning-aesthetic"&&t.push(`${m.name} 仅限定位/外观用途，禁止单独主承重（行家规则 val-006）`);const{width:y,depth:M,height:S}=i;if(![y,M,S,i.loadKg].every(Number.isFinite))throw new Error("尺寸与载荷必须是有限数值");if(!Number.isFinite(i.shelfCount)||i.workbenchDeskTopHeightMm!=null&&!Number.isFinite(i.workbenchDeskTopHeightMm)||i.workbenchUpperShelfDepthRatio!=null&&!Number.isFinite(i.workbenchUpperShelfDepthRatio))throw new Error("层数与工作台人体工学参数必须是有限数值");if(y<=0||M<=0||S<=0)throw new Error("宽、深、高必须大于 0");if(i.scene==="workbench"&&M<500)throw new Error("电脑桌/工作桌深度至少需要 500mm（显示器桌推荐 600~700）");const _=i.scene==="workbench"&&S<=800;if(i.scene==="workbench"&&!_&&S<1100)throw new Error("电脑桌总高 801~1099mm 既不符合纯桌面，也不足以容纳上架");const x=y-2*a+2*m.lengthOffset,R=M-2*a+2*m.lengthOffset;if(x<=0||R<=0)throw new Error("总尺寸过小，扣除立柱截面后梁长为负");const P=[],E=[],V=[],N=[],D=[],B=e.panels;let L=0,A=0,U=0,q=0;const X=b=>P.push({id:`m-${++L}`,...b}),ne=b=>E.push({id:`j-${++A}`,connectorId:m.id,...b}),he=(b,k,Z)=>Math.min(Z,Math.max(k,b)),ae=(()=>{const b=Math.floor(i.scene==="workbench"?Math.max(1,i.shelfCount):Math.max(0,i.shelfCount));if(b<=0)return[];if(i.scene!=="workbench")return Array.from({length:b},(ot,rt)=>S*(rt+1)/(b+1));const k=_&&i.topPanel!=="none"?i.topPanel:i.shelfPanel!=="none"?i.shelfPanel:"wood",Z=B[k].thickness,ie=_?S:Math.min(800,Math.max(680,i.workbenchDeskTopHeightMm??740)),de=Math.min(_?S-a/2:S-a-90,Math.max(a+60,_?S-a/2:ie-(a/2+Z)));if(_)return[de];if(b===1)return[de];const Ne=b-1,Se=de+240,qe=S-a-90;if(Ne>0&&qe-de<Ne*170)throw new Error(`总高 ${S}mm 无法容纳 ${b} 层桌面/搁板（层间净距至少 170mm）`);const at=Array.from({length:Ne},(ot,rt)=>{const vt=(rt+1)/(Ne+1);return Se+(qe-Se)*vt}).map(ot=>Math.min(S-a-70,Math.max(de+170,ot)));return[de,...at]})(),Me=[a/2,S-a/2,...ae],$=new Map,z=new Set,ee=(b,k,Z,ie)=>{if(!Number.isFinite(Z)||!Number.isFinite(ie)||ie<=Z)throw new Error(`立柱高度无效：${Z}~${ie}mm`);X({role:"post",sectionId:s.id,length:ie-Z,position:[b,(Z+ie)/2,k],axis:"y"});const de=`m-${L}`;$.set(`${b},${k}`,de),Z===0&&z.add(de)},F=-y/2+a/2,Y=y/2-a/2,Ce=-M/2+a/2,K=M/2-a/2,ce=he(i.workbenchUpperShelfDepthRatio??.55,.35,.95),we=Math.min(M,Math.max(180,Math.round(M*ce))),xe=-M/2+we-a/2;if(i.scene==="workbench"&&_)ee(F,Ce,0,S),ee(Y,Ce,0,S),ee(F,K,0,S),ee(Y,K,0,S);else if(i.scene==="workbench"){const b=ae[0];ee(F,Ce,0,S),ee(Y,Ce,0,S),ee(F,K,0,b+a/2),ee(Y,K,0,b+a/2),ee(F,xe,b+a/2,S),ee(Y,xe,b+a/2,S)}else for(const[b,k]of[[F,Ce],[Y,Ce],[F,K],[Y,K]])ee(b,k,0,S);const Ie=[],Oe=i.centerColumn&&i.topPanel!=="none"&&i.topPanelMode==="recessed"?B[i.topPanel].thickness:0,Ge=S-Oe-a/2;let Ke=null;if(i.centerColumn){const b=y-2*a;Ke=-y/2+a+b*i.centerColumn.offsetRatio;const k=Ge-a/2;ee(Ke,Ce,0,k),ee(Ke,K,0,k)}const ye=(b,k,Z=0,ie)=>{const de=b<=a?1:-1,Ne=b+(de===1?h:-h),Se=k-2*a+2*m.lengthOffset,qe=Z-k/2+a/2,at=Z+k/2-a/2,ot=((ie==null?void 0:ie.split)??!0)&&!!i.centerColumn&&Ke!=null;for(const rt of[qe,at])if(ot&&Ke!=null){const vt=Ke-F-a+2*m.lengthOffset,Lt=(F+Ke)/2;X({role:"beam-x",sectionId:u.id,length:vt,position:[Lt,Ne,rt],axis:"x"});const Pt=`m-${L}`;for(const ue of[1,-1]){const pe=ue===-1?F:Ke,se=$.get(`${pe},${rt}`),Ve=ue===-1?-(y/2-a):Ke-a/2;ne({position:[Ve,Ne,rt],beamAxis:"x",outward:ue,ySide:de,beamMemberId:Pt,postMemberId:se})}const wt=Y-Ke-a+2*m.lengthOffset,I=(Ke+Y)/2;X({role:"beam-x",sectionId:u.id,length:wt,position:[I,Ne,rt],axis:"x"});const re=`m-${L}`;for(const ue of[1,-1]){const pe=ue===1?Y:Ke,se=$.get(`${pe},${rt}`),Ve=ue===1?y/2-a:Ke+a/2;ne({position:[Ve,Ne,rt],beamAxis:"x",outward:ue,ySide:de,beamMemberId:re,postMemberId:se})}}else{X({role:"beam-x",sectionId:u.id,length:x,position:[0,Ne,rt],axis:"x"});const vt=`m-${L}`;for(const Lt of[1,-1]){const Pt=$.get(`${Lt*(y/2-a/2)},${rt}`);ne({position:[Lt*(y/2-a),Ne,rt],beamAxis:"x",outward:Lt,ySide:de,beamMemberId:vt,postMemberId:Pt})}}for(const rt of[F,Y]){X({role:"beam-z",sectionId:u.id,length:Se,position:[rt,Ne,Z],axis:"z"});const vt=`m-${L}`;for(const Lt of[1,-1]){const Pt=Lt===-1?qe:at,wt=$.get(`${rt},${Pt}`);ne({position:[rt,Ne,Z+Lt*(k/2-a)],beamAxis:"z",outward:Lt,ySide:de,beamMemberId:vt,postMemberId:wt})}}};if(i.scene==="workbench"&&_){ye(S-a/2,M);const b=Math.min(120,S/4);for(const k of[Ce,K]){X({role:"beam-x",sectionId:s.id,length:x,position:[0,b,k],axis:"x"});const Z=`m-${L}`;for(const ie of[1,-1])ne({position:[ie*(y/2-a),b,k],beamAxis:"x",outward:ie,ySide:1,beamMemberId:Z,postMemberId:$.get(`${ie*(y/2-a/2)},${k}`)})}y>1200&&(X({role:"beam-z",sectionId:s.id,length:M-2*a,position:[0,S-a/2,0],axis:"z"}),N.push({id:`mt-${++q}`,targetType:"member",targetId:`m-${L}`,method:"t-nut-screw",note:"顶框中横梁：角码两端固定于长梁内侧（跨度>1200 防桌板下挠）",fasteners:[{sku:"corner-bracket-30-body",qty:2},{sku:"t-nut-m6",qty:4},{sku:"bolt-m6-l16",qty:4}],points:[[0,S-a/2,-M/2+a],[0,S-a/2,M/2-a]]}))}else if(i.scene==="workbench"){X({role:"beam-x",sectionId:s.id,length:x,position:[0,a/2,Ce],axis:"x"});const b=`m-${L}`;for(const Z of[1,-1])ne({position:[Z*(y/2-a),a/2,Ce],beamAxis:"x",outward:Z,ySide:1,beamMemberId:b,postMemberId:$.get(`${Z*(y/2-a/2)},${Ce}`)});ye(ae[0],M);const k=-M/2+we/2;for(const Z of ae.slice(1))ye(Z,we,k);ye(S-a/2,we,k)}else{const b=S-a/2;for(const k of Me)i.centerColumn&&k===b?ye(Ge,M,0,{split:!1}):ye(k,M)}const Le=Math.floor(i.drawerCount??0);if(i.drawerCount!=null&&!Number.isFinite(i.drawerCount))throw new Error("抽屉层数必须是有限数值");if(Le>0&&i.scene!=="workbench"&&!i.centerColumn){const b=(S-2*a)/Le;if(b<120)throw new Error(`总高 ${S}mm 装不下 ${Le} 层抽屉（节距 ${Math.round(b)} < 120mm；案例档位 160~230）`);for(let k=0;k<Le;k++){const Z=a+k*b+20;for(const ie of[F,Y])X({role:"beam-z",sectionId:s.id,length:R,position:[ie,Z,0],axis:"z"}),N.push({id:`mt-${++q}`,targetType:"member",targetId:`m-${L}`,method:"t-nut-screw",note:"抽屉轨道梁：角码两端固定于前后柱（案例实证 角码×2/梁）",fasteners:[{sku:"corner-bracket-30-body",qty:2},{sku:"t-nut-m6",qty:4},{sku:"bolt-m6-l16",qty:4}],points:[[ie,Z,Ce],[ie,Z,K]]});Ie.push({y:Z,pitch:b,colWidth:y-2*a,xCenter:0})}}const W=a>=30?"shelf-support-30":"shelf-support-20",le=b=>{switch(b){case"gasket-clamp":return[{sku:"epdm-gasket-pad",qty:4},{sku:"clamp-strip-200",qty:4}];case"shelf-support":return[{sku:W,qty:4},{sku:"selftap-m4-10",qty:8}];case"corner-flat":return[{sku:"flat-corner-plate",qty:4},{sku:"screw-m4-10-pan",qty:8},{sku:"t-nut-m4",qty:8}];default:return[{sku:"t-nut-m6",qty:4},{sku:"bolt-m6-l16",qty:4}]}},Ee=(b,k,Z,ie)=>{if(b==="none")return;const de=B[b],Ne=15,Se=Z&&i.topPanelMode==="recessed",qe=St=>St!=="none"?B[St].thickness:0,at=Z&&!Se&&i.scene!=="workbench",ot=at?qe(i.leftPanel):0,rt=at?qe(i.rightPanel):0,vt=at?qe(i.backPanel):0,Lt=he((ie==null?void 0:ie.depthRatio)??1,.35,1),Pt=Z&&!Se?M:M-2*a+2*Ne,wt=Z&&!Se?y+ot+rt:Se?y-2*a:y-2*a+2*Ne,I=Se?M-2*a:Z&&i.scene!=="workbench"?M+vt:Math.min(Pt,Math.max(Math.round(Pt*Lt),Math.round(Ne+120))),re=(rt-ot)/2,ue=(()=>{if(vt)return-vt/2;const St=Math.max(0,Pt-I);return(ie==null?void 0:ie.align)==="back"?-St/2:(ie==null?void 0:ie.align)==="front"?St/2:0})();if(wt<=0||I<=0)return;const pe=`pn-${++U}`,se=Z?a/2:Ne/2,Ve=de.mount==="t-nut-screw"||de.mount==="corner-flat"?[[se,se],[wt-se,se],[se,I-se],[wt-se,I-se]].map(([St,At])=>({x:St,y:At,diameter:de.holeDiameter})):[];V.push({id:pe,material:b,size:[wt,I,de.thickness],boxSize:[wt,de.thickness,I],position:[re,k+de.thickness/2,ue],mode:Se?"top-recessed":Z?"top-overlay":"shelf-overlap",mountNote:(Se?"顶部置物板(凹陷嵌框内)：":Z?"顶部置物板：":"隔板(搭梁式)：")+de.mountNote+(ot+rt+vt>0?"；盖住侧/背板顶端面，接缝封边条或密封胶处理":"")+(I<Pt?`；浅搁板深度 ${Math.round(I/Pt*100)}%`:""),holes:Ve});const Be=wt/2-se,ct=I/2-se,ut=[[-Be,k,ue-ct],[Be,k,ue-ct],[-Be,k,ue+ct],[Be,k,ue+ct]];N.push({id:`mt-${++q}`,targetType:"panel",targetId:pe,method:de.mount,note:de.mountNote,fasteners:le(de.mount),points:ut})},Ue=(b,k,Z,ie)=>{if(Z<=0)return;const de=b+a/2,Ne=k-a/2,Se=(b+k)/2,qe=at=>{if(i.shelfPanel==="none")return;const ot=B[i.shelfPanel],rt=Z-a,vt=M-2*a+30,Lt=`pn-${++U}`;V.push({id:Lt,material:i.shelfPanel,size:[rt,vt,ot.thickness],boxSize:[rt,ot.thickness,vt],position:[Se,at+ot.thickness/2,0],mode:"shelf-overlap",mountNote:`隔板(${ot.name})：列内搭梁式，列宽 ${Z}mm`,holes:[]});const Pt=7.5,wt=rt/2-Pt,I=vt/2-Pt;N.push({id:`mt-${++q}`,targetType:"panel",targetId:Lt,method:ot.mount,note:ot.mountNote,fasteners:le(ot.mount),points:[[Se-wt,at,-I],[Se+wt,at,-I],[Se-wt,at,I],[Se+wt,at,I]]})};if(ie.type==="drawer"){const at=(S-2*a)/ie.count;if(at<120)throw new Error(`中柱列总高 ${S}mm 装不下 ${ie.count} 层抽屉（节距 ${Math.round(at)} < 120mm；案例档位 160~230）`);for(let ot=0;ot<ie.count;ot++){const rt=a+ot*at+20;for(const vt of[de,Ne]){X({role:"beam-z",sectionId:s.id,length:M-2*a+2*m.lengthOffset,position:[vt,rt,0],axis:"z"});const Lt=`m-${L}`;for(const Pt of[1,-1]){const wt=Pt===-1?Ce:K,I=$.get(`${vt},${wt}`);ne({position:[vt,rt,wt],beamAxis:"z",outward:Pt,ySide:-1,beamMemberId:Lt,postMemberId:I})}}Ie.push({y:rt,pitch:at,colWidth:Z,xCenter:Se})}}else if(ie.type==="cabinet"){const at=(S-2*a)/(ie.count+1);for(let vt=0;vt<ie.count;vt++){const Lt=a+(vt+1)*at;for(const Pt of[de,Ne]){X({role:"beam-z",sectionId:s.id,length:M-2*a+2*m.lengthOffset,position:[Pt,Lt,0],axis:"z"});const wt=`m-${L}`;for(const I of[1,-1]){const re=I===-1?Ce:K,ue=$.get(`${Pt},${re}`);ne({position:[Pt,Lt,re],beamAxis:"z",outward:I,ySide:-1,beamMemberId:wt,postMemberId:ue})}}qe(Lt)}const ot=Z+a-3,rt=S-2*a;if(ot>50&&rt>50){const vt=i.shelfPanel!=="none"?i.shelfPanel:"wood",Lt=B[vt],Pt=`pn-${++U}`,wt=(ie.hinge??"left")==="left";V.push({id:Pt,material:vt,size:[ot,rt,Lt.thickness],boxSize:[ot,rt,Lt.thickness],position:[Se,S/2,M/2+Lt.thickness/2],mode:"door-front",mountNote:`柜门(${(ie.hinge??"left")==="left"?"左铰右开":"右铰左开"})：合页×2 + 把手 + 磁吸`,holes:[{x:wt?ot-40:40,y:rt/2-48,diameter:5},{x:wt?ot-40:40,y:rt/2+48,diameter:5}]});const I=(ie.hinge??"left")==="left",re=I?b+a/2:k-a/2,ue=I?k-a/2:b+a/2,pe=Se+(I?1:-1)*(ot/2-40);N.push({id:`mt-${++q}`,targetType:"panel",targetId:Pt,method:"hinge",note:`柜门合页×2 入${I?"左":"右"}柱槽 + 磁吸扣${I?"右":"左"}柱中部 + 把手孔距96`,fasteners:[{sku:"hinge-slot-30",qty:2},{sku:"t-nut-m6",qty:4},{sku:"bolt-m6-l12",qty:4},{sku:"magnetic-catch",qty:1},{sku:"handle-96",qty:1}],points:[[re,a+rt/5,M/2],[re,a+rt*4/5,M/2],[ue,S/2,M/2]]});for(const[se,Ve]of[[1,a+rt/5],[2,a+rt*4/5]])D.push({id:`${Pt}-hg${se}`,kind:"hinge",sku:"",weightKg:.06,hostId:Pt,position:[re,Ve,M/2+2],boxSize:[40,55,10]});D.push({id:`${Pt}-hd`,kind:"handle",sku:"",weightKg:.12,hostId:Pt,position:[pe,S/2,M/2+Lt.thickness],lengthMm:96,boxSize:[14,136,14]}),D.push({id:`${Pt}-mc`,kind:"magnetic-catch",sku:"",weightKg:.03,hostId:Pt,position:[ue,S/2,M/2-7],boxSize:[30,16,14]})}}else{const at=(S-2*a)/(ie.count+1);for(let ot=0;ot<ie.count;ot++){const rt=a+(ot+1)*at;for(const vt of[de,Ne]){X({role:"beam-z",sectionId:s.id,length:M-2*a+2*m.lengthOffset,position:[vt,rt,0],axis:"z"});const Lt=`m-${L}`;for(const Pt of[1,-1]){const wt=Pt===-1?Ce:K,I=$.get(`${vt},${wt}`);ne({position:[vt,rt,wt],beamAxis:"z",outward:Pt,ySide:-1,beamMemberId:Lt,postMemberId:I})}}qe(rt)}}};if(i.centerColumn&&Ke!=null){const b=Ke-F-a,k=Y-Ke-a;i.centerColumn.left&&Ue(F,Ke,b,i.centerColumn.left),i.centerColumn.right&&Ue(Ke,Y,k,i.centerColumn.right)}if(_||Ee(i.topPanel,S-Oe,!0,i.scene==="workbench"?{depthRatio:ce,align:"back"}:void 0),Ee(i.bottomPanel,a+2*h,!1),_){const b=i.topPanel!=="none"?i.topPanel:i.shelfPanel!=="none"?i.shelfPanel:"wood",k=B[b],Z=1,ie=y-2*a-2*Z,de=M-2*a-2*Z,Ne=`pn-${++U}`;V.push({id:Ne,material:b,size:[ie,de,k.thickness],boxSize:[ie,k.thickness,de],position:[0,S-k.thickness/2,0],mode:"top-inset",mountNote:"桌面板(凹嵌顶框内)：板顶与型材齐平；平面直角连接件下方固定",holes:[]}),N.push({id:`mt-${++q}`,targetType:"panel",targetId:Ne,method:"corner-flat",note:"平面直角连接件×4 下方托板并锁入梁槽（案例实证固定方式）",fasteners:[{sku:"flat-corner-plate",qty:4},{sku:"screw-m4-10-pan",qty:8},{sku:"t-nut-m4",qty:8}],points:[[-y/2+a,S-k.thickness,-M/2+a],[y/2-a,S-k.thickness,-M/2+a],[-y/2+a,S-k.thickness,M/2-a],[y/2-a,S-k.thickness,M/2-a]]})}else for(let b=0;b<ae.length;b++){const k=i.scene==="workbench"&&b>0?ce:1;Ee(i.shelfPanel,ae[b]+a/2,!1,{depthRatio:k,align:i.scene==="workbench"?"back":"center"})}const Pe=(b,k)=>{if(b==="none")return;const Z=B[b],ie=`pn-${++U}`,de=k==="back",Ne=!de&&i.backPanel!=="none"?B[i.backPanel].thickness:0,Se=de?y:M+Ne,qe=i.scene==="workbench"&&de&&b==="pegboard",at=i.workbenchDeskTopHeightMm??740,ot=qe?S-at:S,rt=de?[y,S,Z.thickness]:[Z.thickness,S,M+Ne],vt=de?[0,qe?(at+S)/2:S/2,-M/2-Z.thickness/2]:[k==="left"?-y/2-Z.thickness/2:y/2+Z.thickness/2,S/2,-Ne/2];qe&&(rt[1]=ot);const Lt=Z.mount==="t-nut-screw"||Z.mount==="corner-flat"?[[a/2,a],[Se-a/2,a],[a/2,ot-a],[Se-a/2,ot-a]].map(([wt,I])=>({x:wt,y:I,diameter:Z.holeDiameter})):[];V.push({id:ie,material:b,size:[Se,ot,Z.thickness],boxSize:rt,position:vt,mode:de?"back-overlay":"side-overlay",mountNote:`${de?"背板":k==="left"?"左侧板":"右侧板"}(外贴式)：${Z.mountNote}；兼作抗剪体系`,holes:Lt});const Pt=de?[[-y/2+a/2,qe?at:a,-M/2],[y/2-a/2,qe?at:a,-M/2],[-y/2+a/2,S-a,-M/2],[y/2-a/2,S-a,-M/2]]:(()=>{const wt=k==="left"?-y/2:y/2;return[[wt,a,-M/2+a/2],[wt,a,M/2-a/2],[wt,S-a,-M/2+a/2],[wt,S-a,M/2-a/2]]})();N.push({id:`mt-${++q}`,targetType:"panel",targetId:ie,method:Z.mount,note:"侧围板四角固定于立柱外侧槽",fasteners:Z.mount==="corner-flat"?[{sku:"vertical-bracket-20",qty:4},{sku:"screw-m4-10-pan",qty:8},{sku:"t-nut-m4",qty:8}]:le(Z.mount),points:Pt})};if(Pe(i.backPanel,"back"),Pe(i.leftPanel,"left"),Pe(i.rightPanel,"right"),i.doorPanel&&i.doorPanel!=="none"){const b=i.doorPanel,k=B[b],Z=3,ie=y-2*a-2*Z,de=S-2*a-2*Z;if(ie>100&&de>100){const Ne=`pn-${++U}`,Se=k.mount==="gasket-clamp",qe=Se?[]:[{x:ie-40,y:de/2-48,diameter:5},{x:ie-40,y:de/2+48,diameter:5}];V.push({id:Ne,material:b,size:[ie,de,k.thickness],boxSize:[ie,de,k.thickness],position:[0,S/2,M/2+k.thickness/2],mode:"door-front",mountNote:`正面单开门(${Se?"玻璃门铰夹式+粘贴把手":"槽装合页+拉手96"})：左铰右开，每边留 ${Z}mm 间隙；${k.mountNote}`,holes:qe});const at=-y/2+a/2,ot=M/2,rt=[[at,a+Z+de/5,ot],[at,a+Z+de*4/5,ot]];N.push({id:`mt-${++q}`,targetType:"panel",targetId:Ne,method:"hinge",note:Se?"玻璃门铰×2 夹持门板左缘，磁吸扣右柱中部，粘贴式把手":"槽装合页×2 入左前柱前槽（T型螺母固定），磁吸扣右柱中部，拉手孔距96",fasteners:Se?[{sku:"glass-hinge",qty:2},{sku:"magnetic-catch",qty:1},{sku:"handle-adhesive",qty:1}]:[{sku:"hinge-slot-30",qty:2},{sku:"t-nut-m6",qty:4},{sku:"bolt-m6-l12",qty:4},{sku:"magnetic-catch",qty:1},{sku:"handle-96",qty:1}],points:[...rt,[y/2-a/2,S/2,ot]]}),ie>600&&t.push(`门宽 ${ie}mm > 600mm：单开门铰链下垂风险，建议改双开或加第三合页`)}}const Je=[];if(i.brace){const b=[...Me].sort((ie,de)=>ie-de),k=y-2*a,Z=new Set;for(let ie=0;ie<b.length-1;ie++){const de=b[ie]+a/2,Ne=b[ie+1]-a/2,Se=Ne-de;if(Se<100)continue;const qe=ie%2===0?1:-1,at=Math.round(Math.hypot(k,Se)),ot=Math.atan2(Se,k)*qe;X({role:"brace",sectionId:s.id,length:at,position:[0,(de+Ne)/2,-M/2+a/2],axis:"x",tilt:ot});const rt=`m-${L}`;Z.add((90-Math.abs(ot*180/Math.PI)).toFixed(1));const vt=[-qe*k/2,de,-M/2+a/2],Lt=[qe*k/2,Ne,-M/2+a/2];Je.push({memberId:rt,position:vt},{memberId:rt,position:Lt}),N.push({id:`mt-${++q}`,targetType:"member",targetId:rt,method:"t-nut-screw",note:"斜撑段端部压接：M6螺栓穿端孔入柱/梁槽内T型螺母",fasteners:[{sku:"t-nut-m6",qty:2},{sku:"bolt-m6-l16",qty:2}],points:[vt,Lt]})}Z.size&&t.push(`斜撑分 ${Je.length/2} 段（避开隔板横梁），两端斜切 ${[...Z].join("/")}°（嘉立创非标斜切 30~150° 可加工）`)}if(i.mobility==="leveling-feet"){let b=0;for(const[k,Z]of $){if(!z.has(Z))continue;const[ie,de]=k.split(",").map(Number),Ne=`af-${++b}`;D.push({id:Ne,kind:"leveling-foot",sku:"leveling-foot-m8",position:[ie,-25,de],weightKg:.1}),N.push({id:`mt-${++q}`,targetType:"accessory",targetId:Ne,method:"foot-stem",note:`调平地脚拧入立柱(${Z})底端面 M8 攻牙`,fasteners:[{sku:"leveling-foot-m8",qty:1}],points:[[ie,0,de]]})}}if(i.mobility==="caster"){let b=0;for(const[k,Z]of $){if(!z.has(Z))continue;const[ie,de]=k.split(",").map(Number),Ne=`ac-${++b}`;D.push({id:Ne,kind:"caster",sku:"caster-stem-m8-50",position:[ie,-35,de],weightKg:.35}),N.push({id:`mt-${++q}`,targetType:"accessory",targetId:Ne,method:"caster-stem",note:`丝杆脚轮拧入立柱(${Z})底端面 M8 攻牙`,fasteners:[{sku:"caster-stem-m8-50",qty:1}],points:[[ie,0,de]]})}}if(Ie.length){const b=i.drawerKind??"ready-made",k=b==="turnover-box"?"turnover-box-148":"drawer-box-ready",Z=b==="turnover-box"?"drawer-slide-350":"rebound-slide-350";let ie=0;for(const{y:de,pitch:Ne,colWidth:Se,xCenter:qe}of Ie){const at=`ad-${++ie}`,rt=(Se??y-2*a)-30,vt=Math.min(Ne-25,b==="turnover-box"?155:Ne-25),Lt=M-2*a;if(D.push({id:at,kind:"drawer-box",sku:k,position:[qe??0,de+10+vt/2,0],weightKg:b==="turnover-box"?1.2:3,boxSize:[rt,vt,Lt]}),D.push({id:`${at}-sl`,kind:"drawer-slide",sku:Z,hostId:at,position:[qe??0,de+22,0],weightKg:.5,boxSize:[rt+26,35,Math.min(350,Lt)]}),N.push({id:`mt-${++q}`,targetType:"accessory",targetId:at,method:"drawer-slide",note:b==="turnover-box"?"周转箱+底托放三折轨道上（轨道 M4 半圆头螺丝入梁槽）":"成品抽屉盒装反弹轨道（按压开启无拉手，轨道 M4 半圆头螺丝入梁槽）",fasteners:[{sku:k,qty:1},{sku:Z,qty:1},{sku:"screw-m4-10-pan",qty:8},{sku:"t-nut-m4",qty:8}],points:[[-y/2+a,de,0],[y/2-a,de,0]]}),b==="ready-made"){const Pt=i.shelfPanel!=="none"?i.shelfPanel:"wood",wt=B[Pt],I=(Se??y-2*a)+a-3,re=Ne-4,ue=de-20+Ne/2,pe=`pn-${++U}`;V.push({id:pe,material:Pt,size:[I,re,wt.thickness],boxSize:[I,re,wt.thickness],position:[qe??0,ue,M/2+wt.thickness/2],mode:"drawer-front",mountNote:"抽屉前脸板：盒内 M4 螺丝反锁前脸，与柜门共面；横拉手开启（孔距96）",holes:[{x:I/2-48,y:re/2,diameter:5},{x:I/2+48,y:re/2,diameter:5}]}),N.push({id:`mt-${++q}`,targetType:"panel",targetId:pe,method:"t-nut-screw",note:"前脸板盒内反锁 M4×4 + 横拉手孔距96（家具标准做法）",fasteners:[{sku:"screw-m4-10-pan",qty:4},{sku:"handle-96",qty:1}],points:[[(qe??0)-I/4,ue,M/2],[(qe??0)+I/4,ue,M/2]]}),D.push({id:`${pe}-hd`,kind:"handle",sku:"",weightKg:.12,hostId:pe,position:[qe??0,ue,M/2+wt.thickness],lengthMm:96,boxSize:[136,14,14]})}}}if(i.ledStrip){const b=S-a,k=M/2-a/2,Z="ac-led";D.push({id:Z,kind:"led-strip",sku:"led-strip-m",position:[0,b-4,k],weightKg:.2,lengthMm:x}),N.push({id:`mt-${++q}`,targetType:"accessory",targetId:Z,method:"slot-embed",note:"LED灯条嵌入顶框前梁下槽（mat-004 槽内嵌），电源线沿立柱槽走线至底部",fasteners:[{sku:"led-strip-m",qty:Math.ceil(x/1e3)},{sku:"led-psu-24w",qty:1}],points:[[-x/2,b,k],[x/2,b,k]]})}const ze=[];let H=0;const T=s.slotWallThickness??s.wallThickness??2;for(const b of E){const[k,Z,ie]=b.position,de=-b.outward,Ne=Se=>b.beamAxis==="x"?[k+de*Se,Z,ie]:[k,Z,ie+de*Se];for(const Se of m.machining){const qe=`mc-${++H}`;switch(Se.type){case"through-hole":{const at=19-T+2,ot=Ne(at),rt=Number(Se.diameter);ze.push({id:qe,jointId:b.id,memberId:b.beamMemberId,type:"through-hole",spec:`Φ${rt}`,position:ot,axis:"y",diameter:rt,length:a,discs:[{position:[ot[0],Z+a/2+.15,ot[2]],axis:"y",dir:1,d:rt},{position:[ot[0],Z-a/2-.15,ot[2]],axis:"y",dir:-1,d:rt}]});break}case"end-tap":ze.push({id:qe,jointId:b.id,memberId:b.beamMemberId,type:"end-tap",spec:`${Se.thread}×${Se.depth}`,position:Ne(Number(Se.depth)/2),axis:b.beamAxis,diameter:8,length:Number(Se.depth),discs:[]});break;case"counterbore":{const at=b.beamAxis==="x"?[k+b.outward*(a/2),Z,ie]:[k,Z,ie+b.outward*(a/2)],ot=b.beamAxis==="x"?[k+b.outward*(a+.15),Z,ie]:[k,Z,ie+b.outward*(a+.15)];ze.push({id:qe,jointId:b.id,memberId:b.postMemberId,type:"counterbore",spec:`Φ${Se.d}沉Φ${Se.D}×${Se.depth}`,position:at,axis:b.beamAxis,diameter:Number(Se.d),length:a,discs:[{position:ot,axis:b.beamAxis,dir:b.outward,d:Number(Se.d),D:Number(Se.D)}]});break}case"wrench-hole":{const at=Ne(a*.75),ot=-b.ySide,rt=Number(Se.diameter);ze.push({id:qe,jointId:b.id,memberId:b.beamMemberId,type:"wrench-hole",spec:`Φ${rt}`,position:at,axis:"y",diameter:rt,length:a,discs:[{position:[at[0],Z+ot*(a/2+.15),at[2]],axis:"y",dir:ot,d:rt}]});break}}}}if(i.mobility==="caster"||i.mobility==="leveling-feet"){const b=i.mobility==="caster"?"脚轮":"调平地脚";for(const[k,Z]of $){if(!z.has(Z))continue;const[ie,de]=k.split(",").map(Number);ze.push({id:`mc-${++H}`,jointId:"-",memberId:Z,type:"end-tap",spec:`M8×20(${b})`,position:[ie,10,de],axis:"y",diameter:8,length:20,discs:[]})}}for(const b of Je)ze.push({id:`mc-${++H}`,jointId:"-",memberId:b.memberId,type:"through-hole",spec:"Φ7(斜撑端)",position:b.position,axis:"z",diameter:7,length:a,discs:[]});const G=new Map,be=new Map,_e=new Map(P.map(b=>[b.id,b]));for(const b of ze){const k=_e.get(b.memberId),Z=k.axis==="x"?0:k.axis==="y"?1:2,ie=Math.round(b.position[Z]-(k.position[Z]-k.length/2)),de=b.axis===k.axis?"end":`${b.axis}${((Ot=b.discs[0])==null?void 0:Ot.dir)??""}`;(G.get(b.memberId)??G.set(b.memberId,[]).get(b.memberId)).push(`${b.type}:${b.spec}@${ie}/${de}`),(be.get(b.memberId)??be.set(b.memberId,[]).get(b.memberId)).push({type:b.type,spec:b.spec,fromStart:ie,face:de,diameter:b.diameter})}const Ae=b=>`${b.sectionId}|${b.length}|${(G.get(b.id)??[]).sort().join(",")}`,Qe=new Map,je=new Map;for(const b of P){const k=Ae(b);Qe.has(k)||Qe.set(k,`P${Qe.size+1}`),b.partNo=Qe.get(k);const Z=je.get(k);if(Z)Z.qty++;else{const ie=G.get(b.id)??[],de=new Map;for(const Se of ie)de.set(Se.split("@")[0],(de.get(Se.split("@")[0])??0)+1);const Ne=[...de.entries()].map(([Se,qe])=>`${Se.split(":")[1]}×${qe}`).join(" ");je.set(k,{sectionId:b.sectionId,length:b.length,qty:1,machiningNote:Ne,ops:(be.get(b.id)??[]).sort((Se,qe)=>Se.fromStart-qe.fromStart)})}}const et=[...je.entries()].map(([b,k])=>({partNo:Qe.get(b),...k})).sort((b,k)=>k.length-b.length),Tt=((gn=e.rules.pricing)==null?void 0:gn.machiningPrice)??{},De=new Map;for(const b of V){const k=`${b.material}|${b.size.join("x")}|${b.holes.map(Se=>`${Se.x},${Se.y}`).join(";")}`,Z=De.get(k);if(Z){Z.qty++,b.partNo=Z.partNo;continue}const ie=B[b.material],de=`B${De.size+1}`;b.partNo=de;const Ne=b.size[0]/1e3*(b.size[1]/1e3);De.set(k,{partNo:de,material:b.material,materialName:(ie==null?void 0:ie.name)??b.material,size:b.size,qty:1,holeNote:b.holes.length?`Φ${b.holes[0].diameter}×${b.holes.length}孔@四角`:"免钻孔(胶垫压条)",priceCny:+(Ne*((ie==null?void 0:ie.pricePerM2)??0)+b.holes.length*(Tt["panel-hole"]??0)).toFixed(2)})}const it=[...De.values()],pt=P.reduce((b,k)=>b+k.length,0),_t=V.reduce((b,k)=>{var ie;const Z=((ie=B[k.material])==null?void 0:ie.kgPerM2)??10;return b+k.size[0]/1e3*(k.size[1]/1e3)*Z},0),tt=D.reduce((b,k)=>b+k.weightKg,0),Rt=s.weightPerMeter!=null?pt/1e3*s.weightPerMeter+_t+tt:null,Te=b=>{var k;return((k=e.fasteners[b])==null?void 0:k.price)??0},dt=b=>Math.round(b*100)/100,Q=dt(s.price.perMeter!=null?pt/1e3*s.price.perMeter:0),We=dt(it.reduce((b,k)=>b+k.priceCny*k.qty,0)),ve=dt(E.length*m.bom.reduce((b,k)=>b+(k.priceUntaxed??Te(k.sku))*k.qty,0)),Re=dt(N.filter(b=>b.method!=="caster-stem"&&b.method!=="foot-stem"&&b.method!=="drawer-slide"&&b.method!=="slot-embed").reduce((b,k)=>b+k.fasteners.reduce((Z,ie)=>Z+Te(ie.sku)*ie.qty,0),0)),Ze=dt(ze.reduce((b,k)=>b+(Tt[k.type]??0),0)+P.filter(b=>b.role==="brace").length*2*(Tt["miter-cut"]??0)),Ye=dt(D.reduce((b,k)=>k.kind==="led-strip"?b+Te("led-strip-m")*Math.ceil((k.lengthMm??1e3)/1e3)+Te("led-psu-24w"):b+Te(k.sku),0)),Mt={profile:Q,panels:We,connectors:ve,fasteners:Re,machining:Ze,accessories:Ye,total:dt(Q+We+ve+Re+Ze+Ye)},Xt=Mt.total>0?Mt.total:null,qt={spec:i,members:P,joints:E,machining:ze,panels:V,mounts:N,accessories:D,cutList:et,panelList:it,checks:[],status:"valid",totals:{memberCount:P.length,totalLengthMm:pt,weightKg:Rt,priceCny:Xt,cost:Mt},warnings:t};return qt.checks=hM(qt,e),v&&qt.checks.unshift({level:"error",ruleId:"compat-001",message:`不兼容组合：${m.name}（适配系列${m.compatible.series.join("/")}，槽宽${m.compatible.slotWidths.join("/")}）不适用于 ${s.name}，无法装配。请更换连接件或截面`}),qt.status=qt.checks.some(b=>b.level==="error")?"invalid":qt.checks.some(b=>b.level==="warn")?"needs-confirmation":"valid",qt}const Uo=["eu-2020","eu-3030","eu-4040-s8"],mM={"eu-2020":20,"eu-3030":30,"eu-4040-s8":40},gM=i=>Uo[Math.min(Uo.indexOf(i)+1,Uo.length-1)];function Xy(i){const{width:e,depth:t,loadKg:n,loadType:s,highRisk:a,vibration:l,precision:u}=i;if(l||u){const m="eu-4040-s8";return a?{use:m,ruleIds:["sel-003"],rationale:"4040 刚度更大挠度更小；高风险场景已是最高截面"}:{use:m,ruleIds:["sel-003"],rationale:"4040 刚度更大挠度更小"}}const f=Math.max(e,t),h=s==="concentrated";for(const m of Uo){const v=f-2*mM[m];if(v<=0)continue;const y=vM({span:v,loadKg:n,loadType:s,vibration:!1,precision:!1});if(Uo.indexOf(y.use)<=Uo.indexOf(m)){let M=m,S=y.use===m?y.rationale:`${m} 可承受其真实净跨约 ${Math.round(v)}mm（${n}kg ${h?"集中":"均布"}）`;const _=y.use===m?[...y.ruleIds]:[];if(a){const x=gM(M);x!==M&&(M=x,_.push("sel-004"),S+="；高风险场景升一级")}return{use:M,ruleIds:_,rationale:S}}}return{use:"eu-4040-s8",ruleIds:["sel-003"],rationale:"4040 刚度更大挠度更小"}}function vM(i){const e=[];let t=i.span;i.loadType==="concentrated"&&(t=i.span/.75,e.push("sel-005"));let n,s;return t>1200||i.loadKg>80||i.vibration||i.precision?(n="eu-4040-s8",e.push("sel-003"),s="4040核心优势是刚度更大挠度更小"):t<=600&&i.loadKg<=20?(n="eu-2020",e.push("sel-001"),s="短跨轻载，2020定位轻型框架"):t<=800&&i.loadKg<=10?(n="eu-2020",e.push("sel-001b"),s="长跨极轻载，2020可用"):t<=1e3&&i.loadKg<=50?(n="eu-3030",e.push("sel-002"),s="行家闭眼边界1000@50均布"):t<=800&&i.loadKg<=80?(n="eu-3030",e.push("sel-002b"),s="中跨中载主力系列"):(n="eu-4040-s8",e.push("sel-003"),s="超出3030适用域，保守升级"),{use:n,ruleIds:e,rationale:s}}const yM={"internal-30":"corner-bracket-30","corner-bracket-30":"anchor-30","anchor-30":"screw-joint-30","screw-joint-30":"screw-joint-30"};function _M(i){const e=[];let t,n;if(i.frameRole==="mainFrame"?(t="screw-joint-30",e.push("con-007"),n="主框架惯例端面攻丝——刚度最高不易松"):i.load==="heavy"?(t="anchor-30",e.push("con-003"),n="强度优先隐藏式"):i.hiddenRequired?(t="anchor-30",e.push("con-002","val-006"),n="隐藏式且可主承重（内置件仅限定位/辅助，不可单独主承重）"):(t="corner-bracket-30",e.push("con-001"),n="便宜免加工可拆，轻载首选"),i.mobility==="caster"){const s=yM[t]??t;s!==t&&(t=s,e.push("con-005"),n+="；脚轮工况连接升一级")}return{use:t,ruleIds:e,rationale:n}}var xM={};const SM=`你是一位资深机械结构工程师，负责把用户的自然语言需求转换为结构化参数。

输出规则：
1. 只输出一个符合下方Schema的JSON对象，不要输出markdown代码块标记、解释或其他任何内容
2. 用户没说的信息一律填 null 或 "unknown"，绝对禁止编造尺寸和载荷数值
3. load.totalKg 只在用户明确说出重量数值时才填；你估算的重量只能写进 _assumptions，totalKg 保持 null
4. mobility：用户提到轮子/移动/推拉/走/滚填 caster；提到调平/地脚/水平/稳固/不平填 leveling-feet；明确说固定/不动/落地填 fixed；完全未提及移动需求一律填 "unknown"，不要推断为 fixed
5. scene 判定标准：电脑桌/书桌/办公桌/学习桌/操作台面=workbench；工具柜/收纳柜/抽屉柜/储物柜/酒柜/鸡尾柜等一切柜子及家用置物=diy-furniture（柜类绝不是 workbench，workbench 仅限有桌面操作区的桌子）；车间/仓储重货架=industrial-rack；鱼缸相关一律=aquarium；儿童用品=child；阳台室外=outdoor；其余拿不准=unknown
6. 可以做常识推断，但每条推断必须写入 _assumptions 数组（例如："鱼缸1.2米→满水约180kg→按250kg设计余量"）
7. 高风险场景（水族/儿童用品/悬挂/带脚轮的高架/人体载荷）必须写入 _riskFlags
8. 载荷区分集中/均布：桌面放一台机器=concentrated，摆满杂物=distributed；拿不准=unknown
9. _missing 按重要性排序：先安全相关（载荷/跨度/高度），再成本相关（系列/材质），最后外观
10. 数字缺少单位、或无法确定对应宽/深/高哪个维度时（如"三段式 75 30 5"），dimensions 一律保持 null：把可能的解释写入 _assumptions，并在 _missing 中列出需确认的尺寸
11. _explicitFields：列出本轮用户输入（最后一条消息）中明确提到或明确修改的字段路径，可选值："dimensions.width","dimensions.depth","dimensions.height","load.totalKg","load.type","mobility","scene","layers","panels"。仅基于最后一条用户消息判断，历史提过但本轮未提的不要列入
12. environment.vibration：放置的设备本身会高速运动/振动时填 true（3D打印机尤其CoreXY结构如拓竹/Voron、激光雕刻机、CNC、缝纫机），并在 _assumptions 说明依据
13. 水与电器同框（水桶/水槽/鱼缸 与 电茶炉/电器同时出现）→ _riskFlags 加 "water-electric"
14. budgetSensitivity：用户说出预算金额或"便宜/性价比"→ high；"要好的/不差钱"→ low；未提→ unknown。预算金额写入 _assumptions（如"预算1000元"）
15. panels.material 只能取枚举值；遇到枚举外材料（海洋板/PVC/金属网等）填 "other" 并在 _assumptions 记录原词，禁止归入相近枚举。例外：提到“挂架/挂钩/挂工具/洞洞板”功能的立面（侧板/背板）= pegboard（洞洞板是挂架功能的标准实现）
16. panels 数量词展开：用户提到带数量的抽屉/门/板材（如"5个抽屉"、"两个门"、"三块侧板"），必须在 panels 数组中输出对应数量的条目（每条一个对象；Schema 无数值/qty 字段，不能合并为一条）。"5个抽屉"→ 5 条 {"material":"wood","position":"drawer"}。注意区分："X层"一般指搁板层数→只填 layers: X；但"X层抽屉柜/抽屉塔"的"层"=抽屉个数→应展开为 X 条 drawer 条目（position: "drawer"）。"X个抽屉/门/侧板"始终展开到 panels 数组。⚠ 展开抽屉到 panels 时禁止同时填 layers（避免 shelfCount 与 drawerCount 双重计数）；只有真正的搁板层数才填 layers

Schema：
{
  "productType": "workbench | shelf | cabinet | frame | enclosure | other",
  "dimensions": { "width": null, "depth": null, "height": null, "unit": "mm" },
  "load": { "totalKg": null, "type": "distributed | concentrated | unknown", "description": "" },
  "scene": "diy-furniture | industrial-rack | workbench | automation | precision | optical | aquarium | child | outdoor | unknown",
  "mobility": "fixed | caster | leveling-feet | unknown",
  "stiffnessNeed": "normal | high | unknown",
  "environment": { "humid": null, "outdoor": null, "vibration": null },
  "panels": [ { "material": "wood | glass | acrylic | pegboard | other | none", "position": "top | shelf | bottom | side | door | drawer" } ],
  "appearance": { "color": null, "hiddenConnectorsPreferred": null },
  "budgetSensitivity": "low | medium | high | unknown",
  "layers": null,
  "_explicitFields": [],
  "_missing": [],
  "_assumptions": [],
  "_riskFlags": []
}`,qy=typeof localStorage>"u",Lg="https://api.longcat.chat/openai/v1/chat/completions",Ig=Lg,MM="LongCat-2.0";function Ky(){return qy?xM.LONGCAT_API_KEY??null:localStorage.getItem("llm_api_key")}function wM(i){localStorage.setItem("llm_api_key",i)}async function EM(i,e=[]){var h,p;const t=Ky();if(!t)throw new Error("未配置 API Key");const n={model:MM,temperature:0,response_format:{type:"json_object"},messages:[{role:"system",content:SM},...e,{role:"user",content:i}]};let s;try{s=await fetch(Ig,{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify(n)})}catch(m){throw new Error(`无法连接 LLM 服务（${m.message}）。若在线版访问受限，AI 理解功能请在本地运行使用；手动参数面板与样例不受影响`)}if(s.status===400&&(delete n.response_format,s=await fetch(Ig,{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify(n)})),!s.ok)throw new Error(`LLM 调用失败 HTTP ${s.status}: ${(await s.text()).slice(0,200)}`);const l=((p=(h=(await s.json()).choices)==null?void 0:h[0])==null?void 0:p.message)??{},u=l.content||l.reasoning_content||"",f=u.includes("{")?u.slice(u.indexOf("{"),u.lastIndexOf("}")+1):u;try{return JSON.parse(f)}catch(m){const v=f.slice(0,120).replace(/\s+/g," ").trim();throw new Error(`AI 返回的参数格式无法解析（${m.message}）。通常是输出被截断，请重试；若反复出现请简化描述。原始片段：${v||"(空)"}`)}}const Sd={"diy-furniture":"diy-furniture",workbench:"workbench","industrial-rack":"industrial-rack",automation:"industrial-rack",precision:"precision",optical:"precision",aquarium:"industrial-rack",child:"diy-furniture",outdoor:"diy-furniture",unknown:"diy-furniture"},bM=["aquarium","child","overhead"];function TM(i,e){var le,Ee,Ue,Pe,Je,ze,H,T,G,be,_e,Ae,Qe,je,et,Tt,De,it,pt,_t,tt,Rt;const t=[...i._assumptions??[]],n=[],s=[...i._riskFlags??[]],a=e.archetypes["computer-desk"],l=((le=a==null?void 0:a.overallHeightMm)==null?void 0:le.hutchMin)??1100,u=((Ee=a==null?void 0:a.overallHeightMm)==null?void 0:Ee.hutchMax)??1800,f=i.dimensions??{width:null,depth:null,height:null};let h=f.width??800,p=f.depth??400,m=f.height??750;f.width==null&&t.push("宽度未说明，按 800mm 假设"),f.depth==null&&t.push("深度未说明，按 400mm 假设"),f.height==null&&t.push("高度未说明，按 750mm 假设");const v=bM.includes(i.scene)||s.length>0;let y=((Ue=i.load)==null?void 0:Ue.totalKg)??null;y==null&&(y=30,t.push("载荷未明确，按 30kg 保守假设"),n.push(v?"⚠ 高风险场景必须确认：架子上实际会放多重的东西（kg）？":"架子大概要承重多少公斤？（影响选型，默认按 30kg 算）"));const M=((Pe=i.load)==null?void 0:Pe.type)==="concentrated"?"concentrated":"distributed";((Je=i.load)==null?void 0:Je.type)==="unknown"&&t.push("载荷分布不明，按均布假设");const S=i.mobility==="caster"||i.mobility==="leveling-feet"?i.mobility:"fixed";i.mobility==="unknown"&&n.push("底部怎么放？移动（脚轮，按 2.5 倍冲击设计）/ 调平（地脚，用于不平地面）/ 直接落地固定？");const _=i.productType==="workbench"?"workbench":(()=>{const Te=Sd[i.scene]??"diy-furniture";return Te==="workbench"?"diy-furniture":Te})();i.productType!=="workbench"&&Sd[i.scene]==="workbench"&&t.push("产品类型为柜/架，场景修正为家具（桌面操作台语义仅限桌类）"),i.productType==="workbench"&&Sd[i.scene]!=="workbench"&&t.push("产品类型为桌子（workbench），场景按电脑桌/工作台语义处理");const x=((ze=i.panels)==null?void 0:ze.some(Te=>Te.position==="drawer"))??!1,R=_==="workbench"?"computer-desk":i.scene==="aquarium"?"aquarium-stand":i.productType==="shelf"?"storage-rack":i.productType==="cabinet"&&x?"drawer-tower":i.productType==="cabinet"&&(f.height??0)>=1800?"wardrobe":void 0,P=R?e.archetypes[R]:void 0;if(P&&R!=="computer-desk"){const Te=(ve,Re,Ze)=>{if(Re!=null||Ze==null)return null;const Ye=t.findIndex(Mt=>Mt.startsWith(`${ve}未说明`));return Ye>=0&&t.splice(Ye,1),t.push(`${ve}未说明，按${P.name}常见档位 ${Ze}mm 假设`),Ze},dt=Te("宽度",f.width,(H=P.widthMm)==null?void 0:H.std),Q=Te("深度",f.depth,(T=P.depthMm)==null?void 0:T.std),We=Te("高度",f.height,R==="aquarium-stand"?(G=P.standHeightMm)==null?void 0:G.std:(be=P.overallHeightMm)==null?void 0:be.std);dt!=null&&(h=dt),Q!=null&&(p=Q),We!=null&&(m=We)}if(_==="workbench"){const Te=((_e=a==null?void 0:a.depthMm)==null?void 0:_e.min)??550;if(f.depth==null){p=((Ae=a==null?void 0:a.depthMm)==null?void 0:Ae.std)??650;const Q=t.findIndex(We=>We.includes("深度未说明"));Q>=0&&t.splice(Q,1),t.push(`电脑桌深度未说明，按舒适深度 ${p}mm 假设`)}else p<Te&&(t.push(`电脑桌深度 ${p}mm 小于可用下限 ${Te}mm，已调整为 ${Te}mm`),p=Te);const dt=m;if(f.height==null){const Q=(i.layers??1)>=2;m=Q?Math.round((l+u)/2/10)*10:((Qe=a==null?void 0:a.deskTopHeightMm)==null?void 0:Qe.std)??740;const We=t.findIndex(ve=>ve.includes("高度未说明"));We>=0&&t.splice(We,1),t.push(Q?`高度未说明：电脑桌带上层置物架，按常见总高 ${m}mm 假设（桌面 ${((je=a==null?void 0:a.deskTopHeightMm)==null?void 0:je.std)??740} + 上层置物）`:`高度未说明：纯桌面按标准桌高 ${m}mm 假设`)}else(i.layers??1)>=2&&m<l?(m=l,t.push(`高度 ${dt}mm 不够容纳桌面+上层置物，已按 hutch 最小总高 ${m}mm 调整`)):m>u&&(m=u,t.push(`工作台高度 ${dt}mm 超出桌架语义区间，已调整为 ${m}mm`))}const E=Xy({width:h,depth:p,loadKg:y,loadType:M,highRisk:v,vibration:((et=i.environment)==null?void 0:et.vibration)??!1,precision:i.stiffnessNeed==="high"}),V=e.sections.some(Te=>Te.section.id===E.use)?E.use:"eu-3030";t.push(`截面选型：${V}（${E.ruleIds.join("+")}，${E.rationale}）`);const N=_M({load:y>60?"heavy":"light",hiddenRequired:((Tt=i.appearance)==null?void 0:Tt.hiddenConnectorsPreferred)??!1,mobility:S});let D=e.connectors.some(Te=>Te.connector.id===N.use)?N.use:"corner-bracket-30";t.push(`连接选型：${D}（${N.ruleIds.join("+")}，${N.rationale}）`);const B=e.sections.find(Te=>Te.section.id===V).section,L=(De=e.connectors.find(Te=>Te.connector.id===D))==null?void 0:De.connector;if(L&&(!L.compatible.series.includes(V)||!L.compatible.slotWidths.includes(B.slot.width))){const Te=e.connectors.filter(dt=>dt.connector.compatible.series.includes(V)&&dt.connector.compatible.slotWidths.includes(B.slot.width)&&dt.connector.loadRole==="primary").sort((dt,Q)=>Q.connector.strengthClass-dt.connector.strengthClass)[0];Te&&(t.push(`连接件兼容回退：${D} 不适配 ${V}，改用 ${Te.connector.name}`),D=Te.connector.id)}_==="workbench"&&t.push("工作台语义至少保留 1 层桌面隔板，已自动补齐");const A=_==="workbench"?.62:void 0,U=_==="workbench"?((it=a==null?void 0:a.deskTopHeightMm)==null?void 0:it.std)??740:void 0,q=_==="workbench"?((pt=a==null?void 0:a.upperShelfDepthRatio)==null?void 0:pt.std)??.55:void 0;_==="workbench"&&t.push("工作台人体工学默认：下层净空更大、上层置物搁板更浅"),i.budgetSensitivity==="high"&&t.push("预算敏感：已按满足安全规则的最经济选型；如需进一步降价可减层/缩尺寸（安全优先于预算）");const X=[],ne={wood:"wood",glass:"glass",acrylic:"acrylic",pegboard:"pegboard"},he={wood:"木板",glass:"玻璃",acrylic:"亚克力",pegboard:"洞洞板",other:"板材"},ae={top:"顶面板",shelf:"隔板",bottom:"底板",side:"侧板",door:"门板",drawer:"抽屉"};let Me="none",$="none",z="none",ee="none",F="none",Y="none",Ce="none",K=0;for(const Te of i.panels??[]){if(Te.material==="none")continue;if(Te.position==="drawer"&&_!=="workbench"){K+=1;continue}const dt=ne[Te.material];if(_==="workbench"&&Te.material==="pegboard"){F="pegboard",t.push("洞洞板：按立面收纳背板处理（电脑桌常见形态）");continue}const Q=dt??(["top","shelf","side","bottom"].includes(Te.position)?"wood":void 0);!dt&&Q&&t.push(`${ae[Te.position]??Te.position}材质未收录，按木板（多层实木）处理`),Te.position==="top"&&Q?(Me=Q,t.push(`顶面板：${he[Te.material]}（材料接口规则 mat-* 自动附安装方式）`)):Te.position==="shelf"&&Q?($=Q,t.push(`隔板：${he[Te.material]}`)):Te.position==="bottom"&&Q?(z=Q,t.push(`底板：${he[Te.material]}（搭底框梁）`)):Te.position==="door"&&dt?(ee=dt,t.push(`门板：${he[Te.material]}（正面单开，槽装合页+磁吸+把手）`)):Te.position==="side"&&Q?Te.material==="pegboard"?(Y=Q,t.push("洞洞板：侧挂于左立面（工具墙收纳语义，案例高频）")):(F=Q,t.push(`侧/背板：${he[Te.material]}（按背板处理，兼作抗侧向体系）`)):X.push(`${ae[Te.position]??Te.position}（${he[Te.material]??Te.material}）`)}_==="workbench"&&($==="none"&&($="wood",t.push("工作台语义默认补齐主桌面板：隔板材质未指定时按木板处理")),m>=l&&Me==="none"&&(Me=$,t.push("带上架电脑桌默认补齐后靠浅层置物板（与主桌面同材质）")),(ee!=="none"||z!=="none"||F!=="none"&&F!=="pegboard")&&(t.push("工作台语义默认开放式：门板/实体背板/底板已关闭（避免生成柜体形态）"),X.push("工作台默认开放式封板（门板/实体背板/底板）")),ee="none",F!=="pegboard"&&(F="none"),z="none"),K>0&&t.push(`抽屉×${K}：成品抽屉盒+反弹轨道方案（无拉手，案例实证拓扑）`);let ce=K;const we=i.productType==="cabinet"||i.productType==="enclosure";if(K===0&&(i.layers??0)>1&&_!=="workbench"&&we&&(ce=Math.min(5,i.layers??0),t.push(`层数 ${i.layers} 按抽屉塔处理（${ce} 层抽屉）`)),K===1&&i.layers==null&&we){const Te=Math.max(1,Math.min(5,Math.round(m/205)));Te>ce&&(ce=Te,t.push(`抽屉层数未说明，按总高 ${m}mm ÷ 节距≈205 估 ${Te} 层（可改）`))}let xe;const Ie=(i.panels??[]).filter(Te=>Te.position==="door"&&Te.material!=="none").length;if(ce>0&&Ie>0&&we&&(xe={offsetRatio:.4,left:{type:"drawer",count:Math.min(5,ce),kind:"ready-made"},right:{type:"cabinet",count:0}},t.push(`抽屉×${ce}+柜门 → 中柱双列分区（左列抽屉/右列柜门，工具柜实证拓扑）`),ce=0,ee="none"),(((_t=xe==null?void 0:xe.right)==null?void 0:_t.type)==="cabinet"||((tt=xe==null?void 0:xe.left)==null?void 0:tt.type)==="cabinet"||ee!=="none")&&we){const Te=[];Me==="none"&&(Me="wood",Te.push("顶板")),z==="none"&&(z="wood",Te.push("底板")),F==="none"&&(F="wood",Te.push("背板")),Y==="none"&&(Y="wood",Te.push("左侧板")),Ce==="none"&&(Ce="wood",Te.push("右侧板")),Te.length&&t.push(`柜体封闭语义：自动补齐 ${Te.join("/")}（木板），带门柜子四周围板`)}const Oe=ce>0?0:i.layers!=null?Math.max(0,Math.min(4,i.layers-1)):1;i.layers==null&&ce===0&&t.push("层数未说明，按 1 层隔板假设");const Ge=xe?0:Oe,Ke=_==="workbench"?Math.max(1,Ge):Ge;i.productType==="other"&&X.push("非框架类主体结构");const ye=new Map;for(const Te of X)ye.set(Te,(ye.get(Te)??0)+1);const Le=[...ye.entries()].map(([Te,dt])=>dt>1?`${Te}×${dt}`:Te);for(const Te of(i._missing??[]).slice(0,2))n.some(dt=>dt.includes(Te.slice(0,4)))||n.push(`请确认：${Te}`);const W=(((Rt=i.environment)==null?void 0:Rt.vibration)??!1)||s.some(Te=>/vibration|振动/.test(Te));return{spec:{width:Md(h,t,"宽"),depth:Md(p,t,"深"),height:Md(m,t,"高"),sectionId:V,connectorId:D,shelfCount:Ke,archetype:R,workbenchLowerZoneRatio:A,workbenchDeskTopHeightMm:U,workbenchUpperShelfDepthRatio:q,loadKg:y,loadType:M,scene:_,highRisk:v,mobility:S,vibration:W,topPanel:Me,shelfPanel:$,bottomPanel:z,doorPanel:ee,backPanel:F,leftPanel:Y,rightPanel:Ce,drawerCount:ce>0?Math.min(5,ce):void 0,drawerKind:ce>0?"ready-made":void 0,centerColumn:xe,brace:!1},assumptions:t,questions:n.slice(0,3),riskFlags:s,unsupported:Le}}const Md=(i,e,t)=>{const n=Math.min(3e3,Math.max(200,Math.round(i/10)*10));return e&&t&&n!==Math.round(i/10)*10&&e.push(`${t}度 ${i}mm 超出支持范围 200~3000，已截断为 ${n}mm，请确认`),n};function AM(i,e){var f;const t=(f=e.rules.cam)==null?void 0:f.nesting,n=(t==null?void 0:t.stockLengthMm)??6e3,s=(t==null?void 0:t.kerfMm)??5,a=i.flatMap(h=>Array.from({length:h.qty},()=>({partNo:h.partNo,length:h.length}))).sort((h,p)=>p.length-h.length);if(!a.length||a[0].length>n)return null;const l=[];for(const h of a){const p=h.length+s,m=l.find(v=>v.usedMm+p<=n);m?(m.cuts.push(h),m.usedMm+=p):l.push({cuts:[h],usedMm:p,remnantMm:0})}for(const h of l)h.remnantMm=n-h.usedMm;const u=a.reduce((h,p)=>h+p.length,0);return{stockLengthMm:n,kerfMm:s,bars:l,utilization:u/(l.length*n),totalStockBars:l.length}}const Ki=i=>String(Math.round(i*100)/100);function lo(i,e,t,n){return["0","LINE","8","0","10",Ki(i),"20",Ki(e),"11",Ki(t),"21",Ki(n)].join(`
`)}function Dg(i,e,t){return["0","CIRCLE","8","0","10",Ki(i),"20",Ki(e),"40",Ki(t)].join(`
`)}function CM(i,e,t,n){return["0","TEXT","8","0","10",Ki(i),"20",Ki(e),"40",Ki(t),"1",n].join(`
`)}function RM(i,e,t,n){const s=i.length,a=e,l=[lo(t,n,t+s,n),lo(t+s,n,t+s,n+a),lo(t+s,n+a,t,n+a),lo(t,n+a,t,n),CM(t,n+a+8,10,`${i.partNo}  ${i.sectionId}  L${s}  x${i.qty}${i.machiningNote?"  "+i.machiningNote:""}`)];for(const u of i.ops)if(u.face==="end"){const f=u.fromStart<=s/2?t:t+s,h=n+a/2;l.push(Dg(f,h,Math.max(2,u.diameter/2))),l.push(lo(f-4,h,f+4,h),lo(f,h-4,f,h+4))}else l.push(Dg(t+u.fromStart,n+a/2,u.diameter/2));return l}function PM(i,e){const t=[];let n=0;for(const s of[...i].sort((a,l)=>l.length-a.length))t.push(...RM(s,e,0,n)),n+=e+60;return["0","SECTION","2","ENTITIES",...t,"0","ENDSEC","0","EOF"].join(`
`)}function LM(i,e){var A;const t=(A=e.connectors.find(U=>U.connector.id===i.spec.connectorId))==null?void 0:A.connector,n=U=>{var q;return((q=e.fasteners[U])==null?void 0:q.name)??U},s=new Map(i.members.map(U=>[U.id,U])),a=new Map(i.panels.map(U=>[U.id,U])),l=U=>[...new Set(U)],u=U=>{var X,ne;const q=new Map;for(const he of U){const ae=((X=s.get(he))==null?void 0:X.partNo)??((ne=a.get(he))==null?void 0:ne.partNo)??he;q.set(ae,(q.get(ae)??0)+1)}return[...q.entries()].map(([he,ae])=>ae>1?`${he}×${ae}`:he)},f=U=>{const q=new Map;for(const X of U)for(const ne of X.fasteners)q.set(ne.sku,(q.get(ne.sku)??0)+ne.qty);return[...q.entries()].map(([X,ne])=>`${n(X)}×${ne}`)},h=U=>((t==null?void 0:t.bom)??[]).map(q=>`${n(q.sku)}×${q.qty*U}`),p=((t==null?void 0:t.bom)??[]).some(U=>/m8|edla/.test(U.sku))?["内六角扳手 6mm"]:["内六角扳手 5mm"],m=((t==null?void 0:t.bom)??[]).some(U=>U.sku.startsWith("t-nut")),v=[];let y=0;const M=(U,q,X,ne,he)=>v.push({step:++y,title:U,parts:q,fasteners:X,tools:ne,note:he});M("识别与清点",i.cutList.map(U=>`${U.partNo}×${U.qty}`),[],[],`对照切割清单与单件加工图核对件号/长度/孔位，确认孔口已去毛刺${m?"；清点滑块(T型螺母)数量，确认规格与连接件匹配":""}`);const S=[...new Set(i.joints.map(U=>Math.round(U.position[1])))].sort((U,q)=>U-q);if(S.length){const U=ne=>i.joints.filter(he=>Math.round(he.position[1])===ne),q=U(S[0]),X=i.members.filter(ne=>ne.role==="post").length;M("底框与立柱",[...u(l(q.map(ne=>ne.beamMemberId))),...u(l(q.map(ne=>ne.postMemberId)))],h(q.length),p,`${X} 根立柱平放，底层横梁用${(t==null?void 0:t.name)??"连接件"}连接（接点×${q.length}）${m?"——⚠ 滑块(T型螺母)必须在校装前从梁端面滑入槽内，连接封闭后无法补装":""}；先不完全拧紧，留校方余地`);for(const ne of S.slice(1,-1)){const he=U(ne);M(`隔板层横梁（高 ${ne}mm）`,u(l(he.map(ae=>ae.beamMemberId))),h(he.length),p,`在 ${ne}mm 高度装本层横梁（接点×${he.length}）`)}if(S.length>1){const ne=U(S[S.length-1]);M("顶框",u(l(ne.map(he=>he.beamMemberId))),h(ne.length),p,`顶层横梁（接点×${ne.length}）；量两条对角线差 ≤2mm 校方后，全部接点二次拧紧`)}}const _=i.mounts.filter(U=>U.targetType==="member");_.length&&M("背面斜撑",u(_.map(U=>U.targetId)),f(_),["内六角扳手 5mm"],_[0].note);const x=U=>i.mounts.filter(q=>{var X;return q.targetType==="panel"&&U.includes(((X=a.get(q.targetId))==null?void 0:X.mode)??"")}),R=x(["top-overlay","top-inset","shelf-overlap"]);R.length&&M("水平板材（顶板/隔板/底板）",u(R.map(U=>U.targetId)),f(R),["内六角扳手 5mm"],"板孔对准梁中心槽，T型螺母入槽固定；软材质用胶垫承托+压条，禁止硬压");const P=x(["back-overlay","side-overlay"]);P.length&&M("背板/侧板/围网",u(P.map(U=>U.targetId)),f(P),["内六角扳手 5mm"],"外贴于框架侧面，四角固定于立柱槽；围网先 U 型包边");const E=x(["door-front"]);E.length&&M("门板",u(E.map(U=>U.targetId)),f(E),["内六角扳手 5mm","十字螺丝刀"],E[0].note+"；先装合页侧，调平后装磁吸与把手");const V=i.mounts.filter(U=>U.method==="drawer-slide");V.length&&M("抽屉与轨道",[`抽屉×${V.length}`],f(V),["十字螺丝刀","内六角扳手 3mm"],V[0].note+"；先装轨道外轨于梁槽，抽屉带内轨推入；逐层试拉顺畅后锁紧");const N=x(["drawer-front"]);N.length&&M("抽屉前脸与拉手",u(N.map(U=>U.targetId)),f(N),["十字螺丝刀"],"前脸板从盒内 M4 反锁（先点固调缝：与邻列门板共面、层间缝均匀后锁紧）；横拉手穿前脸 Φ5 孔孔距96 螺丝固定");const D=i.mounts.filter(U=>U.method==="caster-stem");D.length&&M("脚轮",[`丝杆脚轮×${D.length}`],f(D),["扳手 13mm(可选)"],"整体翻转，丝杆拧入立柱底端面 M8 攻牙至根部；落地后测试锁定");const B=i.mounts.filter(U=>U.method==="foot-stem");B.length&&M("调平地脚",[`调平地脚×${B.length}`],f(B),["扳手 13mm(可选)"],"整体翻转，地脚拧入立柱底端面 M8 攻牙；落地后旋调各脚消除晃动");const L=i.mounts.filter(U=>U.method==="slot-embed");return L.length&&M("LED 灯条",["LED 灯条+电源"],f(L),[],L[0].note),M("终检",[],[],["卷尺"],"对角线复测；全部螺栓二次紧固；活动件（门/脚轮）开合顺畅；高风险场景核对结构校验清单"),v}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wp="170",Mr={ROTATE:0,DOLLY:1,PAN:2},Lo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},IM=0,Ng=1,DM=2,Yy=1,NM=2,mr=3,ns=0,Yn=1,vr=2,es=0,Oo=1,kg=2,Ug=3,Og=4,kM=5,Es=100,UM=101,OM=102,FM=103,zM=104,BM=200,HM=201,VM=202,GM=203,fh=204,dh=205,WM=206,jM=207,$M=208,XM=209,qM=210,KM=211,YM=212,ZM=213,JM=214,hh=0,ph=1,mh=2,Go=3,gh=4,vh=5,yh=6,_h=7,Zy=0,QM=1,ew=2,ts=0,tw=1,nw=2,iw=3,Jy=4,rw=5,sw=6,ow=7,Qy=300,Wo=301,jo=302,xh=303,Sh=304,Eu=306,cu=1e3,Cs=1001,Mh=1002,Hi=1003,aw=1004,Sc=1005,Yi=1006,wd=1007,Rs=1008,Er=1009,e_=1010,t_=1011,il=1012,Ep=1013,Is=1014,_r=1015,dl=1016,bp=1017,Tp=1018,$o=1020,n_=35902,i_=1021,r_=1022,Bi=1023,s_=1024,o_=1025,Fo=1026,Xo=1027,a_=1028,Ap=1029,l_=1030,Cp=1031,Rp=1033,eu=33776,tu=33777,nu=33778,iu=33779,wh=35840,Eh=35841,bh=35842,Th=35843,Ah=36196,Ch=37492,Rh=37496,Ph=37808,Lh=37809,Ih=37810,Dh=37811,Nh=37812,kh=37813,Uh=37814,Oh=37815,Fh=37816,zh=37817,Bh=37818,Hh=37819,Vh=37820,Gh=37821,ru=36492,Wh=36494,jh=36495,c_=36283,$h=36284,Xh=36285,qh=36286,lw=3200,cw=3201,u_=0,uw=1,Jr="",wi="srgb",ea="srgb-linear",bu="linear",Yt="srgb",co=7680,Fg=519,fw=512,dw=513,hw=514,f_=515,pw=516,mw=517,gw=518,vw=519,zg=35044,Bg="300 es",xr=2e3,uu=2001;class Us{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let a=0,l=s.length;a<l;a++)s[a].call(this,e);e.target=null}}}const Hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hg=1234567;const zo=Math.PI/180,rl=180/Math.PI;function Os(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Hn[i&255]+Hn[i>>8&255]+Hn[i>>16&255]+Hn[i>>24&255]+"-"+Hn[e&255]+Hn[e>>8&255]+"-"+Hn[e>>16&15|64]+Hn[e>>24&255]+"-"+Hn[t&63|128]+Hn[t>>8&255]+"-"+Hn[t>>16&255]+Hn[t>>24&255]+Hn[n&255]+Hn[n>>8&255]+Hn[n>>16&255]+Hn[n>>24&255]).toLowerCase()}function Ln(i,e,t){return Math.max(e,Math.min(t,i))}function Pp(i,e){return(i%e+e)%e}function yw(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function _w(i,e,t){return i!==e?(t-i)/(e-i):0}function Ka(i,e,t){return(1-t)*i+t*e}function xw(i,e,t,n){return Ka(i,e,1-Math.exp(-t*n))}function Sw(i,e=1){return e-Math.abs(Pp(i,e*2)-e)}function Mw(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function ww(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Ew(i,e){return i+Math.floor(Math.random()*(e-i+1))}function bw(i,e){return i+Math.random()*(e-i)}function Tw(i){return i*(.5-Math.random())}function Aw(i){i!==void 0&&(Hg=i);let e=Hg+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cw(i){return i*zo}function Rw(i){return i*rl}function Pw(i){return(i&i-1)===0&&i!==0}function Lw(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Iw(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Dw(i,e,t,n,s){const a=Math.cos,l=Math.sin,u=a(t/2),f=l(t/2),h=a((e+n)/2),p=l((e+n)/2),m=a((e-n)/2),v=l((e-n)/2),y=a((n-e)/2),M=l((n-e)/2);switch(s){case"XYX":i.set(u*p,f*m,f*v,u*h);break;case"YZY":i.set(f*v,u*p,f*m,u*h);break;case"ZXZ":i.set(f*m,f*v,u*p,u*h);break;case"XZX":i.set(u*p,f*M,f*y,u*h);break;case"YXY":i.set(f*y,u*p,f*M,u*h);break;case"ZYZ":i.set(f*M,f*y,u*p,u*h);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ao(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function $n(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Kh={DEG2RAD:zo,RAD2DEG:rl,generateUUID:Os,clamp:Ln,euclideanModulo:Pp,mapLinear:yw,inverseLerp:_w,lerp:Ka,damp:xw,pingpong:Sw,smoothstep:Mw,smootherstep:ww,randInt:Ew,randFloat:bw,randFloatSpread:Tw,seededRandom:Aw,degToRad:Cw,radToDeg:Rw,isPowerOfTwo:Pw,ceilPowerOfTwo:Lw,floorPowerOfTwo:Iw,setQuaternionFromProperEuler:Dw,normalize:$n,denormalize:Ao};class $e{constructor(e=0,t=0){$e.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ln(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),a=this.x-e.x,l=this.y-e.y;return this.x=a*n-l*s+e.x,this.y=a*s+l*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class kt{constructor(e,t,n,s,a,l,u,f,h){kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,a,l,u,f,h)}set(e,t,n,s,a,l,u,f,h){const p=this.elements;return p[0]=e,p[1]=s,p[2]=u,p[3]=t,p[4]=a,p[5]=f,p[6]=n,p[7]=l,p[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,a=this.elements,l=n[0],u=n[3],f=n[6],h=n[1],p=n[4],m=n[7],v=n[2],y=n[5],M=n[8],S=s[0],_=s[3],x=s[6],R=s[1],P=s[4],E=s[7],V=s[2],N=s[5],D=s[8];return a[0]=l*S+u*R+f*V,a[3]=l*_+u*P+f*N,a[6]=l*x+u*E+f*D,a[1]=h*S+p*R+m*V,a[4]=h*_+p*P+m*N,a[7]=h*x+p*E+m*D,a[2]=v*S+y*R+M*V,a[5]=v*_+y*P+M*N,a[8]=v*x+y*E+M*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],l=e[4],u=e[5],f=e[6],h=e[7],p=e[8];return t*l*p-t*u*h-n*a*p+n*u*f+s*a*h-s*l*f}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],l=e[4],u=e[5],f=e[6],h=e[7],p=e[8],m=p*l-u*h,v=u*f-p*a,y=h*a-l*f,M=t*m+n*v+s*y;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/M;return e[0]=m*S,e[1]=(s*h-p*n)*S,e[2]=(u*n-s*l)*S,e[3]=v*S,e[4]=(p*t-s*f)*S,e[5]=(s*a-u*t)*S,e[6]=y*S,e[7]=(n*f-h*t)*S,e[8]=(l*t-n*a)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,a,l,u){const f=Math.cos(a),h=Math.sin(a);return this.set(n*f,n*h,-n*(f*l+h*u)+l+e,-s*h,s*f,-s*(-h*l+f*u)+u+t,0,0,1),this}scale(e,t){return this.premultiply(Ed.makeScale(e,t)),this}rotate(e){return this.premultiply(Ed.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ed.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ed=new kt;function d_(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function fu(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Nw(){const i=fu("canvas");return i.style.display="block",i}const Vg={};function Wa(i){i in Vg||(Vg[i]=!0,console.warn(i))}function kw(i,e,t){return new Promise(function(n,s){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}function Uw(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Ow(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Gt={enabled:!0,workingColorSpace:ea,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===Yt&&(i.r=wr(i.r),i.g=wr(i.g),i.b=wr(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===Yt&&(i.r=Bo(i.r),i.g=Bo(i.g),i.b=Bo(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Jr?bu:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function wr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Gg=[.64,.33,.3,.6,.15,.06],Wg=[.2126,.7152,.0722],jg=[.3127,.329],$g=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xg=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Gt.define({[ea]:{primaries:Gg,whitePoint:jg,transfer:bu,toXYZ:$g,fromXYZ:Xg,luminanceCoefficients:Wg,workingColorSpaceConfig:{unpackColorSpace:wi},outputColorSpaceConfig:{drawingBufferColorSpace:wi}},[wi]:{primaries:Gg,whitePoint:jg,transfer:Yt,toXYZ:$g,fromXYZ:Xg,luminanceCoefficients:Wg,outputColorSpaceConfig:{drawingBufferColorSpace:wi}}});let uo;class Fw{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{uo===void 0&&(uo=fu("canvas")),uo.width=e.width,uo.height=e.height;const n=uo.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=uo}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fu("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),a=s.data;for(let l=0;l<a.length;l++)a[l]=wr(a[l]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(wr(t[n]/255)*255):t[n]=wr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zw=0;class h_{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zw++}),this.uuid=Os(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let l=0,u=s.length;l<u;l++)s[l].isDataTexture?a.push(bd(s[l].image)):a.push(bd(s[l]))}else a=bd(s);n.url=a}return t||(e.images[this.uuid]=n),n}}function bd(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Fw.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bw=0;class Zn extends Us{constructor(e=Zn.DEFAULT_IMAGE,t=Zn.DEFAULT_MAPPING,n=Cs,s=Cs,a=Yi,l=Rs,u=Bi,f=Er,h=Zn.DEFAULT_ANISOTROPY,p=Jr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bw++}),this.uuid=Os(),this.name="",this.source=new h_(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=a,this.minFilter=l,this.anisotropy=h,this.format=u,this.internalFormat=null,this.type=f,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=p,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Qy)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case cu:e.x=e.x-Math.floor(e.x);break;case Cs:e.x=e.x<0?0:1;break;case Mh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case cu:e.y=e.y-Math.floor(e.y);break;case Cs:e.y=e.y<0?0:1;break;case Mh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Zn.DEFAULT_IMAGE=null;Zn.DEFAULT_MAPPING=Qy;Zn.DEFAULT_ANISOTROPY=1;class Jt{constructor(e=0,t=0,n=0,s=1){Jt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,a=this.w,l=e.elements;return this.x=l[0]*t+l[4]*n+l[8]*s+l[12]*a,this.y=l[1]*t+l[5]*n+l[9]*s+l[13]*a,this.z=l[2]*t+l[6]*n+l[10]*s+l[14]*a,this.w=l[3]*t+l[7]*n+l[11]*s+l[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,a;const f=e.elements,h=f[0],p=f[4],m=f[8],v=f[1],y=f[5],M=f[9],S=f[2],_=f[6],x=f[10];if(Math.abs(p-v)<.01&&Math.abs(m-S)<.01&&Math.abs(M-_)<.01){if(Math.abs(p+v)<.1&&Math.abs(m+S)<.1&&Math.abs(M+_)<.1&&Math.abs(h+y+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const P=(h+1)/2,E=(y+1)/2,V=(x+1)/2,N=(p+v)/4,D=(m+S)/4,B=(M+_)/4;return P>E&&P>V?P<.01?(n=0,s=.707106781,a=.707106781):(n=Math.sqrt(P),s=N/n,a=D/n):E>V?E<.01?(n=.707106781,s=0,a=.707106781):(s=Math.sqrt(E),n=N/s,a=B/s):V<.01?(n=.707106781,s=.707106781,a=0):(a=Math.sqrt(V),n=D/a,s=B/a),this.set(n,s,a,t),this}let R=Math.sqrt((_-M)*(_-M)+(m-S)*(m-S)+(v-p)*(v-p));return Math.abs(R)<.001&&(R=1),this.x=(_-M)/R,this.y=(m-S)/R,this.z=(v-p)/R,this.w=Math.acos((h+y+x-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hw extends Us{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Jt(0,0,e,t),this.scissorTest=!1,this.viewport=new Jt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new Zn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let u=0;u<l;u++)this.textures[u]=a.clone(),this.textures[u].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new h_(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ds extends Hw{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class p_ extends Zn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Hi,this.minFilter=Hi,this.wrapR=Cs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Vw extends Zn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Hi,this.minFilter=Hi,this.wrapR=Cs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ns{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,a,l,u){let f=n[s+0],h=n[s+1],p=n[s+2],m=n[s+3];const v=a[l+0],y=a[l+1],M=a[l+2],S=a[l+3];if(u===0){e[t+0]=f,e[t+1]=h,e[t+2]=p,e[t+3]=m;return}if(u===1){e[t+0]=v,e[t+1]=y,e[t+2]=M,e[t+3]=S;return}if(m!==S||f!==v||h!==y||p!==M){let _=1-u;const x=f*v+h*y+p*M+m*S,R=x>=0?1:-1,P=1-x*x;if(P>Number.EPSILON){const V=Math.sqrt(P),N=Math.atan2(V,x*R);_=Math.sin(_*N)/V,u=Math.sin(u*N)/V}const E=u*R;if(f=f*_+v*E,h=h*_+y*E,p=p*_+M*E,m=m*_+S*E,_===1-u){const V=1/Math.sqrt(f*f+h*h+p*p+m*m);f*=V,h*=V,p*=V,m*=V}}e[t]=f,e[t+1]=h,e[t+2]=p,e[t+3]=m}static multiplyQuaternionsFlat(e,t,n,s,a,l){const u=n[s],f=n[s+1],h=n[s+2],p=n[s+3],m=a[l],v=a[l+1],y=a[l+2],M=a[l+3];return e[t]=u*M+p*m+f*y-h*v,e[t+1]=f*M+p*v+h*m-u*y,e[t+2]=h*M+p*y+u*v-f*m,e[t+3]=p*M-u*m-f*v-h*y,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,a=e._z,l=e._order,u=Math.cos,f=Math.sin,h=u(n/2),p=u(s/2),m=u(a/2),v=f(n/2),y=f(s/2),M=f(a/2);switch(l){case"XYZ":this._x=v*p*m+h*y*M,this._y=h*y*m-v*p*M,this._z=h*p*M+v*y*m,this._w=h*p*m-v*y*M;break;case"YXZ":this._x=v*p*m+h*y*M,this._y=h*y*m-v*p*M,this._z=h*p*M-v*y*m,this._w=h*p*m+v*y*M;break;case"ZXY":this._x=v*p*m-h*y*M,this._y=h*y*m+v*p*M,this._z=h*p*M+v*y*m,this._w=h*p*m-v*y*M;break;case"ZYX":this._x=v*p*m-h*y*M,this._y=h*y*m+v*p*M,this._z=h*p*M-v*y*m,this._w=h*p*m+v*y*M;break;case"YZX":this._x=v*p*m+h*y*M,this._y=h*y*m+v*p*M,this._z=h*p*M-v*y*m,this._w=h*p*m-v*y*M;break;case"XZY":this._x=v*p*m-h*y*M,this._y=h*y*m-v*p*M,this._z=h*p*M+v*y*m,this._w=h*p*m+v*y*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],a=t[8],l=t[1],u=t[5],f=t[9],h=t[2],p=t[6],m=t[10],v=n+u+m;if(v>0){const y=.5/Math.sqrt(v+1);this._w=.25/y,this._x=(p-f)*y,this._y=(a-h)*y,this._z=(l-s)*y}else if(n>u&&n>m){const y=2*Math.sqrt(1+n-u-m);this._w=(p-f)/y,this._x=.25*y,this._y=(s+l)/y,this._z=(a+h)/y}else if(u>m){const y=2*Math.sqrt(1+u-n-m);this._w=(a-h)/y,this._x=(s+l)/y,this._y=.25*y,this._z=(f+p)/y}else{const y=2*Math.sqrt(1+m-n-u);this._w=(l-s)/y,this._x=(a+h)/y,this._y=(f+p)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ln(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,a=e._z,l=e._w,u=t._x,f=t._y,h=t._z,p=t._w;return this._x=n*p+l*u+s*h-a*f,this._y=s*p+l*f+a*u-n*h,this._z=a*p+l*h+n*f-s*u,this._w=l*p-n*u-s*f-a*h,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,a=this._z,l=this._w;let u=l*e._w+n*e._x+s*e._y+a*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=l,this._x=n,this._y=s,this._z=a,this;const f=1-u*u;if(f<=Number.EPSILON){const y=1-t;return this._w=y*l+t*this._w,this._x=y*n+t*this._x,this._y=y*s+t*this._y,this._z=y*a+t*this._z,this.normalize(),this}const h=Math.sqrt(f),p=Math.atan2(h,u),m=Math.sin((1-t)*p)/h,v=Math.sin(t*p)/h;return this._w=l*m+this._w*v,this._x=n*m+this._x*v,this._y=s*m+this._y*v,this._z=a*m+this._z*v,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(e=0,t=0,n=0){J.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qg.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qg.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*s,this.y=a[1]*t+a[4]*n+a[7]*s,this.z=a[2]*t+a[5]*n+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,a=e.elements,l=1/(a[3]*t+a[7]*n+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*s+a[12])*l,this.y=(a[1]*t+a[5]*n+a[9]*s+a[13])*l,this.z=(a[2]*t+a[6]*n+a[10]*s+a[14])*l,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,a=e.x,l=e.y,u=e.z,f=e.w,h=2*(l*s-u*n),p=2*(u*t-a*s),m=2*(a*n-l*t);return this.x=t+f*h+l*m-u*p,this.y=n+f*p+u*h-a*m,this.z=s+f*m+a*p-l*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s,this.y=a[1]*t+a[5]*n+a[9]*s,this.z=a[2]*t+a[6]*n+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,a=e.z,l=t.x,u=t.y,f=t.z;return this.x=s*f-a*u,this.y=a*l-n*f,this.z=n*u-s*l,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Td.copy(this).projectOnVector(e),this.sub(Td)}reflect(e){return this.sub(Td.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ln(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Td=new J,qg=new Ns;class hl{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Oi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Oi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Oi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let l=0,u=a.count;l<u;l++)e.isMesh===!0?e.getVertexPosition(l,Oi):Oi.fromBufferAttribute(a,l),Oi.applyMatrix4(e.matrixWorld),this.expandByPoint(Oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Mc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Mc.copy(n.boundingBox)),Mc.applyMatrix4(e.matrixWorld),this.union(Mc)}const s=e.children;for(let a=0,l=s.length;a<l;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Oi),Oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ua),wc.subVectors(this.max,Ua),fo.subVectors(e.a,Ua),ho.subVectors(e.b,Ua),po.subVectors(e.c,Ua),Wr.subVectors(ho,fo),jr.subVectors(po,ho),gs.subVectors(fo,po);let t=[0,-Wr.z,Wr.y,0,-jr.z,jr.y,0,-gs.z,gs.y,Wr.z,0,-Wr.x,jr.z,0,-jr.x,gs.z,0,-gs.x,-Wr.y,Wr.x,0,-jr.y,jr.x,0,-gs.y,gs.x,0];return!Ad(t,fo,ho,po,wc)||(t=[1,0,0,0,1,0,0,0,1],!Ad(t,fo,ho,po,wc))?!1:(Ec.crossVectors(Wr,jr),t=[Ec.x,Ec.y,Ec.z],Ad(t,fo,ho,po,wc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ur[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ur[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ur[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ur[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ur[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ur[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ur[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ur[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ur),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ur=[new J,new J,new J,new J,new J,new J,new J,new J],Oi=new J,Mc=new hl,fo=new J,ho=new J,po=new J,Wr=new J,jr=new J,gs=new J,Ua=new J,wc=new J,Ec=new J,vs=new J;function Ad(i,e,t,n,s){for(let a=0,l=i.length-3;a<=l;a+=3){vs.fromArray(i,a);const u=s.x*Math.abs(vs.x)+s.y*Math.abs(vs.y)+s.z*Math.abs(vs.z),f=e.dot(vs),h=t.dot(vs),p=n.dot(vs);if(Math.max(-Math.max(f,h,p),Math.min(f,h,p))>u)return!1}return!0}const Gw=new hl,Oa=new J,Cd=new J;class Tu{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Gw.setFromPoints(e).getCenter(n);let s=0;for(let a=0,l=e.length;a<l;a++)s=Math.max(s,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Oa.subVectors(e,this.center);const t=Oa.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Oa,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Oa.copy(e.center).add(Cd)),this.expandByPoint(Oa.copy(e.center).sub(Cd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fr=new J,Rd=new J,bc=new J,$r=new J,Pd=new J,Tc=new J,Ld=new J;class Au{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fr.copy(this.origin).addScaledVector(this.direction,t),fr.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Rd.copy(e).add(t).multiplyScalar(.5),bc.copy(t).sub(e).normalize(),$r.copy(this.origin).sub(Rd);const a=e.distanceTo(t)*.5,l=-this.direction.dot(bc),u=$r.dot(this.direction),f=-$r.dot(bc),h=$r.lengthSq(),p=Math.abs(1-l*l);let m,v,y,M;if(p>0)if(m=l*f-u,v=l*u-f,M=a*p,m>=0)if(v>=-M)if(v<=M){const S=1/p;m*=S,v*=S,y=m*(m+l*v+2*u)+v*(l*m+v+2*f)+h}else v=a,m=Math.max(0,-(l*v+u)),y=-m*m+v*(v+2*f)+h;else v=-a,m=Math.max(0,-(l*v+u)),y=-m*m+v*(v+2*f)+h;else v<=-M?(m=Math.max(0,-(-l*a+u)),v=m>0?-a:Math.min(Math.max(-a,-f),a),y=-m*m+v*(v+2*f)+h):v<=M?(m=0,v=Math.min(Math.max(-a,-f),a),y=v*(v+2*f)+h):(m=Math.max(0,-(l*a+u)),v=m>0?a:Math.min(Math.max(-a,-f),a),y=-m*m+v*(v+2*f)+h);else v=l>0?-a:a,m=Math.max(0,-(l*v+u)),y=-m*m+v*(v+2*f)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(Rd).addScaledVector(bc,v),y}intersectSphere(e,t){fr.subVectors(e.center,this.origin);const n=fr.dot(this.direction),s=fr.dot(fr)-n*n,a=e.radius*e.radius;if(s>a)return null;const l=Math.sqrt(a-s),u=n-l,f=n+l;return f<0?null:u<0?this.at(f,t):this.at(u,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,a,l,u,f;const h=1/this.direction.x,p=1/this.direction.y,m=1/this.direction.z,v=this.origin;return h>=0?(n=(e.min.x-v.x)*h,s=(e.max.x-v.x)*h):(n=(e.max.x-v.x)*h,s=(e.min.x-v.x)*h),p>=0?(a=(e.min.y-v.y)*p,l=(e.max.y-v.y)*p):(a=(e.max.y-v.y)*p,l=(e.min.y-v.y)*p),n>l||a>s||((a>n||isNaN(n))&&(n=a),(l<s||isNaN(s))&&(s=l),m>=0?(u=(e.min.z-v.z)*m,f=(e.max.z-v.z)*m):(u=(e.max.z-v.z)*m,f=(e.min.z-v.z)*m),n>f||u>s)||((u>n||n!==n)&&(n=u),(f<s||s!==s)&&(s=f),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,fr)!==null}intersectTriangle(e,t,n,s,a){Pd.subVectors(t,e),Tc.subVectors(n,e),Ld.crossVectors(Pd,Tc);let l=this.direction.dot(Ld),u;if(l>0){if(s)return null;u=1}else if(l<0)u=-1,l=-l;else return null;$r.subVectors(this.origin,e);const f=u*this.direction.dot(Tc.crossVectors($r,Tc));if(f<0)return null;const h=u*this.direction.dot(Pd.cross($r));if(h<0||f+h>l)return null;const p=-u*$r.dot(Ld);return p<0?null:this.at(p/l,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qt{constructor(e,t,n,s,a,l,u,f,h,p,m,v,y,M,S,_){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,a,l,u,f,h,p,m,v,y,M,S,_)}set(e,t,n,s,a,l,u,f,h,p,m,v,y,M,S,_){const x=this.elements;return x[0]=e,x[4]=t,x[8]=n,x[12]=s,x[1]=a,x[5]=l,x[9]=u,x[13]=f,x[2]=h,x[6]=p,x[10]=m,x[14]=v,x[3]=y,x[7]=M,x[11]=S,x[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/mo.setFromMatrixColumn(e,0).length(),a=1/mo.setFromMatrixColumn(e,1).length(),l=1/mo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*l,t[9]=n[9]*l,t[10]=n[10]*l,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,a=e.z,l=Math.cos(n),u=Math.sin(n),f=Math.cos(s),h=Math.sin(s),p=Math.cos(a),m=Math.sin(a);if(e.order==="XYZ"){const v=l*p,y=l*m,M=u*p,S=u*m;t[0]=f*p,t[4]=-f*m,t[8]=h,t[1]=y+M*h,t[5]=v-S*h,t[9]=-u*f,t[2]=S-v*h,t[6]=M+y*h,t[10]=l*f}else if(e.order==="YXZ"){const v=f*p,y=f*m,M=h*p,S=h*m;t[0]=v+S*u,t[4]=M*u-y,t[8]=l*h,t[1]=l*m,t[5]=l*p,t[9]=-u,t[2]=y*u-M,t[6]=S+v*u,t[10]=l*f}else if(e.order==="ZXY"){const v=f*p,y=f*m,M=h*p,S=h*m;t[0]=v-S*u,t[4]=-l*m,t[8]=M+y*u,t[1]=y+M*u,t[5]=l*p,t[9]=S-v*u,t[2]=-l*h,t[6]=u,t[10]=l*f}else if(e.order==="ZYX"){const v=l*p,y=l*m,M=u*p,S=u*m;t[0]=f*p,t[4]=M*h-y,t[8]=v*h+S,t[1]=f*m,t[5]=S*h+v,t[9]=y*h-M,t[2]=-h,t[6]=u*f,t[10]=l*f}else if(e.order==="YZX"){const v=l*f,y=l*h,M=u*f,S=u*h;t[0]=f*p,t[4]=S-v*m,t[8]=M*m+y,t[1]=m,t[5]=l*p,t[9]=-u*p,t[2]=-h*p,t[6]=y*m+M,t[10]=v-S*m}else if(e.order==="XZY"){const v=l*f,y=l*h,M=u*f,S=u*h;t[0]=f*p,t[4]=-m,t[8]=h*p,t[1]=v*m+S,t[5]=l*p,t[9]=y*m-M,t[2]=M*m-y,t[6]=u*p,t[10]=S*m+v}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ww,e,jw)}lookAt(e,t,n){const s=this.elements;return di.subVectors(e,t),di.lengthSq()===0&&(di.z=1),di.normalize(),Xr.crossVectors(n,di),Xr.lengthSq()===0&&(Math.abs(n.z)===1?di.x+=1e-4:di.z+=1e-4,di.normalize(),Xr.crossVectors(n,di)),Xr.normalize(),Ac.crossVectors(di,Xr),s[0]=Xr.x,s[4]=Ac.x,s[8]=di.x,s[1]=Xr.y,s[5]=Ac.y,s[9]=di.y,s[2]=Xr.z,s[6]=Ac.z,s[10]=di.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,a=this.elements,l=n[0],u=n[4],f=n[8],h=n[12],p=n[1],m=n[5],v=n[9],y=n[13],M=n[2],S=n[6],_=n[10],x=n[14],R=n[3],P=n[7],E=n[11],V=n[15],N=s[0],D=s[4],B=s[8],L=s[12],A=s[1],U=s[5],q=s[9],X=s[13],ne=s[2],he=s[6],ae=s[10],Me=s[14],$=s[3],z=s[7],ee=s[11],F=s[15];return a[0]=l*N+u*A+f*ne+h*$,a[4]=l*D+u*U+f*he+h*z,a[8]=l*B+u*q+f*ae+h*ee,a[12]=l*L+u*X+f*Me+h*F,a[1]=p*N+m*A+v*ne+y*$,a[5]=p*D+m*U+v*he+y*z,a[9]=p*B+m*q+v*ae+y*ee,a[13]=p*L+m*X+v*Me+y*F,a[2]=M*N+S*A+_*ne+x*$,a[6]=M*D+S*U+_*he+x*z,a[10]=M*B+S*q+_*ae+x*ee,a[14]=M*L+S*X+_*Me+x*F,a[3]=R*N+P*A+E*ne+V*$,a[7]=R*D+P*U+E*he+V*z,a[11]=R*B+P*q+E*ae+V*ee,a[15]=R*L+P*X+E*Me+V*F,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],a=e[12],l=e[1],u=e[5],f=e[9],h=e[13],p=e[2],m=e[6],v=e[10],y=e[14],M=e[3],S=e[7],_=e[11],x=e[15];return M*(+a*f*m-s*h*m-a*u*v+n*h*v+s*u*y-n*f*y)+S*(+t*f*y-t*h*v+a*l*v-s*l*y+s*h*p-a*f*p)+_*(+t*h*m-t*u*y-a*l*m+n*l*y+a*u*p-n*h*p)+x*(-s*u*p-t*f*m+t*u*v+s*l*m-n*l*v+n*f*p)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],l=e[4],u=e[5],f=e[6],h=e[7],p=e[8],m=e[9],v=e[10],y=e[11],M=e[12],S=e[13],_=e[14],x=e[15],R=m*_*h-S*v*h+S*f*y-u*_*y-m*f*x+u*v*x,P=M*v*h-p*_*h-M*f*y+l*_*y+p*f*x-l*v*x,E=p*S*h-M*m*h+M*u*y-l*S*y-p*u*x+l*m*x,V=M*m*f-p*S*f-M*u*v+l*S*v+p*u*_-l*m*_,N=t*R+n*P+s*E+a*V;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/N;return e[0]=R*D,e[1]=(S*v*a-m*_*a-S*s*y+n*_*y+m*s*x-n*v*x)*D,e[2]=(u*_*a-S*f*a+S*s*h-n*_*h-u*s*x+n*f*x)*D,e[3]=(m*f*a-u*v*a-m*s*h+n*v*h+u*s*y-n*f*y)*D,e[4]=P*D,e[5]=(p*_*a-M*v*a+M*s*y-t*_*y-p*s*x+t*v*x)*D,e[6]=(M*f*a-l*_*a-M*s*h+t*_*h+l*s*x-t*f*x)*D,e[7]=(l*v*a-p*f*a+p*s*h-t*v*h-l*s*y+t*f*y)*D,e[8]=E*D,e[9]=(M*m*a-p*S*a-M*n*y+t*S*y+p*n*x-t*m*x)*D,e[10]=(l*S*a-M*u*a+M*n*h-t*S*h-l*n*x+t*u*x)*D,e[11]=(p*u*a-l*m*a-p*n*h+t*m*h+l*n*y-t*u*y)*D,e[12]=V*D,e[13]=(p*S*s-M*m*s+M*n*v-t*S*v-p*n*_+t*m*_)*D,e[14]=(M*u*s-l*S*s-M*n*f+t*S*f+l*n*_-t*u*_)*D,e[15]=(l*m*s-p*u*s+p*n*f-t*m*f-l*n*v+t*u*v)*D,this}scale(e){const t=this.elements,n=e.x,s=e.y,a=e.z;return t[0]*=n,t[4]*=s,t[8]*=a,t[1]*=n,t[5]*=s,t[9]*=a,t[2]*=n,t[6]*=s,t[10]*=a,t[3]*=n,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),a=1-n,l=e.x,u=e.y,f=e.z,h=a*l,p=a*u;return this.set(h*l+n,h*u-s*f,h*f+s*u,0,h*u+s*f,p*u+n,p*f-s*l,0,h*f-s*u,p*f+s*l,a*f*f+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,a,l){return this.set(1,n,a,0,e,1,l,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,a=t._x,l=t._y,u=t._z,f=t._w,h=a+a,p=l+l,m=u+u,v=a*h,y=a*p,M=a*m,S=l*p,_=l*m,x=u*m,R=f*h,P=f*p,E=f*m,V=n.x,N=n.y,D=n.z;return s[0]=(1-(S+x))*V,s[1]=(y+E)*V,s[2]=(M-P)*V,s[3]=0,s[4]=(y-E)*N,s[5]=(1-(v+x))*N,s[6]=(_+R)*N,s[7]=0,s[8]=(M+P)*D,s[9]=(_-R)*D,s[10]=(1-(v+S))*D,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let a=mo.set(s[0],s[1],s[2]).length();const l=mo.set(s[4],s[5],s[6]).length(),u=mo.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],Fi.copy(this);const h=1/a,p=1/l,m=1/u;return Fi.elements[0]*=h,Fi.elements[1]*=h,Fi.elements[2]*=h,Fi.elements[4]*=p,Fi.elements[5]*=p,Fi.elements[6]*=p,Fi.elements[8]*=m,Fi.elements[9]*=m,Fi.elements[10]*=m,t.setFromRotationMatrix(Fi),n.x=a,n.y=l,n.z=u,this}makePerspective(e,t,n,s,a,l,u=xr){const f=this.elements,h=2*a/(t-e),p=2*a/(n-s),m=(t+e)/(t-e),v=(n+s)/(n-s);let y,M;if(u===xr)y=-(l+a)/(l-a),M=-2*l*a/(l-a);else if(u===uu)y=-l/(l-a),M=-l*a/(l-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);return f[0]=h,f[4]=0,f[8]=m,f[12]=0,f[1]=0,f[5]=p,f[9]=v,f[13]=0,f[2]=0,f[6]=0,f[10]=y,f[14]=M,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,n,s,a,l,u=xr){const f=this.elements,h=1/(t-e),p=1/(n-s),m=1/(l-a),v=(t+e)*h,y=(n+s)*p;let M,S;if(u===xr)M=(l+a)*m,S=-2*m;else if(u===uu)M=a*m,S=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);return f[0]=2*h,f[4]=0,f[8]=0,f[12]=-v,f[1]=0,f[5]=2*p,f[9]=0,f[13]=-y,f[2]=0,f[6]=0,f[10]=S,f[14]=-M,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const mo=new J,Fi=new Qt,Ww=new J(0,0,0),jw=new J(1,1,1),Xr=new J,Ac=new J,di=new J,Kg=new Qt,Yg=new Ns;class Qi{constructor(e=0,t=0,n=0,s=Qi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,a=s[0],l=s[4],u=s[8],f=s[1],h=s[5],p=s[9],m=s[2],v=s[6],y=s[10];switch(t){case"XYZ":this._y=Math.asin(Ln(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-p,y),this._z=Math.atan2(-l,a)):(this._x=Math.atan2(v,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ln(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(u,y),this._z=Math.atan2(f,h)):(this._y=Math.atan2(-m,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ln(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-m,y),this._z=Math.atan2(-l,h)):(this._y=0,this._z=Math.atan2(f,a));break;case"ZYX":this._y=Math.asin(-Ln(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(v,y),this._z=Math.atan2(f,a)):(this._x=0,this._z=Math.atan2(-l,h));break;case"YZX":this._z=Math.asin(Ln(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-p,h),this._y=Math.atan2(-m,a)):(this._x=0,this._y=Math.atan2(u,y));break;case"XZY":this._z=Math.asin(-Ln(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(v,h),this._y=Math.atan2(u,a)):(this._x=Math.atan2(-p,y),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Kg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Kg,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Yg.setFromEuler(this),this.setFromQuaternion(Yg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qi.DEFAULT_ORDER="XYZ";class Lp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let $w=0;const Zg=new J,go=new Ns,dr=new Qt,Cc=new J,Fa=new J,Xw=new J,qw=new Ns,Jg=new J(1,0,0),Qg=new J(0,1,0),ev=new J(0,0,1),tv={type:"added"},Kw={type:"removed"},vo={type:"childadded",child:null},Id={type:"childremoved",child:null};class In extends Us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$w++}),this.uuid=Os(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=In.DEFAULT_UP.clone();const e=new J,t=new Qi,n=new Ns,s=new J(1,1,1);function a(){n.setFromEuler(t,!1)}function l(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new kt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=In.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=In.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return go.setFromAxisAngle(e,t),this.quaternion.multiply(go),this}rotateOnWorldAxis(e,t){return go.setFromAxisAngle(e,t),this.quaternion.premultiply(go),this}rotateX(e){return this.rotateOnAxis(Jg,e)}rotateY(e){return this.rotateOnAxis(Qg,e)}rotateZ(e){return this.rotateOnAxis(ev,e)}translateOnAxis(e,t){return Zg.copy(e).applyQuaternion(this.quaternion),this.position.add(Zg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jg,e)}translateY(e){return this.translateOnAxis(Qg,e)}translateZ(e){return this.translateOnAxis(ev,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(dr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cc.copy(e):Cc.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Fa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dr.lookAt(Fa,Cc,this.up):dr.lookAt(Cc,Fa,this.up),this.quaternion.setFromRotationMatrix(dr),s&&(dr.extractRotation(s.matrixWorld),go.setFromRotationMatrix(dr),this.quaternion.premultiply(go.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(tv),vo.child=e,this.dispatchEvent(vo),vo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kw),Id.child=e,this.dispatchEvent(Id),Id.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),dr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),dr.multiply(e.parent.matrixWorld)),e.applyMatrix4(dr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(tv),vo.child=e,this.dispatchEvent(vo),vo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const l=this.children[n].getObjectByProperty(e,t);if(l!==void 0)return l}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let a=0,l=s.length;a<l;a++)s[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fa,e,Xw),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fa,qw,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let a=0,l=s.length;a<l;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(u=>({boxInitialized:u.boxInitialized,boxMin:u.box.min.toArray(),boxMax:u.box.max.toArray(),sphereInitialized:u.sphereInitialized,sphereRadius:u.sphere.radius,sphereCenter:u.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(u,f){return u[f.uuid]===void 0&&(u[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){const f=u.shapes;if(Array.isArray(f))for(let h=0,p=f.length;h<p;h++){const m=f[h];a(e.shapes,m)}else a(e.shapes,f)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const u=[];for(let f=0,h=this.material.length;f<h;f++)u.push(a(e.materials,this.material[f]));s.material=u}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let u=0;u<this.children.length;u++)s.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let u=0;u<this.animations.length;u++){const f=this.animations[u];s.animations.push(a(e.animations,f))}}if(t){const u=l(e.geometries),f=l(e.materials),h=l(e.textures),p=l(e.images),m=l(e.shapes),v=l(e.skeletons),y=l(e.animations),M=l(e.nodes);u.length>0&&(n.geometries=u),f.length>0&&(n.materials=f),h.length>0&&(n.textures=h),p.length>0&&(n.images=p),m.length>0&&(n.shapes=m),v.length>0&&(n.skeletons=v),y.length>0&&(n.animations=y),M.length>0&&(n.nodes=M)}return n.object=s,n;function l(u){const f=[];for(const h in u){const p=u[h];delete p.metadata,f.push(p)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}In.DEFAULT_UP=new J(0,1,0);In.DEFAULT_MATRIX_AUTO_UPDATE=!0;In.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zi=new J,hr=new J,Dd=new J,pr=new J,yo=new J,_o=new J,nv=new J,Nd=new J,kd=new J,Ud=new J,Od=new Jt,Fd=new Jt,zd=new Jt;class bi{constructor(e=new J,t=new J,n=new J){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),zi.subVectors(e,t),s.cross(zi);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,n,s,a){zi.subVectors(s,t),hr.subVectors(n,t),Dd.subVectors(e,t);const l=zi.dot(zi),u=zi.dot(hr),f=zi.dot(Dd),h=hr.dot(hr),p=hr.dot(Dd),m=l*h-u*u;if(m===0)return a.set(0,0,0),null;const v=1/m,y=(h*f-u*p)*v,M=(l*p-u*f)*v;return a.set(1-y-M,M,y)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,pr)===null?!1:pr.x>=0&&pr.y>=0&&pr.x+pr.y<=1}static getInterpolation(e,t,n,s,a,l,u,f){return this.getBarycoord(e,t,n,s,pr)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(a,pr.x),f.addScaledVector(l,pr.y),f.addScaledVector(u,pr.z),f)}static getInterpolatedAttribute(e,t,n,s,a,l){return Od.setScalar(0),Fd.setScalar(0),zd.setScalar(0),Od.fromBufferAttribute(e,t),Fd.fromBufferAttribute(e,n),zd.fromBufferAttribute(e,s),l.setScalar(0),l.addScaledVector(Od,a.x),l.addScaledVector(Fd,a.y),l.addScaledVector(zd,a.z),l}static isFrontFacing(e,t,n,s){return zi.subVectors(n,t),hr.subVectors(e,t),zi.cross(hr).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zi.subVectors(this.c,this.b),hr.subVectors(this.a,this.b),zi.cross(hr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return bi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,a){return bi.getInterpolation(e,this.a,this.b,this.c,t,n,s,a)}containsPoint(e){return bi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,a=this.c;let l,u;yo.subVectors(s,n),_o.subVectors(a,n),Nd.subVectors(e,n);const f=yo.dot(Nd),h=_o.dot(Nd);if(f<=0&&h<=0)return t.copy(n);kd.subVectors(e,s);const p=yo.dot(kd),m=_o.dot(kd);if(p>=0&&m<=p)return t.copy(s);const v=f*m-p*h;if(v<=0&&f>=0&&p<=0)return l=f/(f-p),t.copy(n).addScaledVector(yo,l);Ud.subVectors(e,a);const y=yo.dot(Ud),M=_o.dot(Ud);if(M>=0&&y<=M)return t.copy(a);const S=y*h-f*M;if(S<=0&&h>=0&&M<=0)return u=h/(h-M),t.copy(n).addScaledVector(_o,u);const _=p*M-y*m;if(_<=0&&m-p>=0&&y-M>=0)return nv.subVectors(a,s),u=(m-p)/(m-p+(y-M)),t.copy(s).addScaledVector(nv,u);const x=1/(_+S+v);return l=S*x,u=v*x,t.copy(n).addScaledVector(yo,l).addScaledVector(_o,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const m_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qr={h:0,s:0,l:0},Rc={h:0,s:0,l:0};function Bd(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Bt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Gt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Gt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Gt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Gt.workingColorSpace){if(e=Pp(e,1),t=Ln(t,0,1),n=Ln(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,l=2*n-a;this.r=Bd(l,a,e+1/3),this.g=Bd(l,a,e),this.b=Bd(l,a,e-1/3)}return Gt.toWorkingColorSpace(this,s),this}setStyle(e,t=wi){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const l=s[1],u=s[2];switch(l){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],l=a.length;if(l===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(l===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wi){const n=m_[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wr(e.r),this.g=wr(e.g),this.b=wr(e.b),this}copyLinearToSRGB(e){return this.r=Bo(e.r),this.g=Bo(e.g),this.b=Bo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wi){return Gt.fromWorkingColorSpace(Vn.copy(this),e),Math.round(Ln(Vn.r*255,0,255))*65536+Math.round(Ln(Vn.g*255,0,255))*256+Math.round(Ln(Vn.b*255,0,255))}getHexString(e=wi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Gt.workingColorSpace){Gt.fromWorkingColorSpace(Vn.copy(this),t);const n=Vn.r,s=Vn.g,a=Vn.b,l=Math.max(n,s,a),u=Math.min(n,s,a);let f,h;const p=(u+l)/2;if(u===l)f=0,h=0;else{const m=l-u;switch(h=p<=.5?m/(l+u):m/(2-l-u),l){case n:f=(s-a)/m+(s<a?6:0);break;case s:f=(a-n)/m+2;break;case a:f=(n-s)/m+4;break}f/=6}return e.h=f,e.s=h,e.l=p,e}getRGB(e,t=Gt.workingColorSpace){return Gt.fromWorkingColorSpace(Vn.copy(this),t),e.r=Vn.r,e.g=Vn.g,e.b=Vn.b,e}getStyle(e=wi){Gt.fromWorkingColorSpace(Vn.copy(this),e);const t=Vn.r,n=Vn.g,s=Vn.b;return e!==wi?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(qr),this.setHSL(qr.h+e,qr.s+t,qr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qr),e.getHSL(Rc);const n=Ka(qr.h,Rc.h,t),s=Ka(qr.s,Rc.s,t),a=Ka(qr.l,Rc.l,t);return this.setHSL(n,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*s,this.g=a[1]*t+a[4]*n+a[7]*s,this.b=a[2]*t+a[5]*n+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vn=new Bt;Bt.NAMES=m_;let Yw=0;class ta extends Us{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yw++}),this.uuid=Os(),this.name="",this.blending=Oo,this.side=ns,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fh,this.blendDst=dh,this.blendEquation=Es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Bt(0,0,0),this.blendAlpha=0,this.depthFunc=Go,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=co,this.stencilZFail=co,this.stencilZPass=co,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oo&&(n.blending=this.blending),this.side!==ns&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==fh&&(n.blendSrc=this.blendSrc),this.blendDst!==dh&&(n.blendDst=this.blendDst),this.blendEquation!==Es&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Go&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Fg&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==co&&(n.stencilFail=this.stencilFail),this.stencilZFail!==co&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==co&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(a){const l=[];for(const u in a){const f=a[u];delete f.metadata,l.push(f)}return l}if(t){const a=s(e.textures),l=s(e.images);a.length>0&&(n.textures=a),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let a=0;a!==s;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Cu extends ta{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Bt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=Zy,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yn=new J,Pc=new $e;class Zi{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=zg,this.updateRanges=[],this.gpuType=_r,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Pc.fromBufferAttribute(this,t),Pc.applyMatrix3(e),this.setXY(t,Pc.x,Pc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyMatrix3(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyMatrix4(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyNormalMatrix(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.transformDirection(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ao(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$n(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ao(t,this.array)),t}setX(e,t){return this.normalized&&(t=$n(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ao(t,this.array)),t}setY(e,t){return this.normalized&&(t=$n(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ao(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$n(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ao(t,this.array)),t}setW(e,t){return this.normalized&&(t=$n(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=$n(t,this.array),n=$n(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=$n(t,this.array),n=$n(n,this.array),s=$n(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,a){return e*=this.itemSize,this.normalized&&(t=$n(t,this.array),n=$n(n,this.array),s=$n(s,this.array),a=$n(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zg&&(e.usage=this.usage),e}}class g_ extends Zi{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class v_ extends Zi{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class en extends Zi{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Zw=0;const Mi=new Qt,Hd=new In,xo=new J,hi=new hl,za=new hl,Rn=new J;class wn extends Us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zw++}),this.uuid=Os(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(d_(e)?v_:g_)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new kt().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Mi.makeRotationFromQuaternion(e),this.applyMatrix4(Mi),this}rotateX(e){return Mi.makeRotationX(e),this.applyMatrix4(Mi),this}rotateY(e){return Mi.makeRotationY(e),this.applyMatrix4(Mi),this}rotateZ(e){return Mi.makeRotationZ(e),this.applyMatrix4(Mi),this}translate(e,t,n){return Mi.makeTranslation(e,t,n),this.applyMatrix4(Mi),this}scale(e,t,n){return Mi.makeScale(e,t,n),this.applyMatrix4(Mi),this}lookAt(e){return Hd.lookAt(e),Hd.updateMatrix(),this.applyMatrix4(Hd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xo).negate(),this.translate(xo.x,xo.y,xo.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,a=e.length;s<a;s++){const l=e[s];n.push(l.x,l.y,l.z||0)}this.setAttribute("position",new en(n,3))}else{for(let n=0,s=t.count;n<s;n++){const a=e[n];t.setXYZ(n,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const a=t[n];hi.setFromBufferAttribute(a),this.morphTargetsRelative?(Rn.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(Rn),Rn.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(Rn)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Tu);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){const n=this.boundingSphere.center;if(hi.setFromBufferAttribute(e),t)for(let a=0,l=t.length;a<l;a++){const u=t[a];za.setFromBufferAttribute(u),this.morphTargetsRelative?(Rn.addVectors(hi.min,za.min),hi.expandByPoint(Rn),Rn.addVectors(hi.max,za.max),hi.expandByPoint(Rn)):(hi.expandByPoint(za.min),hi.expandByPoint(za.max))}hi.getCenter(n);let s=0;for(let a=0,l=e.count;a<l;a++)Rn.fromBufferAttribute(e,a),s=Math.max(s,n.distanceToSquared(Rn));if(t)for(let a=0,l=t.length;a<l;a++){const u=t[a],f=this.morphTargetsRelative;for(let h=0,p=u.count;h<p;h++)Rn.fromBufferAttribute(u,h),f&&(xo.fromBufferAttribute(e,h),Rn.add(xo)),s=Math.max(s,n.distanceToSquared(Rn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zi(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),u=[],f=[];for(let B=0;B<n.count;B++)u[B]=new J,f[B]=new J;const h=new J,p=new J,m=new J,v=new $e,y=new $e,M=new $e,S=new J,_=new J;function x(B,L,A){h.fromBufferAttribute(n,B),p.fromBufferAttribute(n,L),m.fromBufferAttribute(n,A),v.fromBufferAttribute(a,B),y.fromBufferAttribute(a,L),M.fromBufferAttribute(a,A),p.sub(h),m.sub(h),y.sub(v),M.sub(v);const U=1/(y.x*M.y-M.x*y.y);isFinite(U)&&(S.copy(p).multiplyScalar(M.y).addScaledVector(m,-y.y).multiplyScalar(U),_.copy(m).multiplyScalar(y.x).addScaledVector(p,-M.x).multiplyScalar(U),u[B].add(S),u[L].add(S),u[A].add(S),f[B].add(_),f[L].add(_),f[A].add(_))}let R=this.groups;R.length===0&&(R=[{start:0,count:e.count}]);for(let B=0,L=R.length;B<L;++B){const A=R[B],U=A.start,q=A.count;for(let X=U,ne=U+q;X<ne;X+=3)x(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const P=new J,E=new J,V=new J,N=new J;function D(B){V.fromBufferAttribute(s,B),N.copy(V);const L=u[B];P.copy(L),P.sub(V.multiplyScalar(V.dot(L))).normalize(),E.crossVectors(N,L);const U=E.dot(f[B])<0?-1:1;l.setXYZW(B,P.x,P.y,P.z,U)}for(let B=0,L=R.length;B<L;++B){const A=R[B],U=A.start,q=A.count;for(let X=U,ne=U+q;X<ne;X+=3)D(e.getX(X+0)),D(e.getX(X+1)),D(e.getX(X+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Zi(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let v=0,y=n.count;v<y;v++)n.setXYZ(v,0,0,0);const s=new J,a=new J,l=new J,u=new J,f=new J,h=new J,p=new J,m=new J;if(e)for(let v=0,y=e.count;v<y;v+=3){const M=e.getX(v+0),S=e.getX(v+1),_=e.getX(v+2);s.fromBufferAttribute(t,M),a.fromBufferAttribute(t,S),l.fromBufferAttribute(t,_),p.subVectors(l,a),m.subVectors(s,a),p.cross(m),u.fromBufferAttribute(n,M),f.fromBufferAttribute(n,S),h.fromBufferAttribute(n,_),u.add(p),f.add(p),h.add(p),n.setXYZ(M,u.x,u.y,u.z),n.setXYZ(S,f.x,f.y,f.z),n.setXYZ(_,h.x,h.y,h.z)}else for(let v=0,y=t.count;v<y;v+=3)s.fromBufferAttribute(t,v+0),a.fromBufferAttribute(t,v+1),l.fromBufferAttribute(t,v+2),p.subVectors(l,a),m.subVectors(s,a),p.cross(m),n.setXYZ(v+0,p.x,p.y,p.z),n.setXYZ(v+1,p.x,p.y,p.z),n.setXYZ(v+2,p.x,p.y,p.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rn.fromBufferAttribute(e,t),Rn.normalize(),e.setXYZ(t,Rn.x,Rn.y,Rn.z)}toNonIndexed(){function e(u,f){const h=u.array,p=u.itemSize,m=u.normalized,v=new h.constructor(f.length*p);let y=0,M=0;for(let S=0,_=f.length;S<_;S++){u.isInterleavedBufferAttribute?y=f[S]*u.data.stride+u.offset:y=f[S]*p;for(let x=0;x<p;x++)v[M++]=h[y++]}return new Zi(v,p,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wn,n=this.index.array,s=this.attributes;for(const u in s){const f=s[u],h=e(f,n);t.setAttribute(u,h)}const a=this.morphAttributes;for(const u in a){const f=[],h=a[u];for(let p=0,m=h.length;p<m;p++){const v=h[p],y=e(v,n);f.push(y)}t.morphAttributes[u]=f}t.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let u=0,f=l.length;u<f;u++){const h=l[u];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const h in f)f[h]!==void 0&&(e[h]=f[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const f in n){const h=n[f];e.data.attributes[f]=h.toJSON(e.data)}const s={};let a=!1;for(const f in this.morphAttributes){const h=this.morphAttributes[f],p=[];for(let m=0,v=h.length;m<v;m++){const y=h[m];p.push(y.toJSON(e.data))}p.length>0&&(s[f]=p,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(e.data.groups=JSON.parse(JSON.stringify(l)));const u=this.boundingSphere;return u!==null&&(e.data.boundingSphere={center:u.center.toArray(),radius:u.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const h in s){const p=s[h];this.setAttribute(h,p.clone(t))}const a=e.morphAttributes;for(const h in a){const p=[],m=a[h];for(let v=0,y=m.length;v<y;v++)p.push(m[v].clone(t));this.morphAttributes[h]=p}this.morphTargetsRelative=e.morphTargetsRelative;const l=e.groups;for(let h=0,p=l.length;h<p;h++){const m=l[h];this.addGroup(m.start,m.count,m.materialIndex)}const u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const iv=new Qt,ys=new Au,Lc=new Tu,rv=new J,Ic=new J,Dc=new J,Nc=new J,Vd=new J,kc=new J,sv=new J,Uc=new J;class Nt extends In{constructor(e=new wn,t=new Cu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=s.length;a<l;a++){const u=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=a}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,a=n.morphAttributes.position,l=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const u=this.morphTargetInfluences;if(a&&u){kc.set(0,0,0);for(let f=0,h=a.length;f<h;f++){const p=u[f],m=a[f];p!==0&&(Vd.fromBufferAttribute(m,e),l?kc.addScaledVector(Vd,p):kc.addScaledVector(Vd.sub(t),p))}t.add(kc)}return t}raycast(e,t){const n=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Lc.copy(n.boundingSphere),Lc.applyMatrix4(a),ys.copy(e.ray).recast(e.near),!(Lc.containsPoint(ys.origin)===!1&&(ys.intersectSphere(Lc,rv)===null||ys.origin.distanceToSquared(rv)>(e.far-e.near)**2))&&(iv.copy(a).invert(),ys.copy(e.ray).applyMatrix4(iv),!(n.boundingBox!==null&&ys.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ys)))}_computeIntersections(e,t,n){let s;const a=this.geometry,l=this.material,u=a.index,f=a.attributes.position,h=a.attributes.uv,p=a.attributes.uv1,m=a.attributes.normal,v=a.groups,y=a.drawRange;if(u!==null)if(Array.isArray(l))for(let M=0,S=v.length;M<S;M++){const _=v[M],x=l[_.materialIndex],R=Math.max(_.start,y.start),P=Math.min(u.count,Math.min(_.start+_.count,y.start+y.count));for(let E=R,V=P;E<V;E+=3){const N=u.getX(E),D=u.getX(E+1),B=u.getX(E+2);s=Oc(this,x,e,n,h,p,m,N,D,B),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=_.materialIndex,t.push(s))}}else{const M=Math.max(0,y.start),S=Math.min(u.count,y.start+y.count);for(let _=M,x=S;_<x;_+=3){const R=u.getX(_),P=u.getX(_+1),E=u.getX(_+2);s=Oc(this,l,e,n,h,p,m,R,P,E),s&&(s.faceIndex=Math.floor(_/3),t.push(s))}}else if(f!==void 0)if(Array.isArray(l))for(let M=0,S=v.length;M<S;M++){const _=v[M],x=l[_.materialIndex],R=Math.max(_.start,y.start),P=Math.min(f.count,Math.min(_.start+_.count,y.start+y.count));for(let E=R,V=P;E<V;E+=3){const N=E,D=E+1,B=E+2;s=Oc(this,x,e,n,h,p,m,N,D,B),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=_.materialIndex,t.push(s))}}else{const M=Math.max(0,y.start),S=Math.min(f.count,y.start+y.count);for(let _=M,x=S;_<x;_+=3){const R=_,P=_+1,E=_+2;s=Oc(this,l,e,n,h,p,m,R,P,E),s&&(s.faceIndex=Math.floor(_/3),t.push(s))}}}}function Jw(i,e,t,n,s,a,l,u){let f;if(e.side===Yn?f=n.intersectTriangle(l,a,s,!0,u):f=n.intersectTriangle(s,a,l,e.side===ns,u),f===null)return null;Uc.copy(u),Uc.applyMatrix4(i.matrixWorld);const h=t.ray.origin.distanceTo(Uc);return h<t.near||h>t.far?null:{distance:h,point:Uc.clone(),object:i}}function Oc(i,e,t,n,s,a,l,u,f,h){i.getVertexPosition(u,Ic),i.getVertexPosition(f,Dc),i.getVertexPosition(h,Nc);const p=Jw(i,e,t,n,Ic,Dc,Nc,sv);if(p){const m=new J;bi.getBarycoord(sv,Ic,Dc,Nc,m),s&&(p.uv=bi.getInterpolatedAttribute(s,u,f,h,m,new $e)),a&&(p.uv1=bi.getInterpolatedAttribute(a,u,f,h,m,new $e)),l&&(p.normal=bi.getInterpolatedAttribute(l,u,f,h,m,new J),p.normal.dot(n.direction)>0&&p.normal.multiplyScalar(-1));const v={a:u,b:f,c:h,normal:new J,materialIndex:0};bi.getNormal(Ic,Dc,Nc,v.normal),p.face=v,p.barycoord=m}return p}class oi extends wn{constructor(e=1,t=1,n=1,s=1,a=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:a,depthSegments:l};const u=this;s=Math.floor(s),a=Math.floor(a),l=Math.floor(l);const f=[],h=[],p=[],m=[];let v=0,y=0;M("z","y","x",-1,-1,n,t,e,l,a,0),M("z","y","x",1,-1,n,t,-e,l,a,1),M("x","z","y",1,1,e,n,t,s,l,2),M("x","z","y",1,-1,e,n,-t,s,l,3),M("x","y","z",1,-1,e,t,n,s,a,4),M("x","y","z",-1,-1,e,t,-n,s,a,5),this.setIndex(f),this.setAttribute("position",new en(h,3)),this.setAttribute("normal",new en(p,3)),this.setAttribute("uv",new en(m,2));function M(S,_,x,R,P,E,V,N,D,B,L){const A=E/D,U=V/B,q=E/2,X=V/2,ne=N/2,he=D+1,ae=B+1;let Me=0,$=0;const z=new J;for(let ee=0;ee<ae;ee++){const F=ee*U-X;for(let Y=0;Y<he;Y++){const Ce=Y*A-q;z[S]=Ce*R,z[_]=F*P,z[x]=ne,h.push(z.x,z.y,z.z),z[S]=0,z[_]=0,z[x]=N>0?1:-1,p.push(z.x,z.y,z.z),m.push(Y/D),m.push(1-ee/B),Me+=1}}for(let ee=0;ee<B;ee++)for(let F=0;F<D;F++){const Y=v+F+he*ee,Ce=v+F+he*(ee+1),K=v+(F+1)+he*(ee+1),ce=v+(F+1)+he*ee;f.push(Y,Ce,ce),f.push(Ce,K,ce),$+=6}u.addGroup(y,$,L),y+=$,v+=Me}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function qo(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Xn(i){const e={};for(let t=0;t<i.length;t++){const n=qo(i[t]);for(const s in n)e[s]=n[s]}return e}function Qw(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function y_(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Gt.workingColorSpace}const eE={clone:qo,merge:Xn};var tE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class is extends ta{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tE,this.fragmentShader=nE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qo(e.uniforms),this.uniformsGroups=Qw(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const l=this.uniforms[s].value;l&&l.isTexture?t.uniforms[s]={type:"t",value:l.toJSON(e).uuid}:l&&l.isColor?t.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?t.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?t.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?t.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?t.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?t.uniforms[s]={type:"m4",value:l.toArray()}:t.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class __ extends In{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=xr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Kr=new J,ov=new $e,av=new $e;class ai extends __{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=rl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(zo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rl*2*Math.atan(Math.tan(zo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Kr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Kr.x,Kr.y).multiplyScalar(-e/Kr.z),Kr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Kr.x,Kr.y).multiplyScalar(-e/Kr.z)}getViewSize(e,t){return this.getViewBounds(e,ov,av),t.subVectors(av,ov)}setViewOffset(e,t,n,s,a,l){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(zo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,a=-.5*s;const l=this.view;if(this.view!==null&&this.view.enabled){const f=l.fullWidth,h=l.fullHeight;a+=l.offsetX*s/f,t-=l.offsetY*n/h,s*=l.width/f,n*=l.height/h}const u=this.filmOffset;u!==0&&(a+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const So=-90,Mo=1;class iE extends In{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ai(So,Mo,e,t);s.layers=this.layers,this.add(s);const a=new ai(So,Mo,e,t);a.layers=this.layers,this.add(a);const l=new ai(So,Mo,e,t);l.layers=this.layers,this.add(l);const u=new ai(So,Mo,e,t);u.layers=this.layers,this.add(u);const f=new ai(So,Mo,e,t);f.layers=this.layers,this.add(f);const h=new ai(So,Mo,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,a,l,u,f]=t;for(const h of t)this.remove(h);if(e===xr)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===uu)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,l,u,f,h,p]=this.children,m=e.getRenderTarget(),v=e.getActiveCubeFace(),y=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,a),e.setRenderTarget(n,1,s),e.render(t,l),e.setRenderTarget(n,2,s),e.render(t,u),e.setRenderTarget(n,3,s),e.render(t,f),e.setRenderTarget(n,4,s),e.render(t,h),n.texture.generateMipmaps=S,e.setRenderTarget(n,5,s),e.render(t,p),e.setRenderTarget(m,v,y),e.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class x_ extends Zn{constructor(e,t,n,s,a,l,u,f,h,p){e=e!==void 0?e:[],t=t!==void 0?t:Wo,super(e,t,n,s,a,l,u,f,h,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class rE extends Ds{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new x_(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Yi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new oi(5,5,5),a=new is({name:"CubemapFromEquirect",uniforms:qo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yn,blending:es});a.uniforms.tEquirect.value=t;const l=new Nt(s,a),u=t.minFilter;return t.minFilter===Rs&&(t.minFilter=Yi),new iE(1,10,this).update(e,l),t.minFilter=u,l.geometry.dispose(),l.material.dispose(),this}clear(e,t,n,s){const a=e.getRenderTarget();for(let l=0;l<6;l++)e.setRenderTarget(this,l),e.clear(t,n,s);e.setRenderTarget(a)}}const Gd=new J,sE=new J,oE=new kt;class Zr{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Gd.subVectors(n,t).cross(sE.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Gd),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||oE.getNormalMatrix(e),s=this.coplanarPoint(Gd).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _s=new Tu,Fc=new J;class Ip{constructor(e=new Zr,t=new Zr,n=new Zr,s=new Zr,a=new Zr,l=new Zr){this.planes=[e,t,n,s,a,l]}set(e,t,n,s,a,l){const u=this.planes;return u[0].copy(e),u[1].copy(t),u[2].copy(n),u[3].copy(s),u[4].copy(a),u[5].copy(l),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=xr){const n=this.planes,s=e.elements,a=s[0],l=s[1],u=s[2],f=s[3],h=s[4],p=s[5],m=s[6],v=s[7],y=s[8],M=s[9],S=s[10],_=s[11],x=s[12],R=s[13],P=s[14],E=s[15];if(n[0].setComponents(f-a,v-h,_-y,E-x).normalize(),n[1].setComponents(f+a,v+h,_+y,E+x).normalize(),n[2].setComponents(f+l,v+p,_+M,E+R).normalize(),n[3].setComponents(f-l,v-p,_-M,E-R).normalize(),n[4].setComponents(f-u,v-m,_-S,E-P).normalize(),t===xr)n[5].setComponents(f+u,v+m,_+S,E+P).normalize();else if(t===uu)n[5].setComponents(u,m,S,P).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_s.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_s.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_s)}intersectsSprite(e){return _s.center.set(0,0,0),_s.radius=.7071067811865476,_s.applyMatrix4(e.matrixWorld),this.intersectsSphere(_s)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Fc.x=s.normal.x>0?e.max.x:e.min.x,Fc.y=s.normal.y>0?e.max.y:e.min.y,Fc.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Fc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function S_(){let i=null,e=!1,t=null,n=null;function s(a,l){t(a,l),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function aE(i){const e=new WeakMap;function t(u,f){const h=u.array,p=u.usage,m=h.byteLength,v=i.createBuffer();i.bindBuffer(f,v),i.bufferData(f,h,p),u.onUploadCallback();let y;if(h instanceof Float32Array)y=i.FLOAT;else if(h instanceof Uint16Array)u.isFloat16BufferAttribute?y=i.HALF_FLOAT:y=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)y=i.SHORT;else if(h instanceof Uint32Array)y=i.UNSIGNED_INT;else if(h instanceof Int32Array)y=i.INT;else if(h instanceof Int8Array)y=i.BYTE;else if(h instanceof Uint8Array)y=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)y=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:v,type:y,bytesPerElement:h.BYTES_PER_ELEMENT,version:u.version,size:m}}function n(u,f,h){const p=f.array,m=f.updateRanges;if(i.bindBuffer(h,u),m.length===0)i.bufferSubData(h,0,p);else{m.sort((y,M)=>y.start-M.start);let v=0;for(let y=1;y<m.length;y++){const M=m[v],S=m[y];S.start<=M.start+M.count+1?M.count=Math.max(M.count,S.start+S.count-M.start):(++v,m[v]=S)}m.length=v+1;for(let y=0,M=m.length;y<M;y++){const S=m[y];i.bufferSubData(h,S.start*p.BYTES_PER_ELEMENT,p,S.start,S.count)}f.clearUpdateRanges()}f.onUploadCallback()}function s(u){return u.isInterleavedBufferAttribute&&(u=u.data),e.get(u)}function a(u){u.isInterleavedBufferAttribute&&(u=u.data);const f=e.get(u);f&&(i.deleteBuffer(f.buffer),e.delete(u))}function l(u,f){if(u.isInterleavedBufferAttribute&&(u=u.data),u.isGLBufferAttribute){const p=e.get(u);(!p||p.version<u.version)&&e.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}const h=e.get(u);if(h===void 0)e.set(u,t(u,f));else if(h.version<u.version){if(h.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,u,f),h.version=u.version}}return{get:s,remove:a,update:l}}class Ru extends wn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const a=e/2,l=t/2,u=Math.floor(n),f=Math.floor(s),h=u+1,p=f+1,m=e/u,v=t/f,y=[],M=[],S=[],_=[];for(let x=0;x<p;x++){const R=x*v-l;for(let P=0;P<h;P++){const E=P*m-a;M.push(E,-R,0),S.push(0,0,1),_.push(P/u),_.push(1-x/f)}}for(let x=0;x<f;x++)for(let R=0;R<u;R++){const P=R+h*x,E=R+h*(x+1),V=R+1+h*(x+1),N=R+1+h*x;y.push(P,E,N),y.push(E,V,N)}this.setIndex(y),this.setAttribute("position",new en(M,3)),this.setAttribute("normal",new en(S,3)),this.setAttribute("uv",new en(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ru(e.width,e.height,e.widthSegments,e.heightSegments)}}var lE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,uE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,mE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,vE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_E=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,SE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ME=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,EE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,TE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,AE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,CE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,RE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,PE=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,LE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,IE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,DE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,NE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,UE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,OE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,FE="gl_FragColor = linearToOutputTexel( gl_FragColor );",zE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,BE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,HE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,VE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,GE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,WE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$E=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,XE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,KE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,YE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ZE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,JE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,QE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,eb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,tb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ib=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rb=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ob=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ab=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,cb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ub=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,fb=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,db=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hb=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mb=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gb=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,vb=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_b=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Mb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wb=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Eb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Tb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ab=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Pb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Lb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ib=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Db=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Nb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ub=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ob=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Wb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,$b=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Xb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Kb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Zb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,e2=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,t2=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,n2=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,i2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,r2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,s2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,o2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const a2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,l2=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,u2=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,d2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,p2=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,m2=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,g2=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,v2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,y2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_2=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,x2=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,S2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,M2=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,w2=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,E2=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b2=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,T2=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A2=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,C2=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,R2=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P2=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L2=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,I2=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D2=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N2=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k2=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,U2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,O2=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,F2=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,z2=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,B2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ut={alphahash_fragment:lE,alphahash_pars_fragment:cE,alphamap_fragment:uE,alphamap_pars_fragment:fE,alphatest_fragment:dE,alphatest_pars_fragment:hE,aomap_fragment:pE,aomap_pars_fragment:mE,batching_pars_vertex:gE,batching_vertex:vE,begin_vertex:yE,beginnormal_vertex:_E,bsdfs:xE,iridescence_fragment:SE,bumpmap_pars_fragment:ME,clipping_planes_fragment:wE,clipping_planes_pars_fragment:EE,clipping_planes_pars_vertex:bE,clipping_planes_vertex:TE,color_fragment:AE,color_pars_fragment:CE,color_pars_vertex:RE,color_vertex:PE,common:LE,cube_uv_reflection_fragment:IE,defaultnormal_vertex:DE,displacementmap_pars_vertex:NE,displacementmap_vertex:kE,emissivemap_fragment:UE,emissivemap_pars_fragment:OE,colorspace_fragment:FE,colorspace_pars_fragment:zE,envmap_fragment:BE,envmap_common_pars_fragment:HE,envmap_pars_fragment:VE,envmap_pars_vertex:GE,envmap_physical_pars_fragment:eb,envmap_vertex:WE,fog_vertex:jE,fog_pars_vertex:$E,fog_fragment:XE,fog_pars_fragment:qE,gradientmap_pars_fragment:KE,lightmap_pars_fragment:YE,lights_lambert_fragment:ZE,lights_lambert_pars_fragment:JE,lights_pars_begin:QE,lights_toon_fragment:tb,lights_toon_pars_fragment:nb,lights_phong_fragment:ib,lights_phong_pars_fragment:rb,lights_physical_fragment:sb,lights_physical_pars_fragment:ob,lights_fragment_begin:ab,lights_fragment_maps:lb,lights_fragment_end:cb,logdepthbuf_fragment:ub,logdepthbuf_pars_fragment:fb,logdepthbuf_pars_vertex:db,logdepthbuf_vertex:hb,map_fragment:pb,map_pars_fragment:mb,map_particle_fragment:gb,map_particle_pars_fragment:vb,metalnessmap_fragment:yb,metalnessmap_pars_fragment:_b,morphinstance_vertex:xb,morphcolor_vertex:Sb,morphnormal_vertex:Mb,morphtarget_pars_vertex:wb,morphtarget_vertex:Eb,normal_fragment_begin:bb,normal_fragment_maps:Tb,normal_pars_fragment:Ab,normal_pars_vertex:Cb,normal_vertex:Rb,normalmap_pars_fragment:Pb,clearcoat_normal_fragment_begin:Lb,clearcoat_normal_fragment_maps:Ib,clearcoat_pars_fragment:Db,iridescence_pars_fragment:Nb,opaque_fragment:kb,packing:Ub,premultiplied_alpha_fragment:Ob,project_vertex:Fb,dithering_fragment:zb,dithering_pars_fragment:Bb,roughnessmap_fragment:Hb,roughnessmap_pars_fragment:Vb,shadowmap_pars_fragment:Gb,shadowmap_pars_vertex:Wb,shadowmap_vertex:jb,shadowmask_pars_fragment:$b,skinbase_vertex:Xb,skinning_pars_vertex:qb,skinning_vertex:Kb,skinnormal_vertex:Yb,specularmap_fragment:Zb,specularmap_pars_fragment:Jb,tonemapping_fragment:Qb,tonemapping_pars_fragment:e2,transmission_fragment:t2,transmission_pars_fragment:n2,uv_pars_fragment:i2,uv_pars_vertex:r2,uv_vertex:s2,worldpos_vertex:o2,background_vert:a2,background_frag:l2,backgroundCube_vert:c2,backgroundCube_frag:u2,cube_vert:f2,cube_frag:d2,depth_vert:h2,depth_frag:p2,distanceRGBA_vert:m2,distanceRGBA_frag:g2,equirect_vert:v2,equirect_frag:y2,linedashed_vert:_2,linedashed_frag:x2,meshbasic_vert:S2,meshbasic_frag:M2,meshlambert_vert:w2,meshlambert_frag:E2,meshmatcap_vert:b2,meshmatcap_frag:T2,meshnormal_vert:A2,meshnormal_frag:C2,meshphong_vert:R2,meshphong_frag:P2,meshphysical_vert:L2,meshphysical_frag:I2,meshtoon_vert:D2,meshtoon_frag:N2,points_vert:k2,points_frag:U2,shadow_vert:O2,shadow_frag:F2,sprite_vert:z2,sprite_frag:B2},nt={common:{diffuse:{value:new Bt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Bt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Bt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new Bt(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},qi={basic:{uniforms:Xn([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:Ut.meshbasic_vert,fragmentShader:Ut.meshbasic_frag},lambert:{uniforms:Xn([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Ut.meshlambert_vert,fragmentShader:Ut.meshlambert_frag},phong:{uniforms:Xn([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Bt(0)},specular:{value:new Bt(1118481)},shininess:{value:30}}]),vertexShader:Ut.meshphong_vert,fragmentShader:Ut.meshphong_frag},standard:{uniforms:Xn([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new Bt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag},toon:{uniforms:Xn([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new Bt(0)}}]),vertexShader:Ut.meshtoon_vert,fragmentShader:Ut.meshtoon_frag},matcap:{uniforms:Xn([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:Ut.meshmatcap_vert,fragmentShader:Ut.meshmatcap_frag},points:{uniforms:Xn([nt.points,nt.fog]),vertexShader:Ut.points_vert,fragmentShader:Ut.points_frag},dashed:{uniforms:Xn([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ut.linedashed_vert,fragmentShader:Ut.linedashed_frag},depth:{uniforms:Xn([nt.common,nt.displacementmap]),vertexShader:Ut.depth_vert,fragmentShader:Ut.depth_frag},normal:{uniforms:Xn([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:Ut.meshnormal_vert,fragmentShader:Ut.meshnormal_frag},sprite:{uniforms:Xn([nt.sprite,nt.fog]),vertexShader:Ut.sprite_vert,fragmentShader:Ut.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ut.background_vert,fragmentShader:Ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Ut.backgroundCube_vert,fragmentShader:Ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ut.cube_vert,fragmentShader:Ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ut.equirect_vert,fragmentShader:Ut.equirect_frag},distanceRGBA:{uniforms:Xn([nt.common,nt.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ut.distanceRGBA_vert,fragmentShader:Ut.distanceRGBA_frag},shadow:{uniforms:Xn([nt.lights,nt.fog,{color:{value:new Bt(0)},opacity:{value:1}}]),vertexShader:Ut.shadow_vert,fragmentShader:Ut.shadow_frag}};qi.physical={uniforms:Xn([qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new Bt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new Bt(0)},specularColor:{value:new Bt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Ut.meshphysical_vert,fragmentShader:Ut.meshphysical_frag};const zc={r:0,b:0,g:0},xs=new Qi,H2=new Qt;function V2(i,e,t,n,s,a,l){const u=new Bt(0);let f=a===!0?0:1,h,p,m=null,v=0,y=null;function M(R){let P=R.isScene===!0?R.background:null;return P&&P.isTexture&&(P=(R.backgroundBlurriness>0?t:e).get(P)),P}function S(R){let P=!1;const E=M(R);E===null?x(u,f):E&&E.isColor&&(x(E,1),P=!0);const V=i.xr.getEnvironmentBlendMode();V==="additive"?n.buffers.color.setClear(0,0,0,1,l):V==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(i.autoClear||P)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(R,P){const E=M(P);E&&(E.isCubeTexture||E.mapping===Eu)?(p===void 0&&(p=new Nt(new oi(1,1,1),new is({name:"BackgroundCubeMaterial",uniforms:qo(qi.backgroundCube.uniforms),vertexShader:qi.backgroundCube.vertexShader,fragmentShader:qi.backgroundCube.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(V,N,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(p)),xs.copy(P.backgroundRotation),xs.x*=-1,xs.y*=-1,xs.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(xs.y*=-1,xs.z*=-1),p.material.uniforms.envMap.value=E,p.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(H2.makeRotationFromEuler(xs)),p.material.toneMapped=Gt.getTransfer(E.colorSpace)!==Yt,(m!==E||v!==E.version||y!==i.toneMapping)&&(p.material.needsUpdate=!0,m=E,v=E.version,y=i.toneMapping),p.layers.enableAll(),R.unshift(p,p.geometry,p.material,0,0,null)):E&&E.isTexture&&(h===void 0&&(h=new Nt(new Ru(2,2),new is({name:"BackgroundMaterial",uniforms:qo(qi.background.uniforms),vertexShader:qi.background.vertexShader,fragmentShader:qi.background.fragmentShader,side:ns,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=E,h.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,h.material.toneMapped=Gt.getTransfer(E.colorSpace)!==Yt,E.matrixAutoUpdate===!0&&E.updateMatrix(),h.material.uniforms.uvTransform.value.copy(E.matrix),(m!==E||v!==E.version||y!==i.toneMapping)&&(h.material.needsUpdate=!0,m=E,v=E.version,y=i.toneMapping),h.layers.enableAll(),R.unshift(h,h.geometry,h.material,0,0,null))}function x(R,P){R.getRGB(zc,y_(i)),n.buffers.color.setClear(zc.r,zc.g,zc.b,P,l)}return{getClearColor:function(){return u},setClearColor:function(R,P=1){u.set(R),f=P,x(u,f)},getClearAlpha:function(){return f},setClearAlpha:function(R){f=R,x(u,f)},render:S,addToRenderList:_}}function G2(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=v(null);let a=s,l=!1;function u(A,U,q,X,ne){let he=!1;const ae=m(X,q,U);a!==ae&&(a=ae,h(a.object)),he=y(A,X,q,ne),he&&M(A,X,q,ne),ne!==null&&e.update(ne,i.ELEMENT_ARRAY_BUFFER),(he||l)&&(l=!1,E(A,U,q,X),ne!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(ne).buffer))}function f(){return i.createVertexArray()}function h(A){return i.bindVertexArray(A)}function p(A){return i.deleteVertexArray(A)}function m(A,U,q){const X=q.wireframe===!0;let ne=n[A.id];ne===void 0&&(ne={},n[A.id]=ne);let he=ne[U.id];he===void 0&&(he={},ne[U.id]=he);let ae=he[X];return ae===void 0&&(ae=v(f()),he[X]=ae),ae}function v(A){const U=[],q=[],X=[];for(let ne=0;ne<t;ne++)U[ne]=0,q[ne]=0,X[ne]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:q,attributeDivisors:X,object:A,attributes:{},index:null}}function y(A,U,q,X){const ne=a.attributes,he=U.attributes;let ae=0;const Me=q.getAttributes();for(const $ in Me)if(Me[$].location>=0){const ee=ne[$];let F=he[$];if(F===void 0&&($==="instanceMatrix"&&A.instanceMatrix&&(F=A.instanceMatrix),$==="instanceColor"&&A.instanceColor&&(F=A.instanceColor)),ee===void 0||ee.attribute!==F||F&&ee.data!==F.data)return!0;ae++}return a.attributesNum!==ae||a.index!==X}function M(A,U,q,X){const ne={},he=U.attributes;let ae=0;const Me=q.getAttributes();for(const $ in Me)if(Me[$].location>=0){let ee=he[$];ee===void 0&&($==="instanceMatrix"&&A.instanceMatrix&&(ee=A.instanceMatrix),$==="instanceColor"&&A.instanceColor&&(ee=A.instanceColor));const F={};F.attribute=ee,ee&&ee.data&&(F.data=ee.data),ne[$]=F,ae++}a.attributes=ne,a.attributesNum=ae,a.index=X}function S(){const A=a.newAttributes;for(let U=0,q=A.length;U<q;U++)A[U]=0}function _(A){x(A,0)}function x(A,U){const q=a.newAttributes,X=a.enabledAttributes,ne=a.attributeDivisors;q[A]=1,X[A]===0&&(i.enableVertexAttribArray(A),X[A]=1),ne[A]!==U&&(i.vertexAttribDivisor(A,U),ne[A]=U)}function R(){const A=a.newAttributes,U=a.enabledAttributes;for(let q=0,X=U.length;q<X;q++)U[q]!==A[q]&&(i.disableVertexAttribArray(q),U[q]=0)}function P(A,U,q,X,ne,he,ae){ae===!0?i.vertexAttribIPointer(A,U,q,ne,he):i.vertexAttribPointer(A,U,q,X,ne,he)}function E(A,U,q,X){S();const ne=X.attributes,he=q.getAttributes(),ae=U.defaultAttributeValues;for(const Me in he){const $=he[Me];if($.location>=0){let z=ne[Me];if(z===void 0&&(Me==="instanceMatrix"&&A.instanceMatrix&&(z=A.instanceMatrix),Me==="instanceColor"&&A.instanceColor&&(z=A.instanceColor)),z!==void 0){const ee=z.normalized,F=z.itemSize,Y=e.get(z);if(Y===void 0)continue;const Ce=Y.buffer,K=Y.type,ce=Y.bytesPerElement,we=K===i.INT||K===i.UNSIGNED_INT||z.gpuType===Ep;if(z.isInterleavedBufferAttribute){const xe=z.data,Ie=xe.stride,Oe=z.offset;if(xe.isInstancedInterleavedBuffer){for(let Ge=0;Ge<$.locationSize;Ge++)x($.location+Ge,xe.meshPerAttribute);A.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let Ge=0;Ge<$.locationSize;Ge++)_($.location+Ge);i.bindBuffer(i.ARRAY_BUFFER,Ce);for(let Ge=0;Ge<$.locationSize;Ge++)P($.location+Ge,F/$.locationSize,K,ee,Ie*ce,(Oe+F/$.locationSize*Ge)*ce,we)}else{if(z.isInstancedBufferAttribute){for(let xe=0;xe<$.locationSize;xe++)x($.location+xe,z.meshPerAttribute);A.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let xe=0;xe<$.locationSize;xe++)_($.location+xe);i.bindBuffer(i.ARRAY_BUFFER,Ce);for(let xe=0;xe<$.locationSize;xe++)P($.location+xe,F/$.locationSize,K,ee,F*ce,F/$.locationSize*xe*ce,we)}}else if(ae!==void 0){const ee=ae[Me];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv($.location,ee);break;case 3:i.vertexAttrib3fv($.location,ee);break;case 4:i.vertexAttrib4fv($.location,ee);break;default:i.vertexAttrib1fv($.location,ee)}}}}R()}function V(){B();for(const A in n){const U=n[A];for(const q in U){const X=U[q];for(const ne in X)p(X[ne].object),delete X[ne];delete U[q]}delete n[A]}}function N(A){if(n[A.id]===void 0)return;const U=n[A.id];for(const q in U){const X=U[q];for(const ne in X)p(X[ne].object),delete X[ne];delete U[q]}delete n[A.id]}function D(A){for(const U in n){const q=n[U];if(q[A.id]===void 0)continue;const X=q[A.id];for(const ne in X)p(X[ne].object),delete X[ne];delete q[A.id]}}function B(){L(),l=!0,a!==s&&(a=s,h(a.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:u,reset:B,resetDefaultState:L,dispose:V,releaseStatesOfGeometry:N,releaseStatesOfProgram:D,initAttributes:S,enableAttribute:_,disableUnusedAttributes:R}}function W2(i,e,t){let n;function s(h){n=h}function a(h,p){i.drawArrays(n,h,p),t.update(p,n,1)}function l(h,p,m){m!==0&&(i.drawArraysInstanced(n,h,p,m),t.update(p,n,m))}function u(h,p,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,p,0,m);let y=0;for(let M=0;M<m;M++)y+=p[M];t.update(y,n,1)}function f(h,p,m,v){if(m===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let M=0;M<h.length;M++)l(h[M],p[M],v[M]);else{y.multiDrawArraysInstancedWEBGL(n,h,0,p,0,v,0,m);let M=0;for(let S=0;S<m;S++)M+=p[S]*v[S];t.update(M,n,1)}}this.setMode=s,this.render=a,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function j2(i,e,t,n){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function l(D){return!(D!==Bi&&n.convert(D)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function u(D){const B=D===dl&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==Er&&n.convert(D)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==_r&&!B)}function f(D){if(D==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp";const p=f(h);p!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",p,"instead."),h=p);const m=t.logarithmicDepthBuffer===!0,v=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),y=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),R=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),P=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),V=M>0,N=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:f,textureFormatReadable:l,textureTypeReadable:u,precision:h,logarithmicDepthBuffer:m,reverseDepthBuffer:v,maxTextures:y,maxVertexTextures:M,maxTextureSize:S,maxCubemapSize:_,maxAttributes:x,maxVertexUniforms:R,maxVaryings:P,maxFragmentUniforms:E,vertexTextures:V,maxSamples:N}}function $2(i){const e=this;let t=null,n=0,s=!1,a=!1;const l=new Zr,u=new kt,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(m,v){const y=m.length!==0||v||n!==0||s;return s=v,n=m.length,y},this.beginShadows=function(){a=!0,p(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(m,v){t=p(m,v,0)},this.setState=function(m,v,y){const M=m.clippingPlanes,S=m.clipIntersection,_=m.clipShadows,x=i.get(m);if(!s||M===null||M.length===0||a&&!_)a?p(null):h();else{const R=a?0:n,P=R*4;let E=x.clippingState||null;f.value=E,E=p(M,v,P,y);for(let V=0;V!==P;++V)E[V]=t[V];x.clippingState=E,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=R}};function h(){f.value!==t&&(f.value=t,f.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function p(m,v,y,M){const S=m!==null?m.length:0;let _=null;if(S!==0){if(_=f.value,M!==!0||_===null){const x=y+S*4,R=v.matrixWorldInverse;u.getNormalMatrix(R),(_===null||_.length<x)&&(_=new Float32Array(x));for(let P=0,E=y;P!==S;++P,E+=4)l.copy(m[P]).applyMatrix4(R,u),l.normal.toArray(_,E),_[E+3]=l.constant}f.value=_,f.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,_}}function X2(i){let e=new WeakMap;function t(l,u){return u===xh?l.mapping=Wo:u===Sh&&(l.mapping=jo),l}function n(l){if(l&&l.isTexture){const u=l.mapping;if(u===xh||u===Sh)if(e.has(l)){const f=e.get(l).texture;return t(f,l.mapping)}else{const f=l.image;if(f&&f.height>0){const h=new rE(f.height);return h.fromEquirectangularTexture(i,l),e.set(l,h),l.addEventListener("dispose",s),t(h.texture,l.mapping)}else return null}}return l}function s(l){const u=l.target;u.removeEventListener("dispose",s);const f=e.get(u);f!==void 0&&(e.delete(u),f.dispose())}function a(){e=new WeakMap}return{get:n,dispose:a}}class M_ extends __{constructor(e=-1,t=1,n=1,s=-1,a=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=a,this.far=l,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,a,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=n-e,l=n+e,u=s+t,f=s-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=h*this.view.offsetX,l=a+h*this.view.width,u-=p*this.view.offsetY,f=u-p*this.view.height}this.projectionMatrix.makeOrthographic(a,l,u,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Io=4,lv=[.125,.215,.35,.446,.526,.582],bs=20,Wd=new M_,cv=new Bt;let jd=null,$d=0,Xd=0,qd=!1;const ws=(1+Math.sqrt(5))/2,wo=1/ws,uv=[new J(-ws,wo,0),new J(ws,wo,0),new J(-wo,0,ws),new J(wo,0,ws),new J(0,ws,-wo),new J(0,ws,wo),new J(-1,1,-1),new J(1,1,-1),new J(-1,1,1),new J(1,1,1)];class Yh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){jd=this._renderer.getRenderTarget(),$d=this._renderer.getActiveCubeFace(),Xd=this._renderer.getActiveMipmapLevel(),qd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,s,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(jd,$d,Xd),this._renderer.xr.enabled=qd,e.scissorTest=!1,Bc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Wo||e.mapping===jo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jd=this._renderer.getRenderTarget(),$d=this._renderer.getActiveCubeFace(),Xd=this._renderer.getActiveMipmapLevel(),qd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Yi,minFilter:Yi,generateMipmaps:!1,type:dl,format:Bi,colorSpace:ea,depthBuffer:!1},s=fv(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fv(e,t,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=q2(a)),this._blurMaterial=K2(a,e,t)}return s}_compileMaterial(e){const t=new Nt(this._lodPlanes[0],e);this._renderer.compile(t,Wd)}_sceneToCubeUV(e,t,n,s){const u=new ai(90,1,t,n),f=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,m=p.autoClear,v=p.toneMapping;p.getClearColor(cv),p.toneMapping=ts,p.autoClear=!1;const y=new Cu({name:"PMREM.Background",side:Yn,depthWrite:!1,depthTest:!1}),M=new Nt(new oi,y);let S=!1;const _=e.background;_?_.isColor&&(y.color.copy(_),e.background=null,S=!0):(y.color.copy(cv),S=!0);for(let x=0;x<6;x++){const R=x%3;R===0?(u.up.set(0,f[x],0),u.lookAt(h[x],0,0)):R===1?(u.up.set(0,0,f[x]),u.lookAt(0,h[x],0)):(u.up.set(0,f[x],0),u.lookAt(0,0,h[x]));const P=this._cubeSize;Bc(s,R*P,x>2?P:0,P,P),p.setRenderTarget(s),S&&p.render(M,u),p.render(e,u)}M.geometry.dispose(),M.material.dispose(),p.toneMapping=v,p.autoClear=m,e.background=_}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Wo||e.mapping===jo;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dv());const a=s?this._cubemapMaterial:this._equirectMaterial,l=new Nt(this._lodPlanes[0],a),u=a.uniforms;u.envMap.value=e;const f=this._cubeSize;Bc(t,0,0,3*f,2*f),n.setRenderTarget(t),n.render(l,Wd)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const l=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),u=uv[(s-a-1)%uv.length];this._blur(e,a-1,a,l,u)}t.autoClear=n}_blur(e,t,n,s,a){const l=this._pingPongRenderTarget;this._halfBlur(e,l,t,n,s,"latitudinal",a),this._halfBlur(l,e,n,n,s,"longitudinal",a)}_halfBlur(e,t,n,s,a,l,u){const f=this._renderer,h=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const p=3,m=new Nt(this._lodPlanes[s],h),v=h.uniforms,y=this._sizeLods[n]-1,M=isFinite(a)?Math.PI/(2*y):2*Math.PI/(2*bs-1),S=a/M,_=isFinite(a)?1+Math.floor(p*S):bs;_>bs&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${bs}`);const x=[];let R=0;for(let D=0;D<bs;++D){const B=D/S,L=Math.exp(-B*B/2);x.push(L),D===0?R+=L:D<_&&(R+=2*L)}for(let D=0;D<x.length;D++)x[D]=x[D]/R;v.envMap.value=e.texture,v.samples.value=_,v.weights.value=x,v.latitudinal.value=l==="latitudinal",u&&(v.poleAxis.value=u);const{_lodMax:P}=this;v.dTheta.value=M,v.mipInt.value=P-n;const E=this._sizeLods[s],V=3*E*(s>P-Io?s-P+Io:0),N=4*(this._cubeSize-E);Bc(t,V,N,3*E,2*E),f.setRenderTarget(t),f.render(m,Wd)}}function q2(i){const e=[],t=[],n=[];let s=i;const a=i-Io+1+lv.length;for(let l=0;l<a;l++){const u=Math.pow(2,s);t.push(u);let f=1/u;l>i-Io?f=lv[l-i+Io-1]:l===0&&(f=0),n.push(f);const h=1/(u-2),p=-h,m=1+h,v=[p,p,m,p,m,m,p,p,m,m,p,m],y=6,M=6,S=3,_=2,x=1,R=new Float32Array(S*M*y),P=new Float32Array(_*M*y),E=new Float32Array(x*M*y);for(let N=0;N<y;N++){const D=N%3*2/3-1,B=N>2?0:-1,L=[D,B,0,D+2/3,B,0,D+2/3,B+1,0,D,B,0,D+2/3,B+1,0,D,B+1,0];R.set(L,S*M*N),P.set(v,_*M*N);const A=[N,N,N,N,N,N];E.set(A,x*M*N)}const V=new wn;V.setAttribute("position",new Zi(R,S)),V.setAttribute("uv",new Zi(P,_)),V.setAttribute("faceIndex",new Zi(E,x)),e.push(V),s>Io&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function fv(i,e,t){const n=new Ds(i,e,t);return n.texture.mapping=Eu,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bc(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function K2(i,e,t){const n=new Float32Array(bs),s=new J(0,1,0);return new is({name:"SphericalGaussianBlur",defines:{n:bs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Dp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:es,depthTest:!1,depthWrite:!1})}function dv(){return new is({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Dp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:es,depthTest:!1,depthWrite:!1})}function hv(){return new is({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Dp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:es,depthTest:!1,depthWrite:!1})}function Dp(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Y2(i){let e=new WeakMap,t=null;function n(u){if(u&&u.isTexture){const f=u.mapping,h=f===xh||f===Sh,p=f===Wo||f===jo;if(h||p){let m=e.get(u);const v=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==v)return t===null&&(t=new Yh(i)),m=h?t.fromEquirectangular(u,m):t.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{const y=u.image;return h&&y&&y.height>0||p&&y&&s(y)?(t===null&&(t=new Yh(i)),m=h?t.fromEquirectangular(u):t.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",a),m.texture):null}}}return u}function s(u){let f=0;const h=6;for(let p=0;p<h;p++)u[p]!==void 0&&f++;return f===h}function a(u){const f=u.target;f.removeEventListener("dispose",a);const h=e.get(f);h!==void 0&&(e.delete(f),h.dispose())}function l(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:l}}function Z2(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Wa("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function J2(i,e,t,n){const s={},a=new WeakMap;function l(m){const v=m.target;v.index!==null&&e.remove(v.index);for(const M in v.attributes)e.remove(v.attributes[M]);for(const M in v.morphAttributes){const S=v.morphAttributes[M];for(let _=0,x=S.length;_<x;_++)e.remove(S[_])}v.removeEventListener("dispose",l),delete s[v.id];const y=a.get(v);y&&(e.remove(y),a.delete(v)),n.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,t.memory.geometries--}function u(m,v){return s[v.id]===!0||(v.addEventListener("dispose",l),s[v.id]=!0,t.memory.geometries++),v}function f(m){const v=m.attributes;for(const M in v)e.update(v[M],i.ARRAY_BUFFER);const y=m.morphAttributes;for(const M in y){const S=y[M];for(let _=0,x=S.length;_<x;_++)e.update(S[_],i.ARRAY_BUFFER)}}function h(m){const v=[],y=m.index,M=m.attributes.position;let S=0;if(y!==null){const R=y.array;S=y.version;for(let P=0,E=R.length;P<E;P+=3){const V=R[P+0],N=R[P+1],D=R[P+2];v.push(V,N,N,D,D,V)}}else if(M!==void 0){const R=M.array;S=M.version;for(let P=0,E=R.length/3-1;P<E;P+=3){const V=P+0,N=P+1,D=P+2;v.push(V,N,N,D,D,V)}}else return;const _=new(d_(v)?v_:g_)(v,1);_.version=S;const x=a.get(m);x&&e.remove(x),a.set(m,_)}function p(m){const v=a.get(m);if(v){const y=m.index;y!==null&&v.version<y.version&&h(m)}else h(m);return a.get(m)}return{get:u,update:f,getWireframeAttribute:p}}function Q2(i,e,t){let n;function s(v){n=v}let a,l;function u(v){a=v.type,l=v.bytesPerElement}function f(v,y){i.drawElements(n,y,a,v*l),t.update(y,n,1)}function h(v,y,M){M!==0&&(i.drawElementsInstanced(n,y,a,v*l,M),t.update(y,n,M))}function p(v,y,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,y,0,a,v,0,M);let _=0;for(let x=0;x<M;x++)_+=y[x];t.update(_,n,1)}function m(v,y,M,S){if(M===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let x=0;x<v.length;x++)h(v[x]/l,y[x],S[x]);else{_.multiDrawElementsInstancedWEBGL(n,y,0,a,v,0,S,0,M);let x=0;for(let R=0;R<M;R++)x+=y[R]*S[R];t.update(x,n,1)}}this.setMode=s,this.setIndex=u,this.render=f,this.renderInstances=h,this.renderMultiDraw=p,this.renderMultiDrawInstances=m}function eT(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,l,u){switch(t.calls++,l){case i.TRIANGLES:t.triangles+=u*(a/3);break;case i.LINES:t.lines+=u*(a/2);break;case i.LINE_STRIP:t.lines+=u*(a-1);break;case i.LINE_LOOP:t.lines+=u*a;break;case i.POINTS:t.points+=u*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function tT(i,e,t){const n=new WeakMap,s=new Jt;function a(l,u,f){const h=l.morphTargetInfluences,p=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,m=p!==void 0?p.length:0;let v=n.get(u);if(v===void 0||v.count!==m){let L=function(){D.dispose(),n.delete(u),u.removeEventListener("dispose",L)};v!==void 0&&v.texture.dispose();const y=u.morphAttributes.position!==void 0,M=u.morphAttributes.normal!==void 0,S=u.morphAttributes.color!==void 0,_=u.morphAttributes.position||[],x=u.morphAttributes.normal||[],R=u.morphAttributes.color||[];let P=0;y===!0&&(P=1),M===!0&&(P=2),S===!0&&(P=3);let E=u.attributes.position.count*P,V=1;E>e.maxTextureSize&&(V=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const N=new Float32Array(E*V*4*m),D=new p_(N,E,V,m);D.type=_r,D.needsUpdate=!0;const B=P*4;for(let A=0;A<m;A++){const U=_[A],q=x[A],X=R[A],ne=E*V*4*A;for(let he=0;he<U.count;he++){const ae=he*B;y===!0&&(s.fromBufferAttribute(U,he),N[ne+ae+0]=s.x,N[ne+ae+1]=s.y,N[ne+ae+2]=s.z,N[ne+ae+3]=0),M===!0&&(s.fromBufferAttribute(q,he),N[ne+ae+4]=s.x,N[ne+ae+5]=s.y,N[ne+ae+6]=s.z,N[ne+ae+7]=0),S===!0&&(s.fromBufferAttribute(X,he),N[ne+ae+8]=s.x,N[ne+ae+9]=s.y,N[ne+ae+10]=s.z,N[ne+ae+11]=X.itemSize===4?s.w:1)}}v={count:m,texture:D,size:new $e(E,V)},n.set(u,v),u.addEventListener("dispose",L)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)f.getUniforms().setValue(i,"morphTexture",l.morphTexture,t);else{let y=0;for(let S=0;S<h.length;S++)y+=h[S];const M=u.morphTargetsRelative?1:1-y;f.getUniforms().setValue(i,"morphTargetBaseInfluence",M),f.getUniforms().setValue(i,"morphTargetInfluences",h)}f.getUniforms().setValue(i,"morphTargetsTexture",v.texture,t),f.getUniforms().setValue(i,"morphTargetsTextureSize",v.size)}return{update:a}}function nT(i,e,t,n){let s=new WeakMap;function a(f){const h=n.render.frame,p=f.geometry,m=e.get(f,p);if(s.get(m)!==h&&(e.update(m),s.set(m,h)),f.isInstancedMesh&&(f.hasEventListener("dispose",u)===!1&&f.addEventListener("dispose",u),s.get(f)!==h&&(t.update(f.instanceMatrix,i.ARRAY_BUFFER),f.instanceColor!==null&&t.update(f.instanceColor,i.ARRAY_BUFFER),s.set(f,h))),f.isSkinnedMesh){const v=f.skeleton;s.get(v)!==h&&(v.update(),s.set(v,h))}return m}function l(){s=new WeakMap}function u(f){const h=f.target;h.removeEventListener("dispose",u),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:l}}class w_ extends Zn{constructor(e,t,n,s,a,l,u,f,h,p=Fo){if(p!==Fo&&p!==Xo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&p===Fo&&(n=Is),n===void 0&&p===Xo&&(n=$o),super(null,s,a,l,u,f,p,n,h),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=u!==void 0?u:Hi,this.minFilter=f!==void 0?f:Hi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const E_=new Zn,pv=new w_(1,1),b_=new p_,T_=new Vw,A_=new x_,mv=[],gv=[],vv=new Float32Array(16),yv=new Float32Array(9),_v=new Float32Array(4);function na(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let a=mv[s];if(a===void 0&&(a=new Float32Array(s),mv[s]=a),e!==0){n.toArray(a,0);for(let l=1,u=0;l!==e;++l)u+=t,i[l].toArray(a,u)}return a}function En(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function bn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Pu(i,e){let t=gv[e];t===void 0&&(t=new Int32Array(e),gv[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function iT(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function rT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(En(t,e))return;i.uniform2fv(this.addr,e),bn(t,e)}}function sT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(En(t,e))return;i.uniform3fv(this.addr,e),bn(t,e)}}function oT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(En(t,e))return;i.uniform4fv(this.addr,e),bn(t,e)}}function aT(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(En(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),bn(t,e)}else{if(En(t,n))return;_v.set(n),i.uniformMatrix2fv(this.addr,!1,_v),bn(t,n)}}function lT(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(En(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),bn(t,e)}else{if(En(t,n))return;yv.set(n),i.uniformMatrix3fv(this.addr,!1,yv),bn(t,n)}}function cT(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(En(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),bn(t,e)}else{if(En(t,n))return;vv.set(n),i.uniformMatrix4fv(this.addr,!1,vv),bn(t,n)}}function uT(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function fT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(En(t,e))return;i.uniform2iv(this.addr,e),bn(t,e)}}function dT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(En(t,e))return;i.uniform3iv(this.addr,e),bn(t,e)}}function hT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(En(t,e))return;i.uniform4iv(this.addr,e),bn(t,e)}}function pT(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function mT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(En(t,e))return;i.uniform2uiv(this.addr,e),bn(t,e)}}function gT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(En(t,e))return;i.uniform3uiv(this.addr,e),bn(t,e)}}function vT(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(En(t,e))return;i.uniform4uiv(this.addr,e),bn(t,e)}}function yT(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let a;this.type===i.SAMPLER_2D_SHADOW?(pv.compareFunction=f_,a=pv):a=E_,t.setTexture2D(e||a,s)}function _T(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||T_,s)}function xT(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||A_,s)}function ST(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||b_,s)}function MT(i){switch(i){case 5126:return iT;case 35664:return rT;case 35665:return sT;case 35666:return oT;case 35674:return aT;case 35675:return lT;case 35676:return cT;case 5124:case 35670:return uT;case 35667:case 35671:return fT;case 35668:case 35672:return dT;case 35669:case 35673:return hT;case 5125:return pT;case 36294:return mT;case 36295:return gT;case 36296:return vT;case 35678:case 36198:case 36298:case 36306:case 35682:return yT;case 35679:case 36299:case 36307:return _T;case 35680:case 36300:case 36308:case 36293:return xT;case 36289:case 36303:case 36311:case 36292:return ST}}function wT(i,e){i.uniform1fv(this.addr,e)}function ET(i,e){const t=na(e,this.size,2);i.uniform2fv(this.addr,t)}function bT(i,e){const t=na(e,this.size,3);i.uniform3fv(this.addr,t)}function TT(i,e){const t=na(e,this.size,4);i.uniform4fv(this.addr,t)}function AT(i,e){const t=na(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function CT(i,e){const t=na(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function RT(i,e){const t=na(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function PT(i,e){i.uniform1iv(this.addr,e)}function LT(i,e){i.uniform2iv(this.addr,e)}function IT(i,e){i.uniform3iv(this.addr,e)}function DT(i,e){i.uniform4iv(this.addr,e)}function NT(i,e){i.uniform1uiv(this.addr,e)}function kT(i,e){i.uniform2uiv(this.addr,e)}function UT(i,e){i.uniform3uiv(this.addr,e)}function OT(i,e){i.uniform4uiv(this.addr,e)}function FT(i,e,t){const n=this.cache,s=e.length,a=Pu(t,s);En(n,a)||(i.uniform1iv(this.addr,a),bn(n,a));for(let l=0;l!==s;++l)t.setTexture2D(e[l]||E_,a[l])}function zT(i,e,t){const n=this.cache,s=e.length,a=Pu(t,s);En(n,a)||(i.uniform1iv(this.addr,a),bn(n,a));for(let l=0;l!==s;++l)t.setTexture3D(e[l]||T_,a[l])}function BT(i,e,t){const n=this.cache,s=e.length,a=Pu(t,s);En(n,a)||(i.uniform1iv(this.addr,a),bn(n,a));for(let l=0;l!==s;++l)t.setTextureCube(e[l]||A_,a[l])}function HT(i,e,t){const n=this.cache,s=e.length,a=Pu(t,s);En(n,a)||(i.uniform1iv(this.addr,a),bn(n,a));for(let l=0;l!==s;++l)t.setTexture2DArray(e[l]||b_,a[l])}function VT(i){switch(i){case 5126:return wT;case 35664:return ET;case 35665:return bT;case 35666:return TT;case 35674:return AT;case 35675:return CT;case 35676:return RT;case 5124:case 35670:return PT;case 35667:case 35671:return LT;case 35668:case 35672:return IT;case 35669:case 35673:return DT;case 5125:return NT;case 36294:return kT;case 36295:return UT;case 36296:return OT;case 35678:case 36198:case 36298:case 36306:case 35682:return FT;case 35679:case 36299:case 36307:return zT;case 35680:case 36300:case 36308:case 36293:return BT;case 36289:case 36303:case 36311:case 36292:return HT}}class GT{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=MT(t.type)}}class WT{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=VT(t.type)}}class jT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let a=0,l=s.length;a!==l;++a){const u=s[a];u.setValue(e,t[u.id],n)}}}const Kd=/(\w+)(\])?(\[|\.)?/g;function xv(i,e){i.seq.push(e),i.map[e.id]=e}function $T(i,e,t){const n=i.name,s=n.length;for(Kd.lastIndex=0;;){const a=Kd.exec(n),l=Kd.lastIndex;let u=a[1];const f=a[2]==="]",h=a[3];if(f&&(u=u|0),h===void 0||h==="["&&l+2===s){xv(t,h===void 0?new GT(u,i,e):new WT(u,i,e));break}else{let m=t.map[u];m===void 0&&(m=new jT(u),xv(t,m)),t=m}}}class su{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const a=e.getActiveUniform(t,s),l=e.getUniformLocation(t,a.name);$T(a,l,this)}}setValue(e,t,n,s){const a=this.map[t];a!==void 0&&a.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let a=0,l=t.length;a!==l;++a){const u=t[a],f=n[u.id];f.needsUpdate!==!1&&u.setValue(e,f.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,a=e.length;s!==a;++s){const l=e[s];l.id in t&&n.push(l)}return n}}function Sv(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const XT=37297;let qT=0;function KT(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let l=s;l<a;l++){const u=l+1;n.push(`${u===e?">":" "} ${u}: ${t[l]}`)}return n.join(`
`)}const Mv=new kt;function YT(i){Gt._getMatrix(Mv,Gt.workingColorSpace,i);const e=`mat3( ${Mv.elements.map(t=>t.toFixed(4))} )`;switch(Gt.getTransfer(i)){case bu:return[e,"LinearTransferOETF"];case Yt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function wv(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const l=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+KT(i.getShaderSource(e),l)}else return s}function ZT(i,e){const t=YT(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function JT(i,e){let t;switch(e){case tw:t="Linear";break;case nw:t="Reinhard";break;case iw:t="Cineon";break;case Jy:t="ACESFilmic";break;case sw:t="AgX";break;case ow:t="Neutral";break;case rw:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Hc=new J;function QT(){Gt.getLuminanceCoefficients(Hc);const i=Hc.x.toFixed(4),e=Hc.y.toFixed(4),t=Hc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function eA(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ja).join(`
`)}function tA(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function nA(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const a=i.getActiveAttrib(e,s),l=a.name;let u=1;a.type===i.FLOAT_MAT2&&(u=2),a.type===i.FLOAT_MAT3&&(u=3),a.type===i.FLOAT_MAT4&&(u=4),t[l]={type:a.type,location:i.getAttribLocation(e,l),locationSize:u}}return t}function ja(i){return i!==""}function Ev(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function bv(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const iA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zh(i){return i.replace(iA,sA)}const rA=new Map;function sA(i,e){let t=Ut[e];if(t===void 0){const n=rA.get(e);if(n!==void 0)t=Ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Zh(t)}const oA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tv(i){return i.replace(oA,aA)}function aA(i,e,t,n){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Av(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function lA(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Yy?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===NM?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===mr&&(e="SHADOWMAP_TYPE_VSM"),e}function cA(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Wo:case jo:e="ENVMAP_TYPE_CUBE";break;case Eu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function uA(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case jo:e="ENVMAP_MODE_REFRACTION";break}return e}function fA(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Zy:e="ENVMAP_BLENDING_MULTIPLY";break;case QM:e="ENVMAP_BLENDING_MIX";break;case ew:e="ENVMAP_BLENDING_ADD";break}return e}function dA(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function hA(i,e,t,n){const s=i.getContext(),a=t.defines;let l=t.vertexShader,u=t.fragmentShader;const f=lA(t),h=cA(t),p=uA(t),m=fA(t),v=dA(t),y=eA(t),M=tA(a),S=s.createProgram();let _,x,R=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(ja).join(`
`),_.length>0&&(_+=`
`),x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(ja).join(`
`),x.length>0&&(x+=`
`)):(_=[Av(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ja).join(`
`),x=[Av(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+p:"",t.envMap?"#define "+m:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ts?"#define TONE_MAPPING":"",t.toneMapping!==ts?Ut.tonemapping_pars_fragment:"",t.toneMapping!==ts?JT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ut.colorspace_pars_fragment,ZT("linearToOutputTexel",t.outputColorSpace),QT(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ja).join(`
`)),l=Zh(l),l=Ev(l,t),l=bv(l,t),u=Zh(u),u=Ev(u,t),u=bv(u,t),l=Tv(l),u=Tv(u),t.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,_=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,x=["#define varying in",t.glslVersion===Bg?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const P=R+_+l,E=R+x+u,V=Sv(s,s.VERTEX_SHADER,P),N=Sv(s,s.FRAGMENT_SHADER,E);s.attachShader(S,V),s.attachShader(S,N),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function D(U){if(i.debug.checkShaderErrors){const q=s.getProgramInfoLog(S).trim(),X=s.getShaderInfoLog(V).trim(),ne=s.getShaderInfoLog(N).trim();let he=!0,ae=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(he=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,S,V,N);else{const Me=wv(s,V,"vertex"),$=wv(s,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+q+`
`+Me+`
`+$)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(X===""||ne==="")&&(ae=!1);ae&&(U.diagnostics={runnable:he,programLog:q,vertexShader:{log:X,prefix:_},fragmentShader:{log:ne,prefix:x}})}s.deleteShader(V),s.deleteShader(N),B=new su(s,S),L=nA(s,S)}let B;this.getUniforms=function(){return B===void 0&&D(this),B};let L;this.getAttributes=function(){return L===void 0&&D(this),L};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(S,XT)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=qT++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=V,this.fragmentShader=N,this}let pA=0;class mA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(n),l=this._getShaderCacheForMaterial(e);return l.has(s)===!1&&(l.add(s),s.usedTimes++),l.has(a)===!1&&(l.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new gA(e),t.set(e,n)),n}}class gA{constructor(e){this.id=pA++,this.code=e,this.usedTimes=0}}function vA(i,e,t,n,s,a,l){const u=new Lp,f=new mA,h=new Set,p=[],m=s.logarithmicDepthBuffer,v=s.vertexTextures;let y=s.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(L){return h.add(L),L===0?"uv":`uv${L}`}function _(L,A,U,q,X){const ne=q.fog,he=X.geometry,ae=L.isMeshStandardMaterial?q.environment:null,Me=(L.isMeshStandardMaterial?t:e).get(L.envMap||ae),$=Me&&Me.mapping===Eu?Me.image.height:null,z=M[L.type];L.precision!==null&&(y=s.getMaxPrecision(L.precision),y!==L.precision&&console.warn("THREE.WebGLProgram.getParameters:",L.precision,"not supported, using",y,"instead."));const ee=he.morphAttributes.position||he.morphAttributes.normal||he.morphAttributes.color,F=ee!==void 0?ee.length:0;let Y=0;he.morphAttributes.position!==void 0&&(Y=1),he.morphAttributes.normal!==void 0&&(Y=2),he.morphAttributes.color!==void 0&&(Y=3);let Ce,K,ce,we;if(z){const Ot=qi[z];Ce=Ot.vertexShader,K=Ot.fragmentShader}else Ce=L.vertexShader,K=L.fragmentShader,f.update(L),ce=f.getVertexShaderID(L),we=f.getFragmentShaderID(L);const xe=i.getRenderTarget(),Ie=i.state.buffers.depth.getReversed(),Oe=X.isInstancedMesh===!0,Ge=X.isBatchedMesh===!0,Ke=!!L.map,ye=!!L.matcap,Le=!!Me,W=!!L.aoMap,le=!!L.lightMap,Ee=!!L.bumpMap,Ue=!!L.normalMap,Pe=!!L.displacementMap,Je=!!L.emissiveMap,ze=!!L.metalnessMap,H=!!L.roughnessMap,T=L.anisotropy>0,G=L.clearcoat>0,be=L.dispersion>0,_e=L.iridescence>0,Ae=L.sheen>0,Qe=L.transmission>0,je=T&&!!L.anisotropyMap,et=G&&!!L.clearcoatMap,Tt=G&&!!L.clearcoatNormalMap,De=G&&!!L.clearcoatRoughnessMap,it=_e&&!!L.iridescenceMap,pt=_e&&!!L.iridescenceThicknessMap,_t=Ae&&!!L.sheenColorMap,tt=Ae&&!!L.sheenRoughnessMap,Rt=!!L.specularMap,Te=!!L.specularColorMap,dt=!!L.specularIntensityMap,Q=Qe&&!!L.transmissionMap,We=Qe&&!!L.thicknessMap,ve=!!L.gradientMap,Re=!!L.alphaMap,Ze=L.alphaTest>0,Ye=!!L.alphaHash,Mt=!!L.extensions;let Xt=ts;L.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(Xt=i.toneMapping);const qt={shaderID:z,shaderType:L.type,shaderName:L.name,vertexShader:Ce,fragmentShader:K,defines:L.defines,customVertexShaderID:ce,customFragmentShaderID:we,isRawShaderMaterial:L.isRawShaderMaterial===!0,glslVersion:L.glslVersion,precision:y,batching:Ge,batchingColor:Ge&&X._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&X.instanceColor!==null,instancingMorph:Oe&&X.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:xe===null?i.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:ea,alphaToCoverage:!!L.alphaToCoverage,map:Ke,matcap:ye,envMap:Le,envMapMode:Le&&Me.mapping,envMapCubeUVHeight:$,aoMap:W,lightMap:le,bumpMap:Ee,normalMap:Ue,displacementMap:v&&Pe,emissiveMap:Je,normalMapObjectSpace:Ue&&L.normalMapType===uw,normalMapTangentSpace:Ue&&L.normalMapType===u_,metalnessMap:ze,roughnessMap:H,anisotropy:T,anisotropyMap:je,clearcoat:G,clearcoatMap:et,clearcoatNormalMap:Tt,clearcoatRoughnessMap:De,dispersion:be,iridescence:_e,iridescenceMap:it,iridescenceThicknessMap:pt,sheen:Ae,sheenColorMap:_t,sheenRoughnessMap:tt,specularMap:Rt,specularColorMap:Te,specularIntensityMap:dt,transmission:Qe,transmissionMap:Q,thicknessMap:We,gradientMap:ve,opaque:L.transparent===!1&&L.blending===Oo&&L.alphaToCoverage===!1,alphaMap:Re,alphaTest:Ze,alphaHash:Ye,combine:L.combine,mapUv:Ke&&S(L.map.channel),aoMapUv:W&&S(L.aoMap.channel),lightMapUv:le&&S(L.lightMap.channel),bumpMapUv:Ee&&S(L.bumpMap.channel),normalMapUv:Ue&&S(L.normalMap.channel),displacementMapUv:Pe&&S(L.displacementMap.channel),emissiveMapUv:Je&&S(L.emissiveMap.channel),metalnessMapUv:ze&&S(L.metalnessMap.channel),roughnessMapUv:H&&S(L.roughnessMap.channel),anisotropyMapUv:je&&S(L.anisotropyMap.channel),clearcoatMapUv:et&&S(L.clearcoatMap.channel),clearcoatNormalMapUv:Tt&&S(L.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:De&&S(L.clearcoatRoughnessMap.channel),iridescenceMapUv:it&&S(L.iridescenceMap.channel),iridescenceThicknessMapUv:pt&&S(L.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&S(L.sheenColorMap.channel),sheenRoughnessMapUv:tt&&S(L.sheenRoughnessMap.channel),specularMapUv:Rt&&S(L.specularMap.channel),specularColorMapUv:Te&&S(L.specularColorMap.channel),specularIntensityMapUv:dt&&S(L.specularIntensityMap.channel),transmissionMapUv:Q&&S(L.transmissionMap.channel),thicknessMapUv:We&&S(L.thicknessMap.channel),alphaMapUv:Re&&S(L.alphaMap.channel),vertexTangents:!!he.attributes.tangent&&(Ue||T),vertexColors:L.vertexColors,vertexAlphas:L.vertexColors===!0&&!!he.attributes.color&&he.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!he.attributes.uv&&(Ke||Re),fog:!!ne,useFog:L.fog===!0,fogExp2:!!ne&&ne.isFogExp2,flatShading:L.flatShading===!0,sizeAttenuation:L.sizeAttenuation===!0,logarithmicDepthBuffer:m,reverseDepthBuffer:Ie,skinning:X.isSkinnedMesh===!0,morphTargets:he.morphAttributes.position!==void 0,morphNormals:he.morphAttributes.normal!==void 0,morphColors:he.morphAttributes.color!==void 0,morphTargetsCount:F,morphTextureStride:Y,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:L.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:Xt,decodeVideoTexture:Ke&&L.map.isVideoTexture===!0&&Gt.getTransfer(L.map.colorSpace)===Yt,decodeVideoTextureEmissive:Je&&L.emissiveMap.isVideoTexture===!0&&Gt.getTransfer(L.emissiveMap.colorSpace)===Yt,premultipliedAlpha:L.premultipliedAlpha,doubleSided:L.side===vr,flipSided:L.side===Yn,useDepthPacking:L.depthPacking>=0,depthPacking:L.depthPacking||0,index0AttributeName:L.index0AttributeName,extensionClipCullDistance:Mt&&L.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Mt&&L.extensions.multiDraw===!0||Ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:L.customProgramCacheKey()};return qt.vertexUv1s=h.has(1),qt.vertexUv2s=h.has(2),qt.vertexUv3s=h.has(3),h.clear(),qt}function x(L){const A=[];if(L.shaderID?A.push(L.shaderID):(A.push(L.customVertexShaderID),A.push(L.customFragmentShaderID)),L.defines!==void 0)for(const U in L.defines)A.push(U),A.push(L.defines[U]);return L.isRawShaderMaterial===!1&&(R(A,L),P(A,L),A.push(i.outputColorSpace)),A.push(L.customProgramCacheKey),A.join()}function R(L,A){L.push(A.precision),L.push(A.outputColorSpace),L.push(A.envMapMode),L.push(A.envMapCubeUVHeight),L.push(A.mapUv),L.push(A.alphaMapUv),L.push(A.lightMapUv),L.push(A.aoMapUv),L.push(A.bumpMapUv),L.push(A.normalMapUv),L.push(A.displacementMapUv),L.push(A.emissiveMapUv),L.push(A.metalnessMapUv),L.push(A.roughnessMapUv),L.push(A.anisotropyMapUv),L.push(A.clearcoatMapUv),L.push(A.clearcoatNormalMapUv),L.push(A.clearcoatRoughnessMapUv),L.push(A.iridescenceMapUv),L.push(A.iridescenceThicknessMapUv),L.push(A.sheenColorMapUv),L.push(A.sheenRoughnessMapUv),L.push(A.specularMapUv),L.push(A.specularColorMapUv),L.push(A.specularIntensityMapUv),L.push(A.transmissionMapUv),L.push(A.thicknessMapUv),L.push(A.combine),L.push(A.fogExp2),L.push(A.sizeAttenuation),L.push(A.morphTargetsCount),L.push(A.morphAttributeCount),L.push(A.numDirLights),L.push(A.numPointLights),L.push(A.numSpotLights),L.push(A.numSpotLightMaps),L.push(A.numHemiLights),L.push(A.numRectAreaLights),L.push(A.numDirLightShadows),L.push(A.numPointLightShadows),L.push(A.numSpotLightShadows),L.push(A.numSpotLightShadowsWithMaps),L.push(A.numLightProbes),L.push(A.shadowMapType),L.push(A.toneMapping),L.push(A.numClippingPlanes),L.push(A.numClipIntersection),L.push(A.depthPacking)}function P(L,A){u.disableAll(),A.supportsVertexTextures&&u.enable(0),A.instancing&&u.enable(1),A.instancingColor&&u.enable(2),A.instancingMorph&&u.enable(3),A.matcap&&u.enable(4),A.envMap&&u.enable(5),A.normalMapObjectSpace&&u.enable(6),A.normalMapTangentSpace&&u.enable(7),A.clearcoat&&u.enable(8),A.iridescence&&u.enable(9),A.alphaTest&&u.enable(10),A.vertexColors&&u.enable(11),A.vertexAlphas&&u.enable(12),A.vertexUv1s&&u.enable(13),A.vertexUv2s&&u.enable(14),A.vertexUv3s&&u.enable(15),A.vertexTangents&&u.enable(16),A.anisotropy&&u.enable(17),A.alphaHash&&u.enable(18),A.batching&&u.enable(19),A.dispersion&&u.enable(20),A.batchingColor&&u.enable(21),L.push(u.mask),u.disableAll(),A.fog&&u.enable(0),A.useFog&&u.enable(1),A.flatShading&&u.enable(2),A.logarithmicDepthBuffer&&u.enable(3),A.reverseDepthBuffer&&u.enable(4),A.skinning&&u.enable(5),A.morphTargets&&u.enable(6),A.morphNormals&&u.enable(7),A.morphColors&&u.enable(8),A.premultipliedAlpha&&u.enable(9),A.shadowMapEnabled&&u.enable(10),A.doubleSided&&u.enable(11),A.flipSided&&u.enable(12),A.useDepthPacking&&u.enable(13),A.dithering&&u.enable(14),A.transmission&&u.enable(15),A.sheen&&u.enable(16),A.opaque&&u.enable(17),A.pointsUvs&&u.enable(18),A.decodeVideoTexture&&u.enable(19),A.decodeVideoTextureEmissive&&u.enable(20),A.alphaToCoverage&&u.enable(21),L.push(u.mask)}function E(L){const A=M[L.type];let U;if(A){const q=qi[A];U=eE.clone(q.uniforms)}else U=L.uniforms;return U}function V(L,A){let U;for(let q=0,X=p.length;q<X;q++){const ne=p[q];if(ne.cacheKey===A){U=ne,++U.usedTimes;break}}return U===void 0&&(U=new hA(i,A,L,a),p.push(U)),U}function N(L){if(--L.usedTimes===0){const A=p.indexOf(L);p[A]=p[p.length-1],p.pop(),L.destroy()}}function D(L){f.remove(L)}function B(){f.dispose()}return{getParameters:_,getProgramCacheKey:x,getUniforms:E,acquireProgram:V,releaseProgram:N,releaseShaderCache:D,programs:p,dispose:B}}function yA(){let i=new WeakMap;function e(l){return i.has(l)}function t(l){let u=i.get(l);return u===void 0&&(u={},i.set(l,u)),u}function n(l){i.delete(l)}function s(l,u,f){i.get(l)[u]=f}function a(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:a}}function _A(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Cv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Rv(){const i=[];let e=0;const t=[],n=[],s=[];function a(){e=0,t.length=0,n.length=0,s.length=0}function l(m,v,y,M,S,_){let x=i[e];return x===void 0?(x={id:m.id,object:m,geometry:v,material:y,groupOrder:M,renderOrder:m.renderOrder,z:S,group:_},i[e]=x):(x.id=m.id,x.object=m,x.geometry=v,x.material=y,x.groupOrder=M,x.renderOrder=m.renderOrder,x.z=S,x.group=_),e++,x}function u(m,v,y,M,S,_){const x=l(m,v,y,M,S,_);y.transmission>0?n.push(x):y.transparent===!0?s.push(x):t.push(x)}function f(m,v,y,M,S,_){const x=l(m,v,y,M,S,_);y.transmission>0?n.unshift(x):y.transparent===!0?s.unshift(x):t.unshift(x)}function h(m,v){t.length>1&&t.sort(m||_A),n.length>1&&n.sort(v||Cv),s.length>1&&s.sort(v||Cv)}function p(){for(let m=e,v=i.length;m<v;m++){const y=i[m];if(y.id===null)break;y.id=null,y.object=null,y.geometry=null,y.material=null,y.group=null}}return{opaque:t,transmissive:n,transparent:s,init:a,push:u,unshift:f,finish:p,sort:h}}function xA(){let i=new WeakMap;function e(n,s){const a=i.get(n);let l;return a===void 0?(l=new Rv,i.set(n,[l])):s>=a.length?(l=new Rv,a.push(l)):l=a[s],l}function t(){i=new WeakMap}return{get:e,dispose:t}}function SA(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new J,color:new Bt};break;case"SpotLight":t={position:new J,direction:new J,color:new Bt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new J,color:new Bt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new J,skyColor:new Bt,groundColor:new Bt};break;case"RectAreaLight":t={color:new Bt,position:new J,halfWidth:new J,halfHeight:new J};break}return i[e.id]=t,t}}}function MA(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let wA=0;function EA(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function bA(i){const e=new SA,t=MA(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new J);const s=new J,a=new Qt,l=new Qt;function u(h){let p=0,m=0,v=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let y=0,M=0,S=0,_=0,x=0,R=0,P=0,E=0,V=0,N=0,D=0;h.sort(EA);for(let L=0,A=h.length;L<A;L++){const U=h[L],q=U.color,X=U.intensity,ne=U.distance,he=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)p+=q.r*X,m+=q.g*X,v+=q.b*X;else if(U.isLightProbe){for(let ae=0;ae<9;ae++)n.probe[ae].addScaledVector(U.sh.coefficients[ae],X);D++}else if(U.isDirectionalLight){const ae=e.get(U);if(ae.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const Me=U.shadow,$=t.get(U);$.shadowIntensity=Me.intensity,$.shadowBias=Me.bias,$.shadowNormalBias=Me.normalBias,$.shadowRadius=Me.radius,$.shadowMapSize=Me.mapSize,n.directionalShadow[y]=$,n.directionalShadowMap[y]=he,n.directionalShadowMatrix[y]=U.shadow.matrix,R++}n.directional[y]=ae,y++}else if(U.isSpotLight){const ae=e.get(U);ae.position.setFromMatrixPosition(U.matrixWorld),ae.color.copy(q).multiplyScalar(X),ae.distance=ne,ae.coneCos=Math.cos(U.angle),ae.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),ae.decay=U.decay,n.spot[S]=ae;const Me=U.shadow;if(U.map&&(n.spotLightMap[V]=U.map,V++,Me.updateMatrices(U),U.castShadow&&N++),n.spotLightMatrix[S]=Me.matrix,U.castShadow){const $=t.get(U);$.shadowIntensity=Me.intensity,$.shadowBias=Me.bias,$.shadowNormalBias=Me.normalBias,$.shadowRadius=Me.radius,$.shadowMapSize=Me.mapSize,n.spotShadow[S]=$,n.spotShadowMap[S]=he,E++}S++}else if(U.isRectAreaLight){const ae=e.get(U);ae.color.copy(q).multiplyScalar(X),ae.halfWidth.set(U.width*.5,0,0),ae.halfHeight.set(0,U.height*.5,0),n.rectArea[_]=ae,_++}else if(U.isPointLight){const ae=e.get(U);if(ae.color.copy(U.color).multiplyScalar(U.intensity),ae.distance=U.distance,ae.decay=U.decay,U.castShadow){const Me=U.shadow,$=t.get(U);$.shadowIntensity=Me.intensity,$.shadowBias=Me.bias,$.shadowNormalBias=Me.normalBias,$.shadowRadius=Me.radius,$.shadowMapSize=Me.mapSize,$.shadowCameraNear=Me.camera.near,$.shadowCameraFar=Me.camera.far,n.pointShadow[M]=$,n.pointShadowMap[M]=he,n.pointShadowMatrix[M]=U.shadow.matrix,P++}n.point[M]=ae,M++}else if(U.isHemisphereLight){const ae=e.get(U);ae.skyColor.copy(U.color).multiplyScalar(X),ae.groundColor.copy(U.groundColor).multiplyScalar(X),n.hemi[x]=ae,x++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=nt.LTC_FLOAT_1,n.rectAreaLTC2=nt.LTC_FLOAT_2):(n.rectAreaLTC1=nt.LTC_HALF_1,n.rectAreaLTC2=nt.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=m,n.ambient[2]=v;const B=n.hash;(B.directionalLength!==y||B.pointLength!==M||B.spotLength!==S||B.rectAreaLength!==_||B.hemiLength!==x||B.numDirectionalShadows!==R||B.numPointShadows!==P||B.numSpotShadows!==E||B.numSpotMaps!==V||B.numLightProbes!==D)&&(n.directional.length=y,n.spot.length=S,n.rectArea.length=_,n.point.length=M,n.hemi.length=x,n.directionalShadow.length=R,n.directionalShadowMap.length=R,n.pointShadow.length=P,n.pointShadowMap.length=P,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=R,n.pointShadowMatrix.length=P,n.spotLightMatrix.length=E+V-N,n.spotLightMap.length=V,n.numSpotLightShadowsWithMaps=N,n.numLightProbes=D,B.directionalLength=y,B.pointLength=M,B.spotLength=S,B.rectAreaLength=_,B.hemiLength=x,B.numDirectionalShadows=R,B.numPointShadows=P,B.numSpotShadows=E,B.numSpotMaps=V,B.numLightProbes=D,n.version=wA++)}function f(h,p){let m=0,v=0,y=0,M=0,S=0;const _=p.matrixWorldInverse;for(let x=0,R=h.length;x<R;x++){const P=h[x];if(P.isDirectionalLight){const E=n.directional[m];E.direction.setFromMatrixPosition(P.matrixWorld),s.setFromMatrixPosition(P.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(_),m++}else if(P.isSpotLight){const E=n.spot[y];E.position.setFromMatrixPosition(P.matrixWorld),E.position.applyMatrix4(_),E.direction.setFromMatrixPosition(P.matrixWorld),s.setFromMatrixPosition(P.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(_),y++}else if(P.isRectAreaLight){const E=n.rectArea[M];E.position.setFromMatrixPosition(P.matrixWorld),E.position.applyMatrix4(_),l.identity(),a.copy(P.matrixWorld),a.premultiply(_),l.extractRotation(a),E.halfWidth.set(P.width*.5,0,0),E.halfHeight.set(0,P.height*.5,0),E.halfWidth.applyMatrix4(l),E.halfHeight.applyMatrix4(l),M++}else if(P.isPointLight){const E=n.point[v];E.position.setFromMatrixPosition(P.matrixWorld),E.position.applyMatrix4(_),v++}else if(P.isHemisphereLight){const E=n.hemi[S];E.direction.setFromMatrixPosition(P.matrixWorld),E.direction.transformDirection(_),S++}}}return{setup:u,setupView:f,state:n}}function Pv(i){const e=new bA(i),t=[],n=[];function s(p){h.camera=p,t.length=0,n.length=0}function a(p){t.push(p)}function l(p){n.push(p)}function u(){e.setup(t)}function f(p){e.setupView(t,p)}const h={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:u,setupLightsView:f,pushLight:a,pushShadow:l}}function TA(i){let e=new WeakMap;function t(s,a=0){const l=e.get(s);let u;return l===void 0?(u=new Pv(i),e.set(s,[u])):a>=l.length?(u=new Pv(i),l.push(u)):u=l[a],u}function n(){e=new WeakMap}return{get:t,dispose:n}}class AA extends ta{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=lw,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class CA extends ta{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const RA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,PA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function LA(i,e,t){let n=new Ip;const s=new $e,a=new $e,l=new Jt,u=new AA({depthPacking:cw}),f=new CA,h={},p=t.maxTextureSize,m={[ns]:Yn,[Yn]:ns,[vr]:vr},v=new is({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:RA,fragmentShader:PA}),y=v.clone();y.defines.HORIZONTAL_PASS=1;const M=new wn;M.setAttribute("position",new Zi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Nt(M,v),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yy;let x=this.type;this.render=function(N,D,B){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||N.length===0)return;const L=i.getRenderTarget(),A=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),q=i.state;q.setBlending(es),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const X=x!==mr&&this.type===mr,ne=x===mr&&this.type!==mr;for(let he=0,ae=N.length;he<ae;he++){const Me=N[he],$=Me.shadow;if($===void 0){console.warn("THREE.WebGLShadowMap:",Me,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;s.copy($.mapSize);const z=$.getFrameExtents();if(s.multiply(z),a.copy($.mapSize),(s.x>p||s.y>p)&&(s.x>p&&(a.x=Math.floor(p/z.x),s.x=a.x*z.x,$.mapSize.x=a.x),s.y>p&&(a.y=Math.floor(p/z.y),s.y=a.y*z.y,$.mapSize.y=a.y)),$.map===null||X===!0||ne===!0){const F=this.type!==mr?{minFilter:Hi,magFilter:Hi}:{};$.map!==null&&$.map.dispose(),$.map=new Ds(s.x,s.y,F),$.map.texture.name=Me.name+".shadowMap",$.camera.updateProjectionMatrix()}i.setRenderTarget($.map),i.clear();const ee=$.getViewportCount();for(let F=0;F<ee;F++){const Y=$.getViewport(F);l.set(a.x*Y.x,a.y*Y.y,a.x*Y.z,a.y*Y.w),q.viewport(l),$.updateMatrices(Me,F),n=$.getFrustum(),E(D,B,$.camera,Me,this.type)}$.isPointLightShadow!==!0&&this.type===mr&&R($,B),$.needsUpdate=!1}x=this.type,_.needsUpdate=!1,i.setRenderTarget(L,A,U)};function R(N,D){const B=e.update(S);v.defines.VSM_SAMPLES!==N.blurSamples&&(v.defines.VSM_SAMPLES=N.blurSamples,y.defines.VSM_SAMPLES=N.blurSamples,v.needsUpdate=!0,y.needsUpdate=!0),N.mapPass===null&&(N.mapPass=new Ds(s.x,s.y)),v.uniforms.shadow_pass.value=N.map.texture,v.uniforms.resolution.value=N.mapSize,v.uniforms.radius.value=N.radius,i.setRenderTarget(N.mapPass),i.clear(),i.renderBufferDirect(D,null,B,v,S,null),y.uniforms.shadow_pass.value=N.mapPass.texture,y.uniforms.resolution.value=N.mapSize,y.uniforms.radius.value=N.radius,i.setRenderTarget(N.map),i.clear(),i.renderBufferDirect(D,null,B,y,S,null)}function P(N,D,B,L){let A=null;const U=B.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(U!==void 0)A=U;else if(A=B.isPointLight===!0?f:u,i.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const q=A.uuid,X=D.uuid;let ne=h[q];ne===void 0&&(ne={},h[q]=ne);let he=ne[X];he===void 0&&(he=A.clone(),ne[X]=he,D.addEventListener("dispose",V)),A=he}if(A.visible=D.visible,A.wireframe=D.wireframe,L===mr?A.side=D.shadowSide!==null?D.shadowSide:D.side:A.side=D.shadowSide!==null?D.shadowSide:m[D.side],A.alphaMap=D.alphaMap,A.alphaTest=D.alphaTest,A.map=D.map,A.clipShadows=D.clipShadows,A.clippingPlanes=D.clippingPlanes,A.clipIntersection=D.clipIntersection,A.displacementMap=D.displacementMap,A.displacementScale=D.displacementScale,A.displacementBias=D.displacementBias,A.wireframeLinewidth=D.wireframeLinewidth,A.linewidth=D.linewidth,B.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const q=i.properties.get(A);q.light=B}return A}function E(N,D,B,L,A){if(N.visible===!1)return;if(N.layers.test(D.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&A===mr)&&(!N.frustumCulled||n.intersectsObject(N))){N.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,N.matrixWorld);const X=e.update(N),ne=N.material;if(Array.isArray(ne)){const he=X.groups;for(let ae=0,Me=he.length;ae<Me;ae++){const $=he[ae],z=ne[$.materialIndex];if(z&&z.visible){const ee=P(N,z,L,A);N.onBeforeShadow(i,N,D,B,X,ee,$),i.renderBufferDirect(B,null,X,ee,N,$),N.onAfterShadow(i,N,D,B,X,ee,$)}}}else if(ne.visible){const he=P(N,ne,L,A);N.onBeforeShadow(i,N,D,B,X,he,null),i.renderBufferDirect(B,null,X,he,N,null),N.onAfterShadow(i,N,D,B,X,he,null)}}const q=N.children;for(let X=0,ne=q.length;X<ne;X++)E(q[X],D,B,L,A)}function V(N){N.target.removeEventListener("dispose",V);for(const B in h){const L=h[B],A=N.target.uuid;A in L&&(L[A].dispose(),delete L[A])}}}const IA={[hh]:ph,[mh]:yh,[gh]:_h,[Go]:vh,[ph]:hh,[yh]:mh,[_h]:gh,[vh]:Go};function DA(i,e){function t(){let Q=!1;const We=new Jt;let ve=null;const Re=new Jt(0,0,0,0);return{setMask:function(Ze){ve!==Ze&&!Q&&(i.colorMask(Ze,Ze,Ze,Ze),ve=Ze)},setLocked:function(Ze){Q=Ze},setClear:function(Ze,Ye,Mt,Xt,qt){qt===!0&&(Ze*=Xt,Ye*=Xt,Mt*=Xt),We.set(Ze,Ye,Mt,Xt),Re.equals(We)===!1&&(i.clearColor(Ze,Ye,Mt,Xt),Re.copy(We))},reset:function(){Q=!1,ve=null,Re.set(-1,0,0,0)}}}function n(){let Q=!1,We=!1,ve=null,Re=null,Ze=null;return{setReversed:function(Ye){if(We!==Ye){const Mt=e.get("EXT_clip_control");We?Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.ZERO_TO_ONE_EXT):Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.NEGATIVE_ONE_TO_ONE_EXT);const Xt=Ze;Ze=null,this.setClear(Xt)}We=Ye},getReversed:function(){return We},setTest:function(Ye){Ye?xe(i.DEPTH_TEST):Ie(i.DEPTH_TEST)},setMask:function(Ye){ve!==Ye&&!Q&&(i.depthMask(Ye),ve=Ye)},setFunc:function(Ye){if(We&&(Ye=IA[Ye]),Re!==Ye){switch(Ye){case hh:i.depthFunc(i.NEVER);break;case ph:i.depthFunc(i.ALWAYS);break;case mh:i.depthFunc(i.LESS);break;case Go:i.depthFunc(i.LEQUAL);break;case gh:i.depthFunc(i.EQUAL);break;case vh:i.depthFunc(i.GEQUAL);break;case yh:i.depthFunc(i.GREATER);break;case _h:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Re=Ye}},setLocked:function(Ye){Q=Ye},setClear:function(Ye){Ze!==Ye&&(We&&(Ye=1-Ye),i.clearDepth(Ye),Ze=Ye)},reset:function(){Q=!1,ve=null,Re=null,Ze=null,We=!1}}}function s(){let Q=!1,We=null,ve=null,Re=null,Ze=null,Ye=null,Mt=null,Xt=null,qt=null;return{setTest:function(Ot){Q||(Ot?xe(i.STENCIL_TEST):Ie(i.STENCIL_TEST))},setMask:function(Ot){We!==Ot&&!Q&&(i.stencilMask(Ot),We=Ot)},setFunc:function(Ot,gn,b){(ve!==Ot||Re!==gn||Ze!==b)&&(i.stencilFunc(Ot,gn,b),ve=Ot,Re=gn,Ze=b)},setOp:function(Ot,gn,b){(Ye!==Ot||Mt!==gn||Xt!==b)&&(i.stencilOp(Ot,gn,b),Ye=Ot,Mt=gn,Xt=b)},setLocked:function(Ot){Q=Ot},setClear:function(Ot){qt!==Ot&&(i.clearStencil(Ot),qt=Ot)},reset:function(){Q=!1,We=null,ve=null,Re=null,Ze=null,Ye=null,Mt=null,Xt=null,qt=null}}}const a=new t,l=new n,u=new s,f=new WeakMap,h=new WeakMap;let p={},m={},v=new WeakMap,y=[],M=null,S=!1,_=null,x=null,R=null,P=null,E=null,V=null,N=null,D=new Bt(0,0,0),B=0,L=!1,A=null,U=null,q=null,X=null,ne=null;const he=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ae=!1,Me=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(Me=parseFloat(/^WebGL (\d)/.exec($)[1]),ae=Me>=1):$.indexOf("OpenGL ES")!==-1&&(Me=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),ae=Me>=2);let z=null,ee={};const F=i.getParameter(i.SCISSOR_BOX),Y=i.getParameter(i.VIEWPORT),Ce=new Jt().fromArray(F),K=new Jt().fromArray(Y);function ce(Q,We,ve,Re){const Ze=new Uint8Array(4),Ye=i.createTexture();i.bindTexture(Q,Ye),i.texParameteri(Q,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(Q,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Mt=0;Mt<ve;Mt++)Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?i.texImage3D(We,0,i.RGBA,1,1,Re,0,i.RGBA,i.UNSIGNED_BYTE,Ze):i.texImage2D(We+Mt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ze);return Ye}const we={};we[i.TEXTURE_2D]=ce(i.TEXTURE_2D,i.TEXTURE_2D,1),we[i.TEXTURE_CUBE_MAP]=ce(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),we[i.TEXTURE_2D_ARRAY]=ce(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),we[i.TEXTURE_3D]=ce(i.TEXTURE_3D,i.TEXTURE_3D,1,1),a.setClear(0,0,0,1),l.setClear(1),u.setClear(0),xe(i.DEPTH_TEST),l.setFunc(Go),Ee(!1),Ue(Ng),xe(i.CULL_FACE),W(es);function xe(Q){p[Q]!==!0&&(i.enable(Q),p[Q]=!0)}function Ie(Q){p[Q]!==!1&&(i.disable(Q),p[Q]=!1)}function Oe(Q,We){return m[Q]!==We?(i.bindFramebuffer(Q,We),m[Q]=We,Q===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=We),Q===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=We),!0):!1}function Ge(Q,We){let ve=y,Re=!1;if(Q){ve=v.get(We),ve===void 0&&(ve=[],v.set(We,ve));const Ze=Q.textures;if(ve.length!==Ze.length||ve[0]!==i.COLOR_ATTACHMENT0){for(let Ye=0,Mt=Ze.length;Ye<Mt;Ye++)ve[Ye]=i.COLOR_ATTACHMENT0+Ye;ve.length=Ze.length,Re=!0}}else ve[0]!==i.BACK&&(ve[0]=i.BACK,Re=!0);Re&&i.drawBuffers(ve)}function Ke(Q){return M!==Q?(i.useProgram(Q),M=Q,!0):!1}const ye={[Es]:i.FUNC_ADD,[UM]:i.FUNC_SUBTRACT,[OM]:i.FUNC_REVERSE_SUBTRACT};ye[FM]=i.MIN,ye[zM]=i.MAX;const Le={[BM]:i.ZERO,[HM]:i.ONE,[VM]:i.SRC_COLOR,[fh]:i.SRC_ALPHA,[qM]:i.SRC_ALPHA_SATURATE,[$M]:i.DST_COLOR,[WM]:i.DST_ALPHA,[GM]:i.ONE_MINUS_SRC_COLOR,[dh]:i.ONE_MINUS_SRC_ALPHA,[XM]:i.ONE_MINUS_DST_COLOR,[jM]:i.ONE_MINUS_DST_ALPHA,[KM]:i.CONSTANT_COLOR,[YM]:i.ONE_MINUS_CONSTANT_COLOR,[ZM]:i.CONSTANT_ALPHA,[JM]:i.ONE_MINUS_CONSTANT_ALPHA};function W(Q,We,ve,Re,Ze,Ye,Mt,Xt,qt,Ot){if(Q===es){S===!0&&(Ie(i.BLEND),S=!1);return}if(S===!1&&(xe(i.BLEND),S=!0),Q!==kM){if(Q!==_||Ot!==L){if((x!==Es||E!==Es)&&(i.blendEquation(i.FUNC_ADD),x=Es,E=Es),Ot)switch(Q){case Oo:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kg:i.blendFunc(i.ONE,i.ONE);break;case Ug:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Og:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Q);break}else switch(Q){case Oo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kg:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ug:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Og:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Q);break}R=null,P=null,V=null,N=null,D.set(0,0,0),B=0,_=Q,L=Ot}return}Ze=Ze||We,Ye=Ye||ve,Mt=Mt||Re,(We!==x||Ze!==E)&&(i.blendEquationSeparate(ye[We],ye[Ze]),x=We,E=Ze),(ve!==R||Re!==P||Ye!==V||Mt!==N)&&(i.blendFuncSeparate(Le[ve],Le[Re],Le[Ye],Le[Mt]),R=ve,P=Re,V=Ye,N=Mt),(Xt.equals(D)===!1||qt!==B)&&(i.blendColor(Xt.r,Xt.g,Xt.b,qt),D.copy(Xt),B=qt),_=Q,L=!1}function le(Q,We){Q.side===vr?Ie(i.CULL_FACE):xe(i.CULL_FACE);let ve=Q.side===Yn;We&&(ve=!ve),Ee(ve),Q.blending===Oo&&Q.transparent===!1?W(es):W(Q.blending,Q.blendEquation,Q.blendSrc,Q.blendDst,Q.blendEquationAlpha,Q.blendSrcAlpha,Q.blendDstAlpha,Q.blendColor,Q.blendAlpha,Q.premultipliedAlpha),l.setFunc(Q.depthFunc),l.setTest(Q.depthTest),l.setMask(Q.depthWrite),a.setMask(Q.colorWrite);const Re=Q.stencilWrite;u.setTest(Re),Re&&(u.setMask(Q.stencilWriteMask),u.setFunc(Q.stencilFunc,Q.stencilRef,Q.stencilFuncMask),u.setOp(Q.stencilFail,Q.stencilZFail,Q.stencilZPass)),Je(Q.polygonOffset,Q.polygonOffsetFactor,Q.polygonOffsetUnits),Q.alphaToCoverage===!0?xe(i.SAMPLE_ALPHA_TO_COVERAGE):Ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ee(Q){A!==Q&&(Q?i.frontFace(i.CW):i.frontFace(i.CCW),A=Q)}function Ue(Q){Q!==IM?(xe(i.CULL_FACE),Q!==U&&(Q===Ng?i.cullFace(i.BACK):Q===DM?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ie(i.CULL_FACE),U=Q}function Pe(Q){Q!==q&&(ae&&i.lineWidth(Q),q=Q)}function Je(Q,We,ve){Q?(xe(i.POLYGON_OFFSET_FILL),(X!==We||ne!==ve)&&(i.polygonOffset(We,ve),X=We,ne=ve)):Ie(i.POLYGON_OFFSET_FILL)}function ze(Q){Q?xe(i.SCISSOR_TEST):Ie(i.SCISSOR_TEST)}function H(Q){Q===void 0&&(Q=i.TEXTURE0+he-1),z!==Q&&(i.activeTexture(Q),z=Q)}function T(Q,We,ve){ve===void 0&&(z===null?ve=i.TEXTURE0+he-1:ve=z);let Re=ee[ve];Re===void 0&&(Re={type:void 0,texture:void 0},ee[ve]=Re),(Re.type!==Q||Re.texture!==We)&&(z!==ve&&(i.activeTexture(ve),z=ve),i.bindTexture(Q,We||we[Q]),Re.type=Q,Re.texture=We)}function G(){const Q=ee[z];Q!==void 0&&Q.type!==void 0&&(i.bindTexture(Q.type,null),Q.type=void 0,Q.texture=void 0)}function be(){try{i.compressedTexImage2D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function _e(){try{i.compressedTexImage3D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Ae(){try{i.texSubImage2D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Qe(){try{i.texSubImage3D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function je(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function et(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Tt(){try{i.texStorage2D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function De(){try{i.texStorage3D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function it(){try{i.texImage2D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function pt(){try{i.texImage3D.apply(i,arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function _t(Q){Ce.equals(Q)===!1&&(i.scissor(Q.x,Q.y,Q.z,Q.w),Ce.copy(Q))}function tt(Q){K.equals(Q)===!1&&(i.viewport(Q.x,Q.y,Q.z,Q.w),K.copy(Q))}function Rt(Q,We){let ve=h.get(We);ve===void 0&&(ve=new WeakMap,h.set(We,ve));let Re=ve.get(Q);Re===void 0&&(Re=i.getUniformBlockIndex(We,Q.name),ve.set(Q,Re))}function Te(Q,We){const Re=h.get(We).get(Q);f.get(We)!==Re&&(i.uniformBlockBinding(We,Re,Q.__bindingPointIndex),f.set(We,Re))}function dt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),l.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),p={},z=null,ee={},m={},v=new WeakMap,y=[],M=null,S=!1,_=null,x=null,R=null,P=null,E=null,V=null,N=null,D=new Bt(0,0,0),B=0,L=!1,A=null,U=null,q=null,X=null,ne=null,Ce.set(0,0,i.canvas.width,i.canvas.height),K.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),u.reset()}return{buffers:{color:a,depth:l,stencil:u},enable:xe,disable:Ie,bindFramebuffer:Oe,drawBuffers:Ge,useProgram:Ke,setBlending:W,setMaterial:le,setFlipSided:Ee,setCullFace:Ue,setLineWidth:Pe,setPolygonOffset:Je,setScissorTest:ze,activeTexture:H,bindTexture:T,unbindTexture:G,compressedTexImage2D:be,compressedTexImage3D:_e,texImage2D:it,texImage3D:pt,updateUBOMapping:Rt,uniformBlockBinding:Te,texStorage2D:Tt,texStorage3D:De,texSubImage2D:Ae,texSubImage3D:Qe,compressedTexSubImage2D:je,compressedTexSubImage3D:et,scissor:_t,viewport:tt,reset:dt}}function Lv(i,e,t,n){const s=NA(n);switch(t){case i_:return i*e;case s_:return i*e;case o_:return i*e*2;case a_:return i*e/s.components*s.byteLength;case Ap:return i*e/s.components*s.byteLength;case l_:return i*e*2/s.components*s.byteLength;case Cp:return i*e*2/s.components*s.byteLength;case r_:return i*e*3/s.components*s.byteLength;case Bi:return i*e*4/s.components*s.byteLength;case Rp:return i*e*4/s.components*s.byteLength;case eu:case tu:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case nu:case iu:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Eh:case Th:return Math.max(i,16)*Math.max(e,8)/4;case wh:case bh:return Math.max(i,8)*Math.max(e,8)/2;case Ah:case Ch:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Rh:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ph:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lh:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ih:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Dh:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Nh:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case kh:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Uh:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Oh:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Fh:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case zh:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Bh:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Hh:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Vh:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Gh:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ru:case Wh:case jh:return Math.ceil(i/4)*Math.ceil(e/4)*16;case c_:case $h:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Xh:case qh:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function NA(i){switch(i){case Er:case e_:return{byteLength:1,components:1};case il:case t_:case dl:return{byteLength:2,components:1};case bp:case Tp:return{byteLength:2,components:4};case Is:case Ep:case _r:return{byteLength:4,components:1};case n_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function kA(i,e,t,n,s,a,l){const u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new $e,p=new WeakMap;let m;const v=new WeakMap;let y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(H,T){return y?new OffscreenCanvas(H,T):fu("canvas")}function S(H,T,G){let be=1;const _e=ze(H);if((_e.width>G||_e.height>G)&&(be=G/Math.max(_e.width,_e.height)),be<1)if(typeof HTMLImageElement<"u"&&H instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&H instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&H instanceof ImageBitmap||typeof VideoFrame<"u"&&H instanceof VideoFrame){const Ae=Math.floor(be*_e.width),Qe=Math.floor(be*_e.height);m===void 0&&(m=M(Ae,Qe));const je=T?M(Ae,Qe):m;return je.width=Ae,je.height=Qe,je.getContext("2d").drawImage(H,0,0,Ae,Qe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+_e.width+"x"+_e.height+") to ("+Ae+"x"+Qe+")."),je}else return"data"in H&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+_e.width+"x"+_e.height+")."),H;return H}function _(H){return H.generateMipmaps}function x(H){i.generateMipmap(H)}function R(H){return H.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:H.isWebGL3DRenderTarget?i.TEXTURE_3D:H.isWebGLArrayRenderTarget||H.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function P(H,T,G,be,_e=!1){if(H!==null){if(i[H]!==void 0)return i[H];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+H+"'")}let Ae=T;if(T===i.RED&&(G===i.FLOAT&&(Ae=i.R32F),G===i.HALF_FLOAT&&(Ae=i.R16F),G===i.UNSIGNED_BYTE&&(Ae=i.R8)),T===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(Ae=i.R8UI),G===i.UNSIGNED_SHORT&&(Ae=i.R16UI),G===i.UNSIGNED_INT&&(Ae=i.R32UI),G===i.BYTE&&(Ae=i.R8I),G===i.SHORT&&(Ae=i.R16I),G===i.INT&&(Ae=i.R32I)),T===i.RG&&(G===i.FLOAT&&(Ae=i.RG32F),G===i.HALF_FLOAT&&(Ae=i.RG16F),G===i.UNSIGNED_BYTE&&(Ae=i.RG8)),T===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(Ae=i.RG8UI),G===i.UNSIGNED_SHORT&&(Ae=i.RG16UI),G===i.UNSIGNED_INT&&(Ae=i.RG32UI),G===i.BYTE&&(Ae=i.RG8I),G===i.SHORT&&(Ae=i.RG16I),G===i.INT&&(Ae=i.RG32I)),T===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(Ae=i.RGB8UI),G===i.UNSIGNED_SHORT&&(Ae=i.RGB16UI),G===i.UNSIGNED_INT&&(Ae=i.RGB32UI),G===i.BYTE&&(Ae=i.RGB8I),G===i.SHORT&&(Ae=i.RGB16I),G===i.INT&&(Ae=i.RGB32I)),T===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(Ae=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(Ae=i.RGBA16UI),G===i.UNSIGNED_INT&&(Ae=i.RGBA32UI),G===i.BYTE&&(Ae=i.RGBA8I),G===i.SHORT&&(Ae=i.RGBA16I),G===i.INT&&(Ae=i.RGBA32I)),T===i.RGB&&G===i.UNSIGNED_INT_5_9_9_9_REV&&(Ae=i.RGB9_E5),T===i.RGBA){const Qe=_e?bu:Gt.getTransfer(be);G===i.FLOAT&&(Ae=i.RGBA32F),G===i.HALF_FLOAT&&(Ae=i.RGBA16F),G===i.UNSIGNED_BYTE&&(Ae=Qe===Yt?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(Ae=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(Ae=i.RGB5_A1)}return(Ae===i.R16F||Ae===i.R32F||Ae===i.RG16F||Ae===i.RG32F||Ae===i.RGBA16F||Ae===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Ae}function E(H,T){let G;return H?T===null||T===Is||T===$o?G=i.DEPTH24_STENCIL8:T===_r?G=i.DEPTH32F_STENCIL8:T===il&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Is||T===$o?G=i.DEPTH_COMPONENT24:T===_r?G=i.DEPTH_COMPONENT32F:T===il&&(G=i.DEPTH_COMPONENT16),G}function V(H,T){return _(H)===!0||H.isFramebufferTexture&&H.minFilter!==Hi&&H.minFilter!==Yi?Math.log2(Math.max(T.width,T.height))+1:H.mipmaps!==void 0&&H.mipmaps.length>0?H.mipmaps.length:H.isCompressedTexture&&Array.isArray(H.image)?T.mipmaps.length:1}function N(H){const T=H.target;T.removeEventListener("dispose",N),B(T),T.isVideoTexture&&p.delete(T)}function D(H){const T=H.target;T.removeEventListener("dispose",D),A(T)}function B(H){const T=n.get(H);if(T.__webglInit===void 0)return;const G=H.source,be=v.get(G);if(be){const _e=be[T.__cacheKey];_e.usedTimes--,_e.usedTimes===0&&L(H),Object.keys(be).length===0&&v.delete(G)}n.remove(H)}function L(H){const T=n.get(H);i.deleteTexture(T.__webglTexture);const G=H.source,be=v.get(G);delete be[T.__cacheKey],l.memory.textures--}function A(H){const T=n.get(H);if(H.depthTexture&&(H.depthTexture.dispose(),n.remove(H.depthTexture)),H.isWebGLCubeRenderTarget)for(let be=0;be<6;be++){if(Array.isArray(T.__webglFramebuffer[be]))for(let _e=0;_e<T.__webglFramebuffer[be].length;_e++)i.deleteFramebuffer(T.__webglFramebuffer[be][_e]);else i.deleteFramebuffer(T.__webglFramebuffer[be]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[be])}else{if(Array.isArray(T.__webglFramebuffer))for(let be=0;be<T.__webglFramebuffer.length;be++)i.deleteFramebuffer(T.__webglFramebuffer[be]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let be=0;be<T.__webglColorRenderbuffer.length;be++)T.__webglColorRenderbuffer[be]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[be]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const G=H.textures;for(let be=0,_e=G.length;be<_e;be++){const Ae=n.get(G[be]);Ae.__webglTexture&&(i.deleteTexture(Ae.__webglTexture),l.memory.textures--),n.remove(G[be])}n.remove(H)}let U=0;function q(){U=0}function X(){const H=U;return H>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+H+" texture units while this GPU supports only "+s.maxTextures),U+=1,H}function ne(H){const T=[];return T.push(H.wrapS),T.push(H.wrapT),T.push(H.wrapR||0),T.push(H.magFilter),T.push(H.minFilter),T.push(H.anisotropy),T.push(H.internalFormat),T.push(H.format),T.push(H.type),T.push(H.generateMipmaps),T.push(H.premultiplyAlpha),T.push(H.flipY),T.push(H.unpackAlignment),T.push(H.colorSpace),T.join()}function he(H,T){const G=n.get(H);if(H.isVideoTexture&&Pe(H),H.isRenderTargetTexture===!1&&H.version>0&&G.__version!==H.version){const be=H.image;if(be===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(be.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(G,H,T);return}}t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+T)}function ae(H,T){const G=n.get(H);if(H.version>0&&G.__version!==H.version){K(G,H,T);return}t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+T)}function Me(H,T){const G=n.get(H);if(H.version>0&&G.__version!==H.version){K(G,H,T);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+T)}function $(H,T){const G=n.get(H);if(H.version>0&&G.__version!==H.version){ce(G,H,T);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+T)}const z={[cu]:i.REPEAT,[Cs]:i.CLAMP_TO_EDGE,[Mh]:i.MIRRORED_REPEAT},ee={[Hi]:i.NEAREST,[aw]:i.NEAREST_MIPMAP_NEAREST,[Sc]:i.NEAREST_MIPMAP_LINEAR,[Yi]:i.LINEAR,[wd]:i.LINEAR_MIPMAP_NEAREST,[Rs]:i.LINEAR_MIPMAP_LINEAR},F={[fw]:i.NEVER,[vw]:i.ALWAYS,[dw]:i.LESS,[f_]:i.LEQUAL,[hw]:i.EQUAL,[gw]:i.GEQUAL,[pw]:i.GREATER,[mw]:i.NOTEQUAL};function Y(H,T){if(T.type===_r&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Yi||T.magFilter===wd||T.magFilter===Sc||T.magFilter===Rs||T.minFilter===Yi||T.minFilter===wd||T.minFilter===Sc||T.minFilter===Rs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(H,i.TEXTURE_WRAP_S,z[T.wrapS]),i.texParameteri(H,i.TEXTURE_WRAP_T,z[T.wrapT]),(H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY)&&i.texParameteri(H,i.TEXTURE_WRAP_R,z[T.wrapR]),i.texParameteri(H,i.TEXTURE_MAG_FILTER,ee[T.magFilter]),i.texParameteri(H,i.TEXTURE_MIN_FILTER,ee[T.minFilter]),T.compareFunction&&(i.texParameteri(H,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(H,i.TEXTURE_COMPARE_FUNC,F[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Hi||T.minFilter!==Sc&&T.minFilter!==Rs||T.type===_r&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(H,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Ce(H,T){let G=!1;H.__webglInit===void 0&&(H.__webglInit=!0,T.addEventListener("dispose",N));const be=T.source;let _e=v.get(be);_e===void 0&&(_e={},v.set(be,_e));const Ae=ne(T);if(Ae!==H.__cacheKey){_e[Ae]===void 0&&(_e[Ae]={texture:i.createTexture(),usedTimes:0},l.memory.textures++,G=!0),_e[Ae].usedTimes++;const Qe=_e[H.__cacheKey];Qe!==void 0&&(_e[H.__cacheKey].usedTimes--,Qe.usedTimes===0&&L(T)),H.__cacheKey=Ae,H.__webglTexture=_e[Ae].texture}return G}function K(H,T,G){let be=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(be=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(be=i.TEXTURE_3D);const _e=Ce(H,T),Ae=T.source;t.bindTexture(be,H.__webglTexture,i.TEXTURE0+G);const Qe=n.get(Ae);if(Ae.version!==Qe.__version||_e===!0){t.activeTexture(i.TEXTURE0+G);const je=Gt.getPrimaries(Gt.workingColorSpace),et=T.colorSpace===Jr?null:Gt.getPrimaries(T.colorSpace),Tt=T.colorSpace===Jr||je===et?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let De=S(T.image,!1,s.maxTextureSize);De=Je(T,De);const it=a.convert(T.format,T.colorSpace),pt=a.convert(T.type);let _t=P(T.internalFormat,it,pt,T.colorSpace,T.isVideoTexture);Y(be,T);let tt;const Rt=T.mipmaps,Te=T.isVideoTexture!==!0,dt=Qe.__version===void 0||_e===!0,Q=Ae.dataReady,We=V(T,De);if(T.isDepthTexture)_t=E(T.format===Xo,T.type),dt&&(Te?t.texStorage2D(i.TEXTURE_2D,1,_t,De.width,De.height):t.texImage2D(i.TEXTURE_2D,0,_t,De.width,De.height,0,it,pt,null));else if(T.isDataTexture)if(Rt.length>0){Te&&dt&&t.texStorage2D(i.TEXTURE_2D,We,_t,Rt[0].width,Rt[0].height);for(let ve=0,Re=Rt.length;ve<Re;ve++)tt=Rt[ve],Te?Q&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,tt.width,tt.height,it,pt,tt.data):t.texImage2D(i.TEXTURE_2D,ve,_t,tt.width,tt.height,0,it,pt,tt.data);T.generateMipmaps=!1}else Te?(dt&&t.texStorage2D(i.TEXTURE_2D,We,_t,De.width,De.height),Q&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,De.width,De.height,it,pt,De.data)):t.texImage2D(i.TEXTURE_2D,0,_t,De.width,De.height,0,it,pt,De.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Te&&dt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,We,_t,Rt[0].width,Rt[0].height,De.depth);for(let ve=0,Re=Rt.length;ve<Re;ve++)if(tt=Rt[ve],T.format!==Bi)if(it!==null)if(Te){if(Q)if(T.layerUpdates.size>0){const Ze=Lv(tt.width,tt.height,T.format,T.type);for(const Ye of T.layerUpdates){const Mt=tt.data.subarray(Ye*Ze/tt.data.BYTES_PER_ELEMENT,(Ye+1)*Ze/tt.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,Ye,tt.width,tt.height,1,it,Mt)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,0,tt.width,tt.height,De.depth,it,tt.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ve,_t,tt.width,tt.height,De.depth,0,tt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Te?Q&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ve,0,0,0,tt.width,tt.height,De.depth,it,pt,tt.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ve,_t,tt.width,tt.height,De.depth,0,it,pt,tt.data)}else{Te&&dt&&t.texStorage2D(i.TEXTURE_2D,We,_t,Rt[0].width,Rt[0].height);for(let ve=0,Re=Rt.length;ve<Re;ve++)tt=Rt[ve],T.format!==Bi?it!==null?Te?Q&&t.compressedTexSubImage2D(i.TEXTURE_2D,ve,0,0,tt.width,tt.height,it,tt.data):t.compressedTexImage2D(i.TEXTURE_2D,ve,_t,tt.width,tt.height,0,tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Te?Q&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,tt.width,tt.height,it,pt,tt.data):t.texImage2D(i.TEXTURE_2D,ve,_t,tt.width,tt.height,0,it,pt,tt.data)}else if(T.isDataArrayTexture)if(Te){if(dt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,We,_t,De.width,De.height,De.depth),Q)if(T.layerUpdates.size>0){const ve=Lv(De.width,De.height,T.format,T.type);for(const Re of T.layerUpdates){const Ze=De.data.subarray(Re*ve/De.data.BYTES_PER_ELEMENT,(Re+1)*ve/De.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Re,De.width,De.height,1,it,pt,Ze)}T.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,De.width,De.height,De.depth,it,pt,De.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,_t,De.width,De.height,De.depth,0,it,pt,De.data);else if(T.isData3DTexture)Te?(dt&&t.texStorage3D(i.TEXTURE_3D,We,_t,De.width,De.height,De.depth),Q&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,De.width,De.height,De.depth,it,pt,De.data)):t.texImage3D(i.TEXTURE_3D,0,_t,De.width,De.height,De.depth,0,it,pt,De.data);else if(T.isFramebufferTexture){if(dt)if(Te)t.texStorage2D(i.TEXTURE_2D,We,_t,De.width,De.height);else{let ve=De.width,Re=De.height;for(let Ze=0;Ze<We;Ze++)t.texImage2D(i.TEXTURE_2D,Ze,_t,ve,Re,0,it,pt,null),ve>>=1,Re>>=1}}else if(Rt.length>0){if(Te&&dt){const ve=ze(Rt[0]);t.texStorage2D(i.TEXTURE_2D,We,_t,ve.width,ve.height)}for(let ve=0,Re=Rt.length;ve<Re;ve++)tt=Rt[ve],Te?Q&&t.texSubImage2D(i.TEXTURE_2D,ve,0,0,it,pt,tt):t.texImage2D(i.TEXTURE_2D,ve,_t,it,pt,tt);T.generateMipmaps=!1}else if(Te){if(dt){const ve=ze(De);t.texStorage2D(i.TEXTURE_2D,We,_t,ve.width,ve.height)}Q&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,it,pt,De)}else t.texImage2D(i.TEXTURE_2D,0,_t,it,pt,De);_(T)&&x(be),Qe.__version=Ae.version,T.onUpdate&&T.onUpdate(T)}H.__version=T.version}function ce(H,T,G){if(T.image.length!==6)return;const be=Ce(H,T),_e=T.source;t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+G);const Ae=n.get(_e);if(_e.version!==Ae.__version||be===!0){t.activeTexture(i.TEXTURE0+G);const Qe=Gt.getPrimaries(Gt.workingColorSpace),je=T.colorSpace===Jr?null:Gt.getPrimaries(T.colorSpace),et=T.colorSpace===Jr||Qe===je?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);const Tt=T.isCompressedTexture||T.image[0].isCompressedTexture,De=T.image[0]&&T.image[0].isDataTexture,it=[];for(let Re=0;Re<6;Re++)!Tt&&!De?it[Re]=S(T.image[Re],!0,s.maxCubemapSize):it[Re]=De?T.image[Re].image:T.image[Re],it[Re]=Je(T,it[Re]);const pt=it[0],_t=a.convert(T.format,T.colorSpace),tt=a.convert(T.type),Rt=P(T.internalFormat,_t,tt,T.colorSpace),Te=T.isVideoTexture!==!0,dt=Ae.__version===void 0||be===!0,Q=_e.dataReady;let We=V(T,pt);Y(i.TEXTURE_CUBE_MAP,T);let ve;if(Tt){Te&&dt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,We,Rt,pt.width,pt.height);for(let Re=0;Re<6;Re++){ve=it[Re].mipmaps;for(let Ze=0;Ze<ve.length;Ze++){const Ye=ve[Ze];T.format!==Bi?_t!==null?Te?Q&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ze,0,0,Ye.width,Ye.height,_t,Ye.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ze,Rt,Ye.width,Ye.height,0,Ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Te?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ze,0,0,Ye.width,Ye.height,_t,tt,Ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ze,Rt,Ye.width,Ye.height,0,_t,tt,Ye.data)}}}else{if(ve=T.mipmaps,Te&&dt){ve.length>0&&We++;const Re=ze(it[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,We,Rt,Re.width,Re.height)}for(let Re=0;Re<6;Re++)if(De){Te?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,it[Re].width,it[Re].height,_t,tt,it[Re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,Rt,it[Re].width,it[Re].height,0,_t,tt,it[Re].data);for(let Ze=0;Ze<ve.length;Ze++){const Mt=ve[Ze].image[Re].image;Te?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ze+1,0,0,Mt.width,Mt.height,_t,tt,Mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ze+1,Rt,Mt.width,Mt.height,0,_t,tt,Mt.data)}}else{Te?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,_t,tt,it[Re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,Rt,_t,tt,it[Re]);for(let Ze=0;Ze<ve.length;Ze++){const Ye=ve[Ze];Te?Q&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ze+1,0,0,_t,tt,Ye.image[Re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,Ze+1,Rt,_t,tt,Ye.image[Re])}}}_(T)&&x(i.TEXTURE_CUBE_MAP),Ae.__version=_e.version,T.onUpdate&&T.onUpdate(T)}H.__version=T.version}function we(H,T,G,be,_e,Ae){const Qe=a.convert(G.format,G.colorSpace),je=a.convert(G.type),et=P(G.internalFormat,Qe,je,G.colorSpace),Tt=n.get(T),De=n.get(G);if(De.__renderTarget=T,!Tt.__hasExternalTextures){const it=Math.max(1,T.width>>Ae),pt=Math.max(1,T.height>>Ae);_e===i.TEXTURE_3D||_e===i.TEXTURE_2D_ARRAY?t.texImage3D(_e,Ae,et,it,pt,T.depth,0,Qe,je,null):t.texImage2D(_e,Ae,et,it,pt,0,Qe,je,null)}t.bindFramebuffer(i.FRAMEBUFFER,H),Ue(T)?u.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,be,_e,De.__webglTexture,0,Ee(T)):(_e===i.TEXTURE_2D||_e>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&_e<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,be,_e,De.__webglTexture,Ae),t.bindFramebuffer(i.FRAMEBUFFER,null)}function xe(H,T,G){if(i.bindRenderbuffer(i.RENDERBUFFER,H),T.depthBuffer){const be=T.depthTexture,_e=be&&be.isDepthTexture?be.type:null,Ae=E(T.stencilBuffer,_e),Qe=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,je=Ee(T);Ue(T)?u.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,je,Ae,T.width,T.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,je,Ae,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,Ae,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Qe,i.RENDERBUFFER,H)}else{const be=T.textures;for(let _e=0;_e<be.length;_e++){const Ae=be[_e],Qe=a.convert(Ae.format,Ae.colorSpace),je=a.convert(Ae.type),et=P(Ae.internalFormat,Qe,je,Ae.colorSpace),Tt=Ee(T);G&&Ue(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Tt,et,T.width,T.height):Ue(T)?u.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Tt,et,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,et,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ie(H,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,H),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const be=n.get(T.depthTexture);be.__renderTarget=T,(!be.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),he(T.depthTexture,0);const _e=be.__webglTexture,Ae=Ee(T);if(T.depthTexture.format===Fo)Ue(T)?u.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,_e,0,Ae):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,_e,0);else if(T.depthTexture.format===Xo)Ue(T)?u.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,_e,0,Ae):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,_e,0);else throw new Error("Unknown depthTexture format")}function Oe(H){const T=n.get(H),G=H.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==H.depthTexture){const be=H.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),be){const _e=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,be.removeEventListener("dispose",_e)};be.addEventListener("dispose",_e),T.__depthDisposeCallback=_e}T.__boundDepthTexture=be}if(H.depthTexture&&!T.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Ie(T.__webglFramebuffer,H)}else if(G){T.__webglDepthbuffer=[];for(let be=0;be<6;be++)if(t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[be]),T.__webglDepthbuffer[be]===void 0)T.__webglDepthbuffer[be]=i.createRenderbuffer(),xe(T.__webglDepthbuffer[be],H,!1);else{const _e=H.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=T.__webglDepthbuffer[be];i.bindRenderbuffer(i.RENDERBUFFER,Ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,_e,i.RENDERBUFFER,Ae)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),xe(T.__webglDepthbuffer,H,!1);else{const be=H.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,_e),i.framebufferRenderbuffer(i.FRAMEBUFFER,be,i.RENDERBUFFER,_e)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(H,T,G){const be=n.get(H);T!==void 0&&we(be.__webglFramebuffer,H,H.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Oe(H)}function Ke(H){const T=H.texture,G=n.get(H),be=n.get(T);H.addEventListener("dispose",D);const _e=H.textures,Ae=H.isWebGLCubeRenderTarget===!0,Qe=_e.length>1;if(Qe||(be.__webglTexture===void 0&&(be.__webglTexture=i.createTexture()),be.__version=T.version,l.memory.textures++),Ae){G.__webglFramebuffer=[];for(let je=0;je<6;je++)if(T.mipmaps&&T.mipmaps.length>0){G.__webglFramebuffer[je]=[];for(let et=0;et<T.mipmaps.length;et++)G.__webglFramebuffer[je][et]=i.createFramebuffer()}else G.__webglFramebuffer[je]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){G.__webglFramebuffer=[];for(let je=0;je<T.mipmaps.length;je++)G.__webglFramebuffer[je]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(Qe)for(let je=0,et=_e.length;je<et;je++){const Tt=n.get(_e[je]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=i.createTexture(),l.memory.textures++)}if(H.samples>0&&Ue(H)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let je=0;je<_e.length;je++){const et=_e[je];G.__webglColorRenderbuffer[je]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[je]);const Tt=a.convert(et.format,et.colorSpace),De=a.convert(et.type),it=P(et.internalFormat,Tt,De,et.colorSpace,H.isXRRenderTarget===!0),pt=Ee(H);i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,it,H.width,H.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+je,i.RENDERBUFFER,G.__webglColorRenderbuffer[je])}i.bindRenderbuffer(i.RENDERBUFFER,null),H.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),xe(G.__webglDepthRenderbuffer,H,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Ae){t.bindTexture(i.TEXTURE_CUBE_MAP,be.__webglTexture),Y(i.TEXTURE_CUBE_MAP,T);for(let je=0;je<6;je++)if(T.mipmaps&&T.mipmaps.length>0)for(let et=0;et<T.mipmaps.length;et++)we(G.__webglFramebuffer[je][et],H,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+je,et);else we(G.__webglFramebuffer[je],H,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+je,0);_(T)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Qe){for(let je=0,et=_e.length;je<et;je++){const Tt=_e[je],De=n.get(Tt);t.bindTexture(i.TEXTURE_2D,De.__webglTexture),Y(i.TEXTURE_2D,Tt),we(G.__webglFramebuffer,H,Tt,i.COLOR_ATTACHMENT0+je,i.TEXTURE_2D,0),_(Tt)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let je=i.TEXTURE_2D;if((H.isWebGL3DRenderTarget||H.isWebGLArrayRenderTarget)&&(je=H.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(je,be.__webglTexture),Y(je,T),T.mipmaps&&T.mipmaps.length>0)for(let et=0;et<T.mipmaps.length;et++)we(G.__webglFramebuffer[et],H,T,i.COLOR_ATTACHMENT0,je,et);else we(G.__webglFramebuffer,H,T,i.COLOR_ATTACHMENT0,je,0);_(T)&&x(je),t.unbindTexture()}H.depthBuffer&&Oe(H)}function ye(H){const T=H.textures;for(let G=0,be=T.length;G<be;G++){const _e=T[G];if(_(_e)){const Ae=R(H),Qe=n.get(_e).__webglTexture;t.bindTexture(Ae,Qe),x(Ae),t.unbindTexture()}}}const Le=[],W=[];function le(H){if(H.samples>0){if(Ue(H)===!1){const T=H.textures,G=H.width,be=H.height;let _e=i.COLOR_BUFFER_BIT;const Ae=H.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Qe=n.get(H),je=T.length>1;if(je)for(let et=0;et<T.length;et++)t.bindFramebuffer(i.FRAMEBUFFER,Qe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Qe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Qe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Qe.__webglFramebuffer);for(let et=0;et<T.length;et++){if(H.resolveDepthBuffer&&(H.depthBuffer&&(_e|=i.DEPTH_BUFFER_BIT),H.stencilBuffer&&H.resolveStencilBuffer&&(_e|=i.STENCIL_BUFFER_BIT)),je){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Qe.__webglColorRenderbuffer[et]);const Tt=n.get(T[et]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Tt,0)}i.blitFramebuffer(0,0,G,be,0,0,G,be,_e,i.NEAREST),f===!0&&(Le.length=0,W.length=0,Le.push(i.COLOR_ATTACHMENT0+et),H.depthBuffer&&H.resolveDepthBuffer===!1&&(Le.push(Ae),W.push(Ae),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,W)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Le))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),je)for(let et=0;et<T.length;et++){t.bindFramebuffer(i.FRAMEBUFFER,Qe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.RENDERBUFFER,Qe.__webglColorRenderbuffer[et]);const Tt=n.get(T[et]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Qe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.TEXTURE_2D,Tt,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Qe.__webglMultisampledFramebuffer)}else if(H.depthBuffer&&H.resolveDepthBuffer===!1&&f){const T=H.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function Ee(H){return Math.min(s.maxSamples,H.samples)}function Ue(H){const T=n.get(H);return H.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Pe(H){const T=l.render.frame;p.get(H)!==T&&(p.set(H,T),H.update())}function Je(H,T){const G=H.colorSpace,be=H.format,_e=H.type;return H.isCompressedTexture===!0||H.isVideoTexture===!0||G!==ea&&G!==Jr&&(Gt.getTransfer(G)===Yt?(be!==Bi||_e!==Er)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),T}function ze(H){return typeof HTMLImageElement<"u"&&H instanceof HTMLImageElement?(h.width=H.naturalWidth||H.width,h.height=H.naturalHeight||H.height):typeof VideoFrame<"u"&&H instanceof VideoFrame?(h.width=H.displayWidth,h.height=H.displayHeight):(h.width=H.width,h.height=H.height),h}this.allocateTextureUnit=X,this.resetTextureUnits=q,this.setTexture2D=he,this.setTexture2DArray=ae,this.setTexture3D=Me,this.setTextureCube=$,this.rebindTextures=Ge,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=le,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Ue}function UA(i,e){function t(n,s=Jr){let a;const l=Gt.getTransfer(s);if(n===Er)return i.UNSIGNED_BYTE;if(n===bp)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Tp)return i.UNSIGNED_SHORT_5_5_5_1;if(n===n_)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===e_)return i.BYTE;if(n===t_)return i.SHORT;if(n===il)return i.UNSIGNED_SHORT;if(n===Ep)return i.INT;if(n===Is)return i.UNSIGNED_INT;if(n===_r)return i.FLOAT;if(n===dl)return i.HALF_FLOAT;if(n===i_)return i.ALPHA;if(n===r_)return i.RGB;if(n===Bi)return i.RGBA;if(n===s_)return i.LUMINANCE;if(n===o_)return i.LUMINANCE_ALPHA;if(n===Fo)return i.DEPTH_COMPONENT;if(n===Xo)return i.DEPTH_STENCIL;if(n===a_)return i.RED;if(n===Ap)return i.RED_INTEGER;if(n===l_)return i.RG;if(n===Cp)return i.RG_INTEGER;if(n===Rp)return i.RGBA_INTEGER;if(n===eu||n===tu||n===nu||n===iu)if(l===Yt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===eu)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===tu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===nu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===iu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===eu)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===tu)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===nu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===iu)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wh||n===Eh||n===bh||n===Th)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===wh)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Eh)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===bh)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Th)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ah||n===Ch||n===Rh)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===Ah||n===Ch)return l===Yt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===Rh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ph||n===Lh||n===Ih||n===Dh||n===Nh||n===kh||n===Uh||n===Oh||n===Fh||n===zh||n===Bh||n===Hh||n===Vh||n===Gh)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===Ph)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ih)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Dh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Nh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===kh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Uh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Oh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Fh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Bh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Hh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Gh)return l===Yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ru||n===Wh||n===jh)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===ru)return l===Yt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wh)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===jh)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===c_||n===$h||n===Xh||n===qh)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===ru)return a.COMPRESSED_RED_RGTC1_EXT;if(n===$h)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Xh)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===qh)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$o?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class OA extends ai{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ps extends In{constructor(){super(),this.isGroup=!0,this.type="Group"}}const FA={type:"move"};class Yd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ps,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ps,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ps,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,a=null,l=null;const u=this._targetRay,f=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){l=!0;for(const S of e.hand.values()){const _=t.getJointPose(S,n),x=this._getHandJoint(h,S);_!==null&&(x.matrix.fromArray(_.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=_.radius),x.visible=_!==null}const p=h.joints["index-finger-tip"],m=h.joints["thumb-tip"],v=p.position.distanceTo(m.position),y=.02,M=.005;h.inputState.pinching&&v>y+M?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&v<=y-M&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(f.matrix.fromArray(a.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,a.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(a.linearVelocity)):f.hasLinearVelocity=!1,a.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(a.angularVelocity)):f.hasAngularVelocity=!1));u!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&a!==null&&(s=a),s!==null&&(u.matrix.fromArray(s.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,s.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(s.linearVelocity)):u.hasLinearVelocity=!1,s.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(s.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(FA)))}return u!==null&&(u.visible=s!==null),f!==null&&(f.visible=a!==null),h!==null&&(h.visible=l!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ps;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const zA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,BA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class HA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Zn,a=e.properties.get(s);a.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new is({vertexShader:zA,fragmentShader:BA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Nt(new Ru(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class VA extends Us{constructor(e,t){super();const n=this;let s=null,a=1,l=null,u="local-floor",f=1,h=null,p=null,m=null,v=null,y=null,M=null;const S=new HA,_=t.getContextAttributes();let x=null,R=null;const P=[],E=[],V=new $e;let N=null;const D=new ai;D.viewport=new Jt;const B=new ai;B.viewport=new Jt;const L=[D,B],A=new OA;let U=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ce=P[K];return ce===void 0&&(ce=new Yd,P[K]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(K){let ce=P[K];return ce===void 0&&(ce=new Yd,P[K]=ce),ce.getGripSpace()},this.getHand=function(K){let ce=P[K];return ce===void 0&&(ce=new Yd,P[K]=ce),ce.getHandSpace()};function X(K){const ce=E.indexOf(K.inputSource);if(ce===-1)return;const we=P[ce];we!==void 0&&(we.update(K.inputSource,K.frame,h||l),we.dispatchEvent({type:K.type,data:K.inputSource}))}function ne(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",ne),s.removeEventListener("inputsourceschange",he);for(let K=0;K<P.length;K++){const ce=E[K];ce!==null&&(E[K]=null,P[K].disconnect(ce))}U=null,q=null,S.reset(),e.setRenderTarget(x),y=null,v=null,m=null,s=null,R=null,Ce.stop(),n.isPresenting=!1,e.setPixelRatio(N),e.setSize(V.width,V.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){u=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||l},this.setReferenceSpace=function(K){h=K},this.getBaseLayer=function(){return v!==null?v:y},this.getBinding=function(){return m},this.getFrame=function(){return M},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(x=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",ne),s.addEventListener("inputsourceschange",he),_.xrCompatible!==!0&&await t.makeXRCompatible(),N=e.getPixelRatio(),e.getSize(V),s.renderState.layers===void 0){const ce={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:a};y=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:y}),e.setPixelRatio(1),e.setSize(y.framebufferWidth,y.framebufferHeight,!1),R=new Ds(y.framebufferWidth,y.framebufferHeight,{format:Bi,type:Er,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let ce=null,we=null,xe=null;_.depth&&(xe=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=_.stencil?Xo:Fo,we=_.stencil?$o:Is);const Ie={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:a};m=new XRWebGLBinding(s,t),v=m.createProjectionLayer(Ie),s.updateRenderState({layers:[v]}),e.setPixelRatio(1),e.setSize(v.textureWidth,v.textureHeight,!1),R=new Ds(v.textureWidth,v.textureHeight,{format:Bi,type:Er,depthTexture:new w_(v.textureWidth,v.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(f),h=null,l=await s.requestReferenceSpace(u),Ce.setContext(s),Ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function he(K){for(let ce=0;ce<K.removed.length;ce++){const we=K.removed[ce],xe=E.indexOf(we);xe>=0&&(E[xe]=null,P[xe].disconnect(we))}for(let ce=0;ce<K.added.length;ce++){const we=K.added[ce];let xe=E.indexOf(we);if(xe===-1){for(let Oe=0;Oe<P.length;Oe++)if(Oe>=E.length){E.push(we),xe=Oe;break}else if(E[Oe]===null){E[Oe]=we,xe=Oe;break}if(xe===-1)break}const Ie=P[xe];Ie&&Ie.connect(we)}}const ae=new J,Me=new J;function $(K,ce,we){ae.setFromMatrixPosition(ce.matrixWorld),Me.setFromMatrixPosition(we.matrixWorld);const xe=ae.distanceTo(Me),Ie=ce.projectionMatrix.elements,Oe=we.projectionMatrix.elements,Ge=Ie[14]/(Ie[10]-1),Ke=Ie[14]/(Ie[10]+1),ye=(Ie[9]+1)/Ie[5],Le=(Ie[9]-1)/Ie[5],W=(Ie[8]-1)/Ie[0],le=(Oe[8]+1)/Oe[0],Ee=Ge*W,Ue=Ge*le,Pe=xe/(-W+le),Je=Pe*-W;if(ce.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Je),K.translateZ(Pe),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Ie[10]===-1)K.projectionMatrix.copy(ce.projectionMatrix),K.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const ze=Ge+Pe,H=Ke+Pe,T=Ee-Je,G=Ue+(xe-Je),be=ye*Ke/H*ze,_e=Le*Ke/H*ze;K.projectionMatrix.makePerspective(T,G,be,_e,ze,H),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function z(K,ce){ce===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ce.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let ce=K.near,we=K.far;S.texture!==null&&(S.depthNear>0&&(ce=S.depthNear),S.depthFar>0&&(we=S.depthFar)),A.near=B.near=D.near=ce,A.far=B.far=D.far=we,(U!==A.near||q!==A.far)&&(s.updateRenderState({depthNear:A.near,depthFar:A.far}),U=A.near,q=A.far),D.layers.mask=K.layers.mask|2,B.layers.mask=K.layers.mask|4,A.layers.mask=D.layers.mask|B.layers.mask;const xe=K.parent,Ie=A.cameras;z(A,xe);for(let Oe=0;Oe<Ie.length;Oe++)z(Ie[Oe],xe);Ie.length===2?$(A,D,B):A.projectionMatrix.copy(D.projectionMatrix),ee(K,A,xe)};function ee(K,ce,we){we===null?K.matrix.copy(ce.matrixWorld):(K.matrix.copy(we.matrixWorld),K.matrix.invert(),K.matrix.multiply(ce.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ce.projectionMatrix),K.projectionMatrixInverse.copy(ce.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=rl*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(v===null&&y===null))return f},this.setFoveation=function(K){f=K,v!==null&&(v.fixedFoveation=K),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=K)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(A)};let F=null;function Y(K,ce){if(p=ce.getViewerPose(h||l),M=ce,p!==null){const we=p.views;y!==null&&(e.setRenderTargetFramebuffer(R,y.framebuffer),e.setRenderTarget(R));let xe=!1;we.length!==A.cameras.length&&(A.cameras.length=0,xe=!0);for(let Oe=0;Oe<we.length;Oe++){const Ge=we[Oe];let Ke=null;if(y!==null)Ke=y.getViewport(Ge);else{const Le=m.getViewSubImage(v,Ge);Ke=Le.viewport,Oe===0&&(e.setRenderTargetTextures(R,Le.colorTexture,v.ignoreDepthValues?void 0:Le.depthStencilTexture),e.setRenderTarget(R))}let ye=L[Oe];ye===void 0&&(ye=new ai,ye.layers.enable(Oe),ye.viewport=new Jt,L[Oe]=ye),ye.matrix.fromArray(Ge.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(Ge.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),Oe===0&&(A.matrix.copy(ye.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),xe===!0&&A.cameras.push(ye)}const Ie=s.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")){const Oe=m.getDepthInformation(we[0]);Oe&&Oe.isValid&&Oe.texture&&S.init(e,Oe,s.renderState)}}for(let we=0;we<P.length;we++){const xe=E[we],Ie=P[we];xe!==null&&Ie!==void 0&&Ie.update(xe,ce,h||l)}F&&F(K,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),M=null}const Ce=new S_;Ce.setAnimationLoop(Y),this.setAnimationLoop=function(K){F=K},this.dispose=function(){}}}const Ss=new Qi,GA=new Qt;function WA(i,e){function t(_,x){_.matrixAutoUpdate===!0&&_.updateMatrix(),x.value.copy(_.matrix)}function n(_,x){x.color.getRGB(_.fogColor.value,y_(i)),x.isFog?(_.fogNear.value=x.near,_.fogFar.value=x.far):x.isFogExp2&&(_.fogDensity.value=x.density)}function s(_,x,R,P,E){x.isMeshBasicMaterial||x.isMeshLambertMaterial?a(_,x):x.isMeshToonMaterial?(a(_,x),m(_,x)):x.isMeshPhongMaterial?(a(_,x),p(_,x)):x.isMeshStandardMaterial?(a(_,x),v(_,x),x.isMeshPhysicalMaterial&&y(_,x,E)):x.isMeshMatcapMaterial?(a(_,x),M(_,x)):x.isMeshDepthMaterial?a(_,x):x.isMeshDistanceMaterial?(a(_,x),S(_,x)):x.isMeshNormalMaterial?a(_,x):x.isLineBasicMaterial?(l(_,x),x.isLineDashedMaterial&&u(_,x)):x.isPointsMaterial?f(_,x,R,P):x.isSpriteMaterial?h(_,x):x.isShadowMaterial?(_.color.value.copy(x.color),_.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function a(_,x){_.opacity.value=x.opacity,x.color&&_.diffuse.value.copy(x.color),x.emissive&&_.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(_.map.value=x.map,t(x.map,_.mapTransform)),x.alphaMap&&(_.alphaMap.value=x.alphaMap,t(x.alphaMap,_.alphaMapTransform)),x.bumpMap&&(_.bumpMap.value=x.bumpMap,t(x.bumpMap,_.bumpMapTransform),_.bumpScale.value=x.bumpScale,x.side===Yn&&(_.bumpScale.value*=-1)),x.normalMap&&(_.normalMap.value=x.normalMap,t(x.normalMap,_.normalMapTransform),_.normalScale.value.copy(x.normalScale),x.side===Yn&&_.normalScale.value.negate()),x.displacementMap&&(_.displacementMap.value=x.displacementMap,t(x.displacementMap,_.displacementMapTransform),_.displacementScale.value=x.displacementScale,_.displacementBias.value=x.displacementBias),x.emissiveMap&&(_.emissiveMap.value=x.emissiveMap,t(x.emissiveMap,_.emissiveMapTransform)),x.specularMap&&(_.specularMap.value=x.specularMap,t(x.specularMap,_.specularMapTransform)),x.alphaTest>0&&(_.alphaTest.value=x.alphaTest);const R=e.get(x),P=R.envMap,E=R.envMapRotation;P&&(_.envMap.value=P,Ss.copy(E),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),_.envMapRotation.value.setFromMatrix4(GA.makeRotationFromEuler(Ss)),_.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=x.reflectivity,_.ior.value=x.ior,_.refractionRatio.value=x.refractionRatio),x.lightMap&&(_.lightMap.value=x.lightMap,_.lightMapIntensity.value=x.lightMapIntensity,t(x.lightMap,_.lightMapTransform)),x.aoMap&&(_.aoMap.value=x.aoMap,_.aoMapIntensity.value=x.aoMapIntensity,t(x.aoMap,_.aoMapTransform))}function l(_,x){_.diffuse.value.copy(x.color),_.opacity.value=x.opacity,x.map&&(_.map.value=x.map,t(x.map,_.mapTransform))}function u(_,x){_.dashSize.value=x.dashSize,_.totalSize.value=x.dashSize+x.gapSize,_.scale.value=x.scale}function f(_,x,R,P){_.diffuse.value.copy(x.color),_.opacity.value=x.opacity,_.size.value=x.size*R,_.scale.value=P*.5,x.map&&(_.map.value=x.map,t(x.map,_.uvTransform)),x.alphaMap&&(_.alphaMap.value=x.alphaMap,t(x.alphaMap,_.alphaMapTransform)),x.alphaTest>0&&(_.alphaTest.value=x.alphaTest)}function h(_,x){_.diffuse.value.copy(x.color),_.opacity.value=x.opacity,_.rotation.value=x.rotation,x.map&&(_.map.value=x.map,t(x.map,_.mapTransform)),x.alphaMap&&(_.alphaMap.value=x.alphaMap,t(x.alphaMap,_.alphaMapTransform)),x.alphaTest>0&&(_.alphaTest.value=x.alphaTest)}function p(_,x){_.specular.value.copy(x.specular),_.shininess.value=Math.max(x.shininess,1e-4)}function m(_,x){x.gradientMap&&(_.gradientMap.value=x.gradientMap)}function v(_,x){_.metalness.value=x.metalness,x.metalnessMap&&(_.metalnessMap.value=x.metalnessMap,t(x.metalnessMap,_.metalnessMapTransform)),_.roughness.value=x.roughness,x.roughnessMap&&(_.roughnessMap.value=x.roughnessMap,t(x.roughnessMap,_.roughnessMapTransform)),x.envMap&&(_.envMapIntensity.value=x.envMapIntensity)}function y(_,x,R){_.ior.value=x.ior,x.sheen>0&&(_.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),_.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(_.sheenColorMap.value=x.sheenColorMap,t(x.sheenColorMap,_.sheenColorMapTransform)),x.sheenRoughnessMap&&(_.sheenRoughnessMap.value=x.sheenRoughnessMap,t(x.sheenRoughnessMap,_.sheenRoughnessMapTransform))),x.clearcoat>0&&(_.clearcoat.value=x.clearcoat,_.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(_.clearcoatMap.value=x.clearcoatMap,t(x.clearcoatMap,_.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,t(x.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(_.clearcoatNormalMap.value=x.clearcoatNormalMap,t(x.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===Yn&&_.clearcoatNormalScale.value.negate())),x.dispersion>0&&(_.dispersion.value=x.dispersion),x.iridescence>0&&(_.iridescence.value=x.iridescence,_.iridescenceIOR.value=x.iridescenceIOR,_.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(_.iridescenceMap.value=x.iridescenceMap,t(x.iridescenceMap,_.iridescenceMapTransform)),x.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=x.iridescenceThicknessMap,t(x.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),x.transmission>0&&(_.transmission.value=x.transmission,_.transmissionSamplerMap.value=R.texture,_.transmissionSamplerSize.value.set(R.width,R.height),x.transmissionMap&&(_.transmissionMap.value=x.transmissionMap,t(x.transmissionMap,_.transmissionMapTransform)),_.thickness.value=x.thickness,x.thicknessMap&&(_.thicknessMap.value=x.thicknessMap,t(x.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=x.attenuationDistance,_.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(_.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(_.anisotropyMap.value=x.anisotropyMap,t(x.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=x.specularIntensity,_.specularColor.value.copy(x.specularColor),x.specularColorMap&&(_.specularColorMap.value=x.specularColorMap,t(x.specularColorMap,_.specularColorMapTransform)),x.specularIntensityMap&&(_.specularIntensityMap.value=x.specularIntensityMap,t(x.specularIntensityMap,_.specularIntensityMapTransform))}function M(_,x){x.matcap&&(_.matcap.value=x.matcap)}function S(_,x){const R=e.get(x).light;_.referencePosition.value.setFromMatrixPosition(R.matrixWorld),_.nearDistance.value=R.shadow.camera.near,_.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function jA(i,e,t,n){let s={},a={},l=[];const u=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function f(R,P){const E=P.program;n.uniformBlockBinding(R,E)}function h(R,P){let E=s[R.id];E===void 0&&(M(R),E=p(R),s[R.id]=E,R.addEventListener("dispose",_));const V=P.program;n.updateUBOMapping(R,V);const N=e.render.frame;a[R.id]!==N&&(v(R),a[R.id]=N)}function p(R){const P=m();R.__bindingPointIndex=P;const E=i.createBuffer(),V=R.__size,N=R.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,V,N),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,P,E),E}function m(){for(let R=0;R<u;R++)if(l.indexOf(R)===-1)return l.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(R){const P=s[R.id],E=R.uniforms,V=R.__cache;i.bindBuffer(i.UNIFORM_BUFFER,P);for(let N=0,D=E.length;N<D;N++){const B=Array.isArray(E[N])?E[N]:[E[N]];for(let L=0,A=B.length;L<A;L++){const U=B[L];if(y(U,N,L,V)===!0){const q=U.__offset,X=Array.isArray(U.value)?U.value:[U.value];let ne=0;for(let he=0;he<X.length;he++){const ae=X[he],Me=S(ae);typeof ae=="number"||typeof ae=="boolean"?(U.__data[0]=ae,i.bufferSubData(i.UNIFORM_BUFFER,q+ne,U.__data)):ae.isMatrix3?(U.__data[0]=ae.elements[0],U.__data[1]=ae.elements[1],U.__data[2]=ae.elements[2],U.__data[3]=0,U.__data[4]=ae.elements[3],U.__data[5]=ae.elements[4],U.__data[6]=ae.elements[5],U.__data[7]=0,U.__data[8]=ae.elements[6],U.__data[9]=ae.elements[7],U.__data[10]=ae.elements[8],U.__data[11]=0):(ae.toArray(U.__data,ne),ne+=Me.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,q,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function y(R,P,E,V){const N=R.value,D=P+"_"+E;if(V[D]===void 0)return typeof N=="number"||typeof N=="boolean"?V[D]=N:V[D]=N.clone(),!0;{const B=V[D];if(typeof N=="number"||typeof N=="boolean"){if(B!==N)return V[D]=N,!0}else if(B.equals(N)===!1)return B.copy(N),!0}return!1}function M(R){const P=R.uniforms;let E=0;const V=16;for(let D=0,B=P.length;D<B;D++){const L=Array.isArray(P[D])?P[D]:[P[D]];for(let A=0,U=L.length;A<U;A++){const q=L[A],X=Array.isArray(q.value)?q.value:[q.value];for(let ne=0,he=X.length;ne<he;ne++){const ae=X[ne],Me=S(ae),$=E%V,z=$%Me.boundary,ee=$+z;E+=z,ee!==0&&V-ee<Me.storage&&(E+=V-ee),q.__data=new Float32Array(Me.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=E,E+=Me.storage}}}const N=E%V;return N>0&&(E+=V-N),R.__size=E,R.__cache={},this}function S(R){const P={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(P.boundary=4,P.storage=4):R.isVector2?(P.boundary=8,P.storage=8):R.isVector3||R.isColor?(P.boundary=16,P.storage=12):R.isVector4?(P.boundary=16,P.storage=16):R.isMatrix3?(P.boundary=48,P.storage=48):R.isMatrix4?(P.boundary=64,P.storage=64):R.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",R),P}function _(R){const P=R.target;P.removeEventListener("dispose",_);const E=l.indexOf(P.__bindingPointIndex);l.splice(E,1),i.deleteBuffer(s[P.id]),delete s[P.id],delete a[P.id]}function x(){for(const R in s)i.deleteBuffer(s[R]);l=[],s={},a={}}return{bind:f,update:h,dispose:x}}class Iv{constructor(e={}){const{canvas:t=Nw(),context:n=null,depth:s=!0,stencil:a=!1,alpha:l=!1,antialias:u=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:h=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:m=!1,reverseDepthBuffer:v=!1}=e;this.isWebGLRenderer=!0;let y;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");y=n.getContextAttributes().alpha}else y=l;const M=new Uint32Array(4),S=new Int32Array(4);let _=null,x=null;const R=[],P=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=wi,this.toneMapping=ts,this.toneMappingExposure=1;const E=this;let V=!1,N=0,D=0,B=null,L=-1,A=null;const U=new Jt,q=new Jt;let X=null;const ne=new Bt(0);let he=0,ae=t.width,Me=t.height,$=1,z=null,ee=null;const F=new Jt(0,0,ae,Me),Y=new Jt(0,0,ae,Me);let Ce=!1;const K=new Ip;let ce=!1,we=!1;const xe=new Qt,Ie=new Qt,Oe=new J,Ge=new Jt,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ye=!1;function Le(){return B===null?$:1}let W=n;function le(I,re){return t.getContext(I,re)}try{const I={alpha:!0,depth:s,stencil:a,antialias:u,premultipliedAlpha:f,preserveDrawingBuffer:h,powerPreference:p,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wp}`),t.addEventListener("webglcontextlost",Re,!1),t.addEventListener("webglcontextrestored",Ze,!1),t.addEventListener("webglcontextcreationerror",Ye,!1),W===null){const re="webgl2";if(W=le(re,I),W===null)throw le(re)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let Ee,Ue,Pe,Je,ze,H,T,G,be,_e,Ae,Qe,je,et,Tt,De,it,pt,_t,tt,Rt,Te,dt,Q;function We(){Ee=new Z2(W),Ee.init(),Te=new UA(W,Ee),Ue=new j2(W,Ee,e,Te),Pe=new DA(W,Ee),Ue.reverseDepthBuffer&&v&&Pe.buffers.depth.setReversed(!0),Je=new eT(W),ze=new yA,H=new kA(W,Ee,Pe,ze,Ue,Te,Je),T=new X2(E),G=new Y2(E),be=new aE(W),dt=new G2(W,be),_e=new J2(W,be,Je,dt),Ae=new nT(W,_e,be,Je),_t=new tT(W,Ue,H),De=new $2(ze),Qe=new vA(E,T,G,Ee,Ue,dt,De),je=new WA(E,ze),et=new xA,Tt=new TA(Ee),pt=new V2(E,T,G,Pe,Ae,y,f),it=new LA(E,Ae,Ue),Q=new jA(W,Je,Ue,Pe),tt=new W2(W,Ee,Je),Rt=new Q2(W,Ee,Je),Je.programs=Qe.programs,E.capabilities=Ue,E.extensions=Ee,E.properties=ze,E.renderLists=et,E.shadowMap=it,E.state=Pe,E.info=Je}We();const ve=new VA(E,W);this.xr=ve,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const I=Ee.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){const I=Ee.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(I){I!==void 0&&($=I,this.setSize(ae,Me,!1))},this.getSize=function(I){return I.set(ae,Me)},this.setSize=function(I,re,ue=!0){if(ve.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ae=I,Me=re,t.width=Math.floor(I*$),t.height=Math.floor(re*$),ue===!0&&(t.style.width=I+"px",t.style.height=re+"px"),this.setViewport(0,0,I,re)},this.getDrawingBufferSize=function(I){return I.set(ae*$,Me*$).floor()},this.setDrawingBufferSize=function(I,re,ue){ae=I,Me=re,$=ue,t.width=Math.floor(I*ue),t.height=Math.floor(re*ue),this.setViewport(0,0,I,re)},this.getCurrentViewport=function(I){return I.copy(U)},this.getViewport=function(I){return I.copy(F)},this.setViewport=function(I,re,ue,pe){I.isVector4?F.set(I.x,I.y,I.z,I.w):F.set(I,re,ue,pe),Pe.viewport(U.copy(F).multiplyScalar($).round())},this.getScissor=function(I){return I.copy(Y)},this.setScissor=function(I,re,ue,pe){I.isVector4?Y.set(I.x,I.y,I.z,I.w):Y.set(I,re,ue,pe),Pe.scissor(q.copy(Y).multiplyScalar($).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(I){Pe.setScissorTest(Ce=I)},this.setOpaqueSort=function(I){z=I},this.setTransparentSort=function(I){ee=I},this.getClearColor=function(I){return I.copy(pt.getClearColor())},this.setClearColor=function(){pt.setClearColor.apply(pt,arguments)},this.getClearAlpha=function(){return pt.getClearAlpha()},this.setClearAlpha=function(){pt.setClearAlpha.apply(pt,arguments)},this.clear=function(I=!0,re=!0,ue=!0){let pe=0;if(I){let se=!1;if(B!==null){const Ve=B.texture.format;se=Ve===Rp||Ve===Cp||Ve===Ap}if(se){const Ve=B.texture.type,Be=Ve===Er||Ve===Is||Ve===il||Ve===$o||Ve===bp||Ve===Tp,ct=pt.getClearColor(),ut=pt.getClearAlpha(),St=ct.r,At=ct.g,mt=ct.b;Be?(M[0]=St,M[1]=At,M[2]=mt,M[3]=ut,W.clearBufferuiv(W.COLOR,0,M)):(S[0]=St,S[1]=At,S[2]=mt,S[3]=ut,W.clearBufferiv(W.COLOR,0,S))}else pe|=W.COLOR_BUFFER_BIT}re&&(pe|=W.DEPTH_BUFFER_BIT),ue&&(pe|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(pe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Re,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",Ye,!1),et.dispose(),Tt.dispose(),ze.dispose(),T.dispose(),G.dispose(),Ae.dispose(),dt.dispose(),Q.dispose(),Qe.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",k),ve.removeEventListener("sessionend",Z),ie.stop()};function Re(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),V=!0}function Ze(){console.log("THREE.WebGLRenderer: Context Restored."),V=!1;const I=Je.autoReset,re=it.enabled,ue=it.autoUpdate,pe=it.needsUpdate,se=it.type;We(),Je.autoReset=I,it.enabled=re,it.autoUpdate=ue,it.needsUpdate=pe,it.type=se}function Ye(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function Mt(I){const re=I.target;re.removeEventListener("dispose",Mt),Xt(re)}function Xt(I){qt(I),ze.remove(I)}function qt(I){const re=ze.get(I).programs;re!==void 0&&(re.forEach(function(ue){Qe.releaseProgram(ue)}),I.isShaderMaterial&&Qe.releaseShaderCache(I))}this.renderBufferDirect=function(I,re,ue,pe,se,Ve){re===null&&(re=Ke);const Be=se.isMesh&&se.matrixWorld.determinant()<0,ct=Lt(I,re,ue,pe,se);Pe.setMaterial(pe,Be);let ut=ue.index,St=1;if(pe.wireframe===!0){if(ut=_e.getWireframeAttribute(ue),ut===void 0)return;St=2}const At=ue.drawRange,mt=ue.attributes.position;let Ht=At.start*St,$t=(At.start+At.count)*St;Ve!==null&&(Ht=Math.max(Ht,Ve.start*St),$t=Math.min($t,(Ve.start+Ve.count)*St)),ut!==null?(Ht=Math.max(Ht,0),$t=Math.min($t,ut.count)):mt!=null&&(Ht=Math.max(Ht,0),$t=Math.min($t,mt.count));const zt=$t-Ht;if(zt<0||zt===1/0)return;dt.setup(se,pe,ct,ue,ut);let kn,Dt=tt;if(ut!==null&&(kn=be.get(ut),Dt=Rt,Dt.setIndex(kn)),se.isMesh)pe.wireframe===!0?(Pe.setLineWidth(pe.wireframeLinewidth*Le()),Dt.setMode(W.LINES)):Dt.setMode(W.TRIANGLES);else if(se.isLine){let yt=pe.linewidth;yt===void 0&&(yt=1),Pe.setLineWidth(yt*Le()),se.isLineSegments?Dt.setMode(W.LINES):se.isLineLoop?Dt.setMode(W.LINE_LOOP):Dt.setMode(W.LINE_STRIP)}else se.isPoints?Dt.setMode(W.POINTS):se.isSprite&&Dt.setMode(W.TRIANGLES);if(se.isBatchedMesh)if(se._multiDrawInstances!==null)Dt.renderMultiDrawInstances(se._multiDrawStarts,se._multiDrawCounts,se._multiDrawCount,se._multiDrawInstances);else if(Ee.get("WEBGL_multi_draw"))Dt.renderMultiDraw(se._multiDrawStarts,se._multiDrawCounts,se._multiDrawCount);else{const yt=se._multiDrawStarts,Ci=se._multiDrawCounts,Wt=se._multiDrawCount,Un=ut?be.get(ut).bytesPerElement:1,Ri=ze.get(pe).currentProgram.getUniforms();for(let _n=0;_n<Wt;_n++)Ri.setValue(W,"_gl_DrawID",_n),Dt.render(yt[_n]/Un,Ci[_n])}else if(se.isInstancedMesh)Dt.renderInstances(Ht,zt,se.count);else if(ue.isInstancedBufferGeometry){const yt=ue._maxInstanceCount!==void 0?ue._maxInstanceCount:1/0,Ci=Math.min(ue.instanceCount,yt);Dt.renderInstances(Ht,zt,Ci)}else Dt.render(Ht,zt)};function Ot(I,re,ue){I.transparent===!0&&I.side===vr&&I.forceSinglePass===!1?(I.side=Yn,I.needsUpdate=!0,ot(I,re,ue),I.side=ns,I.needsUpdate=!0,ot(I,re,ue),I.side=vr):ot(I,re,ue)}this.compile=function(I,re,ue=null){ue===null&&(ue=I),x=Tt.get(ue),x.init(re),P.push(x),ue.traverseVisible(function(se){se.isLight&&se.layers.test(re.layers)&&(x.pushLight(se),se.castShadow&&x.pushShadow(se))}),I!==ue&&I.traverseVisible(function(se){se.isLight&&se.layers.test(re.layers)&&(x.pushLight(se),se.castShadow&&x.pushShadow(se))}),x.setupLights();const pe=new Set;return I.traverse(function(se){if(!(se.isMesh||se.isPoints||se.isLine||se.isSprite))return;const Ve=se.material;if(Ve)if(Array.isArray(Ve))for(let Be=0;Be<Ve.length;Be++){const ct=Ve[Be];Ot(ct,ue,se),pe.add(ct)}else Ot(Ve,ue,se),pe.add(Ve)}),P.pop(),x=null,pe},this.compileAsync=function(I,re,ue=null){const pe=this.compile(I,re,ue);return new Promise(se=>{function Ve(){if(pe.forEach(function(Be){ze.get(Be).currentProgram.isReady()&&pe.delete(Be)}),pe.size===0){se(I);return}setTimeout(Ve,10)}Ee.get("KHR_parallel_shader_compile")!==null?Ve():setTimeout(Ve,10)})};let gn=null;function b(I){gn&&gn(I)}function k(){ie.stop()}function Z(){ie.start()}const ie=new S_;ie.setAnimationLoop(b),typeof self<"u"&&ie.setContext(self),this.setAnimationLoop=function(I){gn=I,ve.setAnimationLoop(I),I===null?ie.stop():ie.start()},ve.addEventListener("sessionstart",k),ve.addEventListener("sessionend",Z),this.render=function(I,re){if(re!==void 0&&re.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(V===!0)return;if(I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),re.parent===null&&re.matrixWorldAutoUpdate===!0&&re.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(re),re=ve.getCamera()),I.isScene===!0&&I.onBeforeRender(E,I,re,B),x=Tt.get(I,P.length),x.init(re),P.push(x),Ie.multiplyMatrices(re.projectionMatrix,re.matrixWorldInverse),K.setFromProjectionMatrix(Ie),we=this.localClippingEnabled,ce=De.init(this.clippingPlanes,we),_=et.get(I,R.length),_.init(),R.push(_),ve.enabled===!0&&ve.isPresenting===!0){const Ve=E.xr.getDepthSensingMesh();Ve!==null&&de(Ve,re,-1/0,E.sortObjects)}de(I,re,0,E.sortObjects),_.finish(),E.sortObjects===!0&&_.sort(z,ee),ye=ve.enabled===!1||ve.isPresenting===!1||ve.hasDepthSensing()===!1,ye&&pt.addToRenderList(_,I),this.info.render.frame++,ce===!0&&De.beginShadows();const ue=x.state.shadowsArray;it.render(ue,I,re),ce===!0&&De.endShadows(),this.info.autoReset===!0&&this.info.reset();const pe=_.opaque,se=_.transmissive;if(x.setupLights(),re.isArrayCamera){const Ve=re.cameras;if(se.length>0)for(let Be=0,ct=Ve.length;Be<ct;Be++){const ut=Ve[Be];Se(pe,se,I,ut)}ye&&pt.render(I);for(let Be=0,ct=Ve.length;Be<ct;Be++){const ut=Ve[Be];Ne(_,I,ut,ut.viewport)}}else se.length>0&&Se(pe,se,I,re),ye&&pt.render(I),Ne(_,I,re);B!==null&&(H.updateMultisampleRenderTarget(B),H.updateRenderTargetMipmap(B)),I.isScene===!0&&I.onAfterRender(E,I,re),dt.resetDefaultState(),L=-1,A=null,P.pop(),P.length>0?(x=P[P.length-1],ce===!0&&De.setGlobalState(E.clippingPlanes,x.state.camera)):x=null,R.pop(),R.length>0?_=R[R.length-1]:_=null};function de(I,re,ue,pe){if(I.visible===!1)return;if(I.layers.test(re.layers)){if(I.isGroup)ue=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(re);else if(I.isLight)x.pushLight(I),I.castShadow&&x.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||K.intersectsSprite(I)){pe&&Ge.setFromMatrixPosition(I.matrixWorld).applyMatrix4(Ie);const Be=Ae.update(I),ct=I.material;ct.visible&&_.push(I,Be,ct,ue,Ge.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||K.intersectsObject(I))){const Be=Ae.update(I),ct=I.material;if(pe&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),Ge.copy(I.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),Ge.copy(Be.boundingSphere.center)),Ge.applyMatrix4(I.matrixWorld).applyMatrix4(Ie)),Array.isArray(ct)){const ut=Be.groups;for(let St=0,At=ut.length;St<At;St++){const mt=ut[St],Ht=ct[mt.materialIndex];Ht&&Ht.visible&&_.push(I,Be,Ht,ue,Ge.z,mt)}}else ct.visible&&_.push(I,Be,ct,ue,Ge.z,null)}}const Ve=I.children;for(let Be=0,ct=Ve.length;Be<ct;Be++)de(Ve[Be],re,ue,pe)}function Ne(I,re,ue,pe){const se=I.opaque,Ve=I.transmissive,Be=I.transparent;x.setupLightsView(ue),ce===!0&&De.setGlobalState(E.clippingPlanes,ue),pe&&Pe.viewport(U.copy(pe)),se.length>0&&qe(se,re,ue),Ve.length>0&&qe(Ve,re,ue),Be.length>0&&qe(Be,re,ue),Pe.buffers.depth.setTest(!0),Pe.buffers.depth.setMask(!0),Pe.buffers.color.setMask(!0),Pe.setPolygonOffset(!1)}function Se(I,re,ue,pe){if((ue.isScene===!0?ue.overrideMaterial:null)!==null)return;x.state.transmissionRenderTarget[pe.id]===void 0&&(x.state.transmissionRenderTarget[pe.id]=new Ds(1,1,{generateMipmaps:!0,type:Ee.has("EXT_color_buffer_half_float")||Ee.has("EXT_color_buffer_float")?dl:Er,minFilter:Rs,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Gt.workingColorSpace}));const Ve=x.state.transmissionRenderTarget[pe.id],Be=pe.viewport||U;Ve.setSize(Be.z,Be.w);const ct=E.getRenderTarget();E.setRenderTarget(Ve),E.getClearColor(ne),he=E.getClearAlpha(),he<1&&E.setClearColor(16777215,.5),E.clear(),ye&&pt.render(ue);const ut=E.toneMapping;E.toneMapping=ts;const St=pe.viewport;if(pe.viewport!==void 0&&(pe.viewport=void 0),x.setupLightsView(pe),ce===!0&&De.setGlobalState(E.clippingPlanes,pe),qe(I,ue,pe),H.updateMultisampleRenderTarget(Ve),H.updateRenderTargetMipmap(Ve),Ee.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let mt=0,Ht=re.length;mt<Ht;mt++){const $t=re[mt],zt=$t.object,kn=$t.geometry,Dt=$t.material,yt=$t.group;if(Dt.side===vr&&zt.layers.test(pe.layers)){const Ci=Dt.side;Dt.side=Yn,Dt.needsUpdate=!0,at(zt,ue,pe,kn,Dt,yt),Dt.side=Ci,Dt.needsUpdate=!0,At=!0}}At===!0&&(H.updateMultisampleRenderTarget(Ve),H.updateRenderTargetMipmap(Ve))}E.setRenderTarget(ct),E.setClearColor(ne,he),St!==void 0&&(pe.viewport=St),E.toneMapping=ut}function qe(I,re,ue){const pe=re.isScene===!0?re.overrideMaterial:null;for(let se=0,Ve=I.length;se<Ve;se++){const Be=I[se],ct=Be.object,ut=Be.geometry,St=pe===null?Be.material:pe,At=Be.group;ct.layers.test(ue.layers)&&at(ct,re,ue,ut,St,At)}}function at(I,re,ue,pe,se,Ve){I.onBeforeRender(E,re,ue,pe,se,Ve),I.modelViewMatrix.multiplyMatrices(ue.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),se.onBeforeRender(E,re,ue,pe,I,Ve),se.transparent===!0&&se.side===vr&&se.forceSinglePass===!1?(se.side=Yn,se.needsUpdate=!0,E.renderBufferDirect(ue,re,pe,se,I,Ve),se.side=ns,se.needsUpdate=!0,E.renderBufferDirect(ue,re,pe,se,I,Ve),se.side=vr):E.renderBufferDirect(ue,re,pe,se,I,Ve),I.onAfterRender(E,re,ue,pe,se,Ve)}function ot(I,re,ue){re.isScene!==!0&&(re=Ke);const pe=ze.get(I),se=x.state.lights,Ve=x.state.shadowsArray,Be=se.state.version,ct=Qe.getParameters(I,se.state,Ve,re,ue),ut=Qe.getProgramCacheKey(ct);let St=pe.programs;pe.environment=I.isMeshStandardMaterial?re.environment:null,pe.fog=re.fog,pe.envMap=(I.isMeshStandardMaterial?G:T).get(I.envMap||pe.environment),pe.envMapRotation=pe.environment!==null&&I.envMap===null?re.environmentRotation:I.envMapRotation,St===void 0&&(I.addEventListener("dispose",Mt),St=new Map,pe.programs=St);let At=St.get(ut);if(At!==void 0){if(pe.currentProgram===At&&pe.lightsStateVersion===Be)return vt(I,ct),At}else ct.uniforms=Qe.getUniforms(I),I.onBeforeCompile(ct,E),At=Qe.acquireProgram(ct,ut),St.set(ut,At),pe.uniforms=ct.uniforms;const mt=pe.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(mt.clippingPlanes=De.uniform),vt(I,ct),pe.needsLights=wt(I),pe.lightsStateVersion=Be,pe.needsLights&&(mt.ambientLightColor.value=se.state.ambient,mt.lightProbe.value=se.state.probe,mt.directionalLights.value=se.state.directional,mt.directionalLightShadows.value=se.state.directionalShadow,mt.spotLights.value=se.state.spot,mt.spotLightShadows.value=se.state.spotShadow,mt.rectAreaLights.value=se.state.rectArea,mt.ltc_1.value=se.state.rectAreaLTC1,mt.ltc_2.value=se.state.rectAreaLTC2,mt.pointLights.value=se.state.point,mt.pointLightShadows.value=se.state.pointShadow,mt.hemisphereLights.value=se.state.hemi,mt.directionalShadowMap.value=se.state.directionalShadowMap,mt.directionalShadowMatrix.value=se.state.directionalShadowMatrix,mt.spotShadowMap.value=se.state.spotShadowMap,mt.spotLightMatrix.value=se.state.spotLightMatrix,mt.spotLightMap.value=se.state.spotLightMap,mt.pointShadowMap.value=se.state.pointShadowMap,mt.pointShadowMatrix.value=se.state.pointShadowMatrix),pe.currentProgram=At,pe.uniformsList=null,At}function rt(I){if(I.uniformsList===null){const re=I.currentProgram.getUniforms();I.uniformsList=su.seqWithValue(re.seq,I.uniforms)}return I.uniformsList}function vt(I,re){const ue=ze.get(I);ue.outputColorSpace=re.outputColorSpace,ue.batching=re.batching,ue.batchingColor=re.batchingColor,ue.instancing=re.instancing,ue.instancingColor=re.instancingColor,ue.instancingMorph=re.instancingMorph,ue.skinning=re.skinning,ue.morphTargets=re.morphTargets,ue.morphNormals=re.morphNormals,ue.morphColors=re.morphColors,ue.morphTargetsCount=re.morphTargetsCount,ue.numClippingPlanes=re.numClippingPlanes,ue.numIntersection=re.numClipIntersection,ue.vertexAlphas=re.vertexAlphas,ue.vertexTangents=re.vertexTangents,ue.toneMapping=re.toneMapping}function Lt(I,re,ue,pe,se){re.isScene!==!0&&(re=Ke),H.resetTextureUnits();const Ve=re.fog,Be=pe.isMeshStandardMaterial?re.environment:null,ct=B===null?E.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:ea,ut=(pe.isMeshStandardMaterial?G:T).get(pe.envMap||Be),St=pe.vertexColors===!0&&!!ue.attributes.color&&ue.attributes.color.itemSize===4,At=!!ue.attributes.tangent&&(!!pe.normalMap||pe.anisotropy>0),mt=!!ue.morphAttributes.position,Ht=!!ue.morphAttributes.normal,$t=!!ue.morphAttributes.color;let zt=ts;pe.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(zt=E.toneMapping);const kn=ue.morphAttributes.position||ue.morphAttributes.normal||ue.morphAttributes.color,Dt=kn!==void 0?kn.length:0,yt=ze.get(pe),Ci=x.state.lights;if(ce===!0&&(we===!0||I!==A)){const Gn=I===A&&pe.id===L;De.setState(pe,I,Gn)}let Wt=!1;pe.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==Ci.state.version||yt.outputColorSpace!==ct||se.isBatchedMesh&&yt.batching===!1||!se.isBatchedMesh&&yt.batching===!0||se.isBatchedMesh&&yt.batchingColor===!0&&se.colorTexture===null||se.isBatchedMesh&&yt.batchingColor===!1&&se.colorTexture!==null||se.isInstancedMesh&&yt.instancing===!1||!se.isInstancedMesh&&yt.instancing===!0||se.isSkinnedMesh&&yt.skinning===!1||!se.isSkinnedMesh&&yt.skinning===!0||se.isInstancedMesh&&yt.instancingColor===!0&&se.instanceColor===null||se.isInstancedMesh&&yt.instancingColor===!1&&se.instanceColor!==null||se.isInstancedMesh&&yt.instancingMorph===!0&&se.morphTexture===null||se.isInstancedMesh&&yt.instancingMorph===!1&&se.morphTexture!==null||yt.envMap!==ut||pe.fog===!0&&yt.fog!==Ve||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==De.numPlanes||yt.numIntersection!==De.numIntersection)||yt.vertexAlphas!==St||yt.vertexTangents!==At||yt.morphTargets!==mt||yt.morphNormals!==Ht||yt.morphColors!==$t||yt.toneMapping!==zt||yt.morphTargetsCount!==Dt)&&(Wt=!0):(Wt=!0,yt.__version=pe.version);let Un=yt.currentProgram;Wt===!0&&(Un=ot(pe,re,se));let Ri=!1,_n=!1,Gi=!1;const tn=Un.getUniforms(),pi=yt.uniforms;if(Pe.useProgram(Un.program)&&(Ri=!0,_n=!0,Gi=!0),pe.id!==L&&(L=pe.id,_n=!0),Ri||A!==I){Pe.buffers.depth.getReversed()?(xe.copy(I.projectionMatrix),Uw(xe),Ow(xe),tn.setValue(W,"projectionMatrix",xe)):tn.setValue(W,"projectionMatrix",I.projectionMatrix),tn.setValue(W,"viewMatrix",I.matrixWorldInverse);const mi=tn.map.cameraPosition;mi!==void 0&&mi.setValue(W,Oe.setFromMatrixPosition(I.matrixWorld)),Ue.logarithmicDepthBuffer&&tn.setValue(W,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(pe.isMeshPhongMaterial||pe.isMeshToonMaterial||pe.isMeshLambertMaterial||pe.isMeshBasicMaterial||pe.isMeshStandardMaterial||pe.isShaderMaterial)&&tn.setValue(W,"isOrthographic",I.isOrthographicCamera===!0),A!==I&&(A=I,_n=!0,Gi=!0)}if(se.isSkinnedMesh){tn.setOptional(W,se,"bindMatrix"),tn.setOptional(W,se,"bindMatrixInverse");const Gn=se.skeleton;Gn&&(Gn.boneTexture===null&&Gn.computeBoneTexture(),tn.setValue(W,"boneTexture",Gn.boneTexture,H))}se.isBatchedMesh&&(tn.setOptional(W,se,"batchingTexture"),tn.setValue(W,"batchingTexture",se._matricesTexture,H),tn.setOptional(W,se,"batchingIdTexture"),tn.setValue(W,"batchingIdTexture",se._indirectTexture,H),tn.setOptional(W,se,"batchingColorTexture"),se._colorsTexture!==null&&tn.setValue(W,"batchingColorTexture",se._colorsTexture,H));const tr=ue.morphAttributes;if((tr.position!==void 0||tr.normal!==void 0||tr.color!==void 0)&&_t.update(se,ue,Un),(_n||yt.receiveShadow!==se.receiveShadow)&&(yt.receiveShadow=se.receiveShadow,tn.setValue(W,"receiveShadow",se.receiveShadow)),pe.isMeshGouraudMaterial&&pe.envMap!==null&&(pi.envMap.value=ut,pi.flipEnvMap.value=ut.isCubeTexture&&ut.isRenderTargetTexture===!1?-1:1),pe.isMeshStandardMaterial&&pe.envMap===null&&re.environment!==null&&(pi.envMapIntensity.value=re.environmentIntensity),_n&&(tn.setValue(W,"toneMappingExposure",E.toneMappingExposure),yt.needsLights&&Pt(pi,Gi),Ve&&pe.fog===!0&&je.refreshFogUniforms(pi,Ve),je.refreshMaterialUniforms(pi,pe,$,Me,x.state.transmissionRenderTarget[I.id]),su.upload(W,rt(yt),pi,H)),pe.isShaderMaterial&&pe.uniformsNeedUpdate===!0&&(su.upload(W,rt(yt),pi,H),pe.uniformsNeedUpdate=!1),pe.isSpriteMaterial&&tn.setValue(W,"center",se.center),tn.setValue(W,"modelViewMatrix",se.modelViewMatrix),tn.setValue(W,"normalMatrix",se.normalMatrix),tn.setValue(W,"modelMatrix",se.matrixWorld),pe.isShaderMaterial||pe.isRawShaderMaterial){const Gn=pe.uniformsGroups;for(let mi=0,Jn=Gn.length;mi<Jn;mi++){const pl=Gn[mi];Q.update(pl,Un),Q.bind(pl,Un)}}return Un}function Pt(I,re){I.ambientLightColor.needsUpdate=re,I.lightProbe.needsUpdate=re,I.directionalLights.needsUpdate=re,I.directionalLightShadows.needsUpdate=re,I.pointLights.needsUpdate=re,I.pointLightShadows.needsUpdate=re,I.spotLights.needsUpdate=re,I.spotLightShadows.needsUpdate=re,I.rectAreaLights.needsUpdate=re,I.hemisphereLights.needsUpdate=re}function wt(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(I,re,ue){ze.get(I.texture).__webglTexture=re,ze.get(I.depthTexture).__webglTexture=ue;const pe=ze.get(I);pe.__hasExternalTextures=!0,pe.__autoAllocateDepthBuffer=ue===void 0,pe.__autoAllocateDepthBuffer||Ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),pe.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(I,re){const ue=ze.get(I);ue.__webglFramebuffer=re,ue.__useDefaultFramebuffer=re===void 0},this.setRenderTarget=function(I,re=0,ue=0){B=I,N=re,D=ue;let pe=!0,se=null,Ve=!1,Be=!1;if(I){const ut=ze.get(I);if(ut.__useDefaultFramebuffer!==void 0)Pe.bindFramebuffer(W.FRAMEBUFFER,null),pe=!1;else if(ut.__webglFramebuffer===void 0)H.setupRenderTarget(I);else if(ut.__hasExternalTextures)H.rebindTextures(I,ze.get(I.texture).__webglTexture,ze.get(I.depthTexture).__webglTexture);else if(I.depthBuffer){const mt=I.depthTexture;if(ut.__boundDepthTexture!==mt){if(mt!==null&&ze.has(mt)&&(I.width!==mt.image.width||I.height!==mt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");H.setupDepthRenderbuffer(I)}}const St=I.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(Be=!0);const At=ze.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(At[re])?se=At[re][ue]:se=At[re],Ve=!0):I.samples>0&&H.useMultisampledRTT(I)===!1?se=ze.get(I).__webglMultisampledFramebuffer:Array.isArray(At)?se=At[ue]:se=At,U.copy(I.viewport),q.copy(I.scissor),X=I.scissorTest}else U.copy(F).multiplyScalar($).floor(),q.copy(Y).multiplyScalar($).floor(),X=Ce;if(Pe.bindFramebuffer(W.FRAMEBUFFER,se)&&pe&&Pe.drawBuffers(I,se),Pe.viewport(U),Pe.scissor(q),Pe.setScissorTest(X),Ve){const ut=ze.get(I.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+re,ut.__webglTexture,ue)}else if(Be){const ut=ze.get(I.texture),St=re||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,ut.__webglTexture,ue||0,St)}L=-1},this.readRenderTargetPixels=function(I,re,ue,pe,se,Ve,Be){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ct=ze.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Be!==void 0&&(ct=ct[Be]),ct){Pe.bindFramebuffer(W.FRAMEBUFFER,ct);try{const ut=I.texture,St=ut.format,At=ut.type;if(!Ue.textureFormatReadable(St)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ue.textureTypeReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}re>=0&&re<=I.width-pe&&ue>=0&&ue<=I.height-se&&W.readPixels(re,ue,pe,se,Te.convert(St),Te.convert(At),Ve)}finally{const ut=B!==null?ze.get(B).__webglFramebuffer:null;Pe.bindFramebuffer(W.FRAMEBUFFER,ut)}}},this.readRenderTargetPixelsAsync=async function(I,re,ue,pe,se,Ve,Be){if(!(I&&I.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ct=ze.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Be!==void 0&&(ct=ct[Be]),ct){const ut=I.texture,St=ut.format,At=ut.type;if(!Ue.textureFormatReadable(St))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ue.textureTypeReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(re>=0&&re<=I.width-pe&&ue>=0&&ue<=I.height-se){Pe.bindFramebuffer(W.FRAMEBUFFER,ct);const mt=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,mt),W.bufferData(W.PIXEL_PACK_BUFFER,Ve.byteLength,W.STREAM_READ),W.readPixels(re,ue,pe,se,Te.convert(St),Te.convert(At),0);const Ht=B!==null?ze.get(B).__webglFramebuffer:null;Pe.bindFramebuffer(W.FRAMEBUFFER,Ht);const $t=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await kw(W,$t,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,mt),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,Ve),W.deleteBuffer(mt),W.deleteSync($t),Ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(I,re=null,ue=0){I.isTexture!==!0&&(Wa("WebGLRenderer: copyFramebufferToTexture function signature has changed."),re=arguments[0]||null,I=arguments[1]);const pe=Math.pow(2,-ue),se=Math.floor(I.image.width*pe),Ve=Math.floor(I.image.height*pe),Be=re!==null?re.x:0,ct=re!==null?re.y:0;H.setTexture2D(I,0),W.copyTexSubImage2D(W.TEXTURE_2D,ue,0,0,Be,ct,se,Ve),Pe.unbindTexture()},this.copyTextureToTexture=function(I,re,ue=null,pe=null,se=0){I.isTexture!==!0&&(Wa("WebGLRenderer: copyTextureToTexture function signature has changed."),pe=arguments[0]||null,I=arguments[1],re=arguments[2],se=arguments[3]||0,ue=null);let Ve,Be,ct,ut,St,At,mt,Ht,$t;const zt=I.isCompressedTexture?I.mipmaps[se]:I.image;ue!==null?(Ve=ue.max.x-ue.min.x,Be=ue.max.y-ue.min.y,ct=ue.isBox3?ue.max.z-ue.min.z:1,ut=ue.min.x,St=ue.min.y,At=ue.isBox3?ue.min.z:0):(Ve=zt.width,Be=zt.height,ct=zt.depth||1,ut=0,St=0,At=0),pe!==null?(mt=pe.x,Ht=pe.y,$t=pe.z):(mt=0,Ht=0,$t=0);const kn=Te.convert(re.format),Dt=Te.convert(re.type);let yt;re.isData3DTexture?(H.setTexture3D(re,0),yt=W.TEXTURE_3D):re.isDataArrayTexture||re.isCompressedArrayTexture?(H.setTexture2DArray(re,0),yt=W.TEXTURE_2D_ARRAY):(H.setTexture2D(re,0),yt=W.TEXTURE_2D),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,re.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,re.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,re.unpackAlignment);const Ci=W.getParameter(W.UNPACK_ROW_LENGTH),Wt=W.getParameter(W.UNPACK_IMAGE_HEIGHT),Un=W.getParameter(W.UNPACK_SKIP_PIXELS),Ri=W.getParameter(W.UNPACK_SKIP_ROWS),_n=W.getParameter(W.UNPACK_SKIP_IMAGES);W.pixelStorei(W.UNPACK_ROW_LENGTH,zt.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,zt.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,ut),W.pixelStorei(W.UNPACK_SKIP_ROWS,St),W.pixelStorei(W.UNPACK_SKIP_IMAGES,At);const Gi=I.isDataArrayTexture||I.isData3DTexture,tn=re.isDataArrayTexture||re.isData3DTexture;if(I.isRenderTargetTexture||I.isDepthTexture){const pi=ze.get(I),tr=ze.get(re),Gn=ze.get(pi.__renderTarget),mi=ze.get(tr.__renderTarget);Pe.bindFramebuffer(W.READ_FRAMEBUFFER,Gn.__webglFramebuffer),Pe.bindFramebuffer(W.DRAW_FRAMEBUFFER,mi.__webglFramebuffer);for(let Jn=0;Jn<ct;Jn++)Gi&&W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,ze.get(I).__webglTexture,se,At+Jn),I.isDepthTexture?(tn&&W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,ze.get(re).__webglTexture,se,$t+Jn),W.blitFramebuffer(ut,St,Ve,Be,mt,Ht,Ve,Be,W.DEPTH_BUFFER_BIT,W.NEAREST)):tn?W.copyTexSubImage3D(yt,se,mt,Ht,$t+Jn,ut,St,Ve,Be):W.copyTexSubImage2D(yt,se,mt,Ht,$t+Jn,ut,St,Ve,Be);Pe.bindFramebuffer(W.READ_FRAMEBUFFER,null),Pe.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else tn?I.isDataTexture||I.isData3DTexture?W.texSubImage3D(yt,se,mt,Ht,$t,Ve,Be,ct,kn,Dt,zt.data):re.isCompressedArrayTexture?W.compressedTexSubImage3D(yt,se,mt,Ht,$t,Ve,Be,ct,kn,zt.data):W.texSubImage3D(yt,se,mt,Ht,$t,Ve,Be,ct,kn,Dt,zt):I.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,se,mt,Ht,Ve,Be,kn,Dt,zt.data):I.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,se,mt,Ht,zt.width,zt.height,kn,zt.data):W.texSubImage2D(W.TEXTURE_2D,se,mt,Ht,Ve,Be,kn,Dt,zt);W.pixelStorei(W.UNPACK_ROW_LENGTH,Ci),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Wt),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Un),W.pixelStorei(W.UNPACK_SKIP_ROWS,Ri),W.pixelStorei(W.UNPACK_SKIP_IMAGES,_n),se===0&&re.generateMipmaps&&W.generateMipmap(yt),Pe.unbindTexture()},this.copyTextureToTexture3D=function(I,re,ue=null,pe=null,se=0){return I.isTexture!==!0&&(Wa("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ue=arguments[0]||null,pe=arguments[1]||null,I=arguments[2],re=arguments[3],se=arguments[4]||0),Wa('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(I,re,ue,pe,se)},this.initRenderTarget=function(I){ze.get(I).__webglFramebuffer===void 0&&H.setupRenderTarget(I)},this.initTexture=function(I){I.isCubeTexture?H.setTextureCube(I,0):I.isData3DTexture?H.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?H.setTexture2DArray(I,0):H.setTexture2D(I,0),Pe.unbindTexture()},this.resetState=function(){N=0,D=0,B=null,Pe.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Gt._getUnpackColorSpace()}}class Jh extends In{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qi,this.environmentIntensity=1,this.environmentRotation=new Qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Ya extends ta{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Bt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const du=new J,hu=new J,Dv=new Qt,Ba=new Au,Vc=new Tu,Zd=new J,Nv=new J;class Qh extends In{constructor(e=new wn,t=new Ya){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,a=t.count;s<a;s++)du.fromBufferAttribute(t,s-1),hu.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=du.distanceTo(hu);e.setAttribute("lineDistance",new en(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,l=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vc.copy(n.boundingSphere),Vc.applyMatrix4(s),Vc.radius+=a,e.ray.intersectsSphere(Vc)===!1)return;Dv.copy(s).invert(),Ba.copy(e.ray).applyMatrix4(Dv);const u=a/((this.scale.x+this.scale.y+this.scale.z)/3),f=u*u,h=this.isLineSegments?2:1,p=n.index,v=n.attributes.position;if(p!==null){const y=Math.max(0,l.start),M=Math.min(p.count,l.start+l.count);for(let S=y,_=M-1;S<_;S+=h){const x=p.getX(S),R=p.getX(S+1),P=Gc(this,e,Ba,f,x,R);P&&t.push(P)}if(this.isLineLoop){const S=p.getX(M-1),_=p.getX(y),x=Gc(this,e,Ba,f,S,_);x&&t.push(x)}}else{const y=Math.max(0,l.start),M=Math.min(v.count,l.start+l.count);for(let S=y,_=M-1;S<_;S+=h){const x=Gc(this,e,Ba,f,S,S+1);x&&t.push(x)}if(this.isLineLoop){const S=Gc(this,e,Ba,f,M-1,y);S&&t.push(S)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=s.length;a<l;a++){const u=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=a}}}}}function Gc(i,e,t,n,s,a){const l=i.geometry.attributes.position;if(du.fromBufferAttribute(l,s),hu.fromBufferAttribute(l,a),t.distanceSqToSegment(du,hu,Zd,Nv)>n)return;Zd.applyMatrix4(i.matrixWorld);const f=e.ray.origin.distanceTo(Zd);if(!(f<e.near||f>e.far))return{distance:f,point:Nv.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const kv=new J,Uv=new J;class ep extends Qh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,a=t.count;s<a;s+=2)kv.fromBufferAttribute(t,s),Uv.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+kv.distanceTo(Uv);e.setAttribute("lineDistance",new en(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class C_ extends Zn{constructor(e,t,n,s,a,l,u,f,h){super(e,t,n,s,a,l,u,f,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class er{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),a=0;t.push(0);for(let l=1;l<=e;l++)n=this.getPoint(l/e),a+=n.distanceTo(s),t.push(a),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const a=n.length;let l;t?l=t:l=e*n[a-1];let u=0,f=a-1,h;for(;u<=f;)if(s=Math.floor(u+(f-u)/2),h=n[s]-l,h<0)u=s+1;else if(h>0)f=s-1;else{f=s;break}if(s=f,n[s]===l)return s/(a-1);const p=n[s],v=n[s+1]-p,y=(l-p)/v;return(s+y)/(a-1)}getTangent(e,t){let s=e-1e-4,a=e+1e-4;s<0&&(s=0),a>1&&(a=1);const l=this.getPoint(s),u=this.getPoint(a),f=t||(l.isVector2?new $e:new J);return f.copy(u).sub(l).normalize(),f}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new J,s=[],a=[],l=[],u=new J,f=new Qt;for(let y=0;y<=e;y++){const M=y/e;s[y]=this.getTangentAt(M,new J)}a[0]=new J,l[0]=new J;let h=Number.MAX_VALUE;const p=Math.abs(s[0].x),m=Math.abs(s[0].y),v=Math.abs(s[0].z);p<=h&&(h=p,n.set(1,0,0)),m<=h&&(h=m,n.set(0,1,0)),v<=h&&n.set(0,0,1),u.crossVectors(s[0],n).normalize(),a[0].crossVectors(s[0],u),l[0].crossVectors(s[0],a[0]);for(let y=1;y<=e;y++){if(a[y]=a[y-1].clone(),l[y]=l[y-1].clone(),u.crossVectors(s[y-1],s[y]),u.length()>Number.EPSILON){u.normalize();const M=Math.acos(Ln(s[y-1].dot(s[y]),-1,1));a[y].applyMatrix4(f.makeRotationAxis(u,M))}l[y].crossVectors(s[y],a[y])}if(t===!0){let y=Math.acos(Ln(a[0].dot(a[e]),-1,1));y/=e,s[0].dot(u.crossVectors(a[0],a[e]))>0&&(y=-y);for(let M=1;M<=e;M++)a[M].applyMatrix4(f.makeRotationAxis(s[M],y*M)),l[M].crossVectors(s[M],a[M])}return{tangents:s,normals:a,binormals:l}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Np extends er{constructor(e=0,t=0,n=1,s=1,a=0,l=Math.PI*2,u=!1,f=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=a,this.aEndAngle=l,this.aClockwise=u,this.aRotation=f}getPoint(e,t=new $e){const n=t,s=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const l=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=s;for(;a>s;)a-=s;a<Number.EPSILON&&(l?a=0:a=s),this.aClockwise===!0&&!l&&(a===s?a=-s:a=a-s);const u=this.aStartAngle+e*a;let f=this.aX+this.xRadius*Math.cos(u),h=this.aY+this.yRadius*Math.sin(u);if(this.aRotation!==0){const p=Math.cos(this.aRotation),m=Math.sin(this.aRotation),v=f-this.aX,y=h-this.aY;f=v*p-y*m+this.aX,h=v*m+y*p+this.aY}return n.set(f,h)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class $A extends Np{constructor(e,t,n,s,a,l){super(e,t,n,n,s,a,l),this.isArcCurve=!0,this.type="ArcCurve"}}function kp(){let i=0,e=0,t=0,n=0;function s(a,l,u,f){i=a,e=u,t=-3*a+3*l-2*u-f,n=2*a-2*l+u+f}return{initCatmullRom:function(a,l,u,f,h){s(l,u,h*(u-a),h*(f-l))},initNonuniformCatmullRom:function(a,l,u,f,h,p,m){let v=(l-a)/h-(u-a)/(h+p)+(u-l)/p,y=(u-l)/p-(f-l)/(p+m)+(f-u)/m;v*=p,y*=p,s(l,u,v,y)},calc:function(a){const l=a*a,u=l*a;return i+e*a+t*l+n*u}}}const Wc=new J,Jd=new kp,Qd=new kp,eh=new kp;class XA extends er{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new J){const n=t,s=this.points,a=s.length,l=(a-(this.closed?0:1))*e;let u=Math.floor(l),f=l-u;this.closed?u+=u>0?0:(Math.floor(Math.abs(u)/a)+1)*a:f===0&&u===a-1&&(u=a-2,f=1);let h,p;this.closed||u>0?h=s[(u-1)%a]:(Wc.subVectors(s[0],s[1]).add(s[0]),h=Wc);const m=s[u%a],v=s[(u+1)%a];if(this.closed||u+2<a?p=s[(u+2)%a]:(Wc.subVectors(s[a-1],s[a-2]).add(s[a-1]),p=Wc),this.curveType==="centripetal"||this.curveType==="chordal"){const y=this.curveType==="chordal"?.5:.25;let M=Math.pow(h.distanceToSquared(m),y),S=Math.pow(m.distanceToSquared(v),y),_=Math.pow(v.distanceToSquared(p),y);S<1e-4&&(S=1),M<1e-4&&(M=S),_<1e-4&&(_=S),Jd.initNonuniformCatmullRom(h.x,m.x,v.x,p.x,M,S,_),Qd.initNonuniformCatmullRom(h.y,m.y,v.y,p.y,M,S,_),eh.initNonuniformCatmullRom(h.z,m.z,v.z,p.z,M,S,_)}else this.curveType==="catmullrom"&&(Jd.initCatmullRom(h.x,m.x,v.x,p.x,this.tension),Qd.initCatmullRom(h.y,m.y,v.y,p.y,this.tension),eh.initCatmullRom(h.z,m.z,v.z,p.z,this.tension));return n.set(Jd.calc(f),Qd.calc(f),eh.calc(f)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new J().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ov(i,e,t,n,s){const a=(n-e)*.5,l=(s-t)*.5,u=i*i,f=i*u;return(2*t-2*n+a+l)*f+(-3*t+3*n-2*a-l)*u+a*i+t}function qA(i,e){const t=1-i;return t*t*e}function KA(i,e){return 2*(1-i)*i*e}function YA(i,e){return i*i*e}function Za(i,e,t,n){return qA(i,e)+KA(i,t)+YA(i,n)}function ZA(i,e){const t=1-i;return t*t*t*e}function JA(i,e){const t=1-i;return 3*t*t*i*e}function QA(i,e){return 3*(1-i)*i*i*e}function eC(i,e){return i*i*i*e}function Ja(i,e,t,n,s){return ZA(i,e)+JA(i,t)+QA(i,n)+eC(i,s)}class R_ extends er{constructor(e=new $e,t=new $e,n=new $e,s=new $e){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new $e){const n=t,s=this.v0,a=this.v1,l=this.v2,u=this.v3;return n.set(Ja(e,s.x,a.x,l.x,u.x),Ja(e,s.y,a.y,l.y,u.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class tC extends er{constructor(e=new J,t=new J,n=new J,s=new J){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new J){const n=t,s=this.v0,a=this.v1,l=this.v2,u=this.v3;return n.set(Ja(e,s.x,a.x,l.x,u.x),Ja(e,s.y,a.y,l.y,u.y),Ja(e,s.z,a.z,l.z,u.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class P_ extends er{constructor(e=new $e,t=new $e){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new $e){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new $e){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nC extends er{constructor(e=new J,t=new J){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new J){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new J){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class L_ extends er{constructor(e=new $e,t=new $e,n=new $e){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new $e){const n=t,s=this.v0,a=this.v1,l=this.v2;return n.set(Za(e,s.x,a.x,l.x),Za(e,s.y,a.y,l.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class iC extends er{constructor(e=new J,t=new J,n=new J){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new J){const n=t,s=this.v0,a=this.v1,l=this.v2;return n.set(Za(e,s.x,a.x,l.x),Za(e,s.y,a.y,l.y),Za(e,s.z,a.z,l.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class I_ extends er{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new $e){const n=t,s=this.points,a=(s.length-1)*e,l=Math.floor(a),u=a-l,f=s[l===0?l:l-1],h=s[l],p=s[l>s.length-2?s.length-1:l+1],m=s[l>s.length-3?s.length-1:l+2];return n.set(Ov(u,f.x,h.x,p.x,m.x),Ov(u,f.y,h.y,p.y,m.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new $e().fromArray(s))}return this}}var tp=Object.freeze({__proto__:null,ArcCurve:$A,CatmullRomCurve3:XA,CubicBezierCurve:R_,CubicBezierCurve3:tC,EllipseCurve:Np,LineCurve:P_,LineCurve3:nC,QuadraticBezierCurve:L_,QuadraticBezierCurve3:iC,SplineCurve:I_});class rC extends er{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new tp[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let a=0;for(;a<s.length;){if(s[a]>=n){const l=s[a]-n,u=this.curves[a],f=u.getLength(),h=f===0?0:1-l/f;return u.getPointAt(h,t)}a++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,a=this.curves;s<a.length;s++){const l=a[s],u=l.isEllipseCurve?e*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?e*l.points.length:e,f=l.getPoints(u);for(let h=0;h<f.length;h++){const p=f[h];n&&n.equals(p)||(t.push(p),n=p)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new tp[s.type]().fromJSON(s))}return this}}class np extends rC{constructor(e){super(),this.type="Path",this.currentPoint=new $e,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new P_(this.currentPoint.clone(),new $e(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const a=new L_(this.currentPoint.clone(),new $e(e,t),new $e(n,s));return this.curves.push(a),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,a,l){const u=new R_(this.currentPoint.clone(),new $e(e,t),new $e(n,s),new $e(a,l));return this.curves.push(u),this.currentPoint.set(a,l),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new I_(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,a,l){const u=this.currentPoint.x,f=this.currentPoint.y;return this.absarc(e+u,t+f,n,s,a,l),this}absarc(e,t,n,s,a,l){return this.absellipse(e,t,n,n,s,a,l),this}ellipse(e,t,n,s,a,l,u,f){const h=this.currentPoint.x,p=this.currentPoint.y;return this.absellipse(e+h,t+p,n,s,a,l,u,f),this}absellipse(e,t,n,s,a,l,u,f){const h=new Np(e,t,n,s,a,l,u,f);if(this.curves.length>0){const m=h.getPoint(0);m.equals(this.currentPoint)||this.lineTo(m.x,m.y)}this.curves.push(h);const p=h.getPoint(1);return this.currentPoint.copy(p),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Up extends wn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const a=[],l=[],u=[],f=[],h=new J,p=new $e;l.push(0,0,0),u.push(0,0,1),f.push(.5,.5);for(let m=0,v=3;m<=t;m++,v+=3){const y=n+m/t*s;h.x=e*Math.cos(y),h.y=e*Math.sin(y),l.push(h.x,h.y,h.z),u.push(0,0,1),p.x=(l[v]/e+1)/2,p.y=(l[v+1]/e+1)/2,f.push(p.x,p.y)}for(let m=1;m<=t;m++)a.push(m,m+1,0);this.setIndex(a),this.setAttribute("position",new en(l,3)),this.setAttribute("normal",new en(u,3)),this.setAttribute("uv",new en(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Up(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class gr extends wn{constructor(e=1,t=1,n=1,s=32,a=1,l=!1,u=0,f=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:a,openEnded:l,thetaStart:u,thetaLength:f};const h=this;s=Math.floor(s),a=Math.floor(a);const p=[],m=[],v=[],y=[];let M=0;const S=[],_=n/2;let x=0;R(),l===!1&&(e>0&&P(!0),t>0&&P(!1)),this.setIndex(p),this.setAttribute("position",new en(m,3)),this.setAttribute("normal",new en(v,3)),this.setAttribute("uv",new en(y,2));function R(){const E=new J,V=new J;let N=0;const D=(t-e)/n;for(let B=0;B<=a;B++){const L=[],A=B/a,U=A*(t-e)+e;for(let q=0;q<=s;q++){const X=q/s,ne=X*f+u,he=Math.sin(ne),ae=Math.cos(ne);V.x=U*he,V.y=-A*n+_,V.z=U*ae,m.push(V.x,V.y,V.z),E.set(he,D,ae).normalize(),v.push(E.x,E.y,E.z),y.push(X,1-A),L.push(M++)}S.push(L)}for(let B=0;B<s;B++)for(let L=0;L<a;L++){const A=S[L][B],U=S[L+1][B],q=S[L+1][B+1],X=S[L][B+1];(e>0||L!==0)&&(p.push(A,U,X),N+=3),(t>0||L!==a-1)&&(p.push(U,q,X),N+=3)}h.addGroup(x,N,0),x+=N}function P(E){const V=M,N=new $e,D=new J;let B=0;const L=E===!0?e:t,A=E===!0?1:-1;for(let q=1;q<=s;q++)m.push(0,_*A,0),v.push(0,A,0),y.push(.5,.5),M++;const U=M;for(let q=0;q<=s;q++){const ne=q/s*f+u,he=Math.cos(ne),ae=Math.sin(ne);D.x=L*ae,D.y=_*A,D.z=L*he,m.push(D.x,D.y,D.z),v.push(0,A,0),N.x=he*.5+.5,N.y=ae*.5*A+.5,y.push(N.x,N.y),M++}for(let q=0;q<s;q++){const X=V+q,ne=U+q;E===!0?p.push(ne,ne+1,X):p.push(ne+1,ne,X),B+=3}h.addGroup(x,B,E===!0?1:2),x+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const jc=new J,$c=new J,th=new J,Xc=new bi;class sC extends wn{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),a=Math.cos(zo*t),l=e.getIndex(),u=e.getAttribute("position"),f=l?l.count:u.count,h=[0,0,0],p=["a","b","c"],m=new Array(3),v={},y=[];for(let M=0;M<f;M+=3){l?(h[0]=l.getX(M),h[1]=l.getX(M+1),h[2]=l.getX(M+2)):(h[0]=M,h[1]=M+1,h[2]=M+2);const{a:S,b:_,c:x}=Xc;if(S.fromBufferAttribute(u,h[0]),_.fromBufferAttribute(u,h[1]),x.fromBufferAttribute(u,h[2]),Xc.getNormal(th),m[0]=`${Math.round(S.x*s)},${Math.round(S.y*s)},${Math.round(S.z*s)}`,m[1]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,m[2]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,!(m[0]===m[1]||m[1]===m[2]||m[2]===m[0]))for(let R=0;R<3;R++){const P=(R+1)%3,E=m[R],V=m[P],N=Xc[p[R]],D=Xc[p[P]],B=`${E}_${V}`,L=`${V}_${E}`;L in v&&v[L]?(th.dot(v[L].normal)<=a&&(y.push(N.x,N.y,N.z),y.push(D.x,D.y,D.z)),v[L]=null):B in v||(v[B]={index0:h[R],index1:h[P],normal:th.clone()})}}for(const M in v)if(v[M]){const{index0:S,index1:_}=v[M];jc.fromBufferAttribute(u,S),$c.fromBufferAttribute(u,_),y.push(jc.x,jc.y,jc.z),y.push($c.x,$c.y,$c.z)}this.setAttribute("position",new en(y,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class D_ extends np{constructor(e){super(e),this.uuid=Os(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new np().fromJSON(s))}return this}}const oC={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let a=N_(i,0,s,t,!0);const l=[];if(!a||a.next===a.prev)return l;let u,f,h,p,m,v,y;if(n&&(a=fC(i,e,a,t)),i.length>80*t){u=h=i[0],f=p=i[1];for(let M=t;M<s;M+=t)m=i[M],v=i[M+1],m<u&&(u=m),v<f&&(f=v),m>h&&(h=m),v>p&&(p=v);y=Math.max(h-u,p-f),y=y!==0?32767/y:0}return sl(a,l,t,u,f,y,0),l}};function N_(i,e,t,n,s){let a,l;if(s===MC(i,e,t,n)>0)for(a=e;a<t;a+=n)l=Fv(a,i[a],i[a+1],l);else for(a=t-n;a>=e;a-=n)l=Fv(a,i[a],i[a+1],l);return l&&Lu(l,l.next)&&(al(l),l=l.next),l}function ks(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Lu(t,t.next)||un(t.prev,t,t.next)===0)){if(al(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function sl(i,e,t,n,s,a,l){if(!i)return;!l&&a&&gC(i,n,s,a);let u=i,f,h;for(;i.prev!==i.next;){if(f=i.prev,h=i.next,a?lC(i,n,s,a):aC(i)){e.push(f.i/t|0),e.push(i.i/t|0),e.push(h.i/t|0),al(i),i=h.next,u=h.next;continue}if(i=h,i===u){l?l===1?(i=cC(ks(i),e,t),sl(i,e,t,n,s,a,2)):l===2&&uC(i,e,t,n,s,a):sl(ks(i),e,t,n,s,a,1);break}}}function aC(i){const e=i.prev,t=i,n=i.next;if(un(e,t,n)>=0)return!1;const s=e.x,a=t.x,l=n.x,u=e.y,f=t.y,h=n.y,p=s<a?s<l?s:l:a<l?a:l,m=u<f?u<h?u:h:f<h?f:h,v=s>a?s>l?s:l:a>l?a:l,y=u>f?u>h?u:h:f>h?f:h;let M=n.next;for(;M!==e;){if(M.x>=p&&M.x<=v&&M.y>=m&&M.y<=y&&Do(s,u,a,f,l,h,M.x,M.y)&&un(M.prev,M,M.next)>=0)return!1;M=M.next}return!0}function lC(i,e,t,n){const s=i.prev,a=i,l=i.next;if(un(s,a,l)>=0)return!1;const u=s.x,f=a.x,h=l.x,p=s.y,m=a.y,v=l.y,y=u<f?u<h?u:h:f<h?f:h,M=p<m?p<v?p:v:m<v?m:v,S=u>f?u>h?u:h:f>h?f:h,_=p>m?p>v?p:v:m>v?m:v,x=ip(y,M,e,t,n),R=ip(S,_,e,t,n);let P=i.prevZ,E=i.nextZ;for(;P&&P.z>=x&&E&&E.z<=R;){if(P.x>=y&&P.x<=S&&P.y>=M&&P.y<=_&&P!==s&&P!==l&&Do(u,p,f,m,h,v,P.x,P.y)&&un(P.prev,P,P.next)>=0||(P=P.prevZ,E.x>=y&&E.x<=S&&E.y>=M&&E.y<=_&&E!==s&&E!==l&&Do(u,p,f,m,h,v,E.x,E.y)&&un(E.prev,E,E.next)>=0))return!1;E=E.nextZ}for(;P&&P.z>=x;){if(P.x>=y&&P.x<=S&&P.y>=M&&P.y<=_&&P!==s&&P!==l&&Do(u,p,f,m,h,v,P.x,P.y)&&un(P.prev,P,P.next)>=0)return!1;P=P.prevZ}for(;E&&E.z<=R;){if(E.x>=y&&E.x<=S&&E.y>=M&&E.y<=_&&E!==s&&E!==l&&Do(u,p,f,m,h,v,E.x,E.y)&&un(E.prev,E,E.next)>=0)return!1;E=E.nextZ}return!0}function cC(i,e,t){let n=i;do{const s=n.prev,a=n.next.next;!Lu(s,a)&&k_(s,n,n.next,a)&&ol(s,a)&&ol(a,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(a.i/t|0),al(n),al(n.next),n=i=a),n=n.next}while(n!==i);return ks(n)}function uC(i,e,t,n,s,a){let l=i;do{let u=l.next.next;for(;u!==l.prev;){if(l.i!==u.i&&_C(l,u)){let f=U_(l,u);l=ks(l,l.next),f=ks(f,f.next),sl(l,e,t,n,s,a,0),sl(f,e,t,n,s,a,0);return}u=u.next}l=l.next}while(l!==i)}function fC(i,e,t,n){const s=[];let a,l,u,f,h;for(a=0,l=e.length;a<l;a++)u=e[a]*n,f=a<l-1?e[a+1]*n:i.length,h=N_(i,u,f,n,!1),h===h.next&&(h.steiner=!0),s.push(yC(h));for(s.sort(dC),a=0;a<s.length;a++)t=hC(s[a],t);return t}function dC(i,e){return i.x-e.x}function hC(i,e){const t=pC(i,e);if(!t)return e;const n=U_(t,i);return ks(n,n.next),ks(t,t.next)}function pC(i,e){let t=e,n=-1/0,s;const a=i.x,l=i.y;do{if(l<=t.y&&l>=t.next.y&&t.next.y!==t.y){const v=t.x+(l-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(v<=a&&v>n&&(n=v,s=t.x<t.next.x?t:t.next,v===a))return s}t=t.next}while(t!==e);if(!s)return null;const u=s,f=s.x,h=s.y;let p=1/0,m;t=s;do a>=t.x&&t.x>=f&&a!==t.x&&Do(l<h?a:n,l,f,h,l<h?n:a,l,t.x,t.y)&&(m=Math.abs(l-t.y)/(a-t.x),ol(t,i)&&(m<p||m===p&&(t.x>s.x||t.x===s.x&&mC(s,t)))&&(s=t,p=m)),t=t.next;while(t!==u);return s}function mC(i,e){return un(i.prev,i,e.prev)<0&&un(e.next,i,i.next)<0}function gC(i,e,t,n){let s=i;do s.z===0&&(s.z=ip(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,vC(s)}function vC(i){let e,t,n,s,a,l,u,f,h=1;do{for(t=i,i=null,a=null,l=0;t;){for(l++,n=t,u=0,e=0;e<h&&(u++,n=n.nextZ,!!n);e++);for(f=h;u>0||f>0&&n;)u!==0&&(f===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,u--):(s=n,n=n.nextZ,f--),a?a.nextZ=s:i=s,s.prevZ=a,a=s;t=n}a.nextZ=null,h*=2}while(l>1);return i}function ip(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function yC(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Do(i,e,t,n,s,a,l,u){return(s-l)*(e-u)>=(i-l)*(a-u)&&(i-l)*(n-u)>=(t-l)*(e-u)&&(t-l)*(a-u)>=(s-l)*(n-u)}function _C(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!xC(i,e)&&(ol(i,e)&&ol(e,i)&&SC(i,e)&&(un(i.prev,i,e.prev)||un(i,e.prev,e))||Lu(i,e)&&un(i.prev,i,i.next)>0&&un(e.prev,e,e.next)>0)}function un(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Lu(i,e){return i.x===e.x&&i.y===e.y}function k_(i,e,t,n){const s=Kc(un(i,e,t)),a=Kc(un(i,e,n)),l=Kc(un(t,n,i)),u=Kc(un(t,n,e));return!!(s!==a&&l!==u||s===0&&qc(i,t,e)||a===0&&qc(i,n,e)||l===0&&qc(t,i,n)||u===0&&qc(t,e,n))}function qc(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Kc(i){return i>0?1:i<0?-1:0}function xC(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&k_(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function ol(i,e){return un(i.prev,i,i.next)<0?un(i,e,i.next)>=0&&un(i,i.prev,e)>=0:un(i,e,i.prev)<0||un(i,i.next,e)<0}function SC(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,a=(i.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&s<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function U_(i,e){const t=new rp(i.i,i.x,i.y),n=new rp(e.i,e.x,e.y),s=i.next,a=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,a.next=n,n.prev=a,n}function Fv(i,e,t,n){const s=new rp(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function al(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function rp(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function MC(i,e,t,n){let s=0;for(let a=e,l=t-n;a<t;a+=n)s+=(i[l]-i[a])*(i[a+1]+i[l+1]),l=a;return s}class Qa{static area(e){const t=e.length;let n=0;for(let s=t-1,a=0;a<t;s=a++)n+=e[s].x*e[a].y-e[a].x*e[s].y;return n*.5}static isClockWise(e){return Qa.area(e)<0}static triangulateShape(e,t){const n=[],s=[],a=[];zv(e),Bv(n,e);let l=e.length;t.forEach(zv);for(let f=0;f<t.length;f++)s.push(l),l+=t[f].length,Bv(n,t[f]);const u=oC.triangulate(n,s);for(let f=0;f<u.length;f+=3)a.push(u.slice(f,f+3));return a}}function zv(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Bv(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Op extends wn{constructor(e=new D_([new $e(.5,.5),new $e(-.5,.5),new $e(-.5,-.5),new $e(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],a=[];for(let u=0,f=e.length;u<f;u++){const h=e[u];l(h)}this.setAttribute("position",new en(s,3)),this.setAttribute("uv",new en(a,2)),this.computeVertexNormals();function l(u){const f=[],h=t.curveSegments!==void 0?t.curveSegments:12,p=t.steps!==void 0?t.steps:1,m=t.depth!==void 0?t.depth:1;let v=t.bevelEnabled!==void 0?t.bevelEnabled:!0,y=t.bevelThickness!==void 0?t.bevelThickness:.2,M=t.bevelSize!==void 0?t.bevelSize:y-.1,S=t.bevelOffset!==void 0?t.bevelOffset:0,_=t.bevelSegments!==void 0?t.bevelSegments:3;const x=t.extrudePath,R=t.UVGenerator!==void 0?t.UVGenerator:wC;let P,E=!1,V,N,D,B;x&&(P=x.getSpacedPoints(p),E=!0,v=!1,V=x.computeFrenetFrames(p,!1),N=new J,D=new J,B=new J),v||(_=0,y=0,M=0,S=0);const L=u.extractPoints(h);let A=L.shape;const U=L.holes;if(!Qa.isClockWise(A)){A=A.reverse();for(let ye=0,Le=U.length;ye<Le;ye++){const W=U[ye];Qa.isClockWise(W)&&(U[ye]=W.reverse())}}const X=Qa.triangulateShape(A,U),ne=A;for(let ye=0,Le=U.length;ye<Le;ye++){const W=U[ye];A=A.concat(W)}function he(ye,Le,W){return Le||console.error("THREE.ExtrudeGeometry: vec does not exist"),ye.clone().addScaledVector(Le,W)}const ae=A.length,Me=X.length;function $(ye,Le,W){let le,Ee,Ue;const Pe=ye.x-Le.x,Je=ye.y-Le.y,ze=W.x-ye.x,H=W.y-ye.y,T=Pe*Pe+Je*Je,G=Pe*H-Je*ze;if(Math.abs(G)>Number.EPSILON){const be=Math.sqrt(T),_e=Math.sqrt(ze*ze+H*H),Ae=Le.x-Je/be,Qe=Le.y+Pe/be,je=W.x-H/_e,et=W.y+ze/_e,Tt=((je-Ae)*H-(et-Qe)*ze)/(Pe*H-Je*ze);le=Ae+Pe*Tt-ye.x,Ee=Qe+Je*Tt-ye.y;const De=le*le+Ee*Ee;if(De<=2)return new $e(le,Ee);Ue=Math.sqrt(De/2)}else{let be=!1;Pe>Number.EPSILON?ze>Number.EPSILON&&(be=!0):Pe<-Number.EPSILON?ze<-Number.EPSILON&&(be=!0):Math.sign(Je)===Math.sign(H)&&(be=!0),be?(le=-Je,Ee=Pe,Ue=Math.sqrt(T)):(le=Pe,Ee=Je,Ue=Math.sqrt(T/2))}return new $e(le/Ue,Ee/Ue)}const z=[];for(let ye=0,Le=ne.length,W=Le-1,le=ye+1;ye<Le;ye++,W++,le++)W===Le&&(W=0),le===Le&&(le=0),z[ye]=$(ne[ye],ne[W],ne[le]);const ee=[];let F,Y=z.concat();for(let ye=0,Le=U.length;ye<Le;ye++){const W=U[ye];F=[];for(let le=0,Ee=W.length,Ue=Ee-1,Pe=le+1;le<Ee;le++,Ue++,Pe++)Ue===Ee&&(Ue=0),Pe===Ee&&(Pe=0),F[le]=$(W[le],W[Ue],W[Pe]);ee.push(F),Y=Y.concat(F)}for(let ye=0;ye<_;ye++){const Le=ye/_,W=y*Math.cos(Le*Math.PI/2),le=M*Math.sin(Le*Math.PI/2)+S;for(let Ee=0,Ue=ne.length;Ee<Ue;Ee++){const Pe=he(ne[Ee],z[Ee],le);xe(Pe.x,Pe.y,-W)}for(let Ee=0,Ue=U.length;Ee<Ue;Ee++){const Pe=U[Ee];F=ee[Ee];for(let Je=0,ze=Pe.length;Je<ze;Je++){const H=he(Pe[Je],F[Je],le);xe(H.x,H.y,-W)}}}const Ce=M+S;for(let ye=0;ye<ae;ye++){const Le=v?he(A[ye],Y[ye],Ce):A[ye];E?(D.copy(V.normals[0]).multiplyScalar(Le.x),N.copy(V.binormals[0]).multiplyScalar(Le.y),B.copy(P[0]).add(D).add(N),xe(B.x,B.y,B.z)):xe(Le.x,Le.y,0)}for(let ye=1;ye<=p;ye++)for(let Le=0;Le<ae;Le++){const W=v?he(A[Le],Y[Le],Ce):A[Le];E?(D.copy(V.normals[ye]).multiplyScalar(W.x),N.copy(V.binormals[ye]).multiplyScalar(W.y),B.copy(P[ye]).add(D).add(N),xe(B.x,B.y,B.z)):xe(W.x,W.y,m/p*ye)}for(let ye=_-1;ye>=0;ye--){const Le=ye/_,W=y*Math.cos(Le*Math.PI/2),le=M*Math.sin(Le*Math.PI/2)+S;for(let Ee=0,Ue=ne.length;Ee<Ue;Ee++){const Pe=he(ne[Ee],z[Ee],le);xe(Pe.x,Pe.y,m+W)}for(let Ee=0,Ue=U.length;Ee<Ue;Ee++){const Pe=U[Ee];F=ee[Ee];for(let Je=0,ze=Pe.length;Je<ze;Je++){const H=he(Pe[Je],F[Je],le);E?xe(H.x,H.y+P[p-1].y,P[p-1].x+W):xe(H.x,H.y,m+W)}}}K(),ce();function K(){const ye=s.length/3;if(v){let Le=0,W=ae*Le;for(let le=0;le<Me;le++){const Ee=X[le];Ie(Ee[2]+W,Ee[1]+W,Ee[0]+W)}Le=p+_*2,W=ae*Le;for(let le=0;le<Me;le++){const Ee=X[le];Ie(Ee[0]+W,Ee[1]+W,Ee[2]+W)}}else{for(let Le=0;Le<Me;Le++){const W=X[Le];Ie(W[2],W[1],W[0])}for(let Le=0;Le<Me;Le++){const W=X[Le];Ie(W[0]+ae*p,W[1]+ae*p,W[2]+ae*p)}}n.addGroup(ye,s.length/3-ye,0)}function ce(){const ye=s.length/3;let Le=0;we(ne,Le),Le+=ne.length;for(let W=0,le=U.length;W<le;W++){const Ee=U[W];we(Ee,Le),Le+=Ee.length}n.addGroup(ye,s.length/3-ye,1)}function we(ye,Le){let W=ye.length;for(;--W>=0;){const le=W;let Ee=W-1;Ee<0&&(Ee=ye.length-1);for(let Ue=0,Pe=p+_*2;Ue<Pe;Ue++){const Je=ae*Ue,ze=ae*(Ue+1),H=Le+le+Je,T=Le+Ee+Je,G=Le+Ee+ze,be=Le+le+ze;Oe(H,T,G,be)}}}function xe(ye,Le,W){f.push(ye),f.push(Le),f.push(W)}function Ie(ye,Le,W){Ge(ye),Ge(Le),Ge(W);const le=s.length/3,Ee=R.generateTopUV(n,s,le-3,le-2,le-1);Ke(Ee[0]),Ke(Ee[1]),Ke(Ee[2])}function Oe(ye,Le,W,le){Ge(ye),Ge(Le),Ge(le),Ge(Le),Ge(W),Ge(le);const Ee=s.length/3,Ue=R.generateSideWallUV(n,s,Ee-6,Ee-3,Ee-2,Ee-1);Ke(Ue[0]),Ke(Ue[1]),Ke(Ue[3]),Ke(Ue[1]),Ke(Ue[2]),Ke(Ue[3])}function Ge(ye){s.push(f[ye*3+0]),s.push(f[ye*3+1]),s.push(f[ye*3+2])}function Ke(ye){a.push(ye.x),a.push(ye.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return EC(t,n,e)}static fromJSON(e,t){const n=[];for(let a=0,l=e.shapes.length;a<l;a++){const u=t[e.shapes[a]];n.push(u)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new tp[s.type]().fromJSON(s)),new Op(n,e.options)}}const wC={generateTopUV:function(i,e,t,n,s){const a=e[t*3],l=e[t*3+1],u=e[n*3],f=e[n*3+1],h=e[s*3],p=e[s*3+1];return[new $e(a,l),new $e(u,f),new $e(h,p)]},generateSideWallUV:function(i,e,t,n,s,a){const l=e[t*3],u=e[t*3+1],f=e[t*3+2],h=e[n*3],p=e[n*3+1],m=e[n*3+2],v=e[s*3],y=e[s*3+1],M=e[s*3+2],S=e[a*3],_=e[a*3+1],x=e[a*3+2];return Math.abs(u-p)<Math.abs(l-h)?[new $e(l,1-f),new $e(h,1-m),new $e(v,1-M),new $e(S,1-x)]:[new $e(u,1-f),new $e(p,1-m),new $e(y,1-M),new $e(_,1-x)]}};function EC(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const a=i[n];t.shapes.push(a.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Fp extends wn{constructor(e=.5,t=1,n=32,s=1,a=0,l=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:a,thetaLength:l},n=Math.max(3,n),s=Math.max(1,s);const u=[],f=[],h=[],p=[];let m=e;const v=(t-e)/s,y=new J,M=new $e;for(let S=0;S<=s;S++){for(let _=0;_<=n;_++){const x=a+_/n*l;y.x=m*Math.cos(x),y.y=m*Math.sin(x),f.push(y.x,y.y,y.z),h.push(0,0,1),M.x=(y.x/t+1)/2,M.y=(y.y/t+1)/2,p.push(M.x,M.y)}m+=v}for(let S=0;S<s;S++){const _=S*(n+1);for(let x=0;x<n;x++){const R=x+_,P=R,E=R+n+1,V=R+n+2,N=R+1;u.push(P,E,N),u.push(E,V,N)}}this.setIndex(u),this.setAttribute("position",new en(f,3)),this.setAttribute("normal",new en(h,3)),this.setAttribute("uv",new en(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fp(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class zp extends wn{constructor(e=1,t=32,n=16,s=0,a=Math.PI*2,l=0,u=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:a,thetaStart:l,thetaLength:u},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const f=Math.min(l+u,Math.PI);let h=0;const p=[],m=new J,v=new J,y=[],M=[],S=[],_=[];for(let x=0;x<=n;x++){const R=[],P=x/n;let E=0;x===0&&l===0?E=.5/t:x===n&&f===Math.PI&&(E=-.5/t);for(let V=0;V<=t;V++){const N=V/t;m.x=-e*Math.cos(s+N*a)*Math.sin(l+P*u),m.y=e*Math.cos(l+P*u),m.z=e*Math.sin(s+N*a)*Math.sin(l+P*u),M.push(m.x,m.y,m.z),v.copy(m).normalize(),S.push(v.x,v.y,v.z),_.push(N+E,1-P),R.push(h++)}p.push(R)}for(let x=0;x<n;x++)for(let R=0;R<t;R++){const P=p[x][R+1],E=p[x][R],V=p[x+1][R],N=p[x+1][R+1];(x!==0||l>0)&&y.push(P,E,N),(x!==n-1||f<Math.PI)&&y.push(E,V,N)}this.setIndex(y),this.setAttribute("position",new en(M,3)),this.setAttribute("normal",new en(S,3)),this.setAttribute("uv",new en(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zp(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Pn extends ta{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Bt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Bt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=u_,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Bp extends In{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Bt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const nh=new Qt,Hv=new J,Vv=new J;class O_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ip,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Hv.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hv),Vv.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vv),t.updateMatrixWorld(),nh.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nh),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(nh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Gv=new Qt,Ha=new J,ih=new J;class bC extends O_{constructor(){super(new ai(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new $e(4,2),this._viewportCount=6,this._viewports=[new Jt(2,1,1,1),new Jt(0,1,1,1),new Jt(3,1,1,1),new Jt(1,1,1,1),new Jt(3,0,1,1),new Jt(1,0,1,1)],this._cubeDirections=[new J(1,0,0),new J(-1,0,0),new J(0,0,1),new J(0,0,-1),new J(0,1,0),new J(0,-1,0)],this._cubeUps=[new J(0,1,0),new J(0,1,0),new J(0,1,0),new J(0,1,0),new J(0,0,1),new J(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,a=e.distance||n.far;a!==n.far&&(n.far=a,n.updateProjectionMatrix()),Ha.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ha),ih.copy(n.position),ih.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ih),n.updateMatrixWorld(),s.makeTranslation(-Ha.x,-Ha.y,-Ha.z),Gv.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gv)}}class TC extends Bp{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new bC}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class AC extends O_{constructor(){super(new M_(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class CC extends Bp{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(In.DEFAULT_UP),this.updateMatrix(),this.target=new In,this.shadow=new AC}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class RC extends Bp{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Wv=new Qt;class jv{constructor(e,t,n=0,s=1/0){this.ray=new Au(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Lp,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Wv.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Wv),this}intersectObject(e,t=!0,n=[]){return sp(e,this,n,t),n.sort($v),n}intersectObjects(e,t=!0,n=[]){for(let s=0,a=e.length;s<a;s++)sp(e[s],this,n,t);return n.sort($v),n}}function $v(i,e){return i.distance-e.distance}function sp(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const a=i.children;for(let l=0,u=a.length;l<u;l++)sp(a[l],e,t,!0)}}class Xv{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ln(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class qv extends ep{constructor(e=10,t=10,n=4473924,s=8947848){n=new Bt(n),s=new Bt(s);const a=t/2,l=e/t,u=e/2,f=[],h=[];for(let v=0,y=0,M=-u;v<=t;v++,M+=l){f.push(-u,0,M,u,0,M),f.push(M,0,-u,M,0,u);const S=v===a?n:s;S.toArray(h,y),y+=3,S.toArray(h,y),y+=3,S.toArray(h,y),y+=3,S.toArray(h,y),y+=3}const p=new wn;p.setAttribute("position",new en(f,3)),p.setAttribute("color",new en(h,3));const m=new Ya({vertexColors:!0,toneMapped:!1});super(p,m),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class PC extends Us{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wp);const Kv={type:"change"},Hp={type:"start"},F_={type:"end"},Yc=new Au,Yv=new Zr,LC=Math.cos(70*Kh.DEG2RAD),Mn=new J,si=2*Math.PI,Zt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},rh=1e-6;class IC extends PC{constructor(e,t=null){super(e,t),this.state=Zt.NONE,this.enabled=!0,this.target=new J,this.cursor=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Mr.ROTATE,MIDDLE:Mr.DOLLY,RIGHT:Mr.PAN},this.touches={ONE:Lo.ROTATE,TWO:Lo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new J,this._lastQuaternion=new Ns,this._lastTargetPosition=new J,this._quat=new Ns().setFromUnitVectors(e.up,new J(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Xv,this._sphericalDelta=new Xv,this._scale=1,this._panOffset=new J,this._rotateStart=new $e,this._rotateEnd=new $e,this._rotateDelta=new $e,this._panStart=new $e,this._panEnd=new $e,this._panDelta=new $e,this._dollyStart=new $e,this._dollyEnd=new $e,this._dollyDelta=new $e,this._dollyDirection=new J,this._mouse=new $e,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=NC.bind(this),this._onPointerDown=DC.bind(this),this._onPointerUp=kC.bind(this),this._onContextMenu=VC.bind(this),this._onMouseWheel=FC.bind(this),this._onKeyDown=zC.bind(this),this._onTouchStart=BC.bind(this),this._onTouchMove=HC.bind(this),this._onMouseDown=UC.bind(this),this._onMouseMove=OC.bind(this),this._interceptControlDown=GC.bind(this),this._interceptControlUp=WC.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Kv),this.update(),this.state=Zt.NONE}update(e=null){const t=this.object.position;Mn.copy(t).sub(this.target),Mn.applyQuaternion(this._quat),this._spherical.setFromVector3(Mn),this.autoRotate&&this.state===Zt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=si:n>Math.PI&&(n-=si),s<-Math.PI?s+=si:s>Math.PI&&(s-=si),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const l=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=l!=this._spherical.radius}if(Mn.setFromSpherical(this._spherical),Mn.applyQuaternion(this._quatInverse),t.copy(this.target).add(Mn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let l=null;if(this.object.isPerspectiveCamera){const u=Mn.length();l=this._clampDistance(u*this._scale);const f=u-l;this.object.position.addScaledVector(this._dollyDirection,f),this.object.updateMatrixWorld(),a=!!f}else if(this.object.isOrthographicCamera){const u=new J(this._mouse.x,this._mouse.y,0);u.unproject(this.object);const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=f!==this.object.zoom;const h=new J(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(u),this.object.updateMatrixWorld(),l=Mn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;l!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(l).add(this.object.position):(Yc.origin.copy(this.object.position),Yc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Yc.direction))<LC?this.object.lookAt(this.target):(Yv.setFromNormalAndCoplanarPoint(this.object.up,this.target),Yc.intersectPlane(Yv,this.target))))}else if(this.object.isOrthographicCamera){const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),l!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>rh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>rh||this._lastTargetPosition.distanceToSquared(this.target)>rh?(this.dispatchEvent(Kv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?si/60*this.autoRotateSpeed*e:si/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Mn.setFromMatrixColumn(t,0),Mn.multiplyScalar(-e),this._panOffset.add(Mn)}_panUp(e,t){this.screenSpacePanning===!0?Mn.setFromMatrixColumn(t,1):(Mn.setFromMatrixColumn(t,0),Mn.crossVectors(this.object.up,Mn)),Mn.multiplyScalar(e),this._panOffset.add(Mn)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Mn.copy(s).sub(this.target);let a=Mn.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*a/n.clientHeight,this.object.matrix),this._panUp(2*t*a/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,a=t-n.top,l=n.width,u=n.height;this._mouse.x=s/l*2-1,this._mouse.y=-(a/u)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(si*this._rotateDelta.x/t.clientHeight),this._rotateUp(si*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(si*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-si*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(si*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-si*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(n*n+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(si*this._rotateDelta.x/t.clientHeight),this._rotateUp(si*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const l=(e.pageX+t.x)*.5,u=(e.pageY+t.y)*.5;this._updateZoomParameters(l,u)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new $e,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function DC(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function NC(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function kC(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(F_),this.state=Zt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function UC(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Mr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Zt.DOLLY;break;case Mr.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Zt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Zt.ROTATE}break;case Mr.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Zt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Zt.PAN}break;default:this.state=Zt.NONE}this.state!==Zt.NONE&&this.dispatchEvent(Hp)}function OC(i){switch(this.state){case Zt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Zt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Zt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function FC(i){this.enabled===!1||this.enableZoom===!1||this.state!==Zt.NONE||(i.preventDefault(),this.dispatchEvent(Hp),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(F_))}function zC(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function BC(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Lo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Zt.TOUCH_ROTATE;break;case Lo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Zt.TOUCH_PAN;break;default:this.state=Zt.NONE}break;case 2:switch(this.touches.TWO){case Lo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Zt.TOUCH_DOLLY_PAN;break;case Lo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Zt.TOUCH_DOLLY_ROTATE;break;default:this.state=Zt.NONE}break;default:this.state=Zt.NONE}this.state!==Zt.NONE&&this.dispatchEvent(Hp)}function HC(i){switch(this._trackPointer(i),this.state){case Zt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Zt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Zt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Zt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Zt.NONE}}function VC(i){this.enabled!==!1&&i.preventDefault()}function GC(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function WC(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class jC extends Jh{constructor(){super();const e=new oi;e.deleteAttribute("uv");const t=new Pn({side:Yn}),n=new Pn,s=new TC(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const a=new Nt(e,t);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);const l=new Nt(e,n);l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),this.add(l);const u=new Nt(e,n);u.position.set(-5.607,-.754,-.758),u.rotation.set(0,.994,0),u.scale.set(1.97,1.534,3.955),this.add(u);const f=new Nt(e,n);f.position.set(6.167,.857,7.803),f.rotation.set(0,.561,0),f.scale.set(3.927,6.285,3.687),this.add(f);const h=new Nt(e,n);h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),this.add(h);const p=new Nt(e,n);p.position.set(2.291,-.756,-2.621),p.rotation.set(0,-.286,0),p.scale.set(1.546,1.552,1.496),this.add(p);const m=new Nt(e,n);m.position.set(-2.193,-.369,-5.547),m.rotation.set(0,.516,0),m.scale.set(3.875,3.487,2.986),this.add(m);const v=new Nt(e,Eo(50));v.position.set(-16.116,14.37,8.208),v.scale.set(.1,2.428,2.739),this.add(v);const y=new Nt(e,Eo(50));y.position.set(-16.109,18.021,-8.207),y.scale.set(.1,2.425,2.751),this.add(y);const M=new Nt(e,Eo(17));M.position.set(14.904,12.198,-1.832),M.scale.set(.15,4.265,6.331),this.add(M);const S=new Nt(e,Eo(43));S.position.set(-.462,8.89,14.52),S.scale.set(4.38,5.441,.088),this.add(S);const _=new Nt(e,Eo(20));_.position.set(3.235,11.486,-12.541),_.scale.set(2.5,2,.1),this.add(_);const x=new Nt(e,Eo(100));x.position.set(0,20,0),x.scale.set(1,.1,1),this.add(x)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Eo(i){const e=new Cu;return e.color.setScalar(i),e}class bo extends In{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new $e(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const To=new J,Zv=new Qt,Jv=new Qt,Qv=new J,ey=new J;class $C{constructor(e={}){const t=this;let n,s,a,l;const u={objects:new WeakMap},f=e.element!==void 0?e.element:document.createElement("div");f.style.overflow="hidden",this.domElement=f,this.getSize=function(){return{width:n,height:s}},this.render=function(M,S){M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),S.parent===null&&S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),Zv.copy(S.matrixWorldInverse),Jv.multiplyMatrices(S.projectionMatrix,Zv),p(M,M,S),y(M)},this.setSize=function(M,S){n=M,s=S,a=n/2,l=s/2,f.style.width=M+"px",f.style.height=S+"px"};function h(M){M.isCSS2DObject&&(M.element.style.display="none");for(let S=0,_=M.children.length;S<_;S++)h(M.children[S])}function p(M,S,_){if(M.visible===!1){h(M);return}if(M.isCSS2DObject){To.setFromMatrixPosition(M.matrixWorld),To.applyMatrix4(Jv);const x=To.z>=-1&&To.z<=1&&M.layers.test(_.layers)===!0,R=M.element;R.style.display=x===!0?"":"none",x===!0&&(M.onBeforeRender(t,S,_),R.style.transform="translate("+-100*M.center.x+"%,"+-100*M.center.y+"%)translate("+(To.x*a+a)+"px,"+(-To.y*l+l)+"px)",R.parentNode!==f&&f.appendChild(R),M.onAfterRender(t,S,_));const P={distanceToCameraSquared:m(_,M)};u.objects.set(M,P)}for(let x=0,R=M.children.length;x<R;x++)p(M.children[x],S,_)}function m(M,S){return Qv.setFromMatrixPosition(M.matrixWorld),ey.setFromMatrixPosition(S.matrixWorld),Qv.distanceToSquared(ey)}function v(M){const S=[];return M.traverseVisible(function(_){_.isCSS2DObject&&S.push(_)}),S}function y(M){const S=v(M).sort(function(x,R){if(x.renderOrder!==R.renderOrder)return R.renderOrder-x.renderOrder;const P=u.objects.get(x).distanceToCameraSquared,E=u.objects.get(R).distanceToCameraSquared;return P-E}),_=S.length;for(let x=0,R=S.length;x<R;x++)S[x].element.style.zIndex=_-x}}}function XC(i){const e=i.size[0]/2,t=(i.size[1]??i.size[0])/2,n=i.slot.width/2,{lipDepth:s,cavityWidth:a,cavityDepth:l}=i.geometry,u=a/2,f=(S,_)=>{const x=_-s,R=_-s-l;return[[S-n,_],[S-n,x],[S-u,x],[S-u,R],[S+u,R],[S+u,x],[S+n,x],[S+n,_]]},h=(S,_,x)=>{const R=[[-S,_]];for(const P of[...x].sort((E,V)=>E-V))R.push(...f(P,_));return R.push([S,_]),R},p=(S,_)=>{var x;return((x=i.faces.find(R=>R.normal[0]===S&&R.normal[1]===_))==null?void 0:x.slots.map(R=>R.offset))??[]},m=[],v=(S,_)=>{for(const[x,R]of S)m.push(_(x,R))};v(h(e,t,p(0,1)),(S,_)=>[S,_]),v(h(t,e,p(1,0).map(S=>-S)),(S,_)=>[_,-S]),v(h(e,t,p(0,-1).map(S=>-S)),(S,_)=>[-S,-_]),v(h(t,e,p(-1,0)),(S,_)=>[-_,S]);const y=(S,_)=>(S[0]-_[0])**2+(S[1]-_[1])**2,M=m.filter((S,_)=>_===0||y(S,m[_-1])>1e-6);return M.length>1&&y(M[0],M[M.length-1])<1e-6&&M.pop(),M}function qC(i){return(i.coreHolePositions??[[0,0]]).map(([e,t])=>({x:e,y:t,r:i.coreHole.diameter/2}))}function KC(i){const e=new D_(XC(i).map(([t,n])=>new $e(t,n)));for(const{x:t,y:n,r:s}of qC(i)){const a=new np;a.absarc(t,n,s,0,Math.PI*2,!0),e.holes.push(a)}return e}function YC(i,e){const t=new Op(i,{depth:e,bevelEnabled:!1,curveSegments:12});return t.translate(0,0,-e/2),t}const ty=1994751,ZC=15237946,ny={silver:12896719,black:2764090,gold:13215820},iy=new Map;function el(i,e,t){const n=iy.get(i);if(n)return n;const s=document.createElement("canvas");s.width=s.height=e;const a=s.getContext("2d");t(a,e);const l=new C_(s);return l.wrapS=l.wrapT=cu,l.anisotropy=4,iy.set(i,l),l}const ry=new Map;function JC(i=512){const e=ry.get(i);if(e)return e;const t=i/16,n=t*.1,s=el(`pegboard-c-${i}`,i,(f,h)=>{f.fillStyle="#cfb896",f.fillRect(0,0,h,h);for(let p=t/2;p<h;p+=t)for(let m=t/2;m<h;m+=t){const v=f.createRadialGradient(m,p,0,m,p,n*1.3);v.addColorStop(0,"#2a1f10"),v.addColorStop(.7,"#3d2c18"),v.addColorStop(1,"#5a4530"),f.beginPath(),f.arc(m,p,n,0,Math.PI*2),f.fillStyle=v,f.fill(),f.lineWidth=n*.35,f.strokeStyle="#ddc9a3",f.stroke()}}),a=el(`pegboard-b-${i}`,i,(f,h)=>{f.fillStyle="#808080",f.fillRect(0,0,h,h);for(let p=t/2;p<h;p+=t)for(let m=t/2;m<h;m+=t){const v=f.createRadialGradient(m,p,0,m,p,n*1.5);v.addColorStop(0,"#000000"),v.addColorStop(.8,"#303030"),v.addColorStop(1,"#808080"),f.beginPath(),f.arc(m,p,n*1.3,0,Math.PI*2),f.fillStyle=v,f.fill()}}),l=el(`pegboard-a-${i}`,i,(f,h)=>{f.fillStyle="#ffffff",f.fillRect(0,0,h,h);for(let p=t/2;p<h;p+=t)for(let m=t/2;m<h;m+=t)f.beginPath(),f.arc(m,p,n*1.1,0,Math.PI*2),f.fillStyle="#000000",f.fill()}),u={color:s,bump:a,alpha:l};return ry.set(i,u),u}function QC(i=512){const e=el(`wire-c-${i}`,i,(n,s)=>{n.fillStyle="#1a1c20",n.fillRect(0,0,s,s);const a=s/16,l=a*.12;for(let u=0;u<=s;u+=a){const f=n.createLinearGradient(0,u-l,0,u+l);f.addColorStop(0,"#5a6068"),f.addColorStop(.5,"#c8d0d8"),f.addColorStop(1,"#5a6068"),n.strokeStyle=f,n.lineWidth=l,n.beginPath(),n.moveTo(u,0),n.lineTo(u,s),n.stroke(),n.beginPath(),n.moveTo(0,u),n.lineTo(s,u),n.stroke()}}),t=el(`wire-b-${i}`,i,(n,s)=>{n.fillStyle="#202020",n.fillRect(0,0,s,s);const a=s/16,l=a*.12;for(let u=0;u<=s;u+=a)n.strokeStyle="#d0d0d0",n.lineWidth=l,n.beginPath(),n.moveTo(u,0),n.lineTo(u,s),n.stroke(),n.beginPath(),n.moveTo(0,u),n.lineTo(s,u),n.stroke()});return{color:e,bump:t}}function eR(i,e,t){const n=new wn,s=[],a=[],l=[],u=(m,v,y,M,S,_,x,R)=>{const P=[m,v,y,M],E=s.length/3;for(const V of P){s.push(V[0],V[1],V[2]);const N=S==="x"?V[0]:S==="y"?V[1]:V[2],D=_==="x"?V[0]:_==="y"?V[1]:V[2];a.push(N/sy,D/sy)}l.push(E,E+1,E+2,E,E+2,E+3)},f=i/2,h=e/2,p=t/2;return u([f,-h,-p],[f,h,-p],[f,h,p],[f,-h,p],"z","y"),u([-f,-h,p],[-f,h,p],[-f,h,-p],[-f,-h,-p],"z","y"),u([-f,h,-p],[-f,h,p],[f,h,p],[f,h,-p],"x","z"),u([-f,-h,p],[-f,-h,-p],[f,-h,-p],[f,-h,p],"x","z"),u([-f,-h,p],[f,-h,p],[f,h,p],[-f,h,p],"x","y"),u([f,-h,-p],[-f,-h,-p],[-f,h,-p],[f,h,-p],"x","y"),n.setAttribute("position",new en(s,3)),n.setAttribute("uv",new en(a,2)),n.setIndex(l),n.computeVertexNormals(),n}const sy=400,oy={wood:()=>new Pn({color:11570519,roughness:.8,metalness:.05}),pegboard:()=>new Pn({color:13213802,roughness:.75,metalness:.05}),glass:()=>new Pn({color:11063264,roughness:.1,metalness:.1,transparent:!0,opacity:.35,depthWrite:!1}),acrylic:()=>new Pn({color:15922936,roughness:.15,metalness:.05,transparent:!0,opacity:.45,depthWrite:!1}),"wire-mesh":()=>new Pn({color:10134445,roughness:.6,metalness:.5,transparent:!0,opacity:.35,depthWrite:!1})},tR={pegboard:JC,"wire-mesh":QC};function nR({items:i,joints:e,machining:t,panels:n,accessories:s,mountPoints:a,dims:l,drawing:u,bubbles:f,viewRequest:h,focusY:p,onSelect:m,selection:v,warnMemberIds:y,profileColor:M,highlightedPartNo:S}){const _=xt.useRef(null),x=xt.useRef(null),R=xt.useRef(m);R.current=m;const P=xt.useRef(!1);return xt.useEffect(()=>{const E=_.current,V=new Jh;V.background=new Bt(15265268);const N=new ai(50,E.clientWidth/E.clientHeight,5,4e4);N.position.set(1e3,780,1250);const D=new Iv({antialias:!0});D.setSize(E.clientWidth,E.clientHeight),D.setPixelRatio(devicePixelRatio),D.toneMapping=Jy,D.toneMappingExposure=.9,E.appendChild(D.domElement);const B=new $C;B.setSize(E.clientWidth,E.clientHeight),B.domElement.style.position="absolute",B.domElement.style.top="0",B.domElement.style.pointerEvents="none",E.appendChild(B.domElement);const L=new Yh(D);V.environment=L.fromScene(new jC,.04).texture;const A=new IC(N,D.domElement);A.minDistance=120,A.maxDistance=4500,A.mouseButtons={LEFT:Mr.ROTATE,MIDDLE:Mr.DOLLY,RIGHT:Mr.PAN};const U=new CC(16777215,2);U.position.set(600,1e3,400),V.add(U),V.add(new RC(16777215,.4));const q=new qv(6e3,120,13686754,13686754);q.material.transparent=!0,q.material.opacity=.5,V.add(q);const X=new qv(6e3,24,12108498,12108498);V.add(X);const ne=Ge=>new Ya({color:Ge}),he=new Qh(new wn().setFromPoints([new J(-3e3,.5,0),new J(3e3,.5,0)]),ne(14699066)),ae=new Qh(new wn().setFromPoints([new J(0,.5,-3e3),new J(0,.5,3e3)]),ne(3842138));V.add(he,ae);const Me=new Ps;V.add(Me);const $=new Ps;V.add($);const z=new Iv({antialias:!0,alpha:!0});z.setSize(104,104),Object.assign(z.domElement.style,{position:"absolute",top:"14px",right:"14px",cursor:"pointer"}),E.appendChild(z.domElement);const ee=new Jh,F=new ai(45,1,.1,10);F.position.set(0,0,4);const Y=Ge=>{const Ke=document.createElement("canvas");Ke.width=Ke.height=128;const ye=Ke.getContext("2d");return ye.fillStyle="#f4f7fb",ye.fillRect(0,0,128,128),ye.strokeStyle="#b8c2d2",ye.lineWidth=6,ye.strokeRect(3,3,122,122),ye.fillStyle="#44536b",ye.font="bold 44px system-ui",ye.textAlign="center",ye.textBaseline="middle",ye.fillText(Ge,64,68),new Cu({map:new C_(Ke)})},Ce=new Nt(new oi(1.7,1.7,1.7),[Y("右"),Y("左"),Y("上"),Y("下"),Y("前"),Y("后")]);ee.add(Ce);let K=null;const ce=Ge=>{const Ke=Ge.clone();Math.abs(Ke.y)>.99&&(Ke.z=.02),Ke.normalize();const ye=N.position.distanceTo(A.target);K={from:N.position.clone(),to:A.target.clone().addScaledVector(Ke,ye),t:0}};z.domElement.addEventListener("click",Ge=>{const Ke=z.domElement.getBoundingClientRect(),ye=new $e((Ge.clientX-Ke.left)/Ke.width*2-1,-((Ge.clientY-Ke.top)/Ke.height)*2+1),Le=new jv;Le.setFromCamera(ye,F);const W=Le.intersectObject(Ce,!1)[0];W!=null&&W.face&&ce(W.face.normal.clone())}),D.setAnimationLoop(()=>{if(K){K.t=Math.min(1,K.t+.07);const Ge=K.t*K.t*(3-2*K.t);N.position.lerpVectors(K.from,K.to,Ge),A.update(),K.t>=1&&(K=null)}D.render(V,N),B.render(V,N),Ce.quaternion.copy(N.quaternion).invert(),z.render(ee,F)});const we=new Ps;V.add(we);const xe=new jv;let Ie=null;D.domElement.addEventListener("pointerdown",Ge=>{Ie=[Ge.clientX,Ge.clientY]}),D.domElement.addEventListener("pointerup",Ge=>{var Je,ze;if(!Ie)return;const Ke=Math.hypot(Ge.clientX-Ie[0],Ge.clientY-Ie[1]);if(Ie=null,Ke>5)return;const ye=D.domElement.getBoundingClientRect(),Le=new $e((Ge.clientX-ye.left)/ye.width*2-1,-((Ge.clientY-ye.top)/ye.height)*2+1);xe.setFromCamera(Le,N);const W=x.current;if(!W)return;const le=[];W.group.traverse(H=>{var T,G;((G=(T=H.userData)==null?void 0:T.sel)==null?void 0:G.type)==="panel"&&le.push(H)});const Ee=[...W.memberMeshes.values(),...[...W.jointMeshes.values()].flat(),...le],Pe=(Je=xe.intersectObjects(Ee,!1)[0])==null?void 0:Je.object;(ze=R.current)==null||ze.call(R,(Pe==null?void 0:Pe.userData.sel)??null)});const Oe=new ResizeObserver(()=>{N.aspect=E.clientWidth/E.clientHeight,N.updateProjectionMatrix(),D.setSize(E.clientWidth,E.clientHeight),B.setSize(E.clientWidth,E.clientHeight)});return Oe.observe(E),x.current={scene:V,camera:N,renderer:D,controls:A,group:we,raycaster:xe,memberMeshes:new Map,jointMeshes:new Map,dimGroup:Me,bubbleGroup:$,decor:[q,X,he,ae],requestView:ce},()=>{Oe.disconnect(),D.setAnimationLoop(null),D.dispose(),z.dispose(),L.dispose(),E.removeChild(D.domElement),E.removeChild(B.domElement),E.removeChild(z.domElement),x.current=null}},[]),xt.useEffect(()=>{var Me,$;const E=x.current;if(!E)return;for(const z of[...E.group.children]){if(E.group.remove(z),z instanceof bo){z.element.remove();continue}(Me=z.geometry)==null||Me.dispose()}E.memberMeshes.clear(),E.jointMeshes.clear();const V=new Map,N=ny[M??"silver"]??ny.silver,D=u?16317180:N,B=new Ya(u?{color:3095117,transparent:!0,opacity:.9}:{color:7041664,transparent:!0,opacity:.35});for(const z of i){const ee=`${z.section.id}:${z.length}`;let F=V.get(ee);if(!F){const we=YC(KC(z.section),z.length);F={geom:we,edges:new sC(we,25)},V.set(ee,F)}const Y=S!=null&&z.partNo===S,Ce=u?new Pn({color:D,metalness:0,roughness:1}):new Pn({color:D,metalness:.9,roughness:.38,envMapIntensity:.9,emissive:Y?1994751:0,emissiveIntensity:Y?.4:0}),K=new Nt(F.geom,Ce);z.axis==="x"?K.rotation.y=Math.PI/2:z.axis==="y"&&(K.rotation.x=-Math.PI/2),z.tilt&&K.rotation.set(0,Math.PI/2,z.tilt,"ZYX"),K.position.set(...z.position),z.role!=="post"&&(K.scale.z=(z.length-.3)/z.length),K.userData.sel={type:"member",id:z.id},K.userData.member=z,K.userData.baseColor=D,K.userData.baseColor=D,E.group.add(K),E.memberMeshes.set(z.id,K);const ce=new ep(F.edges,B);ce.rotation.copy(K.rotation),ce.position.copy(K.position),ce.scale.copy(K.scale),E.group.add(ce)}for(const z of e){const ee=z.size,F=Math.max(3,ee*.12),[Y,Ce,K]=z.position,ce=[],we={type:"joint",id:z.id};if(z.hidden){const xe=new Pn({color:3065046,metalness:.3,roughness:.3,transparent:!0,opacity:.65,depthTest:!1}),Ie=ee*1.4,Oe=new Nt(new gr(ee*.14,ee*.14,Ie,16),xe);z.beamAxis==="x"?Oe.rotation.z=Math.PI/2:Oe.rotation.x=Math.PI/2,Oe.position.set(Y,Ce,K),Oe.renderOrder=999,Oe.userData.sel=we,E.group.add(Oe),ce.push(Oe)}else{const xe=new Pn({color:9080726,metalness:.9,roughness:.4}),Ie=Ce+z.ySide*(ee/2),Oe=new Nt(new oi(z.beamAxis==="x"?F:ee*.8,ee*.8,z.beamAxis==="x"?ee*.8:F),xe),Ge=z.outward*(F/2);Oe.position.set(z.beamAxis==="x"?Y-Ge:Y,Ie+z.ySide*(ee*.4),z.beamAxis==="x"?K:K-Ge),Oe.userData.sel=we,E.group.add(Oe),ce.push(Oe);const Ke=new Nt(new oi(ee*.8,F,ee*.8),xe);Ke.position.set(z.beamAxis==="x"?Y-z.outward*(ee*.4):Y,Ie+z.ySide*(F/2),z.beamAxis==="x"?K:K-z.outward*(ee*.4)),Ke.userData.sel=we,E.group.add(Ke),ce.push(Ke)}E.jointMeshes.set(z.id,ce)}const L=new Pn({color:2303789,metalness:.2,roughness:.85}),A=new Pn({color:10133672,metalness:.7,roughness:.45}),U=(z,ee,F)=>{ee==="y"?z.rotation.x=F===1?-Math.PI/2:Math.PI/2:ee==="x"?z.rotation.y=F===1?Math.PI/2:-Math.PI/2:F===-1&&(z.rotation.y=Math.PI)};for(const z of t){const ee=new Nt(new Up(z.d/2,24),L);if(U(ee,z.axis,z.dir),ee.position.set(...z.position),E.group.add(ee),z.D){const F=new Nt(new Fp(z.d/2,z.D/2,24),A);U(F,z.axis,z.dir),F.position.set(...z.position),E.group.add(F)}}const q=[];E.group.traverse(z=>{var ee,F;((F=(ee=z.userData)==null?void 0:ee.sel)==null?void 0:F.type)==="panel"&&q.push(z)});for(const z of q)E.group.remove(z),z.geometry.dispose(),($=z.material)==null||$.dispose();for(const z of n){const ee=(oy[z.material]??oy.wood)(),F=tR[z.material],[Y,Ce,K]=z.boxSize;if(F){const we=F();ee.map=we.color,ee.bumpMap=we.bump,we.alpha&&(ee.alphaMap=we.alpha,ee.transparent=!0)}const ce=new Nt(eR(Math.abs(Y),Math.abs(Ce),Math.abs(K)),ee);ce.position.set(...z.position),ce.userData.sel={type:"panel",id:z.id},ce.userData.baseColor=ee.color.getHex(),ee.transparent&&(ce.renderOrder=1),E.group.add(ce)}const X=new Pn({color:2764081,roughness:.7}),ne=new Pn({color:9080726,metalness:.8,roughness:.4});for(const z of s){if(z.kind==="led-strip"){const Y=new Nt(new oi(z.lengthMm??500,6,10),new Pn({color:16774872,emissive:16769162,emissiveIntensity:1.4}));Y.position.set(...z.position),E.group.add(Y);continue}if(z.kind==="drawer-box"){const[Y,Ce,K]=z.boxSize??[200,140,300],ce=new Nt(new oi(Y,Ce,K),new Pn({color:13616302,roughness:.8}));ce.position.set(...z.position),E.group.add(ce);continue}if(z.kind==="drawer-slide"){const[Y,Ce,K]=z.boxSize??[400,35,350];for(const ce of[-1,1]){const we=new Nt(new oi(12,Ce,K),ne);we.position.set(z.position[0]+ce*(Y/2-6),z.position[1],z.position[2]),E.group.add(we)}continue}if(z.kind==="hinge"){const[Y,Ce,K]=z.boxSize??[40,55,10],ce=new Nt(new oi(Y,Ce,K),ne);ce.position.set(...z.position),E.group.add(ce);continue}if(z.kind==="handle"){const[Y,Ce]=z.boxSize??[14,130,14],K=Y>Ce,ce=K?Y:Ce,we=new Nt(new gr(6,6,ce,12),ne);K&&(we.rotation.z=Math.PI/2),we.position.set(z.position[0],z.position[1],z.position[2]+22),E.group.add(we);const xe=z.lengthMm??96;for(const Ie of[-xe/2,xe/2]){const Oe=new Nt(new gr(4,4,22,10),ne);Oe.rotation.x=Math.PI/2,Oe.position.set(z.position[0]+(K?Ie:0),z.position[1]+(K?0:Ie),z.position[2]+11),E.group.add(Oe)}continue}if(z.kind==="magnetic-catch"){const Y=new Nt(new oi(...z.boxSize??[30,16,14]),X);Y.position.set(...z.position),E.group.add(Y);continue}if(z.kind==="leveling-foot"){const Y=new Nt(new gr(20,24,12,16),X);Y.position.set(z.position[0],z.position[1]-12,z.position[2]),E.group.add(Y);const Ce=new Nt(new gr(4,4,30,12),ne);Ce.position.set(z.position[0],z.position[1]+10,z.position[2]),E.group.add(Ce);continue}const ee=new Nt(new gr(25,25,20,20),X);ee.rotation.x=Math.PI/2,ee.position.set(z.position[0],z.position[1],z.position[2]),E.group.add(ee);const F=new Nt(new gr(5,5,35,12),ne);F.position.set(z.position[0],z.position[1]+28,z.position[2]),E.group.add(F)}if(a.length){const z=new Pn({color:1994751,transparent:!0,opacity:.85,depthTest:!1});for(const ee of a){const F=new Nt(new zp(6,12,12),z);if(F.position.set(...ee.position),F.renderOrder=997,E.group.add(F),ee.label){const Y=document.createElement("div");Y.textContent=ee.label,Y.title=ee.note??"",Y.style.cssText="font:600 10px system-ui;color:#fff;background:#1e6fff;border-radius:8px;padding:1px 5px;cursor:help;pointer-events:auto;transform:translateY(-12px)";const Ce=new bo(Y);Ce.position.set(...ee.position),E.group.add(Ce)}}}const he=s.filter(z=>z.kind==="caster"||z.kind==="leveling-foot"),ae=he.length?Math.min(...he.map(z=>z.position[1]-(z.kind==="caster"?25:18))):0;E.decor.forEach(z=>{z.position.y=ae}),E.controls.target.set(0,p,0),E.controls.update()},[i,e,t,n,s,a,p,u]),xt.useEffect(()=>{const E=x.current;if(!E)return;const V=!!u;if(E.scene.background=new Bt(V?16777215:15265268),E.decor.forEach(N=>{N.visible=!V}),P.current!==V){const N=E.camera,D=N.fov,B=V?15:50,L=Math.tan(Kh.degToRad(D/2))/Math.tan(Kh.degToRad(B/2));N.fov=B,N.updateProjectionMatrix();const A=N.position.distanceTo(E.controls.target),U=N.position.clone().sub(E.controls.target).normalize();N.position.copy(E.controls.target).addScaledVector(U,A*L*(V?1.25:.8)),E.controls.minDistance=V?800:120,E.controls.maxDistance=V?3e4:4500,E.controls.update(),P.current=V}},[u]),xt.useEffect(()=>{const E=x.current;if(E){for(const V of[...E.bubbleGroup.children])E.bubbleGroup.remove(V),V instanceof bo&&V.element.remove();for(const V of f??[]){const N=document.createElement("div");Object.assign(N.style,{width:"26px",height:"26px",borderRadius:"50%",border:"2px solid #2f3a4d",background:"#fff",color:"#2f3a4d",font:"bold 11px system-ui",display:"flex",alignItems:"center",justifyContent:"center"}),N.textContent=V.label;const D=new bo(N);D.position.set(...V.position),E.bubbleGroup.add(D)}}},[f]),xt.useEffect(()=>{var E;h&&((E=x.current)==null||E.requestView(new J(...h.dir)))},[h==null?void 0:h.seq]),xt.useEffect(()=>{const E=x.current;if(!E)return;const V=(v==null?void 0:v.type)==="member"?v.id:null,N=(v==null?void 0:v.type)==="joint"?v.id:null,D=new Set(y??[]);for(const[L,A]of E.memberMeshes){const U=A.material;L===V?(U.color.setHex(ty),U.metalness=.4,U.roughness=.35,U.emissive.setHex(666214)):D.has(L)?(U.color.setHex(ZC),U.metalness=.5,U.roughness=.4,U.emissive.setHex(4858888)):(U.color.setHex(A.userData.baseColor??12896719),U.metalness=u?0:.9,U.roughness=u?1:.38,U.emissive.setHex(0))}for(const[L,A]of E.jointMeshes)for(const U of A){const q=U.material;q.emissive.setHex(L===N?1994751:0),q.emissiveIntensity=L===N?.6:1}const B=(v==null?void 0:v.type)==="panel"?v.id:null;E.group.traverse(L=>{var U,q;const A=L;if(((q=(U=A.userData)==null?void 0:U.sel)==null?void 0:q.type)==="panel"){const X=A.material;X&&(A.userData.sel.id===B?(X.color.setHex(1994751),X.emissive.setHex(1994751),X.emissiveIntensity=.5):(X.color.setHex(A.userData.baseColor??11570519),X.emissive.setHex(0),X.emissiveIntensity=0))}})},[v,i,y,u]),xt.useEffect(()=>{var N;const E=x.current;if(!E)return;for(const D of[...E.dimGroup.children])E.dimGroup.remove(D),D instanceof bo?D.element.remove():(N=D.geometry)==null||N.dispose();const V=new Ya({color:ty});for(const D of l){const B=new J(...D.a),L=new J(...D.b),A=new J(...D.offset),U=B.clone().add(A),q=L.clone().add(A),X=new wn().setFromPoints([U,q,B,U,L,q]),ne=new ep(X,V);ne.frustumCulled=!1,E.dimGroup.add(ne);const he=document.createElement("div");Object.assign(he.style,{background:"#1e6fff",color:"#fff",padding:"2px 10px",borderRadius:"10px",fontSize:"12px",fontFamily:"system-ui, sans-serif",whiteSpace:"nowrap"}),he.textContent=D.label;const ae=new bo(he);ae.position.copy(U.clone().add(q).multiplyScalar(.5).add(A.clone().multiplyScalar(.35))),E.dimGroup.add(ae)}},[l]),O.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[O.jsx("div",{ref:_,style:{position:"relative",width:"100%",height:"100%"}}),O.jsx("div",{style:{position:"absolute",bottom:14,left:"50%",transform:"translateX(-50%)",background:"rgba(255,255,255,.92)",padding:"7px 18px",borderRadius:20,fontSize:12,color:"#555",boxShadow:"0 2px 8px rgba(0,0,0,.08)",whiteSpace:"nowrap"},children:"左键旋转 · 右键平移 · 滚轮缩放 · 点击构件/连接件查看，选中构件可改尺寸"})]})}const ay={y1:"上表面","y-1":"下表面",z1:"前面","z-1":"背面",x1:"右侧面","x-1":"左侧面",end:"端面"},iR=i=>ay[i.replace("+","1").replace("--","-")]??ay[i]??i;function rR({item:i,sectionSize:e,tolerance:t,onClose:n}){const u=460/i.length,f=Math.max(18,Math.min(34,e*u*4)),h=i.ops.filter(R=>R.face!=="end"),p=i.ops.filter(R=>R.face==="end"),m=[...new Set(h.map(R=>R.face))],v=64,y=46,M=y+Math.max(m.length,1)*v+46+(p.length?22:0);let S=y;const _=m.map(R=>{const P=h.filter(V=>V.face===R).sort((V,N)=>V.fromStart-N.fromStart),E=S;return S+=v,{face:R,ops:P,y:E}}),x=S+14;return O.jsxs("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"#fff",borderRadius:10,boxShadow:"0 8px 40px rgba(0,0,0,.25)",padding:"14px 18px",zIndex:30},children:[O.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:12,marginBottom:6,fontSize:13},children:[O.jsxs("b",{style:{fontSize:16},children:[i.partNo," 单件加工图"]}),O.jsx("span",{children:i.sectionId}),O.jsxs("span",{children:["L=",i.length,"mm（",t,"）"]}),O.jsxs("span",{children:["×",i.qty," 件"]}),O.jsx("div",{style:{flex:1}}),O.jsx("button",{onClick:n,style:{border:"none",background:"transparent",cursor:"pointer",fontSize:16,color:"#888"},children:"✕"})]}),O.jsxs("svg",{width:560,height:M,style:{display:"block",background:"#fff"},children:[_.map(({face:R,ops:P,y:E})=>O.jsxs("g",{children:[O.jsxs("text",{x:60,y:E-8,fontSize:11,fill:"#555",children:["打孔面：",iR(R),"（",R,"）"]}),O.jsx("rect",{x:60,y:E,width:460,height:f,fill:"#f4f6f9",stroke:"#2f3a4d",strokeWidth:1.2}),P.map((V,N)=>{const D=60+V.fromStart*u,B=E+f/2,L=Math.max(3,V.diameter*u/2);return O.jsxs("g",{children:[O.jsx("circle",{cx:D,cy:B,r:L,fill:"none",stroke:"#c0392b",strokeWidth:1.2}),O.jsx("line",{x1:D-L-4,y1:B,x2:D+L+4,y2:B,stroke:"#c0392b",strokeWidth:.6,strokeDasharray:"4 2"}),O.jsx("line",{x1:D,y1:B-L-4,x2:D,y2:B+L+4,stroke:"#c0392b",strokeWidth:.6,strokeDasharray:"4 2"}),O.jsx("line",{x1:60,y1:E-18-N%2*12,x2:D,y2:E-18-N%2*12,stroke:"#1e6fff",strokeWidth:.8}),O.jsx("line",{x1:D,y1:E-18-N%2*12,x2:D,y2:B-L-4,stroke:"#1e6fff",strokeWidth:.5,strokeDasharray:"3 2"}),O.jsx("text",{x:(60+D)/2,y:E-21-N%2*12,fontSize:10,fill:"#1e6fff",textAnchor:"middle",children:V.fromStart}),O.jsx("text",{x:D,y:E+f+13,fontSize:10,fill:"#c0392b",textAnchor:"middle",children:V.spec})]},N)}),O.jsx("line",{x1:60,y1:E-30,x2:60,y2:E+f,stroke:"#1e6fff",strokeWidth:1}),O.jsx("text",{x:56,y:E-20,fontSize:9,fill:"#1e6fff",textAnchor:"end",children:"基准"})]},R)),m.length===0&&O.jsxs("g",{children:[O.jsx("rect",{x:60,y,width:460,height:f,fill:"#f4f6f9",stroke:"#2f3a4d",strokeWidth:1.2}),O.jsx("text",{x:60+460/2,y:y+f/2+4,fontSize:11,fill:"#888",textAnchor:"middle",children:"无侧面加工"})]}),O.jsx("line",{x1:60,y1:x,x2:520,y2:x,stroke:"#2f3a4d",strokeWidth:1}),O.jsx("line",{x1:60,y1:x-5,x2:60,y2:x+5,stroke:"#2f3a4d",strokeWidth:1}),O.jsx("line",{x1:520,y1:x-5,x2:520,y2:x+5,stroke:"#2f3a4d",strokeWidth:1}),O.jsxs("text",{x:60+460/2,y:x-5,fontSize:12,fill:"#2f3a4d",textAnchor:"middle",fontWeight:600,children:[i.length,"（",t,"）"]}),p.length>0&&O.jsxs("text",{x:60,y:M-8,fontSize:11,fill:"#b7791f",children:["端面加工：",p.map(R=>`${R.spec}（${R.fromStart<i.length/2?"起端":"末端"}中心）`).join("，")]})]}),O.jsx("div",{style:{fontSize:11,color:"#999",marginTop:4},children:"孔位自左端基准面起算 · 单位 mm · 孔口双面去毛刺+锐边倒钝 · 镜像件不共用本图"})]})}function $a({title:i,icon:e,defaultOpen:t=!1,children:n,badge:s}){const[a,l]=xt.useState(t);return O.jsxs("div",{style:{marginBottom:2,borderBottom:"1px solid #eef0f3"},children:[O.jsxs("button",{onClick:()=>l(u=>!u),style:{display:"flex",alignItems:"center",gap:6,width:"100%",padding:"9px 0",background:"none",border:"none",cursor:"pointer",fontSize:12,fontWeight:600,color:"#3a4050",textAlign:"left"},children:[O.jsx("span",{style:{transform:a?"rotate(90deg)":"rotate(0deg)",transition:"transform 0.15s",fontSize:10,color:"#8a90a0",width:12,display:"inline-block"},children:"▶"}),e&&O.jsx("span",{style:{fontSize:14},children:e}),O.jsx("span",{style:{flex:1},children:i}),s!=null&&O.jsx("span",{style:{fontSize:10,background:"#e8edf4",color:"#6b7280",borderRadius:8,padding:"1px 7px",fontWeight:400},children:s})]}),a&&O.jsx("div",{style:{paddingBottom:10},children:n})]})}function sR({cc:i,onChange:e}){var t,n,s,a;return!(i!=null&&i.left)&&!(i!=null&&i.right)?null:O.jsxs($a,{title:"中柱分区",icon:"▐▌",defaultOpen:!0,children:[O.jsxs("div",{style:{marginBottom:8},children:[O.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:2},children:[O.jsx("span",{style:{fontSize:10,color:"#6b7280"},children:"中柱位置"}),O.jsxs("span",{style:{fontSize:11,color:"#3769b2",fontWeight:600},children:[Math.round(i.offsetRatio*100),"%"]})]}),O.jsx("input",{type:"range",min:20,max:80,step:1,value:Math.round(i.offsetRatio*100),onChange:l=>e({offsetRatio:Number(l.target.value)/100}),style:{width:"100%",height:3}})]}),O.jsxs("div",{style:{display:"flex",gap:6},children:[O.jsxs("label",{style:{flex:1},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:"左列"}),O.jsxs("select",{value:((t=i.left)==null?void 0:t.type)??"",onChange:l=>{var u;return e({left:l.target.value===""?void 0:{type:l.target.value,count:((u=i.left)==null?void 0:u.count)??2}})},style:{width:"100%",marginTop:2,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:[O.jsx("option",{value:"",children:"空"}),O.jsx("option",{value:"drawer",children:"抽屉"}),O.jsx("option",{value:"shelf",children:"隔板"}),O.jsx("option",{value:"cabinet",children:"柜门"})]}),i.left&&O.jsx("input",{type:"number",min:1,max:6,value:i.left.count,onChange:l=>e({left:{...i.left,count:Number(l.target.value)||1}}),style:{width:"100%",marginTop:2,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10}}),((n=i.left)==null?void 0:n.type)==="cabinet"&&O.jsxs("select",{value:i.left.hinge??"left",onChange:l=>e({left:{...i.left,hinge:l.target.value}}),style:{width:"100%",marginTop:2,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:[O.jsx("option",{value:"left",children:"左铰右开"}),O.jsx("option",{value:"right",children:"右铰左开"})]})]}),O.jsxs("label",{style:{flex:1},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:"右列"}),O.jsxs("select",{value:((s=i.right)==null?void 0:s.type)??"",onChange:l=>{var u;return e({right:l.target.value===""?void 0:{type:l.target.value,count:((u=i.right)==null?void 0:u.count)??2}})},style:{width:"100%",marginTop:2,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:[O.jsx("option",{value:"",children:"空"}),O.jsx("option",{value:"drawer",children:"抽屉"}),O.jsx("option",{value:"shelf",children:"隔板"}),O.jsx("option",{value:"cabinet",children:"柜门"})]}),i.right&&O.jsx("input",{type:"number",min:1,max:6,value:i.right.count,onChange:l=>e({right:{...i.right,count:Number(l.target.value)||1}}),style:{width:"100%",marginTop:2,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10}}),((a=i.right)==null?void 0:a.type)==="cabinet"&&O.jsxs("select",{value:i.right.hinge??"left",onChange:l=>e({right:{...i.right,hinge:l.target.value}}),style:{width:"100%",marginTop:2,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:[O.jsx("option",{value:"left",children:"左铰右开"}),O.jsx("option",{value:"right",children:"右铰左开"})]})]})]})]})}const oR={width:"总宽",depth:"总深",height:"总高",shelfCount:"隔板层数",loadKg:"载荷",loadType:"载荷分布",scene:"场景",highRisk:"高风险",mobility:"移动性",workbenchDeskTopHeightMm:"主桌面高度",workbenchUpperShelfDepthRatio:"上层浅搁板深度占比",sectionId:"截面",connectorId:"连接件",topPanel:"顶面板",shelfPanel:"隔板材质",bottomPanel:"底板",doorPanel:"门板"},aR={width:"dimensions.width",depth:"dimensions.depth",height:"dimensions.height",loadKg:"load.totalKg",loadType:"load.type",mobility:"mobility",shelfCount:"layers",scene:"scene",highRisk:"scene",topPanel:"panels",shelfPanel:"panels"},op="suigou_draft_v1",lR=1100,cR=1800,ly=i=>{const e={...i};return e.scene==="workbench"&&(e.depth=Math.max(550,e.depth),e.height=e.height<=800?Math.min(800,Math.max(680,e.height)):Math.min(cR,Math.max(lR,e.height)),e.workbenchDeskTopHeightMm=e.workbenchDeskTopHeightMm??740,e.workbenchLowerZoneRatio=e.workbenchLowerZoneRatio??.62,e.workbenchUpperShelfDepthRatio=e.workbenchUpperShelfDepthRatio??.55,e.shelfCount=Math.max(1,e.shelfCount),e.doorPanel="none",e.bottomPanel="none",e.backPanel!=="pegboard"&&(e.backPanel="none"),e.leftPanel="none",e.rightPanel="none"),e},uR=()=>{try{return JSON.parse(localStorage.getItem(op)??"null")}catch{return null}};function fR(){var Ot,gn;const i=xt.useMemo(()=>dM(),[]),e=xt.useMemo(uR,[]),[t,n]=xt.useState(e!=null&&e.spec?ly({...e.spec,backPanel:e.spec.backPanel??"none",leftPanel:e.spec.leftPanel??"none",rightPanel:e.spec.rightPanel??"none",bottomPanel:e.spec.bottomPanel??"none",brace:e.spec.brace??!1}):{width:700,depth:650,height:1100,sectionId:"eu-3030",connectorId:"corner-bracket-30",shelfCount:1,loadKg:30,loadType:"distributed",scene:"workbench",highRisk:!1,mobility:"fixed",topPanel:"none",shelfPanel:"none",workbenchDeskTopHeightMm:740,workbenchLowerZoneRatio:.62,workbenchUpperShelfDepthRatio:.55,bottomPanel:"none",backPanel:"none",leftPanel:"none",rightPanel:"none",brace:!1}),[s,a]=xt.useState(null),[l,u]=xt.useState("appearance"),[f,h]=xt.useState(0),[p,m]=xt.useState(""),[v,y]=xt.useState(!1),[M,S]=xt.useState(null),[_,x]=xt.useState(null),[R,P]=xt.useState((e==null?void 0:e.chat)??[]),[E,V]=xt.useState(new Map((e==null?void 0:e.manual)??[])),[N,D]=xt.useState((e==null?void 0:e.unsupported)??[]),[B,L]=xt.useState((e==null?void 0:e.productType)??null),[A,U]=xt.useState(()=>!!Ky()),[q,X]=xt.useState(!0),[ne,he]=xt.useState(!0);xt.useEffect(()=>{const b=(_==null?void 0:_.unsupported)??N;localStorage.setItem(op,JSON.stringify({spec:t,chat:R,manual:[...E],unsupported:b,productType:B??void 0}))},[t,R,E,_,N,B]);const ae=()=>{localStorage.removeItem(op),location.reload()},Me=b=>{const k={sectionId:"eu-3030",connectorId:"corner-bracket-30",loadKg:30,loadType:"distributed",highRisk:!1,mobility:"fixed",topPanel:"none",shelfPanel:"none",bottomPanel:"none",backPanel:"none",leftPanel:"none",rightPanel:"none",brace:!1};switch(b){case"💻 电脑桌":return{...k,scene:"workbench",width:1200,depth:600,height:740,shelfCount:1,workbenchDeskTopHeightMm:740,workbenchLowerZoneRatio:.62,workbenchUpperShelfDepthRatio:.55,sectionId:"eu-3030",connectorId:"corner-bracket-30"};case"📦 置物架":return{...k,scene:"diy-furniture",width:800,depth:400,height:1500,shelfCount:3};case"🗄️ 工具柜":return{...k,scene:"diy-furniture",width:670,depth:400,height:815,shelfCount:0,drawerCount:3,drawerKind:"turnover-box",sectionId:"eu-2020",connectorId:"internal-slot-20",mobility:"leveling-feet",topPanel:"wood",shelfPanel:"wood",bottomPanel:"wood"};default:return{...k,scene:"workbench",width:700,depth:650,height:1100,shelfCount:1}}},$=async()=>{var k,Z;if(!p.trim()||v)return;const b=p.trim();y(!0),S(null),P(ie=>[...ie,{role:"user",text:b}]),m("");try{const ie=R.slice(-10).map(wt=>({role:wt.role==="ai"?"assistant":"user",content:wt.text})),de=_?`
[当前方案参数] ${JSON.stringify({width:t.width,depth:t.depth,height:t.height,loadKg:t.loadKg,loadType:t.loadType,mobility:t.mobility,layers:t.shelfCount+1,topPanel:t.topPanel,shelfPanel:t.shelfPanel,drawerCount:t.drawerCount,drawerKind:t.drawerKind,centerColumn:t.centerColumn?`双列分区(左${((k=t.centerColumn.left)==null?void 0:k.type)??"空"}/右${((Z=t.centerColumn.right)==null?void 0:Z.type)??"空"})`:void 0,profileColor:t.profileColor,archetype:t.archetype,workbenchDeskTopHeightMm:t.workbenchDeskTopHeightMm,workbenchLowerZoneRatio:t.workbenchLowerZoneRatio,workbenchUpperShelfDepthRatio:t.workbenchUpperShelfDepthRatio})}`:"",Ne=N.length>0?`
[此前已降级记录（用户再提及时告知仍不支持或按新能力生成）：${N.join("，")}]`:"",Se=E.size>0?`
[用户手动锁定项，除非本轮明确改口否则保持：${[...E.values()].join("，")}]`:"",qe=await EM(b+de+Ne+Se,ie),at=TM(qe,i),ot=B!=null&&qe.productType!=="other"&&!!qe.productType&&qe.productType!==B;qe.productType&&qe.productType!=="other"&&L(qe.productType);const rt=new Set(qe._explicitFields??[]),vt={...at.spec},Lt=ot?new Map:new Map(E);if(!ot)for(const wt of E.keys()){const I=aR[wt];I&&rt.has(I)?Lt.delete(wt):vt[wt]=t[wt]}V(Lt),n(vt),x(at),(ot||at.unsupported.length)&&D(at.unsupported);const Pt=[`已更新方案：宽${vt.width}×深${vt.depth}×高${vt.height}mm，${vt.sectionId}，载荷${vt.loadKg}kg`,ot&&E.size>0?"🔓 检测到新物件类型，已解除此前手动锁定项":"",at.unsupported.length?`🚧 已存入方案草稿但当前版本暂不支持：${at.unsupported.join("、")}`:"",at.riskFlags.length?`⚠ ${at.riskFlags[0]}`:"",at.questions.length?`❓ ${at.questions[0]}`:"参数已齐，可微调或导出清单"].filter(Boolean).join(`
`);P(wt=>[...wt,{role:"ai",text:Pt}]),a(null)}catch(ie){S(ie.message),P(de=>[...de,{role:"ai",text:`✖ 出错了：${ie.message}`}])}finally{y(!1)}},z=xt.useMemo(()=>{try{return{model:pM(t,i),error:null}}catch(b){return{model:null,error:b.message}}},[t,i]),ee=xt.useMemo(()=>z.model?z.model.members.map(b=>({id:b.id,role:b.role,section:i.sections.find(k=>k.section.id===b.sectionId).section,length:b.length,position:b.position,axis:b.axis,tilt:b.tilt,partNo:b.partNo})):[],[z,i]),F=f>0&&l!=="drawing"?f:0,Y=xt.useMemo(()=>{const b=t.height/2;return k=>F===0?k:[k[0]*(1+F*.9),b+(k[1]-b)*(1+F*1.5),k[2]*(1+F*.9)]},[F,t.height]),Ce=xt.useMemo(()=>F===0?ee:ee.map(b=>({...b,position:Y(b.position)})),[ee,F,Y]),K=xt.useMemo(()=>{if(!z.model)return[];const b=i.sections.find(k=>k.section.id===z.model.spec.sectionId).section;return z.model.joints.map(k=>{const Z=i.connectors.find(ie=>ie.connector.id===k.connectorId).connector;return{id:k.id,connectorId:k.connectorId,position:k.position,beamAxis:k.beamAxis,outward:k.outward,ySide:k.ySide,hidden:Z.visibility==="hidden",size:b.size[0]}})},[z,i]),ce=xt.useMemo(()=>{if(F===0||!z.model)return K;const b=new Map(z.model.members.map(k=>[k.id,k.position]));return K.map((k,Z)=>{const ie=b.get(z.model.joints[Z].beamMemberId);if(!ie)return k;const de=Y(ie);return{...k,position:[k.position[0]+de[0]-ie[0],k.position[1]+de[1]-ie[1],k.position[2]+de[2]-ie[2]]}})},[K,F,Y,z]),we=xt.useMemo(()=>z.model?z.model.machining.flatMap(b=>b.discs.map(k=>({position:k.position,axis:k.axis,dir:k.dir,d:k.d,D:k.D}))):[],[z]),xe=xt.useMemo(()=>z.model?z.model.panels.map(b=>({id:b.id,material:b.material,boxSize:b.boxSize,position:b.position,mode:b.mode})):[],[z]),Ie=xt.useMemo(()=>F===0?xe:xe.map(b=>({...b,position:Y(b.position)})),[xe,F,Y]),Oe=xt.useMemo(()=>z.model?z.model.accessories.map(b=>({kind:b.kind,position:b.position,lengthMm:b.lengthMm,boxSize:b.boxSize})):[],[z]),Ge=xt.useMemo(()=>{if(F===0||!z.model)return Oe;const b=new Map;for(const k of z.model.panels)b.set(k.id,k.position);for(const k of z.model.accessories)b.set(k.id,k.position);return Oe.map((k,Z)=>{var Se;const ie=(Se=z.model.accessories[Z])==null?void 0:Se.hostId,de=ie?b.get(ie):void 0;if(!de)return{...k,position:Y(k.position)};const Ne=Y(de);return{...k,position:[k.position[0]+Ne[0]-de[0],k.position[1]+Ne[1]-de[1],k.position[2]+Ne[2]-de[2]]}})},[Oe,F,Y,z]),Ke=xt.useMemo(()=>{if(!z.model)return[];const b={"t-nut-screw":"T型螺母+螺栓","gasket-clamp":"胶垫+压条","shelf-support":"层板托平嵌","corner-flat":"平面直角件","caster-stem":"丝杆拧入","foot-stem":"地脚拧入","drawer-slide":"抽屉轨道"};return z.model.mounts.flatMap((k,Z)=>k.points.map(ie=>({position:ie,label:`M${Z+1}`,note:`${b[k.method]??k.method}｜${k.fasteners.map(de=>`${de.sku}×${de.qty}`).join(" ")}｜${k.note}`})))},[z]),ye=xt.useMemo(()=>z.model?[...new Set(z.model.checks.filter(b=>(b.level==="error"||b.level==="warn")&&b.memberIds).flatMap(b=>b.memberIds))]:[],[z]),Le=xt.useMemo(()=>{const b=new Map;if(z.model)for(const k of z.model.members)b.set(k.id,k.partNo??"");return b},[z]),W=xt.useMemo(()=>{const b=Xy({width:t.width,depth:t.depth,loadKg:t.loadKg,loadType:t.loadType,highRisk:t.highRisk});return b.use!==t.sectionId?b:null},[t,i]),le=xt.useMemo(()=>z.model?AM(z.model.cutList,i):null,[z,i]),Ee=xt.useMemo(()=>z.model?LM(z.model,i):[],[z,i]),Ue=()=>{if(!G||!We())return;const b=[`随构 · 装配说明（${t.width}×${t.depth}×${t.height}mm · ${t.sectionId}）`,`生成时间：${new Date().toLocaleString()} · 方案状态：${G.status}`,"",...Ee.flatMap(ie=>[`【第 ${ie.step} 步】${ie.title}`,ie.parts.length?`  用件：${ie.parts.join("、")}`:"",ie.fasteners.length?`  紧固件：${ie.fasteners.join("、")}`:"",ie.tools.length?`  工具：${ie.tools.join("、")}`:"",`  说明：${ie.note}`,""]).filter(ie=>ie!==""),"⚠ 本说明由方案装配关系自动生成；高风险场景请保留安全冗余并自行确认装配质量。"].join(`
`),k=URL.createObjectURL(new Blob(["\uFEFF"+b],{type:"text/plain;charset=utf-8"})),Z=document.createElement("a");Z.href=k,Z.download="装配说明.txt",Z.click(),URL.revokeObjectURL(k)},Pe=()=>{var de;if(!G||!We())return;const b=((de=i.sections.find(Ne=>Ne.section.id===t.sectionId))==null?void 0:de.section.size[0])??30,k=PM(G.cutList,b),Z=URL.createObjectURL(new Blob([k],{type:"application/dxf"})),ie=document.createElement("a");ie.href=Z,ie.download="加工图.dxf",ie.click(),URL.revokeObjectURL(Z)},[Je,ze]=xt.useState(!1),H=async()=>{if(!(!G||!We()||Je)){ze(!0);try{const{exportStepBlob:b}=await C1(async()=>{const{exportStepBlob:de}=await import("./step-D6phVVvK.js");return{exportStepBlob:de}},[]),k=await b(G,i),Z=URL.createObjectURL(k),ie=document.createElement("a");ie.href=Z,ie.download="方案模型.step",ie.click(),URL.revokeObjectURL(Z)}catch(b){alert(`STEP 导出失败：${b.message}`)}finally{ze(!1)}}},T=b=>{n(k=>{const Z=ly({...k,...b});return Z.scene==="workbench"&&(Z.workbenchDeskTopHeightMm==null&&(Z.workbenchDeskTopHeightMm=740),Z.workbenchLowerZoneRatio==null&&(Z.workbenchLowerZoneRatio=.62),Z.workbenchUpperShelfDepthRatio==null&&(Z.workbenchUpperShelfDepthRatio=.55)),Z}),R.length>0&&V(k=>{const Z=new Map(k);for(const[ie,de]of Object.entries(b))Z.set(ie,`${oR[ie]??ie}=${de}`);return Z})},G=z.model,be={post:"立柱","beam-x":"横梁(X向)","beam-z":"纵梁(Z向)",brace:"斜撑"},_e=(s==null?void 0:s.type)==="member"?ee.find(b=>b.id===s.id)??null:null,Ae=(s==null?void 0:s.type)==="joint"&&G?G.joints.find(b=>b.id===s.id)??null:null,Qe=Ae?i.connectors.find(b=>b.connector.id===Ae.connectorId)??null:null,je=(s==null?void 0:s.type)==="panel"&&G?G.panels.find(b=>b.id===s.id)??null:null,et=xt.useMemo(()=>{const b=[],{width:k,depth:Z,height:ie}=t;if(l==="drawing"&&(b.push({a:[-k/2,2,Z/2],b:[k/2,2,Z/2],offset:[0,0,110],label:`W ${k}`}),b.push({a:[k/2,2,Z/2],b:[k/2,2,-Z/2],offset:[110,0,0],label:`D ${Z}`}),b.push({a:[-k/2,0,-Z/2],b:[-k/2,ie,-Z/2],offset:[-110,0,0],label:`H ${ie}`})),_e){const de=_e.section.size[0],Ne=_e.axis==="x"?[1,0,0]:_e.axis==="y"?[0,1,0]:[0,0,1],Se=_e.position,qe=_e.axis==="y"?[Math.sign(Se[0]||1)*de*1.6,0,0]:[0,de*1.6,0];b.push({a:[Se[0]-Ne[0]*_e.length/2,Se[1]-Ne[1]*_e.length/2,Se[2]-Ne[2]*_e.length/2],b:[Se[0]+Ne[0]*_e.length/2,Se[1]+Ne[1]*_e.length/2,Se[2]+Ne[2]*_e.length/2],offset:qe,label:`${_e.length} mm`})}if(je){const de=je.position,Ne=je.boxSize[0],Se=je.boxSize[1],qe=je.boxSize[2],at=60;Se<Ne&&Se<qe?(b.push({a:[de[0]-Ne/2,de[1],de[2]-qe/2],b:[de[0]+Ne/2,de[1],de[2]-qe/2],offset:[0,0,-at],label:`${Ne}`}),b.push({a:[de[0]-Ne/2,de[1],de[2]-qe/2],b:[de[0]-Ne/2,de[1],de[2]+qe/2],offset:[-at,0,0],label:`${qe}`})):(b.push({a:[de[0]-Ne/2,de[1]-Se/2,de[2]],b:[de[0]+Ne/2,de[1]-Se/2,de[2]],offset:[at,0,0],label:`${Ne}`}),b.push({a:[de[0]-Ne/2,de[1]-Se/2,de[2]],b:[de[0]-Ne/2,de[1]+Se/2,de[2]],offset:[0,at,0],label:`${Se}`}))}return b},[l,t,G,_e,je,i]),Tt=xt.useMemo(()=>{if(l!=="drawing"||!G)return[];const b=new Set,k=[];for(const Z of G.members)!Z.partNo||b.has(Z.partNo)||(b.add(Z.partNo),k.push({position:[Z.position[0],Z.position[1],Z.position[2]],label:Z.partNo}));return k},[l,G]),[De,it]=xt.useState(null),[pt,_t]=xt.useState(null),[tt,Rt]=xt.useState(null),Te=b=>{if(!_e||!G)return;const k=Math.round(Number(b));if(!Number.isFinite(k)||k<=0)return;const Z=i.sections.find(qe=>qe.section.id===G.spec.sectionId).section,ie=i.connectors.find(qe=>qe.connector.id===G.spec.connectorId).connector,de=Z.size[0],Ne=k+2*de-2*ie.lengthOffset,Se=qe=>Math.min(3e3,Math.max(200,qe));_e.role==="beam-x"?T({width:Se(Ne)}):_e.role==="beam-z"?T({depth:Se(Ne)}):T({height:Se(k)})},dt={post:"总高 H 同步调整","beam-x":"总宽 W 同步调整","beam-z":"总深 D 同步调整"},Q=(b,k,Z)=>{const ie="\uFEFF"+[k,...Z].map(Se=>Se.join(",")).join(`
`),de=URL.createObjectURL(new Blob([ie],{type:"text/csv;charset=utf-8"})),Ne=document.createElement("a");Ne.href=de,Ne.download=b,Ne.click(),URL.revokeObjectURL(de)},We=()=>G?G.status==="invalid"?(alert("方案存在结构错误（见结构校验红色项），禁止导出制造文件。请先修复。"),!1):G.status==="needs-confirmation"?confirm("方案存在警告项（见结构校验），确认已知晓风险并继续导出？"):!0:!1;xt.useEffect(()=>{var b;if(tt&&z.model){const k=z.model.checks.find(ie=>ie.ruleId===tt),Z=(b=k==null?void 0:k.memberIds)==null?void 0:b[0];if(Z){const ie=Le.get(Z);ie&&_t(ie)}}},[tt,z,Le]),xt.useEffect(()=>{const b=k=>{var ie;const Z=(ie=k.target)==null?void 0:ie.tagName;Z==="INPUT"||Z==="TEXTAREA"||Z==="SELECT"||(k.key==="1"?u("appearance"):k.key==="2"?u("structure"):k.key==="3"?u("drawing"):k.key==="r"||k.key==="R"?a(null):k.key==="Escape"&&(a(null),_t(null),Rt(null)))};return window.addEventListener("keydown",b),()=>window.removeEventListener("keydown",b)},[]);const ve=b=>t.scene==="precision"?"+0/-0.2":b<=1e3?"±0.3":"±0.5",Re=()=>{if(!G||!We())return;const b=k=>k?k.includes("沉")?"切割→钻孔→沉头→去毛刺":k.includes("M8")?"切割→去毛刺→端面攻丝M8×1.25":k.includes("Φ")?"切割→钻孔→去毛刺":"切割→去毛刺":"切割→去毛刺";Q("切割清单.csv",["件号","截面/材质","下料尺寸mm","公差","数量","加工","工序链","去毛刺"],[...G.cutList.map(k=>[k.partNo,k.sectionId,k.length,ve(k.length),k.qty,k.machiningNote||"无",b(k.machiningNote),"孔口双面去毛刺+锐边倒铝"]),...G.panelList.map(k=>[k.partNo,k.materialName,`${k.size[0]}×${k.size[1]}×${k.size[2]}`,"±1.0",k.qty,k.holeNote,"开料→钻孔→修边",""])])},Ze=()=>{var ie,de,Ne;if(!G||!We())return;const b=i.connectors.find(Se=>Se.connector.id===t.connectorId).connector,k=G.cutList.map(Se=>["型材",`${Se.sectionId} L${Se.length}`,Se.qty,Ye(Se.length)!=null?(Ye(Se.length)*Se.qty).toFixed(2):"待补"]);k.push(["连接件",b.name,G.joints.length,""]);const Z=new Map;for(const Se of b.bom)Z.set(Se.sku,(Z.get(Se.sku)??0)+Se.qty*G.joints.length);for(const Se of G.mounts.filter(qe=>qe.method!=="caster-stem"&&qe.method!=="foot-stem"&&qe.method!=="drawer-slide"&&qe.method!=="slot-embed"))for(const qe of Se.fasteners)Z.set(qe.sku,(Z.get(qe.sku)??0)+qe.qty);for(const[Se,qe]of Z)k.push(["配件",Se,qe,i.fasteners[Se]?(i.fasteners[Se].price*qe).toFixed(2):"待补"]);for(const Se of G.panelList)k.push(["板材",`${Se.partNo} ${Se.materialName} ${Se.size[0]}×${Se.size[1]}×${Se.size[2]} ${Se.holeNote}`,Se.qty,(Se.priceCny*Se.qty).toFixed(2)]);for(const Se of G.accessories){if(Se.kind==="led-strip"){const qe=Math.ceil((Se.lengthMm??1e3)/1e3);k.push(["附件",`LED灯条套件 ${qe}m+电源`,1,((((ie=i.fasteners["led-strip-m"])==null?void 0:ie.price)??0)*qe+(((de=i.fasteners["led-psu-24w"])==null?void 0:de.price)??0)).toFixed(2)]);continue}Se.sku&&k.push(["附件",Se.sku,1,(((Ne=i.fasteners[Se.sku])==null?void 0:Ne.price)??0).toFixed(2)])}k.push(["加工费","型材打孔/攻牙/斜切合计","",G.totals.cost.machining.toFixed(2)]),k.push(["合计","（未税估价，以平台实际报价为准）","",G.totals.cost.total.toFixed(2)]),Q("BOM清单.csv",["类别","名称/规格","数量","估价CNY"],k)},Ye=b=>{const k=i.sections.find(Z=>Z.section.id===t.sectionId).section;return k.price.perMeter!=null?k.price.perMeter*b/1e3:null},Mt={error:{color:"#c0392b",bg:"#fdf0ee",icon:"✖"},warn:{color:"#b7791f",bg:"#fffbeb",icon:"⚠"},info:{color:"#2b6cb0",bg:"#ebf4ff",icon:"ℹ"},pass:{color:"#2f855a",bg:"#f0fff4",icon:"✓"}},Xt=(G==null?void 0:G.checks.filter(b=>b.level==="error").length)??0,qt=(G==null?void 0:G.checks.filter(b=>b.level==="warn").length)??0;return O.jsxs("div",{style:{display:"flex",flexDirection:"column",width:"100vw",height:"100vh",background:"#f5f6f8"},children:[O.jsxs("header",{style:{height:42,display:"flex",alignItems:"center",gap:8,padding:"0 12px",background:"#fff",borderBottom:"1px solid #e2e5ea",fontSize:12,flexShrink:0,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"},children:[O.jsx("b",{style:{fontSize:15,color:"#1a1a2e"},children:"随构"}),O.jsx("span",{style:{color:"#9ca3af",fontSize:11},children:"参数化铝材设计"}),O.jsx("div",{style:{display:"flex",gap:4,marginLeft:8},children:["💻 电脑桌","📦 置物架","🗄️ 工具柜"].map(b=>O.jsx("button",{onClick:()=>{n(Me(b)),a(null)},style:{padding:"3px 8px",border:"1px solid #e2e5ea",borderRadius:12,background:"#f8f9fa",cursor:"pointer",fontSize:11,color:"#555",whiteSpace:"nowrap"},children:b},b))}),O.jsx("div",{style:{flex:1}}),G&&O.jsx("span",{style:{fontSize:11,padding:"3px 10px",borderRadius:10,background:G.status==="valid"?"#f0fff4":G.status==="needs-confirmation"?"#fffbeb":"#fdf0ee",color:G.status==="valid"?"#2f855a":G.status==="needs-confirmation"?"#b7791f":"#c0392b",fontWeight:600},children:G.status==="valid"?"✓ 可制造":G.status==="needs-confirmation"?`⚠ ${qt} 警告`:`✖ ${Xt} 错误`}),G&&O.jsxs("span",{style:{color:"#888",fontSize:11},children:[G.totals.memberCount," 根 · ",G.totals.weightKg!=null&&`${G.totals.weightKg.toFixed(1)} kg`," · ¥",((Ot=G.totals.priceCny)==null?void 0:Ot.toFixed(0))??"?"]}),O.jsx("button",{onClick:ae,style:{fontSize:11,padding:"4px 10px",border:"1px solid #e2e5ea",borderRadius:5,background:"#fff",color:"#666",cursor:"pointer"},children:"新建"}),O.jsx("button",{onClick:Re,disabled:!G||G.status==="invalid",style:{fontSize:11,padding:"4px 8px",border:"1px solid #e2e5ea",borderRadius:5,background:"#fff",color:!G||G.status==="invalid"?"#ccc":"#555",cursor:!G||G.status==="invalid"?"not-allowed":"pointer"},children:"切割"}),O.jsx("button",{onClick:Pe,disabled:!G||G.status==="invalid",style:{fontSize:11,padding:"4px 8px",border:"1px solid #e2e5ea",borderRadius:5,background:"#fff",color:!G||G.status==="invalid"?"#ccc":"#555",cursor:!G||G.status==="invalid"?"not-allowed":"pointer"},children:"DXF"}),O.jsx("button",{onClick:H,disabled:!G||G.status==="invalid"||Je,title:"B-rep 实体模型（首次导出需加载几秒 CAD 内核）",style:{fontSize:11,padding:"4px 8px",border:"1px solid #e2e5ea",borderRadius:5,background:"#fff",color:!G||G.status==="invalid"||Je?"#ccc":"#555",cursor:!G||G.status==="invalid"||Je?"not-allowed":"pointer"},children:Je?"STEP…":"STEP"}),O.jsx("button",{onClick:Ue,disabled:!G||G.status==="invalid",style:{fontSize:11,padding:"4px 8px",border:"1px solid #e2e5ea",borderRadius:5,background:"#fff",color:!G||G.status==="invalid"?"#ccc":"#555",cursor:!G||G.status==="invalid"?"not-allowed":"pointer"},children:"装配"}),O.jsx("button",{onClick:Ze,disabled:!G||G.status==="invalid",style:{fontSize:11,padding:"4px 8px",border:"none",borderRadius:5,background:!G||G.status==="invalid"?"#e5e7eb":"#1e6fff",color:!G||G.status==="invalid"?"#9ca3af":"#fff",cursor:!G||G.status==="invalid"?"not-allowed":"pointer",fontWeight:600},children:"BOM"})]}),O.jsxs("div",{style:{display:"flex",flex:1,minHeight:0},children:[q&&O.jsxs("aside",{style:{width:280,display:"flex",flexDirection:"column",background:"#fff",borderRight:"1px solid #e2e5ea",flexShrink:0},children:[O.jsxs("button",{onClick:()=>X(!1),style:{padding:"7px 12px",border:"none",borderBottom:"1px solid #eef0f3",background:"#f7f8fa",cursor:"pointer",fontSize:11,color:"#6b7280",display:"flex",alignItems:"center",gap:6},children:[O.jsx("span",{children:"⟨"}),O.jsx("span",{children:"收起参数"})]}),O.jsxs("div",{style:{padding:12,overflowY:"auto",fontSize:12,lineHeight:1.6},children:[A?O.jsxs("div",{style:{marginBottom:10},children:[R.length>0&&O.jsxs("div",{style:{maxHeight:180,overflowY:"auto",marginBottom:6,display:"flex",flexDirection:"column",gap:4},children:[R.map((b,k)=>O.jsx("div",{style:{alignSelf:b.role==="user"?"flex-end":"flex-start",maxWidth:"88%",padding:"5px 8px",borderRadius:8,fontSize:11,whiteSpace:"pre-wrap",lineHeight:1.5,background:b.role==="user"?"#1e6fff":"#f0f2f5",color:b.role==="user"?"#fff":"#333"},children:b.text},k)),v&&O.jsx("div",{style:{alignSelf:"flex-start",color:"#999",fontSize:11,padding:"2px 8px"},children:"AI 理解中…"})]}),O.jsx("textarea",{value:p,onChange:b=>m(b.target.value),placeholder:R.length?"回答追问或补充需求…":"例：想要一个放3D打印机的架子，宽大概一米，带轮子方便移动",rows:2,style:{width:"100%",padding:"6px 8px",border:"1px solid #c9d2e0",borderRadius:6,resize:"vertical",fontFamily:"inherit",fontSize:12},onKeyDown:b=>{b.key==="Enter"&&!b.shiftKey&&(b.preventDefault(),$())}}),O.jsx("button",{onClick:$,disabled:v,style:{width:"100%",marginTop:4,padding:"6px 0",border:"none",borderRadius:5,background:v?"#9db8e8":"#1e6fff",color:"#fff",cursor:v?"wait":"pointer",fontSize:12},children:v?"AI 理解中…":R.length?"发送":"✨ 生成方案"}),M&&O.jsxs("div",{style:{color:"#c0392b",fontSize:11,marginTop:4},children:["✖ ",M]}),E.size>0&&O.jsxs("div",{style:{color:"#8a7a3a",background:"#fdf9e8",padding:"4px 8px",borderRadius:4,fontSize:10,marginTop:4},children:["🔒 已手动调整并锁定：",[...E.values()].join("，")]})]}):O.jsxs("div",{style:{background:"#fffbeb",padding:"8px 10px",borderRadius:6,marginBottom:10,fontSize:11},children:["首次使用请配置 LongCat API Key（仅存本地浏览器）：",O.jsx("input",{type:"password",placeholder:"ak_...",style:{width:"100%",marginTop:4,padding:"4px 6px",border:"1px solid #d8c68a",borderRadius:4},onKeyDown:b=>{if(b.key==="Enter"){const k=b.target.value.trim();k&&(wM(k),U(!0))}}}),O.jsx("div",{style:{color:"#999",marginTop:2,fontSize:10},children:"回车保存。没有 Key 也可直接用下方手动参数。"})]}),_!=null&&_.unsupported.length||N.length?O.jsxs("div",{style:{background:"#fdf9e8",color:"#8a7a3a",padding:"6px 8px",borderRadius:6,fontSize:11,marginBottom:8},children:["🚧 已存入草稿但暂不支持：",((_==null?void 0:_.unsupported)??N).join("、")]}):null,_&&O.jsxs("details",{style:{fontSize:11,color:"#666",marginBottom:8},children:[O.jsxs("summary",{style:{cursor:"pointer"},children:["AI 假设与选型依据（",_.assumptions.length,"）"]}),_.assumptions.map(b=>O.jsxs("div",{style:{padding:"1px 0"},children:["· ",b]},b))]}),O.jsx($a,{title:"快速尺寸",icon:"📐",defaultOpen:!0,children:[["总宽 W","width",200,3e3],["总深 D","depth",200,3e3],["总高 H","height",200,3e3]].map(([b,k,Z,ie])=>O.jsxs("div",{style:{marginBottom:4},children:[O.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4,marginBottom:1},children:[O.jsx("span",{style:{fontSize:10,color:"#6b7280",flex:1},children:b}),O.jsx("input",{type:"number",value:t[k],min:Z,max:ie,step:10,onChange:de=>{const Ne=Number(de.target.value);Ne>=Z&&Ne<=ie&&T({[k]:Ne})},style:{width:56,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:11,textAlign:"right"}}),O.jsx("span",{style:{fontSize:10,color:"#9ca3af"},children:"mm"})]}),O.jsx("input",{type:"range",min:Z,max:ie,step:10,value:t[k],onChange:de=>T({[k]:Number(de.target.value)}),style:{width:"100%",height:3}})]},k))}),O.jsxs($a,{title:"板材与封板",icon:"📦",defaultOpen:!1,children:[O.jsx("div",{style:{display:"flex",gap:4,marginBottom:6},children:[["顶","topPanel"],["隔板","shelfPanel"],["底","bottomPanel"]].map(([b,k])=>O.jsxs("label",{style:{flex:1},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:b}),O.jsxs("select",{value:t[k],onChange:Z=>T({[k]:Z.target.value}),style:{width:"100%",marginTop:1,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10,background:t[k]!=="none"?"#f0f7ff":"#fff"},children:[O.jsx("option",{value:"none",children:"无"}),O.jsx("option",{value:"wood",children:"木板"}),O.jsx("option",{value:"glass",children:"玻璃"}),O.jsx("option",{value:"acrylic",children:"亚克力"}),O.jsx("option",{value:"pegboard",children:"洞洞板"})]})]},k))}),t.scene!=="workbench"&&t.topPanel!=="none"&&O.jsxs("div",{style:{marginBottom:6},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:"顶板模式"}),O.jsxs("select",{value:t.topPanelMode??"overlay",onChange:b=>T({topPanelMode:b.target.value}),style:{width:"100%",marginTop:1,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:[O.jsx("option",{value:"overlay",children:"全覆盖"}),O.jsx("option",{value:"recessed",children:"凹陷嵌框"})]})]}),O.jsxs("div",{style:{display:"flex",gap:4},children:[[["背","backPanel"],["左","leftPanel"],["右","rightPanel"]].map(([b,k])=>O.jsxs("label",{style:{flex:1},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:b}),O.jsxs("select",{value:t[k],onChange:Z=>T({[k]:Z.target.value}),style:{width:"100%",marginTop:1,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10,background:t[k]!=="none"?"#f0f7ff":"#fff"},children:[O.jsx("option",{value:"none",children:"无"}),O.jsx("option",{value:"wood",children:"木板"}),O.jsx("option",{value:"acrylic",children:"亚克力"}),O.jsx("option",{value:"pegboard",children:"洞洞板"}),O.jsx("option",{value:"wire-mesh",children:"围网"})]})]},k)),O.jsxs("label",{style:{flex:1},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:"门"}),O.jsxs("select",{value:t.doorPanel??"none",onChange:b=>T({doorPanel:b.target.value}),style:{width:"100%",marginTop:1,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10,background:(t.doorPanel??"none")!=="none"?"#f0f7ff":"#fff"},children:[O.jsx("option",{value:"none",children:"无"}),O.jsx("option",{value:"wood",children:"木门"}),O.jsx("option",{value:"glass",children:"玻璃门"}),O.jsx("option",{value:"acrylic",children:"亚克力门"})]})]})]})]}),O.jsxs($a,{title:"结构与外观",icon:"🔧",defaultOpen:!1,children:[O.jsxs("div",{style:{marginBottom:6},children:[O.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:1},children:[O.jsx("span",{style:{fontSize:10,color:"#6b7280"},children:t.scene==="workbench"?"桌面高度":"隔板层数"}),O.jsx("span",{style:{fontSize:11,color:"#3769b2",fontWeight:600},children:t.scene==="workbench"?`${t.workbenchDeskTopHeightMm??740} mm`:t.shelfCount})]}),t.scene==="workbench"?O.jsx("input",{type:"range",min:680,max:800,step:10,value:t.workbenchDeskTopHeightMm??740,onChange:b=>T({workbenchDeskTopHeightMm:Number(b.target.value)}),style:{width:"100%",height:3}}):O.jsx("input",{type:"range",min:0,max:4,step:1,value:t.shelfCount,onChange:b=>T({shelfCount:Number(b.target.value)}),style:{width:"100%",height:3}})]}),t.scene!=="workbench"&&O.jsxs("div",{style:{marginBottom:6},children:[O.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:1},children:[O.jsx("span",{style:{fontSize:10,color:"#6b7280"},children:"抽屉层数"}),O.jsx("span",{style:{fontSize:11,color:"#3769b2",fontWeight:600},children:t.drawerCount??0})]}),O.jsx("input",{type:"range",min:0,max:5,step:1,value:t.drawerCount??0,onChange:b=>T({drawerCount:Number(b.target.value)}),style:{width:"100%",height:3}}),(t.drawerCount??0)>0&&O.jsxs("select",{value:t.drawerKind??"ready-made",onChange:b=>T({drawerKind:b.target.value}),style:{width:"100%",marginTop:3,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:[O.jsx("option",{value:"ready-made",children:"成品抽屉"}),O.jsx("option",{value:"turnover-box",children:"周转箱"})]})]}),O.jsxs("div",{style:{display:"flex",gap:4},children:[O.jsxs("label",{style:{flex:1},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:"截面"}),O.jsx("select",{value:t.sectionId,onChange:b=>T({sectionId:b.target.value,beamSectionId:void 0}),style:{width:"100%",marginTop:1,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:i.sections.filter(b=>b.section.size[0]===b.section.size[1]).map(b=>O.jsx("option",{value:b.section.id,children:b.section.name},b.section.id))})]}),O.jsxs("label",{style:{flex:1},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:"梁截面"}),O.jsxs("select",{value:t.beamSectionId??"",onChange:b=>T({beamSectionId:b.target.value||void 0}),style:{width:"100%",marginTop:1,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:[O.jsx("option",{value:"",children:"同立柱"}),i.sections.filter(b=>{const k=i.sections.find(Z=>Z.section.id===t.sectionId).section;return b.section.size[0]===k.size[0]&&b.section.size[1]>b.section.size[0]}).map(b=>O.jsx("option",{value:b.section.id,children:b.section.name},b.section.id))]})]})]}),O.jsx("div",{style:{display:"flex",gap:4,marginTop:4},children:O.jsxs("label",{style:{flex:1},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:"连接件"}),O.jsx("select",{value:t.connectorId,onChange:b=>T({connectorId:b.target.value}),style:{width:"100%",marginTop:1,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:i.connectors.map(b=>{const k=i.sections.find(ie=>ie.section.id===t.sectionId).section,Z=b.connector.compatible.series.includes(k.id)&&b.connector.compatible.slotWidths.includes(k.slot.width);return O.jsxs("option",{value:b.connector.id,disabled:!Z,children:[b.connector.name,Z?"":" ⚠"]},b.connector.id)})})]})}),O.jsxs("div",{style:{display:"flex",gap:4,marginTop:4},children:[O.jsxs("label",{style:{flex:1},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:"颜色"}),O.jsxs("select",{value:t.profileColor??"silver",onChange:b=>T({profileColor:b.target.value}),style:{width:"100%",marginTop:1,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:[O.jsx("option",{value:"silver",children:"银白"}),O.jsx("option",{value:"black",children:"哑光黑"}),O.jsx("option",{value:"gold",children:"香槟金"})]})]}),O.jsxs("label",{style:{flex:1},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:"底部"}),O.jsxs("select",{value:t.mobility,onChange:b=>T({mobility:b.target.value}),style:{width:"100%",marginTop:1,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:[O.jsx("option",{value:"fixed",children:"落地"}),O.jsx("option",{value:"leveling-feet",children:"调平脚"}),O.jsx("option",{value:"caster",children:"脚轮"})]})]})]}),O.jsxs("div",{style:{display:"flex",gap:6,marginTop:6},children:[O.jsxs("label",{style:{fontSize:10,display:"flex",alignItems:"center",gap:3},children:[O.jsx("input",{type:"checkbox",checked:t.brace,onChange:b=>T({brace:b.target.checked}),style:{margin:0}})," 斜撑"]}),O.jsxs("label",{style:{fontSize:10,display:"flex",alignItems:"center",gap:3},children:[O.jsx("input",{type:"checkbox",checked:!!t.centerColumn,onChange:b=>T({centerColumn:b.target.checked?{offsetRatio:.5,left:{type:"drawer",count:3},right:{type:"drawer",count:3}}:void 0}),style:{margin:0}})," 中柱"]}),O.jsxs("label",{style:{fontSize:10,display:"flex",alignItems:"center",gap:3},children:[O.jsx("input",{type:"checkbox",checked:t.highRisk,onChange:b=>T({highRisk:b.target.checked}),style:{margin:0}})," 高风险"]})]})]}),t.centerColumn&&O.jsx(sR,{cc:t.centerColumn,onChange:b=>T({centerColumn:{...t.centerColumn,...b}})}),O.jsxs($a,{title:"高级",icon:"⚙️",defaultOpen:!1,children:[O.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:1},children:[O.jsx("span",{style:{fontSize:10,color:"#6b7280"},children:"载荷"}),O.jsxs("span",{style:{fontSize:11,color:"#3769b2",fontWeight:600},children:[t.loadKg," kg"]})]}),O.jsx("input",{type:"range",min:5,max:200,step:5,value:t.loadKg,onChange:b=>T({loadKg:Number(b.target.value)}),style:{width:"100%",height:3,marginBottom:6}}),O.jsxs("div",{style:{display:"flex",gap:4},children:[O.jsxs("label",{style:{flex:1},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:"分布"}),O.jsxs("select",{value:t.loadType,onChange:b=>T({loadType:b.target.value}),style:{width:"100%",marginTop:1,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:[O.jsx("option",{value:"distributed",children:"均布"}),O.jsx("option",{value:"concentrated",children:"集中"})]})]}),O.jsxs("label",{style:{flex:1},children:[O.jsx("span",{style:{fontSize:10,color:"#8a90a0"},children:"场景"}),O.jsxs("select",{value:t.scene,onChange:b=>T({scene:b.target.value}),style:{width:"100%",marginTop:1,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3,fontSize:10},children:[O.jsx("option",{value:"diy-furniture",children:"家具"}),O.jsx("option",{value:"workbench",children:"工作台"}),O.jsx("option",{value:"industrial-rack",children:"机架"}),O.jsx("option",{value:"precision",children:"精密"})]})]})]}),O.jsxs("div",{style:{display:"flex",gap:6,marginTop:6},children:[O.jsxs("label",{style:{fontSize:10,display:"flex",alignItems:"center",gap:3},children:[O.jsx("input",{type:"checkbox",checked:t.vibration??!1,onChange:b=>T({vibration:b.target.checked}),style:{margin:0}})," 振动"]}),O.jsxs("label",{style:{fontSize:10,display:"flex",alignItems:"center",gap:3},children:[O.jsx("input",{type:"checkbox",checked:t.ledStrip??!1,onChange:b=>T({ledStrip:b.target.checked}),style:{margin:0}})," LED"]})]})]}),W&&O.jsxs("div",{style:{background:"#ebf4ff",color:"#2b6cb0",padding:"6px 8px",borderRadius:5,marginTop:8,fontSize:11},children:["💡 推荐 ",O.jsx("b",{children:(gn=i.sections.find(b=>b.section.id===W.use))==null?void 0:gn.section.name}),O.jsx("button",{onClick:()=>T({sectionId:W.use}),style:{marginLeft:6,border:"1px solid #2b6cb0",background:"#fff",color:"#2b6cb0",borderRadius:3,padding:"1px 6px",cursor:"pointer",fontSize:10},children:"应用"})]})]})]}),!q&&O.jsxs("button",{onClick:()=>X(!0),title:"展开参数",style:{width:36,background:"#e8edf4",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,flexShrink:0,border:"none",borderRight:"1px solid #dde1e8"},children:[O.jsx("span",{style:{fontSize:14,color:"#3769b2"},children:"⟩"}),O.jsx("span",{style:{writingMode:"vertical-rl",fontSize:9,color:"#3769b2",letterSpacing:1},children:"参数"})]}),O.jsxs("main",{style:{flex:1,position:"relative",background:"#f5f6f8"},children:[O.jsx(nR,{items:Ce,joints:l==="structure"?ce:[],machining:l!=="appearance"&&F===0?we:[],panels:Ie,accessories:Ge,mountPoints:l==="structure"&&F===0?Ke:[],dims:F===0?et:[],drawing:l==="drawing",bubbles:F===0?Tt:[],focusY:t.height/2,onSelect:a,selection:s,warnMemberIds:ye,profileColor:t.profileColor,highlightedPartNo:pt}),O.jsxs("div",{style:{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",textAlign:"center"},children:[O.jsx("div",{style:{display:"flex",gap:2,background:"rgba(255,255,255,.92)",padding:3,borderRadius:8,boxShadow:"0 2px 8px rgba(0,0,0,.08)"},children:[["appearance","外观","看造型","1"],["structure","结构","看连接","2"],["drawing","图纸","看尺寸","3"]].map(([b,k,Z,ie])=>O.jsxs("button",{onClick:()=>u(b),title:Z,style:{border:"none",borderRadius:5,padding:"5px 12px",cursor:"pointer",fontSize:12,background:l===b?"#1e6fff":"transparent",color:l===b?"#fff":"#555",display:"flex",flexDirection:"column",alignItems:"center",gap:1},children:[O.jsxs("span",{children:[k,O.jsx("sup",{style:{fontSize:8,marginLeft:2,opacity:.6},children:ie})]}),O.jsx("span",{style:{fontSize:9,opacity:l===b?.8:.5},children:Z})]},b))}),l!=="drawing"&&O.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,marginTop:6,background:"rgba(255,255,255,.92)",padding:"4px 10px",borderRadius:8,boxShadow:"0 2px 8px rgba(0,0,0,.08)",fontSize:11,color:"#555"},children:[O.jsxs("span",{style:{whiteSpace:"nowrap"},children:["💥 爆炸 ",Math.round(f*100),"%"]}),O.jsx("input",{type:"range",min:0,max:100,step:5,value:Math.round(f*100),onChange:b=>h(Number(b.target.value)/100),style:{width:110}}),f>0&&O.jsx("button",{onClick:()=>h(0),style:{border:"none",background:"transparent",color:"#1e6fff",cursor:"pointer",fontSize:11},children:"复位"})]})]}),_e&&O.jsxs("div",{style:{position:"absolute",top:56,right:12,width:220,background:"rgba(255,255,255,.95)",borderRadius:8,padding:"10px 12px",boxShadow:"0 4px 16px rgba(0,0,0,.12)",fontSize:12,lineHeight:1.8},children:[O.jsxs("div",{style:{fontWeight:600,marginBottom:3,color:"#1e6fff"},children:[be[_e.role]??_e.role," · ",_e.id]}),O.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:["下料长度：",O.jsx("input",{type:"number",defaultValue:_e.length,min:40,max:2e3,step:10,style:{width:60,padding:"2px 4px",border:"1px solid #c9d2e0",borderRadius:3},onKeyDown:b=>{b.key==="Enter"&&Te(b.target.value)},onBlur:b=>{Number(b.target.value)!==_e.length&&Te(b.target.value)}},_e.id+":"+_e.length)," mm"]}),O.jsxs("div",{style:{color:"#888",fontSize:11},children:["回车确认，",dt[_e.role]]}),O.jsxs("div",{children:["米重：",_e.section.weightPerMeter!=null?`${_e.section.weightPerMeter} kg/m`:"待补"]}),O.jsxs("div",{children:["单根约：",_e.section.price.perMeter!=null?`¥${(_e.section.price.perMeter*_e.length/1e3).toFixed(2)}`:"待补"]})]}),Ae&&Qe&&O.jsxs("div",{style:{position:"absolute",top:56,right:12,width:220,background:"rgba(255,255,255,.95)",borderRadius:8,padding:"10px 12px",boxShadow:"0 4px 16px rgba(0,0,0,.12)",fontSize:12,lineHeight:1.8},children:[O.jsxs("div",{style:{fontWeight:600,marginBottom:3,color:"#1e6fff"},children:["连接件 · ",Ae.id]}),O.jsx("div",{children:Qe.connector.name}),O.jsxs("div",{children:["强度等级：",Qe.connector.strengthClass," / 5"]}),O.jsxs("div",{children:["安装：",Qe.connector.visibility==="hidden"?"隐藏式":"外露式",Qe.connector.machining.length>0&&` · 需加工 ${Qe.connector.machining.length} 项`]})]}),(s==null?void 0:s.type)==="panel"&&G&&(()=>{const b=G.panels.find(de=>de.id===s.id);if(!b)return null;const k=i.panels[b.material],Z=(k==null?void 0:k.kgPerM2)??10,ie=b.size[0]/1e3*(b.size[1]/1e3)*Z;return O.jsxs("div",{style:{position:"absolute",top:56,right:12,width:220,background:"rgba(255,255,255,.95)",borderRadius:8,padding:"10px 12px",boxShadow:"0 4px 16px rgba(0,0,0,.12)",fontSize:12,lineHeight:1.8},children:[O.jsxs("div",{style:{fontWeight:600,marginBottom:3,color:"#1e6fff"},children:["板材 · ",b.partNo]}),O.jsxs("div",{children:["材质：",(k==null?void 0:k.name)??b.material]}),O.jsxs("div",{children:["尺寸：",b.size[0],"×",b.size[1],"×",b.size[2]," mm"]}),O.jsxs("div",{children:["重量：",ie.toFixed(2)," kg"]}),O.jsxs("div",{children:["位置：",b.mode]})]})})(),De&&G&&(()=>{var Z;const b=G.cutList.find(ie=>ie.partNo===De);if(!b)return null;const k=((Z=i.sections.find(ie=>ie.section.id===b.sectionId))==null?void 0:Z.section.size[0])??30;return O.jsx(rR,{item:b,sectionSize:k,tolerance:ve(b.length),onClose:()=>it(null)})})()]}),ne&&O.jsxs("aside",{style:{width:300,display:"flex",flexDirection:"column",background:"#fff",borderLeft:"1px solid #e2e5ea",flexShrink:0},children:[O.jsxs("button",{onClick:()=>he(!1),style:{padding:"7px 12px",border:"none",borderBottom:"1px solid #eef0f3",background:"#f7f8fa",cursor:"pointer",fontSize:11,color:"#6b7280",display:"flex",alignItems:"center",gap:6},children:[O.jsx("span",{children:"⟩"}),O.jsx("span",{children:"收起结果"})]}),O.jsx("div",{style:{padding:12,overflowY:"auto",fontSize:12,lineHeight:1.6},children:G?O.jsxs(O.Fragment,{children:[G.warnings.map(b=>O.jsxs("div",{style:{color:"#b7791f",background:"#fffbeb",padding:"5px 8px",borderRadius:4,marginBottom:6,fontSize:11},children:["⚠ ",b]},b)),O.jsx("h3",{style:{margin:"0 0 4px",fontSize:13},children:"结构校验"}),G.checks.map((b,k)=>{const Z=Mt[b.level],ie=b.memberIds!=null&&b.memberIds.length>0,de=tt===b.ruleId;return O.jsxs("div",{onClick:()=>ie&&Rt(Ne=>Ne===b.ruleId?null:b.ruleId),style:{color:Z.color,background:de?"#fff3cd":Z.bg,padding:"4px 7px",borderRadius:3,marginBottom:3,fontSize:11,cursor:ie?"pointer":"default",border:de?"1px solid #e0c050":"1px solid transparent"},children:[Z.icon," ",O.jsx("b",{children:b.ruleId})," ",b.message,ie&&O.jsx("span",{style:{fontSize:9,marginLeft:4,opacity:.7},children:"●高亮"})]},k)}),O.jsx("h3",{style:{margin:"10px 0 4px",fontSize:13},children:"切割清单"}),O.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:11},children:[O.jsx("thead",{children:O.jsxs("tr",{style:{borderBottom:"1px solid #d8dce2",color:"#666"},children:[O.jsx("th",{style:{padding:"3px 0"},children:"件号"}),O.jsx("th",{style:{textAlign:"right"},children:"长度"}),O.jsx("th",{style:{textAlign:"right"},children:"数量"})]})}),O.jsx("tbody",{children:G.cutList.map(b=>O.jsxs("tr",{onClick:()=>_t(k=>k===b.partNo?null:b.partNo),title:"点击高亮对应构件",style:{borderBottom:"1px solid #f0f2f5",cursor:"pointer",background:pt===b.partNo?"#e8f4ff":"transparent"},children:[O.jsx("td",{style:{padding:"3px 0",color:"#1e6fff",textDecoration:"underline"},children:b.partNo}),O.jsx("td",{style:{textAlign:"right"},children:b.length}),O.jsxs("td",{style:{textAlign:"right"},children:["×",b.qty]})]},b.partNo))})]}),le&&O.jsxs(O.Fragment,{children:[O.jsx("h3",{style:{margin:"10px 0 4px",fontSize:13},children:"下料方案"}),O.jsxs("div",{style:{fontSize:11,color:"#555",marginBottom:3},children:["原料 ",le.stockLengthMm,"mm × ",le.totalStockBars," 根 · 利用率 ",(le.utilization*100).toFixed(1),"%"]}),le.bars.map((b,k)=>O.jsxs("div",{style:{fontSize:10,color:"#777",padding:"2px 0",borderBottom:"1px solid #f0f2f5"},children:["#",k+1,"：",b.cuts.map(Z=>`${Z.partNo}(${Z.length})`).join(" + ")," → 余料 ",b.remnantMm,"mm"]},k))]}),G.panelList.length>0&&O.jsxs(O.Fragment,{children:[O.jsx("h3",{style:{margin:"10px 0 4px",fontSize:13},children:"板材清单"}),O.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:11},children:[O.jsx("thead",{children:O.jsxs("tr",{style:{borderBottom:"1px solid #d8dce2",color:"#666"},children:[O.jsx("th",{style:{padding:"3px 0",textAlign:"left"},children:"件号"}),O.jsx("th",{style:{textAlign:"left"},children:"材质"}),O.jsx("th",{style:{textAlign:"right"},children:"长×宽×厚"}),O.jsx("th",{style:{textAlign:"right"},children:"重量"}),O.jsx("th",{style:{textAlign:"right"},children:"数量"})]})}),O.jsx("tbody",{children:G.panelList.map(b=>{var ie;const k=((ie=i.panels[b.material])==null?void 0:ie.kgPerM2)??10,Z=b.size[0]/1e3*(b.size[1]/1e3)*k*b.qty;return O.jsxs("tr",{style:{borderBottom:"1px solid #f0f2f5"},children:[O.jsx("td",{style:{padding:"3px 0"},children:b.partNo}),O.jsx("td",{children:b.materialName}),O.jsxs("td",{style:{textAlign:"right",fontSize:10},children:[b.size[0],"×",b.size[1],"×",b.size[2]]}),O.jsxs("td",{style:{textAlign:"right"},children:[Z.toFixed(1),"kg"]}),O.jsxs("td",{style:{textAlign:"right"},children:["×",b.qty]})]},b.partNo)})})]}),O.jsxs("div",{style:{fontSize:10,color:"#999",marginTop:"3px"},children:["板材总重 ",G.panelList.reduce((b,k)=>{var ie;const Z=((ie=i.panels[k.material])==null?void 0:ie.kgPerM2)??10;return b+k.size[0]/1e3*(k.size[1]/1e3)*Z*k.qty},0).toFixed(1),"kg · ",G.panelList.map(b=>b.holeNote).join(" · ")]})]}),O.jsx("h3",{style:{margin:"10px 0 4px",fontSize:13},children:"价格明细"}),O.jsx("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:11},children:O.jsxs("tbody",{children:[[["型材",G.totals.cost.profile],["板材",G.totals.cost.panels],["连接件",G.totals.cost.connectors],["紧固件",G.totals.cost.fasteners],["加工",G.totals.cost.machining],["附件",G.totals.cost.accessories]].filter(([,b])=>b>0).map(([b,k])=>O.jsxs("tr",{style:{borderBottom:"1px solid #f0f2f5"},children:[O.jsx("td",{style:{padding:"2px 0",color:"#666"},children:b}),O.jsxs("td",{style:{textAlign:"right"},children:["¥",k.toFixed(2)]})]},b)),O.jsxs("tr",{children:[O.jsx("td",{style:{padding:"3px 0",fontWeight:600},children:"合计"}),O.jsxs("td",{style:{textAlign:"right",fontWeight:600},children:["¥",G.totals.cost.total.toFixed(2)]})]})]})}),Ee.length>0&&O.jsxs("details",{style:{marginTop:8},children:[O.jsxs("summary",{style:{cursor:"pointer",fontSize:13,fontWeight:600},children:["装配步骤（",Ee.length," 步）"]}),Ee.map(b=>O.jsxs("div",{style:{padding:"4px 0",borderBottom:"1px solid #f0f2f5",fontSize:11},children:[O.jsxs("b",{children:[b.step,". ",b.title]}),b.parts.length>0&&O.jsxs("div",{style:{color:"#555"},children:["用件：",b.parts.join("、")]}),b.note&&O.jsx("div",{style:{color:"#999",fontSize:10},children:b.note})]},b.step))]})]}):O.jsx("div",{style:{color:"#999"},children:"生成方案后这里显示校验结果与清单"})})]}),!ne&&O.jsxs("button",{onClick:()=>he(!0),title:"展开结果",style:{width:36,background:"#e8edf4",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,flexShrink:0,border:"none",borderLeft:"1px solid #dde1e8"},children:[O.jsx("span",{style:{fontSize:14,color:"#3769b2"},children:"⟨"}),O.jsx("span",{style:{writingMode:"vertical-rl",fontSize:9,color:"#3769b2",letterSpacing:1},children:"结果"})]})]})]})}b1.createRoot(document.getElementById("root")).render(O.jsx(xt.StrictMode,{children:O.jsx(fR,{})}));export{XC as a,qC as s};
