(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{376:function(e,n,r){"use strict";r.r(n);var t=r(45),a=Object(t.a)({},(function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"render"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#render"}},[e._v("#")]),e._v(" Render")]),e._v(" "),r("p",[e._v("打开mysrc/core/instance/render.js")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("Vue.prototype._render = function () {\n    \n    const vm = this\n    const { render, _parentVnode } = vm.$options\n\n    // set parent vnode. this allows render functions to have access\n    // to the data on the placeholder node.\n    vm.$vnode = _parentVnode\n    // render self\n    let vnode\n    // There's no need to maintain a stack because all render fns are called\n    // separately from one another. Nested component's render fns are called\n    // when parent component is patched.\n    currentRenderingInstance = vm\n    vnode = render.call(vm._renderProxy, vm.$createElement)\n    currentRenderingInstance = null\n   \n    // if the returned array contains only a single node, allow it\n    if (Array.isArray(vnode) && vnode.length === 1) {\n      vnode = vnode[0]\n    }\n    // return empty vnode in case the render function errored out\n    if (!(vnode instanceof VNode)) {\n      vnode = createEmptyVNode()\n    }\n    // set parent\n    vnode.parent = _parentVnode\n    return vnode\n  }\n")])])]),r("p",[e._v("在_render方法内部调用了options.render方法。回想一下render的使用方式：")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("render: function (h) {\n  return h('div', {\n     attrs: {\n        id: 'mydiv'\n      },\n  })\n}\n")])])]),r("p",[e._v("所以h就是执行的vm.$createElement方法。即便没有使用render，而是写成模板形式,最终也会编译成render函数的形式：")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('<div id="myapp">{{...}}</div>\n\n// 编译之后\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c("div", { attrs: { id: "mydiv" } })\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\nexport { render, staticRenderFns }\n')])])]),r("p",[e._v("继续再mysrc/core/instance/render.js文件中找到vm.$createElement的定义")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("export function initRender (vm) {\n  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)\n  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)\n}\n")])])]),r("p",[e._v("可以看到在initRender方法里对实例扩展了_c和$createElement两个方法，_c是被模板编译成的 render 函数使用的，$createElement是用户手写 render 方法使用的。这两个方法内部都是调用了createElement方法。")])])}),[],!1,null,null,null);n.default=a.exports}}]);