import Button from './Button';

const Header = ({ title }) => {
  const onClick = (e) => {
    console.log('click');
  };

  return (
    <header className="header">
      <h1>Open Issues</h1>
      <Button color="blue" text="Add" onClick={onClick} />
    </header>
  );
};

export default Header;
