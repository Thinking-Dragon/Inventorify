class InventoryComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.refreshView();
    }

    refreshView() {
        fetch(`${API_ADDRESS}/inventory-items?_extend=true`)
            .then(response => response.json())
            .then(inventoryItems => {
                let inventoryTable = new DOMParser().parseFromString(`
                    <div class="container">
                        <div class="row align-items-start">
                            <div class="col">SKU</div>
                            <div class="col">Price</div>
                            <div class="col">Currency</div>
                            <div class="col">Quantity</div>
                            <div class="col"></div>
                        </div>
                    </div>
                `, 'text/html').body;

                inventoryItems.forEach(item => {
                    let row = new InventoryItemComponent(item, () => this.refreshView());
                    inventoryTable.appendChild(row);
                });

                this.shadowRoot.innerHTML = '';
                this.shadowRoot.appendChild(inventoryTable);
                this.shadowRoot.appendChild(getBootstrap());
            });
    }
}

customElements.define('inventory-component', InventoryComponent);