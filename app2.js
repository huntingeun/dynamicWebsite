let controller;
let slideScene;
let pageScene;
let detailScene;

function animateSlides() {
  controller = new ScrollMagic.Controller();

  const slides = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  slides.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-image");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });

    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.7");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=1");

    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      .addTo(controller);
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "slide",
      // })

    const pageTl = gsap.timeline();
    let nextSlide =
      slides.length - 1 === index ? console.log("end") : slides[index + 1];

    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" }); //nextSlide 올라오는거 pause주기 좀 내리기
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5"); //안올려주면 화면 중간에 stuck

    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%", //last whole height of the slide
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
      // .addIndicators({
      //   colorTrigger: "white",
      //   colorStart: "white",
      //   name: "page",
      //   indent: 200,
      // });
  });
}

const circle = document.querySelector(".cursor");
const circleTxt = circle.querySelector("span");

function cursor(e) {
  circle.style.left = `${e.pageX}px`;
  circle.style.top = `${e.pageY}px`;
}
window.addEventListener("mousemove", cursor);

function activeCursor(e) {
  const element = e.target;

  if (element.id === "logo" || element.classList.contains("burger")) {
    circle.classList.add("nav-active");
  } else {
    circle.classList.remove("nav-active");
  }

  if (element.classList.contains("explore")) {
    circle.classList.add("explore-active");
    circleTxt.innerText = "Tap";
    //gsap.to(".title-swipe", 1, { y: "0%" });
  } else {
    circle.classList.remove("explore-active");
    circleTxt.innerText = "";
    //gsap.to(".title-swipe", 1, { y: "100%" });
  }
}
window.addEventListener("mouseover", activeCursor);

const burger = document.querySelector(".burger");
function navToggle(e) {
  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const navBar = document.querySelector(".nav-bar");
  const logo = document.querySelector("#logo");

  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(line1, 0.5, { rotate: "45", background: "black", y: 5 });
    gsap.to(line2, 0.5, { rotate: "-45", background: "black", y: -5 });
    gsap.to(logo, 1, { color: "black" });
    gsap.to(navBar, 1, { clipPath: "circle(2500px at 100% -10%)" });
  } else {
    e.target.classList.remove("active");
    gsap.to(line1, 0.5, { rotate: "0", background: "white", y: 0 });
    gsap.to(line2, 0.5, { rotate: "0", background: "white", y: 0 });
    gsap.to(logo, 1, { color: "white" });
    gsap.to(navBar, 1, { clipPath: "circle(50px at 100% -10%)" });
  }
}
burger.addEventListener("click", navToggle);

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=0.5");
    slideTl.fromTo(nextImg, { x: "20%" }, { x: "0%" });

    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0,
      duration: "100%",
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({ colorStart: "white", colorTrigger: "white" })
      .addTo(controller);
  });
}

function init() {
  animateSlides();
  detailAnimation();
}

init();
