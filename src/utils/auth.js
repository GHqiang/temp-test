export default {
  /**
   * 获取token和设置token
   * @param isGetter
   * @param key
   * @param data
   * @return {string}
   */
  token(isGetter = true, key, data) {
    if (isGetter) {
      // 获取token
      return '';
    } else {
      // 设置token
    }
  },
  /**
   * token 刷新方法
   * @returns {string}
   */
  refreshToken() {
    return '';
  }
};
