import { FaTimes } from 'react-icons/fa';

const Issue = ({ issue, onDelete, onToggle }) => {
  return (
    <div
      className={`issue ${issue.completed === true ? 'complete' : ''}`}
      onDoubleClick={() => onToggle(issue.id)}>
      <h3>
        {issue.title}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(issue.id)}
        />
      </h3>
      <p>{issue.body}</p>
    </div>
  );
};

export default Issue;
