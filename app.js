var swiper = new Swiper(".swiper-gallery", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".swiper-vids", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 20,
  // effect: "fade",
  pagination: {
    el: ".swiper-pagination.vids-pag",
    clickable: true,
  },
});

var swiper = new Swiper(".swiper-analyze-pdf", {
  navigation: {
    nextEl: ".swiper-button-next.gal-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 20,
});

var swiper = new Swiper(".swiper-stretch", {
  navigation: {
    nextEl: ".stretch-next",
    prevEl: ".stretch-prev",
  },
  spaceBetween: 20,
});

var swiper = new Swiper(".swiper-related", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 10,
  slidesPerView: 5,

  // effect: "fade",
  // draggable: true,
  pagination: {
    el: ".swiper-pagination.vids-pag",
    clickable: true,
  },
  freeMode: true,
  breakpoints: {
    300: {
      slidesPerView: 2,
    },
    600: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5.5,
    },

    // 1500: {
    //     slidesPerView: 6,
    // },
  },
});

function submit() {
  const button = document.querySelector(".submit-btn");
  const card = document.querySelector(".flip-card");

  if (button && card) {
    button.addEventListener("click", () => {
      card.classList.add("active");
    });
  }
}

document.addEventListener("DOMContentLoaded", submit);

function addActive(item) {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
  document.addEventListener("click", (e) => {
    menu = document.querySelector(".menu-mobile");
    if (!menu.contains(e.target) && !item.contains(e.target)) {
      item.classList.remove("active");
    }
  });
}

function streamVid(item) {
  popup = document.querySelector(".popup");

  popup.classList.add("active");
  videoSrc = item.querySelector(".video-wrap video").src;
  popup.querySelector("video").src = videoSrc;
  popup.querySelector(".vid-name").textContent = item.dataset.name ?? "";

  close = popup.querySelector(".close");
  close.addEventListener("click", () => {
    popup.querySelector("video").pause();
    console.log(popup.querySelector("video").duration);
    popup.classList.remove("active");
  });
}

function show(item) {
  const currentActive = document.querySelector(".show-answer.active");

  if (currentActive && currentActive === item) {
    currentActive.classList.remove("active");
    currentActive.parentElement.classList.remove("active");
  } else {
    currentActive?.classList.remove("active");
    currentActive?.parentElement.classList.remove("active");

    item.classList.add("active");
    item.parentElement.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  currentPlaying = document.querySelector(".current-playing");
  if (currentPlaying) {
    currentPlaying.currentTime = +currentPlaying.dataset.playing;
  }

  const videos = document.querySelectorAll(".v-wrap");
  if (videos) {
    videos.forEach((videoWrap) => {
      const vid = videoWrap.querySelector("video");
      const progress = videoWrap.querySelector(".v-progress");

      if (vid && progress) {
        vid.addEventListener("loadedmetadata", () => {
          vid.dataset.duration = vid.duration.toFixed(2);

          const playing = parseFloat(vid.dataset.playing) || 0;
          const duration = parseFloat(vid.dataset.duration) || 0;

          let playingPercent = 0;
          if (duration > 0) {
            playingPercent = (playing / duration) * 100;
          }

          progress.style.width = `${playingPercent}%`;
        });
      }
    });
  }
});

function updatePolyline() {
  var circle1 = document.querySelector(".l1 .c1");
  var circle2 = document.querySelector(".l1 .c2");

  // var circle3 = document.querySelector(".l2 .c3");
  var circle4 = document.querySelector(".l2 .c4");

  if (circle1) {
    var containerWidth = circle1.parentElement.getBoundingClientRect().width;
    var containerHeight = circle1.parentElement.getBoundingClientRect().height;

    var cx1 =
      (parseFloat(circle1.getAttribute("cx").replace("%", "")) / 100) *
      containerWidth;
    var cy1 =
      (parseFloat(circle1.getAttribute("cy").replace("%", "")) / 100) *
      containerHeight;
    var cx2 =
      (parseFloat(circle2.getAttribute("cx").replace("%", "")) / 100) *
      containerWidth;
    var cy2 =
      (parseFloat(circle2.getAttribute("cy").replace("%", "")) / 100) *
      containerHeight;

    var cy4 =
      (parseFloat(circle4.getAttribute("cy").replace("%", "")) / 100) *
      containerHeight;
    // console.log(cy4);

    var newPoints = `${cx1},${cy1} ${cx1 - 200},${cy1} ${cx2},${cy2}`;

    var newPoints2 = `${cx1},${cy1} ${cx1 - 200},${cy1} ${cx2},${cy4}`;

    document.querySelector(".l1 polyline").setAttribute("points", newPoints);

    document.querySelector(".l2 polyline").setAttribute("points", newPoints2);
  }
}

window.addEventListener("load", updatePolyline);
window.addEventListener("resize", updatePolyline);
