function inject_createViewer() {
  console.log("//////// injected viewer ////////");
  AFRAME.registerComponent("image-panel-viewer", {
    schema: {},

    init: function () {
      // Do something when component first attached.
      console.log("component attached");
      this.currImg = this.el.querySelector("#curr-image");
      this.prevImg = this.el.querySelector("#prev-image");

      /* var nextButton = document.querySelector("#box-red");
      var prevButton = document.querySelector("#box-blue"); */
      this.nextButton = this.el.querySelector("#box-red");
      this.prevButton = this.el.querySelector("#box-blue");

      this.pageCount = 0;

      this.prevClick = this.prevClick.bind(this);
      this.nextClick = this.nextClick.bind(this);

      this.imageArray = new Array();
      this.imageArray[0] = new Image();
      this.imageArray[0].src =
        "https://ih0.redbubble.net/image.974952917.5031/flat,1000x1000,075,f.u8.jpg";

      this.imageArray[1] = new Image();
      this.imageArray[1].src =
        "https://www.andeo-shop.com/10193-thickbox_default/lodes-random-single.jpg";

      this.imageArray[2] = new Image();
      this.imageArray[2].src =
        "https://www.andeo-shop.com/10192-thickbox_default/lodes-random-single.jpg";

      this.imageArray[3] = new Image();
      this.imageArray[3].src =
        "https://image.winudf.com/v2/image/b3JnLmdyZWguZ2Z4Z2VubmV3X3NjcmVlbl8wXzE1Mzc5MDU2MDRfMDk1/screen-0.jpg?fakeurl=1&type=.jpg";

      this.nextButton.addEventListener("click", this.prevClick);
      this.prevButton.addEventListener("click", this.nextClick);
      
      this.currImg.setAttribute("src", this.imageArray[0]);
      this.prevImg.setAttribute("src", this.imageArray[0]);
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

  /* let menuEntity = document.createElement("a-entity");

  menuEntity.setAttribute("image-panel-viewer");
  menuEntity.setAttribute("id", "imagepanel");
  menuEntity.innerHTML =
    "<a-image id='curr-image' src='/images/books/test_2.jpg' position='0.55 2 0'></a-image> <a-image id='prev-image' src='/images/books/test_1.jpg' position='-0.55 2 0'></a-image><a-entity id='box-blue' geometry='primitive: box' material='color: blue' position='0.7 2 0' scale='0.2 0.2 0.2'></a-entity><a-entity id='box-red' geometry='primitive: box' material='color: red' position='-0.7 2 0' scale='0.2 0.2 0.2'></a-entity>"; */
}

inject_createViewer();

function mod_addViewer() {
  if (document.querySelector("a-entity[image-panel-viewer]") == null) {
    var el = document.createElement("a-entity");
    el.setAttribute("id", "imagepanel");
    el.setAttribute("image-panel-viewer", "");
    el.innerHTML =
      "<a-image id='curr-image' src='/images/books/test_2.jpg' position='0.55 2 0'></a-image> <a-image id='prev-image' src='/images/books/test_1.jpg' position='-0.55 2 0'></a-image><a-entity id='box-blue' geometry='primitive: box' material='color: blue' position='0.7 2 0' scale='0.2 0.2 0.2'></a-entity><a-entity id='box-red' geometry='primitive: box' material='color: red' position='-0.7 2 0' scale='0.2 0.2 0.2'></a-entity>";
    AFRAME.scenes[0].appendChild(el);
    console.log("added image-panel-viewer");
  } else {
    console.log("image-panel-viewer alreadye exists");
  }
}

