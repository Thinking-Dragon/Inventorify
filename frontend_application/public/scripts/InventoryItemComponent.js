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
        console.log(`SKU: ${newSku}, Price: ${newPrice}, Currency: ${newCurrency}, Quantity: ${newQuantity}`);
        this._onRefresh();
    }

    // Rendering methods
    refreshView() {
        let card = document.createElement('div');
        card.setAttribute('class', 'card m-3');

        let row = document.createElement('div');
        row.setAttribute('class', 'row align-items-start');

        this._skuField = this.makeTextField();
        this._priceField = this.makeTextField();
        this._currencyField = this.makeDropdownField([
            {name: 'Swiss Franc', symbol: 'CHF'},
            {name: 'Canadian Dollar', symbol: 'CAD'}
        ]);
        this._quantityField = this.makeTextField();
        let updateButton = this.makeButton(() => this.updateItem());

        this._skuField.value = this._itemData.sku;
        this._priceField.value = this._itemData.price.value;
        this._currencyField.value = this._itemData.price.currency.symbol;
        this._quantityField.value = this._itemData.quantity;
        updateButton.innerText = 'Update';

        row.appendChild(this._skuField);
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

customElements.define('inventory-item-component', InventoryItemComponent);