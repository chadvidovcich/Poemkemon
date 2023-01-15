import { useState } from 'react';

const AddIssue = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert('Please add an issue');
      return;
    }

    onAdd({ title, body });

    setTitle('');
    setBody('');
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Title</label>
        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Body</label>
        <input
          type="text"
          placeholder="Describe The Issue"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <input type="submit" value="Save Issue" className="btn btn-block" />
    </form>
  );
};

export default AddIssue;
