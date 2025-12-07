import{o as Ju}from"./idb-BXWtuYvb.js";var Yi={};/**
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
 */const zo=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?t[e++]=i:i<2048?(t[e++]=i>>6|192,t[e++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=i>>18|240,t[e++]=i>>12&63|128,t[e++]=i>>6&63|128,t[e++]=i&63|128):(t[e++]=i>>12|224,t[e++]=i>>6&63|128,t[e++]=i&63|128)}return t},Zu=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const i=n[e++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=n[e++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=n[e++],u=n[e++],c=n[e++],h=((i&7)<<18|(o&63)<<12|(u&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],u=n[e++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|u&63)}}return t.join("")},Go={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const o=n[i],u=i+1<n.length,c=u?n[i+1]:0,h=i+2<n.length,f=h?n[i+2]:0,m=o>>2,A=(o&3)<<4|c>>4;let R=(c&15)<<2|f>>6,V=f&63;h||(V=64,u||(R=64)),r.push(e[m],e[A],e[R],e[V])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(zo(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Zu(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const o=e[n.charAt(i++)],c=i<n.length?e[n.charAt(i)]:0;++i;const f=i<n.length?e[n.charAt(i)]:64;++i;const A=i<n.length?e[n.charAt(i)]:64;if(++i,o==null||c==null||f==null||A==null)throw new tl;const R=o<<2|c>>4;if(r.push(R),f!==64){const V=c<<4&240|f>>2;if(r.push(V),A!==64){const N=f<<6&192|A;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class tl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const el=function(n){const t=zo(n);return Go.encodeByteArray(t,!0)},Qn=function(n){return el(n).replace(/\./g,"")},nl=function(n){try{return Go.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function rl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const sl=()=>rl().__FIREBASE_DEFAULTS__,il=()=>{if(typeof process>"u"||typeof Yi>"u")return;const n=Yi.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ol=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&nl(n[1]);return t&&JSON.parse(t)},ir=()=>{try{return sl()||il()||ol()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},al=n=>{var t,e;return(e=(t=ir())===null||t===void 0?void 0:t.emulatorHosts)===null||e===void 0?void 0:e[n]},ul=n=>{const t=al(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},Ko=()=>{var n;return(n=ir())===null||n===void 0?void 0:n.config},Sf=n=>{var t;return(t=ir())===null||t===void 0?void 0:t[`_${n}`]};/**
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
 */class ll{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
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
 */function cl(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const u=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Qn(JSON.stringify(e)),Qn(JSON.stringify(u)),""].join(".")}/**
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
 */function ds(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Vf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ds())}function hl(){var n;const t=(n=ir())===null||n===void 0?void 0:n.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Cf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function bf(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Df(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Nf(){const n=ds();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function dl(){return!hl()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function fl(){try{return typeof indexedDB=="object"}catch{return!1}}function pl(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{e=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(e){t(e)}})}/**
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
 */const ml="FirebaseError";class Ae extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=ml,Object.setPrototypeOf(this,Ae.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Wo.prototype.create)}}class Wo{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},i=`${this.service}/${t}`,o=this.errors[t],u=o?gl(o,r):"Error",c=`${this.serviceName}: ${u} (${i}).`;return new Ae(i,c,r)}}function gl(n,t){return n.replace(_l,(e,r)=>{const i=t[r];return i!=null?String(i):`<${r}?>`})}const _l=/\{\$([^}]+)}/g;function kf(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function Hr(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const i of e){if(!r.includes(i))return!1;const o=n[i],u=t[i];if(Xi(o)&&Xi(u)){if(!Hr(o,u))return!1}else if(o!==u)return!1}for(const i of r)if(!e.includes(i))return!1;return!0}function Xi(n){return n!==null&&typeof n=="object"}/**
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
 */function Of(n){const t=[];for(const[e,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(i))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function xf(n){const t={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,o]=r.split("=");t[decodeURIComponent(i)]=decodeURIComponent(o)}}),t}function Mf(n){const t=n.indexOf("?");if(!t)return"";const e=n.indexOf("#",t);return n.substring(t,e>0?e:void 0)}function Lf(n,t){const e=new yl(n,t);return e.subscribe.bind(e)}class yl{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,r){let i;if(t===void 0&&e===void 0&&r===void 0)throw new Error("Missing Observer.");El(t,["next","error","complete"])?i=t:i={next:t,error:e,complete:r},i.next===void 0&&(i.next=jr),i.error===void 0&&(i.error=jr),i.complete===void 0&&(i.complete=jr);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function El(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function jr(){}/**
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
 */function me(n){return n&&n._delegate?n._delegate:n}class en{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const Zt="[DEFAULT]";/**
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
 */class vl{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new ll;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:e});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),i=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Il(t))try{this.getOrInitializeService({instanceIdentifier:Zt})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=Zt){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Zt){return this.instances.has(t)}getOptions(t=Zt){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,u]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&u.resolve(i)}return i}onInit(t,e){var r;const i=this.normalizeInstanceIdentifier(e),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(i,o);const u=this.instances.get(i);return u&&t(u,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const i of r)try{i(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Tl(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=Zt){return this.component?this.component.multipleInstances?t:Zt:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Tl(n){return n===Zt?void 0:n}function Il(n){return n.instantiationMode==="EAGER"}/**
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
 */class Al{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new vl(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var q;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(q||(q={}));const wl={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},Rl=q.INFO,Pl={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},Sl=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),i=Pl[t];if(i)console[i](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Ho{constructor(t){this.name=t,this._logLevel=Rl,this._logHandler=Sl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in q))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?wl[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...t),this._logHandler(this,q.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...t),this._logHandler(this,q.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,q.INFO,...t),this._logHandler(this,q.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,q.WARN,...t),this._logHandler(this,q.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...t),this._logHandler(this,q.ERROR,...t)}}/**
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
 */class Vl{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Cl(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Cl(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Qr="@firebase/app",Ji="0.10.13";/**
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
 */const Ot=new Ho("@firebase/app"),bl="@firebase/app-compat",Dl="@firebase/analytics-compat",Nl="@firebase/analytics",kl="@firebase/app-check-compat",Ol="@firebase/app-check",xl="@firebase/auth",Ml="@firebase/auth-compat",Ll="@firebase/database",Fl="@firebase/data-connect",Ul="@firebase/database-compat",Bl="@firebase/functions",ql="@firebase/functions-compat",jl="@firebase/installations",$l="@firebase/installations-compat",zl="@firebase/messaging",Gl="@firebase/messaging-compat",Kl="@firebase/performance",Wl="@firebase/performance-compat",Hl="@firebase/remote-config",Ql="@firebase/remote-config-compat",Yl="@firebase/storage",Xl="@firebase/storage-compat",Jl="@firebase/firestore",Zl="@firebase/vertexai-preview",tc="@firebase/firestore-compat",ec="firebase",nc="10.14.1";/**
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
 */const Yr="[DEFAULT]",rc={[Qr]:"fire-core",[bl]:"fire-core-compat",[Nl]:"fire-analytics",[Dl]:"fire-analytics-compat",[Ol]:"fire-app-check",[kl]:"fire-app-check-compat",[xl]:"fire-auth",[Ml]:"fire-auth-compat",[Ll]:"fire-rtdb",[Fl]:"fire-data-connect",[Ul]:"fire-rtdb-compat",[Bl]:"fire-fn",[ql]:"fire-fn-compat",[jl]:"fire-iid",[$l]:"fire-iid-compat",[zl]:"fire-fcm",[Gl]:"fire-fcm-compat",[Kl]:"fire-perf",[Wl]:"fire-perf-compat",[Hl]:"fire-rc",[Ql]:"fire-rc-compat",[Yl]:"fire-gcs",[Xl]:"fire-gcs-compat",[Jl]:"fire-fst",[tc]:"fire-fst-compat",[Zl]:"fire-vertex","fire-js":"fire-js",[ec]:"fire-js-all"};/**
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
 */const Yn=new Map,sc=new Map,Xr=new Map;function Zi(n,t){try{n.container.addComponent(t)}catch(e){Ot.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function Xn(n){const t=n.name;if(Xr.has(t))return Ot.debug(`There were multiple attempts to register component ${t}.`),!1;Xr.set(t,n);for(const e of Yn.values())Zi(e,n);for(const e of sc.values())Zi(e,n);return!0}function ic(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function Ff(n){return n.settings!==void 0}/**
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
 */const oc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},jt=new Wo("app","Firebase",oc);/**
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
 */class ac{constructor(t,e,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new en("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw jt.create("app-deleted",{appName:this._name})}}/**
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
 */const uc=nc;function lc(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r=Object.assign({name:Yr,automaticDataCollectionEnabled:!1},t),i=r.name;if(typeof i!="string"||!i)throw jt.create("bad-app-name",{appName:String(i)});if(e||(e=Ko()),!e)throw jt.create("no-options");const o=Yn.get(i);if(o){if(Hr(e,o.options)&&Hr(r,o.config))return o;throw jt.create("duplicate-app",{appName:i})}const u=new Al(i);for(const h of Xr.values())u.addComponent(h);const c=new ac(e,r,u);return Yn.set(i,c),c}function cc(n=Yr){const t=Yn.get(n);if(!t&&n===Yr&&Ko())return lc();if(!t)throw jt.create("no-app",{appName:n});return t}function Ye(n,t,e){var r;let i=(r=rc[n])!==null&&r!==void 0?r:n;e&&(i+=`-${e}`);const o=i.match(/\s|\//),u=t.match(/\s|\//);if(o||u){const c=[`Unable to register library "${i}" with version "${t}":`];o&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&u&&c.push("and"),u&&c.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Ot.warn(c.join(" "));return}Xn(new en(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}/**
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
 */const hc="firebase-heartbeat-database",dc=1,nn="firebase-heartbeat-store";let $r=null;function Qo(){return $r||($r=Ju(hc,dc,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(nn)}catch(e){console.warn(e)}}}}).catch(n=>{throw jt.create("idb-open",{originalErrorMessage:n.message})})),$r}async function fc(n){try{const e=(await Qo()).transaction(nn),r=await e.objectStore(nn).get(Yo(n));return await e.done,r}catch(t){if(t instanceof Ae)Ot.warn(t.message);else{const e=jt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Ot.warn(e.message)}}}async function to(n,t){try{const r=(await Qo()).transaction(nn,"readwrite");await r.objectStore(nn).put(t,Yo(n)),await r.done}catch(e){if(e instanceof Ae)Ot.warn(e.message);else{const r=jt.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Ot.warn(r.message)}}}function Yo(n){return`${n.name}!${n.options.appId}`}/**
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
 */const pc=1024,mc=30*24*60*60*1e3;class gc{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new yc(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=eo();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(u=>u.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(u=>{const c=new Date(u.date).valueOf();return Date.now()-c<=mc}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Ot.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=eo(),{heartbeatsToSend:r,unsentEntries:i}=_c(this._heartbeatsCache.heartbeats),o=Qn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return Ot.warn(e),""}}}function eo(){return new Date().toISOString().substring(0,10)}function _c(n,t=pc){const e=[];let r=n.slice();for(const i of n){const o=e.find(u=>u.agent===i.agent);if(o){if(o.dates.push(i.date),no(e)>t){o.dates.pop();break}}else if(e.push({agent:i.agent,dates:[i.date]}),no(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class yc{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return fl()?pl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await fc(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const i=await this.read();return to(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const i=await this.read();return to(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}}function no(n){return Qn(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function Ec(n){Xn(new en("platform-logger",t=>new Vl(t),"PRIVATE")),Xn(new en("heartbeat",t=>new gc(t),"PRIVATE")),Ye(Qr,Ji,n),Ye(Qr,Ji,"esm2017"),Ye("fire-js","")}Ec("");var ro=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ee,Xo;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(v,p){function _(){}_.prototype=p.prototype,v.D=p.prototype,v.prototype=new _,v.prototype.constructor=v,v.C=function(y,E,I){for(var g=Array(arguments.length-2),bt=2;bt<arguments.length;bt++)g[bt-2]=arguments[bt];return p.prototype[E].apply(y,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(r,e),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,p,_){_||(_=0);var y=Array(16);if(typeof p=="string")for(var E=0;16>E;++E)y[E]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(E=0;16>E;++E)y[E]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=v.g[0],_=v.g[1],E=v.g[2];var I=v.g[3],g=p+(I^_&(E^I))+y[0]+3614090360&4294967295;p=_+(g<<7&4294967295|g>>>25),g=I+(E^p&(_^E))+y[1]+3905402710&4294967295,I=p+(g<<12&4294967295|g>>>20),g=E+(_^I&(p^_))+y[2]+606105819&4294967295,E=I+(g<<17&4294967295|g>>>15),g=_+(p^E&(I^p))+y[3]+3250441966&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(I^_&(E^I))+y[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=I+(E^p&(_^E))+y[5]+1200080426&4294967295,I=p+(g<<12&4294967295|g>>>20),g=E+(_^I&(p^_))+y[6]+2821735955&4294967295,E=I+(g<<17&4294967295|g>>>15),g=_+(p^E&(I^p))+y[7]+4249261313&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(I^_&(E^I))+y[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=I+(E^p&(_^E))+y[9]+2336552879&4294967295,I=p+(g<<12&4294967295|g>>>20),g=E+(_^I&(p^_))+y[10]+4294925233&4294967295,E=I+(g<<17&4294967295|g>>>15),g=_+(p^E&(I^p))+y[11]+2304563134&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(I^_&(E^I))+y[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=I+(E^p&(_^E))+y[13]+4254626195&4294967295,I=p+(g<<12&4294967295|g>>>20),g=E+(_^I&(p^_))+y[14]+2792965006&4294967295,E=I+(g<<17&4294967295|g>>>15),g=_+(p^E&(I^p))+y[15]+1236535329&4294967295,_=E+(g<<22&4294967295|g>>>10),g=p+(E^I&(_^E))+y[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=I+(_^E&(p^_))+y[6]+3225465664&4294967295,I=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(I^p))+y[11]+643717713&4294967295,E=I+(g<<14&4294967295|g>>>18),g=_+(I^p&(E^I))+y[0]+3921069994&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^I&(_^E))+y[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=I+(_^E&(p^_))+y[10]+38016083&4294967295,I=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(I^p))+y[15]+3634488961&4294967295,E=I+(g<<14&4294967295|g>>>18),g=_+(I^p&(E^I))+y[4]+3889429448&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^I&(_^E))+y[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=I+(_^E&(p^_))+y[14]+3275163606&4294967295,I=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(I^p))+y[3]+4107603335&4294967295,E=I+(g<<14&4294967295|g>>>18),g=_+(I^p&(E^I))+y[8]+1163531501&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(E^I&(_^E))+y[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=I+(_^E&(p^_))+y[2]+4243563512&4294967295,I=p+(g<<9&4294967295|g>>>23),g=E+(p^_&(I^p))+y[7]+1735328473&4294967295,E=I+(g<<14&4294967295|g>>>18),g=_+(I^p&(E^I))+y[12]+2368359562&4294967295,_=E+(g<<20&4294967295|g>>>12),g=p+(_^E^I)+y[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=I+(p^_^E)+y[8]+2272392833&4294967295,I=p+(g<<11&4294967295|g>>>21),g=E+(I^p^_)+y[11]+1839030562&4294967295,E=I+(g<<16&4294967295|g>>>16),g=_+(E^I^p)+y[14]+4259657740&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^I)+y[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=I+(p^_^E)+y[4]+1272893353&4294967295,I=p+(g<<11&4294967295|g>>>21),g=E+(I^p^_)+y[7]+4139469664&4294967295,E=I+(g<<16&4294967295|g>>>16),g=_+(E^I^p)+y[10]+3200236656&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^I)+y[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=I+(p^_^E)+y[0]+3936430074&4294967295,I=p+(g<<11&4294967295|g>>>21),g=E+(I^p^_)+y[3]+3572445317&4294967295,E=I+(g<<16&4294967295|g>>>16),g=_+(E^I^p)+y[6]+76029189&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(_^E^I)+y[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=I+(p^_^E)+y[12]+3873151461&4294967295,I=p+(g<<11&4294967295|g>>>21),g=E+(I^p^_)+y[15]+530742520&4294967295,E=I+(g<<16&4294967295|g>>>16),g=_+(E^I^p)+y[2]+3299628645&4294967295,_=E+(g<<23&4294967295|g>>>9),g=p+(E^(_|~I))+y[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=I+(_^(p|~E))+y[7]+1126891415&4294967295,I=p+(g<<10&4294967295|g>>>22),g=E+(p^(I|~_))+y[14]+2878612391&4294967295,E=I+(g<<15&4294967295|g>>>17),g=_+(I^(E|~p))+y[5]+4237533241&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~I))+y[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=I+(_^(p|~E))+y[3]+2399980690&4294967295,I=p+(g<<10&4294967295|g>>>22),g=E+(p^(I|~_))+y[10]+4293915773&4294967295,E=I+(g<<15&4294967295|g>>>17),g=_+(I^(E|~p))+y[1]+2240044497&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~I))+y[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=I+(_^(p|~E))+y[15]+4264355552&4294967295,I=p+(g<<10&4294967295|g>>>22),g=E+(p^(I|~_))+y[6]+2734768916&4294967295,E=I+(g<<15&4294967295|g>>>17),g=_+(I^(E|~p))+y[13]+1309151649&4294967295,_=E+(g<<21&4294967295|g>>>11),g=p+(E^(_|~I))+y[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=I+(_^(p|~E))+y[11]+3174756917&4294967295,I=p+(g<<10&4294967295|g>>>22),g=E+(p^(I|~_))+y[2]+718787259&4294967295,E=I+(g<<15&4294967295|g>>>17),g=_+(I^(E|~p))+y[9]+3951481745&4294967295,v.g[0]=v.g[0]+p&4294967295,v.g[1]=v.g[1]+(E+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+E&4294967295,v.g[3]=v.g[3]+I&4294967295}r.prototype.u=function(v,p){p===void 0&&(p=v.length);for(var _=p-this.blockSize,y=this.B,E=this.h,I=0;I<p;){if(E==0)for(;I<=_;)i(this,v,I),I+=this.blockSize;if(typeof v=="string"){for(;I<p;)if(y[E++]=v.charCodeAt(I++),E==this.blockSize){i(this,y),E=0;break}}else for(;I<p;)if(y[E++]=v[I++],E==this.blockSize){i(this,y),E=0;break}}this.h=E,this.o+=p},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var p=1;p<v.length-8;++p)v[p]=0;var _=8*this.o;for(p=v.length-8;p<v.length;++p)v[p]=_&255,_/=256;for(this.u(v),v=Array(16),p=_=0;4>p;++p)for(var y=0;32>y;y+=8)v[_++]=this.g[p]>>>y&255;return v};function o(v,p){var _=c;return Object.prototype.hasOwnProperty.call(_,v)?_[v]:_[v]=p(v)}function u(v,p){this.h=p;for(var _=[],y=!0,E=v.length-1;0<=E;E--){var I=v[E]|0;y&&I==p||(_[E]=I,y=!1)}this.g=_}var c={};function h(v){return-128<=v&&128>v?o(v,function(p){return new u([p|0],0>p?-1:0)}):new u([v|0],0>v?-1:0)}function f(v){if(isNaN(v)||!isFinite(v))return A;if(0>v)return b(f(-v));for(var p=[],_=1,y=0;v>=_;y++)p[y]=v/_|0,_*=4294967296;return new u(p,0)}function m(v,p){if(v.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(v.charAt(0)=="-")return b(m(v.substring(1),p));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=f(Math.pow(p,8)),y=A,E=0;E<v.length;E+=8){var I=Math.min(8,v.length-E),g=parseInt(v.substring(E,E+I),p);8>I?(I=f(Math.pow(p,I)),y=y.j(I).add(f(g))):(y=y.j(_),y=y.add(f(g)))}return y}var A=h(0),R=h(1),V=h(16777216);n=u.prototype,n.m=function(){if(x(this))return-b(this).m();for(var v=0,p=1,_=0;_<this.g.length;_++){var y=this.i(_);v+=(0<=y?y:4294967296+y)*p,p*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(N(this))return"0";if(x(this))return"-"+b(this).toString(v);for(var p=f(Math.pow(v,6)),_=this,y="";;){var E=rt(_,p).g;_=G(_,E.j(p));var I=((0<_.g.length?_.g[0]:_.h)>>>0).toString(v);if(_=E,N(_))return I+y;for(;6>I.length;)I="0"+I;y=I+y}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function N(v){if(v.h!=0)return!1;for(var p=0;p<v.g.length;p++)if(v.g[p]!=0)return!1;return!0}function x(v){return v.h==-1}n.l=function(v){return v=G(this,v),x(v)?-1:N(v)?0:1};function b(v){for(var p=v.g.length,_=[],y=0;y<p;y++)_[y]=~v.g[y];return new u(_,~v.h).add(R)}n.abs=function(){return x(this)?b(this):this},n.add=function(v){for(var p=Math.max(this.g.length,v.g.length),_=[],y=0,E=0;E<=p;E++){var I=y+(this.i(E)&65535)+(v.i(E)&65535),g=(I>>>16)+(this.i(E)>>>16)+(v.i(E)>>>16);y=g>>>16,I&=65535,g&=65535,_[E]=g<<16|I}return new u(_,_[_.length-1]&-2147483648?-1:0)};function G(v,p){return v.add(b(p))}n.j=function(v){if(N(this)||N(v))return A;if(x(this))return x(v)?b(this).j(b(v)):b(b(this).j(v));if(x(v))return b(this.j(b(v)));if(0>this.l(V)&&0>v.l(V))return f(this.m()*v.m());for(var p=this.g.length+v.g.length,_=[],y=0;y<2*p;y++)_[y]=0;for(y=0;y<this.g.length;y++)for(var E=0;E<v.g.length;E++){var I=this.i(y)>>>16,g=this.i(y)&65535,bt=v.i(E)>>>16,Ce=v.i(E)&65535;_[2*y+2*E]+=g*Ce,K(_,2*y+2*E),_[2*y+2*E+1]+=I*Ce,K(_,2*y+2*E+1),_[2*y+2*E+1]+=g*bt,K(_,2*y+2*E+1),_[2*y+2*E+2]+=I*bt,K(_,2*y+2*E+2)}for(y=0;y<p;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=p;y<2*p;y++)_[y]=0;return new u(_,0)};function K(v,p){for(;(v[p]&65535)!=v[p];)v[p+1]+=v[p]>>>16,v[p]&=65535,p++}function H(v,p){this.g=v,this.h=p}function rt(v,p){if(N(p))throw Error("division by zero");if(N(v))return new H(A,A);if(x(v))return p=rt(b(v),p),new H(b(p.g),b(p.h));if(x(p))return p=rt(v,b(p)),new H(b(p.g),p.h);if(30<v.g.length){if(x(v)||x(p))throw Error("slowDivide_ only works with positive integers.");for(var _=R,y=p;0>=y.l(v);)_=Ct(_),y=Ct(y);var E=it(_,1),I=it(y,1);for(y=it(y,2),_=it(_,2);!N(y);){var g=I.add(y);0>=g.l(v)&&(E=E.add(_),I=g),y=it(y,1),_=it(_,1)}return p=G(v,E.j(p)),new H(E,p)}for(E=A;0<=v.l(p);){for(_=Math.max(1,Math.floor(v.m()/p.m())),y=Math.ceil(Math.log(_)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),I=f(_),g=I.j(p);x(g)||0<g.l(v);)_-=y,I=f(_),g=I.j(p);N(I)&&(I=R),E=E.add(I),v=G(v,g)}return new H(E,v)}n.A=function(v){return rt(this,v).h},n.and=function(v){for(var p=Math.max(this.g.length,v.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)&v.i(y);return new u(_,this.h&v.h)},n.or=function(v){for(var p=Math.max(this.g.length,v.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)|v.i(y);return new u(_,this.h|v.h)},n.xor=function(v){for(var p=Math.max(this.g.length,v.g.length),_=[],y=0;y<p;y++)_[y]=this.i(y)^v.i(y);return new u(_,this.h^v.h)};function Ct(v){for(var p=v.g.length+1,_=[],y=0;y<p;y++)_[y]=v.i(y)<<1|v.i(y-1)>>>31;return new u(_,v.h)}function it(v,p){var _=p>>5;p%=32;for(var y=v.g.length-_,E=[],I=0;I<y;I++)E[I]=0<p?v.i(I+_)>>>p|v.i(I+_+1)<<32-p:v.i(I+_);return new u(E,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Xo=r,u.prototype.add=u.prototype.add,u.prototype.multiply=u.prototype.j,u.prototype.modulo=u.prototype.A,u.prototype.compare=u.prototype.l,u.prototype.toNumber=u.prototype.m,u.prototype.toString=u.prototype.toString,u.prototype.getBits=u.prototype.i,u.fromNumber=f,u.fromString=m,ee=u}).apply(typeof ro<"u"?ro:typeof self<"u"?self:typeof window<"u"?window:{});var Un=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Jo,We,Zo,zn,Jr,ta,ea,na;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,a,l){return s==Array.prototype||s==Object.prototype||(s[a]=l.value),s};function e(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof Un=="object"&&Un];for(var a=0;a<s.length;++a){var l=s[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=e(this);function i(s,a){if(a)t:{var l=r;s=s.split(".");for(var d=0;d<s.length-1;d++){var T=s[d];if(!(T in l))break t;l=l[T]}s=s[s.length-1],d=l[s],a=a(d),a!=d&&a!=null&&t(l,s,{configurable:!0,writable:!0,value:a})}}function o(s,a){s instanceof String&&(s+="");var l=0,d=!1,T={next:function(){if(!d&&l<s.length){var w=l++;return{value:a(w,s[w]),done:!1}}return d=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(s){return s||function(){return o(this,function(a,l){return l})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var u=u||{},c=this||self;function h(s){var a=typeof s;return a=a!="object"?a:s?Array.isArray(s)?"array":a:"null",a=="array"||a=="object"&&typeof s.length=="number"}function f(s){var a=typeof s;return a=="object"&&s!=null||a=="function"}function m(s,a,l){return s.call.apply(s.bind,arguments)}function A(s,a,l){if(!s)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,d),s.apply(a,T)}}return function(){return s.apply(a,arguments)}}function R(s,a,l){return R=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:A,R.apply(null,arguments)}function V(s,a){var l=Array.prototype.slice.call(arguments,1);return function(){var d=l.slice();return d.push.apply(d,arguments),s.apply(this,d)}}function N(s,a){function l(){}l.prototype=a.prototype,s.aa=a.prototype,s.prototype=new l,s.prototype.constructor=s,s.Qb=function(d,T,w){for(var C=Array(arguments.length-2),W=2;W<arguments.length;W++)C[W-2]=arguments[W];return a.prototype[T].apply(d,C)}}function x(s){const a=s.length;if(0<a){const l=Array(a);for(let d=0;d<a;d++)l[d]=s[d];return l}return[]}function b(s,a){for(let l=1;l<arguments.length;l++){const d=arguments[l];if(h(d)){const T=s.length||0,w=d.length||0;s.length=T+w;for(let C=0;C<w;C++)s[T+C]=d[C]}else s.push(d)}}class G{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function K(s){return/^[\s\xa0]*$/.test(s)}function H(){var s=c.navigator;return s&&(s=s.userAgent)?s:""}function rt(s){return rt[" "](s),s}rt[" "]=function(){};var Ct=H().indexOf("Gecko")!=-1&&!(H().toLowerCase().indexOf("webkit")!=-1&&H().indexOf("Edge")==-1)&&!(H().indexOf("Trident")!=-1||H().indexOf("MSIE")!=-1)&&H().indexOf("Edge")==-1;function it(s,a,l){for(const d in s)a.call(l,s[d],d,s)}function v(s,a){for(const l in s)a.call(void 0,s[l],l,s)}function p(s){const a={};for(const l in s)a[l]=s[l];return a}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(s,a){let l,d;for(let T=1;T<arguments.length;T++){d=arguments[T];for(l in d)s[l]=d[l];for(let w=0;w<_.length;w++)l=_[w],Object.prototype.hasOwnProperty.call(d,l)&&(s[l]=d[l])}}function E(s){var a=1;s=s.split(":");const l=[];for(;0<a&&s.length;)l.push(s.shift()),a--;return s.length&&l.push(s.join(":")),l}function I(s){c.setTimeout(()=>{throw s},0)}function g(){var s=yr;let a=null;return s.g&&(a=s.g,s.g=s.g.next,s.g||(s.h=null),a.next=null),a}class bt{constructor(){this.h=this.g=null}add(a,l){const d=Ce.get();d.set(a,l),this.h?this.h.next=d:this.g=d,this.h=d}}var Ce=new G(()=>new _u,s=>s.reset());class _u{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let be,De=!1,yr=new bt,Ys=()=>{const s=c.Promise.resolve(void 0);be=()=>{s.then(yu)}};var yu=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(l){I(l)}var a=Ce;a.j(s),100>a.h&&(a.h++,s.next=a.g,a.g=s)}De=!1};function Lt(){this.s=this.s,this.C=this.C}Lt.prototype.s=!1,Lt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Lt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ht(s,a){this.type=s,this.g=this.target=a,this.defaultPrevented=!1}ht.prototype.h=function(){this.defaultPrevented=!0};var Eu=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var s=!1,a=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const l=()=>{};c.addEventListener("test",l,a),c.removeEventListener("test",l,a)}catch{}return s}();function Ne(s,a){if(ht.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var l=this.type=s.type,d=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=a,a=s.relatedTarget){if(Ct){t:{try{rt(a.nodeName);var T=!0;break t}catch{}T=!1}T||(a=null)}}else l=="mouseover"?a=s.fromElement:l=="mouseout"&&(a=s.toElement);this.relatedTarget=a,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:vu[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&Ne.aa.h.call(this)}}N(Ne,ht);var vu={2:"touch",3:"pen",4:"mouse"};Ne.prototype.h=function(){Ne.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var vn="closure_listenable_"+(1e6*Math.random()|0),Tu=0;function Iu(s,a,l,d,T){this.listener=s,this.proxy=null,this.src=a,this.type=l,this.capture=!!d,this.ha=T,this.key=++Tu,this.da=this.fa=!1}function Tn(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function In(s){this.src=s,this.g={},this.h=0}In.prototype.add=function(s,a,l,d,T){var w=s.toString();s=this.g[w],s||(s=this.g[w]=[],this.h++);var C=vr(s,a,d,T);return-1<C?(a=s[C],l||(a.fa=!1)):(a=new Iu(a,this.src,w,!!d,T),a.fa=l,s.push(a)),a};function Er(s,a){var l=a.type;if(l in s.g){var d=s.g[l],T=Array.prototype.indexOf.call(d,a,void 0),w;(w=0<=T)&&Array.prototype.splice.call(d,T,1),w&&(Tn(a),s.g[l].length==0&&(delete s.g[l],s.h--))}}function vr(s,a,l,d){for(var T=0;T<s.length;++T){var w=s[T];if(!w.da&&w.listener==a&&w.capture==!!l&&w.ha==d)return T}return-1}var Tr="closure_lm_"+(1e6*Math.random()|0),Ir={};function Xs(s,a,l,d,T){if(Array.isArray(a)){for(var w=0;w<a.length;w++)Xs(s,a[w],l,d,T);return null}return l=ti(l),s&&s[vn]?s.K(a,l,f(d)?!!d.capture:!1,T):Au(s,a,l,!1,d,T)}function Au(s,a,l,d,T,w){if(!a)throw Error("Invalid event type");var C=f(T)?!!T.capture:!!T,W=wr(s);if(W||(s[Tr]=W=new In(s)),l=W.add(a,l,d,C,w),l.proxy)return l;if(d=wu(),l.proxy=d,d.src=s,d.listener=l,s.addEventListener)Eu||(T=C),T===void 0&&(T=!1),s.addEventListener(a.toString(),d,T);else if(s.attachEvent)s.attachEvent(Zs(a.toString()),d);else if(s.addListener&&s.removeListener)s.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return l}function wu(){function s(l){return a.call(s.src,s.listener,l)}const a=Ru;return s}function Js(s,a,l,d,T){if(Array.isArray(a))for(var w=0;w<a.length;w++)Js(s,a[w],l,d,T);else d=f(d)?!!d.capture:!!d,l=ti(l),s&&s[vn]?(s=s.i,a=String(a).toString(),a in s.g&&(w=s.g[a],l=vr(w,l,d,T),-1<l&&(Tn(w[l]),Array.prototype.splice.call(w,l,1),w.length==0&&(delete s.g[a],s.h--)))):s&&(s=wr(s))&&(a=s.g[a.toString()],s=-1,a&&(s=vr(a,l,d,T)),(l=-1<s?a[s]:null)&&Ar(l))}function Ar(s){if(typeof s!="number"&&s&&!s.da){var a=s.src;if(a&&a[vn])Er(a.i,s);else{var l=s.type,d=s.proxy;a.removeEventListener?a.removeEventListener(l,d,s.capture):a.detachEvent?a.detachEvent(Zs(l),d):a.addListener&&a.removeListener&&a.removeListener(d),(l=wr(a))?(Er(l,s),l.h==0&&(l.src=null,a[Tr]=null)):Tn(s)}}}function Zs(s){return s in Ir?Ir[s]:Ir[s]="on"+s}function Ru(s,a){if(s.da)s=!0;else{a=new Ne(a,this);var l=s.listener,d=s.ha||s.src;s.fa&&Ar(s),s=l.call(d,a)}return s}function wr(s){return s=s[Tr],s instanceof In?s:null}var Rr="__closure_events_fn_"+(1e9*Math.random()>>>0);function ti(s){return typeof s=="function"?s:(s[Rr]||(s[Rr]=function(a){return s.handleEvent(a)}),s[Rr])}function dt(){Lt.call(this),this.i=new In(this),this.M=this,this.F=null}N(dt,Lt),dt.prototype[vn]=!0,dt.prototype.removeEventListener=function(s,a,l,d){Js(this,s,a,l,d)};function yt(s,a){var l,d=s.F;if(d)for(l=[];d;d=d.F)l.push(d);if(s=s.M,d=a.type||a,typeof a=="string")a=new ht(a,s);else if(a instanceof ht)a.target=a.target||s;else{var T=a;a=new ht(d,s),y(a,T)}if(T=!0,l)for(var w=l.length-1;0<=w;w--){var C=a.g=l[w];T=An(C,d,!0,a)&&T}if(C=a.g=s,T=An(C,d,!0,a)&&T,T=An(C,d,!1,a)&&T,l)for(w=0;w<l.length;w++)C=a.g=l[w],T=An(C,d,!1,a)&&T}dt.prototype.N=function(){if(dt.aa.N.call(this),this.i){var s=this.i,a;for(a in s.g){for(var l=s.g[a],d=0;d<l.length;d++)Tn(l[d]);delete s.g[a],s.h--}}this.F=null},dt.prototype.K=function(s,a,l,d){return this.i.add(String(s),a,!1,l,d)},dt.prototype.L=function(s,a,l,d){return this.i.add(String(s),a,!0,l,d)};function An(s,a,l,d){if(a=s.i.g[String(a)],!a)return!0;a=a.concat();for(var T=!0,w=0;w<a.length;++w){var C=a[w];if(C&&!C.da&&C.capture==l){var W=C.listener,ot=C.ha||C.src;C.fa&&Er(s.i,C),T=W.call(ot,d)!==!1&&T}}return T&&!d.defaultPrevented}function ei(s,a,l){if(typeof s=="function")l&&(s=R(s,l));else if(s&&typeof s.handleEvent=="function")s=R(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:c.setTimeout(s,a||0)}function ni(s){s.g=ei(()=>{s.g=null,s.i&&(s.i=!1,ni(s))},s.l);const a=s.h;s.h=null,s.m.apply(null,a)}class Pu extends Lt{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:ni(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ke(s){Lt.call(this),this.h=s,this.g={}}N(ke,Lt);var ri=[];function si(s){it(s.g,function(a,l){this.g.hasOwnProperty(l)&&Ar(a)},s),s.g={}}ke.prototype.N=function(){ke.aa.N.call(this),si(this)},ke.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Pr=c.JSON.stringify,Su=c.JSON.parse,Vu=class{stringify(s){return c.JSON.stringify(s,void 0)}parse(s){return c.JSON.parse(s,void 0)}};function Sr(){}Sr.prototype.h=null;function ii(s){return s.h||(s.h=s.i())}function oi(){}var Oe={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Vr(){ht.call(this,"d")}N(Vr,ht);function Cr(){ht.call(this,"c")}N(Cr,ht);var Qt={},ai=null;function wn(){return ai=ai||new dt}Qt.La="serverreachability";function ui(s){ht.call(this,Qt.La,s)}N(ui,ht);function xe(s){const a=wn();yt(a,new ui(a))}Qt.STAT_EVENT="statevent";function li(s,a){ht.call(this,Qt.STAT_EVENT,s),this.stat=a}N(li,ht);function Et(s){const a=wn();yt(a,new li(a,s))}Qt.Ma="timingevent";function ci(s,a){ht.call(this,Qt.Ma,s),this.size=a}N(ci,ht);function Me(s,a){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){s()},a)}function Le(){this.g=!0}Le.prototype.xa=function(){this.g=!1};function Cu(s,a,l,d,T,w){s.info(function(){if(s.g)if(w)for(var C="",W=w.split("&"),ot=0;ot<W.length;ot++){var j=W[ot].split("=");if(1<j.length){var ft=j[0];j=j[1];var pt=ft.split("_");C=2<=pt.length&&pt[1]=="type"?C+(ft+"="+j+"&"):C+(ft+"=redacted&")}}else C=null;else C=w;return"XMLHTTP REQ ("+d+") [attempt "+T+"]: "+a+`
`+l+`
`+C})}function bu(s,a,l,d,T,w,C){s.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+T+"]: "+a+`
`+l+`
`+w+" "+C})}function ae(s,a,l,d){s.info(function(){return"XMLHTTP TEXT ("+a+"): "+Nu(s,l)+(d?" "+d:"")})}function Du(s,a){s.info(function(){return"TIMEOUT: "+a})}Le.prototype.info=function(){};function Nu(s,a){if(!s.g)return a;if(!a)return null;try{var l=JSON.parse(a);if(l){for(s=0;s<l.length;s++)if(Array.isArray(l[s])){var d=l[s];if(!(2>d.length)){var T=d[1];if(Array.isArray(T)&&!(1>T.length)){var w=T[0];if(w!="noop"&&w!="stop"&&w!="close")for(var C=1;C<T.length;C++)T[C]=""}}}}return Pr(l)}catch{return a}}var Rn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},hi={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},br;function Pn(){}N(Pn,Sr),Pn.prototype.g=function(){return new XMLHttpRequest},Pn.prototype.i=function(){return{}},br=new Pn;function Ft(s,a,l,d){this.j=s,this.i=a,this.l=l,this.R=d||1,this.U=new ke(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new di}function di(){this.i=null,this.g="",this.h=!1}var fi={},Dr={};function Nr(s,a,l){s.L=1,s.v=bn(Dt(a)),s.m=l,s.P=!0,pi(s,null)}function pi(s,a){s.F=Date.now(),Sn(s),s.A=Dt(s.v);var l=s.A,d=s.R;Array.isArray(d)||(d=[String(d)]),Vi(l.i,"t",d),s.C=0,l=s.j.J,s.h=new di,s.g=Ki(s.j,l?a:null,!s.m),0<s.O&&(s.M=new Pu(R(s.Y,s,s.g),s.O)),a=s.U,l=s.g,d=s.ca;var T="readystatechange";Array.isArray(T)||(T&&(ri[0]=T.toString()),T=ri);for(var w=0;w<T.length;w++){var C=Xs(l,T[w],d||a.handleEvent,!1,a.h||a);if(!C)break;a.g[C.key]=C}a=s.H?p(s.H):{},s.m?(s.u||(s.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,a)):(s.u="GET",s.g.ea(s.A,s.u,null,a)),xe(),Cu(s.i,s.u,s.A,s.l,s.R,s.m)}Ft.prototype.ca=function(s){s=s.target;const a=this.M;a&&Nt(s)==3?a.j():this.Y(s)},Ft.prototype.Y=function(s){try{if(s==this.g)t:{const pt=Nt(this.g);var a=this.g.Ba();const ce=this.g.Z();if(!(3>pt)&&(pt!=3||this.g&&(this.h.h||this.g.oa()||xi(this.g)))){this.J||pt!=4||a==7||(a==8||0>=ce?xe(3):xe(2)),kr(this);var l=this.g.Z();this.X=l;e:if(mi(this)){var d=xi(this.g);s="";var T=d.length,w=Nt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Yt(this),Fe(this);var C="";break e}this.h.i=new c.TextDecoder}for(a=0;a<T;a++)this.h.h=!0,s+=this.h.i.decode(d[a],{stream:!(w&&a==T-1)});d.length=0,this.h.g+=s,this.C=0,C=this.h.g}else C=this.g.oa();if(this.o=l==200,bu(this.i,this.u,this.A,this.l,this.R,pt,l),this.o){if(this.T&&!this.K){e:{if(this.g){var W,ot=this.g;if((W=ot.g?ot.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(W)){var j=W;break e}}j=null}if(l=j)ae(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Or(this,l);else{this.o=!1,this.s=3,Et(12),Yt(this),Fe(this);break t}}if(this.P){l=!0;let At;for(;!this.J&&this.C<C.length;)if(At=ku(this,C),At==Dr){pt==4&&(this.s=4,Et(14),l=!1),ae(this.i,this.l,null,"[Incomplete Response]");break}else if(At==fi){this.s=4,Et(15),ae(this.i,this.l,C,"[Invalid Chunk]"),l=!1;break}else ae(this.i,this.l,At,null),Or(this,At);if(mi(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),pt!=4||C.length!=0||this.h.h||(this.s=1,Et(16),l=!1),this.o=this.o&&l,!l)ae(this.i,this.l,C,"[Invalid Chunked Response]"),Yt(this),Fe(this);else if(0<C.length&&!this.W){this.W=!0;var ft=this.j;ft.g==this&&ft.ba&&!ft.M&&(ft.j.info("Great, no buffering proxy detected. Bytes received: "+C.length),Br(ft),ft.M=!0,Et(11))}}else ae(this.i,this.l,C,null),Or(this,C);pt==4&&Yt(this),this.o&&!this.J&&(pt==4?ji(this.j,this):(this.o=!1,Sn(this)))}else Yu(this.g),l==400&&0<C.indexOf("Unknown SID")?(this.s=3,Et(12)):(this.s=0,Et(13)),Yt(this),Fe(this)}}}catch{}finally{}};function mi(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function ku(s,a){var l=s.C,d=a.indexOf(`
`,l);return d==-1?Dr:(l=Number(a.substring(l,d)),isNaN(l)?fi:(d+=1,d+l>a.length?Dr:(a=a.slice(d,d+l),s.C=d+l,a)))}Ft.prototype.cancel=function(){this.J=!0,Yt(this)};function Sn(s){s.S=Date.now()+s.I,gi(s,s.I)}function gi(s,a){if(s.B!=null)throw Error("WatchDog timer not null");s.B=Me(R(s.ba,s),a)}function kr(s){s.B&&(c.clearTimeout(s.B),s.B=null)}Ft.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(Du(this.i,this.A),this.L!=2&&(xe(),Et(17)),Yt(this),this.s=2,Fe(this)):gi(this,this.S-s)};function Fe(s){s.j.G==0||s.J||ji(s.j,s)}function Yt(s){kr(s);var a=s.M;a&&typeof a.ma=="function"&&a.ma(),s.M=null,si(s.U),s.g&&(a=s.g,s.g=null,a.abort(),a.ma())}function Or(s,a){try{var l=s.j;if(l.G!=0&&(l.g==s||xr(l.h,s))){if(!s.K&&xr(l.h,s)&&l.G==3){try{var d=l.Da.g.parse(a)}catch{d=null}if(Array.isArray(d)&&d.length==3){var T=d;if(T[0]==0){t:if(!l.u){if(l.g)if(l.g.F+3e3<s.F)Mn(l),On(l);else break t;Ur(l),Et(18)}}else l.za=T[1],0<l.za-l.T&&37500>T[2]&&l.F&&l.v==0&&!l.C&&(l.C=Me(R(l.Za,l),6e3));if(1>=Ei(l.h)&&l.ca){try{l.ca()}catch{}l.ca=void 0}}else Jt(l,11)}else if((s.K||l.g==s)&&Mn(l),!K(a))for(T=l.Da.g.parse(a),a=0;a<T.length;a++){let j=T[a];if(l.T=j[0],j=j[1],l.G==2)if(j[0]=="c"){l.K=j[1],l.ia=j[2];const ft=j[3];ft!=null&&(l.la=ft,l.j.info("VER="+l.la));const pt=j[4];pt!=null&&(l.Aa=pt,l.j.info("SVER="+l.Aa));const ce=j[5];ce!=null&&typeof ce=="number"&&0<ce&&(d=1.5*ce,l.L=d,l.j.info("backChannelRequestTimeoutMs_="+d)),d=l;const At=s.g;if(At){const Fn=At.g?At.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Fn){var w=d.h;w.g||Fn.indexOf("spdy")==-1&&Fn.indexOf("quic")==-1&&Fn.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(Mr(w,w.h),w.h=null))}if(d.D){const qr=At.g?At.g.getResponseHeader("X-HTTP-Session-Id"):null;qr&&(d.ya=qr,Q(d.I,d.D,qr))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-s.F,l.j.info("Handshake RTT: "+l.R+"ms")),d=l;var C=s;if(d.qa=Gi(d,d.J?d.ia:null,d.W),C.K){vi(d.h,C);var W=C,ot=d.L;ot&&(W.I=ot),W.B&&(kr(W),Sn(W)),d.g=C}else Bi(d);0<l.i.length&&xn(l)}else j[0]!="stop"&&j[0]!="close"||Jt(l,7);else l.G==3&&(j[0]=="stop"||j[0]=="close"?j[0]=="stop"?Jt(l,7):Fr(l):j[0]!="noop"&&l.l&&l.l.ta(j),l.v=0)}}xe(4)}catch{}}var Ou=class{constructor(s,a){this.g=s,this.map=a}};function _i(s){this.l=s||10,c.PerformanceNavigationTiming?(s=c.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function yi(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Ei(s){return s.h?1:s.g?s.g.size:0}function xr(s,a){return s.h?s.h==a:s.g?s.g.has(a):!1}function Mr(s,a){s.g?s.g.add(a):s.h=a}function vi(s,a){s.h&&s.h==a?s.h=null:s.g&&s.g.has(a)&&s.g.delete(a)}_i.prototype.cancel=function(){if(this.i=Ti(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function Ti(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let a=s.i;for(const l of s.g.values())a=a.concat(l.D);return a}return x(s.i)}function xu(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var a=[],l=s.length,d=0;d<l;d++)a.push(s[d]);return a}a=[],l=0;for(d in s)a[l++]=s[d];return a}function Mu(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var a=[];s=s.length;for(var l=0;l<s;l++)a.push(l);return a}a=[],l=0;for(const d in s)a[l++]=d;return a}}}function Ii(s,a){if(s.forEach&&typeof s.forEach=="function")s.forEach(a,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,a,void 0);else for(var l=Mu(s),d=xu(s),T=d.length,w=0;w<T;w++)a.call(void 0,d[w],l&&l[w],s)}var Ai=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Lu(s,a){if(s){s=s.split("&");for(var l=0;l<s.length;l++){var d=s[l].indexOf("="),T=null;if(0<=d){var w=s[l].substring(0,d);T=s[l].substring(d+1)}else w=s[l];a(w,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Xt(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof Xt){this.h=s.h,Vn(this,s.j),this.o=s.o,this.g=s.g,Cn(this,s.s),this.l=s.l;var a=s.i,l=new qe;l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),wi(this,l),this.m=s.m}else s&&(a=String(s).match(Ai))?(this.h=!1,Vn(this,a[1]||"",!0),this.o=Ue(a[2]||""),this.g=Ue(a[3]||"",!0),Cn(this,a[4]),this.l=Ue(a[5]||"",!0),wi(this,a[6]||"",!0),this.m=Ue(a[7]||"")):(this.h=!1,this.i=new qe(null,this.h))}Xt.prototype.toString=function(){var s=[],a=this.j;a&&s.push(Be(a,Ri,!0),":");var l=this.g;return(l||a=="file")&&(s.push("//"),(a=this.o)&&s.push(Be(a,Ri,!0),"@"),s.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&s.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(Be(l,l.charAt(0)=="/"?Bu:Uu,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",Be(l,ju)),s.join("")};function Dt(s){return new Xt(s)}function Vn(s,a,l){s.j=l?Ue(a,!0):a,s.j&&(s.j=s.j.replace(/:$/,""))}function Cn(s,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);s.s=a}else s.s=null}function wi(s,a,l){a instanceof qe?(s.i=a,$u(s.i,s.h)):(l||(a=Be(a,qu)),s.i=new qe(a,s.h))}function Q(s,a,l){s.i.set(a,l)}function bn(s){return Q(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function Ue(s,a){return s?a?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function Be(s,a,l){return typeof s=="string"?(s=encodeURI(s).replace(a,Fu),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function Fu(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var Ri=/[#\/\?@]/g,Uu=/[#\?:]/g,Bu=/[#\?]/g,qu=/[#\?@]/g,ju=/#/g;function qe(s,a){this.h=this.g=null,this.i=s||null,this.j=!!a}function Ut(s){s.g||(s.g=new Map,s.h=0,s.i&&Lu(s.i,function(a,l){s.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}n=qe.prototype,n.add=function(s,a){Ut(this),this.i=null,s=ue(this,s);var l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(a),this.h+=1,this};function Pi(s,a){Ut(s),a=ue(s,a),s.g.has(a)&&(s.i=null,s.h-=s.g.get(a).length,s.g.delete(a))}function Si(s,a){return Ut(s),a=ue(s,a),s.g.has(a)}n.forEach=function(s,a){Ut(this),this.g.forEach(function(l,d){l.forEach(function(T){s.call(a,T,d,this)},this)},this)},n.na=function(){Ut(this);const s=Array.from(this.g.values()),a=Array.from(this.g.keys()),l=[];for(let d=0;d<a.length;d++){const T=s[d];for(let w=0;w<T.length;w++)l.push(a[d])}return l},n.V=function(s){Ut(this);let a=[];if(typeof s=="string")Si(this,s)&&(a=a.concat(this.g.get(ue(this,s))));else{s=Array.from(this.g.values());for(let l=0;l<s.length;l++)a=a.concat(s[l])}return a},n.set=function(s,a){return Ut(this),this.i=null,s=ue(this,s),Si(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[a]),this.h+=1,this},n.get=function(s,a){return s?(s=this.V(s),0<s.length?String(s[0]):a):a};function Vi(s,a,l){Pi(s,a),0<l.length&&(s.i=null,s.g.set(ue(s,a),x(l)),s.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],a=Array.from(this.g.keys());for(var l=0;l<a.length;l++){var d=a[l];const w=encodeURIComponent(String(d)),C=this.V(d);for(d=0;d<C.length;d++){var T=w;C[d]!==""&&(T+="="+encodeURIComponent(String(C[d]))),s.push(T)}}return this.i=s.join("&")};function ue(s,a){return a=String(a),s.j&&(a=a.toLowerCase()),a}function $u(s,a){a&&!s.j&&(Ut(s),s.i=null,s.g.forEach(function(l,d){var T=d.toLowerCase();d!=T&&(Pi(this,d),Vi(this,T,l))},s)),s.j=a}function zu(s,a){const l=new Le;if(c.Image){const d=new Image;d.onload=V(Bt,l,"TestLoadImage: loaded",!0,a,d),d.onerror=V(Bt,l,"TestLoadImage: error",!1,a,d),d.onabort=V(Bt,l,"TestLoadImage: abort",!1,a,d),d.ontimeout=V(Bt,l,"TestLoadImage: timeout",!1,a,d),c.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=s}else a(!1)}function Gu(s,a){const l=new Le,d=new AbortController,T=setTimeout(()=>{d.abort(),Bt(l,"TestPingServer: timeout",!1,a)},1e4);fetch(s,{signal:d.signal}).then(w=>{clearTimeout(T),w.ok?Bt(l,"TestPingServer: ok",!0,a):Bt(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(T),Bt(l,"TestPingServer: error",!1,a)})}function Bt(s,a,l,d,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),d(l)}catch{}}function Ku(){this.g=new Vu}function Wu(s,a,l){const d=l||"";try{Ii(s,function(T,w){let C=T;f(T)&&(C=Pr(T)),a.push(d+w+"="+encodeURIComponent(C))})}catch(T){throw a.push(d+"type="+encodeURIComponent("_badmap")),T}}function Dn(s){this.l=s.Ub||null,this.j=s.eb||!1}N(Dn,Sr),Dn.prototype.g=function(){return new Nn(this.l,this.j)},Dn.prototype.i=function(s){return function(){return s}}({});function Nn(s,a){dt.call(this),this.D=s,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}N(Nn,dt),n=Nn.prototype,n.open=function(s,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=a,this.readyState=1,$e(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(a.body=s),(this.D||c).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,je(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,$e(this)),this.g&&(this.readyState=3,$e(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ci(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ci(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var a=s.value?s.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!s.done}))&&(this.response=this.responseText+=a)}s.done?je(this):$e(this),this.readyState==3&&Ci(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,je(this))},n.Qa=function(s){this.g&&(this.response=s,je(this))},n.ga=function(){this.g&&je(this)};function je(s){s.readyState=4,s.l=null,s.j=null,s.v=null,$e(s)}n.setRequestHeader=function(s,a){this.u.append(s,a)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=a.next();return s.join(`\r
`)};function $e(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Nn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function bi(s){let a="";return it(s,function(l,d){a+=d,a+=":",a+=l,a+=`\r
`}),a}function Lr(s,a,l){t:{for(d in l){var d=!1;break t}d=!0}d||(l=bi(l),typeof s=="string"?l!=null&&encodeURIComponent(String(l)):Q(s,a,l))}function J(s){dt.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}N(J,dt);var Hu=/^https?$/i,Qu=["POST","PUT"];n=J.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,a,l,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);a=a?a.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():br.g(),this.v=this.o?ii(this.o):ii(br),this.g.onreadystatechange=R(this.Ea,this);try{this.B=!0,this.g.open(a,String(s),!0),this.B=!1}catch(w){Di(this,w);return}if(s=l||"",l=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var T in d)l.set(T,d[T]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const w of d.keys())l.set(w,d.get(w));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(l.keys()).find(w=>w.toLowerCase()=="content-type"),T=c.FormData&&s instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Qu,a,void 0))||d||T||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,C]of l)this.g.setRequestHeader(w,C);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Oi(this),this.u=!0,this.g.send(s),this.u=!1}catch(w){Di(this,w)}};function Di(s,a){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=a,s.m=5,Ni(s),kn(s)}function Ni(s){s.A||(s.A=!0,yt(s,"complete"),yt(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,yt(this,"complete"),yt(this,"abort"),kn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),kn(this,!0)),J.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?ki(this):this.bb())},n.bb=function(){ki(this)};function ki(s){if(s.h&&typeof u<"u"&&(!s.v[1]||Nt(s)!=4||s.Z()!=2)){if(s.u&&Nt(s)==4)ei(s.Ea,0,s);else if(yt(s,"readystatechange"),Nt(s)==4){s.h=!1;try{const C=s.Z();t:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var l;if(!(l=a)){var d;if(d=C===0){var T=String(s.D).match(Ai)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),d=!Hu.test(T?T.toLowerCase():"")}l=d}if(l)yt(s,"complete"),yt(s,"success");else{s.m=6;try{var w=2<Nt(s)?s.g.statusText:""}catch{w=""}s.l=w+" ["+s.Z()+"]",Ni(s)}}finally{kn(s)}}}}function kn(s,a){if(s.g){Oi(s);const l=s.g,d=s.v[0]?()=>{}:null;s.g=null,s.v=null,a||yt(s,"ready");try{l.onreadystatechange=d}catch{}}}function Oi(s){s.I&&(c.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function Nt(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<Nt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(s){if(this.g){var a=this.g.responseText;return s&&a.indexOf(s)==0&&(a=a.substring(s.length)),Su(a)}};function xi(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch{return null}}function Yu(s){const a={};s=(s.g&&2<=Nt(s)&&s.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<s.length;d++){if(K(s[d]))continue;var l=E(s[d]);const T=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const w=a[T]||[];a[T]=w,w.push(l)}v(a,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ze(s,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||a}function Mi(s){this.Aa=0,this.i=[],this.j=new Le,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ze("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ze("baseRetryDelayMs",5e3,s),this.cb=ze("retryDelaySeedMs",1e4,s),this.Wa=ze("forwardChannelMaxRetries",2,s),this.wa=ze("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new _i(s&&s.concurrentRequestLimit),this.Da=new Ku,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Mi.prototype,n.la=8,n.G=1,n.connect=function(s,a,l,d){Et(0),this.W=s,this.H=a||{},l&&d!==void 0&&(this.H.OSID=l,this.H.OAID=d),this.F=this.X,this.I=Gi(this,null,this.W),xn(this)};function Fr(s){if(Li(s),s.G==3){var a=s.U++,l=Dt(s.I);if(Q(l,"SID",s.K),Q(l,"RID",a),Q(l,"TYPE","terminate"),Ge(s,l),a=new Ft(s,s.j,a),a.L=2,a.v=bn(Dt(l)),l=!1,c.navigator&&c.navigator.sendBeacon)try{l=c.navigator.sendBeacon(a.v.toString(),"")}catch{}!l&&c.Image&&(new Image().src=a.v,l=!0),l||(a.g=Ki(a.j,null),a.g.ea(a.v)),a.F=Date.now(),Sn(a)}zi(s)}function On(s){s.g&&(Br(s),s.g.cancel(),s.g=null)}function Li(s){On(s),s.u&&(c.clearTimeout(s.u),s.u=null),Mn(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&c.clearTimeout(s.s),s.s=null)}function xn(s){if(!yi(s.h)&&!s.s){s.s=!0;var a=s.Ga;be||Ys(),De||(be(),De=!0),yr.add(a,s),s.B=0}}function Xu(s,a){return Ei(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=a.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=Me(R(s.Ga,s,a),$i(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const T=new Ft(this,this.j,s);let w=this.o;if(this.S&&(w?(w=p(w),y(w,this.S)):w=this.S),this.m!==null||this.O||(T.H=w,w=null),this.P)t:{for(var a=0,l=0;l<this.i.length;l++){e:{var d=this.i[l];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(a+=d,4096<a){a=l;break t}if(a===4096||l===this.i.length-1){a=l+1;break t}}a=1e3}else a=1e3;a=Ui(this,T,a),l=Dt(this.I),Q(l,"RID",s),Q(l,"CVER",22),this.D&&Q(l,"X-HTTP-Session-Id",this.D),Ge(this,l),w&&(this.O?a="headers="+encodeURIComponent(String(bi(w)))+"&"+a:this.m&&Lr(l,this.m,w)),Mr(this.h,T),this.Ua&&Q(l,"TYPE","init"),this.P?(Q(l,"$req",a),Q(l,"SID","null"),T.T=!0,Nr(T,l,null)):Nr(T,l,a),this.G=2}}else this.G==3&&(s?Fi(this,s):this.i.length==0||yi(this.h)||Fi(this))};function Fi(s,a){var l;a?l=a.l:l=s.U++;const d=Dt(s.I);Q(d,"SID",s.K),Q(d,"RID",l),Q(d,"AID",s.T),Ge(s,d),s.m&&s.o&&Lr(d,s.m,s.o),l=new Ft(s,s.j,l,s.B+1),s.m===null&&(l.H=s.o),a&&(s.i=a.D.concat(s.i)),a=Ui(s,l,1e3),l.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),Mr(s.h,l),Nr(l,d,a)}function Ge(s,a){s.H&&it(s.H,function(l,d){Q(a,d,l)}),s.l&&Ii({},function(l,d){Q(a,d,l)})}function Ui(s,a,l){l=Math.min(s.i.length,l);var d=s.l?R(s.l.Na,s.l,s):null;t:{var T=s.i;let w=-1;for(;;){const C=["count="+l];w==-1?0<l?(w=T[0].g,C.push("ofs="+w)):w=0:C.push("ofs="+w);let W=!0;for(let ot=0;ot<l;ot++){let j=T[ot].g;const ft=T[ot].map;if(j-=w,0>j)w=Math.max(0,T[ot].g-100),W=!1;else try{Wu(ft,C,"req"+j+"_")}catch{d&&d(ft)}}if(W){d=C.join("&");break t}}}return s=s.i.splice(0,l),a.D=s,d}function Bi(s){if(!s.g&&!s.u){s.Y=1;var a=s.Fa;be||Ys(),De||(be(),De=!0),yr.add(a,s),s.v=0}}function Ur(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=Me(R(s.Fa,s),$i(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,qi(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=Me(R(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Et(10),On(this),qi(this))};function Br(s){s.A!=null&&(c.clearTimeout(s.A),s.A=null)}function qi(s){s.g=new Ft(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var a=Dt(s.qa);Q(a,"RID","rpc"),Q(a,"SID",s.K),Q(a,"AID",s.T),Q(a,"CI",s.F?"0":"1"),!s.F&&s.ja&&Q(a,"TO",s.ja),Q(a,"TYPE","xmlhttp"),Ge(s,a),s.m&&s.o&&Lr(a,s.m,s.o),s.L&&(s.g.I=s.L);var l=s.g;s=s.ia,l.L=1,l.v=bn(Dt(a)),l.m=null,l.P=!0,pi(l,s)}n.Za=function(){this.C!=null&&(this.C=null,On(this),Ur(this),Et(19))};function Mn(s){s.C!=null&&(c.clearTimeout(s.C),s.C=null)}function ji(s,a){var l=null;if(s.g==a){Mn(s),Br(s),s.g=null;var d=2}else if(xr(s.h,a))l=a.D,vi(s.h,a),d=1;else return;if(s.G!=0){if(a.o)if(d==1){l=a.m?a.m.length:0,a=Date.now()-a.F;var T=s.B;d=wn(),yt(d,new ci(d,l)),xn(s)}else Bi(s);else if(T=a.s,T==3||T==0&&0<a.X||!(d==1&&Xu(s,a)||d==2&&Ur(s)))switch(l&&0<l.length&&(a=s.h,a.i=a.i.concat(l)),T){case 1:Jt(s,5);break;case 4:Jt(s,10);break;case 3:Jt(s,6);break;default:Jt(s,2)}}}function $i(s,a){let l=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(l*=2),l*a}function Jt(s,a){if(s.j.info("Error code "+a),a==2){var l=R(s.fb,s),d=s.Xa;const T=!d;d=new Xt(d||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Vn(d,"https"),bn(d),T?zu(d.toString(),l):Gu(d.toString(),l)}else Et(2);s.G=0,s.l&&s.l.sa(a),zi(s),Li(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),Et(2)):(this.j.info("Failed to ping google.com"),Et(1))};function zi(s){if(s.G=0,s.ka=[],s.l){const a=Ti(s.h);(a.length!=0||s.i.length!=0)&&(b(s.ka,a),b(s.ka,s.i),s.h.i.length=0,x(s.i),s.i.length=0),s.l.ra()}}function Gi(s,a,l){var d=l instanceof Xt?Dt(l):new Xt(l);if(d.g!="")a&&(d.g=a+"."+d.g),Cn(d,d.s);else{var T=c.location;d=T.protocol,a=a?a+"."+T.hostname:T.hostname,T=+T.port;var w=new Xt(null);d&&Vn(w,d),a&&(w.g=a),T&&Cn(w,T),l&&(w.l=l),d=w}return l=s.D,a=s.ya,l&&a&&Q(d,l,a),Q(d,"VER",s.la),Ge(s,d),d}function Ki(s,a,l){if(a&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=s.Ca&&!s.pa?new J(new Dn({eb:l})):new J(s.pa),a.Ha(s.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Wi(){}n=Wi.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Ln(){}Ln.prototype.g=function(s,a){return new vt(s,a)};function vt(s,a){dt.call(this),this.g=new Mi(a),this.l=s,this.h=a&&a.messageUrlParams||null,s=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(s?s["X-WebChannel-Content-Type"]=a.messageContentType:s={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(s?s["X-WebChannel-Client-Profile"]=a.va:s={"X-WebChannel-Client-Profile":a.va}),this.g.S=s,(s=a&&a.Sb)&&!K(s)&&(this.g.m=s),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!K(a)&&(this.g.D=a,s=this.h,s!==null&&a in s&&(s=this.h,a in s&&delete s[a])),this.j=new le(this)}N(vt,dt),vt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},vt.prototype.close=function(){Fr(this.g)},vt.prototype.o=function(s){var a=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.u&&(l={},l.__data__=Pr(s),s=l);a.i.push(new Ou(a.Ya++,s)),a.G==3&&xn(a)},vt.prototype.N=function(){this.g.l=null,delete this.j,Fr(this.g),delete this.g,vt.aa.N.call(this)};function Hi(s){Vr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var a=s.__sm__;if(a){t:{for(const l in a){s=l;break t}s=void 0}(this.i=s)&&(s=this.i,a=a!==null&&s in a?a[s]:void 0),this.data=a}else this.data=s}N(Hi,Vr);function Qi(){Cr.call(this),this.status=1}N(Qi,Cr);function le(s){this.g=s}N(le,Wi),le.prototype.ua=function(){yt(this.g,"a")},le.prototype.ta=function(s){yt(this.g,new Hi(s))},le.prototype.sa=function(s){yt(this.g,new Qi)},le.prototype.ra=function(){yt(this.g,"b")},Ln.prototype.createWebChannel=Ln.prototype.g,vt.prototype.send=vt.prototype.o,vt.prototype.open=vt.prototype.m,vt.prototype.close=vt.prototype.close,na=function(){return new Ln},ea=function(){return wn()},ta=Qt,Jr={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Rn.NO_ERROR=0,Rn.TIMEOUT=8,Rn.HTTP_ERROR=6,zn=Rn,hi.COMPLETE="complete",Zo=hi,oi.EventType=Oe,Oe.OPEN="a",Oe.CLOSE="b",Oe.ERROR="c",Oe.MESSAGE="d",dt.prototype.listen=dt.prototype.K,We=oi,J.prototype.listenOnce=J.prototype.L,J.prototype.getLastError=J.prototype.Ka,J.prototype.getLastErrorCode=J.prototype.Ba,J.prototype.getStatus=J.prototype.Z,J.prototype.getResponseJson=J.prototype.Oa,J.prototype.getResponseText=J.prototype.oa,J.prototype.send=J.prototype.ea,J.prototype.setWithCredentials=J.prototype.Ha,Jo=J}).apply(typeof Un<"u"?Un:typeof self<"u"?self:typeof window<"u"?window:{});const so="@firebase/firestore";/**
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
 */class gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}gt.UNAUTHENTICATED=new gt(null),gt.GOOGLE_CREDENTIALS=new gt("google-credentials-uid"),gt.FIRST_PARTY=new gt("first-party-uid"),gt.MOCK_USER=new gt("mock-user");/**
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
 */let we="10.14.0";/**
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
 */const ne=new Ho("@firebase/firestore");function Ke(){return ne.logLevel}function k(n,...t){if(ne.logLevel<=q.DEBUG){const e=t.map(fs);ne.debug(`Firestore (${we}): ${n}`,...e)}}function xt(n,...t){if(ne.logLevel<=q.ERROR){const e=t.map(fs);ne.error(`Firestore (${we}): ${n}`,...e)}}function ge(n,...t){if(ne.logLevel<=q.WARN){const e=t.map(fs);ne.warn(`Firestore (${we}): ${n}`,...e)}}function fs(n){if(typeof n=="string")return n;try{/**
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
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
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
 */function M(n="Unexpected state"){const t=`FIRESTORE (${we}) INTERNAL ASSERTION FAILED: `+n;throw xt(t),new Error(t)}function z(n,t){n||M()}function F(n,t){return n}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends Ae{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class $t{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
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
 */class ra{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class vc{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(gt.UNAUTHENTICATED))}shutdown(){}}class Tc{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class Ic{constructor(t){this.t=t,this.currentUser=gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){z(this.o===void 0);let r=this.i;const i=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new $t;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new $t,t.enqueueRetryable(()=>i(this.currentUser))};const u=()=>{const h=o;t.enqueueRetryable(async()=>{await h.promise,await i(this.currentUser)})},c=h=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),u())};this.t.onInit(h=>c(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?c(h):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new $t)}},0),u()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(z(typeof r.accessToken=="string"),new ra(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return z(t===null||typeof t=="string"),new gt(t)}}class Ac{constructor(t,e,r){this.l=t,this.h=e,this.P=r,this.type="FirstParty",this.user=gt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class wc{constructor(t,e,r){this.l=t,this.h=e,this.P=r}getToken(){return Promise.resolve(new Ac(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(gt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Rc{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Pc{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){z(this.o===void 0);const r=o=>{o.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const u=o.token!==this.R;return this.R=o.token,k("FirebaseAppCheckTokenProvider",`Received ${u?"new":"existing"} token.`),u?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>r(o))};const i=o=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?i(o):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(z(typeof e.token=="string"),this.R=e.token,new Rc(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Sc(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
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
 */class sa{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let r="";for(;r.length<20;){const i=Sc(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<e&&(r+=t.charAt(i[o]%t.length))}return r}}function $(n,t){return n<t?-1:n>t?1:0}function _e(n,t,e){return n.length===t.length&&n.every((r,i)=>e(r,t[i]))}/**
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
 */class nt{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new D(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new D(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new D(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new D(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return nt.fromMillis(Date.now())}static fromDate(t){return nt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor(1e6*(t-1e3*e));return new nt(e,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?$(this.nanoseconds,t.nanoseconds):$(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class L{constructor(t){this.timestamp=t}static fromTimestamp(t){return new L(t)}static min(){return new L(new nt(0,0))}static max(){return new L(new nt(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class rn{constructor(t,e,r){e===void 0?e=0:e>t.length&&M(),r===void 0?r=t.length-e:r>t.length-e&&M(),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return rn.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof rn?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let i=0;i<r;i++){const o=t.get(i),u=e.get(i);if(o<u)return-1;if(o>u)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class Y extends rn{construct(t,e,r){return new Y(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new D(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(i=>i.length>0))}return new Y(e)}static emptyPath(){return new Y([])}}const Vc=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ut extends rn{construct(t,e,r){return new ut(t,e,r)}static isValidIdentifier(t){return Vc.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ut.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ut(["__name__"])}static fromServerFormat(t){const e=[];let r="",i=0;const o=()=>{if(r.length===0)throw new D(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let u=!1;for(;i<t.length;){const c=t[i];if(c==="\\"){if(i+1===t.length)throw new D(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new D(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,i+=2}else c==="`"?(u=!u,i++):c!=="."||u?(r+=c,i++):(o(),i++)}if(o(),u)throw new D(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ut(e)}static emptyPath(){return new ut([])}}/**
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
 */class O{constructor(t){this.path=t}static fromPath(t){return new O(Y.fromString(t))}static fromName(t){return new O(Y.fromString(t).popFirst(5))}static empty(){return new O(Y.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Y.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Y.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new O(new Y(t.slice()))}}function Cc(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=L.fromTimestamp(r===1e9?new nt(e+1,0):new nt(e,r));return new Gt(i,O.empty(),t)}function bc(n){return new Gt(n.readTime,n.key,-1)}class Gt{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Gt(L.min(),O.empty(),-1)}static max(){return new Gt(L.max(),O.empty(),-1)}}function Dc(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=O.comparator(n.documentKey,t.documentKey),e!==0?e:$(n.largestBatchId,t.largestBatchId))}/**
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
 */const Nc="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class kc{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
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
 */async function pn(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Nc)throw n;k("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class S{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new S((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof S?e:S.resolve(e)}catch(e){return S.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):S.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):S.reject(e)}static resolve(t){return new S((e,r)=>{e(t)})}static reject(t){return new S((e,r)=>{r(t)})}static waitFor(t){return new S((e,r)=>{let i=0,o=0,u=!1;t.forEach(c=>{++i,c.next(()=>{++o,u&&o===i&&e()},h=>r(h))}),u=!0,o===i&&e()})}static or(t){let e=S.resolve(!1);for(const r of t)e=e.next(i=>i?S.resolve(i):r());return e}static forEach(t,e){const r=[];return t.forEach((i,o)=>{r.push(e.call(this,i,o))}),this.waitFor(r)}static mapArray(t,e){return new S((r,i)=>{const o=t.length,u=new Array(o);let c=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next(m=>{u[f]=m,++c,c===o&&r(u)},m=>i(m))}})}static doWhile(t,e){return new S((r,i)=>{const o=()=>{t()===!0?e().next(()=>{o()},i):r()};o()})}}function Oc(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function mn(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class ps{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ie(r),this.se=r=>e.writeSequenceNumber(r))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}ps.oe=-1;function or(n){return n==null}function Jn(n){return n===0&&1/n==-1/0}function xc(n){return typeof n=="number"&&Number.isInteger(n)&&!Jn(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */function io(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Re(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function ia(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
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
 */class X{constructor(t,e){this.comparator=t,this.root=e||at.EMPTY}insert(t,e){return new X(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,at.BLACK,null,null))}remove(t){return new X(this.comparator,this.root.remove(t,this.comparator).copy(null,null,at.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(t,r.key);if(i===0)return e+r.left.size;i<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Bn(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Bn(this.root,t,this.comparator,!1)}getReverseIterator(){return new Bn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Bn(this.root,t,this.comparator,!0)}}class Bn{constructor(t,e,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class at{constructor(t,e,r,i,o){this.key=t,this.value=e,this.color=r??at.RED,this.left=i??at.EMPTY,this.right=o??at.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,i,o){return new at(t??this.key,e??this.value,r??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let i=this;const o=r(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,r),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return at.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return at.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,at.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,at.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw M();const t=this.left.check();if(t!==this.right.check())throw M();return t+(this.isRed()?0:1)}}at.EMPTY=null,at.RED=!0,at.BLACK=!1;at.EMPTY=new class{constructor(){this.size=0}get key(){throw M()}get value(){throw M()}get color(){throw M()}get left(){throw M()}get right(){throw M()}copy(t,e,r,i,o){return this}insert(t,e,r){return new at(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class lt{constructor(t){this.comparator=t,this.data=new X(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new oo(this.data.getIterator())}getIteratorFrom(t){return new oo(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof lt)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new lt(this.comparator);return e.data=t,e}}class oo{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class wt{constructor(t){this.fields=t,t.sort(ut.comparator)}static empty(){return new wt([])}unionWith(t){let e=new lt(ut.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new wt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return _e(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
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
 */class oa extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ct{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new oa("Invalid base64 string: "+o):o}}(t);return new ct(e)}static fromUint8Array(t){const e=function(i){let o="";for(let u=0;u<i.length;++u)o+=String.fromCharCode(i[u]);return o}(t);return new ct(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return $(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ct.EMPTY_BYTE_STRING=new ct("");const Mc=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Kt(n){if(z(!!n),typeof n=="string"){let t=0;const e=Mc.exec(n);if(z(!!e),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:Z(n.seconds),nanos:Z(n.nanos)}}function Z(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function re(n){return typeof n=="string"?ct.fromBase64String(n):ct.fromUint8Array(n)}/**
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
 */function ms(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function gs(n){const t=n.mapValue.fields.__previous_value__;return ms(t)?gs(t):t}function sn(n){const t=Kt(n.mapValue.fields.__local_write_time__.timestampValue);return new nt(t.seconds,t.nanos)}/**
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
 */class Lc{constructor(t,e,r,i,o,u,c,h,f){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=u,this.autoDetectLongPolling=c,this.longPollingOptions=h,this.useFetchStreams=f}}class on{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new on("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof on&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const qn={mapValue:{}};function se(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ms(n)?4:Uc(n)?9007199254740991:Fc(n)?10:11:M()}function Vt(n,t){if(n===t)return!0;const e=se(n);if(e!==se(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return sn(n).isEqual(sn(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const u=Kt(i.timestampValue),c=Kt(o.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(i,o){return re(i.bytesValue).isEqual(re(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(i,o){return Z(i.geoPointValue.latitude)===Z(o.geoPointValue.latitude)&&Z(i.geoPointValue.longitude)===Z(o.geoPointValue.longitude)}(n,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return Z(i.integerValue)===Z(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const u=Z(i.doubleValue),c=Z(o.doubleValue);return u===c?Jn(u)===Jn(c):isNaN(u)&&isNaN(c)}return!1}(n,t);case 9:return _e(n.arrayValue.values||[],t.arrayValue.values||[],Vt);case 10:case 11:return function(i,o){const u=i.mapValue.fields||{},c=o.mapValue.fields||{};if(io(u)!==io(c))return!1;for(const h in u)if(u.hasOwnProperty(h)&&(c[h]===void 0||!Vt(u[h],c[h])))return!1;return!0}(n,t);default:return M()}}function an(n,t){return(n.values||[]).find(e=>Vt(e,t))!==void 0}function ye(n,t){if(n===t)return 0;const e=se(n),r=se(t);if(e!==r)return $(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return $(n.booleanValue,t.booleanValue);case 2:return function(o,u){const c=Z(o.integerValue||o.doubleValue),h=Z(u.integerValue||u.doubleValue);return c<h?-1:c>h?1:c===h?0:isNaN(c)?isNaN(h)?0:-1:1}(n,t);case 3:return ao(n.timestampValue,t.timestampValue);case 4:return ao(sn(n),sn(t));case 5:return $(n.stringValue,t.stringValue);case 6:return function(o,u){const c=re(o),h=re(u);return c.compareTo(h)}(n.bytesValue,t.bytesValue);case 7:return function(o,u){const c=o.split("/"),h=u.split("/");for(let f=0;f<c.length&&f<h.length;f++){const m=$(c[f],h[f]);if(m!==0)return m}return $(c.length,h.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,u){const c=$(Z(o.latitude),Z(u.latitude));return c!==0?c:$(Z(o.longitude),Z(u.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return uo(n.arrayValue,t.arrayValue);case 10:return function(o,u){var c,h,f,m;const A=o.fields||{},R=u.fields||{},V=(c=A.value)===null||c===void 0?void 0:c.arrayValue,N=(h=R.value)===null||h===void 0?void 0:h.arrayValue,x=$(((f=V==null?void 0:V.values)===null||f===void 0?void 0:f.length)||0,((m=N==null?void 0:N.values)===null||m===void 0?void 0:m.length)||0);return x!==0?x:uo(V,N)}(n.mapValue,t.mapValue);case 11:return function(o,u){if(o===qn.mapValue&&u===qn.mapValue)return 0;if(o===qn.mapValue)return 1;if(u===qn.mapValue)return-1;const c=o.fields||{},h=Object.keys(c),f=u.fields||{},m=Object.keys(f);h.sort(),m.sort();for(let A=0;A<h.length&&A<m.length;++A){const R=$(h[A],m[A]);if(R!==0)return R;const V=ye(c[h[A]],f[m[A]]);if(V!==0)return V}return $(h.length,m.length)}(n.mapValue,t.mapValue);default:throw M()}}function ao(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return $(n,t);const e=Kt(n),r=Kt(t),i=$(e.seconds,r.seconds);return i!==0?i:$(e.nanos,r.nanos)}function uo(n,t){const e=n.values||[],r=t.values||[];for(let i=0;i<e.length&&i<r.length;++i){const o=ye(e[i],r[i]);if(o)return o}return $(e.length,r.length)}function Ee(n){return Zr(n)}function Zr(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=Kt(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return re(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return O.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",i=!0;for(const o of e.values||[])i?i=!1:r+=",",r+=Zr(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const u of r)o?o=!1:i+=",",i+=`${u}:${Zr(e.fields[u])}`;return i+"}"}(n.mapValue):M()}function lo(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function ts(n){return!!n&&"integerValue"in n}function _s(n){return!!n&&"arrayValue"in n}function co(n){return!!n&&"nullValue"in n}function ho(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Gn(n){return!!n&&"mapValue"in n}function Fc(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="__vector__"}function Xe(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return Re(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=Xe(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Xe(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Uc(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class It{constructor(t){this.value=t}static empty(){return new It({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Gn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Xe(e)}setAll(t){let e=ut.emptyPath(),r={},i=[];t.forEach((u,c)=>{if(!e.isImmediateParentOf(c)){const h=this.getFieldsMap(e);this.applyChanges(h,r,i),r={},i=[],e=c.popLast()}u?r[c.lastSegment()]=Xe(u):i.push(c.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,r,i)}delete(t){const e=this.field(t.popLast());Gn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Vt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let i=e.mapValue.fields[t.get(r)];Gn(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,r){Re(e,(i,o)=>t[i]=o);for(const i of r)delete t[i]}clone(){return new It(Xe(this.value))}}function aa(n){const t=[];return Re(n.fields,(e,r)=>{const i=new ut([e]);if(Gn(r)){const o=aa(r.mapValue).fields;if(o.length===0)t.push(i);else for(const u of o)t.push(i.child(u))}else t.push(i)}),new wt(t)}/**
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
 */class _t{constructor(t,e,r,i,o,u,c){this.key=t,this.documentType=e,this.version=r,this.readTime=i,this.createTime=o,this.data=u,this.documentState=c}static newInvalidDocument(t){return new _t(t,0,L.min(),L.min(),L.min(),It.empty(),0)}static newFoundDocument(t,e,r,i){return new _t(t,1,e,L.min(),r,i,0)}static newNoDocument(t,e){return new _t(t,2,e,L.min(),L.min(),It.empty(),0)}static newUnknownDocument(t,e){return new _t(t,3,e,L.min(),L.min(),It.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=It.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=It.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof _t&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new _t(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Zn{constructor(t,e){this.position=t,this.inclusive=e}}function fo(n,t,e){let r=0;for(let i=0;i<n.position.length;i++){const o=t[i],u=n.position[i];if(o.field.isKeyField()?r=O.comparator(O.fromName(u.referenceValue),e.key):r=ye(u,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function po(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Vt(n.position[e],t.position[e]))return!1;return!0}/**
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
 */class un{constructor(t,e="asc"){this.field=t,this.dir=e}}function Bc(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
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
 */class ua{}class et extends ua{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new jc(t,e,r):e==="array-contains"?new Gc(t,r):e==="in"?new Kc(t,r):e==="not-in"?new Wc(t,r):e==="array-contains-any"?new Hc(t,r):new et(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new $c(t,r):new zc(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(ye(e,this.value)):e!==null&&se(this.value)===se(e)&&this.matchesComparison(ye(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Rt extends ua{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Rt(t,e)}matches(t){return la(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function la(n){return n.op==="and"}function ca(n){return qc(n)&&la(n)}function qc(n){for(const t of n.filters)if(t instanceof Rt)return!1;return!0}function es(n){if(n instanceof et)return n.field.canonicalString()+n.op.toString()+Ee(n.value);if(ca(n))return n.filters.map(t=>es(t)).join(",");{const t=n.filters.map(e=>es(e)).join(",");return`${n.op}(${t})`}}function ha(n,t){return n instanceof et?function(r,i){return i instanceof et&&r.op===i.op&&r.field.isEqual(i.field)&&Vt(r.value,i.value)}(n,t):n instanceof Rt?function(r,i){return i instanceof Rt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((o,u,c)=>o&&ha(u,i.filters[c]),!0):!1}(n,t):void M()}function da(n){return n instanceof et?function(e){return`${e.field.canonicalString()} ${e.op} ${Ee(e.value)}`}(n):n instanceof Rt?function(e){return e.op.toString()+" {"+e.getFilters().map(da).join(" ,")+"}"}(n):"Filter"}class jc extends et{constructor(t,e,r){super(t,e,r),this.key=O.fromName(r.referenceValue)}matches(t){const e=O.comparator(t.key,this.key);return this.matchesComparison(e)}}class $c extends et{constructor(t,e){super(t,"in",e),this.keys=fa("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class zc extends et{constructor(t,e){super(t,"not-in",e),this.keys=fa("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function fa(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>O.fromName(r.referenceValue))}class Gc extends et{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return _s(e)&&an(e.arrayValue,this.value)}}class Kc extends et{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&an(this.value.arrayValue,e)}}class Wc extends et{constructor(t,e){super(t,"not-in",e)}matches(t){if(an(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!an(this.value.arrayValue,e)}}class Hc extends et{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!_s(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>an(this.value.arrayValue,r))}}/**
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
 */class Qc{constructor(t,e=null,r=[],i=[],o=null,u=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=u,this.endAt=c,this.ue=null}}function mo(n,t=null,e=[],r=[],i=null,o=null,u=null){return new Qc(n,t,e,r,i,o,u)}function ys(n){const t=F(n);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>es(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),or(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>Ee(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>Ee(r)).join(",")),t.ue=e}return t.ue}function Es(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Bc(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!ha(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!po(n.startAt,t.startAt)&&po(n.endAt,t.endAt)}function ns(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class Pe{constructor(t,e=null,r=[],i=[],o=null,u="F",c=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=u,this.startAt=c,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Yc(n,t,e,r,i,o,u,c){return new Pe(n,t,e,r,i,o,u,c)}function pa(n){return new Pe(n)}function go(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function ma(n){return n.collectionGroup!==null}function Je(n){const t=F(n);if(t.ce===null){t.ce=[];const e=new Set;for(const o of t.explicitOrderBy)t.ce.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(u){let c=new lt(ut.comparator);return u.filters.forEach(h=>{h.getFlattenedFilters().forEach(f=>{f.isInequality()&&(c=c.add(f.field))})}),c})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.ce.push(new un(o,r))}),e.has(ut.keyField().canonicalString())||t.ce.push(new un(ut.keyField(),r))}return t.ce}function Pt(n){const t=F(n);return t.le||(t.le=Xc(t,Je(n))),t.le}function Xc(n,t){if(n.limitType==="F")return mo(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new un(i.field,o)});const e=n.endAt?new Zn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Zn(n.startAt.position,n.startAt.inclusive):null;return mo(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function rs(n,t){const e=n.filters.concat([t]);return new Pe(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function tr(n,t,e){return new Pe(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function ar(n,t){return Es(Pt(n),Pt(t))&&n.limitType===t.limitType}function ga(n){return`${ys(Pt(n))}|lt:${n.limitType}`}function he(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(i=>da(i)).join(", ")}]`),or(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(i=>function(u){return`${u.field.canonicalString()} (${u.dir})`}(i)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(i=>Ee(i)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(i=>Ee(i)).join(",")),`Target(${r})`}(Pt(n))}; limitType=${n.limitType})`}function ur(n,t){return t.isFoundDocument()&&function(r,i){const o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):O.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,t)&&function(r,i){for(const o of Je(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,t)&&function(r,i){for(const o of r.filters)if(!o.matches(i))return!1;return!0}(n,t)&&function(r,i){return!(r.startAt&&!function(u,c,h){const f=fo(u,c,h);return u.inclusive?f<=0:f<0}(r.startAt,Je(r),i)||r.endAt&&!function(u,c,h){const f=fo(u,c,h);return u.inclusive?f>=0:f>0}(r.endAt,Je(r),i))}(n,t)}function Jc(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function _a(n){return(t,e)=>{let r=!1;for(const i of Je(n)){const o=Zc(i,t,e);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function Zc(n,t,e){const r=n.field.isKeyField()?O.comparator(t.key,e.key):function(o,u,c){const h=u.data.field(o),f=c.data.field(o);return h!==null&&f!==null?ye(h,f):M()}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M()}}/**
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
 */class Se{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[i,o]of r)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),i=this.inner[r];if(i===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],t))return r.length===1?delete this.inner[e]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(t){Re(this.inner,(e,r)=>{for(const[i,o]of r)t(i,o)})}isEmpty(){return ia(this.inner)}size(){return this.innerSize}}/**
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
 */const th=new X(O.comparator);function Mt(){return th}const ya=new X(O.comparator);function He(...n){let t=ya;for(const e of n)t=t.insert(e.key,e);return t}function Ea(n){let t=ya;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function te(){return Ze()}function va(){return Ze()}function Ze(){return new Se(n=>n.toString(),(n,t)=>n.isEqual(t))}const eh=new X(O.comparator),nh=new lt(O.comparator);function U(...n){let t=nh;for(const e of n)t=t.add(e);return t}const rh=new lt($);function sh(){return rh}/**
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
 */function vs(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Jn(t)?"-0":t}}function Ta(n){return{integerValue:""+n}}function Ia(n,t){return xc(t)?Ta(t):vs(n,t)}/**
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
 */class lr{constructor(){this._=void 0}}function ih(n,t,e){return n instanceof ln?function(i,o){const u={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&ms(o)&&(o=gs(o)),o&&(u.fields.__previous_value__=o),{mapValue:u}}(e,t):n instanceof cn?wa(n,t):n instanceof hn?Ra(n,t):function(i,o){const u=Aa(i,o),c=_o(u)+_o(i.Pe);return ts(u)&&ts(i.Pe)?Ta(c):vs(i.serializer,c)}(n,t)}function oh(n,t,e){return n instanceof cn?wa(n,t):n instanceof hn?Ra(n,t):e}function Aa(n,t){return n instanceof dn?function(r){return ts(r)||function(o){return!!o&&"doubleValue"in o}(r)}(t)?t:{integerValue:0}:null}class ln extends lr{}class cn extends lr{constructor(t){super(),this.elements=t}}function wa(n,t){const e=Pa(t);for(const r of n.elements)e.some(i=>Vt(i,r))||e.push(r);return{arrayValue:{values:e}}}class hn extends lr{constructor(t){super(),this.elements=t}}function Ra(n,t){let e=Pa(t);for(const r of n.elements)e=e.filter(i=>!Vt(i,r));return{arrayValue:{values:e}}}class dn extends lr{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function _o(n){return Z(n.integerValue||n.doubleValue)}function Pa(n){return _s(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class Sa{constructor(t,e){this.field=t,this.transform=e}}function ah(n,t){return n.field.isEqual(t.field)&&function(r,i){return r instanceof cn&&i instanceof cn||r instanceof hn&&i instanceof hn?_e(r.elements,i.elements,Vt):r instanceof dn&&i instanceof dn?Vt(r.Pe,i.Pe):r instanceof ln&&i instanceof ln}(n.transform,t.transform)}class uh{constructor(t,e){this.version=t,this.transformResults=e}}class kt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new kt}static exists(t){return new kt(void 0,t)}static updateTime(t){return new kt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Kn(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class cr{}function Va(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new ba(n.key,kt.none()):new gn(n.key,n.data,kt.none());{const e=n.data,r=It.empty();let i=new lt(ut.comparator);for(let o of t.fields)if(!i.has(o)){let u=e.field(o);u===null&&o.length>1&&(o=o.popLast(),u=e.field(o)),u===null?r.delete(o):r.set(o,u),i=i.add(o)}return new ie(n.key,r,new wt(i.toArray()),kt.none())}}function lh(n,t,e){n instanceof gn?function(i,o,u){const c=i.value.clone(),h=Eo(i.fieldTransforms,o,u.transformResults);c.setAll(h),o.convertToFoundDocument(u.version,c).setHasCommittedMutations()}(n,t,e):n instanceof ie?function(i,o,u){if(!Kn(i.precondition,o))return void o.convertToUnknownDocument(u.version);const c=Eo(i.fieldTransforms,o,u.transformResults),h=o.data;h.setAll(Ca(i)),h.setAll(c),o.convertToFoundDocument(u.version,h).setHasCommittedMutations()}(n,t,e):function(i,o,u){o.convertToNoDocument(u.version).setHasCommittedMutations()}(0,t,e)}function tn(n,t,e,r){return n instanceof gn?function(o,u,c,h){if(!Kn(o.precondition,u))return c;const f=o.value.clone(),m=vo(o.fieldTransforms,h,u);return f.setAll(m),u.convertToFoundDocument(u.version,f).setHasLocalMutations(),null}(n,t,e,r):n instanceof ie?function(o,u,c,h){if(!Kn(o.precondition,u))return c;const f=vo(o.fieldTransforms,h,u),m=u.data;return m.setAll(Ca(o)),m.setAll(f),u.convertToFoundDocument(u.version,m).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(A=>A.field))}(n,t,e,r):function(o,u,c){return Kn(o.precondition,u)?(u.convertToNoDocument(u.version).setHasLocalMutations(),null):c}(n,t,e)}function ch(n,t){let e=null;for(const r of n.fieldTransforms){const i=t.data.field(r.field),o=Aa(r.transform,i||null);o!=null&&(e===null&&(e=It.empty()),e.set(r.field,o))}return e||null}function yo(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&_e(r,i,(o,u)=>ah(o,u))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class gn extends cr{constructor(t,e,r,i=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class ie extends cr{constructor(t,e,r,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Ca(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function Eo(n,t,e){const r=new Map;z(n.length===e.length);for(let i=0;i<e.length;i++){const o=n[i],u=o.transform,c=t.data.field(o.field);r.set(o.field,oh(u,c,e[i]))}return r}function vo(n,t,e){const r=new Map;for(const i of n){const o=i.transform,u=e.data.field(i.field);r.set(i.field,ih(o,u,t))}return r}class ba extends cr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class hh extends cr{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class dh{constructor(t,e,r,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&lh(o,t,r[i])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=tn(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=tn(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=va();return this.mutations.forEach(i=>{const o=t.get(i.key),u=o.overlayedDocument;let c=this.applyToLocalView(u,o.mutatedFields);c=e.has(i.key)?null:c;const h=Va(u,c);h!==null&&r.set(i.key,h),u.isValidDocument()||u.convertToNoDocument(L.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),U())}isEqual(t){return this.batchId===t.batchId&&_e(this.mutations,t.mutations,(e,r)=>yo(e,r))&&_e(this.baseMutations,t.baseMutations,(e,r)=>yo(e,r))}}class Ts{constructor(t,e,r,i){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=i}static from(t,e,r){z(t.mutations.length===r.length);let i=function(){return eh}();const o=t.mutations;for(let u=0;u<o.length;u++)i=i.insert(o[u].key,r[u].version);return new Ts(t,e,r,i)}}/**
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
 */class fh{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
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
 */class ph{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var tt,B;function mh(n){switch(n){default:return M();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function Da(n){if(n===void 0)return xt("GRPC error has no .code"),P.UNKNOWN;switch(n){case tt.OK:return P.OK;case tt.CANCELLED:return P.CANCELLED;case tt.UNKNOWN:return P.UNKNOWN;case tt.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case tt.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case tt.INTERNAL:return P.INTERNAL;case tt.UNAVAILABLE:return P.UNAVAILABLE;case tt.UNAUTHENTICATED:return P.UNAUTHENTICATED;case tt.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case tt.NOT_FOUND:return P.NOT_FOUND;case tt.ALREADY_EXISTS:return P.ALREADY_EXISTS;case tt.PERMISSION_DENIED:return P.PERMISSION_DENIED;case tt.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case tt.ABORTED:return P.ABORTED;case tt.OUT_OF_RANGE:return P.OUT_OF_RANGE;case tt.UNIMPLEMENTED:return P.UNIMPLEMENTED;case tt.DATA_LOSS:return P.DATA_LOSS;default:return M()}}(B=tt||(tt={}))[B.OK=0]="OK",B[B.CANCELLED=1]="CANCELLED",B[B.UNKNOWN=2]="UNKNOWN",B[B.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",B[B.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",B[B.NOT_FOUND=5]="NOT_FOUND",B[B.ALREADY_EXISTS=6]="ALREADY_EXISTS",B[B.PERMISSION_DENIED=7]="PERMISSION_DENIED",B[B.UNAUTHENTICATED=16]="UNAUTHENTICATED",B[B.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",B[B.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",B[B.ABORTED=10]="ABORTED",B[B.OUT_OF_RANGE=11]="OUT_OF_RANGE",B[B.UNIMPLEMENTED=12]="UNIMPLEMENTED",B[B.INTERNAL=13]="INTERNAL",B[B.UNAVAILABLE=14]="UNAVAILABLE",B[B.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function gh(){return new TextEncoder}/**
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
 */const _h=new ee([4294967295,4294967295],0);function To(n){const t=gh().encode(n),e=new Xo;return e.update(t),new Uint8Array(e.digest())}function Io(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new ee([e,r],0),new ee([i,o],0)]}class Is{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Qe(`Invalid padding: ${e}`);if(r<0)throw new Qe(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Qe(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Qe(`Invalid padding when bitmap length is 0: ${e}`);this.Ie=8*t.length-e,this.Te=ee.fromNumber(this.Ie)}Ee(t,e,r){let i=t.add(e.multiply(ee.fromNumber(r)));return i.compare(_h)===1&&(i=new ee([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Ie===0)return!1;const e=To(t),[r,i]=Io(e);for(let o=0;o<this.hashCount;o++){const u=this.Ee(r,i,o);if(!this.de(u))return!1}return!0}static create(t,e,r){const i=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),u=new Is(o,i,e);return r.forEach(c=>u.insert(c)),u}insert(t){if(this.Ie===0)return;const e=To(t),[r,i]=Io(e);for(let o=0;o<this.hashCount;o++){const u=this.Ee(r,i,o);this.Ae(u)}}Ae(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Qe extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class hr{constructor(t,e,r,i,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const i=new Map;return i.set(t,_n.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new hr(L.min(),i,new X($),Mt(),U())}}class _n{constructor(t,e,r,i,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new _n(r,e,U(),U(),U())}}/**
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
 */class Wn{constructor(t,e,r,i){this.Re=t,this.removedTargetIds=e,this.key=r,this.Ve=i}}class Na{constructor(t,e){this.targetId=t,this.me=e}}class ka{constructor(t,e,r=ct.EMPTY_BYTE_STRING,i=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=i}}class Ao{constructor(){this.fe=0,this.ge=Ro(),this.pe=ct.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(t){t.approximateByteSize()>0&&(this.we=!0,this.pe=t)}ve(){let t=U(),e=U(),r=U();return this.ge.forEach((i,o)=>{switch(o){case 0:t=t.add(i);break;case 2:e=e.add(i);break;case 1:r=r.add(i);break;default:M()}}),new _n(this.pe,this.ye,t,e,r)}Ce(){this.we=!1,this.ge=Ro()}Fe(t,e){this.we=!0,this.ge=this.ge.insert(t,e)}Me(t){this.we=!0,this.ge=this.ge.remove(t)}xe(){this.fe+=1}Oe(){this.fe-=1,z(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class yh{constructor(t){this.Le=t,this.Be=new Map,this.ke=Mt(),this.qe=wo(),this.Qe=new X($)}Ke(t){for(const e of t.Re)t.Ve&&t.Ve.isFoundDocument()?this.$e(e,t.Ve):this.Ue(e,t.key,t.Ve);for(const e of t.removedTargetIds)this.Ue(e,t.key,t.Ve)}We(t){this.forEachTarget(t,e=>{const r=this.Ge(e);switch(t.state){case 0:this.ze(e)&&r.De(t.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(t.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(e);break;case 3:this.ze(e)&&(r.Ne(),r.De(t.resumeToken));break;case 4:this.ze(e)&&(this.je(e),r.De(t.resumeToken));break;default:M()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Be.forEach((r,i)=>{this.ze(i)&&e(i)})}He(t){const e=t.targetId,r=t.me.count,i=this.Je(e);if(i){const o=i.target;if(ns(o))if(r===0){const u=new O(o.path);this.Ue(e,u,_t.newNoDocument(u,L.min()))}else z(r===1);else{const u=this.Ye(e);if(u!==r){const c=this.Ze(t),h=c?this.Xe(c,t,u):1;if(h!==0){this.je(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(e,f)}}}}}Ze(t){const e=t.me.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:o=0}=e;let u,c;try{u=re(r).toUint8Array()}catch(h){if(h instanceof oa)return ge("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{c=new Is(u,i,o)}catch(h){return ge(h instanceof Qe?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return c.Ie===0?null:c}Xe(t,e,r){return e.me.count===r-this.nt(t,e.targetId)?0:2}nt(t,e){const r=this.Le.getRemoteKeysForTarget(e);let i=0;return r.forEach(o=>{const u=this.Le.tt(),c=`projects/${u.projectId}/databases/${u.database}/documents/${o.path.canonicalString()}`;t.mightContain(c)||(this.Ue(e,o,null),i++)}),i}rt(t){const e=new Map;this.Be.forEach((o,u)=>{const c=this.Je(u);if(c){if(o.current&&ns(c.target)){const h=new O(c.target.path);this.ke.get(h)!==null||this.it(u,h)||this.Ue(u,h,_t.newNoDocument(h,t))}o.be&&(e.set(u,o.ve()),o.Ce())}});let r=U();this.qe.forEach((o,u)=>{let c=!0;u.forEachWhile(h=>{const f=this.Je(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(o))}),this.ke.forEach((o,u)=>u.setReadTime(t));const i=new hr(t,e,this.Qe,this.ke,r);return this.ke=Mt(),this.qe=wo(),this.Qe=new X($),i}$e(t,e){if(!this.ze(t))return;const r=this.it(t,e.key)?2:0;this.Ge(t).Fe(e.key,r),this.ke=this.ke.insert(e.key,e),this.qe=this.qe.insert(e.key,this.st(e.key).add(t))}Ue(t,e,r){if(!this.ze(t))return;const i=this.Ge(t);this.it(t,e)?i.Fe(e,1):i.Me(e),this.qe=this.qe.insert(e,this.st(e).delete(t)),r&&(this.ke=this.ke.insert(e,r))}removeTarget(t){this.Be.delete(t)}Ye(t){const e=this.Ge(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}xe(t){this.Ge(t).xe()}Ge(t){let e=this.Be.get(t);return e||(e=new Ao,this.Be.set(t,e)),e}st(t){let e=this.qe.get(t);return e||(e=new lt($),this.qe=this.qe.insert(t,e)),e}ze(t){const e=this.Je(t)!==null;return e||k("WatchChangeAggregator","Detected inactive target",t),e}Je(t){const e=this.Be.get(t);return e&&e.Se?null:this.Le.ot(t)}je(t){this.Be.set(t,new Ao),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.Ue(t,e,null)})}it(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function wo(){return new X(O.comparator)}function Ro(){return new X(O.comparator)}const Eh={asc:"ASCENDING",desc:"DESCENDING"},vh={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Th={and:"AND",or:"OR"};class Ih{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function ss(n,t){return n.useProto3Json||or(t)?t:{value:t}}function er(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Oa(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Ah(n,t){return er(n,t.toTimestamp())}function St(n){return z(!!n),L.fromTimestamp(function(e){const r=Kt(e);return new nt(r.seconds,r.nanos)}(n))}function As(n,t){return is(n,t).canonicalString()}function is(n,t){const e=function(i){return new Y(["projects",i.projectId,"databases",i.database])}(n).child("documents");return t===void 0?e:e.child(t)}function xa(n){const t=Y.fromString(n);return z(Ba(t)),t}function os(n,t){return As(n.databaseId,t.path)}function zr(n,t){const e=xa(t);if(e.get(1)!==n.databaseId.projectId)throw new D(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new D(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new O(La(e))}function Ma(n,t){return As(n.databaseId,t)}function wh(n){const t=xa(n);return t.length===4?Y.emptyPath():La(t)}function as(n){return new Y(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function La(n){return z(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Po(n,t,e){return{name:os(n,t),fields:e.value.mapValue.fields}}function Rh(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:M()}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(f,m){return f.useProto3Json?(z(m===void 0||typeof m=="string"),ct.fromBase64String(m||"")):(z(m===void 0||m instanceof Buffer||m instanceof Uint8Array),ct.fromUint8Array(m||new Uint8Array))}(n,t.targetChange.resumeToken),u=t.targetChange.cause,c=u&&function(f){const m=f.code===void 0?P.UNKNOWN:Da(f.code);return new D(m,f.message||"")}(u);e=new ka(r,i,o,c||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=zr(n,r.document.name),o=St(r.document.updateTime),u=r.document.createTime?St(r.document.createTime):L.min(),c=new It({mapValue:{fields:r.document.fields}}),h=_t.newFoundDocument(i,o,u,c),f=r.targetIds||[],m=r.removedTargetIds||[];e=new Wn(f,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=zr(n,r.document),o=r.readTime?St(r.readTime):L.min(),u=_t.newNoDocument(i,o),c=r.removedTargetIds||[];e=new Wn([],c,u.key,u)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=zr(n,r.document),o=r.removedTargetIds||[];e=new Wn([],o,i,null)}else{if(!("filter"in t))return M();{t.filter;const r=t.filter;r.targetId;const{count:i=0,unchangedNames:o}=r,u=new ph(i,o),c=r.targetId;e=new Na(c,u)}}return e}function Ph(n,t){let e;if(t instanceof gn)e={update:Po(n,t.key,t.value)};else if(t instanceof ba)e={delete:os(n,t.key)};else if(t instanceof ie)e={update:Po(n,t.key,t.data),updateMask:xh(t.fieldMask)};else{if(!(t instanceof hh))return M();e={verify:os(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(o,u){const c=u.transform;if(c instanceof ln)return{fieldPath:u.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof cn)return{fieldPath:u.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof hn)return{fieldPath:u.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof dn)return{fieldPath:u.field.canonicalString(),increment:c.Pe};throw M()}(0,r))),t.precondition.isNone||(e.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:Ah(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:M()}(n,t.precondition)),e}function Sh(n,t){return n&&n.length>0?(z(t!==void 0),n.map(e=>function(i,o){let u=i.updateTime?St(i.updateTime):St(o);return u.isEqual(L.min())&&(u=St(o)),new uh(u,i.transformResults||[])}(e,t))):[]}function Vh(n,t){return{documents:[Ma(n,t.path)]}}function Ch(n,t){const e={structuredQuery:{}},r=t.path;let i;t.collectionGroup!==null?(i=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Ma(n,i);const o=function(f){if(f.length!==0)return Ua(Rt.create(f,"and"))}(t.filters);o&&(e.structuredQuery.where=o);const u=function(f){if(f.length!==0)return f.map(m=>function(R){return{field:de(R.field),direction:Nh(R.dir)}}(m))}(t.orderBy);u&&(e.structuredQuery.orderBy=u);const c=ss(n,t.limit);return c!==null&&(e.structuredQuery.limit=c),t.startAt&&(e.structuredQuery.startAt=function(f){return{before:f.inclusive,values:f.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(f){return{before:!f.inclusive,values:f.position}}(t.endAt)),{_t:e,parent:i}}function bh(n){let t=wh(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let i=null;if(r>0){z(r===1);const m=e.from[0];m.allDescendants?i=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=function(A){const R=Fa(A);return R instanceof Rt&&ca(R)?R.getFilters():[R]}(e.where));let u=[];e.orderBy&&(u=function(A){return A.map(R=>function(N){return new un(fe(N.field),function(b){switch(b){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(N.direction))}(R))}(e.orderBy));let c=null;e.limit&&(c=function(A){let R;return R=typeof A=="object"?A.value:A,or(R)?null:R}(e.limit));let h=null;e.startAt&&(h=function(A){const R=!!A.before,V=A.values||[];return new Zn(V,R)}(e.startAt));let f=null;return e.endAt&&(f=function(A){const R=!A.before,V=A.values||[];return new Zn(V,R)}(e.endAt)),Yc(t,i,u,o,c,"F",h,f)}function Dh(n,t){const e=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Fa(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=fe(e.unaryFilter.field);return et.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=fe(e.unaryFilter.field);return et.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=fe(e.unaryFilter.field);return et.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const u=fe(e.unaryFilter.field);return et.create(u,"!=",{nullValue:"NULL_VALUE"});default:return M()}}(n):n.fieldFilter!==void 0?function(e){return et.create(fe(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return M()}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Rt.create(e.compositeFilter.filters.map(r=>Fa(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M()}}(e.compositeFilter.op))}(n):M()}function Nh(n){return Eh[n]}function kh(n){return vh[n]}function Oh(n){return Th[n]}function de(n){return{fieldPath:n.canonicalString()}}function fe(n){return ut.fromServerFormat(n.fieldPath)}function Ua(n){return n instanceof et?function(e){if(e.op==="=="){if(ho(e.value))return{unaryFilter:{field:de(e.field),op:"IS_NAN"}};if(co(e.value))return{unaryFilter:{field:de(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(ho(e.value))return{unaryFilter:{field:de(e.field),op:"IS_NOT_NAN"}};if(co(e.value))return{unaryFilter:{field:de(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:de(e.field),op:kh(e.op),value:e.value}}}(n):n instanceof Rt?function(e){const r=e.getFilters().map(i=>Ua(i));return r.length===1?r[0]:{compositeFilter:{op:Oh(e.op),filters:r}}}(n):M()}function xh(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Ba(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class qt{constructor(t,e,r,i,o=L.min(),u=L.min(),c=ct.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=u,this.resumeToken=c,this.expectedCount=h}withSequenceNumber(t){return new qt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new qt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class Mh{constructor(t){this.ct=t}}function Lh(n){const t=bh({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?tr(t,t.limit,"L"):t}/**
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
 */class Fh{constructor(){this.un=new Uh}addToCollectionParentIndex(t,e){return this.un.add(e),S.resolve()}getCollectionParents(t,e){return S.resolve(this.un.getEntries(e))}addFieldIndex(t,e){return S.resolve()}deleteFieldIndex(t,e){return S.resolve()}deleteAllFieldIndexes(t){return S.resolve()}createTargetIndexes(t,e){return S.resolve()}getDocumentsMatchingTarget(t,e){return S.resolve(null)}getIndexType(t,e){return S.resolve(0)}getFieldIndexes(t,e){return S.resolve([])}getNextCollectionGroupToUpdate(t){return S.resolve(null)}getMinOffset(t,e){return S.resolve(Gt.min())}getMinOffsetFromCollectionGroup(t,e){return S.resolve(Gt.min())}updateCollectionGroup(t,e,r){return S.resolve()}updateIndexEntries(t,e){return S.resolve()}}class Uh{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),i=this.index[e]||new lt(Y.comparator),o=!i.has(r);return this.index[e]=i.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),i=this.index[e];return i&&i.has(r)}getEntries(t){return(this.index[t]||new lt(Y.comparator)).toArray()}}/**
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
 */class ve{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new ve(0)}static kn(){return new ve(-1)}}/**
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
 */class Bh{constructor(){this.changes=new Se(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,_t.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?S.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 *//**
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
 */class qh{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class jh{constructor(t,e,r,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=i}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(r=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(r!==null&&tn(r.mutation,i,wt.empty(),nt.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,U()).next(()=>r))}getLocalViewOfDocuments(t,e,r=U()){const i=te();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,r).next(o=>{let u=He();return o.forEach((c,h)=>{u=u.insert(c,h.overlayedDocument)}),u}))}getOverlayedDocuments(t,e){const r=te();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,U()))}populateOverlays(t,e,r){const i=[];return r.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((u,c)=>{e.set(u,c)})})}computeViews(t,e,r,i){let o=Mt();const u=Ze(),c=function(){return Ze()}();return e.forEach((h,f)=>{const m=r.get(f.key);i.has(f.key)&&(m===void 0||m.mutation instanceof ie)?o=o.insert(f.key,f):m!==void 0?(u.set(f.key,m.mutation.getFieldMask()),tn(m.mutation,f,m.mutation.getFieldMask(),nt.now())):u.set(f.key,wt.empty())}),this.recalculateAndSaveOverlays(t,o).next(h=>(h.forEach((f,m)=>u.set(f,m)),e.forEach((f,m)=>{var A;return c.set(f,new qh(m,(A=u.get(f))!==null&&A!==void 0?A:null))}),c))}recalculateAndSaveOverlays(t,e){const r=Ze();let i=new X((u,c)=>u-c),o=U();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(u=>{for(const c of u)c.keys().forEach(h=>{const f=e.get(h);if(f===null)return;let m=r.get(h)||wt.empty();m=c.applyToLocalView(f,m),r.set(h,m);const A=(i.get(c.batchId)||U()).add(h);i=i.insert(c.batchId,A)})}).next(()=>{const u=[],c=i.getReverseIterator();for(;c.hasNext();){const h=c.getNext(),f=h.key,m=h.value,A=va();m.forEach(R=>{if(!o.has(R)){const V=Va(e.get(R),r.get(R));V!==null&&A.set(R,V),o=o.add(R)}}),u.push(this.documentOverlayCache.saveOverlays(t,f,A))}return S.waitFor(u)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,i){return function(u){return O.isDocumentKey(u.path)&&u.collectionGroup===null&&u.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):ma(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,i):this.getDocumentsMatchingCollectionQuery(t,e,r,i)}getNextDocuments(t,e,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,i).next(o=>{const u=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,i-o.size):S.resolve(te());let c=-1,h=o;return u.next(f=>S.forEach(f,(m,A)=>(c<A.largestBatchId&&(c=A.largestBatchId),o.get(m)?S.resolve():this.remoteDocumentCache.getEntry(t,m).next(R=>{h=h.insert(m,R)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,h,f,U())).next(m=>({batchId:c,changes:Ea(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new O(e)).next(r=>{let i=He();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,r,i){const o=e.collectionGroup;let u=He();return this.indexManager.getCollectionParents(t,o).next(c=>S.forEach(c,h=>{const f=function(A,R){return new Pe(R,null,A.explicitOrderBy.slice(),A.filters.slice(),A.limit,A.limitType,A.startAt,A.endAt)}(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,i).next(m=>{m.forEach((A,R)=>{u=u.insert(A,R)})})}).next(()=>u))}getDocumentsMatchingCollectionQuery(t,e,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(u=>(o=u,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,i))).next(u=>{o.forEach((h,f)=>{const m=f.getKey();u.get(m)===null&&(u=u.insert(m,_t.newInvalidDocument(m)))});let c=He();return u.forEach((h,f)=>{const m=o.get(h);m!==void 0&&tn(m.mutation,f,wt.empty(),nt.now()),ur(e,f)&&(c=c.insert(h,f))}),c})}}/**
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
 */class $h{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,e){return S.resolve(this.hr.get(e))}saveBundleMetadata(t,e){return this.hr.set(e.id,function(i){return{id:i.id,version:i.version,createTime:St(i.createTime)}}(e)),S.resolve()}getNamedQuery(t,e){return S.resolve(this.Pr.get(e))}saveNamedQuery(t,e){return this.Pr.set(e.name,function(i){return{name:i.name,query:Lh(i.bundledQuery),readTime:St(i.readTime)}}(e)),S.resolve()}}/**
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
 */class zh{constructor(){this.overlays=new X(O.comparator),this.Ir=new Map}getOverlay(t,e){return S.resolve(this.overlays.get(e))}getOverlays(t,e){const r=te();return S.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&r.set(i,o)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((i,o)=>{this.ht(t,e,o)}),S.resolve()}removeOverlaysForBatchId(t,e,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(r)),S.resolve()}getOverlaysForCollection(t,e,r){const i=te(),o=e.length+1,u=new O(e.child("")),c=this.overlays.getIteratorFrom(u);for(;c.hasNext();){const h=c.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&i.set(h.getKey(),h)}return S.resolve(i)}getOverlaysForCollectionGroup(t,e,r,i){let o=new X((f,m)=>f-m);const u=this.overlays.getIterator();for(;u.hasNext();){const f=u.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let m=o.get(f.largestBatchId);m===null&&(m=te(),o=o.insert(f.largestBatchId,m)),m.set(f.getKey(),f)}}const c=te(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((f,m)=>c.set(f,m)),!(c.size()>=i)););return S.resolve(c)}ht(t,e,r){const i=this.overlays.get(r.key);if(i!==null){const u=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,u)}this.overlays=this.overlays.insert(r.key,new fh(e,r));let o=this.Ir.get(e);o===void 0&&(o=U(),this.Ir.set(e,o)),this.Ir.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
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
 */class Gh{constructor(){this.sessionToken=ct.EMPTY_BYTE_STRING}getSessionToken(t){return S.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,S.resolve()}}/**
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
 */class ws{constructor(){this.Tr=new lt(st.Er),this.dr=new lt(st.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,e){const r=new st(t,e);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.Vr(new st(t,e))}mr(t,e){t.forEach(r=>this.removeReference(r,e))}gr(t){const e=new O(new Y([])),r=new st(e,t),i=new st(e,t+1),o=[];return this.dr.forEachInRange([r,i],u=>{this.Vr(u),o.push(u.key)}),o}pr(){this.Tr.forEach(t=>this.Vr(t))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const e=new O(new Y([])),r=new st(e,t),i=new st(e,t+1);let o=U();return this.dr.forEachInRange([r,i],u=>{o=o.add(u.key)}),o}containsKey(t){const e=new st(t,0),r=this.Tr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class st{constructor(t,e){this.key=t,this.wr=e}static Er(t,e){return O.comparator(t.key,e.key)||$(t.wr,e.wr)}static Ar(t,e){return $(t.wr,e.wr)||O.comparator(t.key,e.key)}}/**
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
 */class Kh{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Sr=1,this.br=new lt(st.Er)}checkEmpty(t){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,i){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const u=new dh(o,e,r,i);this.mutationQueue.push(u);for(const c of i)this.br=this.br.add(new st(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return S.resolve(u)}lookupMutationBatch(t,e){return S.resolve(this.Dr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,i=this.vr(r),o=i<0?0:i;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(t){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new st(e,0),i=new st(e,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,i],u=>{const c=this.Dr(u.wr);o.push(c)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new lt($);return e.forEach(i=>{const o=new st(i,0),u=new st(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,u],c=>{r=r.add(c.wr)})}),S.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,i=r.length+1;let o=r;O.isDocumentKey(o)||(o=o.child(""));const u=new st(new O(o),0);let c=new lt($);return this.br.forEachWhile(h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===i&&(c=c.add(h.wr)),!0)},u),S.resolve(this.Cr(c))}Cr(t){const e=[];return t.forEach(r=>{const i=this.Dr(r);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){z(this.Fr(e.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return S.forEach(e.mutations,i=>{const o=new st(i.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.br=r})}On(t){}containsKey(t,e){const r=new st(e,0),i=this.br.firstAfterOrEqual(r);return S.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,S.resolve()}Fr(t,e){return this.vr(t)}vr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Dr(t){const e=this.vr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class Wh{constructor(t){this.Mr=t,this.docs=function(){return new X(O.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,i=this.docs.get(r),o=i?i.size:0,u=this.Mr(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:u}),this.size+=u-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return S.resolve(r?r.document.mutableCopy():_t.newInvalidDocument(e))}getEntries(t,e){let r=Mt();return e.forEach(i=>{const o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():_t.newInvalidDocument(i))}),S.resolve(r)}getDocumentsMatchingQuery(t,e,r,i){let o=Mt();const u=e.path,c=new O(u.child("")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:f,value:{document:m}}=h.getNext();if(!u.isPrefixOf(f.path))break;f.path.length>u.length+1||Dc(bc(m),r)<=0||(i.has(m.key)||ur(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(t,e,r,i){M()}Or(t,e){return S.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new Hh(this)}getSize(t){return S.resolve(this.size)}}class Hh extends Bh{constructor(t){super(),this.cr=t}applyChanges(t){const e=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?e.push(this.cr.addEntry(t,i)):this.cr.removeEntry(r)}),S.waitFor(e)}getFromCache(t,e){return this.cr.getEntry(t,e)}getAllFromCache(t,e){return this.cr.getEntries(t,e)}}/**
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
 */class Qh{constructor(t){this.persistence=t,this.Nr=new Se(e=>ys(e),Es),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.Lr=0,this.Br=new ws,this.targetCount=0,this.kr=ve.Bn()}forEachTarget(t,e){return this.Nr.forEach((r,i)=>e(i)),S.resolve()}getLastRemoteSnapshotVersion(t){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return S.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.Lr&&(this.Lr=e),S.resolve()}Kn(t){this.Nr.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.kr=new ve(e),this.highestTargetId=e),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,e){return this.Kn(e),this.targetCount+=1,S.resolve()}updateTargetData(t,e){return this.Kn(e),S.resolve()}removeTargetData(t,e){return this.Nr.delete(e.target),this.Br.gr(e.targetId),this.targetCount-=1,S.resolve()}removeTargets(t,e,r){let i=0;const o=[];return this.Nr.forEach((u,c)=>{c.sequenceNumber<=e&&r.get(c.targetId)===null&&(this.Nr.delete(u),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),i++)}),S.waitFor(o).next(()=>i)}getTargetCount(t){return S.resolve(this.targetCount)}getTargetData(t,e){const r=this.Nr.get(e)||null;return S.resolve(r)}addMatchingKeys(t,e,r){return this.Br.Rr(e,r),S.resolve()}removeMatchingKeys(t,e,r){this.Br.mr(e,r);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(u=>{o.push(i.markPotentiallyOrphaned(t,u))}),S.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.Br.gr(e),S.resolve()}getMatchingKeysForTargetId(t,e){const r=this.Br.yr(e);return S.resolve(r)}containsKey(t,e){return S.resolve(this.Br.containsKey(e))}}/**
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
 */class Yh{constructor(t,e){this.qr={},this.overlays={},this.Qr=new ps(0),this.Kr=!1,this.Kr=!0,this.$r=new Gh,this.referenceDelegate=t(this),this.Ur=new Qh(this),this.indexManager=new Fh,this.remoteDocumentCache=function(i){return new Wh(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new Mh(e),this.Gr=new $h(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new zh,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.qr[t.toKey()];return r||(r=new Kh(e,this.referenceDelegate),this.qr[t.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,e,r){k("MemoryPersistence","Starting transaction:",t);const i=new Xh(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(o=>this.referenceDelegate.jr(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Hr(t,e){return S.or(Object.values(this.qr).map(r=>()=>r.containsKey(t,e)))}}class Xh extends kc{constructor(t){super(),this.currentSequenceNumber=t}}class Rs{constructor(t){this.persistence=t,this.Jr=new ws,this.Yr=null}static Zr(t){return new Rs(t)}get Xr(){if(this.Yr)return this.Yr;throw M()}addReference(t,e,r){return this.Jr.addReference(r,e),this.Xr.delete(r.toString()),S.resolve()}removeReference(t,e,r){return this.Jr.removeReference(r,e),this.Xr.add(r.toString()),S.resolve()}markPotentiallyOrphaned(t,e){return this.Xr.add(e.toString()),S.resolve()}removeTarget(t,e){this.Jr.gr(e.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.Xr.add(o.toString()))}).next(()=>r.removeTargetData(t,e))}zr(){this.Yr=new Set}jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.Xr,r=>{const i=O.fromPath(r);return this.ei(t,i).next(o=>{o||e.removeEntry(i,L.min())})}).next(()=>(this.Yr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ei(t,e).next(r=>{r?this.Xr.delete(e.toString()):this.Xr.add(e.toString())})}Wr(t){return 0}ei(t,e){return S.or([()=>S.resolve(this.Jr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Hr(t,e)])}}/**
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
 */class Ps{constructor(t,e,r,i){this.targetId=t,this.fromCache=e,this.$i=r,this.Ui=i}static Wi(t,e){let r=U(),i=U();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Ps(t,e.fromCache,r,i)}}/**
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
 */class Jh{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class Zh{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return dl()?8:Oc(ds())>0?6:4}()}initialize(t,e){this.Ji=t,this.indexManager=e,this.Gi=!0}getDocumentsMatchingQuery(t,e,r,i){const o={result:null};return this.Yi(t,e).next(u=>{o.result=u}).next(()=>{if(!o.result)return this.Zi(t,e,i,r).next(u=>{o.result=u})}).next(()=>{if(o.result)return;const u=new Jh;return this.Xi(t,e,u).next(c=>{if(o.result=c,this.zi)return this.es(t,e,u,c.size)})}).next(()=>o.result)}es(t,e,r,i){return r.documentReadCount<this.ji?(Ke()<=q.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",he(e),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),S.resolve()):(Ke()<=q.DEBUG&&k("QueryEngine","Query:",he(e),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(Ke()<=q.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",he(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Pt(e))):S.resolve())}Yi(t,e){if(go(e))return S.resolve(null);let r=Pt(e);return this.indexManager.getIndexType(t,r).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=tr(e,null,"F"),r=Pt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(o=>{const u=U(...o);return this.Ji.getDocuments(t,u).next(c=>this.indexManager.getMinOffset(t,r).next(h=>{const f=this.ts(e,c);return this.ns(e,f,u,h.readTime)?this.Yi(t,tr(e,null,"F")):this.rs(t,f,e,h)}))})))}Zi(t,e,r,i){return go(e)||i.isEqual(L.min())?S.resolve(null):this.Ji.getDocuments(t,r).next(o=>{const u=this.ts(e,o);return this.ns(e,u,r,i)?S.resolve(null):(Ke()<=q.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),he(e)),this.rs(t,u,e,Cc(i,-1)).next(c=>c))})}ts(t,e){let r=new lt(_a(t));return e.forEach((i,o)=>{ur(t,o)&&(r=r.add(o))}),r}ns(t,e,r,i){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}Xi(t,e,r){return Ke()<=q.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",he(e)),this.Ji.getDocumentsMatchingQuery(t,e,Gt.min(),r)}rs(t,e,r,i){return this.Ji.getDocumentsMatchingQuery(t,r,i).next(o=>(e.forEach(u=>{o=o.insert(u.key,u)}),o))}}/**
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
 */class td{constructor(t,e,r,i){this.persistence=t,this.ss=e,this.serializer=i,this.os=new X($),this._s=new Se(o=>ys(o),Es),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(r)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new jh(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.os))}}function ed(n,t,e,r){return new td(n,t,e,r)}async function qa(n,t){const e=F(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let i;return e.mutationQueue.getAllMutationBatches(r).next(o=>(i=o,e.ls(t),e.mutationQueue.getAllMutationBatches(r))).next(o=>{const u=[],c=[];let h=U();for(const f of i){u.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}for(const f of o){c.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next(f=>({hs:f,removedBatchIds:u,addedBatchIds:c}))})})}function nd(n,t){const e=F(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=t.batch.keys(),o=e.cs.newChangeBuffer({trackRemovals:!0});return function(c,h,f,m){const A=f.batch,R=A.keys();let V=S.resolve();return R.forEach(N=>{V=V.next(()=>m.getEntry(h,N)).next(x=>{const b=f.docVersions.get(N);z(b!==null),x.version.compareTo(b)<0&&(A.applyToRemoteDocument(x,f),x.isValidDocument()&&(x.setReadTime(f.commitVersion),m.addEntry(x)))})}),V.next(()=>c.mutationQueue.removeMutationBatch(h,A))}(e,r,t,o).next(()=>o.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,i,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let h=U();for(let f=0;f<c.mutationResults.length;++f)c.mutationResults[f].transformResults.length>0&&(h=h.add(c.batch.mutations[f].key));return h}(t))).next(()=>e.localDocuments.getDocuments(r,i))})}function ja(n){const t=F(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ur.getLastRemoteSnapshotVersion(e))}function rd(n,t){const e=F(n),r=t.snapshotVersion;let i=e.os;return e.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const u=e.cs.newChangeBuffer({trackRemovals:!0});i=e.os;const c=[];t.targetChanges.forEach((m,A)=>{const R=i.get(A);if(!R)return;c.push(e.Ur.removeMatchingKeys(o,m.removedDocuments,A).next(()=>e.Ur.addMatchingKeys(o,m.addedDocuments,A)));let V=R.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(A)!==null?V=V.withResumeToken(ct.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):m.resumeToken.approximateByteSize()>0&&(V=V.withResumeToken(m.resumeToken,r)),i=i.insert(A,V),function(x,b,G){return x.resumeToken.approximateByteSize()===0||b.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=3e8?!0:G.addedDocuments.size+G.modifiedDocuments.size+G.removedDocuments.size>0}(R,V,m)&&c.push(e.Ur.updateTargetData(o,V))});let h=Mt(),f=U();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&c.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))}),c.push(sd(o,u,t.documentUpdates).next(m=>{h=m.Ps,f=m.Is})),!r.isEqual(L.min())){const m=e.Ur.getLastRemoteSnapshotVersion(o).next(A=>e.Ur.setTargetsMetadata(o,o.currentSequenceNumber,r));c.push(m)}return S.waitFor(c).next(()=>u.apply(o)).next(()=>e.localDocuments.getLocalViewOfDocuments(o,h,f)).next(()=>h)}).then(o=>(e.os=i,o))}function sd(n,t,e){let r=U(),i=U();return e.forEach(o=>r=r.add(o)),t.getEntries(n,r).next(o=>{let u=Mt();return e.forEach((c,h)=>{const f=o.get(c);h.isFoundDocument()!==f.isFoundDocument()&&(i=i.add(c)),h.isNoDocument()&&h.version.isEqual(L.min())?(t.removeEntry(c,h.readTime),u=u.insert(c,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),u=u.insert(c,h)):k("LocalStore","Ignoring outdated watch update for ",c,". Current version:",f.version," Watch version:",h.version)}),{Ps:u,Is:i}})}function id(n,t){const e=F(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function od(n,t){const e=F(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return e.Ur.getTargetData(r,t).next(o=>o?(i=o,S.resolve(i)):e.Ur.allocateTargetId(r).next(u=>(i=new qt(t,u,"TargetPurposeListen",r.currentSequenceNumber),e.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=e.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(e.os=e.os.insert(r.targetId,r),e._s.set(t,r.targetId)),r})}async function us(n,t,e){const r=F(n),i=r.os.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,u=>r.persistence.referenceDelegate.removeTarget(u,i))}catch(u){if(!mn(u))throw u;k("LocalStore",`Failed to update sequence numbers for target ${t}: ${u}`)}r.os=r.os.remove(t),r._s.delete(i.target)}function So(n,t,e){const r=F(n);let i=L.min(),o=U();return r.persistence.runTransaction("Execute query","readwrite",u=>function(h,f,m){const A=F(h),R=A._s.get(m);return R!==void 0?S.resolve(A.os.get(R)):A.Ur.getTargetData(f,m)}(r,u,Pt(t)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(u,c.targetId).next(h=>{o=h})}).next(()=>r.ss.getDocumentsMatchingQuery(u,t,e?i:L.min(),e?o:U())).next(c=>(ad(r,Jc(t),c),{documents:c,Ts:o})))}function ad(n,t,e){let r=n.us.get(t)||L.min();e.forEach((i,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.us.set(t,r)}class Vo{constructor(){this.activeTargetIds=sh()}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class ud{constructor(){this.so=new Vo,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,e,r){this.oo[t]=e}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new Vo,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class ld{_o(t){}shutdown(){}}/**
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
 */class Co{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){k("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){k("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let jn=null;function Gr(){return jn===null?jn=function(){return 268435456+Math.round(2147483648*Math.random())}():jn++,"0x"+jn.toString(16)}/**
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
 */const cd={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class hd{constructor(t){this.Io=t.Io,this.To=t.To}Eo(t){this.Ao=t}Ro(t){this.Vo=t}mo(t){this.fo=t}onMessage(t){this.po=t}close(){this.To()}send(t){this.Io(t)}yo(){this.Ao()}wo(){this.Vo()}So(t){this.fo(t)}bo(t){this.po(t)}}/**
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
 */const mt="WebChannelConnection";class dd extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const r=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+e.host,this.vo=`projects/${i}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${o}`}get Fo(){return!1}Mo(e,r,i,o,u){const c=Gr(),h=this.xo(e,r.toUriEncodedString());k("RestConnection",`Sending RPC '${e}' ${c}:`,h,i);const f={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(f,o,u),this.No(e,h,f,i).then(m=>(k("RestConnection",`Received RPC '${e}' ${c}: `,m),m),m=>{throw ge("RestConnection",`RPC '${e}' ${c} failed with error: `,m,"url: ",h,"request:",i),m})}Lo(e,r,i,o,u,c){return this.Mo(e,r,i,o,u)}Oo(e,r,i){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+we}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,u)=>e[u]=o),i&&i.headers.forEach((o,u)=>e[u]=o)}xo(e,r){const i=cd[e];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,e,r,i){const o=Gr();return new Promise((u,c)=>{const h=new Jo;h.setWithCredentials(!0),h.listenOnce(Zo.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case zn.NO_ERROR:const m=h.getResponseJson();k(mt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(m)),u(m);break;case zn.TIMEOUT:k(mt,`RPC '${t}' ${o} timed out`),c(new D(P.DEADLINE_EXCEEDED,"Request time out"));break;case zn.HTTP_ERROR:const A=h.getStatus();if(k(mt,`RPC '${t}' ${o} failed with status:`,A,"response text:",h.getResponseText()),A>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const V=R==null?void 0:R.error;if(V&&V.status&&V.message){const N=function(b){const G=b.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(G)>=0?G:P.UNKNOWN}(V.status);c(new D(N,V.message))}else c(new D(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new D(P.UNAVAILABLE,"Connection failed."));break;default:M()}}finally{k(mt,`RPC '${t}' ${o} completed.`)}});const f=JSON.stringify(i);k(mt,`RPC '${t}' ${o} sending request:`,i),h.send(e,"POST",f,r,15)})}Bo(t,e,r){const i=Gr(),o=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],u=na(),c=ea(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Oo(h.initMessageHeaders,e,r),h.encodeInitMessageHeaders=!0;const m=o.join("");k(mt,`Creating RPC '${t}' stream ${i}: ${m}`,h);const A=u.createWebChannel(m,h);let R=!1,V=!1;const N=new hd({Io:b=>{V?k(mt,`Not sending because RPC '${t}' stream ${i} is closed:`,b):(R||(k(mt,`Opening RPC '${t}' stream ${i} transport.`),A.open(),R=!0),k(mt,`RPC '${t}' stream ${i} sending:`,b),A.send(b))},To:()=>A.close()}),x=(b,G,K)=>{b.listen(G,H=>{try{K(H)}catch(rt){setTimeout(()=>{throw rt},0)}})};return x(A,We.EventType.OPEN,()=>{V||(k(mt,`RPC '${t}' stream ${i} transport opened.`),N.yo())}),x(A,We.EventType.CLOSE,()=>{V||(V=!0,k(mt,`RPC '${t}' stream ${i} transport closed`),N.So())}),x(A,We.EventType.ERROR,b=>{V||(V=!0,ge(mt,`RPC '${t}' stream ${i} transport errored:`,b),N.So(new D(P.UNAVAILABLE,"The operation could not be completed")))}),x(A,We.EventType.MESSAGE,b=>{var G;if(!V){const K=b.data[0];z(!!K);const H=K,rt=H.error||((G=H[0])===null||G===void 0?void 0:G.error);if(rt){k(mt,`RPC '${t}' stream ${i} received error:`,rt);const Ct=rt.status;let it=function(_){const y=tt[_];if(y!==void 0)return Da(y)}(Ct),v=rt.message;it===void 0&&(it=P.INTERNAL,v="Unknown error status: "+Ct+" with message "+rt.message),V=!0,N.So(new D(it,v)),A.close()}else k(mt,`RPC '${t}' stream ${i} received:`,K),N.bo(K)}}),x(c,ta.STAT_EVENT,b=>{b.stat===Jr.PROXY?k(mt,`RPC '${t}' stream ${i} detected buffering proxy`):b.stat===Jr.NOPROXY&&k(mt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{N.wo()},0),N}}function Kr(){return typeof document<"u"?document:null}/**
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
 */function dr(n){return new Ih(n,!0)}/**
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
 */class $a{constructor(t,e,r=1e3,i=1.5,o=6e4){this.ui=t,this.timerId=e,this.ko=r,this.qo=i,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const e=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,e-r);i>0&&k("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),t())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class za{constructor(t,e,r,i,o,u,c,h){this.ui=t,this.Ho=r,this.Jo=i,this.connection=o,this.authCredentialsProvider=u,this.appCheckCredentialsProvider=c,this.listener=h,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new $a(t,e)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,e){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,t!==4?this.t_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(xt(e.toString()),xt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(e)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),e=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===e&&this.P_(r,i)},r=>{t(()=>{const i=new D(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(t,e){const r=this.h_(this.Yo);this.stream=this.T_(t,e),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(t){return k("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return e=>{this.ui.enqueueAndForget(()=>this.Yo===t?e():(k("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class fd extends za{constructor(t,e,r,i,o,u){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,i,u),this.serializer=o}T_(t,e){return this.connection.Bo("Listen",t,e)}E_(t){return this.onNext(t)}onNext(t){this.t_.reset();const e=Rh(this.serializer,t),r=function(o){if(!("targetChange"in o))return L.min();const u=o.targetChange;return u.targetIds&&u.targetIds.length?L.min():u.readTime?St(u.readTime):L.min()}(t);return this.listener.d_(e,r)}A_(t){const e={};e.database=as(this.serializer),e.addTarget=function(o,u){let c;const h=u.target;if(c=ns(h)?{documents:Vh(o,h)}:{query:Ch(o,h)._t},c.targetId=u.targetId,u.resumeToken.approximateByteSize()>0){c.resumeToken=Oa(o,u.resumeToken);const f=ss(o,u.expectedCount);f!==null&&(c.expectedCount=f)}else if(u.snapshotVersion.compareTo(L.min())>0){c.readTime=er(o,u.snapshotVersion.toTimestamp());const f=ss(o,u.expectedCount);f!==null&&(c.expectedCount=f)}return c}(this.serializer,t);const r=Dh(this.serializer,t);r&&(e.labels=r),this.a_(e)}R_(t){const e={};e.database=as(this.serializer),e.removeTarget=t,this.a_(e)}}class pd extends za{constructor(t,e,r,i,o,u){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,i,u),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(t,e){return this.connection.Bo("Write",t,e)}E_(t){return z(!!t.streamToken),this.lastStreamToken=t.streamToken,z(!t.writeResults||t.writeResults.length===0),this.listener.f_()}onNext(t){z(!!t.streamToken),this.lastStreamToken=t.streamToken,this.t_.reset();const e=Sh(t.writeResults,t.commitTime),r=St(t.commitTime);return this.listener.g_(r,e)}p_(){const t={};t.database=as(this.serializer),this.a_(t)}m_(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>Ph(this.serializer,r))};this.a_(e)}}/**
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
 */class md extends class{}{constructor(t,e,r,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new D(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,e,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.connection.Mo(t,is(e,r),i,o,u)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(P.UNKNOWN,o.toString())})}Lo(t,e,r,i,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([u,c])=>this.connection.Lo(t,is(e,r),i,u,c,o)).catch(u=>{throw u.name==="FirebaseError"?(u.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),u):new D(P.UNKNOWN,u.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class gd{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(t){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,t==="Online"&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(xt(e),this.D_=!1):k("OnlineStateTracker",e)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class _d{constructor(t,e,r,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(u=>{r.enqueueAndForget(async()=>{oe(this)&&(k("RemoteStore","Restarting streams for network reachability change."),await async function(h){const f=F(h);f.L_.add(4),await yn(f),f.q_.set("Unknown"),f.L_.delete(4),await fr(f)}(this))})}),this.q_=new gd(r,i)}}async function fr(n){if(oe(n))for(const t of n.B_)await t(!0)}async function yn(n){for(const t of n.B_)await t(!1)}function Ga(n,t){const e=F(n);e.N_.has(t.targetId)||(e.N_.set(t.targetId,t),bs(e)?Cs(e):Ve(e).r_()&&Vs(e,t))}function Ss(n,t){const e=F(n),r=Ve(e);e.N_.delete(t),r.r_()&&Ka(e,t),e.N_.size===0&&(r.r_()?r.o_():oe(e)&&e.q_.set("Unknown"))}function Vs(n,t){if(n.Q_.xe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Ve(n).A_(t)}function Ka(n,t){n.Q_.xe(t),Ve(n).R_(t)}function Cs(n){n.Q_=new yh({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),ot:t=>n.N_.get(t)||null,tt:()=>n.datastore.serializer.databaseId}),Ve(n).start(),n.q_.v_()}function bs(n){return oe(n)&&!Ve(n).n_()&&n.N_.size>0}function oe(n){return F(n).L_.size===0}function Wa(n){n.Q_=void 0}async function yd(n){n.q_.set("Online")}async function Ed(n){n.N_.forEach((t,e)=>{Vs(n,t)})}async function vd(n,t){Wa(n),bs(n)?(n.q_.M_(t),Cs(n)):n.q_.set("Unknown")}async function Td(n,t,e){if(n.q_.set("Online"),t instanceof ka&&t.state===2&&t.cause)try{await async function(i,o){const u=o.cause;for(const c of o.targetIds)i.N_.has(c)&&(await i.remoteSyncer.rejectListen(c,u),i.N_.delete(c),i.Q_.removeTarget(c))}(n,t)}catch(r){k("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await nr(n,r)}else if(t instanceof Wn?n.Q_.Ke(t):t instanceof Na?n.Q_.He(t):n.Q_.We(t),!e.isEqual(L.min()))try{const r=await ja(n.localStore);e.compareTo(r)>=0&&await function(o,u){const c=o.Q_.rt(u);return c.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.N_.get(f);m&&o.N_.set(f,m.withResumeToken(h.resumeToken,u))}}),c.targetMismatches.forEach((h,f)=>{const m=o.N_.get(h);if(!m)return;o.N_.set(h,m.withResumeToken(ct.EMPTY_BYTE_STRING,m.snapshotVersion)),Ka(o,h);const A=new qt(m.target,h,f,m.sequenceNumber);Vs(o,A)}),o.remoteSyncer.applyRemoteEvent(c)}(n,e)}catch(r){k("RemoteStore","Failed to raise snapshot:",r),await nr(n,r)}}async function nr(n,t,e){if(!mn(t))throw t;n.L_.add(1),await yn(n),n.q_.set("Offline"),e||(e=()=>ja(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{k("RemoteStore","Retrying IndexedDB access"),await e(),n.L_.delete(1),await fr(n)})}function Ha(n,t){return t().catch(e=>nr(n,e,t))}async function pr(n){const t=F(n),e=Wt(t);let r=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;Id(t);)try{const i=await id(t.localStore,r);if(i===null){t.O_.length===0&&e.o_();break}r=i.batchId,Ad(t,i)}catch(i){await nr(t,i)}Qa(t)&&Ya(t)}function Id(n){return oe(n)&&n.O_.length<10}function Ad(n,t){n.O_.push(t);const e=Wt(n);e.r_()&&e.V_&&e.m_(t.mutations)}function Qa(n){return oe(n)&&!Wt(n).n_()&&n.O_.length>0}function Ya(n){Wt(n).start()}async function wd(n){Wt(n).p_()}async function Rd(n){const t=Wt(n);for(const e of n.O_)t.m_(e.mutations)}async function Pd(n,t,e){const r=n.O_.shift(),i=Ts.from(r,t,e);await Ha(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await pr(n)}async function Sd(n,t){t&&Wt(n).V_&&await async function(r,i){if(function(u){return mh(u)&&u!==P.ABORTED}(i.code)){const o=r.O_.shift();Wt(r).s_(),await Ha(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,i)),await pr(r)}}(n,t),Qa(n)&&Ya(n)}async function bo(n,t){const e=F(n);e.asyncQueue.verifyOperationInProgress(),k("RemoteStore","RemoteStore received new credentials");const r=oe(e);e.L_.add(3),await yn(e),r&&e.q_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.L_.delete(3),await fr(e)}async function Vd(n,t){const e=F(n);t?(e.L_.delete(2),await fr(e)):t||(e.L_.add(2),await yn(e),e.q_.set("Unknown"))}function Ve(n){return n.K_||(n.K_=function(e,r,i){const o=F(e);return o.w_(),new fd(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Eo:yd.bind(null,n),Ro:Ed.bind(null,n),mo:vd.bind(null,n),d_:Td.bind(null,n)}),n.B_.push(async t=>{t?(n.K_.s_(),bs(n)?Cs(n):n.q_.set("Unknown")):(await n.K_.stop(),Wa(n))})),n.K_}function Wt(n){return n.U_||(n.U_=function(e,r,i){const o=F(e);return o.w_(),new pd(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:wd.bind(null,n),mo:Sd.bind(null,n),f_:Rd.bind(null,n),g_:Pd.bind(null,n)}),n.B_.push(async t=>{t?(n.U_.s_(),await pr(n)):(await n.U_.stop(),n.O_.length>0&&(k("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
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
 */class Ds{constructor(t,e,r,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new $t,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(u=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,i,o){const u=Date.now()+r,c=new Ds(t,e,u,i,o);return c.start(r),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ns(n,t){if(xt("AsyncQueue",`${t}: ${n}`),mn(n))return new D(P.UNAVAILABLE,`${t}: ${n}`);throw n}/**
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
 */class pe{constructor(t){this.comparator=t?(e,r)=>t(e,r)||O.comparator(e.key,r.key):(e,r)=>O.comparator(e.key,r.key),this.keyedMap=He(),this.sortedSet=new X(this.comparator)}static emptySet(t){return new pe(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof pe)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=r.getNext().key;if(!i.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new pe;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
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
 */class Do{constructor(){this.W_=new X(O.comparator)}track(t){const e=t.doc.key,r=this.W_.get(e);r?t.type!==0&&r.type===3?this.W_=this.W_.insert(e,t):t.type===3&&r.type!==1?this.W_=this.W_.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.W_=this.W_.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.W_=this.W_.remove(e):t.type===1&&r.type===2?this.W_=this.W_.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.W_=this.W_.insert(e,{type:2,doc:t.doc}):M():this.W_=this.W_.insert(e,t)}G_(){const t=[];return this.W_.inorderTraversal((e,r)=>{t.push(r)}),t}}class Te{constructor(t,e,r,i,o,u,c,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=o,this.fromCache=u,this.syncStateChanged=c,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,i,o){const u=[];return e.forEach(c=>{u.push({type:0,doc:c})}),new Te(t,e,pe.emptySet(e),u,r,i,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&ar(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let i=0;i<e.length;i++)if(e[i].type!==r[i].type||!e[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class Cd{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(t=>t.J_())}}class bd{constructor(){this.queries=No(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(e,r){const i=F(e),o=i.queries;i.queries=No(),o.forEach((u,c)=>{for(const h of c.j_)h.onError(r)})})(this,new D(P.ABORTED,"Firestore shutting down"))}}function No(){return new Se(n=>ga(n),ar)}async function Dd(n,t){const e=F(n);let r=3;const i=t.query;let o=e.queries.get(i);o?!o.H_()&&t.J_()&&(r=2):(o=new Cd,r=t.J_()?0:1);try{switch(r){case 0:o.z_=await e.onListen(i,!0);break;case 1:o.z_=await e.onListen(i,!1);break;case 2:await e.onFirstRemoteStoreListen(i)}}catch(u){const c=Ns(u,`Initialization of query '${he(t.query)}' failed`);return void t.onError(c)}e.queries.set(i,o),o.j_.push(t),t.Z_(e.onlineState),o.z_&&t.X_(o.z_)&&ks(e)}async function Nd(n,t){const e=F(n),r=t.query;let i=3;const o=e.queries.get(r);if(o){const u=o.j_.indexOf(t);u>=0&&(o.j_.splice(u,1),o.j_.length===0?i=t.J_()?0:1:!o.H_()&&t.J_()&&(i=2))}switch(i){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function kd(n,t){const e=F(n);let r=!1;for(const i of t){const o=i.query,u=e.queries.get(o);if(u){for(const c of u.j_)c.X_(i)&&(r=!0);u.z_=i}}r&&ks(e)}function Od(n,t,e){const r=F(n),i=r.queries.get(t);if(i)for(const o of i.j_)o.onError(e);r.queries.delete(t)}function ks(n){n.Y_.forEach(t=>{t.next()})}var ls,ko;(ko=ls||(ls={})).ea="default",ko.Cache="cache";class xd{constructor(t,e,r){this.query=t,this.ta=e,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(t){if(!this.options.includeMetadataChanges){const r=[];for(const i of t.docChanges)i.type!==3&&r.push(i);t=new Te(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.na?this.ia(t)&&(this.ta.next(t),e=!0):this.sa(t,this.onlineState)&&(this.oa(t),e=!0),this.ra=t,e}onError(t){this.ta.error(t)}Z_(t){this.onlineState=t;let e=!1;return this.ra&&!this.na&&this.sa(this.ra,t)&&(this.oa(this.ra),e=!0),e}sa(t,e){if(!t.fromCache||!this.J_())return!0;const r=e!=="Offline";return(!this.options._a||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}ia(t){if(t.docChanges.length>0)return!0;const e=this.ra&&this.ra.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}oa(t){t=Te.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.na=!0,this.ta.next(t)}J_(){return this.options.source!==ls.Cache}}/**
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
 */class Xa{constructor(t){this.key=t}}class Ja{constructor(t){this.key=t}}class Md{constructor(t,e){this.query=t,this.Ta=e,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=U(),this.mutatedKeys=U(),this.Aa=_a(t),this.Ra=new pe(this.Aa)}get Va(){return this.Ta}ma(t,e){const r=e?e.fa:new Do,i=e?e.Ra:this.Ra;let o=e?e.mutatedKeys:this.mutatedKeys,u=i,c=!1;const h=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,f=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(t.inorderTraversal((m,A)=>{const R=i.get(m),V=ur(this.query,A)?A:null,N=!!R&&this.mutatedKeys.has(R.key),x=!!V&&(V.hasLocalMutations||this.mutatedKeys.has(V.key)&&V.hasCommittedMutations);let b=!1;R&&V?R.data.isEqual(V.data)?N!==x&&(r.track({type:3,doc:V}),b=!0):this.ga(R,V)||(r.track({type:2,doc:V}),b=!0,(h&&this.Aa(V,h)>0||f&&this.Aa(V,f)<0)&&(c=!0)):!R&&V?(r.track({type:0,doc:V}),b=!0):R&&!V&&(r.track({type:1,doc:R}),b=!0,(h||f)&&(c=!0)),b&&(V?(u=u.add(V),o=x?o.add(m):o.delete(m)):(u=u.delete(m),o=o.delete(m)))}),this.query.limit!==null)for(;u.size>this.query.limit;){const m=this.query.limitType==="F"?u.last():u.first();u=u.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{Ra:u,fa:r,ns:c,mutatedKeys:o}}ga(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,i){const o=this.Ra;this.Ra=t.Ra,this.mutatedKeys=t.mutatedKeys;const u=t.fa.G_();u.sort((m,A)=>function(V,N){const x=b=>{switch(b){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M()}};return x(V)-x(N)}(m.type,A.type)||this.Aa(m.doc,A.doc)),this.pa(r),i=i!=null&&i;const c=e&&!i?this.ya():[],h=this.da.size===0&&this.current&&!i?1:0,f=h!==this.Ea;return this.Ea=h,u.length!==0||f?{snapshot:new Te(this.query,t.Ra,o,u,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Do,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(t){return!this.Ta.has(t)&&!!this.Ra.has(t)&&!this.Ra.get(t).hasLocalMutations}pa(t){t&&(t.addedDocuments.forEach(e=>this.Ta=this.Ta.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ta=this.Ta.delete(e)),this.current=t.current)}ya(){if(!this.current)return[];const t=this.da;this.da=U(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const e=[];return t.forEach(r=>{this.da.has(r)||e.push(new Ja(r))}),this.da.forEach(r=>{t.has(r)||e.push(new Xa(r))}),e}ba(t){this.Ta=t.Ts,this.da=U();const e=this.ma(t.documents);return this.applyChanges(e,!0)}Da(){return Te.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class Ld{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Fd{constructor(t){this.key=t,this.va=!1}}class Ud{constructor(t,e,r,i,o,u){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=u,this.Ca={},this.Fa=new Se(c=>ga(c),ar),this.Ma=new Map,this.xa=new Set,this.Oa=new X(O.comparator),this.Na=new Map,this.La=new ws,this.Ba={},this.ka=new Map,this.qa=ve.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Bd(n,t,e=!0){const r=su(n);let i;const o=r.Fa.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),i=o.view.Da()):i=await Za(r,t,e,!0),i}async function qd(n,t){const e=su(n);await Za(e,t,!0,!1)}async function Za(n,t,e,r){const i=await od(n.localStore,Pt(t)),o=i.targetId,u=n.sharedClientState.addLocalQueryTarget(o,e);let c;return r&&(c=await jd(n,t,o,u==="current",i.resumeToken)),n.isPrimaryClient&&e&&Ga(n.remoteStore,i),c}async function jd(n,t,e,r,i){n.Ka=(A,R,V)=>async function(x,b,G,K){let H=b.view.ma(G);H.ns&&(H=await So(x.localStore,b.query,!1).then(({documents:v})=>b.view.ma(v,H)));const rt=K&&K.targetChanges.get(b.targetId),Ct=K&&K.targetMismatches.get(b.targetId)!=null,it=b.view.applyChanges(H,x.isPrimaryClient,rt,Ct);return xo(x,b.targetId,it.wa),it.snapshot}(n,A,R,V);const o=await So(n.localStore,t,!0),u=new Md(t,o.Ts),c=u.ma(o.documents),h=_n.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",i),f=u.applyChanges(c,n.isPrimaryClient,h);xo(n,e,f.wa);const m=new Ld(t,e,u);return n.Fa.set(t,m),n.Ma.has(e)?n.Ma.get(e).push(t):n.Ma.set(e,[t]),f.snapshot}async function $d(n,t,e){const r=F(n),i=r.Fa.get(t),o=r.Ma.get(i.targetId);if(o.length>1)return r.Ma.set(i.targetId,o.filter(u=>!ar(u,t))),void r.Fa.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await us(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),e&&Ss(r.remoteStore,i.targetId),cs(r,i.targetId)}).catch(pn)):(cs(r,i.targetId),await us(r.localStore,i.targetId,!0))}async function zd(n,t){const e=F(n),r=e.Fa.get(t),i=e.Ma.get(r.targetId);e.isPrimaryClient&&i.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),Ss(e.remoteStore,r.targetId))}async function Gd(n,t,e){const r=Jd(n);try{const i=await function(u,c){const h=F(u),f=nt.now(),m=c.reduce((V,N)=>V.add(N.key),U());let A,R;return h.persistence.runTransaction("Locally write mutations","readwrite",V=>{let N=Mt(),x=U();return h.cs.getEntries(V,m).next(b=>{N=b,N.forEach((G,K)=>{K.isValidDocument()||(x=x.add(G))})}).next(()=>h.localDocuments.getOverlayedDocuments(V,N)).next(b=>{A=b;const G=[];for(const K of c){const H=ch(K,A.get(K.key).overlayedDocument);H!=null&&G.push(new ie(K.key,H,aa(H.value.mapValue),kt.exists(!0)))}return h.mutationQueue.addMutationBatch(V,f,G,c)}).next(b=>{R=b;const G=b.applyToLocalDocumentSet(A,x);return h.documentOverlayCache.saveOverlays(V,b.batchId,G)})}).then(()=>({batchId:R.batchId,changes:Ea(A)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(i.batchId),function(u,c,h){let f=u.Ba[u.currentUser.toKey()];f||(f=new X($)),f=f.insert(c,h),u.Ba[u.currentUser.toKey()]=f}(r,i.batchId,e),await En(r,i.changes),await pr(r.remoteStore)}catch(i){const o=Ns(i,"Failed to persist write");e.reject(o)}}async function tu(n,t){const e=F(n);try{const r=await rd(e.localStore,t);t.targetChanges.forEach((i,o)=>{const u=e.Na.get(o);u&&(z(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?u.va=!0:i.modifiedDocuments.size>0?z(u.va):i.removedDocuments.size>0&&(z(u.va),u.va=!1))}),await En(e,r,t)}catch(r){await pn(r)}}function Oo(n,t,e){const r=F(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const i=[];r.Fa.forEach((o,u)=>{const c=u.view.Z_(t);c.snapshot&&i.push(c.snapshot)}),function(u,c){const h=F(u);h.onlineState=c;let f=!1;h.queries.forEach((m,A)=>{for(const R of A.j_)R.Z_(c)&&(f=!0)}),f&&ks(h)}(r.eventManager,t),i.length&&r.Ca.d_(i),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Kd(n,t,e){const r=F(n);r.sharedClientState.updateQueryState(t,"rejected",e);const i=r.Na.get(t),o=i&&i.key;if(o){let u=new X(O.comparator);u=u.insert(o,_t.newNoDocument(o,L.min()));const c=U().add(o),h=new hr(L.min(),new Map,new X($),u,c);await tu(r,h),r.Oa=r.Oa.remove(o),r.Na.delete(t),Os(r)}else await us(r.localStore,t,!1).then(()=>cs(r,t,e)).catch(pn)}async function Wd(n,t){const e=F(n),r=t.batch.batchId;try{const i=await nd(e.localStore,t);nu(e,r,null),eu(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await En(e,i)}catch(i){await pn(i)}}async function Hd(n,t,e){const r=F(n);try{const i=await function(u,c){const h=F(u);return h.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let m;return h.mutationQueue.lookupMutationBatch(f,c).next(A=>(z(A!==null),m=A.keys(),h.mutationQueue.removeMutationBatch(f,A))).next(()=>h.mutationQueue.performConsistencyCheck(f)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(f,m,c)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,m)).next(()=>h.localDocuments.getDocuments(f,m))})}(r.localStore,t);nu(r,t,e),eu(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await En(r,i)}catch(i){await pn(i)}}function eu(n,t){(n.ka.get(t)||[]).forEach(e=>{e.resolve()}),n.ka.delete(t)}function nu(n,t,e){const r=F(n);let i=r.Ba[r.currentUser.toKey()];if(i){const o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),r.Ba[r.currentUser.toKey()]=i}}function cs(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Ma.get(t))n.Fa.delete(r),e&&n.Ca.$a(r,e);n.Ma.delete(t),n.isPrimaryClient&&n.La.gr(t).forEach(r=>{n.La.containsKey(r)||ru(n,r)})}function ru(n,t){n.xa.delete(t.path.canonicalString());const e=n.Oa.get(t);e!==null&&(Ss(n.remoteStore,e),n.Oa=n.Oa.remove(t),n.Na.delete(e),Os(n))}function xo(n,t,e){for(const r of e)r instanceof Xa?(n.La.addReference(r.key,t),Qd(n,r)):r instanceof Ja?(k("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,t),n.La.containsKey(r.key)||ru(n,r.key)):M()}function Qd(n,t){const e=t.key,r=e.path.canonicalString();n.Oa.get(e)||n.xa.has(r)||(k("SyncEngine","New document in limbo: "+e),n.xa.add(r),Os(n))}function Os(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const t=n.xa.values().next().value;n.xa.delete(t);const e=new O(Y.fromString(t)),r=n.qa.next();n.Na.set(r,new Fd(e)),n.Oa=n.Oa.insert(e,r),Ga(n.remoteStore,new qt(Pt(pa(e.path)),r,"TargetPurposeLimboResolution",ps.oe))}}async function En(n,t,e){const r=F(n),i=[],o=[],u=[];r.Fa.isEmpty()||(r.Fa.forEach((c,h)=>{u.push(r.Ka(h,t,e).then(f=>{var m;if((f||e)&&r.isPrimaryClient){const A=f?!f.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))===null||m===void 0?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,A?"current":"not-current")}if(f){i.push(f);const A=Ps.Wi(h.targetId,f);o.push(A)}}))}),await Promise.all(u),r.Ca.d_(i),await async function(h,f){const m=F(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",A=>S.forEach(f,R=>S.forEach(R.$i,V=>m.persistence.referenceDelegate.addReference(A,R.targetId,V)).next(()=>S.forEach(R.Ui,V=>m.persistence.referenceDelegate.removeReference(A,R.targetId,V)))))}catch(A){if(!mn(A))throw A;k("LocalStore","Failed to update sequence numbers: "+A)}for(const A of f){const R=A.targetId;if(!A.fromCache){const V=m.os.get(R),N=V.snapshotVersion,x=V.withLastLimboFreeSnapshotVersion(N);m.os=m.os.insert(R,x)}}}(r.localStore,o))}async function Yd(n,t){const e=F(n);if(!e.currentUser.isEqual(t)){k("SyncEngine","User change. New user:",t.toKey());const r=await qa(e.localStore,t);e.currentUser=t,function(o,u){o.ka.forEach(c=>{c.forEach(h=>{h.reject(new D(P.CANCELLED,u))})}),o.ka.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await En(e,r.hs)}}function Xd(n,t){const e=F(n),r=e.Na.get(t);if(r&&r.va)return U().add(r.key);{let i=U();const o=e.Ma.get(t);if(!o)return i;for(const u of o){const c=e.Fa.get(u);i=i.unionWith(c.view.Va)}return i}}function su(n){const t=F(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=tu.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Xd.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Kd.bind(null,t),t.Ca.d_=kd.bind(null,t.eventManager),t.Ca.$a=Od.bind(null,t.eventManager),t}function Jd(n){const t=F(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Wd.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Hd.bind(null,t),t}class rr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=dr(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,e){return null}Ha(t,e){return null}za(t){return ed(this.persistence,new Zh,t.initialUser,this.serializer)}Ga(t){return new Yh(Rs.Zr,this.serializer)}Wa(t){return new ud}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}rr.provider={build:()=>new rr};class hs{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Oo(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Yd.bind(null,this.syncEngine),await Vd(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new bd}()}createDatastore(t){const e=dr(t.databaseInfo.databaseId),r=function(o){return new dd(o)}(t.databaseInfo);return function(o,u,c,h){return new md(o,u,c,h)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,i,o,u,c){return new _d(r,i,o,u,c)}(this.localStore,this.datastore,t.asyncQueue,e=>Oo(this.syncEngine,e,0),function(){return Co.D()?new Co:new ld}())}createSyncEngine(t,e){return function(i,o,u,c,h,f,m){const A=new Ud(i,o,u,c,h,f);return m&&(A.Qa=!0),A}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){const o=F(i);k("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await yn(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}hs.provider={build:()=>new hs};/**
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
 *//**
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
 */class Zd{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ya(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ya(this.observer.error,t):xt("Uncaught Error in snapshot listener:",t.toString()))}Za(){this.muted=!0}Ya(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
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
 */class tf{constructor(t,e,r,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=i,this.user=gt.UNAUTHENTICATED,this.clientId=sa.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async u=>{k("FirestoreClient","Received user=",u.uid),await this.authCredentialListener(u),this.user=u}),this.appCheckCredentials.start(r,u=>(k("FirestoreClient","Received new app check token=",u),this.appCheckCredentialListener(u,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new $t;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Ns(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function Wr(n,t){n.asyncQueue.verifyOperationInProgress(),k("FirestoreClient","Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await qa(t.localStore,i),r=i)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function Mo(n,t){n.asyncQueue.verifyOperationInProgress();const e=await ef(n);k("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(r=>bo(t.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>bo(t.remoteStore,i)),n._onlineComponents=t}async function ef(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){k("FirestoreClient","Using user provided OfflineComponentProvider");try{await Wr(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(e))throw e;ge("Error using user provided cache. Falling back to memory cache: "+e),await Wr(n,new rr)}}else k("FirestoreClient","Using default OfflineComponentProvider"),await Wr(n,new rr);return n._offlineComponents}async function iu(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(k("FirestoreClient","Using user provided OnlineComponentProvider"),await Mo(n,n._uninitializedComponentsProvider._online)):(k("FirestoreClient","Using default OnlineComponentProvider"),await Mo(n,new hs))),n._onlineComponents}function nf(n){return iu(n).then(t=>t.syncEngine)}async function rf(n){const t=await iu(n),e=t.eventManager;return e.onListen=Bd.bind(null,t.syncEngine),e.onUnlisten=$d.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=qd.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=zd.bind(null,t.syncEngine),e}function sf(n,t,e={}){const r=new $t;return n.asyncQueue.enqueueAndForget(async()=>function(o,u,c,h,f){const m=new Zd({next:R=>{m.Za(),u.enqueueAndForget(()=>Nd(o,A)),R.fromCache&&h.source==="server"?f.reject(new D(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):f.resolve(R)},error:R=>f.reject(R)}),A=new xd(c,m,{includeMetadataChanges:!0,_a:!0});return Dd(o,A)}(await rf(n),n.asyncQueue,t,e,r)),r.promise}/**
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
 */function ou(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
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
 */const Lo=new Map;/**
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
 */function au(n,t,e){if(!e)throw new D(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function of(n,t,e,r){if(t===!0&&r===!0)throw new D(P.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Fo(n){if(!O.isDocumentKey(n))throw new D(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Uo(n){if(O.isDocumentKey(n))throw new D(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function mr(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":M()}function fn(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new D(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=mr(n);throw new D(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
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
 */class Bo{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new D(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new D(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}of("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ou((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class gr{constructor(t,e,r,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Bo({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new D(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Bo(t),t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new vc;switch(r.type){case"firstParty":return new wc(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=Lo.get(e);r&&(k("ComponentProvider","Removing Datastore"),Lo.delete(e),r.terminate())}(this),Promise.resolve()}}function af(n,t,e,r={}){var i;const o=(n=fn(n,gr))._getSettings(),u=`${t}:${e}`;if(o.host!=="firestore.googleapis.com"&&o.host!==u&&ge("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:u,ssl:!1})),r.mockUserToken){let c,h;if(typeof r.mockUserToken=="string")c=r.mockUserToken,h=gt.MOCK_USER;else{c=cl(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new D(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new gt(f)}n._authCredentials=new Tc(new ra(c,h))}}/**
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
 */class Ht{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new Ht(this.firestore,t,this._query)}}class Tt{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new zt(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Tt(this.firestore,t,this._key)}}class zt extends Ht{constructor(t,e,r){super(t,e,pa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Tt(this.firestore,null,new O(t))}withConverter(t){return new zt(this.firestore,t,this._path)}}function jf(n,t,...e){if(n=me(n),au("collection","path",t),n instanceof gr){const r=Y.fromString(t,...e);return Uo(r),new zt(n,null,r)}{if(!(n instanceof Tt||n instanceof zt))throw new D(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(t,...e));return Uo(r),new zt(n.firestore,null,r)}}function $f(n,t,...e){if(n=me(n),arguments.length===1&&(t=sa.newId()),au("doc","path",t),n instanceof gr){const r=Y.fromString(t,...e);return Fo(r),new Tt(n,null,new O(r))}{if(!(n instanceof Tt||n instanceof zt))throw new D(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Y.fromString(t,...e));return Fo(r),new Tt(n.firestore,n instanceof zt?n.converter:null,new O(r))}}/**
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
 */class qo{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new $a(this,"async_queue_retry"),this.Vu=()=>{const r=Kr();r&&k("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=t;const e=Kr();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const e=Kr();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise(()=>{});const e=new $t;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Pu.push(t),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!mn(t))throw t;k("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(t){const e=this.mu.then(()=>(this.du=!0,t().catch(r=>{this.Eu=r,this.du=!1;const i=function(u){let c=u.message||"";return u.stack&&(c=u.stack.includes(u.message)?u.stack:u.message+`
`+u.stack),c}(r);throw xt("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=e,e}enqueueAfterDelay(t,e,r){this.fu(),this.Ru.indexOf(t)>-1&&(e=0);const i=Ds.createAndSchedule(this,t,e,r,o=>this.yu(o));return this.Tu.push(i),i}fu(){this.Eu&&M()}verifyOperationInProgress(){}async wu(){let t;do t=this.mu,await t;while(t!==this.mu)}Su(t){for(const e of this.Tu)if(e.timerId===t)return!0;return!1}bu(t){return this.wu().then(()=>{this.Tu.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.Tu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.wu()})}Du(t){this.Ru.push(t)}yu(t){const e=this.Tu.indexOf(t);this.Tu.splice(e,1)}}class xs extends gr{constructor(t,e,r,i){super(t,e,r,i),this.type="firestore",this._queue=new qo,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new qo(t),this._firestoreClient=void 0,await t}}}function zf(n,t){const e=typeof n=="object"?n:cc(),r=typeof n=="string"?n:"(default)",i=ic(e,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=ul("firestore");o&&af(i,...o)}return i}function uu(n){if(n._terminated)throw new D(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||uf(n),n._firestoreClient}function uf(n){var t,e,r;const i=n._freezeSettings(),o=function(c,h,f,m){return new Lc(c,h,f,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,ou(m.experimentalLongPollingOptions),m.useFetchStreams)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((e=i.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new tf(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(n._componentsProvider))}/**
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
 */class Ie{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ie(ct.fromBase64String(t))}catch(e){throw new D(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Ie(ct.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
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
 */class Ms{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new D(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ut(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class _r{constructor(t){this._methodName=t}}/**
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
 */class Ls{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new D(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new D(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return $(this._lat,t._lat)||$(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
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
 */class Fs{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(r,i){if(r.length!==i.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==i[o])return!1;return!0}(this._values,t._values)}}/**
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
 */const lf=/^__.*__$/;class cf{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new ie(t,this.data,this.fieldMask,e,this.fieldTransforms):new gn(t,this.data,e,this.fieldTransforms)}}function lu(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M()}}class Us{constructor(t,e,r,i,o,u){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=i,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=u||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(t){return new Us(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Fu({path:r,xu:!1});return i.Ou(t),i}Nu(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(t){return this.Fu({path:void 0,xu:!0})}Bu(t){return sr(t,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ou(this.path.get(t))}Ou(t){if(t.length===0)throw this.Bu("Document fields must not be empty");if(lu(this.Cu)&&lf.test(t))throw this.Bu('Document fields cannot begin and end with "__"')}}class hf{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||dr(t)}Qu(t,e,r,i=!1){return new Us({Cu:t,methodName:e,qu:r,path:ut.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function cu(n){const t=n._freezeSettings(),e=dr(n._databaseId);return new hf(n._databaseId,!!t.ignoreUndefinedProperties,e)}function df(n,t,e,r,i,o={}){const u=n.Qu(o.merge||o.mergeFields?2:0,t,e,i);fu("Data must be an object, but it was:",u,r);const c=hu(r,u);let h,f;if(o.merge)h=new wt(u.fieldMask),f=u.fieldTransforms;else if(o.mergeFields){const m=[];for(const A of o.mergeFields){const R=pf(t,A,e);if(!u.contains(R))throw new D(P.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);gf(m,R)||m.push(R)}h=new wt(m),f=u.fieldTransforms.filter(A=>h.covers(A.field))}else h=null,f=u.fieldTransforms;return new cf(new It(c),h,f)}class Bs extends _r{_toFieldTransform(t){return new Sa(t.path,new ln)}isEqual(t){return t instanceof Bs}}class qs extends _r{constructor(t,e){super(t),this.$u=e}_toFieldTransform(t){const e=new dn(t.serializer,Ia(t.serializer,this.$u));return new Sa(t.path,e)}isEqual(t){return t instanceof qs&&this.$u===t.$u}}function ff(n,t,e,r=!1){return js(e,n.Qu(r?4:3,t))}function js(n,t){if(du(n=me(n)))return fu("Unsupported field value:",t,n),hu(n,t);if(n instanceof _r)return function(r,i){if(!lu(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.xu&&t.Cu!==4)throw t.Bu("Nested arrays are not supported");return function(r,i){const o=[];let u=0;for(const c of r){let h=js(c,i.Lu(u));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),u++}return{arrayValue:{values:o}}}(n,t)}return function(r,i){if((r=me(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Ia(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=nt.fromDate(r);return{timestampValue:er(i.serializer,o)}}if(r instanceof nt){const o=new nt(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:er(i.serializer,o)}}if(r instanceof Ls)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ie)return{bytesValue:Oa(i.serializer,r._byteString)};if(r instanceof Tt){const o=i.databaseId,u=r.firestore._databaseId;if(!u.isEqual(o))throw i.Bu(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:As(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Fs)return function(u,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:u.toArray().map(h=>{if(typeof h!="number")throw c.Bu("VectorValues must only contain numeric values.");return vs(c.serializer,h)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${mr(r)}`)}(n,t)}function hu(n,t){const e={};return ia(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Re(n,(r,i)=>{const o=js(i,t.Mu(r));o!=null&&(e[r]=o)}),{mapValue:{fields:e}}}function du(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof nt||n instanceof Ls||n instanceof Ie||n instanceof Tt||n instanceof _r||n instanceof Fs)}function fu(n,t,e){if(!du(e)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(e)){const r=mr(e);throw r==="an object"?t.Bu(n+" a custom object"):t.Bu(n+" "+r)}}function pf(n,t,e){if((t=me(t))instanceof Ms)return t._internalPath;if(typeof t=="string")return pu(n,t);throw sr("Field path arguments must be of type string or ",n,!1,void 0,e)}const mf=new RegExp("[~\\*/\\[\\]]");function pu(n,t,e){if(t.search(mf)>=0)throw sr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new Ms(...t.split("."))._internalPath}catch{throw sr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function sr(n,t,e,r,i){const o=r&&!r.isEmpty(),u=i!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let h="";return(o||u)&&(h+=" (found",o&&(h+=` in field ${r}`),u&&(h+=` in document ${i}`),h+=")"),new D(P.INVALID_ARGUMENT,c+n+h)}function gf(n,t){return n.some(e=>e.isEqual(t))}/**
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
 */class mu{constructor(t,e,r,i,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=i,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Tt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new _f(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field($s("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class _f extends mu{data(){return super.data()}}function $s(n,t){return typeof t=="string"?pu(n,t):t instanceof Ms?t._internalPath:t._delegate._internalPath}/**
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
 */function yf(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new D(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class zs{}class Gs extends zs{}function Gf(n,t,...e){let r=[];t instanceof zs&&r.push(t),r=r.concat(e),function(o){const u=o.filter(h=>h instanceof Ws).length,c=o.filter(h=>h instanceof Ks).length;if(u>1||u>0&&c>0)throw new D(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Ks extends Gs{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new Ks(t,e,r)}_apply(t){const e=this._parse(t);return gu(t._query,e),new Ht(t.firestore,t.converter,rs(t._query,e))}_parse(t){const e=cu(t.firestore);return function(o,u,c,h,f,m,A){let R;if(f.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new D(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){$o(A,m);const V=[];for(const N of A)V.push(jo(h,o,N));R={arrayValue:{values:V}}}else R=jo(h,o,A)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||$o(A,m),R=ff(c,u,A,m==="in"||m==="not-in");return et.create(f,m,R)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}class Ws extends zs{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Ws(t,e)}_parse(t){const e=this._queryConstraints.map(r=>r._parse(t)).filter(r=>r.getFilters().length>0);return e.length===1?e[0]:Rt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(i,o){let u=i;const c=o.getFlattenedFilters();for(const h of c)gu(u,h),u=rs(u,h)}(t._query,e),new Ht(t.firestore,t.converter,rs(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Hs extends Gs{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Hs(t,e)}_apply(t){const e=function(i,o,u){if(i.startAt!==null)throw new D(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new D(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new un(o,u)}(t._query,this._field,this._direction);return new Ht(t.firestore,t.converter,function(i,o){const u=i.explicitOrderBy.concat([o]);return new Pe(i.path,i.collectionGroup,u,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(t._query,e))}}function Kf(n,t="asc"){const e=t,r=$s("orderBy",n);return Hs._create(r,e)}class Qs extends Gs{constructor(t,e,r){super(),this.type=t,this._limit=e,this._limitType=r}static _create(t,e,r){return new Qs(t,e,r)}_apply(t){return new Ht(t.firestore,t.converter,tr(t._query,this._limit,this._limitType))}}function Wf(n){return Qs._create("limit",n,"F")}function jo(n,t,e){if(typeof(e=me(e))=="string"){if(e==="")throw new D(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!ma(t)&&e.indexOf("/")!==-1)throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(Y.fromString(e));if(!O.isDocumentKey(r))throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return lo(n,new O(r))}if(e instanceof Tt)return lo(n,e._key);throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${mr(e)}.`)}function $o(n,t){if(!Array.isArray(n)||n.length===0)throw new D(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function gu(n,t){const e=function(i,o){for(const u of i)for(const c of u.getFlattenedFilters())if(o.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new D(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new D(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class Ef{convertValue(t,e="none"){switch(se(t)){case 0:return null;case 1:return t.booleanValue;case 2:return Z(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(re(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return Re(t,(i,o)=>{r[i]=this.convertValue(o,e)}),r}convertVectorValue(t){var e,r,i;const o=(i=(r=(e=t.fields)===null||e===void 0?void 0:e.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(u=>Z(u.doubleValue));return new Fs(o)}convertGeoPoint(t){return new Ls(Z(t.latitude),Z(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=gs(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(sn(t));default:return null}}convertTimestamp(t){const e=Kt(t);return new nt(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=Y.fromString(t);z(Ba(r));const i=new on(r.get(1),r.get(3)),o=new O(r.popFirst(5));return i.isEqual(e)||xt(`Document ${o} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
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
 */function vf(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}/**
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
 */class $n{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Tf extends mu{constructor(t,e,r,i,o,u){super(t,e,r,i,u),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Hn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field($s("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}}class Hn extends Tf{data(t={}){return super.data(t)}}class If{constructor(t,e,r,i){this._firestore=t,this._userDataWriter=e,this._snapshot=i,this.metadata=new $n(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new Hn(this._firestore,this._userDataWriter,r.key,r,new $n(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new D(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(i,o){if(i._snapshot.oldDocs.isEmpty()){let u=0;return i._snapshot.docChanges.map(c=>{const h=new Hn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new $n(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:h,oldIndex:-1,newIndex:u++}})}{let u=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>o||c.type!==3).map(c=>{const h=new Hn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new $n(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let f=-1,m=-1;return c.type!==0&&(f=u.indexOf(c.doc.key),u=u.delete(c.doc.key)),c.type!==1&&(u=u.add(c.doc),m=u.indexOf(c.doc.key)),{type:Af(c.type),doc:h,oldIndex:f,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function Af(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M()}}class wf extends Ef{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ie(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Tt(this.firestore,null,e)}}function Hf(n){n=fn(n,Ht);const t=fn(n.firestore,xs),e=uu(t),r=new wf(t);return yf(n._query),sf(e,n._query).then(i=>new If(t,r,n,i))}function Qf(n,t,e){n=fn(n,Tt);const r=fn(n.firestore,xs),i=vf(n.converter,t,e);return Rf(r,[df(cu(r),"setDoc",n._key,i,n.converter!==null,e).toMutation(n._key,kt.none())])}function Rf(n,t){return function(r,i){const o=new $t;return r.asyncQueue.enqueueAndForget(async()=>Gd(await nf(r),i,o)),o.promise}(uu(n),t)}function Yf(){return new Bs("serverTimestamp")}function Xf(n){return new qs("increment",n)}(function(t,e=!0){(function(i){we=i})(uc),Xn(new en("firestore",(r,{instanceIdentifier:i,options:o})=>{const u=r.getProvider("app").getImmediate(),c=new xs(new Ic(r.getProvider("auth-internal")),new Pc(r.getProvider("app-check-internal")),function(f,m){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new D(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new on(f.options.projectId,m)}(u,i),u);return o=Object.assign({useFetchStreams:e},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),Ye(so,"4.7.3",t),Ye(so,"4.7.3","esm2017")})();export{Wf as A,Hf as B,en as C,Xf as D,Wo as E,Ae as F,$f as G,Qf as H,Yf as I,Ho as L,uc as S,Xn as _,Df as a,bf as b,Ff as c,me as d,ds as e,Lf as f,Sf as g,q as h,Vf as i,nl as j,cc as k,ic as l,al as m,Hr as n,Nf as o,kf as p,Of as q,Ye as r,xf as s,Mf as t,Cf as u,lc as v,zf as w,jf as x,Gf as y,Kf as z};
