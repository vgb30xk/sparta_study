class Cloth {
  constructor(color, size, price) {
    this.color = color;
    this.size = size;
    this.price = price;
  }

  printInfo() {
    console.log(
      `color is ${this.color}, size is ${this.size}, price is ${this.price}`
    );
  }
}

const coat = new Cloth("red", "XL", 20000);
const pants = new Cloth("green", "L", 10000);

coat.printInfo();
pants.printInfo();
