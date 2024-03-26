
// Animation début de page
let textWrapper = document.querySelector(".textWrapper");
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
let textWrapperTwo = document.querySelector('.textWrapperTwo');
textWrapperTwo.innerHTML = textWrapperTwo.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
let imageWrapper = document.querySelector('.reseau');





let myTimeline = anime.timeline({ loop: false })
    .add({
        targets: '.textWrapper .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 1200,
        delay: (el, i) => 120 * (i + 1)
    })
    .add({
        targets: '.textWrapperTwo .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 600,
        delay: (el, i) => 60 * (i + 1)
    })
    .add({
        targets: '.reseau .image',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 300,
        delay: (el, i) => 30 * (i + 1)
    })
    .add({
        targets: '.imageScroll',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 300,
        delay: (el, i) => 30 * (i + 1)
    })