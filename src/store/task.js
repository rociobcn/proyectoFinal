import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user"
export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
       return this.tasks = tasks;
      
    },

    async addTodo(title){
      const { data, error } = await supabase.from("tasks").insert([
        {
          title: title,
          is_complete: false,
          user_id: useUserStore().user.id
        }
      ]);
      if(error) throw error;
    },

    async editTodo (taskId, editedTask){
      const { data, error } = await supabase
      .from("tasks")
      .update({title: editedTask})
      .match({id: taskId})
      if(error) throw error;
    },

    async isComplete (taskId, status){
      const { data, error } = await supabase
      .from("tasks")
      .update({is_complete: status})
      .match({id: taskId})
      if(error) throw error;
    },

    async removeTodo (taskId){
      const { data, error } = await supabase
      .from("tasks")
      .delete()
      .match({id: taskId})
      if(error) throw error;
    }
  }
});