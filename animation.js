function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

let tl = gsap.timeline();

tl.from("nav img", {
  y: 100,
  duration: 1,
  opacity: 0,
});

tl.from(".nav-right ul li", {
  y: 100,
  duration: 1,
  opacity: 0,
  stagger: 0.1,
});

tl.from(".facilities .facilities-content div", {
  scale: 0,
  opacity: 0,
  duration: 1,
  stagger: 0.5,
  scrollTrigger: {
    trigger: ".facilities .facilities-content div",
    scroller: "#main",
    scrub: 2,
  },
});

tl.from(".section1", {
  y: -100,
  opacity: 0,
  scale: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".section1",
    scroller: "#main",
    end: "top 50%",
    scrub: 3,
  },
});

tl.from(".section2 .score-heading", {
  x: -500,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".section2 .score-heading",
    scroller: "#main",
    scrub: 3,
    end: "top 50%",
  },
});

gsap.from(".section2 .score-bord", {
  x: 500,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".section2 .score-bord",
    scroller: "#main",
    scrub: 3,
    end: "top 50%",
  },
});

tl.from(".section3", {
  y: -100,
  opacity: 0,
  scale: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".section3",
    scroller: "#main",
    start: "top 90%",
    end: "top 60%",
    scrub: 3,
  },
});

tl.from(".section4", {
  y: -100,
  opacity: 0,
  scale: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".section4",
    scroller: "#main",
    start: "top 90%",
    end: "top 60%",
    scrub: 3,
  },
});

// tl.from(".section5 .caring-content div", {
//   // scale: 0,
//   opacity: 0,
//   duration: 1,
//   stagger: 0.5,
//   scrollTrigger: {
//     trigger: ".section5 .caring-content div",
//     scroller: "#main",
//     scrub: 2,
//   },
// });