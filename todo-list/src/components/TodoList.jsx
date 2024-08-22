import { useEffect, useState } from "react";
import { Input, Button, List, Checkbox } from 'antd';

const TodoList = () => {
  const LOCAL_STORAGE_KEY = 'todo-list';
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState(() => {
    try {
      const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    console.log(localStorage,'2nd')
  }, [todos]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleDeleteBtn = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== '') {
      const newTodo = { text: value, checked: false };
      setTodos([...todos, newTodo]);
      setValue('');
    }
  };

  const onChangeCheckbox = (index) => (e) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, checked: e.target.checked } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <>
      <h2 className="heading">ToDo List</h2>
      <form className="form-class" onSubmit={handleFormSubmit}>
        <Input 
          className="form-class" 
          placeholder="Add Todo" 
          value={value} 
          onChange={handleInputChange}
        /> {" "}
        <Button type="primary" htmlType="submit">Add</Button>
      </form>
      <List 
        className="list-class"
        bordered
        style={{ width: 500 }}
        dataSource={todos}
        renderItem={(todo, index) => (
          <List.Item
            actions={[
              <Button
                key="delete"
                type="primary"
                danger
                onClick={() => handleDeleteBtn(index)}
              >
                Delete
              </Button>
            ]}
          >
            <Checkbox 
              onChange={onChangeCheckbox(index)}
              checked={todo.checked} 
              style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}
            >
              {todo.text}
            </Checkbox>
          </List.Item>
        )}
      />
    </>
  );
};

export default TodoList;
