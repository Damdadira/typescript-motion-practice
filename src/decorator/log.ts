function Log(
  _target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
    console.log(`Calling ${propertyKey} with arguments:`);
    console.dir(args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`);
    console.dir(result);
    return result;
  };
  return descriptor;
}

class Calculator {
  @Log
  add(x: number, y: number): number {
    return x + y;
  }
}

const calculator = new Calculator();
console.log(calculator.add(1, 2));