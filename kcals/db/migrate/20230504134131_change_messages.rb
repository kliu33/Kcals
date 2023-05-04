class ChangeMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :editted, :boolean, default: false
  end
end
