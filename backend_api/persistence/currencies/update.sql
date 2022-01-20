UPDATE Currencies SET
    currency_name = $currency_name,
    symbol = $currency_symbol
WHERE symbol = $original_currency_symbol