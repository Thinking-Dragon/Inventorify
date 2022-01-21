function getCurrencies() {
    return new Promise((resolve, reject) => {
        fetch(`${API_ADDRESS}/currencies`)
            .then(response => response.json())
            .then(currencies => {
                resolve(currencies);
            });
    });
}