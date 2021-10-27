function inject_createViewer() {
  console.log("//////// injected viewer ////////");

  /* const entity = document.createElement("a-entity");
  entity.setAttribute("image-panel-viewer", "");
  AFRAME.scenes[0].appendChild(entity); */

  mod_addViewer();

  AFRAME.registerComponent("image-panel-viewer", {
    schema: {},
    init() {
      // Do something when component first attached.
      console.log("component attached");
      this.onNext = this.onNext.bind(this);
      this.onPrev = this.onPrev.bind(this);

      this.currImg = this.el.querySelector("#curr-image");
      this.prevImg = this.el.querySelector("#prev-image");

      /* var nextButton = document.querySelector("#box-red");
      var prevButton = document.querySelector("#box-blue"); */
      this.nextButton = this.el.querySelector("#box-red");
      this.prevButton = this.el.querySelector("#box-blue");

      this.nextButton.object3D.addEventListener("interact", this.onNext);
      this.prevButton.object3D.addEventListener("interact", this.onPrev);

      this.pageCount = 0;

      this.imageArray = new Array();
      this.imageArray[0] = new Image();
      this.imageArray[0].src =
        "https://loafwad.github.io/images/books/test_1.jpg";

      this.imageArray[1] = new Image();
      this.imageArray[1].src =
        "https://loafwad.github.io/images/books/test_2.jpg";

      this.imageArray[2] = new Image();
      this.imageArray[2].src =
        "https://loafwad.github.io/images/books/test_3.jpg";

      this.imageArray[3] = new Image();
      this.imageArray[3].src =
        "https://loafwad.github.io/images/books/test_4.jpg";

      this.update();

      this.currImg.setAttribute("src", this.imageArray[1].src);
      this.prevImg.setAttribute("src", this.imageArray[0].src);
    },

    onPrev() {
      console.log("prev page");

      /* this.currImg.setAttribute("src", this.imageArray[1].src); */
      if (this.pageCount > 0) {
        this.pageCount--;
      } else if (this.pageCount <= 0) {
        this.pageCount = this.imageArray.length - 2;
      }
      this.prevImg.setAttribute("src", this.imageArray[this.pageCount].src);
      this.currImg.setAttribute("src", this.imageArray[this.pageCount + 1].src);
    },

    onNext() {
      console.log("next page");

      if (this.pageCount + 1 >= this.imageArray.length - 1) {
        this.pageCount = 0;
      } else {
        this.pageCount++;
      }
      this.prevImg.setAttribute("src", this.imageArray[this.pageCount].src);
      this.currImg.setAttribute("src", this.imageArray[this.pageCount + 1].src);
    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    },
  });
}

inject_createViewer();

function mod_addViewer() {
  if (document.querySelector("a-entity[image-panel-viewer]") == null) {
    var el = document.createElement("a-entity");
    let assets = document.querySelector("a-assets");
    let newTemplate = document.createElement("template");
    newTemplate.id = "image-panel-viewer";

    el.setAttribute("id", "imagepanel");
    el.setAttribute("image-panel-viewer", "");
    el.setAttribute("class", "ui interactable-ui hover-container");
    el.setAttribute("hoverable-visuals", "");
    el.innerHTML =
      "<a-image id='curr-image' src='' position='0.55 2 0'></a-image> <a-image id='prev-image' src='' position='-0.55 2 0'></a-image><a-entity id='box-blue' geometry='primitive: box' material='color: blue' position='0.7 2 0' scale='0.2 0.2 0.2'></a-entity><a-entity id='box-red' geometry='primitive: box' material='color: red' position='-0.7 2 0' scale='0.2 0.2 0.2'></ a-entity>";
    /* AFRAME.scenes[0].appendChild(el); */
    newTemplate.content.appendChild(el);

    assets.appendChild(newTemplate);
    console.log("added image-panel-viewer");
  } else {
    console.log("image-panel-viewer alreadye exists");
  }
}
