const list = ["a", "b", "c"];

list.forEach((item, index, arr) => {
  // console.log(item);
});

function forAll(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

forAll(list, function (item, index, arr) {
  console.log(item, index, arr);
});

const form = document.getElementById("form");

const handler = (ev) => {
  console.log(ev.target);
};

form.addEventListener(handler);

class EventTarget {
  addEventListener(event, handler) {
    subscribeToEvent(event, (ev) => {
      handler(ev);
    });
  }
}

elMap.form.addEventListener("submit", this.submitForm);
