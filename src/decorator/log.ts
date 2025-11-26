function Log<T extends (...args: any[]) => any>(
  originalMethod: T,
  context: ClassMethodDecoratorContext
) {
  const methodName = String(context.name);
  return function (this: any, ...args: any[]): any {
    console.log(`Calling ${methodName} with arguments:`);
    console.dir(args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`);
    console.dir(result);
    return result;
  };
}

class Calculator {
  @Log
  add(x: number, y: number): number {
    return x + y;
  }
}

const calculator = new Calculator();
console.log(calculator.add(1, 2));