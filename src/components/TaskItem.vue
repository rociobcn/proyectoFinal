    const todo = {
        text: newTodo.value,
    
    } 
    if(newTodo.value.length > 0){
      todos.value.push(todo);
      console.log(newTodo.value)
      newTodo.value = "";
    }
    try{
      await taskStore.allTasks(todo.value.text);
      console.log(newTodo.value, "esto soy")
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }