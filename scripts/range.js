instancesOfRange = new Set()


class Range {

    constructor(element) {
        this.element = element
        this.rangeMin = this.element.querySelectorAll('input[type=range]')[0]
        this.rangeMax = this.element.querySelectorAll('input[type=range]')[1]
        this.inputMin = this.element.querySelectorAll('input[type=number]')[0]
        this.inputMax = this.element.querySelectorAll('input[type=number]')[1]
        this.track = this.element.querySelector('div.track')

        this.rangeMin.addEventListener('input', event => this.minRange())
        this.rangeMax.addEventListener('input', event => this.maxRange())
        this.inputMin.addEventListener('input', event => this.minInput())
        this.inputMax.addEventListener('input', event => this.maxInput())
        instancesOfRange.add(this)
    }

    minRange() {
        this.rangeMax.value - this.rangeMin.value >= 0 ? this.inputMin.value = this.rangeMin.value : this.rangeMin.value = this.rangeMax.value
        this.fillTrack()
    }
    maxRange() {
        this.rangeMax.value - this.rangeMin.value >= 0 ? this.inputMax.value = this.rangeMax.value : this.rangeMax.value = this.rangeMin.value
        this.fillTrack()
    }
    minInput() {
        if (this.inputMax.value - this.inputMin.value >= 0) {
            this.rangeMin.value = this.inputMin.value
        } else {
            this.inputMin.value = this.inputMax.value
            this.rangeMin.value = this.inputMin.value
        }

        if (parseInt(this.inputMin.value) < this.rangeMin.getAttribute('min')) {
            this.inputMin.value = this.rangeMin.getAttribute('min')
        }
        this.fillTrack()
    }
    maxInput() {
        if (this.inputMax.value - this.inputMin.value >= 0) {
            this.rangeMax.value = this.inputMax.value
        } else {
            this.inputMax.value = this.inputMin.value
            this.rangeMax.value = this.inputMin.value
        }

        if (parseInt(this.inputMax.value) > this.rangeMin.getAttribute('max')) {
            this.inputMax.value = this.rangeMin.getAttribute('max')
        }
        this.fillTrack()
    }

    fillTrack() {
        var maxValue = this.inputMax.getAttribute('max')
        var start = (this.rangeMin.value / maxValue) * 100
        var end = (this.rangeMax.value / maxValue) * 100
        this.track.style.left = start + '%'
        this.track.style.width = (end - start) + '%'
    }

}

const ranges = document.querySelectorAll('div.range')
ranges.forEach(range => {
    new Range(range)
})