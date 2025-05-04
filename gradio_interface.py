import gradio as gr
import joblib
import pandas as pd


pipeline = joblib.load('model.pkl')


def preprocess_input(task_name, start_time, skills, priority, status, estimated_completion):
    try:
        df = pd.DataFrame([{
            'Task_Name': task_name,
            'Start_Time': start_time,
            'Employee_Skills_Required': skills,
            'Priority': priority,
            'Status': status,
            'Estimated_Completion_Minutes': estimated_completion
        }])
        return df  # Assuming pipeline handles all preprocessing
    except Exception as e:
        raise ValueError(f"Preprocessing Error: {e}")


def predict_duration(task_name, start_time, skills, priority, status, estimated_completion):
    try:
        # Preprocess the input
        preprocessed_input = preprocess_input(task_name, start_time, skills, priority, status, estimated_completion)
        
        # Predict using the loaded pipeline
        prediction = pipeline.predict(preprocessed_input.values)[0]
        return f"Predicted Duration (minutes): {round(prediction, 2)}"
    
    except Exception as e:
        return f"⚠️ Prediction Error: {str(e)}"


# Gradio input components
task_name_input = gr.Dropdown(
    choices=['Code Review', 'Update Documentation', 'API Development', 'User Testing'],
    label="Task Name"
)
start_time_input = gr.Textbox(
    label="Start Time (YYYY-MM-DD HH:MM:SS)",
    placeholder="2025-04-30 09:30:00"
)

skills_input = gr.Textbox(
    label="Employee Skills Required",
    placeholder="Python, SQL, Data Analysis"
)
priority_input = gr.Dropdown(choices=['High', 'Medium', 'Low'], label="Priority")
status_input = gr.Dropdown(choices=['Not Started', 'In Progress', 'Completed'], label="Status")
estimated_completion_input = gr.Number(label="Estimated Completion Minutes")

# Launch the Gradio interface
gr.Interface(
    fn=predict_duration,
    inputs=[
        task_name_input,
        start_time_input,
        skills_input,
        priority_input,
        status_input,
        estimated_completion_input
    ],
    outputs="text",
    title="📊 Task Duration Predictor",
    description="Enter task information and receive an estimate of the actual duration in minutes."
).launch(share=True)
