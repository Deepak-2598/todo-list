import { useEffect, useState } from "react";
import { Input, Button, List, Checkbox } from 'antd';

const TodoList = () => {
  const LOCAL_STORAGE_KEY = 'todo-list'
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState(() => {
    try {
      const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      // console.log(storedTodos, 'localllllll');
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
      return [];
    }
  });
  const [checkedState, setCheckedState] = useState({});

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    console.log(localStorage,'locallllllllllll');   
  },[todos])

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleDelete = (index) => {
    const newTodo = todos.filter((_,i) => i !== index);
    setTodos(newTodo);

    const newCheckedState = { ...checkedState };
    delete newCheckedState[index];
    setCheckedState(newCheckedState)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(value.trim() !== ''){
      const newTodo = { text: value, checked: false }
      setTodos([...todos, newTodo]);
      setValue('');
    }
  }

  const onChangeCheckbox = (index) => (e) => {
    setCheckedState({
      ...checkedState,
      [index]: e.target.checked
    });
  }

  return (
    <>
      <h2 className="heading">ToDo List</h2>
      <form className="form-class" onSubmit={handleSubmit}>
        <Input className="form-class" placeholder="Add Todo" value={value} onChange={handleChange}
        /> {" "}
        <Button type="primary" htmlType="submit">Add</Button>
      </form>
      <List 
        className="list-class"
        bordered
        style={{width:500}}
        dataSource={todos}
        renderItem={(todo, index) => (
          <List.Item
            actions={[
              <Button
                key="delete"
                type="primary"
                danger
                onClick={() => handleDelete(index)}
              >Delete
              </Button>
            ]}
          >
            <Checkbox 
              onChange={onChangeCheckbox(index)}
              checked={checkedState[index] || false} 
              style={{textDecoration: checkedState[index] ? 'line-through' : 'none'}}
              >
                {todo}
            </Checkbox>
          </List.Item>
        )}
      />
    </>
  );
};

export default TodoList;
