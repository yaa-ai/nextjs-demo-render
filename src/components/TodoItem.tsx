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
  const [isEditingPriority, setIsEditingPriority] = useState(false)

  const getPriorityEmoji = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'low': return '🟢'
      case 'medium': return '🟡'
      case 'high': return '🔴'
      default: return '🟡'
    }
  }

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-yellow-400'
    }
  }

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

  const updatePriority = async (newPriority: 'low' | 'medium' | 'high') => {
    if (!supabase) {
      alert('Supabase is not configured. Please set up your environment variables.')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ priority: newPriority })
        .eq('id', todo.id)
        .select()
        .single()

      if (error) throw error

      onUpdate(data)
      setIsEditingPriority(false)
    } catch (error) {
      console.error('Error updating priority:', error)
      alert('Error updating priority. Please check your Supabase configuration.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`flex items-start gap-3 p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg transition-all duration-200 ${todo.completed ? 'opacity-70' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
        disabled={loading}
        className="w-4 h-4 text-white rounded focus:ring-white/50 bg-white/20 border-white/40 mt-1"
      />
      
      <div className="flex-1 min-w-0">
        <span className={`block text-white ${todo.completed ? 'line-through text-white/60' : 'text-white/90'}`}>
          {todo.text}
        </span>
        
        <div className="flex items-center gap-2 mt-2">
          {isEditingPriority ? (
            <select
              value={todo.priority}
              onChange={(e) => updatePriority(e.target.value as 'low' | 'medium' | 'high')}
              className="px-2 py-1 bg-white/30 backdrop-blur-sm border border-white/40 rounded text-white text-xs focus:outline-none focus:ring-2 focus:ring-white/50"
              disabled={loading}
              onBlur={() => setIsEditingPriority(false)}
            >
              <option value="low" className="bg-gray-800 text-white">🟢 Low</option>
              <option value="medium" className="bg-gray-800 text-white">🟡 Medium</option>
              <option value="high" className="bg-gray-800 text-white">🔴 High</option>
            </select>
          ) : (
            <button
              onClick={() => setIsEditingPriority(true)}
              disabled={loading}
              className={`text-xs px-2 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 ${getPriorityColor(todo.priority)} border border-white/30`}
            >
              {getPriorityEmoji(todo.priority)} {todo.priority}
            </button>
          )}
        </div>
      </div>
      
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-white/70 hover:text-white hover:bg-white/20 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 disabled:opacity-50 flex-shrink-0"
      >
        ✕
      </button>
    </div>
  )
}
