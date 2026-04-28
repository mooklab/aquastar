import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs'
import { phoneMask } from "./phone.js"
import { Quantity } from './quantity.js'
import { Accordion } from './accordion.js'

const productSwipers = document.querySelectorAll('div.swiper.products')
const indexBrandSwiper = document.querySelector('section.brands div.swiper')
const indexArticleSwiper = document.querySelector('section.articles div.swiper')
const indexMainSwiper = document.querySelector('section.main div.swiper')
const productImageSwiper = document.querySelector('section.product div.swiper.images')
const productThumbSwiper = document.querySelector('section.product div.swiper.thumbs')
const productTabSwiper = document.querySelector('section.tabs div.swiper')

const quantities = document.querySelectorAll('div.quantity')
const accordions = document.querySelectorAll('div.accordion')
const phoneInputs = document.querySelectorAll('input[type=tel]')



productSwipers.forEach(swiper => {
    new Swiper(swiper, {
        slidesPerView: 1.25,
        spaceBetween: 10,
        navigation: {
            nextEl: swiper?.closest('section').querySelector('div.swiper-navigation div.arrow:last-child'),
            prevEl: swiper?.closest('section').querySelector('div.swiper-navigation div.arrow:first-child')
        },
        breakpoints: {
            640: {
                slidesPerView: 2.25,
                spaceBetween: 10
            },
            960: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 24
            }
        }
    })
})

new Swiper(indexBrandSwiper, {
    slidesPerView: 2.5,
    spaceBetween: 10,
    navigation: {
        nextEl: indexBrandSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:last-child'),
        prevEl: indexBrandSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:first-child')
    },
    breakpoints: {
        640: {
            slidesPerView: 3.5,
            spaceBetween: 10
        },
        960: {
            slidesPerView: 5,
            spaceBetween: 20
        },
        1280: {
            slidesPerView: 6,
            spaceBetween: 24
        }
    }
})

new Swiper(indexArticleSwiper, {
    slidesPerView: 1.5,
    spaceBetween: 10,
    navigation: {
        nextEl: indexArticleSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:last-child'),
        prevEl: indexArticleSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:first-child')
    },
    breakpoints: {
        640: {
            slidesPerView: 2.5,
            spaceBetween: 10
        },
        960: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1280: {
            slidesPerView: 3,
            spaceBetween: 24
        }
    }
})

new Swiper(indexMainSwiper, {
    slidesPerView: 1.05,
    spaceBetween: 10,
    navigation: {
        nextEl: indexMainSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:last-child'),
        prevEl: indexMainSwiper?.closest('section').querySelector('div.swiper-navigation div.arrow:first-child')
    },
    breakpoints: {
        640: {
            slidesPerView: 1.5,
            spaceBetween: 10
        },
        960: {
            slidesPerView: 1.6,
            spaceBetween: 20
        },
        1280: {
            slidesPerView: 1.7,
            spaceBetween: 24
        }
    }
})

new Swiper(productImageSwiper, {
    slidesPerView: 1,
    thumbs: {
        swiper: productThumbSwiper
    }
})

new Swiper(productThumbSwiper, {
    slidesPerView: 'auto',
    spaceBetween: 8,
    direction: 'horizontal',
    breakpoints: {
        1280: {
            direction: 'vertical',
        }
    }
})

const tabSwiper = new Swiper(productTabSwiper, {
    autoHeight: true
})



// Переключение табов на странице товара
window.goToTab = (element, index) => {
    element.parentNode.querySelectorAll('span').forEach(span => {
        span.classList.remove('active')
    })
    element.classList.add('active')
    tabSwiper.slideTo(index)
}

// Количество
quantities.forEach(quantity => {
    const input = quantity.querySelector('input')
    const minus = quantity.querySelector('div.minus')
    const plus = quantity.querySelector('div.plus')
    new Quantity(input, minus, plus)
})

// Маска телефона
phoneInputs.forEach(phoneInput => {
    ['input', 'blur', 'focus'].forEach(event => {
        phoneInput.addEventListener(event, phoneMask)
    })
})

// Аккордионы
accordions && accordions.forEach(element => {
    const button = element.querySelector('div.accordion_caption')
    const content = element.querySelector('div.accordion_content')
    new Accordion(element, button, content, 300)
})

// Каталог меню
window.catalogMenu = (element) => {
    const catalogItems = document.querySelectorAll('div.popup.catalog div.menu_item')
    catalogItems.forEach(item => {
        item.classList.remove('opened')
    })
    element.parentNode.classList.toggle('opened')
}

// Ваалидация форм
// const forms = document.querySelectorAll("form");

// forms.forEach(form => {

//     form.addEventListener("submit", (event) => {
//         event.preventDefault()
//         console.log("Form submitted successfully!")
//     })

//     const inputs = form.querySelectorAll("input, textarea");
//     inputs.forEach((input) => {
//         input.addEventListener("invalid", (event) => {
//             event.target.style.border = "1px solid red"
//             event.target.parentNode.classList.add('error')
//             console.log(`Invalid input: ${event.target.name}`)
//         })

//         input.addEventListener("input", () => {
//             input.style.border = ""
//             input.parentNode.classList.remove('error')
//         })
//     })
// })


// Drag & Drop для таблицы сравнения
const container = document.querySelector('div.table')

let isDown = false
let startX
let scrollLeft


container?.addEventListener('mousedown', (e) => {
    isDown = true
    startX = e.pageX - container.offsetLeft
    scrollLeft = container.scrollLeft
    container.style.cursor = 'grabbing'
})

container?.addEventListener('mouseleave', () => {
    isDown = false
    container.style.cursor = 'grab'
})

container?.addEventListener('mouseup', () => {
    isDown = false
    container.style.cursor = 'grab'
})

container?.addEventListener('mousemove', (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - container.offsetLeft
    const walk = (x - startX) * 1
    container.scrollLeft = scrollLeft - walk
})