const PersonForm = ({
  nameValue,
  numberValue,
  nameHandler,
  numberHandler,
  addPersonHandler,
}) => {
  return (
    <form>
      <div>
        name: <input value={nameValue} onChange={nameHandler} />
      </div>
      <div>
        number: <input value={numberValue} onChange={numberHandler} />
      </div>
      <div>
        <button onClick={addPersonHandler}>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
