function inject_createViewer() {
  console.log("//////// injected viewer ////////");

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
      this.nextButton = this.el.querySelector(".next-button");
      this.prevButton = this.el.querySelector(".prev-button");

      this.nextButton.object3D.addEventListener("interact", this.onNext);
      this.prevButton.object3D.addEventListener("interact", this.onPrev);
      console.log("added event listeners");

      this.pageCount = 0;

      this.imageArray = new Array();
      this.imageArray[0] = new Image();
      this.imageArray[0].src =
        "https://loafwad.github.io/images/TestPDF2-1.jpg";

      this.imageArray[1] = new Image();
      this.imageArray[1].src =
        "https://loafwad.github.io/images/TestPDF2-2.jpg";

      this.imageArray[2] = new Image();
      this.imageArray[2].src =
        "https://loafwad.github.io/images/TestPDF2-3.jpg";

      this.imageArray[3] = new Image();
      this.imageArray[3].src =
        "https://loafwad.github.io/images/TestPDF2-4.jpg";

      this.currImg.setAttribute("src", this.imageArray[1].src);
      this.prevImg.setAttribute("src", this.imageArray[0].src);
    },

    onNext() {
      console.log("next page");

      if (this.pageCount + 1 >= this.imageArray.length - 1) {
        return;
      } else {
        this.pageCount++;
      }
      this.prevImg.setAttribute("src", this.imageArray[this.pageCount].src);
      this.currImg.setAttribute("src", this.imageArray[this.pageCount + 1].src);
    },

    onPrev() {
      console.log("prev page");

      if (this.pageCount <= 0) {
        return;
      } else {
        this.pageCount--;
      }
      this.prevImg.setAttribute("src", this.imageArray[this.pageCount].src);
      this.currImg.setAttribute("src", this.imageArray[this.pageCount + 1].src);
    },
  });
}

inject_createViewer();

function mod_addViewer() {
  if (document.querySelector("a-entity [image-panel-viewer]") == null) {
    var newEntity = document.createElement("a-entity");

    newEntity.setAttribute("class", "ui interactable-ui hover-container");
    newEntity.setAttribute("image-panel-viewer", "");
    newEntity.setAttribute("visible", true);

    newEntity.setAttribute("hoverable-visuals", "");
    newEntity.setAttribute("listed-media", "");
    newEntity.innerHTML =
      "<a-image id='curr-image' src='' position='0.45 2 0' width='0.8'></a-image> <a-image id='prev-image' src='' position='-0.45 2 0' width='0.8'></a-image><a-entity id='box-blue' class='next-button' is-remote-hover-target tags='singleActionButton:true; isHoverMenuChild: true;' geometry='primitive: box' material='color: blue' position='0.9 2 0' scale='0.2 0.2 0.2'></a-entity> <a-entity id='box-red' class='prev-button' is-remote-hover-target tags='singleActionButton:true; isHoverMenuChild: true;' geometry='primitive: box' material='color: red' position='-0.9 2 0' scale='0.2 0.2 0.2'></ a-entity>";
    newEntity.object3D.position.y = -0.5;
    newEntity.object3D.rotation.x = -0.35;
    AFRAME.scenes[0].appendChild(newEntity);

    console.log("added image-panel-viewer");
  } else {
    console.log("image-panel-viewer alreadye exists");
  }
}
