(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{373:function(e,n,t){"use strict";t.r(n);var a=t(45),r=Object(a.a)({},(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h2",{attrs:{id:"render"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#render"}},[e._v("#")]),e._v(" Render")]),e._v(" "),t("p",[e._v("打开mysrc/core/instance/render.js")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("Vue.prototype._render = function () {\n    \n    const vm = this\n    const { render, _parentVnode } = vm.$options\n\n    // set parent vnode. this allows render functions to have access\n    // to the data on the placeholder node.\n    vm.$vnode = _parentVnode\n    // render self\n    let vnode\n    // There's no need to maintain a stack because all render fns are called\n    // separately from one another. Nested component's render fns are called\n    // when parent component is patched.\n    currentRenderingInstance = vm\n    vnode = render.call(vm._renderProxy, vm.$createElement)\n    currentRenderingInstance = null\n   \n    // if the returned array contains only a single node, allow it\n    if (Array.isArray(vnode) && vnode.length === 1) {\n      vnode = vnode[0]\n    }\n    // return empty vnode in case the render function errored out\n    if (!(vnode instanceof VNode)) {\n      vnode = createEmptyVNode()\n    }\n    // set parent\n    vnode.parent = _parentVnode\n    return vnode\n  }\n")])])]),t("p",[e._v("在_render方法内部调用了options.render方法。回想一下render的使用方式：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("render: function (h) {\n  return h('div', {\n     attrs: {\n        id: 'mydiv'\n      },\n  })\n}\n")])])]),t("p",[e._v("所以h就是执行的vm.$createElement方法。即便没有使用render，而是写成模板形式,最终也会编译成render函数的形式：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('<div id="myapp">{{...}}</div>\n\n// 编译之后\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c("div", { attrs: { id: "mydiv" } })\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\nexport { render, staticRenderFns }\n')])])]),t("p",[e._v("继续再mysrc/core/instance/render.js文件中找到vm.$createElement的定义")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("export function initRender (vm) {\n  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)\n  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)\n}\n")])])]),t("p",[e._v("可以看到在initRender方法里对实例扩展了_c和$createElement两个方法，_c是被模板编译成的 render 函数使用的，$createElement是用户手写 render 方法使用的。这两个方法内部都是调用了createElement方法。")]),e._v(" "),t("h2",{attrs:{id:"vnode"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vnode"}},[e._v("#")]),e._v(" VNode")]),e._v(" "),t("p",[e._v("前面分析到render内部调用了createElement方法，而createElement方法就是帮助render创建虚拟dom使用方法。打开mysrc/core/vdom/create-element.js")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("export function createElement (\n  context,\n  tag,\n  data,\n  children,\n  normalizationType,\n  alwaysNormalize\n) {\n  if (Array.isArray(data) || isPrimitive(data)) {\n    normalizationType = children\n    children = data\n    data = undefined\n  }\n  if (isTrue(alwaysNormalize)) {\n    normalizationType = ALWAYS_NORMALIZE\n  }\n  return _createElement(context, tag, data, children, normalizationType)\n}\n")])])]),t("p",[e._v("往下查看_createElement方法：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("export function _createElement (\n  context,\n  tag,\n  data,\n  children,\n  normalizationType\n) {\n  if (isDef(data) && isDef((data).__ob__)) {\n    return createEmptyVNode()\n  }\n  // object syntax in v-bind\n  if (isDef(data) && isDef(data.is)) {\n    tag = data.is\n  }\n  if (!tag) {\n    // in case of component :is set to falsy value\n    return createEmptyVNode()\n  }\n  \n  // support single function children as default scoped slot\n  if (Array.isArray(children) &&\n    typeof children[0] === 'function'\n  ) {\n    data = data || {}\n    data.scopedSlots = { default: children[0] }\n    children.length = 0\n  }\n  if (normalizationType === ALWAYS_NORMALIZE) {\n    children = normalizeChildren(children)\n  } else if (normalizationType === SIMPLE_NORMALIZE) {\n    children = simpleNormalizeChildren(children)\n  }\n  let vnode, ns\n  if (typeof tag === 'string') {\n    let Ctor\n    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)\n    if (config.isReservedTag(tag)) {\n      // platform built-in elements\n      vnode = new VNode(\n        config.parsePlatformTagName(tag), data, children,\n        undefined, undefined, context\n      )\n    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {\n      // component\n      vnode = createComponent(Ctor, data, context, children, tag)\n    } else {\n      // unknown or unlisted namespaced elements\n      // check at runtime because it may get assigned a namespace when its\n      // parent normalizes children\n      vnode = new VNode(\n        tag, data, children,\n        undefined, undefined, context\n      )\n    }\n  } else {\n    // direct component options / constructor\n    vnode = createComponent(tag, data, context, children)\n  }\n  if (Array.isArray(vnode)) {\n    return vnode\n  } else if (isDef(vnode)) {\n    if (isDef(ns)) applyNS(vnode, ns)\n    if (isDef(data)) registerDeepBindings(data)\n    return vnode\n  } else {\n    return createEmptyVNode()\n  }\n}\n")])])]),t("p",[e._v("_createElement支持五个参数，context代表VNode 的上下文环境，tag表示要创建的dom标签，可以是一个String类型也可以是一个Component，data表示VNode 的数据，children是当前VNode的子节点。")]),e._v(" "),t("p",[e._v("接着是对children的规范化，因为参数children可以接受任意类型的数据，可以是单个节点，也可以是多个节点组成的数组，甚至可以是一段字符文本。normalizeChildren和simpleNormalizeChildren都是用来规范化children的。如果render函数是编译生成的，children已经是VNode类型数据，但是函数式组件返回的是一个数组而不是一个根节点，需要在simpleNormalizeChildren中单独处理一下；如果render是用户自己手写的，则会调用normalizeChildren方法处理children。")]),e._v(" "),t("p",[e._v("最后是创建VNode的过程。判断tag是字符串的情况，如果tag是html内置的标签（div、span、svg等），直接创建普通的VNode，如果是用户在components中注册的组件名字，则调用createComponent，如果是未知的标签名，则创建一个未类型的VNode；如果tag是Component类型，也是调用createComponent方法。对于组件创建VNode的过程比较复杂，所以vue提供了createComponent专门用于组件类型的VNode创建。createComponent方法在后面再详细介绍。")]),e._v(" "),t("p",[e._v("从上面的分析，已经了解了从new Vue开始，在Vue内部都做了哪些事：\n1、 初始化阶段 调用了this._init\n2、 挂载阶段 _init内部调用vm.$mount，$mount调用了mountComponent，mountComponent内部创建了渲染Watcher并把updateComponent传给Watcher，由Watcher内部调用updateComponent，也就是执行vm._update(vm._render())\n3、 render阶段 _render方法内部用户手写或者编译生成的render方法，render方法最终执行的是createElement")]),e._v(" "),t("p",[e._v("目前为止，我们已经知道了从new Vue开始到创建虚拟dom（VNode）的过程，最终还是需要把VNode渲染到页面，这也就是vm._update方法的作用。_update定义在mysrc/core/instance/lifecycle.js")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("export function lifecycleMixin (Vue) {\n  Vue.prototype._update = function (vnode, hydrating) {\n    const vm = this\n    const prevEl = vm.$el\n    const prevVnode = vm._vnode\n    const restoreActiveInstance = setActiveInstance(vm)\n    vm._vnode = vnode\n    // Vue.prototype.__patch__ is injected in entry points\n    // based on the rendering backend used.\n    if (!prevVnode) {\n      // initial render\n      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)\n    } else {\n      // updates\n      vm.$el = vm.__patch__(prevVnode, vnode)\n    }\n    restoreActiveInstance()\n    // update __vue__ reference\n    if (prevEl) {\n      prevEl.__vue__ = null\n    }\n    if (vm.$el) {\n      vm.$el.__vue__ = vm\n    }\n    // if parent is an HOC, update its $el as well\n    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {\n      vm.$parent.$el = vm.$el\n    }\n  }\n}\n")])])]),t("p",[e._v("在lifecycleMixin方法中，对Vue原型添加了_update方法，_update接受两个参数，第一个参数vnode代表虚拟dom，第二个参数hydrating与服务端渲染有关，暂不考虑第二个参数。无论是首次渲染还是更新渲染，都会执行_update，先分析首次渲染时的逻辑。代码核心内容是调用了vm.__patch__方法，并赋值给了vm.$el属性，vm.__patch__方法返回的是由VNode创建的真实dom，所以vm.$el就是VNode对象与VNode最终挂载的真实dom的映射，用户使用this.$el就可以访问当前实例对应的真实dom。")]),e._v(" "),t("p",[e._v("打开mysrc/platforms/web/runtime/index.js")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// Vue.prototype.__patch__ = inBrowser ? patch : noop\nVue.prototype.__patch__ = patch;  // 在浏览器环境inBrowser为true\n")])])]),t("p",[e._v("patch定义在mysrc/platforms/web/runtime/patch.js")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("const modules = [];\n\nexport const patch = createPatchFunction({ nodeOps, modules })\n")])])]),t("p",[e._v("在patch内部调用了createPatchFunction方法，createPatchFunction接受一个对象参数，nodeOps封装了一些对document操作dom的方法，modules是一个空数组，modules的作用以后再介绍。")]),e._v(" "),t("p",[e._v("查看createPatchFunction的实现，打开mysrc/core/vdom/patch.js")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("export function createPatchFunction (backend) {\n  \n  .\n  .\n  .\n  \n  return function patch (oldVnode, vnode, hydrating, removeOnly) {\n\n    // eslint-disable-next-line no-unused-vars\n    let isInitialPatch = false\n    const insertedVnodeQueue = []\n\n    if (isUndef(oldVnode)) {\n      // empty mount (likely as component), create new root element\n      /** 如果首次渲染 不存在旧的节点 */\n      isInitialPatch = true\n      createElm(vnode, insertedVnodeQueue)\n    } else {\n      // /*标记旧的VNode是否有nodeType*/\n      const isRealElement = isDef(oldVnode.nodeType)\n      if (!isRealElement && sameVnode(oldVnode, vnode)) {\n        // patch existing root node\n        /*是同一个节点的时候直接修改现有的节点*/\n        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)\n      } else {\n        if (isRealElement) {\n          // create an empty node and replace it\n          oldVnode = emptyNodeAt(oldVnode)\n        }\n\n        // replacing existing element\n        const oldElm = oldVnode.elm\n        const parentElm = nodeOps.parentNode(oldElm)\n\n        // create new node\n        createElm(\n          vnode,\n          insertedVnodeQueue,\n          // extremely rare edge case: do not insert if old element is in a\n          // leaving transition. Only happens when combining transition +\n          // keep-alive + HOCs. (#4590)\n          oldElm._leaveCb ? null : parentElm,\n          nodeOps.nextSibling(oldElm)\n        )\n      }\n    }\n\n    // invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)\n    return vnode.elm\n  }\n}\n\n")])])]),t("p",[e._v("在createPatchFunction文件里定义了一些其他的辅助方法，主要分析最终返回的function patch方法，这个方法就是vm._update 函数里调用的 vm.__patch__方法。patch方法接受四个参数，第一个参数oldVnode表示旧的节点或者空，如果首次渲染oldVnode的值为空，如果oldVnode不为空，说明是更新渲染。需要注意的是即便是首次渲染根组件也会把其挂载的真实dom（#app）传给oldVnode，不然整个vue项目就无法挂载到public/index.html中；第二个参数vnode表示虚拟dom；hydrating表示是否SSR；removeOnly 是在 transition-group才会用到。")]),e._v(" "),t("p",[e._v("代码的核心是调用createElm方法：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function createElm (\n  vnode,\n  insertedVnodeQueue,\n  parentElm,\n  refElm,\n  nested,\n  ownerArray,\n  index\n) {\n  if (isDef(vnode.elm) && isDef(ownerArray)) {\n    vnode = ownerArray[index] = cloneVNode(vnode)\n  }\n\n  vnode.isRootInsert = !nested // for transition enter check\n  if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {\n    return\n  }\n  const data = vnode.data\n  const children = vnode.children\n  const tag = vnode.tag\n  if (isDef(tag)) {\n\n    vnode.elm = vnode.ns\n      ? nodeOps.createElementNS(vnode.ns, tag)\n      : nodeOps.createElement(tag, vnode)\n\n    /* istanbul ignore if */\n    createChildren(vnode, children, insertedVnodeQueue)\n    \n    insert(parentElm, vnode.elm, refElm)\n\n  } else if (vnode.isComment) {\n    // 注释节点\n    vnode.elm = nodeOps.createComment(vnode.text)\n    insert(parentElm, vnode.elm, refElm)\n  } else {\n    // 文本节点\n    vnode.elm = nodeOps.createTextNode(vnode.text)\n    insert(parentElm, vnode.elm, refElm)\n  }\n}\n")])])]),t("p",[e._v("createElm方法会尝试创建子组件，这里先不介绍，对于当前的普通情况，创建子组件会失败返回false，然后对tag的合法性做一个判断，如果tag是一个合法的标签，首先根据vnode.ns属性创建带有指定命名空间的元素节点或者创建一个普通元素节点作为占位符元素，在insert插入到页面之前先处理子节点createChildren，这也就是为什么生命周期里父子组件生命周期的调用顺序是：")]),e._v(" "),t("p",[e._v("父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted\n就是因为在父组件插入到页面之前（父beforeMount）先去处理子节点。")]),e._v(" "),t("p",[e._v("createChildren方法：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function createChildren (vnode, children, insertedVnodeQueue) {\n  if (Array.isArray(children)) {\n    if (process.env.NODE_ENV !== 'production') {\n      checkDuplicateKeys(children)\n    }\n    for (let i = 0; i < children.length; ++i) {\n      createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)\n    }\n  } else if (isPrimitive(vnode.text)) {\n    nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))\n  }\n}\n")])])]),t("p",[e._v("createChildren方法比较简单，就是遍历子组件数组，利用递归的方式依次调用createElm方法。")]),e._v(" "),t("p",[e._v("insert方法：")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function insert (parent, elm, ref) {\n  if (isDef(parent)) {\n    if (isDef(ref)) {\n      if (nodeOps.parentNode(ref) === parent) {\n        nodeOps.insertBefore(parent, elm, ref)\n      }\n    } else {\n      nodeOps.appendChild(parent, elm)\n    }\n  }\n}\n")])])]),t("p",[e._v("insert方法调用了nodeOps.appendChild或insertBefore方法，parent这时是一个创建好的真实节点，nodeOps.appendChild实际上就是执行的dom.appendChild或dom.insertBefore。最终完成了VNode渲染到页面的整个过程。")]),e._v(" "),t("p",[e._v("最后还有一个疑问，为什么updateComponent方法不直接执行，而是创建一个渲染Watcher，在渲染Watcher里执行。下一章就开始介绍Vue响应式系统，从而揭晓答案。")])])}),[],!1,null,null,null);n.default=r.exports}}]);