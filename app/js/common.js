+function () {
    const appGallery = new Swiper('.appstore-screenshots__gallery', {
        slidesPerView: 'auto',
        spaceBetween: 10,
    })

    const reviewGallery = new Swiper('.appstore-reviews__container', {
        slidesPerView: 'auto',
        spaceBetween: 20
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

    function checkHeaderFixed() {
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

    const appstoreHeadRates = document.querySelector('.appstore-head__rate--slide');

     if (window.navigator.userAgent.indexOf('OS 14') > -1) {
         appstoreHeadRates.classList.add('ios14');
     } else {
         appstoreHeadRates.classList.add('ios13');
     }

}()