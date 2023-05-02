class ChangeUsers3 < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :dark_mode, :boolean, null: false, default: false
  end
end
