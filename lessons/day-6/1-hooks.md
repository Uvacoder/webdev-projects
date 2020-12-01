# Hooks

- !! example

  ```tsx
  const errorMessage = "";

  return (
    <>
      {!!errorMessage && <DisplayError message={errorMessage} />}
      <SomeOtherInfo hasError={!!error} />
    </>
  );
  ```

- useState

  - Counter button
    - Render several of these, show diagram
  - Dice rolls example
    - state must be immutable
    - React compares state with previous state via ===
  - Multiple pieces of state
    - Show diagram
  - User input

- eslint

- useEffect

  - 3 cases of dependencies array

- Group pairing

  - Implement StarButton (useState)
  - Implement Buy component (useState)
    - store input with setState
    - use text value to calculate # of bitcoins

- useContext
- useReducer
- Performance model

- Exercises

  - Add a theme, e.g. change button color (useContext)

  - Wrap our Spacers in memo
  - Use useMemo on the spacer style

  - Implement currencies list?

## If Time

- useMemo
