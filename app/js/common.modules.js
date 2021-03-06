import Swiper from '';

const appGallery = new Swiper('.appstore-screenshots__gallery', {
    slidesPerView: 'auto',
    spaceBetween: 10,
})

const appInfo = new Swiper('.appstore-head__rate', {
    slidesPerView: 'auto'
})

const appstoreTexts = document.querySelectorAll('.appstore-section-text');

appstoreTexts.forEach((item, i) => {
    const button = item.querySelector('.appstore-section-text--more-btn');
    button.addEventListener('click', (e) => {
        e.preventDefault();
        item.classList.add('opening');
        item.classList.remove('appstore-section-text--show-more');
        setTimeout(() => {
            item.classList.remove('opening');
        }, 300)
    })
})

const header = document.querySelector('.appstore-head .appstore-row');
const headerFixed = document.querySelector('.appstore-head-fixed');

checkHeaderFixed();
document.addEventListener('scroll', checkHeaderFixed)

function checkHeaderFixed () {
    if (!isVisible(header)) {
        headerFixed.classList.add('open')
    } else {
        headerFixed.classList.remove('open')
    }
}

function isVisible(elm) {
    const rect = elm.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
