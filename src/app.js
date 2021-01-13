import Vue from 'vue';

document.addEventListener("DOMContentLoaded", () => {
    new Vue({
        el: "#app",
        data: {
            exchangeRates: [], //this array now contains data taken from API with fetchExchangeRates method, which is mounted (run at start)
            base: 0,
            date: "",
            selectedCurrency: {
                rate: null,
                code: null
            },
            selectedCurrency2: {
                rate: null,
                code: null
            },
            amountToConvert: null,
            convertMethod: null
        },
        computed: {
            calculatedResult: function () {
                if (this.convertMethod === 'from-eur') {
                    const result = this.amountToConvert * this.selectedCurrency.rate
                    return result.toFixed(2)
                }
                else if (this.convertMethod === 'to-eur') {
                    const result = this.amountToConvert / this.selectedCurrency.rate
                    return result.toFixed(2)
                }
                else if (this.convertMethod === 'any') {
                    const result = (this.amountToConvert / this.selectedCurrency.rate)*this.selectedCurrency2.rate
                    return result.toFixed(2)
                }
                else return null
            }
        },
        mounted: function () {
            this.fetchExchangeRates()

        },
        methods: {
            fetchExchangeRates: function () {
                fetch("https://api.exchangeratesapi.io/latest")
                    .then(response => response.json())
                    .then(data => {
                        this.exchangeRates = data.rates
                        this.base = data.base;
                        this.date = data.date;
                    })
            }
        }
    })
});