import Issue from './Issue';

const Issues = ({ issues, onDelete, onToggle }) => {
  return (
    <>
      {issues.map((issue) => (
        <Issue
          key={issue.id}
          issue={issue}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Issues;
