import parse from './utils/parse';

export default function aritmetic(input) {
  const { context, expression, transitions, save } = input;
  let newExpression = '';
  let result, newTransition = 0;

  if (Object.keys(context).length && context.constructor === Object) {
    for (const variable in context) {
      const subStr = `${variable}`;
      let newSubStr = context[variable];

      if (typeof newSubStr === 'string') {
        newSubStr = `'${newSubStr}'`;
      }

      newExpression = expression.replace(subStr, newSubStr);
    }
  } else {
    newExpression = expression;
  }

  result = parse(newExpression).toString();

  if (!isNaN(result)) {
    newTransition = transitions.next;
  } else {
    newTransition = transitions.error;
  }

  return {
    [save]: result,
    transition: newTransition
  }
}