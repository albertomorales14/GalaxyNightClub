const formatCurrency = (number) => {
    return new Intl.NumberFormat('de-DE', {currency: 'EUR'}).format(Math.round(number)).replaceAll('.', ',')
}

export default formatCurrency