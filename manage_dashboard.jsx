function ManagerView() {
  return (
    <div className="dashboard">
      <TaskProgressChart data={completionData} />
      <EmployeeEngagementSummary stats={engagementStats} />
      <TaskList tasks={allTasks} />
    </div>
  );
}

