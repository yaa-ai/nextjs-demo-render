'use client'

import { useState } from 'react'
import { Todo } from '@/lib/supabase'
import { supabase } from '@/lib/supabase'

interface TodoItemProps {
  todo: Todo
  onUpdate: (todo: Todo) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [loading, setLoading] = useState(false)

  const toggleCompleted = async () => {
    if (!supabase) {
      alert('Supabase is not configured. Please set up your environment variables.')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ completed: !todo.completed })
        .eq('id', todo.id)
        .select()
        .single()

      if (error) throw error

      onUpdate(data)
    } catch (error) {
      console.error('Error updating todo:', error)
      alert('Error updating todo. Please check your Supabase configuration.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!supabase) {
      alert('Supabase is not configured. Please set up your environment variables.')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todo.id)

      if (error) throw error

      onDelete(todo.id)
    } catch (error) {
      console.error('Error deleting todo:', error)
      alert('Error deleting todo. Please check your Supabase configuration.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`flex items-center gap-3 p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg transition-all duration-200 ${todo.completed ? 'opacity-70' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
        disabled={loading}
        className="w-4 h-4 text-white rounded focus:ring-white/50 bg-white/20 border-white/40"
      />
      <span className={`flex-1 text-white ${todo.completed ? 'line-through text-white/60' : 'text-white/90'}`}>
        {todo.text}
      </span>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-white/70 hover:text-white hover:bg-white/20 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 disabled:opacity-50"
      >
        ✕
      </button>
    </div>
  )
}
