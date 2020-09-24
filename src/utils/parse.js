export default function parse(expression) {
  return Function(`'use strict'; return (${expression})`)();
}