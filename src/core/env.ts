const NODE_ENV = import.meta.env.VITE_NODE_ENV
const inject_version = '1.0.1'
const pkg =
  NODE_ENV == 'production'
    ? {
        version: inject_version,
      }
    : require('../../package.json')
const env = {
  version: pkg.version,
}
export default env
