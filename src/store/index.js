/**
 * f-vuex:vuex 扩展
 * create: function(modules={})
 * types：ACTIONS MUTATIONS GETTERS
 * formatModuleTypes: function(module,types,moduleName)
 * */
import { create, types, formatModuleTypes } from 'f-vuex';
// 加载store模块
import example from './modules/example';

// store模块对象
const modules = {
  example
};

// 异步模块调用
export const ACTION_EXAMPLE_TYPES = formatModuleTypes(
  example,
  types.ACTIONS,
  example.moduleName
);

// 同步模块调用
export const MUTATION_EXAMPLE_TYPES = formatModuleTypes(
  example,
  types.MUTATIONS,
  example.moduleName
);

// GETTES属性
export const GETTERS_EXAMPLE_TYPES = formatModuleTypes(
  example,
  types.GETTERS,
  example.moduleName
);
export default create(modules);
