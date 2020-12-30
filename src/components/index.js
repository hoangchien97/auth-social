import Vue from 'vue'
import { upperFirst, camelCase } from 'lodash-es'

const requireComponent = require.context('.', true, /\.vue$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')))

  Vue.component(componentName, componentConfig.default || componentConfig)
})
