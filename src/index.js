import Component from './components/Component.vue'

// expose component to global scope
if (typeof window !== 'undefined' && window.Vue) {
  Vue.component('component', Component)
}

export default Component

export { Component }
