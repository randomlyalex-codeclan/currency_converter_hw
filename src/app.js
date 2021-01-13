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
            convertMethod: null,
            convertFrom: null,
            convertTo: null
        },
        computed: {
            calculatedResult: function () {
                if (this.convertMethod === 'from') {
                    const result = (this.amountToConvert / this.selectedCurrency.rate).toFixed(2)
                    return result
                }
                else if (this.convertMethod === 'to') {
                    const result = (this.amountToConvert / this.selectedCurrency.rate).toFixed(2)
                    return result}
                else if (this.convertMethod === 'any') {
                    const result = ((this.amountToConvert / this.selectedCurrency.rate)*this.selectedCurrency2.rate).toFixed(2)
                    return result
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