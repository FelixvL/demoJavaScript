class Base {
  get foo() {
    return this._foo;
  }

  set foo(v) {
    this._foo = v;
  }

  constructor() {
    this.foo = 0;
  }

  incrementFoo() {
    this.foo = this.foo + 1;
  }
}

class Extension extends Base {
  constructor() {
    super();

    this.incrementFoo();

    console.log(this.foo);
  }
}

new Extension();
