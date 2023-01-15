import Button from './Button';

const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>Open Issues</h1>
      <Button
        color={showAdd ? 'red' : 'blue'}
        text={showAdd ? 'Close Form' : 'Add'}
        onClick={onAdd}
      />
    </header>
  );
};

export default Header;
