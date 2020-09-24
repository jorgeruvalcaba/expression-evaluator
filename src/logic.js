import parse from './utils/parse';

function replaceVariable(expression, variable, replacement) {
  const newExpression = expression.split(variable).join(replacement);
  return newExpression;
}

function getResults(result, transitions) {
  let newTransition = 0;
  let newResult = result.toString();

  if (result == "true") {
    newResult = true;
    newTransition = transitions.isTrue;
  } else if (result == "false") {
    newResult = false;
    newTransition = transitions.isFalse;
  } else {
    newTransition = transitions.isError;
  }

  return {
    newResult,
    newTransition
  };
}

export default function logic(input) {
  const { context, expression, transitions, save } = input;
  let newExpression = '';
  let result = 0;
  let results = {};

  if (Object.keys(context).length && context.constructor === Object) {
    newExpression = expression

    for (const variable in context) {
      const subStrIndex = newExpression.indexOf(variable);

      if (!subStrIndex) continue;
      newExpression = replaceVariable(newExpression, variable, context[variable]);
    }
  }
  else {
    newExpression = expression;
  }

  try {
    result = parse(newExpression).toString();
  } catch(e) {
    result = e;
  }
  results = getResults(result, transitions);

  return {
    [save]: results.newResult,
    transition: results.newTransition
  }
}