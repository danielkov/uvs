module.exports.parameters = (...args) => {
  return (target, key, descriptor) => {
    let oldFunc = descriptor;
    descriptor = (...a) => {
      a.forEach((arg, i) => {
        if ((args[i] !== 'any' && args[i] !== 'optional' && typeof arg !== args[i] && args[i !== 'array']) || (args[i] === 'array' && Array.isArray(arg) === false)) throw new TypeError(`Argument ${i} should be of type ${args[i]}.`);
      })
      oldFunc.call(this, ...a);
    }
  }
}
