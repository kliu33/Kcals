class ChangeUsers4 < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :status, :string, null: true, default: ""
  end
end
