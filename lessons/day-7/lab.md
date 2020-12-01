1. Show articles from http://localhost:3000/articles

- Fetch the list of articles and use them to populate the API
- Include an error and loading state in the UI

2. Create a Currencies list component

- Use `useReducer` to manage the selection state. You can use the file reducers/currencies as a starting point, if you want
- You should be able to select individual currencies
- You should be able to remove any selected currency

2. Improve our USD input handling with a custom hook

- On the Buy component, separate the input validation and BTC conversion into a custom hook
- Handle invalid inputs like "abc", by either not allowing them or indicating an error somehow (don't show "NaN BTC" in the UI)
- But make sure that unusual but valid inputs still work, like "." (which a user might type before ".5")
- Perhaps the API would like `const [convertedValue, setRawValue] = useConvertedValue(exchangeRate)`, where `convertedValue` is a union type or an object containing a set of fields (e.g. btcPrice, error, ...)
