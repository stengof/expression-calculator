function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  const priority = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
  }

  let numbers = [];
  let operations = [];

  function returnNumber(str, n) {
    let num = "";

    for (let i = n;; i++) {
      if (/\d/.test(str[i])) {
        num += str[i];
      } else {
        break;
      }
    }

    return num;
  }

  function isOperator(n) {
    if (n === "+" || n === "-" || n === "*" || n === "/") return true;
    return false;
  }

  function makeOperation(value1, value2, operation) {
    switch (operation) {
      case "+":
        return value1 + value2;
      case "-":
        return value1 - value2;
      case "*":
        return value1 * value2;
      case "/":
        if (value2 === 0) throw "TypeError: Division by zero.";
        return value1 / value2;
    }
  }

  function addOperatorToStack(j) {
    if (isOperator(j)) {
      if (priority[j] > priority[operations[operations.length - 1]] || operations.length === 0 || operations[operations.length - 1] === "(") {
        operations.push(j);
      } else if (priority[j] <= priority[operations[operations.length - 1]]) {
        let calculated = makeOperation(numbers[numbers.length - 2], numbers[numbers.length - 1], operations[operations.length - 1]);
        numbers.pop();
        numbers.pop();
        numbers.push(calculated);
        operations.pop();
        addOperatorToStack(expr[step]);
      }
    }
  }

  for (let i = 0, open = 0, close = 0; i < expr.length; i++) {
    if (expr[i] === "(") ++open;
    if (expr[i] === ")") ++close;
    if ( i === expr.length - 1 && open !== close) throw "ExpressionError: Brackets must be paired";
  }


  let step = 0
  for (; step < expr.length + 1; step++) {
    if (expr[step] === " ") continue;

    let checknum = returnNumber(expr, step);
    if (checknum !== "") {
      if (checknum.length > 1) {
        step += checknum.length - 1;
        numbers.push(Number(checknum));
      } else {
        numbers.push(Number(checknum));
      }
    }

    addOperatorToStack(expr[step]);

    if (expr[step] === "(") operations.push(expr[step])

    if (expr[step] === ")") {
      if (operations[operations.length - 1] === "(") {
        operations.pop();
      } else {
        while (operations[operations.length - 1] !== "(") {
          let calculated = makeOperation(numbers[numbers.length - 2], numbers[numbers.length - 1], operations[operations.length - 1]);
          numbers.pop();
          numbers.pop();
          numbers.push(calculated);
          operations.pop();
        }
        operations.pop()
      }
    }
    if (step === expr.length) {
      while (operations.length !== 0) {
        let calculated = makeOperation(numbers[numbers.length - 2], numbers[numbers.length - 1], operations[operations.length - 1]);
        numbers.pop();
        numbers.pop();
        numbers.push(calculated);
        operations.pop();
      }
    }
  }
  return numbers[0];
}

module.exports = {
    expressionCalculator
}
