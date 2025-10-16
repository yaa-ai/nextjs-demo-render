'use client'

import { useState, useEffect } from 'react'
import { supabase, Todo } from '@/lib/supabase'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'

export default function TodoWidget() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    if (!supabase) {
      console.warn('Supabase is not configured')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setTodos(data || [])
    } catch (error) {
      console.error('Error fetching todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = (newTodo: Todo) => {
    setTodos(prev => [newTodo, ...prev])
  }

  const handleUpdate = (updatedTodo: Todo) => {
    setTodos(prev => prev.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ))
  }

  const handleDelete = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  if (loading) {
    return (
      <div className="w-80 bg-white/20 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Loading todos...</h3>
      </div>
    )
  }

  if (!supabase) {
    return (
      <div className="w-80 bg-white/20 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Todo List</h3>
        <div className="text-center py-8">
          <p className="text-white/80 mb-2">Supabase not configured</p>
          <p className="text-sm text-white/60">
            Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-white/20 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Todo List</h3>
      
      <AddTodo onAdd={handleAdd} />
      
      <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
        {todos.length === 0 ? (
          <p className="text-white/70 text-center py-4">No todos yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
