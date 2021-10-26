function inject_createViewer() {
  AFRAME.registerComponent("image-panel-viewer", {
    schema: {},

    init: function () {
      // Do something when component first attached.
      this.currImg = document.querySelector("#curr-image");
      this.prevImg = document.querySelector("#prev-image");

      /* var nextButton = document.querySelector("#box-red");
      var prevButton = document.querySelector("#box-blue"); */
      this.nextButton = this.el.querySelector("#box-red");
      this.prevButton = this.el.querySelector("#box-blue");
      this.pageCount = 0;

      this.prevClick = this.prevClick.bind(this);
      this.nextClick = this.nextClick.bind(this);

      this.imageArray = new Array();
      this.imageArray[0] = new Image();
      this.imageArray[0].src = "images/books/test_1.jpg";

      this.imageArray[1] = new Image();
      this.imageArray[1].src = "images/books/test_2.jpg";

      this.imageArray[2] = new Image();
      this.imageArray[2].src = "images/books/test_3.jpg";

      this.imageArray[3] = new Image();
      this.imageArray[3].src = "images/books/test_4.jpg";

      nextButton.addEventListener("click", this.prevClick);
      prevButton.addEventListener("click", this.nextClick);
    },

    prevClick: function (event) {
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

    nextClick: function (event) {
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
  let assets = document.querySelector("a-assets");

  let imageViewerTemplate = document.createElement("template");

  imageViewerTemplate.id = "image-viewer";
  let menuEntity = document.createElement("a-entity");

  menuEntity.setAttribute("image-panel");
  menuEntity.innerHTML =
    "<a-image id='curr-image' src='/images/books/test_2.jpg' position='0.55 2 0'></a-image> <a-image id='prev-image' src='/images/books/test_1.jpg' position='-0.55 2 0'></a-image><a-entity id='box-blue' geometry='primitive: box' material='color: blue' position='0.7 2 0' scale='0.2 0.2 0.2'></a-entity><a-entity id='box-red' geometry='primitive: box' material='color: red' position='-0.7 2 0' scale='0.2 0.2 0.2'></a-entity>";

  imageViewerTemplate.content.appendChild(menuEntity);

  assets.appendChild(imageViewerTemplate);
}

inject_createViewer();

function mod_addViewer() {
  if (document.querySelector("a-entity[image-panel-viewer]") == null) {
    var el = document.createElement("a-entity");
    el.setAttribute("id", "imagepanel");
    AFRAME.scenes[0].appendChild(el);

    console.log("added image-panel-viewer");
  } else {
    console.log("image-panel-viewer alreadye exists");
  }
}
