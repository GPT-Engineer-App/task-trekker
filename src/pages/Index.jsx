import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton, Container, Heading, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <Heading mb={6} textAlign="center">Todo App</Heading>
      <Box display="flex" mb={4}>
        <Input
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          mr={2}
        />
        <Button onClick={addTask} colorScheme="blue">Add</Button>
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
            <Box as="span" textDecoration={task.isCompleted ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <Box>
              <IconButton
                icon={<FaCheckCircle />}
                aria-label="Complete task"
                onClick={() => toggleTaskCompletion(task.id)}
                colorScheme={task.isCompleted ? 'green' : 'gray'}
                mr={2}
              />
              <IconButton
                icon={<FaTrash />}
                aria-label="Delete task"
                onClick={() => deleteTask(task.id)}
                colorScheme="red"
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;