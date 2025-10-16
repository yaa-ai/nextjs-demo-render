-- Add priority field to todos table
ALTER TABLE todos 
ADD COLUMN priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high'));

-- Update existing todos to have medium priority
UPDATE todos SET priority = 'medium' WHERE priority IS NULL;

-- Create index for better query performance
CREATE INDEX idx_todos_priority ON todos(priority);

-- Create composite index for sorting by priority and created_at
CREATE INDEX idx_todos_priority_created_at ON todos(priority DESC, created_at DESC);
