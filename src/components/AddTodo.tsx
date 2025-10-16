'use client'

import { useState } from 'react'
import { supabase, Todo } from '@/lib/supabase'

interface AddTodoProps {
  onAdd: (todo: Todo) => void
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    if (!supabase) {
      alert('Supabase is not configured. Please set up your environment variables.')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ text: text.trim(), priority }])
        .select()
        .single()

      if (error) throw error

      onAdd(data)
      setText('')
      setPriority('medium')
    } catch (error) {
      console.error('Error adding todo:', error)
      alert('Error adding todo. Please check your Supabase configuration.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 text-white placeholder-white/60"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="px-4 py-2 bg-white/30 backdrop-blur-sm text-white rounded-lg hover:bg-white/40 disabled:opacity-50 disabled:cursor-not-allowed border border-white/40 transition-all duration-200"
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
      
      <div className="flex gap-2">
        <label className="text-white/80 text-sm">Priority:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="px-2 py-1 bg-white/30 backdrop-blur-sm border border-white/40 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
          disabled={loading}
        >
          <option value="low" className="bg-gray-800 text-white">🟢 Low</option>
          <option value="medium" className="bg-gray-800 text-white">🟡 Medium</option>
          <option value="high" className="bg-gray-800 text-white">🔴 High</option>
        </select>
      </div>
    </form>
  )
}
