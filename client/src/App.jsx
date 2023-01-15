import { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Issues from './components/Issues';
import AddIssue from './components/AddIssue';

function App() {
  const [showAddIssue, setShowAddIssue] = useState(false);
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "We've got an issue",
      body: "Didn't describe the issue",
      completed: false,
      user: 'UserID4453',
      createdAt: Date.now,
    },
    {
      id: 2,
      title: 'Bug in the system',
      body: "Didn't describe the issue",
      completed: false,
      user: 'UserID53',
      createdAt: Date.now,
    },
    {
      id: 3,
      title: 'Just saying Hi!',
      body: "Didn't describe the issue",
      completed: false,
      user: 'UserID3453',
      createdAt: Date.now,
    },
  ]);

  // Add Issue
  const addIssue = (issue) => {
    const id = Math.floor(Math.random() * 10000) + 1;

    const newIssue = { id, ...issue };
    setIssues([...issues, newIssue]);
  };

  // Delete Issue
  const deleteIssue = (id) => {
    setIssues(issues.filter((issue) => issue.id !== id));
  };

  // Toggle Issue Completed
  const toggleIssueComplete = (id) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, completed: !issue.completed } : issue
      )
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Header
          onAdd={() => setShowAddIssue(!showAddIssue)}
          showAdd={showAddIssue}
        />
        {showAddIssue && <AddIssue onAdd={addIssue} />}
        {issues.length > 0 ? (
          <Issues
            issues={issues}
            onDelete={deleteIssue}
            onToggle={toggleIssueComplete}
          />
        ) : (
          'No issues to show'
        )}
      </div>
    </div>
  );
}

export default App;
