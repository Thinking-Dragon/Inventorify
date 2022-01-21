class InventoryNewItemComponent extends HTMLElement {
    constructor(onRefresh) {
        super();
        this.attachShadow({mode: 'open'});
        
        this._onRefresh = onRefresh;

        this.refreshView();
    }

    // Data processing methods
    addItem() {
        const sku = this._skuField.value;
        const name = this._nameField.value;
        const description = this._descriptionField.value;
        const price = this._priceField.value;
        const currency = this._currencyField.value;
        const quantity = this._quantityField.value;

        fetch(`${API_ADDRESS}/inventory-items`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                sku: sku,
                name: name,
                description: description,
                price: {
                    value: price,
                    currency: currency
                },
                quantity: quantity
            })
        }).then(() => this._onRefresh());
    }

    // Rendering methods
    async refreshView() {
        let card = document.createElement('div');
        card.setAttribute('class', 'card m-3');

        let row = document.createElement('div');
        row.setAttribute('class', 'row align-items-start');

        this._skuField = this.makeTextField();
        this._nameField = this.makeTextField();
        this._descriptionField = this.makeTextboxField();
        this._priceField = this.makeNumericField();
        this._currencyField = this.makeDropdownField(await getCurrencies());
        this._quantityField = this.makeNumericField();
        let addButton = this.makeButton(() => this.addItem());
        let emptyColumnCell = document.createElement('div');
        emptyColumnCell.setAttribute('class', 'col');

        addButton.innerText = 'Add';

        row.appendChild(this._skuField);
        row.appendChild(this._nameField);
        row.appendChild(this._descriptionField);
        row.appendChild(this._priceField);
        row.appendChild(this._currencyField);
        row.appendChild(this._quantityField);
        row.appendChild(addButton);
        row.appendChild(emptyColumnCell);

        card.appendChild(row);

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(card);
        this.shadowRoot.appendChild(getBootstrap());
    }

    // Utility methods
    makeTextField() {
        let field = document.createElement('input');
        field.setAttribute('class', 'col form-control m-3');
        field.setAttribute('type', 'text');
        return field;
    }

    makeTextboxField() {
        let field = document.createElement('textarea');
        field.setAttribute('class', 'col form-control m-3');
        return field;
    }

    makeNumericField() {
        let field = document.createElement('input');
        field.setAttribute('class', 'col form-control m-3');
        field.setAttribute('type', 'number');
        field.setAttribute('min', '0');
        return field;
    }

    makeDropdownField(options) {
        let field = document.createElement('select');
        field.setAttribute('class', 'col form-select m-3');
        options.forEach(option => {
            let optionElement = document.createElement('option');
            optionElement.value = option.symbol;
            optionElement.innerText = `${option.name} (${option.symbol})`;
            field.appendChild(optionElement);   
        });
        return field;
    }

    makeButton(onClick) {
        let button = document.createElement('button');
        button.setAttribute('class', 'col m-3 btn btn-primary')
        button.addEventListener('click', () => onClick());
        return button;
    }
}

customElements.define('inventory-new-item-component', InventoryNewItemComponent);