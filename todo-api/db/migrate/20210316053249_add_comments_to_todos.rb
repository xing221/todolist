class AddCommentsToTodos < ActiveRecord::Migration[6.1]
  def change
    add_column :todos, :comment, :text
  end
end
