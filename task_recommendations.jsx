def recommend_tasks(employee_id):
    employee = get_employee(employee_id)
    tasks = Task.query.filter_by(status='TODO').all()
    
    # Simple skill-based matching (enhance with AI)
    recommendations = []
    for task in tasks:
        skill_match = len(set(employee.skills) & set(task.required_skills))
        if skill_match > 0:
            recommendations.append(task)
    
    return sorted(recommendations, key=lambda x: x.complexity)

