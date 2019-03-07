import React, { Component } from "react";
import { NavbarBrand } from "reactstrap";
import "./Creator.css";

const photos = [
  { src: "/images/vict-baby.png" },
  { src: "/images/ned.jpeg" },
  { src: "/images/devilgirl.jpg" },
  { src: "/images/trump.jpg" },
  { src: "/images/one-does-not.jpg" },
  { src: "/images/dank.png" },
  { src: "/images/boy.png" },
  { src: "/images/sad.png" },
  { src: "/images/wolf.png" },
  { src: "/images/fry.jpg" },
  { src: "/images/jobs.jpg" },
  { src: "/images/phone.jpg" },
  { src: "/images/oldie.png" },
  { src: "/images/image.png" },
  { src: "/images/doubt.png" },
  { src: "/images/crying.png" },
  { src: "/images/sponge.png" },
  { src: "/images/dog.png" },
  { src: "/images/frust.png" },
  { src: "/images/web.png" },
  { src: "/images/penguin.png" }
];

const initialState = {
  toptext: "",
  bottomtext: "",
  isTopDragging: false,
  isBottomDragging: false,
  topY: "10%",
  topX: "50%",
  bottomX: "50%",
  bottomY: "90%"
};

class Creator extends Component {
  constructor() {
    super();
    this.state = {
      currentImage: 0,
      modalIsOpen: false,
      currentImageBase64: null,
      ...initialState
    };
  }

  /* Convert image to data URI */
  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");

    return dataURL;
  }

  openImage = index => {
    const image = photos[index];
    const baseImage = new Image();

    baseImage.src = image.src;
    const base64 = this.getBase64Image(baseImage);
    this.setState(prevState => ({
      currentImage: index,
      modalIsOpen: !prevState.modalIsOpen,
      currentImageBase64: base64,
      ...initialState
    }));
  };

  convertSvgToImage = () => {
    const svg = this.svgRef;
    let svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const svgSize = svg.getBoundingClientRect();
    const img = document.createElement("img");

    canvas.setAttribute("id", "canvas");
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    img.setAttribute(
      "src",
      "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
    );
    img.onload = function() {
      canvas.getContext("2d").drawImage(img, 0, 0);
      const canvasData = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = "meme.png";
      a.href = canvasData;
      document.body.appendChild(a);
      a.click();
    };
  };

  changeText = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  getStateObj = (e, type) => {
    let rect = this.imageRef.getBoundingClientRect();
    const xOffset = e.clientX - rect.left;
    const yOffset = e.clientY - rect.top;
    let stateObj = {};
    if (type === "bottom") {
      stateObj = {
        isBottomDragging: true,
        isTopDragging: false,
        bottomX: `${xOffset}px`,
        bottomY: `${yOffset}px`
      };
    } else if (type === "top") {
      stateObj = {
        isTopDragging: true,
        isBottomDragging: false,
        topX: `${xOffset}px`,
        topY: `${yOffset}px`
      };
    }
    return stateObj;
  };

  handleMouseDown = (e, type) => {
    const stateObj = this.getStateObj(e, type);
    document.addEventListener("mousemove", event =>
      this.handleMouseMove(event, type)
    );
    this.setState({
      ...stateObj
    });
  };

  handleMouseMove = (e, type) => {
    if (this.state.isTopDragging || this.state.isBottomDragging) {
      let stateObj = {};
      if (type === "bottom" && this.state.isBottomDragging) {
        stateObj = this.getStateObj(e, type);
      } else if (type === "top" && this.state.isTopDragging) {
        stateObj = this.getStateObj(e, type);
      }
    }
  };

  handleMouseUp = event => {
    document.removeEventListener("mousemove", this.handleMouseMove);
    this.setState({
      isTopDragging: false,
      isBottomDragging: false
    });
  };

  render() {
    const image = photos[this.state.currentImage];
    const baseImage = new Image();

    baseImage.src = image.src;
    var ratio = baseImage.width / baseImage.height;
    var newWidth = 600;
    var newHeight = newWidth / ratio;
    const textStyle = {
      fontFamily: "Arial",
      fontSize: "50px",
      textTransform: "uppercase",
      fill: "#FFF",
      stroke: "#000",
      userSelect: "none"
    };

    return (
      <div className="main-content">
        <div className="sidebar">
          <NavbarBrand href="/">Make-a-Meme</NavbarBrand>
          <p>
            You can add top and bottom text to a meme-template, move the text
            around and you can save the image by downloading it.
          </p>
        </div>
        <div className="content">
          {photos.map((image, index) => (
            <div className="image-holder" key={image.src}>
              <span className="top-caption">Top text</span>
              <img
                style={{ width: "100%", height: "100%", cursor: "pointer" }}
                alt={index}
                src={image.src}
                onClick={() => this.openImage(index)}
                role="presentation"
              />
              <span className="bottom-caption">Bottom text</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Creator;
