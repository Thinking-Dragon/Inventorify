class InventoryItemComponent extends HTMLElement {
    constructor(itemData, onRefresh) {
        super();
        this.attachShadow({mode: 'open'});
        
        this._itemData = itemData;
        this._onRefresh = onRefresh;

        this.refreshView();
    }

    // Data processing methods
    updateItem() {
        const newSku = this._skuField.value;
        const newPrice = this._priceField.value;
        const newCurrency = this._currencyField.value;
        const newQuantity = this._quantityField.value;

        //fetch()

        this._onRefresh();
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
        let updateButton = this.makeButton(() => this.updateItem());

        this._skuField.value = this._itemData.sku;
        this._nameField.value = this._itemData.name;
        this._descriptionField.value = this._itemData.description;
        this._priceField.value = this._itemData.price.value;
        this._currencyField.value = this._itemData.price.currency.symbol;
        this._quantityField.value = this._itemData.quantity;
        updateButton.innerText = 'Update';

        row.appendChild(this._skuField);
        row.appendChild(this._nameField);
        row.appendChild(this._descriptionField);
        row.appendChild(this._priceField);
        row.appendChild(this._currencyField);
        row.appendChild(this._quantityField);
        row.appendChild(updateButton);

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
        console.log(options);
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

customElements.define('inventory-item-component', InventoryItemComponent);