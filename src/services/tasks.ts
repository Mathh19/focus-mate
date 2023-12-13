import { TaskProps } from '../shared-types/tasks';
import { api } from './api';

export const addTaskAPI = async (newTask: TaskProps) => {
  try {
    const response = await api.post('/task', newTask);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const updateTaskAPI = async (id: string, updatedTask: TaskProps) => {
  try {
    const response = await api.patch(`/task/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error('Error update task:', error);
    throw error;
  }
};

export const setFocusTaskAPI = async (id: string) => {
  try {
    const response = await api.put(`/task/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error set focus task:', error);
    throw error;
  }
};

export const finishedRoutineTasksAPI = async () => {
  try {
    const response = await api.patch('/task?hasDay=true');
    return response.data;
  } catch (error) {
    console.error('Error finished routine tasks:', error);
    throw error;
  }
};

export const finishedTasksAPI = async () => {
  try {
    const response = await api.patch('/task');
    return response.data;
  } catch (error) {
    console.error('Error finished tasks:', error);
    throw error;
  }
};

export const deleteTaskAPI = async (id: string) => {
  try {
    const response = await api.delete(`/task/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error delete task:', error);
    throw error;
  }
};

export const deleteRoutineTasksAPI = async () => {
  try {
    const response = await api.delete('/task?hasDay=true');
    return response.data;
  } catch (error) {
    console.error('Error delete routine tasks:', error);
    throw error;
  }
};

export const deleteTasksAPI = async () => {
  try {
    const response = await api.delete('/task');
    return response.data;
  } catch (error) {
    console.error('Error delete tasks:', error);
    throw error;
  }
};

export const deleteFinishedRoutineTasksAPI = async () => {
  try {
    const response = await api.delete('/task?finished=true&hasDay=true');
    return response.data;
  } catch (error) {
    console.error('Error delete finished routine task:', error);
    throw error;
  }
};

export const deleteFinishedTasksAPI = async () => {
  try {
    const response = await api.delete('/task?finished=true');
    return response.data;
  } catch (error) {
    console.error('Error delete finished task:', error);
    throw error;
  }
};
